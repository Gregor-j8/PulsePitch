import { X } from "lucide-react";
import { useGetFormationsById, useDeleteFormations, useEditFormations } from "../../hooks/UseFormation";
import { useState } from "react";
import { toast } from "react-toastify";

export const EditFormationModal = ({ formationId, setEditFormationModal, setFormationModal, setFormationId }) => {
    const { data: Players } = useGetFormationsById(formationId)
    const [formData, setFormData] = useState(Players)
    const deleteMutation = useDeleteFormations()
    const editMutation = useEditFormations()

    const handleEditFormation = () => {
        if (!formData.name || !formData.description) return toast.error("Please fill in all fields")
        if (formData.name.length < 3 || formData.description.length < 3) return toast.error("Name and description must be at least 3 characters long")
           const sendFormData = {
                name: formData.name,
                description: formData.description,
            }
        editMutation.mutate({ id: formationId, data: sendFormData } , {
            onSuccess: () => {
                setEditFormationModal(false)
                toast.success("Formation updated successfully")
            }
        })
    }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        <button onClick={() => setEditFormationModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Edit Formation</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Enter formation Name"
                className="w-full px-4 py-2 border rounded-lg"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Enter formation description"
                className="w-full px-4 py-2 border rounded-lg "/>
          </div>
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <button onClick={() => setEditFormationModal(false)}className="px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 cursor-pointer">
            Cancel
          </button>
          <button onClick={handleEditFormation} className="px-5 py-2 bg-blue-600 text-white rounded-lg cursor-pointer">
            Save
          </button>
          <button onClick={() => {deleteMutation.mutate(formationId); setEditFormationModal(false); setFormationModal(true); setFormationId(null)}}
           className="px-5 py-2 bg-red-600 text-white rounded-lg cursor-pointer">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}