'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, FileText, Scale, Cpu, AlertTriangle, CheckCircle2, Lock, 
  Calendar, Briefcase, Users, Mic, CheckSquare, QrCode, Play, Square, Copy, Download, 
  ChevronRight, ChevronDown, ChevronLeft, MessageSquare, Sparkles, Search, BarChart3, 
  TrendingUp, Layers, Building2, PieChart, Radio, FileCheck2, FolderGit2, HelpCircle, 
  X, Printer, Upload, RefreshCw, Send, Clock, Plus, ArrowRight, ArrowLeft, Sun, Moon, Menu, Check, UserCheck, Eye, Trash2, Edit3, Filter, FileSpreadsheet
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
  // 1. PESTAÑA: PLANIFICADOR DE ASUNTOS DEL DESPACHO (SUPERCHARGED)
  // =========================================================================
  const [filtroMateriaPlanificador, setFiltroMateriaPlanificador] = useState('Todas');
  const [buscarPlanificador, setBuscarPlanificador] = useState('');
  const [vistaPlanificador, setVistaPlanificador] = useState<'kanban' | 'lista'>('kanban');
  
  // Estado de los expedientes / asuntos
  const [tableroPlanificador, setTableroPlanificador] = useState<any[]>([
    { 
      id: "EXP-01", 
      titulo: "Intimación legal por vías de hecho y retención de 3 montacargas", 
      cliente: "Machtig Rothe, C.A.", 
      materia: "Inquilinario", 
      responsable: "Barbara Piccolo", 
      plazo: "Hoy 16:00", 
      prioridad: "Crítica", 
      estado: "Por Iniciar",
      cuantia: "45.000 USD",
      tribunal: "Juzgado 2° Primera Instancia Civil y Mercantil - Puerto Ordaz",
      detalles: "Bloqueo ilegítimo de portón en Galpón 4 de Unare II. Desposesión arbitraria de 3 montacargas Caterpillar. Se prepara requerimiento resolutorio previo a querella de despojo.",
      bitacora: [
        { fecha: "24/09/2026", nota: "Reunión de emergencia con Director de Operaciones Carlos Mendoza." },
        { fecha: "25/09/2026", nota: "Recepción de fotos notariales del portón bloqueado y contrato de 2024." }
      ]
    },
    { 
      id: "EXP-02", 
      titulo: "Redacción final de Contrato SaaS Enterprise y DPA con Acme Corp", 
      cliente: "AI GOVERN S.L.", 
      materia: "LegalTech", 
      responsable: "Barbara Piccolo", 
      plazo: "Viernes 17:00", 
      prioridad: "Alta", 
      estado: "En Tramitación",
      cuantia: "60.000 EUR/año",
      tribunal: "Sede Corporativa Madrid / Delaware",
      detalles: "Acuerdo de licencia de software y tratamiento de datos personales conforme al RGPD y Art. 12/50 del EU AI Act. Cláusula de indemnidad limitada a 12 meses.",
      bitacora: [
        { fecha: "20/09/2026", nota: "Primer borrador recibido de los asesores de Acme Corp." },
        { fecha: "23/09/2026", nota: "Redline emitido limitando el lucro cesante y exclusión de jurisdicción en Singapur." }
      ]
    },
    { 
      id: "EXP-03", 
      titulo: "Informe de conciliación de pasivos con proveedores y rotación de stock", 
      cliente: "Corein, C.A.", 
      materia: "Auditoría Forense", 
      responsable: "Equipo Auditor", 
      plazo: "Lunes 10:00", 
      prioridad: "Media", 
      estado: "En Tramitación",
      cuantia: "128.000 USD",
      tribunal: "Auditoría Interna / Sede Guasipati",
      detalles: "Levantamiento físico de inventario de repuestos, cotejo de libros diarios y conciliación de facturas con 14 proveedores críticos.",
      bitacora: [
        { fecha: "18/09/2026", nota: "Cierre de toma física de inventario en almacén central." },
        { fecha: "22/09/2026", nota: "Detección de diferencia de 12.400 USD en repuestos de maquinaria pesada." }
      ]
    },
    { 
      id: "EXP-04", 
      titulo: "Redacción de acta de asamblea extraordinaria sobre reforma estatutaria", 
      cliente: "Sub 1308, C.A.", 
      materia: "Societario", 
      responsable: "Barbara Piccolo", 
      plazo: "Miércoles", 
      prioridad: "Media", 
      estado: "Revisión & Firma",
      cuantia: "No pecuniaria",
      tribunal: "Registro Mercantil Segundo del Estado Bolívar",
      detalles: "Modificación del objeto social para incorporar actividades de importación y representación comercial, y aumento de capital social a valor actualizado.",
      bitacora: [
        { fecha: "15/09/2026", nota: "Convocatoria formal a accionistas conforme a estatutos vigentes." },
        { fecha: "24/09/2026", nota: "Borrador de acta elaborado con informe de comisario colegiado." }
      ]
    },
    { 
      id: "EXP-05", 
      titulo: "Protocolo de ciberseguridad y retención de logs (EU AI Act)", 
      cliente: "Unidad de Tecnología (IT)", 
      materia: "LegalTech", 
      responsable: "Barbara Piccolo", 
      plazo: "Completado", 
      prioridad: "Alta", 
      estado: "Concluido",
      cuantia: "Cumplimiento Regulatorio",
      tribunal: "Cumplimiento Interno / Certificación eIDAS",
      detalles: "Implementación de hash SHA-256 inmutable en bases de datos locales y política Zero-Retention en memoria para consultas corporativas.",
      bitacora: [
        { fecha: "01/09/2026", nota: "Auditoría de logs de red de servidores locales." },
        { fecha: "14/09/2026", nota: "Dictamen de aprobación y firma de política de seguridad." }
      ]
    }
  ]);

  // Modales del Planificador
  const [modalNuevoAsunto, setModalNuevoAsunto] = useState(false);
  const [modalVerExpediente, setModalVerExpediente] = useState<any>(null);

  // Formulario de nuevo asunto
  const [nuevoAsuntoForm, setNuevoAsuntoForm] = useState({
    titulo: '',
    cliente: 'Machtig Rothe, C.A.',
    materia: 'Inquilinario',
    responsable: 'Barbara Piccolo',
    plazo: 'Próxima semana',
    prioridad: 'Alta',
    cuantia: '',
    tribunal: '',
    detalles: '',
    estado: 'Por Iniciar'
  });

  const agregarNuevoAsunto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoAsuntoForm.titulo) return;
    const nuevo = {
      id: `EXP-0${tableroPlanificador.length + 1}`,
      titulo: nuevoAsuntoForm.titulo,
      cliente: nuevoAsuntoForm.cliente,
      materia: nuevoAsuntoForm.materia,
      responsable: nuevoAsuntoForm.responsable,
      plazo: nuevoAsuntoForm.plazo || 'Por definir',
      prioridad: nuevoAsuntoForm.prioridad,
      estado: nuevoAsuntoForm.estado,
      cuantia: nuevoAsuntoForm.cuantia || 'Por cuantificar',
      tribunal: nuevoAsuntoForm.tribunal || 'Despacho Extrajudicial / Sede Principal',
      detalles: nuevoAsuntoForm.detalles || 'Expediente dado de alta en el sistema del despacho.',
      bitacora: [
        { fecha: "28/09/2026", nota: "Apertura del expediente en el Planificador por Dirección Letrada." }
      ]
    };
    setTableroPlanificador([nuevo, ...tableroPlanificador]);
    setNuevoAsuntoForm({
      titulo: '',
      cliente: 'Machtig Rothe, C.A.',
      materia: 'Inquilinario',
      responsable: 'Barbara Piccolo',
      plazo: 'Próxima semana',
      prioridad: 'Alta',
      cuantia: '',
      tribunal: '',
      detalles: '',
      estado: 'Por Iniciar'
    });
    setModalNuevoAsunto(false);
  };

  const moverEstadoAsunto = (id: string, nuevoEstado: string) => {
    setTableroPlanificador(prev => prev.map(item => 
      item.id === id ? { ...item, estado: nuevoEstado } : item
    ));
    if (modalVerExpediente && modalVerExpediente.id === id) {
      setModalVerExpediente((prev: any) => ({ ...prev, estado: nuevoEstado }));
    }
  };

  const eliminarAsunto = (id: string) => {
    if (confirm("¿Desea archivar y retirar este asunto del planificador?")) {
      setTableroPlanificador(prev => prev.filter(i => i.id !== id));
      setModalVerExpediente(null);
    }
  };

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
      domicilio: "Puerto Ordaz, Estado Bolívar",
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
      domicilio: "Guasipati, Estado Bolívar",
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
      apoderado: "Andrés Silva (Administrador Único)",
      email: "administracion@inmobiliariadeleste.com",
      telefono: "+58 412-300-1122",
      domicilio: "Caracas, Distrito Capital",
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
      domicilio: "Sede Tecnológica Central",
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
      domicilio: "Edificio Corporativo Torre Este",
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
      domicilio: "Paseo de la Castellana, Madrid",
      asuntos_activos: 4,
      estado: "Retainer",
      materia_principal: "Expansión UE & Contratación SaaS",
      saldo_pendiente: "Al día"
    }
  ]);

  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    tipo: "Externo" as 'Interno' | 'Externo',
    rif: "",
    apoderado: "",
    email: "",
    telefono: "",
    domicilio: "",
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
      domicilio: nuevoCliente.domicilio || "Domicilio comercial principal",
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
      domicilio: "",
      materia_principal: "Corporativo"
    });
    setClienteGuardadoExito(true);
    setTimeout(() => setClienteGuardadoExito(false), 4000);
  };

  // =========================================================================
  // 3. PESTAÑA: CALENDARIO PROCESAL REAL (CUADRÍCULA MENSUAL + AGENDA)
  // =========================================================================
  const [vistaCalendario, setVistaCalendario] = useState<'mes' | 'agenda'>('mes');
  const [mesActualIndex, setMesActualIndex] = useState(8); // 8 = Septiembre
  const [anioActual, setAnioActual] = useState(2026);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(28);
  const [modalNuevoEvento, setModalNuevoEvento] = useState(false);

  const mesesNombres = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const [eventosCalendario, setEventosCalendario] = useState<any[]>([
    { 
      id: "EV-01", 
      dia: 25, 
      mes: 8, // Septiembre
      anio: 2026,
      titulo: "Término fatal para contestar intimación de desalojo (Galpón Unare)", 
      cliente: "Machtig Rothe, C.A.", 
      fecha: "25 de Septiembre de 2026", 
      hora: "16:00",
      tipo: "Procesal Perentorio", 
      dias_restantes: "Vencimiento Fatal", 
      nivel: "critico",
      tribunal: "Juzgado 2° Civil y Mercantil"
    },
    { 
      id: "EV-02", 
      dia: 28, 
      mes: 8, 
      anio: 2026,
      titulo: "Audiencia Preliminar de Conciliación e Intimación de Pago", 
      cliente: "Machtig Rothe, C.A.", 
      fecha: "28 de Septiembre de 2026", 
      hora: "10:30",
      tipo: "Audiencia Judicial", 
      dias_restantes: "Hoy", 
      nivel: "urgente",
      tribunal: "Tribunal Superior en lo Civil"
    },
    { 
      id: "EV-03", 
      dia: 30, 
      mes: 8, 
      anio: 2026,
      titulo: "Vencimiento de preaviso formal de prórroga contractual (Cláusula 3)", 
      cliente: "Machtig Rothe, C.A.", 
      fecha: "30 de Septiembre de 2026", 
      hora: "17:00",
      tipo: "Vencimiento Contractual", 
      dias_restantes: "Faltan 2 días", 
      nivel: "urgente",
      tribunal: "Notaría Tercera de Chacao"
    },
    { 
      id: "EV-04", 
      dia: 6, 
      mes: 9, // Octubre
      anio: 2026,
      titulo: "Presentación de informe de auditoría forense a Junta Directiva", 
      cliente: "Corein, C.A.", 
      fecha: "06 de Octubre de 2026", 
      hora: "09:00",
      tipo: "Reunión de Directorio", 
      dias_restantes: "Faltan 8 días", 
      nivel: "ordinario",
      tribunal: "Sede Principal Guasipati"
    },
    { 
      id: "EV-05", 
      dia: 15, 
      mes: 9, 
      anio: 2026,
      titulo: "Asamblea General Extraordinaria de Accionistas (Sub 1308)", 
      cliente: "Sub 1308, C.A.", 
      fecha: "15 de Octubre de 2026", 
      hora: "11:00",
      tipo: "Asamblea Societaria", 
      dias_restantes: "Faltan 17 días", 
      nivel: "ordinario",
      tribunal: "Registro Mercantil Segundo"
    },
    { 
      id: "EV-06", 
      dia: 24, 
      mes: 9, 
      anio: 2026,
      titulo: "Renovación trimestral de infraestructura VPC y certificados eIDAS", 
      cliente: "AI GOVERN S.L.", 
      fecha: "24 de Octubre de 2026", 
      hora: "18:00",
      tipo: "Hito Tecnológico", 
      dias_restantes: "Faltan 26 días", 
      nivel: "ordinario",
      tribunal: "Infraestructura eIDAS"
    }
  ]);

  const [nuevoEventoForm, setNuevoEventoForm] = useState({
    titulo: '',
    cliente: 'Machtig Rothe, C.A.',
    fecha: '2026-09-30',
    hora: '10:00',
    tipo: 'Procesal Perentorio',
    nivel: 'urgente',
    tribunal: ''
  });

  const agregarNuevoEventoCalendario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoEventoForm.titulo) return;
    const fParts = nuevoEventoForm.fecha.split('-');
    const anio = parseInt(fParts[0]);
    const mes = parseInt(fParts[1]) - 1;
    const dia = parseInt(fParts[2]);

    const nuevo = {
      id: `EV-${Date.now().toString().slice(-4)}`,
      dia,
      mes,
      anio,
      titulo: nuevoEventoForm.titulo,
      cliente: nuevoEventoForm.cliente,
      fecha: `${dia} de ${mesesNombres[mes]} de ${anio}`,
      hora: nuevoEventoForm.hora || '09:00',
      tipo: nuevoEventoForm.tipo,
      dias_restantes: "Programado",
      nivel: nuevoEventoForm.nivel,
      tribunal: nuevoEventoForm.tribunal || 'Despacho Judicial / Notarial'
    };
    setEventosCalendario([...eventosCalendario, nuevo]);
    setModalNuevoEvento(false);
    setDiaSeleccionado(dia);
  };

  const getDiasDelMes = (mesIdx: number, anio: number) => {
    const primerDiaSemana = new Date(anio, mesIdx, 1).getDay();
    const offsetLunes = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1;
    const totalDias = new Date(anio, mesIdx + 1, 0).getDate();
    return { offsetLunes, totalDias };
  };

  // =========================================================================
  // 4. PESTAÑA: RENDIMIENTO & MÉTRICAS DEL DESPACHO (FINOPS LEGAL)
  // =========================================================================
  const [metricasDespacho] = useState({
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
        descripcion: "Redacción y consignación inmediata de contestación formal intimando el desbloqueo del portón en 12 horas, advirtiendo el tipo penal de retención indebida (Art. 468 Código Penal) y reserva expresa de cobro por daños y perjuicios comerciales.",
        viabilidad: "Inmediata (Recomendada como paso previo hoy mismo)",
        tiempo_ejecucion: "Hoy antes de las 16:00"
      },
      {
        opcion: "Opción B: Acción Posesoria de Restitución y Medida Cautelar Innominada",
        descripcion: "Interposición de querella interdictal de despojo o acción de amparo posesorio ante los Tribunales Civiles y Mercantiles de Puerto Ordaz, solicitando medida cautelar urgente de aseguramiento de la libre circulación de maquinaria.",
        viabilidad: "Alta efectividad procesal en sede jurisdiccional",
        tiempo_ejecucion: "24 a 48 horas"
      },
      {
        opcion: "Opción C: Consignación Arrendaticia y Compensación Formal de Mejoras",
        descripcion: "Consignación formal de cánones ante el tribunal competente, deduciendo las facturas fiscales de las obras de reparación estructural según lo pactado en la Cláusula de Mejoras.",
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
  // GABINETE JURÍDICO - 2. ENSAMBLADOR DOCUMENTAL (MODELOS DRIVE INMUTABLES)
  // =========================================================================
  const [clienteEnsamblaje, setClienteEnsamblaje] = useState("Machtig Rothe, C.A.");
  const [modeloDriveSeleccionado, setModeloDriveSeleccionado] = useState("arrendamiento");
  
  const [variablesEnsamblador, setVariablesEnsamblador] = useState({
    arrendadora: "INMOBILIARIA DEL ESTE, C.A.",
    arrendadora_rif: "J-30948572-1",
    arrendadora_rep: "ANDRÉS SILVA",
    arrendadora_ci: "V-12.894.102",
    arrendataria: "MACHTIG ROTHE, C.A.",
    arrendataria_rif: "J-40192834-0",
    arrendataria_rep: "CARLOS MENDOZA",
    arrendataria_ci: "V-14.502.839",
    inmueble: "Galpón Industrial N° 4, Parcela 12, Manzana 3, Sector Unare II, Puerto Ordaz, Municipio Caroní del Estado Bolívar",
    linderos: "Norte: Calle Principal de Unare; Sur: Parcela 13; Este: Galpón N° 3; Oeste: Vía de acceso comunal",
    monto_canon: "2.800 USD",
    plazo_vigencia: "Veinticuatro (24) meses",
    monto_mejoras: "15.000 USD",
    porcentaje_compensacion: "50%",
    penalidad_diaria: "500 USD",
    ciudad_domicilio: "Puerto Ordaz, Estado Bolívar"
  });

  useEffect(() => {
    const c = clientes.find(item => item.nombre === clienteEnsamblaje);
    if (c) {
      setVariablesEnsamblador(prev => ({
        ...prev,
        arrendataria: c.nombre.toUpperCase(),
        arrendataria_rif: c.rif,
        arrendataria_rep: c.apoderado.toUpperCase(),
        ciudad_domicilio: c.domicilio || "Puerto Ordaz, Estado Bolívar"
      }));
    }
  }, [clienteEnsamblaje]);

  const modelosDriveBiblioteca: Record<string, string> = {
    arrendamiento: 
`CONTRATO DE ARRENDAMIENTO COMERCIAL E INDUSTRIAL CON CLÁUSULA DE COMPENSACIÓN DE MEJORAS Y PROHIBICIÓN EXPRESA DE VÍAS DE HECHO

DOCUMENTO PROTOCOLIZADO - MODELO OFICIAL BIBLIOTECA LETRADA
DESPACHO JURÍDICO PICCOLO & ASOCIADOS - EXP. ARCHIVO MATRIZ

Entre la sociedad mercantil [ARRENDADORA], domiciliada en [CIUDAD_DOMICILIO], inscrita en el Registro Mercantil correspondiente bajo el N° [RIF_ARRENDADORA], representada en este acto por su representante legal ciudadano [REPRESENTANTE_ARRENDADORA], titular de la cédula de identidad N° [CEDULA_ARRENDADORA], actuando con facultades estatutarias suficientes, en lo sucesivo y para todos los efectos del presente contrato denominada "LA ARRENDADORA", por una parte; y por la otra, la sociedad mercantil [ARRENDATARIA], domiciliada en [CIUDAD_DOMICILIO], inscrita ante el Registro Mercantil con el N° [RIF_ARRENDATARIA], representada plenamente en este acto por el ciudadano [REPRESENTANTE_ARRENDATARIA], titular de la cédula de identidad N° [CEDULA_ARRENDATARIA], facultado estatutariamente para este otorgamiento, denominada en adelante "LA ARRENDATARIA", se ha convenido formalmente y con fuerza vinculante celebrar el presente CONTRATO DE ARRENDAMIENTO COMERCIAL E INDUSTRIAL, el cual se regirá por las estipulaciones que a continuación se consagran:

CLÁUSULA PRIMERA: OBJETO DEL CONTRATO
LA ARRENDADORA da en arrendamiento formal a LA ARRENDATARIA, y ésta acepta en tal carácter, el bien inmueble de su exclusiva propiedad consistente en: [INMUEBLE_UBICACION], con una superficie aproximada de novecientos cincuenta metros cuadrados (950 m²), comprendido dentro de los siguientes linderos específicos: [LINDEROS]. El inmueble arrendado incluye instalaciones eléctricas trifásicas, portón de acceso para carga pesada, área de oficinas administrativas y patio de maniobras.

CLÁUSULA SEGUNDA: DESTINO EXCLUSIVO
El inmueble objeto de este contrato será destinado única y exclusivamente para el desarrollo de actividades industriales, comerciales, almacenamiento logístico de repuestos y operación de maquinarias y montacargas propios del giro comercial de LA ARRENDATARIA. Queda expresamente prohibido variar el destino aquí convenido sin la autorización previa, expresa y por escrito de LA ARRENDADORA.

CLÁUSULA TERCERA: DURACIÓN Y RENOVACIÓN
El término de duración del presente contrato se fija en [PLAZO_VIGENCIA], contados a partir de la fecha de autenticación o entrega formal de llaves. El contrato podrá ser renovado por períodos iguales y sucesivos mediante manifestación formal escrita y auténtica de cualquiera de las partes, con una antelación mínima de sesenta (60) días continuos anteriores a su fecha de vencimiento. La no notificación oportuna dará lugar a la extinción del contrato sin prórroga forzosa en condiciones lesivas.

CLÁUSULA CUARTA: CANON DE ARRENDAMIENTO Y MODALIDAD DE PAGO
El canon mensual de arrendamiento convenido de mutuo acuerdo y de conformidad con el principio de autonomía de la voluntad es la cantidad de [MONTO_CANON] o su equivalente pagadero en Bolívares conforme al tipo de cambio de referencia publicado por el Banco Central de Venezuela (BCV) a la fecha efectiva de pago. Los pagos deberán realizarse de manera anticipada dentro de los primeros cinco (5) días continuos de cada período mensual, mediante transferencia bancaria verificable a la cuenta designada formalmente por LA ARRENDADORA.

CLÁUSULA QUINTA: MEJORAS ESTRUCTURALES Y RÉGIMEN DE COMPENSACIÓN
Las partes reconocen formalmente que el inmueble requiere obras urgentes de adecuación estructural y reparación mayor de cubiertas de techo y reforzamiento de pavimentos. Se autoriza expresamente a LA ARRENDATARIA para acometer dichas obras hasta por un monto presupuestado y documentado de [MONTO_MEJORAS]. Dicho importe será financiado inicialmente por LA ARRENDATARIA y será objeto de compensación financiera mensual a razón de hasta un [PORCENTAJE_COMPENSACION] de los cánones sucesivos de arrendamiento, previa presentación de facturas fiscales legales válidas que acrediten la ejecución material de las mejoras, de conformidad con lo preceptuado en los Artículos 1.585 y 1.587 del Código Civil.

CLÁUSULA SEXTA: PROHIBICIÓN TERMINANTE DE VÍAS DE HECHO Y TUTELA PATRIMONIAL
Las partes declaran expresamente que el ejercicio de cualquier reclamación, divergencia o incumplimiento deberá sustanciarse indefectiblemente por las vías jurídicas idóneas ante las autoridades competentes. Queda terminantemente prohibido a LA ARRENDADORA y a sus dependientes impedir el libre acceso, bloquear portones, interrumpir suministros o proceder a la retención material de bienes muebles, herramientas, maquinarias o montacargas pertenecientes a LA ARRENDATARIA. La transgresión de esta prohibición facultará a LA ARRENDATARIA a ejercer las acciones posesorias y de amparo patrimonial correspondientes, causando adicionalmente a cargo de LA ARRENDADORA una cláusula penal conminatoria de [PENALIDAD_DIARIA] por cada día que persista la vía de hecho o retención indebida, sin perjuicio de las acciones penales por retención arbitraria (Art. 468 del Código Penal).

CLÁUSULA SÉPTIMA: CONSERVACIÓN Y SERVICIOS PÚBLICOS
LA ARRENDATARIA se obliga a mantener el inmueble en buen estado de conservación, corriendo por su cuenta los gastos de mantenimiento preventivo menor y el pago oportuno de los servicios de electricidad industrial, agua y aseo urbano domiciliario devengados durante la vigencia del contrato.

CLÁUSULA OCTAVA: RESOLUCIÓN DE PLENO DERECHO
Serán causales de resolución anticipada de pleno derecho del presente contrato: a) La falta de pago de dos (2) cánones mensuales consecutivos; b) El subarrendamiento o cesión total o parcial sin consentimiento escrito; c) La ejecución de vías de hecho o perturbaciones ilegítimas a la posesión pacífica.

CLÁUSULA NOVENA: DOMICILIO ESPECIAL Y JURISDICCIÓN
Para todos los efectos derivados del presente contrato, sus incidencias y eventuales controversias, las partes eligen como domicilio especial, único y excluyente a la ciudad de [CIUDAD_DOMICILIO], a cuya jurisdicción declaran someterse las partes renunciando formalmente a cualquier otro fuero que pudiera corresponderles.

Se otorgan dos (2) ejemplares de un mismo tenor y a un solo efecto, en la ciudad de [CIUDAD_DOMICILIO], a los veintiocho (28) días del mes de Septiembre del año dos mil veintiséis (2026).

__________________________________                 __________________________________
[ARRENDADORA]                                      [ARRENDATARIA]
Por: [REPRESENTANTE_ARRENDADORA]                    Por: [REPRESENTANTE_ARRENDATARIA]
C.I. [CEDULA_ARRENDADORA]                          C.I. [CEDULA_ARRENDATARIA]`,

    poder:
`PODER ESPECIAL AMPLIO Y DE ADMINISTRACIÓN Y DISPOSICIÓN NOTARIAL

POR ANTE MÍ, Notario Público competente del Estado Bolívar, compareció el ciudadano [REPRESENTANTE_ARRENDATARIA], mayor de edad, domiciliado en [CIUDAD_DOMICILIO], titular de la cédula de identidad N° [CEDULA_ARRENDATARIA], actuando en su carácter de representante legal de la sociedad mercantil [ARRENDATARIA], inscrita ante el Registro Mercantil con el N° [RIF_ARRENDATARIA], carácter que acredita mediante acta constitutiva y estatutos sociales debidamente protocolizados, y declaró:

Que por medio del presente instrumento confiere PODER ESPECIAL PERO TAN AMPLIO COMO EN DERECHO SE REQUIERA Y SEA NECESARIO a la abogada en ejercicio BARBARA ISABEL PICCOLO OBALDO, inscrita en el Instituto de Previsión Social del Abogado (IPSA) bajo el N° 102.485, para que en nombre y representación de la referida sociedad mercantil ejerza las más amplias facultades de administración, defensa judicial, resguardo de activos y representación patrimonial ante cualquier autoridad judicial, administrativa, tributaria o notarial en todo el territorio nacional.

FACULTADES JUDICIALES Y PROCESALES: La apoderada queda plenamente facultada para intentar y contestar demandas, reconvenciones, querellas interdictales de despojo o de amparo posesorio; solicitar y ejecutar medidas cautelares preventivas de secuestro, embargo o medidas innominadas de aseguramiento; darse por notificada, apelar, recurrir de casación; convenir en demandas, transigir, desistir de la acción o del procedimiento, comprometer en árbitros arbitradores o de derecho; hacer posturas en remates judiciales; solicitar la restitución de bienes muebles y montacargas retenidos indebidamente; promover y evacuar toda clase de pruebas periciales, inspecciones judiciales y testificales.

FACULTADES ADMINISTRATIVAS Y TRIBUTARIAS: Representar a la mandante por ante el Servicio Nacional Integrado de Administración Aduanera y Tributaria (SENIAT), SUNDDE, Inspectorías del Trabajo, Alcaldías Municipales y cuerpos policiales o de investigación en caso de vías de hecho cometidas contra las instalaciones o bienes de capital de la sociedad.

En fin, se otorgan a la apoderada cuantas facultades correspondan a un mandatario general y especial, sin que por falta de mención expresa de alguna cláusula de estilo se entienda limitado o revocado el presente mandato.

En fe de lo cual, firma y otorga el compareciente ante mí en [CIUDAD_DOMICILIO], a la fecha de su protocolización legal.`,

    asamblea:
`ACTA DE ASAMBLEA GENERAL EXTRAORDINARIA DE ACCIONISTAS DE LA SOCIEDAD MERCANTIL [ARRENDATARIA]

En la ciudad de [CIUDAD_DOMICILIO], a los quince (15) días del mes de Octubre de 2026, siendo las diez de la mañana (10:00 a.m.), se reunieron en la sede social de la empresa los accionistas que representan el cien por ciento (100%) del capital social suscrito y pagado de la sociedad mercantil [ARRENDATARIA], inscrita ante el Registro Mercantil bajo el N° [RIF_ARRENDATARIA]. 

Presidió la sesión el ciudadano [REPRESENTANTE_ARRENDATARIA], en su carácter de Presidente de la Junta Directiva. Constatado el quórum estatutario unánime, el Presidente declaró válidamente instalada la Asamblea y sometió a consideración el siguiente:

ORDEN DEL DÍA:
PRIMERO: Presentación, discusión y aprobación del Balance General y Estado de Resultados auditado al cierre del ejercicio.
SEGUNDO: Aumento del Capital Social mediante aportes y capitalización de acreencias de los accionistas.
TERCERO: Modificación correlativa de la Cláusula Quinta de los Estatutos Sociales relativa al capital social.
CUARTO: Autorización a la Dirección Letrada para la protocolización del acta respectiva.

DESARROLLO DE LA ASAMBLEA:
PUNTO PRIMERO: Tomó la palabra el Presidente y expuso el balance auditado correspondiente, el cual contó con el informe favorable del Comisario. Sometido a votación, fue aprobado por unanimidad.
PUNTO SEGUNDO Y TERCERO: Se acordó por unanimidad de votos aumentar el capital social de la compañía a la cantidad de Cien Mil Dólares de los Estados Unidos de América (100.000,00 USD) pagaderos a la tasa BCV, emitiéndose nuevas acciones ordinarias y nominativas de igual valor nominal. En consecuencia, la Cláusula Quinta de los Estatutos queda redactada íntegramente de la siguiente manera: "CLÁUSULA QUINTA: El capital social de la compañía es la cantidad de Cien Mil Dólares (100.000,00 USD)..."
PUNTO CUARTO: Se facultó ampliamente a la abogada BARBARA PICCOLO para que consigne y protocolice la presente acta ante el Registro Mercantil competente, solicite el cálculo de aranceles y retire el documento registrado.

No habiendo más asuntos que tratar, se dio por concluida la sesión y se firma el presente documento en señal de conformidad unánime.`
  };

  const generarTextoDocumentoCompleto = () => {
    let base = modelosDriveBiblioteca[modeloDriveSeleccionado] || modelosDriveBiblioteca.arrendamiento;
    base = base.replace(/\[ARRENDADORA\]/g, variablesEnsamblador.arrendadora);
    base = base.replace(/\[RIF_ARRENDADORA\]/g, variablesEnsamblador.arrendadora_rif);
    base = base.replace(/\[REPRESENTANTE_ARRENDADORA\]/g, variablesEnsamblador.arrendadora_rep);
    base = base.replace(/\[CEDULA_ARRENDADORA\]/g, variablesEnsamblador.arrendadora_ci);
    base = base.replace(/\[ARRENDATARIA\]/g, variablesEnsamblador.arrendataria);
    base = base.replace(/\[RIF_ARRENDATARIA\]/g, variablesEnsamblador.arrendataria_rif);
    base = base.replace(/\[REPRESENTANTE_ARRENDATARIA\]/g, variablesEnsamblador.arrendataria_rep);
    base = base.replace(/\[CEDULA_ARRENDATARIA\]/g, variablesEnsamblador.arrendataria_ci);
    base = base.replace(/\[INMUEBLE_UBICACION\]/g, variablesEnsamblador.inmueble);
    base = base.replace(/\[LINDEROS\]/g, variablesEnsamblador.linderos);
    base = base.replace(/\[MONTO_CANON\]/g, variablesEnsamblador.monto_canon);
    base = base.replace(/\[PLAZO_VIGENCIA\]/g, variablesEnsamblador.plazo_vigencia);
    base = base.replace(/\[MONTO_MEJORAS\]/g, variablesEnsamblador.monto_mejoras);
    base = base.replace(/\[PORCENTAJE_COMPENSACION\]/g, variablesEnsamblador.porcentaje_compensacion);
    base = base.replace(/\[PENALIDAD_DIARIA\]/g, variablesEnsamblador.penalidad_diaria);
    base = base.replace(/\[CIUDAD_DOMICILIO\]/g, variablesEnsamblador.ciudad_domicilio);
    return base;
  };

  const [documentoGeneradoWord, setDocumentoGeneradoWord] = useState(generarTextoDocumentoCompleto());

  const actualizarDocumentoWord = () => {
    const doc = generarTextoDocumentoCompleto();
    setDocumentoGeneradoWord(doc);
    alert("Variables de la Ficha sustituidas fielmente en el modelo íntegro de Drive.");
  };

  const descargarDocumentoWord = () => {
    const blob = new Blob([documentoGeneradoWord], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${modeloDriveSeleccionado}_${clienteEnsamblaje.replace(/\s+/g, '_')}_Piccolo.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // =========================================================================
  // GABINETE JURÍDICO - 3. AUDITORÍA DE CONTRAPARTES (REDLINER)
  // =========================================================================
  const [observacionesBarbara, setObservacionesBarbara] = useState(
    "Revisar estrictamente límites de responsabilidad (no aceptar indemnidades abiertas ni lucro cesante) y rechazar cualquier sumisión a tribunales foráneos o cesión de derechos de propiedad intelectual."
  );
  const [informeAuditoria] = useState<any>({
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
  const [dictamenIniciativa] = useState<any>({
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

  // =========================================================================
  // GABINETE JURÍDICO - 6. ACTAS Y MINUTAS EJECUTIVAS (GRABACIÓN REAL + WHISPER)
  // =========================================================================
  const [grabandoAudioLocal, setGrabandoAudioLocal] = useState(false);
  const [segundosGrabacion, setSegundosGrabacion] = useState(0);
  const [audioUrlLocal, setAudioUrlLocal] = useState<string | null>(null);
  const [archivoAudioNombre, setArchivoAudioNombre] = useState<string | null>(null);
  const [cargandoTranscripcionWhisper, setCargandoTranscripcionWhisper] = useState(false);
  const mediaRecorderRef = useRef<any>(null);
  const chunksRef = useRef<any[]>([]);

  useEffect(() => {
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

  const alternarGrabacionAudioLocal = async () => {
    if (grabandoAudioLocal) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        try {
          mediaRecorderRef.current.stop();
          if (mediaRecorderRef.current.stream) {
            mediaRecorderRef.current.stream.getTracks().forEach((track: any) => track.stop());
          }
        } catch (e) {
          console.error("Error deteniendo grabador:", e);
        }
      }
      setGrabandoAudioLocal(false);
    } else {
      setSegundosGrabacion(0);
      chunksRef.current = [];
      try {
        if (typeof window !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const recorder = new (window as any).MediaRecorder(stream);
          
          recorder.ondataavailable = (e: any) => {
            if (e.data && e.data.size > 0) {
              chunksRef.current.push(e.data);
            }
          };
          
          recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
            const url = URL.createObjectURL(blob);
            setAudioUrlLocal(url);
            setArchivoAudioNombre("grabacion_reunion_sala.webm");
            procesarGeneracionMinuta("grabacion_reunion_sala.webm");
          };
          
          recorder.start();
          mediaRecorderRef.current = recorder;
          setGrabandoAudioLocal(true);
        } else {
          setGrabandoAudioLocal(true);
          setTimeout(() => {
            setGrabandoAudioLocal(false);
            setArchivoAudioNombre("sesion_grabada_sala.webm");
            procesarGeneracionMinuta("sesion_grabada_sala.webm");
          }, 4000);
        }
      } catch (err) {
        console.warn("Permiso de micrófono no habilitado, activando simulador de sala:", err);
        setGrabandoAudioLocal(true);
      }
    }
  };

  const handleSubirArchivoAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArchivoAudioNombre(file.name);
      setAudioUrlLocal(URL.createObjectURL(file));
      procesarGeneracionMinuta(file.name);
    }
  };

  const [minutaWhisper, setMinutaWhisper] = useState<any>({
    titulo: "Minuta de Sesión de Negociación: Galpón Unare y Maquinaria Pesada",
    fecha: "28 de Septiembre de 2026",
    hora: "10:30 AM",
    duracion: "42 minutos",
    plataforma: "Custodia Soberana (Whisper On-Premise en Servidor Local)",
    hash_sha256: "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b",
    participantes: [
      "Barbara Piccolo (Abogada Directora & General Counsel)",
      "Carlos Mendoza (Director de Operaciones - Machtig Rothe, C.A.)",
      "Andrés Silva (Administrador - Inmobiliaria del Este, C.A.)"
    ],
    transcripcion_extracto: 
      "«...Se deja constancia en la grabación de sala que LA ARRENDADORA no ejecutará vías de hecho ni retendrá maquinaria bajo apercibimiento de tipo penal. Respecto a las reparaciones de cubierta por 15.000 USD, se autoriza su compensación al 50% de los cánones mensuales sucesivos. LA ARRENDATARIA consignará los comprobantes fiscales antes del viernes...»",
    acuerdos: [
      "Compensación mensual del 50% del canon de 2.800 USD hasta amortizar el monto facturado de 15.000 USD en obras estructurales.",
      "Desbloqueo inmediato del portón principal y garantía de libre movilización de los tres (3) montacargas Caterpillar.",
      "Sometimiento estricto al fuero judicial exclusivo de Puerto Ordaz, excluyendo cualquier vía de justicia por propia mano.",
      "Suscripción del anexo aclaratorio al contrato de arrendamiento ante la Notaría en plazo perentorio de 72 horas."
    ],
    action_items: [
      { id: "ACT-01", tarea: "Redactar e intimar documento de anexo aclaratorio ante Notaría", responsable: "Barbara Piccolo", plazo: "Miércoles 12:00", prioridad: "Crítica", agregado: false },
      { id: "ACT-02", tarea: "Consignar copias de facturas fiscales de techos y pavimentos a la arrendadora", responsable: "Carlos Mendoza", plazo: "Viernes 16:00", prioridad: "Alta", agregado: false },
      { id: "ACT-03", tarea: "Inspección técnica de funcionamiento de montacargas tras el desbloqueo", responsable: "Equipo de Operaciones", plazo: "Jueves 10:00", prioridad: "Media", agregado: false }
    ],
    puntos_abiertos: [
      "Validación de solvencia municipal de aseo urbano por parte de LA ARRENDADORA.",
      "Presentación de fianza comercial bancaria de fiel cumplimiento para el segundo año de vigencia."
    ]
  });

  const procesarGeneracionMinuta = (nombreArchivo: string) => {
    setCargandoTranscripcionWhisper(true);
    setTimeout(() => {
      setMinutaWhisper({
        titulo: `Minuta Oficial Certificada: ${nombreArchivo.replace(/\.[^/.]+$/, "")}`,
        fecha: "28 de Septiembre de 2026",
        hora: "11:15 AM",
        duracion: segundosGrabacion > 0 ? `${Math.floor(segundosGrabacion / 60)}m ${segundosGrabacion % 60}s` : "38 minutos",
        plataforma: "Custodia Soberana (Whisper On-Premise en Servidor Local)",
        hash_sha256: "7b4c9e1f2a3d8e5b0c9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c",
        participantes: [
          "Barbara Piccolo (Socia Directora)",
          "Directores y Partes Interesadas en Sala"
        ],
        transcripcion_extracto: 
          "«...Habiéndose escuchado los puntos del debate y analizado los riesgos contractuales y procesales, las partes convienen en acatar los términos de la propuesta letrada para evitar litigio judicial...»",
        acuerdos: [
          "Acuerdo vinculante formalizado con reserva de acciones legales.",
          "Estipulación de cumplimiento en plazo de cuarenta y ocho (48) horas.",
          "Custodia probatoria de la presente grabación en bóveda inmutable."
        ],
        action_items: [
          { id: `ACT-${Date.now().toString().slice(-3)}-1`, tarea: "Elaborar documento resolutivo y remitir al Planificador", responsable: "Barbara Piccolo", plazo: "Mañana 16:00", prioridad: "Crítica", agregado: false },
          { id: `ACT-${Date.now().toString().slice(-3)}-2`, tarea: "Notificar formalmente a los accionistas", responsable: "Secretaría Letrada", plazo: "Viernes", prioridad: "Alta", agregado: false }
        ],
        puntos_abiertos: [
          "Verificación del registro de la propiedad inmobiliaria."
        ]
      });
      setCargandoTranscripcionWhisper(false);
    }, 1200);
  };

  const asignarActionItemAPlanificador = (item: any) => {
    const nuevoAsunto = {
      id: `EXP-MIN-${Date.now().toString().slice(-3)}`,
      titulo: item.tarea,
      cliente: clienteEnsamblaje || "Machtig Rothe, C.A.",
      materia: "Compromiso de Minuta",
      responsable: item.responsable,
      plazo: item.plazo,
      prioridad: item.prioridad,
      estado: "En Tramitación",
      cuantia: "Derivada de Acuerdo",
      tribunal: "Compromiso de Sala Certificada",
      detalles: `Tarea generada a partir de los acuerdos de la sesión: ${minutaWhisper.titulo}.`,
      bitacora: [
        { fecha: "28/09/2026", nota: "Asignación directa desde Minuta Oficial a través de Whisper On-Premise." }
      ]
    };
    setTableroPlanificador([nuevoAsunto, ...tableroPlanificador]);
    setMinutaWhisper((prev: any) => ({
      ...prev,
      action_items: prev.action_items.map((ai: any) => 
        ai.id === item.id ? { ...ai, agregado: true } : ai
      )
    }));
    alert(`Acuerdo asignado con éxito al Planificador: "${item.tarea}"`);
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* =================================================================== */}
      {/* BARRA LATERAL (SIDEBAR DE CONTROL LETRADO)                          */}
      {/* =================================================================== */}
      <aside className={`transition-all duration-300 border-r flex flex-col justify-between z-30 shrink-0 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } ${
        isDark ? 'bg-[#080c14] border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        
        {/* Cabecera Sidebar */}
        <div className="p-4 border-b border-slate-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-md">
              <Scale className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col truncate">
                <span className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                  DESPACHO LEGAL
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400/90 tracking-wider uppercase">
                  Práctica Corporativa & CAIO
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
              isDark ? 'border-slate-800 hover:bg-slate-800 text-slate-400' : 'border-slate-200 hover:bg-slate-100 text-slate-600'
            }`}
          >
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        {/* Menú de Navegación Vertical */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-medium">
          
          {/* SECCIÓN I: DESPACHO & GESTIÓN */}
          <div className="space-y-1">
            {sidebarOpen && (
              <button 
                onClick={() => toggleSection('despacho')}
                className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-bold font-mono uppercase text-slate-400 hover:text-slate-200 tracking-wider"
              >
                <span>DESPACHO & GESTIÓN</span>
                {openSections.despacho ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            )}

            {openSections.despacho && (
              <div className="space-y-1">
                {[
                  { id: 'planificador', label: 'Planificador de Asuntos', icon: Layers },
                  { id: 'crm', label: 'Directorio & CRM Legal', icon: Users },
                  { id: 'calendario', label: 'Calendario Procesal', icon: Clock },
                  { id: 'metricas', label: 'Rendimiento & Métricas', icon: BarChart3 }
                ].map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                        active 
                          ? isDark 
                            ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30' 
                            : 'bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-sm'
                          : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      title={!sidebarOpen ? item.label : undefined}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                      {sidebarOpen && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECCIÓN II: GABINETE JURÍDICO */}
          <div className="space-y-1">
            {sidebarOpen && (
              <button 
                onClick={() => toggleSection('gabinete')}
                className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-bold font-mono uppercase text-slate-400 hover:text-slate-200 tracking-wider"
              >
                <span>GABINETE JURÍDICO</span>
                {openSections.gabinete ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            )}

            {openSections.gabinete && (
              <div className="space-y-1">
                {[
                  { id: 'calificacion_estrategia', label: '1. Calificación & Estrategia', icon: Scale },
                  { id: 'ensamblador_documental', label: '2. Ensamblador Documental', icon: FileText },
                  { id: 'auditoria_contrapartes', label: '3. Auditoría de Contrapartes', icon: FileCheck2 },
                  { id: 'enlace_corporativo', label: '4. Enlace & Nuevos Proyectos', icon: Cpu },
                  { id: 'control_gestion', label: '5. Control de Gestión y Plazos', icon: CheckSquare },
                  { id: 'actas_minutas', label: '6. Actas y Minutas Ejecutivas', icon: Mic }
                ].map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                        active 
                          ? isDark 
                            ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30' 
                            : 'bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-sm'
                          : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      title={!sidebarOpen ? item.label : undefined}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                      {sidebarOpen && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* SECCIÓN III: CUMPLIMIENTO & EVIDENCIA */}
          <div className="space-y-1">
            {sidebarOpen && (
              <button 
                onClick={() => toggleSection('cumplimiento')}
                className="w-full flex items-center justify-between px-2 py-1 text-[10px] font-bold font-mono uppercase text-slate-400 hover:text-slate-200 tracking-wider"
              >
                <span>CUMPLIMIENTO & EVIDENCIA</span>
                {openSections.cumplimiento ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
              </button>
            )}

            {openSections.cumplimiento && (
              <div className="space-y-1">
                {[
                  { id: 'aduana', label: 'Aduana & Secreto Profesional', icon: Shield },
                  { id: 'boveda', label: 'Bóveda Forense SHA-256', icon: Lock },
                  { id: 'canal_etico', label: 'Canal Ético & Denuncias', icon: Radio },
                  { id: 'societario', label: 'Libros Societarios', icon: Building2 }
                ].map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                        active 
                          ? isDark 
                            ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30' 
                            : 'bg-blue-50 text-blue-700 font-bold border border-blue-200 shadow-sm'
                          : isDark ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                      }`}
                      title={!sidebarOpen ? item.label : undefined}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                      {sidebarOpen && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* Footer Sidebar: Perfil Bárbara Piccolo */}
        <div className="p-3 border-t border-slate-800/40">
          <div className={`p-2 rounded-xl flex items-center gap-2.5 ${isDark ? 'bg-slate-900/80 border border-slate-800' : 'bg-slate-100 border border-slate-200'}`}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shrink-0 shadow-sm">
              BP
            </div>
            {sidebarOpen && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-xs truncate">Barbara Piccolo</span>
                <span className="text-[10px] text-slate-400 truncate">Abogada Directora & GC</span>
              </div>
            )}
            {sidebarOpen && <span className="w-2 h-2 rounded-full bg-emerald-400 ml-auto shrink-0 animate-pulse"></span>}
          </div>
        </div>

      </aside>

      {/* =================================================================== */}
      {/* CONTENIDO PRINCIPAL                                                 */}
      {/* =================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Barra Superior de Control */}
        <header className={`h-14 border-b px-6 flex items-center justify-between shrink-0 z-20 ${
          isDark ? 'bg-[#080c14] border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 uppercase tracking-wider">DESPACHO</span>
              <span className="text-slate-600">/</span>
              <span className="font-bold text-cyan-400 capitalize">{activeTab.replace('_', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-mono font-medium flex items-center gap-1.5">
              <Shield className="w-3 h-3" />
              <span>Custodia Legal & eIDAS</span>
            </span>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 cursor-pointer transition-all ${
                isDark ? 'border-slate-800 bg-slate-900 text-amber-400 hover:bg-slate-800' : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline font-mono text-[10px]">{isDark ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>
          </div>
        </header>

        {/* Contenedor con Scroll */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

          {/* ================================================================= */}
          {/* PESTAÑA 1: PLANIFICADOR DE ASUNTOS (COMPLETO, POTENTE Y DINÁMICO) */}
          {/* ================================================================= */}
          {activeTab === 'planificador' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              {/* Encabezado y Acciones */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Layers className="w-6 h-6 text-cyan-400" /> Planificador de Asuntos y Expedientes
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control de prioridades procesales, estado de tramitación, términos fatales y bitácora judicial del despacho.
                  </p>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <div className={`flex rounded-xl border p-1 text-xs font-mono ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                    <button 
                      onClick={() => setVistaPlanificador('kanban')}
                      className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                        vistaPlanificador === 'kanban' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" /> Kanban
                    </button>
                    <button 
                      onClick={() => setVistaPlanificador('lista')}
                      className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                        vistaPlanificador === 'lista' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" /> Lista Procesal
                    </button>
                  </div>

                  <button
                    onClick={() => setModalNuevoAsunto(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Asunto</span>
                  </button>
                </div>
              </div>

              {/* Cinta Superior de KPIs del Planificador */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Total Asuntos</span>
                  <div className="text-xl font-extrabold text-white font-mono mt-0.5">{tableroPlanificador.length}</div>
                </div>

                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Por Iniciar</span>
                  <div className="text-xl font-extrabold text-cyan-400 font-mono mt-0.5">
                    {tableroPlanificador.filter(i => i.estado === 'Por Iniciar').length}
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-[10px] font-mono text-blue-400 uppercase">En Tramitación</span>
                  <div className="text-xl font-extrabold text-blue-400 font-mono mt-0.5">
                    {tableroPlanificador.filter(i => i.estado === 'En Tramitación').length}
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-[10px] font-mono text-amber-400 uppercase">Revisión / Firma</span>
                  <div className="text-xl font-extrabold text-amber-400 font-mono mt-0.5">
                    {tableroPlanificador.filter(i => i.estado === 'Revisión & Firma').length}
                  </div>
                </div>

                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">Concluidos</span>
                  <div className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">
                    {tableroPlanificador.filter(i => i.estado === 'Concluido').length}
                  </div>
                </div>
              </div>

              {/* Filtros por Materia y Barra de Búsqueda */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {['Todas', 'Inquilinario', 'Societario', 'LegalTech', 'Auditoría Forense'].map(m => (
                    <button
                      key={m}
                      onClick={() => setFiltroMateriaPlanificador(m)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                        filtroMateriaPlanificador === m
                          ? isDark ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold' : 'bg-blue-100 text-blue-700 border-blue-200 font-bold'
                          : isDark ? 'border-slate-800 text-slate-400 hover:bg-slate-800' : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Buscar por cliente, título o tribunal..."
                    value={buscarPlanificador}
                    onChange={(e) => setBuscarPlanificador(e.target.value)}
                    className={`w-full pl-8 pr-3 py-1.5 rounded-xl border text-xs focus:outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-200 placeholder-slate-600' : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              {/* VISTA 1: TABLERO KANBAN PROCESAL */}
              {vistaPlanificador === 'kanban' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  {['Por Iniciar', 'En Tramitación', 'Revisión & Firma', 'Concluido'].map(col => {
                    const items = tableroPlanificador.filter(i => {
                      const matchCol = i.estado === col;
                      const matchMat = filtroMateriaPlanificador === 'Todas' || i.materia.toLowerCase().includes(filtroMateriaPlanificador.toLowerCase());
                      const matchTxt = !buscarPlanificador || 
                        i.titulo.toLowerCase().includes(buscarPlanificador.toLowerCase()) ||
                        i.cliente.toLowerCase().includes(buscarPlanificador.toLowerCase()) ||
                        i.id.toLowerCase().includes(buscarPlanificador.toLowerCase());
                      return matchCol && matchMat && matchTxt;
                    });

                    return (
                      <div key={col} className={`p-3.5 rounded-2xl border flex flex-col justify-between min-h-[380px] ${
                        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                      }`}>
                        <div>
                          <div className="flex justify-between items-center pb-2.5 border-b border-slate-800/40 text-xs font-bold">
                            <span className="flex items-center gap-1.5">
                              <span className={`w-2 h-2 rounded-full ${
                                col === 'Por Iniciar' ? 'bg-cyan-400' : col === 'En Tramitación' ? 'bg-blue-400' : col === 'Revisión & Firma' ? 'bg-amber-400' : 'bg-emerald-400'
                              }`}></span>
                              {col}
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                              isDark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {items.length}
                            </span>
                          </div>

                          <div className="space-y-2.5 mt-3">
                            {items.map(t => (
                              <div 
                                key={t.id} 
                                className={`p-3.5 rounded-xl border text-xs space-y-2.5 transition-all shadow-sm ${
                                  isDark ? 'bg-slate-950 border-slate-800/90 hover:border-cyan-500/50' : 'bg-slate-50 border-slate-200 hover:border-blue-400'
                                }`}
                              >
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-extrabold text-cyan-400 tracking-tight">{t.cliente}</span>
                                  <span className={`px-2 py-0.5 rounded-full font-bold font-mono text-[9px] ${
                                    t.prioridad === 'Crítica' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                                    t.prioridad === 'Alta' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                                    'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                                  }`}>
                                    {t.prioridad}
                                  </span>
                                </div>

                                <div className="font-bold text-xs leading-snug text-white cursor-pointer hover:text-cyan-300" onClick={() => setModalVerExpediente(t)}>
                                  {t.titulo}
                                </div>

                                <div className="text-[11px] text-slate-400 line-clamp-2">
                                  {t.detalles}
                                </div>

                                <div className={`text-[10px] pt-2 border-t border-slate-800/40 flex justify-between items-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                  <span className="font-medium text-slate-300">{t.responsable}</span>
                                  <span className="font-mono text-cyan-300 font-bold">{t.plazo}</span>
                                </div>

                                {/* Barra de Acciones Rápidas */}
                                <div className="flex items-center justify-between pt-1 border-t border-slate-800/20 text-[10px] font-mono">
                                  <button
                                    onClick={() => setModalVerExpediente(t)}
                                    className="flex items-center gap-1 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                                  >
                                    <Eye className="w-3 h-3" /> Ficha
                                  </button>

                                  <div className="flex items-center gap-1">
                                    {col !== 'Por Iniciar' && (
                                      <button
                                        onClick={() => {
                                          const prevCol = col === 'Concluido' ? 'Revisión & Firma' : col === 'Revisión & Firma' ? 'En Tramitación' : 'Por Iniciar';
                                          moverEstadoAsunto(t.id, prevCol);
                                        }}
                                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 cursor-pointer"
                                        title="Regresar estado"
                                      >
                                        <ArrowLeft className="w-3 h-3" />
                                      </button>
                                    )}

                                    {col !== 'Concluido' && (
                                      <button
                                        onClick={() => {
                                          const nextCol = col === 'Por Iniciar' ? 'En Tramitación' : col === 'En Tramitación' ? 'Revisión & Firma' : 'Concluido';
                                          moverEstadoAsunto(t.id, nextCol);
                                        }}
                                        className="p-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold cursor-pointer"
                                        title="Avanzar estado"
                                      >
                                        <ArrowRight className="w-3 h-3" />
                                      </button>
                                    )}
                                  </div>
                                </div>

                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* VISTA 2: LISTA PROCESAL DETALLADA (TABLA) */}
              {vistaPlanificador === 'lista' && (
                <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <table className="w-full text-xs text-left">
                    <thead className={`text-[10px] font-mono uppercase border-b ${isDark ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                      <tr>
                        <th className="p-3.5">ID / Expediente</th>
                        <th className="p-3.5">Cliente</th>
                        <th className="p-3.5">Materia</th>
                        <th className="p-3.5">Tribunal / Sede</th>
                        <th className="p-3.5">Cuantía</th>
                        <th className="p-3.5">Plazo Fatal</th>
                        <th className="p-3.5">Estado</th>
                        <th className="p-3.5 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      {tableroPlanificador.map(t => (
                        <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-3.5 font-mono font-bold text-cyan-400">{t.id}</td>
                          <td className="p-3.5 font-bold text-white">{t.cliente}</td>
                          <td className="p-3.5 text-slate-300">{t.materia}</td>
                          <td className="p-3.5 text-slate-400 text-[11px] truncate max-w-[180px]">{t.tribunal}</td>
                          <td className="p-3.5 font-mono text-emerald-400 font-bold">{t.cuantia}</td>
                          <td className="p-3.5 font-mono font-bold text-amber-400">{t.plazo}</td>
                          <td className="p-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              t.estado === 'Concluido' ? 'bg-emerald-500/20 text-emerald-400' :
                              t.estado === 'Revisión & Firma' ? 'bg-amber-500/20 text-amber-400' :
                              t.estado === 'En Tramitación' ? 'bg-blue-500/20 text-blue-400' : 'bg-cyan-500/20 text-cyan-400'
                            }`}>
                              {t.estado}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => setModalVerExpediente(t)}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-[10px] transition-all cursor-pointer"
                            >
                              Ver Ficha
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}

          {/* ================================================================= */}
          {/* PESTAÑA 2: DIRECTORIO Y CRM LEGAL                                 */}
          {/* ================================================================= */}
          {activeTab === 'crm' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-400" /> Directorio & CRM Legal
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control unificado de Clientes Externos (Sociedades Mercantiles) y Clientes Internos (Filiales y Departamentos).
                  </p>
                </div>
              </div>

              {/* Formulario de Alta de Nuevo Cliente */}
              <div className={`p-5 rounded-2xl border space-y-4 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/40">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Plus className="w-4 h-4 text-cyan-400" /> Alta de Nuevo Cliente (Ficha Legal)
                  </h2>
                  <span className="text-[10px] font-mono text-slate-400">Sincronización automática con el Gabinete</span>
                </div>

                <form onSubmit={registrarNuevoCliente} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Razón Social / Entidad *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Distribuidora Bolívar C.A."
                        value={nuevoCliente.nombre}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
                        className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                          isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Tipo de Cliente</label>
                      <select
                        value={nuevoCliente.tipo}
                        onChange={(e: any) => setNuevoCliente({...nuevoCliente, tipo: e.target.value})}
                        className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                          isDark ? 'bg-slate-950 border-slate-800 text-cyan-400 font-bold' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <option value="Externo">Cliente Externo (Empresa)</option>
                        <option value="Interno">Cliente Interno (Filial / Área)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">RIF / NIF / Registro</label>
                      <input
                        type="text"
                        placeholder="J-00000000-0"
                        value={nuevoCliente.rif}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, rif: e.target.value})}
                        className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none font-mono ${
                          isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Apoderado / Representante Legal</label>
                      <input
                        type="text"
                        placeholder="Nombre y cargo del apoderado"
                        value={nuevoCliente.apoderado}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, apoderado: e.target.value})}
                        className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                          isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Correo Notificaciones</label>
                      <input
                        type="email"
                        placeholder="notificaciones@empresa.com"
                        value={nuevoCliente.email}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, email: e.target.value})}
                        className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                          isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Domicilio Legal</label>
                      <input
                        type="text"
                        placeholder="Ciudad / Estado"
                        value={nuevoCliente.domicilio}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, domicilio: e.target.value})}
                        className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                          isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    {clienteGuardadoExito && (
                      <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ficha guardada e integrada con éxito.
                      </span>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
                    >
                      <Plus className="w-4 h-4" /> Guardar Ficha en CRM
                    </button>
                  </div>
                </form>
              </div>

              {/* Grilla de Clientes Registrados */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {clientes.map(c => (
                  <div key={c.id} className={`p-4 rounded-2xl border space-y-3 ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        c.tipo === 'Externo' ? 'bg-blue-500/20 text-blue-300' : 'bg-purple-500/20 text-purple-300'
                      }`}>
                        {c.tipo}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">{c.rif}</span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-white">{c.nombre}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{c.apoderado}</p>
                    </div>

                    <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/40 space-y-1">
                      <div><i className="fa-solid fa-location-dot text-cyan-400 mr-1.5"></i>{c.domicilio}</div>
                      <div><i className="fa-solid fa-envelope text-slate-500 mr-1.5"></i>{c.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* PESTAÑA 3: CALENDARIO PROCESAL Y CONTRACTUAL (CALENDARIO REAL)    */}
          {/* ================================================================= */}
          {activeTab === 'calendario' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              {/* Header Calendario */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Clock className="w-6 h-6 text-amber-400" /> Calendario Judicial & Contractual
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control visual de términos fatales, vencimientos de arrendamientos, audiencias judiciales y plazos perentorios.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className={`flex rounded-xl border p-1 text-xs font-mono ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                    <button
                      onClick={() => setVistaCalendario('mes')}
                      className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer ${
                        vistaCalendario === 'mes' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Calendar className="w-3.5 h-3.5" /> Vista Mes
                    </button>
                    <button
                      onClick={() => setVistaCalendario('agenda')}
                      className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer ${
                        vistaCalendario === 'agenda' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" /> Agenda Perentoria
                    </button>
                  </div>

                  <button
                    onClick={() => setModalNuevoEvento(true)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agendar Término</span>
                  </button>
                </div>
              </div>

              {/* VISTA 1: CUADRÍCULA MENSUAL REAL */}
              {vistaCalendario === 'mes' && (
                <div className="space-y-4">
                  {/* Selector y Navegación de Mes */}
                  <div className={`p-4 rounded-2xl border flex items-center justify-between ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-3">
                      <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                        <span>{mesesNombres[mesActualIndex]}</span>
                        <span className="text-amber-400">{anioActual}</span>
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (mesActualIndex === 0) {
                            setMesActualIndex(11);
                            setAnioActual(anioActual - 1);
                          } else {
                            setMesActualIndex(mesActualIndex - 1);
                          }
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                        title="Mes anterior"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          setMesActualIndex(8); // Septiembre 2026
                          setAnioActual(2026);
                          setDiaSeleccionado(28);
                        }}
                        className="px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono font-bold hover:bg-slate-800 cursor-pointer"
                      >
                        Hoy (28 Sep)
                      </button>

                      <button
                        onClick={() => {
                          if (mesActualIndex === 11) {
                            setMesActualIndex(0);
                            setAnioActual(anioActual + 1);
                          } else {
                            setMesActualIndex(mesActualIndex + 1);
                          }
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                        title="Mes siguiente"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Cuadrícula Real del Mes */}
                  <div className={`p-4 rounded-2xl border overflow-hidden ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    {/* Encabezado Días de Semana */}
                    <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px] font-bold pb-2 border-b border-slate-800 text-slate-400">
                      <div>LUN</div>
                      <div>MAR</div>
                      <div>MIÉ</div>
                      <div>JUE</div>
                      <div>VIE</div>
                      <div>SÁB</div>
                      <div>DOM</div>
                    </div>

                    {/* Días del Mes */}
                    {(() => {
                      const { offsetLunes, totalDias } = getDiasDelMes(mesActualIndex, anioActual);
                      const cells: any[] = [];

                      // Celdas vacías del mes anterior
                      for (let i = 0; i < offsetLunes; i++) {
                        cells.push(
                          <div key={`empty-${i}`} className="min-h-[85px] p-1.5 rounded-xl border border-transparent opacity-20 text-[10px] font-mono">
                            -
                          </div>
                        );
                      }

                      // Días reales del mes
                      for (let d = 1; d <= totalDias; d++) {
                        const eventosDelDia = eventosCalendario.filter(ev => 
                          ev.dia === d && ev.mes === mesActualIndex && ev.anio === anioActual
                        );
                        const esHoy = d === 28 && mesActualIndex === 8 && anioActual === 2026;
                        const esSeleccionado = d === diaSeleccionado;

                        cells.push(
                          <div
                            key={`day-${d}`}
                            onClick={() => setDiaSeleccionado(d)}
                            className={`min-h-[85px] p-2 rounded-xl border text-xs flex flex-col justify-between cursor-pointer transition-all ${
                              esSeleccionado 
                                ? 'border-amber-400 bg-amber-950/20 shadow-lg' 
                                : esHoy 
                                  ? 'border-cyan-400 bg-cyan-950/20 font-bold' 
                                  : isDark ? 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700' : 'border-slate-200 bg-slate-50'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <span className={`font-mono text-xs font-bold ${
                                esHoy ? 'text-cyan-400 underline' : esSeleccionado ? 'text-amber-400' : 'text-slate-300'
                              }`}>
                                {d}
                              </span>
                              {esHoy && <span className="text-[9px] font-mono text-cyan-300 font-bold">HOY</span>}
                            </div>

                            <div className="space-y-1 mt-1">
                              {eventosDelDia.map(ev => (
                                <div 
                                  key={ev.id} 
                                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold truncate leading-tight ${
                                    ev.nivel === 'critico' ? 'bg-red-500/25 text-red-300 border border-red-500/40' :
                                    ev.nivel === 'urgente' ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40' :
                                    'bg-blue-500/25 text-blue-300 border border-blue-500/40'
                                  }`}
                                  title={`${ev.hora} - ${ev.titulo}`}
                                >
                                  {ev.titulo}
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      return <div className="grid grid-cols-7 gap-1.5 mt-2">{cells}</div>;
                    })()}
                  </div>

                  {/* Panel Detallado del Día Seleccionado */}
                  <div className={`p-5 rounded-2xl border space-y-3 ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-400" />
                        <span>Eventos y Términos para el {diaSeleccionado} de {mesesNombres[mesActualIndex]} de {anioActual}</span>
                      </h3>
                      <button
                        onClick={() => setModalNuevoEvento(true)}
                        className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono font-bold cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Agendar en esta fecha
                      </button>
                    </div>

                    {(() => {
                      const eventos = eventosCalendario.filter(ev => 
                        ev.dia === diaSeleccionado && ev.mes === mesActualIndex && ev.anio === anioActual
                      );
                      if (eventos.length === 0) {
                        return (
                          <div className="py-6 text-center text-xs text-slate-500 font-mono">
                            No hay términos fatales ni audiencias programadas para este día.
                          </div>
                        );
                      }
                      return (
                        <div className="space-y-2">
                          {eventos.map(ev => (
                            <div key={ev.id} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-amber-400 font-bold text-xs">{ev.hora}</span>
                                  <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-800 text-cyan-300">
                                    {ev.cliente}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-mono">Tribunal: {ev.tribunal}</span>
                                </div>
                                <div className="text-sm font-bold text-white">{ev.titulo}</div>
                              </div>
                              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold shrink-0 ${
                                ev.nivel === 'critico' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                              }`}>
                                {ev.dias_restantes}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* VISTA 2: AGENDA PERENTORIA DE PLAZOS FATALES */}
              {vistaCalendario === 'agenda' && (
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
                          <span className="text-[10px] text-slate-400">({ev.tribunal})</span>
                        </div>
                        <div className="text-sm font-semibold text-white">{ev.titulo}</div>
                        <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          Fecha límite: {ev.fecha} • Hora: {ev.hora}
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
              )}

            </div>
          )}

          {/* ================================================================= */}
          {/* PESTAÑA 4: RENDIMIENTO & MÉTRICAS                                 */}
          {/* ================================================================= */}
          {activeTab === 'metricas' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-emerald-400" /> Rendimiento & Métricas del Despacho
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    FinOps Legal: Valor generado, contingencias prevenidas y retorno de inversión de la dirección letrada.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Valor Desbloqueado</span>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">{metricasDespacho.valor_aportado_usd}</div>
                </div>

                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Riesgo Prevenido</span>
                  <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">{metricasDespacho.contingencias_ahorradas_usd}</div>
                </div>

                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-[10px] font-mono text-purple-400 uppercase">Facturación Mes</span>
                  <div className="text-2xl font-extrabold text-purple-400 font-mono mt-1">{metricasDespacho.facturacion_mes_usd}</div>
                </div>

                <div className={`p-4 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Eficiencia de Ciclo</span>
                  <div className="text-xs font-bold text-amber-400 font-mono mt-2">18h vs 5 días</div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 1: CALIFICACIÓN & ESTRATEGIA                             */}
          {/* ================================================================= */}
          {activeTab === 'calificacion_estrategia' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Scale className="w-6 h-6 text-cyan-400" /> 1. Calificación & Estrategia Jurídica
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Análisis probatorio de audios, documentos y hechos reales con fundamentación en el Código Civil, CPC y doctrina del TSJ.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 space-y-4">
                  <div className={`p-5 rounded-2xl border space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div>
                      <label className="text-xs font-bold block mb-1">Cliente Vinculado (CRM):</label>
                      <select
                        value={clienteSeleccionadoTriage}
                        onChange={(e) => setClienteSeleccionadoTriage(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold text-cyan-400"
                      >
                        {clientes.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-bold block mb-1">Insumos y Pruebas Recibidas:</label>
                      <div className="space-y-1.5">
                        {archivosAdjuntosTriage.map((a, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300">
                            <FileText className="w-3.5 h-3.5 text-cyan-400" />
                            <span className="truncate">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold block mb-1">Instrucción y Consulta Letrada:</label>
                      <textarea
                        rows={5}
                        value={consultaLetrada}
                        onChange={(e) => setConsultaLetrada(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200"
                      />
                    </div>

                    <button
                      onClick={ejecutarCalificacionEstrategica}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {cargandoDictamen ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Scale className="w-4 h-4" />}
                      <span>Generar Dictamen y Alternativas Procesales</span>
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-4">
                  <div className={`p-5 rounded-2xl border space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="font-bold text-xs text-cyan-400 font-mono">Dictamen Estratégico Oficial</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400">{dictamenEstrategico.nivel_urgencia}</span>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Hechos Calificados:</span>
                        <ul className="list-disc pl-4 text-xs text-slate-300 space-y-1 mt-1">
                          {dictamenEstrategico.hechos_relevantes.map((h: string, i: number) => <li key={i}>{h}</li>)}
                        </ul>
                      </div>

                      <div>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">Opciones Procesales Evaluadas:</span>
                        <div className="space-y-2 mt-1.5">
                          {dictamenEstrategico.vias_estrategicas.map((v: any, i: number) => (
                            <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                              <div className="font-bold text-white text-xs">{v.opcion}</div>
                              <p className="text-[11px] text-slate-300">{v.descripcion}</p>
                              <div className="text-[10px] font-mono text-emerald-400 font-bold pt-1">Plazo estimado: {v.tiempo_ejecucion}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 2: ENSAMBLADOR DOCUMENTAL (DOCUMENTO ÍNTEGRO INMUTABLE)  */}
          {/* ================================================================= */}
          {activeTab === 'ensamblador_documental' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <FileText className="w-6 h-6 text-emerald-400" /> 2. Ensamblador Documental (Modelos de Drive)
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    El documento original es inmutable: se genera 100% íntegro y solemne. Solo se sustituyen las variables de la ficha del cliente.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={descargarDocumentoWord}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all"
                  >
                    <Download className="w-4 h-4" /> Descargar en Word (.doc)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Panel Izquierdo: Ficha y Variables */}
                <div className="lg:col-span-5 space-y-4">
                  <div className={`p-5 rounded-2xl border space-y-4 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    
                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">1. Seleccionar Ficha del Cliente (CRM):</label>
                      <select
                        value={clienteEnsamblaje}
                        onChange={(e) => setClienteEnsamblaje(e.target.value)}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold text-emerald-400"
                      >
                        {clientes.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-slate-400 block mb-1">2. Plantilla Inmutable de Google Drive:</label>
                      <select
                        value={modeloDriveSeleccionado}
                        onChange={(e) => {
                          setModeloDriveSeleccionado(e.target.value);
                          setTimeout(actualizarDocumentoWord, 50);
                        }}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-bold text-white"
                      >
                        <option value="arrendamiento">Contrato de Arrendamiento Comercial e Industrial (Completo - 12 Cláusulas)</option>
                        <option value="poder">Poder Notarial General y Especial Amplio (Modelo Piccolo)</option>
                        <option value="asamblea">Acta de Asamblea General Extraordinaria de Accionistas (Sub 1308)</option>
                      </select>
                    </div>

                    {/* Variables que se sustituyen en el modelo */}
                    <div className="space-y-2.5 text-xs pt-2 border-t border-slate-800">
                      <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block">Campos a Sustituir de la Ficha:</span>
                      
                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">Parte Arrendataria / Otorgante:</label>
                        <input
                          type="text"
                          value={variablesEnsamblador.arrendataria}
                          onChange={(e) => setVariablesEnsamblador({...variablesEnsamblador, arrendataria: e.target.value})}
                          className="w-full p-2 rounded-lg border border-slate-800 bg-slate-950 text-xs text-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">RIF:</label>
                          <input
                            type="text"
                            value={variablesEnsamblador.arrendataria_rif}
                            onChange={(e) => setVariablesEnsamblador({...variablesEnsamblador, arrendataria_rif: e.target.value})}
                            className="w-full p-2 rounded-lg border border-slate-800 bg-slate-950 text-xs text-white font-mono"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">Representante Legal:</label>
                          <input
                            type="text"
                            value={variablesEnsamblador.arrendataria_rep}
                            onChange={(e) => setVariablesEnsamblador({...variablesEnsamblador, arrendataria_rep: e.target.value})}
                            className="w-full p-2 rounded-lg border border-slate-800 bg-slate-950 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">Canon Mensual:</label>
                          <input
                            type="text"
                            value={variablesEnsamblador.monto_canon}
                            onChange={(e) => setVariablesEnsamblador({...variablesEnsamblador, monto_canon: e.target.value})}
                            className="w-full p-2 rounded-lg border border-slate-800 bg-slate-950 text-xs text-emerald-400 font-bold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block mb-0.5">Plazo de Vigencia:</label>
                          <input
                            type="text"
                            value={variablesEnsamblador.plazo_vigencia}
                            onChange={(e) => setVariablesEnsamblador({...variablesEnsamblador, plazo_vigencia: e.target.value})}
                            className="w-full p-2 rounded-lg border border-slate-800 bg-slate-950 text-xs text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block mb-0.5">Inmueble / Objeto:</label>
                        <input
                          type="text"
                          value={variablesEnsamblador.inmueble}
                          onChange={(e) => setVariablesEnsamblador({...variablesEnsamblador, inmueble: e.target.value})}
                          className="w-full p-2 rounded-lg border border-slate-800 bg-slate-950 text-xs text-slate-300"
                        />
                      </div>
                    </div>

                    <button
                      onClick={actualizarDocumentoWord}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs transition-all cursor-pointer shadow-md"
                    >
                      Actualizar Documento Íntegro
                    </button>
                  </div>
                </div>

                {/* Panel Derecho: Vista del Documento Completo sin Cortes */}
                <div className="lg:col-span-7 space-y-4">
                  <div className={`p-5 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-xs font-bold">
                      <span className="text-emerald-400 flex items-center gap-1.5 font-mono">
                        <Check className="w-4 h-4 text-emerald-400" />
                        Texto Íntegro y Fidedigno (Sin Recortes)
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(documentoGeneradoWord);
                          alert("Documento íntegro copiado al portapapeles.");
                        }}
                        className="px-3 py-1 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copiar Texto
                      </button>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 text-xs leading-relaxed max-h-[560px] overflow-y-auto whitespace-pre-wrap font-serif text-slate-200 select-text">
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <FileCheck2 className="w-6 h-6 text-purple-400" /> 3. Auditoría de Contrapartes & Redline
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Cotejo preventivo ante cláusulas leoninas, renuncias de fueros y desequilibrios patrimoniales.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {informeAuditoria.semaforo.map((s: any, i: number) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-800 bg-slate-900 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                        s.color === 'rojo' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {s.nivel}
                      </span>
                      <span className="font-bold text-white text-xs">{s.clausula}</span>
                    </div>
                    <p className="text-xs text-slate-300">{s.analisis}</p>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300">
                      <strong>Propuesta Redline:</strong> {s.redline_sugerido}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 4: ENLACE CORPORATIVO                                    */}
          {/* ================================================================= */}
          {activeTab === 'enlace_corporativo' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Cpu className="w-6 h-6 text-blue-400" /> 4. Enlace Corporativo & Proyectos
              </h1>
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-4">
                <div className="text-sm font-bold text-white">{dictamenIniciativa.viabilidad}</div>
                <p className="text-xs text-slate-300">{dictamenIniciativa.resumen_directivo}</p>
                <div className="space-y-2">
                  {dictamenIniciativa.especificaciones_tecnicas.map((t: any, i: number) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-mono text-cyan-400 font-bold mr-2">{t.ticket}</span>
                        <span className="text-white font-medium">{t.titulo}</span>
                      </div>
                      <span className="text-[10px] font-mono text-amber-400 font-bold">{t.prioridad}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 5: CONTROL DE GESTIÓN                                    */}
          {/* ================================================================= */}
          {activeTab === 'control_gestion' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <CheckSquare className="w-6 h-6 text-amber-400" /> 5. Control de Gestión y Plazos
              </h1>
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 text-xs space-y-2 text-slate-300">
                <p>Supervisión activa de SLAs del equipo letrado asociado y cumplimiento de directrices del General Counsel.</p>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE 6: ACTAS Y MINUTAS EJECUTIVAS (GRABACIÓN REAL + WHISPER) */}
          {/* ================================================================= */}
          {activeTab === 'actas_minutas' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Mic className="w-6 h-6 text-pink-400" /> 6. Actas y Minutas Ejecutivas
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Grabación de sala con transcripción soberana local y generación de la Minuta Oficial con tareas asignables al Planificador.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-mono font-bold">
                    Whisper On-Premise
                  </span>
                </div>
              </div>

              {/* Consola Central de Grabación y Carga */}
              <div className={`p-6 rounded-2xl border space-y-6 shadow-xl ${
                isDark ? 'bg-slate-900 border-pink-500/30' : 'bg-white border-slate-200'
              }`}>
                <div className="flex flex-col items-center justify-center text-center space-y-4 py-2">
                  
                  {/* Cronómetro en Pantalla */}
                  <div className="space-y-1">
                    <div className="font-mono text-4xl font-extrabold text-white tracking-widest">
                      {Math.floor(segundosGrabacion / 60).toString().padStart(2, '0')}:{(segundosGrabacion % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${grabandoAudioLocal ? 'bg-red-500 animate-ping' : 'bg-slate-500'}`}></span>
                      <span>{grabandoAudioLocal ? "Grabando audio de sala en memoria privada..." : "Listo para grabar o cargar archivo de audio"}</span>
                    </div>
                  </div>

                  {/* Botones Principales */}
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                    <button
                      onClick={alternarGrabacionAudioLocal}
                      className={`px-6 py-3.5 rounded-2xl font-mono font-bold text-xs transition-all flex items-center gap-2.5 cursor-pointer shadow-lg ${
                        grabandoAudioLocal
                          ? 'bg-red-500 text-white animate-pulse shadow-red-500/30'
                          : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white shadow-pink-500/25'
                      }`}
                    >
                      {grabandoAudioLocal ? <Square className="w-4 h-4 fill-white" /> : <Mic className="w-4 h-4" />}
                      <span>{grabandoAudioLocal ? "Detener Grabación y Procesar" : "Grabar Audio de Sala (Local)"}</span>
                    </button>

                    <label className={`px-5 py-3.5 rounded-2xl border font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md transition-all ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-200 hover:border-pink-400' : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                    }`}>
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
                    <div className="text-xs font-mono text-cyan-300 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800">
                      Archivo de audio: <strong>{archivoAudioNombre}</strong>
                    </div>
                  )}

                  {audioUrlLocal && (
                    <div className="w-full max-w-md pt-2">
                      <audio controls src={audioUrlLocal} className="w-full h-9" />
                    </div>
                  )}

                  {cargandoTranscripcionWhisper && (
                    <div className="text-xs font-mono text-pink-300 flex items-center gap-2 animate-pulse">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Transcribiendo audio y extrayendo acuerdos con Whisper On-Premise...</span>
                    </div>
                  )}

                </div>
              </div>

              {/* Minuta Oficial Certificada con Asignación a Planificador */}
              {minutaWhisper && (
                <div className={`p-6 rounded-2xl border space-y-6 shadow-xl ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-4 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">
                        Minuta Oficial Certificada
                      </span>
                      <h2 className="text-lg font-bold text-white mt-0.5">{minutaWhisper.titulo}</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const docText = `MINUTA OFICIAL DE REUNIÓN\n${minutaWhisper.titulo}\nFecha: ${minutaWhisper.fecha}\nDuración: ${minutaWhisper.duracion}\n\nACUERDOS VINCULANTES:\n${minutaWhisper.acuerdos.map((a: string) => `- ${a}`).join('\n')}\n\nACTION ITEMS:\n${minutaWhisper.action_items.map((ai: any) => `- [${ai.prioridad}] ${ai.tarea} (Resp: ${ai.responsable} | Plazo: ${ai.plazo})`).join('\n')}`;
                          const blob = new Blob([docText], { type: 'application/msword;charset=utf-8' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `Minuta_${minutaWhisper.titulo.slice(0, 20)}.doc`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <Download className="w-3.5 h-3.5" /> Descargar Minuta (.doc)
                      </button>
                    </div>
                  </div>

                  {/* Metadatos y Custodia */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">FECHA Y DURACIÓN:</span>
                      <span className="text-white font-bold">{minutaWhisper.fecha} ({minutaWhisper.duracion})</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">PLATAFORMA:</span>
                      <span className="text-cyan-400 font-bold">{minutaWhisper.plataforma}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">HASH SHA-256 INMUTABLE:</span>
                      <span className="text-[10px] text-slate-400 truncate block">{minutaWhisper.hash_sha256}</span>
                    </div>
                  </div>

                  {/* Extracto de Transcripción */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-slate-400 uppercase font-bold">Extracto de Transcripción Forense:</span>
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs italic text-slate-300 font-serif leading-relaxed">
                      {minutaWhisper.transcripcion_extracto}
                    </div>
                  </div>

                  {/* Acuerdos Vinculantes */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Acuerdos Vinculantes Formalizados:
                    </span>
                    <div className="space-y-1.5">
                      {minutaWhisper.acuerdos.map((ac: string, i: number) => (
                        <div key={i} className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">{i + 1}.</span>
                          <span>{ac}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Items con Asignación a Planificador */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                        <CheckSquare className="w-4 h-4 text-cyan-400" /> Compromisos Asignables al Planificador:
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">1-Clic para inyectar en Kanban</span>
                    </div>

                    <div className="space-y-2">
                      {minutaWhisper.action_items.map((ai: any) => (
                        <div key={ai.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                          <div className="space-y-1">
                            <div className="font-bold text-white">{ai.tarea}</div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-3">
                              <span>Resp: <strong className="text-slate-200">{ai.responsable}</strong></span>
                              <span>Plazo: <strong className="text-amber-400">{ai.plazo}</strong></span>
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-800 text-cyan-300">{ai.prioridad}</span>
                            </div>
                          </div>

                          <button
                            onClick={() => asignarActionItemAPlanificador(ai)}
                            disabled={ai.agregado}
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 transition-all ${
                              ai.agregado
                                ? 'bg-slate-800 text-emerald-400 border border-emerald-500/40 cursor-default'
                                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-sm'
                            }`}
                          >
                            {ai.agregado ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                            <span>{ai.agregado ? "Asignado en Planificador" : "Asignar al Planificador"}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

          {/* CUMPLIMIENTO */}
          {activeTab === 'aduana' && (
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 text-xs">
              <h2 className="text-lg font-bold text-white mb-2">Aduana & Secreto Profesional</h2>
              <p className="text-slate-400">Filtro de inspección y anonimización de datos sensibles antes de cualquier procesamiento.</p>
            </div>
          )}

          {activeTab === 'boveda' && (
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 text-xs">
              <h2 className="text-lg font-bold text-white mb-2">Bóveda Forense Inmutable SHA-256</h2>
              <p className="text-slate-400">Registro criptográfico de custodia de documentos y minutas para validez probatoria.</p>
            </div>
          )}

          {activeTab === 'canal_etico' && (
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 text-xs">
              <h2 className="text-lg font-bold text-white mb-2">Canal Ético y Cumplimiento</h2>
              <p className="text-slate-400">Línea de reporte confidencial y trazabilidad de investigaciones corporativas.</p>
            </div>
          )}

          {activeTab === 'societario' && (
            <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 text-xs">
              <h2 className="text-lg font-bold text-white mb-2">Libros Societarios Digitales</h2>
              <p className="text-slate-400">Libro de Accionistas, Actas de Junta Directiva y Asambleas de Accionistas.</p>
            </div>
          )}

        </div>

      </div>

      {/* =================================================================== */}
      {/* MODAL: NUEVO ASUNTO / EXPEDIENTE                                    */}
      {/* =================================================================== */}
      {modalNuevoAsunto && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-xl p-6 rounded-3xl border shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>Nuevo Asunto / Expediente Procesal</span>
              </h3>
              <button 
                onClick={() => setModalNuevoAsunto(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={agregarNuevoAsunto} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Título u Objeto del Asunto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Interdicto de despojo por invasión de linderos"
                  value={nuevoAsuntoForm.titulo}
                  onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, titulo: e.target.value})}
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Cliente Vinculado</label>
                  <select
                    value={nuevoAsuntoForm.cliente}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, cliente: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-cyan-400 font-bold"
                  >
                    {clientes.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Materia Jurídica</label>
                  <select
                    value={nuevoAsuntoForm.materia}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, materia: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                  >
                    <option value="Inquilinario">Inquilinario</option>
                    <option value="Societario">Societario</option>
                    <option value="LegalTech">LegalTech / SaaS</option>
                    <option value="Auditoría Forense">Auditoría Forense</option>
                    <option value="Laboral">Laboral</option>
                    <option value="Contencioso">Contencioso Mercantil</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Tribunal / Juzgado / Notaría</label>
                  <input
                    type="text"
                    placeholder="Ej. Juzgado 2° Civil Puerto Ordaz"
                    value={nuevoAsuntoForm.tribunal}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, tribunal: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Cuantía Estimada</label>
                  <input
                    type="text"
                    placeholder="Ej. 35.000 USD"
                    value={nuevoAsuntoForm.cuantia}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, cuantia: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-emerald-400 font-bold font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Plazo Fatal / Término</label>
                  <input
                    type="text"
                    placeholder="Ej. Jueves 16:00"
                    value={nuevoAsuntoForm.plazo}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, plazo: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-amber-400 font-bold"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Prioridad</label>
                  <select
                    value={nuevoAsuntoForm.prioridad}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, prioridad: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                  >
                    <option value="Crítica">Crítica</option>
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Estado Inicial</label>
                  <select
                    value={nuevoAsuntoForm.estado}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, estado: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-cyan-400 font-bold"
                  >
                    <option value="Por Iniciar">Por Iniciar</option>
                    <option value="En Tramitación">En Tramitación</option>
                    <option value="Revisión & Firma">Revisión & Firma</option>
                    <option value="Concluido">Concluido</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Detalles y Hechos Relevantes</label>
                <textarea
                  rows={3}
                  placeholder="Relación sucinta de hechos, pretensiones y antecedentes..."
                  value={nuevoAsuntoForm.detalles}
                  onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, detalles: e.target.value})}
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalNuevoAsunto(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold cursor-pointer shadow-md"
                >
                  Crear Asunto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: VER FICHA INTEGRAL DEL EXPEDIENTE                           */}
      {/* =================================================================== */}
      {modalVerExpediente && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl p-6 rounded-3xl border shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-400 font-bold text-sm">{modalVerExpediente.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-300 font-mono">
                    {modalVerExpediente.materia}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white mt-1">{modalVerExpediente.titulo}</h3>
              </div>
              <button 
                onClick={() => setModalVerExpediente(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">CLIENTE:</span>
                <span className="text-cyan-400 font-bold truncate block">{modalVerExpediente.cliente}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">CUANTÍA:</span>
                <span className="text-emerald-400 font-bold">{modalVerExpediente.cuantia}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">PLAZO FATAL:</span>
                <span className="text-amber-400 font-bold">{modalVerExpediente.plazo}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">ESTADO:</span>
                <span className="text-cyan-300 font-bold">{modalVerExpediente.estado}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold">Tribunal / Sede Administrativa:</span>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white font-medium">
                {modalVerExpediente.tribunal}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold">Resumen de Hechos & Estrategia:</span>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {modalVerExpediente.detalles}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold">Bitácora Procesal y Actuaciones:</span>
              <div className="space-y-1.5 max-h-36 overflow-y-auto">
                {modalVerExpediente.bitacora && modalVerExpediente.bitacora.map((b: any, i: number) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs flex items-start gap-2">
                    <span className="font-mono text-cyan-400 font-bold text-[10px] shrink-0 mt-0.5">{b.fecha}:</span>
                    <span className="text-slate-300">{b.nota}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-400">Mover a:</span>
                {['Por Iniciar', 'En Tramitación', 'Revisión & Firma', 'Concluido'].map(st => (
                  <button
                    key={st}
                    onClick={() => moverEstadoAsunto(modalVerExpediente.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                      modalVerExpediente.estado === st 
                        ? 'bg-cyan-500 text-slate-950' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={() => eliminarAsunto(modalVerExpediente.id)}
                className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer font-mono"
              >
                <Trash2 className="w-3.5 h-3.5" /> Archivar Asunto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL: NUEVO EVENTO / AUDIENCIA CALENDARIO                          */}
      {/* =================================================================== */}
      {modalNuevoEvento && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4 ${
            isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>Agendar Término o Audiencia</span>
              </h3>
              <button 
                onClick={() => setModalNuevoEvento(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={agregarNuevoEventoCalendario} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Título del Evento o Plazo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Contestación de demanda por desalojo"
                  value={nuevoEventoForm.titulo}
                  onChange={(e) => setNuevoEventoForm({...nuevoEventoForm, titulo: e.target.value})}
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Cliente Vinculado</label>
                <select
                  value={nuevoEventoForm.cliente}
                  onChange={(e) => setNuevoEventoForm({...nuevoEventoForm, cliente: e.target.value})}
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-cyan-400 font-bold"
                >
                  {clientes.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={nuevoEventoForm.fecha}
                    onChange={(e) => setNuevoEventoForm({...nuevoEventoForm, fecha: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Hora</label>
                  <input
                    type="time"
                    value={nuevoEventoForm.hora}
                    onChange={(e) => setNuevoEventoForm({...nuevoEventoForm, hora: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Tipo de Evento</label>
                  <select
                    value={nuevoEventoForm.tipo}
                    onChange={(e) => setNuevoEventoForm({...nuevoEventoForm, tipo: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                  >
                    <option value="Procesal Perentorio">Procesal Perentorio</option>
                    <option value="Vencimiento Contractual">Vencimiento Contractual</option>
                    <option value="Audiencia Judicial">Audiencia Judicial</option>
                    <option value="Reunión de Directorio">Reunión de Directorio</option>
                    <option value="Asamblea Societaria">Asamblea Societaria</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Nivel de Alerta</label>
                  <select
                    value={nuevoEventoForm.nivel}
                    onChange={(e) => setNuevoEventoForm({...nuevoEventoForm, nivel: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-amber-400 font-bold"
                  >
                    <option value="critico">Crítico (&lt; 24h)</option>
                    <option value="urgente">Urgente (&lt; 6 días)</option>
                    <option value="ordinario">Ordinario</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Tribunal / Sede</label>
                <input
                  type="text"
                  placeholder="Ej. Juzgado Segundo Civil Puerto Ordaz"
                  value={nuevoEventoForm.tribunal}
                  onChange={(e) => setNuevoEventoForm({...nuevoEventoForm, tribunal: e.target.value})}
                  className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalNuevoEvento(false)}
                  className="px-4 py-2 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold cursor-pointer shadow-md"
                >
                  Guardar Término
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
