import { useState, useEffect } from 'react'
import ContactItem from '../components/contact/ContactItem'
import contactsData from '../details/contacts.json'

const Contact = () => {
  const [contacts, setContacts] = useState(null)

  useEffect(() => {
    setContacts(contactsData)
  }, [])

  if (!contacts) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-xp-blue-700">{contacts.title}</h2>
      <div className="space-y-3 text-sm">
        <p>{contacts.description}</p>
        <div className="space-y-2">
          {contacts.contacts.map((contact, index) => (
            <ContactItem 
              key={index}
              icon={contact.icon}
              label={contact.label}
              value={contact.value}
              link={contact.link}
            />
          ))}
        </div>
        {contacts.note && (
          <div className="mt-4 p-3 bg-xp-gray-100 xp-border-inset">
            <p className="text-xs">
              <strong>Note:</strong> {contacts.note}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Contact

