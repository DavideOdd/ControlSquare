const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

// Configurazione ambiente
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const WS_HEARTBEAT_INTERVAL = parseInt(process.env.WS_HEARTBEAT_INTERVAL || '30000', 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const app = express();

// Configurazione CORS per produzione
if (CORS_ORIGIN) {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', CORS_ORIGIN);
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });
}

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Registro dei display connessi
const displays = new Map();
const controllers = new Set();

// Middleware
app.use(express.static(__dirname));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'controller.html'));
});

app.get('/display', (req, res) => {
  res.sendFile(path.join(__dirname, 'display.html'));
});

app.get('/controller', (req, res) => {
  res.sendFile(path.join(__dirname, 'controller.html'));
});

// Gestione WebSocket
wss.on('connection', (ws, req) => {
  console.log('Nuova connessione WebSocket');

  let clientType = null;
  let displayId = null;
  let heartbeatInterval = null;

  // Avvia heartbeat
  const startHeartbeat = () => {
    heartbeatInterval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'ping' }));
      }
    }, WS_HEARTBEAT_INTERVAL);
  };

  startHeartbeat();

  // Handler dei messaggi
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      switch(data.type) {
        case 'register':
          handleRegistration(ws, data);
          break;

        case 'pong':
          // Risposta al ping
          break;

        case 'colorChange':
        case 'rename':
        case 'disconnect':
        case 'broadcast':
          handleCommand(ws, data);
          break;

        case 'getStatus':
          sendDisplaysStatus(ws);
          break;

        case 'updateDisplayInfo':
          handleDisplayInfoUpdate(ws, data);
          break;

        case 'exportConfig':
          handleExportConfig(ws);
          break;

        case 'importConfig':
          handleImportConfig(ws, data);
          break;

        case 'saveScene':
          handleSaveScene(ws, data);
          break;

        case 'loadScene':
          handleLoadScene(ws, data);
          break;

        default:
          console.log('Tipo di messaggio sconosciuto:', data.type);
      }
    } catch (error) {
      console.error('Errore nel parsing del messaggio:', error);
    }
  });

  // Handler disconnessione
  ws.on('close', () => {
    clearInterval(heartbeatInterval);

    if (clientType === 'display' && displayId) {
      console.log(`Display disconnesso: ${displayId}`);
      displays.delete(displayId);
      broadcastToControllers({
        type: 'displayDisconnected',
        displayId: displayId
      });
    } else if (clientType === 'controller') {
      console.log('Controller disconnesso');
      controllers.delete(ws);
    }
  });

  ws.on('error', (error) => {
    console.error('Errore WebSocket:', error);
  });

  // Funzioni helper
  function handleRegistration(ws, data) {
    clientType = data.clientType;

    if (clientType === 'display') {
      displayId = data.displayId;
      displays.set(displayId, {
        ws: ws,
        id: displayId,
        name: data.name || `Display ${displayId.substring(0, 8)}`,
        color: data.color || '#000000',
        connectedAt: new Date().toISOString(),
        lastSeen: new Date().toISOString()
      });

      console.log(`Display registrato: ${displayId} - ${displays.get(displayId).name}`);

      // Notifica i controller
      broadcastToControllers({
        type: 'displayConnected',
        display: getDisplayInfo(displayId)
      });

      // Invia conferma al display
      ws.send(JSON.stringify({
        type: 'registered',
        success: true,
        displayId: displayId
      }));

    } else if (clientType === 'controller') {
      controllers.add(ws);
      console.log('Controller registrato');

      // Invia lista display correnti
      sendDisplaysStatus(ws);
    }
  }

  function handleCommand(ws, data) {
    const { type, targetIds, payload } = data;

    // Log del comando
    const logEntry = {
      type: type,
      timestamp: new Date().toISOString(),
      targetIds: targetIds,
      payload: payload
    };

    console.log('Comando ricevuto:', logEntry);

    // Invia log ai controller
    broadcastToControllers({
      type: 'commandLog',
      log: logEntry
    });

    // Esegui comando
    if (targetIds === 'all') {
      // Broadcast a tutti i display
      displays.forEach((display) => {
        sendToDisplay(display.id, type, payload);
      });
    } else if (Array.isArray(targetIds)) {
      // Invia ai display specificati
      targetIds.forEach(id => {
        if (displays.has(id)) {
          sendToDisplay(id, type, payload);
        }
      });
    }
  }

  function handleDisplayInfoUpdate(ws, data) {
    if (displayId && displays.has(displayId)) {
      const display = displays.get(displayId);

      if (data.name !== undefined) display.name = data.name;
      if (data.color !== undefined) display.color = data.color;
      display.lastSeen = new Date().toISOString();

      // Notifica i controller
      broadcastToControllers({
        type: 'displayUpdated',
        display: getDisplayInfo(displayId)
      });
    }
  }

  function sendToDisplay(id, commandType, payload) {
    const display = displays.get(id);
    if (display && display.ws.readyState === WebSocket.OPEN) {
      display.ws.send(JSON.stringify({
        type: commandType,
        payload: payload
      }));

      // Aggiorna stato
      if (commandType === 'colorChange' && payload.color) {
        display.color = payload.color;
        display.lastSeen = new Date().toISOString();

        // Notifica i controller
        broadcastToControllers({
          type: 'displayUpdated',
          display: getDisplayInfo(id)
        });
      }
    }
  }

  function sendDisplaysStatus(ws) {
    const displaysList = Array.from(displays.values()).map(d => getDisplayInfo(d.id));

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: 'displaysStatus',
        displays: displaysList
      }));
    }
  }

  function getDisplayInfo(id) {
    const display = displays.get(id);
    if (!display) return null;

    return {
      id: display.id,
      name: display.name,
      color: display.color,
      connected: display.ws.readyState === WebSocket.OPEN,
      connectedAt: display.connectedAt,
      lastSeen: display.lastSeen
    };
  }

  function broadcastToControllers(message) {
    controllers.forEach(controller => {
      if (controller.readyState === WebSocket.OPEN) {
        controller.send(JSON.stringify(message));
      }
    });
  }

  function handleExportConfig(ws) {
    const config = {
      displays: Array.from(displays.values()).map(d => ({
        id: d.id,
        name: d.name,
        color: d.color
      })),
      exportedAt: new Date().toISOString()
    };

    ws.send(JSON.stringify({
      type: 'configExported',
      config: config
    }));
  }

  function handleImportConfig(ws, data) {
    // Questa funzione può essere usata per ripristinare nomi/configurazioni
    // ma non può ricreare i display (devono connettersi da soli)
    console.log('Import config richiesto:', data.config);

    ws.send(JSON.stringify({
      type: 'configImported',
      success: true,
      message: 'Configurazione importata. I display devono riconnettersi.'
    }));
  }

  function handleSaveScene(ws, data) {
    // Le scene sono gestite lato client, questa funzione è per estensioni future
    console.log('Scena salvata:', data.scene);

    ws.send(JSON.stringify({
      type: 'sceneSaved',
      success: true,
      scene: data.scene
    }));
  }

  function handleLoadScene(ws, data) {
    // Applica una scena salvata
    const scene = data.scene;

    if (scene && scene.displays) {
      scene.displays.forEach(displayConfig => {
        if (displays.has(displayConfig.id)) {
          sendToDisplay(displayConfig.id, 'colorChange', { color: displayConfig.color });
        }
      });
    }

    ws.send(JSON.stringify({
      type: 'sceneLoaded',
      success: true
    }));
  }
});

// Gestione errori non catturati
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Avvio server
server.listen(PORT, '0.0.0.0', () => {
  const host = process.env.RENDER_EXTERNAL_HOSTNAME ||
               process.env.RAILWAY_STATIC_URL ||
               'localhost';

  console.log(`
╔════════════════════════════════════════╗
║      CONTROL SQUARE SERVER             ║
╚════════════════════════════════════════╝

Environment: ${NODE_ENV}
Server in ascolto su porta: ${PORT}
${NODE_ENV === 'production' ? `Host: ${host}` : ''}

URLs:
${NODE_ENV === 'production'
  ? `- Controller: https://${host}/controller
- Display:    https://${host}/display`
  : `- Controller: http://localhost:${PORT}/controller
- Display:    http://localhost:${PORT}/display`}

${NODE_ENV === 'production' ? 'Server ready for production' : 'Premi CTRL+C per terminare'}
  `);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} ricevuto, chiusura graceful...`);

  // Chiudi nuove connessioni
  server.close(() => {
    console.log('Server HTTP chiuso');
  });

  // Chiudi tutte le connessioni WebSocket
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.close(1000, 'Server shutting down');
    }
  });

  // Timeout per forzare la chiusura
  setTimeout(() => {
    console.error('Timeout raggiunto, forzando chiusura...');
    process.exit(1);
  }, 10000);

  // Chiudi il server WebSocket
  wss.close(() => {
    console.log('Server WebSocket chiuso');
    console.log('Shutdown completato');
    process.exit(0);
  });
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
