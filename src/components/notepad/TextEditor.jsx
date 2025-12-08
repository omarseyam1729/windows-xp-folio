const TextEditor = ({ value, onChange, placeholder }) => {
  return (
    <div className="flex-1 p-2">
      <textarea
        className="w-full h-full p-2 border-none outline-none resize-none font-mono text-sm bg-white"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  )
}

export default TextEditor

