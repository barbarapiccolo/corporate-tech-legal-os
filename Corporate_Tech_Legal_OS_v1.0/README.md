# ⚖️ Corporate Tech Legal OS

> **Centro de Mando Integral y Sistema Operativo para el Abogado Corporativo Tech, In-House Counsel y Especialistas en Legal Operations.**  
> *Diseñado para acelerar negocios tecnológicos, proteger secretos comerciales y gobernar el uso de IA con rigor corporativo.*

---

## 🎯 Visión y Propósito

El **Corporate Tech Legal OS** es una infraestructura de trabajo privada y soberana diseñada específicamente para el **abogado que lidera o asesora empresas de base tecnológica, startups y corporaciones en la era digital**. 

A diferencia de los enfoques regulatorios burocráticos o locales, este centro de mando sitúa al abogado en el rol de **habilitador estratégico del negocio**: acelerando contratos comerciales (SaaS, alianzas), protegiendo la titularidad del código y los activos intangibles, y permitiendo consultar a cualquier modelo de Inteligencia Artificial sin exponer jamás datos confidenciales ni secretos comerciales a nubes públicas.

---

## 🏛️ Módulos Funcionales del Centro de Mando

### 1. 📊 Centro de Operaciones (Cockpit Legal Tech)
* Panorama diario de asuntos prioritarios clasificados por impacto en el negocio.
* KPIs operativos: tiempo de ciclo de contratos (<24h), volumen de pipeline comercial facilitado, horas ahorradas y balance in-house vs. bufetes externos.
* Panel de entidades societarias y filiales internacionales (Delaware C-Corp / LLC, filiales operativas regionales y contratistas remotos).

### 2. 📝 Estudio de Contratación Tech & SaaS
* Generador guiado de instrumentos estándar de la industria tecnológica:
  * **SaaS Master Services Agreement (MSA)** con SLA de alta disponibilidad.
  * **Mutual NDA Estratégico** para rondas de inversión, fusiones y alianzas comerciales.
  * **PIIAA (Proprietary Information and Inventions Agreement)** para cesión de código fuente por desarrolladores.
  * **Contratos de Contratista Remoto Internacional** con soporte para formalidades transfronterizas.
  * **AI Data Protection & No-Training Terms**: cláusulas que prohíben explícitamente el reentrenamiento de modelos comerciales con datos o código corporativo.
* Flexibilidad de jurisdicción (Delaware / EE.UU., Hispanoamérica / Regional, y Arbitraje Internacional).

### 3. 🔍 Auditor de Contratos & Playbook Redlining
* Auditoría automática de borradores contractuales recibidos de clientes enterprise o proveedores.
* **Semáforo de riesgos**:
  * *Alertas Rojas*: indemnidad ilimitada, cesión encubierta de código o IP previa, fueros hostiles.
  * *Alertas Amarillas*: plazos de pago mayores a 45 días, renovaciones automáticas lesivas, exclusividades.
* Matriz de posición de negociación (Posición Óptima, Fallback Aceptable y Walk-away).
* Generador de **Redline listo para copiar**: texto alternativo con cláusulas de reemplazo inmediatas.

### 4. 🛡️ Aduana Zero-Trust & Prompt Shield (Anonimización Bidireccional)
* **Paso 1 (Sanitización en memoria)**: Ofusca en memoria local identificaciones fiscales (SSN, EIN, RIF, RUT, RFC, DNI), cuentas bancarias, montos confidenciales, nombres y correos antes de consultar al LLM.
* **Paso 2 (Desanonimización / Re-identification)**: Toma la respuesta generada por la IA y reinserta con precisión los datos reales originales para entregar el instrumento listo.
* Cero retención y trazabilidad forense sellada con Hash SHA-256.

### 5. 🎙️ De Reunión a Instrumento Legal (Meeting-to-Contract)
* Procesador de notas o transcripciones de llamadas comerciales, juntas de directorio o comités ejecutivos.
* Extracción estructurada: Resumen ejecutivo, Términos comerciales acordados, Matriz de compromisos (Action Items: Quién, Qué y Plazo).
* **Conversión en 1 Clic**: Transfiere los términos acordados directamente al Estudio de Contratos para emitir el borrador preliminar sin pérdida de tiempo.

### 6. 💬 Ventanilla Legal Intake & Triage
* Canal de recepción y priorización de dudas operativas provenientes de Ventas, Producto/TI, RRHH y Finanzas.
* Diagnóstico legal rápido + recomendación práctica de negocio + borrador de mensaje claro y sin tecnicismos innecesarios listo para enviar al empleado.

### 7. 🏢 Gobierno Corporativo, SAFEs & Venture Capital
* Generador de acuerdos **SAFE** bajo estándar Y Combinator (Post-Money Valuation Cap y Descuento).
* Actas de Asambleas de Accionistas y Resoluciones de Directorio (*Unanimous Written Consent*).
* Checklist preventivo de Due Diligence para auditorías de inversión o M&A.

### 8. 🔒 Blindaje de Software, Código & Activos de IA
* Control de cesión de invenciones de programadores (100% cobertura PIIAA).
* Escáner de dependencias y licencias *open source* virales (prevención de GPL/AGPL en código privativo).
* Cláusulas de titularidad sobre datasets, prompts y outputs generados con IA.

### 9. 📈 Legal Ops & Demostración de Retorno (ROI)
* Tablero financiero para reportar al Directorio o inversores el retorno tangible de la función legal in-house frente a los costes de minutas de despachos externos.

---

## 🚀 Despliegue en 1 Clic con Docker

### Requisitos
* Docker y Docker Compose instalados.
* Clave API de [Groq](https://console.groq.com) (o tu proveedor LLM compatible).

### Pasos
```bash
# 1. Copiar variables de entorno
cp .env.example .env
# Edita .env y coloca tu GROQ_API_KEY

# 2. Desplegar los servicios
bash deploy.sh
```

### Accesos Locales
* 📊 **Dashboard Next.js:** `http://localhost:3000`
* ⚙️ **Gateway Swagger API:** `http://localhost:8000/docs`
* 🧠 **Qdrant Vector DB:** `http://localhost:6333/dashboard`

---

## 📦 Cómo Publicar en un Nuevo Repositorio de GitHub

Para subir este centro de mando a un nuevo repositorio independiente en GitHub:

```bash
# 1. En la carpeta raíz del proyecto:
git init
git add .
git commit -m "feat: Lanzamiento inicial de Corporate Tech Legal OS v1.0"

# 2. Conectar con tu nuevo repositorio en GitHub:
git branch -M main
git remote add origin https://github.com/TU_USUARIO/corporate-tech-legal-os.git

# 3. Subir el código:
git push -u origin main
```

---

© 2026 Corporate Tech Legal OS. Desarrollado para la práctica legal tecnológica de vanguardia.
