const Search = () => {
  return (
    <div className="p-6 bg-white h-full overflow-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Search Results</h2>
        <p className="text-gray-600">Search for files, folders, and more.</p>
      </div>
      <div className="mb-4">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search for files or folders..." 
            className="flex-1 px-3 py-2 border border-gray-300 rounded"
          />
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Search
          </button>
        </div>
      </div>
      <div className="border border-gray-300 rounded p-4">
        <p className="text-gray-600 text-sm">Enter a search term above to find files and folders on your computer.</p>
      </div>
    </div>
  )
}

export default Search

