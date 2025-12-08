import { useState, useRef, useEffect } from 'react'
import ContextMenu from './ContextMenu'

const DesktopIcon = ({ id, icon, label, onClick, position, onPositionChange, onRename, onDelete, customContextMenu }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [contextMenu, setContextMenu] = useState(null)
  const iconRef = useRef(null)
  const clickTimeoutRef = useRef(null)

  useEffect(() => {
    if (isDragging) {
      const handleMouseMove = (e) => {
        if (!iconRef.current) return
        
        const rect = iconRef.current.getBoundingClientRect()
        const newX = e.clientX - dragOffset.x
        const newY = e.clientY - dragOffset.y
        
        // Constrain to viewport (accounting for taskbar)
        const maxX = window.innerWidth - rect.width
        const maxY = window.innerHeight - 40 - rect.height
        
        const constrainedX = Math.max(0, Math.min(newX, maxX))
        const constrainedY = Math.max(0, Math.min(newY, maxY))
        
        onPositionChange(constrainedX, constrainedY)
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        // Clear any pending click
        if (clickTimeoutRef.current) {
          clearTimeout(clickTimeoutRef.current)
          clickTimeoutRef.current = null
        }
      }

      window.addEventListener('mousemove', handleMouseMove)
      window.addEventListener('mouseup', handleMouseUp)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
        window.removeEventListener('mouseup', handleMouseUp)
      }
    }
  }, [isDragging, dragOffset, onPositionChange])

  const handleMouseDown = (e) => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
      setIsDragging(true)
      
      // Set a timeout for single click (if not dragging)
      clickTimeoutRef.current = setTimeout(() => {
        if (!isDragging) {
          onClick()
        }
      }, 200)
    }
  }

  const handleDoubleClick = (e) => {
    e.preventDefault()
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current)
      clickTimeoutRef.current = null
    }
    onClick()
  }

  const handleContextMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setContextMenu({
      x: e.clientX,
      y: e.clientY
    })
  }

  const contextMenuItems = customContextMenu || [
    { label: 'Open', icon: '▶', onClick: onClick },
    'separator',
    { label: 'Rename', icon: '✏️', onClick: () => onRename && onRename(id, label) },
    { label: 'Delete', icon: '🗑️', onClick: () => onDelete && onDelete(id) },
    'separator',
    { label: 'Properties', icon: '⚙️', onClick: () => alert(`Properties for ${label}`) }
  ]

  return (
    <div 
      ref={iconRef}
      className="absolute flex flex-col items-center w-16 cursor-pointer group select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      <div className={`w-16 h-16 flex items-center justify-center mb-1 rounded transition-colors p-1 ${
        isDragging ? 'bg-blue-600/30' : 'hover:bg-white/20'
      }`}>
        {icon && icon.startsWith('/') ? (
          <img 
            src={icon} 
            alt={label}
            className="w-12 h-12 object-contain"
            draggable={false}
          />
        ) : (
          <span className="text-4xl">{icon}</span>
        )}
      </div>
      <div className={`text-white text-xs text-center px-1 py-0.5 rounded transition-colors ${
        isDragging ? 'bg-blue-600/70' : 'group-hover:bg-blue-600/50'
      }`}>
        {label}
      </div>
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenuItems}
          onClose={() => setContextMenu(null)}
        />
      )}
    </div>
  )
}

export default DesktopIcon

