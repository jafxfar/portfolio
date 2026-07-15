import React, { useState } from 'react'
import MacOSDock from './Dock'
import { MAC_ICONS } from '../../constants/macIcons'

const sampleApps = [
  { id: 'finder', name: 'Finder', icon: MAC_ICONS.finder },
  { id: 'calculator', name: 'Calculator', icon: '/mac_icons/icons/calculator.png' },
  { id: 'terminal', name: 'Terminal', icon: MAC_ICONS.terminal },
  { id: 'mail', name: 'Mail', icon: MAC_ICONS.mail },
  { id: 'notes', name: 'Notes', icon: MAC_ICONS.notes },
  { id: 'safari', name: 'Safari', icon: MAC_ICONS.safari },
  { id: 'photos', name: 'Photos', icon: MAC_ICONS.photos },
  { id: 'music', name: 'Music', icon: MAC_ICONS.music },
  { id: 'calendar', name: 'Calendar', icon: MAC_ICONS.calendar },
]

const DockDemo: React.FC = () => {
  const [openApps, setOpenApps] = useState<string[]>(['finder', 'safari'])

  const handleAppClick = (appId: string) => {
    setOpenApps((prev) =>
      prev.includes(appId)
        ? prev.filter((id) => id !== appId)
        : [...prev, appId]
    )
  }

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <MacOSDock
        apps={sampleApps}
        onAppClick={handleAppClick}
        openApps={openApps}
      />
    </div>
  )
}

export default DockDemo
