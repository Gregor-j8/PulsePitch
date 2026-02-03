import { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { UserProfileDTO, PublicTeamSearchDTO } from "../../types";
import { useRequestJoinTeam } from "../../hooks/useTeams";
import { Users, UserCheck, AlertCircle } from "lucide-react";

interface JoinTeamConfirmModalProps {
  team: PublicTeamSearchDTO;
  loggedInUser: UserProfileDTO;
  onClose: () => void;
}

export const JoinTeamConfirmModal = ({
  team,
  loggedInUser,
  onClose,
}: JoinTeamConfirmModalProps) => {
  const [error, setError] = useState<string>("");
  const requestJoinTeam = useRequestJoinTeam();

  const handleJoin = async () => {
    try {
      setError("");
      const result = await requestJoinTeam.mutateAsync({
        teamId: team.id,
        playerId: loggedInUser.id,
      });

      if (result.status === "pending") {
        alert("Join request sent! The coach will review your request.");
      } else {
        alert("Successfully joined the team!");
      }
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to join team. Please try again.");
    }
  };

  return (
    <Modal isOpen={true} onClose={onClose} title="Join Team">
      <div className="space-y-6">
        <div className="bg-neutral-50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-neutral-900 mb-3">{team.name}</h3>

          <div className="space-y-2 text-sm">
            {team.managerNames && team.managerNames.length > 0 && (
              <div className="flex items-center text-neutral-600">
                <UserCheck className="w-4 h-4 mr-2" />
                <span>Manager{team.managerNames.length > 1 ? 's' : ''}: {team.managerNames.join(', ')}</span>
              </div>
            )}
            {team.coachNames && team.coachNames.length > 0 && (
              <div className="flex items-center text-neutral-600">
                <UserCheck className="w-4 h-4 mr-2" />
                <span>Coach{team.coachNames.length > 1 ? 'es' : ''}: {team.coachNames.join(', ')}</span>
              </div>
            )}

            <div className="flex items-center text-neutral-600">
              <Users className="w-4 h-4 mr-2" />
              <span>{team.memberCount} {team.memberCount === 1 ? 'member' : 'members'}</span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-900">
              {team.requiresApproval ? (
                <p>
                  <strong>Approval Required:</strong> Your request will be sent to the coach for approval.
                  You'll be notified once the coach responds.
                </p>
              ) : (
                <p>
                  <strong>Instant Join:</strong> You will be added to the team immediately.
                </p>
              )}
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-900">{error}</p>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <Button
            variant="ghost"
            onClick={onClose}
            disabled={requestJoinTeam.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleJoin}
            disabled={requestJoinTeam.isPending}
          >
            {requestJoinTeam.isPending
              ? "Joining..."
              : team.requiresApproval
              ? "Request to Join"
              : "Join Team"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
