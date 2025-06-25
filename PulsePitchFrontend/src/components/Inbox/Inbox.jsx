import { useState } from 'react'
import { Messages } from './Messages'
import { MatchRequest } from './MatchRequest'

export const Inbox = ({ loggedInUser }) => {
  const [activeTab, setActiveTab] = useState('messages')
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="border-b px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="flex space-x-4">
            <button onClick={() => setActiveTab('messages')}
              className={`flex-1 text-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                activeTab === 'messages' ? 'bg-blue-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200 border'}`}>
              Messages
            </button>
            <button onClick={() => setActiveTab('notifications')}
              className={`flex-1 text-center px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                activeTab === 'notifications' ? 'bg-blue-600 text-white shadow' : 'bg-white text-gray-700 hover:bg-gray-200 border'}`}>
              Match Request
            </button>
          </div>
        </div>
        <div className="h-[500px] overflow-y-auto">
          {activeTab === 'messages' && (
            <Messages loggedInUser={loggedInUser} />
          )}
          {activeTab === 'notifications' && (
            <MatchRequest loggedInUser={loggedInUser}/>
          )}
        </div>
      </div>
    </div>
  )
}