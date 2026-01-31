// @ts-nocheck
import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from "../managers/authManagers";

export default function NavBar({ loggedInUser, setLoggedInUser }) {
  const [open, setOpen] = useState(false);
  const toggleNavbar = () => setOpen(!open);

  const handleLogout = () => {
    setOpen(false);
    logout().then(() => setLoggedInUser(null));
  };

  return (
    <nav className="bg-white border-b shadow fixed w-full z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <div className="flex items-center">
          <RRNavLink to="/" className="text-xl font-bold text-gray-800">
            PulsePitch
          </RRNavLink>
        </div>
        {loggedInUser && (
          <>
            <div className="lg:hidden">
              <button onClick={toggleNavbar} className="text-gray-700 focus:outline-none">
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
              <RRNavLink to="/home" className="text-gray-700 hover:text-blue-600">Join Team</RRNavLink>
              <RRNavLink to="/team" className="text-gray-700 hover:text-blue-600">Team</RRNavLink>
              {loggedInUser.roles?.includes("Coach") && (
                <>
                  <RRNavLink to="/video" className="text-gray-700 hover:text-blue-600">Video Upload</RRNavLink>
                  <RRNavLink to="/pitch" className="text-gray-700 hover:text-blue-600">Tactical View</RRNavLink>
                </>
              )}
              <RRNavLink to={`/profile/${loggedInUser.id}`} className="text-gray-700 hover:text-blue-600">Profile</RRNavLink>
              <RRNavLink to="/inbox" className="text-gray-700 hover:text-blue-600">Inbox</RRNavLink>
              <button onClick={handleLogout} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Logout
              </button>
            </div>
          </>
        )}
      </div>
      {open && loggedInUser && (
        <div className="lg:hidden px-4 py-2 space-y-2 bg-white border-t shadow">
          <RRNavLink to="/home" className="block text-gray-700 hover:text-blue-600" onClick={() => setOpen(false)}>Join Team</RRNavLink>
          <RRNavLink to={`/profile/${loggedInUser.id}`} className="block text-gray-700 hover:text-blue-600" onClick={() => setOpen(false)}>Profile</RRNavLink>
          <RRNavLink to="/team" className="block text-gray-700 hover:text-blue-600" onClick={() => setOpen(false)}>Team</RRNavLink>
          {loggedInUser.roles?.includes("Coach") && (
            <>
              <RRNavLink to="/video" className="block text-gray-700 hover:text-blue-600" onClick={() => setOpen(false)}>Video Upload</RRNavLink>
              <RRNavLink to="/pitch" className="block text-gray-700 hover:text-blue-600" onClick={() => setOpen(false)}>Tactical View</RRNavLink>
            </>
          )}
          <RRNavLink to="/inbox" className="block text-gray-700 hover:text-blue-600" onClick={() => setOpen(false)}>Inbox</RRNavLink>
          <button onClick={handleLogout} className="w-full text-left px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Logout
          </button>
        </div>
      )}
    </nav>
  )
}
