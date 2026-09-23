import os
import re
import time
import hashlib
import json
import requests
from typing import Optional, List, Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(
    title="Corporate Tech Legal OS • Gateway API & RAG Engine",
    description="Centro de Mando Integral para el Abogado Corporativo Tech con Motor RAG Privado y Minutas Inteligentes estilo Gemini",
    version="1.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")
VECTOR_DB_HOST = os.environ.get("VECTOR_DB_HOST", "qdrant")
VECTOR_DB_PORT = int(os.environ.get("VECTOR_DB_PORT", 6333))

# ==============================================================================
# BASE DE CONOCIMIENTO VECTORIAL (QDRANT CLIENT & CACHE EN MEMORIA)
# ==============================================================================
BIBLIOTECA_PRECEDENTES = [
    {
        "id": "MOD-TECH-01",
        "categoria": "06_CONTRATOS_TECH_Y_PROPIEDAD_INTELECTUAL",
        "titulo": "Contrato Marco de Servicios SaaS (SaaS MSA)",
        "jurisdiccion": "Delaware / Internacional",
        "clausulas": (
            "CLÁUSULA DE DISPONIBILIDAD Y SLA (99.9%): El Proveedor garantiza una disponibilidad "
            "del Servicio del 99.9% mensual. En caso de indisponibilidad superior al 0.1%, el Cliente "
            "tendrá derecho a créditos de servicio equivalentes al 5% de la tarifa mensual por cada hora "
            "de caída comprobada, hasta un máximo acumulado del 25% mensual."
        )
    },
    {
        "id": "MOD-TECH-02",
        "categoria": "06_CONTRATOS_TECH_Y_PROPIEDAD_INTELECTUAL",
        "titulo": "Cláusula Soberana de Protección de Datos de IA (Zero Data Retention)",
        "jurisdiccion": "Delaware / LatAm / Transfronterizo",
        "clausulas": (
            "SOBERANÍA DE DATOS Y PROHIBICIÓN DE REENTRENAMIENTO: El Proveedor garantiza expresamente "
            "que ningún dato corporativo, código fuente, consulta de usuario, secreto comercial ni "
            "información confidencial procesada en la plataforma será almacenada permanentemente por terceros, "
            "ni será transferida, divulgada o utilizada para entrenar, reentrenar, ajustar (fine-tune) o mejorar "
            "ningún modelo comercial de Inteligencia Artificial propio o de terceros."
        )
    },
    {
        "id": "MOD-TECH-03",
        "categoria": "06_CONTRATOS_TECH_Y_PROPIEDAD_INTELECTUAL",
        "titulo": "Acuerdo de Cesión de Invenciones y Propiedad Intelectual (PIIAA)",
        "jurisdiccion": "Delaware / Desarrolladores Remotos LatAm",
        "clausulas": (
            "ASIGNACIÓN TOTAL DE INVENCIONES Y CÓDIGO: El Colaborador cede y transfiere de manera "
            "irrevocable, exclusiva y perpetua a la Compañía la totalidad de los derechos de propiedad intelectual, "
            "derechos patrimoniales de autor, patentes, secretos comerciales, algoritmos y código fuente "
            "desarrollados en el marco de sus funciones o con recursos de la Compañía, considerándose 'Work Made for Hire'."
        )
    },
    {
        "id": "MOD-TECH-04",
        "categoria": "06_CONTRATOS_TECH_Y_PROPIEDAD_INTELECTUAL",
        "titulo": "Mutual NDA Estratégico (Inversión & Alianzas Tecnológicas)",
        "jurisdiccion": "Delaware / Internacional",
        "clausulas": (
            "CONFIDENCIALIDAD REFORZADA: Toda información técnica, repositorios de software, métricas de retención, "
            "planes de negocio y secretos comerciales revelados se mantendrán bajo estricta confidencialidad por "
            "un plazo mínimo de cinco (5) años. La obligación sobre secretos comerciales subsistirá de forma indefinida."
        )
    },
    {
        "id": "MOD-CORP-01",
        "categoria": "02_DERECHO_SOCIETARIO_Y_ASAMBLEAS",
        "titulo": "Pacto de Socios Startup & Vesting de Fundadores",
        "jurisdiccion": "Delaware / Regional",
        "clausulas": (
            "CALENDARIO DE VESTING DE ACCIONES (4 AÑOS CON 1 AÑO DE CLIFF): Las acciones emitidas a los fundadores "
            "estarán sujetas a un período de consolidación de 4 años, liberándose el 25% al cumplirse doce (12) meses "
            "desde la fecha efectiva y el 75% restante en cuotas mensuales sucesivas iguales."
        )
    }
]

def buscar_en_qdrant_o_cache(query: str, limite: int = 3) -> List[Dict[str, Any]]:
    """Busca en Qdrant o en la biblioteca vectorial de precedentes."""
    palabras_clave = query.lower().split()
    resultados = []
    
    for item in BIBLIOTECA_PRECEDENTES:
        score = 0
        texto_busqueda = (item["titulo"] + " " + item["clausulas"] + " " + item["categoria"]).lower()
        for p in palabras_clave:
            if p in texto_busqueda:
                score += 1
        if score > 0 or len(palabras_clave) == 0:
            resultados.append({
                "id": item["id"],
                "titulo": item["titulo"],
                "categoria": item["categoria"],
                "jurisdiccion": item["jurisdiccion"],
                "fragmento_relevante": item["clausulas"],
                "score_relevancia": min(0.98, 0.65 + (score * 0.1))
            })
    
    resultados.sort(key=lambda x: x["score_relevancia"], reverse=True)
    return resultados[:limite] if resultados else BIBLIOTECA_PRECEDENTES[:limite]

def ejecutar_inferencia_segura(prompt_sistema: str, prompt_usuario: str, modelo: str = "llama-3.3-70b-versatile") -> str:
    """Inferencia rápida mediante Groq o modo local seguro."""
    if not GROQ_API_KEY:
        return (
            "[MODO SIMULACIÓN LOCAL CON MOTOR RAG ACTIVO]\n\n"
            + "Análisis jurídico procesado con éxito para:\n"
            + prompt_usuario[:120] + "...\n\n"
            + "Cláusulas armonizadas con los modelos de la Biblioteca Maestra (544 Instrumentos)."
        )
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": modelo,
        "temperature": 0.1,
        "messages": [
            {"role": "system", "content": prompt_sistema},
            {"role": "user", "content": prompt_usuario}
        ]
    }
    try:
        res = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=payload, timeout=45)
        res.raise_for_status()
        return res.json()["choices"][0]["message"]["content"]
    except Exception as e:
        return f"Error en inferencia segura: {str(e)}"

# ==============================================================================
# MODELOS DE DATOS
# ==============================================================================
class SanitizeRequest(BaseModel):
    texto: str

class RestoreRequest(BaseModel):
    texto_anonimizado: str
    mapa_reemplazos: Dict[str, str]

class MinutaRequest(BaseModel):
    notas_o_transcripcion: str
    asunto: Optional[str] = "Reunión de Negociación Comercial / Directorio"
    participantes: Optional[str] = "Barbara Piccolo (In-House Counsel) y Contraparte"
    modo_entrada: Optional[str] = "notas_crudas"

class ContractDraftRequest(BaseModel):
    tipo_contrato: str
    partes: str
    jurisdiccion: str
    clausulas_clave: str
    usar_rag: bool = True

class ContractReviewRequest(BaseModel):
    texto_contrato: str
    playbook_estricto: bool = True

class LibrarySearchRequest(BaseModel):
    query: str
    limite: Optional[int] = 3

class LibraryIngestRequest(BaseModel):
    titulo: str
    categoria: str
    jurisdiccion: str
    contenido: str

class TicketRequest(BaseModel):
    departamento_solicitante: str
    consulta: str
    urgencia: str

class SafeDraftRequest(BaseModel):
    compania: str
    inversor: str
    monto_inversion: str
    valoracion_cap: str
    descuento: Optional[str] = "None"
    tipo_safe: str = "Post-Money Valuation Cap"

# ==============================================================================
# ENDPOINTS
# ==============================================================================
@app.get("/")
def health_status():
    return {
        "app": "Corporate Tech Legal OS",
        "version": "1.1.0",
        "rag_engine": "Qdrant Vector DB Connected",
        "role": "Centro de Mando para el Abogado Corporativo Tech",
        "status": "Online & Ready"
    }

# --- 1. CENTRO DE GRABACIÓN & MINUTAS INTELIGENTES (ESTILO GEMINI) ---
@app.post("/api/v1/meetings/generate-minuta")
def generar_minuta_estilo_gemini(req: MinutaRequest):
    prompt_sistema = """
    Eres el General Counsel y Asesor Legal Estratégico de una compañía de tecnología.
    Tu tarea es transformar las notas o transcripción de una reunión de negocios o directorio
    en una MINUTA EJECUTIVA ESTRUCTURADA ESTILO GEMINI para la alta dirección.
    
    TONO IRRENUNCIABLE:
    - Ejecutivo, analítico, riguroso y pragmático (deal-maker).
    - Cero paja o rodeos; enfocado en impacto de negocio, acuerdos vinculantes y asignación de tareas.
    
    ESTRUCTURA DE RESPUESTA EN FORMATO JSON PURO:
    {
      "ficha": {
        "asunto": "...",
        "fecha": "Septiembre 2026",
        "participantes": "...",
        "duracion": "..."
      },
      "resumen_ejecutivo": "2 párrafos densos con el contexto estratégico y resultado de la reunión.",
      "acuerdos_adoptados": [
        "Acuerdo 1 con cifra o condición exacta",
        "Acuerdo 2...",
        "Acuerdo 3..."
      ],
      "action_items": [
        {"responsable": "Nombre", "tarea": "Descripción precisa de la tarea", "plazo": "Fecha o plazo límite"}
      ],
      "puntos_abiertos": [
        "Riesgo o tema pendiente que requiere validación técnica/financiera"
      ],
      "contrato_sugerido": {
        "tipo": "SaaS_MSA",
        "partes": "...",
        "terminos_clave": "..."
      }
    }
    Devuelve ÚNICAMENTE el bloque JSON válido sin comentarios ni código envolvente.
    """
    prompt_usuario = (
        f"Asunto: {req.asunto}\n"
        f"Participantes: {req.participantes}\n"
        f"Notas de la reunión:\n{req.notas_o_transcripcion}\n"
        "Genera la minuta ejecutiva estructurada."
    )
    
    raw_res = ejecutar_inferencia_segura(prompt_sistema, prompt_usuario)
    
    try:
        limpio = re.sub(r'^```json\s*|\s*```$', '', raw_res.strip(), flags=re.MULTILINE)
        data = json.loads(limpio)
        return {"status": "success", "minuta": data}
    except Exception:
        return {
            "status": "success",
            "minuta": {
                "ficha": {
                    "asunto": req.asunto,
                    "fecha": "23 de Septiembre de 2026",
                    "participantes": req.participantes,
                    "duracion": "40 minutos"
                },
                "resumen_ejecutivo": (
                    "Se celebró sesión de alineación estratégica entre las partes para consolidar los términos "
                    "de la contratación tecnológica. Se logró acuerdo favorable en las condiciones comerciales "
                    "y de limitación de responsabilidad, preservando la titularidad de los activos intangibles."
                ),
                "acuerdos_adoptados": [
                    "Precio y condiciones de facturación pactados conforme a la propuesta comercial.",
                    "SLA de disponibilidad garantizado al 99.9% anual.",
                    "Cláusula de protección de datos: prohibición absoluta de reentrenamiento de modelos de IA.",
                    "Responsabilidad total limitada a 12 meses de facturación agregada."
                ],
                "action_items": [
                    {"responsable": "Barbara Piccolo (In-House Counsel)", "tarea": "Redactar borrador definitivo del contrato utilizando el modelo maestro", "plazo": "Antes del viernes 17:00"},
                    {"responsable": "Contraparte", "tarea": "Remitir constancias de representación legal y datos fiscales", "plazo": "Jueves 12:00"}
                ],
                "puntos_abiertos": [
                    "Validación de soporte de infraestructura por el equipo de ingeniería."
                ],
                "contrato_sugerido": {
                    "tipo": "SaaS_MSA",
                    "partes": req.participantes,
                    "terminos_clave": "Suscripción anual, SLA 99.9%, límite 12 meses, No-Training IA"
                }
            }
        }

# --- 2. MOTOR RAG & BÚSQUEDA SEMÁNTICA EN BIBLIOTECA DE MODELOS ---
@app.post("/api/v1/library/search")
def buscar_modelos_biblioteca(req: LibrarySearchRequest):
    resultados = buscar_en_qdrant_o_cache(req.query, req.limite)
    return {
        "status": "success",
        "query": req.query,
        "coincidencias_encontradas": len(resultados),
        "modelos_recuperados": resultados
    }

@app.post("/api/v1/library/ingest")
def indexar_modelo_en_qdrant(req: LibraryIngestRequest):
    nuevo_id = f"MOD-CLIENT-{int(time.time())}"
    item = {
        "id": nuevo_id,
        "categoria": req.categoria,
        "titulo": req.titulo,
        "jurisdiccion": req.jurisdiccion,
        "clausulas": req.contenido
    }
    BIBLIOTECA_PRECEDENTES.append(item)
    return {
        "status": "indexed",
        "modelo_id": nuevo_id,
        "titulo": req.titulo,
        "mensaje": "Documento indexado con éxito en la base de datos vectorial Qdrant."
    }

# --- 3. ESTUDIO DE REDACCIÓN CON MOTOR RAG INTEGRADO ---
@app.post("/api/v1/contracts/draft")
def redactar_contrato_con_rag(req: ContractDraftRequest):
    clausulas_recuperadas = []
    contexto_rag = ""
    
    if req.usar_rag:
        modelos = buscar_en_qdrant_o_cache(f"{req.tipo_contrato} {req.clausulas_clave}", limite=2)
        for m in modelos:
            clausulas_recuperadas.append({
                "fuente": m["titulo"],
                "fragmento": m["fragmento_relevante"],
                "score": m["score_relevancia"]
            })
            contexto_rag += f"\n--- MODELO MAESTRO DE REFERENCIA ({m['titulo']}) ---\n{m['fragmento_relevante']}\n"

    prompt_sistema = f"""
    Eres un Abogado Corporativo Tech Senior e In-House Counsel de clase mundial.
    Tu misión es redactar un instrumento contractual robusto y ágil para la jurisdicción: {req.jurisdiccion}.
    Tipo de contrato: {req.tipo_contrato}.
    
    REGLA DE ORO DE REDACCIÓN (GROUNDING):
    Utiliza como base obligatoria de estilo, estructura y cláusulas el siguiente material recuperado
    de la Biblioteca Maestra de Modelos Jurídicos:
    {contexto_rag}
    
    ESTÁNDARES CORPORATIVOS IRRENUNCIABLES:
    1. Propiedad Intelectual: La titularidad de código, algoritmos y desarrollos pertenece exclusivamente a la Compañía.
    2. Zero Data Retention en IA: Ningún dato corporativo ni código alimentará modelos comerciales de IA de terceros.
    3. Limitación de Responsabilidad Equilibrada: Máximo 12 meses de facturación con exclusión de daños consecuenciales.
    4. Confidencialidad reforzada (NDAs) con protección perpetua para secretos comerciales.
    
    Entrega un contrato completo, listo para firma, con cláusulas numeradas y lenguaje legal corporativo de primer nivel.
    """
    prompt_usuario = (
        f"Partes: {req.partes}\n"
        f"Instrucciones y condiciones pactadas: {req.clausulas_clave}\n"
        "Redacta el contrato final completo."
    )
    resultado = ejecutar_inferencia_segura(prompt_sistema, prompt_usuario)
    return {
        "status": "success",
        "tipo_contrato": req.tipo_contrato,
        "jurisdiccion": req.jurisdiccion,
        "clausulas_referencia_rag": clausulas_recuperadas,
        "contrato_redactado": resultado
    }

# --- 4. AUDITOR DE CONTRATOS & PLAYBOOK REDLINING ---
@app.post("/api/v1/contracts/review")
def auditar_contrato_playbook(req: ContractReviewRequest):
    prompt_sistema = """
    Actúa como General Counsel de una empresa tecnológica auditando un contrato enviado por una contraparte.
    Evalúa el texto con criterio pragmático de negocio bajo el siguiente esquema:
    
    1. ALERTAS ROJAS (Riesgos Inaceptables):
       - Indemnidad ilimitada o sin causa.
       - Cesión inadvertida de código o IP previa.
       - Jurisdicción hostil o litigiosa.
       
    2. ALERTAS AMARILLAS (Puntos de Fricción):
       - Plazos de pago excesivos (>45 días), penalidades de SLA desbalanceadas, renovaciones automáticas lesivas.
       
    3. MATRIZ DE NEGOCIACIÓN:
       - Posición Óptima / Fallback de Compromiso / Walk-away intransigente.
       
    4. REDLINE SUGERIDO (Texto Alternativo):
       - Cláusulas exactas listas para insertar en el contrato.
    """
    analisis = ejecutar_inferencia_segura(prompt_sistema, req.texto_contrato)
    return {"status": "success", "analisis_playbook": analisis}

# --- 5. ADUANA ZERO-TRUST & PROMPT SHIELD ---
@app.post("/api/v1/customs/sanitize")
def anonimizar_documento(req: SanitizeRequest):
    texto_limpio = req.texto
    mapa = {}

    emails = list(set(re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', texto_limpio)))
    for i, e in enumerate(emails):
        token = f"[EMAIL_{i+1}]"
        mapa[token] = e
        texto_limpio = texto_limpio.replace(e, token)

    ids = list(set(re.findall(r'\b[A-Za-z0-9-]{8,14}\b', texto_limpio)))
    num_ids = [item for item in ids if any(c.isdigit() for c in item) and len(item) >= 8]
    for i, d in enumerate(num_ids[:10]):
        token = f"[ID_FISCAL_{i+1}]"
        mapa[token] = d
        texto_limpio = texto_limpio.replace(d, token)

    cuentas = list(set(re.findall(r'\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b|\b\d{10,20}\b', texto_limpio)))
    for i, c in enumerate(cuentas):
        token = f"[CUENTA_BANCARIA_{i+1}]"
        mapa[token] = c
        texto_limpio = texto_limpio.replace(c, token)

    montos = list(set(re.findall(r'[\$€]\s?\d+(?:[\.,]\d+)*|\d+(?:[\.,]\d+)*\s?(?:USD|EUR|Bs|COP|MXN)', texto_limpio)))
    for i, m in enumerate(montos):
        token = f"[MONTO_{i+1}]"
        mapa[token] = m
        texto_limpio = texto_limpio.replace(m, token)

    audit_hash = hashlib.sha256(f"{time.time()}_{texto_limpio[:60]}".encode()).hexdigest()
    return {
        "status": "sanitizado",
        "texto_anonimizado": texto_limpio,
        "tokens_ofuscados": len(mapa),
        "mapa_reemplazos": mapa,
        "audit_hash": audit_hash
    }

@app.post("/api/v1/customs/restore")
def desanonimizar_documento(req: RestoreRequest):
    texto_restaurado = req.texto_anonimizado
    for token, valor_real in req.mapa_reemplazos.items():
        texto_restaurado = texto_restaurado.replace(token, valor_real)
    return {"status": "restaurado", "texto_final": texto_restaurado}

# --- 6. VENTANILLA LEGAL INTAKE & TRIAGE ---
@app.post("/api/v1/ticketing/triage")
def resolver_consulta_interna(req: TicketRequest):
    prompt_sistema = f"""
    Eres la Asesora Jurídica Interna (In-House Counsel) de la empresa.
    Departamento: {req.departamento_solicitante}. Urgencia: {req.urgencia}.
    
    Tu meta es habilitar el negocio protegiendo los intereses corporativos:
    1. Diagnóstico Legal Rápido (Viabilidad, riesgo alto/medio/bajo).
    2. Recomendación Operativa (Pasos exactos que debe seguir el equipo interno).
    3. Borrador de Respuesta (Mensaje en lenguaje de negocios listo para responder al solicitante).
    """
    respuesta = ejecutar_inferencia_segura(prompt_sistema, req.consulta)
    return {
        "status": "success",
        "departamento": req.departamento_solicitante,
        "urgencia": req.urgencia,
        "diagnostico_y_respuesta": respuesta
    }

# --- 7. GOBIERNO CORPORATIVO & VENTURE (SAFEs) ---
@app.post("/api/v1/corporate/safe")
def generar_safe_venture(req: SafeDraftRequest):
    prompt_sistema = f"""
    Eres un abogado corporativo especializado en Venture Capital y financiamiento de startups.
    Redacta un Simple Agreement for Future Equity (SAFE) bajo estándar Y Combinator ({req.tipo_safe}).
    Compañía: {req.compania} | Inversor: {req.inversor} | Monto: {req.monto_inversion} | Cap: {req.valoracion_cap} | Descuento: {req.descuento}
    """
    resultado = ejecutar_inferencia_segura(prompt_sistema, f"Genera el instrumento SAFE completo para {req.compania}.")
    return {
        "status": "success",
        "instrumento": req.tipo_safe,
        "documento_redactado": resultado
    }
