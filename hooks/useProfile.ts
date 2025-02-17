import { useState, useEffect } from 'react';
import { getProfile } from '@/db/profile';
import { useSession } from './ctx';

const useProfile = () => {
  const { session } = useSession();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (session) {
      getProfile(session).then((res) => {
        // console.log(res)
        if (res) {
          setProfile(res)
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  }, []);

  return { profile };
};

export default useProfile;
