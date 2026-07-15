/** Default desktop widgets — layout matches macOS widget stack from design target */
export const getDefaultDesktopWidgets = () => {
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1440
  const marginRight = 28
  const topY = 56
  const gap = 14
  const row = 160
  const weatherW = 320
  const activityW = 320
  const calendarW = 160

  const rightColX = Math.max(24, screenWidth - weatherW - marginRight)
  const activityX = Math.max(24, rightColX - gap - activityW)
  const calendarX = Math.max(24, activityX - gap - calendarW)

  return [
    {
      id: "default_calendar",
      type: "calendar",
      x: calendarX,
      y: topY,
    },
    {
      id: "default_activity",
      type: "activity",
      x: activityX,
      y: topY,
    },
    {
      id: "default_glass_weather",
      type: "glass_weather",
      x: rightColX,
      y: topY,
    },
    {
      id: "default_wide_reminders",
      type: "glass_wide_reminders",
      x: rightColX,
      y: topY + row + gap,
    },
    {
      id: "default_photo",
      type: "photo",
      x: rightColX,
      y: topY + 2 * (row + gap),
    },
  ]
}

/**
 * Seed defaults when empty, and re-sync known default widget positions/types
 * so layout fixes apply even if older overlapping coords are in localStorage.
 */
export const ensureDefaultDesktopWidgets = () => {
  const defaults = getDefaultDesktopWidgets()
  const defaultById = Object.fromEntries(defaults.map((w) => [w.id, w]))
  const raw = localStorage.getItem("os_desktop_widgets")
  let saved = []

  if (raw !== null) {
    try {
      saved = JSON.parse(raw)
    } catch {
      saved = []
    }
  }

  if (!Array.isArray(saved) || saved.length === 0) {
    localStorage.setItem("os_desktop_widgets", JSON.stringify(defaults))
    return defaults
  }

  let changed = false
  const next = saved.map((widget) => {
    const preset = defaultById[widget.id]
    if (!preset) return widget

    const needsUpdate =
      widget.type !== preset.type ||
      widget.x !== preset.x ||
      widget.y !== preset.y

    if (!needsUpdate) return widget
    changed = true
    return { ...widget, type: preset.type, x: preset.x, y: preset.y }
  })

  for (const widget of defaults) {
    if (next.some((w) => w.id === widget.id)) continue
    next.push(widget)
    changed = true
  }

  if (changed) {
    localStorage.setItem("os_desktop_widgets", JSON.stringify(next))
  }

  return next
}
