import { contextBridge, ipcRenderer } from 'electron'
import { IPC_CHANNELS, type BookReviewerApi } from '../shared/ipc-api'

// The only thing the renderer can see from the main process:
// one method per entry of the typed contract, nothing else.
const api: BookReviewerApi = {
  getAppVersion: () => ipcRenderer.invoke(IPC_CHANNELS.getAppVersion),
  getInterfaceLanguage: () => ipcRenderer.invoke(IPC_CHANNELS.getInterfaceLanguage),
  setInterfaceLanguage: (language) =>
    ipcRenderer.invoke(IPC_CHANNELS.setInterfaceLanguage, language)
}

contextBridge.exposeInMainWorld('api', api)
