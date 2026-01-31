import { useState } from "react"
import { useAllUserProfile } from "../../hooks/useUserProfile"
import { useCreateChatRoom } from "../../hooks/useChatRoom";
import { Modal, ModalBody } from "../ui/Modal"
import { Input } from "../ui/Input"
import { Card } from "../ui/Card"
import { EmptyState } from "../ui"
import { UserPlus } from "lucide-react"
import { UserProfileDTO } from "../../types"

interface ChooseNewMessageProps {
  setNewMessageModal: (value: boolean) => void;
  loggedInUser: UserProfileDTO;
}

export const ChooseNewMessage = ({setNewMessageModal, loggedInUser}: ChooseNewMessageProps) => {
  const { data: contacts, isLoading } = useAllUserProfile()
  const createNewChatRoom = useCreateChatRoom()
  const [searchTerm, setSearchTerm] = useState<string>("")

  if (isLoading) return <div className="text-center p-4">Loading...</div>

  const filteredContacts = (contacts ?? []).filter(contact => `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
  const handleNewChat = (id: number) => {
    const form = {
        UserOneId: loggedInUser.id,
        UserTwoId: id
    }
    createNewChatRoom.mutate(form as any, {
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
          {filteredContacts.length > 0 && (contacts ?? []).length === 0 && (
            <EmptyState
              icon={UserPlus}
              title="No Contacts Available"
              description="There are no other users in the system yet. Check back later to start conversations."
            />
          )}
          {filteredContacts.length === 0 && (
            <div className="text-center text-neutral-500 mt-4">No contacts found.</div>
          )}
        </div>
      </ModalBody>
    </Modal>
  );
};