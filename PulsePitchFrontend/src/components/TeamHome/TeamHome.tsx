import { Link } from "react-router-dom"
import { useDeletePlayerTeam, useGetPlayersFromTeam } from "../../hooks/usePlayerTeams";
import { useState, useEffect } from "react"
import { useTeams } from "../../hooks/useTeams"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Select } from "../ui/Input"
import { ConfirmDialog, EmptyState } from "../ui"
import { Users } from "lucide-react"
import { UserProfileDTO, PlayerTeamDTO } from "../../types"

interface TeamHomeProps {
  loggedInUser: UserProfileDTO | null;
}

export const TeamHome = ({loggedInUser}: TeamHomeProps) => {
  const [teamId, setTeamId] = useState<number | undefined>()
  const { data: teamNames } = useTeams()
  const {data: teams} = useGetPlayersFromTeam(teamId)
  const deletePlayerTeamMutation = useDeletePlayerTeam()
  const {mutate: deletePlayerTeam} = deletePlayerTeamMutation
  const [deleteConfirmPlayer, setDeleteConfirmPlayer] = useState<PlayerTeamDTO | null>(null)

  useEffect(() => {
    if (!teamId && (loggedInUser as any)?.teams && (loggedInUser as any).teams.length > 0) {
      setTeamId((loggedInUser as any).teams[0].teamId)
    }
  }, [teamId, loggedInUser])

  const hasPlayers = teams && Array.isArray(teams) && teams.length > 0;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Select
        value={teamId || ''}
        onChange={(e) => setTeamId(parseInt(e.target.value))}
        options={[
          { value: '', label: 'Select a Team', disabled: true },
          ...((loggedInUser as any)?.teams || []).map((team: any) => ({
            value: team.teamId,
            label: teamNames?.find((t: any) => t.id === team.teamId)?.name || 'Loading...'
          }))
        ]}
        className="mb-4 w-full max-w-md"
      />
      {!hasPlayers ? (
        <EmptyState
          icon={Users}
          title="No Players on This Team"
          description="This team doesn't have any players yet. Invite players to join your team to get started."
        />
      ) : (
        teams.map((team: any) => (
        <Card key={team.id} className="flex justify-between items-center p-6 mb-4 w-full max-w-md">
          <h2 className="text-xl font-bold text-neutral-800">
            <Link to={`/profile/${team.playerId}`} className="text-primary-600 hover:underline">
              {team?.player.firstName} {team?.player.lastName}
            </Link>
          </h2>
          {loggedInUser?.roles.includes("Coach") && (
            <Button variant="danger" size="sm" onClick={() => setDeleteConfirmPlayer(team)} loading={deletePlayerTeamMutation.isPending}>
              Delete
            </Button>
          )}
        </Card>
        ))
      )}
      <ConfirmDialog
        isOpen={!!deleteConfirmPlayer}
        onClose={() => setDeleteConfirmPlayer(null)}
        onConfirm={() => {
          if (deleteConfirmPlayer) {
            deletePlayerTeam(deleteConfirmPlayer.id)
            setDeleteConfirmPlayer(null)
          }
        }}
        title="Remove Player from Team"
        message={`Are you sure you want to remove ${deleteConfirmPlayer?.player?.firstName} ${deleteConfirmPlayer?.player?.lastName} from this team?`}
        confirmText="Remove"
        isLoading={deletePlayerTeamMutation.isPending}
      />
    </div>
  )
}