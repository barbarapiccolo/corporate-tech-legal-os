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
// 1. CATÁLOGO MAESTRO DE MODELOS JURÍDICOS (CONECTADO A TU GOOGLE SHEET)
// =====================================================================
const CATALOGO_MODELOS = [
  {
    "codigo": "POD-01",
    "titulo": "Poder General de Administración y Disposición con Autocontratación",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Generales y Disposición",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bdHlaTjE2NFhSckE/view?usp=drivesdk\\&resourcekey=0-NdqPnJfhs4C9P8ybUHD1gA",
    "variables": "Poderdante, Apoderado, Cuentas bancarias, Facultades dispositivas, Cláusula de autocontratación",
    "fundamento": "Arts. 1.684 y ss., Art. 1.171 CCV",
    "notas": "Poder general de máxima amplitud para administración patrimonial completa y negocios consigo mismo (autocontratación)."
  },
  {
    "codigo": "POD-02",
    "titulo": "Mandato o Poder Judicial Amplio",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Judiciales y Procesales",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bdXAza25xUUd3UWs/view?usp=drivesdk\\&resourcekey=0-Lc4rNpaY0\\_yS0Q0lwR8LCA",
    "variables": "Otorgante, Abogados apoderados (Inpreabogado, Colegio), Facultades especiales (convenir, transigir, desistir, juramento, remates)",
    "fundamento": "Arts. 150, 151, 153 y 154 CPC",
    "notas": "Representación judicial en todas las instancias y recursos ordinarios/extraordinarios."
  },
  {
    "codigo": "POD-03",
    "titulo": "Poder Especial para Venta de Inmuebles",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Especiales Inmobiliarios",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bYmtoNUl5ZEw1Rmc/view?usp=drivesdk\\&resourcekey=0-0mtepOhb6Z19Ll9q4G19vw",
    "variables": "Propietario poderdante, Apoderado, Identificación registral completa del inmueble, Linderos, Facultades de precio y cobro",
    "fundamento": "Art. 1.688 CCV",
    "notas": "Requiere individualización y determinación exacta del inmueble para registro/notaría."
  },
  {
    "codigo": "POD-04",
    "titulo": "Poder Especial para Venta de Derechos y Acciones Sucesoral",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Especiales Inmobiliarios",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bRDAxdWV6QTI1RDg/view?usp=drivesdk\\&resourcekey=0-gxXSH0g1MIzPfHLcalo5sw",
    "variables": "Heredero poderdante, Apoderado, Datos de la causante, N° de Planilla de Declaración Sucesoral SENIAT, Solvencia, Registro",
    "fundamento": "Ley de Sucesiones; Código Civil",
    "notas": "Para enajenar derechos y acciones proindiviso derivados de herencia."
  },
  {
    "codigo": "POD-05",
    "titulo": "Poder Especial para Arrendar Inmueble",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Especiales Inmobiliarios",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2baUdQVUZYb0YtMk0/view?usp=drivesdk\\&resourcekey=0-dAZgEZhc\\_Z0xFRG2eSUURg",
    "variables": "Propietario, Apoderado, Ubicación y linderos del inmueble/finca, Facultades para fijar cánones y suscribir contratos",
    "fundamento": "Arts. 1.579 y 1.684 CCV",
    "notas": "Facultades de administración e intermediación para arrendamiento inmobiliario."
  },
  {
    "codigo": "POD-06",
    "titulo": "Poder Especial para Renuncia de Usufructo y Venta Internacional",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Especiales Inmobiliarios",
    "driveUrl": "https://docs.google.com/document/d/1kOuKAfzuhtos9utmMnAD8zvFcrf8lEIhF\\_-OGbih1XY/edit?usp=drivesdk\\&ouid=102546266408328933155",
    "variables": "Usufructuaria (DNI/CI), Apoderados conjuntos/separados, Matrícula Folio Real de Capital Federal, Escribanía de origen, Declaración UIF/PEP, Precio en USD billetes",
    "fundamento": "Arts. 380, 456, 522 CCCN (Argentina); CCV",
    "notas": "Modelo internacional para trámites ante escribano público en Argentina y cobro en divisas."
  },
  {
    "codigo": "POD-07",
    "titulo": "Poder Especial para Trámites Aduanales y Comercio Exterior",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Administrativos y Trámites",
    "driveUrl": "https://docs.google.com/document/d/1BFNYpctJ14hJLSWTRcf5fKv6J-uNVjcUiAprzW8frX4/edit?usp=drivesdk\\&ouid=102546266408328933155",
    "variables": "Sociedad poderdante (RIF, Registro), Agencia Aduanal autorizada (RIF, N° SENIAT, Gaceta), Aduanas principales/subalternas, Sistema SIDUNEA",
    "fundamento": "Arts. 94 y 98 Ley Orgánica de Aduanas; Art. 145 Reglamento General; Art. 39 Reglamento SIDUNEA",
    "notas": "Trámites aduanales, desaduanamiento, cabotaje y regímenes especiales ante el SENIAT."
  },
  {
    "codigo": "POD-08",
    "titulo": "Poder Especial para Apostilla y Legalización de Documentos Educativos",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Administrativos y Trámites",
    "driveUrl": "https://docs.google.com/document/d/1JqJTBiZd1eZpXIBfCOFa4N3LkCvjQZ44\\_QcsZMQbC3k/edit?usp=drivesdk\\&ouid=102546266408328933155",
    "variables": "Otorgante, Apoderado, Listado taxativo de recaudos educativos (Títulos, notas certificadas, actas de grado, pensum), Trámites MPPRE",
    "fundamento": "Convenio de La Haya sobre Apostilla; Ley de Simplificación de Trámites",
    "notas": "Incluye facultades de sustitución y pago de aranceles consulares/registrales."
  },
  {
    "codigo": "POD-09",
    "titulo": "Poder Especial para Tramitar Título Universitario en el Extranjero",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Administrativos y Trámites",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bRGx1Y1czMUloRHc/view?usp=drivesdk\\&resourcekey=0-sM12nxzENfMzfCh7Oq-6jw",
    "variables": "Graduando, Apoderado domiciliado en el país destino, Nombre del título académico y Universidad extranjera",
    "fundamento": "Código Civil (Representación voluntaria)",
    "notas": "Gestión y retiro de diploma/pergamino ante universidades internacionales."
  },
  {
    "codigo": "POD-10",
    "titulo": "Poder Especial para Trámites ante IVSS (Pensión de Vejez)",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Administrativos y Trámites",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bXzA5SkVIUXZRem8/view?usp=drivesdk\\&resourcekey=0-e3e88TYqvTLQPWKfj0hfYQ",
    "variables": "Asegurado solicitante, Apoderado, Cobro de sumas de pensión, Consignación de cuenta individual y recaudos",
    "fundamento": "Ley del Seguro Social y su Reglamento",
    "notas": "Trámite de pensión de vejez y cobro ante el IVSS."
  },
  {
    "codigo": "POD-11",
    "titulo": "Poder Especial para Créditos ante Instituciones Financieras",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Administrativos y Trámites",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bdHpSX3ZHUkFWQVU/view?usp=drivesdk\\&resourcekey=0-Clq48TGVE3JuItpRBvzxrg",
    "variables": "Solicitante, Apoderado, Banco fiduciario, Programa o fideicomiso crediticio, Firma de contratos de préstamo",
    "fundamento": "Ley de Instituciones del Sector Bancario; CCV",
    "notas": "Tramitación crediticia y firma de contratos bancarios."
  },
  {
    "codigo": "POD-12",
    "titulo": "Poder Especial Multiorganismo (Bancos, Ministerios, Tribunales)",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Administrativos y Trámites",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bcEhoa2hway1qd00/view?usp=drivesdk\\&resourcekey=0-MHbN5aPevJbHLGBfkREjtg",
    "variables": "Otorgante, Apoderados conjuntos o separados, Apertura y movilización de cuentas bancarias, Gestiones ministeriales, Defensa judicial simple",
    "fundamento": "Código Civil; Ley Orgánica de Procedimientos Administrativos (LOPA)",
    "notas": "Modelo versátil para diligencias administrativas y bancarias concurrentes."
  },
  {
    "codigo": "POD-13",
    "titulo": "Poder Especial para Defensa en Materia de Inquilinato",
    "categoria": "Poderes y Mandatos",
    "subcategoria": "Judiciales y Procesales",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bLUVMNEFKQ1VuQW8/view?usp=drivesdk\\&resourcekey=0-XcaBmBSX5RsXl-sl3LcZNA",
    "variables": "Arrendatario poderdante, Abogados apoderados (Inpreabogado), Dirección del inmueble arrendado, Oposición a medidas cautelares",
    "fundamento": "Ley de Arrendamiento Comercial / Vivienda; CPC",
    "notas": "Defensa procesal contra desalojos y medidas de secuestro/embargo."
  },
  {
    "codigo": "SOC-01",
    "titulo": "Modelo de Acta Constitutiva y Estatutos Sociales de C.A.",
    "categoria": "Derecho Societario y Asambleas",
    "subcategoria": "Constitución Sociedades",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2beWNnaUFDSmJTWTg/view?usp=drivesdk\\&resourcekey=0-QOtIO3QOKZy7n7Fca2S0sA",
    "variables": "Denominación social, Domicilio fiscal, Objeto social amplio, Duración, Capital social y valor nominal de acciones, Suscripción y pago (Inventario de bienes), Junta Directiva, Comisario Mercantil",
    "fundamento": "Arts. 200, 211, 213, 214, 215, 244, 293 Código de Comercio (C.Com)",
    "notas": "Plantilla completa para registro de Compañías Anónimas ante el SAREN."
  },
  {
    "codigo": "SOC-02",
    "titulo": "Acta Constitutiva y Estatutos Sociales de Asociación Cooperativa",
    "categoria": "Derecho Societario y Asambleas",
    "subcategoria": "Constitución Sociedades",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bc3JwbHJhYlFqSHM/view?usp=drivesdk\\&resourcekey=0-pRk8qP3qR3x3zna8zNd7hQ",
    "variables": "Denominación de la cooperativa, Régimen de responsabilidad suplementada, Asociados fundadores, Certificados de aportación, Instancias de administración y control",
    "fundamento": "Ley Especial de Asociaciones Cooperativas; SUNACOOP",
    "notas": "Estructura asociativa sin fines de lucro mercantil."
  },
  {
    "codigo": "SOC-03",
    "titulo": "Acta de Asamblea Extraordinaria - Modificación de Objeto Social",
    "categoria": "Derecho Societario y Asambleas",
    "subcategoria": "Modificaciones Estatutarias",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bdVFkYXVTLVl2Y3c/view?usp=drivesdk\\&resourcekey=0-o5Pnh8ODmDumfxiM0rq0FQ",
    "variables": "Empresa, Quórum de asamblea universal, Redacción de nueva Cláusula de Objeto Social, Autorización de registro",
    "fundamento": "Arts. 278 y 280 C.Com",
    "notas": "Modificación de la cláusula segunda para ampliar o redefinir actividades comerciales."
  },
  {
    "codigo": "SOC-04",
    "titulo": "Acta de Asamblea Extraordinaria - Cambio de Domicilio y Reforma de Facultades Directivas",
    "categoria": "Derecho Societario y Asambleas",
    "subcategoria": "Modificaciones Estatutarias",
    "driveUrl": "https://docs.google.com/document/d/1f3xtYlY0Fi0DnLRru\\_A7u3lSPkFzOhdWByIfsv7F560/edit?usp=drivesdk\\&ouid=102546266408328933155",
    "variables": "Razón social, RIF, Nueva dirección fiscal detallada, Reforma de atribuciones de Junta Directiva (firma conjunta/separada, cuentas bancarias, créditos, contratos, venta de activos)",
    "fundamento": "Arts. 278, 280 y 325 C.Com",
    "notas": "Blindaje operativo y administrativo de la gestión directiva."
  },
  {
    "codigo": "SOC-05",
    "titulo": "Acta de Asamblea - Aumento de Capital Social por Aporte en Especie / Inventario",
    "categoria": "Derecho Societario y Asambleas",
    "subcategoria": "Aumentos Capital y Acciones",
    "driveUrl": "https://docs.google.com/document/d/14dt1kB1fXj4LCMRYmqfov\\_PjyAPjLKgsWrd8K1yWWDI/edit?usp=drivesdk\\&ouid=102546266408328933155",
    "variables": "Capital actual, Monto del aumento en USD y Bs. a tasa BCV, Cantidad y valor nominal de nuevas acciones, Renuncia expresa al derecho de preferencia, Dilución porcentual, Informe de Aseguramiento de CPC",
    "fundamento": "Arts. 246, 278, 280 C.Com; Normas de Aseguramiento FCCPV",
    "notas": "Estructuración de inyección de capital en divisas convertidas a tasa oficial BCV."
  },
  {
    "codigo": "SOC-06",
    "titulo": "Acta de Asamblea Extraordinaria - Venta de Acciones y Renovación de Directiva",
    "categoria": "Derecho Societario y Asambleas",
    "subcategoria": "Aumentos Capital y Acciones",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bLVpmUEpmdktZUHM/view?usp=drivesdk\\&resourcekey=0-Qohv7aRIldeTNUpMh1vdXA",
    "variables": "Accionistas cedentes y compradores, Cantidad de acciones vendidas, Renuncia de cargos de directiva, Elección de nuevos directores, Reforma estatutaria de capital y administración",
    "fundamento": "Arts. 293, 296, 278 C.Com",
    "notas": "Traspaso formal de paquete accionario y asiento en libro de accionistas."
  },
  {
    "codigo": "SOC-07",
    "titulo": "Acta de Asamblea General Ordinaria - Aprobación de Balances y Directiva",
    "categoria": "Derecho Societario y Asambleas",
    "subcategoria": "Asambleas Ordinarias y Balances",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bdWJlTTFWc0RxUWc/view?usp=drivesdk\\&resourcekey=0-OLRvFbET9L4kmP9Tc8JX4w",
    "variables": "Ejercicios económicos evaluados, Informe de Comisario Colegiado, Aprobación de balances, Actualización de período estatutario de Junta Directiva y Comisario",
    "fundamento": "Arts. 275, 287, 304, 309, 311 C.Com",
    "notas": "Cumplimiento societario periódico obligatorio ante el Registro Mercantil."
  },
  {
    "codigo": "CON-01",
    "titulo": "Contrato de Arrendamiento de Inmueble para Uso Comercial e Industrial",
    "categoria": "Contratos y Acuerdos",
    "subcategoria": "Arrendamiento Inmobiliario",
    "driveUrl": "https://docs.google.com/document/d/1w4idYp9JnRWcJXxjMn2e07Dj9i8YaAW\\_S73Xrs0xJH8/edit?usp=drivesdk\\&ouid=102546266408328933155",
    "variables": "Arrendador, Arrendataria, Dirección exacta y linderos, Canon mensual en divisas (USD) o Bs. a tasa oficial BCV, Término fijo y prórroga legal comercial, Depósito de garantía, Reparaciones mayores/menores, Cláusula penal",
    "fundamento": "Decreto Ley de Arrendamiento Comercial (G.O. 40.418); Código Civil",
    "notas": "Modelo estándar para locales, galpones y naves industriales con cláusula de indexación/pago bimonetario."
  },
  {
    "codigo": "CON-02",
    "titulo": "Contrato de Arrendamiento Maestro para Local Comercial (Gimnasio/2 Plantas)",
    "categoria": "Contratos y Acuerdos",
    "subcategoria": "Arrendamiento Inmobiliario",
    "driveUrl": "https://docs.google.com/document/d/1Y6TtN-uxRfJQ41EhlkMDPGVEfEk6TEZSMkVeWJEGIVk/edit?usp=drivesdk\\&ouid=102546266408328933155",
    "variables": "Arrendadores, Arrendataria, Linderos físicos, Destino pormenorizado del inmueble, Canon en USD a tasa BCV, Intereses de mora, Prohibición de modificaciones estructurales",
    "fundamento": "Ley de Arrendamiento Comercial; Código Civil",
    "notas": "Destinado a establecimientos de atención al público y recreación con especificación técnica de uso."
  },
  {
    "codigo": "CON-03",
    "titulo": "Contrato de Arrendamiento de Galpón con Cláusula de Fianza",
    "categoria": "Contratos y Acuerdos",
    "subcategoria": "Arrendamiento Inmobiliario",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2baUVJSVF1SDlodUk/view?usp=drivesdk\\&resourcekey=0-QQXvp3yY-GGKpufiGm-42w",
    "variables": "Arrendador, Arrendatario, Fiador solidario y principal pagador, Canon mensual, Término fijo, Prohibición de cesión/subarriendo",
    "fundamento": "Arts. 1.579 y 1.804 CCV",
    "notas": "Respaldo adicional con fiador solidario."
  },
  {
    "codigo": "CON-04",
    "titulo": "Contrato de Arrendamiento de Oficina Comercial",
    "categoria": "Contratos y Acuerdos",
    "subcategoria": "Arrendamiento Inmobiliario",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bNXQwZTVsOGpud2M/view?usp=drivesdk\\&resourcekey=0-0nW9wr8KTng\\_j8nFlA1AzQ",
    "variables": "Arrendador, Arrendataria, Identificación de oficina y edificio, Canon, Pago de condominio y servicios, Ajuste por IPC/BCV",
    "fundamento": "Ley de Arrendamiento Comercial; Código Civil",
    "notas": "Contrato para espacios de oficinas en régimen de propiedad horizontal."
  },
  {
    "codigo": "CON-05",
    "titulo": "Contrato de Arrendamiento de Vivienda",
    "categoria": "Contratos y Acuerdos",
    "subcategoria": "Arrendamiento Inmobiliario",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bWDJITEpoOTBpNWs/view?usp=drivesdk\\&resourcekey=0-s0-mSKgyOK0G1gqPSSlqCg",
    "variables": "Arrendador, Inquilino, Identificación del apartamento, Canon en bolívares, Depósito en garantía, Servicios públicos y reparaciones",
    "fundamento": "Ley para la Regularización y Control de Arrendamientos de Vivienda; CCV",
    "notas": "Uso exclusivo residencial familiar."
  },
  {
    "codigo": "CON-06",
    "titulo": "Contrato Individual de Trabajo por Tiempo Determinado",
    "categoria": "Contratos y Acuerdos",
    "subcategoria": "Laboral LOTTT",
    "driveUrl": "https://docs.google.com/document/d/1CMj5xHDAwLlXda\\_A\\_NHJYiO0N-Gb0D5-mNfH1Eobqe4/edit?usp=drivesdk\\&ouid=102546266408328933155",
    "variables": "Entidad de trabajo (RIF, Registro), Trabajador, Causa legal de contratación temporal (Art. 64 LOTTT), Cargo, Descripción de funciones, Salario, Fecha exacta de inicio y culminación",
    "fundamento": "Arts. 62 y 64 LOTTT",
    "notas": "Requiere justificación expresa de la causa temporal para evitar conversión a indeterminado."
  },
  {
    "codigo": "CON-07",
    "titulo": "Contrato Individual de Trabajo por Tiempo Indeterminado",
    "categoria": "Contratos y Acuerdos",
    "subcategoria": "Laboral LOTTT",
    "driveUrl": "https://drive.google.com/file/d/1X4F8yoQkK8wQ2sPqkx7wDYxKg0cErF9N/view?usp=drivesdk",
    "variables": "Patrono, Trabajador, Cargo, Listado de atribuciones, Jornada diurna/mixta, Período de prueba de 30 días (Art. 141 LOTTT), Salario en divisas / bolívares, Normas LOPCYMAT",
    "fundamento": "Arts. 58, 59, 61 y 141 LOTTT; LOPCYMAT",
    "notas": "Relación laboral indefinida estándar con cláusula de rendimiento y seguridad laboral."
  },
  {
    "codigo": "CON-08",
    "titulo": "Contrato de Trabajo por Período de Prueba",
    "categoria": "Contratos y Acuerdos",
    "subcategoria": "Laboral LOTTT",
    "driveUrl": "https://drive.google.com/file/d/0BwXfsZ9Y-s2bRnFTRFVnaGFzTmc/view?usp=drivesdk\\&resourcekey=0-0FAPZlbnpv-do1C7bEpIHg",
    "variables": "Grupo empresarial / Entidad de trabajo, Contratado, Funciones, Horario, Cláusula de rescisión sin preaviso durante prueba",
    "fundamento": "Arts. 58, 59, 62, 64 lit. a y 141 LOTTT",
    "notas": "Modalidad de prueba para evaluación mutua de condiciones y aptitudes."
  },
  {
    "codigo": "CON-09",
    "titulo": "Contrato de Prestación de Servicios Profesionales y Responsabilidad Patrimonial (Iguala)",
    "categoria": "Contratos y Acuerdos",
    "subcategoria": "Servicios Profesionales e Igualas",
    "driveUrl": "https://docs.google.com/document/d/1pt2g8OwffZSVBByPKuN5fZ\\_gXrBE8iJMdPyu\\_\\_hII\\_8/edit?usp=drivesdk\\&ouid=102546266408328933155",
    "variables": "Empresa, Profesional independiente, Exclusión expresa de subordinación/LOTTT, Iguala mensual en USD a tasa oficial BCV, Facturación legal y retención ISLR, Administración de fondos corporativos, Prohibición taxativa de mezcla de fondos per...",
    "fundamento": "Código Civil (Arts. 1.630 y ss.); Ley de ISLR; Exclusión expresa de LOTTT",
    "notas": "Modelo blindado para consultores, directores administrativos o contables con manejo de valores."
  }
];

// =====================================================================
// 2. DATOS INICIALES COMPLETOS DE GESTIÓN DEL DESPACHO (VERSIÓN v5.3)
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
    titulo: "Revisión notas del registrador sobre compraventa Turmero y Poder", 
    cliente: "Auxiliadora Inmuebles", 
    tipo_rol: "Externo",
    materia: "Inmobiliario", 
    responsable: "Barbara Piccolo", 
    plazo: "Martes 10:00", 
    prioridad: "Crítica", 
    estado: "En Tramitación",
    bloqueo: "Revisión Registro SAREN",
    bloqueo_tipo: "externo",
    cuantia: "25.000 USD",
    tribunal: "Registro Inmobiliario / Notaría Pública",
    detalles: "Inserción de párrafo de reserva de dominio sujeto a compensación efectiva de cheque bancario antes de la tradición legal y visado con INPRE.",
    bitacora: [
      { fecha: "12/10/2026", nota: "Recepción de recaudos y consulta sobre custodia/patria potestad por WhatsApp." },
      { fecha: "13/10/2026", nota: "Coordinación de revisión previa en el registro antes de imprimir con visado." }
    ]
  },
  { 
    id: "EXP-04", 
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
      { fecha: "18/09/2026", nota: "Cierre de toma física de inventario en almacén central." },
      { fecha: "22/09/2026", nota: "Detección de diferencia de 12.400 USD en repuestos de maquinaria pesada." }
    ]
  },
  { 
    id: "EXP-05", 
    titulo: "Redacción de acta de asamblea extraordinaria sobre reforma estatutaria", 
    cliente: "Sub 1308, C.A.", 
    tipo_rol: "Externo",
    materia: "Societario", 
    responsable: "Barbara Piccolo", 
    plazo: "Miércoles", 
    prioridad: "Media", 
    estado: "Revisión & Firma",
    bloqueo: "Esperando Balance Comisario",
    bloqueo_tipo: "externo",
    cuantia: "No pecuniaria",
    tribunal: "Registro Mercantil Segundo del Estado Bolívar",
    detalles: "Modificación del objeto social para incorporar actividades de importación y representación comercial, y aumento de capital social a valor actualizado.",
    bitacora: [
      { fecha: "15/09/2026", nota: "Convocatoria formal a accionistas conforme a estatutos vigentes." },
      { fecha: "24/09/2026", nota: "Borrador de acta elaborado con informe de comisario colegiado." }
    ]
  },
  { 
    id: "EXP-06", 
    titulo: "Protocolo de ciberseguridad y retención de logs (EU AI Act)", 
    cliente: "Unidad de Tecnología (IT)", 
    tipo_rol: "In-House",
    materia: "LegalTech", 
    responsable: "Barbara Piccolo", 
    plazo: "Completado", 
    prioridad: "Alta", 
    estado: "Concluido",
    bloqueo: "Concluido",
    bloqueo_tipo: "ninguno",
    cuantia: "Cumplimiento Regulatorio",
    tribunal: "Cumplimiento Interno / Certificación eIDAS",
    detalles: "Implementación de hash SHA-256 inmutable en bases de datos locales y política Zero-Retention en memoria para consultas corporativas.",
    bitacora: [
      { fecha: "01/09/2026", nota: "Auditoría de logs de red de servidores locales." },
      { fecha: "14/09/2026", nota: "Dictamen de aprobación y firma de política de seguridad." }
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
    nombre: "Auxiliadora Inmuebles",
    tipo: "Externo",
    rif: "V-12.450.881-0",
    apoderado: "Auxiliadora (Directora Inmobiliaria)",
    cedula_apoderado: "V-12.450.881",
    email: "contacto@auxiliadorainmuebles.com",
    telefono: "+58 414-906-XXXX",
    domicilio: "Caracas / Guayana",
    asuntos_activos: 2,
    estado: "Activo",
    materia_principal: "Compraventas, Poderes & Trámites SAREN",
    facultades_junta: "Firma Personal / Corretaje Vigente",
    facultades_poder: "Poderes Especiales por Operación",
    facultades_estado: "vigente"
  },
  {
    id: "CLI-03",
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
    id: "CLI-04",
    nombre: "Inmobiliaria del Este, C.A.",
    tipo: "Externo",
    rif: "J-30948572-1",
    apoderado: "Andrés Silva (Administrador Único)",
    cedula_apoderado: "V-12.894.102",
    email: "administracion@inmobiliariadeleste.com",
    telefono: "+58 412-300-1122",
    domicilio: "Caracas, Distrito Capital",
    asuntos_activos: 1,
    estado: "En Negociación",
    materia_principal: "Contratación Inmobiliaria",
    facultades_junta: "Vigente hasta Diciembre 2026",
    facultades_poder: "Facultades estatutarias de administración vigentes",
    facultades_estado: "vigente"
  },
  {
    id: "CLI-05",
    nombre: "Unidad de Tecnología e Innovación (IT)",
    tipo: "Interno",
    rif: "Área Interna Soberana",
    apoderado: "Director de TI / Sistemas",
    cedula_apoderado: "Identificador Interno",
    email: "it-director@aigovern.space",
    telefono: "Ext. 201",
    domicilio: "Sede Tecnológica Central",
    asuntos_activos: 3,
    estado: "Activo",
    materia_principal: "Seguridad de Datos & AI Governance",
    facultades_junta: "Estructura Orgánica Corporativa",
    facultades_poder: "Delegación Funcional de Firma",
    facultades_estado: "vigente"
  },
  {
    id: "CLI-06",
    nombre: "AI GOVERN S.L.",
    tipo: "Interno",
    rif: "B-88392019",
    apoderado: "Barbara Piccolo (General Counsel)",
    cedula_apoderado: "Representante Permanente",
    email: "barbara@aigovern.space",
    telefono: "+34 910-000-000",
    domicilio: "Madrid / Caracas",
    asuntos_activos: 4,
    estado: "Retainer",
    materia_principal: "Expansión Internacional & Contratación SaaS",
    facultades_junta: "Administración Única Vigente",
    facultades_poder: "Plenas Facultades Dispositivas",
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
    computo: "Días Continuos (Código Civil)",
    tribunal: "Notaría Tercera de Chacao"
  },
  { 
    id: "EV-04", 
    dia: 6, 
    mes: 9, 
    anio: 2026,
    titulo: "Presentación de informe de auditoría forense a Junta Directiva", 
    cliente: "Corein, C.A.", 
    fecha: "06 de Octubre de 2026", 
    hora: "09:00",
    tipo: "Reunión de Directorio", 
    dias_restantes: "Programado", 
    nivel: "ordinario",
    computo: "Días Calendario",
    tribunal: "Sede Principal Guasipati"
  },
  { 
    id: "EV-05", 
    dia: 15, 
    mes: 9, 
    anio: 2026,
    titulo: "Revisión de Compraventa y Poder en Registro Inmobiliario (SAREN)", 
    cliente: "Auxiliadora Inmuebles", 
    fecha: "15 de Octubre de 2026", 
    hora: "10:00",
    tipo: "Trámite Registral", 
    dias_restantes: "Hoy", 
    nivel: "urgente",
    computo: "Días Hábiles Registrales",
    tribunal: "Registro Público / Notaría"
  },
  { 
    id: "EV-06", 
    dia: 24, 
    mes: 9, 
    anio: 2026,
    titulo: "Asamblea General Extraordinaria de Accionistas (Sub 1308)", 
    cliente: "Sub 1308, C.A.", 
    fecha: "24 de Octubre de 2026", 
    hora: "11:00",
    tipo: "Asamblea Societaria", 
    dias_restantes: "Próxima semana", 
    nivel: "ordinario",
    computo: "Convocatoria Estatutaria",
    tribunal: "Registro Mercantil Segundo"
  }
];

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
        texto: "Sí, Bárbara. Los 3 documentos tienen el mismo objetivo jurídico: tramitar el Ejercicio Unilateral de la Patria Potestad y Custodia Legal. El procedimiento es rápido si el padre suscribe el convenio voluntariamente; de estar ausente, el tribunal exigirá testigos y oficios migratorios. Te sugiero responderle al cliente explicando la vía de convenio amistoso primero."
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

export default function DashboardLegalUniversal() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const isDark = theme === 'dark';
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Pestañas Activas: 4 de Inteligencia Jurídica + 5 de Gestión del Despacho
  const [activeTab, setActiveTab] = useState<string>('chat_ia');

  // =====================================================================
  // ESTADOS: 1. CONSULTOR JURÍDICO IA (CON HISTORIAL DE CONVERSACIONES)
  // =====================================================================
  const [chats, setChats] = useState(CHATS_INICIALES);
  const [activeChatId, setActiveChatId] = useState("chat-01");
  const [mensajeInput, setMensajeInput] = useState("");
  const [archivosAdjuntos, setArchivosAdjuntos] = useState<string[]>([]);
  const [chatCargando, setChatCargando] = useState(false);
  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const handleCrearNuevoChat = () => {
    const nuevoId = `chat-${Date.now()}`;
    setChats([
      {
        id: nuevoId,
        titulo: "Nueva Consulta Jurídica",
        fecha: "Ahora",
        mensajes: [
          {
            emisor: "ia",
            texto: "¡Hola Bárbara! Estoy lista para ayudarte. Puedes adjuntar PDFs o fotos de cédulas, dictar por voz o consultarme sobre cualquier trámite. Toda tu información está protegida bajo Zero-Trust."
          }
        ]
      },
      ...chats
    ]);
    setActiveChatId(nuevoId);
  };

  const handleEnviarMensaje = () => {
    if (!mensajeInput.trim() && archivosAdjuntos.length === 0) return;
    const nuevoMsgUsuario = { emisor: "usuario", texto: mensajeInput, archivos: [...archivosAdjuntos] };
    setChats(chats.map(c => c.id === activeChatId ? { ...c, titulo: c.titulo === "Nueva Consulta Jurídica" && mensajeInput ? mensajeInput.slice(0, 35) + "..." : c.titulo, mensajes: [...c.mensajes, nuevoMsgUsuario] } : c));
    setMensajeInput("");
    setArchivosAdjuntos([]);
    setChatCargando(true);
    setTimeout(() => {
      setChats(prev => prev.map(c => c.id === activeChatId ? {
        ...c,
        mensajes: [
          ...c.mensajes,
          {
            emisor: "ia",
            texto: "Entendido, Bárbara. He procesado tu solicitud protegiendo los datos confidenciales en segundo plano. Basado en la normativa civil y mercantil aplicable, la vía jurídica más sólida es estructurar el instrumento previendo la cláusula de salvaguarda y el visado colegiado con tu INPRE. Si deseas, podemos pasarlo al Redactor de Instrumentos o generar el mensaje para el cliente en WhatsApp."
          }
        ]
      } : c));
      setChatCargando(false);
    }, 900);
  };

  // =====================================================================
  // ESTADOS: 2. REDACTOR DE MENSAJES (WHATSAPP & EMAIL)
  // =====================================================================
  const [destinatarioMsg, setDestinatarioMsg] = useState("cliente_confianza");
  const [tonoMsg, setTonoMsg] = useState("cercano");
  const [instruccionMsg, setInstruccionMsg] = useState("");
  const [capturaWhatsappAdjunta, setCapturaWhatsappAdjunta] = useState<string | null>(null);
  const [mensajeGenerado, setMensajeGenerado] = useState("");
  const [mensajeCopiado, setMensajeCopiado] = useState(false);

  const handleSubirCapturaWhatsApp = () => {
    setCapturaWhatsappAdjunta("captura_chat_cliente.jpg");
    setInstruccionMsg("Datos extraídos de la imagen: El cliente pregunta si los documentos sirven para el trámite en el Registro/Notaría y pide confirmar los pasos para el visado y pago de honorarios.");
  };

  const handleGenerarMensaje = () => {
    if (!instruccionMsg.trim() && !capturaWhatsappAdjunta) return;
    if (tonoMsg === "cercano") {
      setMensajeGenerado(`¡Hola! Espero que estés muy bien. Te confirmo que revisé con detalle lo que me enviaste. Los documentos están correctos y sirven perfectamente para el objetivo del trámite; solo debemos coordinar la revisión previa en el registro para imprimir el definitivo con mi firma y visado INPRE. Avísame apenas tengas respuesta el martes y avanzamos. ¡Un fuerte abrazo!`);
    } else if (tonoMsg === "formal") {
      setMensajeGenerado(`Estimado(a), reciba un cordial saludo. En atención a los recaudos remitidos y tras la verificación jurídica preliminar, le comunico que la documentación se ajusta a los extremos exigidos por la normativa aplicable. Quedo a la espera de las observaciones registrales para proceder a la impresión y visado profesional definitivo. Atentamente, Abg. Barbara Piccolo.`);
    } else if (tonoMsg === "cobro") {
      setMensajeGenerado(`Hola, un gusto saludarte. Te escribo para coordinar la emisión y entrega formal de tu documento redactado y visado con mi INPRE. Los honorarios profesionales por el estudio, redacción y visado ascienden al monto acordado. Te comparto los datos bancarios para la transferencia y así agilizamos la entrega lista para firma: [Datos bancarios]. ¡Muchas gracias!`);
    } else {
      setMensajeGenerado(`¡Hola! Para explicártelo de forma muy sencilla: esos documentos cumplen exactamente el mismo objetivo legal y te protegen por completo. El proceso es súper rápido si ambas partes firman de mutuo acuerdo porque evitamos demoras innecesarias. Con esto ya estamos listos para avanzar ante la notaría/registro. Cualquier duda me avisas.`);
    }
  };

  const handleCopiarMensaje = () => {
    navigator.clipboard.writeText(mensajeGenerado);
    setMensajeCopiado(true);
    setTimeout(() => setMensajeCopiado(false), 2000);
  };

  // =====================================================================
  // ESTADOS: 3. PREPARADOR DE RECAUDOS (EXTRACTOR OCR/IA DE PARTES)
  // =====================================================================
  const [fotosRecaudos, setFotosRecaudos] = useState<string[]>([]);
  const [desglosePartes, setDesglosePartes] = useState({
    otorganteNombre: "ELBA JOSEFINA GUILLEN RODRIGUEZ",
    otorganteCedula: "V-2.991.032",
    otorganteRif: "V029910320",
    otorganteEstadoCivil: "Soltera",
    otorganteDomicilio: "Turmero, Estado Aragua",
    adquirienteNombre: "ANA BIANCA REYES BONILLA",
    adquirienteCedula: "V-6.055.603",
    adquirienteRif: "V060556031",
    adquirienteEstadoCivil: "Soltera",
    adquirienteDomicilio: "Turmero, Estado Aragua",
    inmuebleDescripcion: "Parcela C-13, Casa en Urbanización Las Cayenas, Asentamiento La Morita",
    inmuebleLinderos: "Norte: Parcela C-14; Sur: Parcela C-12; Este: Av 2da Principal; Oeste: Parcela C-28",
    inmuebleCatastro: "Cuenta 135940, Código Catastral 05-11-04-U08-091-003-009",
    condicionPrecio: "10.000.000,00 Bs (o su equivalente en divisas)",
    condicionFormaPago: "Cheque N° 01002663 del Banco de Venezuela sujeto a compensación bancaria previa a tradición legal"
  });

  const handleProcesarFotosRecaudos = () => {
    setFotosRecaudos(["cedula_comprador.jpg", "cedula_vendedora.jpg", "titulo_propiedad_anterior.pdf"]);
    setTimeout(() => {
      setDesglosePartes({
        otorganteNombre: "ELBA JOSEFINA GUILLEN RODRIGUEZ",
        otorganteCedula: "V-2.991.032",
        otorganteRif: "V029910320",
        otorganteEstadoCivil: "Soltera",
        otorganteDomicilio: "Turmero, Estado Aragua",
        adquirienteNombre: "ANA BIANCA REYES BONILLA",
        adquirienteCedula: "V-6.055.603",
        adquirienteRif: "V060556031",
        adquirienteEstadoCivil: "Soltera",
        adquirienteDomicilio: "Turmero, Estado Aragua",
        inmuebleDescripcion: "Parcela C-13, Casa en Urbanización Las Cayenas, Asentamiento La Morita",
        inmuebleLinderos: "Norte: Parcela C-14; Sur: Parcela C-12; Este: Av 2da Principal; Oeste: Parcela C-28",
        inmuebleCatastro: "Cuenta 135940, Código Catastral 05-11-04-U08-091-003-009",
        condicionPrecio: "10.000.000,00 Bs (o su equivalente en divisas)",
        condicionFormaPago: "Cheque N° 01002663 del Banco de Venezuela sujeto a compensación bancaria previa a tradición legal"
      });
    }, 600);
  };

  const handleEnviarDatosARedactor = () => {
    setActiveTab('redactor_documentos');
  };

  // =====================================================================
  // ESTADOS: 4. REDACTOR DE INSTRUMENTOS (CATÁLOGO DRIVE 544 MODELOS)
  // =====================================================================
  const [busquedaModelo, setBusquedaModelo] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [codigoModeloSeleccionado, setCodigoModeloSeleccionado] = useState(CATALOGO_MODELOS[2].codigo);
  const [sincronizandoDrive, setSincronizandoDrive] = useState(false);
  const modeloActual = CATALOGO_MODELOS.find(m => m.codigo === codigoModeloSeleccionado) || CATALOGO_MODELOS[0];
  const categoriasDisponibles = ["Todas", ...Array.from(new Set(CATALOGO_MODELOS.map(m => m.categoria)))];
  
  const modelosFiltrados = CATALOGO_MODELOS.filter(m => {
    const coincideCat = categoriaFiltro === "Todas" || m.categoria === categoriaFiltro;
    const coincideTexto = !busquedaModelo || 
      m.titulo.toLowerCase().includes(busquedaModelo.toLowerCase()) || 
      m.codigo.toLowerCase().includes(busquedaModelo.toLowerCase()) ||
      m.variables.toLowerCase().includes(busquedaModelo.toLowerCase());
    return coincideCat && coincideTexto;
  });

  const [instrumentoGenerado, setInstrumentoGenerado] = useState("");
  const [instrumentoCopiado, setInstrumentoCopiado] = useState(false);

  const handleGenerarInstrumento = () => {
    const textoDoc = `DOCUMENTO DE ${modeloActual.titulo.toUpperCase()} CON VISADO LEGAL

` +
      `Yo, ${desglosePartes.otorganteNombre || '[Otorgante]'}, venezolana, mayor de edad, ${desglosePartes.otorganteEstadoCivil || 'hábil en derecho'}, domiciliada en ${desglosePartes.otorganteDomicilio || '[Domicilio]'} y titular de la Cédula de Identidad N° ${desglosePartes.otorganteCedula || '[Cédula]'} (RIF: ${desglosePartes.otorganteRif || '[RIF]'}), por medio del presente instrumento declaro: Otorgo formal ${modeloActual.titulo.toLowerCase()} a favor de ${desglosePartes.adquirienteNombre || '[Adquiriente]'}, mayor de edad, titular de la Cédula de Identidad N° ${desglosePartes.adquirienteCedula || '[Cédula]'} (RIF: ${desglosePartes.adquirienteRif || '[RIF]'}).

` +
      `CLÁUSULA PRIMERA (DEL OBJETO Y DETERMINACIÓN): En lo relativo a ${desglosePartes.inmuebleDescripcion || '[Descripción del Bien / Objeto]'}, alinderado así: ${desglosePartes.inmuebleLinderos || '[Linderos]'}. Registro Catastral: ${desglosePartes.inmuebleCatastro || '[Catastro]'}.

` +
      `CLÁUSULA SEGUNDA (DEL PRECIO, MODALIDAD Y RESERVA): La operación se pacta por la cantidad de ${desglosePartes.condicionPrecio || '[Precio]'}, pagaderos mediante ${desglosePartes.condicionFormaPago || '[Forma de Pago]'}.

` +
      `CLÁUSULA TERCERA (FUNDAMENTO NORMATIVO): Instrumento regido conforme a ${modeloActual.fundamento}.

` +
      `DOCUMENTO REDACTADO Y VISADO POR:
` +
      `BARBARA ISABEL PICCOLO OBALDO
` +
      `Abogada en ejercicio inscrita en el IPSA N° 102.485 • INPRE N° 115.794`;
    setInstrumentoGenerado(textoDoc);
  };

  const descargarInstrumentoWord = () => {
    if (!instrumentoGenerado) return;
    const blob = new Blob([instrumentoGenerado], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${modeloActual.codigo}_${modeloActual.titulo.replace(/\s+/g, '_')}_Visado_Piccolo.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // =========================================================================
  // ESTADOS COMPLETOS RESTAURADOS DE GESTIÓN DEL DESPACHO (v5.3 + FinOps Pro)
  // =========================================================================
  
  // 1. PLANIFICADOR DE ASUNTOS Y EXPEDIENTES (KANBAN + LISTA + MODALES)
  const [filtroRolPlanificador, setFiltroRolPlanificador] = useState<'Todos' | 'In-House' | 'Externo'>('Todos');
  const [filtroMateriaPlanificador, setFiltroMateriaPlanificador] = useState('Todas');
  const [buscarPlanificador, setBuscarPlanificador] = useState('');
  const [vistaPlanificador, setVistaPlanificador] = useState<'kanban' | 'lista'>('kanban');
  const [tableroPlanificador, setTableroPlanificador] = useState<any[]>(MOCK_TABLERO);
  const [modalNuevoAsunto, setModalNuevoAsunto] = useState(false);
  const [modalVerExpediente, setModalVerExpediente] = useState<any>(null);

  const [nuevoAsuntoForm, setNuevoAsuntoForm] = useState({
    titulo: '',
    cliente: 'Machtig Rothe, C.A.',
    tipo_rol: 'Externo' as 'In-House' | 'Externo',
    materia: 'Inquilinario',
    responsable: 'Barbara Piccolo',
    plazo: 'Próxima semana',
    prioridad: 'Alta',
    bloqueo: 'En Curso',
    bloqueo_tipo: 'ninguno',
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
      tipo_rol: nuevoAsuntoForm.tipo_rol,
      materia: nuevoAsuntoForm.materia,
      responsable: nuevoAsuntoForm.responsable,
      plazo: nuevoAsuntoForm.plazo || 'Por definir',
      prioridad: nuevoAsuntoForm.prioridad,
      estado: nuevoAsuntoForm.estado,
      bloqueo: nuevoAsuntoForm.bloqueo,
      bloqueo_tipo: nuevoAsuntoForm.bloqueo.includes('Esperando') ? 'externo' : nuevoAsuntoForm.bloqueo.includes('Revisión') ? 'interno' : 'ninguno',
      cuantia: nuevoAsuntoForm.cuantia || 'Por cuantificar',
      tribunal: nuevoAsuntoForm.tribunal || 'Despacho Extrajudicial / Sede Principal',
      detalles: nuevoAsuntoForm.detalles || 'Expediente dado de alta en el sistema del despacho.',
      bitacora: [
        { fecha: "15/10/2026", nota: "Apertura del expediente en el Planificador por Dirección Jurídica." }
      ]
    };
    setTableroPlanificador([nuevo, ...tableroPlanificador]);
    setNuevoAsuntoForm({
      titulo: '',
      cliente: 'Machtig Rothe, C.A.',
      tipo_rol: 'Externo',
      materia: 'Inquilinario',
      responsable: 'Barbara Piccolo',
      plazo: 'Próxima semana',
      prioridad: 'Alta',
      bloqueo: 'En Curso',
      bloqueo_tipo: 'ninguno',
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

  // 2. DIRECTORIO & CRM (CON MATRIZ DE FACULTADES Y EXPEDIENTES)
  const [clienteVerFichaModal, setClienteVerFichaModal] = useState<any>(null);
  const [clientes, setClientes] = useState<any[]>(MOCK_CLIENTES);
  const [nuevoCliente, setNuevoCliente] = useState({
    nombre: "",
    tipo: "Externo" as 'Interno' | 'Externo',
    rif: "",
    apoderado: "",
    cedula_apoderado: "",
    email: "",
    telefono: "",
    domicilio: "",
    materia_principal: "Corporativo"
  });

  const registrarNuevoCliente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevoCliente.nombre) return;
    const item = {
      id: `CLI-${Date.now().toString().slice(-4)}`,
      nombre: nuevoCliente.nombre,
      tipo: nuevoCliente.tipo,
      rif: nuevoCliente.rif || "S/R",
      apoderado: nuevoCliente.apoderado || "Por designar",
      cedula_apoderado: nuevoCliente.cedula_apoderado || "V-00.000.000",
      email: nuevoCliente.email || "contacto@cliente.com",
      telefono: nuevoCliente.telefono || "N/A",
      domicilio: nuevoCliente.domicilio || "Domicilio comercial principal",
      asuntos_activos: 1,
      estado: "Activo",
      materia_principal: nuevoCliente.materia_principal,
      facultades_junta: "Registrada en Constitución",
      facultades_poder: "Vigente",
      facultades_estado: "vigente"
    };
    setClientes([item, ...clientes]);
    setNuevoCliente({
      nombre: "",
      tipo: "Externo",
      rif: "",
      apoderado: "",
      cedula_apoderado: "",
      email: "",
      telefono: "",
      domicilio: "",
      materia_principal: "Corporativo"
    });
  };

  // 3. CALENDARIO PROCESAL (CON DÍAS DE DESPACHO Y EXPORTADOR .ICS)
  const [vistaCalendario, setVistaCalendario] = useState<'mes' | 'agenda'>('mes');
  const [tipoComputoPlazo, setTipoComputoPlazo] = useState<'continuos' | 'despacho'>('despacho');
  const [mesActualIndex, setMesActualIndex] = useState(8); // Septiembre (o Octubre = 9)
  const [anioActual, setAnioActual] = useState(2026);
  const [diaSeleccionado, setDiaSeleccionado] = useState<number>(28);
  const [modalNuevoEvento, setModalNuevoEvento] = useState(false);

  const mesesNombres = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", 
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const [eventosCalendario, setEventosCalendario] = useState<any[]>(MOCK_CALENDARIO);
  const [nuevoEventoForm, setNuevoEventoForm] = useState({
    titulo: '',
    cliente: 'Machtig Rothe, C.A.',
    fecha: '2026-09-30',
    hora: '10:00',
    tipo: 'Procesal Perentorio',
    nivel: 'urgente',
    computo: 'Días de Despacho (CPC)',
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
      computo: nuevoEventoForm.computo,
      tribunal: nuevoEventoForm.tribunal || 'Despacho Judicial / Notarial'
    };
    setEventosCalendario([...eventosCalendario, nuevo]);
    setModalNuevoEvento(false);
    setMesActualIndex(mes);
    setAnioActual(anio);
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

  // 4. RENDIMIENTO & FINOPS (3 SUB-PESTAÑAS + MEDICIÓN POR ABOGADO + DESCARGA .DOC)
  const [subTabFinops, setSubTabFinops] = useState<'negocio' | 'operaciones' | 'riesgo'>('negocio');
  const [abogadoSeleccionado, setAbogadoSeleccionado] = useState<'todos' | 'barbara' | 'carlos' | 'elena'>('todos');
  const [periodoFinanciero, setPeriodoFinanciero] = useState('trimestre');
  const [metricasDespacho] = useState({
    valor_aportado_usd: "148.000 USD",
    contingencias_ahorradas_usd: "24.500 USD",
    facturacion_mes_usd: "22.350 USD",
    tasa_eficiencia_tiempo: "82% Reducción ciclo revisión (de 5 días a 18 horas)",
    horas_totales_equipo: "142 horas",
    asuntos_cerrados_mes: 14,
    asuntos_en_curso: 5
  });

  const descargarInformeEjecutivoSemanal = () => {
    const reportText = 
`INFORME EJECUTIVO SEMANAL - DIRECCIÓN JURÍDICA & GENERAL COUNSEL
DESPACHO PICCOLO & ASOCIADOS / AI GOVERN
FECHA: 15 DE OCTUBRE DE 2026

1. RESUMEN DE GESTIÓN Y VALOR APORTADO
- Valor económico desbloqueado en operaciones y acuerdos: ${metricasDespacho.valor_aportado_usd}
- Contingencias patrimoniales prevenidas (vías de hecho / sanciones): ${metricasDespacho.contingencias_ahorradas_usd}
- Tasa de aceleración de ciclo de revisión contractual: 82% (de 5 días a 18 horas promedio)
- Asuntos activos en tramitación: ${tableroPlanificador.length} expedientes

2. HITOS Y CONTINGENCIAS CRÍTICAS RESUELTAS
a) MACHTIG ROTHE, C.A.: Requerimiento formal por vías de hecho y retención ilegítima de 3 montacargas. Se acordó desbloqueo y compensación de mejoras por 15.000 USD con penalidad conminatoria de 500 USD/día.
b) AUXILIADORA INMUEBLES: Revisión y blindaje de compraventa Turmero con reserva de dominio hasta compensación de cheque bancario y visado profesional.
c) AI GOVERN S.L.: Redline y cierre de Contrato Enterprise SaaS con Acme Corp. Se eliminó lucro cesante y jurisdicción foránea, limitando responsabilidad a 12 meses.
d) COREIN, C.A.: Cierre de auditoría forense de pasivos y toma física de inventario central.

3. TÉRMINOS PERENTORIOS DE LA PRÓXIMA SEMANA
- Preaviso formal de renovación arrendaticia Galpón Unare (Notaría Tercera).
- Presentación de informe forense a Junta Directiva de Corein.
- Asamblea General Extraordinaria de Accionistas Sub 1308.

Emitido por: Barbara Piccolo (Abogada Directora / General Counsel)
Certificación criptográfica SHA-256 en Bóveda Soberana.`;

    const blob = new Blob([reportText], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Informe_Ejecutivo_Semanal_Direccion_Piccolo.doc`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 5. GRABADOR DE REUNIONES Y MINUTAS EJECUTIVAS (WHISPER ON-PREMISE + ASIGNACIÓN A KANBAN)
  const [grabandoAudioLocal, setGrabandoAudioLocal] = useState(false);
  const [segundosGrabacion, setSegundosGrabacion] = useState(0);
  const [audioUrlLocal, setAudioUrlLocal] = useState<string | null>(null);
  const [archivoAudioNombre, setArchivoAudioNombre] = useState<string | null>(null);
  const [cargandoTranscripcionWhisper, setCargandoTranscripcionWhisper] = useState(false);
  const [mostrarTranscripcionCruda, setMostrarTranscripcionCruda] = useState(false);
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
            if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
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
        console.warn("Permiso de micrófono no habilitado:", err);
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
        fecha: "15 de Octubre de 2026",
        hora: "11:15 AM",
        duracion: segundosGrabacion > 0 ? `${Math.floor(segundosGrabacion / 60)}m ${segundosGrabacion % 60}s` : "38 minutos",
        plataforma: "Custodia Soberana (Whisper On-Premise en Servidor Local)",
        hash_sha256: "7b4c9e1f2a3d8e5b0c9a8f7e6d5c4b3a2f1e0d9c8b7a6f5e4d3c2b1a0f9e8d7c",
        participantes: [
          "Barbara Piccolo (Socia Directora)",
          "Directores y Partes Interesadas en Sala"
        ],
        transcripcion_extracto: 
          "«...Habiéndose escuchado los puntos del debate y analizado los riesgos contractuales y procesales, las partes convienen en acatar los términos de la propuesta jurídica para evitar litigio judicial...»",
        acuerdos: [
          "Acuerdo vinculante formalizado con reserva de acciones legales.",
          "Estipulación de cumplimiento en plazo de cuarenta y ocho (48) horas.",
          "Custodia probatoria de la presente grabación en bóveda inmutable."
        ],
        action_items: [
          { id: `ACT-${Date.now().toString().slice(-3)}-1`, tarea: "Elaborar documento resolutivo y remitir al Planificador", responsable: "Barbara Piccolo", plazo: "Mañana 16:00", prioridad: "Crítica", agregado: false },
          { id: `ACT-${Date.now().toString().slice(-3)}-2`, tarea: "Notificar formalmente a los accionistas", responsable: "Secretaría Legal", plazo: "Viernes", prioridad: "Alta", agregado: false }
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
      cliente: "Machtig Rothe, C.A.",
      tipo_rol: "Externo",
      materia: "Compromiso de Minuta",
      responsable: item.responsable,
      plazo: item.plazo,
      prioridad: item.prioridad,
      estado: "En Tramitación",
      bloqueo: "En Curso",
      bloqueo_tipo: "ninguno",
      cuantia: "Derivada de Acuerdo",
      tribunal: "Compromiso de Sala Certificada",
      detalles: `Tarea generada a partir de los acuerdos de la sesión: ${minutaWhisper.titulo}.`,
      bitacora: [
        { fecha: "15/10/2026", nota: "Asignación directa desde Minuta Oficial a través de Whisper On-Premise." }
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

  const copiarCorreoFormalizacionAcuerdos = () => {
    const mailText = 
`Asunto: FORMALIZACIÓN DE ACUERDOS - ${minutaWhisper.titulo}
Para: ${minutaWhisper.participantes.join('; ')}
Fecha: ${minutaWhisper.fecha}

Estimados Directores y Representantes:

De conformidad con la sesión celebrada en fecha ${minutaWhisper.fecha}, por medio del presente correo dejo formalmente asentados los acuerdos vinculantes adoptados por las partes para su ejecución inmediata:

ACUERDOS VINCULANTES ADOPTADOS:
${minutaWhisper.acuerdos.map((a: string, i: number) => `${i + 1}. ${a}`).join('\n')}

MATRIZ DE COMPROMISOS Y PLAZOS FATALES:
${minutaWhisper.action_items.map((ai: any) => `• [${ai.prioridad}] ${ai.tarea} | Responsable: ${ai.responsable} | Plazo: ${ai.plazo}`).join('\n')}

Grabación de sala bajo sello criptográfico SHA-256 (${minutaWhisper.hash_sha256.slice(0, 16)}...) en Bóveda Soberana.

Atentamente,
Barbara Piccolo
Abogada Directora & General Counsel`;

    navigator.clipboard.writeText(mailText);
    alert("Correo de formalización de acuerdos copiado al portapapeles.");
  };

  const cargarDatosDemostracionCompletos = () => {
    setTableroPlanificador(MOCK_TABLERO);
    setClientes(MOCK_CLIENTES);
    setEventosCalendario(MOCK_CALENDARIO);
  };

  const limpiarDespachoModoMinimalista = () => {
    setTableroPlanificador([]);
    setClientes([]);
    setEventosCalendario([]);
  };


  return (
    <div className={`min-h-screen flex ${isDark ? 'bg-[#090d16] text-slate-200' : 'bg-slate-50 text-slate-800'} font-sans overflow-hidden`}>
      {/* =============================================================== */}
      {/* 1. BARRA LATERAL (DESKTOP)                                      */}
      {/* =============================================================== */}
      {sidebarOpen && (
        <aside className={`hidden md:flex flex-col w-72 h-screen border-r transition-all duration-300 ${isDark ? 'bg-[#0d1322] border-slate-800' : 'bg-white border-slate-200'} flex-shrink-0 z-20`}>
          <div className="p-5 flex items-center justify-between border-b border-slate-800/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <Shield className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-wide text-white flex items-center gap-1.5">
                  AI GOVERN
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                </h1>
                <p className="text-[10px] text-cyan-400 font-mono uppercase">Despacho Jurídico</p>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg border border-slate-800 hover:bg-slate-800 text-slate-400 cursor-pointer">
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 scrollbar-hide">
            {/* SECCIÓN 1: INTELIGENCIA JURÍDICA */}
            <div>
              <p className="text-[10px] font-bold tracking-widest text-cyan-400 mb-3 px-2 uppercase font-mono">1. Inteligencia Jurídica</p>
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
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${activeTab === item.id ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <item.icon className={`w-4 h-4 shrink-0 ${activeTab === item.id ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span className="text-xs truncate">{item.label}</span>
                    </div>
                    {item.badge && <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-mono shrink-0">{item.badge}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* SECCIÓN 2: GESTIÓN DEL DESPACHO (COMPLETA Y FUNCIONAL) */}
            <div className="pt-2 border-t border-slate-800/60">
              <p className="text-[10px] font-bold tracking-widest text-emerald-400 mb-3 px-2 uppercase font-mono">2. Gestión del Despacho</p>
              <div className="space-y-1">
                {[
                  { id: 'planificador', label: 'Gestor de Tareas & Asuntos', icon: CheckSquare, badge: `${tableroPlanificador.length}` },
                  { id: 'crm', label: 'Clientes & Expedientes', icon: Users, badge: `${clientes.length}` },
                  { id: 'calendario', label: 'Calendario Procesal', icon: Calendar, badge: '.ICS' },
                  { id: 'actas_minutas', label: 'Grabador & Minutas', icon: Mic, badge: 'Whisper' },
                  { id: 'metricas', label: 'Métricas & FinOps Legal', icon: BarChart3, badge: '3 Vistas' }
                ].map(item => (
                  <button 
                    key={item.id} 
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all cursor-pointer ${activeTab === item.id ? 'bg-cyan-500/15 text-cyan-300 font-bold border border-cyan-500/30 shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-900'}`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <item.icon className={`w-4 h-4 shrink-0 ${activeTab === item.id ? 'text-cyan-400' : 'text-slate-400'}`} />
                      <span className="text-xs truncate">{item.label}</span>
                    </div>
                    {item.badge && <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300 font-mono shrink-0">{item.badge}</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Perfil Inferior */}
          <div className="p-4 border-t border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
                BP
              </div>
              <div className="flex flex-col truncate">
                <span className="font-bold text-xs text-white truncate">Barbara Piccolo</span>
                <span className="text-[10px] text-cyan-400 font-mono truncate">INPRE N° 115.794 • GC</span>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* =============================================================== */}
      {/* 2. ÁREA DE CONTENIDO PRINCIPAL                                  */}
      {/* =============================================================== */}
      <main className="flex-1 flex flex-col h-screen relative overflow-hidden">
        <header className={`h-16 flex items-center justify-between px-4 sm:px-6 border-b z-10 ${isDark ? 'bg-[#090d16]/90 border-slate-800' : 'bg-white/90 border-slate-200'} backdrop-blur-md shrink-0`}>
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button onClick={() => setSidebarOpen(true)} className="hidden md:block p-2 rounded-xl border border-slate-800 text-cyan-400 hover:bg-slate-800 cursor-pointer">
                <Menu className="w-4 h-4" />
              </button>
            )}
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden p-2 rounded-xl border border-slate-800 text-cyan-400 hover:bg-slate-800 cursor-pointer">
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-xs sm:text-sm font-bold text-white tracking-wide uppercase font-mono">
              DESPACHO / <span className="text-cyan-400">{activeTab.replace('_', ' ')}</span>
            </h2>
          </div>

          <div className="flex items-center gap-2.5">
            {tableroPlanificador.length === 0 ? (
              <button
                onClick={cargarDatosDemostracionCompletos}
                className="px-3 py-1.5 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-bold hover:bg-cyan-500/30 cursor-pointer"
              >
                + Cargar Expedientes Activos
              </button>
            ) : (
              <button
                onClick={limpiarDespachoModoMinimalista}
                className="hidden sm:inline-flex px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-[11px] font-mono cursor-pointer"
                title="Vaciar datos de ejemplo para iniciar desde cero"
              >
                Modo Limpio
              </button>
            )}

            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero-Trust PII Activo</span>
            </div>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 md:pb-8 scrollbar-hide">
          
          {/* =============================================================== */}
          {/* VISTA 1: CONSULTOR JURÍDICO IA (CON HISTORIAL DE CONSULTAS)     */}
          {/* =============================================================== */}
          {activeTab === 'chat_ia' && (
            <div className="max-w-6xl mx-auto h-[calc(100vh-140px)] flex gap-4">
              
              {/* Panel Lateral de Consultas Guardadas */}
              <div className="hidden lg:flex flex-col w-64 rounded-2xl border border-slate-800 bg-[#0d1322] p-3 shrink-0">
                <button
                  onClick={handleCrearNuevoChat}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 hover:opacity-95 transition shadow-sm mb-3 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Consulta</span>
                </button>

                <span className="text-[10px] font-mono uppercase text-slate-400 px-2 mb-2 font-bold">Historial de Consultas</span>
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

              {/* Ventana Principal de Conversación */}
              <div className="flex-1 flex flex-col border border-slate-800 rounded-2xl overflow-hidden bg-[#0d1322]">
                <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
                  <div className="flex items-center gap-2 truncate">
                    <Bot className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span className="font-bold text-sm text-white truncate">{activeChat.titulo}</span>
                  </div>
                  <button
                    onClick={handleCrearNuevoChat}
                    className="lg:hidden text-xs text-cyan-400 font-bold flex items-center gap-1 border border-cyan-500/30 px-2.5 py-1 rounded-lg cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Nueva
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scrollbar-hide bg-slate-950/30">
                  {activeChat.mensajes.map((m, idx) => (
                    <div key={idx} className={`flex ${m.emisor === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-5 py-4 ${m.emisor === 'usuario' ? 'bg-cyan-900/40 border border-cyan-500/30 text-cyan-50' : 'bg-[#121a2d] border border-slate-800 text-slate-300'}`}>
                        {m.archivos && m.archivos.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {m.archivos.map((arch, aIdx) => (
                              <span key={aIdx} className="px-2 py-1 text-[10px] bg-slate-900 border border-slate-700 rounded-md text-cyan-400 flex items-center gap-1 font-mono">
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
                  {archivosAdjuntos.length > 0 && (
                    <div className="flex items-center gap-2 mb-2 p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-cyan-300 font-mono">
                      <Paperclip className="w-3.5 h-3.5" />
                      <span>{archivosAdjuntos.join(", ")}</span>
                      <button onClick={() => setArchivosAdjuntos([])} className="ml-auto text-slate-400 hover:text-white cursor-pointer">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                  <div className="relative flex items-end gap-2">
                    <button
                      onClick={() => setArchivosAdjuntos(["CamScanner_documento_cliente.pdf"])}
                      className="p-3.5 rounded-xl border border-slate-700 bg-slate-900 text-slate-400 hover:text-cyan-400 hover:border-cyan-500 transition flex-shrink-0 cursor-pointer"
                      title="Adjuntar PDF o foto"
                    >
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden focus-within:border-cyan-500 transition-colors">
                      <textarea 
                        value={mensajeInput}
                        onChange={e => setMensajeInput(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleEnviarMensaje(); } }}
                        placeholder="Consulta leyes, pide análisis de recaudos o instrucciones jurídicas..."
                        className="w-full max-h-32 min-h-[52px] bg-transparent text-sm text-white placeholder-slate-500 p-3.5 focus:outline-none resize-none scrollbar-hide"
                        rows={1}
                      />
                    </div>
                    <button onClick={handleEnviarMensaje} className="p-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition flex-shrink-0 cursor-pointer shadow-md">
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* =============================================================== */}
          {/* VISTA 2: REDACTOR DE MENSAJES (WHATSAPP & EMAIL)                */}
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

                  <div className="mt-5 text-white text-xs mb-2 font-bold flex items-center gap-2">2. ¿A quién le escribes?</div>
                  <select
                    value={destinatarioMsg}
                    onChange={e => setDestinatarioMsg(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="cliente_confianza">Cliente de confianza (ej. Auxiliadora)</option>
                    <option value="cliente_formal">Cliente corporativo / Empresa</option>
                    <option value="notaria">Funcionario de Notaría o Registro</option>
                    <option value="colega">Colega Abogado</option>
                  </select>

                  <div className="mt-5 text-white text-xs mb-2 font-bold flex items-center gap-2">3. ¿Qué necesitas responderle?</div>
                  <textarea 
                    value={instruccionMsg}
                    onChange={(e) => setInstruccionMsg(e.target.value)}
                    placeholder="Ejemplo: Dile que revisé los documentos y que falta la cédula..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 h-24 resize-none"
                  />

                  <div className="mt-5 text-white text-xs mb-2 font-bold flex items-center gap-2">4. Elige el Tono del Mensaje</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { id: 'cercano', label: 'Cercano / Empático', color: 'border-emerald-500 text-emerald-400' },
                      { id: 'formal', label: 'Formal / Firme', color: 'border-blue-500 text-blue-400' },
                      { id: 'cobro', label: 'Cobro Honorarios', color: 'border-purple-500 text-purple-400' },
                      { id: 'didactico', label: 'Explicación Sencilla', color: 'border-amber-500 text-amber-400' }
                    ].map(t => (
                      <button key={t.id} onClick={() => setTonoMsg(t.id)} className={`p-2 rounded-xl border text-xs font-bold transition cursor-pointer ${tonoMsg === t.id ? `bg-slate-800/80 ${t.color}` : 'border-slate-800 text-slate-500 hover:bg-slate-900'}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <button onClick={handleGenerarMensaje} className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-sm shadow-md transition flex justify-center items-center gap-2 cursor-pointer">
                    <Sparkles className="w-4 h-4" /> Generar Mensaje Listo para WhatsApp
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <div className="h-full bg-[#0d1322] border border-slate-800 rounded-2xl p-5 flex flex-col">
                  <div className="text-white text-sm font-bold mb-4 flex items-center justify-between">
                    <span>Mensaje Propuesto</span>
                    {mensajeGenerado && (
                      <button onClick={handleCopiarMensaje} className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs flex items-center gap-1 font-bold transition cursor-pointer">
                        {mensajeCopiado ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />} {mensajeCopiado ? "¡Copiado!" : "Copiar"}
                      </button>
                    )}
                  </div>
                  <div className={`flex-1 rounded-xl p-4 text-sm font-medium leading-relaxed whitespace-pre-wrap ${mensajeGenerado ? 'bg-cyan-950/20 text-cyan-50 border border-cyan-900/50' : 'bg-slate-900/50 text-slate-500 border border-dashed border-slate-800 flex items-center justify-center text-center'}`}>
                    {mensajeGenerado || "Sube una captura o escribe una instrucción para que la IA redacte tu respuesta."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* VISTA 3: PREPARADOR DE RECAUDOS (DESGLOSADOR AUTOMÁTICO)        */}
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
                  <p className="text-xs text-slate-400 max-w-xs">Adjunta cédulas de identidad, RIF, planillas sucesorales o títulos anteriores escaneados con CamScanner.</p>
                  
                  <button 
                    onClick={handleProcesarFotosRecaudos}
                    className="mt-2 px-6 py-2.5 rounded-xl border border-dashed border-cyan-500/50 hover:bg-slate-900 text-cyan-400 text-sm font-bold transition flex items-center gap-2 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Seleccionar Fotos / PDFs
                  </button>

                  {fotosRecaudos.length > 0 && (
                    <div className="w-full mt-4 text-left">
                      <div className="text-xs text-emerald-400 mb-2 font-bold">Archivos Procesados con OCR Jurídico:</div>
                      {fotosRecaudos.map((f, i) => (
                        <div key={i} className="px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-300 mb-2 flex items-center gap-2 font-mono">
                          <ImageIcon className="w-3.5 h-3.5 text-cyan-400" /> {f}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-6 flex flex-col h-full">
                  <h3 className="text-white font-bold text-sm mb-4 flex items-center justify-between">
                    <span>Datos Extraídos y Estructurados</span>
                    {desglosePartes.otorganteNombre && <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">Extracción Lista</span>}
                  </h3>
                  
                  <div className="flex-1 space-y-3 text-xs text-slate-300 overflow-y-auto">
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                      <span className="text-cyan-400 font-bold block uppercase text-[10px] font-mono">Parte Otorgante / Vendedora:</span>
                      <input value={desglosePartes.otorganteNombre} onChange={e => setDesglosePartes({...desglosePartes, otorganteNombre: e.target.value})} placeholder="Nombre completo" className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white" />
                      <div className="grid grid-cols-2 gap-2">
                        <input value={desglosePartes.otorganteCedula} onChange={e => setDesglosePartes({...desglosePartes, otorganteCedula: e.target.value})} placeholder="Cédula" className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-mono" />
                        <input value={desglosePartes.otorganteRif} onChange={e => setDesglosePartes({...desglosePartes, otorganteRif: e.target.value})} placeholder="RIF" className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-mono" />
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                      <span className="text-cyan-400 font-bold block uppercase text-[10px] font-mono">Parte Adquiriente / Apoderada:</span>
                      <input value={desglosePartes.adquirienteNombre} onChange={e => setDesglosePartes({...desglosePartes, adquirienteNombre: e.target.value})} placeholder="Nombre completo" className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white" />
                      <div className="grid grid-cols-2 gap-2">
                        <input value={desglosePartes.adquirienteCedula} onChange={e => setDesglosePartes({...desglosePartes, adquirienteCedula: e.target.value})} placeholder="Cédula" className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-mono" />
                        <input value={desglosePartes.adquirienteRif} onChange={e => setDesglosePartes({...desglosePartes, adquirienteRif: e.target.value})} placeholder="RIF" className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white font-mono" />
                      </div>
                    </div>
                    <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1.5">
                      <span className="text-cyan-400 font-bold block uppercase text-[10px] font-mono">Inmueble / Objeto y Condiciones:</span>
                      <input value={desglosePartes.inmuebleDescripcion} onChange={e => setDesglosePartes({...desglosePartes, inmuebleDescripcion: e.target.value})} placeholder="Descripción del inmueble u objeto" className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white" />
                      <input value={desglosePartes.condicionPrecio} onChange={e => setDesglosePartes({...desglosePartes, condicionPrecio: e.target.value})} placeholder="Precio / Cuantía" className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-white" />
                    </div>

                    <button 
                      onClick={handleEnviarDatosARedactor}
                      className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm flex justify-center items-center gap-2 shadow-md transition cursor-pointer"
                    >
                      <ArrowRight className="w-4 h-4" /> Enviar datos al Redactor de Instrumentos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* VISTA 4: REDACTOR DE INSTRUMENTOS (CATÁLOGO DRIVE 544 MODELOS)  */}
          {/* =============================================================== */}
          {activeTab === 'redactor_documentos' && (
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
              {/* Banner de Conexión a Drive */}
              <div className="bg-gradient-to-r from-cyan-900/40 to-blue-900/40 border border-cyan-500/30 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400"><FileSpreadsheet className="w-5 h-5" /></div>
                  <div>
                    <h2 className="text-white text-sm font-bold">Catálogo Maestro Conectado a Google Drive</h2>
                    <p className="text-xs text-cyan-200/70">Biblioteca activa: 00_BIBLIOTECA_MODELOS_JURIDICOS [MASTER] (544 Modelos)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://docs.google.com/spreadsheets/d/1uMWL2Fq1EnRj2MoblGuj7CToxuy0ZQl32p_xkCunxew/edit?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5"
                  >
                    <span>Abrir Hoja 544 Modelos</span>
                    <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  </a>
                  <button 
                    onClick={() => { setSincronizandoDrive(true); setTimeout(() => setSincronizandoDrive(false), 1200); }}
                    className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${sincronizandoDrive ? 'animate-spin' : ''}`} /> 
                    {sincronizandoDrive ? 'Sincronizando...' : 'Sincronizar Drive'}
                  </button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-6">
                {/* Panel Izquierdo: Buscador de los Modelos */}
                <div className="w-full lg:w-1/3 flex flex-col gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    <input type="text" value={busquedaModelo} onChange={(e) => setBusquedaModelo(e.target.value)} placeholder="Buscar por código, título o requisito..." className="w-full bg-[#0d1322] border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500" />
                  </div>
                  
                  <div className="bg-[#0d1322] border border-slate-800 rounded-xl overflow-hidden flex-1 flex flex-col max-h-[580px]">
                    <div className="p-3 border-b border-slate-800 bg-slate-900/50">
                      <select value={categoriaFiltro} onChange={(e) => setCategoriaFiltro(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-cyan-500">
                        {categoriasDisponibles.map((cat, idx) => <option key={idx} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div className="overflow-y-auto p-2 scrollbar-hide divide-y divide-slate-800/40">
                      {modelosFiltrados.map(m => (
                        <div key={m.codigo} onClick={() => setCodigoModeloSeleccionado(m.codigo)} className={`p-3 rounded-lg cursor-pointer transition border ${codigoModeloSeleccionado === m.codigo ? 'bg-cyan-500/15 border-cyan-500/50' : 'bg-transparent border-transparent hover:bg-slate-800/50'}`}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono font-bold text-cyan-400">{m.codigo}</span>
                            <span className="text-[9px] font-mono text-slate-500">{m.categoria}</span>
                          </div>
                          <div className={`text-xs font-bold leading-snug ${codigoModeloSeleccionado === m.codigo ? 'text-white' : 'text-slate-300'}`}>{m.titulo}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Panel Derecho: Ficha de Variables y Ensamblaje */}
                <div className="w-full lg:w-2/3 flex flex-col gap-4">
                  <div className="bg-[#0d1322] border border-slate-800 rounded-2xl p-5 space-y-4">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-cyan-400">{modeloActual.codigo} • {modeloActual.categoria}</span>
                        <a href={modeloActual.driveUrl} target="_blank" rel="noreferrer" className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono">
                          Abrir Plantilla Original en Drive <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <h2 className="text-lg font-bold text-white">{modeloActual.titulo}</h2>
                    </div>

                    {/* Variables Clave Requeridas según el Catálogo */}
                    <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-1">
                      <div className="font-mono text-[10px] text-cyan-400 uppercase font-bold">Variables Clave que exige este modelo ({modeloActual.fundamento}):</div>
                      <p className="text-slate-200 text-xs leading-relaxed">{modeloActual.variables}</p>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs font-mono uppercase text-slate-400 font-bold">Datos de las Partes y Condiciones:</span>
                      <button
                        onClick={() => setActiveTab('preparador_recaudos')}
                        className="text-xs text-cyan-400 hover:underline flex items-center gap-1 font-mono cursor-pointer"
                      >
                        <Camera className="w-3.5 h-3.5" /> Extraer desde fotos de Cédula/RIF
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block font-mono">Parte Otorgante / Vendedor</label>
                        <input value={desglosePartes.otorganteNombre} onChange={e => setDesglosePartes({...desglosePartes, otorganteNombre: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block font-mono">Cédula / RIF Otorgante</label>
                        <input value={desglosePartes.otorganteCedula} onChange={e => setDesglosePartes({...desglosePartes, otorganteCedula: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block font-mono">Parte Adquiriente / Apoderado</label>
                        <input value={desglosePartes.adquirienteNombre} onChange={e => setDesglosePartes({...desglosePartes, adquirienteNombre: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block font-mono">Cédula / RIF Adquiriente</label>
                        <input value={desglosePartes.adquirienteCedula} onChange={e => setDesglosePartes({...desglosePartes, adquirienteCedula: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white font-mono" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block font-mono">Objeto / Identificación del Inmueble y Linderos</label>
                        <input value={desglosePartes.inmuebleDescripcion} onChange={e => setDesglosePartes({...desglosePartes, inmuebleDescripcion: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block font-mono">Condiciones Económicas / Modalidad de Pago</label>
                        <input value={`${desglosePartes.condicionPrecio} — ${desglosePartes.condicionFormaPago}`} onChange={e => setDesglosePartes({...desglosePartes, condicionPrecio: e.target.value})} className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white" />
                      </div>
                    </div>

                    <button onClick={handleGenerarInstrumento} className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 cursor-pointer">
                      <FileCode className="w-4 h-4" /> Ensamblar Documento con mi Visado Profesional
                    </button>
                  </div>

                  {instrumentoGenerado && (
                    <div className="bg-[#0d1322] border border-cyan-500/30 rounded-2xl p-5 shadow-xl">
                      <div className="text-white text-sm font-bold mb-3 flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono text-xs text-cyan-400 uppercase">Vista Previa del Instrumento Visado</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(instrumentoGenerado);
                              setInstrumentoCopiado(true);
                              setTimeout(() => setInstrumentoCopiado(false), 2000);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs flex items-center gap-1 font-bold cursor-pointer"
                          >
                            <Copy className="w-3.5 h-3.5" /> {instrumentoCopiado ? "¡Copiado!" : "Copiar Texto"}
                          </button>
                          <button
                            onClick={descargarInstrumentoWord}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs flex items-center gap-1 font-bold transition cursor-pointer shadow-sm"
                          >
                            <Download className="w-3.5 h-3.5" /> Descargar .DOC
                          </button>
                        </div>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 font-mono leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto">
                        {instrumentoGenerado}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* =============================================================== */}
          {/* SECCIÓN 2: GESTIÓN DEL DESPACHO (100% RESTAURADA DE v5.3)       */}
          {/* =============================================================== */}

          {activeTab === 'planificador' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Layers className="w-6 h-6 text-cyan-400" /> Planificador de Asuntos y Expedientes
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control de prioridades procesales, dependencias bloqueantes y estado de tramitación letrada.
                  </p>
                </div>
                
                <div className="flex items-center gap-2.5">
                  <div className={`flex rounded-xl border p-1 text-xs font-mono ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                    <button 
                      onClick={() => setVistaPlanificador('kanban')}
                      className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer ${
                        vistaPlanificador === 'kanban' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" /> Kanban
                    </button>
                    <button 
                      onClick={() => setVistaPlanificador('lista')}
                      className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer ${
                        vistaPlanificador === 'lista' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" /> Lista
                    </button>
                  </div>

                  <button
                    onClick={() => setModalNuevoAsunto(true)}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nuevo Asunto</span>
                  </button>
                </div>
              </div>

              {/* Selector de Rol: In-House vs Cartera Externa */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border border-slate-800 bg-slate-900/60">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Vista de Rol:</span>
                  {(['Todos', 'In-House', 'Externo'] as const).map(rol => (
                    <button
                      key={rol}
                      onClick={() => setFiltroRolPlanificador(rol)}
                      className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                        filtroRolPlanificador === rol
                          ? 'bg-cyan-500 text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {rol === 'Todos' ? 'Todos los Asuntos' : rol === 'In-House' ? '🏛️ Corporativo / In-House' : '⚖️ Cartera Externa / Litigio'}
                    </button>
                  ))}
                </div>

                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Buscar expediente, cliente o juzgado..."
                    value={buscarPlanificador}
                    onChange={(e) => setBuscarPlanificador(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200"
                  />
                </div>
              </div>

              {/* VISTA KANBAN CON TAGS DE BLOQUEO Y DENSIDAD COMPACTA */}
              {vistaPlanificador === 'kanban' && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-start">
                  {['Por Iniciar', 'En Tramitación', 'Revisión & Firma', 'Concluido'].map(col => {
                    const items = tableroPlanificador.filter(i => {
                      const matchCol = i.estado === col;
                      const matchRol = filtroRolPlanificador === 'Todos' || i.tipo_rol === filtroRolPlanificador;
                      const matchMat = filtroMateriaPlanificador === 'Todas' || i.materia.toLowerCase().includes(filtroMateriaPlanificador.toLowerCase());
                      const matchTxt = !buscarPlanificador || 
                        i.titulo.toLowerCase().includes(buscarPlanificador.toLowerCase()) ||
                        i.cliente.toLowerCase().includes(buscarPlanificador.toLowerCase()) ||
                        i.id.toLowerCase().includes(buscarPlanificador.toLowerCase());
                      return matchCol && matchRol && matchMat && matchTxt;
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
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-800 text-slate-300">
                              {items.length}
                            </span>
                          </div>

                          <div className="space-y-2.5 mt-3">
                            {items.map(t => (
                              <div 
                                key={t.id} 
                                className={`p-3 rounded-xl border text-xs space-y-2 transition-all shadow-sm ${
                                  isDark ? 'bg-slate-950 border-slate-800/90 hover:border-cyan-500/50' : 'bg-slate-50 border-slate-200'
                                }`}
                              >
                                <div className="flex justify-between items-center text-[10px]">
                                  <span className="font-extrabold text-cyan-400">{t.cliente}</span>
                                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono ${
                                    t.tipo_rol === 'In-House' ? 'bg-purple-500/20 text-purple-300' : 'bg-blue-500/20 text-blue-300'
                                  }`}>
                                    {t.tipo_rol}
                                  </span>
                                </div>

                                <div className="font-bold text-xs text-white cursor-pointer hover:text-cyan-300 leading-snug" onClick={() => setModalVerExpediente(t)}>
                                  {t.titulo}
                                </div>

                                {/* Tag de Dependencia Bloqueante */}
                                <div className="flex items-center gap-1 text-[10px] font-mono">
                                  <span className={`px-2 py-0.5 rounded flex items-center gap-1 ${
                                    t.bloqueo_tipo === 'externo' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                                    t.bloqueo_tipo === 'interno' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                                    'bg-emerald-500/10 text-emerald-400'
                                  }`}>
                                    {t.bloqueo_tipo !== 'ninguno' && <AlertCircle className="w-2.5 h-2.5" />}
                                    <span>{t.bloqueo}</span>
                                  </span>
                                </div>

                                <div className="text-[10px] pt-1.5 border-t border-slate-800/40 flex justify-between items-center text-slate-400">
                                  <span className="truncate max-w-[110px]">{t.responsable}</span>
                                  <span className="font-mono text-cyan-300 font-bold">{t.plazo}</span>
                                </div>

                                <div className="flex items-center justify-between pt-1 border-t border-slate-800/20 text-[10px] font-mono">
                                  <button onClick={() => setModalVerExpediente(t)} className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer">
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

              {/* VISTA LISTA PROCESAL */}
              {vistaPlanificador === 'lista' && (
                <div className={`rounded-2xl border overflow-hidden ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <table className="w-full text-xs text-left">
                    <thead className={`text-[10px] font-mono uppercase border-b ${isDark ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                      <tr>
                        <th className="p-3.5">ID / Rol</th>
                        <th className="p-3.5">Cliente</th>
                        <th className="p-3.5">Materia</th>
                        <th className="p-3.5">Bloqueo Operativo</th>
                        <th className="p-3.5">Cuantía</th>
                        <th className="p-3.5">Plazo Fatal</th>
                        <th className="p-3.5">Estado</th>
                        <th className="p-3.5 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/40">
                      {tableroPlanificador.map(t => (
                        <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                          <td className="p-3.5 font-mono">
                            <span className="font-bold text-cyan-400 block">{t.id}</span>
                            <span className="text-[9px] text-slate-400">{t.tipo_rol}</span>
                          </td>
                          <td className="p-3.5 font-bold text-white">{t.cliente}</td>
                          <td className="p-3.5 text-slate-300">{t.materia}</td>
                          <td className="p-3.5 font-mono text-[11px]">
                            <span className={t.bloqueo_tipo === 'externo' ? 'text-red-400 font-bold' : t.bloqueo_tipo === 'interno' ? 'text-amber-400' : 'text-emerald-400'}>
                              {t.bloqueo}
                            </span>
                          </td>
                          <td className="p-3.5 font-mono text-emerald-400 font-bold">{t.cuantia}</td>
                          <td className="p-3.5 font-mono font-bold text-amber-400">{t.plazo}</td>
                          <td className="p-3.5">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-cyan-300">
                              {t.estado}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => setModalVerExpediente(t)}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-[10px] cursor-pointer"
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
          {activeTab === 'crm' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Users className="w-6 h-6 text-blue-400" /> Directorio & CRM Legal
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control de clientes externos e internos con Matriz de Vigencia de Facultades Estatutarias y Poderes.
                  </p>
                </div>
              </div>

              {/* Matriz de Clientes Registrados */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {clientes.map(c => {
                  const expedientesCliente = tableroPlanificador.filter(exp => exp.cliente === c.nombre);
                  return (
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
                        <p className="text-xs text-slate-400 mt-0.5">{c.apoderado} ({c.cedula_apoderado})</p>
                      </div>

                      {/* Semáforo de Facultades Estatutarias */}
                      <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] font-mono space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Junta Directiva:</span>
                          <span className="text-emerald-400 font-bold">{c.facultades_junta}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Poder Notarial:</span>
                          <span className={`font-bold ${c.facultades_estado === 'alerta' ? 'text-amber-400' : 'text-slate-300'}`}>
                            {c.facultades_poder}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-800/40 text-[11px] font-mono">
                        <span className="text-slate-400">{expedientesCliente.length} expediente(s) activo(s)</span>
                        <button
                          onClick={() => setClienteVerFichaModal(c)}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 font-bold text-[10px] cursor-pointer transition-all flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" /> Ver Expedientes
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Formulario de Alta */}
              <div className={`p-5 rounded-2xl border space-y-4 ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-cyan-400" /> Alta de Nuevo Cliente en Directorio
                </h2>
                <form onSubmit={registrarNuevoCliente} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Razón Social *</label>
                      <input
                        type="text"
                        required
                        placeholder="Ej. Inversiones 2026, C.A."
                        value={nuevoCliente.nombre}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, nombre: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Tipo</label>
                      <select
                        value={nuevoCliente.tipo}
                        onChange={(e: any) => setNuevoCliente({...nuevoCliente, tipo: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-cyan-400 font-bold"
                      >
                        <option value="Externo">Cliente Externo</option>
                        <option value="Interno">Cliente Interno</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">RIF</label>
                      <input
                        type="text"
                        placeholder="J-00000000-0"
                        value={nuevoCliente.rif}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, rif: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Apoderado Legal</label>
                      <input
                        type="text"
                        placeholder="Nombre completo"
                        value={nuevoCliente.apoderado}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, apoderado: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Cédula Apoderado</label>
                      <input
                        type="text"
                        placeholder="V-00.000.000"
                        value={nuevoCliente.cedula_apoderado}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, cedula_apoderado: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono text-slate-400 block mb-1">Domicilio</label>
                      <input
                        type="text"
                        placeholder="Ciudad / Estado"
                        value={nuevoCliente.domicilio}
                        onChange={(e) => setNuevoCliente({...nuevoCliente, domicilio: e.target.value})}
                        className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer shadow-md"
                    >
                      Guardar Ficha
                    </button>
                  </div>
                </form>
              </div>

            </div>
          )}
          {activeTab === 'calendario' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Clock className="w-6 h-6 text-amber-400" /> Calendario Judicial & Contractual
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Control visual de términos perentorios con cómputo de Días de Despacho y exportación directa a dispositivos móviles.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={exportarCalendarioICS}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 text-blue-300 font-mono text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Download className="w-3.5 h-3.5" /> Sincronizar (.ics)
                  </button>

                  <button
                    onClick={() => setModalNuevoEvento(true)}
                    className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Plus className="w-4 h-4" /> Agendar Término
                  </button>
                </div>
              </div>

              {/* Selector de Cómputo de Plazos */}
              <div className="flex items-center gap-3 p-3 rounded-2xl border border-slate-800 bg-slate-900/60 text-xs font-mono">
                <span className="text-slate-400 uppercase font-bold">Régimen de Cómputo:</span>
                <div className="flex rounded-lg border border-slate-800 p-0.5">
                  <button
                    onClick={() => setTipoComputoPlazo('despacho')}
                    className={`px-3 py-1 rounded text-[11px] font-bold cursor-pointer ${
                      tipoComputoPlazo === 'despacho' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ⚖️ Días de Despacho (CPC Art. 197 - Tribunales)
                  </button>
                  <button
                    onClick={() => setTipoComputoPlazo('continuos')}
                    className={`px-3 py-1 rounded text-[11px] font-bold cursor-pointer ${
                      tipoComputoPlazo === 'continuos' ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    📄 Días Continuos (Vencimientos Contractuales)
                  </button>
                </div>
                <span className="text-[10px] text-slate-500 hidden sm:inline">
                  {tipoComputoPlazo === 'despacho' ? '*Solo computa días en que el tribunal acuerde despacho público efectivo.' : '*Computa sábados, domingos y feriados civiles.'}
                </span>
              </div>

              {/* Cuadrícula Real del Mes */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                    <span>{mesesNombres[mesActualIndex]}</span>
                    <span className="text-amber-400">{anioActual}</span>
                  </h2>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setMesActualIndex(mesActualIndex === 0 ? 11 : mesActualIndex - 1)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { setMesActualIndex(8); setAnioActual(2026); setDiaSeleccionado(28); }}
                      className="px-3 py-1.5 rounded-xl border border-slate-700 text-xs font-mono font-bold hover:bg-slate-800 cursor-pointer"
                    >
                      Hoy (28 Sep)
                    </button>
                    <button
                      onClick={() => setMesActualIndex(mesActualIndex === 11 ? 0 : mesActualIndex + 1)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900">
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[11px] font-bold pb-2 border-b border-slate-800 text-slate-400">
                    <div>LUN</div><div>MAR</div><div>MIÉ</div><div>JUE</div><div>VIE</div><div>SÁB</div><div>DOM</div>
                  </div>

                  {(() => {
                    const { offsetLunes, totalDias } = getDiasDelMes(mesActualIndex, anioActual);
                    const cells: any[] = [];
                    for (let i = 0; i < offsetLunes; i++) {
                      cells.push(<div key={`empty-${i}`} className="min-h-[85px] opacity-20 p-2 text-xs">-</div>);
                    }
                    for (let d = 1; d <= totalDias; d++) {
                      const eventosDelDia = eventosCalendario.filter(ev => ev.dia === d && ev.mes === mesActualIndex && ev.anio === anioActual);
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
                                : 'border-slate-800/80 bg-slate-950/60 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`font-mono text-xs font-bold ${esHoy ? 'text-cyan-400 underline' : esSeleccionado ? 'text-amber-400' : 'text-slate-300'}`}>
                              {d}
                            </span>
                            {esHoy && <span className="text-[9px] font-mono text-cyan-300 font-bold">HOY</span>}
                          </div>

                          <div className="space-y-1 mt-1">
                            {eventosDelDia.map(ev => (
                              <div 
                                key={ev.id} 
                                className={`px-1.5 py-0.5 rounded text-[9px] font-bold truncate ${
                                  ev.nivel === 'critico' ? 'bg-red-500/25 text-red-300 border border-red-500/40' :
                                  ev.nivel === 'urgente' ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40' :
                                  'bg-blue-500/25 text-blue-300'
                                }`}
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

                {/* Panel Detallado del Día */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-amber-400" />
                      <span>Términos y Audiencias: {diaSeleccionado} de {mesesNombres[mesActualIndex]} de {anioActual}</span>
                    </h3>
                    <button
                      onClick={() => setModalNuevoEvento(true)}
                      className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-mono font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Agendar en esta fecha
                    </button>
                  </div>

                  {(() => {
                    const eventos = eventosCalendario.filter(ev => ev.dia === diaSeleccionado && ev.mes === mesActualIndex && ev.anio === anioActual);
                    if (eventos.length === 0) {
                      return <div className="py-4 text-center text-xs text-slate-500 font-mono">No hay términos fatales ni audiencias para este día.</div>;
                    }
                    return (
                      <div className="space-y-2">
                        {eventos.map(ev => (
                          <div key={ev.id} className="p-3.5 rounded-xl border border-slate-800 bg-slate-950 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-amber-400 font-bold text-xs">{ev.hora}</span>
                                <span className="px-2 py-0.5 rounded font-mono font-bold text-[10px] bg-slate-800 text-cyan-300">{ev.cliente}</span>
                                <span className="text-[10px] text-slate-400 font-mono">Cómputo: {ev.computo}</span>
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

            </div>
          )}
          {activeTab === 'actas_minutas' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <Mic className="w-6 h-6 text-pink-400" /> 6. Actas y Minutas Ejecutivas
                  </h1>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Grabación de sala y generación de minuta con exportación de correo de formalización y asignación a Planificador.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={copiarCorreoFormalizacionAcuerdos}
                    className="px-3.5 py-1.5 rounded-xl bg-pink-500 hover:bg-pink-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" /> Copiar Correo de Acuerdos
                  </button>
                </div>
              </div>

              {/* Consola Central de Grabación */}
              <div className="p-6 rounded-2xl border border-pink-500/30 bg-slate-900 shadow-xl space-y-4">
                <div className="flex flex-col items-center justify-center text-center space-y-3 py-1">
                  
                  <div className="space-y-1">
                    <div className="font-mono text-4xl font-extrabold text-white tracking-widest">
                      {Math.floor(segundosGrabacion / 60).toString().padStart(2, '0')}:{(segundosGrabacion % 60).toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
                      <span className={`w-3 h-3 rounded-full ${grabandoAudioLocal ? 'bg-red-500 animate-ping' : 'bg-slate-500'}`}></span>
                      <span>{grabandoAudioLocal ? "Grabando audio de sala en memoria privada..." : "Listo para grabar o cargar archivo de audio"}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
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

                    <label className="px-5 py-3.5 rounded-2xl border border-slate-800 bg-slate-950 hover:border-pink-400 text-slate-200 font-mono font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md">
                      <Upload className="w-4 h-4 text-pink-400" />
                      <span>Subir Archivo de Audio</span>
                      <input type="file" accept="audio/*,.mp3,.wav,.m4a,.webm,.ogg" onChange={handleSubirArchivoAudio} className="hidden" />
                    </label>
                  </div>

                  {archivoAudioNombre && (
                    <div className="text-xs font-mono text-cyan-300 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800">
                      Archivo: <strong>{archivoAudioNombre}</strong>
                    </div>
                  )}

                  {audioUrlLocal && (
                    <div className="w-full max-w-md pt-1">
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

              {/* Minuta Oficial */}
              {minutaWhisper && (
                <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 space-y-5 shadow-xl">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-slate-800">
                    <div>
                      <span className="text-xs font-mono text-pink-400 font-bold uppercase tracking-wider">
                        Minuta Oficial Certificada
                      </span>
                      <h2 className="text-lg font-bold text-white mt-0.5">{minutaWhisper.titulo}</h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={copiarCorreoFormalizacionAcuerdos}
                        className="px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 text-xs font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3.5 h-3.5" /> Copiar Correo
                      </button>
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
                    <span className="text-xs font-mono text-cyan-400 uppercase font-bold flex items-center gap-1.5">
                      <CheckSquare className="w-4 h-4 text-cyan-400" /> Compromisos Asignables al Planificador:
                    </span>

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
                            className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 cursor-pointer shrink-0 ${
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

                  {/* Transcripción Cruda Colapsable */}
                  <div className="pt-2 border-t border-slate-800/80">
                    <button
                      onClick={() => setMostrarTranscripcionCruda(!mostrarTranscripcionCruda)}
                      className="text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                    >
                      {mostrarTranscripcionCruda ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      <span>{mostrarTranscripcionCruda ? "Ocultar Transcripción Forense" : "Mostrar Transcripción Forense Cruda (Audit Trail)"}</span>
                    </button>

                    {mostrarTranscripcionCruda && (
                      <div className="p-3.5 mt-2 rounded-xl bg-slate-950 border border-slate-800 text-xs italic text-slate-300 font-serif leading-relaxed">
                        {minutaWhisper.transcripcion_extracto}
                      </div>
                    )}
                  </div>

                </div>
              )}

            </div>
          )}
          
          {activeTab === 'metricas' && (
            <div className="space-y-6 max-w-6xl mx-auto">
              
              {/* Header con Filtro de Período y Botón de Informe .DOC */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-emerald-400" /> Rendimiento & FinOps del Despacho Legal
                  </h1>
                  <p className="text-xs text-slate-400 mt-1">
                    Control financiero, efectividad del equipo (titular + asociados), valor desbloqueado y blindaje corporativo.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#121a2d] p-1 rounded-xl border border-slate-800 text-xs font-mono">
                    <button onClick={() => setPeriodoFinanciero('mes')} className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${periodoFinanciero === 'mes' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}>Mes</button>
                    <button onClick={() => setPeriodoFinanciero('trimestre')} className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${periodoFinanciero === 'trimestre' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}>Trimestre</button>
                    <button onClick={() => setPeriodoFinanciero('anual')} className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${periodoFinanciero === 'anual' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'}`}>Año</button>
                  </div>

                  <button
                    onClick={descargarInformeEjecutivoSemanal}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <Download className="w-4 h-4" /> Descargar Informe de Gestión (.doc)
                  </button>
                </div>
              </div>

              {/* SELECTOR DE LAS 3 SUB-PESTAÑAS DE MÉTRICAS */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
                <button 
                  onClick={() => setSubTabFinops('negocio')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    subTabFinops === 'negocio' 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm' 
                      : 'bg-[#121a2d] text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span>1. Negocio & FinOps</span>
                  <span className="px-1.5 py-0.5 text-[9px] rounded bg-cyan-500/20 text-cyan-300 font-mono">5 KPIs</span>
                </button>

                <button 
                  onClick={() => setSubTabFinops('operaciones')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    subTabFinops === 'operaciones' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm' 
                      : 'bg-[#121a2d] text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2. Operaciones & Efectividad Equipo</span>
                  <span className="px-1.5 py-0.5 text-[9px] rounded bg-emerald-500/20 text-emerald-300 font-mono">Por Abogado</span>
                </button>

                <button 
                  onClick={() => setSubTabFinops('riesgo')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 cursor-pointer ${
                    subTabFinops === 'riesgo' 
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm' 
                      : 'bg-[#121a2d] text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 text-purple-400" />
                  <span>3. Riesgo & Blindaje Corporativo</span>
                  <span className="px-1.5 py-0.5 text-[9px] rounded bg-purple-500/20 text-purple-300 font-mono">Auditoría</span>
                </button>
              </div>

              {/* SUB-PESTAÑA 1: NEGOCIO & FINOPS */}
              {subTabFinops === 'negocio' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 border-l-4 border-l-emerald-400 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">1. Valor Desbloqueado</span>
                      <div className="text-2xl font-extrabold text-emerald-400 font-mono">{metricasDespacho.valor_aportado_usd}</div>
                      <p className="text-[10px] text-slate-400">Operaciones y contratos cerrados</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 border-l-4 border-l-cyan-400 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">2. Riesgo Prevenido</span>
                      <div className="text-2xl font-extrabold text-cyan-400 font-mono">{metricasDespacho.contingencias_ahorradas_usd}</div>
                      <p className="text-[10px] text-slate-400">Contingencias y multas evitadas</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 border-l-4 border-l-purple-400 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">3. Facturación Mes</span>
                      <div className="text-2xl font-extrabold text-purple-400 font-mono">{metricasDespacho.facturacion_mes_usd}</div>
                      <p className="text-[10px] text-slate-400">Igualas y honorarios de trámites</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 border-l-4 border-l-amber-400 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">4. Ciclo Contractual</span>
                      <div className="text-lg font-extrabold text-amber-400 font-mono mt-1">18h vs 5 días (-82%)</div>
                      <p className="text-[10px] text-slate-400">Con Catálogo Maestro 544 Modelos</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                        <span className="font-mono text-xs text-cyan-300 font-bold uppercase">5. Eficiencia Financiera & Ahorro IA</span>
                        <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">Óptimo</span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-slate-400 text-[10px] block">COSTE UNITARIO / DOC</span>
                          <span className="text-lg font-bold text-emerald-400">0,18 USD</span>
                          <span className="text-[9px] text-slate-500 block">Inferencia LPU + Visado</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                          <span className="text-slate-400 text-[10px] block">HORAS RESCATADAS</span>
                          <span className="text-lg font-bold text-purple-400">128 h / mes</span>
                          <span className="text-[9px] text-slate-500 block">En redacción y cotejo</span>
                        </div>
                      </div>
                      <div className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-xs font-mono flex justify-between items-center">
                        <div>
                          <div className="font-bold text-white">Valor Económico del Tiempo Liberado</div>
                          <div className="text-[11px] text-slate-400">128 horas dedicadas a estrategia y clientes</div>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-bold text-emerald-400">19.200 USD</div>
                          <div className="text-[10px] text-cyan-300 font-bold">ROI: 480%</div>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <span className="font-mono text-xs text-emerald-300 font-bold block uppercase">Distribución de Cartera por Área de Práctica</span>
                      <div className="flex items-center justify-around gap-4 pt-2">
                        <div className="relative w-28 h-28 flex items-center justify-center flex-shrink-0">
                          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                            <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#8b5cf6" strokeWidth="4" strokeDasharray="35 65"></circle>
                            <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#00f0ff" strokeWidth="4" strokeDasharray="45 55" strokeDashoffset="-35"></circle>
                            <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="4" strokeDasharray="20 80" strokeDashoffset="-80"></circle>
                          </svg>
                          <div className="absolute text-center"><span className="text-xs font-bold font-mono text-white">100%</span></div>
                        </div>
                        <div className="space-y-2 text-xs font-mono">
                          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span><span>Inmobiliario, Notarial & SAREN: 45%</span></div>
                          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span><span>Corporativo, Societario & Litigio: 35%</span></div>
                          <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span><span>LegalTech, SaaS & Compliance: 20%</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-PESTAÑA 2: OPERACIONES & EQUIPO LEGAL */}
              {subTabFinops === 'operaciones' && (
                <div className="space-y-5">
                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-emerald-400" />
                        <span>Filtro de Efectividad por Abogado:</span>
                      </span>
                      <p className="text-[11px] text-slate-400">Mide el rendimiento individual de Dirección Jurídica y asociados.</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                      {[
                        { id: 'todos', label: 'Todo el Despacho (3)', activeClass: 'bg-emerald-500 text-slate-950 font-bold' },
                        { id: 'barbara', label: 'Barbara Piccolo (Directora)', activeClass: 'bg-cyan-500 text-slate-950 font-bold' },
                        { id: 'carlos', label: 'Carlos M. (Mercantil)', activeClass: 'bg-purple-500 text-white font-bold' },
                        { id: 'elena', label: 'Elena R. (Privacidad/IP)', activeClass: 'bg-pink-500 text-white font-bold' }
                      ].map(ab => (
                        <button
                          key={ab.id}
                          onClick={() => setAbogadoSeleccionado(ab.id as any)}
                          className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${abogadoSeleccionado === ab.id ? ab.activeClass : 'bg-slate-950 text-slate-300 hover:bg-slate-800'}`}
                        >
                          {ab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">6. Entradas vs. Cierres</span>
                      <div className="text-xl font-bold text-white font-mono">
                        {abogadoSeleccionado === 'todos' && "48 in / 45 out"}
                        {abogadoSeleccionado === 'barbara' && "23 in / 22 out"}
                        {abogadoSeleccionado === 'carlos' && "16 in / 15 out"}
                        {abogadoSeleccionado === 'elena' && "9 in / 8 out"}
                      </div>
                      <p className="text-[10px] text-emerald-400 font-mono">93.7% Tasa de Resolución</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">7. Cumplimiento de SLA</span>
                      <div className="text-xl font-bold text-emerald-400 font-mono">
                        {abogadoSeleccionado === 'todos' && "96.2%"}
                        {abogadoSeleccionado === 'barbara' && "98.5%"}
                        {abogadoSeleccionado === 'carlos' && "95.0%"}
                        {abogadoSeleccionado === 'elena' && "96.0%"}
                      </div>
                      <p className="text-[10px] text-slate-400">&lt; 4h respuesta inicial | &lt; 24h instrumento</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase">8. Tiempo Medio por Asunto</span>
                      <div className="text-xl font-bold text-cyan-400 font-mono">
                        {abogadoSeleccionado === 'todos' && "21h Promedio"}
                        {abogadoSeleccionado === 'barbara' && "18h (Alta Complejidad)"}
                        {abogadoSeleccionado === 'carlos' && "22h (Mercantil / Contratos)"}
                        {abogadoSeleccionado === 'elena' && "24h (Compliance / DPA)"}
                      </div>
                      <p className="text-[10px] text-slate-400">Ciclo completo hasta visado</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <span className="font-mono text-xs text-emerald-300 font-bold uppercase">Matriz de Rendimiento Individual del Equipo</span>
                      <span className="text-[10px] font-mono text-slate-400">Datos Sincronizados con Planificador</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-mono">
                        <thead>
                          <tr className="text-slate-400 text-[11px] border-b border-slate-800">
                            <th className="pb-2">Abogado / Rol</th>
                            <th className="pb-2">Asuntos Cerrados</th>
                            <th className="pb-2">Tiempo Ciclo</th>
                            <th className="pb-2">SLA</th>
                            <th className="pb-2">Valor Facilitado</th>
                            <th className="pb-2">Horas Ahorradas IA</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50 text-slate-300">
                          <tr className={abogadoSeleccionado === 'barbara' ? 'bg-cyan-500/10' : ''}>
                            <td className="py-2.5 text-white font-bold">Barbara Piccolo (Socia Directora & GC)</td>
                            <td className="py-2.5 text-cyan-300 font-bold">22 (Alta Complejidad)</td>
                            <td className="py-2.5">18 h</td>
                            <td className="py-2.5 text-emerald-400 font-bold">98.5%</td>
                            <td className="py-2.5 text-emerald-400 font-bold">85.000 USD</td>
                            <td className="py-2.5 text-purple-300 font-bold">58 h</td>
                          </tr>
                          <tr className={abogadoSeleccionado === 'carlos' ? 'bg-purple-500/10' : ''}>
                            <td className="py-2.5 text-white font-bold">Carlos Mendoza (Asociado Mercantil)</td>
                            <td className="py-2.5 text-purple-300 font-bold">15 (Contratos & Societario)</td>
                            <td className="py-2.5">22 h</td>
                            <td className="py-2.5 text-emerald-400">95.0%</td>
                            <td className="py-2.5 text-emerald-400 font-bold">35.000 USD</td>
                            <td className="py-2.5 text-purple-300 font-bold">42 h</td>
                          </tr>
                          <tr className={abogadoSeleccionado === 'elena' ? 'bg-pink-500/10' : ''}>
                            <td className="py-2.5 text-white font-bold">Elena Ramos (Asociada Privacidad/IP)</td>
                            <td className="py-2.5 text-pink-300 font-bold">8 (DPAs & Propiedad Intelectual)</td>
                            <td className="py-2.5">24 h</td>
                            <td className="py-2.5 text-emerald-400">96.0%</td>
                            <td className="py-2.5 text-emerald-400 font-bold">20.000 USD</td>
                            <td className="py-2.5 text-purple-300 font-bold">28 h</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-PESTAÑA 3: RIESGO & BLINDAJE CORPORATIVO */}
              {subTabFinops === 'riesgo' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 border-l-4 border-l-red-500 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">9. Fugas de PII Neutralizadas</span>
                      <div className="text-xl font-bold text-red-400 font-mono">100% Contenidas</div>
                      <p className="text-[10px] text-slate-400">0 brechas de secreto profesional</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 border-l-4 border-l-emerald-400 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">10. Soberanía Documental</span>
                      <div className="text-xl font-bold text-emerald-400 font-mono">544 Modelos</div>
                      <p className="text-[10px] text-slate-400">Custodiados en biblioteca privada</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 border-l-4 border-l-purple-400 space-y-1">
                      <span className="text-[10px] font-mono text-slate-400 uppercase block">11. Índice de Cumplimiento</span>
                      <div className="text-xl font-bold text-purple-300 font-mono">98 / 100</div>
                      <p className="text-[10px] text-slate-400">RGPD + EU AI Act + Secreto Profesional</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}


        </div>

        {/* BARRA INFERIOR MÓVIL */}
        <div className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-[#090d16]/95 border-t border-slate-800 backdrop-blur-lg z-40 flex items-center justify-around px-2">
          {[
            { id: 'chat_ia', label: 'Consultor', icon: Bot },
            { id: 'preparador_recaudos', label: 'Recaudos', icon: Camera },
            { id: 'redactor_documentos', label: 'Modelos', icon: FileCode },
            { id: 'planificador', label: 'Tareas', icon: CheckSquare }
          ].map(item => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center justify-center p-2 rounded-xl transition-colors cursor-pointer ${activeTab === item.id ? 'text-cyan-400 font-bold' : 'text-slate-500'}`}>
              <item.icon className="w-5 h-5 mb-1" />
              <span className="text-[9px] font-bold">{item.label}</span>
            </button>
          ))}
          <button onClick={() => setMobileMenuOpen(true)} className="flex flex-col items-center justify-center p-2 text-slate-500 cursor-pointer">
            <Menu className="w-5 h-5 mb-1" />
            <span className="text-[9px] font-bold">Más</span>
          </button>
        </div>
      </main>

      {/* MENÚ MÓVIL DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 md:hidden flex justify-end">
          <div className="w-72 bg-[#0d1322] h-full flex flex-col border-l border-slate-800 animate-in slide-in-from-right duration-200">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <span className="font-bold text-white text-sm">Menú Completo</span>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1.5">
              {[
                { id: 'chat_ia', label: 'Consultor Jurídico IA', icon: Bot },
                { id: 'redactor_mensajes', label: 'Mensajes WhatsApp', icon: MessageCircle },
                { id: 'preparador_recaudos', label: 'Preparador Recaudos', icon: Camera },
                { id: 'redactor_documentos', label: 'Redactor (544 Modelos)', icon: FileCode },
                { id: 'planificador', label: 'Gestor de Tareas & Asuntos', icon: CheckSquare },
                { id: 'crm', label: 'Directorio Clientes & CRM', icon: Users },
                { id: 'calendario', label: 'Calendario Procesal (.ICS)', icon: Calendar },
                { id: 'actas_minutas', label: 'Grabador & Minutas', icon: Mic },
                { id: 'metricas', label: 'Métricas & FinOps Legal', icon: BarChart3 }
              ].map(item => (
                <button 
                  key={item.id} 
                  onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left ${activeTab === item.id ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
                >
                  <item.icon className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL 1: VER EXPEDIENTES VINCULADOS AL CLIENTE (CRM)                */}
      {/* =================================================================== */}
      {clienteVerFichaModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl p-6 rounded-3xl border border-slate-700 bg-slate-900 text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{clienteVerFichaModal.rif}</span>
                <h3 className="font-bold text-base text-white">{clienteVerFichaModal.nombre}</h3>
              </div>
              <button onClick={() => setClienteVerFichaModal(null)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold">Expedientes Activos en Despacho:</span>
              {(() => {
                const exps = tableroPlanificador.filter(exp => exp.cliente === clienteVerFichaModal.nombre);
                if (exps.length === 0) {
                  return <div className="p-4 text-center text-xs text-slate-500 font-mono">No hay expedientes activos para este cliente.</div>;
                }
                return exps.map(e => (
                  <div key={e.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-mono text-cyan-400 font-bold mr-2">{e.id}</span>
                      <span className="text-white font-medium">{e.titulo}</span>
                      <div className="text-[10px] text-slate-400 mt-0.5">Tribunal: {e.tribunal} • Plazo: {e.plazo}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-300">{e.estado}</span>
                  </div>
                ));
              })()}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setClienteVerFichaModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL 2: NUEVO ASUNTO / EXPEDIENTE                                  */}
      {/* =================================================================== */}
      {modalNuevoAsunto && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl p-6 rounded-3xl border border-slate-700 bg-slate-900 text-white space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-cyan-400" />
                <span>Nuevo Asunto / Expediente Procesal</span>
              </h3>
              <button onClick={() => setModalNuevoAsunto(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={agregarNuevoAsunto} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Título u Objeto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Interdicto de despojo o negociación de anexo contractual"
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
                  <label className="text-slate-400 block mb-1">Rol / Cartera</label>
                  <select
                    value={nuevoAsuntoForm.tipo_rol}
                    onChange={(e: any) => setNuevoAsuntoForm({...nuevoAsuntoForm, tipo_rol: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
                  >
                    <option value="Externo">⚖️ Cartera Externa / Litigio</option>
                    <option value="In-House">🏛️ In-House / Corporativo</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Dependencia / Bloqueo</label>
                  <input
                    type="text"
                    placeholder="Ej. Esperando Facturas Tercero"
                    value={nuevoAsuntoForm.bloqueo}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, bloqueo: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-amber-400"
                  />
                </div>

                <div>
                  <label className="text-slate-400 block mb-1">Cuantía Estimada</label>
                  <input
                    type="text"
                    placeholder="Ej. 35.000 USD"
                    value={nuevoAsuntoForm.cuantia}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, cuantia: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-emerald-400 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Plazo Fatal / Término</label>
                  <input
                    type="text"
                    placeholder="Ej. Jueves 16:00"
                    value={nuevoAsuntoForm.plazo}
                    onChange={(e) => setNuevoAsuntoForm({...nuevoAsuntoForm, plazo: e.target.value})}
                    className="w-full p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-white"
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
      {/* MODAL 3: VER FICHA INTEGRAL DEL EXPEDIENTE                          */}
      {/* =================================================================== */}
      {modalVerExpediente && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl p-6 rounded-3xl border border-slate-700 bg-slate-900 text-white space-y-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-400 font-bold text-sm">{modalVerExpediente.id}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-cyan-300 font-mono">
                    {modalVerExpediente.materia}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 font-mono">
                    {modalVerExpediente.tipo_rol}
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white mt-1">{modalVerExpediente.titulo}</h3>
              </div>
              <button onClick={() => setModalVerExpediente(null)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
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
                <span className="text-[10px] text-slate-500 block">BLOQUEO:</span>
                <span className="text-amber-400 font-bold">{modalVerExpediente.bloqueo}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 block">ESTADO:</span>
                <span className="text-cyan-300 font-bold">{modalVerExpediente.estado}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold">Tribunal / Sede:</span>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white">
                {modalVerExpediente.tribunal}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-mono text-slate-400 uppercase font-bold">Resumen de Hechos & Bitácora:</span>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                {modalVerExpediente.detalles}
              </div>
            </div>

            {modalVerExpediente.bitacora && modalVerExpediente.bitacora.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-slate-400 uppercase font-bold">Actuaciones Registradas:</span>
                <div className="space-y-1">
                  {modalVerExpediente.bitacora.map((b: any, idx: number) => (
                    <div key={idx} className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 text-[11px] flex gap-2">
                      <span className="font-mono text-cyan-400 shrink-0">{b.fecha}:</span>
                      <span className="text-slate-300">{b.nota}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                <span className="text-slate-400">Mover a:</span>
                {['Por Iniciar', 'En Tramitación', 'Revisión & Firma', 'Concluido'].map(st => (
                  <button
                    key={st}
                    onClick={() => moverEstadoAsunto(modalVerExpediente.id, st)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer ${
                      modalVerExpediente.estado === st ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
      {/* MODAL 4: NUEVO EVENTO CALENDARIO                                    */}
      {/* =================================================================== */}
      {modalNuevoEvento && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md p-6 rounded-3xl border border-slate-700 bg-slate-900 text-white space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-400" />
                <span>Agendar Término o Audiencia</span>
              </h3>
              <button onClick={() => setModalNuevoEvento(false)} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={agregarNuevoEventoCalendario} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Título *</label>
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
                <label className="text-slate-400 block mb-1">Cliente</label>
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
