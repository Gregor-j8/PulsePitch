import { useState } from "react"
import { useCreateTeam } from "../../hooks/useTeams"
import { useNavigate } from "react-router-dom"

export const CreateTeamModal = ({ loggedInUser, onClose }) => {
    const Navigate = useNavigate()
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const createTeam = useCreateTeam()
    
    const handleCreate = () => {
  createTeam.mutate(
    { name, joincode: code, loggedInUserId: loggedInUser.id },
    {
      onSuccess: () => {
        Navigate("/")
    },
    })}

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
        <div className="bg-white/95 rounded-xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Team</h2>
            <div className="mb-5">
            <label className="block text-gray-700 font-medium mb-1">Team Name</label>
            <input type="text" name="teamName" placeholder="Enter your team name" onChange={(e) => {setName(e.target.value)}}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-1">Team Code</label>
            <input type="text" name="teamCode" placeholder="Create a unique team code" onChange={(e) => {setCode(e.target.value)}}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <div className="flex justify-end space-x-4">
            <button type="submit" className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={handleCreate}>
                Create
            </button>
            <button type="button" onClick={onClose}
                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                Cancel
            </button>
            </div>
        </div>
        </div>
    )
}


