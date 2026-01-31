import { useState } from "react"
import { useGetFormationsByTeamId } from "../../hooks/useFormation"
import { PitchComponent } from "./PitchComponent"
import { useNavigate } from "react-router-dom"
import {CreateFormationModal} from "./CreateFormationModal"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Select } from "../ui/Input"
import { EmptyState } from "../ui"
import { Layout } from "lucide-react"
import { UserProfileDTO } from "../../types"

interface TacticalViewProps {
  loggedInUser: UserProfileDTO;
}

export const TacticalView = ({loggedInUser}: TacticalViewProps) => {
    const navigate = useNavigate()
    const [formationId, setFormationId] = useState<number | null>(0)
    const  [formationModal, setFormationModal] = useState<boolean>(false)
    const  [createFormationModal, setCreateFormationModal] = useState<boolean>(false)
    const {data: formations } = useGetFormationsByTeamId((loggedInUser as any).teams?.map((team: any) => team.teamId) ?? [])

    const hasFormations = formations && formations.length > 0;

      return (
        <>
          {formationModal && (
            <Modal isOpen={true} onClose={() => navigate("/")} title="Choose a Formation" size="md">
              <ModalBody>
                <Button
                  variant="primary"
                  onClick={() => { setFormationId(null); setCreateFormationModal(true); setFormationModal(false)}}
                  className="w-full mb-4"
                >
                  Add A Formation
                </Button>
                {!hasFormations ? (
                  <div className="py-4">
                    <p className="text-center text-neutral-500 text-sm">No formations available. Create your first formation to get started.</p>
                  </div>
                ) : (
                  <Select
                    value="default"
                    onChange={(e) => {setFormationModal(false); setFormationId(parseInt(e.target.value))}}
                    options={[
                      { value: 'default', label: 'Choose a formation' },
                      ...(formations ?? []).map(formation => ({
                        value: formation.id,
                        label: formation.description
                      }))
                    ]}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button variant="primary" onClick={() => navigate("/")}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          )}
          <div className="mt-4">
            {formationId ? (
              <PitchComponent formationId={formationId} setFormationModal={setFormationModal} setCreateFormationModal={setCreateFormationModal} setFormationId={setFormationId} />
            ) : !createFormationModal && (
              <EmptyState
                icon={Layout}
                title="No Formation Selected"
                description="Select or create a formation to view and edit your team's tactical setup."
                actionLabel="Choose Formation"
                onAction={() => setFormationModal(true)}
              />
            )}
            {createFormationModal && (
              <CreateFormationModal loggedInUser={loggedInUser} setFormationModal={setFormationModal} setCreateFormationModal={setCreateFormationModal} setFormationId={setFormationId}/>
            )}
          </div>
        </>
      )
}