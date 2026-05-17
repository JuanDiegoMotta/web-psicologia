# CLAUDE.md — Web Clínica Psicóloga Daniela Vargas

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
- **CMS Blog:** Contentful (pendiente de conectar). Llaves: `CONTENTFUL_SPACE_ID` y `CONTENTFUL_DELIVERY_ACCESS_TOKEN`
- **Base de datos:** Supabase (planeada, no implementada aún)

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
│   ├── page.tsx                      # Listado de posts (mock data, pendiente Contentful)
│   └── [slug]/page.tsx               # Artículo individual (async, await params)
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

| Uso | Valor |
|---|---|
| Fondo principal (crema) | `#FFF5F3` |
| Navbar y fondos suaves | `bg-[#FFF5F3]` / `bg-[#FFF5F3]/50` |
| Rosa principal (CTAs, highlights) | `pink-500` / `pink-400` |
| Fondo oscuro (footer, secciones dark) | `#2D313A` / `gray-800` |
| Texto principal | `gray-800` |
| Texto secundario | `gray-600` |
| Bordes y separadores | `pink-100` / `gray-100` |
| Esquinas | `rounded-3xl` (tarjetas grandes), `rounded-2xl` (medias), `rounded-full` (botones) |

**Tipografía:** Fuente Inter. Títulos usan `font-serif` para contraste elegante.

**Gradientes:** Usar `bg-gradient-to-b from-pink-100/40 via-[#FFF5F3]/60 to-white` para héros sin imagen de fondo.

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

**⚠️ Bug conocido en `app/guias/page.tsx`:** los tres `BoldPaymentButton` tienen `description="Amor en equilibrio"` en todos los casos — es un copy-paste pendiente de corregir. Los `orderPrefix` sí son correctos.

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

## CMS Blog — Contentful (Pendiente de conectar)

**Estado:** Cuenta creada, Content Type `blogPost` definido con campos:
- `title` (Short text)
- `slug` (Short text, tipo Slug)
- `coverImage` (Media)
- `content` (Rich Text)

**Variables de entorno necesarias:**
```
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
```

**Próximos pasos:**
1. Instalar SDK: `npm install contentful`
2. Crear cliente en `lib/contentful.ts`
3. Reemplazar el array `MOCK_POSTS` en `app/blog/page.tsx` con fetch real a Contentful
4. Hacer lo mismo en `app/blog/[slug]/page.tsx`

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

# Contentful (blog, pendiente)
CONTENTFUL_SPACE_ID=...
CONTENTFUL_ACCESS_TOKEN=...
```

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
| Blog (mock data) | ✅ UI completa, datos falsos |
| Página de Contacto | ✅ Completo |
| Formulario → correo (Resend) | ✅ Funcionando |
| Pasarela Bold (modo pruebas) | ✅ Funcionando |
| Webhook Bold → correos | ✅ Funcionando (modo simulación, omite firma si no viene) |
| Páginas pago-completado / pago-rechazado | ✅ Completo |
| Vercel Analytics | ✅ Instalado |
| Contentful → Blog real | 🔲 Pendiente |
| Supabase (base de datos) | 🔲 Pendiente |
| PDFs guías en Contentful Media | 🔲 Pendiente |
| BoldPaymentButton en páginas de servicios | 🔲 Pendiente — actualmente solo en /guias |
| Bug: descriptions duplicadas en guias/page.tsx | 🐛 Pendiente — todos dicen "Amor en equilibrio" |
| Correos Resend → correo real de Daniela | 🔲 Pendiente — hardcodeado a correo de dev |
| Dominio propio (DNS) | 🔲 Pendiente — dominio ya existente, solo falta apuntarlo a Vercel |
| Llaves Bold de producción | 🔲 Pendiente — acceso a la cuenta ya disponible, falta pasar webhook a clave real y subir a env vars en Vercel |
