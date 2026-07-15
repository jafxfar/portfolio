import { MAC_ICONS } from "./macIcons"

export const PORTFOLIO_FOLDER_IDS = {
  projects: "portfolio_projects",
  games: "portfolio_games",
}

export const SAFARI_ICON_URL = MAC_ICONS.safari

const PORTFOLIO_DATE = "2026-07-15T12:00:00Z"

export const PORTFOLIO_FOLDERS = [
  {
    id: PORTFOLIO_FOLDER_IDS.projects,
    name: "Projects",
    type: "folder",
    date: PORTFOLIO_DATE,
  },
  {
    id: PORTFOLIO_FOLDER_IDS.games,
    name: "Games",
    type: "folder",
    date: PORTFOLIO_DATE,
  },
]

/** Root desktop files (not inside Projects/Games folders) */
export const DESKTOP_FILES = [
  {
    id: "desktop_cv",
    name: "CV.pdf",
    type: "pdf",
    url: "/resume.pdf",
    date: PORTFOLIO_DATE,
  },
]

export const PORTFOLIO_LINKS = [
  {
    id: "link_studio",
    name: "Studio",
    type: "link",
    url: "https://portfolio-studio-tan.vercel.app",
    parentFolderId: PORTFOLIO_FOLDER_IDS.projects,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_robotic",
    name: "Robotic",
    type: "link",
    url: "https://portfolio-robotic-tau.vercel.app",
    parentFolderId: PORTFOLIO_FOLDER_IDS.projects,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_agency",
    name: "Agency",
    type: "link",
    url: "https://portfolio-agency-six.vercel.app",
    parentFolderId: PORTFOLIO_FOLDER_IDS.projects,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_camping",
    name: "Camping",
    type: "link",
    url: "https://portfolio-camping.vercel.app",
    parentFolderId: PORTFOLIO_FOLDER_IDS.projects,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_art_gallery",
    name: "Art Gallery",
    type: "link",
    url: "https://portfolio-art-gallery-roan.vercel.app",
    parentFolderId: PORTFOLIO_FOLDER_IDS.projects,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_drink",
    name: "Drink",
    type: "link",
    url: "https://portfolio-drink.vercel.app",
    parentFolderId: PORTFOLIO_FOLDER_IDS.projects,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_attolabs",
    name: "AttoLabs",
    type: "link",
    url: "https://attolabs.eu/",
    icon: "/project-icons/attolabs.png",
    parentFolderId: PORTFOLIO_FOLDER_IDS.projects,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_shamcrm",
    name: "shamCRM",
    type: "link",
    url: "https://shamcrm.com/",
    icon: "/project-icons/shamcrm.webp",
    parentFolderId: PORTFOLIO_FOLDER_IDS.projects,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_exode",
    name: "Exode",
    type: "link",
    url: "https://exode.biz/ru",
    icon: "/project-icons/exode.svg",
    parentFolderId: PORTFOLIO_FOLDER_IDS.projects,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_uzbekfilm",
    name: "Uzbekfilm",
    type: "link",
    url: "https://uzbekfilm.uz/",
    icon: "/project-icons/uzbekfilm.png",
    parentFolderId: PORTFOLIO_FOLDER_IDS.projects,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_ucep",
    name: "UCEP",
    type: "link",
    url: "https://ucep.dev.frontend.albs.tech/",
    icon: "/project-icons/ucep.svg",
    parentFolderId: PORTFOLIO_FOLDER_IDS.projects,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_rpg",
    name: "RPG",
    type: "link",
    url: "https://game-rpg-umber.vercel.app",
    parentFolderId: PORTFOLIO_FOLDER_IDS.games,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_chess",
    name: "Chess",
    type: "link",
    url: "https://game-chess-tawny.vercel.app",
    parentFolderId: PORTFOLIO_FOLDER_IDS.games,
    date: PORTFOLIO_DATE,
  },
  {
    id: "link_shining",
    name: "Shining",
    type: "link",
    url: "https://game-shining.vercel.app/",
    icon: "/project-icons/shining.png",
    parentFolderId: PORTFOLIO_FOLDER_IDS.games,
    date: PORTFOLIO_DATE,
  },
]

/**
 * Merge portfolio folders/links/files into Desktop localStorage without overwriting user items.
 * @returns {{ folders: object[], files: object[], changed: boolean }}
 */
export const ensurePortfolioDesktopItems = () => {
  const folders = JSON.parse(localStorage.getItem("os_desktop_folders") || "[]")
  const files = JSON.parse(localStorage.getItem("os_desktop_files") || "[]")

  const existingFolderIds = new Set(folders.map((f) => f.id))
  const existingFileIds = new Set(files.map((f) => f.id))

  let changed = false

  const nextFolders = [...folders]
  for (const folder of PORTFOLIO_FOLDERS) {
    if (existingFolderIds.has(folder.id)) continue
    nextFolders.push(folder)
    changed = true
  }

  const nextFiles = [...files]
  const seededFiles = [...DESKTOP_FILES, ...PORTFOLIO_LINKS]

  for (const item of seededFiles) {
    if (existingFileIds.has(item.id)) {
      const index = nextFiles.findIndex((f) => f.id === item.id)
      if (index === -1) continue

      const current = nextFiles[index]
      const needsUrlSync = item.url && current.url !== item.url
      const needsIconSync = item.icon && current.icon !== item.icon
      if (needsUrlSync || needsIconSync) {
        nextFiles[index] = { ...current, ...item }
        changed = true
      }
      continue
    }

    nextFiles.push(item)
    changed = true
  }

  if (changed) {
    localStorage.setItem("os_desktop_folders", JSON.stringify(nextFolders))
    localStorage.setItem("os_desktop_files", JSON.stringify(nextFiles))
  }

  return { folders: nextFolders, files: nextFiles, changed }
}
