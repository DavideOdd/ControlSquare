# 🚀 Guida al Deployment di Control Square

Questa guida fornisce istruzioni dettagliate per deployare Control Square su diverse piattaforme.

## 📋 Indice

- [Prerequisiti](#prerequisiti)
- [Deploy con Docker](#deploy-con-docker)
- [Deploy su Render](#deploy-su-render)
- [Deploy su Railway](#deploy-su-railway)
- [Deploy su Heroku](#deploy-su-heroku)
- [Deploy su VPS](#deploy-su-vps)
- [Configurazione HTTPS](#configurazione-https)
- [Monitoraggio](#monitoraggio)

## Prerequisiti

Prima di iniziare, assicurati di avere:

- ✅ Account GitHub (per CI/CD automatico)
- ✅ Node.js >= 14.0.0 (per sviluppo locale)
- ✅ Docker (opzionale, per containerizzazione)
- ✅ Git installato

## Deploy con Docker

### Opzione 1: Docker standalone

```bash
# 1. Clona il repository
git clone https://github.com/your-username/ControlSquare.git
cd ControlSquare

# 2. Copia il file di esempio delle variabili d'ambiente
cp .env.example .env

# 3. Modifica .env con le tue configurazioni
nano .env  # o usa il tuo editor preferito

# 4. Build dell'immagine Docker
docker build -t control-square .

# 5. Run del container
docker run -d \
  --name control-square \
  -p 3000:3000 \
  --env-file .env \
  --restart unless-stopped \
  control-square

# 6. Verifica che sia running
docker ps
docker logs control-square
```

### Opzione 2: Docker Compose

```bash
# 1. Clona e configura come sopra
git clone https://github.com/your-username/ControlSquare.git
cd ControlSquare
cp .env.example .env

# 2. Avvia con docker-compose
docker-compose up -d

# 3. Verifica
docker-compose ps
docker-compose logs -f
```

### Comandi utili Docker

```bash
# Stop container
docker stop control-square

# Start container
docker start control-square

# Riavvia container
docker restart control-square

# Visualizza logs
docker logs -f control-square

# Entra nel container
docker exec -it control-square sh

# Rimuovi container
docker rm -f control-square

# Rimuovi immagine
docker rmi control-square

# Rebuild e restart
docker-compose down
docker-compose up -d --build
```

## Deploy su Render

### Deploy Automatico con render.yaml (Consigliato)

1. **Push su GitHub**
   ```bash
   git add .
   git commit -m "Setup for Render deployment"
   git push origin main
   ```

2. **Connetti a Render**
   - Vai su [render.com](https://render.com)
   - Dashboard → New → Web Service
   - Connetti il tuo repository GitHub
   - Render rileverà automaticamente `render.yaml`
   - Click "Create Web Service"

3. **Deploy Automatico**
   - Render builderà e deployerà automaticamente
   - Ogni push a `main` triggera un nuovo deploy
   - URL: `https://your-app.onrender.com`

### Deploy Manuale

1. **Crea Web Service**
   - Dashboard → New → Web Service
   - Seleziona repository

2. **Configurazione**
   - Name: `control-square`
   - Environment: `Node`
   - Region: `Frankfurt` (o la tua preferita)
   - Branch: `main`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=3000
   WS_HEARTBEAT_INTERVAL=30000
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Attendi il build e deploy

### Troubleshooting Render

**Problema: Build fallisce**
```bash
# Verifica che package.json abbia engines specificati
"engines": {
  "node": ">=14.0.0"
}
```

**Problema: WebSocket non funziona**
- Assicurati di usare `wss://` invece di `ws://` nel client
- Render supporta WebSocket nativamente, nessuna configurazione extra

## Deploy su Railway

### Deploy con railway.json (Consigliato)

1. **Push su GitHub**
   ```bash
   git add .
   git commit -m "Setup for Railway deployment"
   git push origin main
   ```

2. **Connetti a Railway**
   - Vai su [railway.app](https://railway.app)
   - New Project → Deploy from GitHub repo
   - Seleziona il repository
   - Railway rileverà automaticamente `railway.json`

3. **Generate Domain**
   - Settings → Generate Domain
   - URL: `https://your-app.up.railway.app`

4. **Variables (opzionale)**
   - Variables tab
   - Aggiungi variabili custom se necessario

### Deploy con Railway CLI

```bash
# 1. Installa Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Init progetto
railway init

# 4. Deploy
railway up

# 5. Ottieni URL
railway open
```

## Deploy su Heroku

```bash
# 1. Installa Heroku CLI
npm install -g heroku

# 2. Login
heroku login

# 3. Crea app
heroku create control-square-app

# 4. Configura environment
heroku config:set NODE_ENV=production
heroku config:set WS_HEARTBEAT_INTERVAL=30000

# 5. Deploy
git push heroku main

# 6. Apri app
heroku open

# 7. Visualizza logs
heroku logs --tail
```

### Troubleshooting Heroku

**Problema: Port binding error**
```javascript
// Assicurati che server.js usi process.env.PORT
const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => { ... });
```

**Problema: WebSocket disconnessioni**
```bash
# Aumenta timeout
heroku config:set WS_HEARTBEAT_INTERVAL=60000
```

## Deploy su VPS (DigitalOcean, AWS, Linode, etc.)

### Setup Completo con PM2 e Nginx

```bash
# 1. SSH nel server
ssh root@your-server-ip

# 2. Installa Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Installa PM2
sudo npm install -g pm2

# 4. Crea utente app
sudo useradd -m -s /bin/bash controlsquare

# 5. Clone repository
sudo -u controlsquare git clone https://github.com/your-username/ControlSquare.git /home/controlsquare/app
cd /home/controlsquare/app

# 6. Installa dipendenze
sudo -u controlsquare npm install

# 7. Configura environment
sudo -u controlsquare cp .env.example .env
sudo -u controlsquare nano .env

# 8. Avvia con PM2
sudo -u controlsquare pm2 start server.js --name control-square

# 9. Configura PM2 per auto-start
sudo -u controlsquare pm2 save
sudo -u controlsquare pm2 startup

# 10. Installa Nginx
sudo apt-get install -y nginx

# 11. Configura Nginx
sudo nano /etc/nginx/sites-available/control-square
```

**Configurazione Nginx:**

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # WebSocket support
        proxy_read_timeout 86400;
    }
}
```

```bash
# 12. Abilita sito
sudo ln -s /etc/nginx/sites-available/control-square /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 13. Firewall
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## Configurazione HTTPS

### Con Let's Encrypt (Consigliato)

```bash
# 1. Installa Certbot
sudo apt-get install certbot python3-certbot-nginx

# 2. Ottieni certificato SSL
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# 3. Auto-renewal (già configurato da certbot)
sudo certbot renew --dry-run
```

### Con SSL Personalizzato

```javascript
// server.js
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync(process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(process.env.SSL_CERT_PATH)
};

const server = https.createServer(options, app);
```

## Monitoraggio

### PM2 Monitoring

```bash
# Dashboard
pm2 monit

# Logs
pm2 logs control-square

# Status
pm2 status

# Restart
pm2 restart control-square

# Reload (zero downtime)
pm2 reload control-square
```

### Docker Monitoring

```bash
# Stats in tempo reale
docker stats control-square

# Logs
docker logs -f control-square

# Healthcheck
docker inspect --format='{{.State.Health.Status}}' control-square
```

### Uptime Monitoring

Configura un servizio di monitoraggio esterno:

- [UptimeRobot](https://uptimerobot.com) - Free, ping ogni 5 minuti
- [Pingdom](https://www.pingdom.com) - Monitoring avanzato
- [StatusCake](https://www.statuscake.com) - Free tier disponibile

**Healthcheck Endpoint**: `GET /`

## GitHub Actions CI/CD

Il progetto include GitHub Actions configurato in `.github/workflows/ci-cd.yml`:

### Cosa fa automaticamente:

- ✅ **Test**: Verifica sintassi su ogni push/PR
- 🐳 **Docker Build**: Build e test immagine Docker
- 🔒 **Security**: Scan vulnerabilità con npm audit
- 🚀 **Deploy**: Trigger deploy in produzione (su main/master)

### Configurare Deploy Hook

#### Per Render:

1. Render Dashboard → Settings → Deploy Hook
2. Copia l'URL del webhook
3. GitHub repository → Settings → Secrets
4. New secret: `RENDER_DEPLOY_HOOK` = URL copiato
5. Decommenta la sezione deploy in `ci-cd.yml`

#### Per Railway:

1. Installa Railway GitHub App
2. Deploy automatico già configurato

## Backup e Restore

### Backup Configurazione

```javascript
// Nel controller, usa "Export Config"
// Salva il file JSON scaricato
```

### Backup Scene

```javascript
// Le scene sono salvate in localStorage
// Per backup, esporta da Developer Tools:
localStorage.getItem('scenes')
```

## Troubleshooting Generale

### Server non si avvia

```bash
# Verifica porta disponibile
sudo lsof -i :3000

# Cambia porta
PORT=3001 npm start
```

### WebSocket disconnessioni frequenti

```bash
# Aumenta heartbeat interval
WS_HEARTBEAT_INTERVAL=60000 npm start
```

### Performance issues

```bash
# Usa PM2 con cluster mode
pm2 start server.js -i max
```

### Memory leaks

```bash
# Monitor con PM2
pm2 monit

# Restart se necessario
pm2 restart control-square
```

## Best Practices

1. **Usa sempre HTTPS in produzione**
2. **Configura monitoring e alerting**
3. **Setup backup automatici**
4. **Test deployment in staging prima**
5. **Usa variabili d'ambiente per configurazione**
6. **Enable logging appropriato**
7. **Monitor performance e risorse**
8. **Pianifica strategie di scaling**

## Risorse

- [Render Documentation](https://render.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Docker Documentation](https://docs.docker.com)
- [PM2 Documentation](https://pm2.keymetrics.io/docs)
- [Nginx Documentation](https://nginx.org/en/docs)
- [Let's Encrypt Documentation](https://letsencrypt.org/docs)

## Supporto

Per problemi di deployment:

1. Controlla i logs del servizio
2. Verifica variabili d'ambiente
3. Testa localmente con Docker
4. Apri issue su GitHub con dettagli del problema

---

Buon deployment! 🚀
