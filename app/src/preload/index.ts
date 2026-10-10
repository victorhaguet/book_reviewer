import { contextBridge, ipcRenderer } from 'electron'
import { IPC_CHANNELS, type BookReviewerApi } from '../shared/ipc-api'

// The only thing the renderer can see from the main process:
// one method per entry of the typed contract, nothing else.
const api: BookReviewerApi = {
  getAppVersion: () => ipcRenderer.invoke(IPC_CHANNELS.getAppVersion),
  getAppName: () => ipcRenderer.invoke(IPC_CHANNELS.getAppName)
}

contextBridge.exposeInMainWorld('api', api)
