const MyDocuments = () => {
  return (
    <div className="p-6 bg-white h-full overflow-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">My Documents</h2>
        <p className="text-gray-600">This folder contains your documents.</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded">
          <span className="text-2xl">📄</span>
          <span>My File.txt</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded">
          <span className="text-2xl">📄</span>
          <span>Document.docx</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded">
          <span className="text-2xl">📄</span>
          <span>Notes.txt</span>
        </div>
      </div>
    </div>
  )
}

export default MyDocuments

