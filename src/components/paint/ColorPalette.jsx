import { useState } from 'react'

const ColorPalette = ({ colors, foregroundColor, backgroundColor, onForegroundColorChange, onBackgroundColorChange }) => {
  const [activeColor, setActiveColor] = useState('foreground') // 'foreground' or 'background'

  const handleColorClick = (color) => {
    if (activeColor === 'foreground') {
      onForegroundColorChange(color)
    } else {
      onBackgroundColorChange(color)
    }
  }

  const handleColorBoxClick = () => {
    setActiveColor(activeColor === 'foreground' ? 'background' : 'foreground')
  }

  return (
    <div 
      style={{
        height: '60px',
        backgroundColor: '#C0C0C0',
        border: '1px outset',
        borderColor: '#FFFFFF #808080 #808080 #FFFFFF',
        padding: '2px',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '11px'
      }}
    >
      {/* Active Colors Section */}
      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1px',
          marginRight: '2px'
        }}
      >
        <div style={{ fontSize: '10px', color: '#000000', marginBottom: '1px' }}>Colors</div>
        <div
          onClick={handleColorBoxClick}
          style={{
            position: 'relative',
            width: '36px',
            height: '36px',
            cursor: 'pointer',
            border: '2px inset',
            borderColor: '#808080 #FFFFFF #FFFFFF #808080',
            backgroundColor: '#C0C0C0'
          }}
        >
          {/* Background Color (bottom-right, z-index low) - 50% overlap */}
          <div
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '20px',
              height: '20px',
              backgroundColor: backgroundColor,
              border: '1px solid #000000',
              zIndex: 1
            }}
          />
          {/* Foreground Color (top-left, z-index high) - overlaps by 50% */}
          <div
            style={{
              position: 'absolute',
              top: '2px',
              left: '2px',
              width: '20px',
              height: '20px',
              backgroundColor: foregroundColor,
              border: '1px solid #000000',
              zIndex: 2
            }}
          />
        </div>
      </div>

      {/* Color Palette Grid - 2 rows x 14 columns, zero gap */}
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(14, 15px)',
          gridTemplateRows: 'repeat(2, 20px)',
          gap: '0px',
          flex: 1,
          marginLeft: '2px'
        }}
      >
        {colors.map((color, index) => (
          <button
            key={index}
            style={{
              width: '15px',
              height: '20px',
              backgroundColor: color,
              border: '1px inset',
              borderColor: '#808080 #FFFFFF #FFFFFF #808080',
              cursor: 'pointer',
              padding: '0',
              margin: '0',
              boxSizing: 'border-box'
            }}
            onClick={() => handleColorClick(color)}
            onMouseDown={(e) => {
              e.currentTarget.style.borderColor = '#000000 #808080 #808080 #000000'
              e.currentTarget.style.borderStyle = 'inset'
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.borderColor = '#808080 #FFFFFF #FFFFFF #808080'
              e.currentTarget.style.borderStyle = 'inset'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#808080 #FFFFFF #FFFFFF #808080'
              e.currentTarget.style.borderStyle = 'inset'
            }}
            title={color}
          />
        ))}
      </div>
    </div>
  )
}

export default ColorPalette

