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
    title="Corporate Tech Legal OS • Gateway API",
    description="Centro de Mando Integral para el Abogado Corporativo Tech, In-House Counsel & Legal Ops",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_API_KEY = os.environ.get("GROQ_API_KEY", "")

def ejecutar_inferencia_segura(prompt_sistema: str, prompt_usuario: str, modelo: str = "llama-3.3-70b-versatile") -> str:
    """Ejecuta inferencia segura a través de Groq o fallback offline de contingencia."""
    if not GROQ_API_KEY:
        return (
            "[MODO SIMULACIÓN LOCAL - CONFIGURA GROQ_API_KEY EN .env]\n\n"
            f"Análisis legal corporativo procesado con éxito para:\n{prompt_usuario[:120]}...\n\n"
            "Dictamen preliminar: Cláusulas validadas conforme a estándares corporativos de tecnología "
            "y mejores prácticas de contratación internacional (Delaware / Tech Best Practices)."
        )
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": modelo,
        "temperature": 0.15,
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

class ContractDraftRequest(BaseModel):
    tipo_contrato: str  # SaaS_MSA, NDA_Estrategico, PIIAA_IP, Contratista_Remoto, AI_Data_Licensing, SLA
    partes: str
    jurisdiccion: str   # Delaware (EE.UU.), LatAm / Regional, Transfronterizo Bilingüe
    clausulas_clave: str

class ContractReviewRequest(BaseModel):
    texto_contrato: str
    playbook_estricto: bool = True

class MeetingExtractRequest(BaseModel):
    notas_o_transcripcion: str
    contexto: Optional[str] = "Reunión de Negociación Comercial / Directorio"

class SafeDraftRequest(BaseModel):
    compania: str
    inversor: str
    monto_inversion: str
    valoracion_cap: str
    descuento: Optional[str] = "None"
    tipo_safe: str = "Post-Money Valuation Cap"

class TicketRequest(BaseModel):
    departamento_solicitante: str  # Ventas, TI / Producto, RRHH, Finanzas, Operaciones
    consulta: str
    urgencia: str                  # Alta, Media, Baja

# ==============================================================================
# ENDPOINTS
# ==============================================================================
@app.get("/")
def health_status():
    return {
        "app": "Corporate Tech Legal OS",
        "role": "Centro de Mando para el Abogado Corporativo Tech & In-House Counsel",
        "security": "Zero-Trust Local Memory Sanitization",
        "status": "Online & Ready"
    }

# --- 1. ADUANA ZERO-TRUST & PROMPT SHIELD (ANONIMIZACIÓN BIDIRECCIONAL) ---
@app.post("/api/v1/customs/sanitize")
def anonimizar_documento(req: SanitizeRequest):
    texto_limpio = req.texto
    mapa = {}

    # 1. Emails corporativos y personales
    emails = list(set(re.findall(r'[\w\.-]+@[\w\.-]+\.\w+', texto_limpio)))
    for i, e in enumerate(emails):
        token = f"[EMAIL_{i+1}]"
        mapa[token] = e
        texto_limpio = texto_limpio.replace(e, token)

    # 2. Identificaciones Fiscales y Personales (SSN, EIN, RIF, RUT, RFC, DNI, CIF)
    ids = list(set(re.findall(r'\b[A-Za-z0-9-]{8,14}\b', texto_limpio)))
    # Filtrar solo secuencias con números para evitar palabras comunes
    num_ids = [item for item in ids if any(c.isdigit() for c in item) and len(item) >= 8]
    for i, d in enumerate(num_ids[:10]):
        token = f"[ID_FISCAL_{i+1}]"
        mapa[token] = d
        texto_limpio = texto_limpio.replace(d, token)

    # 3. Cuentas bancarias e IBANs / Routing Numbers
    cuentas = list(set(re.findall(r'\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b|\b\d{10,20}\b', texto_limpio)))
    for i, c in enumerate(cuentas):
        token = f"[CUENTA_BANCARIA_{i+1}]"
        mapa[token] = c
        texto_limpio = texto_limpio.replace(c, token)

    # 4. Cifras financieras y montos
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
    """Restaura los datos reales sobre la respuesta devuelta por la IA."""
    texto_restaurado = req.texto_anonimizado
    for token, valor_real in req.mapa_reemplazos.items():
        texto_restaurado = texto_restaurado.replace(token, valor_real)
    return {
        "status": "restaurado",
        "texto_final": texto_restaurado
    }

# --- 2. ESTUDIO DE CONTRATACIÓN TECH ---
@app.post("/api/v1/contracts/draft")
def redactar_contrato_tech(req: ContractDraftRequest):
    prompt_sistema = f"""
    Eres un Abogado Corporativo Tech Senior e In-House Counsel experto en tecnología, SaaS y venture capital.
    Tu misión es redactar un instrumento contractual blindado, ágil y de nivel internacional para la jurisdicción: {req.jurisdiccion}.
    Tipo de contrato: {req.tipo_contrato}.
    
    Estándares irrenunciables:
    - Asignación total de Propiedad Intelectual, código fuente y creaciones derivadas a la empresa.
    - Cláusula de protección de datos de IA: Prohibición estricta de utilizar datos, código o secretos de la empresa para reentrenar o ajustar modelos de terceros.
    - Limitación de responsabilidad equilibrada (máximo 12 meses de tarifas pagadas) con exclusión razonable de daños indirectos o consecuenciales.
    - Acuerdos de confidencialidad estrictos con supervivencias de 3 a 5 años (o indefinido para secretos comerciales).
    - Mecanismos de terminación por conveniencia o incumplimiento con plazos claros.
    
    Entrega un contrato profesional, cláusulas numeradas, estructura clara y lenguaje jurídico directo listo para firma.
    """
    prompt_usuario = f"Partes: {req.partes}\nInstrucciones y acuerdos específicos: {req.clausulas_clave}\nRedacta el contrato completo."
    resultado = ejecutar_inferencia_segura(prompt_sistema, prompt_usuario)
    return {
        "status": "success",
        "tipo_contrato": req.tipo_contrato,
        "jurisdiccion": req.jurisdiccion,
        "contrato_redactado": resultado
    }

# --- 3. AUDITOR DE CONTRATOS & PLAYBOOK REDLINING ---
@app.post("/api/v1/contracts/review")
def auditar_contrato_playbook(req: ContractReviewRequest):
    prompt_sistema = """
    Actúa como General Counsel de una empresa tecnológica auditando un contrato enviado por una contraparte (cliente enterprise, proveedor o inversor).
    Evalúa el texto con criterio pragmático de negocio y rigor técnico bajo el siguiente esquema:
    
    1. ALERTAS ROJAS (Riesgos Críticos e Inaceptables):
       - Cláusulas de indemnidad ilimitada o sin causa justificada.
       - Cesión inadvertida de código fuente, algoritmos o IP previa.
       - Jurisdicciones hostiles o foros litigiosos desproporcionados.
       - Cláusulas de exclusividad o no competencia abusivas.
       
    2. ALERTAS AMARILLAS (Puntos de Fricción Comercial):
       - Plazos de pago excesivos (>45 días), penalidades de SLA no balanceadas, renovaciones automáticas sin notificación previa.
       
    3. MATRIZ DE NEGOCIACIÓN:
       - Posición Óptima de la Empresa.
       - Cláusula de Compromiso Sugerida (Fallback).
       - Línea Roja (Walk-away).
       
    4. REDLINE SUGERIDO (Texto Alternativo):
       - Redacta la cláusula de reemplazo exacta lista para insertar en el contrato.
    """
    analisis = ejecutar_inferencia_segura(prompt_sistema, req.texto_contrato)
    return {
        "status": "success",
        "analisis_playbook": analisis
    }

# --- 4. DE REUNIÓN A INSTRUMENTO LEGAL (MEETING-TO-CONTRACT) ---
@app.post("/api/v1/meetings/extract")
def extraer_acuerdos_reunion(req: MeetingExtractRequest):
    prompt_sistema = """
    Eres el In-House Counsel de la empresa. Analiza las notas o transcripción de la reunión comercial o corporativa y sintetiza:
    1. Resumen Ejecutivo (Contexto, participantes y objetivo).
    2. Términos Comerciales y Jurídicos Acordados (Precios, plazos, SLA, entregables, responsabilidades).
    3. Matriz de Tareas y Compromisos (Action Items: Responsable, Tarea, Fecha Límite).
    4. Estructura del Contrato Requerido (Tipo de instrumento recomendado, partes y cláusulas especiales a incluir).
    """
    sintesis = ejecutar_inferencia_segura(prompt_sistema, req.notas_o_transcripcion)
    return {
        "status": "success",
        "sintesis_reunion": sintesis
    }

# --- 5. VENTANILLA LEGAL INTAKE & TRIAGE ---
@app.post("/api/v1/ticketing/triage")
def resolver_consulta_interna(req: TicketRequest):
    prompt_sistema = f"""
    Eres la Asesora Jurídica Interna (In-House Counsel) de la empresa. El departamento de {req.departamento_solicitante} envía una consulta operativa con urgencia {req.urgencia}.
    Tu meta no es ser un cuello de botella, sino habilitar el negocio protegiendo los intereses corporativos.
    
    Proporciona:
    1. Diagnóstico Legal Rápido (Viabilidad, riesgos potenciales y semáforo verde/amarillo/rojo).
    2. Recomendación Operativa (Pasos exactos que debe seguir el equipo interno).
    3. Borrador de Respuesta (Mensaje claro, cordial y en lenguaje de negocios listo para responder al solicitante).
    """
    respuesta = ejecutar_inferencia_segura(prompt_sistema, req.consulta)
    return {
        "status": "success",
        "departamento": req.departamento_solicitante,
        "urgencia": req.urgencia,
        "diagnostico_y_respuesta": respuesta
    }

# --- 6. GOBIERNO CORPORATIVO & VENTURE (SAFEs & ASAMBLEAS) ---
@app.post("/api/v1/corporate/safe")
def generar_safe_venture(req: SafeDraftRequest):
    prompt_sistema = f"""
    Eres un abogado corporativo especializado en Venture Capital y financiamiento de startups tecnológicas.
    Redacta un Simple Agreement for Future Equity (SAFE) bajo estándar internacional estilo Y Combinator ({req.tipo_safe}).
    Compañía: {req.compania}
    Inversor: {req.inversor}
    Monto de Inversión: {req.monto_inversion}
    Post-Money Valuation Cap: {req.valoracion_cap}
    Discount: {req.descuento}
    
    Incluye cláusulas completas de eventos de liquidez, disolución, conversión en ronda calificada (Equity Financing) y representaciones y garantías habituales.
    """
    resultado = ejecutar_inferencia_segura(prompt_sistema, f"Genera el instrumento SAFE completo para {req.compania}.")
    return {
        "status": "success",
        "instrumento": req.tipo_safe,
        "documento_redactado": resultado
    }
