import { useState } from 'react';
import { useProfile } from '../hooks/useProfile';

import * as COLORS from '../constants/color'
import * as STYLES from '../constants/styles'
import Success from '../elements/banner/success';


const Profile = () => {


  const { 
    profile, 
    handleProfileFieldChange, 
    updateProfile,
    updateNotify,
    setUpdateNotify
  } 
  = useProfile() 
  const { email, name, phone_number, specialty, birthdate, website, address } = profile


  const [isEditing, setIsEditing] = useState(false);
  // const [previewImage, setPreviewImage] = useState<string | undefined>('');

  // const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setPreviewImage(reader.result as string);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditing(false);
    // Add API call to update profile
  };

  return (
    <>
      {
        updateNotify
          &&
        <Success  
          text='Update Successful' 
          onClose={()=> setUpdateNotify(false)} 
        />
      }
      <div className="w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>
        
        {/* <div className="mb-8 flex justify-center">
          <div className="relative">
            <img 
              src={previewImage || '/default-avatar.png'} 
              alt="Profile" 
              className="w-32 h-32 rounded-full object-cover"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer">
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </label>
            )}
          </div>
        </div> */}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                name='email'
                // disabled={!isEditing}
                onBlur={updateProfile}
                onChange={handleProfileFieldChange}
                className={STYLES.PROFILE_INPUT}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                name='name'
                // disabled={!isEditing}
                onBlur={updateProfile}
                onChange={handleProfileFieldChange}
                className={STYLES.PROFILE_INPUT}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                value={phone_number}
                name='phone_number'
                // disabled={!isEditing}
                onBlur={updateProfile}
                onChange={handleProfileFieldChange}
                className={STYLES.PROFILE_INPUT}
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700">Birth Date</label>
              <input
                type="date"
                value={birthdate}
                name='birthdate'
                // disabled={!isEditing}
                onBlur={updateProfile}
                onChange={handleProfileFieldChange}
                className={STYLES.PROFILE_INPUT}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                value={address}
                name='address'
                rows={3}
                // disabled={!isEditing}
                onBlur={updateProfile}
                onChange={handleProfileFieldChange}
                className={STYLES.PROFILE_INPUT}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">specialty</label>
              <textarea
                value={specialty}
                name='specialty'
                // disabled={!isEditing}
                rows={3}
                onBlur={updateProfile}
                onChange={handleProfileFieldChange}
                className={STYLES.PROFILE_INPUT}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Website</label>
              <textarea
                value={website}
                name='website'
                // disabled={!isEditing}
                rows={3}
                onBlur={updateProfile}
                onChange={handleProfileFieldChange}
                className={STYLES.PROFILE_INPUT}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={
                    `px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${COLORS.ACTIONS_BG_COLOR} hover:bg-blue-700`}
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className={
                  `px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${COLORS.ACTIONS_BG_COLOR} hover:bg-blue-700`}
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
