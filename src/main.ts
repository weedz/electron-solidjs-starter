import { app } from "electron";
import { BrowserWindow } from "electron";
import { ipcMain } from "electron/main";
import { join } from "node:path";


app.whenReady().then(() => {
  const win = new BrowserWindow({
    height: 800,
    width: 600,
    minHeight: 200,
    minWidth: 200,
    webPreferences: {
      preload: join(import.meta.dirname, "preload.js"),
      sandbox: true,
      nodeIntegration: false,
      contextIsolation: true,
      disableBlinkFeatures: "Auxclick",
    },
  });

  win.loadFile(join(import.meta.dirname, "index.html"));

  win.webContents.on("will-navigate", e => {
    e.preventDefault();
  });
  win.webContents.setWindowOpenHandler(() => {
    return {
      action: "deny"
    }
  });
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit();
});

ipcMain.handle("get-versions", () => {
  return {
    electron: process.versions.electron,
    node: process.versions.node,
    v8: process.versions.v8
  }
});

