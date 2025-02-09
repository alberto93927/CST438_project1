import { useState, useEffect } from 'react';
import { getProfile } from '@/db/profile';

const useProfile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
  }, []);

  return { profile };
};

export default useProfile;
