import { X } from "lucide-react";
import { useGetFormationsById, useDeleteFormations, useEditFormations } from "../../hooks/useFormation";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface EditFormationModalProps {
  formationId: number;
  setEditFormationModal: (value: boolean) => void;
  setFormationModal: (value: boolean) => void;
  setFormationId: (value: number | null) => void;
}

export const EditFormationModal = ({ formationId, setEditFormationModal, setFormationModal, setFormationId }: EditFormationModalProps) => {
    const { data: Players } = useGetFormationsById(formationId)
    const [formData, setFormData] = useState<{ name: string; description: string }>({ name: "", description: "" })
    const deleteMutation = useDeleteFormations()
    const editMutation = useEditFormations()

    useEffect(() => {
        if (Players) {
            setFormData({ name: Players.name ?? "", description: Players.description ?? "" })
        }
    }, [Players])

    const handleEditFormation = () => {
        if (!formData.name || !formData.description) return toast.error("Please fill in all fields")
        if (formData.name.length < 3 || formData.description.length < 3) return toast.error("Name and description must be at least 3 characters long")
           const sendFormData = {
                name: formData.name,
                description: formData.description,
            }
        editMutation.mutate({ id: formationId, data: sendFormData } as any, {
            onSuccess: () => {
                setEditFormationModal(false)
                toast.success("Formation updated successfully")
            }
        })
    }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl w-full max-w-[95vw] sm:max-w-md relative mx-4">
        <button onClick={() => setEditFormationModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-center text-gray-800">Edit Formation</h2>
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
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-4 sm:mt-6">
          <button onClick={() => setEditFormationModal(false)}className="w-full sm:w-auto px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 cursor-pointer text-sm sm:text-base">
            Cancel
          </button>
          <button onClick={handleEditFormation} className="w-full sm:w-auto px-5 py-2 bg-blue-600 text-white rounded-lg cursor-pointer text-sm sm:text-base">
            Save
          </button>
          <button onClick={() => {deleteMutation.mutate(formationId); setEditFormationModal(false); setFormationModal(true); setFormationId(null)}}
           className="w-full sm:w-auto px-5 py-2 bg-red-600 text-white rounded-lg cursor-pointer text-sm sm:text-base">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}