import { useRespondToMatchRequest, useUserMatchRequests } from "../../hooks/useMatchRequest"
import { LoadingSpinner } from "../LoadingPage"
import { Check, X, Trophy } from "lucide-react"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { EmptyState } from "../ui"
import { formatDate } from "../../utils"
import { UserProfileDTO } from "../../types"

interface MatchRequestProps {
  loggedInUser: UserProfileDTO;
}

export const MatchRequest = ({ loggedInUser }: MatchRequestProps) => {
  const { data: MatchRequests } = useUserMatchRequests(loggedInUser.id)
  const responseToMatchRequest = useRespondToMatchRequest()
  if (!MatchRequests) return <LoadingSpinner />

    const handleAccept = (matchId: number) => {
        const form = {
            status: 'accepted'
        }
        responseToMatchRequest.mutate({matchId, messageData: form})
    }

  const handleReject = (matchId: number) => {
        const form = {
            status: 'rejected'
        }
        responseToMatchRequest.mutate({matchId, messageData: form})
    }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center text-neutral-800">Your Match Requests</h2>
      {MatchRequests.length === 0 ? (
        <EmptyState
          icon={Trophy}
          title="No Match Requests"
          description="You don't have any pending match requests at the moment. Check back later or challenge another team to a match."
        />
      ) : (
        <div className="space-y-4">
          {MatchRequests.map(match => (
            <Card key={match.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <p className="text-lg font-medium text-neutral-800">
                  {match.homeTeam?.name} <span className="text-neutral-400">vs</span> {match.awayTeam?.name}
                </p>
                <p className="text-sm text-neutral-500">
                  Scheduled for: {formatDate(match.proposedDate)}
                </p>
              </div>
              {match.status === null && loggedInUser.identityUserId === match.awayTeam?.coachId && (
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleAccept(match.id)}
                    className="rounded-full"
                    loading={responseToMatchRequest.isPending}
                  >
                    <Check className="w-5 h-5" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleReject(match.id)}
                    className="rounded-full"
                    loading={responseToMatchRequest.isPending}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
