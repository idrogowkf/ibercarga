const authorDescription = {
  es: 'Profesional de obra y montaje con experiencia en planificación, coordinación y ejecución de operaciones con prefabricados de hormigón, estructuras y cargas especiales.',
  en: 'Construction and erection professional experienced in planning, coordinating and delivering operations involving precast concrete, structural components and special loads.',
};

export const authors = {
  es: { type: 'author', language: 'es', path: '/autor/luis-idrogo', alternatePath: '/en/author/luis-idrogo', title: 'Luis Idrogo, autor del Centro Técnico', description: authorDescription.es, heading: 'Luis Idrogo', eyebrow: 'Autor del Centro Técnico', role: 'Autor y profesional de obra y montaje', bio: authorDescription.es, expertise: ['Planificación de transportes especiales', 'Coordinación entre fábrica, transporte y obra', 'Prefabricados de hormigón y estructuras'], editorialCriteria: 'Contenido técnico basado en información verificable, experiencia profesional y recomendaciones operativas claramente diferenciadas.' },
  en: { type: 'author', language: 'en', path: '/en/author/luis-idrogo', alternatePath: '/autor/luis-idrogo', title: 'Luis Idrogo, Technical Guides author', description: authorDescription.en, heading: 'Luis Idrogo', eyebrow: 'Technical Guides author', role: 'Author and construction operations professional', bio: authorDescription.en, expertise: ['Special transport planning', 'Factory, transport and site coordination', 'Precast concrete and structural components'], editorialCriteria: 'Technical content separates verified information, professional experience and general operational recommendations.' },
};

export const guidesIndexPages = {
  es: { type: 'guide-index', language: 'es', path: '/guias', alternatePath: '/en/guides', title: 'Centro técnico de transporte especial', description: 'Guías técnicas permanentes sobre permisos, rutas, presupuestos y planificación de cargas especiales.', heading: 'Centro técnico', eyebrow: 'Guías prácticas para planificar operaciones', intro: 'Información técnica para preparar una consulta, comprender los condicionantes de una ruta y coordinar mejor cada operación.', image: '/gallery/estructura-metalica.jpg', author: authors.es },
  en: { type: 'guide-index', language: 'en', path: '/en/guides', alternatePath: '/guias', title: 'Special transport technical guides', description: 'Evergreen technical guides covering permits, route surveys, quotations and abnormal-load planning.', heading: 'Technical guides', eyebrow: 'Practical guidance for abnormal-load planning', intro: 'Technical guidance for preparing an enquiry, understanding route constraints and coordinating each movement with better information.', image: '/gallery/estructura-metalica.jpg', author: authors.en },
};

const publishedDate = '2026-09-01';
const officialSources = {
  dgt: { name: 'Dirección General de Tráfico — Autorizaciones especiales de circulación', url: 'https://sede.dgt.gob.es/es/movilidad/autorizaciones-especiales/', accessedDate: publishedDate },
  boe: { name: 'BOE — Reglamento General de Circulación', url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2003-23514', accessedDate: publishedDate },
  transit: { name: 'Servei Català de Trànsit — Autoritzacions especials', url: 'https://transit.gencat.cat/es/gestions/autoritzacions-especials-exempcions/autoritzacions-especials-te-ve/', accessedDate: publishedDate },
};

const common = (language, data) => ({ type: 'guide', language, publishedDate, reviewedDate: publishedDate, author: authors[language], ...data });

export const guides = [
  common('es', {
    path: '/guias/autorizacion-transporte-especial-espana', alternatePath: '/en/guides/abnormal-load-permit-spain',
    title: 'Autorización de transporte especial en España: guía técnica', description: 'Cómo preparar una autorización complementaria de circulación: competencias, documentación, itinerario, vehículos y condicionantes operativos.',
    heading: 'Autorización de transporte especial en España', eyebrow: 'Permisos y coordinación administrativa', image: '/gallery/transformador.jpg',
    intro: 'Una autorización no es un trámite aislado: convierte las características reales del conjunto y del itinerario en condiciones de circulación que deben integrarse en la planificación.',
    sections: [
      { heading: 'Cuándo debe estudiarse una autorización', paragraphs: ['La necesidad se determina comparando la configuración cargada con los límites ordinarios aplicables y con las condiciones de la vía. El análisis debe hacerse sobre el conjunto completo, no únicamente sobre la pieza.', 'Dimensiones, masas, reparto por ejes, radios de giro y salientes condicionan tanto la solicitud como el recorrido viable.'] },
      { heading: 'Identificar la autoridad competente', paragraphs: ['La competencia depende de la red por la que discurre el itinerario. La DGT informa de ámbitos gestionados por organismos autonómicos y de tramos urbanos cuya autorización corresponde a la autoridad municipal.', 'Un recorrido que atraviesa varias redes puede exigir coordinación entre administraciones. Por ello conviene separar desde el inicio cada tramo y su titularidad.'] },
      { heading: 'Información técnica de la carga y del conjunto', paragraphs: ['La memoria de solicitud debe reflejar dimensiones cargadas, masa total, cargas por eje, matrícula y configuración del vehículo. Los datos deben coincidir con la solución que finalmente circulará.', 'Si cambia la tractora, la plataforma, el número de líneas de eje o la posición de la carga, debe revisarse el efecto sobre la documentación y la viabilidad.'] },
      { heading: 'Definir y comprobar el itinerario', paragraphs: ['El origen y destino no bastan. Hay que describir accesos, enlaces, glorietas, pasos inferiores, puentes, restricciones temporales y puntos donde sea necesario ocupar un carril contrario.', 'El estudio previo permite descartar recorridos incompatibles antes de cerrar fechas, medios auxiliares o ventanas de carga.'] },
      { heading: 'Condiciones operativas de circulación', paragraphs: ['La autorización puede incorporar itinerario, vigencia, horarios, señalización, vehículos piloto, acompañamiento o comunicaciones. Las condiciones concretas son las que figuran en el documento emitido para la operación.', 'El equipo de ejecución debe disponer de la versión vigente y trasladar sus obligaciones a la planificación diaria, sin sustituirlas por criterios de operaciones anteriores.'] },
      { heading: 'Errores que retrasan una solicitud', paragraphs: ['Las incidencias más habituales proceden de datos incompletos, discrepancias entre vehículos y documentación, itinerarios demasiado genéricos o ausencia de comprobación de accesos.', 'También genera riesgo contratar grúa, cortes o descarga antes de confirmar que la ventana administrativa y la disponibilidad de obra son compatibles.'] },
      { heading: 'Secuencia recomendada de preparación', paragraphs: ['Primero se fija una configuración técnica preliminar; después se valida el corredor y se prepara la documentación. Con la autorización disponible se revisan condiciones, se coordina la ejecución y se realiza una comprobación final previa a la salida.'], items: ['Ficha dimensional y masa verificada', 'Vehículos y configuración identificados', 'Itinerario desglosado por redes', 'Condiciones comunicadas a conductores y apoyos'] },
    ],
    checklist: ['Confirmar dimensiones y masa en configuración de transporte', 'Verificar matrículas y documentos del conjunto', 'Comprobar autoridad competente en cada tramo', 'Revisar vigencia, horarios e itinerario autorizados', 'Coordinar carga, circulación y recepción en obra'],
    faq: [
      { question: '¿Una autorización sirve para cualquier itinerario?', answer: 'No. Deben respetarse el recorrido, la vigencia, los vehículos y las condiciones que consten en la autorización emitida.' },
      { question: '¿Puede iniciarse la planificación sin matrícula definitiva?', answer: 'Puede avanzarse un estudio preliminar, pero la solicitud y la ejecución requieren datos coherentes con la configuración finalmente utilizada.' },
      { question: '¿Quién autoriza un tramo urbano?', answer: 'La competencia puede corresponder a la autoridad municipal. Debe comprobarse junto con la titularidad del resto de vías del recorrido.' },
      { question: '¿El permiso sustituye al estudio de ruta?', answer: 'No. La autorización establece condiciones administrativas; el estudio aporta la comprobación operativa del itinerario y sus accesos.' },
    ],
    sources: [officialSources.dgt, officialSources.boe, officialSources.transit], relatedServicePaths: ['/gestion-permisos', '/estudio-ruta', '/coches-piloto'],
    cta: { initial: 'Revisamos los datos técnicos antes de plantear la solicitud.', contextual: '¿Tienes carga, configuración e itinerario? Podemos revisar su coherencia.', final: 'Solicita una valoración técnica de tu transporte especial.', afterSection: 2 },
  }),
  common('en', {
    path: '/en/guides/abnormal-load-permit-spain', alternatePath: '/guias/autorizacion-transporte-especial-espana',
    title: 'Abnormal-load permits in Spain: technical planning guide', description: 'A practical guide to Spanish abnormal-load permit preparation, competent authorities, route definition, vehicle data and operating conditions.',
    heading: 'Planning an abnormal-load permit in Spain', eyebrow: 'Permits and administrative coordination', image: '/gallery/transformador.jpg',
    intro: 'Permit work translates the actual loaded combination and proposed corridor into enforceable movement conditions. It should therefore be managed as part of engineering and operations planning.',
    sections: [
      { heading: 'Start with the complete loaded combination', paragraphs: ['Assessment begins with the tractor, trailer, load position and axle arrangement as they will travel. Cargo dimensions alone cannot establish the applicable route or permit strategy.', 'Overall length, width, height, mass, axle distribution and overhangs all affect the information submitted.'] },
      { heading: 'Establish which authority is responsible', paragraphs: ['Responsibility follows the road network. DGT guidance identifies territories with their own traffic authority, while movements on municipal streets may also need local authorisation.', 'A cross-country route can involve several competent bodies, so each network section should be identified before the programme is fixed.'] },
      { heading: 'Build a consistent technical file', paragraphs: ['Vehicle registrations, loaded dimensions, gross mass, axle loads and configuration drawings must describe one coherent transport solution.', 'Any change of vehicle, trailer arrangement or load position should trigger a document and route review before movement.'] },
      { heading: 'Turn origin and destination into a route', paragraphs: ['A usable route identifies access roads, junctions, roundabouts, structures, height constraints, temporary restrictions and locations requiring special manoeuvres.', 'Early route screening prevents an unsuitable corridor from driving crane bookings, production slots or site dates.'] },
      { heading: 'Read the issued operating conditions', paragraphs: ['The permit may specify route, validity, time windows, warning equipment, escort vehicles or other measures. Only the conditions in the issued document govern that movement.', 'Operations teams need a controlled copy and a briefing that converts those requirements into actions and responsibilities.'] },
      { heading: 'Avoid preventable application delays', paragraphs: ['Incomplete data, mismatched registrations, vague route descriptions and unchecked last-mile access are frequent causes of rework.', 'Another avoidable risk is committing lifting or delivery resources before permit timing and site availability are aligned.'] },
      { heading: 'A practical preparation sequence', paragraphs: ['Define the preliminary combination, screen the corridor, assemble consistent documents and submit to the competent bodies. Once issued, review every condition and hold a final readiness check before departure.'], items: ['Verified loaded dimensions and mass', 'Identified vehicles and axle layout', 'Road-network ownership mapped', 'Conditions briefed to the operating team'] },
    ],
    checklist: ['Confirm the transport configuration', 'Match registrations to the technical file', 'Identify the authority for every route section', 'Check validity, time windows and approved corridor', 'Coordinate loading, movement and site reception'],
    faq: [
      { question: 'Does one permit cover any route?', answer: 'No. The authorised route, vehicles, validity and operating conditions must be followed.' },
      { question: 'Can route work begin before final vehicle allocation?', answer: 'A preliminary screen can begin, but the application and movement need a consistent final configuration.' },
      { question: 'Who deals with municipal roads?', answer: 'Local authority approval may apply. The responsibility for every section must be checked.' },
      { question: 'Is a permit the same as a route survey?', answer: 'No. A permit sets administrative conditions; a route survey examines physical and operational feasibility.' },
    ],
    sources: [officialSources.dgt, officialSources.boe, officialSources.transit], relatedServicePaths: ['/en/abnormal-load-permits', '/en/abnormal-load-route-survey', '/en/special-transport'],
    cta: { initial: 'We can review the technical inputs before permit preparation.', contextual: 'Already have the load, combination and corridor? Let us check their consistency.', final: 'Request a technical review for your abnormal-load movement.', afterSection: 2 },
  }),
  common('es', {
    path: '/guias/datos-presupuesto-transporte-especial', alternatePath: '/en/guides/special-transport-quote-information',
    title: 'Datos para pedir presupuesto de transporte especial', description: 'Qué información técnica permite cotizar un transporte especial con alcance, medios, ruta y condicionantes definidos.',
    heading: 'Qué datos necesita un presupuesto de transporte especial', eyebrow: 'Preparación de consultas y ofertas', image: '/gallery/vigas-hormigon.jpg',
    intro: 'Una consulta precisa no necesita ser extensa, pero sí debe identificar la carga, los puntos de operación y las restricciones que cambian la solución técnica.',
    sections: [
      { heading: 'Datos mínimos para una primera revisión', paragraphs: ['El punto de partida es una descripción de la pieza, sus dimensiones máximas, masa, cantidad, origen y destino. Cuando un dato no está confirmado debe marcarse como provisional.'], items: ['Largo, ancho, alto y masa por unidad', 'Cantidad y calendario previsto', 'Direcciones o coordenadas de carga y descarga', 'Persona técnica de contacto'] },
      { heading: 'Información recomendada sobre la carga', paragraphs: ['Planos, fotografías, posición del centro de gravedad y puntos de apoyo ayudan a elegir plataforma, útiles y forma de estiba.', 'También es necesario conocer si la pieza admite voladizos, inclinación, giro o apoyo temporal. Estas decisiones no deben suponerse.'] },
      { heading: 'Condiciones de fábrica y obra', paragraphs: ['Hay que describir horarios, accesos, espacio de maniobra, medios de carga, grúa de descarga, firme y restricciones internas.', 'La ausencia de esta información puede convertir una oferta de transporte en un alcance distinto al que necesita el proyecto.'] },
      { heading: 'Ruta, permisos y servicios auxiliares', paragraphs: ['Si existe una ruta impuesta, debe comunicarse. Si no, conviene indicar los condicionantes conocidos para que puedan valorarse estudio, permisos, vehículos piloto o apoyo de tráfico.', 'La cotización debe distinguir claramente qué trabajos están incluidos y cuáles dependen de verificaciones posteriores.'] },
      { heading: 'Cómo afectan las incertidumbres al precio', paragraphs: ['Una dimensión pendiente, un peso estimado o un acceso sin revisar obliga a trabajar con hipótesis. Cada hipótesis debe aparecer de forma visible y quedar sujeta a confirmación.', 'Cuanto antes se cierran los datos críticos, menor es el riesgo de revisar medios, plazo o alcance.'] },
      { heading: 'Cómo enviar una consulta útil', paragraphs: ['Agrupa la información en una ficha única, adjunta planos legibles y señala cambios respecto de versiones anteriores. Una llamada técnica breve puede resolver contradicciones antes de preparar la oferta.'] },
    ],
    checklist: ['Ficha dimensional por pieza', 'Masa y centro de gravedad disponibles', 'Origen y destino exactos', 'Medios y accesos de carga y descarga', 'Fechas y restricciones conocidas', 'Alcance esperado de permisos y apoyos'],
    faq: [
      { question: '¿Se puede presupuestar con medidas provisionales?', answer: 'Sí, como estimación condicionada. Deben identificarse los datos provisionales y validarlos antes de contratar medios o ejecutar.' },
      { question: '¿Por qué se solicitan fotografías de los accesos?', answer: 'Ayudan a detectar limitaciones visibles de maniobra, pendiente, firme y espacio, aunque no sustituyen una comprobación cuando el riesgo lo exige.' },
      { question: '¿El presupuesto incluye siempre permisos?', answer: 'Depende del alcance solicitado. La oferta debe indicar expresamente si incluye gestión administrativa, estudios o servicios auxiliares.' },
    ],
    sources: [], relatedServicePaths: ['/transporte-especial', '/estudio-ruta', '/gestion-permisos'],
    cta: { initial: 'Envía los datos disponibles; identificaremos qué falta para valorar la operación.', contextual: 'Podemos convertir planos y condiciones de obra en una consulta técnica ordenada.', final: 'Prepara tu solicitud de presupuesto con Ibercarga.', afterSection: 1 },
  }),
  common('en', {
    path: '/en/guides/special-transport-quote-information', alternatePath: '/guias/datos-presupuesto-transporte-especial',
    title: 'Information needed for a special transport quotation', description: 'The load, site, route and programme information needed to scope an abnormal-load quotation without hidden assumptions.',
    heading: 'Preparing a useful special transport enquiry', eyebrow: 'Enquiry and quotation preparation', image: '/gallery/vigas-hormigon.jpg',
    intro: 'A good enquiry is defined by reliable technical inputs, not by its length. It should show what is known, what remains provisional and which interfaces affect delivery.',
    sections: [
      { heading: 'The minimum information set', paragraphs: ['Provide the cargo description, maximum dimensions, unit mass, quantity, collection point, delivery point and expected programme. Label estimates rather than presenting them as final values.'], items: ['Loaded envelope for each item', 'Mass, quantity and sequence', 'Precise collection and delivery locations', 'Technical contact details'] },
      { heading: 'Describe how the cargo can be handled', paragraphs: ['Drawings, photographs, centre-of-gravity information and approved support points inform trailer selection, restraint and load positioning.', 'State whether tilting, rotation, overhang or temporary support is prohibited or subject to engineering approval.'] },
      { heading: 'Collection and delivery interfaces', paragraphs: ['Include working hours, gate dimensions, manoeuvring areas, lifting arrangements, ground conditions and internal traffic rules.', 'These interfaces determine whether the requested scope is transport only or a coordinated delivery operation.'] },
      { heading: 'Route and third-party requirements', paragraphs: ['Share any mandatory corridor and every known constraint. Where the route is open, identify whether route work, permits, escorts or traffic support should be included.', 'A quotation should separate confirmed activities from items that depend on later surveys or authority decisions.'] },
      { heading: 'Managing assumptions commercially', paragraphs: ['Unconfirmed dimensions, estimated mass or an unseen entrance create assumptions. Recording each one makes the quotation auditable and shows what may change the method or cost.', 'Closing critical information early reduces the likelihood of redesigning resources or programme.'] },
      { heading: 'Package the enquiry for review', paragraphs: ['Use one controlled data sheet, attach current drawings and highlight revisions. A short technical clarification call is often the fastest way to remove contradictory information.'] },
    ],
    checklist: ['Dimensions for every cargo type', 'Mass and centre of gravity where available', 'Exact collection and delivery points', 'Loading and unloading arrangements', 'Programme and known constraints', 'Required permit and escort scope'],
    faq: [
      { question: 'Can budget figures be prepared from preliminary dimensions?', answer: 'Yes, provided the estimate and its assumptions are identified and validated before resources are committed.' },
      { question: 'Why are access photographs useful?', answer: 'They reveal visible space, gradient and surface constraints, although they do not replace a survey where risk warrants one.' },
      { question: 'Are permits automatically included?', answer: 'Not necessarily. The quotation should state whether administrative work, route studies and support services are included.' },
    ],
    sources: [], relatedServicePaths: ['/en/special-transport', '/en/abnormal-load-route-survey', '/en/abnormal-load-permits'],
    cta: { initial: 'Send the information you have and we will identify the missing inputs.', contextual: 'We can turn drawings and site constraints into a structured technical enquiry.', final: 'Prepare your quotation request with Ibercarga.', afterSection: 1 },
  }),
  common('es', {
    path: '/guias/estudio-ruta-transporte-especial', alternatePath: '/en/guides/abnormal-load-route-survey',
    title: 'Estudio de ruta para transporte especial: alcance y método', description: 'Cómo se analiza la viabilidad geométrica, estructural y operativa de un itinerario para cargas especiales.',
    heading: 'Cómo se realiza un estudio de ruta de transporte especial', eyebrow: 'Viabilidad del itinerario', image: '/gallery/deposito-industrial.jpg',
    intro: 'Un estudio de ruta convierte un trazado teórico en una secuencia operable, identificando restricciones, maniobras, comprobaciones y medidas necesarias.',
    sections: [
      { heading: 'Cuatro niveles de comprobación', paragraphs: ['La revisión preliminar filtra corredores; la documental reúne cartografía y restricciones; la inspección física contrasta el estado real; la coordinación con autoridades encaja las medidas de circulación.', 'No todas las operaciones requieren la misma profundidad, pero cada limitación crítica debe quedar respaldada por una comprobación adecuada.'] },
      { heading: 'Geometría y envolvente de barrido', paragraphs: ['Glorietas, enlaces, giros cerrados, medianas e isletas se analizan con la geometría del conjunto cargado. La trayectoria de la tractora no representa por sí sola el barrido del remolque.', 'Se revisan también voladizos, invasión de carriles y espacio para corregir la maniobra.'] },
      { heading: 'Altura, anchura y obstáculos laterales', paragraphs: ['Pasos inferiores, pórticos, líneas, vegetación, señalización y mobiliario pueden limitar la envolvente disponible.', 'La altura nominal de un punto no sustituye la medición o verificación técnica cuando el margen es reducido.'] },
      { heading: 'Estructuras, firmes y pendientes', paragraphs: ['Puentes, obras de drenaje, explanadas y accesos de obra requieren una revisión proporcional a las cargas y apoyos previstos.', 'Las pendientes afectan tracción, frenado, distancia al suelo y transiciones de la plataforma.'] },
      { heading: 'Tráfico, ventanas y puntos de espera', paragraphs: ['La viabilidad incluye dónde detener el convoy, cómo ejecutar una maniobra y qué afección produce al tráfico. Deben definirse puntos seguros de espera y contingencia.', 'Horarios, eventos, obras temporales y cambios estacionales se comprueban cerca de la fecha de ejecución.'] },
      { heading: 'Entregable y control de cambios', paragraphs: ['El informe debe localizar restricciones, mostrar evidencias, definir acciones, responsables y asuntos pendientes. Fotografías sin referencia o una simple traza de mapa no constituyen un plan ejecutable.', 'Si cambia la carga, el vehículo, la ruta o el entorno, se revisan los apartados afectados.'] },
    ],
    checklist: ['Configuración cargada validada', 'Barridos y giros críticos identificados', 'Alturas y obstáculos comprobados', 'Estructuras y firmes revisados según riesgo', 'Maniobras, esperas y contingencias definidas'],
    faq: [
      { question: '¿Puede hacerse todo el estudio con cartografía digital?', answer: 'La cartografía es útil para filtrar, pero los puntos críticos pueden requerir inspección, medición y contraste con el estado actual.' },
      { question: '¿Cuándo debe repetirse una visita?', answer: 'Cuando cambien las condiciones relevantes, haya obras, información desactualizada o márgenes que exijan confirmación próxima a la ejecución.' },
      { question: '¿El estudio garantiza la autorización?', answer: 'No. Aporta evidencia técnica para planificar; la decisión y las condiciones administrativas corresponden a la autoridad competente.' },
    ],
    sources: [officialSources.dgt, officialSources.boe], relatedServicePaths: ['/estudio-ruta', '/transporte-sobredimensionado', '/coches-piloto'],
    cta: { initial: 'Analizamos el itinerario a partir de la configuración real de transporte.', contextual: 'Una restricción detectada a tiempo permite comparar alternativas antes de movilizar.', final: 'Solicita el estudio técnico de tu recorrido.', afterSection: 2 },
  }),
  common('en', {
    path: '/en/guides/abnormal-load-route-survey', alternatePath: '/guias/estudio-ruta-transporte-especial',
    title: 'Abnormal-load route surveys: scope and methodology', description: 'A technical method for checking geometric, structural and operational route feasibility before an abnormal-load movement.',
    heading: 'What an abnormal-load route survey should establish', eyebrow: 'Route feasibility', image: '/gallery/deposito-industrial.jpg',
    intro: 'A route survey turns a line on a map into an executable movement plan, with constraints, evidence, actions and ownership recorded.',
    sections: [
      { heading: 'Use the right level of investigation', paragraphs: ['Desktop screening compares corridors, documentary review gathers restrictions, field work checks current conditions and authority liaison aligns traffic measures.', 'The depth should match the operation, while every critical assumption receives proportionate verification.'] },
      { heading: 'Model swept path, not just tractor path', paragraphs: ['Roundabouts, junctions, islands and narrow approaches are assessed using the complete loaded combination. Trailer cut-in and rear swing often control the manoeuvre.', 'Lane encroachment and recovery space must be shown wherever normal tracking is not possible.'] },
      { heading: 'Check the full clearance envelope', paragraphs: ['Bridges, gantries, cables, trees, signs and roadside equipment can constrain height or width.', 'Published clearance information is not a substitute for targeted verification where tolerances are limited.'] },
      { heading: 'Consider structures, surfaces and gradients', paragraphs: ['Bridges, culverts, yards and temporary access roads need assessment appropriate to axle loads and support conditions.', 'Gradient changes influence traction, braking, ground clearance and trailer transition geometry.'] },
      { heading: 'Plan traffic interaction and safe holding', paragraphs: ['Feasibility includes how a convoy waits, performs a non-standard manoeuvre and clears the network safely. Holding and contingency points should be identified.', 'Roadworks, events and temporary restrictions require a final check near the movement date.'] },
      { heading: 'Produce a controlled route deliverable', paragraphs: ['The report should locate constraints, retain evidence and assign each mitigation and outstanding action. Unreferenced photographs or a map trace alone do not create an operating plan.', 'Changes to cargo, vehicles, corridor or site conditions trigger a review of affected findings.'] },
    ],
    checklist: ['Loaded combination confirmed', 'Critical swept paths reviewed', 'Clearances and roadside obstacles checked', 'Structures and surfaces screened to risk', 'Holding points and contingencies agreed'],
    faq: [
      { question: 'Can mapping tools replace a field survey?', answer: 'They support screening, but critical points may need current inspection, measurement and engineering review.' },
      { question: 'When should a route be revisited?', answer: 'When relevant conditions change, information is stale, works are present or narrow margins need final confirmation.' },
      { question: 'Does a route survey guarantee a permit?', answer: 'No. It supports planning and applications; the competent authority decides the administrative conditions.' },
    ],
    sources: [officialSources.dgt, officialSources.boe], relatedServicePaths: ['/en/abnormal-load-route-survey', '/en/oversized-load-transport', '/en/special-transport'],
    cta: { initial: 'We assess the corridor against the actual loaded configuration.', contextual: 'Early constraint identification keeps alternative routes available.', final: 'Request a technical survey for your proposed route.', afterSection: 2 },
  }),
  common('es', {
    path: '/guias/transporte-vigas-prefabricadas', alternatePath: '/en/guides/precast-beam-transport',
    title: 'Transporte de vigas prefabricadas: planificación técnica', description: 'Guía para coordinar apoyos, estiba, ruta, secuencia de fabricación y montaje de vigas prefabricadas.',
    heading: 'Planificación del transporte de vigas prefabricadas', eyebrow: 'Prefabricado, transporte y montaje', image: '/gallery/prefabricado.jpg',
    intro: 'La entrega de una viga es una interfaz entre cálculo, fabricación, transporte, grúa y montaje. La planificación debe proteger la pieza y mantener la secuencia de obra.',
    sections: [
      { heading: 'Geometría, masa y estado de la pieza', paragraphs: ['La ficha de transporte identifica dimensiones, masa, centro de gravedad, orientación y cualquier limitación temporal del elemento.', 'La resistencia disponible en cada fase debe ser confirmada por la documentación técnica del prefabricado.'] },
      { heading: 'Apoyos y comportamiento durante el transporte', paragraphs: ['La posición de apoyos y amarres no se decide por costumbre. Debe ser compatible con el diseño de la pieza, la plataforma y las acciones dinámicas previstas.', 'Calzos, superficies de contacto y elementos de protección deben evitar concentraciones de tensión y daños locales.'] },
      { heading: 'Estiba, estabilidad y verificación previa', paragraphs: ['La solución de estiba considera vuelco, deslizamiento, torsión, reparto de carga y geometría del conjunto. Los dispositivos deben poder inspeccionarse antes de la salida.', 'Una modificación de apoyo o de orientación exige revisar la solución, no solo recolocar amarres.'] },
      { heading: 'De fábrica a obra: una sola secuencia', kind: 'highlight', paragraphs: ['El orden de fabricación, acopio, carga, circulación, llegada, estabilización de grúa y montaje debe leerse como un programa único.', 'La viga correcta debe llegar en la orientación y momento de montaje previstos, evitando giros o acopios no contemplados.'] },
      { heading: 'Acceso y posicionamiento en obra', paragraphs: ['Se comprueban radios, pendientes, capacidad del firme, recorrido interno y posición final del vehículo respecto de la grúa.', 'La maniobra debe mantener zonas de exclusión y permitir una salida ordenada tras la descarga.'] },
      { heading: 'Plan de comunicación y contingencia', paragraphs: ['Fábrica, transportista, jefe de obra y equipo de izado necesitan una referencia común para horarios, pieza, orientación y punto de entrega.', 'El plan define qué ocurre ante retrasos, imposibilidad de acceso, viento u otra condición que impida continuar de forma segura.'] },
    ],
    checklist: ['Ficha de pieza y orientación confirmadas', 'Apoyos y estiba definidos técnicamente', 'Ruta y último acceso comprobados', 'Secuencia de carga y montaje coordinada', 'Grúa, zona de recepción y contingencias preparadas'],
    faq: [
      { question: '¿Quién define los apoyos de transporte?', answer: 'Deben ser compatibles con la documentación técnica de la pieza y con la solución de transporte; no deben establecerse únicamente por práctica habitual.' },
      { question: '¿Puede acopiarse una viga al llegar?', answer: 'Solo si el proyecto ha definido apoyos, superficie, estabilidad y medios para esa fase. De lo contrario debe coordinarse la entrega directa a montaje.' },
      { question: '¿Qué dato condiciona más el acceso?', answer: 'No existe uno único: longitud del conjunto, barrido, pendiente, firme y espacio de posicionamiento interactúan en la maniobra.' },
    ],
    sources: [], relatedServicePaths: ['/transporte-prefabricados', '/transporte-especial', '/estudio-ruta'],
    cta: { initial: 'Coordinamos la solución desde la ficha de la pieza hasta su recepción.', contextual: 'La secuencia de montaje debe formar parte del plan de transporte.', final: 'Cuéntanos las dimensiones, pesos y programa de tus vigas.', afterSection: 2 },
  }),
  common('en', {
    path: '/en/guides/precast-beam-transport', alternatePath: '/guias/transporte-vigas-prefabricadas',
    title: 'Precast beam transport: engineering and delivery planning', description: 'Technical guidance on supports, restraint, route access and factory-to-erection sequencing for precast beams.',
    heading: 'Planning precast beam transport and delivery', eyebrow: 'Precast logistics and erection interfaces', image: '/gallery/prefabricado.jpg',
    intro: 'A beam delivery links design, production, haulage, crane operations and erection. Each interface needs to preserve the element and the construction sequence.',
    sections: [
      { heading: 'Define the transport condition of the element', paragraphs: ['The transport sheet records dimensions, mass, centre of gravity, orientation and any maturity or temporary-stage limitation.', 'Available capacity at each handling stage must come from the element’s technical information.'] },
      { heading: 'Engineer support locations and contact', paragraphs: ['Supports and restraints are not selected by habit. They must suit the beam design, trailer arrangement and expected dynamic actions.', 'Packing and contact surfaces should prevent local overstress and edge damage.'] },
      { heading: 'Check restraint and vehicle stability', paragraphs: ['The method considers overturning, sliding, torsion, load distribution and the complete road envelope. Restraint points remain accessible for inspection.', 'Changing beam orientation or support position requires renewed technical review.'] },
      { heading: 'Connect production, transport and erection', kind: 'highlight', paragraphs: ['Casting, storage, loading, road movement, crane setup and erection form one programme rather than separate activities.', 'The correct beam must arrive in the required orientation and erection order, without an unplanned turn or storage stage.'] },
      { heading: 'Design the final site approach', paragraphs: ['Turning space, gradient, bearing surface, internal route and vehicle position relative to the crane are checked together.', 'The delivery arrangement maintains exclusion zones and leaves a controlled exit after lifting.'] },
      { heading: 'Agree communication and fallback actions', paragraphs: ['The factory, haulage team, site manager and lifting team need one reference for timing, beam identity, orientation and delivery position.', 'Contingency planning covers delay, blocked access, wind or any condition that prevents the planned sequence continuing safely.'] },
    ],
    checklist: ['Beam data and orientation confirmed', 'Supports and restraint technically agreed', 'Road route and site approach checked', 'Loading and erection sequence aligned', 'Crane position, reception area and fallback plan ready'],
    faq: [
      { question: 'Who determines transport support points?', answer: 'They need to comply with the element’s technical requirements and the transport arrangement, rather than relying on customary positions.' },
      { question: 'Can a beam be stored on arrival?', answer: 'Only where supports, ground, stability and subsequent handling have been planned for that temporary stage.' },
      { question: 'Which single dimension controls site access?', answer: 'No single figure does. Combination length, swept path, gradients, surface and positioning space interact.' },
    ],
    sources: [], relatedServicePaths: ['/en/precast-concrete-transport', '/en/special-transport', '/en/abnormal-load-route-survey'],
    cta: { initial: 'We coordinate the method from element data to site reception.', contextual: 'The erection sequence belongs inside the transport plan.', final: 'Send the dimensions, masses and programme for your beams.', afterSection: 2 },
  }),
];
export const guideRoutes = [guidesIndexPages.es, guidesIndexPages.en, authors.es, authors.en, ...guides];
const normalize = (path = '/') => path === '/' ? '/' : `/${path.replace(/^\/+|\/+$/g, '')}`;
export const findGuideByPath = (path) => guideRoutes.find((page) => normalize(page.path) === normalize(path));
export const getGuidesByLanguage = (language) => guides.filter((guide) => guide.language === language);
