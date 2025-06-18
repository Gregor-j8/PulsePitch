import { useState } from "react"
import { useParams } from "react-router-dom"
import { useUserProile } from "../../hooks/UseUserProfile"
import { useEditUserProfile } from "../../hooks/UseUserProfile"

export const Profile = ({ loggedInUser }) => {
  const { id } = useParams()
  const { data: userProfile } = useUserProile(id)
  const { mutate: updateUserProfile } = useEditUserProfile()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({ firstName: userProfile?.firstName, lastName: userProfile?.lastName, email: userProfile?.email})
  if (!userProfile) return null
  const handleSave = () => {
    updateUserProfile( { id: userProfile.id, data: formData },
      { onSuccess: () => { setShowModal(false)}})}

  return (
    <div className="flex flex-col items-center justify-center h-full pt-40">
      <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-1/2">
        <h2 className="text-xl font-bold mb-2">{userProfile.firstName} {userProfile.lastName}</h2>
        <h2 className="text-xl font-bold mb-2">{userProfile.email}</h2>
        {loggedInUser.id === userProfile.id && (
          <div className="flex flex-col items-center">
            <button onClick={() => {setShowModal(true)}} className="text-xl font-bold mb-2">
              Edit
            </button>
            <button className="text-xl font-bold mb-2 text-red-600">Delete</button>
          </div>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <input className="w-full border p-2 rounded mb-2" value={formData.firstName} placeholder="First Name"
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}/>
            <input className="w-full border p-2 rounded mb-2" value={formData.lastName} placeholder="Last Name"
             onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}/>
            <input type="email" className="w-full border p-2 rounded mb-2" value={formData.email} placeholder="Email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                 Cancel
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}