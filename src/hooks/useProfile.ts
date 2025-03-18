import { useState, useEffect } from 'react';
import { UserInterface } from '../types/userInterface';
import getUser from '../lib/api/user/getUser';
import updateUser from '../lib/api/user/updateUser';

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
   const [updateNotify, setUpdateNotify] = useState(false)

  const handleProfileFieldChange  = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
      setUpdateNotify(false)
      const { name, value } = e.target;
      setProfile(prev=>({...prev, [name]: value}))

  }

  const updateProfile = async (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    try{
      const res = await updateUser(name, value)
      console.log('update', res)
      setUpdateNotify(true)

    }
    catch(err){
      console.log('err', err)
    }

    
   
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
    handleProfileFieldChange,
    updateNotify,
    setUpdateNotify
  };
};
