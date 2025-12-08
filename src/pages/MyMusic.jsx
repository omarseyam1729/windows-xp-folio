const MyMusic = () => {
  return (
    <div className="p-6 bg-white h-full overflow-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">My Music</h2>
        <p className="text-gray-600">This folder contains your music files.</p>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded">
          <img src="/Music Disk.ico" alt="Music" className="w-6 h-6 object-contain" />
          <span>Song 1.mp3</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded">
          <img src="/Music Disk.ico" alt="Music" className="w-6 h-6 object-contain" />
          <span>Song 2.mp3</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded">
          <img src="/Music Disk.ico" alt="Music" className="w-6 h-6 object-contain" />
          <span>Song 3.mp3</span>
        </div>
        <div className="flex items-center gap-3 p-2 hover:bg-blue-50 cursor-pointer rounded">
          <img src="/Closed folder.ico" alt="Folder" className="w-6 h-6 object-contain" />
          <span>Album Folder</span>
        </div>
      </div>
    </div>
  )
}

export default MyMusic

