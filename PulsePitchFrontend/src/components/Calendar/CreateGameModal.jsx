import { useCreateTeamGame } from "../../hooks/UseGames"
import { useTeams } from "../../hooks/useTeams"
import { useState } from "react"
import {LoadingSpinner} from "../Loading/LoadingPage"
import { useCreateMatchRequest } from "../../hooks/useMatchRequest"
import { toast } from "react-toastify"

export const CreateGameModal = ({ onClose, loggedInUser }) => {
  const { data: teams, isLoading, isError } = useTeams()
  const createTeamEvent = useCreateTeamGame()
  const CreateMatchRequest = useCreateMatchRequest()
    const [formData, setFormData] = useState({start: "", end: "", homeTeamId: "", awayTeamId: "", message: ""})
  if (isLoading || isError) return <LoadingSpinner/>
  const handleSubmit = () => {
    const data = {
      Start: formData.start,
      End: formData.end,
      HomeTeamId: formData.homeTeamId,
      awayTeamId: formData.awayTeamId,
      result: ""
    }
    const oppteamChoach = teams.find(t => t.id == formData.awayTeamId)
    CreateMatchRequest.mutate({
      proposedDate: formData.start,
      message: formData.message,
      homeTeamId: formData.homeTeamId,
      awayTeamId: formData.awayTeamId,
      senderId: loggedInUser.id,
      RecieverId: oppteamChoach.coachId,
      Status: undefined
    })
    createTeamEvent.mutate(data, {
      onSuccess: () => {
        toast.success(`A Game request has been send to ${formData.awayTeamId} the match will appear when accepted`)
        onClose()
      },
    })
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create Game</h2>
        <input type="datetime-local" value={formData.start} className="w-full border px-3 py-2 rounded"
          onChange={(e) => setFormData({ ...formData, start: e.target.value })}/>
        <input type="datetime-local" value={formData.end} className="w-full border px-3 py-2 rounded mt-2"
         onChange={(e) => setFormData({ ...formData, end: e.target.value })}/>
        <select value={formData.homeTeamId} className="w-full border px-3 py-2 rounded mt-2"
        onChange={(e) => setFormData({ ...formData, homeTeamId: e.target.value })}>
          <option value="" disabled>
            Select Home Team
          </option>
            {loggedInUser.teams.map(team => (
                <option key={team.id} value={team.teamId} className="text-black">{teams.find(m => m.id === team.teamId)?.name}</option>
            ))}
        </select>
        <select value={formData.awayTeamId} className="w-full border px-3 py-2 rounded mt-2"
          onChange={(e) => setFormData({ ...formData, awayTeamId: e.target.value })}>
          <option value="">Select Opponent</option>
          {teams.map(team =>
            team.id == formData.homeTeamId ? null : (
              <option key={team.id} value={team.id} className="text-black">{team.name}</option>
            ))}
        </select>
        <textarea  onChange={(e) => {setFormData({ ...formData, message: e.target.value })}} className="w-full px-4 py-2 border border-gray-300 rounded-2xl shadow-sm"/>
        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
}
