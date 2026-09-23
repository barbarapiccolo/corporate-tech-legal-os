\'use client\';

import React, { useState } from \'react\';
import {
  Shield, FileText, Scale, Cpu, AlertTriangle, CheckCircle2, Lock,
  Calendar, Briefcase, Users, Mic, CheckSquare, Play, Copy, Download,
  ChevronRight, ChevronDown, MessageSquare, Sparkles, Search, BarChart3,
  TrendingUp, Layers, Building2, PieChart, FileCheck2, FolderGit2, X,
  Printer, ArrowRight, Zap, RefreshCw, Eye, Check, ExternalLink, Terminal,
  Database, UploadCloud, Square, ListOrdered, Clock, UserCheck
} from \'lucide-react\';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState(\'cockpit\');

  // ============================================================================
  // ESTADOS DEL CENTRO DE GRABACIÓN & MINUTAS INTELIGENTES (ESTILO GEMINI)
  // ============================================================================
  const [modoEntradaMinuta, setModoEntradaMinuta] = useState<\'notas_crudas\' | \'grabacion_vivo\' | \'audio_subido\'>(\'notas_crudas\');
  const [grabandoEnVivo, setGrabandoEnVivo] = useState(false);
  const [segundosGrabacion, setSegundosGrabacion] = useState(0);
  const [asuntoReunion, setAsuntoReunion] = useState(\'Negociación SaaS Enterprise & Anexo de Datos de IA\');
  const [participantesReunion, setParticipantesReunion] = useState(\'Barbara Piccolo (General Counsel) y Roberto Sánchez (VP Tech & Procurement - Acme Corp)\');
  const [notasCrudasReunion, setNotasCrudasReunion] = useState(
    \'Reunión de cierre contractual con Acme Corp. Asistieron Barbara Piccolo (GC) y Roberto Sánchez (VP Tech). \' +
    \'Acuerdos pactados: Suscripción SaaS anual por $60,000 USD facturados por adelantado. \' +
    \'Acme aceptó jurisdicción de Delaware y límite de responsabilidad de 12 meses de facturación, \' +
    \'a cambio de un SLA de disponibilidad garantizado del 99.9% anual y penalidades de servicio del 5% mensual si se incumple. \' +
    \'Punto crítico: Roberto exigió garantía contractual explícita de Zero Data Retention: ningún dato corporativo ni código \' +
    \'procesado por Acme será utilizado para reentrenar modelos comerciales de IA de terceros. \' +
    \'Compromisos: Barbara enviará el borrador del SaaS MSA con el anexo de datos de IA el jueves antes de las 17:00. \' +
    \'Roberto enviará los datos fiscales y firma digital del CEO el viernes antes de las 12:00. \' +
    \'Quedó pendiente validar si el equipo de infraestructura de Acme requiere acceso VPN dedicado.\'
  );
  const [procesandoMinuta, setProcesandoMinuta] = useState(false);
  const [minutaGemini, setMinutaGemini] = useState<any>({
    ficha: {
      asunto: \'Negociación SaaS Enterprise & Anexo de Datos de IA\',
      fecha: \'23 de Septiembre de 2026\',
      participantes: \'Barbara Piccolo (General Counsel) y Roberto Sánchez (VP Tech Acme Corp)\',
      duracion: \'42 minutos\'
    },
    resumen_ejecutivo: (
      \'Se celebró sesión de negociación formal para definir los términos de la contratación de la plataforma SaaS Enterprise. \' +
      \'Las partes alcanzaron un consenso equilibrado: el Cliente aceptó el estándar de Delaware y el límite de responsabilidad \' +
      \'de 1x anual de la empresa, a cambio de un SLA elevado al 99.9% y un blindaje estricto de soberanía de datos que prohíbe \' +
      \'el reentrenamiento de modelos de Inteligencia Artificial con su información confidencial.\'
    ),
    acuerdos_adoptados: [
      \'Importe cerrado: $60,000 USD/año con facturación anual anticipada.\',
      \'SLA garantizado del 99.9% mensual con créditos de servicio acotados al 5% por hora de caída (máx 25%).\',
      \'Cláusula Zero Data Retention: prohibición expresa de reentrenamiento de IA con datos corporativos de Acme.\',
      \'Límite de responsabilidad recíproco equivalente a 12 meses de tarifas efectivamente abonadas.\',
      \'Jurisdicción y ley aplicable en los tribunales estatales y federales de Delaware (EE.UU.).\'
    ],
    action_items: [
      { id: 1, responsable: \'Barbara Piccolo (GC)\', tarea: \'Redactar SaaS MSA y SLA 99.9% incorporando cláusula No-Training de IA\', plazo: \'Jueves 17:00\', completado: false },
      { id: 2, responsable: \'Roberto Sánchez (Acme)\', tarea: \'Remitir datos fiscales (EIN) y poder de representación del CEO\', plazo: \'Viernes 12:00\', completado: false },
      { id: 3, responsable: \'Equipo de Infraestructura\', tarea: \'Evaluar viabilidad técnica de canal VPN dedicado solicitado por Acme\', plazo: \'Lunes 10:00\', completado: false }
    ],
    puntos_abiertos: [
      \'Requerimiento secundario de VPN dedicada pendiente de confirmación de factibilidad por arquitectura de software.\'
    ],
    contrato_sugerido: {
      tipo: \'SaaS_MSA\',
      partes: \'CloudCore Technologies Inc. y Acme Corp.\',
      terminos_clave: \'Suscripción $60k/año, SLA 99.9%, Zero-Retention IA, Delaware Law, Límite 12 meses.\'
    }
  });

  // ============================================================================
  // ESTADOS DEL MOTOR RAG & BIBLIOTECA VECTORIAL (QDRANT)
  // ============================================================================
  const [queryBusquedaRag, setQueryBusquedaRag] = useState(\'SLA 99.9% prohibicion reentrenamiento IA datos corporativos\');
  const [buscandoRag, setBuscandoRag] = useState(false);
  const [modelosRecuperadosRag, setModelosRecuperadosRag] = useState<any[]>([
    {
      id: \'MOD-TECH-02\',
      titulo: \'Cláusula Soberana de Protección de Datos de IA (Zero Data Retention)\',
      categoria: \'06_CONTRATOS_TECH_Y_PROPIEDAD_INTELECTUAL\',
      jurisdiccion: \'Delaware / LatAm / Cross-Border\',
      score: 0.96,
      fragmento: \'El Proveedor garantiza expresamente que ningún dato corporativo, código fuente, consulta de usuario, secreto comercial ni información confidencial procesada en la plataforma será almacenada permanentemente por terceros, ni será utilizada para entrenar, reentrenar o ajustar modelos de Inteligencia Artificial propios o ajenos.\'
    },
    {
      id: \'MOD-TECH-01\',
      titulo: \'Contrato Marco de Servicios SaaS (SaaS MSA) Enterprise\',
      categoria: \'06_CONTRATOS_TECH_Y_PROPIEDAD_INTELECTUAL\',
      jurisdiccion: \'Delaware / Internacional\',
      score: 0.91,
      fragmento: \'DISPONIBILIDAD Y SLA (99.9%): El Proveedor garantiza una disponibilidad del Servicio del 99.9% mensual. En caso de indisponibilidad superior al 0.1%, el Cliente tendrá derecho a créditos de servicio equivalentes al 5% de la tarifa mensual por cada hora de caída comprobada.\'
    },
    {
      id: \'MOD-TECH-03\',
      titulo: \'Acuerdo de Cesión de Invenciones y Código (PIIAA para Devs)\',
      categoria: \'06_CONTRATOS_TECH_Y_PROPIEDAD_INTELECTUAL\',
      jurisdiccion: \'Delaware / Desarrolladores Remotos LatAm\',
      score: 0.84,
      fragmento: \'ASIGNACIÓN TOTAL DE CÓDIGO E INVENCIONES: El Colaborador cede y transfiere a perpetuidad, de forma exclusiva y mundial a la Compañía la totalidad de los derechos sobre el código fuente, repositorios, algoritmos e invenciones desarrolladas en el marco de sus funciones.\'
    }
  ]);

  // ============================================================================
  // ESTADOS DEL TALLER CONTRACTUAL TECH
  // ============================================================================
  const [tipoContrato, setTipoContrato] = useState(\'SaaS_MSA\');
  const [jurisdiccion, setJurisdiccion] = useState(\'Delaware (EE.UU.)\');
  const [partesContrato, setPartesContrato] = useState(\'CloudCore Technologies Inc. (Prestador) y Acme Corp. (Cliente)\');
  const [clausulasClave, setClausulasClave] = useState(
    \'Suscripción Enterprise $60,000/año. SLA garantizado 99.9%. Cláusula Zero Data Retention: ningún dato corporativo ni código alimentará modelos públicos de IA. Límite de responsabilidad acotado a 12 meses de facturación.\'
  );
  const [usarRagEnRedaccion, setUsarRagEnRedaccion] = useState(true);
  const [generandoContrato, setGenerandoContrato] = useState(false);
  const [contratoGenerado, setContratoGenerado] = useState(\'\');
  const [contratoCopiado, setContratoCopiado] = useState(false);

  // ============================================================================
  // ESTADOS DE AUDITORÍA & PLAYBOOK
  // ============================================================================
  const [textoContraparte, setTextoContraparte] = useState(
    \'CLÁUSULA 8. INDEMNIZACIÓN Y RESPONSABILIDAD:\\n\' +
    \'El Proveedor indemnizará y mantendrá indemne al Cliente de forma ilimitada contra cualquier reclamo, pérdida o daño indirecto.\\n\\n\' +
    \'CLÁUSULA 12. PROPIEDAD INTELECTUAL:\\n\' +
    \'Todo código fuente, algoritmos, adaptaciones y desarrollos derivados pertenecerán de manera exclusiva y perpetua al Cliente.\\n\\n\' +
    \'CLÁUSULA 15. FORO Y LEY APLICABLE:\\n\' +
    \'Este contrato se regirá exclusivamente por las leyes y tribunales de Singapur.\'
  );
  const [auditandoContrato, setAuditandoContrato] = useState(false);
  const [analisisPlaybook, setAnalisisPlaybook] = useState<any>(null);

  // ============================================================================
  // ESTADOS DE ADUANA ZERO-TRUST
  // ============================================================================
  const [textoAduana, setTextoAduana] = useState(
    \'El cliente TechCorp Corp con EIN 12-3456789 y domicilio en Austin, Texas, solicita procesar contrato por $120,000 USD mediante transferencia a la cuenta bancaria 987654321098. El contacto legal directo es david.miller@techcorp.com.\'
  );
  const [resultadoAduana, setResultadoAduana] = useState<any>(null);
  const [cargandoAduana, setCargandoAduana] = useState(false);
  const [textoParaRestaurar, setTextoParaRestaurar] = useState(\'\');
  const [textoRestaurado, setTextoRestaurado] = useState(\'\');

  // ============================================================================
  // ACCIONES INTERACTIVAS
  // ============================================================================
  const ejecutarProcesamientoMinuta = () => {
    setProcesandoMinuta(true);
    setTimeout(() => {
      setMinutaGemini({
        ficha: {
          asunto: asuntoReunion,
          fecha: \'23 de Septiembre de 2026\',
          participantes: participantesReunion,
          duracion: \'42 minutos\'
        },
        resumen_ejecutivo: (
          \'Sesión de alineación comercial y regulatoria de alto nivel. Se consolidaron los acuerdos económicos \' +
          \'de la suscripción anual por $60k y se blindó la posición corporativa de la empresa: jurisdicción Delaware, \' +
          \'límite estricto de responsabilidad de 1x anual y garantía absoluta de Zero Data Retention frente a modelos de IA comerciales.\'
        ),
        acuerdos_adoptados: [
          \'Precio anual cerrado: $60,000 USD en pago anticipado.\',
          \'SLA garantizado del 99.9% mensual con créditos acotados al 5% por hora de caída.\',
          \'Prohibición irrenunciable de reentrenamiento de IA con datos corporativos de la contraparte.\',
          \'Tope de responsabilidad agregado a 12 meses de tarifas efectivamente percibidas.\',
          \'Jurisdicción exclusiva en Delaware (EE.UU.).\'
        ],
        action_items: [
          { id: 1, responsable: \'Barbara Piccolo (GC)\', tarea: \'Redactar SaaS MSA y SLA 99.9% con cláusula No-Training de IA\', plazo: \'Jueves 17:00\', completado: false },
          { id: 2, responsable: \'Roberto Sánchez (Acme)\', tarea: \'Remitir datos fiscales (EIN) y firma autorizada del CEO\', plazo: \'Viernes 12:00\', completado: false },
          { id: 3, responsable: \'Equipo de Infraestructura\', tarea: \'Validar factibilidad de canal VPN dedicado\', plazo: \'Lunes 10:00\', completado: false }
        ],
        puntos_abiertos: [
          \'Validación técnica de VPN dedicada antes de la firma final.\'
        ],
        contrato_sugerido: {
          tipo: \'SaaS_MSA\',
          partes: \'CloudCore Technologies Inc. y Acme Corp.\',
          terminos_clave: \'Suscripción $60k/año, SLA 99.9%, Zero-Retention IA, Delaware Law, Límite 12 meses.\'
        }
      });
      setProcesandoMinuta(false);
    }, 600);
  };

  const ejecutarBusquedaRag = () => {
    setBuscandoRag(true);
    setTimeout(() => {
      setBuscandoRag(false);
    }, 400);
  };

  const transferirMinutaAContrato = () => {
    setPartesContrato(minutaGemini.contrato_sugerido.partes);
    setClausulasClave(minutaGemini.acuerdos_adoptados.join(\' \'));
    setTipoContrato(minutaGemini.contrato_sugerido.tipo);
    setActiveTab(\'studio_contratos\');
  };

  const toggleActionItem = (id: number) => {
    setMinutaGemini((prev: any) => ({
      ...prev,
      action_items: prev.action_items.map((item: any) =>
        item.id === id ? { ...item, completado: !item.completado } : item
      )
    }));
  };

  const ejecutarGeneracionContrato = () => {
    setGenerandoContrato(true);
    setTimeout(() => {
      setContratoGenerado(
`================================================================================
MASTER SERVICES AGREEMENT (SaaS MSA)
GROUNDING: MODELO MAESTRO QDRANT [MOD-TECH-01 + MOD-TECH-02]
JURISDICCIÓN: ${jurisdiccion.toUpperCase()}
FECHA EFECTIVA: Septiembre 2026
================================================================================

PARTES:
(1) ${partesContrato}

1. OBJETO Y DISPONIBILIDAD DEL SERVICIO (SLA 99.9%)
El Proveedor concederá al Cliente una suscripción no exclusiva, revocable conforme a este contrato y de alcance empresarial. El Proveedor garantiza una disponibilidad mensual del Servicio del 99.9%. En caso de indisponibilidad superior al 0.1%, el Cliente tendrá derecho a créditos de servicio equivalentes al 5% de la tarifa mensual por cada hora de caída comprobada, hasta un máximo del 25% mensual.

2. SOBERANÍA DE DATOS Y PROTECCIÓN DE MODELOS DE INTELIGENCIA ARTIFICIAL (ZERO-RETENTION)
El Proveedor garantiza expresamente que ningún dato corporativo, código fuente, consulta de usuario, secreto comercial ni información confidencial procesada en la plataforma será almacenada permanentemente por terceros, ni será transferida, divulgada o utilizada para entrenar, reentrenar, ajustar (fine-tune) o mejorar ningún modelo comercial de Inteligencia Artificial propio o de terceros.

3. PROPIEDAD INTELECTUAL E INVENCIONES
El Cliente mantendrá la titularidad exclusiva y perpetua sobre todos sus Datos Corporativos y creaciones previas. El Proveedor retiene todos los derechos sobre la plataforma, software base, documentación y componentes propietarios de la solución SaaS.

4. LIMITACIÓN DE RESPONSABILIDAD (MARKET STANDARD)
EN NINGÚN CASO NINGUNA DE LAS PARTES SERÁ RESPONSABLE POR DAÑOS INDIRECTOS, PUNITIVOS O LUCRO CESANTE. LA RESPONSABILIDAD TOTAL Y ACUMULADA DE CADA PARTE SE LIMITA AL MONTO TOTAL DE LAS TARIFAS EFECTIVAMENTE PAGADAS POR EL CLIENTE EN LOS DOCE (12) MESES ANTERIORES AL HECHO GENERADOR.

5. LEY APLICABLE Y RESOLUCIÓN DE DISPUTAS
Este contrato se interpretará y regirá conforme a las leyes del Estado de Delaware, sometiéndose las partes a arbitraje expedito administrado o a los tribunales competentes de dicha jurisdicción.`
      );
      setGenerandoContrato(false);
    }, 600);
  };

  const ejecutarSanitizacion = () => {
    setCargandoAduana(true);
    setTimeout(() => {
      let t = textoAduana
        .replace(/david\.miller@techcorp\.com/g, \'[EMAIL_1]\')
        .replace(/12-3456789/g, \'[ID_FISCAL_EIN_1]\')
        .replace(/987654321098/g, \'[CUENTA_BANCARIA_1]\')
        .replace(/\$120,000 USD/g, \'[MONTO_CONFIDENCIAL_1]\')
        .replace(/TechCorp Corp/g, \'[CLIENTE_ENTERPRISE_1]\');
      const mapa = {
        \'[CLIENTE_ENTERPRISE_1]\': \'TechCorp Corp\',
        \'[ID_FISCAL_EIN_1]\': \'12-3456789\',
        \'[MONTO_CONFIDENCIAL_1]\': \'$120,000 USD\',
        \'[CUENTA_BANCARIA_1]\': \'987654321098\',
        \'[EMAIL_1]\': \'david.miller@techcorp.com\'
      };
      setResultadoAduana({
        texto_anonimizado: t,
        tokens_ofuscados: 5,
        mapa_reemplazos: mapa,
        audit_hash: \'8f4a2b91c0e357df88a2456b19a84210bc8d1f2e63a54b9c1d0e82f71a93b51a\'
      });
      setTextoParaRestaurar(
        \'DICTAMEN LEGAL GENERADO POR IA:\\nSe aprueba la contratación comercial con [CLIENTE_ENTERPRISE_1] (EIN: [ID_FISCAL_EIN_1]) por el importe pactado de [MONTO_CONFIDENCIAL_1]. Los fondos se transferirán a [CUENTA_BANCARIA_1] con copia al letrado [EMAIL_1]. Cláusula de protección de propiedad intelectual plenamente blindada.\'
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

  const ejecutarAuditoriaPlaybook = () => {
    setAuditandoContrato(true);
    setTimeout(() => {
      setAnalisisPlaybook({
        alertas_rojas: [
          \'Cláusula 8: INDEMNIDAD ILIMITADA. Exige que el Proveedor responda sin tope económico por cualquier reclamo o daño indirecto. (Inaceptable: rompe el estándar corporativo).\',
          \'Cláusula 12: CESIÓN TOTAL DE IP Y CÓDIGO. Establece que los algoritmos y desarrollos derivados pertenecerán al Cliente. (Riesgo Crítico de pérdida de activos de software).\',
          \'Cláusula 15: FORO EN SINGAPUR. Jurisdicción distante y litigiosa que eleva los costes de defensa ante cualquier contingencia.\'
        ],
        alertas_amarillas: [
          \'Ausencia de cláusula de exclusión de daños indirectos (consequential damages).\',
          \'Omisión de cláusula que prohíba el reentrenamiento de modelos de IA de terceros con datos del proveedor.\'
        ],
        matriz: {
          optima: \'Límite de responsabilidad 1x anual de facturación, IP propia 100% retenida, fuero en Delaware o arbitraje neutral.\',
          fallback: \'Aceptar un supercap de 2x anual únicamente para brechas de confidencialidad comprobadas; mantener la exclusión total de cesión de IP.\',
          walk_away: \'No firmar bajo ninguna circunstancia la cesión de código fuente ni indemnidades ilimitadas.\'
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
                TECH LEGAL OS <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono">v1.1</span>
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
            onClick={() => setActiveTab('reunion_a_contrato')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'reunion_a_contrato'
                ? 'bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30 shadow-sm'
                : 'text-slate-300 hover:bg-[#121a2d] hover:text-white'
            }`}
          >
            <Mic className="w-4 h-4 text-indigo-400" />
            Minutas & Grabación (Estilo Gemini)
          </button>

          <div className="pt-3 px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold">
            Taller Contractual & Precedentes
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
            Estudio de Contratos Tech (con RAG)
          </button>

          <button
            onClick={() => setActiveTab('rag_biblioteca')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'rag_biblioteca'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                : 'text-slate-300 hover:bg-[#121a2d] hover:text-white'
            }`}
          >
            <Database className="w-4 h-4 text-cyan-400" />
            Biblioteca & Motor RAG Qdrant
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

          <button
            onClick={() => setActiveTab('metricas_legalops')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all ${
              activeTab === 'metricas_legalops'
                ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                : 'text-slate-300 hover:bg-[#121a2d] hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Legal Ops & Métricas de Retorno
          </button>
        </nav>

        {/* PERFIL */}
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
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              <Database className="w-3 h-3 text-cyan-400" />
              Qdrant RAG: 544 Modelos
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
              Zero-Trust Local
            </div>
          </div>
        </header>

        {/* CONTENIDO PRINCIPAL */}
        <div className="p-6 space-y-6 max-w-7xl w-full mx-auto">

          {/* VISTA 1: COCKPIT */}
          {activeTab === 'cockpit' && (
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-cyan-400" />
                    Centro de Operaciones del Abogado Corporativo Tech
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Habilitación ágil de negocios, gobernanza de datos y blindaje de activos tecnológicos con motor RAG.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('reunion_a_contrato')}
                    className="px-3.5 py-2 rounded-xl bg-[#121a2d] hover:bg-[#1a243d] border border-[#1f2d4a] text-indigo-300 font-bold text-xs font-mono transition-all flex items-center gap-1.5"
                  >
                    <Mic className="w-4 h-4 text-indigo-400" /> Nueva Minuta Gemini
                  </button>
                  <button
                    onClick={() => setActiveTab('studio_contratos')}
                    className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                  >
                    <FileText className="w-4 h-4" /> Redactar con RAG
                  </button>
                </div>
              </div>

              {/* KPIS */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a]">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>Ciclo de Cierre</span>
                    <Zap className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-2">&lt; 24 Horas</div>
                  <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> 80% más rápido vs. bufete
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a]">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>Pipeline Facilitado</span>
                    <Briefcase className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-white mt-2">$240,000 USD</div>
                  <div className="text-[11px] text-slate-400 mt-1">Contratos SaaS cerrados en Q3</div>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a]">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>Modelos en RAG</span>
                    <Database className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-cyan-400 mt-2">544 Activos</div>
                  <div className="text-[11px] text-slate-400 mt-1">Indexados en Qdrant Vector DB</div>
                </div>

                <div className="p-4 rounded-xl bg-[#121a2d] border border-[#1f2d4a]">
                  <div className="flex items-center justify-between text-slate-400 text-xs font-mono">
                    <span>Minutas & Tareas</span>
                    <UserCheck className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-extrabold text-indigo-400 mt-2">100% Al Día</div>
                  <div className="text-[11px] text-indigo-300 mt-1">Cero compromisos perdidos</div>
                </div>
              </div>

              {/* Focos Prioritarios */}
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    Asuntos Prioritarios del Abogado Corporativo Tech
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    Acción Inmediata
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-2">
                    <span className="text-[10px] font-mono text-sky-400 font-bold bg-sky-500/10 px-1.5 py-0.5 rounded">VENTAS ENTERPRISE</span>
                    <p className="text-xs font-bold text-white">Acme Corp: Contrato SaaS $60k</p>
                    <p className="text-[11px] text-slate-400">Minuta Gemini lista. Pendiente generar SaaS MSA con cláusula No-Training.</p>
                    <button
                      onClick={() => setActiveTab('reunion_a_contrato')}
                      className="text-xs text-cyan-400 font-mono font-bold hover:underline flex items-center gap-1 mt-1"
                    >
                      Ver Minuta y Generar →
                    </button>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-2">
                    <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-500/10 px-1.5 py-0.5 rounded">INGENIERÍA & IP</span>
                    <p className="text-xs font-bold text-white">Cesión de Código Devs LatAm</p>
                    <p className="text-[11px] text-slate-400">18 acuerdos PIIAA de cesión exclusiva de invenciones activos y auditados.</p>
                    <button
                      onClick={() => setActiveTab('ip_software_shield')}
                      className="text-xs text-purple-400 font-mono font-bold hover:underline flex items-center gap-1 mt-1"
                    >
                      Ver Cobertura IP →
                    </button>
                  </div>

                  <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-2">
                    <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded">BASE DE MODELOS</span>
                    <p className="text-xs font-bold text-white">Catálogo Maestro en Qdrant</p>
                    <p className="text-[11px] text-slate-400">Búsqueda semántica en 544 modelos de Drive disponible para redacción asistida.</p>
                    <button
                      onClick={() => setActiveTab('rag_biblioteca')}
                      className="text-xs text-emerald-400 font-mono font-bold hover:underline flex items-center gap-1 mt-1"
                    >
                      Explorar Precedentes →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 2: CENTRO DE GRABACIÓN & MINUTAS INTELIGENTES (ESTILO GEMINI) */}
          {activeTab === 'reunion_a_contrato' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Mic className="w-6 h-6 text-indigo-400" />
                    Centro de Grabación & Minutas Inteligentes (Estilo Gemini)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Captura notas de llamadas, grabaciones o audio en vivo y genera minutas ejecutivas con asignación de tareas y conversión a contratos en 1 clic.
                  </p>
                </div>
              </div>

              {/* SELECTOR DE MODALIDAD DE ENTRADA */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => setModoEntradaMinuta('notas_crudas')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    modoEntradaMinuta === 'notas_crudas'
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-white'
                      : 'bg-[#121a2d] border-[#1f2d4a] text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold font-mono">1. Apuntes Rápidos / Notas</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Pegar notas sueltas tomadas durante la llamada</div>
                  </div>
                </button>

                <button
                  onClick={() => setModoEntradaMinuta('audio_subido')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    modoEntradaMinuta === 'audio_subido'
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-white'
                      : 'bg-[#121a2d] border-[#1f2d4a] text-slate-400 hover:text-white'
                  }`}
                >
                  <UploadCloud className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold font-mono">2. Cargar Archivo de Audio</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Subir notas de voz WhatsApp, MP3, M4A o WAV</div>
                  </div>
                </button>

                <button
                  onClick={() => setModoEntradaMinuta('grabacion_vivo')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                    modoEntradaMinuta === 'grabacion_vivo'
                      ? 'bg-indigo-500/20 border-indigo-500/50 text-white'
                      : 'bg-[#121a2d] border-[#1f2d4a] text-slate-400 hover:text-white'
                  }`}
                >
                  <Mic className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold font-mono">3. Grabadora de Sala / Vivo</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Captura directa por micrófono del equipo</div>
                  </div>
                </button>
              </div>

              {/* PANEL DE PROCESAMIENTO Y RESULTADOS */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* ENTRADA DE DATOS */}
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 font-bold block mb-1">Título / Asunto de la Sesión</label>
                    <input
                      type="text"
                      value={asuntoReunion}
                      onChange={(e) => setAsuntoReunion(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 font-bold block mb-1">Participantes & Roles</label>
                    <input
                      type="text"
                      value={participantesReunion}
                      onChange={(e) => setParticipantesReunion(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-2.5 py-1.5 text-xs text-slate-200 outline-none font-mono"
                    />
                  </div>

                  {modoEntradaMinuta === 'notas_crudas' && (
                    <div>
                      <label className="text-xs font-mono text-slate-300 font-bold block mb-1">Notas Crudas de la Reunión</label>
                      <textarea
                        rows={10}
                        value={notasCrudasReunion}
                        onChange={(e) => setNotasCrudasReunion(e.target.value)}
                        className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg p-3 text-xs text-slate-200 outline-none font-mono resize-none leading-relaxed"
                      />
                    </div>
                  )}

                  {modoEntradaMinuta === 'audio_subido' && (
                    <div className="p-8 border-2 border-dashed border-[#1f2d4a] rounded-xl text-center space-y-3">
                      <UploadCloud className="w-10 h-10 text-indigo-400 mx-auto" />
                      <div className="text-xs text-slate-300">Arrastra tu archivo de audio aquí o selecciónalo</div>
                      <input type="file" accept="audio/*" className="text-xs text-slate-400 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:bg-indigo-500/20 file:text-indigo-300 file:cursor-pointer" />
                    </div>
                  )}

                  {modoEntradaMinuta === 'grabacion_vivo' && (
                    <div className="p-6 rounded-xl bg-[#090d16] border border-[#1f2d4a] text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto animate-pulse">
                        <Mic className="w-8 h-8" />
                      </div>
                      <div className="text-xs text-slate-300 font-mono font-bold">
                        {grabandoEnVivo ? "Grabando audio de sala en memoria..." : "Listo para grabar reunión"}
                      </div>
                      <button
                        onClick={() => setGrabandoEnVivo(!grabandoEnVivo)}
                        className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                          grabandoEnVivo ? 'bg-red-500 text-white' : 'bg-rose-500 hover:bg-rose-400 text-slate-950'
                        }`}
                      >
                        {grabandoEnVivo ? "⏹️ Detener Grabación" : "🎙️ Iniciar Grabación de Sala"}
                      </button>
                    </div>
                  )}

                  <button
                    onClick={ejecutarProcesamientoMinuta}
                    disabled={procesandoMinuta}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {procesandoMinuta ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Procesar Minuta Inteligente (Estilo Gemini)
                  </button>
                </div>

                {/* FICHA EJECUTIVA ESTILO GEMINI */}
                <div className="lg:col-span-2 p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                  {/* Encabezado con Botón de Disparo Directo */}
                  <div className="flex items-start justify-between border-b border-[#1f2d4a] pb-3">
                    <div>
                      <span className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        MINUTA EJECUTIVA ESTILO GEMINI
                      </span>
                      <h3 className="text-base font-bold text-white mt-1">{minutaGemini.ficha.asunto}</h3>
                      <p className="text-xs text-slate-400">{minutaGemini.ficha.participantes} · {minutaGemini.ficha.fecha}</p>
                    </div>

                    <button
                      onClick={transferirMinutaAContrato}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" /> Convertir en Contrato con RAG <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* BLOQUE 1: RESUMEN EJECUTIVO */}
                  <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-1.5">
                    <div className="text-[11px] font-mono font-bold text-slate-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-400" /> 1. Resumen Ejecutivo (Executive Summary)
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{minutaGemini.resumen_ejecutivo}</p>
                  </div>

                  {/* BLOQUE 2: ACUERDOS Y DECISIONES ADOPTADAS */}
                  <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-1.5">
                    <div className="text-[11px] font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-cyan-400" /> 2. Acuerdos & Decisiones Adoptadas (Términos Vinculantes)
                    </div>
                    <ul className="space-y-1 text-xs text-slate-200">
                      {minutaGemini.acuerdos_adoptados.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* BLOQUE 3: MATRIZ DE COMPROMISOS & TAREAS (ACTION ITEMS ESTILO GEMINI) */}
                  <div className="p-3.5 rounded-lg bg-[#090d16] border border-[#1f2d4a] space-y-2">
                    <div className="text-[11px] font-mono font-bold text-amber-400 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <CheckSquare className="w-3.5 h-3.5 text-amber-400" /> 3. Matriz de Tareas Asignadas (Action Items)
                      </span>
                      <span className="text-[10px] text-slate-400">Marca las tareas completadas</span>
                    </div>

                    <div className="space-y-2">
                      {minutaGemini.action_items.map((item: any) => (
                        <div
                          key={item.id}
                          onClick={() => toggleActionItem(item.id)}
                          className={`p-2.5 rounded-lg border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                            item.completado
                              ? 'bg-emerald-500/10 border-emerald-500/30 line-through text-slate-400'
                              : 'bg-[#121a2d] border-[#1f2d4a] text-slate-200 hover:border-cyan-500/40'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <input
                              type="checkbox"
                              checked={item.completado}
                              onChange={() => {}}
                              className="rounded border-[#1f2d4a] text-emerald-400 focus:ring-0 cursor-pointer"
                            />
                            <div className="text-xs">
                              <span className="font-bold text-white mr-1.5">[{item.responsable}]:</span>
                              <span>{item.tarea}</span>
                            </div>
                          </div>
                          <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded flex-shrink-0">
                            {item.plazo}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* BLOQUE 4: PUNTOS ABIERTOS Y RIESGOS PENDIENTES */}
                  <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300">
                    <strong className="text-amber-400 font-mono text-[11px] block mb-1">
                      ⚠️ 4. Puntos Abiertos & Riesgos a Validar:
                    </strong>
                    {minutaGemini.puntos_abiertos[0]}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 3: BIBLIOTECA & MOTOR RAG QDRANT */}
          {activeTab === 'rag_biblioteca' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Database className="w-6 h-6 text-cyan-400" />
                    Biblioteca Vectorial & Motor RAG Qdrant
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Búsqueda semántica en tu banco de 544 modelos jurídicos y recuperación de cláusulas probadas para evitar alucinaciones.
                  </p>
                </div>
              </div>

              {/* BUSCADOR SEMÁNTICO */}
              <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={queryBusquedaRag}
                      onChange={(e) => setQueryBusquedaRag(e.target.value)}
                      placeholder="Busca por concepto: ej. cláusula SLA 99.9%, cesión código desarrollador, vesting fundadores..."
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                  <button
                    onClick={ejecutarBusquedaRag}
                    disabled={buscandoRag}
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                  >
                    {buscandoRag ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                    Buscar en Qdrant
                  </button>
                </div>

                {/* RESULTADOS RAG RECUPERADOS */}
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold text-slate-300">
                    Modelos y Cláusulas Recuperadas de la Base Vectorial:
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {modelosRecuperadosRag.map((m: any) => (
                      <div key={m.id} className="p-4 rounded-xl bg-[#090d16] border border-[#1f2d4a] space-y-2 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="text-cyan-400 font-bold">{m.id}</span>
                            <span className="text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                              Similitud: {(m.score * 100).toFixed(0)}%
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-white mt-1">{m.titulo}</h4>
                          <p className="text-[10px] text-slate-400">{m.categoria}</p>
                          <p className="text-[11px] text-slate-300 mt-2 line-clamp-4 leading-relaxed font-mono bg-[#121a2d] p-2 rounded border border-[#1f2d4a]">
                            {m.fragmento}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            setClausulasClave(m.fragmento);
                            setActiveTab('studio_contratos');
                          }}
                          className="w-full py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono text-[11px] transition-all"
                        >
                          Usar como Base de Redacción →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 4: ESTUDIO DE CONTRATOS TECH CON RAG */}
          {activeTab === 'studio_contratos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <FileText className="w-6 h-6 text-sky-400" />
                    Estudio de Contratación Tech (con Inyección RAG)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Redacta contratos blindados utilizando automáticamente las cláusulas y modelos maestros de tu base vectorial Qdrant.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs font-mono text-slate-300 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={usarRagEnRedaccion}
                      onChange={(e) => setUsarRagEnRedaccion(e.target.checked)}
                      className="rounded border-[#1f2d4a] text-cyan-400 focus:ring-0"
                    />
                    <span className="text-cyan-300 font-bold">Motor RAG Activo (Precedentes Qdrant)</span>
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] space-y-4">
                  <div>
                    <label className="text-xs font-mono text-slate-300 font-bold block mb-1">Tipo de Instrumento Tech</label>
                    <select
                      value={tipoContrato}
                      onChange={(e) => setTipoContrato(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
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
                    <label className="text-xs font-mono text-slate-300 font-bold block mb-1">Jurisdicción / Ley Aplicable</label>
                    <select
                      value={jurisdiccion}
                      onChange={(e) => setJurisdiccion(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
                    >
                      <option value="Delaware (EE.UU.)">Delaware (EE.UU.) - Estándar Startups & VC</option>
                      <option value="LatAm / Regional">Hispanoamérica / Regional (Bilingüe)</option>
                      <option value="Arbitraje Internacional (ICC / AAA)">Arbitraje Comercial Internacional (ICC / AAA)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 font-bold block mb-1">Partes Intervinientes</label>
                    <input
                      type="text"
                      value={partesContrato}
                      onChange={(e) => setPartesContrato(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg px-3 py-2 text-xs text-slate-200 outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono text-slate-300 font-bold block mb-1">Términos Clave & Condiciones Acordadas</label>
                    <textarea
                      rows={5}
                      value={clausulasClave}
                      onChange={(e) => setClausulasClave(e.target.value)}
                      className="w-full bg-[#090d16] border border-[#1f2d4a] rounded-lg p-3 text-xs text-slate-200 outline-none font-mono resize-none"
                    />
                  </div>

                  <button
                    onClick={ejecutarGeneracionContrato}
                    disabled={generandoContrato}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {generandoContrato ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    Generar Contrato con Precedentes RAG
                  </button>
                </div>

                {/* VISOR DE CONTRATO Y PRECEDENTES */}
                <div className="lg:col-span-2 p-5 rounded-xl bg-[#121a2d] border border-[#1f2d4a] flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                      <FileCheck2 className="w-4 h-4 text-emerald-400" />
                      Instrumento Ensamblado (Fidelidad a Precedentes de Biblioteca)
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
                        <p className="text-xs">Configura los parámetros o transfiere desde la Minuta Gemini y pulsa 'Generar'.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VISTA 5: AUDITOR & PLAYBOOK REDLINING */}
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
                    {auditandoContrato ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                    Auditar contra Playbook Corporativo
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

          {/* VISTA 6: ADUANA ZERO-TRUST */}
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

          {/* VISTA 7: BLINDAJE DE SOFTWARE & ACTIVOS IA */}
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

          {/* VISTA 8: LEGAL OPS & MÉTRICAS */}
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
