const { app, BrowserWindow } = require('electron')
const registerEvents = require('./src/irc-events');

let win
  
function createWindow () {
    win = new BrowserWindow({ width: 1000, height: 800 })

    if (process.env.NODE_ENV == 'development') {
        win.loadURL('http://localhost:8080');
    }
    else {
        win.loadFile('index.html');
    }

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
