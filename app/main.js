// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu} = require('electron')
const path = require('node:path')

let mainWindow, modbusSlave, modbusMaster
let menuTemplate = [
  {
    label: 'File',
    submenu: [
      {label: 'Open File'},
      { label: 'Exit'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {label: 'Modbus Slave',  accelerator: 'CmdOrCtrl+S', click: async () => {consoleLog()}},
    ]
  }
]

function createWindow () {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: __dirname + '/asserts/app.ico',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
      // preload: path.join(__dirname, 'preload.js')
    }
  })
  mainWindow.loadFile(__dirname + '/main.html')
  mainWindow.webContents.openDevTools()
  // const appMenu = Menu.buildFromTemplate(menuTemplate);
  // Menu.setApplicationMenu(appMenu);
}

function consoleLog() {
  mainBounds = mainWindow.getBounds()
  modbusSlave = new BrowserWindow({
    width: mainBounds.width*0.6,
    height: mainBounds.height*0.6,
    x: mainBounds.x + mainBounds.width*0.1,
    y: mainBounds.y + mainBounds.height*0.1,
    parent: mainWindow,
    icon: __dirname + '/asserts/modbus.ico',
    webPreferences: {
      nodeIntegration: true
    }
  })
  modbusSlave.setMenu(null)
  modbusSlave.loadFile(__dirname + '/consoleLog.html')
  modbusSlave.on('closed', () => {
    modbusSlave = null;
  });
}
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})


// https://stackoverflow.com/questions/65046136/typeerror-assignment-to-constant-variable