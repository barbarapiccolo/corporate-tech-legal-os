# ⚖️ Corporate Tech Legal OS (v1.1)

> **Centro de Mando Integral y Sistema Operativo para el Abogado Corporativo Tech, In-House Counsel y Legal Operations.**  
> *Impulsado por un Motor RAG Privado en Qdrant y Centro de Minutas Inteligentes estilo Gemini.*

---

## 🎯 Visión y Propósito

El **Corporate Tech Legal OS** es una infraestructura privada diseñada para el **abogado que lidera o asesora empresas de base tecnológica, startups y corporaciones**.

Este sistema sitúa al abogado en el rol de **habilitador estratégico del negocio**: acelerando contratos comerciales (SaaS, alianzas), protegiendo la titularidad del código y los activos intangibles, registrando minutas de negociación ejecutivas y utilizando su propia biblioteca de precedentes mediante un **Motor RAG Privado en Qdrant** para garantizar cero alucinaciones y estricta fidelidad letrada.

---

## 🏛️ Módulos Funcionales Clave

### 1. 🎙️ Centro de Grabación & Minutas Inteligentes (Estilo Gemini)
* **3 Modos de Entrada**: Apuntes rápidos / notas crudas de la llamada, carga de archivos de audio (MP3, WAV, M4A, notas de WhatsApp) o grabación directa por micrófono de sala.
* **Minuta Ejecutiva Estructurada**:
  1. *Ficha del Encuentro*: Título, fecha, asistentes y roles.
  2. *Resumen Ejecutivo (Executive Summary)*: Contexto estratégico y acuerdos principales.
  3. *Acuerdos & Decisiones Adoptadas*: Lista de compromisos vinculantes (precios, plazos, SLA, condiciones legales).
  4. *Matriz de Compromisos & Tareas (Action Items)*: Asignación clara de tareas (Quién, Qué, Plazo límite) con casillas interactivas de seguimiento.
  5. *Puntos Abiertos & Riesgos Pendientes*: Aspectos técnicos o comerciales a validar antes de la firma.
* **Disparo Directo a Contrato**: Botón para convertir automáticamente los acuerdos de la reunión en un contrato listo en el Estudio Contractual mediante RAG.

### 2. 🧠 Biblioteca & Motor RAG Qdrant (Precedentes Vectoriales)
* Almacén vectorial privado montado sobre Qdrant (`qdrant:v1.9.0`) que indexa la biblioteca de modelos jurídicos (544 instrumentos).
* **Búsqueda Semántica**: Encuentra cláusulas exactas (SLA 99.9%, cesión de código de devs, No-Training en IA, vesting de fundadores) por conceptos, no por palabras clave rígidas.
* **Grounding Letrado**: Cuando se redacta un contrato, el sistema inyecta las cláusulas maestras de la biblioteca como referencia obligatoria para el LLM.
* **Script de Ingesta (`scripts/ingest_library.py`)**: Permite a cualquier empresa cliente indexar sus propios contratos históricos y modelos para adaptar el sistema a sus estándares en minutos.

### 3. 📝 Estudio de Contratación Tech & SaaS (con RAG)
* Redacción asistida de SaaS MSAs, Mutual NDAs estratégicos, acuerdos PIIAA para desarrolladores, contratos de contratistas remotos internacionales y términos de protección de datos de IA.
* Indicador en vivo de las cláusulas y modelos recuperados de Qdrant utilizados en el borrador.
* Soporte para jurisdicción Delaware, marcos hispanoamericanos y arbitraje comercial internacional.

### 4. 🔍 Auditor de Contratos & Playbook Redlining
* Auditoría automática de borradores enviados por contrapartes.
* Semáforo de riesgos: Alertas Rojas (indemnidades ilimitadas, cesión encubierta de código, foros lejanos) y Alertas Amarillas (plazos de pago, exclusividades).
* Matriz de negociación corporativa (*Posición Óptima*, *Fallback* y *Línea Roja/Walk-Away*).
* Redlines listos para copiar y pegar con texto de reemplazo balanceado.

### 5. 🛡️ Aduana Zero-Trust & Prompt Shield (Anonimización Bidireccional)
* Sanitiza en memoria identificaciones fiscales (SSN, EIN, RIF, RUT, RFC), cuentas bancarias, montos confidenciales, nombres y correos antes de enviar cualquier consulta al LLM.
* Desanonimiza y restaura con precisión los datos reales en la respuesta final devuelta por la IA.
* Trazabilidad forense sellada con Hash SHA-256.

### 6. 🔒 Blindaje de Software, Código & Activos de IA
* Matriz de acuerdos PIIAA de programadores y contratistas remotos.
* Escáner preventivo de licencias *open source* virales (prevención de GPL/AGPL en repositorios privativos).
* Titularidad sobre prompts, datasets y creaciones derivadas de IA.

### 7. 📈 Legal Ops & Demostración de Retorno (ROI)
* Métricas financieras de ahorro acumulado en minutas externas y aceleración de ciclos de cierre (&lt; 24h).

---

## 🚀 Despliegue en 1 Clic con Docker

```bash
# 1. Configurar variables de entorno
cp .env.example .env
# Edita .env y coloca tu GROQ_API_KEY

# 2. Desplegar los servicios
bash deploy.sh

# 3. (Opcional) Indexar modelos base en Qdrant
python3 scripts/ingest_library.py
```

### Puertos Locales
* 📊 **Dashboard Next.js:** `http://localhost:3000`
* ⚙️ **Gateway Swagger API:** `http://localhost:8000/docs`
* 🧠 **Qdrant Vector DB:** `http://localhost:6333/dashboard`

---

© 2026 Corporate Tech Legal OS.
