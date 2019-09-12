// Modules to control application life and create native browser window
const { app, BrowserWindow, globalShortcut, Notification} = require('electron')
const path = require('path')


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow


function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  mainWindow.loadURL('https://music.yandex.ru')
    // Open the DevTools.
  globalShortcut.register('CommandOrControl+num5', () => {
    mainWindow.webContents.executeJavaScript("externalAPI.togglePause()")
    new Notification({ title: 'YandexMusic', body: "Играет-На паузе" }).show()
  })

  globalShortcut.register('CommandOrControl+num6', () => {
    mainWindow.webContents.executeJavaScript("externalAPI.next()")
    new Notification({ title: 'YandexMusic', body: "Играет след трек"}).show()
  })

  globalShortcut.register('CommandOrControl+num4', () => {
    mainWindow.webContents.executeJavaScript("externalAPI.prev()")
  })

  globalShortcut.register('CommandOrControl+num7', () => {
    mainWindow.webContents.executeJavaScript("externalAPI.toggleDislike()")
  })

  globalShortcut.register('CommandOrControl+num9', () => {
    mainWindow.webContents.executeJavaScript("externalAPI.toggleLike()")
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    globalShortcut.unregisterAll()
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
