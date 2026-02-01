import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { usePendingJoinRequests, useRespondToJoinRequest } from "../../hooks/useTeams";
import { UserCircle, Clock, CheckCircle, XCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface PendingJoinRequestsProps {
  teamId: number;
}

export const PendingJoinRequests = ({ teamId }: PendingJoinRequestsProps) => {
  const { data: requests, isLoading } = usePendingJoinRequests(teamId);
  const respondToRequest = useRespondToJoinRequest();

  const handleRespond = async (playerTeamId: number, status: "accepted" | "rejected") => {
    try {
      await respondToRequest.mutateAsync({
        playerTeamId,
        response: { status },
      });
      alert(`Request ${status}!`);
    } catch (error) {
      alert(`${error}Failed to ${status === "accepted" ? "accept" : "reject"} request. Please try again.`);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-center py-8">
          <div className="text-neutral-500 text-sm">Loading requests...</div>
        </div>
      </Card>
    );
  }

  if (!requests || requests.length === 0) {
    return (
      <Card className="p-6 bg-white">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
            <Clock className="w-8 h-8 text-neutral-400" />
          </div>
          <h3 className="text-lg font-semibold text-neutral-900 mb-2">No Pending Requests</h3>
          <p className="text-neutral-500">You don't have any pending join requests at this time.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-neutral-900">Pending Join Requests</h2>
        <span className="px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-700">
          {requests.length} {requests.length === 1 ? 'request' : 'requests'}
        </span>
      </div>

      <div className="space-y-3">
        {requests.map((request) => (
          <Card key={request.id} className="p-4 bg-white hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserCircle className="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900">
                    {request.player?.firstName} {request.player?.lastName}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Clock className="w-3 h-3" />
                    <span>
                      Requested{" "}
                      {request.requestedAt
                        ? formatDistanceToNow(new Date(request.requestedAt), { addSuffix: true })
                        : "recently"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRespond(request.id, "rejected")}
                  disabled={respondToRequest.isPending}
                  className="text-red-600 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  Reject
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleRespond(request.id, "accepted")}
                  disabled={respondToRequest.isPending}
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Accept
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
