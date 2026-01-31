// @ts-nocheck
import { useState } from "react"
import { useGetFormationsByTeamId } from "../../hooks/UseFormation"
import { PitchComponent } from "./PitchComponent"
import { useNavigate } from "react-router-dom"
import {CreateFormationModal} from "./CreateFormationModal"
import { Modal, ModalBody, ModalFooter } from "../ui/Modal"
import { Button } from "../ui/Button"
import { Select } from "../ui/Input"

export const TacticalView = ({loggedInUser}) => {
    const navigate = useNavigate()
    const [formationId, setFormationId] = useState(0)
    const  [formationModal, setFormationModal] = useState(false)
    const  [createFormationModal, setCreateFormationModal] = useState(false)
    const {data: formations } = useGetFormationsByTeamId(loggedInUser.teams.map(team => team.teamId))

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
                <Select
                  value="default"
                  onChange={(e) => {setFormationModal(false); setFormationId(e.target.value)}}
                  options={[
                    { value: 'default', label: 'Choose a formation', disabled: true },
                    ...formations.map(formation => ({
                      value: formation.id,
                      label: formation.description
                    }))
                  ]}
                />
              </ModalBody>
              <ModalFooter>
                <Button variant="primary" onClick={() => navigate("/")}>
                  Close
                </Button>
              </ModalFooter>
            </Modal>
          )}
          <div className="mt-4">
            {formationId && (
              <PitchComponent formationId={formationId} setFormationModal={setFormationModal} setCreateFormationModal={setCreateFormationModal} setFormationId={setFormationId} />
            )}
            {createFormationModal && (
              <CreateFormationModal loggedInUser={loggedInUser} setFormationModal={setFormationModal} setCreateFormationModal={setCreateFormationModal} setFormationId={setFormationId}/>
            )}
          </div>
        </>
      )
}