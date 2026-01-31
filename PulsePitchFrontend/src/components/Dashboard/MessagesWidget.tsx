import { useNavigate } from "react-router-dom";
import { useChatRooms } from "../../hooks/useChatRoom";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { EmptyState } from "../ui";
import { MessageSquare } from "lucide-react";
import { UserProfileDTO, ChatRoomDTO } from "../../types";

interface MessagesWidgetProps {
  loggedInUser: UserProfileDTO;
}

export const MessagesWidget = ({ loggedInUser }: MessagesWidgetProps) => {
  const navigate = useNavigate();
  const { data: chatRooms, isLoading } = useChatRooms(loggedInUser.id);

  if (isLoading) {
    return (
      <Card className="p-6 bg-white h-[500px] flex flex-col">
        <div className="flex items-center justify-center flex-1">
          <div className="text-neutral-500 text-sm">Loading...</div>
        </div>
      </Card>
    );
  }

  const hasConversations = chatRooms && chatRooms.length > 0;
  const recentChats = chatRooms?.slice(0, 5) || [];

  return (
    <Card className="p-6 bg-white h-[500px] flex flex-col">
      <div className="mb-6 flex justify-between items-center flex-shrink-0">
        <h2 className="text-lg font-semibold text-neutral-900">Messages</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/inbox')}
        >
          View All
        </Button>
      </div>

      {!hasConversations ? (
        <div className="flex-1 flex items-center justify-center">
          <EmptyState
            icon={MessageSquare}
            title="No Messages"
            description="You don't have any conversations yet."
            actionLabel="Go to Inbox"
            onAction={() => navigate('/inbox')}
          />
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto flex-1">
          {recentChats.map((chat: ChatRoomDTO) => {
            // Determine the other user in the conversation
            const otherUser =
              loggedInUser.identityUserId === chat.userOne?.identityUserId
                ? chat.userTwo
                : chat.userOne;

            return (
              <button
                key={chat.id}
                className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
                onClick={() => navigate('/inbox')}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-semibold text-sm">
                      {otherUser?.firstName?.charAt(0)}{otherUser?.lastName?.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-neutral-900 text-sm truncate">
                      {otherUser?.firstName} {otherUser?.lastName}
                    </h3>
                  </div>
                  <MessageSquare className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                </div>
              </button>
            );
          })}
          {chatRooms && chatRooms.length > 5 && (
            <button
              onClick={() => navigate('/inbox')}
              className="w-full pt-3 text-center text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              +{chatRooms.length - 5} more conversations
            </button>
          )}
        </div>
      )}
    </Card>
  );
};
