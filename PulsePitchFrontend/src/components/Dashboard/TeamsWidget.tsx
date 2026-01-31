import { useNavigate } from "react-router-dom";
import { useTeams } from "../../hooks/useTeams";
import { useGetPlayersFromTeam } from "../../hooks/usePlayerTeams";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { EmptyState } from "../ui";
import { Shield, Users } from "lucide-react";
import { UserProfileDTO } from "../../types";

interface TeamsWidgetProps {
  loggedInUser: UserProfileDTO;
}

interface Team {
  id?: number;
  name?: string;
  teamId: string;
  joinCode?: string;
  coachId?: string;
}

interface UserTeam {
  teamId: string;
}

export const TeamsWidget = ({ loggedInUser }: TeamsWidgetProps) => {
  const navigate = useNavigate();
  const { data: allTeams, isLoading } = useTeams();
  const userTeams = (loggedInUser as UserProfileDTO & { teams: UserTeam[] })?.teams || [];

  const teamsWithCounts = userTeams.map((userTeam: UserTeam) => {
    const teamData = allTeams?.find((t) => String(t.id) === userTeam.teamId);
    return {
      ...teamData,
      teamId: userTeam.teamId
    };
  });

  const TeamCard = ({ team }: { team: Team }) => {
    const { data: players } = useGetPlayersFromTeam(Number(team.teamId));
    const playerCount = Array.isArray(players) ? players.length : 0;

    return (
      <button
        className="w-full text-left p-3 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
        onClick={() => navigate('/team')}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-blue-700" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-neutral-900 text-sm truncate">
                {team.name}
              </h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-neutral-500 text-sm flex-shrink-0 ml-2">
            <Users className="w-4 h-4" />
            <span>{playerCount}</span>
          </div>
        </div>
      </button>
    );
  };

  if (isLoading) {
    return (
      <Card className="p-6 bg-white h-[500px] flex flex-col">
        <div className="flex items-center justify-center flex-1">
          <div className="text-neutral-500 text-sm">Loading...</div>
        </div>
      </Card>
    );
  }

  const hasTeams = teamsWithCounts.length > 0;

  return (
    <Card className="p-6 bg-white h-[500px] flex flex-col">
      <div className="mb-6 flex justify-between items-center flex-shrink-0">
        <h2 className="text-lg font-semibold text-neutral-900">Teams</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/home')}
        >
          Join
        </Button>
      </div>

      {!hasTeams ? (
        <div className="flex-1 flex items-center justify-center">
          <EmptyState
            icon={Shield}
            title="No Teams"
            description="Join a team to get started."
            actionLabel="Find Team"
            onAction={() => navigate('/home')}
          />
        </div>
      ) : (
        <div className="space-y-2 overflow-y-auto flex-1">
          {teamsWithCounts.map((team: Team) => (
            <TeamCard key={team.teamId} team={team} />
          ))}
        </div>
      )}
    </Card>
  );
};
