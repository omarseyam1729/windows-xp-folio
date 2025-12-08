const MyComputer = () => {
  return (
    <div className="explorer-window">
      <div className="explorer-main-content">
        {/* Left Sidebar */}
        <div className="explorer-sidebar">
        <div className="sidebar-box">
          <div className="sidebar-header">
            System Tasks
            <button className="sidebar-toggle-btn">«</button>
          </div>
          <div className="sidebar-content">
            <div className="sidebar-link">
              <span className="sidebar-link-icon">
                <img src="/Computer Folder.ico" alt="System" className="w-4 h-4 object-contain" />
              </span>
              <span>View system information</span>
            </div>
            <div className="sidebar-link">
              <span className="sidebar-link-icon">
                <img src="/Control Panel Folder.ico" alt="Programs" className="w-4 h-4 object-contain" />
              </span>
              <span>Add or remove programs</span>
            </div>
            <div className="sidebar-link">
              <span className="sidebar-link-icon">
                <img src="/Control Panel Folder.ico" alt="Settings" className="w-4 h-4 object-contain" />
              </span>
              <span>Change a setting</span>
            </div>
          </div>
        </div>

        <div className="sidebar-box">
          <div className="sidebar-header">
            Other Places
            <button className="sidebar-toggle-btn">«</button>
          </div>
          <div className="sidebar-content">
            <div className="sidebar-link">
              <span className="sidebar-link-icon">
                <img src="/Entire Network.ico" alt="Network" className="w-4 h-4 object-contain" />
              </span>
              <span>My Network Places</span>
            </div>
            <div className="sidebar-link">
              <span className="sidebar-link-icon">
                <img src="/My Documents.ico" alt="Documents" className="w-4 h-4 object-contain" />
              </span>
              <span>My Documents</span>
            </div>
            <div className="sidebar-link">
              <span className="sidebar-link-icon">
                <img src="/My shared Folders.ico" alt="Shared" className="w-4 h-4 object-contain" />
              </span>
              <span>Shared Documents</span>
            </div>
            <div className="sidebar-link">
              <span className="sidebar-link-icon">
                <img src="/Control Panel Folder.ico" alt="Control Panel" className="w-4 h-4 object-contain" />
              </span>
              <span>Control Panel</span>
            </div>
          </div>
        </div>

        <div className="sidebar-box">
          <div className="sidebar-header">
            Details
            <button className="sidebar-toggle-btn">«</button>
          </div>
          <div className="sidebar-content">
            <div className="sidebar-detail">
              <span className="sidebar-detail-label">My Computer</span>
            </div>
            <div className="sidebar-detail">
              <span className="sidebar-detail-label">System Folder</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Content Area */}
      <div className="explorer-content">
        {/* Hard Disk Drives Group */}
        <div className="group-header">Hard Disk Drives</div>
        <div className="drive-grid">
          <div className="drive-item">
            <div className="drive-icon">
              <img src="/Local Disk (C-).ico" alt="Hard Disk" className="w-12 h-12 object-contain" />
            </div>
            <div className="drive-info">
              <div className="drive-name">Local Disk (C:)</div>
              <div className="drive-type">Local Disk</div>
              <div className="drive-size">Total Size: 50 GB</div>
            </div>
          </div>

          <div className="drive-item">
            <div className="drive-icon">
              <img src="/Local Disk (D-).ico" alt="Hard Disk" className="w-12 h-12 object-contain" />
            </div>
            <div className="drive-info">
              <div className="drive-name">Local Disk (D:)</div>
              <div className="drive-type">Local Disk</div>
              <div className="drive-size">Total Size: 100 GB</div>
            </div>
          </div>
        </div>

        {/* Devices with Removable Storage Group */}
        <div className="group-header">Devices with Removable Storage</div>
        <div className="drive-grid">
          <div className="drive-item">
            <div className="drive-icon">
              <img src="/CD-ROM.ico" alt="CD Drive" className="w-12 h-12 object-contain" />
            </div>
            <div className="drive-info">
              <div className="drive-name">CD Drive (E:)</div>
              <div className="drive-type">CD-ROM Drive</div>
            </div>
          </div>

          <div className="drive-item">
            <div className="drive-icon">
              <img src="/DVD-ROM.ico" alt="DVD Drive" className="w-12 h-12 object-contain" />
            </div>
            <div className="drive-info">
              <div className="drive-name">DVD Drive (F:)</div>
              <div className="drive-type">DVD-ROM Drive</div>
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="explorer-status-bar">
        <div className="status-bar-left">
          <span>5 objects</span>
        </div>
        <div className="status-bar-right">
          <span className="status-bar-icon">🖥️</span>
          <span>My Computer</span>
        </div>
      </div>
    </div>
  )
}

export default MyComputer

