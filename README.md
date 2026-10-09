# AIVAN STUDIOS

Sitio web y panel interno de leads para AIVAN STUDIOS.

## Qué ya está funcionando

- Landing responsive en Next.js + TypeScript.
- Dirección visual propia: minimalismo blanco/negro con acentos AIBRAND, AIMARK, AIPROD y AIPACKS.
- Sin isotipo/pinzón hasta que AIVAN confirme que puede usarse.
- Animaciones de entrada, microinteracciones y soporte `prefers-reduced-motion`.
- Brief de 4 pasos que se envía sin sacar al visitante de la web.
- Supabase conectado al proyecto `nfwteklhqnkzlqnnhtem`.
- Edge Function `submit-brief` desplegada con validación, honeypot y bloqueo de duplicados rápidos.
- Base de datos con RLS; los leads no son públicos.
- `/panel` con acceso por Magic Link, filtros, estados, detalle del brief, notas internas y actualización en tiempo real.

## Supabase

Tablas:
- `admin_users`
- `leads`
- `lead_notes`

Para autorizar a alguien en el panel, agrega su correo en `public.admin_users`.

## Variables de entorno

```bash
NEXT_PUBLIC_SUPABASE_URL=https://nfwteklhqnkzlqnnhtem.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
NEXT_PUBLIC_WHATSAPP_NUMBER=593...
NEXT_PUBLIC_SITE_URL=https://tu-dominio.com
```

## Desarrollo

```bash
npm install
npm run dev
npm run typecheck
npm run build
```

## Assets pendientes

- Logo/wordmark vectorial oficial.
- Axel y Emma en archivos originales.
- Showreel o pieza audiovisual principal.
- Casos de estudio aprobados.
- Número oficial de WhatsApp.
- Correos que tendrán acceso al panel.
- Dominio final.

## Animación archivada: pinzón, huevo y cascarón (FinchSignature)

**Estado actual: DESACTIVADA A PROPÓSITO (no eliminada).**
La animación del pinzón de Galápagos que sale del huevo, crece, camina y reinicia
su ciclo sigue conservada en `components/BrandMotion.tsx` (export `FinchSignature`)
con todos sus estilos en `app/globals.css` (selectores `.finch-*`,
`.finch-evolution-v3`). Se mantuvo intacta para poder restaurarla.

**Cómo recuperarla en otro chat o más adelante:** busca en `app/page.tsx`
`ENABLE_FINCH_SIGNATURE = false` y cámbiala a `true`. Esto restaura
`<FinchSignature />` en lugar del bloque editorial `.aivan-insight`.
No hay que recrear ni descargar animaciones. Palabras clave:
`pinzon`, `pinzón`, `huevo`, `cascarón`, `eclosión`, `evolución`,
`finch`, `FinchSignature`, `bird evolution`, `roamer`,
`finch-evolution-v3`. Esta sección usa la misma posición que tenía antes.

## Fotografía y portafolio de referencia

Las fotografías actuales de `components/PortfolioShowcase.tsx` y de las
cuatro áreas en `components/ServiceExplorer.tsx` son **referencias
ilustrativas**, no proyectos aprobados ni realizados por AIVAN. Sustituir
fuentes y descripciones al recibir material oficial.

## Capas orbitales AIVAN (arte interactivo y recuperable)

El bloque debajo de Axel y Emma (`Una mirada que observa, adapta y evoluciona`) usa
`components/AivanOrbitalArtwork.tsx` y `app/aivan-orbital.css`. Contiene
**siete URLs de PNGs proporcionadas por el cliente**: paisaje circular,
órbitas de color, esferas dorada/magenta/azul, guías y nubes.
Todas las capas deben mantener **idéntica relación 16:9 y origen común**.

Movimiento: oscilación sutil de las capas y paralaje al mover el cursor,
con enfoque del paisaje al pulsar o con teclado. Respeta
`prefers-reduced-motion`; cuando no se descarga el portal aparece
un gráfico de respaldo. **Nota:** el orden de asignación de las siete URLs
es el orden original entregado por el cliente; verificar visualmente en navegador,
ya que la fuente Blogger no pudo inspeccionarse desde la herramienta remota.

Palabras clave: `AivanOrbitalArtwork`, `capas`, `órbitas`,
`planeta Galápagos`, `orbital PNG`, `artwork`.
La animación histórica del pinzón está guardada por separado.

Carrusel: `pauseOnlyOnActive` en `CircularCarousel` permite mantener
la rotación sobre la periferia y pausarla únicamente al pasar el cursor
sobre la tarjeta central activa.

## Corrección de dirección artística del bloque orbital (2026-10-09)

La primera integración de siete capas tenía halos de neón y órbitas deformadas
que **NO** respetaban la imagen conceptual aprobada. Se archivaron las siete URL
sin borrarlas en `components/AivanOrbitalArtwork.tsx` (constante `layers`).
Ahora solo se utiliza como recurso visual el portal central original de la
entrega de capas y las órbitas de trazo fino se dibujan en SVG. Archivo de
estilos de corrección: `app/aivan-orbital-original.css`. **Importante:**
las órbitas SVG se aproximan al diseño fuente y aún requieren comparación visual;
para exactitud píxel a píxel, insertar como activo estático la ilustración
original completa de AIVAN, guardada en la conversación de diseño, como
`public/images/aivan-galapagos-orbital-original.webp` antes de rehacer
animaciones. No reactivar las capas de neón sin aprobación.

La corrección mantiene interacción ligera (paralaje de todo el conjunto,
zoom discreto) y soporte de movimiento reducido.

### Archivo original aprobado (restauración definitiva)
Se restauró la composición original tal cual en `public/images/aivan-galapagos-approved.avif`:
el asset fue convertido de la imagen original de la conversación a AVIF de 900×507
para servirlo rápidamente, manteniendo exactamente paisaje, posiciones y trazos.
Ahora `AivanOrbitalArtwork` utiliza únicamente esta ilustración; las siete URL
reconstruidas se guardan como `archivedOrbitalLayers` pero no se renderizan.
El movimiento se aplica al **conjunto entero**, para no desalinear elementos.

### Imagen orbital PNG sin fondo del cliente (2026-10-09)

`components/AivanOrbitalArtwork.tsx` usa la nueva URL del cliente en
`APPROVED_TRANSPARENT_ORBITAL_IMAGE`. Al cargar el PNG se respeta su canal
alfa sin máscaras CSS; hay un fallback a
`public/images/aivan-galapagos-approved.avif` solo si Blogger falla. La
interacción existente mueve el conjunto como una sola unidad. No utilizar las
siete capas antiguas (archivadas en `archivedOrbitalLayers`) porque la
reconstrucción alteró el diseño original. La URL de Blogger no pudo descargarse
en el entorno de desarrollo, por lo que la transparencia y carga de producción
deben comprobarse visualmente en navegador.

## Navegación y fluidez de AIVAN (2026-10-09)

- `components/SiteHeader.tsx`: orden del menú **Qué es AIVAN · Servicios · Acompañamientos · Nuestro método · Brief · Contacto**.
- Acompañamientos mantiene `#aipacks`; `app/page.tsx` sitúa un ancla al inicio de la sección de servicios, mientras `ServiceExplorer` abre directamente AIPACKS. La opción no queda tapada por el header.
- `app/aivan-interaction-polish.css`: un único `scroll-padding-top` para enlaces internos, sin sumar un `scroll-margin-top`. Ajusta paddings de método y brief para mostrar el título al llegar.
- Se desactivó `content-visibility:auto` en secciones con altura dinámica: las alturas estimadas producían saltos de posición al navegar por `#hash`.
- `components/HomeMotion.tsx`: mantiene `IntersectionObserver` para revelar contenido y pausar pestañas ocultas, pero ya no intercepta globalmente `wheel`, `touchmove`, zoom, selección ni portapapeles, pues degradaba desplazamiento y accesibilidad.
- `components/CircularCarousel.tsx`: evita `document.elementFromPoint` por fotograma, limita cálculos 3D a ~30fps, los suspende durante el scroll y deja pasar rueda horizontal/vertical de manera pasiva.
- `components/AivanOrbitalArtwork.tsx`: capa única original PNG de Blogger con respaldo local, flotación de 10.5s solo cuando se ve, parallax ligero y escrituras al DOM agrupadas con requestAnimationFrame. Respeta movimiento reducido.
- `components/CinematicHero.tsx`: suspende deriva de las fotos cuando el inicio deja de estar visible.

Se preservaron el código del pinzón archivado, los diseños de otras secciones y los assets oficiales tal como estaban.

## Ajustes de navegación y Brief (2026-10-09)

El menú principal y móvil comparte el array de `components/SiteHeader.tsx`, ahora ordenado **Qué es AIVAN → Servicios → Acompañamientos → Nuestro método → Brief → Contacto**. El enlace de Acompañamientos abre el área AIPACKS.

En `app/aivan-interaction-polish.css` se equilibró el Brief en ventanas de navegador normales: menos espacio superior vacío, columnas proporcionadas, jerarquía tipográfica más compacta, campos legibles y controles dentro de la primera vista de escritorio, sin F11. Incluye ajuste de pantallas de portátil de poca altura y mantiene los controles pegajosos del formulario en móvil. No cambia las preguntas, validaciones ni el envío.

## Contacto editorial (actualización 2026-10-09)

El diseño elegido para **Contacto directo** se implementa como JSX accesible
en `components/ContactSection.tsx`, con estilos exclusivos en
`app/contact-editorial.css`. La URL del fondo entregado por el cliente está
en ese CSS, dentro de `.contact-ambient`, y se utiliza directamente como
imagen de fondo. No se ha descargado/copied el PNG a los assets locales:
desde el entorno actual no se ha podido verificar la disponibilidad de Blogger.
Existe un fondo degradado CSS de respaldo cuando esa imagen no carga.

La sección conserva exactamente los enlaces funcionales previos al WhatsApp
(`NEXT_PUBLIC_WHATSAPP_NUMBER` con valor predeterminado 593990601620)
y al correo `aivanstudiosgps@gmail.com`. Son botones reales, no una imagen
de las tarjetas. Incluye encabezado editorial, dos tarjetas con iconos, flechas,
descripciones, y beneficios. Respeta responsive y `prefers-reduced-motion`.
El resto de la página permanece intacto.

## Icono WhatsApp y unión Brief / Contacto (2026-10-09)

- En `components/ContactSection.tsx`, la tarjeta de WhatsApp utiliza ahora la imagen PNG aprobada y proporcionada por el cliente (constante `WHATSAPP_ICON_URL`, alojada en Blogger). Se muestra sin recortar ni modificar el logo, y el componente conserva un SVG de respaldo si el PNG externo no carga. El enlace de WhatsApp sigue funcionando.
- En `app/contact-editorial.css`, se añadió una transición visual entre el fondo beige del Brief y el fondo orbital de Contacto, con el mismo color de base en el borde y un fundido progresivo de la imagen (mask). No hay una franja horizontal rígida ni se superponen los formularios.
- En móvil la máscara se ajusta para que el fondo mantenga contraste y sea ligero; no hay animaciones costosas de filtro en scroll.
