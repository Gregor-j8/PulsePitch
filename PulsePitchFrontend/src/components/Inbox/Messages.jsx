import { useState } from "react"
import { useChatRooms } from "../../hooks/useChatRoom"
import { useCreateMessage, useDeleteMessageById, useRoomMessages } from "../../hooks/useMessages"
import { LoadingSpinner } from "../Loading/LoadingPage"
import { toast } from "react-toastify"
import { Plus, Trash } from "lucide-react"
import { ChooseNewMessage } from "./ChooseNewMessage"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { ConfirmDialog } from "../ui"

export const Messages = ({ loggedInUser }) => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [newMessage, setNewMessage] = useState(null)
  const [newMessageModal, setNewMessageModal] = useState(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const { data: useChatRoom, isLoading } = useChatRooms(loggedInUser.id)
  const { data: messages } = useRoomMessages(selectedChat?.id)
  const mutate = useCreateMessage()
  const deleteMessage = useDeleteMessageById()
  if (isLoading) return <LoadingSpinner />

  const handleNewMessage = (formData) => {
     if (!formData || !formData.id || !loggedInUser?.id || !formData.userOne?.identityUserId || !formData.userTwo?.identityUserId || !newMessage || newMessage.trim() === "") {
    toast.error("Missing required message data")
    return
  }
    const form = {
        chatRoomId: formData.id,
        SenderId: loggedInUser.id,
        ReceiverId: loggedInUser.id === formData.userOne.identityUserId ? formData.userTwo.id : formData.userOne.id,
        content: newMessage,
        SentAt: new Date().toISOString()
    }
    mutate.mutate(form, {
      onSuccess: () => {
        setNewMessage('')
      }
    })
  }
  return (
    <div className="flex bg-white rounded-lg shadow-md overflow-hidden h-[500px]">
      <div className="w-1/3 border-r p-4 overflow-y-auto">
      <div className="flex justify-between align-middle">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Chats</h2>
        <Plus className="mb-4" onClick={() => setNewMessageModal(true)}/>
      </div>
        {useChatRoom.map(chat => {
          return (
            <button key={chat.id} onClick={() => setSelectedChat(chat)} className="block w-full text-left px-3 py-2 rounded-md mb-2 hover:bg-gray-100 text-gray-700">
              {loggedInUser.identityUserId === chat.userOne.identityUserId ? (
                <div>
                  <span>{chat.userTwo.firstName}</span> <span>{chat.userTwo.lastName}</span>
                </div>
              ) : (
                <div>
                  <span>{chat.userOne.firstName}</span> <span>{chat.userOne.lastName}</span>
                </div>
              )}
            </button>
          )
        })}
      </div>
      <div className="flex-1 flex flex-col p-4 h-[500px]">
        {selectedChat ? (
          <>
            <div className="w-full border-b pb-2 mb-4 text-xl font-semibold text-gray-800">
              {loggedInUser.identityUserId === selectedChat.userOne.identityUserId
                ? `${selectedChat.userTwo.firstName} ${selectedChat.userTwo.lastName}`
                : `${selectedChat.userOne.firstName} ${selectedChat.userOne.lastName}`}
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {messages && messages.length > 0 ? (
                messages.map(message => (
                  <div key={message.id} className="flex flex-col items-start relative mt-1"
                    onMouseEnter={() => { if (hoveredId !== message.id) setHoveredId(message.id); }} onMouseLeave={() => { if (hoveredId !== null) setHoveredId(null); }}>
                    <p className="text-xs text-gray-500 mb-1">
                      {message.sender.firstName} {message.sender.lastName}
                    </p>
                    <div className="px-3 py-2 rounded max-w-xs text-sm bg-gray-200 text-gray-800">
                      {message.content}
                      {loggedInUser.id === message.senderId && hoveredId === message.id && (
                        <div className="absolute -top-2 -right-2 flex gap-1 bg-white shadow-md p-1 rounded-md">
                          <button className="text-gray-500 hover:text-red-600" onClick={() => setDeleteConfirmId(message.id)}>
                            <Trash size={16} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
                ) : (
                  <p className="text-sm text-gray-500 italic">No messages yet.</p>
                )}
            </div>
            <div className="pt-4 border-t flex items-center gap-2">
              <Input
                value={newMessage || ''}
                onChange={(e) => {setNewMessage(e.target.value)}}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button variant="primary" size="sm" onClick={() => {handleNewMessage(selectedChat)}} loading={mutate.isPending}>
                Send
              </Button>
            </div>
          </>
        ) : (
          <div className="text-gray-500 italic flex items-center justify-center h-full">
            Select a chat to view messages
          </div>
        )}
      </div>
      {newMessageModal && (
        <ChooseNewMessage loggedInUser={loggedInUser} setNewMessageModal={setNewMessageModal}/>
      )}
      <ConfirmDialog
        isOpen={!!deleteConfirmId}
        onClose={() => setDeleteConfirmId(null)}
        onConfirm={() => {
          deleteMessage.mutate(deleteConfirmId)
          setDeleteConfirmId(null)
        }}
        title="Delete Message"
        message="Are you sure you want to delete this message? This action cannot be undone."
        confirmText="Delete"
        isLoading={deleteMessage.isPending}
      />
    </div>
  )
}