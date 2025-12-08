const MyRecentDocuments = () => {
  return (
    <div className="p-6 bg-white h-full overflow-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">My Recent Documents</h2>
        <p className="text-gray-600">Shortcuts to your recently used documents.</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded">
          <span className="text-2xl">📄</span>
          <span>Recent File 1.txt</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded">
          <span className="text-2xl">📄</span>
          <span>Recent File 2.docx</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded">
          <span className="text-2xl">📄</span>
          <span>Recent File 3.pdf</span>
        </div>
      </div>
    </div>
  )
}

export default MyRecentDocuments

