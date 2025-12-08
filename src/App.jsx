import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Desktop from './components/Desktop'
import Taskbar from './components/Taskbar'
import About from './pages/About'
import Projects from './pages/Projects'
import Contact from './pages/Contact'

function App() {
  const [openWindows, setOpenWindows] = useState([])
  const [startMenuOpen, setStartMenuOpen] = useState(false)

  const openWindow = (id, title, component) => {
    if (!openWindows.find(w => w.id === id)) {
      // Resume, Projects, and Challenge always open maximized
      const shouldMaximize = component === 'Resume' || component === 'Projects' || component === 'Challenge'
      setOpenWindows([...openWindows, { id, title, component, minimized: false, maximized: shouldMaximize }])
    }
  }

  const closeWindow = (id) => {
    setOpenWindows(openWindows.filter(w => w.id !== id))
  }

  const minimizeWindow = (id) => {
    setOpenWindows(openWindows.map(w => 
      w.id === id ? { ...w, minimized: !w.minimized } : w
    ))
  }

  const maximizeWindow = (id) => {
    setOpenWindows(openWindows.map(w => {
      if (w.id === id) {
        // Resume, Projects, and Challenge should always stay maximized
        if (w.component === 'Resume' || w.component === 'Projects' || w.component === 'Challenge') {
          return { ...w, maximized: true }
        }
        return { ...w, maximized: !w.maximized }
      }
      return w
    }))
  }

  const toggleStartMenu = () => {
    setStartMenuOpen(!startMenuOpen)
  }

  return (
    <Router>
      <div className="w-screen h-screen relative overflow-hidden bg-xp-blue-500">
        <Desktop 
          openWindow={openWindow}
          openWindows={openWindows}
          closeWindow={closeWindow}
          minimizeWindow={minimizeWindow}
          maximizeWindow={maximizeWindow}
        />
        <Taskbar 
          startMenuOpen={startMenuOpen}
          toggleStartMenu={toggleStartMenu}
          openWindows={openWindows}
          minimizeWindow={minimizeWindow}
          maximizeWindow={maximizeWindow}
          openWindow={openWindow}
          closeWindow={closeWindow}
        />
      </div>
    </Router>
  )
}

export default App

