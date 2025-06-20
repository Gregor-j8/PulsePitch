import { useState } from "react";
import { useGetFormationsByTeamId } from "../../hooks/UseFormation";
import { PitchComponent } from "./PitchComponent";

export const TacticalView = ({loggedInUser}) => {
    const [formationId, setFormationId] = useState(0);
    const {data: formations } = useGetFormationsByTeamId(loggedInUser.teams.map(team => team.teamId));
    
        return (
    <div className="text-black">
      <select className="border rounded px-3 py-2 w-full max-w-md mt-15" 
      onChange={(e) => setFormationId(e.target.value)}>
        <option value="">-- Choose a formation --</option>
        {formations.map(formation => (
          <option key={formation.id} value={formation.id}>
            {formation.description}
          </option>
        ))}
      </select>
      <div className="mt-4">
       {formationId && (
          <PitchComponent formationId={formationId}/> 
       )}
        </div>
    </div>

    )
};
