const PaintMenuBar = ({ onNew, onSave }) => {
  return (
    <div 
      className="flex"
      style={{
        backgroundColor: '#ECE9D8',
        padding: '1px 2px',
        border: 'none',
        borderBottom: '1px solid #808080',
        fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
        fontSize: '11px',
        height: '22px',
        alignItems: 'center'
      }}
    >
      <div className="flex" style={{ gap: '0px' }}>
        <div className="relative group">
          <button 
            className="cursor-pointer"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#000000',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              fontSize: '11px',
              padding: '2px 6px',
              margin: '0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#316AC5'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#000000'
            }}
          >
            File
          </button>
          <div 
            className="absolute top-full left-0 mt-0.5 hidden group-hover:block z-10"
            style={{
              backgroundColor: '#C0C0C0',
              border: '1px solid #808080',
              boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              minWidth: '120px'
            }}
          >
            <button
              className="block w-full text-left px-3 py-1 cursor-pointer text-xs whitespace-nowrap"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#000000',
                fontFamily: 'Tahoma, Arial, sans-serif'
              }}
              onClick={onNew}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#316AC5'
                e.currentTarget.style.color = '#FFFFFF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#000000'
              }}
            >
              New
            </button>
            <button
              className="block w-full text-left px-3 py-1 cursor-pointer text-xs whitespace-nowrap"
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: '#000000',
                fontFamily: 'Tahoma, Arial, sans-serif'
              }}
              onClick={onSave}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#316AC5'
                e.currentTarget.style.color = '#FFFFFF'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = '#000000'
              }}
            >
              Save As...
            </button>
          </div>
        </div>
        {['Edit', 'View', 'Image', 'Colors', 'Help'].map((item) => (
          <button 
            key={item}
            className="cursor-pointer"
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              color: '#000000',
              fontFamily: 'Tahoma, MS Sans Serif, sans-serif',
              fontSize: '11px',
              padding: '2px 6px',
              margin: '0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#316AC5'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#000000'
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}

export default PaintMenuBar

