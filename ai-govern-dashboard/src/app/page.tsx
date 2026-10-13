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
// 1. CATÁLOGO MAESTRO DE MODELOS JURÍDICOS (DE TU GOOGLE SHEET DRIVE)
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
// 2. DATOS INICIALES DEL DESPACHO
// =====================================================================
const MOCK_TABLERO = [
  { 
    id: "EXP-01", 
    titulo: "Revisión notas del registrador sobre compraventa Turmero", 
    cliente: "Auxiliadora Inmuebles", 
    tipo_rol: "Externo",
    materia: "Inmobiliario", 
    responsable: "Barbara Piccolo", 
    plazo: "Hoy 16:00", 
    prioridad: "Crítica", 
    estado: "Por Iniciar",
    bloqueo: "Revisión Jurídica",
    bloqueo_tipo: "interno",
    cuantia: "45.000 USD",
    tribunal: "Registro Inmobiliario / SAREN",
    detalles: "Revisión previa de cláusula de compensación de cheque bancario antes del visado definitivo con INPRE.",
    bitacora: [
      { fecha: "13/10/2026", nota: "Recepción de notas preliminares del abogado revisor del registro." }
    ]
  },
  { 
    id: "EXP-02", 
    titulo: "Redacción final de Contrato SaaS Enterprise y DPA", 
    cliente: "Kodevant Corp", 
    tipo_rol: "In-House",
    materia: "LegalTech", 
    responsable: "Barbara Piccolo", 
    plazo: "Viernes 17:00", 
    prioridad: "Alta", 
    estado: "En Tramitación",
    bloqueo: "En Curso",
    bloqueo_tipo: "ninguno",
    cuantia: "60.000 EUR/año",
    tribunal: "Sede Corporativa Madrid / Caracas",
    detalles: "Cláusula de confidencialidad de modelos de IA y no divulgación de secretos comerciales.",
    bitacora: [
      { fecha: "10/10/2026", nota: "Primer borrador aprobado con salvaguarda de propiedad intelectual." }
    ]
  },
  { 
    id: "EXP-03", 
    titulo: "Poder Especial para Venta Inmobiliaria y Sucesoral", 
    cliente: "Ana Bianca Reyes", 
    tipo_rol: "Externo",
    materia: "Notarial", 
    responsable: "Barbara Piccolo", 
    plazo: "Miércoles 11:30", 
    prioridad: "Alta", 
    estado: "Por Iniciar",
    bloqueo: "Recaudos Pendientes",
    bloqueo_tipo: "externo",
    cuantia: "20.000 USD",
    tribunal: "Notaría Pública Segunda",
    detalles: "Conexión con modelo POD-03 de la biblioteca. Falta cédula del apoderado.",
    bitacora: [
      { fecha: "12/10/2026", nota: "Solicitud de fotos de cédula y solvencia municipal por WhatsApp." }
    ]
  }
];

const MOCK_CLIENTES = [
  { 
    id: 1, 
    nombre: "Auxiliadora Inmuebles", 
    rif: "J-40192834-0", 
    tipo: "Inmobiliario", 
    contacto: "Auxiliadora", 
    email: "inmuebles@auxiliadora.com", 
    telefono: "+58 414-906-XXXX", 
    expedientesActivos: 2, 
    estado: "Activo",
    direccion: "Caracas / Guayana",
    notas: "Cliente habitual de compraventas, poderes y trámites registrales SAREN."
  },
  { 
    id: 2, 
    nombre: "Ana Bianca Reyes", 
    rif: "V-6.055.603", 
    tipo: "Persona Natural", 
    contacto: "Ana Reyes", 
    email: "ana.reyes@gmail.com", 
    telefono: "+58 412-334-XXXX", 
    expedientesActivos: 1, 
    estado: "Activo",
    direccion: "Turmero, Estado Aragua",
    notas: "Compradora en venta de parcela C-13 Las Cayenas."
  },
  { 
    id: 3, 
    nombre: "Kodevant Corp", 
    rif: "J-50291823-1", 
    tipo: "LegalTech & Software", 
    contacto: "Director General", 
    email: "legal@kodevant.com", 
    telefono: "+34 612-445-XXX", 
    expedientesActivos: 1, 
    estado: "Activo",
    direccion: "Madrid / Miami",
    notas: "Consultoría estratégica en gobernanza de IA y contratos SaaS."
  }
];

const MOCK_CALENDARIO = [
  { id: "E-01", dia: 14, mes: "Octubre", tipo: "Registro", titulo: "Revisión Previa Documento Venta", exp: "EXP-01", lugar: "Registro Inmobiliario", hora: "09:00 AM" },
  { id: "E-02", dia: 16, mes: "Octubre", tipo: "Notaría", titulo: "Firma y Visado de Poder Especial", exp: "EXP-03", lugar: "Notaría Pública", hora: "11:30 AM" },
  { id: "E-03", dia: 17, mes: "Octubre", tipo: "Comité", titulo: "Sesión Consultoría LegalTech", exp: "EXP-02", lugar: "Videollamada", hora: "04:00 PM" }
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
  
  // Pestañas Activas
  const [activeTab, setActiveTab] = useState<string>('chat_ia');

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

    setTimeout(() => {
      const respuestaIA = {
        emisor: "ia",
        texto: "Entendido, Bárbara. He procesado tu solicitud protegiendo los datos confidenciales con el filtro Zero-Trust. Basado en la normativa civil y mercantil aplicable, la vía jurídica más sólida es estructurar el instrumento previendo la cláusula de salvaguarda y el visado colegiado con tu INPRE. Si deseas, puedo redactar de inmediato el borrador para Word o el mensaje explicativo para el cliente en WhatsApp."
      };
      setChats(prev => prev.map(c => c.id === activeChatId ? { ...c, mensajes: [...c.mensajes, respuestaIA] } : c));
      setChatCargando(false);
    }, 900);
  };

  // Estado del Redactor de Mensajes de WhatsApp & Email
  const [destinatarioMsg, setDestinatarioMsg] = useState("cliente_confianza");
  const [tonoMsg, setTonoMsg] = useState("cercano");
  const [instruccionMsg, setInstruccionMsg] = useState("");
  const [capturaWhatsappAdjunta, setCapturaWhatsappAdjunta] = useState<string | null>(null);
  const [mensajeGenerado, setMensajeGenerado] = useState("");
  const [mensajeCopiado, setMensajeCopiado] = useState(false);

  const handleGenerarMensaje = () => {
    if (!instruccionMsg.trim() && !capturaWhatsappAdjunta) return;

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

  // Estado del Redactor de Instrumentos con Catálogo Maestro y Desglosador
  const [busquedaModelo, setBusquedaModelo] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("Todas");
  const [codigoModeloSeleccionado, setCodigoModeloSeleccionado] = useState(CATALOGO_MODELOS[2].codigo);
  
  const modeloActual = CATALOGO_MODELOS.find(m => m.codigo === codigoModeloSeleccionado) || CATALOGO_MODELOS[0];
  const categoriasDisponibles = ["Todas", ...Array.from(new Set(CATALOGO_MODELOS.map(m => m.categoria)))];

  const modelosFiltrados = CATALOGO_MODELOS.filter(m => {
    const coincideCat = categoriaFiltro === "Todas" || m.categoria === categoriaFiltro;
    const coincideTexto = busquedaModelo === "" || 
      m.titulo.toLowerCase().includes(busquedaModelo.toLowerCase()) || 
      m.codigo.toLowerCase().includes(busquedaModelo.toLowerCase()) ||
      m.variables.toLowerCase().includes(busquedaModelo.toLowerCase());
    return coincideCat && coincideTexto;
  });

  // Estado del Desglosador de Partes & Recaudos
  const [recaudosAdjuntos, setRecaudosAdjuntos] = useState<string[]>([]);
  const [datosBrutosWhatsApp, setDatosBrutosWhatsApp] = useState("");
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

  const [instrumentoGenerado, setInstrumentoGenerado] = useState("");
  const [instrumentoCopiado, setInstrumentoCopiado] = useState(false);

  const handleDesglosarRecaudosAutomatico = () => {
    alert("Recaudos y datos de identidad analizados con éxito. Las partes y condiciones se han estructurado automáticamente.");
  };

  const handleGenerarInstrumento = () => {
    const textoDoc = `DOCUMENTO DE ${modeloActual.titulo.toUpperCase()} CON VISADO LEGAL\n\n` +
      `Yo, ${desglosePartes.otorganteNombre}, venezolana, mayor de edad, ${desglosePartes.otorganteEstadoCivil}, de este domicilio y titular de la Cédula de Identidad N° ${desglosePartes.otorganteCedula} (RIF: ${desglosePartes.otorganteRif}), por medio del presente documento declaro: Otorgo formal ${modeloActual.titulo.toLowerCase()} a favor de la ciudadana ${desglosePartes.adquirienteNombre}, venezolana, mayor de edad, ${desglosePartes.adquirienteEstadoCivil}, titular de la Cédula de Identidad N° ${desglosePartes.adquirienteCedula}.\n\n` +
      `CLÁUSULA PRIMERA (DEL OBJETO Y DETERMINACIÓN): En lo relativo al inmueble ${desglosePartes.inmuebleDescripcion}, alinderado de la siguiente forma: ${desglosePartes.inmuebleLinderos}, Catastro: ${desglosePartes.inmuebleCatastro}.\n\n` +
      `CLÁUSULA SEGUNDA (DEL PRECIO Y COMPENSACIÓN): La presente operación se pacta por la suma de ${desglosePartes.condicionPrecio}, pagaderos mediante ${desglosePartes.condicionFormaPago}.\n\n` +
      `CLÁUSULA TERCERA (FUNDAMENTO LEGAL APLICABLE): De conformidad con lo estipulado en ${modeloActual.fundamento}.\n\n` +
      `DOCUMENTO REDACTADO Y VISADO POR:\n` +
      `BARBARA ISABEL PICCOLO OBALDO\n` +
      `Abogada en ejercicio inscrita en el Instituto de Previsión Social del Abogado\n` +
      `IPSA N° 102.485 • INPRE N° 115.794 • Colegio de Abogados de Venezuela`;
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

  // Estados originales del Planificador, CRM, Calendario, Grabador y Métricas
  const [tableroPlanificador, setTableroPlanificador] = useState(MOCK_TABLERO);
  const [filtroMateria, setFiltroMateria] = useState("Todas");
  const [filtroPrioridad, setFiltroPrioridad] = useState("Todas");
  const [modalNuevoAsunto, setModalNuevoAsunto] = useState(false);
  const [nuevoAsunto, setNuevoAsunto] = useState({
    titulo: "", cliente: "", materia: "Inmobiliario", plazo: "Esta Semana", prioridad: "Alta", cuantia: "", tribunal: "", detalles: ""
  });

  const [clientes, setClientes] = useState(MOCK_CLIENTES);
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [clienteSeleccionadoModal, setClienteSeleccionadoModal] = useState<any | null>(null);

  const [eventosCalendario, setEventosCalendario] = useState(MOCK_CALENDARIO);
  const [mesActual, setMesActual] = useState("Octubre 2026");

  const [grabandoAudio, setGrabandoAudio] = useState(false);
  const [tiempoGrabacion, setTiempoGrabacion] = useState(0);
  const [transcripcionEnVivo, setTranscripcionEnVivo] = useState(
    "Reunión iniciada con Directores de Operaciones. Se acuerda revisar cláusula de indemnidad y preparar borrador de resolución para el martes a las 16:00."
  );
  const [compromisosExtraidos, setCompromisosExtraidos] = useState([
    { tarea: "Elaborar documento resolutivo y remitir al Planificador", resp: "Barbara Piccolo", plazo: "Mañana 16:00", prioridad: "Crítica" },
    { tarea: "Notificar formalmente a los accionistas", resp: "Secretaría Legal", plazo: "Viernes", prioridad: "Alta" }
  ]);


  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans transition-colors duration-200 ${
      isDark ? 'bg-[#080c14] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>

      {/* =================================================================== */}
      {/* 1. BARRA LATERAL (DESKTOP)                                          */}
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

        {/* Menú de Navegación Vertical */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-medium">
          
          {/* SECCIÓN 1: INTELIGENCIA JURÍDICA */}
          <div className="space-y-1.5">
            {sidebarOpen && (
              <span className="px-2.5 text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider block mb-1">
                Inteligencia Jurídica
              </span>
            )}

            {[
              { id: 'chat_ia', label: 'Consultor Jurídico IA', icon: Bot, badge: 'Chat' },
              { id: 'redactor_mensajes', label: 'Mensajes WhatsApp', icon: MessageCircle, badge: 'WhatsApp' },
              { id: 'redactor_documentos', label: 'Redactor de Instrumentos', icon: FileCode, badge: '500+ Modelos' },
              { id: 'analizador_documentos', label: 'Analizador de PDFs', icon: GitCompare, badge: 'Recaudos' }
            ].map(item => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
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

          {/* SECCIÓN 2: GESTIÓN OPERATIVA DEL DESPACHO */}
          <div className="space-y-1.5 pt-2 border-t border-slate-800/40">
            {sidebarOpen && (
              <span className="px-2.5 text-[10px] font-mono uppercase text-slate-400 font-bold tracking-wider block mb-1">
                Gestión del Despacho
              </span>
            )}

            {[
              { id: 'planificador', label: 'Gestor de Tareas & Asuntos', icon: CheckSquare },
              { id: 'crm', label: 'Clientes & Expedientes', icon: Users },
              { id: 'calendario', label: 'Calendario Procesal', icon: Calendar },
              { id: 'actas_minutas', label: 'Grabador & Minutas', icon: Mic },
              { id: 'metricas', label: 'Métricas del Despacho', icon: BarChart3 }
            ].map(item => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
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
      {/* 2. ÁREA DE CONTENIDO PRINCIPAL                                      */}
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
                 activeTab === 'actas_minutas' ? 'Grabador de Minutas' :
                 activeTab.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Privacidad Zero-Trust Activa</span>
            </div>

            <button
              onClick={() => setTheme(isDark ? 'light' : 'dark')}
              className="p-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </header>

        {/* Contenedor Scroll */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-6 md:p-8 pb-24 md:pb-8 space-y-4 md:space-y-6">

          {/* =============================================================== */}
          {/* VISTA 1: CONSULTOR JURÍDICO IA (TIPO GEMINI CON HISTORIAL)     */}
          {/* =============================================================== */}
          {activeTab === 'chat_ia' && (
            <div className="h-[calc(100vh-140px)] flex gap-4 max-w-6xl mx-auto">
              
              {/* Historial Lateral tipo Gemini */}
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
          {/* VISTA 2: REDACTOR DE MENSAJES (WHATSAPP CON SUBIDA DE CAPTURA) */}
          {/* =============================================================== */}
          {activeTab === 'redactor_mensajes' && (
            <div className="max-w-4xl mx-auto space-y-6">
              
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-emerald-400" /> Redactor de Mensajes para WhatsApp & Email
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Sube una captura de WhatsApp o dicta lo que necesitas decir. La IA lee el contexto y redacta la respuesta en tu propio tono.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Panel de Configuración */}
                <div className="p-4 sm:p-5 rounded-2xl border border-slate-800/80 bg-[#0b0f19] space-y-4">
                  
                  {/* Subida de Captura de WhatsApp */}
                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-bold">1. Captura de WhatsApp (Opcional)</label>
                    <div 
                      onClick={() => setCapturaWhatsappAdjunta("captura_chat_auxiliadora.jpg")}
                      className="p-3 rounded-xl border border-dashed border-slate-800 hover:border-emerald-500/50 bg-slate-900 text-center cursor-pointer transition flex items-center justify-center gap-2"
                    >
                      <Camera className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs text-slate-300">
                        {capturaWhatsappAdjunta ? `Adjunta: ${capturaWhatsappAdjunta}` : "Toca para adjuntar captura del chat"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-bold">2. ¿A quién le escribes?</label>
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
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-bold">3. Tono del Mensaje</label>
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
                    <label className="text-xs font-mono uppercase text-slate-400 block mb-1.5 font-bold">4. ¿Qué necesitas decirle? (Dicta o escribe)</label>
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

                {/* Panel de Salida */}
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
          {/* VISTA 3: REDACTOR CON CATÁLOGO MAESTRO DE 500+ MODELOS          */}
          {/* =============================================================== */}
          {activeTab === 'redactor_documentos' && (
            <div className="max-w-6xl mx-auto space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                    <FileCode className="w-6 h-6 text-cyan-400" /> Redactor con Catálogo Maestro de Modelos
                  </h1>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Conectado a tu biblioteca de Google Drive (544+ modelos clasificados).
                  </p>
                </div>

                <a 
                  href="https://drive.google.com/drive/folders/1xHuhO7x1zL7Ll3-0J0s59Td2LBentREF" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 text-cyan-300 text-xs font-mono flex items-center gap-1.5 hover:bg-slate-800 self-start sm:self-auto"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>Ver Carpeta en Drive</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>

              {/* Selector y Buscador del Catálogo Maestro */}
              <div className="p-4 sm:p-5 rounded-2xl border border-slate-800 bg-[#0b0f19] space-y-4">
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {/* Buscador */}
                  <div className="flex-1 relative">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={busquedaModelo}
                      onChange={e => setBusquedaModelo(e.target.value)}
                      placeholder="Buscar entre los 544 modelos (ej. venta inmueble, poder sucesoral, acta constitución, LOTTT)..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  {/* Filtro por Categoría */}
                  <select
                    value={categoriaFiltro}
                    onChange={e => setCategoriaFiltro(e.target.value)}
                    className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                  >
                    {categoriasDisponibles.map((cat, idx) => (
                      <option key={idx} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Lista de Modelos Disponibles */}
                <div className="max-h-40 overflow-y-auto divide-y divide-slate-800/60 rounded-xl border border-slate-800 bg-slate-950/60">
                  {modelosFiltrados.map(m => (
                    <button
                      key={m.codigo}
                      onClick={() => setCodigoModeloSeleccionado(m.codigo)}
                      className={`w-full text-left p-2.5 text-xs flex items-center justify-between transition cursor-pointer ${
                        codigoModeloSeleccionado === m.codigo
                          ? 'bg-cyan-500/20 text-cyan-300 font-bold'
                          : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 shrink-0">{m.codigo}</span>
                        <span className="truncate">{m.titulo}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2 hidden sm:inline">{m.categoria}</span>
                    </button>
                  ))}
                </div>

                {/* Ficha de Requisitos del Modelo Seleccionado */}
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-cyan-400 uppercase font-mono text-[11px] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      {modeloActual.codigo} — {modeloActual.titulo}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{modeloActual.fundamento}</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    <strong className="text-cyan-300">Variables Clave requeridas:</strong> {modeloActual.variables}
                  </p>
                </div>

              </div>

              {/* Asistente de Carga de Datos & Desglosador de Partes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                
                {/* Entrada de Datos de WhatsApp o Fotos */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-[#0b0f19] space-y-4">
                  <span className="text-xs font-mono uppercase text-slate-400 font-bold block">
                    Carga de Recaudos (Fotos de Cédula, RIF o Datos de WhatsApp)
                  </span>

                  <div 
                    onClick={() => setRecaudosAdjuntos(["cedula_comprador.jpg", "cedula_vendedora.jpg", "titulo_inmueble.pdf"])}
                    className="p-3 rounded-xl border border-dashed border-slate-800 hover:border-cyan-500/50 bg-slate-900 text-center cursor-pointer transition flex items-center justify-center gap-2"
                  >
                    <Paperclip className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-slate-300">
                      {recaudosAdjuntos.length > 0 ? `Archivos adjuntos: ${recaudosAdjuntos.join(", ")}` : "Toca para adjuntar fotos de Cédulas, RIF o documento previo"}
                    </span>
                  </div>

                  <textarea
                    rows={4}
                    value={datosBrutosWhatsApp}
                    onChange={e => setDatosBrutosWhatsApp(e.target.value)}
                    placeholder="Pega aquí el texto que te enviaron por WhatsApp con los nombres, cédulas, precio y forma de pago..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                  />

                  <button
                    onClick={handleDesglosarRecaudosAutomatico}
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 font-bold text-xs uppercase tracking-wider transition border border-cyan-500/30 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Desglosar Partes y Condiciones Automáticamente</span>
                  </button>

                  {/* Ficha Resumen de Partes Desglosadas */}
                  <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] space-y-2 font-mono">
                    <span className="text-cyan-400 font-bold block uppercase text-[10px]">Ficha de Partes Estructuradas:</span>
                    <div className="grid grid-cols-2 gap-2 text-slate-300">
                      <div>
                        <strong className="text-slate-400 block">Parte Otorgante:</strong>
                        <input 
                          type="text" 
                          value={desglosePartes.otorganteNombre}
                          onChange={e => setDesglosePartes({...desglosePartes, otorganteNombre: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[10px] text-white mt-0.5"
                        />
                      </div>
                      <div>
                        <strong className="text-slate-400 block">Cédula / RIF:</strong>
                        <input 
                          type="text" 
                          value={desglosePartes.otorganteCedula}
                          onChange={e => setDesglosePartes({...desglosePartes, otorganteCedula: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[10px] text-white mt-0.5"
                        />
                      </div>
                      <div>
                        <strong className="text-slate-400 block">Parte Adquiriente:</strong>
                        <input 
                          type="text" 
                          value={desglosePartes.adquirienteNombre}
                          onChange={e => setDesglosePartes({...desglosePartes, adquirienteNombre: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[10px] text-white mt-0.5"
                        />
                      </div>
                      <div>
                        <strong className="text-slate-400 block">Cédula / RIF:</strong>
                        <input 
                          type="text" 
                          value={desglosePartes.adquirienteCedula}
                          onChange={e => setDesglosePartes({...desglosePartes, adquirienteCedula: e.target.value})}
                          className="w-full bg-slate-950 border border-slate-800 rounded px-2 py-1 text-[10px] text-white mt-0.5"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerarInstrumento}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition shadow-lg cursor-pointer"
                  >
                    Generar Instrumento Jurídico con Visado
                  </button>

                </div>

                {/* Vista Previa del Documento con Visado */}
                <div className="p-5 rounded-2xl border border-slate-800 bg-[#0b0f19] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                      <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Instrumento Listo para Notaría / SAREN</span>
                      {instrumentoGenerado && (
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(instrumentoGenerado);
                            setInstrumentoCopiado(true);
                            setTimeout(() => setInstrumentoCopiado(false), 2000);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs flex items-center gap-1 font-bold hover:bg-slate-700 cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>{instrumentoCopiado ? "¡Copiado!" : "Copiar"}</span>
                        </button>
                      )}
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 font-mono text-[11px] text-slate-300 leading-relaxed max-h-[360px] overflow-y-auto whitespace-pre-line">
                      {instrumentoGenerado || "Selecciona cualquier modelo del catálogo maestro, completa los datos de las partes y genera el documento formal con tu visado..."}
                    </div>
                  </div>

                  {instrumentoGenerado && (
                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-2">
                      <button
                        onClick={() => alert("Documento descargado en formato Word (.docx) listo para imprimir y firmar.")}
                        className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer"
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
          {/* VISTA 4: ANALIZADOR & PREPARADOR DE RECAUDOS                    */}
          {/* =============================================================== */}
          {activeTab === 'analizador_documentos' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <GitCompare className="w-6 h-6 text-purple-400" /> Analizador y Extractor de Recaudos
                </h1>
                <p className="text-xs text-slate-400 mt-1">
                  Sube PDFs de CamScanner o títulos de propiedad para desglosar partes, linderos y condiciones directamente para redactar.
                </p>
              </div>

              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-800 hover:border-cyan-500/50 bg-[#0b0f19] text-center space-y-3 transition">
                <FileUp className="w-10 h-10 text-cyan-400 mx-auto" />
                <div>
                  <span className="font-bold text-sm text-white block">Selecciona o arrastra los archivos PDF / Fotos</span>
                  <span className="text-xs text-slate-500 mt-0.5 block">Soporta múltiples archivos de CamScanner, contratos previos o fotos</span>
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

              {archivosAnalisis.length > 0 && (
                <div className="p-5 rounded-2xl border border-slate-800 bg-[#0b0f19] space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-mono uppercase text-slate-400 font-bold">Archivos Cargados ({archivosAnalisis.length})</span>
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
                    {archivosAnalisis.length > 1 ? "¿Cumplen el Mismo Objetivo Legal? (Cotejar)" : "Desglosar Partes y Condiciones"}
                  </button>
                </div>
              )}

              {resultadoAnalisis && (
                <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-950/20 space-y-3">
                  <span className="text-xs font-mono uppercase text-purple-300 font-bold block">Resultado del Desglose</span>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-mono whitespace-pre-line">
                    {resultadoAnalisis}
                  </div>
                  <button
                    onClick={() => setActiveTab('redactor_documentos')}
                    className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                  >
                    <span>Pasar datos desglosados al Redactor de Instrumentos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* =============================================================== */}
          {/* VISTAS RESTAURADAS COMPLETAS (PLANIFICADOR, CRM, CALENDARIO...)  */}
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
            <div className="space-y-6 max-w-5xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-slate-800/40">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-emerald-400" /> Rendimiento & FinOps Legal
                  </h1>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Cuantificación de valor generado, contingencias prevenidas y retorno de la dirección letrada.
                  </p>
                </div>

                <button
                  onClick={descargarInformeEjecutivoSemanal}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" /> Descargar Informe de Gestión (.doc)
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Valor Desbloqueado</span>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">{metricasDespacho.valor_aportado_usd}</div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Riesgo Prevenido</span>
                  <div className="text-2xl font-extrabold text-cyan-400 font-mono mt-1">{metricasDespacho.contingencias_ahorradas_usd}</div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Facturación Mes</span>
                  <div className="text-2xl font-extrabold text-purple-400 font-mono mt-1">{metricasDespacho.facturacion_mes_usd}</div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-900">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">Ciclo Contractual</span>
                  <div className="text-xs font-bold text-amber-400 font-mono mt-2">18h vs 5 días (-82%)</div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* =================================================================== */}
      {/* 3. MENÚ DESLIZABLE PARA TELÉFONOS (DRAWER MÓVIL)                    */}
      {/* =================================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-950/80 backdrop-blur-md flex animate-in fade-in duration-200">
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
                  { id: 'planificador', label: 'Gestor de Tareas & Asuntos', icon: CheckSquare },
                  { id: 'crm', label: 'Clientes & Expedientes', icon: Users },
                  { id: 'calendario', label: 'Calendario Procesal', icon: Calendar },
                  { id: 'actas_minutas', label: 'Grabador & Minutas', icon: Mic },
                  { id: 'metricas', label: 'Métricas del Despacho', icon: BarChart3 }
                ].map(item => {
                  const Icon = item.icon;
                  const active = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { setActiveTab(item.id); setMobileMenuOpen(false); }}
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
          { id: 'redactor_documentos', label: 'Modelos', icon: FileCode },
          { id: 'redactor_mensajes', label: 'WhatsApp', icon: MessageCircle },
          { id: 'chat_ia', label: 'Consultor', icon: Bot },
          { id: 'planificador', label: 'Tareas', icon: CheckSquare }
        ].map(item => {
          const Icon = item.icon;
          const active = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
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
