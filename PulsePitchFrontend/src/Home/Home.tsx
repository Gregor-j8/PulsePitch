import { useState } from "react"
import { CreateTeamModal } from "../components/Modals/CreateTeamModals"
import { JoinTeamModal } from "../components/Modals/JoinTeamModal"
import { LoadingSpinner } from "../components/LoadingPage"
import { Card } from "../components/ui/Card"
import { Button } from "../components/ui/Button"
import { UserProfileDTO } from "../types"

interface HomeProps {
  loggedInUser: UserProfileDTO | null;
}

export const Home = ({loggedInUser}: HomeProps) => {
  const [showCreateTeamModal, setShowCreateTeamModal] = useState<boolean>(false)
  const [showJoinTeamModal, setShowJoinTeamModal] = useState<boolean>(false)

  if (!loggedInUser) return <LoadingSpinner/>
  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-neutral-100">
      <Card className="p-10 w-full text-center">
        <h2 className="text-2xl font-semibold mb-6 text-neutral-800">Team Options</h2>
        <div className="flex flex-col space-y-4">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setShowCreateTeamModal(true)}
          >
            Create Team
          </Button>
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => setShowJoinTeamModal(true)}
          >
            Join Team
          </Button>
        </div>
        {showCreateTeamModal && <CreateTeamModal loggedInUser={loggedInUser} onClose={() => setShowCreateTeamModal(false)} />}
        {showJoinTeamModal && <JoinTeamModal loggedInUser={loggedInUser} onClose={() => {setShowJoinTeamModal(false)}} />}
      </Card>
    </div>
  )
}