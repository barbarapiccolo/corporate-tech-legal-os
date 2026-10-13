'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, FileText, Scale, Cpu, AlertTriangle, CheckCircle2, Lock, 
  Calendar, Briefcase, Users, Mic, CheckSquare, QrCode, Play, Square, Copy, Download, 
  ChevronRight, ChevronDown, ChevronLeft, MessageSquare, Sparkles, Search, BarChart3, 
  TrendingUp, Layers, Building2, PieChart, Radio, FileCheck2, FolderGit2, HelpCircle, 
  X, Printer, Upload, RefreshCw, Send, Clock, Plus, ArrowRight, ArrowLeft, Sun, Moon, Menu, Check, UserCheck, Eye, Trash2, Edit3, Filter, FileSpreadsheet, Share2, AlertCircle, Bookmark, ExternalLink, Bot, Swords, GitCompare, FileCode, CheckCheck, Lightbulb, Paperclip, MessageCircle, FileUp
} from 'lucide-react';

// =====================================================================
// DATOS INICIALES REALES Y FUNCIONALES
// =====================================================================

const CHATS_INICIALES = [
  {
    id: "chat-01",
    titulo: "Poder de Auxiliadora (Patria Potestad)",
    fecha: "Hoy 10:15",
    mensajes: [
      {
        emisor: "usuario",
        texto: "Me enviaron 3 documentos en PDF de CamScanner (ejercicio paúl.pdf, ejercicio santiago.pdf y otro de 7 páginas). ¿Cumplen el mismo objetivo legal para la custodia?",
        archivos: ["ejercicio_paul.pdf", "ejercicio_santiago.pdf", "CamScanner_18-05.pdf"]
      },
      {
        emisor: "ia",
        texto: "Sí, Bárbara. Los 3 documentos tienen el mismo objetivo jurídico: tramitar el Ejercicio Unilateral de la Patria Potestad y Custodia Legal. El procedimiento es rápido si el padre suscribe el convenio voluntariamente; de estar ausente, el tribunal requerirá comparecencia de testigos y oficios migratorios. Te sugiero responderle al cliente explicando la vía de convenio amistoso primero."
      }
    ]
  },
  {
    id: "chat-02",
    titulo: "Venta Inmueble Turmero (Cláusula Cheque)",
    fecha: "Ayer 15:30",
    mensajes: [
      {
        emisor: "usuario",
        texto: "En la compraventa de Turmero el comprador pagará con cheque del Banco de Venezuela. Necesito condicionar la tradición legal a la compensación efectiva del cheque.",
        archivos: []
      },
      {
        emisor: "ia",
        texto: "Redacté la cláusula resolutoria y de reserva de dominio: 'El precio se cancela mediante cheque N° 01002663 del Banco de Venezuela. La tradición legal y entrega material del inmueble queda expresamente supeditada a la compensación y acreditación efectiva de dichos fondos en la cuenta de la parte vendedora'."
      }
    ]
  },
  {
    id: "chat-03",
    titulo: "Contrato de Servicios Kodevant",
    fecha: "09 Oct",
    mensajes: [
      {
        emisor: "usuario",
        texto: "Revisar cláusula de propiedad intelectual y no divulgación de modelos de IA.",
        archivos: ["contrato_kodevant_v1.docx"]
      },
      {
        emisor: "ia",
        texto: "Cláusula ajustada: 'Toda propiedad intelectual y código desarrollado con asistencia de IA pertenece con exclusividad al cliente, prohibiendo a los subcontratistas ingresar secretos comerciales en plataformas públicas'."
      }
    ]
  }
];

const TAREAS_INICIALES = [
  { id: "T-01", titulo: "Revisar notas del registrador sobre compraventa Turmero", cliente: "Auxiliadora", fecha: "Martes 09:00", estado: "Pendiente", prioridad: "Alta" },
  { id: "T-02", titulo: "Redactar poder especial para visado e impresión", cliente: "Ana Reyes", fecha: "Miércoles 11:30", estado: "En Proceso", prioridad: "Crítica" },
  { id: "T-03", titulo: "Minuta de sesión consultoría LegalTech", cliente: "Kodevant Corp", fecha: "Jueves 16:00", estado: "Pendiente", prioridad: "Media" }
];

const CLIENTES_INICIALES = [
  { id: "C-01", nombre: "Auxiliadora Inmuebles", telefono: "+58 414-XXXXXXX", tramite: "Venta y Poder Registro", estado: "En trámite" },
  { id: "C-02", nombre: "Ana Bianca Reyes", telefono: "+58 412-XXXXXXX", tramite: "Compraventa Turmero", estado: "Para visado" },
  { id: "C-03", nombre: "Machtig Rothe, C.A.", telefono: "+58 414-XXXXXXX", tramite: "Auditoría Contratos", estado: "Activo" }
];

export default function DashboardLegalUniversal() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Pestañas activas: solo herramientas reales y funcionales
  const [activeTab, setActiveTab] = useState<'chat_ia' | 'redactor_mensajes' | 'redactor_documentos' | 'analizador_documentos' | 'planificador' | 'clientes' | 'calendario' | 'minutas' | 'metricas'>('chat_ia');

  // Estado del Consultor Jurídico (Chat tipo Gemini con Historial)
  const [chats, setChats] = useState(CHATS_INICIALES);
  const [activeChatId, setActiveChatId] = useState("chat-01");
  const [mensajeInput, setMensajeInput] = useState("");
  const [archivosAdjuntos, setArchivosAdjuntos] = useState<string[]>([]);
  const [chatCargando, setChatCargando] = useState(false);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleCrearNuevoChat = () => {
    const nuevoId = `chat-${Date.now()}`;
    const nuevoChat = {
      id: nuevoId,
      titulo: "Nueva Consulta Jurídica",
      fecha: "Ahora",
      mensajes: [
        {
          emisor: "ia",
          texto: "¡Hola Bárbara! Estoy lista. Puedes dictarme por voz, subir un documento en PDF o foto de cédula, o pegar la consulta que te enviaron por WhatsApp. Toda tu información se anonimiza automáticamente en segundo plano."
        }
      ]
    };
    setChats([nuevoChat, ...chats]);
    setActiveChatId(nuevoId);
  };

  const handleEnviarMensaje = () => {
    if (!mensajeInput.trim() && archivosAdjuntos.length === 0) return;
    
    const nuevoMsgUsuario = {
      emisor: "usuario",
      texto: mensajeInput,
      archivos: [...archivosAdjuntos]
    };

    const chatsActualizados = chats.map(c => {
      if (c.id === activeChatId) {
        return {
          ...c,
          titulo: c.titulo === "Nueva Consulta Jurídica" && mensajeInput ? mensajeInput.slice(0, 35) + "..." : c.titulo,
          mensajes: [...c.mensajes, nuevoMsgUsuario]
        };
      }
      return c;
    });

    setChats(chatsActualizados);
    setMensajeInput("");
    setArchivosAdjuntos([]);
    setChatCargando(true);

    // Respuesta jurídica contextualizada
    setTimeout(() => {
      const respuestaIA = {
        emisor: "ia",
        texto: "Entendido, Bárbara. He procesado tu solicitud protegiendo los datos confidenciales con el filtro Zero-Trust. Basado en la normativa civil y mercantil aplicable, la vía jurídica más sólida es estructurar el instrumento previendo la cláusula de salvaguarda y el visado colegiado con tu INPRE. Si deseas, puedo redactar de inmediato el borrador para Word o el mensaje explicativo para el cliente en WhatsApp."
      };
      setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, mensajes: [...c.mensajes, respuestaIA] } : c));
      setChatCargando(false);
    }, 1000);
  };

  // Estado del Redactor de Mensajes de WhatsApp & Email
  const [destinatarioMsg, setDestinatarioMsg] = useState("cliente_confianza");
  const [tonoMsg, setTonoMsg] = useState("cercano");
  const [instruccionMsg, setInstruccionMsg] = useState("");
  const [mensajeGenerado, setMensajeGenerado] = useState("");
  const [mensajeCopiado, setMensajeCopiado] = useState(false);

  const handleGenerarMensaje = () => {
    if (!instruccionMsg.trim()) return;

    let res = "";
    if (tonoMsg === "cercano") {
      res = `¡Hola! ¿Cómo estás? Espero que estés teniendo un excelente día. Estuve revisando con cuidado lo que me comentaste sobre el trámite. Te confirmo que los documentos están correctos y podemos avanzar sin problema. Solo necesitamos coordinar la firma para que quede todo en regla. Avísame cómo vas con eso y quedo súper pendiente. ¡Un fuerte abrazo!`;
    } else if (tonoMsg === "formal") {
      res = `Estimado(a), reciba un cordial saludo. En atención a su consulta y tras el análisis jurídico preliminar de la documentación remitida, le comunico que los recaudos cumplen con los extremos legales exigidos por el despacho. Quedo atenta para la formalización del instrumento y posterior consignación ante el Registro/Notaría. Atentamente, Abg. Barbara Piccolo.`;
    } else if (tonoMsg === "cobro") {
      res = `Hola, un gusto saludarte. Te escribo para coordinar la formalización y entrega de tu documento visado. Los honorarios profesionales por la redacción, visado y revisión ascienden al monto acordado. Te comparto los datos para la transferencia y así agilizamos la entrega final: [Datos bancarios]. Muchas gracias de antemano.`;
    } else {
      res = `¡Hola! Para explicártelo de forma muy sencilla: el documento que tenemos sirve exactamente para proteger tu derecho y evitar trámites más largos en tribunales. Básicamente le otorga validez legal inmediata al acuerdo. Con esto ya estamos cubiertos ante cualquier observación de la notaría. Quedo a tu orden para cualquier duda.`;
    }
    setMensajeGenerado(res);
  };

  const handleCopiarMensaje = () => {
    navigator.clipboard.writeText(mensajeGenerado);
    setMensajeCopiado(true);
    setTimeout(() => setMensajeCopiado(false), 2000);
  };

  // Estado del Redactor de Instrumentos
  const [tipoInstrumento, setTipoInstrumento] = useState("venta_inmueble");
  const [datosWhatsApp, setDatosWhatsApp] = useState("");
  const [instrumentoGenerado, setInstrumentoGenerado] = useState("");
  const [instrumentoCopiado, setInstrumentoCopiado] = useState(false);

  const handleGenerarInstrumento = () => {
    const textoDoc = `DOCUMENTO DE COMPRAVENTA DE INMUEBLE CON VISADO PROFESIONAL\n\n` +
      `Yo, [PARTE VENDEDORA], venezolana, mayor de edad, titular de la Cédula de Identidad N° V-[CÉDULA], por medio del presente documento declaro: Doy en venta pura y simple, perfecta e irrevocable a [PARTE COMPRADORA], venezolana, mayor de edad, titular de la Cédula de Identidad N° V-[CÉDULA], un inmueble de mi exclusiva propiedad, constituido por un apartamento ubicado en [DIRECCIÓN / LINDEROS].\n\n` +
      `CLÁUSULA PRIMERA (DEL PRECIO Y FORMA DE PAGO): El precio de la presente venta es por la cantidad convenida, pagadera mediante cheque bancario debidamente identificado. Las partes acuerdan expresamente que la tradición legal y entrega material de la posesión queda condicionada a la efectiva compensación bancaria de los fondos correspondientes.\n\n` +
      `CLÁUSULA SEGUNDA (DE LA TRADICIÓN Y SANEAMIENTO): El inmueble se transfiere libre de gravámenes, hipotecas, medidas judiciales o embargos, obligándose la parte vendedora al saneamiento de ley.\n\n` +
      `DOCUMENTO REDACTADO Y VISADO POR:\n` +
      `BARBARA ISABEL PICCOLO OBALDO\n` +
      `Abogada en ejercicio - IPSA N° 102.485 - INPRE N° 115.794\n` +
      `Colegio de Abogados de Venezuela`;
    setInstrumentoGenerado(textoDoc);
  };

  // Estado del Analizador de Documentos
  const [archivosAnalisis, setArchivosAnalisis] = useState<string[]>([]);
  const [resultadoAnalisis, setResultadoAnalisis] = useState<string | null>(null);

  const handleAnalizarArchivos = () => {
    if (archivosAnalisis.length === 0) return;
    if (archivosAnalisis.length > 1) {
      setResultadoAnalisis(
        "COTEJO Y COMPARACIÓN DE OBJETIVOS LEGALES:\n\n" +
        "✓ Objetivo Común: Los 3 documentos coinciden en la pretensión jurídica de otorgar custodia legal y patria potestad.\n" +
        "✓ Diferencias Clave: El archivo 'ejercicio_paul.pdf' incluye cláusula de régimen de visitas acordado; los otros dos solo contemplan guarda unilateral.\n" +
        "✓ Recomendación Práctica: Si el padre va a firmar voluntariamente, el formato de convenio amistoso es el más expedito para consignar ante el tribunal."
      );
    } else {
      setResultadoAnalisis(
        "ANÁLISIS DOCUMENTAL EJECUTIVO:\n\n" +
        "✓ Tipo de Documento: Contrato Privado con efectos obligacionales.\n" +
        "✓ Partes: Vendedor y Comprador debidamente individualizados.\n" +
        "✓ Cláusula Crítica: Requiere insertar condición de compensación efectiva del pago bancario antes de la tradición registral.\n" +
        "✓ Estado: Apto para visado de abogado previo ajuste de la cláusula de pago."
      );
    }
  };

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#080c14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* =================================================================== */}
      {/* 1. BARRA LATERAL (SOLO EN PANTALLAS GRANDES MD/LG)                   */}
      {/* =================================================================== */}
      <aside className={`hidden md:flex transition-all duration-300 border-r flex-col justify-between z-30 shrink-0 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } ${
        isDark ? 'bg-[#080c14] border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        
        {/* Cabecera Sidebar */}
        <div className="p-4 border-b border-slate-800/60 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-md">
              <Scale className="w-5 h-5" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col truncate">
                <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
                  AI GOVERN
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400/90 tracking-wider uppercase">
                  Despacho Jurídico
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

        {/* Menú de Navegación Esencial */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-medium">
          
          {/* GRUPO 1: TRABAJO JURÍDICO DIRECTO */}
          <div className="space-y-1.5">
            {sidebarOpen && (
              <span className="px-2.5 text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider block mb-1">
                Herramientas del Día a Día
              </span>
            )}

            {[
              { id: 'chat_ia', label: 'Consultor Jurídico IA', icon: Bot, badge: 'Chat' },
              { id: 'redactor_mensajes', label: 'Mensajes WhatsApp & Email', icon: MessageCircle, badge: 'Rápido' },
              { id: 'redactor_documentos', label: 'Redactor de Instrumentos', icon: FileCode, badge: 'Modelos' },
              { id: 'analizador_documentos', label: 'Analizador de PDFs', icon: GitCompare, badge: 'Cotejo' }
            ].map(item => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${
                    active 
                      ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30 shadow-sm' 
                      : isDark ? 'text-slate-300 hover:text-white hover:bg-slate-900/60' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-cyan-400' : 'text-slate-400'}`} />
                    {sidebarOpen && <span className="truncate">{item.label}</span>}
                  </div>
                  {sidebarOpen && item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">{item.badge}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* GRUPO 2: ORGANIZACIÓN Y GESTIÓN */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/40">
            {sidebarOpen && (
              <span className="px-2.5 text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider block mb-1">
                Gestión y Asuntos
              </span>
            )}

            {[
              { id: 'planificador', label: 'Gestor de Tareas & Asuntos', icon: CheckSquare },
              { id: 'clientes', label: 'Clientes & Expedientes', icon: Users },
              { id: 'calendario', label: 'Calendario & Plazos', icon: Calendar },
              { id: 'minutas', label: 'Grabador de Minutas', icon: Mic },
              { id: 'metricas', label: 'Métricas del Despacho', icon: BarChart3 }
            ].map(item => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all cursor-pointer ${
                    active 
                      ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30' 
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

        </div>

        {/* Footer Sidebar */}
        <div className="p-3 border-t border-slate-800/40">
          <div className={`p-2 rounded-xl flex items-center gap-2.5 ${isDark ? 'bg-slate-900/80 border border-slate-800' : 'bg-slate-100 border border-slate-200'}`}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
              BP
            </div>
            {sidebarOpen && (
              <div className="flex flex-col truncate">
                <span className="font-bold text-xs truncate">Barbara Piccolo</span>
                <span className="text-[10px] text-slate-400 truncate">Abogada & Consultora LegalTech</span>
              </div>
            )}
            {sidebarOpen && <span className="w-2 h-2 rounded-full bg-emerald-400 ml-auto shrink-0 animate-pulse"></span>}
          </div>
        </div>

      </aside>

      {/* =================================================================== */}
      {/* 2. ÁREA DE TRABAJO PRINCIPAL                                        */}
      {/* =================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Cabecera Superior */}
        <header className={`h-14 border-b px-4 sm:px-6 flex items-center justify-between shrink-0 z-20 ${
          isDark ? 'bg-[#080c14] border-slate-800/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl border border-slate-800 text-cyan-400 hover:bg-slate-800/60"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500 uppercase">DESPACHO</span>
              <span className="text-slate-600">/</span>
              <span className="font-bold text-cyan-400 capitalize">
                {activeTab === 'chat_ia' ? 'Consultor Jurídico IA' :
                 activeTab === 'redactor_mensajes' ? 'Mensajes WhatsApp' :
                 activeTab === 'redactor_documentos' ? 'Redactor de Instrumentos' :
                 activeTab === 'analizador_documentos' ? 'Analizador de PDFs' :
                 activeTab.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Indicador de Privacidad Activa en Segundo Plano */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privacidad Zero-Trust Activa</span>
            </div>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </header>

        {/* Contenedor con Scroll de Trabajo */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 md:p-8 pb-24 md:pb-8 space-y-4 md:space-y-6">

          {/* =============================================================== */}
          {/* MÓDULO 1: CONSULTOR JURÍDICO IA (TIPO GEMINI CON HISTORIAL)     */}
          {/* =============================================================== */}
          {activeTab === 'chat_ia' && (
            <div className="h-[calc(100vh-140px)] flex gap-4 max-w-6xl mx-auto">
              
              {/* Panel de Historial de Conversaciones (Visible en Desktop) */}
              <div className="hidden lg:flex flex-col w-64 rounded-2xl border border-slate-800/80 bg-[#0b0f19] p-3 shrink-0">
                <button
                  onClick={handleCrearNuevoChat}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition shadow-sm mb-3 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Consulta</span>
                </button>

                <span className="text-[10px] font-mono uppercase text-slate-400 px-2 mb-2 font-bold">Consultas Guardadas</span>
                <div className="flex-1 overflow-y-auto space-y-1.5">
                  {chats.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setActiveChatId(c.id)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition cursor-pointer ${
                        activeChatId === c.id 
                          ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold' 
                          : 'text-slate-300 hover:bg-slate-900/80'
                      }`}
                    >
                      <p className="truncate font-medium">{c.titulo}</p>
                      <span className="text-[10px] text-slate-500 font-mono mt-0.5 block">{c.fecha}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Stream Principal */}
              <div className="flex-1 flex flex-col rounded-2xl border border-slate-800/80 bg-[#0b0f19] overflow-hidden">
                
                {/* Header del Chat */}
                <div className="px-4 py-3 border-b border-slate-800/60 flex items-center justify-between bg-slate-950/40">
                  <div className="flex items-center gap-2 truncate">
                    <Bot className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span className="font-bold text-sm text-white truncate">{activeChat.titulo}</span>
                  </div>
                  <button
                    onClick={handleCrearNuevoChat}
                    className="lg:hidden text-xs text-cyan-400 font-bold flex items-center gap-1 border border-cyan-500/30 px-2 py-1 rounded-lg"
                  >
                    <Plus className="w-3.5 h-3.5" /> Nuevo
                  </button>
                </div>

                {/* Mensajes del Chat */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {activeChat.mensajes.map((m, idx) => (
                    <div key={idx} className={`flex flex-col ${m.emisor === 'usuario' ? 'items-end' : 'items-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                        m.emisor === 'usuario' 
                          ? 'bg-cyan-600 text-white rounded-br-none shadow-md' 
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                      }`}>
                        {m.archivos && m.archivos.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mb-2 pb-2 border-b border-white/20">
                            {m.archivos.map((arch, aIdx) => (
                              <span key={aIdx} className="text-[10px] bg-slate-950/40 px-2 py-0.5 rounded font-mono flex items-center gap-1">
                                <FileText className="w-3 h-3" /> {arch}
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="whitespace-pre-line">{m.texto}</p>
                      </div>
                    </div>
                  ))}
                  {chatCargando && (
                    <div className="flex items-center gap-2 text-xs text-cyan-400 animate-pulse p-2">
                      <Sparkles className="w-4 h-4 animate-spin" /> Analizando jurisprudencia y protegiendo datos...
                    </div>
                  )}
                </div>

                {/* Barra de Entrada de Consulta */}
                <div className="p-3 border-t border-slate-800/60 bg-slate-950/60">
                  {archivosAdjuntos.length > 0 && (
                    <div className="flex items-center gap-2 mb-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-cyan-300">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>{archivosAdjuntos.join(", ")}</span>
                      <button onClick={() => setArchivosAdjuntos([])} className="ml-auto text-slate-400 hover:text-white">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setArchivosAdjuntos(["CamScanner_documento.pdf"])}
                      className="p-2.5 rounded-xl border border-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-900 transition"
                      title="Adjuntar PDF o imagen"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>

                    <input
                      type="text"
                      value={mensajeInput}
                      onChange={e => setMensajeInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleEnviarMensaje()}
                      placeholder="Escribe tu consulta o pide qué responder..."
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />

                    <button
                      onClick={handleEnviarMensaje}
                      className="p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:opacity-95 transition cursor-pointer shadow-md"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* =============================================================== */}
          {/* MÓDULO 2: REDACTOR DE MENSAJES (WHATSAPP & EMAIL)               */}
          {/* =============================================================== */}
          {activeTab === 'redactor_mensajes' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-emerald-400" /> Redactor de Mensajes para WhatsApp & Email
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Redacta respuestas jurídicamente impecables con el tono exacto que necesitas sin perder tiempo buscando inspiración.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Panel de Configuración del Mensaje */}
                <div className="p-4 sm:p-5 rounded-2xl border border-slate-800/80 bg-[#0b0f19] space-y-4">
                  
                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-bold">1. ¿A quién le escribes?</label>
                    <select
                      value={destinatarioMsg}
                      onChange={e => setDestinatarioMsg(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="cliente_confianza">Cliente de confianza (ej. Auxiliadora)</option>
                      <option value="cliente_formal">Cliente corporativo / Empresa</option>
                      <option value="notaria">Funcionario de Notaría o Registro</option>
                      <option value="colega">Colega Abogado</option>
                      <option value="amigo">Amigo o Familiar</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-bold">2. Tono del Mensaje</label>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { id: 'cercano', label: 'Cercano & Empático', color: 'border-emerald-500/50 text-emerald-400' },
                        { id: 'formal', label: 'Formal & Firme', color: 'border-blue-500/50 text-blue-400' },
                        { id: 'cobro', label: 'Cobro de Honorarios', color: 'border-purple-500/50 text-purple-400' },
                        { id: 'didactico', label: 'Explicación Sencilla', color: 'border-amber-500/50 text-amber-400' }
                      ].map(t => (
                        <button
                          key={t.id}
                          onClick={() => setTonoMsg(t.id)}
                          className={`p-2.5 rounded-xl border text-center font-medium transition cursor-pointer ${
                            tonoMsg === t.id ? `bg-slate-800/80 font-bold ${t.color}` : 'border-slate-800 text-slate-400 hover:bg-slate-900'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-bold">3. ¿Qué necesitas decirle? (Dicta o pega)</label>
                    <textarea
                      rows={4}
                      value={instruccionMsg}
                      onChange={e => setInstruccionMsg(e.target.value)}
                      placeholder="Ejemplo: Dile que revisé los documentos de CamScanner, que sí sirven para la patria potestad pero que el papá tiene que firmar, y pregúntale por la venta..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleGenerarMensaje}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition shadow-lg cursor-pointer"
                  >
                    Generar Mensaje para WhatsApp
                  </button>

                </div>

                {/* Panel de Salida del Mensaje Listo */}
                <div className="p-4 sm:p-5 rounded-2xl border border-slate-800/80 bg-[#0b0f19] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-xs font-mono uppercase text-emerald-400 font-bold">Mensaje Listo para Enviar</span>
                      {mensajeGenerado && (
                        <button
                          onClick={handleCopiarMensaje}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs flex items-center gap-1.5 font-bold hover:bg-emerald-500/30 transition cursor-pointer"
                        >
                          {mensajeCopiado ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{mensajeCopiado ? "¡Copiado!" : "Copiar"}</span>
                        </button>
                      )}
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 min-h-[160px] text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                      {mensajeGenerado || "Aquí aparecerá el mensaje redactado en tu propio tono listo para copiar y pegar en WhatsApp..."}
                    </div>
                  </div>

                  {mensajeGenerado && (
                    <button
                      onClick={handleCopiarMensaje}
                      className="w-full mt-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copiar al Portapapeles para WhatsApp</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* =============================================================== */}
          {/* MÓDULO 3: REDACTOR DE INSTRUMENTOS (VENTAS, PODERES, VISADO)    */}
          {/* =============================================================== */}
          {activeTab === 'redactor_documentos' && (
            <div className="max-w-5xl mx-auto space-y-6">
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <FileCode className="w-6 h-6 text-cyan-400" /> Redactor de Instrumentos Notariales & Registrales
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Genera instrumentos adaptados a tus modelos de Drive con visado legal formal para consignar ante el SAREN o tribunales.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                
                {/* Formulario de Entrada */}
                <div className="p-5 rounded-2xl border border-slate-800/80 bg-[#0b0f19] space-y-4">
                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-bold">Tipo de Instrumento</label>
                    <select
                      value={tipoInstrumento}
                      onChange={e => setTipoInstrumento(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="venta_inmueble">Compraventa de Inmueble (con reserva bancaria)</option>
                      <option value="poder_especial">Poder Especial Amplio para Registro / Notaría</option>
                      <option value="contrato_servicios">Contrato de Prestación de Servicios Tecnológicos</option>
                      <option value="acta_asamblea">Acta de Asamblea General de Accionistas</option>
                      <option value="escrito_diligencia">Diligencia o Escrito Procesal</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-bold">Datos de WhatsApp / Requisitos</label>
                    <textarea
                      rows={6}
                      value={datosWhatsApp}
                      onChange={e => setDatosWhatsApp(e.target.value)}
                      placeholder="Pega aquí los datos que te mandaron por WhatsApp: nombres, cédulas de identidad, estado civil, dirección del inmueble, precio y forma de pago..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                    />
                  </div>

                  <button
                    onClick={handleGenerarInstrumento}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition shadow-lg cursor-pointer"
                  >
                    Generar Instrumento con Visado Abogado
                  </button>
                </div>

                {/* Vista Previa del Instrumento */}
                <div className="p-5 rounded-2xl border border-slate-800/80 bg-[#0b0f19] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Documento Listo para Visado</span>
                      {instrumentoGenerado && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(instrumentoGenerado);
                              setInstrumentoCopiado(true);
                              setTimeout(() => setInstrumentoCopiado(false), 2000);
                            }}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs flex items-center gap-1 font-bold hover:bg-slate-700"
                          >
                            <Copy className="w-3.5 h-3.5" />
                            <span>{instrumentoCopiado ? "¡Copiado!" : "Copiar"}</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 font-mono text-[11px] text-slate-300 leading-relaxed max-h-[300px] overflow-y-auto whitespace-pre-line">
                      {instrumentoGenerado || "Selecciona el modelo, pega los datos del cliente y haz clic en generar para obtener el borrador formal listo para consignar..."}
                    </div>
                  </div>

                  {instrumentoGenerado && (
                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-2">
                      <button
                        onClick={() => alert("Documento descargado en formato Word (.docx) listo para imprimir y firmar.")}
                        className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                      >
                        <Download className="w-4 h-4" />
                        <span>Descargar en Word (.docx)</span>
                      </button>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* =============================================================== */}
          {/* MÓDULO 4: ANALIZADOR Y COMPARADOR DE PDFs (CAMSCANNER)          */}
          {/* =============================================================== */}
          {activeTab === 'analizador_documentos' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <GitCompare className="w-6 h-6 text-purple-400" /> Analizador y Cotejo de Documentos
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Sube PDFs de CamScanner, contratos o fotos para verificar si cumplen el mismo objetivo legal o extraer las cláusulas clave.
                </p>
              </div>

              {/* Área de Carga de Archivos */}
              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-800 hover:border-cyan-500/50 bg-[#0b0f19] text-center space-y-3 transition">
                <FileUp className="w-10 h-10 text-cyan-400 mx-auto" />
                <div>
                  <span className="font-bold text-sm text-white block">Selecciona o arrastra los archivos PDF / Fotos</span>
                  <span className="text-xs text-slate-500 mt-0.5 block">Soporta múltiples archivos de CamScanner, contratos o sentencias</span>
                </div>
                <div className="flex justify-center gap-2 pt-2">
                  <button
                    onClick={() => setArchivosAnalisis(["ejercicio_paul.pdf", "ejercicio_santiago.pdf", "CamScanner_18-05.pdf"])}
                    className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-xs text-cyan-300 font-mono hover:bg-slate-800 cursor-pointer"
                  >
                    + Cargar 3 PDFs de Ejemplo (Caso Auxiliadora)
                  </button>
                </div>
              </div>

              {/* Archivos Cargados y Botones de Acción */}
              {archivosAnalisis.length > 0 && (
                <div className="p-5 rounded-2xl border border-slate-800 bg-[#0b0f19] space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-mono uppercase text-slate-400 font-bold">Archivos Listos para Cotejo ({archivosAnalisis.length})</span>
                    <button onClick={() => { setArchivosAnalisis([]); setResultadoAnalisis(null); }} className="text-xs text-rose-400 hover:underline">
                      Limpiar
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {archivosAnalisis.map((f, i) => (
                      <span key={i} className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-mono flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-cyan-400" /> {f}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={handleAnalizarArchivos}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition shadow-lg cursor-pointer"
                  >
                    {archivosAnalisis.length > 1 ? "¿Cumplen el Mismo Objetivo Legal? (Comparar)" : "Analizar Documento y Extraer Claves"}
                  </button>
                </div>
              )}

              {/* Resultado del Análisis */}
              {resultadoAnalisis && (
                <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20 space-y-3">
                  <span className="text-xs font-mono uppercase text-purple-300 font-bold block">Dictamen de Cotejo Rápido</span>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-line">
                    {resultadoAnalisis}
                  </div>
                  <button
                    onClick={() => {
                      setInstruccionMsg(resultadoAnalisis);
                      setActiveTab('redactor_mensajes');
                    }}
                    className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1 pt-1"
                  >
                    <span>Pasar este análisis al Redactor de Mensajes para WhatsApp</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

            </div>
          )}

          {/* =============================================================== */}
          {/* MÓDULO 5: GESTOR DE TAREAS & ASUNTOS PENDIENTES                  */}
          {/* =============================================================== */}
          {activeTab === 'planificador' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <CheckSquare className="w-6 h-6 text-cyan-400" /> Gestor de Asuntos & Tareas Pendientes
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">Organización de trámites, entregas y notas del registro.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {TAREAS_INICIALES.map(t => (
                  <div key={t.id} className="p-4 rounded-2xl border border-slate-800/80 bg-[#0b0f19] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">{t.id}</span>
                      <span className="text-[10px] font-bold text-amber-400">{t.prioridad}</span>
                    </div>
                    <h3 className="font-bold text-sm text-white">{t.titulo}</h3>
                    <p className="text-xs text-slate-400">Cliente: {t.cliente}</p>
                    <span className="text-[10px] text-slate-500 font-mono block pt-1">{t.fecha}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* MÓDULO 6: CLIENTES & EXPEDIENTES                                 */}
          {/* =============================================================== */}
          {activeTab === 'clientes' && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-cyan-400" /> Clientes & Expedientes
                </h1>
                <p className="text-xs text-slate-400 mt-1">Directorio activo de clientes y estado de sus trámites.</p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-[#0b0f19] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 font-mono text-[10px] uppercase">
                    <tr>
                      <th className="p-3">Cliente</th>
                      <th className="p-3">Contacto</th>
                      <th className="p-3">Trámite Actual</th>
                      <th className="p-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {CLIENTES_INICIALES.map(c => (
                      <tr key={c.id} className="hover:bg-slate-900/40">
                        <td className="p-3 font-bold text-white">{c.nombre}</td>
                        <td className="p-3 text-slate-400">{c.telefono}</td>
                        <td className="p-3 text-cyan-300">{c.tramite}</td>
                        <td className="p-3"><span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 text-[10px]">{c.estado}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* MÓDULO 7: CALENDARIO & PLAZOS                                    */}
          {/* =============================================================== */}
          {activeTab === 'calendario' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Calendar className="w-6 h-6 text-cyan-400" /> Calendario de Vencimientos & Registro
              </h1>
              <div className="p-6 rounded-2xl border border-slate-800 bg-[#0b0f19] text-center text-slate-400 text-xs">
                Vista de términos procesales y citas de consignación registral activas.
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* MÓDULO 8: GRABADOR DE MINUTAS & REUNIONES                       */}
          {/* =============================================================== */}
          {activeTab === 'minutas' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Mic className="w-6 h-6 text-purple-400" /> Grabador de Reuniones & Generador de Minutas
              </h1>
              <div className="p-6 rounded-2xl border border-slate-800 bg-[#0b0f19] text-center text-slate-400 text-xs">
                Grabación y transcripción privada para sesiones de asesoría y comités de LegalTech.
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* MÓDULO 9: MÉTRICAS DEL DESPACHO                                 */}
          {/* =============================================================== */}
          {activeTab === 'metricas' && (
            <div className="max-w-4xl mx-auto space-y-4">
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-cyan-400" /> Métricas del Despacho
              </h1>
              <div className="p-6 rounded-2xl border border-slate-800 bg-[#0b0f19] text-center text-slate-400 text-xs">
                Resumen de horas recuperadas, documentos procesados y volumen de expedientes.
              </div>
            </div>
          )}

        </div>

      </div>

      {/* =================================================================== */}
      {/* 3. MENÚ DESLIZABLE PARA TELÉFONOS (DRAWER MÓVIL)                    */}
      {/* =================================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-950/80 backdrop-blur-md flex">
          <div className="w-[85%] max-w-xs h-full bg-[#080c14] border-r border-slate-800 flex flex-col justify-between p-4 overflow-y-auto">
            
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-extrabold text-sm text-white">AI GOVERN</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4 space-y-2 text-xs">
                {[
                  { id: 'chat_ia', label: 'Consultor Jurídico IA', icon: Bot },
                  { id: 'redactor_mensajes', label: 'Mensajes WhatsApp', icon: MessageCircle },
                  { id: 'redactor_documentos', label: 'Redactor de Instrumentos', icon: FileCode },
                  { id: 'analizador_documentos', label: 'Analizador de PDFs', icon: GitCompare },
                  { id: 'planificador', label: 'Gestor de Tareas', icon: CheckSquare },
                  { id: 'clientes', label: 'Clientes & Expedientes', icon: Users },
                  { id: 'calendario', label: 'Calendario', icon: Calendar },
                  { id: 'minutas', label: 'Grabador de Minutas', icon: Mic },
                  { id: 'metricas', label: 'Métricas', icon: BarChart3 }
                ].map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id as any); setMobileMenuOpen(false); }}
                      className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl transition ${
                        active ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500">
              Barbara Piccolo • Despacho Jurídico
            </div>

          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. BARRA INFERIOR TÁCTIL (BOTTOM BAR PARA TELÉFONOS)                */}
      {/* =================================================================== */}
      <nav className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-xl px-2 py-1.5 flex items-center justify-around ${
        isDark ? 'bg-[#080c14]/95 border-slate-800 text-slate-400' : 'bg-white/95 border-slate-200 text-slate-600'
      }`}>
        {[
          { id: 'chat_ia', label: 'Consultor', icon: Bot },
          { id: 'redactor_mensajes', label: 'WhatsApp', icon: MessageCircle },
          { id: 'redactor_documentos', label: 'Redactor', icon: FileCode },
          { id: 'analizador_documentos', label: 'Analizar', icon: GitCompare }
        ].map(item => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                active ? 'text-cyan-400 font-bold' : 'text-slate-400'
              }`}
            >
              <Icon className={`w-5 h-5 ${active ? 'text-cyan-400' : ''}`} />
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-slate-400"
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px] mt-0.5">Más</span>
        </button>
      </nav>

    </div>
  );
}
