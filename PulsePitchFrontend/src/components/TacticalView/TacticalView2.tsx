import { useState } from "react"
import { useGetFormationsByTeamId } from "../../hooks/useFormation"
import { PitchComponent } from "./PitchComponent"
import {CreateFormationModal} from "./CreateFormationModal"
import { FormationPreviewCard } from "./FormationPreviewCard"
import { WalkthroughPlannerCanvas } from "./WalkthroughPlanner/WalkthroughPlannerCanvas"
import { usePlayersByFormationId } from "../../hooks/usePlayersInFormation"
import { Button } from "../ui/Button"
import { EmptyState } from "../ui"
import { Layout } from "lucide-react"
import { UserProfileDTO } from "../../types"

interface TacticalViewProps {
  loggedInUser: UserProfileDTO;
}

export const TacticalView2 = ({loggedInUser}: TacticalViewProps) => {
    const [formationId, setFormationId] = useState<number | null>(0)
    const [createFormationModal, setCreateFormationModal] = useState<boolean>(false)
    const [viewMode, setViewMode] = useState<'static' | 'walkthrough'>('static')
    const teamId = (loggedInUser.teams as unknown as Array<{teamId: number}>)?.[0]?.teamId ?? 0;
    const {data: formations } = useGetFormationsByTeamId(teamId)
    const {data: players } = usePlayersByFormationId(formationId ?? 0)

    const userTeamRole = (loggedInUser.teams as unknown as Array<{teamId: number, role: string}>)?.find((t: any) => t.teamId === teamId)?.role
    const canManageFormations = userTeamRole === "Manager" || userTeamRole === "Coach"

    const hasFormations = formations && formations.length > 0;

      return (
        <>
          <div className="mt-4">
            {formationId ? (
              viewMode === 'walkthrough' && players ? (
                <WalkthroughPlannerCanvas
                  formationId={formationId}
                  players={players}
                  onBack={() => {
                    setFormationId(0);
                    setViewMode('static');
                  }}
                />
              ) : (
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'static' ? 'primary' : 'outline'}
                      onClick={() => setViewMode('static')}
                    >
                      Static Formation
                    </Button>
                    <Button
                      variant={viewMode === 'walkthrough' ? 'primary' : 'outline'}
                      onClick={() => setViewMode('walkthrough')}
                    >
                      Walkthrough Planner
                    </Button>
                  </div>
                  <PitchComponent
                    formationId={formationId}
                    setFormationModal={() => setFormationId(0)}
                    setCreateFormationModal={setCreateFormationModal}
                    setFormationId={setFormationId}
                    canManageFormations={canManageFormations}
                  />
                </div>
              )
            ) : createFormationModal ? (
              <CreateFormationModal loggedInUser={loggedInUser} setFormationModal={() => {}} setCreateFormationModal={setCreateFormationModal} setFormationId={setFormationId}/>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-neutral-900">Your Formations</h2>
                  {canManageFormations && (
                    <Button
                      variant="primary"
                      onClick={() => { setFormationId(null); setCreateFormationModal(true); }}
                    >
                      Add Formation
                    </Button>
                  )}
                </div>

                {!hasFormations ? (
                  <EmptyState
                    icon={Layout}
                    title="No Formations Yet"
                    description={canManageFormations ? "Create your first formation to get started with tactical planning." : "No formations have been created for this team yet."}
                    actionLabel={canManageFormations ? "Create Formation" : undefined}
                    onAction={canManageFormations ? () => setCreateFormationModal(true) : undefined}
                  />
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {formations?.map((formation) => (
                      <FormationPreviewCard
                        key={formation.id}
                        formation={formation}
                        onClick={() => setFormationId(formation.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )
}
