import { useState } from "react"
import { X } from "lucide-react"
import { useDeletePlayersInFormations } from "../../hooks/usePlayersInFormation"

export const EditPlayerModal = ({ player, onClose, onSave }) => {
    const mutation = useDeletePlayersInFormations()
    const [name, setName] = useState(player.name)
    const [role, setRole] = useState(player.role)

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        <button onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Player</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter player name"
             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Enter player role"
             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100">
            Cancel
          </button>
          <button onClick={() => onSave({ ...player, name, role })}
           className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Save
          </button>
          <button onClick={() => mutation.mutate(player.id)}
           className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
