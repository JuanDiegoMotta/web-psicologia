# Plan de pruebas — Web Psicóloga Dani Vargas

> Batería de pruebas manuales para ejecutar sobre un **deployment de Preview de Vercel** (o en local con `npm run dev`) antes de dar por buena una versión. Marca cada casilla al validar. Última actualización: sesión de rebrand + Supabase + Contentful.

## 0. Pre-requisitos del entorno

- [ ] El deployment de Preview compila sin errores (revisar logs de build en Vercel).
- [ ] Variables de entorno presentes en el entorno que se prueba (ver `CLAUDE.md` → "Despliegue a producción"):
  - [ ] `CONTENTFUL_SPACE_ID`, `CONTENTFUL_DELIVERY_ACCESS_TOKEN` (si faltan, **el build falla**).
  - [ ] `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.
  - [ ] `RESEND_API_KEY`.
  - [ ] `NEXT_PUBLIC_BOLD_API_KEY`, `BOLD_SECRET_KEY`, `BOLD_WEBHOOK_SECRET`.
- [ ] Anotar la URL de Preview que se está probando: `__________________`

---

## 1. Layout global (todas las páginas)

**Navbar**
- [x] Sticky: se mantiene arriba al hacer scroll.
- [x] Logo (mariposa) se ve en **verde eucalipto** (no coral) y enlaza a `/`.
- [x] Enlaces: Inicio, Sobre mí, Servicios (con submenú), Guías digitales, Blog, Contacto.
- [x] Submenú de "Servicios" despliega al hover con las 4 landings.
- [x] Botón "Contacto" destacado (oscuro) y clicable.
- [x] Responsive: en móvil aparece el menú hamburguesa y abre/cierra correctamente.

**Footer**
- [x] Fondo oscuro (`tinta`) con cabeceras "Sígueme en mis redes" / "Escríbeme" **legibles** (verde claro salvia).
- [x] Enlaces de redes (Facebook, Instagram) abren en pestaña nueva y van a los perfiles correctos.
- [x] Correo mostrado correcto: `danielavargaspsicologa@gmail.com`.
- [x] Logos de pago (Bancolombia, Daviplata, PayPal, Nequi, PSE) se ven en blanco y con hover.
- [x] Enlace "Política de privacidad" (de momento `#`, anotar como pendiente).

**Botón flotante de WhatsApp**
- [x] Visible abajo-derecha en todas las páginas, por encima del contenido.
- [x] Abre chat de WhatsApp al número correcto.

**Marca / contraste (revisión visual rápida en cada página)**
- [x] No queda **nada en rosa/coral** (salvo assets de imagen pendientes: `fondoRosa.png`, SVGs decorativos, "cerebros" del hero del blog).
- [x] Texto de acento verde legible: oscuro sobre fondo claro, claro (salvia) sobre fondo oscuro.
- [x] Botones primarios: verde `eucalipto-dark` + texto blanco, hover más oscuro.

---

## 2. Páginas (contenido y enlaces)

**Inicio (`/`)**
- [x] Vídeo de hero carga y reproduce.
- [x] Todas las secciones renderizan sin solaparse.
- [x] CTAs llevan a las páginas correctas.

**Sobre mí (`/sobre-mi`)**
- [x] Imágenes cargan (sin recuadros rotos).
- [x] Sección oscura "El equipo" legible.

**Hub de Servicios (`/servicios`)**
- [x] Las 4 tarjetas enlazan a sus landings.
- [x] Tarjeta oscura "100% Online" legible.

**Landings de servicio** (`/servicios/terapia-individual`, `/terapia-de-pareja`, `/terapia-infantojuvenil`, `/empresas`)
- [x] Hero con imagen + overlay; eyebrow y título legibles.
- [x] Listas de beneficios con checks verdes legibles.
- [x] Tarjetas de precio: precios correctos en COP; tarjeta destacada resalta.
- [x] Botones secundarios (salvia) y círculos de paso legibles.
- [x] Enlaces de WhatsApp con el mensaje pre-rellenado correcto.

**Guías digitales (`/guias`)**
- [x] Las 3 guías muestran imagen, título y descripción correctos.
- [x] Botón de pago Bold en cada guía (ver sección 4).
- [x] CTA "Ver catálogo" hace scroll arriba.

---

## 3. Formulario de contacto → correo (Resend)

Página `/contacto`:
- [ ] Todos los campos tienen placeholder y los obligatorios están marcados.
- [ ] Enviar con campos vacíos → validación del navegador impide el envío.
- [ ] Envío válido → estado de carga y mensaje de éxito.
- [ ] **Llega el correo** a la bandeja configurada (en plan free Resend: `mottajuandiego.work@gmail.com`).
- [ ] El correo contiene los datos enviados (nombre, contacto, mensaje).
- [ ] Caso de error (p. ej. API key inválida) → mensaje de error controlado, no pantallazo.

---

## 4. Pagos Bold (sandbox) + redirecciones

Para **cada** guía (`GUIA-HABLAR`, `GUIA-CONEXION`, `GUIA-AMOR`):
- [ ] Pulsar el botón de pago → se genera el hash (`/api/pagos/hash`) y abre el modal de Bold.
- [ ] El modal muestra el **importe** y la **descripción correctos** (¡ya no todos dicen "Amor en equilibrio"!).
- [ ] Pago aprobado (tarjeta de prueba) → redirige a `/verificar-pago?...=approved` → `/pago-completado`.
- [ ] Pago rechazado → redirige a `/pago-rechazado`.
- [ ] `/pago-completado` y `/pago-rechazado`: contenido correcto y `noindex` (revisar `<meta>` / cabeceras).
- [ ] Acceder a `/pago-completado` directamente (sin venir de pago) → comportamiento esperado (protección por referer).

---

## 5. Webhook de Bold → Supabase + correo

Simular evento (o pago real en sandbox) contra `/api/webhooks/bold`:
- [ ] `SALE_APPROVED` responde `200 {received:true}` rápido.
- [ ] Se inserta **una fila** en la tabla `payments` de Supabase con: `event_type`, `payment_id`, `reference`, `product_prefix` correcto según la guía, `amount`, `payer_email`, `status='approved'`, `raw_payload`.
- [ ] Reenviar el **mismo** `payment_id` → **no** se duplica la fila (idempotencia por `upsert`).
- [ ] `SALE_REJECTED` → fila con `status='rejected'`.
- [ ] Llega el correo de entrega de la guía (según prefijo) — revisar asunto y enlace.
- [ ] Si Supabase fallara, el webhook **igual responde 200** y manda el correo (no rompe).
- [ ] (Producción) Con firma `x-bold-signature` válida pasa; con firma inválida → 400. *(En sandbox el bypass de simulación sigue activo — ver checklist de producción.)*

> Comando de simulación local (sin firma, modo simulación):
> ```bash
> curl -X POST <URL>/api/webhooks/bold -H "Content-Type: application/json" \
>   -d '{"id":"evt_test","type":"SALE_APPROVED","data":{"payment_id":"pay_test_REF","amount":{"total":150000},"payer_email":"test@example.com","metadata":{"reference":"GUIA-CONEXION-TEST"}}}'
> ```

---

## 6. Blog (Contentful)

**Listado (`/blog`)**
- [ ] Se listan los posts **publicados** (los draft NO deben aparecer).
- [ ] Orden por fecha descendente (más reciente primero).
- [ ] Cada tarjeta: imagen de portada carga, categoría, fecha formateada (es-CO) y tiempo de lectura.
- [ ] Caja de newsletter al final (solo UI por ahora — ver pendientes).

**Artículo (`/blog/[slug]`)**
- [ ] Cada post abre por su slug; slug inexistente → 404.
- [ ] Imagen hero carga.
- [ ] **Rich Text** renderiza bien: encabezados (H2–H4), negritas/cursiva, listas, citas, enlaces.
- [ ] **Imágenes embebidas** en el cuerpo se ven (con pie de foto si tiene título).
- [ ] Saltos de línea suaves respetados.
- [ ] Caja de autor y CTA al final.

**Caché**
- [ ] Tras publicar/editar en Contentful, el cambio aparece (recordar caché de 1h; en local reiniciar dev server).

---

## 7. SEO / meta / técnico

- [ ] `<title>` y `<meta description>` correctos por página.
- [ ] Favicon (`icon.svg`) se ve en la pestaña.
- [ ] Páginas de pago con `noindex`.
- [ ] No hay errores en consola del navegador.
- [ ] No hay `console.log` de depuración filtrando datos (ya se quitó el de la llave Bold — confirmar).
- [ ] Imágenes con `sizes` adecuado (sin warnings de Next.js en consola).
- [ ] Vercel Analytics carga.

---

## 8. Responsive / cross-browser

Probar en: **móvil (≤480px), tablet (~768px), desktop (≥1280px)** y en **Chrome + Safari/Firefox**:
- [x] Navbar/menú móvil.
- [x] Grids (servicios, guías, blog) se apilan bien.
- [x] Heroes con imagen no recortan texto importante.
- [x] Formularios usables en móvil.
- [x] Footer se reorganiza correctamente.

---

## 9. Accesibilidad (rápida)

- [x] Contraste de texto suficiente (especial atención a verdes sobre fondos claros/oscuros).
- [x] Imágenes con `alt` descriptivo.
- [x] Navegación por teclado en navbar y formularios.
- [x] Foco visible en inputs y botones.

---

## Pendientes conocidos (no son fallos, anotados para no confundir en QA)

- Newsletter del blog: solo UI (`preventDefault`), aún no envía.
- Correos Resend: `from`/`to` apuntan a cuentas de dev (pendiente dominio verificado + correo de Daniela).
- Webhook Bold: bypass de firma en modo simulación (quitar en producción).
- PDFs de guías: URLs placeholder en los correos del webhook.
- `BoldPaymentButton` solo en `/guias` (aún no en páginas de servicios; usan WhatsApp).
- Assets de imagen con rosa pendientes de rediseño (logo ya migrado a verde).
- "Política de privacidad" del footer apunta a `#`.
