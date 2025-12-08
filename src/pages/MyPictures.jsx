const MyPictures = () => {
  return (
    <div className="p-6 bg-white h-full overflow-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">My Pictures</h2>
        <p className="text-gray-600">This folder contains your pictures.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center p-4 border border-gray-300 rounded hover:bg-blue-50 cursor-pointer">
          <div className="w-32 h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
            <img src="/camera.ico" alt="Photo" className="w-24 h-24 object-contain" />
          </div>
          <span className="text-sm">Photo 1.jpg</span>
        </div>
        <div className="flex flex-col items-center p-4 border border-gray-300 rounded hover:bg-blue-50 cursor-pointer">
          <div className="w-32 h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
            <img src="/camera.ico" alt="Photo" className="w-24 h-24 object-contain" />
          </div>
          <span className="text-sm">Photo 2.png</span>
        </div>
        <div className="flex flex-col items-center p-4 border border-gray-300 rounded hover:bg-blue-50 cursor-pointer">
          <div className="w-32 h-32 bg-gray-200 rounded mb-2 flex items-center justify-center">
            <img src="/camera.ico" alt="Photo" className="w-24 h-24 object-contain" />
          </div>
          <span className="text-sm">Photo 3.jpg</span>
        </div>
      </div>
    </div>
  )
}

export default MyPictures

