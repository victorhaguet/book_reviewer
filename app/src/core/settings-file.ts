import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname } from 'node:path'

// The app settings, as stored in a JSON file by the main process.
// Every field is optional: a missing field means "not chosen yet".
// Values are `unknown` because the file can be edited by hand:
// the code that uses a setting checks it.
export interface Settings {
  interfaceLanguage?: unknown
}

// A missing or unreadable file means no setting has been saved yet.
export async function readSettings(filePath: string): Promise<Settings> {
  try {
    const content: unknown = JSON.parse(await readFile(filePath, 'utf8'))
    return typeof content === 'object' && content !== null ? content : {}
  } catch {
    return {}
  }
}

// Merges the changes into the saved settings, keeping the other fields.
export async function updateSettings(filePath: string, changes: Settings): Promise<void> {
  const settings = { ...(await readSettings(filePath)), ...changes }
  await mkdir(dirname(filePath), { recursive: true })
  await writeFile(filePath, JSON.stringify(settings, null, 2), 'utf8')
}
