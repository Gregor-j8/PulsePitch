import { Link } from "react-router-dom"
import { useDeletePlayerTeam, useGetPlayersFromTeam } from "../../hooks/usePlayerTeams";
import { useState } from "react"
import { useTeams } from "../../hooks/useTeams"
export const TeamHome = ({loggedInUser}) => {
  const [teamId, setTeamId] = useState()
  const { data: teamNames } = useTeams()
  const {data: teams} = useGetPlayersFromTeam(teamId, {enabled: !!teamId})
  const {mutate: deletePlayerTeam} = useDeletePlayerTeam()
  console.log(teamNames)
  console.log(loggedInUser.teams)
  return (
    <div className="flex flex-col items-center justify-center h-full pt-20">
      <select className="border px-3 py-2 rounded " onChange={(e) => setTeamId(e.target.value)} defaultValue={0}>
        <option value={0} disabled>Select a Team</option>
        {loggedInUser.teams.map(team => (
          <option key={team.id} value={team.teamId}>
            {teamNames?.find(t => t.id === team.teamId)?.name}
          </option>
        ))}
      </select>
         {teams && teams?.map(team => (
             <div key={team.id} className="flex justify-between bg-white shadow-md rounded-lg p-6 mb-4 w-1/2">
                <h2 className="text-xl font-bold mb-2"><Link to={`/profile/${team.playerId}`}>{team?.player.firstName} {team?.player.lastName}</Link></h2>
                {loggedInUser.roles.includes("Coach") && (
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => deletePlayerTeam(team.id)}>Delete</button>
            )}</div>
        ))}
    </div>
  )
}