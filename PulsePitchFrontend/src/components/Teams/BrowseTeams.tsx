import { useState } from "react";
import { usePublicTeams, useSearchPublicTeams } from "../../hooks/useTeams";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { UserProfileDTO, PublicTeamSearchDTO } from "../../types";
import { TeamCard } from "./TeamCard";
import { JoinTeamConfirmModal } from "../Modals/JoinTeamConfirmModal";
import { Search, Users } from "lucide-react";

interface BrowseTeamsProps {
  loggedInUser: UserProfileDTO;
}

export const BrowseTeams = ({ loggedInUser }: BrowseTeamsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<PublicTeamSearchDTO | null>(null);

  const { data: allTeams, isLoading: loadingAll } = usePublicTeams();
  const { data: searchResults, isLoading: loadingSearch } = useSearchPublicTeams(searchTerm);

  const teams = searchTerm.length >= 2 ? searchResults : allTeams;
  const isLoading = searchTerm.length >= 2 ? loadingSearch : loadingAll;

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Browse Public Teams</h1>
          <p className="text-neutral-600">Discover and join teams in your area</p>
        </div>

        <Card className="p-6 mb-6 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search teams by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          {searchTerm.length > 0 && searchTerm.length < 2 && (
            <p className="text-sm text-neutral-500 mt-2">Type at least 2 characters to search</p>
          )}
        </Card>

        {isLoading ? (
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-center py-12">
              <div className="text-neutral-500">Loading teams...</div>
            </div>
          </Card>
        ) : teams && teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                onClick={() => setSelectedTeam(team)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-6 bg-white">
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
                <Users className="w-8 h-8 text-neutral-400" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                {searchTerm ? "No teams found" : "No public teams available"}
              </h3>
              <p className="text-neutral-500 mb-4">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "There are currently no public teams to join"}
              </p>
              {searchTerm && (
                <Button variant="ghost" onClick={() => setSearchTerm("")}>
                  Clear search
                </Button>
              )}
            </div>
          </Card>
        )}
      </div>

      {selectedTeam && (
        <JoinTeamConfirmModal
          team={selectedTeam}
          loggedInUser={loggedInUser}
          onClose={() => setSelectedTeam(null)}
        />
      )}
    </>
  );
};
