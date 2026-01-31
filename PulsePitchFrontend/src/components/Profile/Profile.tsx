// @ts-nocheck
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useUserProfile } from "../../hooks/useUserProfile"
import { useEditUserProfile } from "../../hooks/useUserProfile"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Input } from "../ui/Input"
import { ConfirmDialog } from "../ui"

export const Profile = ({ loggedInUser }) => {
  const { id } = useParams()
  const { data: userProfile } = useUserProfile(id)
  const updateUserProfileMutation = useEditUserProfile()
  const { mutate: updateUserProfile } = updateUserProfileMutation
  const [showModal, setShowModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: ''})
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (userProfile) {
      setFormData({
        firstName: userProfile.firstName || '',
        lastName: userProfile.lastName || '',
        email: userProfile.email || ''
      })
    }
  }, [userProfile])

  if (!userProfile) return null

  const validateProfile = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    return newErrors
  }

  const handleSave = () => {
    const validationErrors = validateProfile()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    updateUserProfile( { id: userProfile.id, data: formData },
      { onSuccess: () => { setShowModal(false)}})}

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Card className="p-6 mb-4 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2 text-neutral-800">{userProfile.firstName} {userProfile.lastName}</h2>
        <h2 className="text-xl font-bold mb-2 text-neutral-600">{userProfile.email}</h2>
        {loggedInUser.id === userProfile.id && (
          <div className="flex flex-col gap-2 mt-4">
            <Button variant="primary" onClick={() => {setShowModal(true)}}>
              Edit Profile
            </Button>
            <Button variant="danger" onClick={() => setShowDeleteConfirm(true)}>Delete Account</Button>
          </div>
        )}
      </Card>
      {showModal && (
        <Modal isOpen={true} onClose={() => setShowModal(false)} title="Edit Profile" size="md">
          <ModalBody>
            <Input
              label="First Name"
              value={formData.firstName}
              placeholder="First Name"
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={errors.firstName}
              className="mb-4"
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={errors.lastName}
              className="mb-4"
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              placeholder="Email"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={() => setShowModal(false)} disabled={updateUserProfileMutation.isPending}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSave} loading={updateUserProfileMutation.isPending}>
              Save
            </Button>
          </ModalFooter>
        </Modal>
      )}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={() => {
          console.log("Delete account confirmed")
          setShowDeleteConfirm(false)
        }}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
        confirmText="Delete Account"
      />
    </div>
  )
}