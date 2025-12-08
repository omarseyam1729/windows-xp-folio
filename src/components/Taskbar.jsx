import { useState, useEffect } from 'react'
import StartMenu from './StartMenu'
import ContextMenu from './ContextMenu'
import StartButtonIcon from './StartButtonIcon'

const Taskbar = ({ startMenuOpen, toggleStartMenu, openWindows, minimizeWindow, maximizeWindow, openWindow, closeWindow, activeWindowId }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [contextMenu, setContextMenu] = useState(null)
  const [contextMenuWindowId, setContextMenuWindowId] = useState(null)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-10 xp-gradient-taskbar flex items-center px-1 z-50">
      {/* Start Button */}
      <button
        className={`xp-start-button ${startMenuOpen ? 'xp-start-button-active' : ''}`}
        onClick={toggleStartMenu}
      >
        <StartButtonIcon />
        <span>start</span>
      </button>

      {/* Taskbar Items */}
      <div className="flex-1 flex items-center gap-1 ml-2">
        {openWindows.map(window => {
          const handleContextMenu = (e) => {
            e.preventDefault()
            e.stopPropagation()
            setContextMenu({
              x: e.clientX,
              y: e.clientY - 40 // Adjust for taskbar position
            })
            setContextMenuWindowId(window.id)
          }

          const menuItems = [
            { label: 'Restore', icon: '↗', onClick: () => !window.minimized && minimizeWindow(window.id), disabled: window.minimized },
            { label: 'Move', icon: '↔', onClick: () => {}, disabled: true },
            { label: 'Size', icon: '⇲', onClick: () => {}, disabled: window.maximized || window.minimized },
            { label: 'Minimize', icon: '_', onClick: () => minimizeWindow(window.id), disabled: window.minimized },
            { label: 'Maximize', icon: '□', onClick: () => maximizeWindow && maximizeWindow(window.id), disabled: window.maximized || window.minimized },
            'separator',
            { label: 'Close', icon: '×', onClick: () => closeWindow && closeWindow(window.id) }
          ]

          return (
            <div key={window.id} className="relative">
              <button
                className={`h-8 px-3 xp-border-outset flex items-center gap-2 text-sm ${
                  !window.minimized 
                    ? 'xp-gradient-gray text-black' 
                    : 'text-white hover:bg-white/10'
                }`}
                style={!window.minimized ? {} : {
                  background: 'transparent'
                }}
                onClick={() => minimizeWindow(window.id)}
                onContextMenu={handleContextMenu}
              >
                <span>{window.title}</span>
              </button>
              {contextMenu && contextMenuWindowId === window.id && (
                <ContextMenu
                  x={contextMenu.x}
                  y={contextMenu.y}
                  items={menuItems}
                  onClose={() => {
                    setContextMenu(null)
                    setContextMenuWindowId(null)
                  }}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* System Tray */}
      <div 
        className="h-8 px-2 flex items-center gap-1 text-xs text-white"
        style={{
          background: 'linear-gradient(to bottom, #1290E8 0%, #0d5fba 10%, #0b51a1 100%)',
          borderLeft: '1px solid #104ba1',
          boxShadow: 'inset 1px 1px 0px rgba(0,0,0,0.2)',
          padding: '0 10px'
        }}
      >
        <span>🕐</span>
        <span>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
      </div>

      {/* Start Menu */}
      {startMenuOpen && (
        <StartMenu 
          onClose={toggleStartMenu}
          openWindows={openWindows}
          openWindow={openWindow}
        />
      )}
    </div>
  )
}

export default Taskbar

