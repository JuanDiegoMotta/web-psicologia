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
- Variable de entorno usada para verificar firma: `BOLD_WEBHOOK_SECRET` (en prod = mismo valor que `BOLD_SECRET_KEY`; en test/preview = vacío)
- Firma **obligatoria en producción** (`VERCEL_ENV === 'production'`): sin firma → 401. En preview/dev se omite para pruebas manuales del panel de Bold.
- Si Bold envía firma: valida con `BOLD_WEBHOOK_SECRET` usando `crypto.timingSafeEqual`
- Algoritmo: Base64 del rawBody → HMAC-SHA256 → comparar con header `x-bold-signature`
- Correos por env vars (`RESEND_FROM`, comprador real, `ADMIN_NOTIFICATION_EMAILS`) — ya no hardcodeados.

> ⚠️ **GOTCHA del `www` (causa raíz de un fallo real en go-live).** El dominio **canónico** en Vercel es `www.psicologadanivargas.com`; el apex sin `www` responde **308 redirect** hacia el `www`. Un navegador sigue esa redirección, pero **los emisores de webhooks (Bold, Contentful) NO la siguen**: mandan el POST, reciben el 308 y ahí muere → la función **nunca se ejecuta** (ni logs, ni BD, ni correos), aunque el pago sí se cobre. **Regla:** todas las URLs de webhook (Bold, Contentful) deben apuntar al dominio **canónico con `www`**, p. ej. `https://www.psicologadanivargas.com/api/webhooks/bold`. Igual para `SITE_URL`. *(Diagnóstico: un `curl -i` al endpoint muestra `308` en el apex y `401 {"error":"Falta la firma..."}` — la función viva — en el `www`.)*

> ℹ️ **Pago ≠ webhook (son asíncronos).** El cobro se confirma al cliente al instante; el webhook es una notificación servidor-a-servidor **con reintentos**. Puede llegar con **retraso** (segundos o minutos) o reintentarse si falla. Por eso el webhook es **idempotente** por `payment_id` (`upsert onConflict ignoreDuplicates`): un mismo evento repetido no duplica la fila en `payments`. *(Nota: los correos NO están deduplicados aún; un reintento reenvía los correos aunque no duplique la fila.)*

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
# Resend (correos + newsletter)
RESEND_API_KEY=re_...            # full access (crea contactos/segments/broadcasts)
RESEND_SEGMENT_ID=...            # segmento "Newsletter" de Resend (destino del broadcast)
RESEND_FROM=...                  # remitente del dominio verificado, ej. "Dani Vargas <hola@psicologadanivargas.com>" (fallback dev: onboarding@resend.dev)
CONTACT_TO_EMAIL=...             # destinatario del formulario de contacto (correo de Daniela)

# Newsletter — webhook de Contentful "al publicar"
CONTENTFUL_WEBHOOK_SECRET=...    # debe coincidir con el header x-webhook-secret del webhook

# Admin / notificaciones (links de pago + avisos de venta)
ADMIN_ALLOWED_EMAILS=...         # lista separada por comas; correos con acceso a /admin (proxy.ts)
ADMIN_NOTIFICATION_EMAILS=...    # lista separada por comas; reciben el aviso "Nuevo pago recibido"
SITE_URL=...                     # base absoluta para los enlaces del correo (opcional; si falta, se deriva del origen de la petición)

# Bold (pagos) — tres variables distintas con propósitos distintos
NEXT_PUBLIC_BOLD_API_KEY=...   # pública, accesible en el cliente (abre el modal)
BOLD_SECRET_KEY=...            # genera el hash de integridad del botón de pago
BOLD_WEBHOOK_SECRET=...        # verifica la firma del webhook. Bold NO da una llave aparte: en prod = mismo valor que BOLD_SECRET_KEY; en test/preview = vacío

# Contentful (blog, ✅ conectado — usado en lib/contentful.ts)
CONTENTFUL_SPACE_ID=...
CONTENTFUL_DELIVERY_ACCESS_TOKEN=...   # para contenido publicado (producción)
CONTENTFUL_PREVIEW_ACCESS_TOKEN=...    # para borradores (opcional, útil en desarrollo)

# Supabase (base de datos + auth) — modelo de claves de jun 2025 (publishable/secret, NO legacy anon/service_role)
SUPABASE_URL=...                            # Project URL (Settings → API)
SUPABASE_SECRET_KEY=...                     # sb_secret_... (secreta, SOLO servidor, salta el RLS). Usada por lib/supabase.ts
NEXT_PUBLIC_SUPABASE_URL=...                # misma URL, expuesta al cliente para el auth SSR
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...    # sb_publishable_... (pública, respeta RLS). Usada por el cliente de auth (login admin)
```

---

## 🚀 Despliegue a producción — variables y checklist

> Sección de referencia para el paso a producción. **Estado (jun 2026):** dominio configurado (Hostinger → DNS de Vercel + registros de Resend), claves de **producción** ya cargadas en el entorno *Production* de Vercel (Bold, Resend, Supabase, Contentful) y `BOLD_WEBHOOK_SECRET` aclarado (ver tabla A). **Lo que queda es operativo/validación:** subir los PDFs reales de las guías a Contentful, confirmar la comisión +5% y, sobre todo, **pasar la batería de pruebas de producción** (`docs/PLAN-DE-PRUEBAS-PRODUCCION.md`) con un pago real de prueba. Las variables de entorno de Vercel se configuran en **Project → Settings → Environment Variables**, y cada una se puede asignar a tres entornos: **Production** (rama `main`), **Preview** (otras ramas/PRs) y **Development** (`vercel dev`). `.env.local` es solo para tu máquina y no se sube al repo.

### A) Variables que cambian de valor entre entornos (test/dev → producción)

| Variable | Test / Dev | Producción | Notas |
|---|---|---|---|
| `NEXT_PUBLIC_BOLD_API_KEY` | identity key **de pruebas** | identity key **de producción** | Pública (identifica el comercio). Bold tiene versión test y prod de cada llave |
| `BOLD_SECRET_KEY` | secret key **de pruebas** | secret key **de producción** | Privada, solo servidor. Genera el hash de integridad del botón |
| `BOLD_WEBHOOK_SECRET` | string vacío `''` | **mismo valor que `BOLD_SECRET_KEY` de producción** | ✅ Aclarado: Bold **no** expone un secreto de webhook aparte; la firma usa la **misma secret key de integración**. En test/preview la firma se calcula con **clave vacía** (déjala sin valor). Si en prod el webhook diera 400 (firma inválida), revisar el panel de Bold por si esa cuenta sí tuviera un secreto dedicado |
| `RESEND_API_KEY` | key de pruebas | key de producción con permiso **solo de envío** (`sending_access`), idealmente restringida al dominio verificado | Principio de mínimo privilegio: limita el daño si se filtra |
| `SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_URL` | proyecto Supabase **dev** | proyecto Supabase **prod** (idealmente otro distinto) | Proyectos separados evitan mezclar pagos de prueba con reales |
| `SUPABASE_SECRET_KEY` | `sb_secret_...` del proyecto dev | `sb_secret_...` del proyecto prod | Secreta, solo servidor (salta RLS) |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` dev | `sb_publishable_...` prod | Pública (respeta RLS), para el login del admin |
| `CONTENTFUL_DELIVERY_ACCESS_TOKEN` | (puede ser el mismo) | token **dedicado a producción** | Recomendado un token por entorno para poder revocarlos por separado |
| `CONTENTFUL_SPACE_ID` | mismo space | mismo space | Un solo space; si en el futuro usas *environments* de Contentful (master vs sandbox), cambiaría |

> **Regla general por integración:** crea **una API key distinta por entorno** siempre que el servicio lo permita (Resend, Contentful, Supabase). Si una se filtra, revocas solo esa y no tumbas todo.

### B) Checklist de código/config antes de subir a PRO

**Correos (Resend)** — dominio verificado; remitente y destinatarios **por env vars** (ya no hardcodeados):
- [x] `from` unificado vía `RESEND_FROM` en los 3 sitios (contacto, webhook Bold, webhook Contentful).
- [x] **Configurado `RESEND_FROM`** = dirección del dominio verificado en el entorno Production de Vercel.
- [x] **Configurado `CONTACT_TO_EMAIL`** con el correo real de Daniela.
- [x] Webhook de Bold: la guía se envía ya al **correo real del comprador** (`paymentData.payer_email`).
- [ ] (Opcional, seguridad) Crear una API key de Resend de **solo envío** para producción.
- [ ] **Validar en PRO** que llegan de verdad: correo de contacto, entrega de guía (PDF) y aviso al admin (requiere pasar la batería de pruebas).

**Pagos (Bold)**:
- [x] Webhook: la **firma es obligatoria en producción** (`VERCEL_ENV === 'production'`); en preview/dev se permite sin firma para las pruebas manuales del panel de Bold.
- [x] URL del webhook configurada en el panel de Bold apuntando al **dominio canónico con `www`** (`https://www.psicologadanivargas.com/api/webhooks/bold`). ⚠️ El apex sin `www` da 308 y Bold no lo sigue → ver "GOTCHA del `www`".
- [x] **Llaves de producción** de Bold (identity + secret) cargadas en las env vars de Vercel, incl. `BOLD_WEBHOOK_SECRET = BOLD_SECRET_KEY`.
- [x] **PDFs de guías (código):** ya no hay placeholders; el webhook entrega el `pdf` real de la guía desde Contentful.
- [ ] **Subir los PDFs definitivos** de cada guía a Contentful (Media).
- [ ] **Pago real de prueba en PRO** (importe pequeño) verificando que el webhook firmado pasa y registra el pago.

**Base de datos (Supabase)**:
- [ ] (Recomendado) Crear un **proyecto Supabase de producción** separado y correr el SQL de `payments` + `payment_links`. *(Si se reutiliza el mismo proyecto que en dev, dejarlo anotado: pagos de prueba y reales conviven.)*
- [x] `SUPABASE_URL` / `SUPABASE_SECRET_KEY` (modelo nuevo) cargadas en el entorno Production de Vercel.
- [x] **Keep-alive** contra la pausa por inactividad del plan free: workflow `.github/workflows/keep-alive.yml` (GitHub Actions) hace un ping REST a la tabla `payments` lunes y jueves. Requiere los secretos de repo `SUPABASE_URL` y `SUPABASE_KEY` (publishable). *(El keep-alive solo evita pausas futuras; si el proyecto ya está pausado, "Resume project" en el dashboard primero.)*

**Contentful**:
- [x] `CONTENTFUL_SPACE_ID` y `CONTENTFUL_DELIVERY_ACCESS_TOKEN` configurados en Vercel.
- [ ] Asegurarse de que los posts y las guías estén en estado **Published** (la Delivery API no devuelve borradores).

**Dominio / Vercel**:
- [x] Dominio (Hostinger) apuntado a Vercel (DNS) y registros de verificación de Resend añadidos.
- [x] `git push origin main` hecho → deploy de producción disparado.
- [x] **Dominio canónico = `www`.** El apex redirige (308) al `www`. ⚠️ Todas las **URLs de webhooks** (Bold, Contentful) y `SITE_URL` deben usar el `www` — ver "GOTCHA del `www`" en Integración Bold.
- [ ] Revisar **en el dominio real** que `pago-completado` / `pago-rechazado` (noindex) y `verificar-pago` funcionan.

**Fuentes consultadas:** [Resend – Managing Domains](https://resend.com/docs/dashboard/domains/introduction), [Bold – Llaves de integración](https://developers.bold.co/pagos-en-linea/llaves-de-integracion), [Bold – Webhook](https://developers.bold.co/webhook), [Bold – Ambiente de pruebas](https://www.developers.bold.co/pagos-en-linea/boton-de-pagos/ambiente-pruebas), [Contentful – Authentication](https://www.contentful.com/developers/docs/references/authentication/).

---

## 📋 Modificaciones solicitadas por el cliente (pendientes — reunión 10 jun 2026)

> Recopiladas de la reunión + doc del cliente. Referencias: carpeta de diseño del cliente (Google Drive) y ejemplo de página de pagos `psicologamariapaula.com/pagos/`.
>
> **Estado:** ✅ **Las 5 fases de implementación están hechas** — Fase 1 (contenido), Fase 2 (guías dinámicas + PDF), Fase 3 (checkout +5%), Fase 4 (newsletter), Fase 5 (links de pago dinámicos + Supabase Auth). Lo que queda es el **go-live / PRO** (dominio verificado en Resend, llaves de producción de Bold + webhook prod + quitar bypass de firma, PDFs reales de guías, DNS del dominio). Ver "🚀 Despliegue a producción".

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

### Newsletter (la clienta la quiere) — **Resend Segments + Broadcasts** ✅ implementada (envío real pendiente de dominio)
> ⚠️ Resend cambió el modelo (nov 2025): ya no hay "audiences" con `audienceId`; los contactos son globales y se agrupan en **Segments**. Los Broadcasts se envían a un **`segmentId`**. Por eso usamos `RESEND_SEGMENT_ID`, no audience.
- [x] **Captación** ✅ `NewsletterForm` (client, con estados) → `POST /api/newsletter` → `resend.contacts.create({ email, segments:[{id: RESEND_SEGMENT_ID}] })`. Trata "ya suscrito" como éxito. **Funciona en free.**
- [x] **Envío al publicar (cableado)** ✅ Webhook de Contentful (Entry→Publish de `blogPost`, filtrado por content type) → `app/api/webhooks/contentful/route.ts`: verifica header `x-webhook-secret` (`CONTENTFUL_WEBHOOK_SECRET`), obtiene el post (`getPostBySlug`) y hace `resend.broadcasts.create({ segmentId, from, subject, html, send:true })`. Responde siempre 200 (salvo 401) para no reintentar.
- [ ] **Envío REAL del broadcast:** requiere **dominio verificado** en Resend (con `onboarding@resend.dev` no se mandan broadcasts). Al verificarlo, cambiar el `from` (en este webhook + `/api/contacto` + webhook de Bold) a la dirección del dominio. → ligado a PRO.
- **Env vars:** `RESEND_SEGMENT_ID`, `CONTENTFUL_WEBHOOK_SECRET` (en `.env.local` y por entorno en Vercel).
- ⚠️ **Capa gratuita Resend:** **1.000 contactos** + dominio verificado, pero **100 emails/día** es el cuello de botella: enviar a >100 suscriptores/día puede requerir plan de pago (~$20/mes). *(Transaccionales —contacto, guía— comparten ese 100/día y 3.000/mes.)*

### Legal / Privacidad
- [x] **Página de Política de Privacidad** creada en `app/politica-de-privacidad/page.tsx` y enlazada desde el footer. ✅ Hecho y **validada por la clienta** (adaptada a la Ley 1581/2012; ya sin aviso de borrador y con fecha de publicación). Posible ampliación futura: términos de productos digitales (guías) y política de reembolso.

### Técnico / correos
- [x] **Correo oficial `hola@psicologadanivargas.com`** en el footer (quitado el Gmail personal). ✅ Hecho. *(El uso del correo real en los envíos de Resend sigue ligado a verificar dominio → PRO.)*
- [x] Quitar `console.log` de depuración del webhook de Bold. ✅ Hecho.
- [ ] (PRO) Resend `from`/`to` reales, `payerEmail` real del comprador, quitar bypass de firma del webhook.

### Pagos — mejoras solicitadas (fuera del doc original, petición posterior)

**a) Página intermedia de desglose antes de Bold (guías):** ✅ Hecho.
- [x] `app/checkout/[slug]/page.tsx`: muestra **precio base + 5% comisión Bold = total** y el botón de Bold cobra el total. En `/guias` el botón "Comprar" ya no abre el modal: navega a `/checkout/[slug]`. La comisión es `lib/pricing.ts` → `BOLD_COMMISSION_RATE` (fuente única; `commission = round(base·5%)`, `total = base + commission`). Supabase guarda el **total** cobrado.
- ⚠️ Negocio/legal **(pendiente de confirmar)**: trasladar la comisión del procesador al cliente va transparente y desglosado; confirmar que es aceptable para el método/jurisdicción.

**b) Generador de links de pago dinámicos (importe libre) — solo usuarios autorizados:** ✅ Hecho.
- [x] **Auth con Supabase** (`@supabase/ssr`, claves nuevas publishable/secret). `proxy.ts` (convención Next 16, antes `middleware.ts`) protege `/admin/**` con sesión + allowlist `ADMIN_ALLOWED_EMAILS`. `/login` con email+contraseña; usuarios creados a mano en Supabase (signups desactivados).
- [x] **`/admin/pagos`** (protegida): crea el link (importe base + concepto → tabla `payment_links` con `token` aleatorio), lista links recientes, copiar / compartir por WhatsApp.
- [x] **`/pago/[token]`** pública: desglose **base + 5% = total** (reutiliza `lib/pricing.ts`) y paga por Bold (`orderPrefix = LINK-<token>`). **Un solo uso:** se bloquea si el link no está `active`.
- [x] **Webhook:** los pagos `LINK-` marcan el link como `paid` (idempotente, `product_prefix='LINK'`) y mandan **notificación a `ADMIN_NOTIFICATION_EMAILS`** (también en pagos de guía). El importe es **inmutable** (en BD, no en la URL).
- ⚠️ **Prueba en preview/sandbox:** el webhook de Bold **no se autoentrega**; hay que lanzarlo a mano desde el panel de Bold (botón de prueba), y ese evento de test llega con **`amount.total: 0` y campos `XXXX`** (placeholders de Bold). En producción Bold lo llama solo con los datos reales. La fuente de verdad del importe de un link es `payment_links.amount`.

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
| Guías Digitales | ✅ Completo — dinámicas desde Contentful (`getAllGuides`) |
| Checkout con desglose +5% (`/checkout/[slug]`) | ✅ Completo |
| Blog (Contentful) | ✅ Conectado a CMS real (listado + artículo + Rich Text) |
| Página de Contacto | ✅ Completo |
| Formulario → correo (Resend) | ✅ Funcionando (from/to por env vars) |
| Pasarela Bold | ✅ Funcionando (probada en sandbox) |
| Webhook Bold → Supabase + correos | ✅ Funcionando — firma **obligatoria en producción**, registra pago + entrega PDF + avisa al admin |
| Páginas pago-completado / pago-rechazado | ✅ Completo |
| Vercel Analytics | ✅ Instalado |
| Contentful → Blog real | ✅ Completo — `lib/contentful.ts` + build genera páginas estáticas por slug |
| Newsletter (captación + envío al publicar) | ✅ Implementado — `NewsletterForm`→`/api/newsletter` + webhook Contentful→Broadcast. Envío real depende del dominio verificado (✅ configurado), pendiente validar en PRO |
| Supabase (base de datos) | ✅ Conectada — tablas `payments` y `payment_links`; claves nuevas (secret/publishable) |
| Supabase Auth + admin de links de pago | ✅ Completo — `/login`, `/admin/pagos`, `/pago/[token]`, `proxy.ts` protege `/admin/**` |
| Política de privacidad | ✅ Publicada y validada por la clienta |
| PDFs definitivos de guías en Contentful Media | 🔲 Pendiente — subir los archivos reales |
| Citas / sesiones | ✅ Solo por WhatsApp (sin pago online) — `BoldPaymentButton` en servicios **cancelado** |
| Dominio propio + claves de producción | ✅ Configurados en Vercel (DNS, Resend, Bold, Supabase, Contentful) |
| QA de producción (pago real + correos en el dominio) | 🔲 Pendiente — ver `docs/PLAN-DE-PRUEBAS-PRODUCCION.md` |
