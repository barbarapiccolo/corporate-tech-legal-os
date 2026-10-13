'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, FileText, Scale, Cpu, AlertTriangle, CheckCircle2, Lock, Calendar, Briefcase, 
  Users, Mic, CheckSquare, QrCode, Play, Square, Copy, Download, ChevronRight, ChevronDown, 
  ChevronLeft, MessageSquare, Sparkles, Search, BarChart3, TrendingUp, Layers, Building2, 
  PieChart, Radio, FileCheck2, FolderGit2, HelpCircle, X, Printer, Upload, RefreshCw, Send, 
  Clock, Plus, ArrowRight, ArrowLeft, Sun, Moon, Menu, Check, UserCheck, Eye, Trash2, 
  Edit3, Filter, FileSpreadsheet, Share2, AlertCircle, Bookmark, ExternalLink, Bot, Swords, 
  GitCompare, FileCode, CheckCheck, Lightbulb, Paperclip, MessageCircle, FileUp, Camera, 
  Image as ImageIcon 
} from 'lucide-react';

// =====================================================================
// 1. CATÁLOGO MAESTRO DE MODELOS JURÍDICOS (Muestra representativa de los 544 en Drive)
// =====================================================================
const CATALOGO_MODELOS = [
  {
    "codigo": "POD-01",
    "titulo": "Poder General de Administración y Disposición con Autocontratación",
    "categoria": "Poderes y Mandatos",
    "driveUrl": "https://docs.google.com/spreadsheets/d/1uMWL2Fq1EnRj2MoblGuj7CToxuy0ZQl32p_xkCunxew/edit?usp=sharing",
    "variables": "Poderdante, Apoderado, Cuentas bancarias, Facultades dispositivas",
    "fundamento": "Arts. 1.684 y ss., Art. 1.171 CCV"
  },
  {
    "codigo": "POD-03",
    "titulo": "Poder Especial para Venta de Inmuebles",
    "categoria": "Poderes y Mandatos",
    "driveUrl": "https://docs.google.com/spreadsheets/d/1uMWL2Fq1EnRj2MoblGuj7CToxuy0ZQl32p_xkCunxew/edit?usp=sharing",
    "variables": "Propietario poderdante, Apoderado, Linderos, Facultades de precio y cobro",
    "fundamento": "Art. 1.688 CCV"
  },
  {
    "codigo": "CON-01",
    "titulo": "Contrato de Arrendamiento de Inmueble para Uso Comercial",
    "categoria": "Contratos y Acuerdos",
    "driveUrl": "https://docs.google.com/spreadsheets/d/1uMWL2Fq1EnRj2MoblGuj7CToxuy0ZQl32p_xkCunxew/edit?usp=sharing",
    "variables": "Arrendador, Arrendataria, Dirección exacta, Canon mensual en divisas",
    "fundamento": "Decreto Ley de Arrendamiento Comercial"
  },
  {
    "codigo": "SOC-01",
    "titulo": "Modelo de Acta Constitutiva y Estatutos Sociales de C.A.",
    "categoria": "Derecho Societario",
    "driveUrl": "https://docs.google.com/spreadsheets/d/1uMWL2Fq1EnRj2MoblGuj7CToxuy0ZQl32p_xkCunxew/edit?usp=sharing",
    "variables": "Denominación social, Objeto social, Capital social, Junta Directiva",
    "fundamento": "Arts. 200, 211, 213 Código de Comercio"
  }
];

// =====================================================================
// 2. DATOS MOCK INICIALES (Mantenidos de tu versión perfecta)
// =====================================================================
const MOCK_TABLERO = [
  { id: "EXP-01", titulo: "Revisión notas del registrador sobre compraventa Turmero", cliente: "Auxiliadora Inmuebles", tipo_rol: "Externo", materia: "Inmobiliario", responsable: "Barbara Piccolo", plazo: "Hoy 16:00", prioridad: "Crítica", estado: "Por Iniciar", bloqueo: "Revisión Jurídica", bloqueo_tipo: "interno", cuantia: "45.000 USD", tribunal: "Registro Inmobiliario / SAREN", detalles: "Revisión previa antes del visado definitivo con INPRE." },
  { id: "EXP-02", titulo: "Redacción final de Contrato SaaS Enterprise", cliente: "Kodevant Corp", tipo_rol: "In-House", materia: "LegalTech", responsable: "Barbara Piccolo", plazo: "Viernes 17:00", prioridad: "Alta", estado: "En Tramitación", bloqueo: "En Curso", bloqueo_tipo: "ninguno", cuantia: "60.000 EUR/año", tribunal: "Sede Corporativa Madrid", detalles: "Cláusula de confidencialidad de modelos de IA." }
];

const MOCK_CLIENTES = [
  { id: 1, nombre: "Auxiliadora Inmuebles", rif: "J-40192834-0", tipo: "Inmobiliario", contacto: "Auxiliadora", email: "inmuebles@auxiliadora.com", telefono: "+58 414-906-XXXX", expedientesActivos: 2, estado: "Activo", direccion: "Caracas / Guayana", notas: "Cliente habitual de compraventas." },
  { id: 2, nombre: "Kodevant Corp", rif: "J-50291823-1", tipo: "LegalTech", contacto: "Director General", email: "legal@kodevant.com", telefono: "+34 612-445-XXX", expedientesActivos: 1, estado: "Activo", direccion: "Madrid / Miami", notas: "Consultoría estratégica en gobernanza de IA." }
];

const MOCK_CALENDARIO = [
  { id: "E-01", dia: 14, mes: 9, anio: 2026, tipo: "Registro", titulo: "Revisión Previa Documento Venta", exp: "EXP-01", lugar: "Registro Inmobiliario", hora: "09:00 AM", cliente: "Auxiliadora" },
  { id: "E-02", dia: 16, mes: 9, anio: 2026, tipo: "Notaría", titulo: "Firma y Visado de Poder Especial", exp: "EXP-03", lugar: "Notaría Pública", hora: "11:30 AM", cliente: "Ana Reyes" }
];

const CHATS_INICIALES = [
  {
    id: "chat-01", titulo: "Poder de Auxiliadora", fecha: "Hoy 10:15",
    mensajes: [
      { emisor: "usuario", texto: "¿Estos 3 documentos en PDF sirven para tramitar custodia?", archivos: ["ejercicio_paul.pdf"] },
      { emisor: "ia", texto: "Sí, Bárbara. Los documentos tienen el mismo objetivo jurídico. Te sugiero responderle al cliente explicando la vía de convenio amistoso primero." }
    ]
  }
];

export default function DashboardLegalUniversal() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pestañas Activas (Cambiado 'analizador_documentos' por 'preparador_recaudos')
  const [activeTab, setActiveTab] = useState('chat_ia');

  // =====================================================================
  // ESTADOS: CONSULTOR JURÍDICO IA
  // =====================================================================
  const [chats, setChats] = useState(CHATS_INICIALES);
  const [activeChatId, setActiveChatId] = useState("chat-01");
  const [mensajeInput, setMensajeInput] = useState("");
  const [archivosAdjuntos, setArchivosAdjuntos] = useState<string[]>([]);
  const [chatCargando, setChatCargando] = useState(false);
  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleCrearNuevoChat = () => {
    const nuevoId = `chat-${Date.now()}`;
    setChats([{ id: nuevoId, titulo: "Nueva Consulta", fecha: "Ahora", mensajes: [{ emisor: "ia", texto: "¡Hola Bárbara! Estoy lista para ayudarte." }] }, ...chats]);
    setActiveChatId(nuevoId);
  };

  const handleEnviarMensaje = () => {
    if (!mensajeInput.trim() && archivosAdjuntos.length === 0) return;
    const nuevoMsgUsuario = { emisor: "usuario", texto: mensajeInput, archivos: [...archivosAdjuntos] };
    setChats(chats.map(c => c.id === activeChatId ? { ...c, titulo: c.titulo === "Nueva Consulta" && mensajeInput ? mensajeInput.slice(0, 35) + "..." : c.titulo, mensajes: [...c.mensajes, nuevoMsgUsuario] } : c));
    setMensajeInput(""); setArchivosAdjuntos([]); setChatCargando(true);
    setTimeout(() => {
      setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, mensajes: [...c.mensajes, { emisor: "ia", texto: "Entendido. He procesado tu solicitud basándome en la normativa vigente." }] } : c));
      setChatCargando(false);
    }, 900);
  };

  // =====================================================================
  // ESTADOS: REDACTOR DE MENSAJES (WHATSAPP)
  // =====================================================================
  const [destinatarioMsg, setDestinatarioMsg] = useState("cliente_confianza");
  const [tonoMsg, setTonoMsg] = useState("cercano");
  const [instruccionMsg, setInstruccionMsg] = useState("");
  const [capturaWhatsappAdjunta, setCapturaWhatsappAdjunta] = useState<string | null>(null);
  const [mensajeGenerado, setMensajeGenerado] = useState("");
  const [mensajeCopiado, setMensajeCopiado] = useState(false);

  const handleSubirCapturaWhatsApp = () => {
    setCapturaWhatsappAdjunta("captura_chat_cliente.jpg");
    setInstruccionMsg("Datos extraídos de la imagen: El cliente pregunta si la solvencia municipal sirve aunque esté vencida y pide los datos bancarios para transferir los honorarios.");
  };

  const handleGenerarMensaje = () => {
    if (!instruccionMsg.trim() && !capturaWhatsappAdjunta) return;
    setMensajeGenerado(`¡Hola! Espero que estés muy bien. Te confirmo que revisé la imagen. La solvencia no puede estar vencida para el trámite en la Notaría, así que debemos actualizarla primero. Por los honorarios, te dejo mis datos para la transferencia: Banco de Venezuela 0102-XXXX... Avísame cuando actualices la solvencia y avanzamos. ¡Un abrazo!`);
  };

  // =====================================================================
  // ESTADOS: PREPARADOR DE ESCENARIO (DESGLOSADOR DE RECAUDOS)
  // =====================================================================
  const [fotosRecaudos, setFotosRecaudos] = useState<string[]>([]);
  const [desglosePartes, setDesglosePartes] = useState({
    otorganteNombre: "", otorganteCedula: "", otorganteRif: "", otorganteEstadoCivil: "", otorganteDomicilio: "",
    adquirienteNombre: "", adquirienteCedula: "", adquirienteRif: "", adquirienteEstadoCivil: "", adquirienteDomicilio: "",
    inmuebleDescripcion: "", inmuebleLinderos: "", inmuebleCatastro: "", condicionPrecio: "", condicionFormaPago: ""
  });

  const handleProcesarFotosRecaudos = () => {
    setFotosRecaudos(["cedula_comprador.jpg", "cedula_vendedora.jpg", "titulo_propiedad.pdf"]);
    // Simula lectura OCR/IA
    setTimeout(() => {
      setDesglosePartes({
        otorganteNombre: "ELBA JOSEFINA GUILLEN RODRIGUEZ", otorganteCedula: "V-2.991.032", otorganteRif: "V029910320", otorganteEstadoCivil: "Soltera", otorganteDomicilio: "Turmero, Estado Aragua",
        adquirienteNombre: "ANA BIANCA REYES BONILLA", adquirienteCedula: "V-6.055.603", adquirienteRif: "V060556031", adquirienteEstadoCivil: "Soltera", adquirienteDomicilio: "Turmero, Estado Aragua",
        inmuebleDescripcion: "Parcela C-13, Casa en Urbanización Las Cayenas", inmuebleLinderos: "Norte: Parcela C-14; Sur: Parcela C-12", inmuebleCatastro: "Cta 135940", condicionPrecio: "10.000.000 Bs", condicionFormaPago: "Cheque N° 01002663 Banco de Venezuela"
      });
    }, 800);
  };

  const handleEnviarDatosARedactor = () => {
    setActiveTab('redactor_documentos');
  };

  // =====================================================================
  // ESTADOS: REDACTOR DE INSTRUMENTOS (CATÁLOGO DRIVE)
  // =====================================================================
  const [busquedaModelo, setBusquedaModelo] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [codigoModeloSeleccionado, setCodigoModeloSeleccionado] = useState(CATALOGO_MODELOS[2].codigo);
  const [sincronizandoDrive, setSincronizandoDrive] = useState(false);
  const modeloActual = CATALOGO_MODELOS.find(m => m.codigo === codigoModeloSeleccionado) || CATALOGO_MODELOS[0];
  const categoriasDisponibles = ["Todas", ...Array.from(new Set(CATALOGO_MODELOS.map(m => m.categoria)))];
  
  const modelosFiltrados = CATALOGO_MODELOS.filter(m => {
    const coincideCat = categoriaFiltro === "Todas" || m.categoria === categoriaFiltro;
    const coincideTexto = !busquedaModelo || m.titulo.toLowerCase().includes(busquedaModelo.toLowerCase()) || m.codigo.toLowerCase().includes(busquedaModelo.toLowerCase());
    return coincideCat && coincideTexto;
  });

  const [instrumentoGenerado, setInstrumentoGenerado] = useState("");
  const [instrumentoCopiado, setInstrumentoCopiado] = useState(false);

  const handleGenerarInstrumento = () => {
    const textoDoc = `DOCUMENTO DE ${modeloActual.titulo.toUpperCase()} CON VISADO LEGAL\n\nYo, ${desglosePartes.otorganteNombre || '[Otorgante]'}, C.I. ${desglosePartes.otorganteCedula || '[Cédula]'}, declaro que otorgo formal ${modeloActual.titulo.toLowerCase()} a favor de ${desglosePartes.adquirienteNombre || '[Adquiriente]'}, C.I. ${desglosePartes.adquirienteCedula || '[Cédula]'}.\n\nCLÁUSULA PRIMERA: Precio pactado: ${desglosePartes.condicionPrecio || '[Precio]'}.\n\nDOCUMENTO REDACTADO Y VISADO POR:\nBARBARA ISABEL PICCOLO OBALDO\nAbogada INPRE N° 115.794`;
    setInstrumentoGenerado(textoDoc);
  };

  // =====================================================================
  // ESTADOS ORIGINALES MANTENIDOS: PLANIFICADOR, CRM, CALENDARIO, ETC.
  // =====================================================================
  const [tableroPlanificador, setTableroPlanificador] = useState(MOCK_TABLERO);
  const [vistaPlanificador, setVistaPlanificador] = useState<'kanban' | 'lista'>('kanban');
  const [filtroRolPlanificador, setFiltroRolPlanificador] = useState('Todos');
  const [buscarPlanificador, setBuscarPlanificador] = useState("");
  const [clientes, setClientes] = useState(MOCK_CLIENTES);
  const [eventosCalendario, setEventosCalendario] = useState(MOCK_CALENDARIO);
  const [mesActualIndex, setMesActualIndex] = useState(8); 
  const [anioActual, setAnioActual] = useState(2026);
  const [diaSeleccionado, setDiaSeleccionado] = useState(28);
  const [grabandoAudioLocal, setGrabandoAudioLocal] = useState(false);
  const [segundosGrabacion, setSegundosGrabacion] = useState(0);

  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-[#090d16] text-slate-200' : 'bg-slate-50 text-slate-800'} font-sans overflow-hidden`}>
      {/* =============================================================== */}
      {/* 1. BARRA LATERAL (DESKTOP) */}
      {/* =============================================================== */}
      {sidebarOpen && (
        <aside className={`hidden md:flex flex-col w-72 h-screen border-r transition-all duration-300 ${isDark ? 'bg-[#0d1322] border-slate-800' : 'bg-white border-slate-200'} flex-shrink-0 z-20`}>
          <div className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Shield className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-wide text-white">AI GOVERN</h1>
                <p className="text-[10px] text-slate-400 font-mono">Despacho Jurídico</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 scrollbar-hide">
            {/* SECCIÓN 1: INTELIGENCIA JURÍDICA */}
            <div>
              <p className="text-[10px] font-bold tracking-widest text-slate-500 mb-3 px-2 uppercase">Inteligencia Jurídica</p>
              <div className="space-y-1">
                {[
                  { id: 'chat_ia', label: 'Consultor Jurídico IA', icon: Bot, badge: 'Chat' },
                  { id: 'redactor_mensajes', label: 'Mensajes WhatsApp', icon: MessageCircle, badge: 'WhatsApp' },
                  { id: 'preparador_recaudos', label: 'Preparador de Recaudos', icon: Camera, badge: 'Extraer' },
                  { id: 'redactor_documentos', label: 'Redactor de Instrumentos', icon: FileCode, badge: '544 Modelos' }
                ].map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${activeTab === item.id ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4" />
                      <span className="text-xs">{item.label}</span>
                    </div>
                    {item.badge && <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300">{item.badge}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* SECCIÓN 2: GESTIÓN OPERATIVA */}
            <div>
              <p className="text-[10px] font-bold tracking-widest text-slate-500 mb-3 px-2 uppercase">Gestión del Despacho</p>
              <div className="space-y-1">
                {[
                  { id: 'planificador', label: 'Gestor de Tareas & Asuntos', icon: CheckSquare },
                  { id: 'crm', label: 'Clientes & Expedientes', icon: Users },
                  { id: 'calendario', label: 'Calendario Procesal', icon: Calendar },
                  { id: 'actas_minutas', label: 'Grabador & Minutas', icon: Mic },
                  { id: 'metricas', label: 'Métricas del Despacho', icon: BarChart3 }
                ].map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${activeTab === item.id ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* =============================================================== */}
      {/* 2. ÁREA DE CONTENIDO PRINCIPAL */}
      {/* =============================================================== */}
      <main className="flex-1 flex flex-col h-screen relative">
        <header className={`h-16 flex items-center justify-between px-4 sm:px-6 border-b z-10 ${isDark ? 'bg-[#090d16]/80 border-slate-800' : 'bg-white/80 border-slate-200'} backdrop-blur-md`}>
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="hidden md:block p-2 rounded-xl border border-slate-800 text-cyan-400 hover:bg-slate-800">
                <Menu className="w-4 h-4" />
              </button>
            )}
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-xl border border-slate-800 text-cyan-400 hover:bg-slate-800">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-sm font-bold text-white tracking-wide uppercase">
              DESPACHO / {activeTab.replace('_', ' ')}
            </h2>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 md:pb-6 scrollbar-hide">
          
          {/* =============================================================== */}
          {/* VISTA 1: CONSULTOR JURÍDICO IA */}
          {/* =============================================================== */}
          {activeTab === 'chat_ia' && (
            <div className="max-w-4xl mx-auto h-[85vh] flex flex-col border border-slate-800 rounded-2xl overflow-hidden bg-[#0d1322]">
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-hide bg-slate-950/30">
                {activeChat.mensajes.map((m, idx) => (
                  <div key={idx} className={`flex ${m.emisor === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-5 py-4 ${m.emisor === 'usuario' ? 'bg-cyan-900/40 border border-cyan-500/30 text-cyan-50' : 'bg-[#121a2d] border border-slate-800 text-slate-300'}`}>
                      {m.archivos && m.archivos.length > 0 && (
                        <div className="flex gap-2 mb-3">
                          {m.archivos.map((arch, aIdx) => (
                            <span key={aIdx} className="px-2 py-1 text-[10px] bg-slate-900 border border-slate-700 rounded-md text-cyan-400 flex items-center gap-1">
                              <Paperclip className="w-3 h-3" /> {arch}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.texto}</p>
                    </div>
                  </div>
                ))}
                {chatCargando && (
                  <div className="flex justify-start">
                    <div className="bg-[#121a2d] border border-slate-800 rounded-2xl px-5 py-4 flex items-center gap-3">
                      <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                      <span className="text-xs text-slate-400">Analizando con modelo confidencial...</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-[#0d1322] border-t border-slate-800">
                <div className="relative flex items-end gap-2">
                  <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden focus-within:border-cyan-500 transition-colors">
                    <textarea 
                      value={mensajeInput}
                      onChange={e => setMensajeInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleEnviarMensaje(); } }}
                      placeholder="Consulta leyes, pide análisis o instrucciones jurídicas..."
                      className="w-full max-h-32 min-h-[52px] bg-transparent text-sm text-white placeholder-slate-500 p-4 focus:outline-none resize-none scrollbar-hide"
                      rows={1}
                    />
                  </div>
                  <button onClick={handleEnviarMensaje} className="p-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition flex-shrink-0">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* VISTA 2: REDACTOR DE MENSAJES (WHATSAPP) */}
          {/* =============================================================== */}
          {activeTab === 'redactor_mensajes' && (
            <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
                    <MessageCircle className="w-6 h-6 text-cyan-400" /> Redactor de Mensajes WhatsApp
                  </h1>
                  <p className="text-sm text-slate-400">Sube una captura de pantalla y la IA la leerá para redactar la respuesta en tu propio tono.</p>
                </div>

                <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-5">
                  <div className="text-white text-xs mb-3 font-bold flex items-center gap-2">1. Leer Captura del Chat (Opcional)</div>
                  <div 
                    onClick={handleSubirCapturaWhatsApp}
                    className="p-6 rounded-xl border border-dashed border-slate-700 hover:border-cyan-500 bg-slate-900 text-center cursor-pointer transition flex flex-col items-center justify-center gap-3"
                  >
                    <ImageIcon className={`w-8 h-8 ${capturaWhatsappAdjunta ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span className="text-slate-300 text-sm font-medium">
                      {capturaWhatsappAdjunta ? `✅ Captura cargada: ${capturaWhatsappAdjunta}` : "Haz clic aquí para adjuntar captura de pantalla de WhatsApp"}
                    </span>
                  </div>

                  <div className="mt-5 text-white text-xs mb-2 font-bold flex items-center gap-2">2. ¿Qué necesitas responderle?</div>
                  <textarea 
                    value={instruccionMsg}
                    onChange={(e) => setInstruccionMsg(e.target.value)}
                    placeholder="Ejemplo: Dile que revisé los documentos y que falta la cédula..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 h-24 resize-none"
                  />

                  <div className="mt-5 text-white text-xs mb-2 font-bold flex items-center gap-2">3. Elige el Tono del Mensaje</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'cercano', label: 'Cercano / Empático', color: 'border-emerald-500 text-emerald-400' },
                      { id: 'formal', label: 'Formal / Firme', color: 'border-blue-500 text-blue-400' },
                      { id: 'cobro', label: 'Cobro Honorarios', color: 'border-purple-500 text-purple-400' },
                      { id: 'didactico', label: 'Explicación Sencilla', color: 'border-amber-500 text-amber-400' }
                    ].map(t => (
                      <button key={t.id} onClick={() => setTonoMsg(t.id)} className={`p-2 rounded-xl border text-xs font-bold transition ${tonoMsg === t.id ? `bg-slate-800/80 ${t.color}` : 'border-slate-800 text-slate-500 hover:bg-slate-900'}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <button onClick={handleGenerarMensaje} className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-md transition flex justify-center items-center gap-2">
                    <Sparkles className="w-4 h-4" /> Generar Mensaje Listo para WhatsApp
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <div className="h-full bg-[#0d1322] border border-slate-800 rounded-2xl p-5 flex flex-col">
                  <div className="text-white text-sm font-bold mb-4 flex items-center justify-between">
                    <span>Mensaje Propuesto</span>
                    {mensajeGenerado && (
                      <button onClick={handleCopiarMensaje} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs flex items-center gap-1 font-bold transition">
                        {mensajeCopiado ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {mensajeCopiado ? "¡Copiado!" : "Copiar"}
                      </button>
                    )}
                  </div>
                  <div className={`flex-1 rounded-xl p-4 text-sm font-medium leading-relaxed ${mensajeGenerado ? 'bg-cyan-950/20 text-cyan-50 border border-cyan-900/50' : 'bg-slate-900/50 text-slate-500 border border-dashed border-slate-800 flex items-center justify-center text-center'}`}>
                    {mensajeGenerado || "Sube una captura o escribe una instrucción para que la IA redacte tu respuesta."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* VISTA 3: PREPARADOR DE ESCENARIO (DESGLOSADOR DE RECAUDOS) */}
          {/* =============================================================== */}
          {activeTab === 'preparador_recaudos' && (
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-2">
                  <Camera className="w-6 h-6 text-cyan-400" /> Preparador de Recaudos
                </h1>
                <p className="text-sm text-slate-400">Sube fotos de cédulas, RIFs o documentos previos. La IA extraerá los datos automáticamente para enviarlos al Redactor.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-2">
                    <FileUp className="w-8 h-8 text-cyan-500" />
                  </div>
                  <h3 className="text-white font-bold text-lg">Carga de Fotos y PDFs</h3>
                  
                  <button 
                    onClick={handleProcesarFotosRecaudos}
                    className="mt-4 px-6 py-2.5 rounded-xl border border-dashed border-cyan-500/50 hover:bg-slate-900 text-cyan-400 text-sm font-bold transition flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" /> Seleccionar Fotos
                  </button>

                  {fotosRecaudos.length > 0 && (
                    <div className="w-full mt-4 text-left">
                      <div className="text-xs text-emerald-400 mb-2 font-bold">Archivos Procesados:</div>
                      {fotosRecaudos.map((f, i) => (
                        <div key={i} className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 mb-2 flex items-center gap-2">
                          <ImageIcon className="w-3 h-3 text-slate-500" /> {f}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 flex flex-col h-full">
                  <h3 className="text-white font-bold text-sm mb-4 flex items-center justify-between">
                    Datos Extraídos
                    {desglosePartes.otorganteNombre && <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Extracción Exitosa</span>}
                  </h3>
                  
                  {!desglosePartes.otorganteNombre ? (
                    <div className="flex-1 flex items-center justify-center border border-dashed border-slate-800 rounded-xl bg-slate-900/30 text-slate-500 text-xs text-center p-6">
                      Sube los recaudos para desglosar las partes automáticamente.
                    </div>
                  ) : (
                    <div className="flex-1 space-y-4 text-xs text-slate-300 overflow-y-auto">
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="text-cyan-400 font-bold block mb-1">Parte Otorgante:</span>
                        <input value={desglosePartes.otorganteNombre} onChange={e => setDesglosePartes({...desglosePartes, otorganteNombre: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white mb-1" />
                        <input value={desglosePartes.otorganteCedula} onChange={e => setDesglosePartes({...desglosePartes, otorganteCedula: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white" />
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="text-cyan-400 font-bold block mb-1">Parte Adquiriente:</span>
                        <input value={desglosePartes.adquirienteNombre} onChange={e => setDesglosePartes({...desglosePartes, adquirienteNombre: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white mb-1" />
                        <input value={desglosePartes.adquirienteCedula} onChange={e => setDesglosePartes({...desglosePartes, adquirienteCedula: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white" />
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
                        <span className="text-cyan-400 font-bold block mb-1">Condiciones:</span>
                        <input value={desglosePartes.condicionPrecio} onChange={e => setDesglosePartes({...desglosePartes, condicionPrecio: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-white" />
                      </div>

                      <button 
                        onClick={handleEnviarDatosARedactor}
                        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm flex justify-center items-center gap-2 shadow-md transition"
                      >
                        <ArrowRight className="w-4 h-4" /> Enviar datos al Redactor de Instrumentos
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* VISTA 4: REDACTOR DE INSTRUMENTOS (CATÁLOGO DRIVE 544 MODELOS) */}
          {/* =============================================================== */}
          {activeTab === 'redactor_documentos' && (
            <div className="max-w-5xl mx-auto flex flex-col gap-6">
              {/* Banner de Conexión a Drive */}
              <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400"><FileSpreadsheet className="w-5 h-5" /></div>
                  <div>
                    <h2 className="text-white text-sm font-bold">Catálogo Maestro Conectado</h2>
                    <p className="text-xs text-cyan-200/70">Lectura activa desde Google Drive (Biblioteca: 544 Modelos)</p>
                  </div>
                </div>
                <button 
                  onClick={() => { setSincronizandoDrive(true); setTimeout(() => setSincronizandoDrive(false), 1500) }}
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition flex items-center gap-2"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${sincronizandoDrive ? 'animate-spin' : ''}`} /> 
                  {sincronizandoDrive ? 'Sincronizando...' : 'Sincronizar 544 Modelos'}
                </button>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Panel Izquierdo: Buscador */}
                <div className="w-full lg:w-1/3 flex flex-col gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input type="text" value={busquedaModelo} onChange={(e) => setBusquedaModelo(e.target.value)} placeholder="Buscar en los 544 modelos..." className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500" />
                  </div>
                  
                  <div className="bg-[#0d1322] border border-slate-800 rounded-xl overflow-hidden flex-1 flex flex-col max-h-[600px]">
                    <div className="p-3 border-b border-slate-800 bg-slate-900/50">
                      <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500">
                        {categoriasDisponibles.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div className="overflow-y-auto p-2 scrollbar-hide">
                      {modelosFiltrados.map(m => (
                        <div key={m.codigo} onClick={() => setCodigoModeloSeleccionado(m.codigo)} className={`p-3 rounded-lg mb-1 cursor-pointer transition border ${codigoModeloSeleccionado === m.codigo ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-transparent border-transparent hover:bg-slate-800/50 hover:border-slate-800'}`}>
                          <div className="text-[10px] font-mono text-cyan-500 mb-1">{m.codigo}</div>
                          <div className={`text-xs font-bold leading-tight ${codigoModeloSeleccionado === m.codigo ? 'text-cyan-300' : 'text-slate-300'}`}>{m.titulo}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Panel Derecho: Redacción */}
                <div className="w-full lg:w-2/3 flex flex-col gap-4">
                  <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-5">
                    <h2 className="text-lg font-bold text-white mb-2">{modeloActual.titulo}</h2>
                    <div className="flex gap-2 mb-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] font-mono text-slate-300">{modeloActual.fundamento}</span>
                      <a href={modeloActual.driveUrl} target="_blank" rel="noreferrer" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer">
                        Ver Original en Drive <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {!desglosePartes.otorganteNombre && (
                      <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3 items-start">
                        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                        <div>
                          <p className="text-xs text-amber-200 font-bold mb-1">Faltan Datos</p>
                          <p className="text-[11px] text-amber-200/70">Ve al <span onClick={() => setActiveTab('preparador_recaudos')} className="underline cursor-pointer">Preparador de Recaudos</span> para extraer la información de las cédulas automáticamente.</p>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-3 mb-5">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Otorgante</label>
                        <input value={desglosePartes.otorganteNombre} onChange={e => setDesglosePartes({...desglosePartes, otorganteNombre: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Cédula Otorgante</label>
                        <input value={desglosePartes.otorganteCedula} onChange={e => setDesglosePartes({...desglosePartes, otorganteCedula: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Adquiriente</label>
                        <input value={desglosePartes.adquirienteNombre} onChange={e => setDesglosePartes({...desglosePartes, adquirienteNombre: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Cédula Adquiriente</label>
                        <input value={desglosePartes.adquirienteCedula} onChange={e => setDesglosePartes({...desglosePartes, adquirienteCedula: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                      </div>
                      <div className="col-span-2">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">Condición / Precio</label>
                        <input value={desglosePartes.condicionPrecio} onChange={e => setDesglosePartes({...desglosePartes, condicionPrecio: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                      </div>
                    </div>

                    <button onClick={handleGenerarInstrumento} className="w-full py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2">
                      <FileCode className="w-4 h-4" /> Ensamblar Documento con mi Visado
                    </button>
                  </div>

                  {instrumentoGenerado && (
                    <div className="bg-[#0d1322] border border-cyan-500/30 rounded-2xl p-5 shadow-[0_0_20px_rgba(0,240,255,0.05)]">
                       <div className="text-white text-sm font-bold mb-3 flex items-center justify-between">
                        <span>Vista Previa del Instrumento</span>
                        <button className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 text-xs flex items-center gap-1 font-bold hover:bg-emerald-500/30 transition">
                          <Download className="w-3 h-3" /> Descargar .DOCX
                        </button>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-300 font-mono leading-relaxed whitespace-pre-wrap h-64 overflow-y-auto">
                        {instrumentoGenerado}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* VISTAS RESTAURADAS INTACTAS (PLANIFICADOR, CRM, CALENDARIO...) */}
          {/* =============================================================== */}
          {activeTab === 'planificador' && (
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2"><CheckSquare className="w-6 h-6 text-cyan-400" /> Planificador de Asuntos</h1>
                  <p className="text-sm text-slate-400">Control Kanban de expedientes y dependencias operativas.</p>
                </div>
                <div className="flex bg-[#0d1322] border border-slate-800 rounded-lg p-1">
                  <button onClick={() => setVistaPlanificador('kanban')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${vistaPlanificador === 'kanban' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-white'}`}>Kanban</button>
                  <button onClick={() => setVistaPlanificador('lista')} className={`px-4 py-1.5 rounded-md text-xs font-bold transition ${vistaPlanificador === 'lista' ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-500 hover:text-white'}`}>Lista</button>
                </div>
              </div>

              {vistaPlanificador === 'kanban' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  {['Por Iniciar', 'En Tramitación', 'Revisión & Firma', 'Concluido'].map(col => {
                    const items = tableroPlanificador.filter(i => i.estado === col);
                    return (
                      <div key={col} className="bg-[#0d1322] border border-slate-800 rounded-2xl p-4 min-h-[500px]">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{col}</h3>
                          <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded-full">{items.length}</span>
                        </div>
                        <div className="space-y-3">
                          {items.map(t => (
                            <div key={t.id} className="bg-slate-900 border border-slate-800 p-3 rounded-xl hover:border-cyan-500/50 transition cursor-pointer">
                              <div className="text-[10px] font-mono text-cyan-500 mb-1">{t.id} • {t.cliente}</div>
                              <div className="text-xs text-white font-bold mb-2 leading-tight">{t.titulo}</div>
                              {t.bloqueo_tipo !== 'ninguno' && (
                                <div className="text-[10px] text-rose-400 flex items-center gap-1 mb-2 bg-rose-500/10 p-1 rounded">
                                  <AlertTriangle className="w-3 h-3" /> Bloqueo: {t.bloqueo}
                                </div>
                              )}
                              <div className="flex justify-between items-center text-[10px] text-slate-500">
                                <span>{t.plazo}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {vistaPlanificador === 'lista' && (
                <div className="bg-[#0d1322] border border-slate-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-900 text-slate-400 text-xs uppercase font-bold border-b border-slate-800">
                      <tr>
                        <th className="p-4">Asunto</th>
                        <th className="p-4">Cliente / Rol</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4">Plazo</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-300">
                      {tableroPlanificador.map(t => (
                        <tr key={t.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                          <td className="p-4"><div className="font-bold text-white">{t.titulo}</div><div className="text-xs text-slate-500">{t.id} • {t.materia}</div></td>
                          <td className="p-4"><div className="text-cyan-400">{t.cliente}</div><div className="text-[10px]">{t.tipo_rol}</div></td>
                          <td className="p-4"><span className="px-2 py-1 bg-slate-800 rounded text-xs">{t.estado}</span></td>
                          <td className="p-4 font-mono text-xs text-amber-400">{t.plazo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {activeTab === 'crm' && (
            <div className="max-w-5xl mx-auto">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-6"><Users className="w-6 h-6 text-cyan-400" /> Directorio de Clientes & CRM</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clientes.map(c => (
                  <div key={c.id} className="bg-[#0d1322] border border-slate-800 rounded-2xl p-5 hover:border-cyan-500/30 transition">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-xs text-cyan-500 font-mono mb-1">{c.rif}</div>
                        <h3 className="text-lg font-bold text-white">{c.nombre}</h3>
                        <p className="text-xs text-slate-400">{c.tipo} • {c.direccion}</p>
                      </div>
                      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] rounded font-bold border border-emerald-500/20">{c.estado}</span>
                    </div>
                    <div className="text-sm text-slate-300 mt-4 mb-4 line-clamp-2">{c.notas}</div>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 rounded-lg text-xs font-bold transition">Ver Expedientes ({c.expedientesActivos})</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'calendario' && (
            <div className="max-w-4xl mx-auto">
               <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-6"><Calendar className="w-6 h-6 text-cyan-400" /> Calendario Procesal</h1>
               <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6">
                 <div className="text-center mb-6 text-xl font-bold text-white">Octubre 2026</div>
                 <div className="space-y-3">
                   {eventosCalendario.map(ev => (
                     <div key={ev.id} className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl">
                       <div className="w-16 text-center border-r border-slate-800 pr-4">
                         <div className="text-xs text-slate-500 uppercase">{ev.mes}</div>
                         <div className="text-2xl font-bold text-amber-400">{ev.dia}</div>
                       </div>
                       <div className="flex-1">
                         <div className="text-sm font-bold text-white">{ev.titulo}</div>
                         <div className="text-xs text-slate-400">{ev.exp} • {ev.tipo} • {ev.lugar}</div>
                       </div>
                       <div className="text-sm font-mono text-cyan-400">{ev.hora}</div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          )}

          {activeTab === 'actas_minutas' && (
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center mt-10">
              <Mic className="w-16 h-16 text-cyan-400 mb-4" />
              <h1 className="text-2xl font-bold text-white mb-2">Grabador de Actas (Whisper)</h1>
              <p className="text-slate-400 max-w-lg mb-8">Graba reuniones directamente aquí o sube un audio. La IA transcribirá la sesión, extraerá los acuerdos vinculantes y te permitirá asignarlos al planificador.</p>
              
              <button 
                onClick={() => setGrabandoAudioLocal(!grabandoAudioLocal)}
                className={`w-32 h-32 rounded-full flex flex-col items-center justify-center gap-2 border-4 transition-all ${grabandoAudioLocal ? 'border-rose-500 bg-rose-500/20 text-rose-400 animate-pulse' : 'border-cyan-500 bg-[#0d1322] text-cyan-400 hover:bg-slate-900'}`}
              >
                {grabandoAudioLocal ? <Square className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                <span className="font-bold text-xs">{grabandoAudioLocal ? "Detener" : "Grabar"}</span>
              </button>
            </div>
          )}

          {activeTab === 'metricas' && (
            <div className="max-w-5xl mx-auto">
               <h1 className="text-2xl font-bold text-white flex items-center gap-2 mb-6"><BarChart3 className="w-6 h-6 text-cyan-400" /> Métricas del Despacho (FinOps)</h1>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 text-center">
                   <div className="text-slate-500 text-xs font-bold uppercase mb-2">Valor Desbloqueado</div>
                   <div className="text-3xl font-bold text-emerald-400">$125,000</div>
                 </div>
                 <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 text-center">
                   <div className="text-slate-500 text-xs font-bold uppercase mb-2">Riesgo Prevenido</div>
                   <div className="text-3xl font-bold text-cyan-400">$85,000</div>
                 </div>
                 <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 text-center">
                   <div className="text-slate-500 text-xs font-bold uppercase mb-2">Ahorro de Tiempo</div>
                   <div className="text-3xl font-bold text-purple-400">82%</div>
                 </div>
               </div>
            </div>
          )}

        </div>

        {/* BARRA INFERIOR MÓVIL */}
        <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#090d16]/95 border-t border-slate-800 backdrop-blur-lg z-50 flex items-center justify-around px-2">
          {[
            { id: 'chat_ia', label: 'Consultor', icon: Bot },
            { id: 'preparador_recaudos', label: 'Cámara', icon: Camera },
            { id: 'redactor_documentos', label: 'Modelos', icon: FileCode },
            { id: 'planificador', label: 'Tareas', icon: CheckSquare }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors ${activeTab === item.id ? 'text-cyan-400' : 'text-slate-500'}`}>
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-bold">{item.label}</span>
            </button>
          ))}
          <button onClick={() => setMobileMenuOpen(true)} className="flex flex-col items-center justify-center p-2 text-slate-500">
            <Menu className="w-5 h-5 mb-1" />
            <span className="text-[9px] font-bold">Más</span>
          </button>
        </div>
      </main>

      {/* MENÚ MÓVIL DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 md:hidden flex justify-end">
          <div className="w-64 bg-[#0d1322] h-full flex flex-col border-l border-slate-800 animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <span className="font-bold text-white text-sm">Menú Principal</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {[
                  { id: 'chat_ia', label: 'Consultor Jurídico', icon: Bot },
                  { id: 'redactor_mensajes', label: 'Mensajes WhatsApp', icon: MessageCircle },
                  { id: 'preparador_recaudos', label: 'Preparador Recaudos', icon: Camera },
                  { id: 'redactor_documentos', label: 'Redactor 544 Modelos', icon: FileCode },
                  { id: 'planificador', label: 'Gestor Tareas', icon: CheckSquare },
                  { id: 'crm', label: 'Directorio CRM', icon: Users },
                  { id: 'calendario', label: 'Calendario', icon: Calendar },
                  { id: 'actas_minutas', label: 'Grabador', icon: Mic },
                  { id: 'metricas', label: 'Métricas', icon: BarChart3 }
              ].map(item => (
                <button 
                  key={item.id} 
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left ${activeTab === item.id ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
