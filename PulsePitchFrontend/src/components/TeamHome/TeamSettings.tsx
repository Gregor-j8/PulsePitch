import { useState, useEffect } from "react";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { TeamDTO } from "../../types";
import { useEditTeam } from "../../hooks/useTeams";
import { Settings, Globe, Lock, Shield, Zap } from "lucide-react";

interface TeamSettingsProps {
  team: TeamDTO;
}

export const TeamSettings = ({ team }: TeamSettingsProps) => {
  const [isPublic, setIsPublic] = useState(team.isPublic);
  const [requiresApproval, setRequiresApproval] = useState(team.requiresApproval);
  const [name, setName] = useState(team.name);
  const [joinCode, setJoinCode] = useState(team.joinCode);
  const [hasChanges, setHasChanges] = useState(false);

  const editTeam = useEditTeam();

  useEffect(() => {
    const changed =
      isPublic !== team.isPublic ||
      requiresApproval !== team.requiresApproval ||
      name !== team.name ||
      joinCode !== team.joinCode;
    setHasChanges(changed);
  }, [isPublic, requiresApproval, name, joinCode, team]);

  const handleSave = async () => {
    try {
      await editTeam.mutateAsync({
        id: team.id,
        data: {
          name,
          joinCode,
          isPublic,
          requiresApproval,
        },
      });
      alert("Team settings updated successfully!");
    } catch (error) {
      alert(`${error} Failed to update team settings. Please try again.`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-neutral-700" />
        <h2 className="text-2xl font-bold text-neutral-900">Team Settings</h2>
      </div>

      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Basic Information</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Team Name
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Team name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Join Code
            </label>
            <Input
              type="text"
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value)}
              placeholder="Join code"
            />
            <p className="text-xs text-neutral-500 mt-1">
              {isPublic
                ? "Join code is optional for public teams"
                : "Players need this code to request access to your private team"}
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Team Visibility</h3>

        <div className="space-y-4">
          <div
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              isPublic
                ? "border-blue-500 bg-blue-50"
                : "border-neutral-200 hover:border-neutral-300"
            }`}
            onClick={() => setIsPublic(true)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isPublic ? "border-blue-500 bg-blue-500" : "border-neutral-400"
                  }`}
                >
                  {isPublic && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-neutral-900">Public Team</span>
                </div>
                <p className="text-sm text-neutral-600">
                  Your team will be discoverable in the browse teams page. Players can find and request to join.
                </p>
              </div>
            </div>
          </div>

          <div
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              !isPublic
                ? "border-blue-500 bg-blue-50"
                : "border-neutral-200 hover:border-neutral-300"
            }`}
            onClick={() => setIsPublic(false)}
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    !isPublic ? "border-blue-500 bg-blue-500" : "border-neutral-400"
                  }`}
                >
                  {!isPublic && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
              </div>
              <div className="ml-3 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-neutral-900">Private Team</span>
                </div>
                <p className="text-sm text-neutral-600">
                  Your team is hidden from browse. Players need the join code AND your approval to join.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {isPublic && (
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">Join Approval</h3>

          <div className="space-y-4">
            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                !requiresApproval
                  ? "border-green-500 bg-green-50"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
              onClick={() => setRequiresApproval(false)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      !requiresApproval ? "border-green-500 bg-green-500" : "border-neutral-400"
                    }`}
                  >
                    {!requiresApproval && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-neutral-900">Instant Join</span>
                  </div>
                  <p className="text-sm text-neutral-600">
                    Players are added to your team immediately when they request to join.
                  </p>
                </div>
              </div>
            </div>

            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                requiresApproval
                  ? "border-blue-500 bg-blue-50"
                  : "border-neutral-200 hover:border-neutral-300"
              }`}
              onClick={() => setRequiresApproval(true)}
            >
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      requiresApproval ? "border-blue-500 bg-blue-500" : "border-neutral-400"
                    }`}
                  >
                    {requiresApproval && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-neutral-900">Require Approval</span>
                  </div>
                  <p className="text-sm text-neutral-600">
                    You must approve each join request before players are added to your team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="flex justify-end">
        <Button
          variant="primary"
          onClick={handleSave}
          disabled={!hasChanges || editTeam.isPending}
        >
          {editTeam.isPending ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
