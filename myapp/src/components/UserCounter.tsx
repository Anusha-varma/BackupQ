import { Users } from 'lucide-react';
import { useUserCount } from '../hooks/useUserCount';

const UserCounter = () => {
  const {userCount} = useUserCount();

  return (
    <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow">
      <Users className="h-5 w-5 text-blue-500" />
      <span className="font-medium">{userCount}</span>
      <span className="text-gray-600">active users</span>
    </div>
  );
};

export default UserCounter;