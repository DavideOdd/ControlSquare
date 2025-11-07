# ⬛ Control Square

Sistema di controllo centralizzato per display multipli con comunicazione WebSocket in tempo reale.

![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![License](https://img.shields.io/badge/license-MIT-blue)

## 🚀 Quick Start con GitHub

Questo progetto è **completamente configurato per GitHub** con:

- ✅ **CI/CD automatico** con GitHub Actions
- 🐳 **Docker-ready** per deployment su qualsiasi piattaforma
- 📦 **Deploy automatico** su Render, Railway e altri servizi cloud
- 🔒 **Security scanning** automatico delle dipendenze

**Per iniziare:**
1. Fork o clona questo repository
2. Push su GitHub → CI/CD si attiva automaticamente
3. Connetti a Render/Railway → Deploy automatico configurato
4. Ogni push triggera test, build e deploy!

## 📋 Indice

- [Caratteristiche](#-caratteristiche)
- [Demo](#-demo)
- [Installazione](#-installazione)
- [Utilizzo](#-utilizzo)
- [Architettura](#-architettura)
- [Struttura Messaggi WebSocket](#-struttura-messaggi-websocket)
- [Estensibilità](#-estensibilità)
- [Deploy](#-deploy)
  - [Deploy con Docker](#-deploy-con-docker-consigliato)
  - [GitHub Actions CI/CD](#-deploy-automatico-con-github-actions)
  - [Deploy su Render](#-deploy-su-render-con-auto-deploy-da-github)
  - [Deploy su Railway](#-deploy-su-railway-con-auto-deploy-da-github)
  - [Altri servizi cloud](#-deploy-su-glitch)
- [Troubleshooting](#-troubleshooting)
- [Contribuire](#-contribuire)
- [Licenza](#-licenza)

## ✨ Caratteristiche

### Controller (PC/Tablet)
- 🎨 **Controllo Centralizzato**: Gestisci tutti i display da un'unica interfaccia
- 🌐 **Modalità Multiple**:
  - Globale: controlla tutti i display contemporaneamente
  - Multipla: seleziona display specifici
  - Singola: controllo individuale
- 🎯 **Color Picker**: Selezione colori con hex input e preset
- 📱 **Griglia Display**: Visualizzazione real-time di tutti i dispositivi connessi
- 💾 **Scene**: Salva e carica configurazioni di colori
- 📤 **Export/Import**: Backup della configurazione
- 📊 **Command Log**: Storico delle azioni eseguite
- ✏️ **Rinomina Display**: Assegna nomi personalizzati

### Display (Smartphone/Tablet/Monitor)
- 🆔 **ID Univoco**: Generato automaticamente e salvato localmente
- 🎨 **Fullscreen**: Modalità schermo intero per display puri
- 📱 **UI Minimizzabile**: Controlli discreti quando necessario
- 🔗 **QR Code**: Condivisione rapida dell'URL display
- 🔄 **Reconnect Automatico**: Riconnessione automatica in caso di interruzione
- 💾 **State Persistence**: Mantiene colore e nome anche dopo riavvio

### Server
- ⚡ **WebSocket Real-time**: Comunicazione bidirezionale istantanea
- 📡 **Heartbeat**: Verifica connessioni attive
- 🗺️ **Registry**: Gestione centralizzata dei display connessi
- 🔌 **Hot Reload**: Supporto per riconnessioni senza perdita stato
- 📝 **Logging**: Sistema di log completo

## 🎥 Demo

### Screenshot Controller
```
┌─────────────────────────────────────────┐
│  ⬛ Control Square                      │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
│                                         │
│  [🌐 Globale] [☑️ Multiplo] [👆 Singolo] │
│                                         │
│  Colore: [████] #6366f1 [Applica]      │
│                                         │
│  [██][██][██][██][██][██][██][██][██]  │
│                                         │
│  Display Connessi: 3                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐│
│  │          │ │          │ │          ││
│  │  Tablet  │ │ Monitor  │ │   iPad   ││
│  │  Cucina  │ │ Salotto  │ │  Camera  ││
│  │          │ │          │ │          ││
│  │ #FF5733  │ │ #33FF57  │ │ #3357FF  ││
│  └──────────┘ └──────────┘ └──────────┘│
└─────────────────────────────────────────┘
```

## 🚀 Installazione

### Requisiti
- Node.js >= 14.0.0
- npm o yarn

### Setup Rapido

1. **Clona o scarica il progetto**
```bash
cd ControlSquare
```

2. **Installa le dipendenze**
```bash
npm install
```

3. **Avvia il server**
```bash
npm start
```

4. **Apri il browser**
- Controller: `http://localhost:3000/controller`
- Display: `http://localhost:3000/display`

### Sviluppo

Per development con auto-reload:
```bash
npm run dev
```

## 📖 Utilizzo

### Configurazione Base

1. **Avvia il server**
   ```bash
   npm start
   ```

2. **Apri il Controller sul PC**
   - Naviga su `http://localhost:3000/controller`
   - Vedrai l'interfaccia di controllo vuota

3. **Connetti i Display**
   - Su ogni dispositivo (tablet, smartphone, monitor secondario):
   - Apri `http://localhost:3000/display`
   - Il display si registra automaticamente
   - Apparirà nella griglia del controller

4. **Controlla i Display**
   - Seleziona modalità (Globale/Multipla/Singola)
   - Scegli un colore
   - Clicca "Applica Colore"
   - I display cambieranno istantaneamente

### Funzionalità Avanzate

#### Rinominare Display
1. Nel controller, clicca su "✏️ Rinomina" sulla card del display
2. Inserisci il nuovo nome (es: "Tablet Cucina")
3. Il nome viene salvato e sincronizzato

#### Salvare Scene
1. Configura i colori dei display come desideri
2. Clicca "💾 Salva Scena"
3. Dai un nome alla scena (es: "Modalità Cinema")
4. Clicca sulla scena per ricaricarla istantaneamente

#### Export/Import Configurazione
```javascript
// Export
{
  "displays": [
    {
      "id": "display-xxx",
      "name": "Tablet Cucina",
      "color": "#ff5733"
    }
  ],
  "scenes": [...],
  "exportedAt": "2025-01-07T..."
}
```

#### Modalità Fullscreen
- Nel display, clicca "Fullscreen"
- L'UI scompare dopo 3 secondi
- Perfetto per installazioni permanenti

## 🏗️ Architettura

### Schema Generale

```
┌─────────────┐                    ┌─────────────┐
│             │                    │             │
│  Controller │◄───────────────────┤   Server    │
│   (Web)     │      WebSocket     │  (Node.js)  │
│             │                    │             │
└─────────────┘                    └──────┬──────┘
                                          │
                                          │ WebSocket
                                          │
                         ┌────────────────┼────────────────┐
                         │                │                │
                    ┌────▼─────┐    ┌────▼─────┐    ┌────▼─────┐
                    │ Display1 │    │ Display2 │    │ Display3 │
                    │  (Web)   │    │  (Web)   │    │  (Web)   │
                    └──────────┘    └──────────┘    └──────────┘
```

### Componenti

#### 1. Server ([server.js](server.js))
- **Express**: Server HTTP per servire file statici
- **WebSocket (ws)**: Comunicazione bidirezionale real-time
- **Registry**: Map di display connessi con metadati
- **Heartbeat**: Ping ogni 30 secondi per verificare connessioni
- **Command Router**: Gestisce e inoltra comandi ai display target

**Principali funzioni:**
```javascript
- handleRegistration()     // Registra controller/display
- handleCommand()          // Processa comandi
- sendToDisplay()          // Invia messaggio a display specifico
- broadcastToControllers() // Notifica tutti i controller
```

#### 2. Controller ([controller.html](controller.html))
- **ControllerClient**: Classe principale per gestione controller
- **UI Interattiva**: Griglia display, color picker, preset, scene
- **State Management**: Gestione selezioni e modalità
- **Local Storage**: Persistenza scene salvate

**Principali metodi:**
```javascript
- applyColor(color)        // Applica colore ai display selezionati
- saveScene(name, desc)    // Salva configurazione corrente
- loadScene(scene)         // Carica scena salvata
- renderDisplays()         // Aggiorna UI griglia display
```

#### 3. Display ([display.html](display.html))
- **DisplayClient**: Classe per gestione display
- **UUID Generation**: Crea ID univoco persistente
- **Color Display**: Fullscreen con transizioni fluide
- **QR Code**: Generazione automatica per condivisione
- **Auto-reconnect**: Riconnessione con backoff esponenziale

**Principali metodi:**
```javascript
- setColor(color)          // Cambia colore display
- generateQRCode()         // Genera QR code dell'URL
- toggleFullscreen()       // Attiva/disattiva fullscreen
- attemptReconnect()       // Logica riconnessione
```

### File Structure

```
ControlSquare/
├── server.js              # Server Node.js + WebSocket
├── controller.html        # UI Controller
├── display.html           # UI Display
├── style.css              # Stili condivisi
├── package.json           # Dipendenze NPM
└── README.md              # Documentazione
```

## 📡 Struttura Messaggi WebSocket

### Formato Base
```javascript
{
  type: "messageType",        // Tipo di messaggio
  targetIds: ["id1", "id2"],  // Array di IDs o "all"
  payload: { ... }            // Dati del messaggio
}
```

### Tipi di Messaggio

#### Client → Server

**Registrazione**
```javascript
{
  type: "register",
  clientType: "display" | "controller",
  displayId: "display-uuid",    // Solo per display
  name: "Nome Display",         // Solo per display
  color: "#hexcolor"            // Solo per display
}
```

**Cambio Colore**
```javascript
{
  type: "colorChange",
  targetIds: ["display-id-1", "display-id-2"], // o "all"
  payload: {
    color: "#ff5733"
  }
}
```

**Rinomina Display**
```javascript
{
  type: "rename",
  targetIds: ["display-id"],
  payload: {
    name: "Nuovo Nome"
  }
}
```

**Richiesta Status**
```javascript
{
  type: "getStatus"
}
```

**Aggiornamento Info Display**
```javascript
{
  type: "updateDisplayInfo",
  name: "Nome aggiornato",
  color: "#newcolor"
}
```

**Carica Scena**
```javascript
{
  type: "loadScene",
  scene: {
    name: "Scene Name",
    displays: [
      { id: "display-1", color: "#ff0000" },
      { id: "display-2", color: "#00ff00" }
    ]
  }
}
```

#### Server → Client

**Conferma Registrazione**
```javascript
{
  type: "registered",
  success: true,
  displayId: "display-uuid"
}
```

**Status Display**
```javascript
{
  type: "displaysStatus",
  displays: [
    {
      id: "display-uuid",
      name: "Display Name",
      color: "#hexcolor",
      connected: true,
      connectedAt: "ISO-timestamp",
      lastSeen: "ISO-timestamp"
    }
  ]
}
```

**Display Connesso**
```javascript
{
  type: "displayConnected",
  display: {
    id: "display-uuid",
    name: "Display Name",
    color: "#hexcolor",
    connected: true
  }
}
```

**Display Disconnesso**
```javascript
{
  type: "displayDisconnected",
  displayId: "display-uuid"
}
```

**Display Aggiornato**
```javascript
{
  type: "displayUpdated",
  display: { ... }
}
```

**Log Comando**
```javascript
{
  type: "commandLog",
  log: {
    type: "colorChange",
    timestamp: "ISO-timestamp",
    targetIds: ["display-1"],
    payload: { color: "#ff5733" }
  }
}
```

**Heartbeat**
```javascript
// Server → Client
{ type: "ping" }

// Client → Server
{ type: "pong" }
```

## 🔧 Estensibilità

### Aggiungere Nuovi Comandi

Control Square è progettato per essere facilmente estensibile. Ecco come aggiungere nuovi tipi di comando:

#### 1. Definire il Messaggio

In [server.js](server.js), aggiungi il nuovo tipo nel `switch` di `handleMessage`:

```javascript
case 'yourNewCommand':
  handleYourNewCommand(ws, data);
  break;
```

#### 2. Implementare il Handler

```javascript
function handleYourNewCommand(ws, data) {
  const { targetIds, payload } = data;

  // Log del comando
  broadcastToControllers({
    type: 'commandLog',
    log: {
      type: 'yourNewCommand',
      timestamp: new Date().toISOString(),
      targetIds: targetIds,
      payload: payload
    }
  });

  // Invia ai display target
  if (targetIds === 'all') {
    displays.forEach((display) => {
      sendToDisplay(display.id, 'yourNewCommand', payload);
    });
  } else if (Array.isArray(targetIds)) {
    targetIds.forEach(id => {
      if (displays.has(id)) {
        sendToDisplay(id, 'yourNewCommand', payload);
      }
    });
  }
}
```

#### 3. Gestire nel Display

In [display.html](display.html), aggiungi il case nel `handleMessage`:

```javascript
case 'yourNewCommand':
  if (message.payload) {
    // Esegui l'azione sul display
    this.executeYourCommand(message.payload);
  }
  break;
```

#### 4. Aggiungere UI nel Controller

In [controller.html](controller.html):

```html
<button class="btn btn-primary" id="yourCommandBtn">
  Your Command
</button>
```

```javascript
document.getElementById('yourCommandBtn').addEventListener('click', () => {
  this.send({
    type: 'yourNewCommand',
    targetIds: this.getTargetIds(),
    payload: {
      // I tuoi dati
    }
  });
});
```

### Esempi di Comandi Estensibili

#### Brightness Control
```javascript
// Controller
this.send({
  type: 'setBrightness',
  targetIds: ['display-1'],
  payload: { brightness: 0.5 } // 0.0 - 1.0
});

// Display handler
case 'setBrightness':
  document.getElementById('displayContainer').style.filter =
    `brightness(${message.payload.brightness})`;
  break;
```

#### Animazioni Pattern
```javascript
// Controller
this.send({
  type: 'playAnimation',
  targetIds: 'all',
  payload: {
    animation: 'pulse',
    duration: 3000,
    colors: ['#ff0000', '#00ff00', '#0000ff']
  }
});

// Display handler
case 'playAnimation':
  this.playAnimation(message.payload);
  break;
```

#### Text Display
```javascript
// Controller
this.send({
  type: 'showText',
  targetIds: ['display-1'],
  payload: {
    text: 'Hello World',
    fontSize: '48px',
    color: '#ffffff'
  }
});
```

### Sistema di Plugin (Estensione Futura)

Structure proposta per plugin modulari:

```javascript
// plugins/textDisplay.js
module.exports = {
  name: 'textDisplay',
  version: '1.0.0',

  serverHandler(ws, data, context) {
    // Logica server-side
  },

  displayHandler(message, displayClient) {
    // Logica display-side
  },

  controllerUI() {
    return `<button>Show Text</button>`;
  }
};
```

## 🌐 Deploy

### 🐳 Deploy con Docker (Consigliato)

Il progetto include una configurazione Docker completa per deployment semplice e consistente.

#### Build e Run con Docker

```bash
# Build immagine
docker build -t control-square .

# Run container
docker run -d -p 3000:3000 --name control-square control-square

# Oppure usa docker-compose
docker-compose up -d
```

#### Variabili d'ambiente con Docker

```bash
docker run -d -p 3000:3000 \
  -e NODE_ENV=production \
  -e PORT=3000 \
  -e WS_HEARTBEAT_INTERVAL=30000 \
  --name control-square control-square
```

### 🚀 Deploy Automatico con GitHub Actions

Il progetto include un workflow CI/CD completo che viene eseguito automaticamente:

- ✅ **Test**: Verifica sintassi e dipendenze
- 🐳 **Docker Build**: Build e test dell'immagine Docker
- 🔒 **Security Scan**: Controllo vulnerabilità con npm audit
- 🚀 **Deploy**: Deploy automatico in produzione (configurabile)

Il workflow si attiva automaticamente su push/PR verso i branch `main`, `master` o `develop`.

### 📦 Deploy su Render (Con Auto-Deploy da GitHub)

1. **Crea account su [Render](https://render.com)**

2. **Connetti repository GitHub**
   - Dashboard → New → Web Service
   - Connetti il tuo repository GitHub
   - Render rileverà automaticamente `render.yaml`

3. **Deploy automatico**
   - Il file `render.yaml` configura tutto automaticamente
   - Ogni push al branch principale triggera il deploy
   - URL: `https://your-app.onrender.com`

4. **Configurazione manuale (opzionale)**
   Se preferisci configurare manualmente:
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Usa le variabili da `.env.example`

### 🚂 Deploy su Railway (Con Auto-Deploy da GitHub)

1. **Crea account su [Railway](https://railway.app)**

2. **New Project → Deploy from GitHub**
   - Connetti il repository
   - Railway rileverà automaticamente `railway.json`

3. **Deploy automatico**
   - Railway configura tutto automaticamente
   - Ogni push triggera il deploy
   - URL: `https://your-app.up.railway.app`

4. **Variabili d'ambiente**
   - Settings → Variables
   - Copia da `.env.example` se necessario

### Deploy su Glitch

1. **Vai su [Glitch](https://glitch.com)**

2. **New Project → Import from GitHub**

3. **Paste repository URL**

4. **Glitch fa tutto automaticamente**
   - URL: `https://your-project.glitch.me`

### Deploy su Heroku

1. **Installa Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login e crea app**
   ```bash
   heroku login
   heroku create control-square-app
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

4. **Apri app**
   ```bash
   heroku open
   ```

### Deploy su VPS (DigitalOcean, AWS, etc.)

1. **Setup server**
   ```bash
   # Installa Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Installa PM2
   sudo npm install -g pm2
   ```

2. **Clona progetto**
   ```bash
   git clone https://github.com/your-repo/control-square.git
   cd control-square
   npm install
   ```

3. **Avvia con PM2**
   ```bash
   pm2 start server.js --name control-square
   pm2 save
   pm2 startup
   ```

4. **Setup Nginx (opzionale)**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **SSL con Let's Encrypt**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

### Configurazione HTTPS

Per WebSocket su HTTPS:

```javascript
// server.js con HTTPS
const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('private-key.pem'),
  cert: fs.readFileSync('certificate.pem')
};

const server = https.createServer(options, app);
```

## 🔍 Troubleshooting

### WebSocket non si connette

**Problema**: I display/controller non si connettono al server

**Soluzioni**:

1. **Verifica che il server sia attivo**
   ```bash
   # Dovresti vedere "Server in ascolto su porta: 3000"
   npm start
   ```

2. **Controlla la console del browser**
   - Apri DevTools (F12)
   - Tab Console
   - Cerca errori WebSocket

3. **Verifica URL WebSocket**
   - Deve essere `ws://localhost:3000` (HTTP)
   - O `wss://yourdomain.com` (HTTPS)

4. **Firewall**
   - Assicurati che la porta 3000 non sia bloccata
   - Windows: `netstat -an | findstr :3000`
   - Linux/Mac: `lsof -i :3000`

5. **Proxy/VPN**
   - Alcuni proxy bloccano WebSocket
   - Prova a disabilitare temporaneamente

### Display non appare nel Controller

**Problema**: Il display è connesso ma non viene visualizzato

**Soluzioni**:

1. **Ricarica il Controller**
   - Clicca su "🔄 Aggiorna Display"

2. **Controlla la registrazione**
   ```javascript
   // Nel display, console del browser:
   displayClient.displayId
   // Dovrebbe mostrare "display-xxxxx"
   ```

3. **Cancella localStorage**
   ```javascript
   // Console del browser:
   localStorage.clear();
   location.reload();
   ```

4. **Verifica log server**
   - Dovresti vedere "Display registrato: display-xxx"

### Colori non cambiano

**Problema**: Il controller invia comandi ma i display non cambiano

**Soluzioni**:

1. **Verifica selezione**
   - In modalità Multipla/Singola, assicurati di aver selezionato display
   - Controlla che le card selezionate abbiano il bordo blu

2. **Controlla formato colore**
   - Deve essere formato hex: `#RRGGBB`
   - Esempio: `#ff5733` (valido)
   - Esempio: `ff5733` (non valido, manca #)

3. **Verifica connessione display**
   - Stato deve essere "🟢 Online"
   - Se offline, riconnetti il display

4. **Controlla Command Log**
   - Verifica che i comandi vengano inviati
   - Controlla destinatari corretti

### Riconnessione continua

**Problema**: I client si disconnettono e riconnettono continuamente

**Soluzioni**:

1. **Server instabile**
   - Usa PM2 per produzione
   - Controlla errori nel log server

2. **Network instabile**
   - Verifica connessione di rete
   - Prova con cavo ethernet invece di WiFi

3. **Timeout troppo breve**
   - Aumenta timeout heartbeat in [server.js](server.js):
   ```javascript
   // Da 30000 a 60000 (60 secondi)
   setInterval(() => { ... }, 60000);
   ```

### Performance con molti display

**Problema**: L'app è lenta con 10+ display

**Soluzioni**:

1. **Throttling aggiornamenti**
   ```javascript
   // Aggiungi debounce nel controller
   let updateTimeout;
   function updateDisplays() {
     clearTimeout(updateTimeout);
     updateTimeout = setTimeout(() => {
       this.renderDisplays();
     }, 100);
   }
   ```

2. **Virtualizzazione griglia**
   - Per 50+ display, implementa virtual scrolling

3. **Ottimizza rendering**
   - Usa `requestAnimationFrame` per animazioni
   - Minimizza re-render non necessari

### CORS Errors

**Problema**: Errori CORS in produzione

**Soluzione**:

```javascript
// server.js
const cors = require('cors');
app.use(cors({
  origin: ['https://yourdomain.com'],
  credentials: true
}));
```

### LocalStorage pieno

**Problema**: "QuotaExceededError" salvando scene

**Soluzione**:

```javascript
// Limita numero scene salvate
if (this.scenes.length > 50) {
  this.scenes = this.scenes.slice(0, 50);
}
```

### Port già in uso

**Problema**: `EADDRINUSE: address already in use :::3000`

**Soluzioni**:

Windows:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Linux/Mac:
```bash
lsof -ti:3000 | xargs kill -9
```

Oppure cambia porta:
```bash
PORT=3001 npm start
```

## 🤝 Contribuire

Contributi sono benvenuti! Per contribuire:

1. Fork il progetto
2. Crea un branch per la feature (`git checkout -b feature/AmazingFeature`)
3. Commit le modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

### Guidelines

- Mantieni il codice pulito e commentato
- Testa le modifiche su diversi browser
- Aggiorna la documentazione se necessario
- Segui lo stile di codice esistente

## 📝 TODO / Roadmap

- [ ] Autenticazione e multi-tenant
- [ ] Gruppi di display
- [ ] Animazioni e transizioni avanzate
- [ ] Scheduler per comandi temporizzati
- [ ] API REST per integrazione esterna
- [ ] Mobile app nativa (React Native)
- [ ] Dashboard analytics
- [ ] Plugin system
- [ ] Supporto immagini/video
- [ ] Sincronizzazione audio

## 📄 Licenza

Questo progetto è rilasciato sotto licenza MIT. Vedi il file [LICENSE](LICENSE) per dettagli.

## 👨‍💻 Autore

Creato con ❤️ per il controllo display centralizzato.

## 🙏 Credits

- [Express](https://expressjs.com/) - Web framework
- [ws](https://github.com/websockets/ws) - WebSocket library
- [QRCode.js](https://github.com/davidshimjs/qrcodejs) - QR code generation

## 📞 Supporto

Per bug, feature request o domande:
- Apri un [Issue](https://github.com/your-repo/issues)
- Email: your-email@example.com

---

**Control Square** - Il tuo sistema di controllo display centralizzato 🎨
