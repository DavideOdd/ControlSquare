# Dockerfile per Control Square
# Multi-stage build per ottimizzare dimensione immagine

# Stage 1: Builder
FROM node:18-alpine AS builder

# Imposta working directory
WORKDIR /app

# Copia package files
COPY package*.json ./

# Installa dipendenze
RUN npm ci --only=production

# Stage 2: Production
FROM node:18-alpine

# Installa dumb-init per gestione corretta dei segnali
RUN apk add --no-cache dumb-init

# Crea utente non-root per sicurezza
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Imposta working directory
WORKDIR /app

# Copia dipendenze da builder
COPY --from=builder --chown=nodejs:nodejs /app/node_modules ./node_modules

# Copia file applicazione
COPY --chown=nodejs:nodejs . .

# Cambia a utente non-root
USER nodejs

# Esponi porta
EXPOSE 3000

# Healthcheck per verificare che il server risponda
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/', (r) => {if(r.statusCode !== 200) throw new Error(r.statusCode)})"

# Usa dumb-init per gestione corretta dei segnali
ENTRYPOINT ["dumb-init", "--"]

# Comando di avvio
CMD ["node", "server.js"]
