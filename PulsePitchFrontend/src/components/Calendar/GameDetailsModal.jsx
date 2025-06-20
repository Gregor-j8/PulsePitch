import { useDeleteTeamGame, useTeamGame } from "../../hooks/UseGames"
import { CalendarDays } from 'lucide-react'
import { LoadingSpinner } from "../Loading/LoadingPage"

export const GameDetailsModals = ({ loggedInUser, choosenGameId, setchoosenGameId, onClose, setEditGameModel, SetStarterFormData }) => {
  const { data: gameData } = useTeamGame(choosenGameId, { enabled: !!choosenGameId })
  const { mutate: deleteTeamGame } = useDeleteTeamGame()

if (!loggedInUser || !gameData) return <LoadingSpinner/>
  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-2xl">
        <div className="flex text-2xl font-bold mb-6 text-gray-800"><CalendarDays /> Game Details</div>
        <div className="space-y-4 text-gray-700">
          <div className="block text-sm font-semibold text-gray-500">
            Home Team <p>{gameData.homeTeam?.name}</p>
          </div>
          <div className="block text-sm font-semibold text-gray-500">
            Away Team <p>{gameData.awayTeam?.name}</p>
          </div>
          <div className="block text-sm font-semibold text-gray-500">
            Start <p>{new Date(gameData.start).toLocaleString()}</p>
          </div>
          <div className="block text-sm font-semibold text-gray-500">
            End <p>{new Date(gameData.end).toLocaleString()}</p>
          </div>
          <div className="block text-sm font-semibold text-gray-500">
            Result <p>{gameData.result}</p>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <div>
            {loggedInUser.roles.includes("Coach") && (
              <div className="flex gap-2">
                <button className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded"
                  onClick={() => { 
                   SetStarterFormData(gameData)
                   setEditGameModel(true)
                    onClose()}}>
                  Edit
                </button>
                <button className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded"
                  onClick={() => { deleteTeamGame(gameData.id); setchoosenGameId(null); onClose()}}>
                  Delete
                </button>
              </div>
            )}
          </div>
          <button onClick={onClose} className="cursor-pointer px-4 py-2 bg-gray-200 text-gray-800 rounded">Close</button>
        </div>
      </div>
    </div>
  )
}