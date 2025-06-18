import { useState } from "react"
import { useTeamGame, useEditTeamGame } from "../../hooks/UseGames"
import { useTeams } from "../../hooks/useTeams"

export const GameEditModal = ({ choosenGameId, setChosenGameId, onClose, StarterFormData }) => {
  const [formData, setFormData] = useState(StarterFormData)
  const { data: gameData } = useTeamGame(choosenGameId, { enabled: !!choosenGameId })
  const { mutate: updateTeamGame } = useEditTeamGame()
  const { data: teams, isLoading, isError } = useTeams()
  if (!gameData || isLoading || isError) return null

  const handleUpdate = () => {
    const payload = { start: formData.start, end: formData.end, homeTeamId: formData.homeTeamId, 
        awayTeamId: formData.awayTeamId, result: formData.result,}
        updateTeamGame({ id: choosenGameId, data: payload }, 
        { onSuccess: () => { setChosenGameId(null); onClose()}})}

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Game</h2>
        <input type="datetime-local" value={formData.start} className="w-full border px-3 py-2 rounded"
          onChange={(e) => setFormData({ ...formData, start: e.target.value })}/>
        <input type="datetime-local" value={formData.end} className="w-full border px-3 py-2 rounded mt-2"
          onChange={(e) => setFormData({ ...formData, end: e.target.value })}/>
        <select value={formData.homeTeamId} className="w-full border px-3 py-2 rounded mt-2"
          onChange={(e) => setFormData({ ...formData, homeTeamId: parseInt(e.target.value) })}>
          <option value="" disabled>Select Home Team</option>
            {teams.map((team) => (<option key={team.id} value={team.id}>{team.name}</option>))}
        </select>
        <select value={formData.awayTeamId} className="w-full border px-3 py-2 rounded mt-2"
          onChange={(e) => setFormData({ ...formData, awayTeamId: parseInt(e.target.value) })}>
          <option value="" disabled>Select Away Team</option>
          {teams.map((team) => ( <option key={team.id} value={team.id}>{team.name}</option>))}
        </select>
        <input placeholder="Result" value={formData.result} className="w-full border px-3 py-2 rounded mt-2"
          onChange={(e) => setFormData({ ...formData, result: e.target.value })}/>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => {onClose();}} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
            Cancel
          </button>
          <button onClick={handleUpdate} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}
