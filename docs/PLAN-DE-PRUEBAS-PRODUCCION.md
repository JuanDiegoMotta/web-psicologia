# Plan de pruebas — PRODUCCIÓN (go-live) · Web Psicóloga Dani Vargas

> Checklist para validar el sitio **en el dominio real de producción** (`https://psicologadanivargas.com`) una vez apuntado el DNS y cargadas las claves de producción en Vercel. Es la prueba de "todo terminado" antes de dar el proyecto por entregado.
>
> **Diferencia con [`PLAN-DE-PRUEBAS.md`](PLAN-DE-PRUEBAS.md):** aquel valida la **UI, contenido y responsive** en Preview. Este se centra en lo que **solo se puede comprobar en producción** (claves reales, firma del webhook obligatoria, correos al dominio verificado, pago real, links de un solo uso). Pasa primero el de Preview para la parte visual; aquí no se repite el detalle de maquetación/responsive.
>
> Última actualización: go-live (dominio + claves prod configuradas; pendiente esta validación).

- URL de producción probada: `__________________`
- Fecha / responsable de la prueba: `__________________`

---

## 0. Pre-flight — entorno de producción

- [x] El último deploy de `main` en Vercel está **Ready** (sin errores de build).
- [x] El dominio real resuelve por HTTPS (candado válido, sin aviso de certificado).
- [ ] En **Vercel → Settings → Environment Variables**, todas presentes en el entorno **Production**:
  - [x] `RESEND_API_KEY`, `RESEND_FROM` (dirección del **dominio verificado**), `CONTACT_TO_EMAIL`, `RESEND_SEGMENT_ID`
  - [x] `CONTENTFUL_SPACE_ID`, `CONTENTFUL_DELIVERY_ACCESS_TOKEN`, `CONTENTFUL_WEBHOOK_SECRET`
  - [x] `SUPABASE_URL`, `SUPABASE_SECRET_KEY`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
  - [x] `NEXT_PUBLIC_BOLD_API_KEY` (**producción**), `BOLD_SECRET_KEY` (**producción**), `BOLD_WEBHOOK_SECRET` (= mismo valor que `BOLD_SECRET_KEY` de producción)
  - [x] `ADMIN_ALLOWED_EMAILS`, `ADMIN_NOTIFICATION_EMAILS`, `SITE_URL` (= dominio real)
- [ ] **Resend:** el dominio aparece como **Verified** (registros SPF/DKIM/DMARC en verde).
- [ ] **Bold:** la cuenta está en **modo producción** y la URL del webhook apunta al dominio real (`/api/webhooks/bold`), no a un preview antiguo.
- [ ] **Contentful:** el webhook "al publicar" apunta a `https://<dominio>/api/webhooks/contentful` con el header `x-webhook-secret` correcto.
- [ ] **Supabase:** existen las tablas `payments` y `payment_links` en el proyecto cuya URL/clave están en Production, y hay al menos un usuario admin creado (signups desactivados).
- [ ] **Keep-alive Supabase:** el workflow `.github/workflows/keep-alive.yml` corrió en **verde** (pestaña Actions → "Keep Supabase Alive"), con los secretos de repo `SUPABASE_URL` y `SUPABASE_KEY` configurados. Evita que el plan free pause el proyecto por inactividad.

---

## 1. Humo general en el dominio real

- [ ] Cargan sin error 500 ni pantalla en blanco: `/`, `/sobre-mi`, `/servicios` (+ las 4 landings), `/guias`, `/blog`, `/contacto`, `/politica-de-privacidad`.
- [ ] Navbar, footer y botón flotante de WhatsApp aparecen en todas.
- [ ] El footer muestra el correo `hola@psicologadanivargas.com` y el enlace a Política de privacidad funciona.
- [ ] Sin errores en la consola del navegador en producción.
- [ ] Vercel Analytics registra la visita (aparece en el panel pasados unos minutos).

> Para el detalle visual/responsive/contraste, usar `PLAN-DE-PRUEBAS.md` (secciones 1, 2, 8, 9).

---

## 2. Formulario de contacto → correo real

Página `/contacto`:
- [ ] Envío válido → estado de carga + mensaje de éxito.
- [ ] **Llega el correo al buzón real de Daniela** (`CONTACT_TO_EMAIL`), no a la cuenta de dev.
- [ ] El remitente es el del **dominio verificado** (`RESEND_FROM`), no `onboarding@resend.dev`.
- [ ] El correo no cae en spam (revisar carpeta de no deseado la primera vez).
- [ ] El correo contiene todos los datos (nombre, email, celular, edad, servicio, motivo).

---

## 3. Guías + checkout con desglose +5%

Para **cada** guía publicada en Contentful:
- [ ] Aparece en `/guias` con imagen, título, descripción y **precio** reales (vienen de Contentful).
- [ ] "Comprar" navega a `/checkout/[slug]` (no abre el modal directamente).
- [ ] El checkout muestra el desglose **base + 5% comisión = total** y el total cuadra con `lib/pricing.ts`.
- [ ] El botón de Bold abre el modal con el **total** (base + comisión) y la **descripción correcta** de esa guía.

---

## 4. Pago REAL de prueba (Bold producción) — la prueba crítica

> En producción Bold llama al webhook **solo y con firma**. Hacer **un pago real de importe pequeño** (puede reembolsarse luego) con una guía de prueba barata o un link de pago de bajo importe.

- [ ] El pago se completa y redirige a `/verificar-pago?...=approved` → `/pago-completado`.
- [ ] Un pago rechazado (si se puede forzar) redirige a `/pago-rechazado`.
- [ ] **Webhook firmado:** en los logs de la función `api/webhooks/bold` (Vercel → Logs) el evento entra y responde `200`, **sin** caer en el 401 de "falta firma" ni en el 400 de "firma inválida". *(Si da 400 → `BOLD_WEBHOOK_SECRET` no coincide con la clave con la que Bold firma; revisar.)*
- [ ] Se inserta **una fila** en `payments` (Supabase) con `status='approved'`, `payment_id`, `reference`, `product_prefix`, `amount` = **total real cobrado** (no 0), `payer_email` real, `currency='COP'`.
- [ ] Reintento del mismo `payment_id` → **no duplica** la fila (idempotencia).
- [ ] **Compra de guía:** llega al **correo del comprador** el email con el enlace de descarga del **PDF real** (el subido a Contentful), no un placeholder.
- [ ] Llega el **aviso "💰 Nuevo pago recibido"** a `ADMIN_NOTIFICATION_EMAILS` con concepto, importe, comprador y referencia.
- [ ] (Limpieza) Anular/reembolsar el pago de prueba en el panel de Bold si procede.

---

## 5. Links de pago dinámicos + admin (Supabase Auth)

**Login / acceso** (`/admin/pagos`):
- [ ] Como anónimo, `/admin/pagos` redirige a `/login`.
- [ ] Un correo **fuera** de `ADMIN_ALLOWED_EMAILS` no puede entrar (aunque tenga usuario en Supabase).
- [ ] Un correo **de la allowlist** entra con email+contraseña y ve el panel.

**Creación y pago del link:**
- [ ] Crear un link (importe base + concepto) genera una fila en `payment_links` con `token` y `status='active'`, y muestra la URL `/pago/[token]`.
- [ ] Copiar / compartir por WhatsApp funciona.
- [ ] `/pago/[token]` **como anónimo** muestra el desglose **base + 5% = total** (mismo cálculo que las guías) y el concepto correcto.
- [ ] Pagar ese link (importe pequeño real) → `/pago-completado`; el webhook marca el link como `paid` y manda el aviso al admin.
- [ ] **Un solo uso:** tras pagarlo (o si está `paid`), volver a abrir `/pago/[token]` muestra "ya no está disponible" y **no** deja pagar otra vez.
- [ ] **Importe inmutable:** manipular el importe en la URL no cambia lo que se cobra (la fuente de verdad es `payment_links.amount`).

---

## 6. Newsletter (Resend Segments + Broadcasts)

> El envío real de broadcasts **solo** funciona con dominio verificado (✅ ya configurado). Probar con cuidado: cada envío consume del cupo (100 emails/día en free).

**Captación:**
- [ ] Suscribirse desde el `NewsletterForm` (final del blog) → mensaje de éxito.
- [ ] El contacto aparece en el **Segment** de Resend (`RESEND_SEGMENT_ID`).
- [ ] Volver a suscribir el mismo correo → se trata como éxito (no error feo).

**Envío al publicar:**
- [ ] Publicar (o despublicar+publicar) un post de prueba en Contentful dispara el webhook `/api/webhooks/contentful` (verlo en los logs, responde 200).
- [ ] Se crea y **envía** un Broadcast; llega el correo a la dirección suscrita, con el remitente del dominio y el enlace al artículo correcto (`SITE_URL`).
- [ ] Un POST al webhook sin/with header `x-webhook-secret` incorrecto → 401 (no envía).

---

## 7. Blog (Contentful en producción)

- [ ] `/blog` lista solo posts **Published**, orden por fecha descendente, con portada, categoría, fecha (es-CO) y tiempo de lectura.
- [ ] Un artículo abre por su slug; Rich Text completo (encabezados, listas, citas, **imágenes embebidas**, enlaces); slug inexistente → 404.
- [ ] Tras publicar/editar en Contentful, el cambio se ve (recordar caché de ~1h).

---

## 8. SEO / seguridad / técnico

- [ ] `<title>` y `<meta description>` correctos por página; favicon visible.
- [ ] `/pago-completado`, `/pago-rechazado` y `/admin/**` con **noindex**; acceso directo a páginas de pago sin venir del flujo se comporta como se espera (protección por referer).
- [ ] `robots`/`sitemap` (si existen) apuntan al dominio real, no a `*.vercel.app`.
- [ ] **No** se filtran secretos en el cliente: en el HTML/JS de producción no aparece `BOLD_SECRET_KEY`, `SUPABASE_SECRET_KEY` ni `RESEND_API_KEY` (solo las `NEXT_PUBLIC_*`).
- [ ] Sin `console.log` de depuración con datos sensibles en producción.
- [ ] Las páginas/recursos del antiguo dominio o preview no quedan enlazadas.

---

## 9. Post-lanzamiento (primeras 24-48h)

- [ ] Revisar los **logs de las funciones** (`/api/contacto`, `/api/webhooks/bold`, `/api/webhooks/contentful`, `/api/admin/payment-links`) por errores recurrentes.
- [ ] Confirmar que el **primer pago real de un cliente** se registró en `payments` y disparó los correos.
- [ ] Vigilar el cupo de **Resend** (100 emails/día / 3.000/mes en free) si la newsletter crece.
- [ ] Tener claro el procedimiento de **reembolso/anulación** en Bold por si un cliente lo pide.

---

## Pendientes / dependencias conocidas (no son fallos)

- PDFs definitivos de las guías: deben estar subidos a Contentful (Media) y publicados antes de vender.
- Comisión +5% trasladada al cliente: pendiente de **confirmación de negocio/legal**.
- (Recomendado) Proyecto Supabase **separado** para producción; si se reutiliza el de dev, conviven pagos de prueba y reales.
- (Opcional, seguridad) API key de Resend de **solo envío** para producción.
