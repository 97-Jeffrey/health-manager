import { useProfile } from '../hooks/useProfile';
import * as STYLES from '../constants/styles'
import Success from '../elements/banner/success';
import Info from '../elements/info/info';




const Profile = () => {


  const { 
    profile, 
    handleProfileFieldChange, 
    updateProfile,
    updateNotify,
    setUpdateNotify,
    handleUploadProfileImage
  } 
  = useProfile() 
  const { email, name, phone_number, 
    specialty, birthdate, website, address, image } = profile


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
        <Info text={`
          This section displays your account details and allows
          seamless updates. Changes are automatically saved 
          when you finish editing a field (on blur). No "Save" button needed!`
          }
        />
        
        <div className="mt-3 mb-8 flex flex-col justify-center items-center gap-2">
            {
            image ?
              <img 
                src={image} 
                alt="Profile Image" 
                className="w-[200px] h-[200px] rounded-full object-cover border border-black"
              />
                :
              <div className="font-bold w-[200px] h-[200px] rounded-full object-cover border border-black flex flex-row justify-center items-center">
                  No Profile 
              </div>
            }
            
            <input
              type="file"
              id="bootstrap-file-upload"
              onChange={handleUploadProfileImage}
              className="d-none"
            />
      
            {/* Label styled as Bootstrap button */}
            <label
              htmlFor="bootstrap-file-upload"
              className="btn btn-secondary"
            >
              {image? 'Change Profile': 'Upload Profile'}
            </label>
      
          
        </div>

        <form onSubmit={()=>{}}>
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
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
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

        </form>
      </div>
    </>
  );
};

export default Profile;
