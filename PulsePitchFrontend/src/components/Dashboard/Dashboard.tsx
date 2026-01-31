import { UserProfileDTO } from "../../types";
import { UpcomingEventsWidget } from "./UpcomingEventsWidget";
import { TeamsWidget } from "./TeamsWidget";
import { MessagesWidget } from "./MessagesWidget";
import { ActivityWidget } from "./ActivityWidget";

interface DashboardProps {
  loggedInUser: UserProfileDTO;
  refreshLoggedInUser: () => Promise<void>;
}

export default function Dashboard({ loggedInUser, refreshLoggedInUser }: DashboardProps) {
  return (
    <div className="w-full max-w-7xl mx-auto p-4 space-y-6">
      <section className="w-full">
        <UpcomingEventsWidget
          loggedInUser={loggedInUser}
          refreshLoggedInUser={refreshLoggedInUser}
        />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-6">
        <div className="h-full lg:col-span-3">
          <TeamsWidget loggedInUser={loggedInUser} />
        </div>
        <div className="h-full lg:col-span-4">
          <ActivityWidget loggedInUser={loggedInUser} />
        </div>
        <div className="h-full lg:col-span-3">
          <MessagesWidget loggedInUser={loggedInUser} />
        </div>
      </section>
    </div>
  );
}
