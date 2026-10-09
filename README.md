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
