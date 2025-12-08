const SetProgramAccess = () => {
  return (
    <div className="p-6 bg-white h-full overflow-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Set Program Access and Defaults</h2>
        <p className="text-gray-600">Choose default programs for common activities.</p>
      </div>
      <div className="space-y-4">
        <div className="border border-gray-300 rounded p-4">
          <h3 className="font-semibold mb-2">Choose a configuration:</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input type="radio" name="config" defaultChecked />
              <span>Microsoft Windows</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="config" />
              <span>Non-Microsoft</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="config" />
              <span>Custom</span>
            </label>
          </div>
        </div>
        <div className="border border-gray-300 rounded p-4">
          <h3 className="font-semibold mb-2">Default Programs:</h3>
          <div className="space-y-2 text-sm">
            <div>Web Browser: Internet Explorer</div>
            <div>Email Program: Outlook Express</div>
            <div>Media Player: Windows Media Player</div>
            <div>Instant Messaging: Windows Messenger</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SetProgramAccess

