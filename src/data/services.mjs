const faq = (...items) => items.map(([question, answer]) => ({ question, answer }));
const createPage = (page) => ({ type: 'service', image: '/gallery/industrial.jpg', relatedPaths: [], ...page });

export const homePages = {
  es: createPage({
    type: 'home', language: 'es', path: '/', alternatePath: '/en/', title: 'Transporte especial y sobredimensionado en España',
    description: 'Transporte especial y sobredimensionado en toda España: eólico, prefabricado de hormigón, industrial, transformadores y más.',
    heading: 'Ibercarga', eyebrow: 'Transporte especial en España y Europa', serviceType: 'Transporte especial y sobredimensionado',
    intro: 'Transporte especial y sobredimensionado en toda España: eólico, prefabricado de hormigón, industrial, transformadores y más.',
    faq: faq(
      ['¿Qué documentos necesitáis para un transporte especial?', 'Dimensiones/peso exactos, puntos de carga/descarga y fecha prevista. Nosotros tramitamos permisos y vehículos piloto.'],
      ['¿Cuánto tarda un presupuesto?', 'Normalmente entre 1 y 4 horas laborales. Urgentes: llámanos al +34 624 473 123.'],
      ['¿Trabajáis en toda España?', 'Sí, y también operamos rutas transfronterizas bajo solicitud.']),
    sections: [{ heading: 'Planificación de transporte especial', text: 'Cada operación se estudia según carga, ruta, medios y calendario.' }],
    relatedPaths: ['/transporte-especial', '/transporte-sobredimensionado', '/gestion-permisos'],
  }),
  en: createPage({
    type: 'home', language: 'en', path: '/en/', alternatePath: '/', title: 'Special and oversized transport in Spain and Europe',
    description: 'Special and oversized road transport coordination in Spain and Europe for industrial, wind-energy, precast and heavy cargo.',
    heading: 'Ibercarga', eyebrow: 'Special transport in Spain and Europe', serviceType: 'Special and oversized transport',
    intro: 'Special and oversized transport support for industrial cargo, wind components, precast concrete and heavy equipment.',
    faq: faq(
      ['What information is needed for a special transport quote?', 'Provide origin, destination, cargo dimensions and weight, loading conditions and the requested date so the operation can be reviewed.'],
      ['Can Ibercarga review cross-border routes?', 'Yes. Ibercarga reviews Spanish domestic movements and European routes connected with Spain.'],
      ['Are permits and escorts considered?', 'The review identifies the authorisations, pilot cars and operational restrictions that may apply to the specific movement.']),
    sections: [{ heading: 'Special transport planning', text: 'Each movement is reviewed around the cargo, route, equipment and schedule.' }],
    relatedPaths: ['/en/special-transport', '/en/oversized-load-transport'],
  }),
};

export const services = [
  createPage({
    language: 'es', path: '/transporte-especial', alternatePath: '/en/special-transport', image: '/gallery/industrial.jpg',
    title: 'Transporte especial en España y Europa', description: 'Coordinación de transporte especial por carretera para cargas indivisibles en España y Europa, con revisión de ruta, permisos y medios.',
    heading: 'Transporte especial para cargas indivisibles en España y Europa', eyebrow: 'Operaciones fuera de los límites ordinarios', serviceType: 'Transporte especial',
    intro: 'Un transporte especial exige coordinar dimensiones, peso, vehículo, itinerario y autorizaciones como una sola operación. Ibercarga revisa la información técnica y prepara una propuesta adaptada al origen, destino y calendario real.',
    sections: [
      { heading: 'Análisis previo de la carga y el vehículo', text: 'Se comprueban largo, ancho, alto, peso, centro de gravedad, puntos de apoyo y condiciones de carga. Con esta base se consulta la configuración adecuada: góndola, plataforma extensible, conjunto multieje o solución modular.' },
      { heading: 'Ruta, permisos y coordinación operativa', text: 'La viabilidad no depende únicamente del camión. Radios de giro, gálibos, obras, puentes, horarios de circulación y acompañamientos condicionan el servicio.' }],
    faq: faq(
      ['¿Qué datos hacen falta para valorar un transporte especial?', 'Origen, destino, descripción de la pieza, dimensiones totales, peso, número de unidades, fecha y medios disponibles para carga y descarga.'],
      ['¿Se puede organizar un transporte especial internacional?', 'Sí. Se analizan rutas europeas con origen o destino en España y se coordinan los requisitos aplicables en cada territorio.'],
      ['¿El presupuesto incluye permisos y coches piloto?', 'La propuesta detalla expresamente las autorizaciones y acompañamientos incluidos según las características de la operación.']),
    relatedPaths: ['/transporte-sobredimensionado', '/gestion-permisos', '/estudio-ruta'],
  }),
  createPage({
    language: 'es', path: '/transporte-sobredimensionado', alternatePath: '/en/oversized-load-transport', image: '/gallery/estructura-metalica.jpg',
    title: 'Transporte sobredimensionado y cargas fuera de gálibo', description: 'Soluciones de transporte sobredimensionado para estructuras, depósitos y cargas fuera de gálibo, con estudio de medios e itinerario.',
    heading: 'Transporte sobredimensionado planificado según gálibo y recorrido', eyebrow: 'Cargas que superan las dimensiones ordinarias', serviceType: 'Transporte sobredimensionado',
    intro: 'Las cargas largas, anchas o altas requieren una lectura conjunta del gálibo y del recorrido. Ibercarga contrasta las medidas reales con los accesos y condicionantes de circulación antes de coordinar el medio de transporte.',
    sections: [
      { heading: 'Selección de equipos para cargas fuera de gálibo', text: 'La geometría determina si conviene una plataforma extensible, una góndola rebajada o un conjunto con dirección asistida. También se valoran apoyos, amarres y desmontajes.' },
      { heading: 'Control de restricciones en el itinerario', text: 'Se identifican pasos estrechos, líneas aéreas, túneles, glorietas, pendientes y accesos de obra que puedan obligar a modificar la ruta o el vehículo.' }],
    faq: faq(
      ['¿Cuándo se considera que una carga es sobredimensionada?', 'Cuando el conjunto supera los límites ordinarios de dimensiones o masa y necesita condiciones especiales de circulación o autorización.'],
      ['¿Puedo solicitar presupuesto sin un plano técnico?', 'Sí, si dispone de medidas y peso fiables. Un plano con puntos de apoyo y centro de gravedad permite afinar el equipo y la maniobra.'],
      ['¿Conviene desmontar elementos salientes?', 'Cuando es razonable, reducir altura o anchura puede simplificar permisos, ruta y acompañamientos. Se revisa caso por caso.']),
    relatedPaths: ['/transporte-especial', '/coches-piloto', '/estudio-ruta'],
  }),
  createPage({
    language: 'es', path: '/transporte-transformadores', image: '/gallery/transformador.jpg',
    title: 'Transporte de transformadores eléctricos pesados', description: 'Planificación del transporte de transformadores de potencia con análisis de peso concentrado, ruta, equipos multieje y maniobras.',
    heading: 'Transporte de transformadores con control de cargas y accesos', eyebrow: 'Equipos eléctricos de gran peso', serviceType: 'Transporte de transformadores',
    intro: 'El transporte de un transformador combina masa elevada, centro de gravedad, sensibilidad del equipo y accesos complejos. La consulta debe integrar recorrido, reparto de cargas y maniobras.',
    sections: [
      { heading: 'Configuración de transporte y reparto de cargas', text: 'Se revisan peso de expedición, aceite y accesorios, dimensiones, apoyos y centro de gravedad para consultar góndolas multieje o soluciones modulares.' },
      { heading: 'Carga, descarga y posicionamiento', text: 'Grúas, gatos hidráulicos, patines, vigas de reparto y zonas de transferencia pueden formar parte del alcance cuando no se carga por medios convencionales.' }],
    faq: faq(
      ['¿Qué peso debe indicarse para el transformador?', 'Debe facilitarse el peso exacto de expedición y aclarar si incluye aceite, radiadores, conservador, aisladores y accesorios.'],
      ['¿Se revisa la capacidad de puentes y firmes?', 'Sí, cuando la masa y el reparto por ejes lo requieren se analiza la compatibilidad de la configuración con el itinerario.'],
      ['¿Puede incluirse el posicionamiento final?', 'Puede consultarse junto con el transporte si se detallan el emplazamiento, los accesos y los medios disponibles.']),
    relatedPaths: ['/transporte-industrial', '/estudio-ruta', '/gestion-permisos'],
  }),
  createPage({
    language: 'es', path: '/transporte-prefabricados', image: '/gallery/prefabricado.jpg',
    title: 'Transporte de prefabricados de hormigón para obra', description: 'Transporte de vigas, pilares, paneles y piezas prefabricadas coordinado con producción, accesos de obra y secuencia de montaje.',
    heading: 'Transporte de prefabricados coordinado con fabricación y montaje', eyebrow: 'Vigas, paneles, pilares y piezas especiales', serviceType: 'Transporte de prefabricados de hormigón',
    intro: 'En prefabricados, el orden de carga debe responder al montaje, las piezas necesitan apoyos definidos y la llegada debe encajar con grúas y ventanas de obra.',
    sections: [
      { heading: 'Planificación por listado y secuencia de piezas', text: 'Se trabaja con dimensiones, pesos, apoyos y orden de montaje para agrupar expediciones, asignar equipos extensibles y evitar manipulaciones.' },
      { heading: 'Coordinación entre fábrica, transporte y obra', text: 'Los horarios de producción, la disponibilidad de grúa y el acceso al frente de montaje se alinean para reducir esperas.' }],
    faq: faq(
      ['¿Qué documentación debe enviar el fabricante?', 'Listado de piezas con referencia, dimensiones, peso, puntos de apoyo, orden de expedición, direcciones y calendario.'],
      ['¿Se pueden programar entregas en secuencia de montaje?', 'Sí. La planificación puede respetar el orden de colocación para que cada pieza llegue cuando la grúa está preparada.'],
      ['¿Qué ocurre si el acceso de obra es limitado?', 'Se revisan anchura, giros, firme, pendientes y zona de descarga para adaptar el vehículo o plantear una transferencia.']),
    relatedPaths: ['/transporte-sobredimensionado', '/estudio-ruta', '/coches-piloto'],
  }),
  createPage({
    language: 'es', path: '/transporte-industrial', image: '/gallery/industrial.jpg',
    title: 'Transporte industrial de maquinaria y equipos de proceso', description: 'Logística de maquinaria industrial, depósitos y equipos de proceso con transporte especial, maniobras y coordinación de planta.',
    heading: 'Transporte industrial para maquinaria y equipos de proyecto', eyebrow: 'Logística de planta y proyectos industriales', serviceType: 'Transporte industrial',
    intro: 'Trasladar maquinaria industrial requiere conocer tanto la pieza como el entorno productivo. Ibercarga estructura la consulta desde el desmontaje y la carga hasta la entrega en planta.',
    sections: [
      { heading: 'Información técnica para cada equipo', text: 'Dimensiones, peso, centro de gravedad, puntos de elevación y amarre y sensibilidad del equipo permiten definir vehículo y medios auxiliares.' },
      { heading: 'Integración con paradas y ventanas de planta', text: 'Las recogidas y entregas se coordinan con seguridad, mantenimiento, producción y montaje para respetar franjas operativas.' }],
    faq: faq(
      ['¿Qué equipos industriales pueden consultarse?', 'Prensas, calderas, depósitos, reactores, líneas de producción, maquinaria de obra y otros equipos indivisibles.'],
      ['¿Se coordinan grúas y medios auxiliares?', 'Sí, pueden integrarse cuando se conocen radios, pesos, emplazamiento y condiciones de apoyo.'],
      ['¿Es posible coordinar varias máquinas como un proyecto?', 'Sí. Se puede preparar una planificación por lotes, prioridades, ventanas de planta y recursos compartidos.']),
    relatedPaths: ['/transporte-transformadores', '/transporte-especial', '/estudio-ruta'],
  }),
  createPage({
    language: 'es', path: '/transporte-eolico', image: '/gallery/eolico.jpg',
    title: 'Transporte eólico de palas, torres y componentes', description: 'Coordinación de transporte eólico para palas, tramos de torre, nacelles y componentes con análisis de ruta y accesos al parque.',
    heading: 'Transporte eólico adaptado a cada componente y parque', eyebrow: 'Logística para proyectos de energía eólica', serviceType: 'Transporte eólico',
    intro: 'Palas, tramos de torre, hubs y nacelles presentan condicionantes distintos. La planificación relaciona longitud, altura, peso y centro de gravedad con carreteras y accesos finales.',
    sections: [
      { heading: 'Equipos específicos para componentes eólicos', text: 'Se valoran extensibles, portapalas, sistemas de elevación y configuraciones multieje según geometría, radio de giro, pendiente y restricciones.' },
      { heading: 'Última milla hasta el aerogenerador', text: 'Los viales del parque, plataformas, curvas cerradas y pendientes requieren una revisión separada de la carretera pública.' }],
    faq: faq(
      ['¿Qué datos se necesitan para transportar una pala eólica?', 'Longitud, ancho y alto máximos, peso, centro de gravedad, puntos de apoyo, modelo, origen, destino y fechas.'],
      ['¿Se estudian los accesos internos del parque?', 'Sí. La última milla puede definir el equipo y las maniobras, especialmente en curvas, pendientes y gálibos limitados.'],
      ['¿Puede coordinarse una campaña completa?', 'Sí. Se revisan cantidades, secuencia de suministro, disponibilidad de equipos y ritmo de montaje.']),
    relatedPaths: ['/estudio-ruta', '/coches-piloto', '/gestion-permisos'],
  }),
  createPage({
    language: 'es', path: '/gestion-permisos', image: '/gallery/estructura-metalica.jpg',
    title: 'Gestión de permisos para transporte especial', description: 'Coordinación de autorizaciones complementarias de circulación para transporte especial según vehículo, carga, ruta y calendario.',
    heading: 'Gestión de permisos vinculada a la operación de transporte', eyebrow: 'Autorizaciones y condiciones de circulación', serviceType: 'Gestión de permisos de transporte especial',
    intro: 'La autorización debe corresponder a la configuración real del conjunto, la carga y el itinerario. Una variación de medidas, matrículas o recorrido puede cambiar las condiciones.',
    sections: [
      { heading: 'Datos coherentes antes de tramitar', text: 'Se contrastan vehículos, remolques, ejes, masas, dimensiones y recorrido para evitar solicitudes incompletas.' },
      { heading: 'Condiciones, horarios y acompañamientos', text: 'La autorización puede imponer fechas, franjas, velocidades, itinerarios, señalización o vehículos piloto que deben planificarse.' }],
    faq: faq(
      ['¿Cuánto tarda un permiso de transporte especial?', 'Depende de la administración, la categoría, el recorrido y los informes. Conviene iniciar la revisión con datos fiables.'],
      ['¿Un permiso sirve para cualquier vehículo?', 'No. Las autorizaciones se vinculan a datos concretos del conjunto, dimensiones, masas, carga e itinerario.'],
      ['¿Ibercarga puede coordinar permiso y transporte?', 'Sí. Integrar ambos evita divergencias entre la solicitud administrativa y el equipo asignado.']),
    relatedPaths: ['/transporte-especial', '/coches-piloto', '/estudio-ruta'],
  }),
  createPage({
    language: 'es', path: '/coches-piloto', image: '/gallery/maquinaria-pesada.jpg',
    title: 'Coches piloto para acompañamiento de transporte especial', description: 'Coordinación de coches piloto y acompañamientos para transportes especiales conforme a dimensiones, autorización y recorrido.',
    heading: 'Coches piloto coordinados con la carga, la ruta y el permiso', eyebrow: 'Acompañamiento y apoyo a la circulación', serviceType: 'Coches piloto para transporte especial',
    intro: 'El acompañamiento debe responder a la autorización, advertir riesgos y colaborar en maniobras, cruces y pasos conflictivos durante el recorrido.',
    sections: [
      { heading: 'Número y posición de los vehículos piloto', text: 'Las dimensiones, el tipo de vía y las condiciones administrativas determinan acompañamiento delantero, trasero o ambos.' },
      { heading: 'Coordinación durante el recorrido', text: 'Los equipos comparten horario, ruta, puntos de encuentro y protocolo de comunicación para anticipar incidencias.' }],
    faq: faq(
      ['¿Cuándo son obligatorios los coches piloto?', 'La obligación depende de las dimensiones, la vía y las condiciones recogidas en la autorización aplicable.'],
      ['¿Puede contratarse solo el acompañamiento?', 'Sí, si se facilitan autorización, medidas, configuración, ruta y horario para comprobar el alcance.'],
      ['¿Los coches piloto gestionan cortes de tráfico?', 'Los cortes o apoyos de agentes se coordinan por separado cuando la operación los requiere.']),
    relatedPaths: ['/gestion-permisos', '/estudio-ruta', '/transporte-sobredimensionado'],
  }),
  createPage({
    language: 'es', path: '/estudio-ruta', image: '/gallery/estructura-metalica.jpg',
    title: 'Estudio de ruta para transporte especial', description: 'Estudios de viabilidad de itinerario para cargas especiales, con revisión de gálibos, giros, pendientes, estructuras y accesos.',
    heading: 'Estudio de ruta antes de movilizar una carga especial', eyebrow: 'Viabilidad técnica del itinerario', serviceType: 'Estudio de ruta para transporte especial',
    intro: 'Una ruta válida para tráfico ordinario puede no admitir un conjunto especial. El estudio identifica restricciones físicas y operativas antes de comprometer equipo, permisos y fechas.',
    sections: [
      { heading: 'Puntos críticos y comprobación de gálibos', text: 'Se revisan glorietas, curvas, medianas, túneles, pórticos, tendidos, pendientes, estrechamientos y accesos.' },
      { heading: 'Alternativas y medidas correctoras', text: 'Ante una limitación se valoran desvíos, desmontajes temporales, adecuaciones, maniobras o cambios de configuración.' }],
    faq: faq(
      ['¿Qué información necesita un estudio de ruta?', 'Dimensiones y peso del conjunto cargado, esquema del vehículo, origen y destino exactos, accesos y periodo previsto.'],
      ['¿El estudio sustituye a la autorización?', 'No. Aporta la base técnica para elegir itinerario, pero los permisos siguen el procedimiento administrativo.'],
      ['¿Puede incluir una visita presencial?', 'Cuando la complejidad lo aconseja, se puede consultar una inspección de campo para medir puntos críticos.']),
    relatedPaths: ['/gestion-permisos', '/coches-piloto', '/transporte-especial'],
  }),
  createPage({
    language: 'en', path: '/en/special-transport', alternatePath: '/transporte-especial', image: '/gallery/industrial.jpg',
    title: 'Special transport services in Spain and Europe', description: 'Special transport coordination for indivisible cargo in Spain and Europe, covering equipment, route feasibility, permits and escorts.',
    heading: 'Special transport coordination across Spain and Europe', eyebrow: 'Indivisible and out-of-gauge cargo', serviceType: 'Special transport',
    intro: 'Special transport requires cargo data, equipment, route constraints and authorisations to be managed as one operation. Ibercarga reviews each enquiry against its actual route and schedule.',
    sections: [
      { heading: 'Cargo and equipment review', text: 'Dimensions, weight, centre of gravity, support points and loading conditions are checked before specialist equipment is consulted.' },
      { heading: 'Route and regulatory coordination', text: 'Clearances, turning areas, structures, operating windows, permits and escort requirements are considered before confirmation.' }],
    faq: faq(
      ['Which details are required for a special transport quote?', 'Provide exact cargo dimensions and weight, origin, destination, number of pieces, loading method and requested date.'],
      ['Can you coordinate transport between European countries?', 'Yes. Ibercarga reviews cross-border movements connected with Spain and coordinates applicable requirements.'],
      ['Are permits and pilot cars included?', 'The proposal identifies the authorisations and escort services included for the specific cargo and itinerary.']),
    relatedPaths: ['/en/oversized-load-transport', '/en/'],
  }),
  createPage({
    language: 'en', path: '/en/oversized-load-transport', alternatePath: '/transporte-sobredimensionado', image: '/gallery/estructura-metalica.jpg',
    title: 'Oversized load transport in Spain and Europe', description: 'Oversized load transport coordinated around cargo geometry, route clearances, permits, escorts and site access in Spain and Europe.',
    heading: 'Oversized load transport planned around geometry and route', eyebrow: 'Long, wide and high indivisible loads', serviceType: 'Oversized load transport',
    intro: 'Oversized transport is primarily governed by the loaded envelope: overall length, width and height must be checked against every critical point between collection and delivery. Ibercarga coordinates the enquiry around verified cargo data, a suitable trailer configuration and a feasible operating route.',
    sections: [
      { heading: 'Cargo data and transport envelope', text: 'The review starts with exact cargo dimensions, transport weight, support points, centre of gravity, removable projections and the loaded dimensions expected on the proposed trailer.' },
      { heading: 'Indicative vehicle configuration', text: 'Depending on length, height and access, the solution may involve an extendable platform, low-loader or steering axle configuration. The final choice depends on the complete route and loading method.' },
      { heading: 'Clearances, turns and access', text: 'Roundabouts, junctions, tunnels, overhead lines, narrow streets, gradients and delivery compounds are assessed together because a single restriction can change the vehicle or itinerary.' },
      { heading: 'Permits and operational restrictions', text: 'Dimensions and route may trigger permits, pilot cars, police coordination or restricted travel windows. Requirements vary by authority and country and cannot be confirmed before the operation is defined.' },
      { heading: 'Loading, delivery and quotation data', text: 'A workable plan also needs the loading and unloading method, available space, crane or ramp conditions, requested dates and any fixed site window. These details should accompany the quote request.' },
    ],
    faq: faq(
      ['When is a load considered oversized?', 'A movement becomes oversized when the loaded vehicle exceeds ordinary dimensional or mass limits and must operate under special conditions or authorisation.'],
      ['Is cargo weight enough to select the trailer?', 'No. Length, width, height, support layout, centre of gravity, loading method and route constraints can be equally decisive.'],
      ['Can an oversized route be confirmed before the final drawing is available?', 'A preliminary review is possible, but route and equipment confirmation require reliable dimensions, weight and loaded configuration.']),
    relatedPaths: ['/en/special-transport', '/en/heavy-haul'],
  }),
  createPage({
    language: 'en', path: '/en/heavy-haul', image: '/gallery/maquinaria-pesada.jpg',
    title: 'Heavy haul and oversized cargo transport in Spain', description: 'Heavy haul and oversized cargo transport planning in Spain for industrial machinery, structures and high-weight indivisible loads.',
    heading: 'Heavy haul solutions built around weight, geometry and route', eyebrow: 'High-weight industrial cargo', serviceType: 'Heavy haul transport',
    intro: 'Heavy haul movements are governed by axle loads, support conditions, manoeuvring space and infrastructure capacity. Ibercarga structures the technical enquiry before equipment is confirmed.',
    sections: [
      { heading: 'Load distribution and specialist equipment', text: 'Transport weight, centre of gravity and support layout are used to assess multi-axle or modular combinations.' },
      { heading: 'Infrastructure and site access', text: 'Bridges, pavement capacity, gradients, turning areas and delivery conditions are considered together.' }],
    faq: faq(
      ['What is the difference between heavy haul and oversized transport?', 'Heavy haul is driven by mass and axle loads, while oversized transport may be driven by length, width or height.'],
      ['Can lifting and positioning be included?', 'Yes. Cranes, jacking, skidding or transfer operations can be reviewed when site conditions are available.'],
      ['Is a route survey always required?', 'Not always, but high weights or constrained access can require desktop engineering and a physical survey.']),
    relatedPaths: ['/en/special-transport', '/en/'],
  }),
];

export const serviceRoutes = services;
export const siteRoutes = [homePages.es, ...services.filter((page) => page.language === 'es'), homePages.en, ...services.filter((page) => page.language === 'en')];
const normalizePath = (pathname = '/') => pathname === '/' ? '/' : `/${pathname.split('?')[0].split('#')[0].replace(/^\/+|\/+$/g, '')}`;
export function findServiceByPath(pathname) { const normalized = normalizePath(pathname); return siteRoutes.find((page) => normalizePath(page.path) === normalized); }
export function getRelatedServices(page) { return page.relatedPaths.map(findServiceByPath).filter(Boolean); }
