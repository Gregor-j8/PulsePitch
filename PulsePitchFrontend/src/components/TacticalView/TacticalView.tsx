import { useState } from "react"
import { useGetFormationsByTeamId } from "../../hooks/useFormation"
import { PitchComponent } from "./PitchComponent"
import {CreateFormationModal} from "./CreateFormationModal"
import { Button } from "../ui/Button"
import { EmptyState } from "../ui"
import { Layout } from "lucide-react"
import { UserProfileDTO } from "../../types"

interface TacticalViewProps {
  loggedInUser: UserProfileDTO;
}

export const TacticalView = ({loggedInUser}: TacticalViewProps) => {
    const [formationId, setFormationId] = useState<number | null>(0)
    const  [createFormationModal, setCreateFormationModal] = useState<boolean>(false)
    const teamId = (loggedInUser.teams as unknown as Array<{teamId: number}>)?.[0]?.teamId ?? 0;
    const {data: formations } = useGetFormationsByTeamId(teamId)

    const hasFormations = formations && formations.length > 0;

      return (
        <>
          <div className="mt-4">
            {formationId ? (
              <PitchComponent formationId={formationId} setFormationModal={() => setFormationId(0)} setCreateFormationModal={setCreateFormationModal} setFormationId={setFormationId} />
            ) : createFormationModal ? (
              <CreateFormationModal loggedInUser={loggedInUser} setFormationModal={() => {}} setCreateFormationModal={setCreateFormationModal} setFormationId={setFormationId}/>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-neutral-900">Your Formations</h2>
                  <Button
                    variant="primary"
                    onClick={() => { setFormationId(null); setCreateFormationModal(true); }}
                  >
                    Add Formation
                  </Button>
                </div>

                {!hasFormations ? (
                  <EmptyState
                    icon={Layout}
                    title="No Formations Yet"
                    description="Create your first formation to get started with tactical planning."
                    actionLabel="Create Formation"
                    onAction={() => setCreateFormationModal(true)}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {formations?.map((formation) => (
                      <div
                        key={formation.id}
                        onClick={() => setFormationId(formation.id)}
                        className="bg-white border border-neutral-200 rounded-lg p-6 cursor-pointer hover:shadow-lg hover:border-primary-500 transition-all duration-200"
                      >
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <h3 className="text-lg font-semibold text-neutral-900">{formation.description}</h3>
                            <Layout className="h-5 w-5 text-primary-500" />
                          </div>
                          <div className="bg-gradient-to-b from-green-600 to-green-700 rounded-lg h-40 flex items-center justify-center">
                            <span className="text-white text-3xl font-bold">{formation.formation}</span>
                          </div>
                          <div className="text-sm text-neutral-500">
                            Click to view and edit
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )
}