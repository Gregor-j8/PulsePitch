import { useRespondToMatchRequest, useUserMatchRequests } from "../../hooks/useMatchRequest"
import { LoadingSpinner } from "../Loading/LoadingPage"
import { Check, X } from "lucide-react"

export const MatchRequest = ({ loggedInUser }) => {
  const { data: MatchRequests } = useUserMatchRequests(loggedInUser.id)
  const responseToMatchRequest = useRespondToMatchRequest()
  if (!MatchRequests) return <LoadingSpinner />

    const handleAccept = (matchId) => {
        const form = {
            status: 'accepted'
        }
        responseToMatchRequest.mutate({matchId, messageData: form})
    }

  const handleReject = (matchId) => {
        const form = {
            status: 'rejected'
        }
        responseToMatchRequest.mutate({matchId, messageData: form})
    }
console.log(MatchRequests)
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Your Match Requests</h2>
      {MatchRequests.length === 0 ? (
        <p className="text-center text-gray-500">No match requests found.</p>
      ) : (
        <div className="space-y-4">
          {MatchRequests.map(match => (
            <div key={match.id} className="bg-white shadow-md rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <p className="text-lg font-medium text-gray-800">
                  {match.homeTeam.name} <span className="text-gray-400">vs</span> {match.awayTeam.name}
                </p>
                <p className="text-sm text-gray-500">
                  Scheduled for: {new Date(match.proposedDate).toLocaleString()}
                </p>
              </div>
              {match.status === null && loggedInUser.identityUserId === match.awayTeam.coachId && (
                <div className="flex space-x-2 mt-2 sm:mt-0">
                  <button onClick={() => handleAccept(match.id)} className="p-2 bg-green-100 text-green-700 rounded-full hover:bg-green-200">
                    <Check className="w-5 h-5" />
                  </button>
                  <button onClick={() => handleReject(match.id)} className="p-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 transition">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
