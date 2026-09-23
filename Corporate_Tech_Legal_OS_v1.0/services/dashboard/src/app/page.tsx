'use client';

import React, { useState } from 'react';
import {
  Shield, FileText, Scale, Cpu, AlertTriangle, CheckCircle2, Lock,
  Calendar, Briefcase, Users, Mic, CheckSquare, Play, Copy, Download,
  ChevronRight, ChevronDown, MessageSquare, Sparkles, Search, BarChart3,
  TrendingUp, Layers, Building2, PieChart, FileCheck2, FolderGit2, X,
  Printer, ArrowRight, Zap, RefreshCw, Eye, Check, ExternalLink, Terminal
} from 'lucide-react';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('cockpit');
  
  // Estados de Taller de Contratos
  const [tipoContrato, setTipoContrato] = useState('SaaS_MSA');
  const [jurisdiccion, setJurisdiccion] = useState('Delaware (EE.UU.)');
  const [partesContrato, setPartesContrato] = useState('CloudCore Technologies Inc. (Prestador) y Acme Logistics Corp. (Cliente)');
  const [clausulasClave, setClausulasClave] = useState('Suscripción Enterprise $75,000/año. SLA garantizado 99.9%. Cláusula Zero-Retention: ningún dato corporativo ni código alimentará modelos públicos de IA. Límite de responsabilidad acotado a 12 meses de facturación.');
  const [generandoContrato, setGenerandoContrato] = useState(false);
  const [contratoGenerado, setContratoGenerado] = useState('');
  const [contratoCopiado, setContratoCopiado] = useState(false);

  // Estados de Auditor de Contratos & Playbook Redlining
  const [textoContraparte, setTextoContraparte] = useState('CLÁUSULA 8. INDEMNIZACIÓN Y RESPONSABILIDAD:\nEl Proveedor indemnizará y mantendrá indemne al Cliente de forma ilimitada contra cualquier reclamo, pérdida o daño indirecto.\n\nCLÁUSULA 12. PROPIEDAD INTELECTUAL:\nTodo código fuente, algoritmos, adaptaciones y desarrollos derivados pertenecerán de manera exclusiva y perpetua al Cliente.\n\nCLÁUSULA 15. FORO Y LEY APLICABLE:\nEste contrato se regirá exclusivamente por las leyes y tribunales de Singapur.');
  const [auditandoContrato, setAuditandoContrato] = useState(false);
  const [analisisPlaybook, setAnalisisPlaybook] = useState<any>(null);

  // Estados de Aduana Zero-Trust & Prompt Shield (Bidireccional)
  const [textoAduana, setTextoAduana] = useState('El cliente TechCorp Corp con EIN 12-3456789 y domicilio en Austin, Texas, solicita procesar contrato por $120,000 USD mediante transferencia a la cuenta bancaria 987654321098. El contacto legal directo es el Director de Tecnología david.miller@techcorp.com.');
  const [resultadoAduana, setResultadoAduana] = useState<any>(null);
  const [cargandoAduana, setCargandoAduana] = useState(false);
  const [textoParaRestaurar, setTextoParaRestaurar] = useState('');
  const [textoRestaurado, setTextoRestaurado] = useState('');

  // Estados de De Reunión a Contrato
  const [notasReunion, setNotasReunion] = useState('Reunión de cierre con Nexo Financial Inc. Participaron: Barbara Piccolo (General Counsel) y Carlos Gómez (VP de Finanzas Nexo). Acuerdos: SaaS anual por $60,000 USD facturado por adelantado. Exigen SLA del 99.9% con penalidad del 5% mensual si se incumple. Aceptaron Delaware como jurisdicción neutral y límite de responsabilidad de 12 meses. Nexo requiere garantía expresa de que sus datos financieros nunca serán usados para reentrenar IA comercial. Barbara enviará SaaS MSA final este jueves antes de las 17:00.');
  const [procesandoMinuta, setProcesandoMinuta] = useState(false);
  const [minutaExtraida, setMinutaExtraida] = useState<any>({
    titulo: 'Negociación de Suscripción SaaS Enterprise & Términos de Datos',
    partes: 'CloudCore Inc. & Nexo Financial Inc.',
    duracion: '35 minutos',
    fecha: '23 de Septiembre de 2026',
    resumen: 'Acuerdo sobre términos comerciales de suscripción SaaS anual por $60,000 USD. Nexo aceptó jurisdicción en Delaware y límite de responsabilidad de 1x anual a cambio de SLA garantizado del 99.9% y cláusula de blindaje de datos sin reentrenamiento de IA.',
    terminos_pactados: [
      'Monto: $60,000 USD facturación anual anticipada.',
      'SLA garantizado: 99.9% de disponibilidad con créditos de servicio acotados al 5% mensual.',
      'AI Data Protection: Prohibición estricta de reentrenamiento de modelos comerciales con datos de Nexo.',
      'Responsabilidad: Límite agregado equivalente a 12 meses de tarifas efectivamente pagadas.',
      'Jurisdicción: Juzgados y tribunales estatales y federales de Delaware (EE.UU.).'
    ],
    action_items: [
      { responsable: 'Barbara Piccolo (GC)', tarea: 'Redactar SaaS MSA con SLA 99.9% y anexo de protección de datos de IA', plazo: 'Jueves 17:00' },
      { responsable: 'Carlos Gómez (Nexo)', tarea: 'Remitir datos fiscales (EIN) y firma autorizada del CEO', plazo: 'Viernes 12:00' }
    ]
  });

  // Estados de Ventanilla Legal Intake
  const [deptoConsulta, setDeptoConsulta] = useState('Ventas');
  const [urgenciaConsulta, setUrgenciaConsulta] = useState('Alta');
  const [textoConsulta, setTextoConsulta] = useState('Un cliente enterprise nos exige firmar su propio NDA antes de ver la demo técnica. En su cláusula 5 dicen que cualquier idea o feedback compartido durante la llamada pasa a ser de su propiedad exclusiva. ¿Podemos firmar esto para no frenar la llamada de mañana?');
  const [procesandoTicket, setProcesandoTicket] = useState(false);
  const [respuestaTicket, setRespuestaTicket] = useState<any>(null);

  // Estados de SAFE & Venture
  const [safeCompany, setSafeCompany] = useState('CloudCore Technologies Inc.');
  const [safeInvestor, setSafeInvestor] = useState('Blue Horizon Ventures Fund II');
  const [safeAmount, setSafeAmount] = useState('$250,000 USD');
  const [safeValuation, setSafeValuation] = useState('$6,000,000 USD Post-Money');
  const [safeDiscount, setSafeDiscount] = useState('None (Standard YC)');
  const [safeGenerado, setSafeGenerado] = useState('');
  const [generandoSafe, setGenerandoSafe] = useState(false);

  // Acciones Interactivas
  const ejecutarSanitizacion = () => {
    setCargandoAduana(true);
    setTimeout(() => {
      let t = textoAduana
        .replace(/david\.miller@techcorp\.com/g, '[EMAIL_1]')
        .replace(/12-3456789/g, '[ID_FISCAL_EIN_1]')
        .replace(/987654321098/g, '[CUENTA_BANCARIA_1]')
        .replace(/\$120,000 USD/g, '[MONTO_CONFIDENCIAL_1]')
        .replace(/TechCorp Corp/g, '[CLIENTE_ENTERPRISE_1]');
      const mapa = {
        '[CLIENTE_ENTERPRISE_1]': 'TechCorp Corp',
        '[ID_FISCAL_EIN_1]': '12-3456789',
        '[MONTO_CONFIDENCIAL_1]': '$120,000 USD',
        '[CUENTA_BANCARIA_1]': '987654321098',
        '[EMAIL_1]': 'david.miller@techcorp.com'
      };
      setResultadoAduana({
        texto_anonimizado: t,
        tokens_ofuscados: 5,
        mapa_reemplazos: mapa,
        audit_hash: '8f4a2b91c0e357df88a2456b19a84210bc8d1f2e63a54b9c1d0e82f71a93b51a'
      });
      setTextoParaRestaurar(
        'DICTAMEN LEGAL GENERADO POR IA:\nSe aprueba la contratación comercial con [CLIENTE_ENTERPRISE_1] (EIN: [ID_FISCAL_EIN_1]) por el importe pactado de [MONTO_CONFIDENCIAL_1]. Los fondos se transferirán a [CUENTA_BANCARIA_1] con copia al letrado [EMAIL_1]. Cláusula de protección de propiedad intelectual plenamente blindada.'
      );
      setCargandoAduana(false);
    }, 450);
  };

  const ejecutarRestauracion = () => {
    if (!resultadoAduana) return;
    let t = textoParaRestaurar;
    for (const [token, valorReal] of Object.entries(resultadoAduana.mapa_reemplazos)) {
      t = t.replaceAll(token, valorReal as string);
    }
    setTextoRestaurado(t);
  };

  const ejecutarGeneracionContrato = () => {
    setGenerandoContrato(true);
    setTimeout(() => {
      setContratoGenerado(
`================================================================================
MASTER SERVICES AGREEMENT (SaaS MSA)
JURISDICCIÓN: ${jurisdiccion.toUpperCase()}
FECHA EFECTIVA: Septiembre 2026
================================================================================

PARTES:
(1) ${partesContrato}

1. OBJETO Y DISPONIBILIDAD DEL SERVICIO (SLA)
El Proveedor concederá al Cliente una suscripción no exclusiva, revocable conforme a este contrato y de alcance empresarial. El Proveedor garantiza una disponibilidad mensual del Servicio del 99.9% (excluyendo ventanas programadas de mantenimiento preventivo).

2. SOBERANÍA DE DATOS Y PROTECCIÓN DE MODELOS DE INTELIGENCIA ARTIFICIAL (ZERO-RETENTION)
El Proveedor se compromete irrevocablemente a que ningún dato, archivo, información confidencial, código fuente o consulta procesada por el Cliente será almacenada permanentemente por terceros, ni utilizada, compartida o aprovechada para el entrenamiento, ajuste fino (fine-tuning) o mejora de ningún modelo fundacional o comercial de Inteligencia Artificial propio o de terceros.

3. PROPIEDAD INTELECTUAL E INVENCIONES
El Cliente mantendrá la titularidad exclusiva y perpetua sobre todos sus Datos Corporativos y creaciones previas. El Proveedor retiene todos los derechos sobre la plataforma, software base, documentación y componentes propietarios de la solución SaaS.

4. LIMITACIÓN DE RESPONSABILIDAD (MARKET STANDARD)
EN NINGÚN CASO NINGUNA DE LAS PARTES SERÁ RESPONSABLE POR DAÑOS INDIRECTOS, PUNITIVOS O LUCRO CESANTE. LA RESPONSABILIDAD TOTAL Y ACUMULADA DE CADA PARTE SE LIMITA AL MONTO TOTAL DE LAS TARIFAS EFECTIVAMENTE PAGADAS POR EL CLIENTE EN LOS DOCE (12) MESES ANTERIORES AL HECHO GENERADOR.

5. LEY APLICABLE Y RESOLUCIÓN DE DISPUTAS
Este contrato se interpretará y regirá conforme a las leyes del Estado de Delaware (o la jurisdicción seleccionada de mutuo acuerdo), sometiéndose las partes a arbitraje expedito administrado o a los tribunales competentes de dicha jurisdicción.`
      );
      setGenerandoContrato(false);
    }, 600);
  };

  const ejecutarAuditoriaPlaybook = () => {
    setAuditandoContrato(true);
    setTimeout(() => {
      setAnalisisPlaybook({
        alertas_rojas: [
          'Cláusula 8: INDEMNIDAD ILIMITADA. Exige que el Proveedor responda sin tope económico por cualquier reclamo o daño indirecto. (Inaceptable: rompe el estándar corporativo).',
          'Cláusula 12: CESIÓN TOTAL DE IP Y CÓDIGO. Establece que los algoritmos y desarrollos derivados pertenecerán al Cliente. (Riesgo Crítico de pérdida de activos de software).',
          'Cláusula 15: FORO EN SINGAPUR. Jurisdicción distante y litigiosa que eleva los costes de defensa ante cualquier contingencia.'
        ],
        alertas_amarillas: [
          'Ausencia de cláusula de exclusión de daños indirectos (consequential damages).',
          'Omisión de cláusula que prohíba el reentrenamiento de modelos de IA de terceros con datos del proveedor.'
        ],
        matriz: {
          optima: 'Límite de responsabilidad 1x anual de facturación, IP propia 100% retenida, fuero en Delaware o arbitraje neutral.',
          fallback: 'Aceptar un supercap de 2x anual únicamente para brechas de confidencialidad comprobadas; mantener la exclusión total de cesión de IP.',
          walk_away: 'No firmar bajo ninguna circunstancia la cesión de código fuente ni indemnidades ilimitadas.'
        },
        redline_sugerido:
`// CLÁUSULA 8 ALTERNATIVA (REDLINE RECOMENDADO):
"8. LIMITACIÓN DE RESPONSABILIDAD: Salvo dolo comprobado, la responsabilidad total acumulada de las partes no excederá el importe pagado por el Cliente durante los doce (12) meses anteriores al reclamo. Ninguna de las partes responderá por daños indirectos o lucro cesante."

// CLÁUSULA 12 ALTERNATIVA:
"12. PROPIEDAD INTELECTUAL: Cada parte mantendrá la titularidad exclusiva sobre su Propiedad Intelectual preexistente y sobre cualquier desarrollo o software base propio. Ninguna disposición de este contrato transferirá la propiedad de algoritmos o código fuente."`
      });
      setAuditandoContrato(false);
    }, 500);
  };

  const ejecutarTriageTicket = () => {
    setProcesandoTicket(true);
    setTimeout(() => {
      setRespuestaTicket({
        departamento: deptoConsulta,
        urgencia: urgenciaConsulta,
        diagnostico: 'ALTO RIESGO COMERCIAL Y DE PROPIEDAD INTELECTUAL. La cláusula 5 del cliente pretende una cesión automática de feedback e ideas propietarias que contamina el roadmap de producto de la empresa.',
        recomendacion: 'Rechazar el NDA unilateral del cliente y responder de inmediato enviando nuestro Mutual NDA Estándar de la empresa (que protege la titularidad de ambas partes). Si insisten en su plantilla, exigir la eliminación inmediata de la Cláusula 5 antes de la llamada.',
        borrador_respuesta:
`"Hola equipo de Ventas:

He revisado con máxima prioridad el NDA enviado por el cliente. 

Tal como está redactado en su Cláusula 5, contiene una cláusula trampa que transferiría al cliente cualquier idea, desarrollo o propuesta técnica comentada en la sesión, lo que pone en riesgo nuestra propiedad intelectual.

Para no retrasar la reunión de mañana, respóndanles cordialmente con este texto y adjunten nuestro Mutual NDA estándar:

'Estimado equipo: Por políticas corporativas de gobierno tecnológico y protección de IP, utilizamos nuestro Acuerdo de Confidencialidad Mutuo estándar para todas las presentaciones técnicas. Les adjunto el borrador bilateral para su firma inmediata antes de la sesión de mañana.'

Si ponen cualquier reparo, me incorporo directamente a la llamada para negociar el punto en 5 minutos."`
      });
      setProcesandoTicket(false);
    }, 450);
  };

  const ejecutarGeneracionSafe = () => {
    setGenerandoSafe(true);
    setTimeout(() => {
      setSafeGenerado(
`================================================================================
SIMPLE AGREEMENT FOR FUTURE EQUITY (SAFE)
ESTÁNDAR Y COMBINATOR (POST-MONEY VALUATION CAP)
================================================================================

ESTE ACUERDO certifica que en contraprestación del pago efectuado por ${safeInvestor} (el "Inversor") por un importe de ${safeAmount} (el "Monto de Inversión"), ${safeCompany}, una corporación de Delaware (la "Compañía"), otorga al Inversor el derecho a determinadas acciones del capital social de la Compañía.

1. EVENTOS DE CONVERSIÓN
(a) Financiamiento de Capital (Equity Financing): Si se produce una ronda calificada antes de la terminación de este instrumento, la Compañía emitirá automáticamente al Inversor un número de Acciones Preferentes conforme a la valoración pactada.
(b) Post-Money Valuation Cap: ${safeValuation}.
(c) Descuento Aplicable: ${safeDiscount}.

2. EVENTO DE LIQUIDEZ Y VENTA DE LA COMPAÑÍA
En caso de cambio de control, venta de activos sustanciales o fusión corporativa previa a la conversión, el Inversor tendrá derecho a recibir la mayor cantidad entre:
(i) La devolución íntegra del Monto de Inversión (${safeAmount}); o
(ii) El valor económico que le correspondería si este SAFE se hubiese convertido inmediatamente antes de dicho evento de liquidez.

3. DISPOSICIONES GENERALES
Este instrumento se regirá por las leyes del Estado de Delaware, sin dar efecto a principios de conflicto de leyes.`
      );
      setGenerandoSafe(false);
    }, 550);
  };

  return (
    <div className="flex min-h-screen bg-[#090d16] text-slate-100 font-sans">
      {/* SIDEBAR CORPORATIVO */}
      <aside className="w-72 bg-[#0d1322] border-r border-[#1f2d4a] flex flex-col flex-shrink-0 z-20">
        <div className="p-5 border-b border-[#1f2d4a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-mono font-bold text-sm tracking-wider text-white flex items-center gap-1.5">
                TECH LEGAL OS <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">v1.0</span>
              </h1>
              <p className="text-[11px] text-slate-400">In-House & Tech Counsel Cockpit</p>
            </div>
          </div>
        </div>

        {/* NAVEGACIÓN PRINCIPAL */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto text-xs">
          <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Comando & Dirección
          </div>
          <button
            onClick={() => setActiveTab('cockpit')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'cockpit'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                : 'text-slate-300 hover:bg-[#121a2d] hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            Centro de Operaciones (Cockpit)
          </button>

          <button
            onClick={() => setActiveTab('metricas_legalops')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'metricas_legalops'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                : 'text-slate-300 hover:bg-[#121a2d] hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Legal Ops & Métricas de Eficiencia
          </button>

          <div className="pt-3 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Taller Contractual Tech
          </div>
          <button
            onClick={() => setActiveTab('studio_contratos')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'studio_contratos'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                : 'text-slate-300 hover:bg-[#121a2d] hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4 text-sky-400" />
            Estudio de Contratos Tech & SaaS
          </button>

          <button
            onClick={() => setActiveTab('playbook_audit')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'playbook_audit'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                : 'text-slate-300 hover:bg-[#121a2d] hover:text-white'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-amber-400" />
            Auditor & Playbook Redlining
          </button>

          <button
            onClick={() => setActiveTab('reunion_a_contrato')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'reunion_a_contrato'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                : 'text-slate-300 hover:bg-[#121a2d] hover:text-white'
            }`}
          >
            <Mic className="w-4 h-4 text-indigo-400" />
            De Reunión a Contrato / Minutas
          </button>

          <div className="pt-3 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Seguridad & Negocio
          </div>
          <button
            onClick={() => setActiveTab('aduana_shield')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'aduana_shield'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 shadow-sm'
                : 'text-emerald-400 hover:bg-emerald-500/10'
            }`}
          >
            <Shield className="w-4 h-4 text-emerald-400" />
            Aduana Zero-Trust & Prompt Shield
          </button>

          <button
            onClick={() => setActiveTab('ventanilla_intake')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'ventanilla_intake'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                : 'text-slate-300 hover:bg-[#121a2d] hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-purple-400" />
            Ventanilla Legal Intake & Triage
          </button>

          <button
            onClick={() => setActiveTab('gobierno_venture')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'gobierno_venture'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                : 'text-slate-300 hover:bg-[#121a2d] hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4 text-cyan-400" />
            Gobierno Corporativo, SAFEs & M&A
          </button>

          <button
            onClick={() => setActiveTab('ip_software_shield')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'ip_software_shield'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                : 'text-slate-300 hover:bg-[#121a2d] hover:text-white'
            }`}
          >
            <Lock className="w-4 h-4 text-rose-400" />
            Blindaje de Software & Activos IA
          </button>
        </nav>

        {/* PERFIL LETRADO */}
        <div className="p-3 border-t border-[#1f2d4a] bg-[#090d16]">
          <div className="flex items-center gap-2.5 p-2 rounded-lg bg-[#121a2d] border border-[#1f2d4a]">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center font-bold text-xs font-mono">
              BP
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">Barbara Piccolo</p>
              <p className="text-[10px] text-cyan-400 font-mono truncate">Senior Corporate Tech Counsel</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ÁREA DE TRABAJO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TOPBAR */}
        <header className="h-14 border-b border-[#1f2d4a] bg-[#0d1322]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="text-cyan-400 font-bold">TECH LEGAL OS</span>
            <span>/</span>
            <span className="text-slate-200 capitalize">{activeTab.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              Zero-Trust Local Engine
            </div>
            <div className="px-2.5 py-1 rounded-full bg-[#121a2d] border border-[#1f2d4a] text-slate-300">
              Delaware · LatAm · Cross-Border
            </div>
          </div>
        </header>

        {/* CONTENIDO DE VISTAS */}
        <div className="p-6 space-y-6 max-w-7xl w-full mx-auto">

          {/* VISTA 1: COCKPIT LEGAL TECH */}
          {activeTab === 'cockpit' && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-cyan-400" />
                    Centro de Mando del Abogado Corporativo Tech
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Habilitación ágil de negocios, gobernanza de datos y blindaje de activos tecnológicos.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('studio_contratos')}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                >
                  <FileText className="w-4 h-4" /> Redactar Contrato Nuevo
                </button>
              </div>

              {/* KPIS DE LEGAL OPS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] hover:border-cyan-500/40 transition-all">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>Ciclo de Cierre</span>
                    <Zap className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-2">&lt; 24 Horas</div>
                  <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> 80% más rápido vs. bufete
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] hover:border-cyan-500/40 transition-all">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>Pipeline Facilitado</span>
                    <Briefcase className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-2">$240,000 USD</div>
                  <div className="text-[11px] text-slate-400 mt-1">Contratos SaaS cerrados en Q3</div>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] hover:border-cyan-500/40 transition-all">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>Ahorro en Minutas</span>
                    <Scale className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-2">$18,500 USD</div>
                  <div className="text-[11px] text-purple-300 mt-1">Resuelto 100% In-House con IA</div>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a] hover:border-emerald-500/40 transition-all">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>Secretos Protegidos</span>
                    <Shield className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-400 mt-2">0 Fugas</div>
                  <div className="text-[11px] text-emerald-400/80 mt-1">Aduana Zero-Trust activa</div>
                </div>
              </div>

              {/* FOCOS PRIORITARIOS DEL DÍA */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      Focos Rojos Comerciales y Operativos de la Semana
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                      3 Asuntos Prioritarios
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-sky-500/20 text-sky-300">Ventas</span>
                          <span className="text-xs font-bold text-white">Cliente Enterprise exige límite 3x anual y SLA 99.99%</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Contrato SaaS de $75k/año. Requiere redline con fallback a 1.5x anual y créditos de servicio acotados.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('playbook_audit')}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold hover:bg-cyan-500/30 transition-all flex items-center gap-1 flex-shrink-0"
                      >
                        Auditar <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300">Ingeniería</span>
                          <span className="text-xs font-bold text-white">Desarrollador Senior en Colombia sin PIIAA firmado</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Hizo commit de 14 microservicios clave en el repositorio core. Urge blindar la cesión exclusiva de invenciones.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('studio_contratos')}
                        className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-300 text-xs font-mono font-bold hover:bg-purple-500/30 transition-all flex items-center gap-1 flex-shrink-0"
                      >
                        Generar PIIAA <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300">Venture</span>
                          <span className="text-xs font-bold text-white">Fondo VC envía Term Sheet para SAFE de $250k</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">
                          Revisar post-money cap y derechos de información de minoría antes del comité de fundadores.
                        </p>
                      </div>
                      <button
                        onClick={() => setActiveTab('gobierno_venture')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold hover:bg-emerald-500/30 transition-all flex items-center gap-1 flex-shrink-0"
                      >
                        Revisar SAFE <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mapa Corporativo de Filiales / Estructura */}
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-400" />
                    Entidades & Estructura Societaria
                  </h3>

                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a]">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span>Delaware C-Corp (Holding Tech)</span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Al Día</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">14 SaaS MSAs activos · Registered Agent pagado · Cap Table al día.</p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a]">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span>Filial Operativa LatAm (Servicios)</span>
                        <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded">Vigente</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Poderes de administración activos · Contratos laborales auditados.</p>
                    </div>

                    <div className="p-3 rounded-lg bg-[#090d16] border border-[#1f2d4a]">
                      <div className="flex items-center justify-between text-xs font-bold text-white">
                        <span>Contratistas Remotos Internacionales</span>
                        <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">18 Blindados</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">Formularios W-8BEN archivados · Cesión de IP 100% verificada.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 2: ESTUDIO DE CONTRATOS TECH */}
          {activeTab === 'studio_contratos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-6 h-6 text-sky-400" />
                    Estudio de Contratación Tech & SaaS
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Generación de instrumentos de tecnología blindados conforme a estándares de Silicon Valley y contratación transfronteriza.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 font-bold block mb-1.5">Tipo de Instrumento Tech</label>
                    <select
                      value={tipoContrato}
                      onChange={(e) => setTipoContrato(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-400"
                    >
                      <option value="SaaS_MSA">SaaS Master Services Agreement (MSA)</option>
                      <option value="NDA_Estrategico">Mutual NDA Estratégico (Inversión & Alianzas)</option>
                      <option value="PIIAA_IP">Cesión de Invenciones & IP (PIIAA para Devs)</option>
                      <option value="Contratista_Remoto">Contrato de Contratista Remoto Internacional</option>
                      <option value="AI_Data_Licensing">AI Data Protection & No-Training Terms</option>
                      <option value="SLA_Enterprise">Service Level Agreement (SLA 99.9%)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 font-bold block mb-1.5">Jurisdicción / Ley Aplicable</label>
                    <select
                      value={jurisdiccion}
                      onChange={(e) => setJurisdiccion(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-400"
                    >
                      <option value="Delaware (EE.UU.)">Delaware (EE.UU.) - Estándar Startups & VC</option>
                      <option value="LatAm / Regional">Hispanoamérica / Regional (Bilingüe)</option>
                      <option value="Arbitraje Internacional (ICC / AAA)">Arbitraje Comercial Internacional (ICC / AAA)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 font-bold block mb-1.5">Partes Intervinientes</label>
                    <input
                      type="text"
                      value={partesContrato}
                      onChange={(e) => setPartesContrato(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 font-bold block mb-1.5">Cláusulas Clave & Términos Negociados</label>
                    <textarea
                      rows={5}
                      value={clausulasClave}
                      onChange={(e) => setClausulasClave(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-cyan-400 font-mono resize-none"
                    />
                  </div>

                  <button
                    onClick={ejecutarGeneracionContrato}
                    disabled={generandoContrato}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {generandoContrato ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Ensamblando Instrumento...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" /> Generar Contrato Blindado
                      </>
                    )}
                  </button>
                </div>

                <div className="lg:col-span-2 p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-emerald-400" />
                      Borrador Legal Ensamblado
                    </h3>
                    {contratoGenerado && (
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(contratoGenerado);
                          setContratoCopiado(true);
                          setTimeout(() => setContratoCopiado(false), 2000);
                        }}
                        className="px-3 py-1 rounded bg-[#090d16] border border-[#1f2d4a] hover:border-cyan-400 text-cyan-300 text-xs font-mono flex items-center gap-1.5 transition-all"
                      >
                        {contratoCopiado ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {contratoCopiado ? 'Copiado' : 'Copiar al Portapapeles'}
                      </button>
                    )}
                  </div>

                  <div className="flex-1 bg-[#090d16] border border-[#1f2d4a] rounded-xl p-4 overflow-y-auto max-h-[460px]">
                    {contratoGenerado ? (
                      <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {contratoGenerado}
                      </pre>
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400 py-16 text-center space-y-2">
                        <FileText className="w-10 h-10 text-slate-600" />
                        <p className="text-xs">Configura los términos a la izquierda y pulsa 'Generar Contrato Blindado'.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 3: AUDITOR & PLAYBOOK REDLINING */}
          {activeTab === 'playbook_audit' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-6 h-6 text-amber-400" />
                  Auditor de Contratos de Contraparte & Playbook Redlining
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Auditoría automática de borradores enviados por clientes o proveedores contra el Playbook de la empresa.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                  <label className="text-xs font-mono text-slate-300 font-bold block">
                    Texto del Contrato de la Contraparte (Pega aquí las cláusulas en revisión)
                  </label>
                  <textarea
                    rows={12}
                    value={textoContraparte}
                    onChange={(e) => setTextoContraparte(e.target.value)}
                    className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-amber-400 font-mono resize-none leading-relaxed"
                  />
                  <button
                    onClick={ejecutarAuditoriaPlaybook}
                    disabled={auditandoContrato}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {auditandoContrato ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" /> Evaluando Riesgos...
                      </>
                    ) : (
                      <>
                        <Shield className="w-4 h-4" /> Auditar contra Playbook Corporativo
                      </>
                    )}
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                  <h3 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    Diagnóstico de Riesgos & Contrapropuesta Sugerida
                  </h3>

                  {analisisPlaybook ? (
                    <div className="space-y-4 overflow-y-auto max-h-[460px] pr-1 text-xs">
                      <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 space-y-2">
                        <div className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                          <X className="w-4 h-4" /> Alertas Rojas (Cláusulas Inaceptables)
                        </div>
                        <ul className="space-y-1.5 text-slate-200">
                          {analisisPlaybook.alertas_rojas.map((item: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-red-400 font-bold">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-2 font-mono text-[11px]">
                        <div className="text-slate-300 font-bold">Matriz de Posición Corporativa:</div>
                        <p><strong className="text-emerald-400">Posición Ideal:</strong> {analisisPlaybook.matriz.optima}</p>
                        <p><strong className="text-sky-400">Fallback Aceptable:</strong> {analisisPlaybook.matriz.fallback}</p>
                        <p><strong className="text-rose-400">Walk-Away:</strong> {analisisPlaybook.matriz.walk_away}</p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 space-y-2">
                        <div className="text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center justify-between">
                          <span>Redline Sugerido (Texto de Reemplazo)</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(analisisPlaybook.redline_sugerido)}
                            className="text-[10px] text-cyan-300 hover:text-white underline"
                          >
                            Copiar Redline
                          </button>
                        </div>
                        <pre className="text-[11px] font-mono text-slate-200 whitespace-pre-wrap bg-[#090d16] p-2.5 rounded border border-[#1f2d4a]">
                          {analisisPlaybook.redline_sugerido}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 py-16 text-center space-y-2">
                      <Scale className="w-10 h-10 text-slate-600" />
                      <p className="text-xs">Pega el texto del contrato a la izquierda y ejecuta la auditoría.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VISTA 4: ADUANA ZERO-TRUST & PROMPT SHIELD */}
          {activeTab === 'aduana_shield' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-emerald-400" />
                  Aduana Zero-Trust & Prompt Shield (Anonimización Bidireccional)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Permite al abogado corporativo interactuar con cualquier modelo de IA sin filtrar jamás secretos comerciales, clientes ni datos financieros.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-slate-300 font-bold block">
                      [Paso 1] Documento / Consulta Confidencial Original
                    </label>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                      En Memoria Local
                    </span>
                  </div>
                  <textarea
                    rows={8}
                    value={textoAduana}
                    onChange={(e) => setTextoAduana(e.target.value)}
                    className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-emerald-400 font-mono resize-none"
                  />
                  <button
                    onClick={ejecutarSanitizacion}
                    disabled={cargandoAduana}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {cargandoAduana ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                    Ofuscar Datos Sensibles (Zero Egress PII)
                  </button>

                  {resultadoAduana && (
                    <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-emerald-400 font-bold">✓ Texto Sanitizado Listo para Enviar al LLM:</span>
                        <span className="text-slate-400">{resultadoAduana.tokens_ofuscados} tokens ofuscados</span>
                      </div>
                      <p className="text-xs font-mono text-slate-300 bg-[#121a2d] p-2.5 rounded border border-[#1f2d4a]">
                        {resultadoAduana.texto_anonimizado}
                      </p>
                    </div>
                  )}
                </div>

                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-slate-300 font-bold block">
                      [Paso 2] Respuesta Devuelta por el LLM con Tokens
                    </label>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded">
                      Re-Identification
                    </span>
                  </div>
                  <textarea
                    rows={8}
                    value={textoParaRestaurar}
                    onChange={(e) => setTextoParaRestaurar(e.target.value)}
                    className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-cyan-400 font-mono resize-none"
                  />
                  <button
                    onClick={ejecutarRestauracion}
                    disabled={!resultadoAduana}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" /> Restaurar Datos Reales en la Respuesta
                  </button>

                  {textoRestaurado && (
                    <div className="p-3.5 rounded-lg bg-[#090d16] border border-cyan-500/40 space-y-2">
                      <span className="text-[11px] font-mono font-bold text-cyan-300">
                        ✓ Documento Final con Datos Reales Restaurados:
                      </span>
                      <p className="text-xs font-mono text-slate-200 bg-[#121a2d] p-2.5 rounded border border-[#1f2d4a]">
                        {textoRestaurado}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VISTA 5: DE REUNIÓN A CONTRATO */}
          {activeTab === 'reunion_a_contrato' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Mic className="w-6 h-6 text-indigo-400" />
                  De Reunión a Instrumento Legal (Meeting-to-Contract)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Convierte transcripciones de llamadas y notas de comités en minutas jurídicas, matriz de tareas y contratos en 1 clic.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                  <label className="text-xs font-mono text-slate-300 font-bold block">
                    Notas de la Llamada / Transcripción de la Sesión
                  </label>
                  <textarea
                    rows={12}
                    value={notasReunion}
                    onChange={(e) => setNotasReunion(e.target.value)}
                    className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-indigo-400 font-mono resize-none leading-relaxed"
                  />
                  <button
                    onClick={() => {
                      setProcesandoMinuta(true);
                      setTimeout(() => setProcesandoMinuta(false), 400);
                    }}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" /> Procesar Acuerdos con IA
                  </button>
                </div>

                <div className="lg:col-span-2 p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-bold">
                        MINUTA JURÍDICA ESTRUCTURADA
                      </span>
                      <h3 className="text-sm font-bold text-white mt-1">{minutaExtraida.titulo}</h3>
                      <p className="text-[11px] text-slate-400">Partes: {minutaExtraida.partes} · Fecha: {minutaExtraida.fecha}</p>
                    </div>

                    <button
                      onClick={() => {
                        setPartesContrato(minutaExtraida.partes);
                        setClausulasClave(minutaExtraida.terminos_pactados.join(' '));
                        setActiveTab('studio_contratos');
                      }}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-500/20"
                    >
                      Convertir en Contrato en 1 Clic <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-1.5">
                    <div className="text-[11px] font-mono font-bold text-slate-300">1. Resumen Ejecutivo de la Negociación:</div>
                    <p className="text-xs text-slate-300 leading-relaxed">{minutaExtraida.resumen}</p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-1.5">
                    <div className="text-[11px] font-mono font-bold text-cyan-400">2. Términos Comerciales & Jurídicos Acordados:</div>
                    <ul className="space-y-1 text-xs text-slate-200">
                      {minutaExtraida.terminos_pactados.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-2">
                    <div className="text-[11px] font-mono font-bold text-amber-400">3. Matriz de Compromisos & Responsables (Action Items):</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      {minutaExtraida.action_items.map((item: any, idx: number) => (
                        <div key={idx} className="p-2.5 rounded bg-[#121a2d] border border-[#1f2d4a]">
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-white font-bold">{item.responsable}</span>
                            <span className="text-amber-400">Plazo: {item.plazo}</span>
                          </div>
                          <p className="text-slate-300 text-[11px] mt-1">{item.tarea}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 6: VENTANILLA LEGAL INTAKE */}
          {activeTab === 'ventanilla_intake' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-purple-400" />
                  Ventanilla Legal Intake & Triage para Equipos Internos
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Canaliza y responde consultas operativas de Ventas, Producto, TI y RRHH con diagnósticos de negocio que destraban la operación.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-mono text-slate-300 font-bold block mb-1.5">Departamento</label>
                      <select
                        value={deptoConsulta}
                        onChange={(e) => setDeptoConsulta(e.target.value)}
                        className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-purple-400"
                      >
                        <option value="Ventas">Ventas / Comercial</option>
                        <option value="TI / Producto">TI & Producto</option>
                        <option value="RRHH">RRHH & Talento</option>
                        <option value="Finanzas">Finanzas & Operaciones</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-mono text-slate-300 font-bold block mb-1.5">Urgencia</label>
                      <select
                        value={urgenciaConsulta}
                        onChange={(e) => setUrgenciaConsulta(e.target.value)}
                        className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-purple-400"
                      >
                        <option value="Alta">Alta (Bloquea cierre hoy)</option>
                        <option value="Media">Media (Revisión ordinaria)</option>
                        <option value="Baja">Baja (Consulta ordinaria)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 font-bold block mb-1.5">Consulta Operativa del Empleado</label>
                    <textarea
                      rows={8}
                      value={textoConsulta}
                      onChange={(e) => setTextoConsulta(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg p-3 text-xs text-slate-200 outline-none focus:border-purple-400 font-mono resize-none leading-relaxed"
                    />
                  </div>

                  <button
                    onClick={ejecutarTriageTicket}
                    disabled={procesandoTicket}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {procesandoTicket ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Generar Diagnóstico & Respuesta de Negocio
                  </button>
                </div>

                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                  <h3 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    Diagnóstico In-House & Borrador para el Empleado
                  </h3>

                  {respuestaTicket ? (
                    <div className="space-y-4 text-xs">
                      <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 space-y-1.5">
                        <span className="text-[11px] font-mono font-bold text-red-400 uppercase tracking-wider">
                          Diagnóstico Jurídico Rápido
                        </span>
                        <p className="text-slate-200 leading-relaxed">{respuestaTicket.diagnostico}</p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-1.5">
                        <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
                          Recomendación de Acción Inmediata
                        </span>
                        <p className="text-slate-200 leading-relaxed">{respuestaTicket.recomendacion}</p>
                      </div>

                      <div className="p-3.5 rounded-lg bg-purple-500/10 border border-purple-500/30 space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-purple-300">
                          <span>Borrador de Mensaje Listo para Enviar</span>
                          <button
                            onClick={() => navigator.clipboard.writeText(respuestaTicket.borrador_respuesta)}
                            className="text-[10px] text-purple-300 hover:text-white underline"
                          >
                            Copiar Mensaje
                          </button>
                        </div>
                        <pre className="text-[11px] font-mono text-slate-200 whitespace-pre-wrap bg-[#090d16] p-3 rounded border border-[#1f2d4a]">
                          {respuestaTicket.borrador_respuesta}
                        </pre>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 py-16 text-center space-y-2">
                      <MessageSquare className="w-10 h-10 text-slate-600" />
                      <p className="text-xs">Ingresa la consulta a la izquierda y genera el triage.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* VISTA 7: GOBIERNO CORPORATIVO, SAFES & VENTURE */}
          {activeTab === 'gobierno_venture' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-cyan-400" />
                  Gobierno Corporativo, SAFEs & Venture Capital
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Estructuración de rondas de inversión, acuerdos de socios y actas de directorio para empresas de tecnología.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                  <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                    Generador de SAFE (Y Combinator Standard)
                  </h3>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 font-bold block mb-1">Compañía Emisora</label>
                    <input
                      type="text"
                      value={safeCompany}
                      onChange={(e) => setSafeCompany(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-slate-300 font-bold block mb-1">Inversor (Fondo / Ángel)</label>
                    <input
                      type="text"
                      value={safeInvestor}
                      onChange={(e) => setSafeInvestor(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] font-mono text-slate-300 font-bold block mb-1">Monto</label>
                      <input
                        type="text"
                        value={safeAmount}
                        onChange={(e) => setSafeAmount(e.target.value)}
                        className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-300 font-bold block mb-1">Valuation Cap</label>
                      <input
                        type="text"
                        value={safeValuation}
                        onChange={(e) => setSafeValuation(e.target.value)}
                        className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none font-mono"
                      />
                    </div>
                  </div>

                  <button
                    onClick={ejecutarGeneracionSafe}
                    disabled={generandoSafe}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {generandoSafe ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Generar Instrumento SAFE
                  </button>
                </div>

                <div className="lg:col-span-2 p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-cyan-400" />
                      Instrumento de Inversión Ensamblado
                    </h3>
                    {safeGenerado && (
                      <button
                        onClick={() => navigator.clipboard.writeText(safeGenerado)}
                        className="text-xs text-cyan-300 hover:text-white underline font-mono"
                      >
                        Copiar SAFE
                      </button>
                    )}
                  </div>

                  <div className="bg-[#090d16] border border-[#1f2d4a] rounded-xl p-4 overflow-y-auto max-h-[300px]">
                    {safeGenerado ? (
                      <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {safeGenerado}
                      </pre>
                    ) : (
                      <p className="text-xs text-slate-400 font-mono text-center py-10">
                        Completa los campos del SAFE para emitir el instrumento.
                      </p>
                    )}
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-2">
                    <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center justify-between">
                      <span>Checklist de Due Diligence para Inversores</span>
                      <span>100% Blindado</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                      <div className="p-2 rounded bg-[#121a2d] border border-[#1f2d4a] text-slate-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>PIIAAs 100% firmados</span>
                      </div>
                      <div className="p-2 rounded bg-[#121a2d] border border-[#1f2d4a] text-slate-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>Cap Table certificado</span>
                      </div>
                      <div className="p-2 rounded bg-[#121a2d] border border-[#1f2d4a] text-slate-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>SaaS MSAs estandarizados</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 8: BLINDAJE DE SOFTWARE & ACTIVOS IA */}
          {activeTab === 'ip_software_shield' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lock className="w-6 h-6 text-rose-400" />
                  Blindaje de Software, Código & Activos de IA
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Protección de la propiedad intelectual propietaria, prevención de licencias virales y control de autoría sobre outputs de IA.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                    <FolderGit2 className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Cesión de Invenciones (PIIAA)</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Garantiza contractualmente que cada línea de código escrita por empleados o contratistas remotos pertenece exclusivamente a la empresa.
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                      ✓ 100% Cobertura Activa
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Escáner de Licencias Open Source</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Detección de dependencias con licencias restrictivas o virales (GPL / AGPL) que podrían forzar la apertura del código propietario.
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded border border-cyan-500/20">
                      ✓ Solo Licencias Permisivas (MIT/Apache)
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">Titularidad de Activos de IA</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Cláusulas de asignación de prompts, datasets de entrenamiento y outputs de modelos sintéticos integrados en el producto.
                  </p>
                  <div className="pt-2">
                    <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2 py-1 rounded border border-purple-500/20">
                      ✓ Cláusulas de Titularidad Estandarizadas
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 9: LEGAL OPS & MÉTRICAS */}
          {activeTab === 'metricas_legalops' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                  Tablero de Legal Ops & Demostración de Retorno (ROI)
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Métricas tangibles para reportar a fundadores, directorio e inversores la eficiencia y ahorro generado por la asesoría in-house.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-2">
                  <span className="text-xs font-mono text-slate-400">Ahorro Financiero Anualizado</span>
                  <div className="text-3xl font-extrabold text-emerald-400">$74,000 USD</div>
                  <p className="text-xs text-slate-400">Comparado con la tarifa horaria ($450/h) de bufetes corporativos externos.</p>
                </div>

                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-2">
                  <span className="text-xs font-mono text-slate-400">Volumen de Asuntos Resueltos</span>
                  <div className="text-3xl font-extrabold text-cyan-400">142 Contratos</div>
                  <p className="text-xs text-slate-400">Redactados, auditados o firmados con tasa de resolución del 96.5%.</p>
                </div>

                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-2">
                  <span className="text-xs font-mono text-slate-400">Horas Letradas Ahorradas</span>
                  <div className="text-3xl font-extrabold text-purple-400">184 Horas</div>
                  <p className="text-xs text-slate-400">Automatización de primera lectura y ensamblaje de borradores con IA.</p>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
