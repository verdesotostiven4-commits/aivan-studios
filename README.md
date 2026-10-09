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
