import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../managers/authManagers";
import { useAuth } from "../Context/LoggedInUserContext";

export default function NavBar () {
  const { loggedInUser,  setLoggedInUser } = useAuth();

  const [open, setOpen] = useState(false);
  const toggleNavbar = () => setOpen(!open);

  return (
    <nav className="bg-white border-b shadow fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <RRNavLink to="/" className="text-xl font-bold text-gray-800">
            ✍️ PulsePitch
          </RRNavLink>
        </div>

        {loggedInUser ? (
          <>
            <div className="lg:hidden">
              <button
                onClick={toggleNavbar}
                className="text-gray-700 focus:outline-none"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>

            <div className="hidden lg:flex space-x-6 items-center">
              
                <RRNavLink
                  to="/userprofiles"
                  className="text-gray-700 hover:text-blue-600"
                >
                  User Profiles
                </RRNavLink>
              
              <RRNavLink
                to="/categories/manage"
                className="text-gray-700 hover:text-blue-600"
              >
                Manage Categories
              </RRNavLink>

              <button
                onClick={() => {
                  setOpen(false);
                  logout().then(() => setLoggedInUser(null));
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <RRNavLink to="/login">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Login
            </button>
          </RRNavLink>
        )}
      </div>

      {/* Mobile Menu */}
      {open && loggedInUser && (
        <div className="lg:hidden px-4 py-2 space-y-2 bg-white border-t shadow">
          
            <RRNavLink
              to="/userprofiles"
              className="block text-gray-700 hover:text-blue-600"
              onClick={() => setOpen(false)}
            >
              User Profiles
            </RRNavLink>
          <RRNavLink
            to="/categories/manage"
            className="block text-gray-700 hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Video
          </RRNavLink>
          <button
            onClick={() => {
              setOpen(false);
              logout().then(() => setLoggedInUser(null));
            }}
            className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
