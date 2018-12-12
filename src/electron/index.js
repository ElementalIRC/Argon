const { app, BrowserWindow } = require('electron')
const registerEvents = require('./irc-events');
const { default: installExtension } = require('electron-devtools-installer');

let win
  
function createWindow () {
    win = new BrowserWindow({ width: 1000, height: 800 })

    installExtension('nhdogjmejiglipccpnnnanhbledajbpd');

    win.loadURL('http://localhost:8080');

    registerEvents(win);
    
    win.webContents.openDevTools()
    
    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow)
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
  
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})
