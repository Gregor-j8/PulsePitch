import { Navigate } from "react-router-dom";
import { AuthorizedRouteProps } from "../../types";

export const AuthorizedRoute = ({ children, loggedInUser, roles }: AuthorizedRouteProps) => {
  if (!loggedInUser) {
    return <Navigate to="/login" />
  }

  const roleCheck = roles?.length
    ? roles.some((r: string) => loggedInUser.roles.includes(r)) : true

  if (roleCheck) {
    return children
  }

    return <Navigate to="/home" />

};