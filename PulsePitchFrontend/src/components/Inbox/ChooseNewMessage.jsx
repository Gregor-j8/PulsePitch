import { useState } from "react"
import { useAllUserProfile } from "../../hooks/useUserProfile"
import { X } from "lucide-react"
import { useCreateChatRoom } from "../../hooks/useChatRoom";

export const ChooseNewMessage = ({setNewMessageModal, loggedInUser, }) => {
  const { data: contacts, isLoading } = useAllUserProfile()
  const createNewChatRoom = useCreateChatRoom()
  const [searchTerm, setSearchTerm] = useState("")

  if (isLoading) return <div className="text-center p-4">Loading...</div>

  const filteredContacts = contacts.filter(contact => `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
  const handleNewChat = (id) => {
    const form = {
        UserOneId: loggedInUser.id,
        UserTwoId: parseInt(id)
    }
    createNewChatRoom.mutate(form, {
        onSuccess: () => {
            setNewMessageModal(false)
        }
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-35">
      <div className="lg:w-3/5 md:w-full sm:w-full max-w-5xl bg-white overflow-hidden">
        <div className="sticky top-0 bg-white z-10 p-4 border-b flex justify-between">
          <input placeholder="Search contacts..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
            className="w-19/20 flex px-4 py-2 border rounded-md focus:outline-none "/>
            <X onClick={() => setNewMessageModal(false)} className="flex mt-3"/>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-6 space-y-4">
          {filteredContacts.map(contact => (
            <div key={contact.id}className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 cursor-pointer">
              <button value={contact.id} className="text-gray-800 font-semibold" onClick={(e) => {handleNewChat(e.target.value)}}>
                {contact.firstName} {contact.lastName}
              </button>
            </div>
          ))}
          {filteredContacts.length === 0 && (
            <div className="text-center text-gray-500 mt-4">No contacts found.</div>
          )}
        </div>
      </div>
    </div>
  );
};