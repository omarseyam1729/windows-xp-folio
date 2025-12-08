import { useRef, useEffect, useImperativeHandle, forwardRef, useState } from 'react'

const PaintCanvas = forwardRef(({ 
  currentTool, 
  foregroundColor,
  backgroundColor,
  brushSize, 
  onDrawingStart, 
  onDrawing, 
  onDrawingEnd 
}, ref) => {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [canvasSize, setCanvasSize] = useState({ width: 700, height: 550 })

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    clear: () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = backgroundColor || '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.fillStyle = backgroundColor || '#FFFFFF'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [backgroundColor])

  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current && canvasRef.current) {
        const container = containerRef.current
        // Use clientWidth/clientHeight to get the actual visible area (excluding scrollbars)
        const newWidth = Math.max(700, container.clientWidth)
        const newHeight = Math.max(550, container.clientHeight)
        
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        
        // Only preserve image if canvas already has content and dimensions match
        if (canvas.width > 0 && canvas.height > 0 && 
            canvas.width === newWidth && canvas.height === newHeight) {
          // No resize needed, just update state
          setCanvasSize({ width: newWidth, height: newHeight })
          return
        }
        
        // Preserve existing drawing when resizing
        if (canvas.width > 0 && canvas.height > 0) {
          try {
            const tempCanvas = document.createElement('canvas')
            tempCanvas.width = canvas.width
            tempCanvas.height = canvas.height
            const tempCtx = tempCanvas.getContext('2d')
            tempCtx.drawImage(canvas, 0, 0)
            
            canvas.width = newWidth
            canvas.height = newHeight
            
            ctx.fillStyle = backgroundColor || '#FFFFFF'
            ctx.fillRect(0, 0, newWidth, newHeight)
            ctx.drawImage(tempCanvas, 0, 0)
          } catch (e) {
            // If preservation fails, just resize and clear
            canvas.width = newWidth
            canvas.height = newHeight
            ctx.fillStyle = backgroundColor || '#FFFFFF'
            ctx.fillRect(0, 0, newWidth, newHeight)
          }
        } else {
          canvas.width = newWidth
          canvas.height = newHeight
          ctx.fillStyle = backgroundColor || '#FFFFFF'
          ctx.fillRect(0, 0, newWidth, newHeight)
        }
        
        setCanvasSize({ width: newWidth, height: newHeight })
      }
    }

    // Use ResizeObserver for better performance
    const resizeObserver = new ResizeObserver(() => {
      setTimeout(updateCanvasSize, 0)
    })
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }
    
    // Also listen to window resize as fallback
    window.addEventListener('resize', updateCanvasSize)
    
    // Initial update with a small delay to ensure DOM is ready
    setTimeout(updateCanvasSize, 100)
    
    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  const getMousePos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  const handleMouseDown = (e) => {
    const pos = getMousePos(e)
    onDrawingStart(pos, canvasRef.current)
  }

  const handleMouseMove = (e) => {
    const pos = getMousePos(e)
    onDrawing(pos, canvasRef.current)
  }

  const handleMouseUp = () => {
    onDrawingEnd(canvasRef.current)
  }

  return (
    <div 
      className="flex-1 flex flex-col"
      style={{ 
        minWidth: 0, 
        height: '100%', 
        backgroundColor: '#808080',
        padding: '4px',
        position: 'relative',
        overflow: 'auto'
      }}
    >
      <div 
        ref={containerRef} 
        style={{ 
          position: 'relative',
          display: 'inline-block',
          margin: '0 auto',
          backgroundColor: '#FFFFFF',
          border: '2px inset #808080',
          borderColor: '#808080 #FFFFFF #FFFFFF #808080'
        }}
      >
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="cursor-crosshair"
          style={{ 
            display: 'block',
            backgroundColor: '#FFFFFF'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
        {/* Resize Handles */}
        {[/* corners */ 'top-left', 'top-right', 'bottom-left', 'bottom-right',
            /* edges */ 'top', 'right', 'bottom', 'left'].map((position) => (
          <div
            key={position}
            style={{
              position: 'absolute',
              width: '8px',
              height: '8px',
              backgroundColor: '#0000FF',
              border: '1px solid #000000',
              cursor: position.includes('top') && position.includes('left') ? 'nw-resize' :
                     position.includes('top') && position.includes('right') ? 'ne-resize' :
                     position.includes('bottom') && position.includes('left') ? 'sw-resize' :
                     position.includes('bottom') && position.includes('right') ? 'se-resize' :
                     position === 'top' || position === 'bottom' ? 'ns-resize' : 'ew-resize',
              ...(position === 'top-left' ? { top: '-4px', left: '-4px' } :
                  position === 'top-right' ? { top: '-4px', right: '-4px' } :
                  position === 'bottom-left' ? { bottom: '-4px', left: '-4px' } :
                  position === 'bottom-right' ? { bottom: '-4px', right: '-4px' } :
                  position === 'top' ? { top: '-4px', left: '50%', transform: 'translateX(-50%)' } :
                  position === 'right' ? { right: '-4px', top: '50%', transform: 'translateY(-50%)' } :
                  position === 'bottom' ? { bottom: '-4px', left: '50%', transform: 'translateX(-50%)' } :
                  { left: '-4px', top: '50%', transform: 'translateY(-50%)' })
            }}
          />
        ))}
      </div>
    </div>
  )
})

PaintCanvas.displayName = 'PaintCanvas'

export default PaintCanvas

