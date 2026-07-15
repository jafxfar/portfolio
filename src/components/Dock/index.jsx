import React, { useEffect, useMemo, useState } from "react"
import { useAppStore } from "../../store/Appstore.js"
import { Safari } from "../../app/Safari"
import Spotify from "../../app/Spotify"
import Settings from "../../app/Settings"
import MacGallery from "../../app/Gallary"
import ContactsApp from "../../app/Contacts"
import Blogs from "../../app/Blogs/BlogsSection.jsx"
import Finder from "../../app/Finder"
import Trash from "../../app/Trash"
import Launchpad from "../../app/Launchpad"
import Messages from "../../app/Messages"
import Mail from "../../app/Mail"
import Maps from "../../app/Maps"
import FaceTime from "../../app/FaceTime"
import PhoneApp from "../../app/Phone"
import CalendarApp from "../../app/Calendar"
import RemindersApp from "../../app/Reminders"
import MacOSDock from "./Dock"
import { MAC_ICONS } from "../../constants/macIcons"

const DOCK_APPS = [
  {
    id: "Finder",
    name: "Finder",
    icon: MAC_ICONS.finder,
    comp: <Finder />,
  },
  {
    id: "Launchpad",
    name: "Apps",
    icon: MAC_ICONS.apps,
    comp: <Launchpad />,
  },
  {
    id: "Safari",
    name: "Safari",
    icon: MAC_ICONS.safari,
    comp: <Safari />,
  },
  {
    id: "Messages",
    name: "Messages",
    icon: MAC_ICONS.messages,
    comp: <Messages />,
  },
  {
    id: "Mail",
    name: "Mail",
    icon: MAC_ICONS.mail,
    comp: <Mail />,
  },
  {
    id: "Maps",
    name: "Maps",
    icon: MAC_ICONS.maps,
    comp: <Maps />,
  },
  {
    id: "Photos",
    name: "Photos",
    icon: MAC_ICONS.photos,
    comp: <MacGallery />,
  },
  {
    id: "FaceTime",
    name: "FaceTime",
    icon: MAC_ICONS.facetime,
    comp: <FaceTime />,
  },
  {
    id: "Phone",
    name: "Phone",
    icon: MAC_ICONS.phone,
    comp: <PhoneApp />,
  },
  {
    id: "Calendar",
    name: "Calendar",
    icon: MAC_ICONS.calendar,
    comp: <CalendarApp />,
  },
  {
    id: "Contacts",
    name: "Contacts",
    icon: MAC_ICONS.contacts,
    comp: <ContactsApp />,
  },
  {
    id: "Notes",
    name: "Notes",
    icon: MAC_ICONS.notes,
    comp: <Blogs />,
  },
  {
    id: "Reminders",
    name: "Reminders",
    icon: MAC_ICONS.reminders,
    comp: <RemindersApp />,
  },
  {
    id: "Music",
    name: "Music",
    icon: MAC_ICONS.music,
    comp: <Spotify />,
  },
  {
    id: "Settings",
    name: "Settings",
    icon: MAC_ICONS.systemSettings,
    comp: <Settings />,
  },
  {
    id: "Github",
    name: "GitHub",
    icon: "https://s3.macosicons.com/macosicons/icons/AhTpsJCAbn/lowResPngFile_f024fedc7c28b04afb3e45d69ad10be2_low_res_GitHub_Desktop__clear__dark_.png",
    url: "https://github.com/jafxfar",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "https://s3.macosicons.com/macosicons/icons/ZcwY6Altec/lowResPngFile_51f93886aae8020c24a499a78bc19be3_low_res_LinkedIn.png",
    url: "https://www.linkedin.com/in/jafar-j-a615452aa/",
  },
]

const TRASH_EMPTY_ICON = MAC_ICONS.trashEmpty
const TRASH_FULL_ICON = MAC_ICONS.trashFull

export default function Dock() {
  const openApp = useAppStore((s) => s.openApp)
  const windows = useAppStore((s) => s.windows)
  const restoreApp = useAppStore((s) => s.restoreApp)
  const focusApp = useAppStore((s) => s.focusApp)
  const isDarkMode = useAppStore((s) => s.isDarkMode)

  const [hasTrashedItems, setHasTrashedItems] = useState(() => {
    try {
      const saved = localStorage.getItem("os_trash")
      return saved ? JSON.parse(saved).length > 0 : false
    } catch {
      return false
    }
  })

  useEffect(() => {
    const handleTrashUpdated = (e) => {
      setHasTrashedItems(e.detail.hasFiles)
    }
    const handleFileTrashed = () => {
      setHasTrashedItems(true)
    }

    window.addEventListener("os_trash_updated", handleTrashUpdated)
    window.addEventListener("os_file_trash", handleFileTrashed)
    return () => {
      window.removeEventListener("os_trash_updated", handleTrashUpdated)
      window.removeEventListener("os_file_trash", handleFileTrashed)
    }
  }, [])

  const apps = useMemo(() => {
    return [
      ...DOCK_APPS,
      {
        id: "Trash",
        name: "Trash",
        icon: hasTrashedItems ? TRASH_FULL_ICON : TRASH_EMPTY_ICON,
        comp: <Trash />,
      },
    ]
  }, [hasTrashedItems])

  const dockApps = useMemo(
    () => apps.map(({ id, name, icon }) => ({ id, name, icon })),
    [apps]
  )

  const openApps = useMemo(() => {
    return apps
      .filter((app) => {
        if (app.id === "Finder") {
          return windows.some(
            (w) =>
              w.appId === "Finder" ||
              w.appId === "TextEdit" ||
              w.appId === "PDFViewer"
          )
        }
        return windows.some((w) => w.appId === app.id)
      })
      .map((app) => app.id)
  }, [apps, windows])

  const handleAppClick = (appId) => {
    const app = apps.find((item) => item.id === appId)
    if (!app) return

    if (app.url) {
      window.open(app.url, "_blank", "noopener,noreferrer")
      return
    }

    const existingWindow = windows.find((w) => w.appId === app.id)
    if (existingWindow) {
      if (existingWindow.minimized) {
        restoreApp(existingWindow.id)
      } else {
        focusApp(existingWindow.id)
      }
      return
    }

    if (app.comp) {
      openApp(app.id, app.comp)
    }
  }

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-[99999] pointer-events-auto">
      <MacOSDock
        apps={dockApps}
        onAppClick={handleAppClick}
        openApps={openApps}
        isDark={isDarkMode}
      />
    </div>
  )
}
