import { Navigate } from "react-router-dom";

export const AuthorizedRoute = ({
  children,
  loggedInUser,
  roles = [],
  all = false,
}) => {
  const userRoles = loggedInUser?.roles || [];
  const isLoggedIn = !!loggedInUser;

  let authed = false;

  if (isLoggedIn) {
    if (roles.length) {
      authed = all
        ? roles.every((role) => userRoles.includes(role))
        : roles.some((role) => userRoles.includes(role));
    } else {
      authed = true;
    }
  }

  return authed ? children : <Navigate to="/login" />;
};
