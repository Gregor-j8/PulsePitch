import { useState } from "react"
import { useGetFormationsByTeamId } from "../../hooks/UseFormation"
import { PitchComponent } from "./PitchComponent"
import { useNavigate } from "react-router-dom"
import {CreateFormationModal} from "./CreateFormationModal"

export const TacticalView = ({loggedInUser}) => {
    const navigate = useNavigate()
    const [formationId, setFormationId] = useState(0)
    const  [formationModal, setFormationModal] = useState(false)
    const  [createFormationModal, setCreateFormationModal] = useState(false)
    const {data: formations } = useGetFormationsByTeamId(loggedInUser.teams.map(team => team.teamId))

      return (
        <>
          {formationModal && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-lg font-bold mb-4">Choose a Formation</h2>
                <button onClick={() => { setFormationId(null); setCreateFormationModal(true); setFormationModal(false)}}
                  className="bg-blue-500 w-full cursor-pointer text-white font-medium py-2 px-4 mb-2 rounded-lg">Add A Formation</button>
                <select className="border rounded px-3 py-2 w-full" defaultValue={"default"}
                  onChange={(e) => {setFormationModal(false); setFormationId(e.target.value)}}>
                  <option value="default" disabled>Choose a formation</option>
                  {formations.map(formation => (
                    <option key={formation.id} value={formation.id}>{formation.description}</option>
                  ))}
                </select>
                <div className="flex justify-end mt-4">
                  <button onClick={() => navigate("/")} className="bg-blue-500 text-white px-4 py-2 rounded">
                    Close
                  </button>
                </div>
              </div>
            </div>
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