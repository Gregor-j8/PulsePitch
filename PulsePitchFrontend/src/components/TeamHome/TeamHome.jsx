import { Link } from "react-router-dom"
import { useDeletePlayerTeam, useGetPlayersFromTeam } from "../../hooks/usePlayerTeams";
import { useState, useEffect } from "react"
import { useTeams } from "../../hooks/useTeams"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Select } from "../ui/Input"

export const TeamHome = ({loggedInUser}) => {
  const [teamId, setTeamId] = useState()
  const { data: teamNames } = useTeams()
  const {data: teams} = useGetPlayersFromTeam(teamId, {enabled: !!teamId})
  const {mutate: deletePlayerTeam} = useDeletePlayerTeam()

  useEffect(() => {
    if (!teamId && loggedInUser.teams && loggedInUser.teams.length > 0) {
      setTeamId(loggedInUser.teams[0].teamId)
    }
  }, [teamId, loggedInUser.teams])

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Select
        value={teamId || ''}
        onChange={(e) => setTeamId(e.target.value)}
        options={[
          { value: '', label: 'Select a Team', disabled: true },
          ...loggedInUser.teams.map(team => ({
            value: team.teamId,
            label: teamNames?.find(t => t.id === team.teamId)?.name || 'Loading...'
          }))
        ]}
        className="mb-4 w-full max-w-md"
      />
      {teams && teams?.map(team => (
        <Card key={team.id} className="flex justify-between items-center p-6 mb-4 w-full max-w-md">
          <h2 className="text-xl font-bold text-neutral-800">
            <Link to={`/profile/${team.playerId}`} className="text-primary-600 hover:underline">
              {team?.player.firstName} {team?.player.lastName}
            </Link>
          </h2>
          {loggedInUser.roles.includes("Coach") && (
            <Button variant="danger" size="sm" onClick={() => deletePlayerTeam(team.id)}>
              Delete
            </Button>
          )}
        </Card>
      ))}
    </div>
  )
}