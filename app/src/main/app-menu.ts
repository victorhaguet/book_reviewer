import type { MenuItemConstructorOptions } from 'electron'
import { createI18n } from '../shared/i18n/i18n'
import type { InterfaceLanguage } from '../shared/interface-language'

// The application menu in the interface language. It replaces
// Electron's default menu, whose labels are always in English.
// Each item keeps its role, so Electron still does the work;
// only the label is ours.
export function createMenuTemplate(
  language: InterfaceLanguage,
  platform: NodeJS.Platform
): MenuItemConstructorOptions[] {
  const { t } = createI18n(language)
  const isMac = platform === 'darwin'
  const appName = t('appName')
  const separator: MenuItemConstructorOptions = { type: 'separator' }

  // On macOS the first menu is named after the app.
  const appMenu: MenuItemConstructorOptions = {
    label: appName,
    submenu: [
      { role: 'about', label: t('menu.about', { appName }) },
      separator,
      { role: 'hide', label: t('menu.hide', { appName }) },
      { role: 'hideOthers', label: t('menu.hideOthers') },
      { role: 'unhide', label: t('menu.showAll') },
      separator,
      { role: 'quit', label: t('menu.quitApp', { appName }) }
    ]
  }

  return [
    ...(isMac ? [appMenu] : []),
    {
      label: t('menu.file'),
      submenu: [
        isMac
          ? { role: 'close', label: t('menu.closeWindow') }
          : { role: 'quit', label: t('menu.quit') }
      ]
    },
    {
      label: t('menu.edit'),
      submenu: [
        { role: 'undo', label: t('menu.undo') },
        { role: 'redo', label: t('menu.redo') },
        separator,
        { role: 'cut', label: t('menu.cut') },
        { role: 'copy', label: t('menu.copy') },
        { role: 'paste', label: t('menu.paste') },
        { role: 'selectAll', label: t('menu.selectAll') }
      ]
    },
    {
      label: t('menu.view'),
      submenu: [
        { role: 'reload', label: t('menu.reload') },
        { role: 'forceReload', label: t('menu.forceReload') },
        { role: 'toggleDevTools', label: t('menu.toggleDevTools') },
        separator,
        { role: 'resetZoom', label: t('menu.resetZoom') },
        { role: 'zoomIn', label: t('menu.zoomIn') },
        { role: 'zoomOut', label: t('menu.zoomOut') },
        separator,
        { role: 'togglefullscreen', label: t('menu.toggleFullScreen') }
      ]
    },
    {
      label: t('menu.window'),
      submenu: [
        { role: 'minimize', label: t('menu.minimize') },
        { role: 'zoom', label: t('menu.zoom') },
        isMac
          ? { role: 'front', label: t('menu.bringAllToFront') }
          : { role: 'close', label: t('menu.close') }
      ]
    }
  ]
}
