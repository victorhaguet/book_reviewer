// The typed contract between the renderer and the main process.
// Every call the React UI can make to the main process is listed here:
// add a channel name and a method together, then implement the handler
// in src/main/ipc-handlers.ts and expose it in src/preload/index.ts.

export const IPC_CHANNELS = {
  getAppVersion: 'app:get-version',
  getAppName: 'app:get-name'
} as const

export interface BookReviewerApi {
  getAppVersion(): Promise<string>
  getAppName(): Promise<string>
}
