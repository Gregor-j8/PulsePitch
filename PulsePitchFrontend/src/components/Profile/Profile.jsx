import { useParams } from "react-router-dom"
import { useUserProile } from "../../hooks/useUserProfile"

export const Profile = () => {
    const {id} = useParams()
    const {data: userProfile} = useUserProile(id)
    
  return (
    <div className="flex flex-col items-center justify-center h-full pt-40">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4 w-1/2">
            <h2 className="text-xl font-bold mb-2">{userProfile?.firstName} {userProfile?.lastName}</h2>
        </div>
    </div>
  );
}