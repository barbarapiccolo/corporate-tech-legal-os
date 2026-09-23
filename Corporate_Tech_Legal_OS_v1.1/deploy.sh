#!/bin/bash
set -e

echo "================================================================="
echo "   CORPORATE TECH LEGAL OS • Despliegue Automatizado (Docker)    "
echo "        In-House Counsel & Tech Legal Operations Cockpit        "
echo "================================================================="

if [ ! -f .env ]; then
  echo "⚠️ Archivo .env no encontrado. Generando a partir de .env.example..."
  cp .env.example .env
  echo "ℹ️ Recuerda configurar tu GROQ_API_KEY en .env para inferencia LLM en vivo."
fi

echo "🚀 Construyendo y levantando servicios en Docker..."
docker compose down || true
docker compose up -d --build

echo ""
echo "✅ ¡Despliegue completado con éxito!"
echo "-----------------------------------------------------------------"
echo "📊 Dashboard Tech Counsel: http://localhost:3000"
echo "⚙️ Gateway API (Swagger):  http://localhost:8000/docs"
echo "🧠 Qdrant Vector DB:       http://localhost:6333/dashboard"
echo "-----------------------------------------------------------------"
