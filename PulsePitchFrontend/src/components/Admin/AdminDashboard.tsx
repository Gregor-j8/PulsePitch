import { useState, useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Users, Shield, Trash2, BarChart3, RefreshCw } from "lucide-react";
import type { UpdateUserRolesDTO, AnalyticsDTO } from "../../types/dtos";

interface UserProfile {
  id: number;
  identityUserId: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

interface Team {
  id: number;
  name: string;
  joinCode: string;
  memberCount: number;
}

export const AdminDashboard = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [newRoles, setNewRoles] = useState<string[]>([]);

  useEffect(() => {
    loadUsers();
    loadTeams();
    loadAnalytics();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/users", {
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadTeams = async () => {
    try {
      const response = await fetch("/api/admin/teams", {
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        setTeams(data);
      }
    } catch (error) {
      console.error("Error loading teams:", error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const response = await fetch("/api/admin/analytics", {
        credentials: "include"
      });
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error("Error loading analytics:", error);
    }
  };

  const handleUpdateUserRoles = async () => {
    if (!selectedUser) return;

    const updateDTO: UpdateUserRolesDTO = {
      roles: newRoles
    };

    try {
      const response = await fetch(`/api/admin/users/${selectedUser.id}/roles`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateDTO),
        credentials: "include"
      });

      if (response.ok) {
        alert("User roles updated successfully!");
        setSelectedUser(null);
        loadUsers();
      } else {
        alert("Failed to update user roles");
      }
    } catch (error) {
      console.error("Error updating user roles:", error);
      alert("Error updating user roles");
    }
  };

  const handleDeleteUser = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (response.ok) {
        alert("User deleted successfully!");
        loadUsers();
      } else {
        alert("Failed to delete user");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  const handleDeleteTeam = async (teamId: number) => {
    if (!confirm("Are you sure you want to delete this team? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/teams/${teamId}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (response.ok) {
        alert("Team deleted successfully!");
        loadTeams();
        loadAnalytics();
      } else {
        alert("Failed to delete team");
      }
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("Error deleting team");
    }
  };

  const toggleRole = (role: string) => {
    if (newRoles.includes(role)) {
      setNewRoles(newRoles.filter(r => r !== role));
    } else {
      setNewRoles([...newRoles, role]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Admin Dashboard</h1>
        <p className="text-neutral-600">Manage users, teams, and view system analytics</p>
      </div>

      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Total Users</p>
                <p className="text-2xl font-bold text-neutral-900">{analytics.totalUsers}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Total Teams</p>
                <p className="text-2xl font-bold text-neutral-900">{analytics.totalTeams}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-neutral-600">Active Users (7d)</p>
                <p className="text-2xl font-bold text-neutral-900">{analytics.activeUsersLast7Days}</p>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      <Card className="p-6 bg-white mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-neutral-900">User Management</h2>
          <Button variant="ghost" onClick={loadUsers} disabled={loading}>
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        <div className="space-y-2">
          {users.map((user) => (
            <div key={user.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-neutral-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-neutral-600">{user.email}</p>
                <div className="flex gap-2 mt-1">
                  {user.roles && user.roles.map((role) => (
                    <span
                      key={role}
                      className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedUser(user);
                    setNewRoles(user.roles || []);
                  }}
                >
                  <Shield className="w-4 h-4" />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6 bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-neutral-900">Team Management</h2>
          <Button variant="ghost" onClick={loadTeams}>
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-2">
          {teams.map((team) => (
            <div key={team.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-neutral-900">{team.name}</p>
                <p className="text-sm text-neutral-600">
                  Join Code: {team.joinCode} • {team.memberCount} members
                </p>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteTeam(team.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">
              Update Roles for {selectedUser.firstName} {selectedUser.lastName}
            </h3>

            <div className="space-y-2 mb-4">
              {['User', 'Coach', 'Admin'].map((role) => (
                <label key={role} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newRoles.includes(role)}
                    onChange={() => toggleRole(role)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-neutral-700">{role}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="primary" onClick={handleUpdateUserRoles}>
                Update Roles
              </Button>
              <Button variant="ghost" onClick={() => setSelectedUser(null)}>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
