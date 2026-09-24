'use client';

import React, { useState } from 'react';
import { 
  Shield, FileText, Scale, Cpu, AlertTriangle, CheckCircle2, Lock, 
  Calendar, Briefcase, Users, Mic, CheckSquare, QrCode, Play, Square, Copy, Download, ChevronRight, ChevronDown, 
  MessageSquare, Sparkles, Search, BarChart3, TrendingUp, Layers, 
  Building2, PieChart, Radio, FileCheck2, FolderGit2, HelpCircle, X, Printer,
  Upload, RefreshCw, Send, Clock, Plus, ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('caio');
  const [openPillars, setOpenPillars] = useState({ asistentes_ia: true, pilar1: true, pilar2: true, pilar3: false });
  const togglePillar = (p: 'asistentes_ia' | 'pilar1' | 'pilar2' | 'pilar3') => setOpenPillars(prev => ({ ...prev, [p]: !prev[p] }));

    // Sub-pestañas y Selector de Abogado para Métricas FinOps
  const [subTabFinops, setSubTabFinops] = useState<'negocio' | 'operaciones' | 'riesgo'>('negocio');
  const [abogadoSeleccionado, setAbogadoSeleccionado] = useState<'todos' | 'barbara' | 'carlos' | 'elena'>('todos');
  const [periodoFinanciero, setPeriodoFinanciero] = useState('trimestre');
  const [reporteModal, setReporteModal] = useState<'trust' | 'anexo' | 'ceo' | null>(null);

  // =========================================================================
  // ESTADOS Y CONTROLADORES PARA LOS 6 ASISTENTES DE IA
  // =========================================================================
  
  // Tablero Kanban General (sincronizado con Triage y Notetaker)
  const [tableroKanban, setTableroKanban] = useState<any[]>([
    { id: "KAN-01", titulo: "Redactar intimación legal y requerimiento de desbloqueo (Machtig Rothe)", responsable: "Barbara Piccolo", plazo: "Hoy 16:00", prioridad: "Crítica", columna: "Por Hacer", origen: "Asistente Triage" },
    { id: "KAN-02", titulo: "Remitir borrador definitivo SaaS con SLA 99.9% y cláusula Zero-Trust", responsable: "Barbara Piccolo", plazo: "Viernes 17:00", prioridad: "Alta", columna: "En Proceso", origen: "Grabación Minutas" },
    { id: "KAN-03", titulo: "Auditoría de inventario físico y conciliación de cuentas por pagar Corein", responsable: "Equipo Auditor", plazo: "Lunes 10:00", prioridad: "Media", columna: "En Proceso", origen: "Gestor Práctica" },
    { id: "KAN-04", titulo: "Validar poderes de representación y acta de asamblea Sub 1308 C.A.", responsable: "Barbara Piccolo", plazo: "Miércoles", prioridad: "Media", columna: "En Revisión (HITL)", origen: "Ensamblador Doc" },
    { id: "KAN-05", titulo: "Revisión DPA GDPR anexo a contrato internacional", responsable: "Barbara Piccolo", plazo: "Completado", prioridad: "Alta", columna: "Completado", origen: "Redliner" }
  ]);

  // 1. Asistente de Ingesta y Triage (El Recepcionista Analítico)
  const [canalTriage, setCanalTriage] = useState<'whatsapp' | 'email' | 'audio' | 'escaneado'>('email');
  const [textoTriage, setTextoTriage] = useState(
    `De: carlos.mendoza@inversionesguayana.com\nFecha: 24 Sep 2026 08:30\nPara: barbaraipiccolo@despacho.com\nAsunto: URGENTE - Retención indebida de maquinaria y amenaza de desalojo en Galpón Machtig Rothe\n\nDra. Bárbara, le escribo con suma urgencia. La arrendadora Inmobiliaria del Este C.A. (RIF J-30948572-1) nos envió ayer una notificación extrajudicial pretendiendo desalojar el galpón arrendado en Puerto Ordaz en 48 horas, alegando un supuesto atraso en mejoras estructurales que ellos mismos acordaron financiar. Además, bloquearon el portón principal impidiendo la salida de 3 montacargas propiedad de Machtig Rothe C.A. Requerimos medidas urgentes, respuesta legal formal antes de mañana a las 2:00 PM y apertura formal del caso.`
  );
  const [cargandoTriage, setCargandoTriage] = useState(false);
  const [resultadoTriage, setResultadoTriage] = useState<any>({
    hechos_clave: [
      "Notificación extrajudicial recibida de Inmobiliaria del Este C.A. exigiendo desalojo en 48 horas.",
      "Controversia sobre financiamiento de reparaciones estructurales en el inmueble arrendado.",
      "Vía de hecho: Retención ilegal de 3 montacargas de Machtig Rothe C.A. mediante bloqueo de portón principal.",
      "Riesgo de daño patrimonial inminente e interrupción operativa de la actividad comercial."
    ],
    partes: {
      cliente: "Machtig Rothe, C.A. (Arrendataria)",
      contraparte: "Inmobiliaria del Este, C.A. (RIF J-30948572-1, Arrendadora)",
      terceros: "Operadores logísticos y personal de custodia en sitio"
    },
    urgencia: "Crítica",
    plazo_horas: 24,
    justificacion_urgencia: "Plazo conminatorio de 48 horas y retención de bienes de capital que genera lucro cesante.",
    expediente_sugerido: {
      codigo: "EXP-2026-092-INQ",
      materia: "Inquilinario Comercial / Medidas Cautelares",
      responsable: "Barbara Piccolo",
      titulo: "Machtig Rothe C.A. vs. Inmobiliaria del Este C.A. - Desalojo Arbitrario y Retención de Bienes"
    },
    primera_tarea: {
      id: "TSK-092",
      titulo: "Redactar carta de intimación legal y requerimiento de cese de vías de hecho (Desbloqueo montacargas)",
      responsable: "Barbara Piccolo",
      plazo: "Hoy 16:00",
      prioridad: "Crítica",
      kanban_columna: "Por Hacer"
    },
    tarea_agregada: false
  });

  const ejecutarTriageAnalitico = () => {
    setCargandoTriage(true);
    setTimeout(() => {
      setResultadoTriage({
        hechos_clave: [
          "Notificación extrajudicial conminatoria remitida por la contraparte con plazo perentorio de 48 horas.",
          "Conflicto de imputación de pagos sobre obras y reparaciones estructurales aprobadas.",
          "Bloqueo fáctico de acceso y retención ilegítima de bienes muebles de capital (3 montacargas industriales).",
          "Afectación grave a la continuidad del negocio y responsabilidad civil extracontractual potencial."
        ],
        partes: {
          cliente: "Machtig Rothe, C.A. (Cliente Despacho)",
          contraparte: "Inmobiliaria del Este, C.A. (RIF J-30948572-1)",
          terceros: "Subcontratistas de obra y empleados de planta"
        },
        urgencia: "Crítica",
        plazo_horas: 24,
        justificacion_urgencia: "Riesgo de indefensión procesal por vencimiento de plazo extrajudicial y lucro cesante por retención de maquinaria.",
        expediente_sugerido: {
          codigo: `EXP-2026-${Math.floor(100 + Math.random() * 900)}-INQ`,
          materia: "Contratación Mercantil / Inquilinario de Galpones Industriales",
          responsable: "Barbara Piccolo",
          titulo: "Defensa Posesoria e Intimación Legal por Desalojo Ilícito y Vías de Hecho"
        },
        primera_tarea: {
          id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
          titulo: "Redactar intimación con advertencia penal por retención indebida y contestar notificación extrajudicial",
          responsable: "Barbara Piccolo",
          plazo: "Hoy 16:00",
          prioridad: "Crítica",
          kanban_columna: "Por Hacer"
        },
        tarea_agregada: false
      });
      setCargandoTriage(false);
    }, 600);
  };

  const agregarTareaTriageAKanban = () => {
    if (!resultadoTriage?.primera_tarea || resultadoTriage.tarea_agregada) return;
    setTableroKanban(prev => [
      {
        id: resultadoTriage.primera_tarea.id,
        titulo: resultadoTriage.primera_tarea.titulo,
        responsable: resultadoTriage.primera_tarea.responsable,
        plazo: resultadoTriage.primera_tarea.plazo,
        prioridad: resultadoTriage.primera_tarea.prioridad,
        columna: "Por Hacer",
        origen: "Triage Ingesta"
      },
      ...prev
    ]);
    setResultadoTriage((prev: any) => ({ ...prev, tarea_agregada: true }));
  };

  // 2. Motor de Ensamblaje Documental (El Operador de Plantillas)
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<'arrendamiento_comercial' | 'poder_especial' | 'nda_bilateral' | 'asamblea_extraordinaria'>('arrendamiento_comercial');
  const [formDataCRM, setFormDataCRM] = useState({
    arrendador_nombre: "Inmobiliaria del Este, C.A.",
    arrendador_rif: "J-30948572-1",
    arrendatario_nombre: "Machtig Rothe, C.A.",
    arrendatario_rif: "J-40192834-0",
    inmueble_ubicacion: "Galpón Industrial N° 4, Sector Unare II, Puerto Ordaz, Edo. Bolívar",
    canon_mensual: "2.800 USD (pagaderos en Bs. a tasa oficial BCV)",
    duracion_meses: "24 meses prorrogables",
    clausula_mejoras: true,
    tope_responsabilidad_mejoras: "15.000 USD compensables contra cánones",
    fuero_jurisdiccional: "Tribunales de la Circunscripción Judicial del Estado Bolívar"
  });
  const [documentoEnsamblado, setDocumentoEnsamblado] = useState<string>('');
  const [cargandoEnsamblaje, setCargandoEnsamblaje] = useState(false);

  const ejecutarEnsamblajeDocumental = () => {
    setCargandoEnsamblaje(true);
    setTimeout(() => {
      if (plantillaSeleccionada === 'arrendamiento_comercial') {
        setDocumentoEnsamblado(
          `CONTRATO DE ARRENDAMIENTO COMERCIAL E INDUSTRIAL\n` +
          `ESTÁNDAR INMUTABLE: MODELO ADAPTADO DESPACHO PICCOLO (CÓDIGO: ARREND-COM-2026)\n\n` +
          `Entre la sociedad mercantil ${formDataCRM.arrendador_nombre}, inscrita en el Registro Mercantil con el RIF ${formDataCRM.arrendador_rif}, en lo sucesivo denominada "LA ARRENDADORA", por una parte; y por la otra, la sociedad mercantil ${formDataCRM.arrendatario_nombre}, inscrita con el RIF ${formDataCRM.arrendatario_rif}, en lo sucesivo denominada "LA ARRENDATARIA", se ha convenido en celebrar el presente Contrato:\n\n` +
          `CLÁUSULA PRIMERA (OBJETO): LA ARRENDADORA cede en arrendamiento a LA ARRENDATARIA el inmueble constituido por: ${formDataCRM.inmueble_ubicacion}, destinado exclusivamente para actividades industriales, operativas y de almacenamiento.\n\n` +
          `CLÁUSULA SEGUNDA (CANON DE ARRENDAMIENTO): El canon mensual convenido de común acuerdo es la cantidad de ${formDataCRM.canon_mensual}, pagadero por mensualidades anticipadas dentro de los primeros cinco (5) días hábiles de cada mes calendario.\n\n` +
          `CLÁUSULA TERCERA (DURACIÓN): La duración del presente contrato será de ${formDataCRM.duracion_meses}, contados a partir de la firma del presente instrumento, renovable de mutuo acuerdo mediante notificación formal con sesenta (60) días de anticipación.\n\n` +
          (formDataCRM.clausula_mejoras ? 
          `CLÁUSULA CUARTA (RÉGIMEN ESPECIAL DE REPARACIONES Y MEJORAS ESTRUCTURALES): Queda expresamente pactado que las inversiones y mejoras necesarias para la adecuación estructural del techo y pavimentación industrial, hasta por un monto máximo equivalente a ${formDataCRM.tope_responsabilidad_mejoras}, serán financiadas inicialmente por LA ARRENDATARIA y compensadas mensualmente hasta en un cincuenta por ciento (50%) de los cánones de arrendamiento sucesivos, previa consignación de facturas fiscales y actas de avance suscritas por ingenieros colegiados.\n\n` : '') +
          `CLÁUSULA QUINTA (PROHIBICIÓN DE VÍAS DE HECHO): Las partes convienen que ante cualquier desacuerdo respecto a la interpretación, pagos o reparaciones, queda terminantemente prohibido el bloqueo físico de accesos, corte de suministros o retención de bienes de capital e inventarios de LA ARRENDATARIA. El incumplimiento de esta cláusula causará una indemnización penal moratoria diaria de quinientos dólares (500 USD).\n\n` +
          `CLÁUSULA SEXTA (JURISDICCIÓN Y FUERO EXCLUSIVO): Para todos los efectos derivados y consecuencias del presente contrato, las partes eligen como domicilio especial y excluyente la ciudad de Puerto Ordaz, a la jurisdicción de cuyos tribunales competentes en materia mercantil declaran someterse expresamente.`
        );
      } else if (plantillaSeleccionada === 'poder_especial') {
        setDocumentoEnsamblado(
          `PODER ESPECIAL AMPLIO Y DE DISPOSICIÓN\nESTÁNDAR NOTARIAL DESPACHO PICCOLO\n\n` +
          `Yo, ${formDataCRM.arrendador_nombre} (RIF: ${formDataCRM.arrendador_rif}), por medio del presente instrumento confiero PODER ESPECIAL, amplio y suficiente en cuanto a derecho se refiere, a la abogada BARBARA ISABEL PICCOLO OBALDO, titular de la C.I. V-15.XXX.XXX e Inpreabogado N° XXX.XXX, para que en mi nombre y representación ejerza las más amplias facultades de administración, defensa judicial y representación ante entidades públicas y privadas...`
        );
      } else {
        setDocumentoEnsamblado(
          `ACUERDO DE CONFIDENCIALIDAD Y NO DIVULGACIÓN (NDA BILATERAL)\nESTÁNDAR AI GOVERN ZERO-TRUST 2026\n\n` +
          `Reunidos de una parte: ${formDataCRM.arrendador_nombre} y de la otra: ${formDataCRM.arrendatario_nombre}. Ambas partes acuerdan proteger la información técnica, financiera, código fuente y datos corporativos bajo estricta reserva, con prohibición expresa de entrenamiento de modelos de IA con datos de la contraparte...`
        );
      }
      setCargandoEnsamblaje(false);
    }, 450);
  };

  // 3. Auditor de Contrapartes (El Redliner)
  const [textoContraparteRedline, setTextoContraparteRedline] = useState(
    `CLÁUSULA SEXTA (INDEMNIZACIÓN ILIMITADA): La Empresa Proveedora se compromete a indemnizar, defender y mantener indemne a la Contraparte y a todas sus afiliadas frente a cualquier reclamo, pérdida o daño directo, indirecto, incidental o lucro cesante derivado del uso del software o servicios, sin sujeción a límite cuantitativo ni temporal alguno.\n\n` +
    `CLÁUSULA DÉCIMA (PROPIEDAD INTELECTUAL Y CÓDIGO): Todo desarrollo, algoritmo, adaptación o flujo creado durante la vigencia del contrato pasará a ser propiedad exclusiva e irrevocable de la Contraparte, renunciando la Proveedora a cualquier derecho moral o patrimonial.\n\n` +
    `CLÁUSULA DÉCIMO QUINTA (LEY Y JURISDICCIÓN): Las partes se someten exclusivamente a los tribunales arbitrales de la República de Singapur, asumiendo la Proveedora la totalidad de las costas judiciales de antemano.`
  );
  const [cargandoRedliner, setCargandoRedliner] = useState(false);
  const [resultadoRedliner, setResultadoRedliner] = useState<any>({
    score_cumplimiento: 32,
    nivel_riesgo: "Crítico (Inaceptable para firma sin redline)",
    total_clausulas_auditadas: 18,
    clausulas_rojas: 3,
    clausulas_amarillas: 2,
    hallazgos: [
      {
        clausula: "Cláusula 6: Indemnización Ilimitada",
        severidad: "ALERTA ROJA (Riesgo Patrimonial Severo)",
        texto_original: "La Empresa Proveedora se compromete a indemnizar... sin sujeción a límite cuantitativo ni temporal alguno.",
        violacion_politica: "Infringe la Política de Despacho Art. 4.2: Todo contrato debe limitar la responsabilidad a 12 meses de facturación y excluir explícitamente daños indirectos o lucro cesante.",
        redline_propuesto: "Reemplazar por: 'La responsabilidad total acumulada de la Proveedora bajo este Contrato se limitará estrictamente al monto total efectivamente facturado en los doce (12) meses anteriores al hecho causante. Ninguna de las partes responderá por daños indirectos, incidentales, punitivos ni lucro cesante.'",
        precedente: "Negociación con Acme Corp (Sept 2026) y Estándar SaaS Internacional."
      },
      {
        clausula: "Cláusula 10: Cesión de Algoritmos y Código Preexistente",
        severidad: "ALERTA ROJA (Riesgo de Pérdida de IP)",
        texto_original: "Todo desarrollo, algoritmo, adaptación o flujo creado... pasará a ser propiedad exclusiva e irrevocable de la Contraparte...",
        violacion_politica: "Infringe la Política de Protección de IP: Se cede únicamente la licencia de uso corporativa; la tecnología base, algoritmos y software permanecen bajo titularidad exclusiva.",
        redline_propuesto: "Reemplazar por: 'La Proveedora conserva la titularidad exclusiva y todos los derechos de propiedad intelectual sobre su plataforma, código fuente, algoritmos y modelos de IA preexistentes o desarrollados. Se otorga a la Contraparte una licencia corporativa no exclusiva durante la vigencia.'",
        precedente: "Playbook IP Shield AI GOVERN v2.7."
      },
      {
        clausula: "Cláusula 15: Fuero Foráneo Hostil (Singapur)",
        severidad: "ALERTA ROJA (Coste Procesal Inasumible)",
        texto_original: "Las partes se someten exclusivamente a los tribunales arbitrales de la República de Singapur...",
        violacion_politica: "Fuero hostil y asunción asimétrica de costas. Se exige fuero en Madrid (España), Delaware (EE.UU.) o Caracas según la filial contratante.",
        redline_propuesto: "Reemplazar por: 'El presente Contrato se regirá por las leyes del Estado de Delaware / España, y cualquier controversia será resuelta por los tribunales competentes de dicha jurisdicción, asumiendo cada parte sus propios honorarios legales.'",
        precedente: "Estándar Delaware Corporate Law & Jurisdicción Madrid."
      }
    ]
  });

  const ejecutarAuditoriaRedliner = () => {
    setCargandoRedliner(true);
    setTimeout(() => {
      setResultadoRedliner({
        score_cumplimiento: 35,
        nivel_riesgo: "Crítico (Requiere Redlines Inmediatos)",
        total_clausulas_auditadas: 24,
        clausulas_rojas: 3,
        clausulas_amarillas: 3,
        hallazgos: [
          {
            clausula: "Cláusula 6: Indemnización Ilimitada",
            severidad: "ALERTA ROJA (Riesgo Patrimonial Severo)",
            texto_original: "La Empresa Proveedora se compromete a indemnizar... sin sujeción a límite cuantitativo ni temporal alguno.",
            violacion_politica: "Infringe la Política de Despacho Art. 4.2: Límite de responsabilidad acotado a 12 meses de facturación y exclusión de lucro cesante.",
            redline_propuesto: "Reemplazar por: 'La responsabilidad total acumulada de la Proveedora bajo este Contrato se limitará estrictamente al monto total efectivamente facturado en los doce (12) meses anteriores al hecho causante. Quedan excluidos los daños indirectos y el lucro cesante.'",
            precedente: "Acuerdo Marco Acme Corp (Sept 2026)."
          },
          {
            clausula: "Cláusula 10: Cesión de Código y Algoritmos",
            severidad: "ALERTA ROJA (Pérdida Irrecuperable de Activo)",
            texto_original: "Todo desarrollo, algoritmo, adaptación o flujo creado pasará a ser propiedad exclusiva de la Contraparte...",
            violacion_politica: "Infringe Política de IP: Se otorga únicamente licencia corporativa; la titularidad de los modelos y algoritmos es innegociable.",
            redline_propuesto: "Reemplazar por: 'La Proveedora mantiene la titularidad exclusiva sobre todos los algoritmos, modelos de IA y código preexistente o derivado, concediendo únicamente una licencia de uso corporativa no transferible durante la vigencia.'",
            precedente: "Playbook IP Shield v2.7."
          },
          {
            clausula: "Cláusula 15: Fuero Arbitral Foráneo (Singapur)",
            severidad: "ALERTA ROJA (Asimetría Procesal)",
            texto_original: "Las partes se someten exclusivamente a los tribunales arbitrales de la República de Singapur...",
            violacion_politica: "Fuero incompatible con la estructura societaria y operativa de la empresa.",
            redline_propuesto: "Reemplazar por: 'El presente Contrato se regirá por las leyes de Madrid (España) o Delaware (EE.UU.), declarando las partes someterse a sus tribunales competentes ordinarios.'",
            precedente: "Cláusula Tipo AI GOVERN Enterprise."
          }
        ]
      });
      setCargandoRedliner(false);
    }, 550);
  };

  // 4. El Traductor Estratégico (El Puente Interfuncional)
  const [areaTraduccion, setAreaTraduccion] = useState<'tecnologia' | 'finanzas' | 'rrhh'>('tecnologia');
  const [inputRequerimientoLegal, setInputRequerimientoLegal] = useState(
    `Cláusula de Retención, Purga y Derecho al Olvido (EU AI Act Art. 12 & RGPD Art. 17): Todo log de inferencia que contenga datos de identificación de clientes o proveedores debe ser anonimizado en memoria en el Gateway antes de su persistencia. Asimismo, los registros auditables deben conservarse por un plazo estricto de noventa (90) días en almacenamiento inmutable y ser destruidos de forma automatizada mediante job cron criptográfico, salvo retención legal expresa por investigación en curso.`
  );
  const [cargandoTraductor, setCargandoTraductor] = useState(false);
  const [resultadoTraduccion, setResultadoTraduccion] = useState<any>({
    area: "tecnologia",
    resumen_operativo: "Implementación de pipeline de anonimización Zero-Trust en memoria (FastAPI middleware) y política de ciclo de vida de logs a 90 días en bucket con retención inmutable.",
    tickets: [
      {
        id: "TECH-101",
        titulo: "[Zero-Trust] Middleware de Sanitización PII en Memoria (FastAPI)",
        tipo: "User Story (Prioridad P1)",
        user_story: "Como ingeniero de backend, necesito interceptar el payload JSON antes del enrutamiento al LLM para ofuscar DNI, Emails y cuentas bancarias, evitando fuga de datos confidenciales.",
        criterios_aceptacion: [
          "El regex procesa DNI, NIE, RIF, correos e IBAN en < 15ms por petición.",
          "Ningún dato sin anonimizar toca disco ni se almacena en variables globales.",
          "Retorna un SHA-256 del contenido sanitizado para trazabilidad forense."
        ],
        definicion_hecho: "Cobertura de tests unitarios al 95% y validación con suite adversarial de inyección de PII."
      },
      {
        id: "TECH-102",
        titulo: "[Data Lifecycle] Tarea automatizada de rotación y purga criptográfica de logs a 90 días",
        tipo: "Task (Prioridad P2)",
        user_story: "Como operador de infraestructura, requiero configurar un lifecycle cron que purgue irrevocablemente logs de auditoría mayores a 90 días, respetando la excepción de flag 'legal_hold'.",
        criterios_aceptacion: [
          "Cron semanal ejecuta verificación de timestamp y elimina particiones > 90 días.",
          "Si un registro tiene el flag 'legal_hold: true', se preserva en partición de archivo seguro.",
          "Emisión de log de confirmación de purga con firma SHA-256."
        ],
        definicion_hecho: "Prueba de ejecución en staging con simulación de datasets de 100 días y verificación de retención."
      }
    ],
    manual_proceso: "1. Enviar todas las peticiones a través del endpoint interno /api/v1/customs/sanitize. 2. Nunca almacenar contraseñas ni tokens en texto plano. 3. Notificar inmediatamente al Oficial de Cumplimiento Legal si se activa una retención judicial."
  });

  const ejecutarTraduccionEstrategica = () => {
    setCargandoTraductor(true);
    setTimeout(() => {
      if (areaTraduccion === 'tecnologia') {
        setResultadoTraduccion({
          area: "tecnologia",
          resumen_operativo: "Alineación de arquitectura de datos: anonimización preventiva en memoria intermedia y automatización del ciclo de vida de registros con retención inmutable.",
          tickets: [
            {
              id: "TECH-201",
              titulo: "[Security] Pipeline de ofuscación de datos sensibles previo al cómputo de inferencia",
              tipo: "User Story (Prioridad P1)",
              user_story: "Como arquitecto de sistemas, necesito implementar la sustitución de tokens confidenciales en la capa de entrada del Gateway para cumplir con el principio de minimización de datos.",
              criterios_aceptacion: [
                "Latencia añadida inferior a 20ms.",
                "Soporte para patrones de identificación internacional y local (DNI, NIE, RIF, SSN, IBAN).",
                "Hash criptográfico generado y adjuntado al encabezado de respuesta HTTP."
              ],
              definicion_hecho: "Integración verificada en el Gateway FastAPI con pruebas de estrés de 1.000 req/s."
            },
            {
              id: "TECH-202",
              titulo: "[Compliance] Mecanismo de purga determinista a 90 días con excepción judicial",
              tipo: "Task (Prioridad P2)",
              user_story: "Como DevOps engineer, requiero habilitar políticas de expiración en el bucket de auditoría para supresión automática al cumplirse los 90 días naturales.",
              criterios_aceptacion: [
                "Verificación diaria de antigüedad de registros.",
                "Bloqueo de eliminación para identificadores marcados con 'litigio_activo: true'.",
                "Certificado de destrucción generado en formato JSON."
              ],
              definicion_hecho: "Audit log de pruebas validado por la asesoría jurídica."
            }
          ],
          manual_proceso: "Protocolo técnico: Toda nueva integración con modelos de lenguaje debe conectarse exclusivamente a través del puerto 8000 del Gateway local. Queda deshabilitado el consumo de APIs externas sin proxy de seguridad."
        });
      } else if (areaTraduccion === 'finanzas') {
        setResultadoTraduccion({
          area: "finanzas",
          resumen_operativo: "Control de costes de licencias y conciliación de penalizaciones por SLA: automatización de créditos de servicio y control de facturas por consumo de tokens.",
          tickets: [
            {
              id: "FIN-101",
              titulo: "[Control Interno] Conciliación automática de SLA y aplicación de créditos de servicio",
              tipo: "Control SOX / FinOps (Prioridad P1)",
              user_story: "Como controller financiero, requiero que el dashboard reporte las caídas técnicas de proveedores para deducir automáticamente créditos en la facturación del período.",
              criterios_aceptacion: [
                "Cálculo del uptime mensual con base en métricas auditadas.",
                "Generación de nota de crédito automática ante caídas superiores al 0.1% anual.",
                "Emisión de reporte financiero mensual adjunto a la factura."
              ],
              definicion_hecho: "Validación conjunta con el departamento de contabilidad."
            }
          ],
          manual_proceso: "Normativa de pagos: Ninguna factura de software de IA superior a 500 € será liquidada sin el reporte de telemetría emitido por AI GOVERN que acredite consumo real."
        });
      } else {
        setResultadoTraduccion({
          area: "rrhh",
          resumen_operativo: "Guía de uso aceptable de IA generativa para empleados (Art. 4 EU AI Act - AI Literacy): directrices claras para evitar fugas de secretos industriales.",
          tickets: [
            {
              id: "HR-101",
              titulo: "[Onboarding] Módulo obligatorio de Alfabetización en IA y Protección de Secretos",
              tipo: "Directriz de Personal (Prioridad P1)",
              user_story: "Como responsable de talento, requiero incorporar en la bienvenida de nuevos empleados la capacitación sobre el uso exclusivo del portal privado de IA corporativa.",
              criterios_aceptacion: [
                "Capacitación de 20 minutos con evaluación práctica de prompts seguros.",
                "Firma digital del anexo de confidencialidad y política de teletrabajo.",
                "Registro de completitud exigido por el Artículo 4 del EU AI Act."
              ],
              definicion_hecho: "100% de la plantilla capacitada con certificado digital emitido."
            }
          ],
          manual_proceso: "Regla de oro para el empleado: Está terminantemente prohibido pegar listados de clientes, fórmulas, balances o contratos en herramientas de IA personales gratuitas. Toda consulta debe canalizarse por el portal institucional."
        });
      }
      setCargandoTraductor(false);
    }, 500);
  };

  // 5. Gestor de Práctica y FinOps (El Controlador)
  const [filtroAsuntoFinOps, setFiltroAsuntoFinOps] = useState<'todos' | 'corein' | 'machtig' | 'aigovern' | 'sub1308'>('todos');
  const [alertaGeneradaFinOps, setAlertaGeneradaFinOps] = useState<string | null>(null);

  const casosFinOps = [
    {
      id: "machtig",
      nombre: "Machtig Rothe, C.A. - Arrendamiento & Vías de Hecho",
      materia: "Inquilinario / Mercantil",
      horas_presupuestadas: 30,
      horas_reales: 28,
      tarifa_hora: "140 USD",
      total_facturado: "4.200 USD",
      estado_cobro: "Al día",
      plazo_critico: "6 días (Vencimiento preaviso prórroga)",
      riesgo_plazo: "Rojo (Crítico)",
      scope_creep: false
    },
    {
      id: "corein",
      nombre: "Corein, C.A. - Auditoría Forense de Inventario y Deuda",
      materia: "Auditoría / Compliance",
      horas_presupuestadas: 45,
      horas_reales: 58,
      tarifa_hora: "150 USD",
      total_facturado: "6.750 USD",
      estado_cobro: "Factura N° 104 pendiente (15 días vencida)",
      plazo_critico: "12 días (Presentación informe al Directorio)",
      riesgo_plazo: "Amarillo (Seguimiento)",
      scope_creep: true,
      horas_exceso: 13
    },
    {
      id: "aigovern",
      nombre: "AI GOVERN S.L. - Contratación SaaS & DPA Internacional",
      materia: "Tecnología / LegalTech",
      horas_presupuestadas: 50,
      horas_reales: 34,
      tarifa_hora: "180 €",
      total_facturado: "9.000 €",
      estado_cobro: "Cobrado por anticipado (Retainer)",
      plazo_critico: "30 días (Renovación trimestral infraestructura)",
      riesgo_plazo: "Verde (En regla)",
      scope_creep: false
    },
    {
      id: "sub1308",
      nombre: "Sub 1308, C.A. - Reestructuración y Actas Extraordinarias",
      materia: "Societario / Registral",
      horas_presupuestadas: 20,
      horas_reales: 19,
      tarifa_hora: "120 USD",
      total_facturado: "2.400 USD",
      estado_cobro: "Al día",
      plazo_critico: "3 días (Término para consignación en Registro)",
      riesgo_plazo: "Rojo (Crítico)",
      scope_creep: false
    }
  ];

  // 6. Grabación y Minutas (Notetaker con Whisper On-Premise)
  const [grabandoAudioLocal, setGrabandoAudioLocal] = useState(false);
  const [segundosGrabacion, setSegundosGrabacion] = useState(0);
  const [audioUrlLocal, setAudioUrlLocal] = useState<string | null>(null);
  const [archivoAudioNombre, setArchivoAudioNombre] = useState<string | null>(null);
  const [cargandoTranscripcionWhisper, setCargandoTranscripcionWhisper] = useState(false);
  const [mediaRecorderRef, setMediaRecorderRef] = useState<any>(null);
  const [minutaWhisper, setMinutaWhisper] = useState<any>({
    titulo: "Comité Ejecutivo: Negociación y Cierre de Contrato SaaS con Acme Corp",
    fecha: "24 de Septiembre de 2026",
    duracion: "36 minutos",
    plataforma: "Grabación de Sala Soberana (Whisper On-Premise)",
    hash_sha256: "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
    transcripcion_extracto: "...acordamos que el límite de responsabilidad será de 12 meses. Sobre los datos corporativos, ninguna información viajará a nubes públicas sin anonimización previa. La entrega de los primeros 2 flujos será en 21 días...",
    acuerdos: [
      "Fijación de tarifa: 60.000 €/año facturado por anticipado.",
      "SLA garantizado al 99.9% con penalizaciones compensables en servicios.",
      "Cláusula Zero-Trust: Prohibición absoluta de reentrenamiento de modelos comerciales con datos de Acme.",
      "Fuero y jurisdicción exclusiva en los tribunales de Madrid (España) / Delaware (EE.UU.)."
    ],
    action_items: [
      { id: "ACT-01", tarea: "Enviar borrador MSA con SLA 99.9% y DPA anexo redactado", responsable: "Barbara Piccolo", plazo: "Viernes 17:00", prioridad: "Alta", kanban_columna: "Por Hacer", agregado: true },
      { id: "ACT-02", tarea: "Remitir poderes del administrador y NIF para firma eIDAS", responsable: "Roberto Sánchez (Acme)", plazo: "Jueves 18:00", prioridad: "Media", kanban_columna: "Por Hacer", agregado: false },
      { id: "ACT-03", tarea: "Desplegar VPC privada y configurar credenciales seguras de inferencia", responsable: "Director TI / Sistemas", plazo: "Lunes 12:00", prioridad: "Alta", kanban_columna: "Por Hacer", agregado: false }
    ],
    puntos_abiertos: [
      "Definición del esquema de penalización o créditos de servicio ante caídas superiores a 30 minutos.",
      "Aprobación final de cláusula de rescisión sin causa con preaviso formal de sesenta (60) días."
    ]
  });

  // Temporizador de grabación
  React.useEffect(() => {
    let intervalo: any = null;
    if (grabandoAudioLocal) {
      intervalo = setInterval(() => {
        setSegundosGrabacion(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }
    return () => clearInterval(intervalo);
  }, [grabandoAudioLocal]);

  // Función para alternar grabación con MediaRecorder del navegador
  const alternarGrabacionAudioLocal = async () => {
    if (grabandoAudioLocal) {
      if (mediaRecorderRef) {
        try {
          mediaRecorderRef.stop();
          if (mediaRecorderRef.stream) {
            mediaRecorderRef.stream.getTracks().forEach((track: any) => track.stop());
          }
        } catch (e) {
          console.error("Error deteniendo grabador:", e);
        }
      }
      setGrabandoAudioLocal(false);
    } else {
      try {
        if (typeof window !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const recorder = new (window as any).MediaRecorder(stream);
          const chunks: any[] = [];
          
          recorder.ondataavailable = (e: any) => {
            if (e.data && e.data.size > 0) chunks.push(e.data);
          };
          
          recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/webm' });
            const url = URL.createObjectURL(blob);
            setAudioUrlLocal(url);
            setArchivoAudioNombre("grabacion_sala_local.webm");
            procesarAudioConWhisper(blob, "grabacion_sala_local.webm");
          };
          
          recorder.start();
          setMediaRecorderRef(recorder);
          setGrabandoAudioLocal(true);
          setSegundosGrabacion(0);
        } else {
          // Simulación amigable si el navegador restringe permisos de micrófono en sandbox
          setGrabandoAudioLocal(true);
          setSegundosGrabacion(0);
        }
      } catch (err) {
        console.error("Acceso al micrófono no concedido:", err);
        // Activar modo simulado interactivo
        setGrabandoAudioLocal(true);
        setSegundosGrabacion(0);
      }
    }
  };

  // Manejador de subida de archivo
  const handleSubirArchivoAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArchivoAudioNombre(file.name);
      setAudioUrlLocal(URL.createObjectURL(file));
      procesarAudioConWhisper(file, file.name);
    }
  };

  // Envío a endpoint Whisper mediante FormData
  const procesarAudioConWhisper = async (fileOrBlob: Blob | File, nombre: string) => {
    setCargandoTranscripcionWhisper(true);
    const formData = new FormData();
    formData.append('file', fileOrBlob, nombre);

    try {
      const res = await fetch('http://localhost:8000/api/v1/audio/transcribe', {
        method: 'POST',
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        setMinutaWhisper({
          titulo: data.titulo || "Minuta de Negociación & Sesión Estratégica",
          fecha: data.fecha || "24 de Septiembre de 2026",
          duracion: data.duracion || `${Math.max(1, Math.floor(segundosGrabacion / 60))} min ${segundosGrabacion % 60} seg`,
          plataforma: "Whisper Zero-Trust On-Premise",
          hash_sha256: data.hash_sha256 || "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
          transcripcion_extracto: data.resumen_ejecutivo || "Transcripción completada con éxito. Cero fuga de datos corporativos.",
          acuerdos: data.acuerdos || [],
          action_items: (data.action_items || []).map((ai: any) => ({ ...ai, agregado: false })),
          puntos_abiertos: data.puntos_abiertos || []
        });
      } else {
        throw new Error("Servicio local en fallback");
      }
    } catch (err) {
      setTimeout(() => {
        setMinutaWhisper((prev: any) => ({
          ...prev,
          titulo: `Minuta Certificada: ${nombre.replace(/\.[^/.]+$/, "")}`,
          fecha: "24 de Septiembre de 2026",
          duracion: segundosGrabacion > 0 ? `${Math.floor(segundosGrabacion / 60)}m ${segundosGrabacion % 60}s` : "34 minutos",
          hash_sha256: "8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d"
        }));
      }, 600);
    } finally {
      setCargandoTranscripcionWhisper(false);
    }
  };

  const agregarItemAKanban = (item: any) => {
    setTableroKanban(prev => [
      {
        id: `KAN-${Date.now().toString().slice(-4)}`,
        titulo: item.tarea,
        responsable: item.responsable,
        plazo: item.plazo,
        prioridad: item.prioridad,
        columna: "Por Hacer",
        origen: "Minuta Notetaker"
      },
      ...prev
    ]);
    setMinutaWhisper((prev: any) => ({
      ...prev,
      action_items: prev.action_items.map((ai: any) => 
        ai.id === item.id ? { ...ai, agregado: true } : ai
      )
    }));
  };


  // Estados interactivos
    // Estado para Actas de Reunión & Grabación
  const [grabandoAudio, setGrabandoAudio] = useState(false);
  const [tiempoGrabacion, setTiempoGrabacion] = useState(0);
  const [actaGenerada, setActaGenerada] = useState<any>({
    titulo: "Negociación SaaS Enterprise & DPA con Acme Corp S.A.",
    fecha: "15 de Septiembre de 2026",
    duracion: "42 minutos",
    plataforma: "Google Meet (Extensión Privada)",
    participantes: ["Barbara Piccolo (General Counsel)", "Roberto Sánchez (Director TI Acme Corp)"],
    resumen: "Se acordaron los términos de la suscripción anual por 60.000 €. Acme aceptó el fuero en Madrid y el límite de responsabilidad de 12 meses a cambio de elevar el SLA al 99.9% anual y prohibición estricta de reentrenamiento de IA.",
    acuerdos_clave: [
      "Precio cerrado: 60.000 €/año facturado anualmente por adelantado.",
      "SLA garantizado del 99.9% con créditos de servicio en caso de caída superior al 0.1%.",
      "Cláusula Zero-Trust: Prohibición absoluta de reentrenamiento de modelos comerciales con datos de Acme.",
      "Fuero y jurisdicción exclusiva en los tribunales de Madrid (España)."
    ],
    action_items: [
      { responsable: "Barbara Piccolo", tarea: "Enviar SaaS MSA adaptado con SLA 99.9% y DPA anexo", plazo: "Antes del viernes" },
      { responsable: "Roberto Sánchez (Acme)", tarea: "Remitir poderes del administrador y NIF para firma eIDAS", plazo: "Jueves 18:00" }
    ],
    hash_sha256: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
  });

  const [textoAduana, setTextoAduana] = useState("El cliente Juan Pérez con DNI 12345678Z y correo juan.perez@empresa.com solicita contrato con pago a cuenta ES1234567890123456789012 por 50.000 €.");
  const [resultadoAduana, setResultadoAduana] = useState<any>(null);
  const [cargandoAduana, setCargandoAduana] = useState(false);

  const [tipoContrato, setTipoContrato] = useState('SaaS_MSA');
  const [jurisdiccion, setJurisdiccion] = useState('España (Madrid / UE)');
  const [partesContrato, setPartesContrato] = useState('AI GOVERN S.L. y Acme Corp S.A.');
  const [detallesContrato, setDetallesContrato] = useState('Suscripción enterprise 60.000 €/año, SLA 99.9%, sin reentrenamiento IA, límite 12 meses.');
  const [contratoGenerado, setContratoGenerado] = useState('');
  const [generandoContrato, setGenerandoContrato] = useState(false);

  const [textoTercero, setTextoTercero] = useState("Cláusula 9: El Proveedor indemnizará de forma ilimitada al Cliente. Todo código y algoritmos pertenecerán al Cliente. Tribunales de Singapur.");
  const [analisisPlaybook, setAnalisisPlaybook] = useState<any>(null);

  const ejecutarAnonimizacion = () => {
    setCargandoAduana(true);
    setTimeout(() => {
      let t = textoAduana.replace(/juan\.perez@empresa\.com/g, '[EMAIL_1]')
                          .replace(/12345678Z/g, '[DNI_1]')
                          .replace(/Juan Pérez/g, '[CLIENTE_1]')
                          .replace(/ES1234567890123456789012/g, '[IBAN_1]');
      setResultadoAduana({ texto_anonimizado: t, tokens_ofuscados: 4, hash_sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", status: "Sanitizado en memoria local (Zero Egress PII)" });
      setCargandoAduana(false);
    }, 400);
  };

  const ejecutarGeneracionContrato = () => {
    setGenerandoContrato(true);
    setTimeout(() => {
      setContratoGenerado(
        `CONTRATO MARCO SAAS ENTERPRISE\nJURISDICCIÓN: ${jurisdiccion.toUpperCase()}\nFECHA: Septiembre 2026\n\n` +
        `PARTES: AI GOVERN (Prestador) y ${partesContrato} (Cliente).\n\n` +
        `CLÁUSULA 1. OBJETO Y SLA (99.9%)\nSuscripción no exclusiva conforme a las especificaciones técnicas acordadas.\n\n` +
        `CLÁUSULA 2. SOBERANÍA Y PROHIBICIÓN DE REENTRENAMIENTO (EU AI ACT & RGPD)\nNingún dato o código del Cliente alimentará modelos públicos de terceros.\n\n` +
        `CLÁUSULA 3. RESPONSABILIDAD ACOTADA (PLAYBOOK)\nLímite agregado máximo equivalente a 12 meses de facturación.\n\n` +
        `CLÁUSULA 4. LEY Y FUERO\nSometido a los juzgados y tribunales de ${jurisdiccion}.`
      );
      setGenerandoContrato(false);
    }, 500);
  };

  const ejecutarAuditoriaPlaybook = () => {
    setAnalisisPlaybook({
      alerta_roja: [
        "Indemnidad ilimitada detectada (Inaceptable: estándar corporativo es límite 1x anual).",
        "Cesión de código y algoritmos propietarios (Riesgo crítico de pérdida de IP).",
        "Fuero hostil en Singapur (Exige fuero en Madrid o arbitraje neutral en Delaware)."
      ],
      redline_sugerido: "Reemplazar por: 'Responsabilidad sujeta al límite de 12 meses de facturación. Cada parte retiene la titularidad exclusiva de su IP previa. Jurisdicción: Madrid (España).'"
    });
  };

  return (
    <div className="flex h-screen bg-[#090d16] text-slate-100 overflow-hidden font-sans">
      
      {/* SIDEBAR DESPLEGABLE */}
      <aside className="w-72 bg-[#0d1322] border-r border-[#1f2d4a] flex flex-col justify-between p-3.5 select-none overflow-hidden">
        <div className="space-y-4 overflow-y-auto pr-1">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-purple-600 p-[1.5px] flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-[#090d16] rounded-[10px] flex items-center justify-center">
                <Shield className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                AI GOVERN <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>
              <div className="font-mono text-[10px] text-cyan-400/80 tracking-wider">ENTERPRISE LEGAL OS</div>
            </div>
          </div>

          <div className="relative px-1">
            <Search className="w-3.5 h-3.5 absolute left-3.5 top-2.5 text-slate-400" />
            <input type="text" placeholder="Buscar contrato, filial o hito..." className="w-full bg-[#121a2d] border border-[#1f2d4a] rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono" />
          </div>

          {/* SUITE DE LOS 6 ASISTENTES DE IA */}
          <div className="border border-cyan-500/50 rounded-xl bg-gradient-to-b from-[#0f172a] to-[#0b101d] overflow-hidden shadow-lg shadow-cyan-950/40">
            <button 
              onClick={() => togglePillar('asistentes_ia')} 
              className="w-full px-3 py-2.5 flex items-center justify-between text-xs font-mono font-bold text-white hover:bg-[#131f38] transition-colors"
            >
              <span className="flex items-center gap-2 text-cyan-300 font-extrabold tracking-wide">
                <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>6 ASISTENTES DE IA</span>
              </span>
              {openPillars.asistentes_ia ? <ChevronDown className="w-3.5 h-3.5 text-cyan-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {openPillars.asistentes_ia && (
              <div className="p-1.5 space-y-1 border-t border-cyan-500/20 bg-[#090d16]/70 font-mono text-[11px]">
                <button 
                  onClick={() => setActiveTab('asistente_triage')} 
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    activeTab === 'asistente_triage' ? 'bg-cyan-500/25 text-cyan-200 font-bold border border-cyan-500/40' : 'text-slate-300 hover:bg-[#121a2d]'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="truncate">1. Ingesta y Triage (Recepcionista)</span>
                </button>
                <button 
                  onClick={() => setActiveTab('asistente_ensamblaje')} 
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    activeTab === 'asistente_ensamblaje' ? 'bg-emerald-500/25 text-emerald-200 font-bold border border-emerald-500/40' : 'text-slate-300 hover:bg-[#121a2d]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">2. Ensamblaje Documental (Plantillas)</span>
                </button>
                <button 
                  onClick={() => setActiveTab('asistente_redliner')} 
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    activeTab === 'asistente_redliner' ? 'bg-purple-500/25 text-purple-200 font-bold border border-purple-500/40' : 'text-slate-300 hover:bg-[#121a2d]'
                  }`}
                >
                  <Scale className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                  <span className="truncate">3. Auditor Contrapartes (Redliner)</span>
                </button>
                <button 
                  onClick={() => setActiveTab('asistente_traductor')} 
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    activeTab === 'asistente_traductor' ? 'bg-blue-500/25 text-blue-200 font-bold border border-blue-500/40' : 'text-slate-300 hover:bg-[#121a2d]'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">4. Traductor Estratégico (Puente)</span>
                </button>
                <button 
                  onClick={() => setActiveTab('asistente_finops')} 
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    activeTab === 'asistente_finops' ? 'bg-amber-500/25 text-amber-200 font-bold border border-amber-500/40' : 'text-slate-300 hover:bg-[#121a2d]'
                  }`}
                >
                  <BarChart3 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate">5. Gestor Práctica & FinOps</span>
                </button>
                <button 
                  onClick={() => setActiveTab('asistente_notetaker')} 
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all ${
                    activeTab === 'asistente_notetaker' || activeTab === 'actas_reunion' ? 'bg-pink-500/25 text-pink-200 font-bold border border-pink-500/40' : 'text-slate-300 hover:bg-[#121a2d]'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span className="truncate">6. Grabación y Minutas (Whisper)</span>
                </button>
              </div>
            )}
          </div>

          {/* PILAR I */}
          <div className="border border-[#1f2d4a]/80 rounded-xl bg-[#0b101d] overflow-hidden">
            <button onClick={() => togglePillar('pilar1')} className="w-full px-3 py-2 flex items-center justify-between text-xs font-mono font-bold text-slate-200 hover:bg-[#121a2d]">
              <span className="flex items-center gap-2 text-cyan-300"><span>📊</span> I. DIRECCIÓN & CAIO</span>
              {openPillars.pilar1 ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {openPillars.pilar1 && (
              <div className="p-1.5 space-y-0.5 border-t border-[#1f2d4a]/60 bg-[#090d16]/40">
                <button onClick={() => setActiveTab('caio')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'caio' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" /><span className="truncate">Torre CAIO & Trust Reports</span>
                </button>
                <button onClick={() => setActiveTab('general_counsel')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'general_counsel' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" /><span className="truncate">Portal del General Counsel</span>
                </button>
                <button onClick={() => setActiveTab('metricas_finops')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'metricas_finops' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <BarChart3 className="w-3.5 h-3.5 text-emerald-400" /><span className="truncate">FinOps & Métricas Financieras</span>
                </button>
              </div>
            )}
          </div>

          {/* PILAR II */}
          <div className="border border-[#1f2d4a]/80 rounded-xl bg-[#0b101d] overflow-hidden">
            <button onClick={() => togglePillar('pilar2')} className="w-full px-3 py-2 flex items-center justify-between text-xs font-mono font-bold text-slate-200 hover:bg-[#121a2d]">
              <span className="flex items-center gap-2 text-emerald-300"><span>💼</span> II. TALLER JURÍDICO</span>
              {openPillars.pilar2 ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {openPillars.pilar2 && (
              <div className="p-1.5 space-y-0.5 border-t border-[#1f2d4a]/60 bg-[#090d16]/40">
                <button onClick={() => setActiveTab('aduana')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'aduana' ? 'bg-emerald-500/20 text-emerald-300' : 'text-emerald-400 hover:bg-emerald-500/10'}`}>
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /><span className="truncate">[Paso 0] Aduana PII / Secretos</span>
                </button>
                                <button onClick={() => setActiveTab('actas_reunion')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${activeTab === 'actas_reunion' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <Mic className="w-3.5 h-3.5 text-pink-400" /><span className="truncate">Actas de Reunión & Minutas AI</span>
                </button>
                <button onClick={() => setActiveTab('redaccion')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'redaccion' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <FileText className="w-3.5 h-3.5 text-cyan-400" /><span className="truncate">Estudio de Redacción SaaS/NDA</span>
                </button>
                <button onClick={() => setActiveTab('playbook')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'playbook' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <Scale className="w-3.5 h-3.5 text-purple-400" /><span className="truncate">Hub Negociación & Playbook</span>
                </button>
                <button onClick={() => setActiveTab('calendario')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'calendario' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /><span className="truncate">Calendario & Alertas Slack/WA</span>
                </button>
                <button onClick={() => setActiveTab('societario')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'societario' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <Building2 className="w-3.5 h-3.5 text-blue-400" /><span className="truncate">Secretaría Societaria & Filiales</span>
                </button>
                <button onClick={() => setActiveTab('due_diligence')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'due_diligence' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <Layers className="w-3.5 h-3.5 text-emerald-400" /><span className="truncate">Due Diligence & Data Room</span>
                </button>
                <button onClick={() => setActiveTab('ip_shield')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'ip_shield' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <FolderGit2 className="w-3.5 h-3.5 text-pink-400" /><span className="truncate">IP & Open Source Shield</span>
                </button>
                <button onClick={() => setActiveTab('rag_precedentes')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'rag_precedentes' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <FileCheck2 className="w-3.5 h-3.5 text-sky-400" /><span className="truncate">Biblioteca Maestra & RAG</span>
                </button>
              </div>
            )}
          </div>

          {/* PILAR III */}
          <div className="border border-[#1f2d4a]/80 rounded-xl bg-[#0b101d] overflow-hidden">
            <button onClick={() => togglePillar('pilar3')} className="w-full px-3 py-2 flex items-center justify-between text-xs font-mono font-bold text-slate-200 hover:bg-[#121a2d]">
              <span className="flex items-center gap-2 text-purple-300"><span>🛡️</span> III. COMPLIANCE & CRM</span>
              {openPillars.pilar3 ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
            </button>
            {openPillars.pilar3 && (
              <div className="p-1.5 space-y-0.5 border-t border-[#1f2d4a]/60 bg-[#090d16]/40">
                <button onClick={() => setActiveTab('crm')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'crm' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <MessageSquare className="w-3.5 h-3.5 text-cyan-400" /><span className="truncate">Ventanilla Legal (Estilo Clio)</span>
                </button>
                <button onClick={() => setActiveTab('outside_counsel')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'outside_counsel' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <Scale className="w-3.5 h-3.5 text-amber-400" /><span className="truncate">Control Despachos Externos</span>
                </button>
                <button onClick={() => setActiveTab('canal_etico')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'canal_etico' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <HelpCircle className="w-3.5 h-3.5 text-blue-400" /><span className="truncate">Canal Ético (Ley 2/2023)</span>
                </button>
                <button onClick={() => setActiveTab('radar_shadow')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'radar_shadow' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <Radio className="w-3.5 h-3.5 text-red-400" /><span className="truncate">Radar Anti-Shadow AI</span>
                </button>
                <button onClick={() => setActiveTab('boveda')} className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs ${activeTab === 'boveda' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-300 hover:bg-[#121a2d]'}`}>
                  <Lock className="w-3.5 h-3.5 text-emerald-400" /><span className="truncate">Bóveda Forense SHA-256</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Profile */}
        <div className="pt-3 border-t border-[#1f2d4a] flex items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center font-bold text-xs text-slate-950 font-mono">BP</div>
            <div>
              <div className="text-xs font-bold text-white">Barbara Piccolo</div>
              <div className="text-[10px] text-cyan-400 font-mono">General Counsel & CAIO</div>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-[#1f2d4a] bg-[#0d1322]/90 backdrop-blur-md px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>AI GOVERN</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-cyan-300 font-semibold uppercase">{activeTab.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono">
              <CheckCircle2 className="w-3 h-3" /> EU AI Act & RGPD Online
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono">
              Soberanía ES · US · LATAM
            </span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">

          
          {/* ========================================================================= */}
          {/* ASISTENTE 1: INGESTA Y TRIAGE (EL RECEPCIONISTA ANALÍTICO)                 */}
          {/* ========================================================================= */}
          {activeTab === 'asistente_triage' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-cyan-400" /> 1. Asistente de Ingesta y Triage (El Recepcionista Analítico)
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Estructura el caos inicial del cliente (audios largos, hilos de correo desordenados, capturas y documentos escaneados): extrae los hechos, identifica las partes, detecta el nivel de urgencia, propone la apertura del expediente y genera la primera tarea en el tablero Kanban.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                    Triage Heurístico
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    Conexión Kanban Activa
                  </span>
                </div>
              </div>

              {/* Panel Superior: Entrada de Datos y Resultados */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Columna Izquierda: Input Multi-Canal */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3 shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-cyan-300 font-bold uppercase">Canal de Entrada del Cliente</span>
                      <span className="text-[10px] font-mono text-slate-400">Paso 1: Captura</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#090d16] rounded-lg border border-[#1f2d4a]">
                      <button 
                        onClick={() => setCanalTriage('email')}
                        className={`py-1.5 px-2 rounded text-[11px] font-mono transition-all truncate ${canalTriage === 'email' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        📧 Hilo Email
                      </button>
                      <button 
                        onClick={() => setCanalTriage('whatsapp')}
                        className={`py-1.5 px-2 rounded text-[11px] font-mono transition-all truncate ${canalTriage === 'whatsapp' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        💬 Chat / WhatsApp
                      </button>
                      <button 
                        onClick={() => setCanalTriage('audio')}
                        className={`py-1.5 px-2 rounded text-[11px] font-mono transition-all truncate ${canalTriage === 'audio' ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        🎤 Audio Cliente
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-slate-400 flex justify-between">
                        <span>Texto sin estructurar del cliente:</span>
                        <span className="text-cyan-400 text-[10px] cursor-pointer hover:underline" onClick={() => setTextoTriage(`De: finanzas@corein.com\nAsunto: Reclamo urgente cobro de facturas proveedor y retención de despacho en aduana\n\nDra. Piccolo, nos llegó notificación de embargo preventivo por supuesta deuda de 28.000 USD de un embarque de tornillería que llegó con discrepancias de peso el mes pasado. El proveedor nos amenaza con paralizar todo despacho si no pagamos en 24 horas. Necesitamos evaluar las facturas, determinar la procedencia legal y responder formalmente hoy mismo.`)}>
                          Cargar Caso Alternativo (Corein)
                        </span>
                      </label>
                      <textarea 
                        rows={8}
                        value={textoTriage}
                        onChange={(e) => setTextoTriage(e.target.value)}
                        className="w-full p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a] text-xs text-slate-200 font-mono focus:border-cyan-400 focus:outline-none leading-relaxed"
                        placeholder="Pega aquí el correo, transcripción de WhatsApp o notas del cliente..."
                      />
                    </div>

                    <button 
                      onClick={ejecutarTriageAnalitico}
                      disabled={cargandoTriage}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      {cargandoTriage ? "Analizando y Estructurando Hechos..." : "Estructurar Problema & Ejecutar Triage"}
                    </button>
                  </div>
                </div>

                {/* Columna Derecha: Diagnóstico y Estructuración */}
                <div className="lg:col-span-7 space-y-4">
                  {resultadoTriage && (
                    <div className="p-5 rounded-xl bg-[#121a2d] border border-cyan-500/30 space-y-4 shadow-xl">
                      <div className="flex justify-between items-center pb-2 border-b border-[#1f2d4a]">
                        <span className="font-mono text-xs text-cyan-300 font-bold uppercase flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Diagnóstico y Clasificación Heurística
                        </span>
                        <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold ${
                          resultadoTriage.urgencia === 'Crítica' ? 'bg-red-500/20 text-red-300 border border-red-500/40 animate-pulse' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        }`}>
                          URGENCIA: {resultadoTriage.urgencia.toUpperCase()} ({resultadoTriage.plazo_horas}h Límite)
                        </span>
                      </div>

                      {/* Partes y Hechos */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-1.5 text-xs font-mono">
                          <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">Partes Involucradas</div>
                          <div className="text-slate-300"><strong className="text-white">Cliente:</strong> {resultadoTriage.partes.cliente}</div>
                          <div className="text-slate-300"><strong className="text-white">Contraparte:</strong> {resultadoTriage.partes.contraparte}</div>
                          <div className="text-slate-400 text-[11px]"><strong className="text-slate-300">Terceros:</strong> {resultadoTriage.partes.terceros}</div>
                        </div>

                        <div className="p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-1.5 text-xs font-mono">
                          <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">Apertura de Expediente Sugerida</div>
                          <div className="text-white font-bold">{resultadoTriage.expediente_sugerido.codigo}</div>
                          <div className="text-cyan-300 text-[11px] truncate">{resultadoTriage.expediente_sugerido.titulo}</div>
                          <div className="text-slate-400 text-[10px]">Asignado: {resultadoTriage.expediente_sugerido.responsable} • {resultadoTriage.expediente_sugerido.materia}</div>
                        </div>
                      </div>

                      {/* Hechos Clave Extraídos */}
                      <div className="p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-2">
                        <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase">Hechos Jurídicos y Operativos Relevantes</div>
                        <ul className="space-y-1.5 text-xs font-mono text-slate-300">
                          {resultadoTriage.hechos_clave.map((h: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-cyan-400 font-bold">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Primera Tarea para el Tablero Kanban */}
                      <div className="p-4 rounded-xl bg-gradient-to-r from-[#13233f] to-[#0d172a] border border-cyan-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-mono font-bold">
                              PRIORIDAD {resultadoTriage.primera_tarea.prioridad.toUpperCase()}
                            </span>
                            <span className="text-xs font-mono text-slate-400">Plazo: {resultadoTriage.primera_tarea.plazo}</span>
                          </div>
                          <div className="text-xs font-mono font-bold text-white">
                            {resultadoTriage.primera_tarea.titulo}
                          </div>
                          <div className="text-[10px] font-mono text-cyan-300">
                            Responsable: {resultadoTriage.primera_tarea.responsable} • Destino: Tablero Kanban [Por Hacer]
                          </div>
                        </div>

                        <button 
                          onClick={agregarTareaTriageAKanban}
                          disabled={resultadoTriage.tarea_agregada}
                          className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                            resultadoTriage.tarea_agregada 
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default' 
                              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md cursor-pointer'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {resultadoTriage.tarea_agregada ? "Añadida al Kanban ✓" : "Añadir al Tablero Kanban"}
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              </div>

              {/* Tablero Kanban del Despacho Integrado */}
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#1f2d4a]">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-xs text-white font-bold uppercase">Tablero Kanban de Tareas Operativas del Despacho</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{tableroKanban.length} Tareas Activas Sincronizadas</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 font-mono text-xs">
                  {['Por Hacer', 'En Proceso', 'En Revisión (HITL)', 'Completado'].map((col) => {
                    const tareasCol = tableroKanban.filter(t => t.columna === col);
                    return (
                      <div key={col} className="p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-2 flex flex-col justify-between min-h-[160px]">
                        <div>
                          <div className="flex justify-between items-center pb-2 border-b border-[#1f2d4a]/60 text-[11px] font-bold text-slate-300">
                            <span>{col}</span>
                            <span className="px-1.5 py-0.2 rounded bg-[#1f2d4a] text-slate-400 text-[10px]">{tareasCol.length}</span>
                          </div>
                          <div className="space-y-2 mt-2">
                            {tareasCol.map((tarea) => (
                              <div key={tarea.id} className="p-2 rounded bg-[#121a2d] border border-[#1f2d4a] hover:border-cyan-500/40 transition-colors space-y-1 shadow-sm">
                                <div className="flex items-center justify-between text-[9px]">
                                  <span className={`px-1.5 py-0.2 rounded font-bold ${
                                    tarea.prioridad === 'Crítica' ? 'bg-red-500/20 text-red-300' :
                                    tarea.prioridad === 'Alta' ? 'bg-amber-500/20 text-amber-300' : 'bg-blue-500/20 text-blue-300'
                                  }`}>
                                    {tarea.prioridad}
                                  </span>
                                  <span className="text-slate-500">{tarea.plazo}</span>
                                </div>
                                <div className="text-[11px] text-white font-medium leading-snug">{tarea.titulo}</div>
                                <div className="text-[9px] text-cyan-400/80 flex justify-between">
                                  <span>{tarea.responsable}</span>
                                  <span className="text-slate-500">{tarea.origen || 'Triage'}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* ASISTENTE 2: MOTOR DE ENSAMBLAJE DOCUMENTAL (EL OPERADOR DE PLANTILLAS)  */}
          {/* ========================================================================= */}
          {activeTab === 'asistente_ensamblaje' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <FileText className="w-6 h-6 text-emerald-400" /> 2. Motor de Ensamblaje Documental (El Operador de Plantillas)
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    El valor del abogado está en sus propios modelos. Este asistente no "inventa" contratos; toma el formulario completado en el CRM y mapea esos datos directamente sobre tus plantillas inmutables, respetando el formato, la numeración y el estilo exacto de tu despacho.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    Modelos Inmutables
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                    Zero Hallucination
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Formulario y Selección de Modelo */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3 shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-emerald-300 font-bold uppercase">1. Seleccionar Modelo Inmutable del Despacho</span>
                      <span className="text-[10px] font-mono text-slate-400">Biblioteca Propia</span>
                    </div>

                    <div className="space-y-1.5">
                      <select 
                        value={plantillaSeleccionada}
                        onChange={(e: any) => setPlantillaSeleccionada(e.target.value)}
                        className="w-full p-2.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] text-xs text-emerald-300 font-mono focus:border-emerald-400 focus:outline-none"
                      >
                        <option value="arrendamiento_comercial">Contrato Arrendamiento Comercial con Mejoras (Machtig Rothe C.A.)</option>
                        <option value="poder_especial">Poder Especial Amplio y de Disposición (Estándar Piccolo)</option>
                        <option value="nda_bilateral">Acuerdo de Confidencialidad y No Divulgación (NDA Bilateral)</option>
                        <option value="asamblea_extraordinaria">Acta de Asamblea General Extraordinaria (Sub 1308 C.A.)</option>
                      </select>
                    </div>

                    <div className="pt-2 border-t border-[#1f2d4a] space-y-3 font-mono text-xs">
                      <div className="text-[10px] text-slate-400 font-bold uppercase">2. Datos Sincronizados desde el CRM</div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Parte A (Otorgante / Arrendador):</label>
                          <input 
                            type="text" 
                            value={formDataCRM.arrendador_nombre}
                            onChange={(e) => setFormDataCRM({...formDataCRM, arrendador_nombre: e.target.value})}
                            className="w-full p-2 rounded bg-[#090d16] border border-[#1f2d4a] text-slate-200 text-xs focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">RIF / Identificación Parte A:</label>
                          <input 
                            type="text" 
                            value={formDataCRM.arrendador_rif}
                            onChange={(e) => setFormDataCRM({...formDataCRM, arrendador_rif: e.target.value})}
                            className="w-full p-2 rounded bg-[#090d16] border border-[#1f2d4a] text-slate-200 text-xs focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Parte B (Beneficiario / Arrendatario):</label>
                          <input 
                            type="text" 
                            value={formDataCRM.arrendatario_nombre}
                            onChange={(e) => setFormDataCRM({...formDataCRM, arrendatario_nombre: e.target.value})}
                            className="w-full p-2 rounded bg-[#090d16] border border-[#1f2d4a] text-slate-200 text-xs focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">RIF / Identificación Parte B:</label>
                          <input 
                            type="text" 
                            value={formDataCRM.arrendatario_rif}
                            onChange={(e) => setFormDataCRM({...formDataCRM, arrendatario_rif: e.target.value})}
                            className="w-full p-2 rounded bg-[#090d16] border border-[#1f2d4a] text-slate-200 text-xs focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-1">Ubicación / Objeto del Acto:</label>
                        <input 
                          type="text" 
                          value={formDataCRM.inmueble_ubicacion}
                          onChange={(e) => setFormDataCRM({...formDataCRM, inmueble_ubicacion: e.target.value})}
                          className="w-full p-2 rounded bg-[#090d16] border border-[#1f2d4a] text-slate-200 text-xs focus:border-emerald-400 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Monto / Canon Mensual:</label>
                          <input 
                            type="text" 
                            value={formDataCRM.canon_mensual}
                            onChange={(e) => setFormDataCRM({...formDataCRM, canon_mensual: e.target.value})}
                            className="w-full p-2 rounded bg-[#090d16] border border-[#1f2d4a] text-slate-200 text-xs focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-1">Plazo de Vigencia:</label>
                          <input 
                            type="text" 
                            value={formDataCRM.duracion_meses}
                            onChange={(e) => setFormDataCRM({...formDataCRM, duracion_meses: e.target.value})}
                            className="w-full p-2 rounded bg-[#090d16] border border-[#1f2d4a] text-slate-200 text-xs focus:border-emerald-400 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="p-2.5 rounded bg-[#090d16] border border-[#1f2d4a] flex items-center justify-between">
                        <span className="text-[11px] text-slate-300">Incluir Cláusula Especial de Mejoras Compensables</span>
                        <input 
                          type="checkbox" 
                          checked={formDataCRM.clausula_mejoras}
                          onChange={(e) => setFormDataCRM({...formDataCRM, clausula_mejoras: e.target.checked})}
                          className="w-4 h-4 accent-emerald-500 rounded"
                        />
                      </div>
                    </div>

                    <button 
                      onClick={ejecutarEnsamblajeDocumental}
                      disabled={cargandoEnsamblaje}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      {cargandoEnsamblaje ? "Mapeando Variables sobre Plantilla..." : "Ensamblar Documento sobre Plantilla Inmutable"}
                    </button>
                  </div>
                </div>

                {/* Visor del Documento Ensamblado */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="p-5 rounded-xl bg-[#121a2d] border border-emerald-500/30 space-y-3 shadow-xl">
                    <div className="flex justify-between items-center pb-2 border-b border-[#1f2d4a]">
                      <span className="font-mono text-xs text-emerald-300 font-bold uppercase flex items-center gap-1.5">
                        <FileCheck2 className="w-4 h-4 text-emerald-400" /> Instrumento Ensamblado con Fidelidad Notarial
                      </span>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => {
                            navigator.clipboard.writeText(documentoEnsamblado || "Contenido generado");
                            alert("Texto copiado al portapapeles con formato del despacho.");
                          }}
                          className="px-2.5 py-1 rounded bg-[#090d16] border border-[#1f2d4a] hover:border-emerald-400 text-emerald-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" /> Copiar Texto
                        </button>
                        <button 
                          onClick={() => alert("Generando archivo .DOCX respetando estilos de encabezado y firmas del despacho...")}
                          className="px-2.5 py-1 rounded bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-mono font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3 h-3" /> Descargar DOCX
                        </button>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg bg-[#090d16] border border-[#1f2d4a] font-mono text-xs text-slate-200 leading-relaxed max-h-[500px] overflow-y-auto whitespace-pre-wrap select-text">
                      {documentoEnsamblado || (
                        <div className="text-slate-500 py-12 text-center">
                          Haz clic en "Ensamblar Documento sobre Plantilla Inmutable" para inyectar los datos del CRM en el modelo legal del despacho.
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a] flex items-center justify-between text-[11px] font-mono text-slate-400">
                      <span>✓ Estilo y numeración inmutable preservados</span>
                      <span className="text-emerald-400 font-bold">100% Criterio Piccolo & Asociados</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ASISTENTE 3: AUDITOR DE CONTRAPARTES (EL REDLINER)                          */}
          {/* ========================================================================= */}
          {activeTab === 'asistente_redliner' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Scale className="w-6 h-6 text-purple-400" /> 3. Auditor de Contrapartes (El Redliner)
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Compara lo que envió la otra parte contra tu propio estándar. Lee 50 páginas en segundos, marca en rojo las cláusulas que violan tus políticas corporativas y sugiere el texto alternativo (redline) basado en tus negociaciones pasadas.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono">
                    Auditoría Adversarial
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono">
                    Redlines Inteligentes
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Entrada del Contrato de la Contraparte */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3 shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-purple-300 font-bold uppercase">Contrato Recibido de Contraparte</span>
                      <span className="text-[10px] font-mono text-slate-400">Hasta 50 páginas</span>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-slate-400">Texto contractual a auditar:</label>
                      <textarea 
                        rows={10}
                        value={textoContraparteRedline}
                        onChange={(e) => setTextoContraparteRedline(e.target.value)}
                        className="w-full p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a] text-xs text-slate-200 font-mono focus:border-purple-400 focus:outline-none leading-relaxed"
                        placeholder="Pega aquí las cláusulas o el texto enviado por el abogado de la contraparte..."
                      />
                    </div>

                    <div className="p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-1 text-[11px] font-mono">
                      <div className="text-purple-400 font-bold uppercase">Playbook de Comparación Activo:</div>
                      <div className="text-slate-300">• Límite de responsabilidad estándar: 12 meses de facturación.</div>
                      <div className="text-slate-300">• Prohibición expresa de cesión de IP y código preexistente.</div>
                      <div className="text-slate-300">• Fuero procesal: Madrid / Delaware / Caracas (según filial).</div>
                    </div>

                    <button 
                      onClick={ejecutarAuditoriaRedliner}
                      disabled={cargandoRedliner}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-400 hover:to-pink-500 text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Scale className="w-4 h-4 text-white" />
                      {cargandoRedliner ? "Auditando Cláusulas y Precedentes..." : "Auditar Contraparte y Generar Redlines"}
                    </button>
                  </div>
                </div>

                {/* Resultados y Cláusulas en Rojo con Diff */}
                <div className="lg:col-span-7 space-y-4">
                  {resultadoRedliner && (
                    <div className="p-5 rounded-xl bg-[#121a2d] border border-purple-500/30 space-y-4 shadow-xl">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-2 border-b border-[#1f2d4a]">
                        <div>
                          <span className="font-mono text-xs text-purple-300 font-bold uppercase">Resultado del Dictamen de Auditoría</span>
                          <div className="text-sm font-bold text-white mt-0.5">{resultadoRedliner.nivel_riesgo}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded bg-red-500/20 text-red-300 text-xs font-mono font-bold border border-red-500/30">
                            Score: {resultadoRedliner.score_cumplimiento} / 100
                          </span>
                          <span className="px-2 py-1 rounded bg-[#090d16] text-slate-300 text-xs font-mono border border-[#1f2d4a]">
                            {resultadoRedliner.clausulas_rojas} Alertas Rojas
                          </span>
                        </div>
                      </div>

                      {/* Cláusulas Auditadas */}
                      <div className="space-y-3.5 max-h-[520px] overflow-y-auto pr-1">
                        {resultadoRedliner.hallazgos.map((h: any, idx: number) => (
                          <div key={idx} className="p-4 rounded-xl bg-[#090d16] border border-red-500/30 space-y-2.5 font-mono text-xs shadow-md">
                            <div className="flex justify-between items-center">
                              <span className="text-white font-bold text-sm">{h.clausula}</span>
                              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold border border-red-500/40">
                                {h.severidad}
                              </span>
                            </div>

                            <div className="p-2.5 rounded bg-red-950/20 border border-red-500/20 text-red-300 line-through text-[11px] leading-relaxed">
                              <strong>Texto Contraparte:</strong> {h.texto_original}
                            </div>

                            <div className="p-2.5 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-[11px] leading-relaxed">
                              <strong className="text-emerald-400">Redline Propuesto (Estándar Piccolo):</strong><br/>
                              {h.redline_propuesto}
                            </div>

                            <div className="text-[10px] text-slate-400 pt-1 border-t border-[#1f2d4a] flex justify-between">
                              <span>Violación: {h.violacion_politica}</span>
                              <span className="text-cyan-400 font-semibold">{h.precedente}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex justify-between items-center">
                        <span className="text-[11px] font-mono text-slate-400">Exporta las cláusulas con marcas de revisión para Word.</span>
                        <button 
                          onClick={() => alert("Redlines copiados al portapapeles listos para ser incorporados al correo o documento de réplica.")}
                          className="px-3.5 py-1.5 rounded-lg bg-purple-500 hover:bg-purple-400 text-slate-950 font-mono font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" /> Copiar Redlines para Réplica
                        </button>
                      </div>

                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ASISTENTE 4: EL TRADUCTOR ESTRATÉGICO (EL PUENTE INTERFUNCIONAL)          */}
          {/* ========================================================================= */}
          {activeTab === 'asistente_traductor' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-blue-400" /> 4. El Traductor Estratégico (El Puente Interfuncional)
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    En áreas complejas, el abogado corporativo moderno no solo habla con otros abogados; actúa como el puente estratégico entre las áreas legales y los equipos de tecnología, finanzas o recursos humanos, traduciendo requerimientos regulatorios en tickets de desarrollo ejecutables o manuales de procesos claros.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-mono">
                    Puente Legal-Tech
                  </span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
                    Tickets Jira / Linear
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Selección de Audiencia y Requerimiento Legal */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3 shadow-md">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs text-blue-300 font-bold uppercase">1. Seleccionar Área Destino</span>
                      <span className="text-[10px] font-mono text-slate-400">Interfuncional</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#090d16] rounded-lg border border-[#1f2d4a]">
                      <button 
                        onClick={() => setAreaTraduccion('tecnologia')}
                        className={`py-1.5 px-1.5 rounded text-[11px] font-mono transition-all truncate text-center ${areaTraduccion === 'tecnologia' ? 'bg-blue-500/20 text-blue-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        💻 Tecnología (IT)
                      </button>
                      <button 
                        onClick={() => setAreaTraduccion('finanzas')}
                        className={`py-1.5 px-1.5 rounded text-[11px] font-mono transition-all truncate text-center ${areaTraduccion === 'finanzas' ? 'bg-blue-500/20 text-blue-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        💳 Finanzas
                      </button>
                      <button 
                        onClick={() => setAreaTraduccion('rrhh')}
                        className={`py-1.5 px-1.5 rounded text-[11px] font-mono transition-all truncate text-center ${areaTraduccion === 'rrhh' ? 'bg-blue-500/20 text-blue-300 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
                      >
                        👥 RRHH / Talento
                      </button>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-mono text-slate-400">Requerimiento legal / cláusula normativa a traducir:</label>
                      <textarea 
                        rows={8}
                        value={inputRequerimientoLegal}
                        onChange={(e) => setInputRequerimientoLegal(e.target.value)}
                        className="w-full p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a] text-xs text-slate-200 font-mono focus:border-blue-400 focus:outline-none leading-relaxed"
                        placeholder="Introduce la norma, política de compliance o cláusula contractual..."
                      />
                    </div>

                    <button 
                      onClick={ejecutarTraduccionEstrategica}
                      disabled={cargandoTraductor}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      {cargandoTraductor ? "Traduciendo a Lenguaje Operativo..." : "Traducir a Requerimientos Operativos"}
                    </button>
                  </div>
                </div>

                {/* Entregables Operativos: Tickets y Manual de Proceso */}
                <div className="lg:col-span-7 space-y-4">
                  {resultadoTraduccion && (
                    <div className="p-5 rounded-xl bg-[#121a2d] border border-blue-500/30 space-y-4 shadow-xl">
                      <div className="flex justify-between items-center pb-2 border-b border-[#1f2d4a]">
                        <span className="font-mono text-xs text-blue-300 font-bold uppercase flex items-center gap-1.5">
                          <Cpu className="w-4 h-4 text-blue-400" /> Especificaciones Traducidas para: {resultadoTraduccion.area.toUpperCase()}
                        </span>
                        <button 
                          onClick={() => alert("Tickets exportados en formato JSON y Markdown para Jira / Linear.")}
                          className="px-2.5 py-1 rounded bg-[#090d16] border border-[#1f2d4a] hover:border-blue-400 text-blue-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3 h-3" /> Exportar a Jira
                        </button>
                      </div>

                      {/* Resumen para el líder de área */}
                      <div className="p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-1">
                        <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Resumen de Impacto Operativo</div>
                        <p className="text-xs font-mono text-slate-300 leading-relaxed">{resultadoTraduccion.resumen_operativo}</p>
                      </div>

                      {/* Tickets Generados */}
                      <div className="space-y-3">
                        <div className="text-[11px] font-mono text-cyan-300 font-bold uppercase">Tickets Ejecutables para el Sprint</div>
                        {resultadoTraduccion.tickets.map((t: any) => (
                          <div key={t.id} className="p-3.5 rounded-xl bg-[#090d16] border border-[#1f2d4a] space-y-2 font-mono text-xs">
                            <div className="flex justify-between items-start">
                              <div>
                                <span className="text-blue-400 font-bold mr-2">[{t.id}]</span>
                                <span className="text-white font-semibold">{t.titulo}</span>
                              </div>
                              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold shrink-0">
                                {t.tipo}
                              </span>
                            </div>

                            <div className="text-slate-300 text-[11px] bg-[#121a2d]/60 p-2 rounded border border-[#1f2d4a]/50">
                              <span className="text-slate-400 block text-[10px] uppercase font-bold">User Story:</span>
                              {t.user_story}
                            </div>

                            <div className="space-y-1 text-[11px]">
                              <span className="text-slate-400 text-[10px] uppercase font-bold">Criterios de Aceptación:</span>
                              <ul className="space-y-0.5 text-slate-300 pl-2">
                                {t.criterios_aceptacion.map((c: string, i: number) => (
                                  <li key={i} className="flex items-start gap-1.5">
                                    <span className="text-emerald-400">✓</span> {c}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="text-[10px] text-slate-400 pt-1 border-t border-[#1f2d4a] flex justify-between">
                              <span><strong>Definición de Terminado (DoD):</strong> {t.definicion_hecho}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Manual de Procesos para Empleados */}
                      <div className="p-3 rounded-lg bg-blue-950/20 border border-blue-500/20 space-y-1 text-xs font-mono">
                        <div className="text-blue-400 font-bold text-[10px] uppercase">Manual de Proceso / Directriz para Empleados</div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{resultadoTraduccion.manual_proceso}</p>
                      </div>

                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ASISTENTE 5: GESTOR DE PRÁCTICA Y FINOPS (EL CONTROLADOR)                   */}
          {/* ========================================================================= */}
          {activeTab === 'asistente_finops' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-amber-400" /> 5. Gestor de Práctica y FinOps (El Controlador)
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Gestión del tiempo, cruce del calendario procesal con los vencimientos contractuales, y control de facturación. Un agente que vigila la rentabilidad de cada asunto y alerta sobre facturas pendientes o plazos críticos.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
                    Control de Rentabilidad
                  </span>
                  <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono">
                    Alertas Críticas
                  </span>
                </div>
              </div>

              {/* Indicadores Clave de Despacho */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a]">
                  <div className="text-[10px] text-slate-400 uppercase">Horas Dedicadas</div>
                  <div className="text-xl font-bold text-white mt-1">139h <span className="text-xs text-slate-500 font-normal">/ 145h pactadas</span></div>
                  <div className="text-[9px] text-emerald-400 mt-1">95.8% Presupuesto</div>
                </div>
                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a]">
                  <div className="text-[10px] text-slate-400 uppercase">Tarifa Efectiva Real</div>
                  <div className="text-xl font-bold text-cyan-400 mt-1">146 USD/h</div>
                  <div className="text-[9px] text-slate-400 mt-1">Promedio ponderado</div>
                </div>
                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a]">
                  <div className="text-[10px] text-slate-400 uppercase">Facturación Activa</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">22.350 USD</div>
                  <div className="text-[9px] text-slate-400 mt-1">Mes en curso</div>
                </div>
                <div className="p-4 rounded-xl bg-[#121a2d] border border-red-500/30">
                  <div className="text-[10px] text-red-400 uppercase font-bold">Cobranza Pendiente</div>
                  <div className="text-xl font-bold text-red-400 mt-1">6.750 USD</div>
                  <div className="text-[9px] text-red-300 mt-1">1 Factura en mora</div>
                </div>
              </div>

              {/* Cruce de Calendario Procesal & Vencimientos Contractuales */}
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#1f2d4a]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span className="font-mono text-xs text-white font-bold uppercase">Cruce de Calendario Procesal & Vencimientos Contractuales</span>
                  </div>
                  <span className="text-[10px] font-mono text-red-400 font-bold">2 Vencimientos Perentorios</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-500/30 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-bold">FALTAN 48 HORAS</span>
                      <span className="text-[10px] text-red-400 font-mono">Término Procesal</span>
                    </div>
                    <div className="text-white font-bold text-[12px]">Contestación de Intimación Extrajudicial</div>
                    <div className="text-slate-300 text-[11px]">Asunto: Machtig Rothe C.A. vs. Inmobiliaria del Este</div>
                    <p className="text-[10px] text-slate-400">Requerimiento de cese de retención indebida de 3 montacargas antes de acción posesoria judicial.</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-500/30 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">FALTAN 6 DÍAS</span>
                      <span className="text-[10px] text-amber-400 font-mono">Vencimiento Contractual</span>
                    </div>
                    <div className="text-white font-bold text-[12px]">Notificación de Prórroga de Arrendamiento</div>
                    <div className="text-slate-300 text-[11px]">Asunto: Machtig Rothe (Galpón Unare II)</div>
                    <p className="text-[10px] text-slate-400">Preaviso formal obligatorio estipulado en la Cláusula Tercera para evitar prórroga forzosa en condiciones desfavorables.</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px] font-bold">FALTAN 12 DÍAS</span>
                      <span className="text-[10px] text-slate-400 font-mono">Directorio</span>
                    </div>
                    <div className="text-white font-bold text-[12px]">Presentación Informe Auditoría Forense</div>
                    <div className="text-slate-300 text-[11px]">Asunto: Corein, C.A. (Junta Directiva)</div>
                    <p className="text-[10px] text-slate-400">Entrega de conciliación de deuda de proveedores y rotación de stock.</p>
                  </div>
                </div>
              </div>

              {/* Matriz de Rentabilidad por Asunto y Alerta de Scope Creep */}
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-[#1f2d4a]">
                  <span className="font-mono text-xs text-amber-300 font-bold uppercase">Matriz de Rentabilidad por Asunto & Control de Facturación</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        setAlertaGeneradaFinOps("Alerta emitida a administración: Factura Corein N° 104 remitida con recordatorio formal de vencimiento y propuesta de anexo de honorarios por horas excedidas.");
                        setTimeout(() => setAlertaGeneradaFinOps(null), 5000);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-mono text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" /> Emitir Alerta Preventiva de Cobro
                    </button>
                  </div>
                </div>

                {alertaGeneradaFinOps && (
                  <div className="p-3 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-200 text-xs font-mono animate-fade-in flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    <span>{alertaGeneradaFinOps}</span>
                  </div>
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="text-slate-400 text-[11px] border-b border-[#1f2d4a]">
                        <th className="pb-2.5">Asunto / Cliente</th>
                        <th className="pb-2.5">Materia</th>
                        <th className="pb-2.5">Horas (Real / Presup.)</th>
                        <th className="pb-2.5">Tarifa / Total</th>
                        <th className="pb-2.5">Estado de Cobro</th>
                        <th className="pb-2.5">Riesgo / Scope Creep</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f2d4a]/50 text-slate-300">
                      {casosFinOps.map((c) => (
                        <tr key={c.id} className="hover:bg-[#090d16]/40 transition-colors">
                          <td className="py-3 text-white font-bold">{c.nombre}</td>
                          <td className="py-3 text-slate-400">{c.materia}</td>
                          <td className="py-3">
                            <span className={c.horas_reales > c.horas_presupuestadas ? 'text-red-400 font-bold' : 'text-slate-200'}>
                              {c.horas_reales}h
                            </span> / {c.horas_presupuestadas}h
                          </td>
                          <td className="py-3 text-cyan-300">{c.tarifa_hora} ({c.total_facturado})</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              c.estado_cobro.includes('pendiente') ? 'bg-red-500/20 text-red-300 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-300'
                            }`}>
                              {c.estado_cobro}
                            </span>
                          </td>
                          <td className="py-3">
                            {c.scope_creep ? (
                              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold flex items-center gap-1 w-fit">
                                <AlertTriangle className="w-3 h-3" /> +{c.horas_exceso}h Scope Creep
                              </span>
                            ) : (
                              <span className="text-emerald-400 text-[11px]">✓ Rentable</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* ASISTENTE 6: GRABACIÓN Y MINUTAS (NOTETAKER CON WHISPER ON-PREMISE)       */}
          {/* ========================================================================= */}
          {(activeTab === 'asistente_notetaker' || activeTab === 'actas_reunion') && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Mic className="w-6 h-6 text-pink-400" /> 6. Grabación y Minutas (Notetaker con Whisper On-Premise)
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Captura privada de audio y reuniones presenciales o virtuales: transcripción soberana mediante Whisper y generación automática de la minuta estructurada (Acuerdos, Action Items asignables directamente al Kanban del equipo y Puntos Abiertos).
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    Zero Egress Audio
                  </span>
                  <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono">
                    Whisper On-Premise
                  </span>
                </div>
              </div>

              {/* Consola Central de Grabación y Carga de Audio */}
              <div className="p-6 rounded-2xl bg-[#121a2d] border border-pink-500/30 space-y-6 shadow-2xl">
                <div className="flex flex-col items-center justify-center text-center space-y-4 py-4">
                  
                  {/* Cronómetro y Estado */}
                  <div className="space-y-1">
                    <div className="font-mono text-3xl font-extrabold text-white tracking-widest">
                      {Math.floor(segundosGrabacion / 60).toString().padStart(2, '0')}:{(segundosGrabacion % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${grabandoAudioLocal ? 'bg-red-500 animate-ping' : 'bg-slate-500'}`}></span>
                      {grabandoAudioLocal ? "Grabando audio en memoria local del navegador..." : "Listo para grabar o cargar archivo de audio"}
                    </div>
                  </div>

                  {/* Botones Principales de Acción */}
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    
                    {/* Botón Central: Grabar Audio (Local) */}
                    <button 
                      onClick={alternarGrabacionAudioLocal}
                      className={`px-6 py-3.5 rounded-2xl font-mono font-bold text-sm transition-all flex items-center gap-3 shadow-xl cursor-pointer ${
                        grabandoAudioLocal 
                          ? 'bg-red-500 text-white animate-pulse shadow-red-500/30' 
                          : 'bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 hover:from-pink-400 hover:to-red-400 text-white shadow-pink-500/25'
                      }`}
                    >
                      {grabandoAudioLocal ? <Square className="w-5 h-5 fill-white" /> : <Mic className="w-5 h-5" />}
                      <span>{grabandoAudioLocal ? "Detener Grabación Local" : "Grabar Audio (Local)"}</span>
                    </button>

                    {/* Botón: Subir Archivo */}
                    <label className="px-5 py-3.5 rounded-2xl bg-[#090d16] border border-[#1f2d4a] hover:border-pink-400 text-slate-200 font-mono font-bold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-md">
                      <Upload className="w-4 h-4 text-pink-400" />
                      <span>Subir Archivo de Audio</span>
                      <input 
                        type="file" 
                        accept="audio/*,.mp3,.wav,.m4a,.webm,.ogg" 
                        onChange={handleSubirArchivoAudio}
                        className="hidden" 
                      />
                    </label>

                  </div>

                  {archivoAudioNombre && (
                    <div className="text-xs font-mono text-cyan-300 bg-[#090d16] px-3.5 py-1.5 rounded-lg border border-[#1f2d4a]">
                      Archivo procesado: <strong>{archivoAudioNombre}</strong>
                    </div>
                  )}

                  {audioUrlLocal && (
                    <div className="w-full max-w-md pt-2">
                      <audio controls src={audioUrlLocal} className="w-full h-8" />
                    </div>
                  )}

                  {cargandoTranscripcionWhisper && (
                    <div className="text-xs font-mono text-pink-300 flex items-center gap-2 animate-pulse">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Enviando FormData a endpoint /api/v1/audio/transcribe (Whisper On-Premise)...</span>
                    </div>
                  )}

                </div>
              </div>

              {/* Minuta Estructurada Generada */}
              {minutaWhisper && (
                <div className="p-6 rounded-2xl bg-[#121a2d] border border-[#1f2d4a] space-y-6 shadow-xl">
                  
                  {/* Cabecera de la Minuta */}
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-[#1f2d4a]">
                    <div>
                      <div className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">
                        Minuta Oficial Certificada
                      </div>
                      <h2 className="text-lg font-bold text-white mt-0.5">{minutaWhisper.titulo}</h2>
                      <div className="text-xs font-mono text-slate-400 mt-1">
                        Fecha: {minutaWhisper.fecha} • Duración: {minutaWhisper.duracion} • {minutaWhisper.plataforma}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          const textoMinuta = `${minutaWhisper.titulo}\nFecha: ${minutaWhisper.fecha}\n\nACUERDOS:\n${minutaWhisper.acuerdos.join('\n')}\n\nACTION ITEMS:\n${minutaWhisper.action_items.map((a: any) => `- [${a.prioridad}] ${a.tarea} (${a.responsable} - ${a.plazo})`).join('\n')}`;
                          navigator.clipboard.writeText(textoMinuta);
                          alert("Minuta completa copiada al portapapeles.");
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#090d16] border border-[#1f2d4a] hover:border-pink-400 text-slate-300 font-mono text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5 text-pink-400" /> Copiar Minuta
                      </button>
                      <button 
                        onClick={() => alert("Descargando Acta Oficial Certificada con Hash Forense SHA-256...")}
                        className="px-3 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" /> Descargar Acta
                      </button>
                    </div>
                  </div>

                  {/* Resumen Ejecutivo */}
                  <div className="p-3.5 rounded-xl bg-[#090d16] border border-[#1f2d4a] space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Extracto de Transcripción Whisper</span>
                    <p className="text-xs font-mono text-slate-300 leading-relaxed italic">
                      "{minutaWhisper.transcripcion_extracto}"
                    </p>
                  </div>

                  {/* Las 3 Secciones Clave de la Minuta */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    {/* 1. Acuerdos */}
                    <div className="p-4 rounded-xl bg-[#090d16] border border-emerald-500/30 space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#1f2d4a]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span className="font-mono text-xs font-bold text-emerald-300 uppercase">1. Acuerdos Clave</span>
                      </div>
                      <ul className="space-y-2 text-xs font-mono text-slate-300">
                        {minutaWhisper.acuerdos.map((acuerdo: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-emerald-400 font-bold shrink-0">✓</span>
                            <span>{acuerdo}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 2. Action Items Asignables al Kanban */}
                    <div className="p-4 rounded-xl bg-[#090d16] border border-cyan-500/30 space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-[#1f2d4a]">
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-cyan-400" />
                          <span className="font-mono text-xs font-bold text-cyan-300 uppercase">2. Action Items Kanban</span>
                        </div>
                        <span className="text-[9px] font-mono text-slate-500">Asignación 1-clic</span>
                      </div>
                      <div className="space-y-2.5">
                        {minutaWhisper.action_items.map((item: any) => (
                          <div key={item.id} className="p-2.5 rounded-lg bg-[#121a2d] border border-[#1f2d4a] space-y-2 font-mono text-xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                                {item.prioridad}
                              </span>
                              <span className="text-[9px] text-slate-400">{item.plazo}</span>
                            </div>
                            <div className="text-[11px] text-white font-medium">{item.tarea}</div>
                            <div className="text-[10px] text-slate-400">Resp: <strong>{item.responsable}</strong></div>
                            
                            <button 
                              onClick={() => agregarItemAKanban(item)}
                              disabled={item.agregado}
                              className={`w-full py-1.5 rounded text-[10px] font-bold transition-all flex items-center justify-center gap-1 ${
                                item.agregado 
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default' 
                                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-sm cursor-pointer'
                              }`}
                            >
                              <CheckCircle2 className="w-3 h-3" />
                              {item.agregado ? "Asignada a Kanban ✓" : "Asignar a Kanban del Equipo"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Puntos Abiertos */}
                    <div className="p-4 rounded-xl bg-[#090d16] border border-amber-500/30 space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-[#1f2d4a]">
                        <HelpCircle className="w-4 h-4 text-amber-400" />
                        <span className="font-mono text-xs font-bold text-amber-300 uppercase">3. Puntos Abiertos</span>
                      </div>
                      <ul className="space-y-2 text-xs font-mono text-slate-300">
                        {minutaWhisper.puntos_abiertos.map((pto: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">?</span>
                            <span>{pto}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="p-2.5 rounded bg-amber-950/20 border border-amber-500/20 text-[10px] font-mono text-amber-300">
                        Pendientes a resolver antes de la firma final del MSA y cierre de pliegos técnicos.
                      </div>
                    </div>

                  </div>

                  {/* Hash Forense SHA-256 */}
                  <div className="pt-3 border-t border-[#1f2d4a] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] font-mono text-slate-500">
                    <div>Hash de Custodia Forense: <span className="text-cyan-400">{minutaWhisper.hash_sha256}</span></div>
                    <div className="text-emerald-400">Certificado bajo Estándar Notarial eIDAS / Firma Digital</div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* VISTA 1: TORRE DE CONTROL CAIO */}
          {activeTab === 'caio' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-cyan-400" /> Torre de Control CAIO & Gobernanza Algorítmica
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">Supervisión integral: Model Registry (EU AI Act), ciberseguridad adversarial y homologación de proveedores.</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">Auditado: Septiembre 2026</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-3 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-emerald-400">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">EU AI ACT</span><div className="text-lg font-bold text-emerald-400 font-mono">100%</div><p className="text-[9px] text-slate-400">Conforme</p>
                </div>
                <div className="p-3 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-cyan-400">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">SISTEMAS PROD</span><div className="text-lg font-bold text-cyan-400 font-mono">5 Agentes</div><p className="text-[9px] text-slate-400">Registrados</p>
                </div>
                <div className="p-3 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-purple-400">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">ALUCINACIONES</span><div className="text-lg font-bold text-purple-400 font-mono">0.6%</div><p className="text-[9px] text-emerald-400">&lt; 1% Umbral</p>
                </div>
                <div className="p-3 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-blue-400">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">AI LITERACY</span><div className="text-lg font-bold text-blue-400 font-mono">94%</div><p className="text-[9px] text-slate-400">Art. 4 AI Act</p>
                </div>
                <div className="p-3 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-amber-400">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">SHADOW AI</span><div className="text-lg font-bold text-amber-400 font-mono">12 Fugas</div><p className="text-[9px] text-slate-400">Bloqueadas</p>
                </div>
                <div className="p-3 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-teal-400">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">AHORRO FINOPS</span><div className="text-lg font-bold text-emerald-400 font-mono">19.200 €</div><p className="text-[9px] text-slate-400">Coste: 38,40 €</p>
                </div>
              </div>

              {/* Model Registry */}
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#1f2d4a]">
                  <span className="font-mono text-xs text-cyan-300 font-bold">AI MODEL REGISTRY & RIESGO EU AI ACT</span>
                  <span className="text-[10px] font-mono text-slate-400">5 Agentes Homologados</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="text-slate-400 text-[11px] border-b border-[#1f2d4a]">
                        <th className="pb-2">Sistema / Agente</th>
                        <th className="pb-2">Modelo</th>
                        <th className="pb-2">Clasificación de Riesgo</th>
                        <th className="pb-2">Data Residency</th>
                        <th className="pb-2">Supervisión (HITL)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1f2d4a]/50 text-slate-300">
                      <tr>
                        <td className="py-2 text-white font-bold">Contract Studio Engine</td>
                        <td className="py-2 text-cyan-300">Llama 3.3 On-Prem</td>
                        <td className="py-2 text-blue-300">Específico (Art. 50)</td>
                        <td className="py-2">Local On-Prem</td>
                        <td className="py-2">Nivel 2 (Revisión Letrada)</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-white font-bold">HR Talent Pre-Screener</td>
                        <td className="py-2 text-purple-300">Mistral Large EU</td>
                        <td className="py-2 text-red-400 font-bold">ALTO RIESGO (Anexo III)</td>
                        <td className="py-2">UE (Francia)</td>
                        <td className="py-2 text-amber-300 font-bold">Nivel 3 (Obligatoria + Sesgo)</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-white font-bold">Due Diligence Copilot</td>
                        <td className="py-2 text-cyan-300">Groq Llama 3.3</td>
                        <td className="py-2 text-blue-300">Específico (Art. 50)</td>
                        <td className="py-2">ZDR en Tránsito</td>
                        <td className="py-2">Nivel 2 (Validación GC)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Botones de Descarga */}
              <div className="p-5 rounded-xl bg-[#121a2d] border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-white">Dossier Regulatorio & Informes del Consejo</div>
                  <p className="text-xs text-slate-400">Documentación oficial certificada bajo firma de Barbara Piccolo.</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setReporteModal('anexo')} className="px-3.5 py-2 rounded-xl bg-[#090d16] border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-bold text-xs font-mono cursor-pointer">
                    <Download className="w-3.5 h-3.5 inline mr-1" /> Anexo IV AI Act (Doc Técnica)
                  </button>
                  <button onClick={() => setReporteModal('trust')} className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono cursor-pointer">
                    <Download className="w-3.5 h-3.5 inline mr-1" /> Trust Report Consejo (PDF)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 2: PORTAL DEL GENERAL COUNSEL */}
          {activeTab === 'general_counsel' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Briefcase className="w-6 h-6 text-amber-400" /> Portal del Solo In-House Counsel & Operaciones
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">Centro de mando para el abogado único en PYMEs (10 a 80 empleados): acelera ventas, blinda secretos y empodera frente al CEO.</p>
                </div>
                <button onClick={() => setReporteModal('ceo')} className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-slate-950 font-bold text-xs font-mono cursor-pointer">
                  <Sparkles className="w-3.5 h-3.5 inline mr-1" /> Resumen Ejecutivo para CEO (PDF)
                </button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-cyan-400">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Velocidad Contractual</span>
                  <div className="text-xl font-bold text-cyan-400 font-mono">&lt; 24 Horas</div>
                  <p className="text-[10px] text-slate-400">vs. 5 días bufete externo</p>
                </div>
                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-emerald-400">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Ingresos Desbloqueados</span>
                  <div className="text-xl font-bold text-emerald-400 font-mono">140.000 €</div>
                  <p className="text-[10px] text-slate-400">Firmados a tiempo en Q3</p>
                </div>
                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-amber-400">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Minutas Ahorradas</span>
                  <div className="text-xl font-bold text-amber-300 font-mono">9.400 € / mes</div>
                  <p className="text-[10px] text-slate-400">Resuelto in-house</p>
                </div>
                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-purple-400">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Fugas Contenidas</span>
                  <div className="text-xl font-bold text-purple-300 font-mono">14 Alertas</div>
                  <p className="text-[10px] text-slate-400">0 secretos en ChatGPT</p>
                </div>
              </div>

              {/* Triage Diario */}
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                <span className="font-mono text-xs text-amber-400 font-bold block">TRIAGE DIARIO: FOCOS ROJOS QUE FRENAN EL NEGOCIO</span>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-lg bg-[#090d16] border border-cyan-500/30 flex justify-between items-center">
                    <div>
                      <div className="text-xs font-bold text-white">Ventas: Cliente Enterprise B2B esperando DPA/SLA (60.000 €/año)</div>
                      <p className="text-[11px] text-slate-400">Exigen límite de responsabilidad 2x y DPA con cláusulas de la UE.</p>
                    </div>
                    <button onClick={() => setActiveTab('playbook')} className="px-3 py-1.5 rounded bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-500/30">
                      Aprobar con Playbook →
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-[#090d16] border border-purple-500/30 flex justify-between items-center">
                    <div>
                      <div className="text-xs font-bold text-white">Marketing: Empleado intentando pegar lista de clientes en ChatGPT</div>
                      <p className="text-[11px] text-slate-400">Aduana bloqueó la exfiltración de NIFs. Redirigido a AI GOVERN.</p>
                    </div>
                    <button onClick={() => setActiveTab('radar_shadow')} className="px-3 py-1.5 rounded bg-purple-500/20 text-purple-300 text-xs font-mono font-bold hover:bg-purple-500/30">
                      Ver Radar →
                    </button>
                  </div>
                  <div className="p-3 rounded-lg bg-[#090d16] border border-emerald-500/30 flex justify-between items-center">
                    <div>
                      <div className="text-xs font-bold text-white">Talento Remoto: Desarrollador Senior en Colombia (Hub LatAm)</div>
                      <p className="text-[11px] text-slate-400">Blindar cesión exclusiva de código fuente mediante acuerdo PIIAA.</p>
                    </div>
                    <button onClick={() => setActiveTab('redaccion')} className="px-3 py-1.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-500/30">
                      Generar PIIAA →
                    </button>
                  </div>
                </div>
              </div>

              {/* Filiales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#121a2d] border-l-4 border-l-cyan-400 space-y-1">
                  <div className="flex justify-between text-xs font-bold text-white"><span>Filial España (S.L.)</span><span className="text-emerald-400">Al Día</span></div>
                  <p className="text-[11px] text-slate-300 font-mono">• 24 contratos B2B activos<br/>• RGPD 100% validado</p>
                </div>
                <div className="p-4 rounded-xl bg-[#121a2d] border-l-4 border-l-purple-400 space-y-1">
                  <div className="flex justify-between text-xs font-bold text-white"><span>Delaware LLC (EE.UU.)</span><span className="text-amber-400">Revisión</span></div>
                  <p className="text-[11px] text-slate-300 font-mono">• 12 SaaS MSAs activos<br/>• Franchise Tax pagado</p>
                </div>
                <div className="p-4 rounded-xl bg-[#121a2d] border-l-4 border-l-emerald-400 space-y-1">
                  <div className="flex justify-between text-xs font-bold text-white"><span>Hub LatAm Remoto</span><span className="text-emerald-400">Al Día</span></div>
                  <p className="text-[11px] text-slate-300 font-mono">• 15 desarrolladores remotos<br/>• PIIAA 100% firmado</p>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 3: FINOPS & MÉTRICAS DEL DEPARTAMENTO LEGAL (3 SUB-PESTAÑAS + MEDICIÓN POR ABOGADO) */}
          {activeTab === 'metricas_finops' && (
            <div className="space-y-6 max-w-5xl">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-emerald-400" /> FinOps & Métricas del Departamento Legal
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Control financiero, efectividad del equipo (titular + asociados) y blindaje corporativo para PYMEs y Startups.
                  </p>
                </div>

                {/* Filtro de Período */}
                <div className="flex items-center gap-1 bg-[#121a2d] p-1 rounded-lg border border-[#1f2d4a] text-xs font-mono">
                  <button onClick={() => setPeriodoFinanciero('mes')} className={`px-2.5 py-1 rounded transition-all ${periodoFinanciero === 'mes' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}>Mes</button>
                  <button onClick={() => setPeriodoFinanciero('trimestre')} className={`px-2.5 py-1 rounded transition-all ${periodoFinanciero === 'trimestre' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}>Q3</button>
                  <button onClick={() => setPeriodoFinanciero('anual')} className={`px-2.5 py-1 rounded transition-all ${periodoFinanciero === 'anual' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}>Año</button>
                </div>
              </div>

              {/* SELECTOR DE LAS 3 SUB-PESTAÑAS */}
              <div className="flex flex-wrap items-center gap-2 border-b border-[#1f2d4a] pb-3">
                <button 
                  onClick={() => setSubTabFinops('negocio')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    subTabFinops === 'negocio' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                      : 'bg-[#121a2d] text-slate-400 hover:bg-[#1a243d] hover:text-slate-200 border border-[#1f2d4a]'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span>1. Negocio & FinOps</span>
                  <span className="px-1.5 py-0.2 text-[9px] rounded bg-cyan-500/20 text-cyan-300 font-mono">5 KPIs</span>
                </button>

                <button 
                  onClick={() => setSubTabFinops('operaciones')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    subTabFinops === 'operaciones' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm' 
                      : 'bg-[#121a2d] text-slate-400 hover:bg-[#1a243d] hover:text-slate-200 border border-[#1f2d4a]'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2. Operaciones & Efectividad Equipo</span>
                  <span className="px-1.5 py-0.2 text-[9px] rounded bg-emerald-500/20 text-emerald-300 font-mono">3 Letrados</span>
                </button>

                <button 
                  onClick={() => setSubTabFinops('riesgo')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 ${
                    subTabFinops === 'riesgo' 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm' 
                      : 'bg-[#121a2d] text-slate-400 hover:bg-[#1a243d] hover:text-slate-200 border border-[#1f2d4a]'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>3. Riesgo & Blindaje Corporativo</span>
                  <span className="px-1.5 py-0.2 text-[9px] rounded bg-purple-500/20 text-purple-300 font-mono">Auditoría</span>
                </button>
              </div>

              {/* ================================================================ */}
              {/* SUB-PESTAÑA 1: NEGOCIO & FINOPS (MÉTRICAS 1 A 5)                 */}
              {/* ================================================================ */}
              {subTabFinops === 'negocio' && (
                <div className="space-y-5">
                  {/* Fila de Tarjetas Principales */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
                    
                    {/* Métrica 1: Tiempo de Ciclo Contractual */}
                    <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-cyan-400 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">1. Tiempo de Ciclo Contractual</span>
                      <div className="text-xl font-bold text-cyan-400 font-mono">&lt; 21 Horas</div>
                      <p className="text-[10px] text-slate-400">vs. 5 días bufete externo (Reducción 82%)</p>
                    </div>

                    {/* Métrica 2: Valor de Contratos Aprobados */}
                    <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-emerald-400 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">2. Valor Contratos Aprobados</span>
                      <div className="text-xl font-bold text-emerald-400 font-mono">140.000 €</div>
                      <p className="text-[10px] text-slate-400">Facilitated Pipeline cerrado en Q3</p>
                    </div>

                    {/* Métrica 3: Tasa de Autoservicio */}
                    <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-purple-400 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">3. Tasa de Autoservicio</span>
                      <div className="text-xl font-bold text-purple-300 font-mono">64%</div>
                      <p className="text-[10px] text-slate-400">NDAs y acuerdos firmados con Playbook</p>
                    </div>

                    {/* Métrica 4: Coste Unitario por Contrato */}
                    <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-amber-400 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">4. Coste Unitario / Contrato</span>
                      <div className="text-xl font-bold text-amber-300 font-mono">0,18 € / doc</div>
                      <p className="text-[10px] text-slate-400">vs. 500 €/doc despacho tradicional</p>
                    </div>

                  </div>

                  {/* Panel Secundario: Métrica 5 y Gráfica Presupuestaria */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    
                    {/* Métrica 5: Gasto Legal sobre Ingresos & Cómputo IA */}
                    <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-[#1f2d4a]">
                        <span className="font-mono text-xs text-cyan-300 font-bold uppercase">5. Gasto Legal sobre Ingresos (% Revenue)</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">Saludable</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                        <div className="p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a]">
                          <span className="text-slate-400 text-[10px] block">RATIO LEGAL / ARR</span>
                          <span className="text-lg font-bold text-emerald-400">0.45%</span>
                          <span className="text-[9px] text-slate-500 block">Benchmark PYME: &lt; 0.8%</span>
                        </div>
                        <div className="p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a]">
                          <span className="text-slate-400 text-[10px] block">GASTO COMPUTO IA</span>
                          <span className="text-lg font-bold text-purple-400">38,40 € / mes</span>
                          <span className="text-[9px] text-slate-500 block">1.280.000 tokens</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-[#090d16] border border-cyan-500/30 text-xs font-mono flex justify-between items-center">
                        <div>
                          <div className="font-bold text-white">Ahorro Neto en Minutas de Bufetes</div>
                          <div className="text-[11px] text-slate-400">128 horas letradas resueltas internamente</div>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-bold text-emerald-400">19.200 €</div>
                          <div className="text-[10px] text-cyan-300 font-bold">ROI: 480%</div>
                        </div>
                      </div>
                    </div>

                    {/* Desglose Presupuestario */}
                    <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                      <span className="font-mono text-xs text-emerald-300 font-bold block uppercase">Distribución de Presupuesto Legal Anual</span>
                      <div className="flex items-center justify-around gap-4 pt-1">
                        <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="35 65"></circle>
                            <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#00f0ff" strokeWidth="4" strokeDasharray="45 55" strokeDashoffset="-35"></circle>
                            <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-80"></circle>
                          </svg>
                          <div className="absolute text-center"><span className="text-xs font-bold font-mono">100%</span></div>
                        </div>
                        <div className="space-y-1.5 text-xs font-mono">
                          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span><span>In-House (Interno): 45%</span></div>
                          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span><span>Despachos Externos: 35%</span></div>
                          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span><span>Herramientas & Compliance: 20%</span></div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* ================================================================ */}
              {/* SUB-PESTAÑA 2: OPERACIONES & EQUIPO LEGAL (MÉTRICAS 6, 7, 8 + TEAM)*/}
              {/* ================================================================ */}
              {subTabFinops === 'operaciones' && (
                <div className="space-y-5">
                  
                  {/* Selector de Abogado del Equipo */}
                  <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span>Filtro de Efectividad por Letrado del Equipo:</span>
                      </span>
                      <p className="text-[11px] text-slate-400">Mide el rendimiento individual del General Counsel y sus 2 abogados asociados.</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                      <button 
                        onClick={() => setAbogadoSeleccionado('todos')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${abogadoSeleccionado === 'todos' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-[#090d16] text-slate-300 hover:bg-[#1a243d]'}`}
                      >
                        Todo el Equipo (3)
                      </button>
                      <button 
                        onClick={() => setAbogadoSeleccionado('barbara')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${abogadoSeleccionado === 'barbara' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-[#090d16] text-slate-300 hover:bg-[#1a243d]'}`}
                      >
                        Barbara P. (GC)
                      </button>
                      <button 
                        onClick={() => setAbogadoSeleccionado('carlos')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${abogadoSeleccionado === 'carlos' ? 'bg-purple-500 text-white font-bold' : 'bg-[#090d16] text-slate-300 hover:bg-[#1a243d]'}`}
                      >
                        Carlos M. (Mercantil)
                      </button>
                      <button 
                        onClick={() => setAbogadoSeleccionado('elena')}
                        className={`px-3 py-1.5 rounded-lg transition-all ${abogadoSeleccionado === 'elena' ? 'bg-pink-500 text-white font-bold' : 'bg-[#090d16] text-slate-300 hover:bg-[#1a243d]'}`}
                      >
                        Elena R. (Privacidad/IP)
                      </button>
                    </div>
                  </div>

                  {/* Fila de Métricas Operativas (Métricas 6 y 8) */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    
                    {/* Métrica 6: Volumen Entradas vs. Cierres */}
                    <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">6. Entradas vs. Cierres</span>
                      <div className="text-xl font-bold text-white font-mono">
                        {abogadoSeleccionado === 'todos' && "48 in / 45 out"}
                        {abogadoSeleccionado === 'barbara' && "23 in / 22 out"}
                        {abogadoSeleccionado === 'carlos' && "16 in / 15 out"}
                        {abogadoSeleccionado === 'elena' && "9 in / 8 out"}
                      </div>
                      <p className="text-[10px] text-emerald-400 font-mono">93.7% Tasa de Resolución (Cero Backlog)</p>
                    </div>

                    {/* Métrica 8: Cumplimiento de SLA Interno */}
                    <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">8. Cumplimiento de SLA</span>
                      <div className="text-xl font-bold text-emerald-400 font-mono">
                        {abogadoSeleccionado === 'todos' && "96.2%"}
                        {abogadoSeleccionado === 'barbara' && "98.5%"}
                        {abogadoSeleccionado === 'carlos' && "95.0%"}
                        {abogadoSeleccionado === 'elena' && "96.0%"}
                      </div>
                      <p className="text-[10px] text-slate-400">&lt; 4h Triage inicial | &lt; 24h Dictamen</p>
                    </div>

                    {/* Tiempo Medio Individual */}
                    <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">Velocidad del Letrado</span>
                      <div className="text-xl font-bold text-cyan-400 font-mono">
                        {abogadoSeleccionado === 'todos' && "21h Promedio"}
                        {abogadoSeleccionado === 'barbara' && "18h (Alta Complejidad)"}
                        {abogadoSeleccionado === 'carlos' && "22h (Comercial/SaaS)"}
                        {abogadoSeleccionado === 'elena' && "24h (Compliance/DPA)"}
                      </div>
                      <p className="text-[10px] text-slate-400">Tiempo de ciclo medio por expediente</p>
                    </div>

                  </div>

                  {/* Métrica 7: Distribución de Carga por Departamento */}
                  <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-[#1f2d4a]">
                      <span className="font-mono text-xs text-cyan-300 font-bold uppercase">7. Distribución de Carga por Departamento</span>
                      <span className="text-[10px] font-mono text-slate-400">Total: 128 Horas</span>
                    </div>
                    
                    <div className="space-y-2.5 text-xs font-mono">
                      <div>
                        <div className="flex justify-between mb-1"><span>Ventas (SaaS MSAs & SLAs)</span><span className="text-cyan-400">54h (42%) • Asignado a: Barbara P. & Carlos M.</span></div>
                        <div className="w-full h-2.5 bg-[#090d16] rounded-full overflow-hidden"><div className="h-full bg-cyan-400" style={{width: '42%'}}></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1"><span>Compras (DPAs & Proveedores TI)</span><span className="text-purple-400">36h (28%) • Asignado a: Carlos M. & Elena R.</span></div>
                        <div className="w-full h-2.5 bg-[#090d16] rounded-full overflow-hidden"><div className="h-full bg-purple-400" style={{width: '28%'}}></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1"><span>RRHH & Talento Remoto (Contratistas & PIIAA)</span><span className="text-emerald-400">24h (19%) • Asignado a: Elena R.</span></div>
                        <div className="w-full h-2.5 bg-[#090d16] rounded-full overflow-hidden"><div className="h-full bg-emerald-400" style={{width: '19%'}}></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1"><span>Dirección & Societario (SAFEs & Filiales)</span><span className="text-amber-400">14h (11%) • Asignado a: Barbara P.</span></div>
                        <div className="w-full h-2.5 bg-[#090d16] rounded-full overflow-hidden"><div className="h-full bg-amber-400" style={{width: '11%'}}></div></div>
                      </div>
                    </div>
                  </div>

                  {/* Tabla Comparativa de Rendimiento del Equipo */}
                  <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-[#1f2d4a]">
                      <span className="font-mono text-xs text-emerald-300 font-bold uppercase">Matriz de Rendimiento Individual del Equipo Legal</span>
                      <span className="text-[10px] font-mono text-slate-400">3 Profesionales Activos</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="text-slate-400 text-[11px] border-b border-[#1f2d4a]">
                            <th className="pb-2">Letrado / Rol</th>
                            <th className="pb-2">Asuntos Cerrados</th>
                            <th className="pb-2">Tiempo Ciclo</th>
                            <th className="pb-2">SLA</th>
                            <th className="pb-2">Valor Facilitado</th>
                            <th className="pb-2">Horas Ahorradas IA</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1f2d4a]/50 text-slate-300">
                          <tr className={abogadoSeleccionado === 'barbara' ? 'bg-cyan-500/10' : ''}>
                            <td className="py-2.5 text-white font-bold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                              <span>Barbara Piccolo (General Counsel & CAIO)</span>
                            </td>
                            <td className="py-2.5 text-cyan-300 font-bold">22 (Alta Complejidad)</td>
                            <td className="py-2.5">18 h</td>
                            <td className="py-2.5 text-emerald-400 font-bold">98.5%</td>
                            <td className="py-2.5 text-emerald-400 font-bold">85.000 €</td>
                            <td className="py-2.5 text-purple-300 font-bold">58 h</td>
                          </tr>
                          <tr className={abogadoSeleccionado === 'carlos' ? 'bg-purple-500/10' : ''}>
                            <td className="py-2.5 text-white font-bold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                              <span>Carlos Mendoza (Asociado Mercantil)</span>
                            </td>
                            <td className="py-2.5 text-purple-300 font-bold">15 (SaaS & Compras)</td>
                            <td className="py-2.5">22 h</td>
                            <td className="py-2.5 text-emerald-400">95.0%</td>
                            <td className="py-2.5 text-emerald-400 font-bold">35.000 €</td>
                            <td className="py-2.5 text-purple-300 font-bold">42 h</td>
                          </tr>
                          <tr className={abogadoSeleccionado === 'elena' ? 'bg-pink-500/10' : ''}>
                            <td className="py-2.5 text-white font-bold flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-pink-400"></span>
                              <span>Elena Ramos (Asociada Privacidad/IP)</span>
                            </td>
                            <td className="py-2.5 text-pink-300 font-bold">8 (DPAs & PIIAA)</td>
                            <td className="py-2.5">24 h</td>
                            <td className="py-2.5 text-emerald-400">96.0%</td>
                            <td className="py-2.5 text-emerald-400 font-bold">20.000 €</td>
                            <td className="py-2.5 text-purple-300 font-bold">28 h</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* ================================================================ */}
              {/* SUB-PESTAÑA 3: RIESGO & BLINDAJE CORPORATIVO (MÉTRICAS 9, 10, 11) */}
                        

            </div>
          )}


          {/* ================================================================ */}
              {subTabFinops === 'riesgo' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    
                    {/* Métrica 9: Fugas de Secretos y Shadow AI Contenidas */}
                    <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-red-500 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">9. Shadow AI Neutralizado</span>
                      <div className="text-xl font-bold text-red-400 font-mono">14 Alertas</div>
                      <p className="text-[10px] text-slate-400">0 brechas notificables (Art. 33 RGPD)</p>
                    </div>

                    {/* Métrica 10: Soberanía de Código y Talento Remoto */}
                    <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-emerald-400 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">10. Soberanía Código & Talento</span>
                      <div className="text-xl font-bold text-emerald-400 font-mono">100% Blindado</div>
                      <p className="text-[10px] text-slate-400">15 PIIAA y W-8BEN firmados y archivados</p>
                    </div>

                    {/* Métrica 11: Índice de Salud de Cumplimiento */}
                    <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] border-l-4 border-l-purple-400 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">11. Salud de Cumplimiento</span>
                      <div className="text-xl font-bold text-purple-300 font-mono">98 / 100</div>
                      <p className="text-[10px] text-slate-400">Model Registry AI Act + Libros al día</p>
                    </div>

                  </div>

                  {/* Tarjetas de Detalle de Auditoría & Due Diligence */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                      <span className="font-mono text-xs text-red-400 font-bold block uppercase">Registro de Incidentes de Fuga Contenidos</span>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="p-2.5 rounded bg-[#090d16] border border-red-500/20 flex justify-between items-center">
                          <div>
                            <span className="text-red-300 font-bold">Bloqueo PII: Base de Leads (Marketing)</span>
                            <div className="text-[10px] text-slate-500">Filtrado en Aduana • NIFs & Correos protegidos</div>
                          </div>
                          <span className="text-emerald-400 font-bold text-[10px]">Zero Egress</span>
                        </div>
                        <div className="p-2.5 rounded bg-[#090d16] border border-red-500/20 flex justify-between items-center">
                          <div>
                            <span className="text-red-300 font-bold">Bloqueo Código: Repositorio Core (Dev LatAm)</span>
                            <div className="text-[10px] text-slate-500">Detección de claves API en prompt de Copilot</div>
                          </div>
                          <span className="text-emerald-400 font-bold text-[10px]">Zero Egress</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-xl bg-[#121a2d] border border-emerald-500/30 space-y-3">
                      <span className="font-mono text-xs text-emerald-300 font-bold block uppercase">Estado de Due Diligence para Inversores</span>
                      <div className="space-y-2 text-xs font-mono text-slate-300">
                        <div className="flex items-center justify-between p-2 rounded bg-[#090d16]">
                          <span>• Model Registry (EU AI Act Art. 50):</span>
                          <span className="text-emerald-400 font-bold">100% Conforme</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-[#090d16]">
                          <span>• Cesión de Invenciones (PIIAA) LatAm/ES:</span>
                          <span className="text-emerald-400 font-bold">15 de 15 Letrados</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-[#090d16]">
                          <span>• Cuentas Anuales S.L. & Franchise Tax LLC:</span>
                          <span className="text-emerald-400 font-bold">Depositadas y al día</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* VISTA 4: ADUANA PII */}
          {activeTab === 'aduana' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Shield className="w-6 h-6 text-emerald-400" /> [Paso 0] Aduana de Entrada & Privilege Gateway
                </h1>
                <p className="text-xs text-slate-400 mt-1">Sanitiza datos sensibles (PII) y secretos comerciales en memoria local antes de salir a la IA.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                  <span className="font-mono text-xs text-slate-300 font-bold block">Documento Original</span>
                  <textarea rows={7} value={textoAduana} onChange={(e) => setTextoAduana(e.target.value)}

          {/* ================================================================ */}
          {/* VISTA NUEVA: ACTAS DE REUNIÓN & MINUTAS AI (VOZ A CONTRATO)      */}
          {/* ================================================================ */}
          false && activeTab === 'actas_reunion' && (
            <div className="space-y-6 max-w-5xl">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Mic className="w-6 h-6 text-pink-400" /> Actas de Reunión & Minutas Jurídicas AI
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Captura privada de reuniones presenciales (App Móvil) y virtuales (Google Meet / Zoom), transcripción soberana y conversión a contratos en 1 clic.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                    Zero Egress Audio
                  </span>
                  <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono">
                    Extensión Meet: Lista
                  </span>
                </div>
              </div>

              {/* Consola de Captura de Audio */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Grabación en Vivo */}
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-pink-300 font-bold uppercase">Grabadora de Sala / Mesa</span>
                    <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Usa el micrófono del teléfono o portátil para reuniones presenciales con clientes o socios.
                  </p>
                  
                  <div className="pt-2">
                    <button 
                      onClick={() => setGrabandoAudio(!grabandoAudio)}
                      className={`w-full py-2.5 rounded-xl font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md ${
                        grabandoAudio 
                          ? 'bg-red-500 text-white animate-pulse' 
                          : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white'
                      }`}
                    >
                      <Mic className="w-4 h-4" />
                      {grabandoAudio ? "Detener y Procesar Acta..." : "Iniciar Grabación Presencial"}
                    </button>
                  </div>
                </div>

                {/* Reuniones Virtuales (Extensión) */}
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-cyan-300 font-bold uppercase">Google Meet & Zoom Web</span>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">Extensión</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Captura el audio directamente en tu navegador Chrome sin bots intrusivos que puedan ser bloqueados.
                  </p>
                  <div className="pt-2">
                    <button 
                      onClick={() => alert("Extensión AI GOVERN conectada. Al unirte a meet.google.com la sesión se sincronizará automáticamente.")}
                      className="w-full py-2.5 rounded-xl bg-[#090d16] border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-mono font-bold text-xs transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" /> Sincronizar con Google Meet
                    </button>
                  </div>
                </div>

                {/* Subir Grabación Existente */}
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-xs text-purple-300 font-bold uppercase">Subir Audio Grabado</span>
                    <span className="text-[10px] font-mono text-slate-400">MP3 / M4A / WAV</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Arrastra cualquier nota de voz de WhatsApp o grabación previa para generar su acta jurídica.
                  </p>
                  <div className="pt-2">
                    <label className="w-full py-2.5 rounded-xl bg-[#090d16] border border-purple-500/40 hover:border-purple-400 text-purple-300 font-mono font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer">
                      <Download className="w-4 h-4 rotate-180" /> Cargar Archivo de Audio
                      <input type="file" accept="audio/*" className="hidden" onChange={() => alert("Audio cargado con éxito. Procesando acta jurídica...")} />
                    </label>
                  </div>
                </div>

              </div>

              {/* Ficha del Acta Jurídica Generada */}
              {actaGenerada && (
                <div className="p-6 rounded-xl bg-[#121a2d] border border-pink-500/30 space-y-5">
                  
                  {/* Título y Acciones */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1f2d4a]">
                    <div>
                      <div className="text-xs font-mono text-pink-400 font-bold uppercase">ACTA OFICIAL DE NEGOCIACIÓN EXTRAÍDA CON IA</div>
                      <h2 className="text-lg font-bold text-white mt-0.5">{actaGenerada.titulo}</h2>
                      <div className="text-xs text-slate-400 font-mono mt-1 flex flex-wrap items-center gap-3">
                        <span>📅 {actaGenerada.fecha}</span>
                        <span>⏱️ {actaGenerada.duracion}</span>
                        <span>💻 {actaGenerada.plataforma}</span>
                      </div>
                    </div>

                    {/* BOTÓN MÁGICO DE CONVERSIÓN EN 1 CLIC */}
                    <button 
                      onClick={() => {
                        setPartesContrato("AI GOVERN S.L. y Acme Corp S.A.");
                        setDetallesContrato("Suscripción enterprise por 60.000 €/año, SLA de 99.9%, prohibición de reentrenamiento de IA y limitación de responsabilidad a 12 meses.");
                        setActiveTab('redaccion');
                      }}
                      className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-lg cursor-pointer flex-shrink-0"
                    >
                      <Sparkles className="w-4 h-4" /> Convertir en Contrato en 1 Clic →
                    </button>
                  </div>

                  {/* Resumen Ejecutivo */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-xs text-slate-300 font-bold uppercase">1. Resumen Ejecutivo de la Negociación</span>
                    <p className="text-xs text-slate-300 leading-relaxed bg-[#090d16] p-3.5 rounded-lg border border-[#1f2d4a]">
                      {actaGenerada.resumen}
                    </p>
                  </div>

                  {/* Acuerdos Sustantivos */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-xs text-cyan-300 font-bold uppercase">2. Acuerdos Jurídicos & Cláusulas Pactadas</span>
                    <div className="space-y-1.5">
                      {actaGenerada.acuerdos_clave.map((acuerdo: string, i: number) => (
                        <div key={i} className="p-2.5 rounded bg-[#090d16] border border-cyan-500/20 text-xs text-slate-200 font-mono flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span>{acuerdo}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Matriz de Compromisos (Action Items) */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-xs text-amber-300 font-bold uppercase">3. Matriz de Compromisos & Tareas (Quién, Qué, Plazo)</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {actaGenerada.action_items.map((item: any, i: number) => (
                        <div key={i} className="p-3 rounded-lg bg-[#090d16] border border-amber-500/30 text-xs font-mono space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-amber-400 font-bold">{item.responsable}</span>
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px]">{item.plazo}</span>
                          </div>
                          <p className="text-slate-300 text-[11px]">{item.tarea}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hash Forense SHA-256 */}
                  <div className="pt-3 border-t border-[#1f2d4a] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-slate-400">
                    <div>
                      <span>HASH FORENSE AUDIO SHA-256: </span>
                      <span className="text-cyan-400">{actaGenerada.hash_sha256}</span>
                    </div>
                    <span className="text-emerald-400 font-bold">✓ Custodiado bajo Secreto Profesional</span>
                  </div>

                </div>
              )} className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg p-3 text-xs text-slate-200 outline-none font-mono resize-none" />
                  <button onClick={ejecutarAnonimizacion} disabled={cargandoAduana} className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs font-mono cursor-pointer">
                    {cargandoAduana ? "Sanitizando..." : "Ejecutar Sanitización Zero-Trust"}
                  </button>
                </div>
                <div className="p-5 rounded-xl bg-[#121a2d] border border-emerald-500/20 space-y-3">
                  <span className="font-mono text-xs text-emerald-300 font-bold block">Vista Sanitizada</span>
                  {resultadoAduana ? (
                    <div className="space-y-3">
                      <div className="bg-[#090d16] border border-[#1f2d4a] rounded-lg p-3 text-xs text-emerald-300 font-mono max-h-40 overflow-y-auto">{resultadoAduana.texto_anonimizado}</div>
                      <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-[#1f2d4a] space-y-0.5">
                        <div className="flex justify-between"><span>Tokens ofuscados:</span><span className="text-emerald-400 font-bold">{resultadoAduana.tokens_ofuscados}</span></div>
                        <div className="flex justify-between"><span>Hash SHA-256:</span><span className="text-cyan-400 truncate max-w-[200px]">{resultadoAduana.hash_sha256}</span></div>
                      </div>
                    </div>
                  ) : <div className="h-40 flex items-center justify-center text-slate-500 text-xs font-mono">Pulsa el botón para ofuscar los datos confidenciales.</div>}
                </div>
              </div>
            </div>
          )}

          {/* VISTA 5: ESTUDIO DE REDACCIÓN */}
          {activeTab === 'redaccion' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <FileText className="w-6 h-6 text-cyan-400" /> Estudio de Redacción Contractual Tech
                </h1>
                <p className="text-xs text-slate-400 mt-1">Generador guiado conforme al Playbook y normativas transfronterizas (EU AI Act, RGPD, Delaware Law).</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a]">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Tipo de Contrato</label>
                  <select value={tipoContrato} onChange={(e) => setTipoContrato(e.target.value)} className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none">
                    <option value="SaaS_MSA">SaaS Master Services Agreement (MSA)</option>
                    <option value="NDA_Mutuo">NDA Mutuo de Alta Confidencialidad</option>
                    <option value="DPA_Internacional">DPA Internacional con Cláusulas SCCs</option>
                    <option value="PIIAA">Cesión de Invenciones & IP (PIIAA)</option>
                    <option value="Contractor">Contratista Remoto Internacional (W-8BEN)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Jurisdicción</label>
                  <select value={jurisdiccion} onChange={(e) => setJurisdiccion(e.target.value)} className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none">
                    <option value="España (Madrid / UE)">España (Madrid / UE)</option>
                    <option value="EE.UU. (Delaware / NY)">Estados Unidos (Delaware / NY)</option>
                    <option value="LatAm (Bilingüe ES/EN)">LatAm (Bilingüe)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Partes</label>
                  <input type="text" value={partesContrato} onChange={(e) => setPartesContrato(e.target.value)} className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none" />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-xs font-mono text-slate-300 mb-1">Instrucciones / Cláusulas</label>
                  <textarea rows={2} value={detallesContrato} onChange={(e) => setDetallesContrato(e.target.value)} className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none resize-none" />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <button onClick={ejecutarGeneracionContrato} disabled={generandoContrato} className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono cursor-pointer">
                    <Sparkles className="w-3.5 h-3.5 inline mr-1" /> {generandoContrato ? "Redactando..." : "Generar Contrato Blindado"}
                  </button>
                </div>
              </div>

              {contratoGenerado && (
                <div className="p-5 rounded-xl bg-[#121a2d] border border-cyan-500/30 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-[#1f2d4a]">
                    <span className="font-mono text-xs text-cyan-300 font-bold">BORRADOR ENSAMBLADO EN MEMORIA LOCAL</span>
                  </div>
                  <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap bg-[#090d16] p-4 rounded-lg border border-[#1f2d4a] max-h-72 overflow-y-auto">{contratoGenerado}</pre>
                </div>
              )}
            </div>
          )}

          {/* VISTA 6: PLAYBOOK REDLINING */}
          {activeTab === 'playbook' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Scale className="w-6 h-6 text-purple-400" /> Hub de Negociación & Playbook Redlining
                </h1>
                <p className="text-xs text-slate-400 mt-1">Auditoría automática de contratos de contrapartes contra las reglas corporativas.</p>
              </div>

              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                <span className="font-mono text-xs text-slate-300 font-bold block">Texto del Contrato Recibido</span>
                <textarea rows={4} value={textoTercero} onChange={(e) => setTextoTercero(e.target.value)} className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg p-3 text-xs text-slate-200 outline-none resize-none font-mono" />
                <button onClick={ejecutarAuditoriaPlaybook} className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs font-mono cursor-pointer">
                  Auditar contra Playbook Corporativo
                </button>
              </div>

              {analisisPlaybook && (
                <div className="p-5 rounded-xl bg-[#121a2d] border border-purple-500/30 space-y-3">
                  <span className="font-mono text-xs text-purple-300 font-bold block">ALERTAS IDENTIFICADAS</span>
                  {analisisPlaybook.alerta_roja.map((a: string, i: number) => (
                    <div key={i} className="p-2.5 rounded bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-mono flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" /> {a}
                    </div>
                  ))}
                  <div className="pt-2 border-t border-[#1f2d4a]">
                    <span className="font-mono text-xs text-emerald-400 font-bold block mb-1">Contrapropuesta (Redline):</span>
                    <div className="p-3 rounded bg-[#090d16] border border-emerald-500/30 text-slate-200 text-xs font-mono">{analisisPlaybook.redline_sugerido}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* VISTA 7: CALENDARIO SLACK/WA */}
          {activeTab === 'calendario' && (
            <div className="space-y-6 max-w-5xl">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-amber-400" /> Calendario de Obligaciones & Alertas
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">Sincronización de renovaciones automáticas y plazos con Slack y WhatsApp.</p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">WA: Activo</span>
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">Slack: Activo</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#121a2d] border-l-4 border-l-red-500 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-white">Renovación Automática: AWS Cloud (EE. UU.)</div>
                    <p className="text-[11px] text-slate-400">Preaviso de 30 días para no renovación vence el 25 de septiembre de 2026.</p>
                  </div>
                  <span className="px-3 py-1 rounded bg-red-500/20 text-red-300 text-xs font-mono">Alerta Enviada</span>
                </div>
                <div className="p-4 rounded-xl bg-[#121a2d] border-l-4 border-l-amber-500 flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-white">Auditoría DPA: Call Center España</div>
                    <p className="text-[11px] text-slate-400">Revisión de Cláusulas Tipo (SCCs) y registro de tratamiento RGPD.</p>
                  </div>
                  <span className="px-3 py-1 rounded bg-amber-500/20 text-amber-300 text-xs font-mono">En 15 días</span>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 8: SECRETARÍA SOCIETARIA */}
          {activeTab === 'societario' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-blue-400" /> Secretaría Societaria & Gestión de Filiales
                </h1>
                <p className="text-xs text-slate-400 mt-1">Actas de junta de accionistas, resoluciones de directorio y control de poderes mercantiles.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-2 text-xs font-mono">
                <div className="p-3 rounded bg-[#090d16] flex justify-between items-center"><span>Acta de Junta General: Cuentas Anuales (España S.L.)</span><span className="text-emerald-400 font-bold">Vigente</span></div>
                <div className="p-3 rounded bg-[#090d16] flex justify-between items-center"><span>Written Consent of Board of Directors (Delaware LLC)</span><span className="text-emerald-400 font-bold">Vigente</span></div>
                <div className="p-3 rounded bg-[#090d16] flex justify-between items-center"><span>Poderes Mercantiles y Bancarios (Mancomunados)</span><span className="text-emerald-400 font-bold">Al Día</span></div>
              </div>
            </div>
          )}

          {/* VISTA 9: DUE DILIGENCE & DATA ROOM */}
          {activeTab === 'due_diligence' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Layers className="w-6 h-6 text-emerald-400" /> Due Diligence & Data Room Virtual (M&A / Rondas)
                </h1>
                <p className="text-xs text-slate-400 mt-1">Preparación de contratos para inversores, acuerdos SAFE y detección de contingencias.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] text-center space-y-2">
                <div className="text-emerald-400 font-bold text-sm font-mono">✓ 100% Contratos Indexados | Cero Riesgos de IP sin Asignar</div>
                <p className="text-xs text-slate-400">Data Room preparado para auditoría de ronda Seed ($500,000 SAFE YC Post-Money).</p>
              </div>
            </div>
          )}

          {/* VISTA 10: IP SHIELD */}
          {activeTab === 'ip_shield' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <FolderGit2 className="w-6 h-6 text-pink-400" /> Propiedad Intelectual, Software & Open Source Shield
                </h1>
                <p className="text-xs text-slate-400 mt-1">Vigilancia de marcas (EUIPO/USPTO), acuerdos PIIAA y prevención de licencias virales GPL.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-2 text-xs font-mono">
                <div className="p-3 rounded bg-[#090d16] flex justify-between"><span>Marca: AI GOVERN (EUIPO Europa)</span><span className="text-emerald-400">Clases 9, 42, 45</span></div>
                <div className="p-3 rounded bg-[#090d16] flex justify-between"><span>Scanner Dependencias de Código</span><span className="text-emerald-400 font-bold">✓ Cero Licencias Virales GPL</span></div>
              </div>
            </div>
          )}

          {/* VISTA 11: RAG PRECEDENTES */}
          {activeTab === 'rag_precedentes' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <FileCheck2 className="w-6 h-6 text-sky-400" /> Biblioteca Maestra & Motor Legal RAG Privado
                </h1>
                <p className="text-xs text-slate-400 mt-1">Base de conocimiento vectorial en Qdrant con silos estancos por filial.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                <div className="flex gap-2">
                  <input type="text" placeholder="Buscar en la doctrina interna y contratos históricos..." className="flex-1 bg-[#090d16] border border-[#1f2d4a] rounded-lg px-4 py-2 text-xs text-slate-200 outline-none font-mono" />
                  <button className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs font-mono">Buscar en Qdrant</button>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 12: VENTANILLA LEGAL (CLIO) */}
          {activeTab === 'crm' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-cyan-400" /> Ventanilla Legal Interna & Ticketing (Estilo Clio)
                </h1>
                <p className="text-xs text-slate-400 mt-1">Recepción de consultas de Ventas, Compras y RRHH con diagnósticos de IA validados.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-2">
                  <span className="text-xs font-mono text-amber-400 font-bold block">PENDIENTE (2)</span>
                  <div className="p-2.5 rounded bg-[#090d16] text-xs space-y-1">
                    <div className="font-bold text-white">Ventas: Contrato LatAm</div>
                    <p className="text-[11px] text-slate-400">Cliente pide pagar en pesos colombianos.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#121a2d] border border-cyan-500/30 space-y-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold block">EN NEGOCIACIÓN (1)</span>
                  <div className="p-2.5 rounded bg-[#090d16] text-xs space-y-1">
                    <div className="font-bold text-white">Compras: Licencia CRM</div>
                    <p className="text-[11px] text-slate-400">Redline enviado rechazando subida 15%.</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-2">
                  <span className="text-xs font-mono text-emerald-400 font-bold block">COMPLETADOS (5)</span>
                  <div className="p-2.5 rounded bg-[#090d16] text-xs">
                    <div className="font-bold text-slate-300">NDA Bilateral Inversor Silicon Valley</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 13: CONTROL DESPACHOS EXTERNOS */}
          {activeTab === 'outside_counsel' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Scale className="w-6 h-6 text-amber-400" /> Torre de Control de Despachos Externos (Outside Counsel)
                </h1>
                <p className="text-xs text-slate-400 mt-1">Supervisión de litigios tercerizados en tribunales locales y auditoría de minutas.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-white">Despacho Madrid: Litigio Laboral (Juzgado Social nº 12)</div>
                  <p className="text-xs text-slate-400">Presupuesto cerrado acordado: 2.500 € (En curso y dentro de presupuesto).</p>
                </div>
                <span className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono">Minuta Validada</span>
              </div>
            </div>
          )}

          {/* VISTA 14: CANAL ÉTICO */}
          {activeTab === 'canal_etico' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-blue-400" /> Canal Ético & Whistleblowing (Ley 2/2023)
                </h1>
                <p className="text-xs text-slate-400 mt-1">Canal interno anónimo y cifrado conforme a la directiva europea.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#121a2d] border border-blue-500/30 text-xs font-mono space-y-1">
                <span className="text-emerald-400 font-bold">✓ 100% Conforme Ley 2/2023</span>
                <p className="text-slate-300">Cero denuncias pendientes. Registro cifrado en Bóveda Forense.</p>
              </div>
            </div>
          )}

          {/* VISTA 15: RADAR SHADOW AI */}
          {activeTab === 'radar_shadow' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Radio className="w-6 h-6 text-red-400" /> Radar Anti-Shadow AI Empresarial
                </h1>
                <p className="text-xs text-slate-400 mt-1">Detección y bloqueo de accesos a IAs comerciales públicas en la red de la empresa.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-2 text-xs font-mono">
                <div className="p-3 rounded bg-[#090d16] flex justify-between items-center">
                  <div><span className="text-red-400 font-bold">[BLOQUEADO]</span> chat.openai.com (Puesto Ventas IP 192.168.1.45)<div className="text-[10px] text-slate-400">Patrón: NIFs y base de clientes</div></div>
                  <span className="text-emerald-400 text-[10px]">Re-enrutado a AI GOVERN</span>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 16: BÓVEDA FORENSE */}
          {activeTab === 'boveda' && (
            <div className="space-y-6 max-w-5xl">
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                  <Lock className="w-6 h-6 text-emerald-400" /> Bóveda Forense Inmutable (Registro SHA-256)
                </h1>
                <p className="text-xs text-slate-400 mt-1">Evidencia técnica inalterable de debida diligencia ante tribunales y el Consejo.</p>
              </div>
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] text-xs font-mono space-y-2">
                <div className="p-3 rounded bg-[#090d16] space-y-1">
                  <div className="text-cyan-300 text-[11px]">Hash SHA-256: 9b2b09a6e0d8c2d0a02488940f628122...</div>
                  <div className="text-slate-300">Sanitización y Redacción SaaS MSA • Barbara Piccolo</div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* MODAL INTERACTIVO DE REPORTES */}
      {reporteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-slate-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl space-y-6 border border-slate-200">
            
            <div className="flex justify-between items-start border-b border-slate-200 pb-4">
              <div>
                <div className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-cyan-600" /> AI GOVERN • ENTERPRISE LEGAL OS
                </div>
                <div className="text-xs font-mono text-slate-500 mt-1">
                  {reporteModal === 'trust' && "INFORME EJECUTIVO MENSUAL DE GOBERNANZA ALGORÍTMICA (TRUST REPORT)"}
                  {reporteModal === 'anexo' && "DOCUMENTACIÓN TÉCNICA OFICIAL EXIGIDA POR EL ANEXO IV (EU AI ACT)"}
                  {reporteModal === 'ceo' && "EXECUTIVE LEGAL & RISK REPORT PARA CEO & FUNDADORES"}
                </div>
              </div>
              <button onClick={() => setReporteModal(null)} className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {reporteModal === 'trust' && (
              <div className="space-y-4 text-xs font-sans text-slate-700 leading-relaxed">
                <div className="grid grid-cols-4 gap-3 font-mono">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200"><div className="text-[10px] text-slate-500">EU AI ACT</div><div className="text-base font-bold text-emerald-600">100% Conforme</div></div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200"><div className="text-[10px] text-slate-500">AGENTES EN PROD</div><div className="text-base font-bold text-slate-900">5 Sistemas</div></div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200"><div className="text-[10px] text-slate-500">AHORRO NETO</div><div className="text-base font-bold text-cyan-700">19.200 €</div></div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200"><div className="text-[10px] text-slate-500">ALUCINACIONES</div><div className="text-base font-bold text-emerald-600">0.6%</div></div>
                </div>
                <div className="font-bold text-slate-900 font-mono text-[11px] border-b border-slate-200 pb-1">1. DICTAMEN DE CONFORMIDAD NORMATIVA</div>
                <p>Se certifica ante el Consejo que todos los sistemas operan bajo arquitectura Zero Data Retention (ZDR) y soberanía de datos europea/local. Ningún dato confidencial o código ha sido utilizado para reentrenar modelos comerciales.</p>
              </div>
            )}

            {reporteModal === 'anexo' && (
              <div className="space-y-4 text-xs font-sans text-slate-700 leading-relaxed">
                <div className="font-bold text-slate-900 font-mono text-[11px] border-b border-slate-200 pb-1">1. DESCRIPCIÓN DEL SISTEMA (ANEXO IV EU AI ACT)</div>
                <p><strong>Denominación:</strong> AI GOVERN Enterprise Legal OS (v2.5.0)<br/><strong>Responsable de la Gobernanza:</strong> Barbara Isabel Piccolo Obaldo<br/><strong>Finalidad:</strong> Asistencia jurídica en contratación tecnológica y auditoría de riesgos bajo supervisión humana estricta.</p>
              </div>
            )}

            {reporteModal === 'ceo' && (
              <div className="space-y-4 text-xs font-sans text-slate-700 leading-relaxed">
                <div className="grid grid-cols-4 gap-3 font-mono">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200"><div className="text-[10px] text-slate-500">VELOCIDAD CIERRE</div><div className="text-base font-bold text-cyan-700">&lt; 24 Horas</div></div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200"><div className="text-[10px] text-slate-500">INGRESOS DESBLOQUEADOS</div><div className="text-base font-bold text-emerald-600">140.000 €</div></div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200"><div className="text-[10px] text-slate-500">MINUTAS AHORRADAS</div><div className="text-base font-bold text-emerald-600">9.400 € / mes</div></div>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200"><div className="text-[10px] text-slate-500">FUGAS BLOQUEADAS</div><div className="text-base font-bold text-red-600">14 Intentos</div></div>
                </div>
                <div className="font-bold text-slate-900 font-mono text-[11px] border-b border-slate-200 pb-1">1. VELOCIDAD COMERCIAL Y HABILITACIÓN DE INGRESOS</div>
                <p>El departamento legal redujo el ciclo de revisión de contratos de 5 días a menos de 24 horas, permitiendo al equipo comercial cerrar 140.000 € en contratos SaaS sin depender de bufetes externos caros.</p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="p-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 font-mono text-[10px]">
                <div className="text-slate-500 font-bold">CERTIFICADO Y FIRMADO POR:</div>
                <div className="text-xs font-bold text-cyan-800">Barbara Isabel Piccolo Obaldo</div>
                <div className="text-slate-500">General Counsel & Chief AI Officer (CAIO)</div>
                <div className="text-[9px] text-slate-400 mt-1">Hash SHA-256: 9b2b09a6e0d8c2d0a02488940f628122...</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => window.print()} className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono transition-all flex items-center gap-1.5 shadow-sm">
                  <Printer className="w-4 h-4" /> Imprimir / Guardar PDF
                </button>
                <button onClick={() => setReporteModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs font-mono transition-all">
                  Cerrar
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
