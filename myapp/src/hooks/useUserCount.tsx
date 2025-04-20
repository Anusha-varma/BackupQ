import { useState } from 'react';

export const useUserCount = () => {
  const [userCount, setUserCount] = useState(0);

  const increment = () => setUserCount(prev => prev + 1);
  const decrement = () => setUserCount(prev => (prev > 0 ? prev - 1 : 0));
  const spike = () => setUserCount(prev => prev + 10);
  const drop = () => setUserCount(prev => (prev >= 10 ? prev - 10 : 0));

  return {
    userCount,
    increment,
    decrement,
    spike,
    drop
  };
};
