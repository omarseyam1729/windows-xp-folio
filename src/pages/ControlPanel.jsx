const ControlPanel = () => {
  const categoryItems = [
    { icon: '/Folder Options.ico', name: 'Appearance and Themes' },
    { icon: '/Network Connections.ico', name: 'Network and Internet Connections' },
    { icon: '/Control Panel Folder.ico', name: 'Add or Remove Programs' },
    { icon: '/Music Disk.ico', name: 'Sounds, Speech, and Audio Devices' },
    { icon: '/Computer Folder.ico', name: 'Performance and Maintenance' },
    { icon: '/My Documents.ico', name: 'User Accounts' },
    { icon: '/Printer Folder.ico', name: 'Printers and Other Hardware' },
    { icon: '/Fonts.ico', name: 'Date, Time, Language, and Regional Options' },
    { icon: '/Control Panel Folder.ico', name: 'Security Center' },
    { icon: '/Control Panel Folder.ico', name: 'Accessibility Options' },
  ]

  return (
    <div className="xp-control-panel-container">
      {/* Menu Bar */}
      <div className="xp-control-panel-menubar">
        <div className="xp-menubar-item">File</div>
        <div className="xp-menubar-item">Edit</div>
        <div className="xp-menubar-item">View</div>
        <div className="xp-menubar-item">Favorites</div>
        <div className="xp-menubar-item">Tools</div>
        <div className="xp-menubar-item">Help</div>
      </div>

      {/* Navigation Toolbar */}
      <div className="xp-control-panel-toolbar">
        <button className="xp-nav-back-btn">
          <span className="xp-nav-back-icon">◄</span>
        </button>
        <div className="xp-toolbar-separator"></div>
        <button className="xp-toolbar-btn">
          <span className="xp-toolbar-icon">
            <img src="/Windows Explorer.ico" alt="Search" className="w-4 h-4 object-contain" />
          </span>
          <span>Search</span>
        </button>
        <button className="xp-toolbar-btn">
          <span className="xp-toolbar-icon">
            <img src="/Open Folder.ico" alt="Folders" className="w-4 h-4 object-contain" />
          </span>
          <span>Folders</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="xp-control-panel-content">
        {/* Left Sidebar */}
        <div className="xp-control-panel-sidebar">
          {/* Control Panel Box */}
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-box-header">
              Control Panel
              <button className="xp-sidebar-toggle">«</button>
            </div>
            <div className="xp-sidebar-box-content">
              <div className="xp-sidebar-link">
                <span className="xp-sidebar-link-icon">✓</span>
                <span>Switch to Classic View</span>
              </div>
            </div>
          </div>

          {/* See Also Box */}
          <div className="xp-sidebar-box">
            <div className="xp-sidebar-box-header">
              See Also
              <button className="xp-sidebar-toggle">«</button>
            </div>
            <div className="xp-sidebar-box-content">
              <div className="xp-sidebar-link">
                <span className="xp-sidebar-link-icon">
                  <img src="/Windows Update.ico" alt="Windows Update" className="w-4 h-4 object-contain" />
                </span>
                <span>Windows Update</span>
              </div>
              <div className="xp-sidebar-link">
                <span className="xp-sidebar-link-icon">
                  <img src="/Folder Options.ico" alt="Help" className="w-4 h-4 object-contain" />
                </span>
                <span>Help and Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="xp-control-panel-main">
          <h2 className="xp-category-header">Pick a category</h2>
          <div className="xp-category-grid">
            {categoryItems.map((item, index) => (
              <div key={index} className="xp-category-item">
                <span className="xp-category-icon">
                  {item.icon && item.icon.startsWith('/') ? (
                    <img src={item.icon} alt={item.name} className="w-12 h-12 object-contain" />
                  ) : (
                    item.icon
                  )}
                </span>
                <span className="xp-category-text">{item.name}</span>
              </div>
            ))}
          </div>
          <div className="xp-watermark">✓</div>
        </div>
      </div>
    </div>
  )
}

export default ControlPanel

