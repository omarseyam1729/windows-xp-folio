import { useState, useRef, useEffect } from 'react'

const BANNER = [
  'Microsoft Windows XP [Version 5.1.2600]',
  '(C) Copyright 1985-2001 Microsoft Corp.',
  ''
]

// A small command prompt that browses the same localStorage filesystem as the
// desktop. Reads come from the live `nodes` prop; mutations go through the
// handlers so the desktop and any open folder windows stay in sync.
const CommandPrompt = ({ nodes, onCreateFolder, onCreateFile, onDelete, onOpen, onClose }) => {
  const [lines, setLines] = useState(BANNER)
  const [input, setInput] = useState('')
  const [cwdId, setCwdId] = useState(null) // null = Desktop (drive root)
  const [history, setHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)

  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  // Keep the latest nodes available to command handlers without stale closures.
  const nodesRef = useRef(nodes)
  nodesRef.current = nodes

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  // --- filesystem helpers (read-only, from the live nodes) -------------------
  const nodeById = (id) => nodesRef.current.find((n) => n.id === id) || null
  const childrenOf = (id) =>
    nodesRef.current.filter((n) => n.parentId === id && !n.trashed)

  const pathString = (id) => {
    const parts = []
    let cur = id ? nodeById(id) : null
    while (cur) {
      parts.unshift(cur.name)
      cur = cur.parentId ? nodeById(cur.parentId) : null
    }
    return 'C:\\' + parts.join('\\')
  }

  const promptFor = (id) => `${pathString(id)}>`

  // Resolve a path string (supports \, /, .. and a leading slash for root).
  // Returns the folder id (null = root) or undefined if it can't be found.
  const resolveDir = (startId, raw) => {
    let cur = startId
    let str = raw
    if (str.startsWith('\\') || str.startsWith('/')) cur = null
    const segs = str.split(/[\\/]+/).filter(Boolean)
    for (const seg of segs) {
      if (seg === '.') continue
      if (seg === '..') {
        cur = cur ? nodeById(cur)?.parentId ?? null : null
        continue
      }
      const child = childrenOf(cur).find(
        (n) => n.type === 'folder' && n.name.toLowerCase() === seg.toLowerCase()
      )
      if (!child) return undefined
      cur = child.id
    }
    return cur
  }

  const findChild = (dirId, name) => {
    const lower = name.toLowerCase()
    return (
      childrenOf(dirId).find(
        (n) => n.name.toLowerCase() === lower || n.name.toLowerCase() === `${lower}.txt`
      ) || null
    )
  }

  // --- command engine --------------------------------------------------------
  const run = (raw) => {
    const trimmed = raw.trim()
    const out = []
    const print = (...xs) => out.push(...xs)

    const space = trimmed.indexOf(' ')
    const cmd = (space === -1 ? trimmed : trimmed.slice(0, space)).toLowerCase()
    const arg = space === -1 ? '' : trimmed.slice(space + 1).trim()

    switch (cmd) {
      case '':
        break

      case 'help':
      case '?':
        print(
          'Supported commands:',
          '  help            Show this help',
          '  dir, ls         List files and folders here',
          '  cd <path>       Change directory ( .. and \\ work )',
          '  cd              Show the current directory',
          '  tree            Show this folder as a tree',
          '  type <file>     Print a text file',
          '  open <name>     Open a file/folder in a window',
          '  mkdir <name>    Create a folder',
          '  new <name>      Create a text file',
          '  del <name>      Send an item to the Recycle Bin',
          '  echo <text>     Print text',
          '  cls             Clear the screen',
          '  ver, date, time, whoami, exit'
        )
        break

      case 'cls':
      case 'clear':
        setLines([])
        return

      case 'ver':
        print('', 'Microsoft Windows XP [Version 5.1.2600]', '')
        break

      case 'whoami':
        print('xp-folio\\guest')
        break

      case 'date':
        print(`The current date is: ${new Date().toLocaleDateString()}`)
        break

      case 'time':
        print(`The current time is: ${new Date().toLocaleTimeString()}`)
        break

      case 'echo':
        print(arg.length ? arg : 'ECHO is on.')
        break

      case 'cd':
      case 'chdir': {
        if (!arg) {
          print(pathString(cwdId))
          break
        }
        const target = resolveDir(cwdId, arg)
        if (target === undefined) {
          print('The system cannot find the path specified.')
        } else {
          setCwdId(target)
        }
        break
      }

      case 'pwd':
        print(pathString(cwdId))
        break

      case 'dir':
      case 'ls': {
        const kids = childrenOf(cwdId)
        const dirs = kids.filter((n) => n.type === 'folder')
        const files = kids.filter((n) => n.type === 'file')
        print(` Directory of ${pathString(cwdId)}`, '')
        if (kids.length === 0) {
          print('File Not Found')
        } else {
          ;[...dirs, ...files].forEach((n) => {
            const left =
              n.type === 'folder'
                ? '<DIR>'.padEnd(10)
                : String((n.content || '').length).padStart(10)
            print(`  ${left}  ${n.name}`)
          })
          print('', `     ${files.length} File(s)`, `     ${dirs.length} Dir(s)`)
        }
        break
      }

      case 'tree': {
        print(pathString(cwdId))
        const walk = (id, depth) => {
          childrenOf(id).forEach((n) => {
            print(`${'   '.repeat(depth)}${depth ? '\\__ ' : ''}${n.name}${n.type === 'folder' ? '\\' : ''}`)
            if (n.type === 'folder') walk(n.id, depth + 1)
          })
        }
        walk(cwdId, 1)
        break
      }

      case 'type':
      case 'cat': {
        if (!arg) {
          print('The syntax of the command is incorrect.')
          break
        }
        const file = findChild(cwdId, arg)
        if (!file || file.type !== 'file') {
          print(`The system cannot find the file ${arg}.`)
        } else {
          print(...(file.content ? file.content.split('\n') : ['']))
        }
        break
      }

      case 'open':
      case 'start': {
        const node = findChild(cwdId, arg)
        if (!node) {
          print(`Cannot find '${arg}'.`)
        } else {
          onOpen(node)
        }
        break
      }

      case 'mkdir':
      case 'md': {
        if (!arg) {
          print('The syntax of the command is incorrect.')
          break
        }
        onCreateFolder(cwdId)
        print(`Created folder.`)
        break
      }

      case 'new':
      case 'touch': {
        onCreateFile(cwdId)
        print('Created file.')
        break
      }

      case 'del':
      case 'erase':
      case 'rm': {
        const node = findChild(cwdId, arg)
        if (!node) {
          print(`Could Not Find ${arg}`)
        } else {
          onDelete(node.id)
          print(`Moved '${node.name}' to the Recycle Bin.`)
        }
        break
      }

      case 'exit':
        onClose()
        return

      default:
        print(
          `'${cmd}' is not recognized as an internal or external command,`,
          'operable program or batch file.'
        )
    }

    setLines((prev) => [...prev, `${promptFor(cwdId)}${raw}`, ...out, ''])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const raw = input
      if (raw.trim()) {
        setHistory((h) => [...h, raw])
      }
      setHistoryIdx(-1)
      setInput('')
      run(raw)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length) {
        const idx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1)
        setHistoryIdx(idx)
        setInput(history[idx])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIdx !== -1) {
        const idx = historyIdx + 1
        if (idx >= history.length) {
          setHistoryIdx(-1)
          setInput('')
        } else {
          setHistoryIdx(idx)
          setInput(history[idx])
        }
      }
    }
  }

  return (
    <div
      ref={scrollRef}
      className="h-full w-full overflow-auto bg-black px-2 py-1"
      style={{
        fontFamily: "Consolas, 'Lucida Console', 'Courier New', monospace",
        fontSize: '13px',
        lineHeight: '1.35',
        color: '#c8c8c8'
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {line === '' ? ' ' : line}
        </div>
      ))}

      {/* Live input line */}
      <div style={{ display: 'flex', whiteSpace: 'pre' }}>
        <span>{promptFor(cwdId)}</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          className="flex-1 bg-transparent border-none outline-none"
          style={{
            fontFamily: 'inherit',
            fontSize: 'inherit',
            color: '#f0f0f0',
            caretColor: '#f0f0f0'
          }}
        />
      </div>
    </div>
  )
}

export default CommandPrompt
