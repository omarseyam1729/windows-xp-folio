const Toolbox = ({ currentTool, onToolChange, brushSize, onBrushSizeChange }) => {
  // Classic Paint tools - 16 tools in 2-column grid (8x2)
  const tools = [
    { id: 'pen', icon: '✏️', title: 'Free-Form Select' },
    { id: 'select', icon: '▭', title: 'Select' },
    { id: 'eraser', icon: '🧹', title: 'Eraser' },
    { id: 'fill', icon: '🪄', title: 'Fill With Color' },
    { id: 'pick', icon: '👁️', title: 'Pick Color' },
    { id: 'magnify', icon: '🔍', title: 'Magnifier' },
    { id: 'pencil', icon: '✏️', title: 'Pencil' },
    { id: 'brush', icon: '🖌️', title: 'Brush' },
    { id: 'airbrush', icon: '💨', title: 'Airbrush' },
    { id: 'text', icon: 'A', title: 'Text' },
    { id: 'line', icon: '➖', title: 'Line' },
    { id: 'curve', icon: '~', title: 'Curve' },
    { id: 'rectangle', icon: '▭', title: 'Rectangle' },
    { id: 'polygon', icon: '⬟', title: 'Polygon' },
    { id: 'ellipse', icon: '⭕', title: 'Ellipse' },
    { id: 'rounded', icon: '▢', title: 'Rounded Rectangle' },
  ]

  const renderToolIcon = (tool) => {
    // Simple pixel-art style rendering
    return (
      <div style={{
        width: '16px',
        height: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
        fontFamily: 'monospace'
      }}>
        {tool.icon}
      </div>
    )
  }

  return (
    <div 
      style={{
        width: '64px',
        backgroundColor: '#ECE9D8',
        border: '1px inset',
        borderColor: '#808080 #FFFFFF #FFFFFF #808080',
        padding: '2px',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
      }}
    >
      <div 
        style={{
          fontSize: '11px',
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: '2px',
          padding: '2px',
          fontFamily: 'Tahoma, sans-serif'
        }}
      >
        Tools
      </div>
      
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '0',
          width: '100%'
        }}
      >
        {tools.map(tool => {
          const isActive = currentTool === tool.id
          // Checkered pattern for active state
          const checkeredPattern = isActive ? {
            backgroundImage: `
              linear-gradient(45deg, #FFFFFF 25%, transparent 25%),
              linear-gradient(-45deg, #FFFFFF 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #FFFFFF 75%),
              linear-gradient(-45deg, transparent 75%, #FFFFFF 75%)
            `,
            backgroundSize: '4px 4px',
            backgroundPosition: '0 0, 0 2px, 2px -2px, -2px 0px',
            backgroundColor: '#ECE9D8'
          } : { backgroundColor: '#ECE9D8' }

          return (
            <button
              key={tool.id}
              style={{
                width: '28px',
                height: '28px',
                ...checkeredPattern,
                border: isActive ? '1px inset' : '1px outset',
                borderColor: isActive
                  ? '#808080 #FFFFFF #FFFFFF #808080'
                  : '#FFFFFF #FFFFFF #808080 #000000',
                borderTopColor: isActive ? '#808080' : '#FFFFFF',
                borderLeftColor: isActive ? '#808080' : '#FFFFFF',
                borderRightColor: isActive ? '#FFFFFF' : '#808080',
                borderBottomColor: isActive ? '#FFFFFF' : '#000000',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0',
                margin: '0',
                position: 'relative'
              }}
              onClick={() => onToolChange(tool.id)}
              title={tool.title}
              onMouseDown={(e) => {
                e.currentTarget.style.borderColor = '#808080 #FFFFFF #FFFFFF #808080'
                e.currentTarget.style.borderStyle = 'inset'
              }}
              onMouseUp={(e) => {
                if (isActive) {
                  e.currentTarget.style.borderColor = '#808080 #FFFFFF #FFFFFF #808080'
                  e.currentTarget.style.borderStyle = 'inset'
                } else {
                  e.currentTarget.style.borderColor = '#FFFFFF #FFFFFF #808080 #000000'
                  e.currentTarget.style.borderStyle = 'outset'
                }
              }}
              onMouseLeave={(e) => {
                if (isActive) {
                  e.currentTarget.style.borderColor = '#808080 #FFFFFF #FFFFFF #808080'
                  e.currentTarget.style.borderStyle = 'inset'
                } else {
                  e.currentTarget.style.borderColor = '#FFFFFF #FFFFFF #808080 #000000'
                  e.currentTarget.style.borderStyle = 'outset'
                }
              }}
            >
              {renderToolIcon(tool)}
            </button>
          )
        })}
      </div>

      {/* Options Box - Context-aware area below tools - Graphics only, no text */}
      <div 
        style={{
          marginTop: '4px',
          minHeight: '60px',
          backgroundColor: '#ECE9D8',
          border: '1px inset',
          borderColor: '#808080 #FFFFFF #FFFFFF #808080',
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {currentTool === 'brush' || currentTool === 'airbrush' ? (
          // Brush shapes visualization - diagonal line of dots from small to large
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
            {[2, 4, 6, 8].map((size, i) => (
              <div key={i} style={{ display: 'flex', gap: '1px' }}>
                {Array.from({ length: 3 + i }).map((_, j) => (
                  <div
                    key={j}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      backgroundColor: '#000000',
                      borderRadius: '50%'
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : currentTool === 'line' || currentTool === 'curve' ? (
          // Line width visualization - horizontal lines of increasing thickness
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'center' }}>
            {[1, 2, 3, 4].map((width, i) => (
              <div
                key={i}
                style={{
                  width: '40px',
                  height: `${width}px`,
                  backgroundColor: '#000000'
                }}
              />
            ))}
          </div>
        ) : (
          // Empty options box
          <div style={{ width: '100%', height: '100%' }} />
        )}
      </div>
    </div>
  )
}

export default Toolbox

