import { useState } from 'react';
import { UserProfile } from '../types/user';

export const useProfile = (initialProfile: UserProfile) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({
      ...prev,
      ...updates
    }));
  };

  const saveProfile = async () => {
    try {
      // Add your API call here
      // await api.updateProfile(profile);
      return true;
    } catch (error) {
      console.error('Failed to update profile:', error);
      return false;
    }
  };

  return {
    profile,
    updateProfile,
    saveProfile
  };
};
