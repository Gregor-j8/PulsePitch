import { Card } from "../ui/Card";
import { PublicTeamSearchDTO } from "../../types";
import { Users, UserCheck } from "lucide-react";

interface TeamCardProps {
  team: PublicTeamSearchDTO;
  onClick: () => void;
}

export const TeamCard = ({ team, onClick }: TeamCardProps) => {
  return (
    <Card
      className="p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-neutral-900 mb-2">{team.name}</h3>
        <div className="space-y-1">
          {team.managerNames && team.managerNames.length > 0 && (
            <div className="flex items-center text-sm text-neutral-600">
              <UserCheck className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>Manager{team.managerNames.length > 1 ? 's' : ''}: {team.managerNames.join(', ')}</span>
            </div>
          )}
          {team.coachNames && team.coachNames.length > 0 && (
            <div className="flex items-center text-sm text-neutral-600">
              <UserCheck className="w-4 h-4 mr-1 flex-shrink-0" />
              <span>Coach{team.coachNames.length > 1 ? 'es' : ''}: {team.coachNames.join(', ')}</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-neutral-600">
          <Users className="w-4 h-4 mr-1" />
          <span>{team.memberCount} {team.memberCount === 1 ? 'member' : 'members'}</span>
        </div>

        {team.requiresApproval ? (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
            Approval Required
          </span>
        ) : (
          <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
            Instant Join
          </span>
        )}
      </div>
    </Card>
  );
};
