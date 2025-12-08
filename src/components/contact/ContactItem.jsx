const ContactItem = ({ icon, label, value, link }) => {
  const content = (
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <span>{label}: {value}</span>
    </div>
  )

  if (link) {
    return (
      <a 
        href={link} 
        className="text-xp-blue-600 hover:text-xp-blue-800 hover:underline"
        target={link.startsWith('http') ? '_blank' : undefined}
        rel={link.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    )
  }

  return content
}

export default ContactItem

