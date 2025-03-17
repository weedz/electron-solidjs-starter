import { contextBridge, ipcRenderer } from "electron/renderer";

interface IElectronBridgeAPI {
  getVersions: () => Promise<{
    electron: string;
    node: string;
    v8: string;
  }>;
}

declare global {
  var electronAPI: IElectronBridgeAPI;
}

contextBridge.exposeInMainWorld("electronAPI", {
  getVersions: () => ipcRenderer.invoke("get-versions"),
});
