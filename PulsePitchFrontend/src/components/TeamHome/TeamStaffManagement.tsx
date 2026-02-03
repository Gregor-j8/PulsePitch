import { useState } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Select } from "../ui/Input";
import { UserPlus, Trash2, Edit2 } from "lucide-react";
import type { AddTeamMemberDTO, UpdateTeamMemberRoleDTO } from "../../types/dtos";

interface TeamStaffManagementProps {
  teamId: number;
  teamMembers: any[];
  availableUsers: any[];
}

export const TeamStaffManagement = ({ teamId, teamMembers, availableUsers }: TeamStaffManagementProps) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("Player");
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);
  const [newRole, setNewRole] = useState<string>("");

  const handleAddMember = async () => {
    if (!selectedUserId) return;

    const addMemberDTO: AddTeamMemberDTO = {
      userProfileId: selectedUserId,
      role: selectedRole
    };

    try {
      const response = await fetch(`/api/teams/${teamId}/staff`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addMemberDTO),
        credentials: "include"
      });

      if (response.ok) {
        alert("Member added successfully!");
        setSelectedUserId(null);
        setSelectedRole("Player");
      } else {
        alert("Failed to add member");
      }
    } catch (error) {
      console.error("Error adding member:", error);
      alert("Error adding member");
    }
  };

  const handleUpdateRole = async (playerTeamId: number, role: string) => {
    const updateDTO: UpdateTeamMemberRoleDTO = {
      newRole: role
    };

    try {
      const response = await fetch(`/api/teams/${teamId}/staff/${playerTeamId}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateDTO),
        credentials: "include"
      });

      if (response.ok) {
        alert("Role updated successfully!");
        setEditingMemberId(null);
      } else {
        alert("Failed to update role");
      }
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Error updating role");
    }
  };

  const handleRemoveMember = async (playerTeamId: number) => {
    if (!confirm("Are you sure you want to remove this member from the team?")) {
      return;
    }

    try {
      const response = await fetch(`/api/teams/${teamId}/staff/${playerTeamId}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (response.ok) {
        alert("Member removed successfully!");
      } else {
        alert("Failed to remove member");
      }
    } catch (error) {
      console.error("Error removing member:", error);
      alert("Error removing member");
    }
  };

  const managers = teamMembers.filter(m => m.role === "Manager");
  const coaches = teamMembers.filter(m => m.role === "Coach");
  const players = teamMembers.filter(m => m.role === "Player");

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Add Team Member</h3>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Select User
            </label>
            <Select
              value={selectedUserId || ''}
              onChange={(e) => setSelectedUserId(parseInt(e.target.value))}
              options={[
                { value: '', label: 'Select a user', disabled: true },
                ...availableUsers.map((user: any) => ({
                  value: user.id,
                  label: `${user.firstName} ${user.lastName}`
                }))
              ]}
            />
          </div>

          <div className="w-48">
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Role
            </label>
            <Select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              options={[
                { value: 'Player', label: 'Player' },
                { value: 'Coach', label: 'Coach' },
                { value: 'Manager', label: 'Manager' }
              ]}
            />
          </div>

          <div className="flex items-end">
            <Button
              variant="primary"
              onClick={handleAddMember}
              disabled={!selectedUserId}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Managers</h3>
        {managers.length === 0 ? (
          <p className="text-neutral-500 text-sm">No managers</p>
        ) : (
          <div className="space-y-2">
            {managers.map((member: any) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">
                    {member.player.firstName} {member.player.lastName}
                  </p>
                  <p className="text-sm text-neutral-600">Manager</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingMemberId(member.id);
                      setNewRole(member.role);
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Coaches</h3>
        {coaches.length === 0 ? (
          <p className="text-neutral-500 text-sm">No coaches</p>
        ) : (
          <div className="space-y-2">
            {coaches.map((member: any) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">
                    {member.player.firstName} {member.player.lastName}
                  </p>
                  <p className="text-sm text-neutral-600">Coach</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingMemberId(member.id);
                      setNewRole(member.role);
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Players</h3>
        {players.length === 0 ? (
          <p className="text-neutral-500 text-sm">No players</p>
        ) : (
          <div className="space-y-2">
            {players.map((member: any) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">
                    {member.player.firstName} {member.player.lastName}
                  </p>
                  <p className="text-sm text-neutral-600">Player</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setEditingMemberId(member.id);
                      setNewRole(member.role);
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {editingMemberId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Update Member Role</h3>
            <Select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              options={[
                { value: 'Player', label: 'Player' },
                { value: 'Coach', label: 'Coach' },
                { value: 'Manager', label: 'Manager' }
              ]}
              className="mb-4"
            />
            <div className="flex gap-2">
              <Button
                variant="primary"
                onClick={() => handleUpdateRole(editingMemberId, newRole)}
              >
                Update
              </Button>
              <Button
                variant="ghost"
                onClick={() => setEditingMemberId(null)}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
