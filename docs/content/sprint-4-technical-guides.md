# Sprint 4 — Centro Técnico

## Arquitectura editorial

El Centro Técnico publica cuatro guías permanentes en español y cuatro adaptaciones editoriales en inglés. Cada documento tiene URL canónica, alternativa recíproca, autor identificado, fechas de publicación y revisión, preguntas frecuentes, enlaces a servicios relacionados y tres llamadas a consulta integradas antes del formulario existente.

## Clúster publicado

| Tema | Español | English |
| --- | --- | --- |
| Autorizaciones | `/guias/autorizacion-transporte-especial-espana` | `/en/guides/abnormal-load-permit-spain` |
| Datos de presupuesto | `/guias/datos-presupuesto-transporte-especial` | `/en/guides/special-transport-quote-information` |
| Estudio de ruta | `/guias/estudio-ruta-transporte-especial` | `/en/guides/abnormal-load-route-survey` |
| Vigas prefabricadas | `/guias/transporte-vigas-prefabricadas` | `/en/guides/precast-beam-transport` |

Los índices son `/guias` y `/en/guides`. La atribución editorial se desarrolla en `/autor/luis-idrogo` y `/en/author/luis-idrogo`.

## Criterios de contenido

- La versión inglesa está adaptada al lenguaje profesional del transporte de cargas anormales; no es una traducción literal.
- Se diferencia entre requisitos publicados por organismos, experiencia profesional y recomendaciones generales de planificación.
- No se atribuyen clientes, obras, certificaciones, flota o resultados no demostrados.
- Los artículos normativos enlazan fuentes oficiales visibles y registran la fecha de consulta.
- Las recomendaciones técnicas evitan fijar límites universales: las condiciones aplicables se comprueban para cada configuración, itinerario y autorización.

## Fuentes normativas consultadas

- Dirección General de Tráfico: autorizaciones especiales de circulación.
- Boletín Oficial del Estado: Reglamento General de Circulación consolidado.
- Servei Català de Trànsit: autorizaciones especiales y ámbitos de competencia.

Fecha de consulta editorial: 2026-09-01.

## Datos estructurados

Las guías publican `Organization`, `Article`, `Person`, `FAQPage` y `BreadcrumbList`. No se utiliza `Service` para describir artículos. Los índices y perfiles mantienen sus tipos editoriales correspondientes.

## Control de calidad

La cobertura automatizada comprueba las doce rutas editoriales, pares recíprocos, unicidad de metadatos, fuentes normativas, formulario, CTAs, schemas y presencia exacta en el sitemap. La navegación y la revisión visual se verifican en el último entregable del sprint.
