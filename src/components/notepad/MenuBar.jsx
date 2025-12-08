const MenuBar = ({ onNew, onSave }) => {
  return (
    <div className="xp-border-inset bg-xp-gray-200 px-1 py-0.5 flex gap-4 text-xs mb-1">
      <div className="flex gap-2">
        <div className="relative group">
          <button className="px-2 py-0.5 hover:bg-blue-600 hover:text-white cursor-pointer">
            File
          </button>
          <div className="absolute top-full left-0 mt-0.5 bg-xp-gray-200 xp-window-shadow hidden group-hover:block z-10">
            <button
              className="block w-full text-left px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer text-xs whitespace-nowrap"
              onClick={onNew}
            >
              New
            </button>
            <button
              className="block w-full text-left px-3 py-1 hover:bg-blue-600 hover:text-white cursor-pointer text-xs whitespace-nowrap"
              onClick={onSave}
            >
              Save As...
            </button>
          </div>
        </div>
        <button className="px-2 py-0.5 hover:bg-blue-600 hover:text-white cursor-pointer">
          Edit
        </button>
        <button className="px-2 py-0.5 hover:bg-blue-600 hover:text-white cursor-pointer">
          Format
        </button>
        <button className="px-2 py-0.5 hover:bg-blue-600 hover:text-white cursor-pointer">
          View
        </button>
        <button className="px-2 py-0.5 hover:bg-blue-600 hover:text-white cursor-pointer">
          Help
        </button>
      </div>
    </div>
  )
}

export default MenuBar

