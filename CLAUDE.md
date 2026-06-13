# CLAUDE.md — Web Clínica Psicóloga Daniela Vargas

## Estilo de trabajo
 
El desarrollador viene de Java/backend y está aprendiendo el ecosistema React/Next.js. Por ello, ante cualquier cambio en el código:
 
- Explica **qué** estás haciendo y **por qué**, no solo el resultado
- Si introduces un concepto nuevo de Next.js, React o TypeScript, dedica un párrafo a explicarlo en términos sencillos
- Si hay varias formas de hacer algo, menciona brevemente por qué eliges esta y no otra
- Si un cambio puede tener implicaciones en otras partes del proyecto, adviértelo explícitamente
No hace falta ser exhaustivo en cosas ya vistas (Tailwind, componentes básicos), pero sí en patrones nuevos, decisiones de arquitectura o comportamientos específicos de Next.js App Router.
 
---

## Contexto del proyecto

Web profesional de una psicóloga colombiana (Daniela Vargas). Migrada de un sitio estático HTML/CSS a una aplicación Next.js moderna. El objetivo es que funcione como clínica online: captación de pacientes, venta de guías digitales y eventualmente gestión de citas.

El desarrollador tiene background en Java/backend y está aprendiendo el ecosistema React/Next.js.

**Archivos raíz relevantes:** `CLAUDE.md` (este archivo), `AGENTS.md` (generado automáticamente por Next.js, avisa a los agentes de IA de que esta versión tiene breaking changes — no hace nada en runtime, pero Claude Code lo lee al procesar `@AGENTS.md`), `README.md`.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Estilos:** Tailwind CSS v4 — usar `@import "tailwindcss"` en globals.css. **No existe tailwind.config.ts**, no crearlo.
- **Fuente:** Inter (Google Fonts, cargada en layout.tsx)
- **Hosting:** Vercel (plan Hobby)
- **Correos:** Resend (`RESEND_API_KEY` en variables de entorno)
- **Pagos:** Bold (pasarela colombiana). Tres variables distintas: `NEXT_PUBLIC_BOLD_API_KEY` (pública, abre el modal), `BOLD_SECRET_KEY` (genera el hash de integridad del botón, solo servidor) y `BOLD_WEBHOOK_SECRET` (verifica la firma de las notificaciones entrantes del webhook, solo servidor)
- **CMS Blog:** Contentful (✅ conectado). Cliente en `lib/contentful.ts`. Llaves: `CONTENTFUL_SPACE_ID` y `CONTENTFUL_DELIVERY_ACCESS_TOKEN`
- **Base de datos:** Supabase (Postgres). ✅ Conectada — cliente server-only en `lib/supabase.ts`. Primer uso: el webhook de Bold guarda cada pago en la tabla `payments`. Llaves: `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` (secreta, solo servidor)

---

## Estructura de rutas (`app/`)

```
app/
├── page.tsx                          # Inicio (/)
├── sobre-mi/page.tsx                 # /sobre-mi
├── servicios/
│   ├── page.tsx                      # /servicios — Hub visual de servicios
│   ├── terapia-individual/page.tsx   # Landing de embudo con precios COP
│   ├── terapia-de-pareja/page.tsx
│   ├── terapia-infantojuvenil/page.tsx
│   └── empresas/page.tsx             # B2B
├── guias/page.tsx                    # /guias — E-commerce guías digitales
├── blog/
│   ├── page.tsx                      # Listado de posts (fetch real a Contentful vía getAllPosts)
│   └── [slug]/page.tsx               # Artículo individual (async, await params; Rich Text + generateStaticParams)
├── contacto/page.tsx                 # Formulario completo
├── verificar-pago/page.tsx           # Enrutador post-pago Bold (usa Suspense + useSearchParams)
├── pago-completado/page.tsx          # Éxito (noindex, protegida por referer)
├── pago-rechazado/page.tsx           # Fallo (noindex, protegida por referer)
├── icon.svg                              # Favicon personalizado
├── globals.css                       # Solo: @import "tailwindcss"
├── layout.tsx                        # Navbar + Footer + WhatsAppButton + Analytics
└── api/
    ├── contacto/route.ts             # POST — Envía correo con Resend
    ├── pagos/hash/route.ts           # POST — Genera hash de integridad para Bold
    └── webhooks/bold/route.ts        # POST — Webhook de Bold (envía correos automáticos)
```

---

## Componentes (`components/`)

| Archivo | Descripción |
|---|---|
| `Navbar.tsx` | Sticky, responsive, submenú hover en Servicios, botón Contacto destacado |
| `Footer.tsx` | Links redes sociales, logos de métodos de pago (brightness-0 invert), copyright |
| `WhatsAppButton.tsx` | Botón flotante fixed bottom-right, usa `/icons/socials/whatsapp.svg` |
| `BoldPaymentButton.tsx` | Botón de pago Bold. Props: `amount`, `description`, `orderPrefix` |
| `NewsletterForm.tsx` | Caja de suscripción al final del blog. Client Component. ⚠️ Solo UI: el `onSubmit` hace `preventDefault`, aún no envía a ningún sitio |

---

## Librerías (`lib/`)

### `contentful.ts`
Cliente de Contentful + funciones de acceso a datos del blog. Crea el cliente con `CONTENTFUL_SPACE_ID` y `CONTENTFUL_DELIVERY_ACCESS_TOKEN`. Expone:
- `getAllPosts()` — todos los posts ordenados por `publishDate` descendente (listado del blog)
- `getPostBySlug(slug)` — un post por su slug (página de artículo), o `null` si no existe
- `getAllSlugs()` — solo los slugs (para `generateStaticParams`)

Las tres usan `'use cache'` + `cacheLife('hours')` (caché de Next.js, revalida cada hora). El mapeo Contentful→`BlogPost` está en `mapEntry`: lee el campo `coverImage` y le antepone `https:` a la URL del asset.

### `supabase.ts`
Cliente de Supabase (Postgres) con la `service_role key`. ⚠️ **Solo servidor** (Route Handlers, Server Actions): la `service_role` salta el RLS y nunca debe llegar al navegador (por eso su env var NO lleva `NEXT_PUBLIC_`). Expone `getSupabaseAdmin()`, que crea el cliente de forma **perezosa** (no se instancia al importar, sino en la primera llamada) para que el build no falle si faltan las variables.

**Tabla `payments`** (creada en el SQL Editor de Supabase): guarda cada notificación del webhook de Bold. Columnas: `id` (uuid), `created_at`, `event_id`, `event_type`, `payment_id` (único, da idempotencia), `reference` (orderId completo), `product_prefix` (GUIA-HABLAR/…/CITA), `amount`, `currency`, `payer_email`, `status` (approved/rejected/…), `raw_payload` (jsonb con el evento completo). Tiene **RLS activado sin políticas públicas** → solo accesible desde el servidor con la `service_role`. La inserción se hace con `upsert(..., { onConflict: 'payment_id', ignoreDuplicates: true })` para que los reintentos de Bold no dupliquen filas.

---

## Hooks (`hooks/`)

### `useContactForm.ts`
Lógica centralizada de envío de formularios. Usa la API `/api/contacto`. Se instancia con:
```tsx
const { isSubmitting, handleFormAction } = useContactForm();
```
El formulario usa `action={handleFormAction}` (React 19, no `onSubmit`). Todos los inputs deben tener atributo `name`.

---

## Paleta de colores y estilos

**Paleta de marca (manual del cliente)** — definida como tokens `@theme` en `app/globals.css`. Cada token genera utilidades (`bg-`, `text-`, `border-`, `ring-`…, con opacidad: `bg-eucalipto/30`). **No usar `pink-*` ni colores arbitrarios de marca**; usar siempre estos tokens:

| Token / clase | Hex | Uso |
|---|---|---|
| `blancoluz` | `#FDFBF1` | Fondo claro principal (antes la crema `#FFF5F3`) |
| `arena` | `#F1EAE0` | Fondo neutro suave de secciones |
| `lino` | `#E6DBC4` | Paneles cálidos / soporte |
| `salvia` | `#C3D3AD` | Acentos suaves, bordes, fondos verdes claros |
| `eucalipto` | `#8FAE96` | Acentos, iconos, fills claros (texto **oscuro** encima) |
| `eucalipto-dark` | `#5E7C66` | **CTAs/botones con texto blanco y enlaces** (contraste AA) |
| `eucalipto-darker` | `#46604E` | Hover de botones/enlaces, texto fuerte |
| `tinta` | `#343434` | Texto fuerte y secciones oscuras (antes `#2D313A`/`gray-800`) |

> Los tonos `eucalipto-dark`/`-darker` son **derivados** (no están en el manual): el eucalipto de marca `#8FAE96` es demasiado claro para texto/botones con texto blanco, así que se derivaron tonos más oscuros para garantizar legibilidad. Los hex de marca son **estimados de los swatches** (el manual no traía códigos salvo `#343434`); ajustar aquí en un solo sitio si el cliente da los exactos.

**Mapeo histórico** (rosa→marca, por si aparece código viejo): `pink-50→arena`, `pink-100/200→salvia`, `pink-300/400→eucalipto`, `pink-500→eucalipto-dark`, `pink-600/700→eucalipto-darker`, `#FFF5F3→blancoluz`, `#2D313A→tinta`.

### Sistema de uso (estandarizado — usar con propósito, no mezclar)

Regla mental: **fondos neutros (~80%) + verde como acento (~20%) + toque cálido lino (~10%)**, máximo ~3 colores por sección (sigue la proporción 60/20/10/10 del manual). Cada color tiene **un** rol:

| Rol | Color | Notas |
|---|---|---|
| Fondo de página / sección por defecto | `blancoluz` | El lienzo base |
| Sección alterna (para dar ritmo) | `arena` | Alternar con blancoluz/white entre secciones |
| Tarjetas / contenedores sobre el fondo | `bg-white` | Contenido elevado |
| Secciones oscuras (footer, banda CTA dramática) | `tinta` | Texto claro encima |
| **Acento de marca (texto): enlaces, eyebrows, palabras destacadas, botón primario** | `eucalipto-dark` | **Un único tono** para "esto es marca/interactivo". Texto verde = siempre este |
| Hover/activo de lo anterior | `eucalipto-darker` | Solo estados hover/pressed |
| Fills/decoración clara, chips de icono (texto **oscuro** encima) | `eucalipto` | Nunca para texto pequeño (contraste bajo) |
| Acento suave: badges pequeños, bordes/divisores sutiles | `salvia` | No usar como fondo de secciones grandes |
| Panel cálido destacado (uso escaso) | `lino` | El 10% de calidez; p. ej. una caja de cita |
| Texto principal / secundario | `tinta`·`gray-800` / `gray-600` | — |

> **Estandarización aplicada:** todo el texto verde "suelto" (no-hover) se unificó a `eucalipto-dark` (antes convivían `eucalipto`/`-dark`/`-darker` por herencia del rosa, lo que daba aspecto mezclado). Mantener esa disciplina: para texto-acento usar **siempre** `eucalipto-dark` (+ `hover:eucalipto-darker`).

**⚠️ Regla de contraste (el acento verde cambia según el fondo):**
- Sobre fondo **claro** (blancoluz/arena/white): texto-acento = `eucalipto-dark`.
- Sobre fondo **oscuro** (`tinta`, `gray-800/900`, overlays de hero `bg-gray-900/xx`): texto-acento = `salvia` (verde **claro**). Nunca `eucalipto-dark` sobre oscuro (verde oscuro sobre oscuro = ilegible; era el bug del footer y los eyebrows de los heroes).
- Texto sobre fill `salvia` (botones secundarios, círculos de paso): usar `eucalipto-darker` (no `eucalipto-dark`), para alcanzar contraste suficiente.
- Botón primario: `bg-eucalipto-dark` + texto blanco (AA ✓), hover `bg-eucalipto-darker`.

| Uso | Valor |
|---|---|
| Texto principal | `tinta` / `gray-800` |
| Texto secundario | `gray-600` |
| Bordes y separadores | `salvia` / `gray-100` |
| Esquinas | `rounded-3xl` (tarjetas grandes), `rounded-2xl` (medias), `rounded-full` (botones) |

**Tipografía:** Fuente Inter. Títulos usan `font-serif` para contraste elegante. *(El manual sugiere otras fuentes —Montserrat/Poppins en CapCut, Gliker/Alata en Canva— pero son para piezas gráficas, no necesariamente para la web; pendiente de confirmar con el cliente si quiere cambiar la tipografía web.)*

**Gradientes:** Usar `bg-gradient-to-b from-salvia/40 via-blancoluz/60 to-white` para héros sin imagen de fondo.

**Assets de imagen:** el logo `public/icons/logos/logo-mariposa-fondo.svg` ya se recoloreó a eucalipto (`fill:#5E7C66`, editable directo en el SVG). ⚠️ Aún quedan otros con rosa que el CSS no toca y habría que rediseñar: `public/images/backgrounds/fondoRosa.png` y varios SVG decorativos en `public/images/backgrounds/` (corazones, burbujas…), además de los "cerebros" malva del fondo del hero del blog.

---

## Imágenes y assets (`public/`)

```
public/
├── icon.svg                    # Favicon de la web (en app/, no en public/)
├── icons/
│   ├── logos/                  # logo-mariposa-fondo.svg (navbar), logo-psicologia1.3.png
│   ├── socials/                # fb.svg, insta.svg, whatsapp.svg (los usados en código)
│   │                           # también hay versiones .png antiguas sin usar
│   ├── payments/               # bancolombia.svg, daviplata.svg, paypal-3.svg, nequi-2.svg,
│   │                           # pse-logo.svg, american-express-1.svg, mastercard-4.svg, visa-5.svg
│   ├── about_me/               # brain.png, mental-health.png, time.png
│   ├── enterprise/             # ratings.png
│   ├── guides/                 # like--v1.png, open-book--v2.png, speech-bubble-with-dots.png
│   └── individual_therapy/     # clinic.png, for-you.png, neighbour.png
├── images/
│   ├── daniela/                # daniela-rio.png, daniela-consulta.jpg, daniela-escritorio.jpg,
│   │                           # daniela-sofa-tablet.jpg, daniela-bosque.jpeg, inst1-min.jpg, inst8-min.jpg
│   ├── backgrounds/            # blog.jpg, couples.jpg, couples-2/3/4.jpg, enterprise.jpg, infant.jpg,
│   │                           # hero-terapia-individual.jpg y variantes (-2, -3, -5),
│   │                           # fondoRosa.png, SVGs decorativos (jigsaw, bubbles, heart, etc.)
│   ├── guides/                 # hablar-para-conectar.png, conexion-real.png, amor-en-equilibrio.png
│   ├── ilustrations/           # ⚠️ carpeta con typo (no "illustrations"). Contiene: avatar-couple.svg,
│   │                           # avatar-male.svg, avatar-woman.svg, ins2-min.jpg … ins7-min.jpg
│   ├── mission/                # mision.jpg
│   ├── people/                 # img-1219.jpg … img-1227.jpeg
│   └── testimonios/            # img-4252.jpg … img-4272.jpg, testimony3.jpg … testimony31.jpg
└── video/
    └── hero-video.mp4          # Vídeo del hero de la página de inicio
```

**⚠️ Typo en carpeta:** `public/images/ilustrations/` (una sola 'l'). Usar exactamente ese nombre en los `src` de las imágenes.

**Reglas de imágenes:**
- Siempre añadir `sizes` cuando se use `fill` (evita warnings de Next.js)
- Imágenes de fondo a pantalla completa: `sizes="100vw"`
- Grid de 2 columnas: `sizes="(max-width: 768px) 100vw, 50vw"`
- Grid de 3 columnas: `sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"`
- Logos de pago en footer: `brightness-0 invert opacity-60 hover:opacity-100`

---

## Integración Bold (Pagos)

**Flujo:**
1. Usuario pulsa `BoldPaymentButton` → frontend llama a `/api/pagos/hash` para generar el hash de integridad
2. Se abre el modal de Bold
3. Tras el pago, Bold redirige a `/verificar-pago?bold-tx-status=approved|rejected|failed`
4. La página `verificar-pago` enruta a `/pago-completado` o `/pago-rechazado`
5. En paralelo, Bold notifica al webhook `/api/webhooks/bold`

**Prefijos de orderId (para identificar el producto en el webhook):**
- `GUIA-HABLAR` — Guía "Hablar para Conectar" (comunicación asertiva)
- `GUIA-CONEXION` — Guía "Conexión Real" (preguntas de pareja)
- `GUIA-AMOR` — Guía "Amor en Equilibrio" (autocuidado y autoestima)
- `CITA` — Sesión de terapia (el botón de pago aún no está en páginas de servicios, solo en guías)

**✅ Bug corregido en `app/guias/page.tsx`:** cada `BoldPaymentButton` envía ya su `description` real ("Hablar para conectar", "Conexión real", "Amor en equilibrio"). Los `orderPrefix` siempre fueron correctos. También se eliminó un `console.log` que exponía `NEXT_PUBLIC_BOLD_API_KEY`.

**Webhook — Estado actual:**
- Variable de entorno usada para verificar firma: `BOLD_WEBHOOK_SECRET` (distinta de `BOLD_SECRET_KEY`)
- En modo simulación/pruebas: si Bold no envía firma, el webhook la omite y continúa (comportamiento temporal)
- Si Bold envía firma: valida con `BOLD_WEBHOOK_SECRET` usando `crypto.timingSafeEqual`
- Algoritmo: Base64 del rawBody → HMAC-SHA256 → comparar con header `x-bold-signature`
- El correo `to:` está hardcodeado a `mottajuandiego.work@gmail.com` — cambiar al correo de Daniela cuando se verifique el dominio en Resend

---

## Integración Resend (Correos)

- Variable de entorno: `RESEND_API_KEY`
- From temporal (sin dominio verificado): `'Acme <onboarding@resend.dev>'`
- En plan gratuito sin dominio propio: solo se puede enviar al correo con el que se registró la cuenta (`mottajuandiego.work@gmail.com` actualmente hardcodeado en `/api/contacto/route.ts` y en el webhook)
- Cuando se verifique el dominio: cambiar `from` a `'Daniela Vargas <hola@psicologadanivargas.com>'` y `to` al correo real de Daniela
- Webhook de Bold dispara correos automáticos diferenciando guía comprada por el prefijo de la referencia

---

## CMS Blog — Contentful (✅ Conectado)

**Estado:** Integración completa y funcionando. El blog (`/blog` y `/blog/[slug]`) lee posts reales de Contentful. Ya no hay `MOCK_POSTS`.

**Content Type `blogPost` — campos reales en el panel:**
- `title` (Short text) — Entry title
- `slug` (Short text, tipo Slug)
- `coverImage` (Media) — ⚠️ el Field ID es `coverImage`, NO `heroImage`. El código lo lee como `coverImage`
- `content` (Rich Text) — se renderiza con `@contentful/rich-text-react-renderer` y opciones de estilo en `app/blog/[slug]/page.tsx`. El mapeo (`richTextOptions`) cubre **todos** los nodos: marcas (bold, italic, underline, strikethrough, code, super/subscript), encabezados H1–H6, listas, cita, hr, saltos de línea suaves (`renderText`), **imágenes/archivos embebidos** (`EMBEDDED_ASSET` → `next/image` + pie de foto, o enlace de descarga si es PDF) y enlaces externos/internos/a assets. `getPostBySlug` usa `include: 2` para que el SDK resuelva esos enlaces embebidos
- `excerpt` (Short text)
- `publishDate` (Date & time) — el listado ordena por este campo descendente

**Campos opcionales (con fallback en el código):**
- `category` (Short text) — si no existe, el código usa `'General'`
- `readTime` (Short text) — si no existe, el código usa `'5 min de lectura'`
> Recomendado crearlos en Contentful para que las tarjetas muestren badge de categoría y tiempo de lectura reales. Los fallbacks están en `mapEntry` (`lib/contentful.ts`).

**SDK instalado:** `contentful`, `@contentful/rich-text-react-renderer`, `@contentful/rich-text-types`.

**Imágenes:** `next.config.ts` autoriza el dominio remoto `images.ctfassets.net` (CDN de Contentful) para `next/image`.

**Variables de entorno necesarias:**
```
CONTENTFUL_SPACE_ID=...
CONTENTFUL_DELIVERY_ACCESS_TOKEN=...   # contenido publicado (el que usa el código)
CONTENTFUL_PREVIEW_ACCESS_TOKEN=...    # borradores (opcional, no usado aún)
```

> ⚠️ La Delivery API solo devuelve entradas en estado **Published**. Un post en draft no aparecerá en la web.

**PDFs de guías:** Se subirán a la pestaña Media de Contentful. Actualizar las URLs en el webhook una vez subidos.

---

## Convenciones importantes

### React 19 / Next.js 16
- Usar `action={handleFormAction}` en formularios, no `onSubmit` con `FormEvent` (deprecado)
- Todos los inputs deben tener atributo `name` para que `FormData` los capture
- Rutas dinámicas: `params` es una Promise, siempre `await params` antes de acceder
- `useSearchParams()` debe estar dentro de un componente envuelto en `<Suspense>`
- Páginas `'use client'` solo cuando sea necesario (hooks, eventos interactivos)

### Tailwind v4
- No hay `tailwind.config.ts`
- `globals.css` solo contiene `@import "tailwindcss"`
- Los colores arbitrarios se escriben directamente: `bg-[#FFF5F3]`, `text-[#FFF5F3]/80`

### Componentes del servidor vs cliente
- Por defecto todo es Server Component (más rápido, mejor SEO)
- Añadir `'use client'` solo cuando se usen: hooks de estado, eventos onClick, useSearchParams, etc.
- El formulario de contacto y el BoldPaymentButton son Client Components

### Imágenes en heroes con overlay oscuro
```tsx
<section className="relative w-full overflow-hidden ...">
  <Image src="..." fill className="object-cover z-0" priority sizes="100vw" />
  <div className="absolute inset-0 bg-gray-900/60 z-10" />
  <div className="relative z-20 ...">
    {/* contenido */}
  </div>
</section>
```

---

## Variables de entorno requeridas

```
# Resend (correos)
RESEND_API_KEY=re_...

# Bold (pagos) — tres variables distintas con propósitos distintos
NEXT_PUBLIC_BOLD_API_KEY=...   # pública, accesible en el cliente (abre el modal)
BOLD_SECRET_KEY=...            # genera el hash de integridad del botón de pago
BOLD_WEBHOOK_SECRET=...        # verifica la firma de las notificaciones del webhook

# Contentful (blog, ✅ conectado — usado en lib/contentful.ts)
CONTENTFUL_SPACE_ID=...
CONTENTFUL_DELIVERY_ACCESS_TOKEN=...   # para contenido publicado (producción)
CONTENTFUL_PREVIEW_ACCESS_TOKEN=...    # para borradores (opcional, útil en desarrollo)

# Supabase (base de datos, ✅ conectado — usado en lib/supabase.ts)
SUPABASE_URL=...                       # Project URL (Settings → API)
SUPABASE_SERVICE_ROLE_KEY=...          # service_role (secreta, SOLO servidor, salta el RLS)
```

---

## 🚀 Despliegue a producción — variables y checklist

> Sección de referencia para no olvidar nada al pasar de pruebas a producción. **Nada de esto está hecho aún**; es un recordatorio. Las variables de entorno de Vercel se configuran en **Project → Settings → Environment Variables**, y cada una se puede asignar a tres entornos: **Production** (rama `main`), **Preview** (otras ramas/PRs) y **Development** (`vercel dev`). `.env.local` es solo para tu máquina y no se sube al repo.

### A) Variables que cambian de valor entre entornos (test/dev → producción)

| Variable | Test / Dev | Producción | Notas |
|---|---|---|---|
| `NEXT_PUBLIC_BOLD_API_KEY` | identity key **de pruebas** | identity key **de producción** | Pública (identifica el comercio). Bold tiene versión test y prod de cada llave |
| `BOLD_SECRET_KEY` | secret key **de pruebas** | secret key **de producción** | Privada, solo servidor. Genera el hash de integridad del botón |
| `BOLD_WEBHOOK_SECRET` | string vacío `''` | secret key **de producción** | ⚠️ Según la doc de Bold, la firma del webhook usa **la misma secret key de integración** (no una llave aparte). En modo test la firma se calcula con **clave vacía**. Verificar en el panel de Bold si tu cuenta expone un secreto de webhook dedicado o si hay que usar el `BOLD_SECRET_KEY` de producción |
| `RESEND_API_KEY` | key de pruebas | key de producción con permiso **solo de envío** (`sending_access`), idealmente restringida al dominio verificado | Principio de mínimo privilegio: limita el daño si se filtra |
| `SUPABASE_URL` | proyecto Supabase **dev** | proyecto Supabase **prod** (otro distinto) | Proyectos separados para no mezclar pagos de prueba con reales |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role del proyecto dev | service_role del proyecto prod | Secreta, solo servidor |
| `CONTENTFUL_DELIVERY_ACCESS_TOKEN` | (puede ser el mismo) | token **dedicado a producción** | Recomendado un token por entorno para poder revocarlos por separado |
| `CONTENTFUL_SPACE_ID` | mismo space | mismo space | Un solo space; si en el futuro usas *environments* de Contentful (master vs sandbox), cambiaría |

> **Regla general por integración:** crea **una API key distinta por entorno** siempre que el servicio lo permita (Resend, Contentful, Supabase). Si una se filtra, revocas solo esa y no tumbas todo.

### B) Checklist de código/config antes de subir a PRO

**Correos (Resend)** — requiere **verificar el dominio** en Resend (añadir registros DNS SPF/DKIM/DMARC). Hasta entonces solo se puede enviar desde `onboarding@resend.dev` y solo al correo de la cuenta:
- [ ] `app/api/contacto/route.ts`: cambiar `from: 'Acme <onboarding@resend.dev>'` → `'Daniela Vargas <hola@psicologadanivargas.com>'`
- [ ] `app/api/contacto/route.ts`: cambiar el `to:` hardcodeado `mottajuandiego.work@gmail.com` → correo real de Daniela
- [ ] `app/api/webhooks/bold/route.ts`: mismo cambio de `from:`
- [ ] `app/api/webhooks/bold/route.ts`: la variable `payerEmail` está **forzada** a `mottajuandiego.work@gmail.com` en vez de `paymentData.payer_email`. Tras verificar el dominio, usar el correo real del comprador para que reciba su guía
- [ ] Crear una API key de Resend de solo envío para producción

**Pagos (Bold)**:
- [ ] `app/api/webhooks/bold/route.ts`: **quitar el bypass de simulación** (`if (!signature) { ...permitir ejecución temporal... }`). En producción Bold **sí** envía la firma `x-bold-signature` y la verificación debe ser obligatoria; un webhook sin firma debe rechazarse
- [ ] Configurar en el panel de Bold la **URL del webhook de producción** apuntando al dominio real
- [ ] Subir las **llaves de producción** de Bold (identity + secret) a las env vars de Vercel
- [ ] **PDFs de las guías:** los correos del webhook tienen URLs de descarga placeholder (`https://tudominio.com/links-secretos/...` y varios `href="..."` vacíos en GUIA-AMOR y GUIA-HABLAR). Subir los PDFs reales (Contentful Media) y poner las URLs definitivas

**Base de datos (Supabase)**:
- [ ] Crear el **proyecto Supabase de producción** y correr en él el mismo SQL de la tabla `payments`
- [ ] Poner `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` de ese proyecto **solo** en el entorno *Production* de Vercel

**Contentful**:
- [ ] Configurar `CONTENTFUL_SPACE_ID` y `CONTENTFUL_DELIVERY_ACCESS_TOKEN` en Vercel (sin ellas, el build de producción del blog falla)
- [ ] Asegurarse de que los posts estén en estado **Published** (la Delivery API no devuelve borradores)

**Dominio / Vercel**:
- [ ] Apuntar el dominio propio a Vercel (DNS)
- [ ] Añadir los registros DNS de verificación de dominio de Resend
- [ ] Hacer `git push origin main` (el merge a `main` está hecho en local pero no empujado; `main` dispara deploy de producción en Vercel)
- [ ] Revisar que las páginas `pago-completado` / `pago-rechazado` (noindex) y `verificar-pago` funcionan con el dominio real

**Fuentes consultadas:** [Resend – Managing Domains](https://resend.com/docs/dashboard/domains/introduction), [Bold – Llaves de integración](https://developers.bold.co/pagos-en-linea/llaves-de-integracion), [Bold – Webhook](https://developers.bold.co/webhook), [Bold – Ambiente de pruebas](https://www.developers.bold.co/pagos-en-linea/boton-de-pagos/ambiente-pruebas), [Contentful – Authentication](https://www.contentful.com/developers/docs/references/authentication/).

---

## 📋 Modificaciones solicitadas por el cliente (pendientes — reunión 10 jun 2026)

> Recopiladas de la reunión + doc del cliente. Referencias: carpeta de diseño del cliente (Google Drive) y ejemplo de página de pagos `psicologamariapaula.com/pagos/`.
>
> **Estado:** ✅ **Fase 1 (contenido)**, ✅ **Fase 2 (guías dinámicas + PDF)** y ✅ **Fase 3 (checkout +5%)** implementadas. Pendientes: **newsletter** y **generador de links de pago dinámicos con auth** (Supabase Auth).

### Contenido — Página de inicio
- [x] **Hero / texto de apertura:** "Transformamos tu vida con humanidad y claridad" + línea de apoyo. ✅ Hecho.
- [x] **Nueva sección "Tu proceso para sanar y crecer"** como **segundo bloque** (conexión emocional, espacio sin juicios). ✅ Hecho.
- [x] **Texto intro de servicios:** enfoque pain-point→solución ("Cada proceso es único…"). ✅ Hecho (hero de `/servicios` y encabezado "¿Cómo puedo ayudarte?").
- [x] **Tres tipos de terapia:** ✅ Hecho. La card de inicio "Terapia Online" se cambió por **"Terapia para niños y adolescentes"** y se actualizó la descripción de infantojuvenil.

### Contenido — Página de servicios
- [x] **Nueva sección "Nuestro equipo terapéutico":** ✅ Hecho, en formato de 3 cards (Selección cuidadosa / Acompañamiento a tu medida / Cerca de ti) + lead, con el texto del cliente.

### Precios / Paquetes (páginas de servicio)
- [x] **Quitar los precios** de la web; CTA → **WhatsApp**. ✅ Hecho en las 3 landings (se muestra el nº de sesiones en vez del precio). ⚠️ Confirmado: las citas SOLO se agendan por WhatsApp (sin pago online de sesiones) → **cancelado** el pendiente de `BoldPaymentButton` en páginas de servicio.
- [x] **Renombrar paquetes:** "Sesión Claridad" (1), "Paquete Impulso" (4), "Paquete Transformación" (8). ✅ Hecho en las 3 landings.
- [x] **Descripciones nuevas** por paquete. ✅ Aplicadas con el texto exacto del cliente en **terapia individual**. ⚠️ Pareja e infantojuvenil conservan de momento su copy propia tailored; replicar el mismo esquema si el cliente lo pide.

### Guías digitales — dinámicas desde Contentful
- [x] **Guías dinámicas** ✅ Hecho. Content type `guia` (campos: title, slug, description, price, coverImage, pdf, benefits, idealFor, emoji, order). `lib/contentful.ts` expone `getAllGuides`/`getGuideBySlug`/`getGuideByReference`. `app/guias/page.tsx` es Server Component que mapea las guías; el cliente edita precio/contenido sin tocar código. **El `slug` hace de prefijo de pago** (orderId de Bold), no hay campo `orderPrefix`.
- [x] **Entrega de PDF por correo** ✅ Hecho. El webhook de Bold busca la guía por la referencia (`getGuideByReference`) y manda el enlace real del `pdf` de Contentful + el título. `product_prefix` en Supabase guarda el slug. *(En PRO sigue pendiente el `to` real del comprador y el dominio verificado en Resend.)*
- ✅ **Capa gratuita Contentful:** holgada para esto. Límites free relevantes: ~48 content types (usamos 1 `blogPost`, sumar `guia` = 2), 25.000 records, y ~0.85 TB/mes de ancho de banda de assets (CDN). Unas pocas guías + sus PDFs no se acercan a ningún límite. ⚠️ Las URLs de assets de Contentful son **públicas** (no autenticadas, pero difíciles de adivinar): valen para "enlace en el correo", pero quien tenga el link puede reenviarlo. Aceptable de momento; si se quiere proteger, habría que servir el PDF tras verificar el pago (fase futura).

### Newsletter (la clienta la quiere) — **Opción A elegida: Resend Audiences + Broadcasts**
- [ ] `NewsletterForm` → `/api/newsletter` → alta en una **Audience de Resend** (gestiona baja/unsubscribe y consentimiento automáticamente). Opcional: copia del email en Supabase (`subscribers`).
- [ ] Envío de cada entrada del blog como **Broadcast**: manual desde el panel de Resend, o automatizado con un **webhook de Contentful "al publicar"** → API propia → Broadcast con el contenido del post.
- ⚠️ **Capa gratuita Resend:** incluye **1.000 contactos de marketing** y dominio verificado, pero el **tope de 100 emails/día** es el cuello de botella: un envío a >100 suscriptores en un día puede requerir el plan de pago (~$20/mes). Free sirve para arrancar; al crecer la lista, presupuestar el upgrade. *(Los correos transaccionales —contacto, entrega de guía— comparten ese 100/día y 3.000/mes; uso actual mínimo.)*

### Legal / Privacidad
- [x] **Página de Política de Privacidad** creada en `app/politica-de-privacidad/page.tsx` y enlazada desde el footer. ✅ Hecho como **borrador** adaptado a la Ley 1581/2012 (marcado en la propia página como pendiente de **validación legal** por la clienta/abogado). Posible ampliación futura: términos de productos digitales (guías) y política de reembolso.

### Técnico / correos
- [x] **Correo oficial `hola@psicologadanivargas.com`** en el footer (quitado el Gmail personal). ✅ Hecho. *(El uso del correo real en los envíos de Resend sigue ligado a verificar dominio → PRO.)*
- [x] Quitar `console.log` de depuración del webhook de Bold. ✅ Hecho.
- [ ] (PRO) Resend `from`/`to` reales, `payerEmail` real del comprador, quitar bypass de firma del webhook.

### Pagos — mejoras solicitadas (fuera del doc original, petición posterior)

**a) Página intermedia de desglose antes de Bold (guías):** ✅ Hecho.
- [x] `app/checkout/[slug]/page.tsx`: muestra **precio base + 5% comisión Bold = total** y el botón de Bold cobra el total. En `/guias` el botón "Comprar" ya no abre el modal: navega a `/checkout/[slug]`. La comisión es `lib/pricing.ts` → `BOLD_COMMISSION_RATE` (fuente única; `commission = round(base·5%)`, `total = base + commission`). Supabase guarda el **total** cobrado.
- ⚠️ Negocio/legal **(pendiente de confirmar)**: trasladar la comisión del procesador al cliente va transparente y desglosado; confirmar que es aceptable para el método/jurisdicción.

**b) Generador de links de pago dinámicos (importe libre) — solo usuarios autorizados:**
- [ ] Página **privada** donde un usuario autorizado introduce un **importe** (y concepto) y **genera un link de pago** para enviar por WhatsApp; al abrirlo, el cliente paga ese importe por Bold.
- **Enfoque recomendado (reutiliza la integración actual):** no generar un link "crudo" de Bold, sino un **link a una página propia** `/pago/[id]`. El importe se guarda **en BD** (tabla `payment_links`: id, importe, concepto, creado_por, estado, fecha) y el link referencia el `id` (no el importe en la URL → no manipulable). La página lee el importe de BD, genera el hash y abre Bold.
- **Autenticación (lo nuevo):** sí implica **añadir auth**, pero **no** hay que guardar contraseñas a mano. Recomendado **Supabase Auth** (ya tenemos Supabase; incluido en su capa gratuita): credenciales hasheadas, login email/contraseña o magic-link; se crean los pocos usuarios autorizados y se protege la ruta con **middleware de Next.js** (sesión + allowlist de correos/rol). Alternativas: Auth.js/NextAuth, Clerk/Auth0 (SaaS), o Basic Auth con contraseña compartida (mínimo esfuerzo, menos seguro).
- Implica: Supabase Auth, tabla `payment_links`, páginas `/login` + admin protegida + `/pago/[id]` pública, middleware, y (opcional) prefijo de referencia propio en el webhook (p. ej. `LINK-`).

---

## Estado actual del proyecto

| Funcionalidad | Estado |
|---|---|
| Navbar + Footer responsive | ✅ Completo |
| Botón flotante WhatsApp | ✅ Completo |
| Página de Inicio | ✅ Completo |
| Página Sobre Mí | ✅ Completo |
| Hub de Servicios | ✅ Completo |
| Landings de embudo (4 servicios) | ✅ Completo |
| Guías Digitales (UI) | ✅ Completo |
| Blog (Contentful) | ✅ Conectado a CMS real (listado + artículo + Rich Text) |
| Página de Contacto | ✅ Completo |
| Formulario → correo (Resend) | ✅ Funcionando |
| Pasarela Bold (modo pruebas) | ✅ Funcionando |
| Webhook Bold → correos | ✅ Funcionando (modo simulación, omite firma si no viene) |
| Páginas pago-completado / pago-rechazado | ✅ Completo |
| Vercel Analytics | ✅ Instalado |
| Contentful → Blog real | ✅ Completo — `lib/contentful.ts` + build genera páginas estáticas por slug |
| Newsletter del blog (envío real) | 🔲 Pendiente — `NewsletterForm` solo es UI (preventDefault) |
| Supabase (base de datos) | ✅ Conectada — tabla `payments`; el webhook de Bold registra cada pago |
| PDFs guías en Contentful Media | 🔲 Pendiente |
| BoldPaymentButton en páginas de servicios | 🔲 Pendiente — actualmente solo en /guias |
| Bug: descriptions duplicadas en guias/page.tsx | ✅ Corregido — cada guía manda su nombre real |
| Correos Resend → correo real de Daniela | 🔲 Pendiente — hardcodeado a correo de dev |
| Dominio propio (DNS) | 🔲 Pendiente — dominio ya existente, solo falta apuntarlo a Vercel |
| Llaves Bold de producción | 🔲 Pendiente — acceso a la cuenta ya disponible, falta pasar webhook a clave real y subir a env vars en Vercel |
