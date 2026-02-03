import { Card } from "../ui/Card";
import { Activity } from "lucide-react";
import { UserProfileDTO } from "../../types";

interface ActivityWidgetProps {
  loggedInUser: UserProfileDTO;
}

export const ActivityWidget = ({ }: ActivityWidgetProps) => {
  return (
    <Card className="p-6 bg-white h-[500px] flex flex-col">
      <div className="mb-6 flex justify-between items-center flex-shrink-0">
        <h2 className="text-lg font-semibold text-neutral-900">Activity</h2>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 text-center">
        <div className="w-12 h-12 mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
          <Activity className="w-6 h-6 text-neutral-400" />
        </div>
        <p className="text-sm text-neutral-500">Activity feed coming soon</p>
      </div>
    </Card>
  );
};
