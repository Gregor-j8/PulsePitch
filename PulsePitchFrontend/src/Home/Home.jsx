import { useState } from "react"
import { CreateTeamModal } from "../components/Modals/CreateTeamModals"
import { JoinTeamModal } from "../components/Modals/JoinTeamModal"
import { useAuth } from "../Context/LoggedInUserContext";

export const Home = () => {
  const { loggedInUser } = useAuth();
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false)
  const [showJoinTeamModal, setShowJoinTeamModal] = useState(false)

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Team Options</h2>
        <div className="flex flex-col space-y-4">
          <button onClick={() => setShowCreateTeamModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Create Team
          </button>
          <button onClick={() => setShowJoinTeamModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Join Team
          </button>
        </div>
        {showCreateTeamModal && <CreateTeamModal onClose={() => setShowCreateTeamModal(false)} />}
        {showJoinTeamModal && <JoinTeamModal loggedInUser={loggedInUser} onClose={() => {setShowJoinTeamModal(false)}} />}
      </div>
    </div>
  )
}