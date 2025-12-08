const Run = () => {
  return (
    <div className="p-6 bg-white h-full overflow-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Run</h2>
        <p className="text-gray-600 mb-4">Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2">Open:</label>
          <input 
            type="text" 
            placeholder="Type the name of a program, folder, document, or Internet resource"
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            OK
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Cancel
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Browse...
          </button>
        </div>
      </div>
    </div>
  )
}

export default Run

