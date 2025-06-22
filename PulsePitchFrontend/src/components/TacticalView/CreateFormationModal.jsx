import { useState } from "react";
import { useCreateFormations } from "../../hooks/UseFormation"
import { useTeams } from "../../hooks/useTeams";
import { toast } from "react-toastify";

export const CreateFormationModal = ({ loggedInUser, setCreateFormationModal, setFormationModal, setFormationId}) => {
  const {mutate} = useCreateFormations()
  const { data: teamNames } = useTeams()
  const [formation, setFormation] = useState({ description: "", name: "", teamId: "" });
  const handleSubmit = () => {
    if (!formation.description && !formation.name && formation.teamId !== 0) return toast.error("no valid entries")
    const teamsId = teamNames.find(team => team.id == formation.teamId)
    if (teamsId.coachId !== loggedInUser.identityUserId) return toast.error("You are not the coach of this team")
    mutate(formation, {
        onSuccess: (newFormation) => {
        setFormationId(newFormation.id)
        setFormation({ description: "", name: "", teamId: "" })
        setCreateFormationModal(false)
    }})
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Create New Formation</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input value={formation.description} className="w-full border px-3 py-2 rounded"
              onChange={(e) => setFormation({ ...formation, description: e.target.value })}/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Formation Name</label>
            <input value={formation.name} className="w-full border px-3 py-2 rounded"
              onChange={(e) => setFormation({ ...formation, name: e.target.value })}/>
          </div>
           <select value={formation.teamId} onChange={(e) => setFormation({ ...formation, teamId: e.target.value })}
            className="w-full max-w-md border px-3 py-2 rounded">
        <option value="" disabled>Choose a team</option>
        {loggedInUser.teams.map(team => (
          <option key={team.id} value={team.teamId}>
            {teamNames?.find(t => t.id === team.teamId)?.name}
          </option>
        ))}
      </select>
            <button onClick={() => {setCreateFormationModal(false); setFormationModal(true)}} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"> 
                Cancel
            </button>
            <button className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={handleSubmit}>
              Create
            </button>
          </div>
      </div>
  )
}