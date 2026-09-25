'use client';

import React, { useState, useEffect } from 'react';
import { 
  Shield, FileText, Scale, Cpu, AlertTriangle, CheckCircle2, Lock, 
  Calendar, Briefcase, Users, Mic, CheckSquare, QrCode, Play, Square, Copy, Download, 
  ChevronRight, ChevronDown, ChevronLeft, MessageSquare, Sparkles, Search, BarChart3, 
  TrendingUp, Layers, Building2, PieChart, Radio, FileCheck2, FolderGit2, HelpCircle, 
  X, Printer, Upload, RefreshCw, Send, Clock, Plus, ArrowRight, Sun, Moon, Menu, PanelLeft
} from 'lucide-react';

export default function DashboardPage() {
  // Configuración de Tema (Claro / Oscuro) y Barra Lateral Plegable
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('asistente_ensamblaje');

  // Menús desplegables de navegación
  const [openSections, setOpenSections] = useState({
    asistentes: true,
    direccion: false,
    compliance: false
  });

  const toggleSection = (s: 'asistentes' | 'direccion' | 'compliance') => {
    setOpenSections(prev => ({ ...prev, [s]: !prev[s] }));
  };

  const isDark = theme === 'dark';

  // Modal para reportes PDF
  const [reporteModal, setReporteModal] = useState<'trust' | 'anexo' | 'ceo' | null>(null);

  // =========================================================================
  // ESTADOS PARA LOS 6 ASISTENTES DE IA
  // =========================================================================

  // Tablero Kanban Unificado
  const [tableroKanban, setTableroKanban] = useState<any[]>([
    { id: "KAN-01", titulo: "Redactar intimación legal y requerimiento de desbloqueo (Machtig Rothe)", responsable: "Barbara Piccolo", plazo: "Hoy 16:00", prioridad: "Crítica", columna: "Por Hacer", origen: "Triage Ingesta" },
    { id: "KAN-02", titulo: "Remitir borrador definitivo SaaS con SLA 99.9% y cláusula Zero-Trust", responsable: "Barbara Piccolo", plazo: "Viernes 17:00", prioridad: "Alta", columna: "En Proceso", origen: "Notetaker Whisper" },
    { id: "KAN-03", titulo: "Auditoría de inventario físico y conciliación de cuentas por pagar Corein", responsable: "Equipo Auditor", plazo: "Lunes 10:00", prioridad: "Media", columna: "En Proceso", origen: "Gestor FinOps" },
    { id: "KAN-04", titulo: "Validar poderes de representación y acta de asamblea Sub 1308 C.A.", responsable: "Barbara Piccolo", plazo: "Miércoles", prioridad: "Media", columna: "En Revisión", origen: "Ensamblador Doc" },
    { id: "KAN-05", titulo: "Revisión DPA GDPR anexo a contrato internacional", responsable: "Barbara Piccolo", plazo: "Completado", prioridad: "Alta", columna: "Completado", origen: "Redliner" }
  ]);

  // 1. Asistente de Ingesta y Triage
  const [canalTriage, setCanalTriage] = useState<'email' | 'whatsapp' | 'audio'>('email');
  const [textoTriage, setTextoTriage] = useState(
    `De: carlos.mendoza@inversionesguayana.com\nFecha: 24 Sep 2026 08:30\nPara: barbaraipiccolo@despacho.com\nAsunto: URGENTE - Retención indebida de maquinaria y amenaza de desalojo en Galpón Machtig Rothe\n\nDra. Bárbara, le escribo con suma urgencia. La arrendadora Inmobiliaria del Este C.A. (RIF J-30948572-1) nos envió ayer una notificación extrajudicial pretendiendo desalojar el galpón arrendado en Puerto Ordaz en 48 horas, alegando un supuesto atraso en mejoras estructurales que ellos mismos acordaron financiar. Además, bloquearon el portón principal impidiendo la salida de 3 montacargas propiedad de Machtig Rothe C.A. Requerimos respuesta legal formal antes de mañana a las 2:00 PM.`
  );
  const [cargandoTriage, setCargandoTriage] = useState(false);
  const [resultadoTriage, setResultadoTriage] = useState<any>({
    hechos_clave: [
      "Notificación extrajudicial recibida de Inmobiliaria del Este C.A. exigiendo desalojo en 48 horas.",
      "Controversia sobre financiamiento de reparaciones estructurales acordadas en el galpón.",
      "Vía de hecho: Retención ilegal de 3 montacargas mediante bloqueo de portón principal.",
      "Riesgo de daño patrimonial inminente e interrupción operativa."
    ],
    partes: {
      cliente: "Machtig Rothe, C.A.",
      contraparte: "Inmobiliaria del Este, C.A. (RIF J-30948572-1)",
      terceros: "Operadores logísticos en sitio"
    },
    urgencia: "Crítica",
    plazo_horas: 24,
    justificacion_urgencia: "Plazo conminatorio de 48 horas y retención de bienes de capital que genera lucro cesante.",
    expediente_sugerido: {
      codigo: "EXP-2026-092-INQ",
      materia: "Inquilinario Comercial / Medidas Cautelares",
      responsable: "Barbara Piccolo",
      titulo: "Machtig Rothe C.A. vs. Inmobiliaria del Este C.A."
    },
    primera_tarea: {
      id: "TSK-092",
      titulo: "Redactar intimación legal y requerimiento de desbloqueo de maquinaria",
      responsable: "Barbara Piccolo",
      plazo: "Hoy 16:00",
      prioridad: "Crítica"
    },
    tarea_agregada: false
  });

  const ejecutarTriageAnalitico = () => {
    setCargandoTriage(true);
    setTimeout(() => {
      setResultadoTriage({
        hechos_clave: [
          "Notificación extrajudicial conminatoria con plazo de 48 horas.",
          "Conflicto de imputación sobre reparaciones estructurales autorizadas.",
          "Bloqueo físico de acceso y retención ilegítima de 3 montacargas industriales.",
          "Riesgo de lucro cesante y daño patrimonial continuo."
        ],
        partes: {
          cliente: "Machtig Rothe, C.A.",
          contraparte: "Inmobiliaria del Este, C.A. (RIF J-30948572-1)",
          terceros: "Personal de planta y transportistas"
        },
        urgencia: "Crítica",
        plazo_horas: 24,
        justificacion_urgencia: "Riesgo de indefensión y retención ilícita de activos.",
        expediente_sugerido: {
          codigo: "EXP-2026-092-INQ",
          materia: "Inquilinario Comercial / Medidas Posesorias",
          responsable: "Barbara Piccolo",
          titulo: "Defensa Posesoria y Cese de Vías de Hecho"
        },
        primera_tarea: {
          id: `TSK-${Math.floor(100 + Math.random() * 900)}`,
          titulo: "Redactar intimación con advertencia penal por retención indebida",
          responsable: "Barbara Piccolo",
          plazo: "Hoy 16:00",
          prioridad: "Crítica"
        },
        tarea_agregada: false
      });
      setCargandoTriage(false);
    }, 450);
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

  // 2. Motor de Ensamblaje Documental
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<'arrendamiento' | 'poder' | 'nda' | 'asamblea'>('arrendamiento');
  const [formDataCRM, setFormDataCRM] = useState({
    arrendador_nombre: "Inmobiliaria del Este, C.A.",
    arrendador_rif: "J-30948572-1",
    arrendatario_nombre: "Machtig Rothe, C.A.",
    arrendatario_rif: "J-40192834-0",
    inmueble_ubicacion: "Galpón Industrial N° 4, Sector Unare II, Puerto Ordaz",
    canon_mensual: "2.800 USD (a tasa BCV)",
    duracion_meses: "24 meses",
    clausula_mejoras: true,
    tope_mejoras: "15.000 USD compensables"
  });
  const [documentoEnsamblado, setDocumentoEnsamblado] = useState<string>(
    `CONTRATO DE ARRENDAMIENTO COMERCIAL E INDUSTRIAL\n` +
    `ESTÁNDAR PICCOLO & ASOCIADOS (CÓDIGO: ARREND-2026)\n\n` +
    `Entre INMOBILIARIA DEL ESTE, C.A. (RIF J-30948572-1), en lo sucesivo "LA ARRENDADORA"; y MACHTIG ROTHE, C.A. (RIF J-40192834-0), en lo sucesivo "LA ARRENDATARIA", se conviene:\n\n` +
    `PRIMERA (OBJETO): LA ARRENDADORA cede en arrendamiento el Galpón Industrial N° 4, Sector Unare II, Puerto Ordaz, destinado exclusivamente a operaciones industriales.\n\n` +
    `SEGUNDA (CANON): Canon convenido de 2.800 USD (a tasa BCV) pagadero por mensualidades anticipadas dentro de los primeros 5 días hábiles.\n\n` +
    `TERCERA (DURACIÓN): Vigencia de 24 meses renovable por notificación formal previa de 60 días.\n\n` +
    `CUARTA (MEJORAS ESTRUCTURALES): Las mejoras estructurales hasta 15.000 USD serán financiadas inicialmente por LA ARRENDATARIA y compensadas mensualmente hasta un 50% de los cánones sucesivos.\n\n` +
    `QUINTA (PROHIBICIÓN DE VÍAS DE HECHO): Queda prohibido el bloqueo de accesos o retención de bienes de capital. El incumplimiento causará una penalidad diaria de 500 USD.\n\n` +
    `SEXTA (FUERO): Domicilio especial exclusivo en los tribunales de Puerto Ordaz.`
  );
  const [cargandoEnsamblaje, setCargandoEnsamblaje] = useState(false);

  const ejecutarEnsamblajeDocumental = () => {
    setCargandoEnsamblaje(true);
    setTimeout(() => {
      setDocumentoEnsamblado(
        `CONTRATO DE ARRENDAMIENTO COMERCIAL E INDUSTRIAL\n` +
        `ESTÁNDAR PICCOLO & ASOCIADOS\n\n` +
        `Entre ${formDataCRM.arrendador_nombre.toUpperCase()} (RIF: ${formDataCRM.arrendador_rif}), "LA ARRENDADORA"; y ${formDataCRM.arrendatario_nombre.toUpperCase()} (RIF: ${formDataCRM.arrendatario_rif}), "LA ARRENDATARIA":\n\n` +
        `CLÁUSULA PRIMERA: Objeto en ${formDataCRM.inmueble_ubicacion}.\n\n` +
        `CLÁUSULA SEGUNDA: Canon de ${formDataCRM.canon_mensual} por mensualidades anticipadas.\n\n` +
        `CLÁUSULA TERCERA: Plazo de ${formDataCRM.duracion_meses}.\n\n` +
        (formDataCRM.clausula_mejoras ? `CLÁUSULA CUARTA: Reparaciones estructurales financiadas hasta ${formDataCRM.tope_mejoras} con compensación mensual de canon.\n\n` : '') +
        `CLÁUSULA QUINTA: Prohibición de vías de hecho y retención de bienes muebles.\n\n` +
        `CLÁUSULA SEXTA: Fuero exclusivo en los tribunales competentes de Puerto Ordaz.`
      );
      setCargandoEnsamblaje(false);
    }, 400);
  };

  // 3. Auditor de Contrapartes (El Redliner)
  const [textoContraparteRedline, setTextoContraparteRedline] = useState(
    `CLÁUSULA 6 (INDEMNIDAD ILIMITADA): La Proveedora indemnizará a la Contraparte por cualquier pérdida, reclamo o lucro cesante, sin sujeción a límite cuantitativo alguno.\n\n` +
    `CLÁUSULA 10 (PROPIEDAD DE IP Y CÓDIGO): Todo desarrollo, algoritmo o código creado durante la vigencia pasará a ser propiedad exclusiva de la Contraparte.\n\n` +
    `CLÁUSULA 15 (JURISDICCIÓN): Las partes se someten a los tribunales de Singapur, asumiendo la Proveedora las costas judiciales.`
  );
  const [cargandoRedliner, setCargandoRedliner] = useState(false);
  const [resultadoRedliner, setResultadoRedliner] = useState<any>({
    score_cumplimiento: 35,
    nivel_riesgo: "Crítico",
    hallazgos: [
      {
        clausula: "Cláusula 6: Indemnidad Ilimitada",
        texto_original: "La Proveedora indemnizará... sin sujeción a límite cuantitativo alguno.",
        redline_propuesto: "La responsabilidad acumulada se limita estrictamente a 12 meses de facturación, excluyendo expresamente el lucro cesante.",
        motivo: "Violación de política corporativa (Tope máx. 12 meses)."
      },
      {
        clausula: "Cláusula 10: Cesión de IP y Algoritmos",
        texto_original: "Todo desarrollo, algoritmo o código pasará a ser propiedad de la Contraparte.",
        redline_propuesto: "La Proveedora retiene la titularidad exclusiva de su tecnología y otorga una licencia de uso corporativa temporal.",
        motivo: "Protección de IP y activos de software propios."
      },
      {
        clausula: "Cláusula 15: Fuero en Singapur",
        texto_original: "Sometimiento exclusivo a los tribunales de Singapur...",
        redline_propuesto: "Sometimiento a los tribunales ordinarios de Madrid (España) o Delaware (EE.UU.).",
        motivo: "Asimetría procesal y costos judiciales inasumibles."
      }
    ]
  });

  const ejecutarAuditoriaRedliner = () => {
    setCargandoRedliner(true);
    setTimeout(() => {
      setResultadoRedliner({
        score_cumplimiento: 38,
        nivel_riesgo: "Crítico",
        hallazgos: [
          {
            clausula: "Cláusula 6: Indemnidad Ilimitada",
            texto_original: "La Proveedora indemnizará... sin límite alguno.",
            redline_propuesto: "Responsabilidad total acotada a 12 meses de facturación previa.",
            motivo: "Estándar de despacho Piccolo & Asociados."
          },
          {
            clausula: "Cláusula 10: Cesión de IP",
            texto_original: "Cesión irrevocable de código y algoritmos.",
            redline_propuesto: "Licencia de uso no exclusiva; retención íntegra de la titularidad de IP.",
            motivo: "Cláusula innegociable de soberanía tecnológica."
          },
          {
            clausula: "Cláusula 15: Fuero Foráneo",
            texto_original: "Tribunales arbitrales de Singapur.",
            redline_propuesto: "Tribunales de Madrid o jurisdicción local acordada.",
            motivo: "Evita litigios en sedes remotas desfavorables."
          }
        ]
      });
      setCargandoRedliner(false);
    }, 450);
  };

  // 4. El Traductor Estratégico
  const [areaTraduccion, setAreaTraduccion] = useState<'tecnologia' | 'finanzas' | 'rrhh'>('tecnologia');
  const [inputRequerimientoLegal, setInputRequerimientoLegal] = useState(
    `Art. 12 EU AI Act & RGPD Art. 17: Todo log de inferencia con identificadores personales debe ser anonimizado en memoria en el Gateway antes de persistir. Los registros auditables se conservarán por un plazo máximo de 90 días con purga automatizada criptográfica.`
  );
  const [cargandoTraductor, setCargandoTraductor] = useState(false);
  const [resultadoTraduccion, setResultadoTraduccion] = useState<any>({
    area: "tecnologia",
    tickets: [
      {
        id: "TECH-101",
        titulo: "Middleware de Sanitización PII en Memoria (FastAPI)",
        user_story: "Como backend engineer, debo interceptar prompts y enmascarar DNI, correos e IBAN antes de invocar el LLM.",
        criterios: ["Latencia < 15ms", "Cero persistencia en disco de datos crudos", "Generación de Hash SHA-256"],
        prioridad: "P1 - Bloqueante"
      },
      {
        id: "TECH-102",
        titulo: "Job Cron de Purga Automatizada a 90 días",
        user_story: "Como DevOps, requiero un cron semanal que elimine logs con antigüedad > 90 días, respetando retención judicial.",
        criterios: ["Ejecución semanal automática", "Exclusión de registros marcados 'legal_hold'", "Emisión de certificado de purga"],
        prioridad: "P2 - Alta"
      }
    ],
    manual: "Regla técnica: Todo tráfico de IA debe canalizarse exclusivamente por el puerto 8000 del Gateway privado."
  });

  const ejecutarTraduccionEstrategica = () => {
    setCargandoTraductor(true);
    setTimeout(() => {
      if (areaTraduccion === 'tecnologia') {
        setResultadoTraduccion({
          area: "tecnologia",
          tickets: [
            {
              id: "TECH-201",
              titulo: "Sanitización PII en Gateway en Tiempo Real",
              user_story: "Ofuscar datos confidenciales antes de enviar prompts a Groq/OpenAI.",
              criterios: ["Patrones regex de DNI/RIF/IBAN", "Hash de auditoría forense"],
              prioridad: "P1 - Bloqueante"
            },
            {
              id: "TECH-202",
              titulo: "Política de Retención y Purga de Logs (90 días)",
              user_story: "Eliminar registros antiguos sin orden judicial activa.",
              criterios: ["Verificación de antigüedad", "Flag legal_hold"],
              prioridad: "P2 - Alta"
            }
          ],
          manual: "Prohibido el uso de APIs externas de IA sin intermediación del Gateway seguro."
        });
      } else if (areaTraduccion === 'finanzas') {
        setResultadoTraduccion({
          area: "finanzas",
          tickets: [
            {
              id: "FIN-101",
              titulo: "Conciliación de Créditos de Servicio por Caídas de SLA",
              user_story: "Calcular créditos contractuales ante indisponibilidad superior al 0.1% anual.",
              criterios: ["Reporte mensual de uptime", "Nota de crédito automática"],
              prioridad: "P1"
            }
          ],
          manual: "Las facturas de software de IA requieren reporte de telemetría de consumo real."
        });
      } else {
        setResultadoTraduccion({
          area: "rrhh",
          tickets: [
            {
              id: "HR-101",
              titulo: "Capacitación en Alfabetización de IA (Art. 4 EU AI Act)",
              user_story: "Módulo obligatorio de onboarding sobre manejo seguro de datos corporativos.",
              criterios: ["Taller práctico de 20 min", "Firma de anexo de confidencialidad"],
              prioridad: "P1"
            }
          ],
          manual: "Queda estrictamente prohibido introducir datos corporativos en chats personales externos."
        });
      }
      setCargandoTraductor(false);
    }, 400);
  };

  // 5. Gestor de Práctica y FinOps
  const casosFinOps = [
    {
      id: "machtig",
      nombre: "Machtig Rothe, C.A.",
      asunto: "Arrendamiento & Medidas Cautelares",
      horas: "28 / 30h",
      tarifa: "140 USD/h",
      facturacion: "4.200 USD",
      estado: "Al día",
      plazo_critico: "Faltan 48 horas (Contestación intimación)",
      urgente: true
    },
    {
      id: "corein",
      nombre: "Corein, C.A.",
      asunto: "Auditoría Forense de Inventario y Deuda",
      horas: "58 / 45h (Scope Creep)",
      tarifa: "150 USD/h",
      facturacion: "6.750 USD",
      estado: "Factura N° 104 pendiente",
      plazo_critico: "Faltan 12 días (Directorio)",
      urgente: false
    },
    {
      id: "aigovern",
      nombre: "AI GOVERN S.L.",
      asunto: "SaaS Enterprise & DPA Internacional",
      horas: "34 / 50h",
      tarifa: "180 €/h",
      facturacion: "9.000 €",
      estado: "Retainer Pagado",
      plazo_critico: "Faltan 30 días (Renovación VPC)",
      urgente: false
    }
  ];

  // 6. Grabación y Minutas (Notetaker con Whisper)
  const [grabandoAudio, setGrabandoAudio] = useState(false);
  const [segundosGrabacion, setSegundosGrabacion] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [archivoAudioNombre, setArchivoAudioNombre] = useState<string | null>(null);
  const [cargandoWhisper, setCargandoWhisper] = useState(false);
  const [mediaRecorderRef, setMediaRecorderRef] = useState<any>(null);

  const [minutaWhisper, setMinutaWhisper] = useState<any>({
    titulo: "Sesión de Cierre: Negociación de Contrato SaaS con Acme Corp",
    fecha: "24 de Septiembre de 2026",
    duracion: "36 minutos",
    acuerdos: [
      "Precio acordado: 60.000 €/año facturado por adelantado.",
      "SLA del 99.9% garantizado con créditos de servicio por caídas técnicas.",
      "Prohibición estricta de reentrenamiento de IA con datos de Acme.",
      "Fuero y jurisdicción exclusiva en tribunales de Madrid / Delaware."
    ],
    action_items: [
      { id: "ACT-01", tarea: "Enviar borrador MSA adaptado con SLA 99.9% y DPA anexo", responsable: "Barbara Piccolo", plazo: "Viernes 17:00", prioridad: "Alta", agregado: true },
      { id: "ACT-02", tarea: "Remitir poderes del administrador y NIF para firma eIDAS", responsable: "Roberto Sánchez (Acme)", plazo: "Jueves 18:00", prioridad: "Media", agregado: false },
      { id: "ACT-03", tarea: "Configurar VPC privada y certificados de encriptación", responsable: "Equipo Técnico", plazo: "Lunes 12:00", prioridad: "Alta", agregado: false }
    ],
    puntos_abiertos: [
      "Definición de penalidades por caída superior a 30 minutos continuos.",
      "Preaviso formal de 60 días para rescisión sin causa."
    ]
  });

  // Temporizador de audio
  useEffect(() => {
    let t: any = null;
    if (grabandoAudio) {
      t = setInterval(() => setSegundosGrabacion(p => p + 1), 1000);
    } else {
      clearInterval(t);
    }
    return () => clearInterval(t);
  }, [grabandoAudio]);

  const toggleGrabacionAudio = async () => {
    if (grabandoAudio) {
      if (mediaRecorderRef) {
        try {
          mediaRecorderRef.stop();
          mediaRecorderRef.stream.getTracks().forEach((trk: any) => trk.stop());
        } catch (e) {}
      }
      setGrabandoAudio(false);
    } else {
      try {
        if (typeof window !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          const recorder = new (window as any).MediaRecorder(stream);
          const chunks: any[] = [];
          recorder.ondataavailable = (e: any) => { if (e.data.size > 0) chunks.push(e.data); };
          recorder.onstop = () => {
            const blob = new Blob(chunks, { type: 'audio/webm' });
            setAudioUrl(URL.createObjectURL(blob));
            setArchivoAudioNombre("grabacion_sala.webm");
            procesarConWhisper(blob, "grabacion_sala.webm");
          };
          recorder.start();
          setMediaRecorderRef(recorder);
          setGrabandoAudio(true);
          setSegundosGrabacion(0);
        } else {
          setGrabandoAudio(true);
          setSegundosGrabacion(0);
        }
      } catch (err) {
        setGrabandoAudio(true);
        setSegundosGrabacion(0);
      }
    }
  };

  const handleSubirArchivo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const f = e.target.files[0];
      setArchivoAudioNombre(f.name);
      setAudioUrl(URL.createObjectURL(f));
      procesarConWhisper(f, f.name);
    }
  };

  const procesarConWhisper = async (fileOrBlob: Blob | File, nombre: string) => {
    setCargandoWhisper(true);
    const fd = new FormData();
    fd.append('file', fileOrBlob, nombre);

    try {
      const res = await fetch('http://localhost:8000/api/v1/audio/transcribe', {
        method: 'POST',
        body: fd
      });
      if (res.ok) {
        const data = await res.json();
        setMinutaWhisper({
          titulo: data.titulo || "Minuta de Sesión",
          fecha: data.fecha || "24 de Septiembre de 2026",
          duracion: data.duracion || "32 minutos",
          acuerdos: data.acuerdos || [],
          action_items: (data.action_items || []).map((ai: any) => ({ ...ai, agregado: false })),
          puntos_abiertos: data.puntos_abiertos || []
        });
      } else {
        throw new Error();
      }
    } catch (e) {
      setTimeout(() => {
        setMinutaWhisper((prev: any) => ({
          ...prev,
          titulo: `Minuta Procesada: ${nombre.replace(/\.[^/.]+$/, "")}`,
          duracion: `${Math.floor(segundosGrabacion / 60)}m ${segundosGrabacion % 60}s`
        }));
      }, 500);
    } finally {
      setCargandoWhisper(false);
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
        origen: "Notetaker Whisper"
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

  // =========================================================================
  // VISTAS ADICIONALES (ADUANA, CAIO, DUE DILIGENCE, BÓVEDA)
  // =========================================================================
  const [textoAduana, setTextoAduana] = useState("El cliente Juan Pérez con DNI 12345678Z y correo juan.perez@empresa.com solicita contrato con pago a cuenta ES1234567890123456789012 por 50.000 €.");
  const [resultadoAduana, setResultadoAduana] = useState<any>(null);
  const [cargandoAduana, setCargandoAduana] = useState(false);

  const ejecutarAnonimizacion = () => {
    setCargandoAduana(true);
    setTimeout(() => {
      let t = textoAduana.replace(/juan\.perez@empresa\.com/g, '[EMAIL_1]')
                          .replace(/12345678Z/g, '[DNI_1]')
                          .replace(/Juan Pérez/g, '[CLIENTE_1]')
                          .replace(/ES1234567890123456789012/g, '[IBAN_1]');
      setResultadoAduana({ texto_anonimizado: t, tokens_ofuscados: 4, hash_sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855" });
      setCargandoAduana(false);
    }, 350);
  };

  return (
    <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#0b0f19] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* ===================================================================== */}
      {/* SIDEBAR PLEGABLE DE IZQUIERDA A DERECHA (ESTILO TASKADE)             */}
      {/* ===================================================================== */}
      <aside className={`transition-all duration-300 ease-in-out border-r flex flex-col justify-between select-none z-30 ${
        sidebarOpen 
          ? 'w-72 p-3.5 translate-x-0 opacity-100' 
          : 'w-0 p-0 -translate-x-full opacity-0 pointer-events-none border-none'
      } ${
        isDark ? 'bg-[#0f172a] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="space-y-4 overflow-y-auto pr-1">
          
          {/* Logo y Encabezado de la Firma */}
          <div className="flex items-center justify-between px-2 py-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 shadow-md">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm tracking-tight flex items-center gap-1.5">
                  AI GOVERN
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </div>
                <div className={`text-[10px] font-medium tracking-wide ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  Enterprise Legal OS
                </div>
              </div>
            </div>

            {/* Botón para contraer la barra lateral */}
            <button 
              onClick={() => setSidebarOpen(false)}
              className={`p-1.5 rounded-lg border transition-colors ${
                isDark ? 'border-slate-800 hover:bg-slate-800 text-slate-400' : 'border-slate-200 hover:bg-slate-100 text-slate-500'
              }`}
              title="Ocultar barra lateral"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Buscador Rápido */}
          <div className="relative px-1">
            <Search className={`w-3.5 h-3.5 absolute left-3.5 top-2.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
            <input 
              type="text" 
              placeholder="Buscar caso, plantilla o hito..." 
              className={`w-full rounded-lg pl-8 pr-3 py-1.5 text-xs transition-colors focus:outline-none ${
                isDark 
                  ? 'bg-slate-900 border border-slate-800 text-slate-200 focus:border-cyan-500 placeholder-slate-500' 
                  : 'bg-slate-50 border border-slate-200 text-slate-800 focus:border-blue-500 placeholder-slate-400'
              }`} 
            />
          </div>

          {/* ================================================================= */}
          {/* SECCIÓN 1: 6 ASISTENTES DE IA (NÚCLEO OPERATIVO)                  */}
          {/* ================================================================= */}
          <div className="space-y-1">
            <button 
              onClick={() => toggleSection('asistentes')}
              className={`w-full px-2.5 py-1.5 flex items-center justify-between text-xs font-semibold rounded-lg transition-colors ${
                isDark ? 'text-cyan-400 hover:bg-slate-800/60' : 'text-blue-600 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>6 Asistentes de IA</span>
              </span>
              {openSections.asistentes ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {openSections.asistentes && (
              <div className="pl-2 space-y-0.5">
                {[
                  { id: 'asistente_triage', label: '1. Ingesta y Triage', icon: MessageSquare, color: 'text-cyan-400' },
                  { id: 'asistente_ensamblaje', label: '2. Ensamblador Documental', icon: FileText, color: 'text-emerald-400' },
                  { id: 'asistente_redliner', label: '3. Auditor de Contrapartes', icon: Scale, color: 'text-purple-400' },
                  { id: 'asistente_traductor', label: '4. Traductor Estratégico', icon: Cpu, color: 'text-blue-400' },
                  { id: 'asistente_finops', label: '5. Práctica y FinOps', icon: BarChart3, color: 'text-amber-400' },
                  { id: 'asistente_notetaker', label: '6. Grabación y Minutas', icon: Mic, color: 'text-pink-400' },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
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
          {/* SECCIÓN 2: DIRECCIÓN & CAIO                                       */}
          {/* ================================================================= */}
          <div className="space-y-1">
            <button 
              onClick={() => toggleSection('direccion')}
              className={`w-full px-2.5 py-1.5 flex items-center justify-between text-xs font-semibold rounded-lg transition-colors ${
                isDark ? 'text-slate-300 hover:bg-slate-800/60' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                <span>Dirección & CAIO</span>
              </span>
              {openSections.direccion ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {openSections.direccion && (
              <div className="pl-2 space-y-0.5">
                <button
                  onClick={() => setActiveTab('caio')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'caio'
                      ? isDark ? 'bg-cyan-500/15 text-cyan-300 font-semibold' : 'bg-blue-50 text-blue-700 font-semibold'
                      : isDark ? 'text-slate-400 hover:bg-slate-800/60' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="truncate">Torre CAIO & Trust Reports</span>
                </button>
                <button
                  onClick={() => setActiveTab('general_counsel')}
                  className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === 'general_counsel'
                      ? isDark ? 'bg-cyan-500/15 text-cyan-300 font-semibold' : 'bg-blue-50 text-blue-700 font-semibold'
                      : isDark ? 'text-slate-400 hover:bg-slate-800/60' : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                  <span className="truncate">Portal General Counsel</span>
                </button>
              </div>
            )}
          </div>

          {/* ================================================================= */}
          {/* SECCIÓN 3: SEGURIDAD & COMPLIANCE (SIN REPETICIONES)              */}
          {/* ================================================================= */}
          <div className="space-y-1">
            <button 
              onClick={() => toggleSection('compliance')}
              className={`w-full px-2.5 py-1.5 flex items-center justify-between text-xs font-semibold rounded-lg transition-colors ${
                isDark ? 'text-slate-300 hover:bg-slate-800/60' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Seguridad & Compliance</span>
              </span>
              {openSections.compliance ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
            </button>

            {openSections.compliance && (
              <div className="pl-2 space-y-0.5">
                {[
                  { id: 'aduana', label: 'Aduana Zero-Trust (Paso 0)', icon: Shield, color: 'text-emerald-400' },
                  { id: 'due_diligence', label: 'Due Diligence & Data Room', icon: Layers, color: 'text-cyan-400' },
                  { id: 'boveda', label: 'Bóveda Forense SHA-256', icon: Lock, color: 'text-blue-400' },
                  { id: 'canal_etico', label: 'Canal Ético (Ley 2/2023)', icon: HelpCircle, color: 'text-purple-400' },
                  { id: 'societario', label: 'Secretaría Societaria', icon: Building2, color: 'text-amber-400' },
                ].map((item) => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
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

        {/* Perfil del Usuario al pie */}
        <div className={`pt-3 border-t flex items-center justify-between px-1 ${
          isDark ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-500 to-cyan-400 flex items-center justify-center font-bold text-xs text-slate-950 font-mono">
              BP
            </div>
            <div>
              <div className="text-xs font-bold leading-tight">Barbara Piccolo</div>
              <div className={`text-[10px] font-mono ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                General Counsel & CAIO
              </div>
            </div>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400" title="Sistema Online"></div>
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* ÁREA PRINCIPAL DE TRABAJO                                             */}
      {===================================================================== */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header Superior Limpio con Selector de Tema y Botón de Menú */}
        <header className={`h-14 border-b px-5 flex items-center justify-between backdrop-blur-md transition-colors ${
          isDark ? 'bg-[#0f172a]/80 border-slate-800' : 'bg-white/90 border-slate-200'
        }`}>
          <div className="flex items-center gap-3">
            {/* Botón para alternar la barra lateral */}
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

            {/* Breadcrumb minimalista */}
            <div className={`flex items-center gap-1.5 text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              <span>AI GOVERN</span>
              <ChevronRight className="w-3.5 h-3.5 opacity-60" />
              <span className={`font-semibold capitalize ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                {activeTab.replace('asistente_', '').replace('_', ' ')}
              </span>
            </div>
          </div>

          {/* Selector de Tema y Badges de Cumplimiento */}
          <div className="flex items-center gap-2.5">
            <span className={`hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono ${
              isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              <CheckCircle2 className="w-3 h-3" /> EU AI Act & RGPD Online
            </span>

            {/* Botón Selector de Tema Claro / Oscuro */}
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

        {/* Contenido Principal con Scroll Suave */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

          {/* ================================================================= */}
          {/* ASISTENTE 1: INGESTA Y TRIAGE                                     */}
          {/* ================================================================= */}
          {activeTab === 'asistente_triage' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-cyan-400" /> Ingesta y Triage Analítico
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Estructuración de hechos, detección de urgencia y primera tarea para el tablero Kanban.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 space-y-3">
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="flex gap-1.5 p-1 rounded-lg border bg-slate-950/30 text-xs font-mono">
                      {(['email', 'whatsapp', 'audio'] as const).map(c => (
                        <button
                          key={c}
                          onClick={() => setCanalTriage(c)}
                          className={`flex-1 py-1 rounded capitalize transition-all ${
                            canalTriage === c 
                              ? isDark ? 'bg-cyan-500/20 text-cyan-300 font-bold' : 'bg-blue-100 text-blue-700 font-bold'
                              : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={7}
                      value={textoTriage}
                      onChange={(e) => setTextoTriage(e.target.value)}
                      className={`w-full p-3 rounded-xl border text-xs font-mono focus:outline-none transition-colors leading-relaxed ${
                        isDark 
                          ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-cyan-500' 
                          : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'
                      }`}
                      placeholder="Texto desordenado del cliente..."
                    />

                    <button
                      onClick={ejecutarTriageAnalitico}
                      disabled={cargandoTriage}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {cargandoTriage ? "Estructurando hechos..." : "Estructurar Problema & Triage"}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  {resultadoTriage && (
                    <div className={`p-4 rounded-2xl border space-y-3.5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800/40">
                        <span className="text-xs font-bold uppercase tracking-wider">Diagnóstico de Expediente</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                          {resultadoTriage.urgencia.toUpperCase()} • {resultadoTriage.plazo_horas}h Límite
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          <div className="text-[10px] font-bold uppercase text-cyan-400">Partes</div>
                          <div className="font-semibold mt-0.5">{resultadoTriage.partes.cliente}</div>
                          <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>vs. {resultadoTriage.partes.contraparte}</div>
                        </div>
                        <div className={`p-2.5 rounded-xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                          <div className="text-[10px] font-bold uppercase text-amber-400">Apertura Sugerida</div>
                          <div className="font-semibold mt-0.5 font-mono">{resultadoTriage.expediente_sugerido.codigo}</div>
                          <div className={`text-[11px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{resultadoTriage.expediente_sugerido.materia}</div>
                        </div>
                      </div>

                      <div className={`p-3 rounded-xl border space-y-1 text-xs ${isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>
                        <div className="text-[10px] font-bold uppercase text-slate-400">Hechos Clave</div>
                        {resultadoTriage.hechos_clave.map((h: string, i: number) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px]">
                            <span className="text-cyan-400 font-bold">•</span>
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>

                      <div className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${
                        isDark ? 'bg-cyan-950/20 border-cyan-500/30' : 'bg-blue-50 border-blue-200'
                      }`}>
                        <div>
                          <div className="text-[10px] font-bold uppercase text-cyan-400">Primera Tarea Generada</div>
                          <div className="text-xs font-semibold">{resultadoTriage.primera_tarea.titulo}</div>
                        </div>
                        <button
                          onClick={agregarTareaTriageAKanban}
                          disabled={resultadoTriage.tarea_agregada}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shrink-0 ${
                            resultadoTriage.tarea_agregada
                              ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                              : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-sm cursor-pointer'
                          }`}
                        >
                          {resultadoTriage.tarea_agregada ? "Añadida al Kanban ✓" : "Añadir a Kanban"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Tablero Kanban Mini */}
              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/40 text-xs font-bold">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Tablero Kanban de Tareas del Despacho</span>
                  </div>
                  <span className={`text-[10px] font-normal ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{tableroKanban.length} tareas activas</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 text-xs">
                  {['Por Hacer', 'En Proceso', 'En Revisión', 'Completado'].map(col => {
                    const list = tableroKanban.filter(t => t.columna === col);
                    return (
                      <div key={col} className={`p-2.5 rounded-xl border flex flex-col justify-between min-h-[140px] ${
                        isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <div>
                          <div className="flex justify-between items-center pb-1 text-[11px] font-bold text-slate-400">
                            <span>{col}</span>
                            <span className="text-[10px]">{list.length}</span>
                          </div>
                          <div className="space-y-1.5 mt-1.5">
                            {list.map(t => (
                              <div key={t.id} className={`p-2 rounded-lg border text-[11px] space-y-1 ${
                                isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                              }`}>
                                <div className="font-medium leading-snug">{t.titulo}</div>
                                <div className={`text-[9px] flex justify-between ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                                  <span>{t.responsable}</span>
                                  <span>{t.plazo}</span>
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

          {/* ================================================================= */}
          {/* ASISTENTE 2: ENSAMBLADOR DOCUMENTAL (ESTILO MINIMALISTA)          */}
          {/* ================================================================= */}
          {activeTab === 'asistente_ensamblaje' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-400" /> Ensamblador Documental
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Mapeo directo de variables del CRM sobre plantillas inmutables del despacho.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono ${
                    isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    Modelos Inmutables
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono ${
                    isDark ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}>
                    Cero Alucinaciones
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {/* Formulario */}
                <div className="lg:col-span-5 space-y-3">
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div>
                      <label className={`text-[11px] font-semibold block mb-1 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        Modelo Contractual Inmutable:
                      </label>
                      <select
                        value={plantillaSeleccionada}
                        onChange={(e: any) => setPlantillaSeleccionada(e.target.value)}
                        className={`w-full p-2.5 rounded-xl border text-xs focus:outline-none ${
                          isDark 
                            ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-emerald-500' 
                            : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'
                        }`}
                      >
                        <option value="arrendamiento">Arrendamiento Comercial con Mejoras (Machtig Rothe)</option>
                        <option value="poder">Poder Especial Amplio (Estándar Piccolo)</option>
                        <option value="nda">Acuerdo de Confidencialidad Bilateral (NDA)</option>
                        <option value="asamblea">Acta de Asamblea Extraordinaria (Sub 1308)</option>
                      </select>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div>
                        <label className={`text-[10px] block mb-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Arrendador / Otorgante:</label>
                        <input
                          type="text"
                          value={formDataCRM.arrendador_nombre}
                          onChange={(e) => setFormDataCRM({...formDataCRM, arrendador_nombre: e.target.value})}
                          className={`w-full p-2 rounded-lg border text-xs focus:outline-none ${
                            isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`text-[10px] block mb-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Arrendatario / Apoderado:</label>
                        <input
                          type="text"
                          value={formDataCRM.arrendatario_nombre}
                          onChange={(e) => setFormDataCRM({...formDataCRM, arrendatario_nombre: e.target.value})}
                          className={`w-full p-2 rounded-lg border text-xs focus:outline-none ${
                            isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className={`text-[10px] block mb-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Canon Mensual:</label>
                          <input
                            type="text"
                            value={formDataCRM.canon_mensual}
                            onChange={(e) => setFormDataCRM({...formDataCRM, canon_mensual: e.target.value})}
                            className={`w-full p-2 rounded-lg border text-xs focus:outline-none ${
                              isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          />
                        </div>
                        <div>
                          <label className={`text-[10px] block mb-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Plazo:</label>
                          <input
                            type="text"
                            value={formDataCRM.duracion_meses}
                            onChange={(e) => setFormDataCRM({...formDataCRM, duracion_meses: e.target.value})}
                            className={`w-full p-2 rounded-lg border text-xs focus:outline-none ${
                              isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                            }`}
                          />
                        </div>
                      </div>

                      <div className={`p-2.5 rounded-xl border flex items-center justify-between ${
                        isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        <span className="text-[11px]">Cláusula de Mejoras Compensables</span>
                        <input
                          type="checkbox"
                          checked={formDataCRM.clausula_mejoras}
                          onChange={(e) => setFormDataCRM({...formDataCRM, clausula_mejoras: e.target.checked})}
                          className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                        />
                      </div>
                    </div>

                    <button
                      onClick={ejecutarEnsamblajeDocumental}
                      disabled={cargandoEnsamblaje}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {cargandoEnsamblaje ? "Ensamblando plantilla..." : "Ensamblar Documento"}
                    </button>
                  </div>
                </div>

                {/* Visor del Documento */}
                <div className="lg:col-span-7 space-y-3">
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800/40">
                      <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <FileCheck2 className="w-4 h-4 text-emerald-400" /> Instrumento Ensamblado
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(documentoEnsamblado);
                            alert("Texto copiado al portapapeles.");
                          }}
                          className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                            isDark ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                          }`}
                        >
                          <Copy className="w-3 h-3" /> Copiar
                        </button>
                        <button
                          onClick={() => alert("Generando archivo DOCX con estilos notariales...")}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3 h-3" /> Descargar DOCX
                        </button>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl border text-xs leading-relaxed max-h-[460px] overflow-y-auto whitespace-pre-wrap font-mono ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}>
                      {documentoEnsamblado}
                    </div>

                    <div className={`text-[11px] flex justify-between px-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      <span>✓ Numeración y formato del despacho preservados</span>
                      <span className="font-semibold text-emerald-500">100% Estándar Notarial</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ASISTENTE 3: AUDITOR DE CONTRAPARTES (REDLINER)                   */}
          {/* ================================================================= */}
          {activeTab === 'asistente_redliner' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Scale className="w-5 h-5 text-purple-400" /> Auditor de Contrapartes (Redliner)
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Detección de cláusulas de riesgo en contratos externos y texto alternativo con precedentes.
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-red-500/10 text-red-400 border border-red-500/30">
                  Auditoría de 50 Páginas
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 space-y-3">
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <label className={`text-[11px] font-semibold block ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                      Contrato de la contraparte a auditar:
                    </label>
                    <textarea
                      rows={9}
                      value={textoContraparteRedline}
                      onChange={(e) => setTextoContraparteRedline(e.target.value)}
                      className={`w-full p-3 rounded-xl border text-xs font-mono focus:outline-none leading-relaxed ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-purple-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'
                      }`}
                      placeholder="Texto del contrato de la contraparte..."
                    />

                    <button
                      onClick={ejecutarAuditoriaRedliner}
                      disabled={cargandoRedliner}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      {cargandoRedliner ? "Auditando riesgos..." : "Auditar Contraparte y Redlines"}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  {resultadoRedliner && (
                    <div className={`p-4 rounded-2xl border space-y-3.5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800/40">
                        <span className="text-xs font-bold uppercase tracking-wider">Dictamen de Riesgo</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                          Score: {resultadoRedliner.score_cumplimiento} / 100 • {resultadoRedliner.nivel_riesgo}
                        </span>
                      </div>

                      <div className="space-y-2.5 max-h-[460px] overflow-y-auto pr-1">
                        {resultadoRedliner.hallazgos.map((h: any, i: number) => (
                          <div key={i} className={`p-3 rounded-xl border space-y-2 text-xs ${
                            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}>
                            <div className="font-bold text-sm text-red-400 flex items-center justify-between">
                              <span>{h.clausula}</span>
                              <span className="text-[10px] font-normal text-slate-400">{h.motivo}</span>
                            </div>
                            <div className="p-2 rounded bg-red-950/20 border border-red-500/20 text-red-300 line-through text-[11px]">
                              {h.texto_original}
                            </div>
                            <div className="p-2 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-[11px]">
                              <strong>Redline Propuesto:</strong> {h.redline_propuesto}
                            </div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => alert("Redlines copiados al portapapeles.")}
                        className={`w-full py-2 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${
                          isDark ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Copy className="w-3.5 h-3.5 text-purple-400" /> Copiar Redlines para Responder
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ASISTENTE 4: EL TRADUCTOR ESTRATÉGICO                             */}
          {/* ================================================================= */}
          {activeTab === 'asistente_traductor' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-blue-400" /> Traductor Estratégico (LegalTech)
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Traducción de requerimientos normativos en tickets de desarrollo Jira/Linear y manuales claros.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-5 space-y-3">
                  <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="flex gap-1.5 p-1 rounded-lg border bg-slate-950/30 text-xs font-mono">
                      {(['tecnologia', 'finanzas', 'rrhh'] as const).map(a => (
                        <button
                          key={a}
                          onClick={() => setAreaTraduccion(a)}
                          className={`flex-1 py-1 rounded capitalize transition-all ${
                            areaTraduccion === a 
                              ? isDark ? 'bg-blue-500/20 text-blue-300 font-bold' : 'bg-blue-100 text-blue-700 font-bold'
                              : isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {a === 'tecnologia' ? '💻 IT' : a === 'finanzas' ? '💳 Finanzas' : '👥 RRHH'}
                        </button>
                      ))}
                    </div>

                    <textarea
                      rows={8}
                      value={inputRequerimientoLegal}
                      onChange={(e) => setInputRequerimientoLegal(e.target.value)}
                      className={`w-full p-3 rounded-xl border text-xs font-mono focus:outline-none leading-relaxed ${
                        isDark ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-blue-500'
                      }`}
                      placeholder="Requerimiento legal o cláusula..."
                    />

                    <button
                      onClick={ejecutarTraduccionEstrategica}
                      disabled={cargandoTraductor}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {cargandoTraductor ? "Traduciendo..." : "Traducir a Requerimientos"}
                    </button>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-3">
                  {resultadoTraduccion && (
                    <div className={`p-4 rounded-2xl border space-y-3.5 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800/40">
                        <span className="text-xs font-bold uppercase tracking-wider">Tickets para Sprint ({resultadoTraduccion.area.toUpperCase()})</span>
                        <button
                          onClick={() => alert("Tickets exportados a formato JSON/Markdown.")}
                          className="px-2.5 py-1 rounded-lg bg-blue-500 hover:bg-blue-400 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3 h-3" /> Exportar
                        </button>
                      </div>

                      <div className="space-y-2.5">
                        {resultadoTraduccion.tickets.map((t: any) => (
                          <div key={t.id} className={`p-3 rounded-xl border space-y-1.5 text-xs ${
                            isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}>
                            <div className="flex justify-between items-center font-bold">
                              <span className="text-blue-400">[{t.id}] {t.titulo}</span>
                              <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 text-[10px]">{t.prioridad}</span>
                            </div>
                            <p className={`text-[11px] ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{t.user_story}</p>
                            <div className="text-[10px] text-slate-400">
                              Criterios: {t.criterios?.join(" • ")}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className={`p-2.5 rounded-xl border text-[11px] ${
                        isDark ? 'bg-blue-950/20 border-blue-500/20 text-slate-300' : 'bg-blue-50 border-blue-200 text-slate-700'
                      }`}>
                        <strong>Manual para empleados:</strong> {resultadoTraduccion.manual}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ASISTENTE 5: PRÁCTICA Y FINOPS                                    */}
          {/* ================================================================= */}
          {activeTab === 'asistente_finops' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-amber-400" /> Práctica y FinOps
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control de rentabilidad por asunto, horas presupuestadas y cruce de vencimientos procesales.
                  </p>
                </div>
              </div>

              {/* Métricas Resumidas */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className={`text-[10px] uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Horas Dedicadas</div>
                  <div className="text-lg font-bold mt-0.5">120h <span className="text-xs font-normal text-slate-400">/ 125h</span></div>
                  <div className="text-[10px] text-emerald-400 mt-0.5">96% Presupuesto</div>
                </div>
                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className={`text-[10px] uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Tarifa Media</div>
                  <div className="text-lg font-bold text-cyan-400 mt-0.5">148 USD/h</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Rentabilidad óptima</div>
                </div>
                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className={`text-[10px] uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Facturación Mes</div>
                  <div className="text-lg font-bold text-emerald-400 mt-0.5">19.950 USD</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Cartera activa</div>
                </div>
                <div className={`p-3.5 rounded-2xl border ${isDark ? 'bg-slate-900 border-red-500/30' : 'bg-white border-red-200 shadow-sm'}`}>
                  <div className="text-[10px] uppercase text-red-400 font-bold">Por Cobrar</div>
                  <div className="text-lg font-bold text-red-400 mt-0.5">6.750 USD</div>
                  <div className="text-[10px] text-red-400/80 mt-0.5">1 factura vencida</div>
                </div>
              </div>

              {/* Tabla de Asuntos */}
              <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                <div className="flex justify-between items-center pb-2 border-b border-slate-800/40 text-xs font-bold">
                  <span>Asuntos y Vencimientos Críticos</span>
                  <span className="text-[10px] text-red-400 font-normal">Plazos conminatorios destacados</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className={`border-b text-[11px] ${isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                        <th className="pb-2">Cliente / Asunto</th>
                        <th className="pb-2">Horas</th>
                        <th className="pb-2">Facturado</th>
                        <th className="pb-2">Cobro</th>
                        <th className="pb-2">Plazo Crítico</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      {casosFinOps.map(c => (
                        <tr key={c.id} className="py-2.5">
                          <td className="py-2.5">
                            <div className="font-bold">{c.nombre}</div>
                            <div className={`text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{c.asunto}</div>
                          </td>
                          <td className="py-2.5 font-mono">{c.horas}</td>
                          <td className="py-2.5 text-cyan-400 font-mono">{c.facturacion}</td>
                          <td className="py-2.5">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              c.estado.includes('pendiente') ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                            }`}>
                              {c.estado}
                            </span>
                          </td>
                          <td className="py-2.5">
                            <span className={`text-[11px] font-medium ${c.urgente ? 'text-red-400 font-bold' : isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                              {c.plazo_critico}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* ASISTENTE 6: GRABACIÓN Y MINUTAS (WHISPER)                        */}
          {/* ================================================================= */}
          {activeTab === 'asistente_notetaker' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Mic className="w-5 h-5 text-pink-400" /> Grabación y Minutas (Whisper)
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Captura local de audio, transcripción On-Premise y action items transferibles con 1 clic al Kanban.
                  </p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono ${
                  isDark ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}>
                  Zero Egress Audio
                </span>
              </div>

              {/* Botón Central de Grabación y Subida */}
              <div className={`p-6 rounded-2xl border text-center space-y-4 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <div className="font-mono text-3xl font-extrabold tracking-widest">
                  {Math.floor(segundosGrabacion / 60).toString().padStart(2, '0')}:{(segundosGrabacion % 60).toString().padStart(2, '0')}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={toggleGrabacionAudio}
                    className={`px-5 py-3 rounded-2xl font-bold text-xs transition-all flex items-center gap-2.5 shadow-md cursor-pointer ${
                      grabandoAudio 
                        ? 'bg-red-500 text-white animate-pulse' 
                        : 'bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white'
                    }`}
                  >
                    {grabandoAudio ? <Square className="w-4 h-4 fill-white" /> : <Mic className="w-4 h-4" />}
                    <span>{grabandoAudio ? "Detener Grabación Local" : "Grabar Audio (Local)"}</span>
                  </button>

                  <label className={`px-4 py-3 rounded-2xl border font-bold text-xs transition-all flex items-center gap-2 cursor-pointer ${
                    isDark ? 'bg-slate-950 border-slate-800 hover:bg-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700 shadow-sm'
                  }`}>
                    <Upload className="w-4 h-4 text-pink-400" />
                    <span>Subir Archivo de Audio</span>
                    <input type="file" accept="audio/*" onChange={handleSubirArchivo} className="hidden" />
                  </label>
                </div>

                {archivoAudioNombre && (
                  <div className={`text-xs font-mono inline-block px-3 py-1 rounded-lg border ${
                    isDark ? 'bg-slate-950 border-slate-800 text-cyan-300' : 'bg-slate-50 border-slate-200 text-blue-700'
                  }`}>
                    Procesado: {archivoAudioNombre}
                  </div>
                )}

                {audioUrl && (
                  <div className="max-w-md mx-auto pt-1">
                    <audio controls src={audioUrl} className="w-full h-8" />
                  </div>
                )}

                {cargandoWhisper && (
                  <div className="text-xs text-pink-400 flex items-center justify-center gap-1.5 animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Transcribiendo con Whisper On-Premise...</span>
                  </div>
                )}
              </div>

              {/* Minuta Estructurada */}
              {minutaWhisper && (
                <div className={`p-5 rounded-2xl border space-y-4 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex justify-between items-start pb-2 border-b border-slate-800/40">
                    <div>
                      <h2 className="text-sm font-bold">{minutaWhisper.titulo}</h2>
                      <div className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {minutaWhisper.fecha} • {minutaWhisper.duracion}
                      </div>
                    </div>
                    <button
                      onClick={() => alert("Minuta copiada al portapapeles.")}
                      className={`px-2.5 py-1 rounded-lg border text-xs font-medium flex items-center gap-1 cursor-pointer transition-colors ${
                        isDark ? 'border-slate-800 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Copy className="w-3 h-3 text-pink-400" /> Copiar Minuta
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    {/* Acuerdos */}
                    <div className={`p-3 rounded-xl border space-y-2 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="font-bold text-emerald-400 flex items-center gap-1 text-[11px]">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 1. Acuerdos Clave
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        {minutaWhisper.acuerdos.map((a: string, i: number) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-400">✓</span>
                            <span>{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Items */}
                    <div className={`p-3 rounded-xl border space-y-2 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="font-bold text-cyan-400 flex items-center gap-1 text-[11px]">
                        <Layers className="w-3.5 h-3.5" /> 2. Action Items Kanban
                      </div>
                      <div className="space-y-2">
                        {minutaWhisper.action_items.map((item: any) => (
                          <div key={item.id} className={`p-2 rounded-lg border text-[11px] space-y-1 ${
                            isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                          }`}>
                            <div className="font-medium">{item.tarea}</div>
                            <div className={`text-[9px] flex justify-between ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                              <span>{item.responsable}</span>
                              <span>{item.plazo}</span>
                            </div>
                            <button
                              onClick={() => agregarItemAKanban(item)}
                              disabled={item.agregado}
                              className={`w-full py-1 rounded text-[10px] font-bold transition-all ${
                                item.agregado
                                  ? 'bg-emerald-500/20 text-emerald-400 cursor-default'
                                  : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer'
                              }`}
                            >
                              {item.agregado ? "Asignada ✓" : "Asignar a Kanban"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Puntos Abiertos */}
                    <div className={`p-3 rounded-xl border space-y-2 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="font-bold text-amber-400 flex items-center gap-1 text-[11px]">
                        <HelpCircle className="w-3.5 h-3.5" /> 3. Puntos Abiertos
                      </div>
                      <div className="space-y-1.5 text-[11px]">
                        {minutaWhisper.puntos_abiertos.map((p: string, i: number) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <span className="text-amber-400">?</span>
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================================= */}
          {/* VISTAS AUXILIARES (CAIO, ADUANA, ETC.)                             */}
          {/* ================================================================= */}
          {activeTab === 'caio' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1">
                <div>
                  <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                    <Cpu className="w-5 h-5 text-cyan-400" /> Torre de Control CAIO & Gobernanza
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Supervisión integral de Model Registry (EU AI Act) y ciberseguridad adversarial.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setReporteModal('trust')} className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-sm">
                    <Download className="w-3.5 h-3.5 inline mr-1" /> Trust Report Consejo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className={`p-3.5 rounded-2xl border border-l-4 border-l-emerald-400 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-[10px] text-slate-400 block uppercase">EU AI Act</span>
                  <div className="text-lg font-bold text-emerald-400">100% Conforme</div>
                </div>
                <div className={`p-3.5 rounded-2xl border border-l-4 border-l-cyan-400 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-[10px] text-slate-400 block uppercase">Sistemas Prod</span>
                  <div className="text-lg font-bold text-cyan-400">6 Asistentes</div>
                </div>
                <div className={`p-3.5 rounded-2xl border border-l-4 border-l-purple-400 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-[10px] text-slate-400 block uppercase">Alucinaciones</span>
                  <div className="text-lg font-bold text-purple-400">0.4%</div>
                </div>
                <div className={`p-3.5 rounded-2xl border border-l-4 border-l-amber-400 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <span className="text-[10px] text-slate-400 block uppercase">Shadow AI</span>
                  <div className="text-lg font-bold text-amber-400">0 Fugas</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'general_counsel' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-amber-400" /> Portal del General Counsel
              </h1>
              <div className={`p-6 rounded-2xl border text-xs ${isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'}`}>
                Alineación estratégica para dirección legal y ejecutiva con métricas y control de expedientes de PYMEs.
              </div>
            </div>
          )}

          {activeTab === 'aduana' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Shield className="w-5 h-5 text-emerald-400" /> [Paso 0] Aduana Zero-Trust & Anonimizador PII
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-xs font-bold block">Documento Original</span>
                  <textarea
                    rows={6}
                    value={textoAduana}
                    onChange={(e) => setTextoAduana(e.target.value)}
                    className={`w-full p-3 rounded-xl border text-xs font-mono focus:outline-none ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                  <button onClick={ejecutarAnonimizacion} disabled={cargandoAduana} className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs cursor-pointer">
                    {cargandoAduana ? "Sanitizando..." : "Sanitizar en Memoria Local"}
                  </button>
                </div>

                <div className={`p-4 rounded-2xl border space-y-3 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <span className="text-xs font-bold block">Salida Sanitizada</span>
                  {resultadoAduana ? (
                    <div className="space-y-2 text-xs font-mono">
                      <div className={`p-3 rounded-xl border max-h-36 overflow-y-auto text-emerald-400 ${
                        isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                      }`}>
                        {resultadoAduana.texto_anonimizado}
                      </div>
                      <div className="text-[11px] text-slate-400 pt-1 flex justify-between">
                        <span>Tokens ofuscados: <strong>{resultadoAduana.tokens_ofuscados}</strong></span>
                        <span className="text-cyan-400">Hash SHA-256 Verificado</span>
                      </div>
                    </div>
                  ) : (
                    <div className="h-36 flex items-center justify-center text-slate-400 text-xs">
                      Haz clic en sanitizar para ofuscar PII.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'due_diligence' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Layers className="w-5 h-5 text-cyan-400" /> Due Diligence & Data Room
              </h1>
              <div className={`p-6 rounded-2xl border text-xs ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                Entorno seguro para auditoría documental y análisis contractual de transacciones corporativas.
              </div>
            </div>
          )}

          {activeTab === 'boveda' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Lock className="w-5 h-5 text-blue-400" /> Bóveda Forense SHA-256
              </h1>
              <div className={`p-6 rounded-2xl border text-xs ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                Registro inmutable de hashes criptográficos para garantizar no repudio y custodia de documentos legales.
              </div>
            </div>
          )}

          {activeTab === 'canal_etico' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-400" /> Canal Ético (Ley 2/2023)
              </h1>
              <div className={`p-6 rounded-2xl border text-xs ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                Canal anónimo de denuncias corporativas conforme a directivas europeas de protección del informante.
              </div>
            </div>
          )}

          {activeTab === 'societario' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-400" /> Secretaría Societaria & Filiales
              </h1>
              <div className={`p-6 rounded-2xl border text-xs ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                Control y archivo de actas de asamblea, juntas directivas y poderes de representación legal.
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Modal Imprimible de Reportes */}
      {reporteModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl rounded-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto ${
            isDark ? 'bg-slate-900 text-slate-100 border border-slate-800' : 'bg-white text-slate-900 shadow-2xl'
          }`}>
            <div className="flex justify-between items-center pb-2 border-b border-slate-800/40">
              <h3 className="font-bold text-sm">Trust Report del Consejo de Administración</h3>
              <button onClick={() => setReporteModal(null)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Certificación de gobernanza de IA conforme al EU AI Act y RGPD. Todos los sistemas operan bajo arquitectura Zero-Trust.
            </p>
            <div className="pt-3 border-t border-slate-800/40 flex justify-end gap-2">
              <button onClick={() => window.print()} className="px-3.5 py-1.5 rounded-xl bg-slate-950 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm">
                <Printer className="w-3.5 h-3.5" /> Imprimir / PDF
              </button>
              <button onClick={() => setReporteModal(null)} className="px-3.5 py-1.5 rounded-xl border text-xs font-semibold">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
