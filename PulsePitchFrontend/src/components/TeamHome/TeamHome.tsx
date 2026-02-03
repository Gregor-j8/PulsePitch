import { Link } from "react-router-dom"
import { useDeletePlayerTeam, useGetPlayersFromTeam } from "../../hooks/usePlayerTeams";
import { useState, useEffect } from "react"
import { useTeams, useTeam, usePendingJoinRequests } from "../../hooks/useTeams"
import { Card } from "../ui/Card"
import { Button } from "../ui/Button"
import { Select } from "../ui/Input"
import { ConfirmDialog, EmptyState } from "../ui"
import { Users, Settings as SettingsIcon, Clock, UserCog } from "lucide-react"
import { UserProfileDTO, PlayerTeamDTO } from "../../types"
import { TeamSettings } from "./TeamSettings"
import { PendingJoinRequests } from "./PendingJoinRequests"
import { TeamStaffManagement } from "./TeamStaffManagement"

interface TeamHomeProps {
  loggedInUser: UserProfileDTO | null;
}

type TabType = 'overview' | 'settings' | 'requests' | 'staff';

export const TeamHome = ({loggedInUser}: TeamHomeProps) => {
  const [teamId, setTeamId] = useState<number | undefined>()
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const { data: teamNames } = useTeams()
  const { data: selectedTeam } = useTeam(teamId)
  const {data: teams} = useGetPlayersFromTeam(teamId)
  const { data: pendingRequests } = usePendingJoinRequests(teamId)
  const deletePlayerTeamMutation = useDeletePlayerTeam()
  const {mutate: deletePlayerTeam} = deletePlayerTeamMutation
  const [deleteConfirmPlayer, setDeleteConfirmPlayer] = useState<PlayerTeamDTO | null>(null)

  const userTeamRole = (loggedInUser as any)?.teams?.find((t: any) => t.teamId === teamId)?.role
  const canManageRoster = userTeamRole === "Manager"

  const pendingCount = pendingRequests?.length || 0

  useEffect(() => {
    if (!teamId && (loggedInUser as any)?.teams && (loggedInUser as any).teams.length > 0) {
      setTeamId((loggedInUser as any).teams[0].teamId)
    }
  }, [teamId, loggedInUser])

  const hasPlayers = teams && Array.isArray(teams) && teams.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Select
        value={teamId || ''}
        onChange={(e) => setTeamId(parseInt(e.target.value))}
        options={[
          { value: '', label: 'Select a Team', disabled: true },
          ...((loggedInUser as any)?.teams || []).map((team: any) => ({
            value: team.teamId,
            label: teamNames?.find((t: any) => t.id === team.teamId)?.name || 'Loading...'
          }))
        ]}
        className="mb-6 w-full max-w-md"
      />

      {teamId && (
        <>
          {canManageRoster && (
            <div className="mb-6 border-b border-neutral-200">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'overview'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <Users className="w-4 h-4 inline mr-2" />
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'settings'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <SettingsIcon className="w-4 h-4 inline mr-2" />
                  Settings
                </button>
                <button
                  onClick={() => setActiveTab('requests')}
                  className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors relative ${
                    activeTab === 'requests'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <Clock className="w-4 h-4 inline mr-2" />
                  Pending Requests
                  {pendingCount > 0 && (
                    <span className="ml-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-700">
                      {pendingCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('staff')}
                  className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'staff'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-neutral-600 hover:text-neutral-900 hover:border-neutral-300'
                  }`}
                >
                  <UserCog className="w-4 h-4 inline mr-2" />
                  Staff Management
                </button>
              </div>
            </div>
          )}

          {activeTab === 'overview' && (
            <>
              {!hasPlayers ? (
                <EmptyState
                  icon={Users}
                  title="No Players on This Team"
                  description="This team doesn't have any players yet. Invite players to join your team to get started."
                />
              ) : (
                <div className="space-y-4">
                  {teams.map((team: any) => (
                    <Card key={team.id} className="flex justify-between items-center p-6">
                      <div>
                        <h2 className="text-xl font-bold text-neutral-800">
                          <Link to={`/profile/${team.playerId}`} className="text-primary-600 hover:underline">
                            {team?.player.firstName} {team?.player.lastName}
                          </Link>
                        </h2>
                        <p className="text-sm text-neutral-600 mt-1">
                          Role: <span className="font-medium">{team.role || 'Player'}</span>
                        </p>
                      </div>
                      {canManageRoster && (
                        <Button variant="danger" size="sm" onClick={() => setDeleteConfirmPlayer(team)} loading={deletePlayerTeamMutation.isPending}>
                          Delete
                        </Button>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'settings' && selectedTeam && canManageRoster && (
            <TeamSettings team={selectedTeam} />
          )}

          {activeTab === 'requests' && canManageRoster && (
            <PendingJoinRequests teamId={teamId} />
          )}

          {activeTab === 'staff' && canManageRoster && (
            <TeamStaffManagement
              teamId={teamId}
              teamMembers={Array.isArray(teams) ? teams : []}
              availableUsers={[]}
            />
          )}
        </>
      )}
      <ConfirmDialog
        isOpen={!!deleteConfirmPlayer}
        onClose={() => setDeleteConfirmPlayer(null)}
        onConfirm={() => {
          if (deleteConfirmPlayer) {
            deletePlayerTeam(deleteConfirmPlayer.id)
            setDeleteConfirmPlayer(null)
          }
        }}
        title="Remove Player from Team"
        message={`Are you sure you want to remove ${deleteConfirmPlayer?.player?.firstName} ${deleteConfirmPlayer?.player?.lastName} from this team?`}
        confirmText="Remove"
        isLoading={deletePlayerTeamMutation.isPending}
      />
    </div>
  )
}