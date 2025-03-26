import { useState, useEffect } from 'react';
import { UserInterface } from '../types/userInterface';
import getUser from '../lib/api/user/getUser';
import updateUser from '../lib/api/user/updateUser';
import uploadImage from '../lib/api/image/uploadImage';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserInterface>({
    name: "",
    email:"",
    address:"",
    birthdate: "",
    phone_number: "",
    specialty: "",
    website:"",
    userId: "",
    image:""
  });
  const [updateNotify, setUpdateNotify] = useState(false)
  const [trigger, setTrigger] = useState(false)


  const handleFetchData =() => {
    setTrigger(prev=> !prev)
  }

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

  const handleUploadProfileImage  = async (e:React.ChangeEvent<HTMLInputElement>) =>{
    const files = e.target.files;
    if (!files || files.length<1) return;

    const imageType = 'profile-photo';
    const file: File = files[0];

    console.log('file', file)

    const res = await uploadImage(imageType, file)
    console.log(res)
    handleFetchData()



  }


  useEffect(()=>{
    const getProfile = async () =>{
        const res: any = await getUser()
        const profile = res?.data;
        setProfile(profile)
        
    }
   getProfile()
  },[trigger])

  return {
    profile,
    updateProfile,
    handleProfileFieldChange,
    handleUploadProfileImage,
    updateNotify,
    setUpdateNotify
  };
};
