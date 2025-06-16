import { useDeletePlayerTeam, useGetPlayersFromTeam } from "../../hooks/usePlayerTeams";

export const TeamHome = () => {
    const {data: teams} = useGetPlayersFromTeam(1);
    const {mutate: deletePlayerTeam} = useDeletePlayerTeam()

    console.log(teams);
  return (
    <div className="flex flex-col items-center justify-center h-full pt-40">
         {teams?.map(team => (
             <div key={team.id} className="flex justify-between bg-white shadow-md rounded-lg p-6 mb-4 w-1/2">
                <h2 className="text-xl font-bold mb-2">{team?.player.firstName} {team?.player.lastName}</h2>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={() => deletePlayerTeam(team.id)}>Delete</button>
            </div>
        ))}
    </div>
  )
}