const HelpAndSupport = () => {
  return (
    <div className="p-6 bg-white h-full overflow-auto">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Help and Support Center</h2>
        <p className="text-gray-600">Find answers to your questions.</p>
      </div>
      <div className="space-y-4">
        <div className="border border-gray-300 rounded p-4">
          <h3 className="font-semibold mb-2">Pick a Help Topic</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Windows Basics</li>
            <li>Networking and the Web</li>
            <li>Working with Programs</li>
            <li>Customizing Your Computer</li>
            <li>Printing and Faxing</li>
            <li>Troubleshooting</li>
          </ul>
        </div>
        <div className="border border-gray-300 rounded p-4">
          <h3 className="font-semibold mb-2">Ask for Assistance</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Get help from Microsoft</li>
            <li>Go to a Windows Web site forum</li>
            <li>Get support from a friend</li>
          </ul>
        </div>
        <div className="border border-gray-300 rounded p-4">
          <h3 className="font-semibold mb-2">Pick a Task</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Use Tools to view your computer information</li>
            <li>Find compatible hardware and software</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default HelpAndSupport

