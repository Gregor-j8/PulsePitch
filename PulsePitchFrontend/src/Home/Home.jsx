import { useState } from "react"

export const Home = () => {
  const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
  const [showJoinTeamModal, setShowJoinTeamModal] = useState(false);
  return (
        <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md text-center">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Team Options</h2>
            <div className="flex flex-col space-y-4">
            <button onClick={() => setShowCreateTeamModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Create Team
            </button>
            <button onClick={() => setShowJoinTeamModal(true)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                Join Team
            </button>
            </div>
            {showCreateTeamModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="bg-white/95 rounded-xl p-8 w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Team</h2>
                    <div className="mb-5">
                    <label className="block text-gray-700 font-medium mb-1">Team Name</label>
                    <input type="text" name="teamName" placeholder="Enter your team name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1">Team Code</label>
                    <input type="text" name="teamCode" placeholder="Create a unique team code"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="flex justify-end space-x-4">
                    <button type="submit" className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
                        Create
                    </button>
                    <button type="button" onClick={() => setShowCreateTeamModal(false)}
                        className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                        Cancel
                    </button>
                    </div>
                </div>
            </div>
            )}  
            {showJoinTeamModal && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
                <div className="bg-white/95 rounded-xl p-8 w-full max-w-md shadow-2xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Join Team</h2>
                    <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-1">Team Code</label>
                    <input type="text" name="teamCode" placeholder="Enter team code"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                    <label className="block text-gray-700 font-medium mb-1">Team Name</label>
                    <input type="text" name="teamName" placeholder="Enter your team name"
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    </div>
                    <div className="flex justify-end space-x-4">
                    <button type="submit" className="px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition">
                        Join
                    </button>
                    <button type="button" onClick={() => setShowJoinTeamModal(false)}
                        className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition">
                        Cancel
                    </button>
                    </div>
                </div>
            </div>
            )}
        </div>
    </div>
)}
