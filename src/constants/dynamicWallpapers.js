/**
 * Appearance-aware wallpaper pairs (macOS / iOS Dynamic Desktop style).
 * When dark mode toggles, the matching variant of the active pair is applied.
 */

export const DYNAMIC_WALLPAPER_PAIRS = [
  {
    id: "golden-gate",
    name: "Golden Gate",
    light: "/Wallpaper/GoldenGate_6k.png",
    dark: "/Wallpaper/Golden_Dark_6k.png",
  },
  {
    id: "golden-gate-bridge",
    name: "Golden Gate Bridge",
    light: "/MacOS-Golden-Gate-6k.png",
    dark: "/macOS-Golden-Gate-Dark-6k.png",
  },
  {
    id: "sonoma",
    name: "Sonoma",
    light: "/Wallpaper/macOS-Sonoma-light.jpg",
    dark: "/Wallpaper/macOS-Sonomaa-dark.jpg",
  },
  {
    id: "atmosphere",
    name: "Atmosphere",
    light: "/bg-light.webp",
    dark: "/bg-dark.webp",
  },
  {
    id: "big-sur",
    name: "Big Sur",
    light: "/Wallpaper/11-0-Big-Sur-Day-6k.jpg",
    dark: "/Wallpaper/big-sur-mountains-night-dark-macos-big-sur-stock-california-6016x6016-1493.jpg",
  },
]

export const DEFAULT_WALLPAPER_PAIR_ID = "golden-gate"

const normalizePath = (path) => {
  if (!path || typeof path !== "string") return ""
  if (path.startsWith("data:")) return path
  try {
    return decodeURIComponent(path.split("?")[0])
  } catch {
    return path.split("?")[0]
  }
}

export const findWallpaperPairById = (id) =>
  DYNAMIC_WALLPAPER_PAIRS.find((pair) => pair.id === id) || null

export const findWallpaperPairByPath = (path) => {
  const normalized = normalizePath(path)
  if (!normalized || normalized.startsWith("data:")) return null

  return (
    DYNAMIC_WALLPAPER_PAIRS.find(
      (pair) =>
        normalizePath(pair.light) === normalized ||
        normalizePath(pair.dark) === normalized
    ) || null
  )
}

export const getDefaultWallpaperPath = (isDark) => {
  const pair = findWallpaperPairById(DEFAULT_WALLPAPER_PAIR_ID)
  return isDark ? pair.dark : pair.light
}

export const resolveWallpaperForAppearance = (pathOrPairId, isDark) => {
  const byId = findWallpaperPairById(pathOrPairId)
  if (byId) return isDark ? byId.dark : byId.light

  const byPath = findWallpaperPairByPath(pathOrPairId)
  if (byPath) return isDark ? byPath.dark : byPath.light

  if (pathOrPairId) return pathOrPairId
  return getDefaultWallpaperPath(isDark)
}

/**
 * Remember which dynamic pair the user selected.
 */
export const rememberWallpaperSelection = (
  path,
  { desktop = true, lockscreen = true } = {}
) => {
  const pair = findWallpaperPairByPath(path)

  if (pair) {
    if (desktop) localStorage.setItem("desktop_wallpaper_pair", pair.id)
    if (lockscreen) localStorage.setItem("lockscreen_wallpaper_pair", pair.id)
    return pair
  }

  if (desktop) localStorage.removeItem("desktop_wallpaper_pair")
  if (lockscreen) localStorage.removeItem("lockscreen_wallpaper_pair")
  return null
}

/**
 * Apply light/dark wallpaper variants for the current appearance.
 * Custom (non-pair) wallpapers are left unchanged.
 * Returns the resolved desktop wallpaper path.
 */
export const applyAppearanceWallpapers = (isDark) => {
  const savedDesktop = localStorage.getItem("desktop_wallpaper")
  const savedLock = localStorage.getItem("lockscreen_wallpaper")

  let desktopPairId = localStorage.getItem("desktop_wallpaper_pair")
  let lockPairId = localStorage.getItem("lockscreen_wallpaper_pair")

  if (!desktopPairId) {
    desktopPairId = findWallpaperPairByPath(savedDesktop)?.id || null
  }
  if (!lockPairId) {
    lockPairId = findWallpaperPairByPath(savedLock)?.id || null
  }

  // First visit with no wallpaper yet → seed default dynamic pair
  if (!savedDesktop && !desktopPairId) {
    desktopPairId = DEFAULT_WALLPAPER_PAIR_ID
  }
  if (!savedLock && !lockPairId) {
    lockPairId = desktopPairId || DEFAULT_WALLPAPER_PAIR_ID
  }

  if (desktopPairId) {
    const desktopPath = resolveWallpaperForAppearance(desktopPairId, isDark)
    localStorage.setItem("desktop_wallpaper_pair", desktopPairId)
    localStorage.setItem("desktop_wallpaper", desktopPath)
    window.dispatchEvent(new CustomEvent("wallpaperChanged", { detail: desktopPath }))
  }

  if (lockPairId) {
    const lockPath = resolveWallpaperForAppearance(lockPairId, isDark)
    localStorage.setItem("lockscreen_wallpaper_pair", lockPairId)
    localStorage.setItem("lockscreen_wallpaper", lockPath)
    window.dispatchEvent(new CustomEvent("lockscreenWallpaperChanged", { detail: lockPath }))
  } else if (desktopPairId) {
    const lockPath = resolveWallpaperForAppearance(desktopPairId, isDark)
    localStorage.setItem("lockscreen_wallpaper_pair", desktopPairId)
    localStorage.setItem("lockscreen_wallpaper", lockPath)
    window.dispatchEvent(new CustomEvent("lockscreenWallpaperChanged", { detail: lockPath }))
  }

  return localStorage.getItem("desktop_wallpaper") || getDefaultWallpaperPath(isDark)
}

export const getInitialDesktopWallpaper = (isDark) => {
  const pairId = localStorage.getItem("desktop_wallpaper_pair")
  const saved = localStorage.getItem("desktop_wallpaper")

  if (pairId || findWallpaperPairByPath(saved)) {
    return resolveWallpaperForAppearance(pairId || saved, isDark)
  }

  if (saved) return saved
  return getDefaultWallpaperPath(isDark)
}

export const getInitialLockscreenWallpaper = (isDark) => {
  const pairId = localStorage.getItem("lockscreen_wallpaper_pair")
  const saved = localStorage.getItem("lockscreen_wallpaper")

  if (pairId || findWallpaperPairByPath(saved)) {
    return resolveWallpaperForAppearance(pairId || saved, isDark)
  }

  if (saved) return saved
  return getDefaultWallpaperPath(isDark)
}

/** Preload both variants of a pair for smooth theme switching */
export const preloadWallpaperPair = (pairOrId) => {
  const pair =
    typeof pairOrId === "string" ? findWallpaperPairById(pairOrId) : pairOrId
  if (!pair) return

  ;[pair.light, pair.dark].forEach((src) => {
    const img = new Image()
    img.src = src
  })
}
