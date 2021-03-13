import {app, BrowserWindow, globalShortcut} from "electron"
import path from "path"
let window = null

const singleLock = app.requestSingleInstanceLock()

if (!singleLock) {
  app.quit()
} else {
  app.on("second-instance", () => {
    if (window) {
      if (window.isMinimized()) window.restore()
      window.focus()
    }
  })

  app.on("ready", () => {
    window = new BrowserWindow({width: 800, height: 600, minWidth: 720, minHeight: 450, frame: false, backgroundColor: "#ffffff", center: true, webPreferences: {nodeIntegration: true, contextIsolation: false, enableRemoteModule: true}})
    window.loadFile(path.join(__dirname, "index.html"))
    window.removeMenu()
    window.on("closed", () => {
      window = null
    })
    globalShortcut.register("Control+Shift+I", () => {
      window?.webContents.toggleDevTools()
    })
  })
}

app.allowRendererProcessReuse = false