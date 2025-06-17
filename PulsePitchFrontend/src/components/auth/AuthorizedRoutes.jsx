import { Navigate } from "react-router-dom";

export const AuthorizedRoute = ({ children, loggedInUser, roles, teams,   all }) => {
  let authed = false;
  if (loggedInUser) {
    if (roles && roles.length) {
      authed = all
        ? roles.every((r) => loggedInUser.roles.includes(r))
        : roles.some((r) => loggedInUser.roles.includes(r));
    } else {
      authed = true;
    }
  }

  if (authed) {
    if (teams?.length === 0 && (roles.includes("Player") || roles.includes("Coach"))) {
      return <Navigate to="/home" />
    }
}

  return authed ? children : <Navigate to="/login" />;
};