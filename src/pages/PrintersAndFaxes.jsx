const PrintersAndFaxes = () => {
  return (
    <div className="p-6 bg-white h-full overflow-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Printers and Faxes</h2>
        <p className="text-gray-600">View and manage printers and fax devices.</p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-3 border border-gray-300 rounded hover:bg-blue-50 cursor-pointer">
          <span className="text-3xl">🖨️</span>
          <div>
            <div className="font-semibold">HP LaserJet Printer</div>
            <div className="text-sm text-gray-600">Ready</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 border border-gray-300 rounded hover:bg-blue-50 cursor-pointer">
          <span className="text-3xl">🖨️</span>
          <div>
            <div className="font-semibold">Canon Inkjet Printer</div>
            <div className="text-sm text-gray-600">Ready</div>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 border border-gray-300 rounded hover:bg-blue-50 cursor-pointer">
          <span className="text-3xl">📠</span>
          <div>
            <div className="font-semibold">Fax Device</div>
            <div className="text-sm text-gray-600">Ready</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrintersAndFaxes

