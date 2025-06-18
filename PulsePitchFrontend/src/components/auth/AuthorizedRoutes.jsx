import { Navigate } from "react-router-dom";

export const AuthorizedRoute = ({ children, loggedInUser, roles, teams, all }) => {
  if (!loggedInUser) {
    return <Navigate to="/login" />
  }

  const roleCheck = roles?.length
    ? (all ? roles.every((r) => loggedInUser.roles.includes(r)) : roles.some((r) => loggedInUser.roles.includes(r))) : true

  const teamCheck = Array.isArray(teams) ? teams.length > 0 : true

  if (roleCheck && teamCheck) {
    return children
  }

    return <Navigate to="/home" />

};