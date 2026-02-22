# Performance improvements (Lighthouse mobile – /en)

Based on the baseline report `.lighthouse/baseline-en-mobile.json` for `http://localhost:3090/en`.

---

## 1. Lista de problemas detectados (con archivo y línea)

| # | Problema | Ubicación | Impacto |
|---|----------|-----------|---------|
| 1 | **Header renderiza un skeleton en el primer paint** y el contenido real solo después de `setTimeout(..., 0)`. El LCP es texto del hero (H1); el retraso de pintado se agrava por bloqueo de CSS/JS. | `src/components/layout/header.tsx` (useState + useEffect + skeleton) | Primer contenido visible retrasado; posible contribución al LCP ~34s. |
| 2 | **Todas las secciones de la home cargadas en el mismo bundle** (ProblemSolutionSection, ProjectsCarousel, ReviewList3DWrapper, LeadMagnetContactForm, AboutMeSection, BlogSection). Aumenta Script Evaluation y TBT. | `src/app/[locale]/(home)/page.tsx` (imports estáticos) | Main thread ~4.6s, TBT 543ms; LCP/FCP retrasados por parse/compile de JS. |
| 3 | **Render-blocking CSS**: 3 chunks (~29KB + ~1.7KB + ~1.8KB) con ahorro estimado de 580ms (FCP/LCP). | Next.js chunks (fbd6f78..., febab3f..., f40dd8c...) | FCP y LCP bloqueados hasta que se descargan y aplican los CSS. |
| 4 | **LCP element** identificado en el reporte: nodo de **texto** dentro de `h1.type-display-sm > div.space-y-3 > div.space-y-2 > div` (texto “and ideas into impactful web”). No es una imagen; el retraso viene de “element render delay” (~1.07s) y del bloqueo general. | `src/components/home/hero-section/hero-section.tsx` (H1 + Typography) | LCP = 34.5s; la fuente (Permanent Marker) y el CSS bloquean la pintura del texto. |
| 5 | **Imágenes del hero** sin priorización: la primera imagen above-the-fold (writing.webp) no tenía `priority`, compitiendo con el texto por ancho de banda. | `src/components/home/hero-section/hero-section.tsx` (HighlightWord/Image) | Pequeña mejora en FCP/Speed Index si se prioriza la primera imagen. |
| 6 | **Metadata** sin `themeColor` ni `robots` explícitos. | `src/app/layout.tsx` (metadata) | SEO y experiencia del navegador (barra de estado). |
| 7 | **Import no usado** en el provider (StoreInitializer). | `src/providers/providers.tsx` | Menos código en el bundle principal. |

---

## 2. Explicación técnica del impacto

- **LCP 34.5s**: El LCP es el **texto** del headline del hero (H1 con Permanent Marker). El valor tan alto en entorno throttled (4x CPU) indica que la pintura del elemento se retrasa por:
  - **Render-blocking CSS** (~580ms): el navegador no pinta hasta aplicar los CSS bloqueantes.
  - **Main thread ocupado** (~4.6s): Script Evaluation (~1.4s), Style & Layout (~0.96s), etc. Retrasa la disponibilidad del frame y por tanto el LCP.
  - **Header con skeleton**: el contenido real del header (y cualquier dependencia en el árbol) no se mostraba en el primer paint; eliminarlo asegura que el DOM útil esté desde el primer frame.

- **FCP 3.8s / Speed Index 10.8s**: El primer pintado y la velocidad de llenado de la pantalla mejoran al:
  - Mostrar el header real de inmediato (sin esperar a hidratación para “cambiar” de skeleton a contenido).
  - Reducir JS inicial con **code splitting**: las secciones below-the-fold se cargan en chunks separados; el main bundle es más pequeño → menos parse/compile → FCP y LCP más tempranos.

- **TBT 543ms**: Menos JS en el primer load reduce tareas largas en el main thread y mejora TBT (y FCP/LCP).

---

## 3. Código corregido (resumen de cambios)

### 3.1 Header: primer paint real (sin skeleton)

**Archivo:** `src/components/layout/header.tsx`

- Eliminados `useState(false)`, `useEffect` con `setTimeout(..., 0)` y el bloque `if (!isVisible) return <skeleton>`.
- El header renderiza desde el primer paint el mismo contenido que antes (logo, nav, menú móvil). Solo se mantiene lógica client-side para el scroll (`useWindowScroll`) y estilos (borde/backdrop).
- Eliminado import de `useRendersCount` (no usado).

**Justificación:** Evitar un primer frame “vacío” (skeleton) y un segundo frame con contenido real, que retrasa la percepción de contenido y puede afectar métricas que dependen del primer pintado.

### 3.2 Home: code splitting de secciones below-the-fold

**Archivo:** `src/app/[locale]/(home)/page.tsx`

- **Imports estáticos** de ProblemSolutionSection, ProjectsCarousel, ReviewList3DWrapper, LeadMagnetContactForm, AboutMeSection y BlogSection sustituidos por **`dynamic(..., { ssr: true, loading: () => <SectionSkeleton /> })`**.
- Añadido componente `SectionSkeleton` (placeholder con `min-height` y `aria-*`) para evitar layout shift mientras carga cada chunk.
- HeroSection y SocialProofSection se mantienen en el bundle principal (above-the-fold).

**Justificación:** Reducir el tamaño del JS inicial y el trabajo en el main thread (Script Evaluation, Parse/Compile), mejorando FCP, LCP y TBT. Con `ssr: true` el HTML de las secciones sigue generándose en el servidor; solo el JS de cada sección se carga en chunks separados.

### 3.3 Hero: prioridad de la primera imagen

**Archivo:** `src/components/home/hero-section/hero-section.tsx`

- Añadido prop opcional `priority?: boolean` a `HighlightWord`.
- La primera instancia (writing.webp) usa `priority`; el resto no.
- En `HighlightWord`, la `Image` de Next usa `priority={priority}` (por defecto `false`).

**Justificación:** La primera imagen above-the-fold se descarga con mayor prioridad, lo que puede ayudar a FCP y Speed Index sin competir con el texto del LCP (que sigue siendo el H1).

### 3.4 Metadata (SEO / UX)

**Archivo:** `src/app/layout.tsx`

- En `metadata`: añadidos `themeColor` (light/dark) y `robots: { index: true, follow: true }`.

**Justificación:** themeColor mejora la UI del navegador; robots deja explícita la indexación.

### 3.5 Provider: import no usado

**Archivo:** `src/providers/providers.tsx`

- Eliminado import de `StoreInitializer` (no se usaba en el JSX).

**Justificación:** Menos código en el bundle del provider.

---

## 4. Resumen del impacto esperado en métricas

| Métrica | Antes (baseline) | Objetivo | Cómo contribuyen los cambios |
|--------|-------------------|----------|------------------------------|
| **LCP** | ~34.5 s | < 2.5 s | Header real en primer paint; menos JS inicial (code splitting) → menos bloqueo del main thread y pintado más temprano del H1. En entorno throttled, la reducción puede ser grande (p. ej. de 34s a un rango mucho menor); en 3G/4G real dependerá de red y dispositivo. |
| **FCP** | ~3.8 s | < 2 s | Mismo contenido útil desde el primer frame (header + hero); menos CSS/JS bloqueantes en el critical path por menor JS inicial. |
| **Speed Index** | ~10.8 s | Mejorar | Primer pintado más rápido y primera imagen del hero priorizada. |
| **TBT** | 543 ms | Reducir | Menos Script Evaluation y Parse/Compile al repartir el JS en chunks. |
| **Performance score** | 0.45 | > 0.85 | Mejoras en LCP, FCP, TBT y Speed Index deberían subir el score. |
| **SEO / A11y** | — | Mantener | themeColor y robots; sin cambios que degraden accesibilidad (form labels ya pasaban). |

**Notas:**

- El reporte se hizo en **localhost con throttling simulado** (4x CPU, ~1.6 Mbps). En producción y en redes mejores, las mejoras absolutas serán distintas, pero la dirección (LCP/FCP/TBT más bajos) se mantiene.
- **Render-blocking CSS** (~580 ms) sigue presente (viene de los chunks de Next/Tailwind). Para atacarlo más habría que valorar critical CSS inline o dividir CSS por ruta; no se ha cambiado en esta iteración.
- **Third party (Turnstile)** solo se carga con el chunk de LeadMagnetContactForm (sección cargada con `dynamic`), por lo que ya se evita en el critical path del primer load.

---

## 5. Siguientes pasos recomendados (no aplicados en este cambio)

1. **Critical CSS**: Valorar inlining de estilos above-the-fold o carga diferida del resto del CSS para reducir los ~580 ms de bloqueo.
2. **Fuentes**: Mantener solo Inter + Permanent Marker en el layout crítico y cargar Sora/IBM Plex bajo demanda si se confirma que reducen LCP en mediciones reales.
3. **Preload de fuente LCP**: Next con `next/font` ya inyecta preload para las fuentes usadas en el layout; comprobar en build que Permanent Marker esté preloaded y que la ruta sea la correcta.
4. **Vuelta a medir**: Ejecutar Lighthouse de nuevo en `/en` (mobile) tras estos cambios y comparar con `.lighthouse/baseline-en-mobile.json`.
