# Sprint 3.0 — Investigación y mapa maestro de landings SEO

Fecha: 2026-08-31  
Rama auditada: `platform-v3`  
Commit auditado: `3199749`  
Referencia estable declarada: tag `v12-production`, commit `8bc59ab`

## 1. Resumen ejecutivo

La oportunidad más sólida no consiste en publicar muchas páginas genéricas, sino en construir un clúster bilingüe que avance desde tres intenciones amplias —transporte especial, sobredimensionado/heavy haul y transporte industrial— hacia cargas de alto contexto técnico, especialmente maquinaria pesada, transformadores, eólico y prefabricados. Los servicios de estudio de ruta y permisos refuerzan la autoridad técnica y capturan consultas cercanas a una decisión operativa.

Se auditaron 13 rutas actuales: 10 en español (incluida la Home) y 3 en inglés. Nueve servicios ya tienen página española; solo dos tienen equivalente inglés. Por tanto, la primera brecha estructural comprobada es la cobertura EN incompleta, no la falta de más conceptos en español.

La muestra pública confirma competencia intensa en términos generales y una oferta europea técnicamente más profunda en `heavy transport`, `route survey` y transporte de transformadores. En cambio, muchas páginas españolas revisadas son generalistas y cubren poco la relación carga–ruta–permisos–maniobra. Ese es el hueco editorial defendible para Ibercarga.

No se localizaron en el repositorio exportaciones de Search Console, consultas, CRM, formularios ni correos. Tampoco se obtuvo una fuente cuantitativa verificable de volumen, CPC o dificultad. Esos campos se mantienen como **Sin dato verificado**. Las prioridades son inferencias auditables y deben recalibrarse al incorporar datos internos.

Conclusión: las diez primeras iniciativas deben ser **optimización o desarrollo bilingüe controlado**, no diez páginas españolas nuevas. El núcleo recomendado es: Transporte especial, Transporte sobredimensionado, Maquinaria pesada, Transformadores, Eólico, Industrial, Estudio de ruta, Permisos, Prefabricados y Project Cargo.

## 2. Fuentes consultadas

### Datos internos

- Catálogo de rutas y contenido: `src/data/services.mjs`.
- Sitemap generado: `public/sitemap.xml`.
- Generador de sitemap: `scripts/generate-sitemap.mjs`.
- Exportaciones Search Console: **Sin dato verificado; no localizadas en el repositorio**.
- Leads de formularios/correo/CRM: **Sin dato verificado; no localizados en el repositorio**.

### Fuentes oficiales y sectoriales

- [Comisión Europea: carga asegurada y transportes anormales](https://road-safety.transport.ec.europa.eu/eu-road-safety-policy/priorities/safe-vehicles/cargo-securing-and-abnormal-loads_en).
- [Publications Office EU: European best practice guidelines for abnormal road transports](https://op.europa.eu/en/publication-detail/-/publication/fa2d050b-24d2-469c-af61-43838653f075/language-en).
- [DGT: autorizaciones especiales de circulación](https://sede.dgt.gob.es/es/movilidad/autorizaciones-especiales-de-circulacion/).
- [ESTA Europe: operaciones de transporte anormal de más de 120 t](https://estaeurope.eu/2026-awards-finalists-transportover120t/).

### Competidores y operadores revisados

- España: [Grupo SGT](https://www.gruposgt.com/servicios/especiales), [Transportes Pastor](https://transportespastor.es/), [TRACAP Aragón](https://www.tracaparagon.es/), [Transvolando](https://transvolando.com/transportes-especiales/), [SOLTRANS](https://www.soltransportes.com/transportes-especiales-en-espana-soltrans/), [Sevium](https://sevium.es/transporte-especial/), [Movipack](https://www.movipack.es/transporte-de-cargas-especiales/), [Gestión y Gestión](https://www.gestionygestion.com/es/) y [Coches Piloto Casi](https://cochespilotocasi.com/).
- Europa: [Mammoet](https://www.mammoet.com/heavy-transport/), [Collett & Sons](https://www.collett.co.uk/heavy-transport/), [Wagenborg](https://www.wagenborg.com/), [Protrafo](https://protrafo.com/service/transport-logistics/), [LKW Walter](https://www.lkw-walter.com/int/en/products-and-services/special-transports) y [EAF Logistics](https://www.eaf.uk.com/services/route-surveys/).

### Señales de búsqueda

- Resultados orgánicos públicos para grupos de consultas ES/EN.
- Autocompletado público de Google para semillas como `transporte especial`, `heavy haul`, `oversized load transport`, `transformer transport`, `wind turbine transport` y `abnormal load route survey`.
- Google Trends: **Sin dato cuantitativo verificado recuperado para este estudio**.

Las SERP y el autocompletado permiten observar lenguaje e intención, pero no sustituyen un volumen de búsqueda ni demuestran demanda comercial efectiva.

## 3. Principales patrones de búsqueda detectados

### Datos comprobados

- En español aparecen formulaciones de servicio general más modificadores geográficos: `transporte especial`, `por carretera`, `España`, `internacional`, y localidades.
- En inglés conviven tres vocabularios: `special transport`, `heavy haul/heavy transport` y `oversized/abnormal load transport`.
- Las páginas europeas conectan recurrentemente el servicio principal con `route survey`, permisos, escorts y coordinación de carga/descarga.
- Las cargas visibles con tratamiento específico en la muestra incluyen transformadores, maquinaria, componentes eólicos y cargas industriales.

### Inferencias

- Las consultas de carga concreta están más próximas a un briefing técnico que las consultas genéricas.
- `Heavy haul` debe explicarse por masa y cargas por eje; `oversized/abnormal load` por dimensiones y restricciones. Unificarlas sin distinción aumenta canibalización.
- `Route survey` posee una intención técnica clara en inglés; su equivalente español puede consolidarse en `estudio de ruta`.
- Los modificadores `quote`, `company`, `services`, `España`, `Europe` e `international` deben incorporarse de forma natural, sin crear una página por cada variante.

### Hipótesis pendientes

- Qué términos generan solicitudes reales para Ibercarga.
- Qué país y qué idioma aportan mejor conversión.
- Si búsquedas muy específicas —reactores, intercambiadores, nacelles, dovelas— tienen demanda suficiente para una landing independiente.

## 4. Competidores analizados

La matriz completa está en `competitor-matrix.csv`. La muestra incluye nueve dominios españoles y seis europeos.

Patrones observados:

- Los competidores españoles tienden a concentrar la propuesta en una landing general de transporte especial, con CTA de contacto y profundidad técnica variable.
- Los operadores europeos más fuertes separan servicios técnicos y cargas, y describen ruta, permisos, reparto de cargas, ingeniería y maniobras.
- Protrafo demuestra una arquitectura vertical por transformadores; EAF, una landing técnica específica de `route surveys`; Collett combina heavy transport, surveys y operaciones auxiliares.
- Formularios, FAQs y schema no aparecen de forma consistente en toda la muestra. La ausencia se registra como “No observado” o “Sin dato verificado”, no como inexistencia absoluta.

## 5. Mapa de huecos competitivos

| Hueco | Evidencia | Oportunidad Ibercarga |
|---|---|---|
| Cobertura inglesa incompleta | Solo dos servicios EN actuales frente a nueve ES | Crear pares ES/EN equivalentes, no traducciones literales sin intención propia. |
| Poca profundidad carga–ruta–permiso en landings españolas generalistas | Muestra española con páginas amplias y profundidad variable | Explicar datos de entrada, configuración, restricciones, permisos y entrega para cada carga. |
| Servicios técnicos separados en competidores europeos | Collett/EAF y guías EU | Reforzar `estudio de ruta` y `permisos` como nodos de autoridad enlazados a cargas. |
| Transformadores con competencia vertical fuerte | Protrafo y operadores heavy transport | Competir con especificidad: peso de expedición, centro de gravedad, accesorios, ruta y posicionamiento, sin afirmar capacidades no verificadas. |
| Taxonomía EN ambigua | Coexistencia de heavy haul, oversized y abnormal load | Asignar intención única a cada URL y definir equivalencias ES/EN explícitas. |
| Sectores sin validación interna | No hay leads ni capacidad documentada | No publicar landings sectoriales hasta validar operaciones, demanda y diferenciación. |

## 6. Matriz maestra de oportunidades

`landing-opportunities.csv` contiene 64 oportunidades organizadas en cuatro grupos: 10 pilares, 30 por carga, 12 por sector y 12 técnicas. Incluye nombre y keyword ES/EN, intención, señal/evidencia, competencia, muestra de competidores, calidad, valor potencial, leads, capacidad, canibalización, puntuación, prioridad y recomendación.

La matriz no afirma volúmenes ni dificultad SEO numérica. La cantidad de competidores se limita expresamente a la **muestra revisada**, no al mercado completo.

## 7. Ranking de las 15 mejores oportunidades

| # | ES | EN | Puntuación | Prioridad |
|---:|---|---|---:|---|
| 1 | Transporte especial | Special transport | 88 | P1 |
| 2 | Transporte sobredimensionado | Oversized load transport | 86 | P1 |
| 3 | Transporte de maquinaria pesada | Heavy machinery transport | 84 | P1 |
| 4 | Transporte de transformadores | Transformer transport | 83 | P1 |
| 5 | Transporte eólico | Wind turbine transport | 81 | P1 |
| 6 | Transporte industrial | Industrial transport | 80 | P1 |
| 7 | Estudio de ruta | Abnormal load route survey | 79 | P1 |
| 8 | Gestión de permisos especiales | Abnormal load permits | 77 | P1 |
| 9 | Transporte de prefabricados de hormigón | Precast concrete transport | 76 | P1 |
| 10 | Project cargo | Project cargo logistics | 74 | P1 |
| 11 | Coches piloto | Pilot car services | 72 | P2 |
| 12 | Transporte especial internacional | International special transport | 71 | P2 |
| 13 | Transporte de estructuras metálicas | Steel structure transport | 70 | P2 |
| 14 | Logística de proyectos | Project logistics | 69 | P2 |
| 15 | Transporte de palas eólicas | Wind turbine blade transport | 68 | P2 |

## 8. Selección final de las primeras 10

1. Transporte especial / Special transport.
2. Transporte sobredimensionado / Oversized load transport.
3. Transporte de maquinaria pesada / Heavy machinery transport.
4. Transporte de transformadores / Transformer transport.
5. Transporte eólico / Wind turbine transport.
6. Transporte industrial / Industrial transport.
7. Estudio de ruta / Abnormal load route survey.
8. Gestión de permisos / Abnormal load permits.
9. Transporte de prefabricados / Precast concrete transport.
10. Project Cargo / Project cargo logistics.

“Primera” significa orden de trabajo y validación. Algunas ya existen en ES; no se propone duplicarlas, sino revisar su intención y construir el par EN ausente.

## 9. Justificación individual

### 1. Transporte especial / Special transport

Pilar semántico y comercial que ya existe en ambos idiomas. Debe definir el alcance del clúster y derivar hacia cargas y servicios técnicos. Competida, pero imprescindible como nodo de navegación y contexto.

### 2. Transporte sobredimensionado / Oversized load transport

Intención diferenciable por dimensiones y gálibo. Ya existe el par ES con `/en/heavy-haul`, pero el análisis aconseja revisar la equivalencia: `heavy haul` enfatiza peso, mientras `oversized` enfatiza geometría.

### 3. Transporte de maquinaria pesada / Heavy machinery transport

La terminología aparece en oferta española y europea y permite briefing técnico concreto. Debe diferenciarse de “industrial” por tipos de maquinaria, accesos, vehículo y carga/descarga.

### 4. Transporte de transformadores / Transformer transport

Carga de alto contexto técnico y valor potencial. Existe ES y hay competencia europea especializada. Prioridad alta para crear un equivalente EN riguroso y enlazarlo con ruta, permisos y posicionamiento.

### 5. Transporte eólico / Wind turbine transport

El término agrupa piezas con geometrías distintas y facilita subtemas útiles. La página existente puede ser hub; palas, torres y nacelles solo deberían separarse tras validar demanda y capacidad.

### 6. Transporte industrial / Industrial transport

Pilar para maquinaria y equipos de proceso. Debe evitar convertirse en una réplica de “transporte especial”: su intención será logística de planta, ventanas operativas y equipos industriales.

### 7. Estudio de ruta / Abnormal load route survey

Servicio técnico con evidencia oficial y europea clara. Refuerza autoridad y se enlaza naturalmente desde todas las cargas. Debe explicar entregables sin prometer herramientas o informes no acreditados.

### 8. Gestión de permisos / Abnormal load permits

Necesidad inherente al transporte anormal, confirmada por fuentes oficiales. Su contenido debe ser prudente por diferencias nacionales y no convertir información normativa en garantía de plazo.

### 9. Transporte de prefabricados / Precast concrete transport

Existe en ES y permite contenido específico de secuencia, apoyos, fábrica, obra y grúa. El par EN abre un nicho industrial concreto sin fragmentarlo todavía en vigas, dovelas y pilotes.

### 10. Project Cargo / Project cargo logistics

Término internacional que conecta transporte, permisos, puertos y coordinación. Antes de publicar debe definirse el alcance real de Ibercarga para no solaparlo con logística de proyectos ni prometer servicios multimodales no verificados.

## 10. Arquitectura recomendada ES/EN

```text
Home ES / Home EN
├── Pilares
│   ├── Transporte especial / Special transport
│   ├── Sobredimensionado / Oversized load transport
│   ├── Heavy haul (solo si se diferencia por peso)
│   ├── Transporte industrial / Industrial transport
│   └── Project cargo / Project cargo logistics
├── Cargas
│   ├── Maquinaria pesada / Heavy machinery
│   ├── Transformadores / Transformers
│   ├── Eólico / Wind turbine components
│   └── Prefabricados / Precast concrete
└── Servicios técnicos
    ├── Estudio de ruta / Route survey
    ├── Permisos / Abnormal load permits
    └── Coches piloto / Pilot car services
```

Cada nodo debe tener un equivalente lingüístico real, canonical propio y hreflang recíproco cuando ambos contenidos existan. No crear automáticamente una URL EN vacía o débil.

## 11. Propuesta de URLs

| ES | EN | Acción |
|---|---|---|
| `/transporte-especial` | `/en/special-transport` | Mantener; optimizar como pilar. |
| `/transporte-sobredimensionado` | `/en/oversized-load-transport` | Propuesta; evaluar migración de la equivalencia actual. No cambiar sin aprobación. |
| `/transporte-pesado` | `/en/heavy-haul` | Solo si se aprueba intención separada por peso. |
| `/transporte-maquinaria-pesada` | `/en/heavy-machinery-transport` | Nueva pareja propuesta. |
| `/transporte-transformadores` | `/en/transformer-transport` | Añadir EN. |
| `/transporte-eolico` | `/en/wind-turbine-transport` | Añadir EN. |
| `/transporte-industrial` | `/en/industrial-transport` | Añadir EN. |
| `/estudio-ruta` | `/en/abnormal-load-route-survey` | Añadir EN. |
| `/gestion-permisos` | `/en/abnormal-load-permits` | Añadir EN. |
| `/transporte-prefabricados` | `/en/precast-concrete-transport` | Añadir EN. |
| `/project-cargo` | `/en/project-cargo-logistics` | Nueva pareja, tras validar alcance. |

No se recomienda modificar ahora `/en/heavy-haul`. La relación actual con `/transporte-sobredimensionado` requiere una decisión de arquitectura, redirect y hreflang aprobada.

## 12. Enlazado interno recomendado

- Cada pilar enlaza a 3–5 cargas y a los servicios técnicos relevantes.
- Cada carga enlaza hacia un único pilar principal, `estudio de ruta`, `permisos` y 2 cargas relacionadas.
- Los servicios técnicos enlazan a ejemplos de cargas donde el servicio es decisivo, sin crear afirmaciones de proyectos reales.
- ES enlaza solo a ES en el cuerpo; EN solo a EN. El selector de idioma resuelve el par equivalente.
- Los anchors describen la intención: “estudio de ruta para cargas sobredimensionadas”, no “más información”.
- Home destaca pilares; no enlaza indiscriminadamente a las 64 oportunidades.

## 13. Riesgos de canibalización

| Solapamiento | Riesgo | Decisión recomendada |
|---|---|---|
| Transporte especial vs cargas indivisibles | Alto | Una sola página pilar; tratar “carga indivisible” como subtema. |
| Sobredimensionado vs fuera de gálibo | Alto | Consolidar en una URL salvo evidencia GSC contraria. |
| Sobredimensionado vs heavy haul | Alto | Separar únicamente por dimensión frente a peso y configurar hreflang por intención equivalente, no por traducción literal. |
| Industrial vs maquinaria industrial/pesada | Medio-alto | Industrial como hub; maquinaria pesada con inventario y briefing propios. |
| Project cargo vs project logistics | Alto | Definir alcance antes de crear; probablemente una pilar y la otra subtema. |
| Estudio de ruta vs planificación de ruta | Alto | Consolidar en `estudio de ruta`; usar “planificación” dentro del contenido. |
| Permisos vs autorizaciones | Alto | Una única URL por idioma. |
| Eólico vs palas/torres/nacelles | Medio | Mantener hub; separar piezas solo con datos de demanda y capacidad. |
| Prefabricados vs vigas/dovelas/pilotes | Medio | Mantener hub durante Sprint 3; separar tras evidencia. |

## 14. Landings que no deben desarrollarse todavía

- Transporte especial urgente: intención y capacidad de respuesta no verificadas.
- Páginas “cerca de mí” y páginas por ciudad: alto riesgo de contenido repetitivo y ausencia de evidencia local.
- Reactores, intercambiadores, hornos, recipientes a presión, equipos mineros y portuarios: capacidad y leads sin verificar.
- Oil & Gas, minería, siderurgia y data centers: sector atractivo, pero sin prueba interna suficiente.
- Coordinación de grúas, jacking/skidding, planes de amarre y carga/descarga como servicios independientes: no publicar hasta acreditar alcance operativo.
- Palas, torres y nacelles como tres landings: mantener inicialmente dentro de transporte eólico.
- Vigas, dovelas y pilotes como landings separadas: mantener inicialmente dentro de prefabricados.
- Variantes exactas `heavy transport`, `heavy haul`, `abnormal load` y `oversized load` como páginas paralelas sin mapa de intención: riesgo alto de canibalización.

## 15. Plan de ejecución propuesto

### Sprint 3.1 — Validación de datos y mapa de intención

- Incorporar exportación GSC y clasificar consultas/páginas por clúster.
- Clasificar leads reales anonimizados por carga, sector, idioma y resultado.
- Validar con operaciones las diez capacidades P1.
- Aprobar equivalencia `sobredimensionado` / `oversized` / `heavy haul`.
- Entregable: ranking recalibrado y briefs de intención; sin publicar landings.

### Sprint 3.2 — Primer paquete de contenido

- Optimizar `transporte especial` y `transporte sobredimensionado`.
- Crear el par maquinaria pesada y completar EN de transformadores.
- Verificar contenido, schema, hreflang, enlazado y formulario sin alterar V12.
- Entregable: cuatro pares aprobables con pruebas, build y un único commit.

### Sprint 3.3 — Clúster industrial y energético

- Completar pares eólico, industrial y prefabricados.
- Crear el enlazado carga–pilar–servicio técnico.
- Revisar ausencia de contenido duplicado y claims no acreditados.
- Entregable: tres pares, pruebas, build y un único commit.

### Sprint 3.4 — Autoridad técnica e internacional

- Completar pares estudio de ruta y permisos.
- Crear Project Cargo solo si Sprint 3.1 valida alcance.
- Medir indexación, impresiones y consultas antes de abrir P2.
- Entregable: dos o tres pares, medición inicial, pruebas, build y un único commit.

## Respuestas a las preguntas de decisión

- **¿Qué buscan?** Servicios generales, cargas concretas y coordinación técnica de ruta/permisos; el volumen exacto es Sin dato verificado.
- **¿Cómo en ES?** Transporte especial/sobredimensionado/pesado, carga específica y modificadores España/internacional/precio/presupuesto.
- **¿Cómo en EN?** Special transport, heavy haul/heavy transport, oversized/abnormal load, cargo + transport y route survey/permits.
- **¿Qué recibe más señales?** Los términos generales y las cargas maquinaria, transformadores, eólico y prefabricado; conclusión cualitativa.
- **¿Qué está saturado?** Las landings generales están competidas en la muestra; no se dispone de dificultad SEO numérica.
- **¿Qué está desatendido?** Profundidad técnica por carga y cobertura EN coherente con ES.
- **¿Dónde competir?** En contenido de planificación que conecte datos de carga, equipo, ruta, permisos y entrega.
- **¿Qué diez primero?** Las diez P1 listadas en la sección 8.
- **¿Qué reservar?** Sectores/cargas sin validación, geográficas, urgentes y servicios auxiliares no acreditados.

