# Offizielles Node.js-Image verwenden
FROM node:18

# Arbeitsverzeichnis im Container
WORKDIR /app

# Backend-Dateien kopieren
COPY backend/ ./backend/

# Abhängigkeiten installieren
WORKDIR /app/backend
RUN npm install

# Port freigeben
EXPOSE 3000

# Server starten
CMD ["node", "server.js"]
