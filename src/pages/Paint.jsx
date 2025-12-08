import { useState, useRef } from 'react'
import PaintMenuBar from '../components/paint/PaintMenuBar'
import Toolbox from '../components/paint/Toolbox'
import ColorPalette from '../components/paint/ColorPalette'
import PaintCanvas from '../components/paint/PaintCanvas'

const Paint = () => {
  const canvasComponentRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTool, setCurrentTool] = useState('pen')
  const [foregroundColor, setForegroundColor] = useState('#000000')
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF')
  const [brushSize, setBrushSize] = useState(2)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  // Classic Paint palette - 28 colors for 2 rows x 14 columns
  const colors = [
    '#000000', '#808080', '#800000', '#FF0000', '#800080', '#FF00FF', '#008000',
    '#00FF00', '#808000', '#FFFF00', '#000080', '#0000FF', '#008080', '#00FFFF',
    '#C0C0C0', '#FFFFFF', '#404040', '#FF8080', '#8000FF', '#FF0080', '#00FF80',
    '#FFFF80', '#8080FF', '#80FFFF', '#FF8000', '#FF4080', '#80FF00', '#4080FF'
  ]

  const clearCanvas = () => {
    if (canvasComponentRef.current) {
      canvasComponentRef.current.clear()
    }
  }

  const handleNew = () => {
    if (confirm('Do you want to save changes to Untitled?')) {
      // In a real app, you'd save here
    }
    clearCanvas()
  }

  const handleSave = () => {
    const canvas = canvasComponentRef.current?.getCanvas()
    if (!canvas) return
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `paint-${new Date().toISOString().split('T')[0]}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    })
  }

  const floodFill = (canvas, startX, startY, fillColor) => {
    const ctx = canvas.getContext('2d')
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const data = imageData.data
    const width = canvas.width
    const height = canvas.height
    
    const startPos = (startY * width + startX) * 4
    const targetColor = {
      r: data[startPos],
      g: data[startPos + 1],
      b: data[startPos + 2],
      a: data[startPos + 3]
    }
    
    const fillColorRgb = {
      r: parseInt(fillColor.slice(1, 3), 16),
      g: parseInt(fillColor.slice(3, 5), 16),
      b: parseInt(fillColor.slice(5, 7), 16)
    }
    
    // If clicking on the same color, don't fill
    if (targetColor.r === fillColorRgb.r && 
        targetColor.g === fillColorRgb.g && 
        targetColor.b === fillColorRgb.b) {
      return
    }
    
    const stack = [[startX, startY]]
    
    while (stack.length > 0) {
      const [x, y] = stack.pop()
      const pos = (y * width + x) * 4
      
      if (x < 0 || x >= width || y < 0 || y >= height) continue
      if (data[pos] !== targetColor.r || 
          data[pos + 1] !== targetColor.g || 
          data[pos + 2] !== targetColor.b ||
          data[pos + 3] !== targetColor.a) continue
      
      data[pos] = fillColorRgb.r
      data[pos + 1] = fillColorRgb.g
      data[pos + 2] = fillColorRgb.b
      
      stack.push([x + 1, y])
      stack.push([x - 1, y])
      stack.push([x, y + 1])
      stack.push([x, y - 1])
    }
    
    ctx.putImageData(imageData, 0, 0)
  }

  const handleDrawingStart = (pos, canvas) => {
    if (!canvas) return
    
    if (currentTool === 'fill') {
      floodFill(canvas, Math.floor(pos.x), Math.floor(pos.y), foregroundColor)
      return
    }
    
    setIsDrawing(true)
    setStartPos(pos)

    if (currentTool === 'pen' || currentTool === 'brush' || currentTool === 'eraser') {
      const ctx = canvas.getContext('2d')
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    }
  }

  const handleDrawing = (pos, canvas) => {
    if (!isDrawing || !canvas) return

    const ctx = canvas.getContext('2d')
    ctx.lineWidth = brushSize
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'

    if (currentTool === 'pen') {
      ctx.strokeStyle = foregroundColor
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    } else if (currentTool === 'brush') {
      ctx.strokeStyle = foregroundColor
      ctx.globalAlpha = 0.5
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
      ctx.globalAlpha = 1.0
    } else if (currentTool === 'eraser') {
      ctx.strokeStyle = backgroundColor
      ctx.lineTo(pos.x, pos.y)
      ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(pos.x, pos.y)
    } else if (currentTool === 'line') {
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      const tempCtx = tempCanvas.getContext('2d')
      tempCtx.drawImage(canvas, 0, 0)
      tempCtx.strokeStyle = foregroundColor
      tempCtx.lineWidth = brushSize
      tempCtx.beginPath()
      tempCtx.moveTo(startPos.x, startPos.y)
      tempCtx.lineTo(pos.x, pos.y)
      tempCtx.stroke()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(tempCanvas, 0, 0)
    } else if (currentTool === 'rectangle') {
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      const tempCtx = tempCanvas.getContext('2d')
      tempCtx.drawImage(canvas, 0, 0)
      tempCtx.strokeStyle = foregroundColor
      tempCtx.lineWidth = brushSize
      tempCtx.strokeRect(
        Math.min(startPos.x, pos.x),
        Math.min(startPos.y, pos.y),
        Math.abs(pos.x - startPos.x),
        Math.abs(pos.y - startPos.y)
      )
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(tempCanvas, 0, 0)
    } else if (currentTool === 'circle') {
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = canvas.width
      tempCanvas.height = canvas.height
      const tempCtx = tempCanvas.getContext('2d')
      tempCtx.drawImage(canvas, 0, 0)
      tempCtx.strokeStyle = foregroundColor
      tempCtx.lineWidth = brushSize
      const radius = Math.sqrt(
        Math.pow(pos.x - startPos.x, 2) + Math.pow(pos.y - startPos.y, 2)
      )
      tempCtx.beginPath()
      tempCtx.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI)
      tempCtx.stroke()
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(tempCanvas, 0, 0)
    }
  }

  const handleDrawingEnd = (canvas) => {
    setIsDrawing(false)
  }

  return (
    <div 
      className="flex flex-col h-full w-full"
      style={{ 
        height: '100%', 
        width: '100%', 
        overflow: 'hidden',
        backgroundColor: '#ECE9D8',
        fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
        fontSize: '11px'
      }}
    >
      <PaintMenuBar onNew={handleNew} onSave={handleSave} />
      <div 
        className="flex flex-1 overflow-hidden" 
        style={{ 
          minHeight: 0, 
          height: '100%',
          backgroundColor: '#ECE9D8'
        }}
      >
        <Toolbox 
          currentTool={currentTool}
          onToolChange={setCurrentTool}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
        />
        <PaintCanvas
          ref={canvasComponentRef}
          currentTool={currentTool}
          foregroundColor={foregroundColor}
          backgroundColor={backgroundColor}
          brushSize={brushSize}
          onDrawingStart={handleDrawingStart}
          onDrawing={handleDrawing}
          onDrawingEnd={handleDrawingEnd}
        />
      </div>
      <ColorPalette
        colors={colors}
        foregroundColor={foregroundColor}
        backgroundColor={backgroundColor}
        onForegroundColorChange={setForegroundColor}
        onBackgroundColorChange={setBackgroundColor}
      />
      <div 
        style={{
          height: '22px',
          backgroundColor: '#C0C0C0',
          border: '1px inset #808080',
          borderColor: '#808080 #FFFFFF #FFFFFF #808080',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '4px',
          fontSize: '11px',
          fontFamily: 'Tahoma, sans-serif',
          color: '#000000'
        }}
      >
        For Help, click Help Topics on the Help Menu.
      </div>
    </div>
  )
}

export default Paint
