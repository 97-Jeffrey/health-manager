import { useState, useEffect } from 'react';
import { UserInterface } from '../types/userInterface';
import getUser from '../lib/api/user/getUser';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserInterface>({
    name: "",
    email:"",
    address:"",
    birthdate: "",
    phone_number: "",
    specialty: "",
    website:"",
    userId: ""
  });

  const handleProfileFieldChange  = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
      const {name, value} = e.target;
      setProfile(prev=>({...prev, [name]: value}))

  }

  const updateProfile = (updates: Partial<UserInterface>) => {
    setProfile(prev => ({
      ...prev,
      ...updates
    }));
  };


  useEffect(()=>{
    const getProfile = async () =>{
        const res: any = await getUser()
        const profile = res?.data;
        setProfile(profile)
        
    }
   getProfile()
  },[])

  return {
    profile,
    updateProfile,
    handleProfileFieldChange
  };
};
