# 🚀 GUIDA RAPIDA - Control Square Online

## 📍 Link Diretti

### Il tuo repository GitHub:
**https://github.com/DavideOdd/ControlSquare**

### Per il deploy gratuito (scegli uno):
1. **Render** (CONSIGLIATO): https://render.com/
2. **Railway**: https://railway.app/

---

## 🎯 DEPLOY IN 5 MINUTI (Render)

### STEP 1: Vai su Render
👉 **Clicca qui:** https://render.com/

- Clicca **"Get Started for Free"**
- Scegli **"Sign up with GitHub"**
- Autorizza Render ad accedere a GitHub

### STEP 2: Crea il Web Service
Una volta loggato in Render:

1. **Dashboard → Click "New +"** (bottone blu in alto a destra)
2. Seleziona **"Web Service"**
3. Se è la prima volta, clicca **"Connect account"** per GitHub
4. Cerca **"ControlSquare"** nella lista dei repository
5. Click sul bottone **"Connect"** accanto a ControlSquare

### STEP 3: Configurazione (AUTO-COMPILATA!)
Render rileverà automaticamente il file `render.yaml`. Verifica che ci sia:

```
Name: control-square (o quello che preferisci)
Environment: Node
Region: Frankfurt (o la tua preferita)
Branch: claude/github-app-integration-011CUtaWiQSTADsHDhzJZxUs
Build Command: npm install
Start Command: npm start
```

**IMPORTANTE:** Se vuoi usare il branch principale in futuro, puoi cambiare "Branch" a `main` dopo aver fatto il merge su GitHub.

### STEP 4: Deploy!
1. Scrolla in basso
2. Seleziona **Plan: Free**
3. Click **"Create Web Service"**
4. Aspetta 2-3 minuti → Vedrai "Live" 🟢

### STEP 5: Ottieni l'URL
Una volta che vedi **"Live"** in verde:
- L'URL sarà tipo: `https://control-square-xxxx.onrender.com`
- Copialo!

---

## 🎮 COME USARE L'APP ONLINE

### Apri il Controller (sul tuo PC/Tablet):
```
https://TUO-URL.onrender.com/controller
```

### Apri i Display (su smartphone/tablet/altri schermi):
```
https://TUO-URL.onrender.com/display
```

### Esempio:
Se il tuo URL è `https://control-square-abc123.onrender.com`:
- **Controller:** `https://control-square-abc123.onrender.com/controller`
- **Display:** `https://control-square-abc123.onrender.com/display`

---

## 📱 TEST RAPIDO

1. **Apri il controller** sul tuo PC
2. **Apri il display** sul tuo smartphone (usa lo stesso URL + `/display`)
3. Il display apparirà automaticamente nel controller
4. Seleziona un colore nel controller
5. Click "Applica Colore"
6. 🎨 Lo smartphone cambierà colore istantaneamente!

---

## 🔄 AUTO-DEPLOY ATTIVO

Ogni volta che pushи codice su GitHub:
- ✅ GitHub Actions esegue i test
- ✅ Render rileva il push automaticamente
- ✅ Fa il rebuild dell'app
- ✅ Deploy automatico in ~2 minuti

---

## ⚡ ALTERNATIVA: Railway

Se preferisci Railway invece di Render:

### STEP 1: Vai su Railway
👉 **Clicca qui:** https://railway.app/

- Click **"Login with GitHub"**
- Autorizza Railway

### STEP 2: Nuovo Progetto
- Dashboard → **"New Project"**
- Click **"Deploy from GitHub repo"**
- Cerca e seleziona **"ControlSquare"**
- Railway farà tutto automaticamente

### STEP 3: Genera Dominio
- Nel progetto, vai su **Settings**
- Sezione **Networking**
- Click **"Generate Domain"**
- Copia l'URL tipo: `https://control-square.up.railway.app`

---

## 🆘 PROBLEMI COMUNI

### "This site can't be reached"
**Causa:** Il server sta ancora facendo il build
**Soluzione:** Aspetta 2-3 minuti e riprova

### Display non si connette
**Causa:** WebSocket non connesso
**Soluzione:**
1. Assicurati di usare `https://` (non `http://`)
2. Ricarica la pagina
3. Controlla che il server sia "Live" su Render

### Il server "si addormenta" dopo 15 minuti
**Causa:** Render Free tier mette in sleep app inattive
**Soluzione:**
1. Usa **UptimeRobot** (gratuito): https://uptimerobot.com
2. Crea un monitor HTTP che fa ping ogni 5 minuti
3. Il server rimarrà sempre attivo!

### GitHub Actions fallisce
**Soluzione:** Già fixato! Controlla GitHub → Actions → dovresti vedere tutto verde ✅

---

## 📊 MONITORING

### Render Dashboard:
- **Logs:** Vedi cosa succede in real-time
- **Metrics:** CPU, memoria, richieste
- **Events:** Deploy history

### Railway Dashboard:
- **Observability:** Metriche dettagliate
- **Logs:** Stream in tempo reale
- **Deployments:** Storia dei deploy

---

## 🎉 FATTO!

La tua app è ora:
✅ Online e accessibile da tutto il mondo
✅ Con HTTPS automatico (sicuro)
✅ Con auto-deploy da GitHub
✅ Monitorata e con logs

**Condividi l'URL con chiunque voglia usare i propri dispositivi come display!**

---

## 🔗 LINK UTILI

- **Repository GitHub:** https://github.com/DavideOdd/ControlSquare
- **Render:** https://render.com/
- **Railway:** https://railway.app/
- **UptimeRobot:** https://uptimerobot.com
- **Documentazione completa:** Vedi `DEPLOYMENT.md`

---

## 💡 PROSSIMI PASSI

1. **Merge su main** (opzionale):
   - Vai su: https://github.com/DavideOdd/ControlSquare/pulls
   - Crea Pull Request dal branch `claude/...` a `main`
   - Merge!

2. **Custom Domain** (opzionale):
   - Render: Settings → Custom Domains
   - Aggiungi il tuo dominio personalizzato

3. **Invita collaboratori**:
   - GitHub Settings → Collaborators
   - Aggiungi persone al progetto

---

**Domande? Problemi?**
Controlla `DEPLOYMENT.md` per troubleshooting dettagliato o apri un Issue su GitHub!

Buon divertimento con Control Square! 🎨
