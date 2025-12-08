const InternetExplorer = () => {
  return (
    <div className="ie-container">
      {/* IE Toolbar */}
      <div className="ie-toolbar">
        <div className="ie-toolbar-left">
          <button className="ie-toolbar-btn" title="Back">◄</button>
          <button className="ie-toolbar-btn" title="Forward">►</button>
          <button className="ie-toolbar-btn" title="Stop">■</button>
          <button className="ie-toolbar-btn" title="Refresh">↻</button>
          <button className="ie-toolbar-btn" title="Home">⌂</button>
        </div>
        <div className="ie-address-bar">
          <span className="ie-address-icon">🌐</span>
          <input 
            type="text" 
            className="ie-address-input" 
            defaultValue="http://www.google.com"
            readOnly
          />
          <button className="ie-go-btn">Go</button>
        </div>
        <div className="ie-toolbar-right">
          <button className="ie-toolbar-btn" title="Search">🔍</button>
          <button className="ie-toolbar-btn" title="Favorites">⭐</button>
        </div>
      </div>

      {/* Google Page Content */}
      <div className="ie-content google-page">
        <div className="google-container">
          <div className="google-logo">
            <span className="google-g">G</span>
            <span className="google-o1">o</span>
            <span className="google-o2">o</span>
            <span className="google-g2">g</span>
            <span className="google-l">l</span>
            <span className="google-e">e</span>
          </div>
          
          <div className="google-search-box">
            <input 
              type="text" 
              className="google-search-input"
              defaultValue=""
              placeholder="Search Google or type a URL"
            />
            <div className="google-search-buttons">
              <button className="google-btn">Google Search</button>
              <button className="google-btn">I'm Feeling Lucky</button>
            </div>
          </div>

          <div className="google-links">
            <a href="#" className="google-link">Gmail</a>
            <a href="#" className="google-link">Images</a>
            <a href="#" className="google-link">Maps</a>
            <a href="#" className="google-link">YouTube</a>
            <a href="#" className="google-link">News</a>
            <a href="#" className="google-link">Shopping</a>
          </div>

          <div className="google-footer">
            <div className="google-footer-left">
              <a href="#">About</a>
              <a href="#">Advertising</a>
              <a href="#">Business</a>
              <a href="#">How Search works</a>
            </div>
            <div className="google-footer-right">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Settings</a>
            </div>
          </div>
        </div>
      </div>

      {/* IE Status Bar */}
      <div className="ie-status-bar">
        <span className="ie-status-text">Done</span>
      </div>
    </div>
  )
}

export default InternetExplorer

