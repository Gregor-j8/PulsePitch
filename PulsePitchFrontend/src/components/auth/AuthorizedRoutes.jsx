import { Navigate } from "react-router-dom";

export const AuthorizedRoute = ({ children, loggedInUser, roles, all }) => {
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

  return authed ? children : <Navigate to="/login" />;
};