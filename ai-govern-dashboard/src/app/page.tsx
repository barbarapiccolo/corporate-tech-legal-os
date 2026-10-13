'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, FileText, Scale, Cpu, AlertTriangle, CheckCircle2, Lock, 
  Calendar, Briefcase, Users, Mic, CheckSquare, QrCode, Play, Square, Copy, Download, 
  ChevronRight, ChevronDown, ChevronLeft, MessageSquare, Sparkles, Search, BarChart3, 
  TrendingUp, Layers, Building2, PieChart, Radio, FileCheck2, FolderGit2, HelpCircle, 
  X, Printer, Upload, RefreshCw, Send, Clock, Plus, ArrowRight, ArrowLeft, Sun, Moon, Menu, Check, UserCheck, Eye, Trash2, Edit3, Filter, FileSpreadsheet, Share2, AlertCircle, Bookmark, ExternalLink, Bot, Swords, GitCompare, FileCode, CheckCheck, Lightbulb, Paperclip, MessageCircle, FileUp, Camera, Image as ImageIcon
} from 'lucide-react';

// =====================================================================
// 1. DATOS MAESTROS Y MOCKS DE DEMOSTRACIÓN
// =====================================================================

const MOCK_TABLERO = [
  { 
    id: "EXP-01", 
    titulo: "Intimación legal por vías de hecho y retención de 3 montacargas", 
    cliente: "Machtig Rothe, C.A.", 
    tipo_rol: "Externo",
    materia: "Inquilinario", 
    responsable: "Barbara Piccolo", 
    plazo: "Hoy 16:00", 
    prioridad: "Crítica", 
    estado: "Por Iniciar",
    bloqueo: "Revisión Jurídica",
    bloqueo_tipo: "interno",
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
    tipo_rol: "In-House",
    materia: "LegalTech", 
    responsable: "Barbara Piccolo", 
    plazo: "Viernes 17:00", 
    prioridad: "Alta", 
    estado: "En Tramitación",
    bloqueo: "En Curso",
    bloqueo_tipo: "ninguno",
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
    tipo_rol: "Externo",
    materia: "Auditoría Forense", 
    responsable: "Equipo Auditor", 
    plazo: "Lunes 10:00", 
    prioridad: "Media", 
    estado: "En Tramitación",
    bloqueo: "Esperando Facturas Tercero",
    bloqueo_tipo: "externo",
    cuantia: "128.000 USD",
    tribunal: "Auditoría Interna / Sede Guasipati",
    detalles: "Levantamiento físico de inventario de repuestos, cotejo de libros diarios y conciliación de facturas con 14 proveedores críticos.",
    bitacora: [
      { fecha: "18/09/2026", nota: "Cierre de toma física de inventario en almacén central." }
    ]
  }
];

const MOCK_CLIENTES = [
  {
    id: "CLI-01",
    nombre: "Machtig Rothe, C.A.",
    tipo: "Externo",
    rif: "J-40192834-0",
    apoderado: "Carlos Mendoza (Director de Operaciones)",
    cedula_apoderado: "V-14.502.839",
    email: "carlos.mendoza@machtigrothe.com",
    telefono: "+58 414-862-3344",
    domicilio: "Puerto Ordaz, Estado Bolívar",
    asuntos_activos: 2,
    estado: "Activo",
    materia_principal: "Inquilinario Comercial & Maquinaria",
    facultades_junta: "Vence Noviembre 2027 (Vigente)",
    facultades_poder: "Alerta: Requiere ratificación notarial (vence en 45 días)",
    facultades_estado: "alerta"
  },
  {
    id: "CLI-02",
    nombre: "Corein, C.A.",
    tipo: "Externo",
    rif: "J-30492817-2",
    apoderado: "Roberto Gómez (Presidente)",
    cedula_apoderado: "V-11.238.991",
    email: "presidencia@corein.com",
    telefono: "+58 424-915-2200",
    domicilio: "Guasipati, Estado Bolívar",
    asuntos_activos: 1,
    estado: "Retainer",
    materia_principal: "Auditoría Mercantil & Deuda",
    facultades_junta: "Vigente hasta Marzo 2028",
    facultades_poder: "Poder General Amplio Notariado Vigente",
    facultades_estado: "vigente"
  },
  {
    id: "CLI-06",
    nombre: "AI GOVERN International S.L. (Filial España)",
    tipo: "Interno",
    rif: "B-88392019",
    apoderado: "Barbara Piccolo (General Counsel)",
    cedula_apoderado: "Representante Permanente",
    email: "barbara@aigovern.space",
    telefono: "+34 910-000-000",
    domicilio: "Paseo de la Castellana, Madrid",
    asuntos_activos: 4,
    estado: "Retainer",
    materia_principal: "Expansión UE & Contratación SaaS",
    facultades_junta: "Consejo de Administración Vigente",
    facultades_poder: "Poder de Representación General eIDAS",
    facultades_estado: "vigente"
  }
];

const MOCK_CALENDARIO = [
  { 
    id: "EV-01", 
    dia: 25, 
    mes: 8, 
    anio: 2026,
    titulo: "Término fatal para contestar intimación de desalojo (Galpón Unare)", 
    cliente: "Machtig Rothe, C.A.", 
    fecha: "25 de Septiembre de 2026", 
    hora: "16:00",
    tipo: "Procesal Perentorio", 
    dias_restantes: "Vencimiento Fatal", 
    nivel: "critico",
    computo: "Días de Despacho (CPC Art. 197)",
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
    computo: "Fijada por Boleta",
    tribunal: "Tribunal Superior en lo Civil"
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
    computo: "Convocatoria Estatutaria",
    tribunal: "Registro Mercantil Segundo"
  }
];

const MOCK_HISTORIAL_COPILOTO = [
  {
    id: "MSG-01",
    remitente: "abogado",
    texto: "Tengo audiencia por intimación de desalojo de galpón comercial. La arrendadora alega falta de pago, pero nosotros retuvimos cánones compensando 15.000 USD de obras estructurales urgentes de techo autorizadas por cruce de correos y fotos, pero sin adenda notariada. Además bloquearon el portón reteniendo 3 montacargas. ¿Cómo desarmamos su demanda y qué defensas oponemos?",
    timestamp: "09:15 AM",
    modo: "estrategia"
  },
  {
    id: "MSG-02",
    remitente: "copiloto",
    texto: `DICTAMEN Y ESTRATEGIA DE DEFENSA LETRADA (SALA DE CASACIÓN CIVIL TSJ / CPC VENEZOLANO):\n\n1. EXCEPCIÓN DE INCUMPLIMIENTO CONTRACTUAL (Art. 1.168 Código Civil):\nNadie puede demandar resolución por falta de pago si previamente incumplió su obligación legal inderogable de procurar el goce pacífico y realizar reparaciones mayores necesarias (Art. 1.585 CC).\n\n2. DOCTRINA DE LOS ACTOS PROPIOS:\nLas autorizaciones emitidas por medios electrónicos vinculan a quien las emite.\n\n3. RECONVENCIÓN / QUERELLA POR VÍAS DE HECHO:\nEl bloqueo del portón y retención de 3 montacargas tipifica justicia por propia mano y eventual retención indebida (Art. 468 Código Penal).`,
    timestamp: "09:16 AM",
    modo: "estrategia"
  }
];

export default function DashboardPage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('copiloto_letrado');
  
  // Estado de Secciones Desplegables en Sidebar
  const [openSections, setOpenSections] = useState({
    cerebro: true,
    despacho: true,
    gabinete: true,
    cumplimiento: true
  });

  const toggleSection = (s: 'cerebro' | 'despacho' | 'gabinete' | 'cumplimiento') => {
    setOpenSections(prev => ({ ...prev, [s]: !prev[s] }));
  };

  // =========================================================================
  // GESTIÓN DEL DESPACHO: ESTADOS Y FUNCIONES
  // =========================================================================
  
  // 1. PLANIFICADOR
  const [filtroRolPlanificador, setFiltroRolPlanificador] = useState<'Todos' | 'In-House' | 'Externo'>('Todos');
  const [filtroMateriaPlanificador, setFiltroMateriaPlanificador] = useState('Todas');
  const [buscarPlanificador, setBuscarPlanificador] = useState('');
  const [vistaPlanificador, setVistaPlanificador] = useState<'kanban' | 'lista'>('kanban');
  const [tableroPlanificador, setTableroPlanificador] = useState<any[]>(MOCK_TABLERO);
  const [modalNuevoAsunto, setModalNuevoAsunto] = useState(false);
  const [modalVerExpediente, setModalVerExpediente] = useState<any>(null);

  const [nuevoAsuntoForm, setNuevoAsuntoForm] = useState({
    titulo: '', cliente: 'Machtig Rothe, C.A.', tipo_rol: 'Externo' as 'In-House' | 'Externo', materia: 'Inquilinario', responsable: 'Barbara Piccolo', plazo: 'Próxima semana', prioridad: 'Alta', bloqueo: 'En Curso', bloqueo_tipo: 'ninguno', cuantia: '', tribunal: '', detalles: '', estado: 'Por Iniciar'
  });

  const agregarNuevoAsunto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoAsuntoForm.titulo) return;
    const nuevo = {
      id: `EXP-0${tableroPlanificador.length + 1}`,
      titulo: nuevoAsuntoForm.titulo, cliente: nuevoAsuntoForm.cliente, tipo_rol: nuevoAsuntoForm.tipo_rol, materia: nuevoAsuntoForm.materia, responsable: nuevoAsuntoForm.responsable, plazo: nuevoAsuntoForm.plazo || 'Por definir', prioridad: nuevoAsuntoForm.prioridad, estado: nuevoAsuntoForm.estado, bloqueo: nuevoAsuntoForm.bloqueo, bloqueo_tipo: nuevoAsuntoForm.bloqueo.includes('Esperando') ? 'externo' : nuevoAsuntoForm.bloqueo.includes('Revisión') ? 'interno' : 'ninguno', cuantia: nuevoAsuntoForm.cuantia || 'Por cuantificar', tribunal: nuevoAsuntoForm.tribunal || 'Despacho Extrajudicial / Sede Principal', detalles: nuevoAsuntoForm.detalles || 'Expediente dado de alta en el sistema del despacho.',
      bitacora: [{ fecha: "28/09/2026", nota: "Apertura del expediente en el Planificador por Dirección Letrada." }]
    };
    setTableroPlanificador([nuevo, ...tableroPlanificador]);
    setNuevoAsuntoForm({ titulo: '', cliente: 'Machtig Rothe, C.A.', tipo_rol: 'Externo', materia: 'Inquilinario', responsable: 'Barbara Piccolo', plazo: 'Próxima semana', prioridad: 'Alta', bloqueo: 'En Curso', bloqueo_tipo: 'ninguno', cuantia: '', tribunal: '', detalles: '', estado: 'Por Iniciar' });
    setModalNuevoAsunto(false);
  };

  const moverEstadoAsunto = (id: string, nuevoEstado: string) => {
    setTableroPlanificador(prev => prev.map(item => item.id === id ? { ...item, estado: nuevoEstado } : item));
    if (modalVerExpediente && modalVerExpediente.id === id) setModalVerExpediente((prev: any) => ({ ...prev, estado: nuevoEstado }));
  };

  const eliminarAsunto = (id: string) => {
    if (confirm("¿Desea archivar y retirar este asunto del planificador?")) {
      setTableroPlanificador(prev => prev.filter(i => i.id !== id));
      setModalVerExpediente(null);
    }
  };

  // 2. CRM LEGAL
  const [clienteVerFichaModal, setClienteVerFichaModal] = useState<any>(null);
  const [clientes, setClientes] = useState<any[]>(MOCK_CLIENTES);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "", tipo: "Externo" as 'Interno' | 'Externo', rif: "", apoderado: "", cedula_apoderado: "", email: "", telefono: "", domicilio: "", materia_principal: "Corporativo"
  });

  const registrarNuevoCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoCliente.nombre) return;
    const item = {
      id: `CLI-${Date.now().toString().slice(-4)}`, nombre: nuevoCliente.nombre, tipo: nuevoCliente.tipo, rif: nuevoCliente.rif || "S/R", apoderado: nuevoCliente.apoderado || "Por designar", cedula_apoderado: nuevoCliente.cedula_apoderado || "V-00.000.000", email: nuevoCliente.email || "contacto@cliente.com", telefono: nuevoCliente.telefono || "N/A", domicilio: nuevoCliente.domicilio || "Domicilio comercial principal", asuntos_activos: 1, estado: "Activo", materia_principal: nuevoCliente.materia_principal, facultades_junta: "Registrada en Constitución", facultades_poder: "Vigente", facultades_estado: "vigente"
    };
    setClientes([item, ...clientes]);
    setNuevoCliente({ nombre: "", tipo: "Externo", rif: "", apoderado: "", cedula_apoderado: "", email: "", telefono: "", domicilio: "", materia_principal: "Corporativo" });
  };

  // 3. CALENDARIO PROCESAL
  const [vistaCalendario, setVistaCalendario] = useState<'mes' | 'agenda'>('mes');
  const [tipoComputoPlazo, setTipoComputoPlazo] = useState<'continuos' | 'despacho'>('despacho');
  const [mesActualIndex, setMesActualIndex] = useState(8);
  const [anioActual, setAnioActual] = useState(2026);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(28);
  const [modalNuevoEvento, setModalNuevoEvento] = useState(false);
  const mesesNombres = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const [eventosCalendario, setEventosCalendario] = useState<any[]>(MOCK_CALENDARIO);
  const [nuevoEventoForm, setNuevoEventoForm] = useState({
    titulo: '', cliente: 'Machtig Rothe, C.A.', fecha: '2026-09-30', hora: '10:00', tipo: 'Procesal Perentorio', nivel: 'urgente', computo: 'Días de Despacho (CPC)', tribunal: ''
  });

  const agregarNuevoEventoCalendario = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoEventoForm.titulo) return;
    const fParts = nuevoEventoForm.fecha.split('-');
    const anio = parseInt(fParts[0]); const mes = parseInt(fParts[1]) - 1; const dia = parseInt(fParts[2]);
    const nuevo = {
      id: `EV-${Date.now().toString().slice(-4)}`, dia, mes, anio, titulo: nuevoEventoForm.titulo, cliente: nuevoEventoForm.cliente, fecha: `${dia} de ${mesesNombres[mes]} de ${anio}`, hora: nuevoEventoForm.hora || '09:00', tipo: nuevoEventoForm.tipo, dias_restantes: "Programado", nivel: nuevoEventoForm.nivel, computo: nuevoEventoForm.computo, tribunal: nuevoEventoForm.tribunal || 'Despacho Judicial / Notarial'
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

  const exportarCalendarioICS = () => {
    let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//AI GOVERN//Legal OS Calendar//ES\nCALSCALE:GREGORIAN\nMETHOD:PUBLISH\n";
    eventosCalendario.forEach(ev => {
      const mesStr = (ev.mes + 1).toString().padStart(2, '0');
      const diaStr = ev.dia.toString().padStart(2, '0');
      const horaStr = ev.hora ? ev.hora.replace(':', '') + '00' : '090000';
      icsContent += `BEGIN:VEVENT\nUID:${ev.id}@aigovern.space\nSUMMARY:[${ev.cliente}] ${ev.titulo}\nDESCRIPTION:Tipo: ${ev.tipo}\\nTribunal: ${ev.tribunal}\\nCómputo: ${ev.computo}\nDTSTART:${ev.anio}${mesStr}${diaStr}T${horaStr}\nDTEND:${ev.anio}${mesStr}${diaStr}T180000\nSTATUS:CONFIRMED\nEND:VEVENT\n`;
    });
    icsContent += "END:VCALENDAR";

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Agenda_Procesal_Piccolo_2026.ics`;
    link.click();
    URL.revokeObjectURL(url);
    alert("Archivo .ics generado con éxito. Listo para importar en Google Calendar, Apple Calendar o Outlook.");
  };

  // 4. ACTAS Y MINUTAS
  const [grabandoAudioLocal, setGrabandoAudioLocal] = useState(false);
  const [segundosGrabacion, setSegundosGrabacion] = useState(0);
  const [audioUrlLocal, setAudioUrlLocal] = useState<string | null>(null);
  const [archivoAudioNombre, setArchivoAudioNombre] = useState<string | null>(null);
  const [cargandoTranscripcionWhisper, setCargandoTranscripcionWhisper] = useState(false);
  const [mostrarTranscripcionCruda, setMostrarTranscripcionCruda] = useState(false);
  const mediaRecorderRef = useRef<any>(null);
  const chunksRef = useRef<any[]>([]);
  const [minutaWhisper, setMinutaWhisper] = useState<any>(null);

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
          if (mediaRecorderRef.current.stream) mediaRecorderRef.current.stream.getTracks().forEach((track: any) => track.stop());
        } catch (e) {}
      }
      setGrabandoAudioLocal(false);
    } else {
      setSegundosGrabacion(0); chunksRef.current = [];
      try {
        if (typeof window !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const recorder = new (window as any).MediaRecorder(stream);
          recorder.ondataavailable = (e: any) => { if (e.data && e.data.size > 0) chunksRef.current.push(e.data); };
          recorder.onstop = () => {
            const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
            const url = URL.createObjectURL(blob);
            setAudioUrlLocal(url); setArchivoAudioNombre("grabacion_reunion_sala.webm");
            procesarGeneracionMinuta("grabacion_reunion_sala.webm");
          };
          recorder.start(); mediaRecorderRef.current = recorder; setGrabandoAudioLocal(true);
        } else {
          setGrabandoAudioLocal(true);
          setTimeout(() => {
            setGrabandoAudioLocal(false); setArchivoAudioNombre("sesion_grabada_sala.webm"); procesarGeneracionMinuta("sesion_grabada_sala.webm");
          }, 4000);
        }
      } catch (err) { setGrabandoAudioLocal(true); }
    }
  };

  const handleSubirArchivoAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setArchivoAudioNombre(file.name); setAudioUrlLocal(URL.createObjectURL(file));
      procesarGeneracionMinuta(file.name);
    }
  };

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
        participantes: ["Barbara Piccolo (Socia Directora)", "Directores y Partes Interesadas en Sala"],
        transcripcion_extracto: "«...Habiéndose escuchado los puntos del debate y analizado los riesgos contractuales y procesales, las partes convienen en acatar los términos de la propuesta jurídica para evitar litigio judicial...»",
        acuerdos: ["Acuerdo vinculante formalizado con reserva de acciones legales.", "Estipulación de cumplimiento en plazo de cuarenta y ocho (48) horas.", "Custodia probatoria de la presente grabación en bóveda inmutable."],
        action_items: [
          { id: `ACT-${Date.now().toString().slice(-3)}-1`, tarea: "Elaborar documento resolutivo y remitir al Planificador", responsable: "Barbara Piccolo", plazo: "Mañana 16:00", prioridad: "Crítica", agregado: false },
          { id: `ACT-${Date.now().toString().slice(-3)}-2`, tarea: "Notificar formalmente a los accionistas", responsable: "Secretaría Legal", plazo: "Viernes", prioridad: "Alta", agregado: false }
        ]
      });
      setCargandoTranscripcionWhisper(false);
    }, 1200);
  };

  const asignarActionItemAPlanificador = (item: any) => {
    const nuevoAsunto = {
      id: `EXP-MIN-${Date.now().toString().slice(-3)}`, titulo: item.tarea, cliente: "Machtig Rothe, C.A.", tipo_rol: "Externo", materia: "Compromiso de Minuta", responsable: item.responsable, plazo: item.plazo, prioridad: item.prioridad, estado: "En Tramitación", bloqueo: "En Curso", bloqueo_tipo: "ninguno", cuantia: "Derivada de Acuerdo", tribunal: "Compromiso de Sala Certificada", detalles: `Tarea generada a partir de los acuerdos de la sesión.`, bitacora: []
    };
    setTableroPlanificador([nuevoAsunto, ...tableroPlanificador]);
    setMinutaWhisper((prev: any) => ({ ...prev, action_items: prev.action_items.map((ai: any) => ai.id === item.id ? { ...ai, agregado: true } : ai) }));
    alert(`Acuerdo asignado con éxito al Planificador: "${item.tarea}"`);
  };

  const copiarCorreoFormalizacionAcuerdos = () => {
    if(!minutaWhisper) return;
    const mailText = `Asunto: FORMALIZACIÓN DE ACUERDOS - ${minutaWhisper.titulo}\nPara: ${minutaWhisper.participantes.join('; ')}\nFecha: ${minutaWhisper.fecha}\n\nEstimados Directores y Representantes:\n\nDe conformidad con la sesión celebrada hoy, por medio del presente correo dejo formalmente asentados los acuerdos vinculantes acordados por las partes para su ejecución inmediata:\n\nACUERDOS VINCULANTES ADOPTADOS:\n${minutaWhisper.acuerdos.map((a: string, i: number) => `${i + 1}. ${a}`).join('\n')}\n\nMATRIZ DE COMPROMISOS Y PLAZOS FATALES:\n${minutaWhisper.action_items.map((ai: any) => `• [${ai.prioridad}] ${ai.tarea} | Responsable: ${ai.responsable} | Plazo: ${ai.plazo}`).join('\n')}\n\nGrabación de sala bajo sello criptográfico SHA-256 (${minutaWhisper.hash_sha256.slice(0, 16)}...) en Bóveda Soberana.\n\nAtentamente,\nBARBARA PICCOLO | General Counsel`;
    navigator.clipboard.writeText(mailText);
    alert("Correo copiado al portapapeles.");
  };

  // 5. MÉTRICAS DEL DESPACHO
  const [metricasDespacho] = useState({
    valor_aportado_usd: "148.000 USD", contingencias_ahorradas_usd: "24.500 USD", facturacion_mes_usd: "22.350 USD", tasa_eficiencia_tiempo: "82% Reducción ciclo revisión (de 5 días a 18 horas)"
  });

  const descargarInformeEjecutivoSemanal = () => {
    const reportText = `INFORME EJECUTIVO SEMANAL - DIRECCIÓN JURÍDICA\nDESPACHO PICCOLO & ASOCIADOS / AI GOVERN\n\n1. RESUMEN DE GESTIÓN Y VALOR APORTADO\n- Valor económico desbloqueado: ${metricasDespacho.valor_aportado_usd}\n- Contingencias prevenidas: ${metricasDespacho.contingencias_ahorradas_usd}\n- Asuntos activos en tramitación: ${tableroPlanificador.length}`;
    const blob = new Blob([reportText], { type: 'application/msword;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Informe_Ejecutivo.doc`;
    link.click();
  };

  // =========================================================================
  // CEREBRO JURÍDICO IA: ESTADOS Y FUNCIONES
  // =========================================================================

  // 1. COPILOTO JURÍDICO & ESTRATEGIA
  const [modoCopiloto, setModoCopiloto] = useState<'estrategia' | 'casacion' | 'forense'>('estrategia');
  const [inputCopiloto, setInputCopiloto] = useState('');
  const [cargandoCopiloto, setCargandoCopiloto] = useState(false);
  const [historialCopiloto, setHistorialCopiloto] = useState<any[]>(MOCK_HISTORIAL_COPILOTO);

  const enviarConsultaCopiloto = (textoCustom?: string, modoCustom?: string) => {
    const texto = textoCustom || inputCopiloto;
    const modo = modoCustom || modoCopiloto;
    if (!texto.trim()) return;

    const nuevoMsgUsuario = { id: `MSG-${Date.now()}-U`, remitente: "abogado", texto: texto, timestamp: "Ahora", modo: modo };
    setHistorialCopiloto(prev => [...prev, nuevoMsgUsuario]);
    setInputCopiloto('');
    setCargandoCopiloto(true);

    setTimeout(() => {
      let respuestaIA = "";
      if (modo === 'estrategia') {
        respuestaIA = `🥊 CONTRAARGUMENTOS DE LA CONTRAPARTE (MODO ESTRATEGIA):\n\nComo abogado de la contraparte, atacaría tu postura por los siguientes 3 flancos:\n1. Ausencia de Formalidad Notarial: Alegaré que el contrato original en su Cláusula de Modificaciones exige adenda escrita y protocolizada ante Notaría.\n2. Falta de Notificación Judicial Previa de Ruina.\n3. Desvirtuación de Vías de Hecho.\n\n🛡️ CÓMO BLINDARTE: Debes consignar hoy mismo el informe pericial de ingeniería.`;
      } else if (modo === 'casacion') {
        respuestaIA = `⚖️ ANÁLISIS DE CUESTIONES PREVIAS Y RECURSO DE CASACIÓN:\n\n1. Cuestión Previa del Ordinal 6° Art. 346 CPC (Defecto de Forma en el Libelo).\n2. Cuestión Previa del Ordinal 11° Art. 346 CPC.\n3. Doctrina TSJ aplicable: Sentencia N° 451 de la Sala de Casación Civil.`;
      } else {
        respuestaIA = `🔍 DICTAMEN FORENSE:\n\nSe detectaron contradicciones en los folios 34 y 35 del expediente relativas a la fecha cierta de notificación.`;
      }

      const nuevoMsgIA = { id: `MSG-${Date.now()}-IA`, remitente: "copiloto", texto: respuestaIA, timestamp: "Ahora", modo: modo };
      setHistorialCopiloto(prev => [...prev, nuevoMsgIA]);
      setCargandoCopiloto(false);
    }, 800);
  };

  // 2. ANALIZADOR UNIVERSAL & DIFF
  const [subTabAnalizador, setSubTabAnalizador] = useState<'analisis_archivo' | 'diff_contractual'>('analisis_archivo');
  const [textoDocumentoAnalizar, setTextoDocumentoAnalizar] = useState(
`CONTRATO DE LICENCIA DE SOFTWARE Y SERVICIOS PROFESIONALES (PROPUESTA CONTRAPARTE)
CLÁUSULA PRIMERA: El Proveedor otorgará una licencia exclusiva a favor de la Contraparte sobre todos los algoritmos desarrollados.
CLÁUSULA SEGUNDA: El Proveedor indemnizará a la Contraparte sin límite cuantitativo ni temporal por cualquier reclamo, incluyendo lucro cesante y daños consecuenciales indirectos.`
  );
  const [nombreArchivoSubido, setNombreArchivoSubido] = useState<string>("contrato_propuesta_contraparte.docx");
  const [cargandoAnalisisUniversal, setCargandoAnalisisUniversal] = useState(false);
  const [resultadoAnalisisUniversal, setResultadoAnalisisUniversal] = useState<any>(null);

  const [textoDiffVersionA, setTextoDiffVersionA] = useState(`CLÁUSULA 5 (MANTENIMIENTO): LA ARRENDADORA podrá inspeccionar semestralmente el inmueble previa notificación escrita de 15 días.`);
  const [textoDiffVersionB, setTextoDiffVersionB] = useState(`CLÁUSULA 5 (MANTENIMIENTO): LA ARRENDATARIA deberá realizar todas las obras estructurales de mantenimiento mayor sin necesidad de notificación previa.`);
  const [cargandoDiff, setCargandoDiff] = useState(false);
  const [resultadoDiff, setResultadoDiff] = useState<any[]>([]);

  const procesarSubidaArchivoUniversal = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNombreArchivoSubido(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) setTextoDocumentoAnalizar(content.slice(0, 15000));
      };
      reader.readAsText(file);
    }
  };

  const ejecutarAnalisisUniversal = (nombre: string, textoFuente: string) => {
    setCargandoAnalisisUniversal(true);
    setTimeout(() => {
      setResultadoAnalisisUniversal({
        archivo: nombre,
        focos_rojos: [
          {
            clausula: "Cláusula de Responsabilidad Patrimonial",
            cita: "«...indemnizará sin límite cuantitativo ni temporal...»",
            riesgo: "Riesgo patrimonial catastrófico que expone el capital de la sociedad.",
            redline: "«La responsabilidad total acumulada se limitará estrictamente al monto total efectivamente facturado en los últimos doce (12) meses. Se excluye el lucro cesante.»"
          }
        ]
      });
      setCargandoAnalisisUniversal(false);
    }, 600);
  };

  const ejecutarComparacionDiff = () => {
    setCargandoDiff(true);
    setTimeout(() => {
      setResultadoDiff([
        {
          clausula: "Cláusula 5: Mantenimiento y Cargas",
          cambio: "Inversión de la carga de obras mayores hacia el arrendatario.",
          impacto: "Lesión patrimonial severa frente al régimen general del Código Civil.",
          nivel: "critico"
        }
      ]);
      setCargandoDiff(false);
    }, 500);
  };

  // 3. REDACTOR DE INSTRUMENTOS
  const [tipoEscritoRedactar, setTipoEscritoRedactar] = useState('contestacion_desalojo');
  const [clienteRedactor, setClienteRedactor] = useState('Machtig Rothe, C.A.');
  const [tribunalRedactor, setTribunalRedactor] = useState('Juzgado Segundo de Primera Instancia en lo Civil y Mercantil de Puerto Ordaz');
  const [instruccionesRedactor, setInstruccionesRedactor] = useState("El cliente fue intimado extrajudicialmente para desalojar en 48 horas. Queremos oponer la excepción de compensación de mejoras de 15.000 USD...");
  const [cargandoEscrito, setCargandoEscrito] = useState(false);
  const [escritoGeneradoCompleto, setEscritoGeneradoCompleto] = useState("");

  const generarEscritoLetrado = () => {
    setCargandoEscrito(true);
    setTimeout(() => {
      setEscritoGeneradoCompleto(`CIUDADANO\nJUEZ SEGUNDO DE PRIMERA INSTANCIA EN LO CIVIL Y MERCANTIL DE LA CIRCUNSCRIPCIÓN JUDICIAL DEL ESTADO BOLÍVAR\nSU DESPACHO.-\n\nYo, BARBARA ISABEL PICCOLO OBALDO, abogada en ejercicio, inscrita en el Instituto de Previsión Social del Abogado (IPSA) bajo el N° 102.485, actuando en mi carácter de apoderada judicial de la sociedad mercantil ${clienteRedactor}...`);
      setCargandoEscrito(false);
    }, 800);
  };

  const descargarEscritoWord = () => {
    if(!escritoGeneradoCompleto) return;
    const blob = new Blob([escritoGeneradoCompleto], { type: 'application/msword;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Escrito_${tipoEscritoRedactar}.doc`;
    link.click();
  };

  // =========================================================================
  // CUMPLIMIENTO Y GOBERNANZA: ESTADOS Y FUNCIONES
  // =========================================================================
  const [subTabCumplimiento, setSubTabCumplimiento] = useState<'aduana' | 'boveda' | 'canal_etico' | 'societario'>('aduana');

  // 1. Aduana PII
  const [aduanaTextoOriginal, setAduanaTextoOriginal] = useState('');
  const [aduanaTextoAnonimizado, setAduanaTextoAnonimizado] = useState('');
  const [aduanaEntidadesDetectadas, setAduanaEntidadesDetectadas] = useState<any[]>([]);

  // 2. Bóveda
  const [bovedaTitulo, setBovedaTitulo] = useState('');
  const [bovedaContenido, setBovedaContenido] = useState('');
  const [bovedaRegistros, setBovedaRegistros] = useState<any[]>([]);
  const [bovedaVerificacionResultado, setBovedaVerificacionResultado] = useState<string | null>(null);

  // 3. Canal Ético
  const [canalEticoModalNuevo, setCanalEticoModalNuevo] = useState(false);
  const [canalEticoCasos, setCanalEticoCasos] = useState<any[]>([]);
  const [nuevoCasoEth, setNuevoCasoEth] = useState({ categoria: "Conflicto de Interés", titulo: "", denunciante: "Anónimo", severidad: "Media", descripcion: "" });

  // 4. Libros Societarios
  const [libroSocietarioSubTab, setLibroSocietarioSubTab] = useState<'accionistas' | 'actas'>('accionistas');
  const [accionistas, setAccionistas] = useState<any[]>([]);
  const [modalTraspasoAcciones, setModalTraspasoAcciones] = useState(false);
  const [traspasoForm, setTraspasoForm] = useState({ cedenteId: 1, cesionarioNombre: "", cesionarioRif: "", cantidadAcciones: 5000, precioOperacion: "5.000 USD" });
  const [actasSocietarias, setActasSocietarias] = useState<any[]>([]);

  // Función de Demo Global
  const cargarDatosDemostracionCompletos = () => {
    setTableroPlanificador(MOCK_TABLERO);
    setClientes(MOCK_CLIENTES);
    setEventosCalendario(MOCK_CALENDARIO);
    setHistorialCopiloto(MOCK_HISTORIAL_COPILOTO);
    setAccionistas([
      { id: 1, nombre: "Barbara Piccolo", cedula: "V-12345678", acciones: 50000, porcentaje: 50, estado: "Pagado", presente: true },
      { id: 2, nombre: "Carlos Mendoza", cedula: "V-87654321", acciones: 50000, porcentaje: 50, estado: "Pagado", presente: true }
    ]);
  };

  const limpiarDespachoModoMinimalista = () => {
    setTableroPlanificador([]);
    setClientes([]);
    setEventosCalendario([]);
    setHistorialCopiloto([]);
    setAccionistas([]);
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans transition-colors duration-200 ${isDark ? 'bg-[#080c14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'}`}>

      {/* =================================================================== */}
      {/* BARRA LATERAL (SIDEBAR DE CONTROL LETRADO)                          */}
      {/* =================================================================== */}
      <aside className={`hidden md:flex transition-all duration-300 border-r flex-col justify-between z-30 shrink-0 ${sidebarOpen ? 'w-64' : 'w-20'} ${isDark ? 'bg-[#080c14] border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'}`}>
        
        <div className="p-4 border-b border-slate-800/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-md">
              <Scale className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col truncate">
                <span className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
                  AI GOVERN <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400/90 tracking-wider uppercase">Legal OS</span>
              </div>
            )}
          </div>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg border border-slate-800 text-slate-400">
            {sidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3 text-xs font-medium">
          
          {/* SECCIÓN 1: CEREBRO JURÍDICO (IA) */}
          <div className="space-y-1">
            {sidebarOpen ? (
              <button onClick={() => toggleSection('cerebro')} className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase text-cyan-400 hover:bg-slate-900/60 transition">
                <div className="flex items-center gap-2"><Sparkles className="w-3.5 h-3.5" /><span>Cerebro Jurídico (IA)</span></div>
                {openSections.cerebro ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (<div className="flex justify-center py-1"><Sparkles className="w-4 h-4 text-cyan-400" /></div>)}

            {(openSections.cerebro || !sidebarOpen) && (
              <div className="space-y-1">
                {[
                  { id: 'copiloto_letrado', label: 'Copiloto & Sparring IA', icon: Bot, badge: 'RAG' },
                  { id: 'analizador_universal', label: 'Analizador Forense & Diff', icon: GitCompare, badge: 'Cotejo' },
                  { id: 'redactor_medida', label: 'Redactor de Instrumentos', icon: FileCode, badge: 'Solemne' }
                ].map(item => (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${activeTab === item.id ? 'bg-cyan-500/20 text-cyan-300 font-bold border border-cyan-500/40' : 'text-slate-400 hover:bg-slate-900/80'}`}>
                    <div className="flex items-center gap-2.5 truncate"><item.icon className="w-4 h-4 shrink-0" />{sidebarOpen && <span>{item.label}</span>}</div>
                    {sidebarOpen && <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">{item.badge}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SECCIÓN 2: GESTIÓN DEL DESPACHO */}
          <div className="space-y-1">
            {sidebarOpen ? (
              <button onClick={() => toggleSection('despacho')} className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase text-slate-400 hover:bg-slate-900/60 transition">
                <div className="flex items-center gap-2"><Layers className="w-3.5 h-3.5 text-blue-400" /><span>Gestión Operativa</span></div>
                {openSections.despacho ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (<div className="flex justify-center py-1"><Layers className="w-4 h-4 text-blue-400" /></div>)}

            {(openSections.despacho || !sidebarOpen) && (
              <div className="space-y-1">
                {[
                  { id: 'planificador', label: 'Planificador de Asuntos', icon: Layers },
                  { id: 'crm', label: 'Directorio CRM Legal', icon: Users },
                  { id: 'calendario', label: 'Calendario Procesal', icon: Clock },
                  { id: 'metricas', label: 'Rendimiento & FinOps', icon: BarChart3 }
                ].map(item => (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${activeTab === item.id ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900/80'}`}>
                    <item.icon className={`w-4 h-4 shrink-0 ${activeTab === item.id ? 'text-cyan-400' : 'text-slate-400'}`} />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SECCIÓN 3: GABINETE & TALLER */}
          <div className="space-y-1">
            {sidebarOpen ? (
              <button onClick={() => toggleSection('gabinete')} className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase text-slate-400 hover:bg-slate-900/60 transition">
                <div className="flex items-center gap-2"><Mic className="w-3.5 h-3.5 text-purple-400" /><span>Taller & Minutas</span></div>
                {openSections.gabinete ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (<div className="flex justify-center py-1"><Mic className="w-4 h-4 text-purple-400" /></div>)}

            {(openSections.gabinete || !sidebarOpen) && (
              <div className="space-y-1">
                {[
                  { id: 'actas_minutas', label: 'Grabador & Minutas', icon: Mic }
                ].map(item => (
                  <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${activeTab === item.id ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-900/80'}`}>
                    <item.icon className={`w-4 h-4 shrink-0 ${activeTab === item.id ? 'text-cyan-400' : 'text-slate-400'}`} />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SECCIÓN 4: CUMPLIMIENTO & GOBIERNO */}
          <div className="space-y-1">
            {sidebarOpen ? (
              <button onClick={() => toggleSection('cumplimiento')} className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[10px] font-bold font-mono uppercase text-emerald-400 hover:bg-slate-900/60 transition">
                <div className="flex items-center gap-2"><Shield className="w-3.5 h-3.5 text-emerald-400" /><span>Cumplimiento Corporativo</span></div>
                {openSections.cumplimiento ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (<div className="flex justify-center py-1"><Shield className="w-4 h-4 text-emerald-400" /></div>)}

            {(openSections.cumplimiento || !sidebarOpen) && (
              <div className="space-y-1">
                {[
                  { id: 'aduana', label: 'Aduana & Privacidad PII', icon: Shield },
                  { id: 'boveda', label: 'Bóveda Forense SHA-256', icon: Lock },
                  { id: 'canal_etico', label: 'Canal Ético & Denuncias', icon: Radio },
                  { id: 'societario', label: 'Libros Societarios', icon: Building2 }
                ].map(item => {
                  const active = (activeTab === 'cumplimiento' && subTabCumplimiento === item.id) || activeTab === item.id;
                  return (
                    <button key={item.id} onClick={() => { setSubTabCumplimiento(item.id as any); setActiveTab('cumplimiento'); }} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${active ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40' : 'text-slate-400 hover:bg-slate-900/80'}`}>
                      <item.icon className={`w-4 h-4 shrink-0 ${active ? 'text-emerald-400' : 'text-slate-400'}`} />
                      {sidebarOpen && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        <div className="p-3 border-t border-slate-800/40">
          <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shrink-0">BP</div>
            {sidebarOpen && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-xs">Barbara Piccolo</span>
                <span className="text-[10px] text-slate-400">Abogada Directora & GC</span>
              </div>
            )}
          </div>
        </div>

      </aside>

      {/* =================================================================== */}
      {/* CONTENIDO PRINCIPAL                                                 */}
      {/* =================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        <header className="h-14 border-b px-6 flex items-center justify-between shrink-0 bg-[#080c14] border-slate-800/80 z-20">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-xl border border-slate-800 text-cyan-400"><Menu className="w-5 h-5" /></button>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 uppercase tracking-wider">DESPACHO</span>
              <span className="text-slate-600">/</span>
              <span className="font-bold text-cyan-400 capitalize">{activeTab.replace('_', ' ')}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => tableroPlanificador.length > 0 ? limpiarDespachoModoMinimalista() : cargarDatosDemostracionCompletos()}
              className="px-3 py-1.5 rounded-xl border border-cyan-500/40 bg-cyan-500/10 text-cyan-300 text-[11px] font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{tableroPlanificador.length > 0 ? "Limpiar Despacho" : "Cargar Demo"}</span>
            </button>
            <button onClick={() => setTheme(isDark ? 'light' : 'dark')} className="p-2 rounded-xl border border-slate-800 text-amber-400"><Sun className="w-4 h-4" /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 md:p-8 pb-24 md:pb-8 space-y-6">

          {/* ================================================================= */}
          {/* CEREBRO JURÍDICO 1: COPILOTO & SPARRING                           */}
          {/* ================================================================= */}
          {activeTab === 'copiloto_letrado' && (
            <div className="space-y-5 max-w-5xl mx-auto h-full flex flex-col">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2"><Bot className="w-6 h-6 text-cyan-400" /> Copiloto Jurídico & Sparring</h1>
                  <p className="text-xs mt-1 text-slate-400">Debate estratégico, análisis de cuestiones previas y sparring procesal.</p>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs">
                  <button onClick={() => setModoCopiloto('estrategia')} className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${modoCopiloto === 'estrategia' ? 'bg-red-500/25 border-red-500/50 text-red-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}><Swords className="w-3.5 h-3.5" /> Sparring</button>
                  <button onClick={() => setModoCopiloto('casacion')} className={`px-3 py-1.5 rounded-xl border flex items-center gap-1.5 ${modoCopiloto === 'casacion' ? 'bg-cyan-500/25 border-cyan-500/50 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'}`}><Scale className="w-3.5 h-3.5" /> CPC</button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 p-4 rounded-2xl border border-slate-800 bg-slate-950/80 min-h-[460px] max-h-[580px]">
                {historialCopiloto.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                    <Bot className="w-16 h-16 text-cyan-400/20" />
                    <h3 className="font-bold text-white">Consola de Inteligencia Jurídica</h3>
                    <p className="text-xs text-slate-400">Inicia un debate procesal o somete tus argumentos a prueba.</p>
                  </div>
                ) : (
                  historialCopiloto.map((msg) => (
                    <div key={msg.id} className={`flex flex-col ${msg.remitente === 'abogado' ? 'items-end' : 'items-start'}`}>
                      <span className="text-[9px] font-mono text-slate-500 mb-1">{msg.timestamp}</span>
                      <div className={`p-4 rounded-2xl text-xs max-w-[88%] whitespace-pre-wrap ${msg.remitente === 'abogado' ? 'bg-slate-800 text-slate-100 rounded-tr-none' : 'bg-slate-900/90 text-slate-200 rounded-tl-none border border-slate-800/80'}`}>
                        {msg.texto}
                      </div>
                    </div>
                  ))
                )}
                {cargandoCopiloto && <div className="text-xs font-mono text-cyan-400 animate-pulse"><RefreshCw className="w-4 h-4 animate-spin inline mr-2" /> Razonando jurisprudencia...</div>}
              </div>

              <div className="flex gap-2">
                <input type="text" value={inputCopiloto} onChange={(e) => setInputCopiloto(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && enviarConsultaCopiloto()} placeholder="Escribe tu argumento..." className="flex-1 p-3 rounded-2xl border border-slate-800 bg-slate-950 text-xs text-white outline-none focus:border-cyan-500" />
                <button onClick={() => enviarConsultaCopiloto()} className="px-5 py-3 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-1.5"><Send className="w-4 h-4" /> Enviar</button>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* CEREBRO JURÍDICO 2: ANALIZADOR UNIVERSAL & DIFF CONTRACTUAL       */}
          {/* ================================================================= */}
          {activeTab === 'analizador_universal' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2"><GitCompare className="w-6 h-6 text-purple-400" /> Analizador Forense & Diff Contractual</h1>
                </div>
                <div className="flex rounded-xl border border-slate-800 bg-slate-950 p-1 text-xs font-mono">
                  <button onClick={() => setSubTabAnalizador('analisis_archivo')} className={`px-3 py-1.5 rounded-lg ${subTabAnalizador === 'analisis_archivo' ? 'bg-purple-500 text-white' : 'text-slate-400'}`}>Auditoría</button>
                  <button onClick={() => setSubTabAnalizador('diff_contractual')} className={`px-3 py-1.5 rounded-lg ${subTabAnalizador === 'diff_contractual' ? 'bg-purple-500 text-white' : 'text-slate-400'}`}>Diff Semántico</button>
                </div>
              </div>

              {subTabAnalizador === 'analisis_archivo' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-4">
                    <label className="p-6 rounded-2xl border-2 border-dashed border-slate-700 hover:border-purple-400 flex flex-col items-center justify-center cursor-pointer">
                      <Upload className="w-8 h-8 text-purple-400 mb-2" />
                      <span className="text-xs font-bold text-white">Subir Archivo (.docx, .pdf)</span>
                      <input type="file" onChange={procesarSubidaArchivoUniversal} className="hidden" />
                    </label>
                    <textarea rows={6} value={textoDocumentoAnalizar} onChange={(e) => setTextoDocumentoAnalizar(e.target.value)} className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs font-mono text-slate-200" />
                    <button onClick={() => ejecutarAnalisisUniversal(nombreArchivoSubido, textoDocumentoAnalizar)} className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-xs flex items-center justify-center gap-2"><Search className="w-4 h-4" /> Analizar Cláusulas</button>
                  </div>
                  
                  {resultadoAnalisisUniversal && (
                    <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-4">
                      <span className="font-bold text-xs text-purple-300 font-mono">Dictamen de Riesgos: {resultadoAnalisisUniversal.archivo}</span>
                      {resultadoAnalisisUniversal.focos_rojos.map((f: any, i: number) => (
                        <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                          <div className="font-bold text-red-400 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> {f.clausula}</div>
                          <div className="p-2 bg-slate-900 rounded italic font-serif">{f.cita}</div>
                          <p className="text-slate-300">{f.riesgo}</p>
                          <div className="p-2 bg-cyan-950/20 border border-cyan-500/30 text-cyan-300 font-mono">Redline: {f.redline}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {subTabAnalizador === 'diff_contractual' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <textarea rows={6} value={textoDiffVersionA} onChange={(e) => setTextoDiffVersionA(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono" />
                    <textarea rows={6} value={textoDiffVersionB} onChange={(e) => setTextoDiffVersionB(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono" />
                  </div>
                  <button onClick={ejecutarComparacionDiff} className="mx-auto block px-6 py-2.5 rounded-xl bg-purple-500 text-white font-bold text-xs"><GitCompare className="inline w-4 h-4 mr-2" /> Comparar</button>
                  {resultadoDiff.length > 0 && (
                    <div className="space-y-2.5">
                      {resultadoDiff.map((d, i) => (
                        <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                          <span className="font-bold text-white block">{d.clausula}</span>
                          <div className="text-[11px] text-amber-300 font-mono">Cambio: {d.cambio}</div>
                          <p className="text-[11px] text-slate-300">{d.impacto}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* CEREBRO JURÍDICO 3: REDACTOR DE INSTRUMENTOS A MEDIDA               */}
          {/* ================================================================= */}
          {activeTab === 'redactor_medida' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800/40">
                <h1 className="text-2xl font-bold flex items-center gap-2"><FileCode className="w-6 h-6 text-emerald-400" /> Redactor de Instrumentos</h1>
                <button onClick={descargarEscritoWord} className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl font-bold text-xs flex items-center gap-2"><Download className="w-4 h-4" /> Word</button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
                  <select value={tipoEscritoRedactar} onChange={e => setTipoEscritoRedactar(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400 font-bold">
                    <option value="contestacion_desalojo">Oposición a Intimación (Desalojo)</option>
                    <option value="querella_despojo">Querella Interdictal de Despojo</option>
                  </select>
                  <textarea rows={6} value={instruccionesRedactor} onChange={e => setInstruccionesRedactor(e.target.value)} className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-slate-200" placeholder="Instrucciones..." />
                  <button onClick={generarEscritoLetrado} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl"><FileCode className="inline w-4 h-4 mr-2" /> Generar Escrito</button>
                </div>
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs h-[400px] overflow-y-auto whitespace-pre-wrap font-serif text-slate-200">
                    {escritoGeneradoCompleto || "El escrito generado aparecerá aquí..."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GESTIÓN OPERATIVA 1: PLANIFICADOR (KANBAN)                        */}
          {/* ================================================================= */}
          {activeTab === 'planificador' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2"><Layers className="w-6 h-6 text-cyan-400" /> Planificador de Asuntos</h1>
                  <p className="text-xs mt-1 text-slate-400">Control de prioridades procesales y dependencias bloqueantes.</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="flex rounded-xl border bg-slate-950 border-slate-800 p-1 text-xs font-mono">
                    <button onClick={() => setVistaPlanificador('kanban')} className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 ${vistaPlanificador === 'kanban' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}>Kanban</button>
                    <button onClick={() => setVistaPlanificador('lista')} className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 ${vistaPlanificador === 'lista' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400'}`}>Lista</button>
                  </div>
                  <button onClick={() => setModalNuevoAsunto(true)} className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2"><Plus className="w-4 h-4" /> Nuevo Asunto</button>
                </div>
              </div>

              {vistaPlanificador === 'kanban' ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  {['Por Iniciar', 'En Tramitación', 'Revisión & Firma', 'Concluido'].map(col => {
                    const items = tableroPlanificador.filter(i => i.estado === col);
                    return (
                      <div key={col} className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 min-h-[400px]">
                        <div className="flex justify-between items-center pb-2.5 border-b border-slate-800/40 text-xs font-bold mb-3">
                          <span className="flex items-center gap-1.5"><span className={`w-2 h-2 rounded-full ${col === 'Por Iniciar' ? 'bg-cyan-400' : 'bg-emerald-400'}`}></span>{col}</span>
                          <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">{items.length}</span>
                        </div>
                        <div className="space-y-2.5">
                          {items.map(t => (
                            <div key={t.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800/90 hover:border-cyan-500/50 space-y-2 text-xs">
                              <div className="flex justify-between text-[10px]"><span className="text-cyan-400 font-extrabold">{t.cliente}</span><span className="bg-purple-500/20 text-purple-300 px-1.5 rounded">{t.tipo_rol}</span></div>
                              <div className="font-bold text-white cursor-pointer hover:text-cyan-300" onClick={() => setModalVerExpediente(t)}>{t.titulo}</div>
                              <div className="text-[10px] text-amber-400 font-mono truncate">Bloqueo: {t.bloqueo}</div>
                              <div className="flex justify-between pt-1.5 border-t border-slate-800/40 text-[10px] text-slate-400">
                                <span>{t.responsable}</span><span className="text-cyan-300 font-bold">{t.plazo}</span>
                              </div>
                              <div className="flex justify-between pt-1 text-[10px] font-mono">
                                <button onClick={() => setModalVerExpediente(t)} className="text-slate-400 hover:text-cyan-300">Ver</button>
                                <div className="flex gap-1">
                                  {col !== 'Por Iniciar' && <button onClick={() => moverEstadoAsunto(t.id, col === 'Concluido' ? 'Revisión & Firma' : col === 'Revisión & Firma' ? 'En Tramitación' : 'Por Iniciar')} className="p-1 bg-slate-800 rounded text-slate-300"><ArrowLeft className="w-3 h-3" /></button>}
                                  {col !== 'Concluido' && <button onClick={() => moverEstadoAsunto(t.id, col === 'Por Iniciar' ? 'En Tramitación' : col === 'En Tramitación' ? 'Revisión & Firma' : 'Concluido')} className="p-1 bg-cyan-500 rounded text-slate-950"><ArrowRight className="w-3 h-3" /></button>}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <table className="w-full text-xs text-left bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-mono"><tr><th className="p-3.5">ID</th><th className="p-3.5">Asunto</th><th className="p-3.5">Cliente</th><th className="p-3.5">Estado</th><th className="p-3.5 text-right">Acción</th></tr></thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {tableroPlanificador.map(t => (
                      <tr key={t.id} className="hover:bg-slate-800/30">
                        <td className="p-3.5 font-mono text-cyan-400 font-bold">{t.id}</td><td className="p-3.5 font-bold text-white">{t.titulo}</td><td className="p-3.5">{t.cliente}</td><td className="p-3.5"><span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300">{t.estado}</span></td>
                        <td className="p-3.5 text-right"><button onClick={() => setModalVerExpediente(t)} className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500 font-bold">Ver</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* GESTIÓN OPERATIVA 2: CRM LEGAL                                    */}
          {/* ================================================================= */}
          {activeTab === 'crm' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold flex items-center gap-2"><Users className="w-6 h-6 text-blue-400" /> Directorio & CRM Legal</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {clientes.map(c => (
                  <div key={c.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 rounded text-[10px] font-bold font-mono">{c.tipo}</span>
                      <span className="text-[10px] font-mono text-slate-500">{c.rif}</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white">{c.nombre}</h3>
                      <p className="text-xs text-slate-400">{c.apoderado} ({c.cedula_apoderado})</p>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1">
                      <div className="flex justify-between"><span className="text-slate-400">Junta:</span><span className="text-emerald-400 font-bold">{c.facultades_junta}</span></div>
                      <div className="flex justify-between"><span className="text-slate-400">Poder:</span><span className={c.facultades_estado === 'alerta' ? 'text-amber-400 font-bold' : 'text-slate-300'}>{c.facultades_poder}</span></div>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-slate-800/40 text-[11px] font-mono">
                      <span className="text-slate-400">{tableroPlanificador.filter(e => e.cliente === c.nombre).length} exp. activos</span>
                      <button onClick={() => setClienteVerFichaModal(c)} className="px-2 py-1 bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 rounded font-bold">Ver Expedientes</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <h2 className="text-sm font-bold flex items-center gap-2"><Plus className="w-4 h-4 text-cyan-400" /> Alta de Nuevo Cliente</h2>
                <form onSubmit={registrarNuevoCliente} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <input type="text" required placeholder="Razón Social *" value={nuevoCliente.nombre} onChange={e => setNuevoCliente({...nuevoCliente, nombre: e.target.value})} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white" />
                  <select value={nuevoCliente.tipo} onChange={e => setNuevoCliente({...nuevoCliente, tipo: e.target.value as any})} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400 font-bold"><option>Externo</option><option>Interno</option></select>
                  <input type="text" placeholder="RIF" value={nuevoCliente.rif} onChange={e => setNuevoCliente({...nuevoCliente, rif: e.target.value})} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono" />
                  <button type="submit" className="sm:col-span-3 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl">Guardar Cliente</button>
                </form>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GESTIÓN OPERATIVA 3: CALENDARIO PROCESAL                          */}
          {/* ================================================================= */}
          {activeTab === 'calendario' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center gap-2"><Clock className="w-6 h-6 text-amber-400" /> Calendario Judicial</h1>
                <button onClick={exportarCalendarioICS} className="px-4 py-2 bg-blue-500/20 border border-blue-500/40 text-blue-300 rounded-xl font-bold text-xs"><Download className="inline w-4 h-4 mr-1" /> .ICS</button>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold font-mono">{mesesNombres[mesActualIndex]} {anioActual}</h2>
                  <div className="flex gap-2">
                    <button onClick={() => setMesActualIndex(prev => prev - 1)} className="p-2 bg-slate-800 rounded-xl"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={() => { setMesActualIndex(8); setDiaSeleccionado(28); }} className="px-3 bg-slate-800 rounded-xl font-mono text-xs font-bold">Hoy</button>
                    <button onClick={() => setMesActualIndex(prev => prev + 1)} className="p-2 bg-slate-800 rounded-xl"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {['LUN','MAR','MIE','JUE','VIE','SAB','DOM'].map(d => <div key={d} className="text-center font-mono text-[11px] text-slate-500 pb-2">{d}</div>)}
                  {(() => {
                    const { offsetLunes, totalDias } = getDiasDelMes(mesActualIndex, anioActual);
                    const cells = [];
                    for(let i=0; i<offsetLunes; i++) cells.push(<div key={`b-${i}`} className="min-h-[85px] opacity-20 p-2"></div>);
                    for(let d=1; d<=totalDias; d++) {
                      const evs = eventosCalendario.filter(ev => ev.dia === d && ev.mes === mesActualIndex);
                      const isSelected = d === diaSeleccionado;
                      cells.push(
                        <div key={d} onClick={() => setDiaSeleccionado(d)} className={`min-h-[85px] p-2 rounded-xl border cursor-pointer ${isSelected ? 'border-amber-400 bg-amber-950/20' : 'border-slate-800 bg-slate-950/60'}`}>
                          <span className={`text-xs font-mono font-bold ${d === 28 && mesActualIndex===8 ? 'text-cyan-400' : 'text-slate-300'}`}>{d}</span>
                          <div className="space-y-1 mt-1">
                            {evs.map(ev => <div key={ev.id} className="text-[9px] font-bold bg-blue-500/25 text-blue-300 px-1 rounded truncate">{ev.titulo}</div>)}
                          </div>
                        </div>
                      );
                    }
                    return cells;
                  })()}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-sm">Eventos: {diaSeleccionado} {mesesNombres[mesActualIndex]}</h3>
                  <button onClick={() => setModalNuevoEvento(true)} className="text-amber-400 text-xs font-bold">+ Agendar</button>
                </div>
                <div className="space-y-2">
                  {eventosCalendario.filter(e => e.dia === diaSeleccionado && e.mes === mesActualIndex).map(ev => (
                    <div key={ev.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center">
                      <div>
                        <span className="font-mono text-amber-400 text-xs font-bold">{ev.hora}</span> <span className="text-white text-sm font-bold">{ev.titulo}</span>
                        <div className="text-[10px] text-slate-400 mt-1">{ev.cliente} • {ev.tribunal}</div>
                      </div>
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-mono font-bold rounded-full">{ev.dias_restantes}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GESTIÓN OPERATIVA 4: RÉNDIMIENTO & FINOPS                         */}
          {/* ================================================================= */}
          {activeTab === 'metricas' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 className="text-emerald-400" /> Rendimiento & FinOps Legal</h1>
                <button onClick={descargarInformeEjecutivoSemanal} className="px-4 py-2 bg-emerald-500 text-slate-950 rounded-xl font-bold text-xs"><Download className="inline w-4 h-4 mr-1" /> Informe .DOC</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800"><span className="text-[10px] text-slate-400 uppercase">Valor Desbloqueado</span><div className="text-2xl font-bold text-emerald-400 mt-1">{metricasDespacho.valor_aportado_usd}</div></div>
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800"><span className="text-[10px] text-slate-400 uppercase">Riesgo Prevenido</span><div className="text-2xl font-bold text-cyan-400 mt-1">{metricasDespacho.contingencias_ahorradas_usd}</div></div>
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800"><span className="text-[10px] text-slate-400 uppercase">Facturación Mes</span><div className="text-2xl font-bold text-purple-400 mt-1">{metricasDespacho.facturacion_mes_usd}</div></div>
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800"><span className="text-[10px] text-slate-400 uppercase">Ciclo Contractual</span><div className="text-sm font-bold text-amber-400 mt-2">{metricasDespacho.tasa_eficiencia_tiempo}</div></div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* GABINETE & TALLER: ACTAS Y MINUTAS                                */}
          {/* ================================================================= */}
          {activeTab === 'actas_minutas' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex justify-between items-center border-b border-slate-800/40 pb-2">
                <h1 className="text-2xl font-bold flex items-center gap-2"><Mic className="w-6 h-6 text-pink-400" /> Grabador & Minutas Ejecutivas</h1>
                <button onClick={copiarCorreoFormalizacionAcuerdos} className="px-4 py-2 bg-pink-500 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-2"><Send className="w-4 h-4" /> Copiar Correo</button>
              </div>

              <div className="p-6 rounded-2xl bg-slate-900 border border-pink-500/30 text-center space-y-4">
                <div className="font-mono text-4xl font-extrabold">{Math.floor(segundosGrabacion/60).toString().padStart(2,'0')}:{(segundosGrabacion%60).toString().padStart(2,'0')}</div>
                <button onClick={alternarGrabacionAudioLocal} className={`px-6 py-3.5 rounded-2xl font-bold text-xs flex items-center gap-2 mx-auto ${grabandoAudioLocal ? 'bg-red-500 text-white animate-pulse' : 'bg-pink-600 text-white'}`}>
                  {grabandoAudioLocal ? <Square className="w-4 h-4" /> : <Mic className="w-4 h-4" />} {grabandoAudioLocal ? "Detener" : "Grabar Sala"}
                </button>
                {cargandoTranscripcionWhisper && <div className="text-xs text-pink-400 animate-pulse"><RefreshCw className="inline w-4 h-4 animate-spin mr-2" /> Extrayendo acuerdos con Whisper...</div>}
              </div>

              {minutaWhisper && (
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
                  <h2 className="text-lg font-bold text-pink-400">{minutaWhisper.titulo}</h2>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Acuerdos Vinculantes:</span>
                    {minutaWhisper.acuerdos.map((a:string, i:number) => <div key={i} className="p-2.5 bg-slate-950 text-xs rounded-xl flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> {a}</div>)}
                  </div>
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Compromisos Asignables al Planificador:</span>
                    {minutaWhisper.action_items.map((ai:any) => (
                      <div key={ai.id} className="p-3 bg-slate-950 rounded-xl flex justify-between items-center text-xs">
                        <div><p className="font-bold">{ai.tarea}</p><p className="text-[10px] text-slate-400">Resp: {ai.responsable} • {ai.plazo}</p></div>
                        <button onClick={() => asignarActionItemAPlanificador(ai)} disabled={ai.agregado} className={`px-3 py-1.5 rounded-xl font-bold ${ai.agregado ? 'bg-slate-800 text-emerald-400' : 'bg-cyan-500 text-slate-950'}`}>{ai.agregado ? "Asignado" : "Asignar"}</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* CUMPLIMIENTO & GOBIERNO CORPORATIVO                               */}
          {/* ================================================================= */}
          {(activeTab === 'cumplimiento' || activeTab === 'aduana' || activeTab === 'boveda' || activeTab === 'canal_etico' || activeTab === 'societario') && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold flex items-center gap-2"><Shield className="w-6 h-6 text-emerald-400" /> Cumplimiento Corporativo</h1>
              
              <div className="flex gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl overflow-x-auto">
                {[
                  { id: 'aduana', label: 'Aduana PII', icon: Shield },
                  { id: 'boveda', label: 'Bóveda SHA-256', icon: Lock },
                  { id: 'canal_etico', label: 'Canal Ético', icon: Radio },
                  { id: 'societario', label: 'Libros Societarios', icon: Building2 }
                ].map(tab => (
                  <button key={tab.id} onClick={() => { setSubTabCumplimiento(tab.id as any); setActiveTab('cumplimiento'); }} className={`flex-1 min-w-[150px] flex items-center gap-2 p-2 rounded-xl text-xs font-bold transition ${subTabCumplimiento === tab.id ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400'}`}>
                    <tab.icon className="w-4 h-4" /> {tab.label}
                  </button>
                ))}
              </div>

              {subTabCumplimiento === 'aduana' && (
                <div className="grid grid-cols-2 gap-5">
                  <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">Texto Original (Datos Sensibles)</span>
                    <textarea rows={8} value={aduanaTextoOriginal} onChange={e => setAduanaTextoOriginal(e.target.value)} className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono" placeholder="Pega texto con cédulas, RIFs..." />
                    <button onClick={() => {
                      let t = aduanaTextoOriginal;
                      t = t.replace(/V-\d{8}/g, "[CEDULA_1]");
                      t = t.replace(/J-\d{8}-\d/g, "[RIF_1]");
                      setAduanaTextoAnonimizado(t);
                    }} className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl text-xs"><Shield className="inline w-4 h-4 mr-2" /> Enmascarar</button>
                  </div>
                  <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase">Texto Seguro (Desidentificado)</span>
                    <div className="h-48 p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono whitespace-pre-wrap text-slate-300">{aduanaTextoAnonimizado}</div>
                  </div>
                </div>
              )}

              {subTabCumplimiento === 'boveda' && (
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                  <h3 className="font-bold text-cyan-300 text-sm">Libro Mayor de Custodia Inmutable</h3>
                  <div className="flex gap-2">
                    <input type="text" value={bovedaTitulo} onChange={e=>setBovedaTitulo(e.target.value)} placeholder="Nombre del documento" className="flex-1 p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white" />
                    <button onClick={() => {
                      const hash = "9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b" + Date.now().toString().slice(-10);
                      setBovedaRegistros([{ id: `BOV-${bovedaRegistros.length+1}`, titulo: bovedaTitulo, hash, fecha: new Date().toISOString().substring(0,10) }, ...bovedaRegistros]);
                      setBovedaTitulo('');
                    }} className="px-5 bg-cyan-600 text-slate-950 font-bold rounded-xl text-xs"><Lock className="inline w-4 h-4" /> Sellar</button>
                  </div>
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead className="text-[10px] font-mono uppercase text-slate-500 border-b border-slate-800"><tr><th className="pb-2">ID</th><th className="pb-2">Documento</th><th className="pb-2">Hash SHA-256</th><th className="pb-2">Verificar</th></tr></thead>
                    <tbody>
                      {bovedaRegistros.map(r => (
                        <tr key={r.id} className="border-b border-slate-800/50"><td className="py-2 text-cyan-400">{r.id}</td><td className="py-2">{r.titulo}</td><td className="py-2 font-mono text-[10px] truncate max-w-[150px]">{r.hash}</td><td className="py-2"><button className="text-emerald-400 text-[10px] font-bold bg-emerald-500/10 px-2 py-1 rounded">Validar</button></td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {subTabCumplimiento === 'canal_etico' && (
                <div className="space-y-4">
                  <button onClick={() => setCanalEticoModalNuevo(true)} className="px-4 py-2 bg-amber-600 text-slate-950 font-bold rounded-xl text-xs"><Plus className="inline w-4 h-4 mr-1" /> Nueva Denuncia</button>
                  {canalEticoCasos.map((c:any, i:number) => (
                    <div key={i} className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex justify-between"><span className="text-amber-400 font-bold text-xs">{c.categoria}</span><span className="text-xs bg-slate-800 px-2 rounded">{c.severidad}</span></div>
                      <h4 className="font-bold text-sm text-white">{c.titulo}</h4>
                      <p className="text-xs text-slate-400">{c.dictamen}</p>
                    </div>
                  ))}
                </div>
              )}

              {subTabCumplimiento === 'societario' && (
                <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <h3 className="font-bold text-blue-300">Libro de Accionistas & Quórum</h3>
                    <button onClick={() => setModalTraspasoAcciones(true)} className="px-3 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-xl">Traspaso</button>
                  </div>
                  <table className="w-full text-xs text-left">
                    <thead className="text-[10px] font-mono text-slate-500 uppercase border-b border-slate-800"><tr><th className="pb-2">Accionista</th><th className="pb-2">Cédula</th><th className="pb-2">Acciones</th><th className="pb-2">%</th></tr></thead>
                    <tbody>
                      {accionistas.map((a:any) => (
                        <tr key={a.id} className="border-b border-slate-800/50"><td className="py-2 font-bold">{a.nombre}</td><td className="py-2 font-mono text-cyan-400">{a.cedula}</td><td className="py-2">{a.acciones}</td><td className="py-2 text-emerald-400 font-bold">{a.porcentaje}%</td></tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

            </div>
          )}

        </div>
      </div>

      {/* =================================================================== */}
      {/* MODALES FLOTANTES (MODALS)                                          */}
      {/* =================================================================== */}

      {/* MODAL PLANIFICADOR: NUEVO ASUNTO */}
      {modalNuevoAsunto && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-bold flex items-center gap-2"><Plus className="w-4 h-4 text-cyan-400" /> Nuevo Asunto</h3>
              <button onClick={() => setModalNuevoAsunto(false)} className="text-slate-400"><X className="w-4 h-4" /></button>
            </div>
            <form onSubmit={agregarNuevoAsunto} className="space-y-3 text-xs">
              <input type="text" required placeholder="Título del expediente..." value={nuevoAsuntoForm.titulo} onChange={e => setNuevoAsuntoForm({...nuevoAsuntoForm, titulo: e.target.value})} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl" />
              <div className="grid grid-cols-2 gap-3">
                <select value={nuevoAsuntoForm.cliente} onChange={e => setNuevoAsuntoForm({...nuevoAsuntoForm, cliente: e.target.value})} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-cyan-400 font-bold">
                  {clientes.map(c => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
                </select>
                <select value={nuevoAsuntoForm.prioridad} onChange={e => setNuevoAsuntoForm({...nuevoAsuntoForm, prioridad: e.target.value})} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl"><option>Crítica</option><option>Alta</option><option>Media</option></select>
              </div>
              <input type="text" placeholder="Dependencia o Bloqueo (Ej: Esperando firmas)" value={nuevoAsuntoForm.bloqueo} onChange={e => setNuevoAsuntoForm({...nuevoAsuntoForm, bloqueo: e.target.value})} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-400" />
              <button type="submit" className="w-full py-3 bg-cyan-500 text-slate-950 font-bold rounded-xl mt-2">Crear Expediente</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL PLANIFICADOR: VER EXPEDIENTE */}
      {modalVerExpediente && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4 shadow-2xl">
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div><span className="font-mono text-cyan-400 font-bold text-sm">{modalVerExpediente.id}</span><h3 className="font-bold text-lg mt-1">{modalVerExpediente.titulo}</h3></div>
              <button onClick={() => setModalVerExpediente(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800"><span className="text-slate-500 block">CLIENTE:</span><span className="text-cyan-400 font-bold">{modalVerExpediente.cliente}</span></div>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800"><span className="text-slate-500 block">ESTADO:</span><span className="text-white font-bold">{modalVerExpediente.estado}</span></div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">{modalVerExpediente.detalles}</div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-800">
              <div className="flex gap-1 text-[10px] font-bold">
                {['Por Iniciar', 'En Tramitación', 'Revisión & Firma', 'Concluido'].map(st => (
                  <button key={st} onClick={() => moverEstadoAsunto(modalVerExpediente.id, st)} className={`px-2.5 py-1.5 rounded-lg ${modalVerExpediente.estado === st ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>{st}</button>
                ))}
              </div>
              <button onClick={() => eliminarAsunto(modalVerExpediente.id)} className="text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CRM: VER FICHA CLIENTE */}
      {clienteVerFichaModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div><span className="text-[10px] font-mono text-cyan-400">{clienteVerFichaModal.rif}</span><h3 className="font-bold">{clienteVerFichaModal.nombre}</h3></div>
              <button onClick={() => setClienteVerFichaModal(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400">Expedientes Activos:</span>
              {tableroPlanificador.filter(e => e.cliente === clienteVerFichaModal.nombre).map(exp => (
                <div key={exp.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs flex justify-between">
                  <div><span className="text-cyan-400 font-mono mr-2">{exp.id}</span>{exp.titulo}</div>
                  <span className="px-2 py-0.5 bg-slate-800 rounded">{exp.estado}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODAL CALENDARIO: NUEVO EVENTO */}
      {modalNuevoEvento && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="font-bold flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-400" /> Agendar Término</h3>
              <button onClick={() => setModalNuevoEvento(false)}><X className="w-4 h-4 text-slate-400" /></button>
            </div>
            <form onSubmit={agregarNuevoEventoCalendario} className="space-y-3 text-xs">
              <input type="text" required placeholder="Título..." value={nuevoEventoForm.titulo} onChange={e => setNuevoEventoForm({...nuevoEventoForm, titulo: e.target.value})} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" required value={nuevoEventoForm.fecha} onChange={e => setNuevoEventoForm({...nuevoEventoForm, fecha: e.target.value})} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-white" />
                <input type="time" value={nuevoEventoForm.hora} onChange={e => setNuevoEventoForm({...nuevoEventoForm, hora: e.target.value})} className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-white" />
              </div>
              <button type="submit" className="w-full py-3 bg-amber-400 text-slate-950 font-bold rounded-xl mt-2">Guardar Término</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CUMPLIMIENTO: DENUNCIA ÉTICA */}
      {canalEticoModalNuevo && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
            <h3 className="font-bold flex items-center gap-2"><Radio className="w-4 h-4 text-amber-400" /> Nueva Denuncia</h3>
            <div className="space-y-3 text-xs">
              <input type="text" placeholder="Título sintético..." value={nuevoCasoEth.titulo} onChange={e => setNuevoCasoEth({...nuevoCasoEth, titulo: e.target.value})} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl" />
              <textarea rows={4} placeholder="Hechos..." value={nuevoCasoEth.descripcion} onChange={e => setNuevoCasoEth({...nuevoCasoEth, descripcion: e.target.value})} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl font-sans" />
              <button onClick={() => {
                setCanalEticoCasos([{ id: `ETH-${Date.now()}`, titulo: nuevoCasoEth.titulo, categoria: nuevoCasoEth.categoria, severidad: nuevoCasoEth.severidad, dictamen: nuevoCasoEth.descripcion, estado: "En Investigación" }, ...canalEticoCasos]);
                setCanalEticoModalNuevo(false);
              }} className="w-full py-3 bg-amber-600 text-slate-950 font-bold rounded-xl">Radicar Expediente</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL SOCIETARIO: TRASPASO */}
      {modalTraspasoAcciones && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
            <h3 className="font-bold flex items-center gap-2"><Building2 className="w-4 h-4 text-blue-400" /> Traspaso de Acciones</h3>
            <div className="space-y-3 text-xs">
              <input type="text" placeholder="Nombre del Cesionario" value={traspasoForm.cesionarioNombre} onChange={e => setTraspasoForm({...traspasoForm, cesionarioNombre: e.target.value})} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl" />
              <input type="number" placeholder="Cantidad de Acciones" value={traspasoForm.cantidadAcciones} onChange={e => setTraspasoForm({...traspasoForm, cantidadAcciones: parseInt(e.target.value)})} className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl" />
              <button onClick={() => {
                setAccionistas([...accionistas, { id: Date.now(), nombre: traspasoForm.cesionarioNombre, cedula: "N/D", acciones: traspasoForm.cantidadAcciones, porcentaje: 10, estado: "Pagado", presente: true }]);
                setModalTraspasoAcciones(false);
              }} className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl">Registrar Asiento</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
