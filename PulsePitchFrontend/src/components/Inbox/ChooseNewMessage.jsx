import { useState } from "react"
import { useAllUserProfile } from "../../hooks/useUserProfile"
import { X } from "lucide-react"
import { useCreateChatRoom } from "../../hooks/useChatRoom";
import { Modal, ModalBody } from "../ui/Modal"
import { Input } from "../ui/Input"
import { Card } from "../ui/Card"

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
    <Modal isOpen={true} onClose={() => setNewMessageModal(false)} title="New Message" size="lg">
      <ModalBody>
        <Input
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <div className="max-h-[50vh] overflow-y-auto space-y-4">
          {filteredContacts.map(contact => (
            <Card
              key={contact.id}
              variant="interactive"
              className="p-4 cursor-pointer"
              onClick={() => handleNewChat(contact.id)}
            >
              <p className="text-neutral-800 font-semibold">
                {contact.firstName} {contact.lastName}
              </p>
            </Card>
          ))}
          {filteredContacts.length === 0 && (
            <div className="text-center text-neutral-500 mt-4">No contacts found.</div>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};