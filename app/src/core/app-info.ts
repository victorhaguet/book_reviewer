import packageJson from '../../package.json'

export interface AppInfo {
  name: string
  version: string
}

// The version comes from app/package.json, the single place to bump it.
export function getAppInfo(): AppInfo {
  return {
    name: 'Book Reviewer',
    version: packageJson.version
  }
}
