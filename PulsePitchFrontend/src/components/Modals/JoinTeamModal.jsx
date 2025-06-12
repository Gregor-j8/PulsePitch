import { useState } from "react"
import { useJoinTeam } from "../../hooks/useTeams"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export const JoinTeamModal = ({ onClose, loggedInUser }) => {
  const Navigate = useNavigate()
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const JoinTeam = useJoinTeam()

  const handleCreate = () => {
  JoinTeam.mutate(
    { TeamName: name, JoinCode: parseInt(code), PlayerId: loggedInUser?.id },
    {
      onSuccess: () => {
        Navigate("/main")
      },
      onerror: () => {
        toast.error("Your team code or team name is incorrect please try again")
      }
    }
  )}

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white/95 rounded-xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Join Team</h2>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1 mt-4">Team Name</label>
          <input type="text" name="teamName" placeholder="Enter your team name" onChange={(e) => {setName(e.target.value)}}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          <label className="block text-gray-700 font-medium mb-1">Team Code</label>
          <input type="text" name="teamCode" placeholder="Enter team code" onChange={(e) => {setCode(e.target.value)}}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
        </div>
        <div className="flex justify-end space-x-4">
          <button onClick={handleCreate} className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
            Join
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