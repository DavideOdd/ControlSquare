# 🚀 Deploy Online IMMEDIATO - Control Square

## ⚡ Opzione 1: Render (CONSIGLIATO - 100% Gratuito)

### Passo 1: Crea Account Render
1. Vai su **https://render.com**
2. Clicca su **"Get Started"**
3. Registrati con GitHub (consigliato) o email

### Passo 2: Connetti Repository
1. Nella dashboard Render, clicca su **"New +"** → **"Web Service"**
2. Clicca su **"Connect account"** per GitHub se non l'hai già fatto
3. Cerca e seleziona il repository **"ControlSquare"**
4. Clicca su **"Connect"**

### Passo 3: Configura il Deploy (AUTO-CONFIGURATO!)
Render rileverà automaticamente il file `render.yaml` e configurerà tutto.

**Verifica che le impostazioni siano:**
- **Name:** `control-square` (o il nome che preferisci)
- **Environment:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Plan:** `Free`

### Passo 4: Deploy!
1. Clicca su **"Create Web Service"**
2. Render inizierà automaticamente il build
3. Dopo 2-3 minuti vedrai **"Live"** in verde
4. Clicca sull'URL fornito (tipo `https://control-square-xxxx.onrender.com`)

### ✅ FATTO! Il tuo server è ONLINE!

Accedi all'app:
- **Controller:** `https://tuo-url.onrender.com/controller`
- **Display:** `https://tuo-url.onrender.com/display`

---

## ⚡ Opzione 2: Railway (Alternativa Gratuita)

### Passo 1: Crea Account Railway
1. Vai su **https://railway.app**
2. Clicca su **"Login"**
3. Registrati con GitHub

### Passo 2: Nuovo Progetto
1. Dashboard → **"New Project"**
2. Seleziona **"Deploy from GitHub repo"**
3. Cerca e seleziona **"ControlSquare"**
4. Clicca sul repository

### Passo 3: Deploy Automatico
Railway rileverà automaticamente `railway.json` e Node.js:
- Farà automaticamente `npm install`
- Avvierà con `npm start`

### Passo 4: Genera URL Pubblico
1. Vai su **Settings** del tuo servizio
2. Clicca su **"Generate Domain"**
3. Copia l'URL (tipo `https://control-square.up.railway.app`)

### ✅ FATTO! Server online!

---

## ⚡ Opzione 3: Vercel (Deploy Ultra-Veloce)

### Prerequisiti
Il progetto necessita di una piccola modifica per Vercel (che preferisce serverless).

### Deploy con Vercel CLI
```bash
# Installa Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Segui il wizard interattivo
# Scegli il progetto, conferma le impostazioni
# URL sarà fornito automaticamente
```

---

## 📱 Cosa fare DOPO il Deploy

### 1. Testa il Server
Apri l'URL fornito nel browser - dovresti vedere la pagina del controller.

### 2. Connetti i Display
Su ogni dispositivo che vuoi usare come display:
1. Apri `https://tuo-url/display`
2. Il display si registrerà automaticamente
3. Apparirà nel controller

### 3. Controlla i Display
1. Apri `https://tuo-url/controller` sul tuo PC/tablet
2. Vedrai tutti i display connessi
3. Seleziona colori e controlla!

### 4. Share con Altri
Condividi l'URL:
- **Controller:** Solo a chi deve controllare
- **Display:** A chiunque possa fornire uno schermo

---

## 🔧 Configurazioni Avanzate (Opzionale)

### Variabili d'Ambiente su Render
1. Dashboard → tuo servizio → **"Environment"**
2. Aggiungi variabili:
   ```
   NODE_ENV=production
   WS_HEARTBEAT_INTERVAL=30000
   ```

### Custom Domain
1. **Render:** Settings → Custom Domains → Aggiungi dominio
2. **Railway:** Settings → Domains → Add Custom Domain

### Monitoraggio
- **Render:** Dashboard → Logs (logs in tempo reale)
- **Railway:** Observability → Metrics e Logs

---

## ⚠️ Note Importanti

### Free Tier Limits
**Render Free:**
- ✅ 750 ore/mese (sempre attivo se sotto limite)
- ⚠️ Si "addormenta" dopo 15 min inattività
- ⏰ Primo accesso dopo sleep: ~30 secondi
- 💡 **Soluzione:** Usa UptimeRobot per ping ogni 5 min

**Railway Free:**
- ✅ $5 credito gratuito/mese
- ✅ Nessuno sleep automatico
- 💡 Ottimo per progetti con traffico costante

### WebSocket su HTTPS
- ✅ Il codice già supporta automaticamente `wss://` (WebSocket Secure)
- ✅ I servizi cloud forniscono SSL automaticamente
- ✅ Nessuna configurazione extra necessaria

### Auto-Deploy
Ogni volta che pushи su GitHub:
1. ✅ Render/Railway rilevano automaticamente il push
2. ✅ Fanno rebuild del progetto
3. ✅ Deployano la nuova versione
4. ⏱️ Tempo totale: 2-3 minuti

---

## 🆘 Troubleshooting

### Server non si avvia
**Errore:** "Application failed to start"

**Soluzione:**
1. Controlla logs (Render: Logs tab, Railway: Observability)
2. Verifica che `package.json` abbia:
   ```json
   "scripts": {
     "start": "node server.js"
   }
   ```

### Display non si connettono
**Problema:** Display mostra "Connessione in corso..."

**Soluzioni:**
1. Verifica che l'URL sia corretto
2. Controlla che il server sia "Live"
3. Apri console browser (F12) per vedere errori
4. Assicurati di usare `https://` non `http://`

### URL non raggiungibile
**Problema:** "This site can't be reached"

**Soluzioni:**
1. Verifica che il deploy sia completato (stato "Live")
2. Aspetta qualche minuto dopo il primo deploy
3. Prova a rifare il deploy (Settings → Manual Deploy)

### Sleep su Render Free
**Problema:** Primo accesso lento

**Soluzione permanente - UptimeRobot:**
1. Vai su **https://uptimerobot.com** (gratis)
2. Crea account
3. Add New Monitor:
   - Type: HTTP(s)
   - URL: `https://tuo-url.onrender.com`
   - Interval: 5 minuti
4. ✅ Il tuo server rimarrà sempre sveglio!

---

## 🎉 Pronto!

Il tuo **Control Square** è ora online e accessibile da qualsiasi dispositivo nel mondo!

**URL del tuo progetto:** `https://_______.onrender.com` (o railway.app)

### Quick Links:
- 🎮 **Controller:** Aggiungi `/controller` all'URL
- 📺 **Display:** Aggiungi `/display` all'URL
- 📊 **Logs:** Dashboard del servizio cloud

**Buon controllo! 🎨**
