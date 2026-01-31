import { useState } from 'react'
import { Messages } from './Messages'
import { MatchRequest } from './MatchRequest'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { UserProfileDTO } from '../../types'

interface InboxProps {
  loggedInUser: UserProfileDTO;
}

export const Inbox = ({ loggedInUser }: InboxProps) => {
  const [activeTab, setActiveTab] = useState<'messages' | 'notifications'>('messages')
  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-4xl overflow-hidden">
        <div className="border-b px-6 py-4 bg-gradient-to-r from-primary-50 to-primary-100">
          <div className="flex space-x-4">
            <Button
              onClick={() => setActiveTab('messages')}
              variant={activeTab === 'messages' ? 'primary' : 'ghost'}
              className="flex-1"
            >
              Messages
            </Button>
            <Button
              onClick={() => setActiveTab('notifications')}
              variant={activeTab === 'notifications' ? 'primary' : 'ghost'}
              className="flex-1"
            >
              Match Request
            </Button>
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
      </Card>
    </div>
  )
}