import { createContext, useContext } from "react"
import { useAuth } from "./LoggedInUserContext"
import { useCurrentPlayerTeam } from "../hooks/usePlayerTeams"
const UserTeamContext = createContext(null)

export const LoggedInUserTeams = ({ children }) => {
    const { loggedInUser } = useAuth();
    const { data: userTeams, isLoading, isError } = useCurrentPlayerTeam(loggedInUser?.id);
    
    if (!loggedInUser || isLoading) return null;
    if (isError) return <div>Failed to load teams</div>;

    return (
        <UserTeamContext.Provider value={{ userTeams }}>
            {children}
        </UserTeamContext.Provider>
    )
}

export const useUserTeam = () => useContext(UserTeamContext)
