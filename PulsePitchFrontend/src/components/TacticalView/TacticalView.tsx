import { useState } from "react"
import { useGetFormationsByTeamId } from "../../hooks/useFormation"
import { PitchComponent } from "./PitchComponent"
import {CreateFormationModal} from "./CreateFormationModal"
import { FormationPreviewCard } from "./FormationPreviewCard"
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

    const userTeamRole = (loggedInUser.teams as unknown as Array<{teamId: number, role: string}>)?.find((t: any) => t.teamId === teamId)?.role
    const canManageFormations = userTeamRole === "Manager" || userTeamRole === "Coach"

    const hasFormations = formations && formations.length > 0;

      return (
        <>
          <div className="mt-4">
            {formationId ? (
              <PitchComponent formationId={formationId} setFormationModal={() => setFormationId(0)} setCreateFormationModal={setCreateFormationModal} setFormationId={setFormationId} canManageFormations={canManageFormations} />
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