import type { MenuItemConstructorOptions } from 'electron'
import { describe, expect, it } from 'vitest'
import { createMenuTemplate } from './app-menu'

function topLabels(template: MenuItemConstructorOptions[]): (string | undefined)[] {
  return template.map((menu) => menu.label)
}

// Every item of every menu, at any depth.
function allItems(items: MenuItemConstructorOptions[]): MenuItemConstructorOptions[] {
  return items.flatMap((item) => [
    item,
    ...(Array.isArray(item.submenu) ? allItems(item.submenu) : [])
  ])
}

describe('createMenuTemplate', () => {
  it('names the menus in English', () => {
    expect(topLabels(createMenuTemplate('en', 'linux'))).toEqual(['File', 'Edit', 'View', 'Window'])
  })

  it('names the menus in French', () => {
    expect(topLabels(createMenuTemplate('fr', 'linux'))).toEqual([
      'Fichier',
      'Édition',
      'Affichage',
      'Fenêtre'
    ])
  })

  it('translates the menu items too', () => {
    const labels = allItems(createMenuTemplate('fr', 'linux')).map((item) => item.label)

    expect(labels).toEqual(expect.arrayContaining(['Quitter', 'Copier', 'Coller']))
  })

  it('opens with a menu named after the app on macOS', () => {
    expect(topLabels(createMenuTemplate('fr', 'darwin'))[0]).toBe('Relecteur IA')
  })

  it.each(['linux', 'darwin'] as const)(
    'labels every item on %s, so none falls back to an English default',
    (platform) => {
      const unlabelled = allItems(createMenuTemplate('fr', platform)).filter(
        (item) => item.type !== 'separator' && !item.label
      )

      expect(unlabelled).toEqual([])
    }
  )
})
