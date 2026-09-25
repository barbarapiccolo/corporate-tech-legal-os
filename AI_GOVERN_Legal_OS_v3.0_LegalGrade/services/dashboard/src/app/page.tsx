'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, FileText, Scale, Cpu, AlertTriangle, CheckCircle2, Lock, 
  Calendar, Briefcase, Users, Mic, CheckSquare, QrCode, Play, Square, Copy, Download, 
  ChevronRight, ChevronDown, ChevronLeft, MessageSquare, Sparkles, Search, BarChart3, 
  TrendingUp, Layers, Building2, PieChart, Radio, FileCheck2, FolderGit2, HelpCircle, 
  X, Printer, Upload, RefreshCw, Send, Clock, Plus, ArrowRight, Sun, Moon, Menu, Check, UserCheck
} from 'lucide-react';

export default function DashboardPage() {
  // Configuración de Tema (Claro / Oscuro) y Barra Lateral Plegable
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('planificador');

  // Control de Secciones de la Barra Lateral
  const [openSections, setOpenSections] = useState({
    despacho: true,
    gabinete: true,
    cumplimiento: false
  });

  const toggleSection = (s: 'despacho' | 'gabinete' | 'cumplimiento') => {
    setOpenSections(prev => ({ ...prev, [s]: !prev[s] }));
  };

  const isDark = theme === 'dark';

  // =========================================================================
  // 1. PESTAÑA: PLANIFICADOR DEL DESPACHO
  // =========================================================================
  const [filtroMateriaPlanificador, setFiltroMateriaPlanificador] = useState('Todas');
  const [tableroPlanificador, setTableroPlanificador] = useState<any[]>([
    { id: "EXP-01", titulo: "Intimación legal por vías de hecho y retención de 3 montacargas", cliente: "Machtig Rothe, C.A.", materia: "Inquilinario", responsable: "Barbara Piccolo", plazo: "Hoy 16:00", prioridad: "Crítica", estado: "Por Iniciar" },
    { id: "EXP-02", titulo: "Redacción final de Contrato SaaS Enterprise y DPA con Acme Corp", cliente: "AI GOVERN S.L.", materia: "LegalTech / SaaS", responsable: "Barbara Piccolo", plazo: "Viernes 17:00", prioridad: "Alta", estado: "En Tramitación" },
    { id: "EXP-03", titulo: "Informe de conciliación de pasivos con proveedores y rotación de stock", cliente: "Corein, C.A.", materia: "Auditoría Forense", responsable: "Equipo Auditor", plazo: "Lunes 10:00", prioridad: "Media", estado: "En Tramitación" },
    { id: "EXP-04", titulo: "Redacción de acta de asamblea extraordinaria sobre reforma estatutaria", cliente: "Sub 1308, C.A.", materia: "Societario", responsable: "Barbara Piccolo", plazo: "Miércoles", prioridad: "Media", estado: "Revisión & Firma" },
    { id: "EXP-05", titulo: "Protocolo de ciberseguridad y retención de logs (EU AI Act)", cliente: "Unidad de Tecnología (IT)", materia: "Cumplimiento", responsable: "Barbara Piccolo", plazo: "Completado", prioridad: "Alta", estado: "Concluido" }
  ]);

  // =========================================================================
  // 2. PESTAÑA: DIRECTORIO & CRM LEGAL (INTERNOS Y EXTERNOS)
  // =========================================================================
  const [clientes, setClientes] = useState<any[]>([
    {
      id: "CLI-01",
      nombre: "Machtig Rothe, C.A.",
      tipo: "Externo",
      rif: "J-40192834-0",
      apoderado: "Carlos Mendoza (Director de Operaciones)",
      email: "carlos.mendoza@machtigrothe.com",
      telefono: "+58 414-862-3344",
      asuntos_activos: 2,
      estado: "Activo",
      materia_principal: "Inquilinario Comercial & Maquinaria",
      saldo_pendiente: "0 USD"
    },
    {
      id: "CLI-02",
      nombre: "Corein, C.A.",
      tipo: "Externo",
      rif: "J-30492817-2",
      apoderado: "Roberto Gómez (Presidente)",
      email: "presidencia@corein.com",
      telefono: "+58 424-915-2200",
      asuntos_activos: 1,
      estado: "Retainer",
      materia_principal: "Auditoría Mercantil & Deuda",
      saldo_pendiente: "Factura N° 104 (6.750 USD)"
    },
    {
      id: "CLI-03",
      nombre: "Inmobiliaria del Este, C.A.",
      tipo: "Externo",
      rif: "J-30948572-1",
      apoderado: "Andrés Silva (Administrador)",
      email: "administracion@inmobiliariadeleste.com",
      telefono: "+58 412-300-1122",
      asuntos_activos: 1,
      estado: "En Negociación",
      materia_principal: "Contratación Inmobiliaria",
      saldo_pendiente: "0 USD"
    },
    {
      id: "CLI-04",
      nombre: "Unidad de Tecnología e Innovación (IT)",
      tipo: "Interno",
      rif: "Área Interna",
      apoderado: "Director de TI / Sistemas",
      email: "it-director@aigovern.space",
      telefono: "Ext. 201",
      asuntos_activos: 3,
      estado: "Activo",
      materia_principal: "Seguridad de Datos & AI Governance",
      saldo_pendiente: "Presupuesto Asignado"
    },
    {
      id: "CLI-05",
      nombre: "Dirección de Finanzas & Tesorería",
      tipo: "Interno",
      rif: "Área Interna",
      apoderado: "Controller Financiero",
      email: "finanzas@aigovern.space",
      telefono: "Ext. 104",
      asuntos_activos: 2,
      estado: "Activo",
      materia_principal: "SLA Billing & Controles SOX",
      saldo_pendiente: "Al día"
    },
    {
      id: "CLI-06",
      nombre: "AI GOVERN International S.L. (Filial España)",
      tipo: "Interno",
      rif: "B-88392019",
      apoderado: "Barbara Piccolo (General Counsel)",
      email: "barbara@aigovern.space",
      telefono: "+34 910-000-000",
      asuntos_activos: 4,
      estado: "Retainer",
      materia_principal: "Expansión UE & Contratación SaaS",
      saldo_pendiente: "Al día"
    }
  ]);

  // Formulario de Alta de Cliente
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    tipo: "Externo" as 'Interno' | 'Externo',
    rif: "",
    apoderado: "",
    email: "",
    telefono: "",
    materia_principal: "Corporativo"
  });

  const [clienteGuardadoExito, setClienteGuardadoExito] = useState(false);

  const registrarNuevoCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoCliente.nombre) return;
    const item = {
      id: `CLI-${Date.now().toString().slice(-4)}`,
      nombre: nuevoCliente.nombre,
      tipo: nuevoCliente.tipo,
      rif: nuevoCliente.rif || "S/R",
      apoderado: nuevoCliente.apoderado || "Por designar",
      email: nuevoCliente.email || "contacto@cliente.com",
      telefono: nuevoCliente.telefono || "N/A",
      asuntos_activos: 1,
      estado: "Activo",
      materia_principal: nuevoCliente.materia_principal,
      saldo_pendiente: "0 USD"
    };
    setClientes([item, ...clientes]);
    setNuevoCliente({
      nombre: "",
      tipo: "Externo",
      rif: "",
      apoderado: "",
      email: "",
      telefono: "",
      materia_principal: "Corporativo"
    });
    setClienteGuardadoExito(true);
    setTimeout(() => setClienteGuardadoExito(false), 4000);
  };

  // =========================================================================
  // 3. PESTAÑA: CALENDARIO PROCESAL Y CONTRACTUAL
  // =========================================================================
  const [eventosCalendario, setEventosCalendario] = useState([
    { id: "EV-01", titulo: "Término fatal para contestar intimación de desalojo (Galpón Unare)", cliente: "Machtig Rothe, C.A.", fecha: "25 de Septiembre de 2026", tipo: "Procesal Perentorio", dias_restantes: "Faltan 24 horas", nivel: "critico" },
    { id: "EV-02", titulo: "Vencimiento de preaviso formal de prórroga contractual (Cláusula 3)", cliente: "Machtig Rothe, C.A.", fecha: "30 de Septiembre de 2026", tipo: "Vencimiento Contractual", dias_restantes: "Faltan 6 días", nivel: "urgente" },
    { id: "EV-03", titulo: "Presentación de informe de auditoría forense a Junta Directiva", cliente: "Corein, C.A.", fecha: "06 de Octubre de 2026", tipo: "Reunión de Directorio", dias_restantes: "Faltan 12 días", nivel: "ordinario" },
    { id: "EV-04", titulo: "Renovación trimestral de infraestructura VPC y certificados eIDAS", cliente: "AI GOVERN S.L.", fecha: "24 de Octubre de 2026", tipo: "Hito Tecnológico", dias_restantes: "Faltan 30 días", nivel: "ordinario" }
  ]);

  // =========================================================================
  // 4. PESTAÑA: RENDIMIENTO & MÉTRICAS DEL DESPACHO (FINOPS LEGAL)
  // =========================================================================
  const [metricasDespacho, setMetricasDespacho] = useState({
    valor_aportado_usd: "148.000 USD",
    contingencias_ahorradas_usd: "24.500 USD",
    facturacion_mes_usd: "22.350 USD",
    tasa_eficiencia_tiempo: "82% Reducción ciclo revisión (de 5 días a 18 horas)",
    horas_totales_equipo: "142 horas",
    rendimiento_barbara: {
      rol: "Socia Directora & General Counsel",
      horas_estrategicas: "84 horas",
      asuntos_liderados: "8 expedientes complejos",
      tarifa_efectiva: "175 USD/hora",
      eficiencia: "98% cumplimiento en plazos fatales"
    },
    rendimiento_asociados: {
      rol: "Equipo Letrado Asociado & Soporte",
      horas_operativas: "58 horas",
      revisiones_realizadas: "24 contratos cotejados",
      tarifa_efectiva: "110 USD/hora",
      eficiencia: "92% cumplimiento de SLA interno"
    }
  });

  // =========================================================================
  // GABINETE JURÍDICO - 1. CALIFICACIÓN & ESTRATEGIA (CON FICHA DE CLIENTE)
  // =========================================================================
  const [clienteSeleccionadoTriage, setClienteSeleccionadoTriage] = useState("Machtig Rothe, C.A.");
  const [archivosAdjuntosTriage, setArchivosAdjuntosTriage] = useState<string[]>([
    "notificacion_extrajudicial_desalojo.pdf",
    "contrato_arrendamiento_2024.docx",
    "fotos_bloqueo_porton_montacargas.jpg"
  ]);
  const [consultaLetrada, setConsultaLetrada] = useState(
    "Tuve reunión de emergencia con el cliente. La arrendadora pretende desalojar en 48 horas alegando atraso en reparaciones estructurales y bloqueó el portón reteniendo 3 montacargas. Analicemos las leyes, la jurisprudencia civil venezolana y plantéame las opciones estratégicas que tenemos."
  );
  const [cargandoDictamen, setCargandoDictamen] = useState(false);
  const [dictamenEstrategico, setDictamenEstrategico] = useState<any>({
    cliente: "Machtig Rothe, C.A.",
    materia: "Inquilinario Comercial / Tutela Posesoria",
    nivel_urgencia: "Crítica (Término perentorio de 48 horas)",
    hechos_relevantes: [
      "Notificación extrajudicial conminatoria que pretende desposesión sin intervención judicial.",
      "Vía de hecho material: Bloqueo de accesos y retención ilegítima de bienes de capital (3 montacargas).",
      "Conflicto de compensación sobre reparaciones estructurales urgentes de techo y pavimento."
    ],
    vias_estrategicas: [
      {
        opcion: "Opción A: Requerimiento Formal Extrajudicial con Apercibimiento Penal",
        descripcion: "Redacción y consignación inmediata de contestación formal intimando el desbloqueo del portón en 12 horas, advirtiendo el tipo penal de apropiación indebida o retención indebida (Art. 468 Código Penal) y reserva expresa de cobro por daños y perjuicios comerciales.",
        viabilidad: "Inmediata (Recomendada como paso previo hoy mismo)",
        tiempo_ejecucion: "Hoy antes de las 16:00"
      },
      {
        opcion: "Opción B: Acción Posesoria de Restitución y Medida Cautelar Innominada",
        descripcion: "Interposición de querella interdictal de despojo o acción de amparo posesorio ante los Tribunales Civiles y Mercantiles de Puerto Ordaz, solicitando medida cautelar urgente de secuestro de llaves y aseguramiento de la libre circulación de maquinaria.",
        viabilidad: "Alta efectividad procesal en sede jurisdiccional",
        tiempo_ejecucion: "24 a 48 horas"
      },
      {
        opcion: "Opción C: Consignación Arrendaticia y Compensación Formal de Mejoras",
        descripcion: "Consignación formal de cánones ante el tribunal o autoridad inquilinaria competente, deduciendo las facturas fiscales de las obras de reparación estructural según lo pactado en la Cláusula de Mejoras.",
        viabilidad: "Eficaz para enervar cualquier pretensión de resolución de contrato por falta de pago",
        tiempo_ejecucion: "3 a 5 días hábiles"
      }
    ],
    fundamento_legal: [
      "Artículos 1.159 y 1.160 del Código Civil: Principio de fuerza obligatoria de los contratos y ejecución de buena fe.",
      "Artículos 1.585 y siguientes del Código Civil: Obligación de la arrendadora de procurar el goce pacífico de la cosa arrendada.",
      "Criterio pacífico y reiterado de la Sala de Casación Civil del TSJ: Prohibición absoluta de vías de hecho y justicia por propia mano en contratos de arrendamiento.",
      "Artículo 588 del Código de Procedimiento Civil: Procedencia de medidas cautelares innominadas ante peligro inminente de daño patrimonial."
    ]
  });

  const ejecutarCalificacionEstrategica = () => {
    setCargandoDictamen(true);
    setTimeout(() => {
      setDictamenEstrategico({
        cliente: clienteSeleccionadoTriage,
        materia: "Contratación Mercantil / Protección de Activos",
        nivel_urgencia: "Crítica",
        hechos_relevantes: [
          `Consulta formal vinculada al expediente de ${clienteSeleccionadoTriage}.`,
          "Evaluación de pruebas documentales y hechos fácticos comunicados por la dirección.",
          "Riesgo de daño patrimonial inmediato y pérdida de posesión legítima."
        ],
        vias_estrategicas: [
          {
            opcion: "Opción 1: Requerimiento e Intimación Legal Resolutiva",
            descripcion: "Consignar documento de réplica y fijar plazo fatal de cumplimiento con apercibimiento de acciones judiciales.",
            viabilidad: "Alta viabilidad preliminar",
            tiempo_ejecucion: "24 horas"
          },
          {
            opcion: "Opción 2: Medida Preventiva y Vía Jurisdiccional Ordinaria",
            descripcion: "Accionar ante tribunales mercantiles solicitando resguardo cautelar de los bienes de capital.",
            viabilidad: "Procedente",
            tiempo_ejecucion: "48 horas"
          }
        ],
        fundamento_legal: [
          "Normativa Civil y Mercantil aplicable al vínculo obligacional.",
          "Jurisprudencia vinculante sobre indemnidad y prohibición de autotutela."
        ]
      });
      setCargandoDictamen(false);
    }, 450);
  };

  // =========================================================================
  // GABINETE JURÍDICO - 2. ENSAMBLADOR DOCUMENTAL (DRIVE MODELS)
  // =========================================================================
  const [clienteEnsamblaje, setClienteEnsamblaje] = useState("Machtig Rothe, C.A.");
  const [modeloDriveSeleccionado, setModeloDriveSeleccionado] = useState("arrendamiento");
  const [variablesEnsamblador, setVariablesEnsamblador] = useState({
    otorgante: "Inmobiliaria del Este, C.A.",
    otorgante_rif: "J-30948572-1",
    beneficiario: "Machtig Rothe, C.A.",
    beneficiario_rif: "J-40192834-0",
    objeto: "Galpón Industrial N° 4, Sector Unare II, Puerto Ordaz, Estado Bolívar",
    monto: "2.800 USD pagaderos en Bolívares a tasa oficial BCV",
    plazo: "24 meses renovables",
    clausula_mejoras: true,
    tope_mejoras: "15.000 USD compensables"
  });

  const [documentoGeneradoWord, setDocumentoGeneradoWord] = useState(
    `CONTRATO DE ARRENDAMIENTO COMERCIAL E INDUSTRIAL\\n` +
    `MODELO ADAPTADO BIBLIOTECA DRIVE - DESPACHO PICCOLO & ASOCIADOS\\n\\n` +
    `Entre INMOBILIARIA DEL ESTE, C.A. (RIF J-30948572-1), \"LA ARRENDADORA\"; y MACHTIG ROTHE, C.A. (RIF J-40192834-0), \"LA ARRENDATARIA\", se conviene formalmente:\\n\\n` +
    `CLÁUSULA PRIMERA (OBJETO): LA ARRENDADORA cede en arrendamiento el inmueble ubicado en Galpón Industrial N° 4, Sector Unare II, Puerto Ordaz, Estado Bolívar, para uso industrial y logístico.\\n\\n` +
    `CLÁUSULA SEGUNDA (CANON): Canon de 2.800 USD pagaderos en Bolívares a tasa oficial BCV mensual anticipada.\\n\\n` +
    `CLÁUSULA TERCERA (DURACIÓN): 24 meses renovables mediante notificación formal previa de 60 días.\\n\\n` +
    `CLÁUSULA CUARTA (MEJORAS ESTRUCTURALES Y REPARACIONES): Las obras necesarias de reparación estructural de techos y pavimentos hasta por 15.000 USD serán financiadas inicialmente por LA ARRENDATARIA y compensadas mensualmente hasta en un 50% de los cánones sucesivos.\\n\\n` +
    `CLÁUSULA QUINTA (PROHIBICIÓN DE VÍAS DE HECHO): Se prohíbe terminantemente el bloqueo de accesos o retención de bienes muebles y montacargas. La infracción causará una cláusula penal de 500 USD diarios.\\n\\n` +
    `CLÁUSULA SEXTA (FUERO Y DOMICILIO): Domicilio especial excluyente en la ciudad de Puerto Ordaz.`
  );
  const [cargandoEnsamblaje, setCargandoEnsamblaje] = useState(false);

  // =========================================================================
  // GABINETE JURÍDICO - 3. AUDITORÍA DE CONTRAPARTES (REDLINER)
  // =========================================================================
  const [archivoContraparteNombre, setArchivoContraparteNombre] = useState<string>("contrato_propuesto_contraparte.docx");
  const [observacionesBarbara, setObservacionesBarbara] = useState(
    "Revisar estrictamente límites de responsabilidad (no aceptar indemnidades abiertas ni lucro cesante) y rechazar cualquier sumisión a tribunales foráneos o cesión de derechos de propiedad intelectual."
  );
  const [cargandoAuditoria, setCargandoAuditoria] = useState(false);
  const [informeAuditoria, setInformeAuditoria] = useState<any>({
    archivo: "contrato_propuesto_contraparte.docx",
    dictamen_general: "Alto Riesgo Jurídico y Patrimonial",
    total_clausulas: 18,
    clausulas_rojas: 3,
    clausulas_amarillas: 2,
    semaforo: [
      {
        clausula: "Cláusula 6: Indemnización Ilimitada",
        color: "rojo",
        nivel: "Alerta Roja (Crítica)",
        analisis: "La contraparte impone indemnidad sin límite cuantitativo ni temporal, incluyendo lucro cesante y daños consecuenciales indirectos.",
        redline_sugerido: "Reemplazar por: 'La responsabilidad total acumulada de la empresa bajo el presente Contrato se limitará estrictamente al monto total efectivamente facturado en los doce (12) meses anteriores al hecho causante. Se excluye el lucro cesante.'"
      },
      {
        clausula: "Cláusula 10: Cesión Irrevocable de Código y Algoritmos",
        color: "rojo",
        nivel: "Alerta Roja (Crítica)",
        analisis: "Pretende transferir la titularidad de los modelos, know-how y desarrollos de software preexistentes a favor de la contraparte.",
        redline_sugerido: "Reemplazar por: 'La empresa conserva la titularidad exclusiva y derechos morales y patrimoniales de su propiedad intelectual, concediendo únicamente una licencia corporativa de uso temporal y no exclusiva.'"
      },
      {
        clausula: "Cláusula 15: Jurisdicción Arbitral en Singapur",
        color: "rojo",
        nivel: "Alerta Roja (Procesal)",
        analisis: "Sometimiento a fueros remotos foráneos con asunción unilateral de costas.",
        redline_sugerido: "Reemplazar por: 'Las partes declaran someterse a la jurisdicción exclusiva de los tribunales competentes de Madrid (España) o Delaware (EE.UU.), asumiendo cada parte sus propios honorarios legales.'"
      },
      {
        clausula: "Cláusula 8: Plazo de Pago a 90 Días",
        color: "amarillo",
        nivel: "Alerta Amarilla (Comercial)",
        analisis: "Plazo de cobro excesivo que afecta el flujo de caja operativo.",
        redline_sugerido: "Reemplazar por: 'Plazo máximo de pago neto a 30 días naturales desde la emisión de la factura fiscal correspondiente.'"
      }
    ]
  });

  // =========================================================================
  // GABINETE JURÍDICO - 4. ENLACE CORPORATIVO & NUEVOS PROYECTOS
  // =========================================================================
  const [areaIniciativa, setAreaIniciativa] = useState<'Tecnología' | 'Finanzas' | 'Operaciones'>('Tecnología');
  const [descripcionIniciativa, setDescripcionIniciativa] = useState(
    "El equipo de tecnología e ingeniería está desarrollando un asistente de IA para lectura automatizada de balances contables y facturas de clientes. Requerimos dictamen de viabilidad jurídica, directrices de protección de datos (RGPD / EU AI Act) y especificaciones técnicas para los desarrolladores."
  );
  const [cargandoIniciativa, setCargandoIniciativa] = useState(false);
  const [dictamenIniciativa, setDictamenIniciativa] = useState<any>({
    area: "Tecnología",
    viabilidad: "Viable Sujeta a Blindaje Regulatorio (Art. 12 y 50 EU AI Act)",
    resumen_directivo: "El proyecto es legalmente viable siempre que se implemente un filtro Zero-Retention previo para sanitizar datos fiscales y bancarios antes de la inferencia, y se entregue al usuario final la advertencia de supervisión humana (HITL).",
    especificaciones_tecnicas: [
      {
        ticket: "LEGAL-TECH-01",
        titulo: "Pipeline de Anonimización en Memoria para Datos Bancarios e Identificadores Fiscales",
        responsable: "Ingeniería de Backend",
        criterios: ["Cero almacenamiento de texto crudo en disco", "Latencia < 15ms", "Hash de auditoría forense SHA-256"],
        prioridad: "P1 - Bloqueante"
      },
      {
        ticket: "LEGAL-TECH-02",
        titulo: "Etiquetado Transparente de Asistencia de IA en Documentos Exportados",
        responsable: "Frontend & UI",
        criterios: ["Leyenda visible conforme al Art. 50 del EU AI Act", "Firma digital del revisor humano"],
        prioridad: "P2 - Alta"
      }
    ],
    manual_operativo: "Directriz del Despacho: Ningún balance fiscal podrá ser procesado en servidores fuera del perímetro de custodia privada sin autorización expresa del General Counsel."
  });

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* ===================================================================== */}
      {/* BARRA LATERAL PLEGABLE - LENGUAJE CORPORATIVO LEGAL                  */}
      {/* ===================================================================== */}
      <aside className={`transition-all duration-300 ease-in-out border-r flex flex-col justify-between select-none z-30 ${
        sidebarOpen 
          ? 'w-72 p-3.5 translate-x-0 opacity-100' 
          : 'w-0 p-0 -translate-x-full opacity-0 pointer-events-none border-none'
      } ${
        isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="space-y-4 overflow-y-auto pr-1">
          
          {/* Logo y Encabezado Institucional */}
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-md">
                <Scale className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                  DESPACHO LEGAL
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </div>
                <div className={`text-[10px] font-medium tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Práctica Corporativa & CAIO
                </div>
              </div>
            </div>

            <button 
              onClick={() => setSidebarOpen(false)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isDark ? 'border-slate-800 hover:bg-slate-800 text-slate-400' : 'border-slate-200 hover:bg-slate-100 text-slate-500'
              }`}
              title="Ocultar menú"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Buscador Rápido */}
          <div className="relative px-1">
            <Search className={`w-3.5 h-3.5 absolute left-3.5 top-2.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            <input 
              type="text" 
              placeholder="Buscar cliente, expediente o término..." 
              className={`w-full rounded-lg pl-8 pr-3 py-1.5 text-xs transition-colors focus:outline-none ${
                isDark 
                  ? 'bg-slate-900 border border-slate-800 text-slate-200 focus:border-cyan-500 placeholder-slate-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-blue-500 placeholder-slate-400'
              }`} 
            />
          </div>

          {/* ================================================================= */}
          {/* SECCIÓN 1: PLANIFICACIÓN & GESTIÓN DEL DESPACHO                   */}
          {/* ================================================================= */}
          <div className="space-y-1">
            <div className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Despacho & Gestión
            </div>
            <div className="space-y-0.5">
              {[
                { id: 'planificador', label: 'Planificador de Asuntos', icon: Layers, color: 'text-cyan-400' },
                { id: 'crm', label: 'Directorio & CRM Legal', icon: Users, color: 'text-blue-400' },
                { id: 'calendario', label: 'Calendario Procesal', icon: Clock, color: 'text-amber-400' },
                { id: 'metricas', label: 'Rendimiento & Métricas', icon: BarChart3, color: 'text-emerald-400' },
              ].map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      active 
                        ? isDark 
                          ? 'bg-cyan-500/15 text-cyan-300 font-semibold' 
                          : 'bg-blue-50 text-blue-700 font-semibold'
                        : isDark 
                          ? 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200' 
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================= */}
          {/* SECCIÓN 2: GABINETE JURÍDICO (OPERACIONES LETRADAS)               */}
          {/* ================================================================= */}
          <div className="space-y-1">
            <button 
              onClick={() => toggleSection('gabinete')}
              className={`w-full px-2.5 py-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider transition-colors ${
                isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>Gabinete Jurídico</span>
              {openSections.gabinete ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>

            {openSections.gabinete && (
              <div className="space-y-0.5">
                {[
                  { id: 'calificacion_estrategia', label: '1. Calificación & Estrategia', icon: Scale, color: 'text-cyan-400' },
                  { id: 'ensamblador_documental', label: '2. Ensamblador Documental', icon: FileText, color: 'text-emerald-400' },
                  { id: 'auditoria_contrapartes', label: '3. Auditoría de Contrapartes', icon: FileCheck2, color: 'text-purple-400' },
                  { id: 'enlace_corporativo', label: '4. Enlace & Nuevos Proyectos', icon: Cpu, color: 'text-blue-400' },
                  { id: 'control_gestion', label: '5. Control de Gestión y Plazos', icon: CheckSquare, color: 'text-amber-400' },
                  { id: 'actas_minutas', label: '6. Actas y Minutas Ejecutivas', icon: Mic, color: 'text-pink-400' },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        active 
                          ? isDark 
                            ? 'bg-cyan-500/15 text-cyan-300 font-semibold' 
                            : 'bg-blue-50 text-blue-700 font-semibold'
                          : isDark 
                            ? 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200' 
                            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ================================================================= */}
          {/* SECCIÓN 3: CUMPLIMIENTO & EVIDENCIA                              */}
          {/* ================================================================= */}
          <div className="space-y-1">
            <button 
              onClick={() => toggleSection('cumplimiento')}
              className={`w-full px-2.5 py-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider transition-colors ${
                isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span>Cumplimiento & Evidencia</span>
              {openSections.cumplimiento ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            </button>

            {openSections.cumplimiento && (
              <div className="space-y-0.5">
                {[
                  { id: 'aduana', label: 'Aduana & Secreto Profesional', icon: Shield, color: 'text-emerald-400' },
                  { id: 'boveda', label: 'Bóveda Forense SHA-256', icon: Lock, color: 'text-blue-400' },
                  { id: 'canal_etico', label: 'Canal Ético Corporativo', icon: HelpCircle, color: 'text-purple-400' },
                  { id: 'societario', label: 'Secretaría Societaria', icon: Building2, color: 'text-amber-400' },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                        active 
                          ? isDark 
                            ? 'bg-cyan-500/15 text-cyan-300 font-semibold' 
                            : 'bg-blue-50 text-blue-700 font-semibold'
                          : isDark 
                            ? 'text-slate-400 hover:bg-slate-800/60' 
                            : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Perfil Profesional de Barbara Piccolo */}
        <div className={`pt-3 border-t flex items-center justify-between px-1 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xs text-slate-950 font-mono">
              BP
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Barbara Piccolo</div>
              <div className={`text-[10px] ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                Abogada Directora & GC
              </div>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400" title="Despacho Operativo"></div>
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* ÁREA PRINCIPAL                                                        */}
      {/* ===================================================================== */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Cabecera Superior */}
        <header className={`h-14 border-b px-5 flex items-center justify-between backdrop-blur-md transition-colors ${
          isDark ? 'bg-[#0f172a]/80 border-slate-800' : 'bg-white/90 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              title={sidebarOpen ? "Ocultar panel lateral" : "Mostrar panel lateral"}
              className={`p-1.5 rounded-lg border transition-colors ${
                isDark 
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800' 
                  : 'border-slate-200 bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 shadow-sm'
              }`}
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className={`flex items-center gap-1.5 text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span>DESPACHO</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              <span className={`font-semibold capitalize ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                {activeTab.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono ${
              isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              <CheckCircle2 className="w-3 h-3" /> Custodia Legal & eIDAS
            </span>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-amber-300 hover:bg-slate-800'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 shadow-sm'
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Modo Claro</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-600" />
                  <span className="hidden sm:inline">Modo Oscuro</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Contenido Dinámico */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

          {/* ================================================================= */}
          {/* PESTAÑA 1: PLANIFICADOR DE ASUNTOS DEL DESPACHO                   */}
          {/* ================================================================= */}
          {activeTab === 'planificador' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Layers className="w-5 h-5 text-cyan-400" /> Planificador de Asuntos y Expedientes
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control de prioridades procesales, estado de expedientes y tramitaciones letradas.
                  </p>
                </div>
                <div className="flex gap-2">
                  {['Todas', 'Inquilinario', 'Societario', 'LegalTech'].map(m => (
                    <button
                      key={m}
                      onClick={() => setFiltroMateriaPlanificador(m)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        filtroMateriaPlanificador === m
                          ? isDark ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' : 'bg-blue-100 text-blue-700 border-blue-200'
                          : isDark ? 'border-slate-800 text-slate-400 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tablero Kanban Procesal */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3.5">
                {['Por Iniciar', 'En Tramitación', 'Revisión & Firma', 'Concluido'].map(col => {
                  const items = tableroPlanificador.filter(i => 
                    (col === 'En Tramitación' ? i.estado.includes('Tramitación') : i.estado === col) &&
                    (filtroMateriaPlanificador === 'Todas' || i.materia.includes(filtroMateriaPlanificador))
                  );
                  return (
                    <div key={col} className={`p-3 rounded-2xl border flex flex-col justify-between min-h-[320px] ${
                      isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <div>
                        <div className="flex justify-between items-center pb-2 border-b border-slate-800/40 text-xs font-bold">
                          <span>{col}</span>
                          <span className={`px-1.5 py-0.5 rounded text-[10px] ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                            {items.length}
                          </span>
                        </div>
                        <div className="space-y-2 mt-2.5">
                          {items.map(t => (
                            <div key={t.id} className={`p-3 rounded-xl border text-xs space-y-2 transition-all ${
                              isDark ? 'bg-slate-950 border-slate-800 hover:border-cyan-500/40' : 'bg-slate-50 border-slate-200 hover:border-blue-400 shadow-sm'
                            }`}>
                              <div className="flex justify-between items-center text-[10px]">
                                <span className="font-bold text-cyan-400">{t.cliente}</span>
                                <span className={`px-1.5 py-0.5 rounded font-bold ${
                                  t.prioridad === 'Crítica' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                                }`}>
                                  {t.prioridad}
                                </span>
                              </div>
                              <div className="font-medium text-[11px] leading-snug">{t.titulo}</div>
                              <div className={`text-[10px] pt-1 border-t border-slate-800/30 flex justify-between ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                <span>{t.responsable}</span>
                                <span className="font-medium">{t.plazo}</span>
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
          )}

          {/* ================================================================= */}
          {/* PESTAÑA 2: DIRECTORIO Y CRM LEGAL (FICHA LEGAL + TABLERO INTERNO/EXTERNO) */}
          {/* ================================================================= */}
          {activeTab === 'crm' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-400" /> Directorio & CRM Legal
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Registro de fichas legales societarias y matriz de clientes dividida en internos y externos.
                  </p>
                </div>
              </div>

              {/* Formulario de Alta de Cliente (Ficha Legal) */}
              <div className={`p-5 rounded-2xl border space-y-4 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/40">
                  <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-cyan-400">
                    <UserCheck className="w-4 h-4" /> Alta de Nuevo Cliente (Ficha Legal)
                  </span>
                  {clienteGuardadoExito && (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Ficha registrada en el Directorio
                    </span>
                  )}
                </div>

                <form onSubmit={registrarNuevoCliente} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className={`text-[10px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Nombre o Razón Social:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej. Derivados Guayana C.A."
                      value={nuevoCliente.nombre}
                      onChange={e => setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
                      className={`w-full p-2 rounded-xl border text-xs focus:outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-cyan-500' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`text-[10px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Clasificación:
                    </label>
                    <select
                      value={nuevoCliente.tipo}
                      onChange={(e: any) => setNuevoCliente({...nuevoCliente, tipo: e.target.value})}
                      className={`w-full p-2 rounded-xl border text-xs focus:outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <option value="Externo">Cliente Externo (Sociedad / Tercero)</option>
                      <option value="Interno">Cliente Interno (Filial / Área Corporativa)</option>
                    </select>
                  </div>

                  <div>
                    <label className={`text-[10px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      RIF / Identificación Fiscal:
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. J-31294857-0"
                      value={nuevoCliente.rif}
                      onChange={e => setNuevoCliente({...nuevoCliente, rif: e.target.value})}
                      className={`w-full p-2 rounded-xl border text-xs focus:outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`text-[10px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Apoderado / Representante Legal:
                    </label>
                    <input
                      type="text"
                      placeholder="Nombre del director o apoderado"
                      value={nuevoCliente.apoderado}
                      onChange={e => setNuevoCliente({...nuevoCliente, apoderado: e.target.value})}
                      className={`w-full p-2 rounded-xl border text-xs focus:outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`text-[10px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Correo de Notificaciones:
                    </label>
                    <input
                      type="email"
                      placeholder="legal@cliente.com"
                      value={nuevoCliente.email}
                      onChange={e => setNuevoCliente({...nuevoCliente, email: e.target.value})}
                      className={`w-full p-2 rounded-xl border text-xs focus:outline-none ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      Guardar Ficha Legal en Directorio
                    </button>
                  </div>
                </form>
              </div>

              {/* Matriz de Clientes: Internos y Externos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Panel: Clientes Externos */}
                <div className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800/40 text-xs font-bold">
                    <span className="text-cyan-400">Clientes Externos (Sociedades y Clientes Corporativos)</span>
                    <span className="text-[10px] text-slate-400">{clientes.filter(c => c.tipo === 'Externo').length} activos</span>
                  </div>

                  <div className="space-y-2">
                    {clientes.filter(c => c.tipo === 'Externo').map(cli => (
                      <div key={cli.id} className={`p-3 rounded-xl border space-y-1.5 text-xs ${
                        isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-sm">{cli.nombre}</div>
                            <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>RIF: {cli.rif}</div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300">
                            {cli.estado}
                          </span>
                        </div>
                        <div className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          <strong>Apoderado:</strong> {cli.apoderado}
                        </div>
                        <div className={`text-[10px] flex justify-between pt-1 border-t border-slate-800/30 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          <span>Materia: {cli.materia_principal}</span>
                          <span className="font-medium text-emerald-400">{cli.asuntos_activos} asuntos en curso</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Panel: Clientes Internos */}
                <div className={`p-4 rounded-2xl border space-y-3 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800/40 text-xs font-bold">
                    <span className="text-blue-400">Clientes Internos (Filiales, Departamentos y Unidades de Negocio)</span>
                    <span className="text-[10px] text-slate-400">{clientes.filter(c => c.tipo === 'Interno').length} áreas</span>
                  </div>

                  <div className="space-y-2">
                    {clientes.filter(c => c.tipo === 'Interno').map(cli => (
                      <div key={cli.id} className={`p-3 rounded-xl border space-y-1.5 text-xs ${
                        isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold text-sm">{cli.nombre}</div>
                            <div className={`text-[11px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{cli.rif}</div>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">
                            Interno
                          </span>
                        </div>
                        <div className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                          <strong>Contacto Clave:</strong> {cli.apoderado}
                        </div>
                        <div className={`text-[10px] flex justify-between pt-1 border-t border-slate-800/30 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          <span>Alcance: {cli.materia_principal}</span>
                          <span className="font-medium text-cyan-400">SLA Operativo Vigente</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ================================================================= */}
          {/* PESTAÑA 3: CALENDARIO PROCESAL Y CONTRACTUAL                      */}
          {/* ================================================================= */}
          {activeTab === 'calendario' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" /> Calendario Judicial & Contractual
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control de términos fatales, vencimientos de arrendamientos y plazos perentorios.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {eventosCalendario.map(ev => (
                  <div key={ev.id} className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    ev.nivel === 'critico' 
                      ? 'border-red-500/40 bg-red-950/15' 
                      : ev.nivel === 'urgente'
                        ? 'border-amber-500/40 bg-amber-950/15'
                        : isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          ev.nivel === 'critico' ? 'bg-red-500/20 text-red-400' : ev.nivel === 'urgente' ? 'bg-amber-500/20 text-amber-400' : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {ev.tipo}
                        </span>
                        <span className="font-bold text-cyan-400">{ev.cliente}</span>
                      </div>
                      <div className="text-sm font-semibold text-white">{ev.titulo}</div>
                      <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        Fecha límite: {ev.fecha}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className={`font-mono text-xs font-bold ${ev.nivel === 'critico' ? 'text-red-400' : 'text-amber-400'}`}>
                        {ev.dias_restantes}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* PESTAÑA 4: RENDIMIENTO & MÉTRICAS (FINOPS LEGAL)                  */}
          {/* ================================================================= */}
          {activeTab === 'metricas' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-emerald-400" /> Rendimiento & Métricas del Despacho
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control de rentabilidad, cuánto rinde el despacho, valor generado y eficiencia por abogado.
                  </p>
                </div>
              </div>

              {/* 4 Indicadores Financieros y Operativos */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Valor Desbloqueado</div>
                  <div className="text-xl font-bold text-emerald-400 mt-1">{metricasDespacho.valor_aportado_usd}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">En contratos y cierres</div>
                </div>

                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Riesgo Contingente Ahorrado</div>
                  <div className="text-xl font-bold text-cyan-400 mt-1">{metricasDespacho.contingencias_ahorradas_usd}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Controversias evitadas</div>
                </div>

                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Facturación Mes</div>
                  <div className="text-xl font-bold text-white mt-1">{metricasDespacho.facturacion_mes_usd}</div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">Cartera al día</div>
                </div>

                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className={`text-[10px] uppercase font-semibold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Eficiencia de Ciclo</div>
                  <div className="text-xl font-bold text-blue-400 mt-1">18 horas</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Antes 5 días laborables</div>
                </div>
              </div>

              {/* Comparativa de Rendimiento por Profesional */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className={`p-4 rounded-2xl border space-y-2.5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800/40">
                    <span className="font-bold text-sm text-cyan-400">Barbara Piccolo (General Counsel)</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300">Dirección</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between"><span>Dedicación estratégica:</span><strong className="font-mono">{metricasDespacho.rendimiento_barbara.horas_estrategicas}</strong></div>
                    <div className="flex justify-between"><span>Asuntos de alta complejidad:</span><strong>{metricasDespacho.rendimiento_barbara.asuntos_liderados}</strong></div>
                    <div className="flex justify-between"><span>Tarifa efectiva promedio:</span><strong className="text-emerald-400 font-mono">{metricasDespacho.rendimiento_barbara.tarifa_efectiva}</strong></div>
                    <div className="flex justify-between"><span>Cumplimiento de plazos fatales:</span><strong className="text-cyan-400 font-mono">{metricasDespacho.rendimiento_barbara.eficiencia}</strong></div>
                  </div>
                </div>

                <div className={`p-4 rounded-2xl border space-y-2.5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800/40">
                    <span className="font-bold text-sm text-blue-400">Equipo Letrado Asociado & Apoyo</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">Operaciones</span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between"><span>Horas de tramitación y análisis:</span><strong className="font-mono">{metricasDespacho.rendimiento_asociados.horas_operativas}</strong></div>
                    <div className="flex justify-between"><span>Instrumentos cotejados y revisados:</span><strong>{metricasDespacho.rendimiento_asociados.revisiones_realizadas}</strong></div>
                    <div className="flex justify-between"><span>Tarifa efectiva equipo:</span><strong className="text-emerald-400 font-mono">{metricasDespacho.rendimiento_asociados.tarifa_efectiva}</strong></div>
                    <div className="flex justify-between"><span>Cumplimiento de SLA interno:</span><strong className="text-blue-400 font-mono">{metricasDespacho.rendimiento_asociados.eficiencia}</strong></div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 1: CALIFICACIÓN & ESTRATEGIA JURÍDICA                    */}
          {/* ================================================================= */}
          {activeTab === 'calificacion_estrategia' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Scale className="w-5 h-5 text-cyan-400" /> 1. Calificación de Asuntos y Estrategia Jurídica
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Selección de cliente, análisis de expediente probatorio y debate letrado de alternativas procesales.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                
                {/* Panel de Entrada y Consulta */}
                <div className="lg:col-span-5 space-y-3">
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    
                    {/* 1. Seleccionar Ficha de Cliente Previamente Registrada */}
                    <div>
                      <label className={`text-[11px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        1. Ficha del Cliente (CRM):
                      </label>
                      <select
                        value={clienteSeleccionadoTriage}
                        onChange={(e) => setClienteSeleccionadoTriage(e.target.value)}
                        className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                          isDark ? 'bg-slate-950 border-slate-800 text-cyan-300' : 'bg-slate-50 border-slate-200 text-blue-700'
                        }`}
                      >
                        {clientes.map(c => (
                          <option key={c.id} value={c.nombre}>{c.nombre} ({c.tipo})</option>
                        ))}
                      </select>
                    </div>

                    {/* 2. Adjuntar Archivos / Evidencias Recibidas */}
                    <div>
                      <label className={`text-[11px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        2. Insumos y Evidencias Recibidas:
                      </label>
                      <div className={`p-2.5 rounded-xl border space-y-1.5 text-xs ${
                        isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div className="flex items-center justify-between text-[11px] text-slate-400">
                          <span>{archivosAdjuntosTriage.length} archivos adjuntos</span>
                          <label className="text-cyan-400 font-semibold cursor-pointer hover:underline">
                            + Adjuntar archivo
                            <input type="file" multiple className="hidden" onChange={(e) => {
                              if (e.target.files) {
                                const names = Array.from(e.target.files).map(f => f.name);
                                setArchivosAdjuntosTriage([...archivosAdjuntosTriage, ...names]);
                              }
                            }} />
                          </label>
                        </div>
                        {archivosAdjuntosTriage.map((arc, i) => (
                          <div key={i} className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5 truncate">
                            <span className="text-cyan-400">📄</span> {arc}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Petición / Consulta Letrada de Barbara */}
                    <div>
                      <label className={`text-[11px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        3. Petición e Instrucción Letrada de la Abogada:
                      </label>
                      <textarea
                        rows={5}
                        value={consultaLetrada}
                        onChange={(e) => setConsultaLetrada(e.target.value)}
                        className={`w-full p-3 rounded-xl border text-xs leading-relaxed focus:outline-none ${
                          isDark ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-cyan-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'
                        }`}
                        placeholder="Escribe tu análisis y lo que deseas contrastar..."
                      />
                    </div>

                    <button
                      onClick={ejecutarCalificacionEstrategica}
                      disabled={cargandoDictamen}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {cargandoDictamen ? "Contrastando con jurisprudencia..." : "Analizar Caso & Debatir Estrategia"}
                    </button>
                  </div>
                </div>

                {/* Panel de Salida: Debate Jurídico y Opciones */}
                <div className="lg:col-span-7 space-y-3">
                  {dictamenEstrategico && (
                    <div className={`p-4 rounded-2xl border space-y-3.5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800/40">
                        <div>
                          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Dictamen & Opciones Jurídicas</span>
                          <div className="text-xs text-slate-400">Expediente: <strong>{dictamenEstrategico.cliente}</strong></div>
                        </div>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                          {dictamenEstrategico.nivel_urgencia}
                        </span>
                      </div>

                      {/* Vías Estratégicas Disponibles */}
                      <div className="space-y-2.5">
                        <div className="text-xs font-bold uppercase tracking-wider">Alternativas de Acción Letrada:</div>
                        {dictamenEstrategico.vias_estrategicas.map((via: any, i: number) => (
                          <div key={i} className={`p-3 rounded-xl border space-y-1.5 text-xs ${
                            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}>
                            <div className="font-bold text-sm text-cyan-300">{via.opcion}</div>
                            <p className={`text-[11px] leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{via.descripcion}</p>
                            <div className="text-[10px] text-slate-400 pt-1 flex justify-between">
                              <span><strong>Eficacia:</strong> {via.viabilidad}</span>
                              <span className="text-emerald-400 font-semibold">{via.tiempo_ejecucion}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Fundamento en Leyes y Jurisprudencia */}
                      <div className={`p-3 rounded-xl border space-y-1.5 text-xs ${
                        isDark ? 'bg-slate-950/60 border-slate-800/80 text-slate-300' : 'bg-blue-50 border-blue-200 text-slate-700'
                      }`}>
                        <div className="text-[10px] font-bold uppercase text-amber-400">Fundamentación en Leyes & Doctrina Jurisprudencial</div>
                        {dictamenEstrategico.fundamento_legal.map((f: string, i: number) => (
                          <div key={i} className="text-[11px] flex items-start gap-1.5">
                            <span className="text-cyan-400 font-bold">•</span>
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>

                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 2: ENSAMBLADOR DOCUMENTAL (MODELOS DRIVE INMUTABLES)     */}
          {/* ================================================================= */}
          {activeTab === 'ensamblador_documental' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" /> 2. Ensamblador Documental (Modelos de Drive)
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Alimentado por tu biblioteca de modelos en Google Drive: sustitución limpia sin modificar estilo ni numeración.
                  </p>
                </div>
                <button
                  onClick={() => alert("Generando archivo Word (.docx) descargable con la plantilla íntegra de Drive...")}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> Descargar en Word (.docx)
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 space-y-3">
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    
                    <div>
                      <label className={`text-[11px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Ficha del Cliente (CRM):
                      </label>
                      <select
                        value={clienteEnsamblaje}
                        onChange={(e) => setClienteEnsamblaje(e.target.value)}
                        className={`w-full p-2 rounded-xl border text-xs focus:outline-none ${
                          isDark ? 'bg-slate-950 border-slate-800 text-emerald-300' : 'bg-slate-50 border-slate-200 text-emerald-700'
                        }`}
                      >
                        {clientes.map(c => (
                          <option key={c.id} value={c.nombre}>{c.nombre}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className={`text-[11px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Plantilla Inmutable de Google Drive:
                      </label>
                      <select
                        value={modeloDriveSeleccionado}
                        onChange={(e) => setModeloDriveSeleccionado(e.target.value)}
                        className={`w-full p-2 rounded-xl border text-xs focus:outline-none ${
                          isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <option value="arrendamiento">Arrendamiento Comercial con Financiamiento de Mejoras (Machtig Rothe)</option>
                        <option value="poder">Poder Especial Amplio y de Disposición (Estándar Notarial Piccolo)</option>
                        <option value="nda">Acuerdo de Confidencialidad y No Divulgación Bilateral (NDA)</option>
                        <option value="asamblea">Acta de Asamblea Extraordinaria de Accionistas (Sub 1308)</option>
                      </select>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label className={`text-[10px] block mb-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Parte Otorgante / Arrendadora:</label>
                        <input
                          type="text"
                          value={variablesEnsamblador.otorgante}
                          onChange={(e) => setVariablesEnsamblador({...variablesEnsamblador, otorgante: e.target.value})}
                          className={`w-full p-2 rounded-lg border text-xs focus:outline-none ${
                            isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={`text-[10px] block mb-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Canon / Contraprestación:</label>
                          <input
                            type="text"
                            value={variablesEnsamblador.monto}
                            onChange={(e) => setVariablesEnsamblador({...variablesEnsamblador, monto: e.target.value})}
                            className={`w-full p-2 rounded-lg border text-xs focus:outline-none ${
                              isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`text-[10px] block mb-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Vigencia:</label>
                          <input
                            type="text"
                            value={variablesEnsamblador.plazo}
                            onChange={(e) => setVariablesEnsamblador({...variablesEnsamblador, plazo: e.target.value})}
                            className={`w-full p-2 rounded-lg border text-xs focus:outline-none ${
                              isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert("Datos mapeados exitosamente en la plantilla inmutable de Drive.")}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      Actualizar Documento Word
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800/40 text-xs font-bold">
                      <span className="text-emerald-400">Texto Íntegro Fiel (Modelo Original de Drive)</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(documentoGeneradoWord);
                          alert("Texto copiado al portapapeles.");
                        }}
                        className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 cursor-pointer ${
                          isDark ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Copy className="w-3 h-3" /> Copiar
                      </button>
                    </div>

                    <div className={`p-4 rounded-xl border text-xs leading-relaxed max-h-[460px] overflow-y-auto whitespace-pre-wrap font-mono ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      {documentoGeneradoWord}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 3: AUDITORÍA DE CONTRAPARTES (REDLINER)                  */}
          {/* ================================================================= */}
          {activeTab === 'auditoria_contrapartes' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <FileCheck2 className="w-5 h-5 text-purple-400" /> 3. Cotejo & Auditoría de Contrapartes
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Adjunta el documento recibido de la otra parte para generar el informe con semáforo y redlines sugeridos.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 space-y-3">
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    
                    {/* Adjuntar Documento */}
                    <div>
                      <label className={`text-[11px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Documento Recibido de Contraparte:
                      </label>
                      <label className={`p-4 rounded-xl border border-dashed flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                        isDark ? 'border-slate-800 hover:border-purple-500 bg-slate-950/50' : 'border-slate-300 hover:border-purple-500 bg-slate-50'
                      }`}>
                        <Upload className="w-5 h-5 text-purple-400" />
                        <span className="text-xs font-semibold">{archivoContraparteNombre}</span>
                        <span className="text-[10px] text-slate-400">Haz clic para cambiar archivo (.docx o .pdf)</span>
                        <input type="file" className="hidden" onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setArchivoContraparteNombre(e.target.files[0].name);
                          }
                        }} />
                      </label>
                    </div>

                    {/* Espacio para Observaciones de Barbara */}
                    <div>
                      <label className={`text-[11px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Instrucciones y Observaciones de la Abogada:
                      </label>
                      <textarea
                        rows={4}
                        value={observacionesBarbara}
                        onChange={(e) => setObservacionesBarbara(e.target.value)}
                        className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none leading-relaxed ${
                          isDark ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-purple-500' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                        placeholder="Directrices de negociación..."
                      />
                    </div>

                    <button
                      onClick={() => alert("Auditoría ejecutada conforme a tus observaciones y estándares del despacho.")}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      Auditar Instrumento (Generar Semáforo)
                    </button>
                  </div>
                </div>

                {/* Informe con Semáforo y Redlines */}
                <div className="lg:col-span-7 space-y-3">
                  {informeAuditoria && (
                    <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800/40 text-xs">
                        <span className="font-bold text-purple-400">Informe Semafórico de Riesgos</span>
                        <span className="px-2 py-0.5 rounded font-bold bg-red-500/20 text-red-400 text-[10px]">
                          {informeAuditoria.clausulas_rojas} Alertas Rojas
                        </span>
                      </div>

                      <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                        {informeAuditoria.semaforo.map((c: any, i: number) => (
                          <div key={i} className={`p-3 rounded-xl border space-y-2 text-xs ${
                            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}>
                            <div className="flex justify-between items-center font-bold">
                              <span className="text-white">{c.clausula}</span>
                              <span className={`px-2 py-0.5 rounded text-[10px] ${
                                c.color === 'rojo' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                              }`}>
                                {c.nivel}
                              </span>
                            </div>

                            <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{c.analisis}</p>

                            <div className="p-2 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-[11px]">
                              <strong>Redline Propuesto:</strong> {c.redline_sugerido}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 4: ENLACE CORPORATIVO & NUEVOS PROYECTOS                 */}
          {/* ================================================================= */}
          {activeTab === 'enlace_corporativo' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-400" /> 4. Enlace Corporativo & Nuevos Proyectos
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Articulación de iniciativas de las áreas de negocio para darles viabilidad jurídica y especificaciones operativas.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 space-y-3">
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div>
                      <label className={`text-[11px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Área Solicitante de la Empresa:
                      </label>
                      <select
                        value={areaIniciativa}
                        onChange={(e: any) => setAreaIniciativa(e.target.value)}
                        className={`w-full p-2 rounded-xl border text-xs focus:outline-none ${
                          isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                      >
                        <option value="Tecnología">Equipo de Tecnología e Innovación (IT)</option>
                        <option value="Finanzas">Dirección de Finanzas & Tesorería</option>
                        <option value="Operaciones">Operaciones, Nuevos Negocios & RRHH</option>
                      </select>
                    </div>

                    <div>
                      <label className={`text-[11px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Petición / Proyecto o Idea en Desarrollo:
                      </label>
                      <textarea
                        rows={6}
                        value={descripcionIniciativa}
                        onChange={(e) => setDescripcionIniciativa(e.target.value)}
                        className={`w-full p-3 rounded-xl border text-xs leading-relaxed focus:outline-none ${
                          isDark ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800'
                        }`}
                        placeholder="Describe el producto o proyecto para su blindaje legal..."
                      />
                    </div>

                    <button
                      onClick={() => alert("Dictamen de viabilidad y especificaciones técnicas emitidas para el equipo.")}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                    >
                      Emitir Dictamen de Cumplimiento & Tickets
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  {dictamenIniciativa && (
                    <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="pb-2 border-b border-slate-800/40 text-xs">
                        <span className="font-bold text-blue-400">Viabilidad Jurídica: {dictamenIniciativa.viabilidad}</span>
                        <p className={`text-[11px] mt-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{dictamenIniciativa.resumen_directivo}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider">Tickets Técnicos Ejecutables:</div>
                        {dictamenIniciativa.especificaciones_tecnicas.map((t: any) => (
                          <div key={t.ticket} className={`p-3 rounded-xl border space-y-1.5 text-xs ${
                            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}>
                            <div className="flex justify-between items-center font-bold">
                              <span className="text-blue-400">[{t.ticket}] {t.titulo}</span>
                              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px]">{t.prioridad}</span>
                            </div>
                            <div className="text-[10px] text-slate-400">
                              Responsable: <strong>{t.responsable}</strong> • Criterios: {t.criterios.join(" • ")}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 5: CONTROL DE GESTIÓN Y PLAZOS                           */}
          {/* ================================================================= */}
          {activeTab === 'control_gestion' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-amber-400" /> 5. Control de Gestión y Plazos
              </h1>
              <div className={`p-6 rounded-2xl border text-xs leading-relaxed ${
                isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}>
                Seguimiento integral de expedientes activos, fiscalización de horas por asunto y alertas de prevención de desvíos (*Scope Creep*).
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 6: ACTAS Y MINUTAS EJECUTIVAS                            */}
          {/* ================================================================= */}
          {activeTab === 'actas_minutas' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Mic className="w-5 h-5 text-pink-400" /> 6. Actas y Minutas Ejecutivas
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Grabación de sala o subida de archivo para generar actas notariales con acuerdos y tareas asignables al Planificador.
                  </p>
                </div>
              </div>

              <div className={`p-6 rounded-2xl border text-center space-y-4 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="font-bold text-sm">Grabación y Transcripción On-Premise</div>
                <div className="flex justify-center gap-3">
                  <button onClick={() => alert("Iniciando grabación local de sala...")} className="px-5 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-sm">
                    <Mic className="w-4 h-4" /> Grabar Audio de Reunión
                  </button>
                  <label className={`px-4 py-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 cursor-pointer ${
                    isDark ? 'border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-200' : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}>
                    <Upload className="w-4 h-4 text-pink-400" /> Subir Archivo de Audio
                    <input type="file" accept="audio/*" className="hidden" />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* CUMPLIMIENTO: ADUANA, BÓVEDA, CANAL ÉTICO, SOCIETARIO             */}
          {/* ================================================================= */}
          {activeTab === 'aduana' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" /> Aduana & Secreto Profesional
              </h1>
              <div className={`p-6 rounded-2xl border text-xs ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                Sanitización previa de datos personales y secreto profesional en memoria local antes de cualquier procesamiento.
              </div>
            </div>
          )}

          {activeTab === 'boveda' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-400" /> Bóveda Forense SHA-256
              </h1>
              <div className={`p-6 rounded-2xl border text-xs ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                Custodia de hashes criptográficos para no repudio y trazabilidad probatoria de instrumentos suscritos.
              </div>
            </div>
          )}

          {activeTab === 'canal_etico' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-400" /> Canal Ético Corporativo (Ley 2/2023)
              </h1>
              <div className={`p-6 rounded-2xl border text-xs ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                Módulo seguro de recepción y tramitación de comunicaciones confidenciales internas.
              </div>
            </div>
          )}

          {activeTab === 'societario' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" /> Secretaría Societaria
              </h1>
              <div className={`p-6 rounded-2xl border text-xs ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                Archivo y gestión de libros de accionistas, actas de asambleas ordinarias y poderes generales y especiales.
              </div>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
