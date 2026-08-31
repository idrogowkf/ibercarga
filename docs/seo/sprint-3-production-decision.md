# Sprint 3 — Decisión de producción del clúster prioritario

## Diez clústeres aprobados y equivalencias

| ES | EN |
|---|---|
| `/transporte-especial` | `/en/special-transport` |
| `/transporte-sobredimensionado` | `/en/oversized-load-transport` |
| `/transporte-transformadores` | `/en/transformer-transport` |
| `/transporte-maquinaria-pesada` | `/en/heavy-machinery-transport` |
| `/transporte-estructuras-metalicas` | `/en/steel-structure-transport` |
| `/transporte-industrial` | `/en/industrial-transport` |
| `/transporte-prefabricados` | `/en/precast-concrete-transport` |
| `/transporte-eolico` | `/en/wind-turbine-transport` |
| `/estudio-ruta` | `/en/abnormal-load-route-survey` |
| `/gestion-permisos` | `/en/abnormal-load-permits` |

## Decisión sobre acero

No se crean `/transporte-acero` ni `/en/steel-transport`. Perfiles, vigas, cerchas, bastidores, elementos soldados y componentes largos se integran en la pareja de estructuras metálicas.

## Decisión sobre `/en/heavy-haul`

La ruta existente está claramente diferenciada por masa, cargas por eje, reparto de apoyos e infraestructura. Se conserva como ruta heredada independiente. Se elimina su relación hreflang con `/transporte-sobredimensionado`; esa pareja pasa a ser `/en/oversized-load-transport`, orientada a longitud, anchura, altura y gálibo. No se crea otra landing heavy-haul.

## Páginas aplazadas

Project Cargo, Project Logistics, transporte urgente, páginas geográficas, Heavy Transport independiente, acero independiente, componentes eólicos separados, elementos prefabricados separados, reactores, hornos, intercambiadores, depósitos y páginas sectoriales Oil & Gas, minería o data centers.

## Mapa de enlaces internos

- Los pilares enlazan a cargas y servicios técnicos.
- Las cargas enlazan a transporte especial, sobredimensionado cuando corresponde, estudio de ruta, permisos y servicios próximos.
- Estudio de ruta y permisos enlazan a las cargas donde condicionan la planificación.
- Los enlaces del cuerpo permanecen dentro del mismo idioma; el selector usa el equivalente exacto.

## Commits

1. `73d6e99 feat(seo): build special transport pillar pages`
2. `34b1c8c feat(seo): add high-value cargo landing pages`
3. `8bffcbe feat(seo): complete industrial and energy transport cluster`
4. `feat(seo): add route survey and permits authority pages` — hash asignado al cerrar Sprint 3.4.
