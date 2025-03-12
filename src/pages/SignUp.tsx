import React, { useState } from 'react';
import { signup, confirmSignIn } from '../lib/Auth/index'
import { useNavigate, Navigate } from 'react-router-dom';
import { UserSignUpInterface } from '../types/userSignUpCredentials';

interface SignUpProps{
  isAuthenticated:boolean
}

const SignUp: React.FC<SignUpProps> = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  
  const [credentials, setCredentials]  =useState<UserSignUpInterface>({
    name:'',
    email:'',
    password:'',
    confirmPassword:'',
    address:'',
    birthdate: '',
    phone_number:'',
    specialty: '',
    website:''
  })


  const [loading, setLoading] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>('');
  const [showVerification, setShowVerification] = useState<boolean>(false);
  const [error, setError] = useState<string>('')

  const  handleSignUpFormChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setError('')
    const { name, value } = e.target;
    setCredentials(prev=> ({...prev, [name]: value}))

  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      setError("Passwords don't match")
      return;
    }

    setLoading(true);

    try {
      const res = await signup(credentials)
      console.log('res', res)
      setShowVerification(true)

      
    } 
    catch (error) {
      console.error('SignUp error:', error);
      setError(error as string)

    } finally {
      setLoading(false);
    }
  };


  const handleAddCode = (e: React.ChangeEvent<HTMLInputElement>)=>{
      const { value } = e.target;
      setVerificationCode(value)
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await confirmSignIn(credentials.email, verificationCode)
      navigate('/signin');
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  if(isAuthenticated) return <Navigate replace to='/dashboard'/>

  if (showVerification) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Verify your email
            </h2>

            <div className=''>
              Thank you for signing up. We&apos;re excited to get started in supporting your scale.
            </div>

            <div  className=''>
              We have sent you verifcation code. 
              <p>Please check your email to verify your account</p>
            </div>

            <div className='w-full'>
                <label htmlFor="verificationCode" className="w-full block text-sm font-medium text-gray-700">
                    Verification Code
                </label>
                <input
                  id="verificationCode"
                  type="verificationCode"
                  required
                  name='verificationCode'
                  value={verificationCode}
                  onChange={handleAddCode}
                  placeholder='verification Code'
                  className=" mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              onClick={handleVerification}
            >
              Verify
            </button>
        </div>
      </div>
    );
  }



  return (
    <div className=" w-screen min-h-screen flex items-center justify-center bg-gray-50 ">
      <div className="mt-5 w-1/2 space-y-8 p-8 bg-white rounded-lg shadow">

        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        {
          error 
          &&
          <div className='bg-red-200 rounded-lg text-center p-3 font-bold'>{error}</div>
        }


        <form className="space-y-6" onSubmit={handleSubmit}>
          
          <div className="rounded-md shadow-sm space-y-4">
            <div className='flex flex-row gap-10 w-full'>
              <div className='w-full'>
                <label htmlFor="name" className="w-full block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  id="name"
                  type="name"
                  required
                  name='name'
                  value={credentials.name}
                  onChange={handleSignUpFormChange}
                  placeholder='Name'
                  className=" mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className='w-full'>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  name='email'
                  value={credentials.email}
                  onChange={handleSignUpFormChange}
                  placeholder='email'
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className='flex flex-row gap-10 w-full'>
              <div className='w-full'>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  name='password'
                  value={credentials.password}
                  placeholder='password'
                  onChange={handleSignUpFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className='w-full'>
                <label 
                  htmlFor="confirmPassword" 
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  name='confirmPassword'
                  value={credentials.confirmPassword}
                  placeholder='Confirm Password'
                  onChange={handleSignUpFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          <div className='flex flex-row gap-10 w-full'>

            <div  className='w-full'>
              <label 
                htmlFor="address" 
                className="block text-sm font-medium text-gray-700"
              >
                  Address
              </label>
                <input
                  id="address"
                  type="address"
                  required
                  name='address'
                  value={credentials.address}
                  placeholder='Address'
                  onChange={handleSignUpFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <div  className='w-full'>
              <label 
                htmlFor="birthdate" 
                className="block text-sm font-medium text-gray-700"
              >
                  Birth Date
              </label>
                <input
                  id="birthdate"
                  type="birthdate"
                  required
                  name='birthdate'
                  value={credentials.birthdate}
                  placeholder='Birth date'
                  onChange={handleSignUpFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
          </div>

          <div className='flex flex-row gap-10 w-full'>

            <div  className='w-full'>
              <label 
                htmlFor="phone_number" 
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
                <input
                  id="phone_number"
                  type="phone_number"
                  required
                  name='phone_number'
                  value={credentials.phone_number}
                  placeholder='Phone Number'
                  onChange={handleSignUpFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <div  className='w-full'>
              <label 
                htmlFor="specialty" 
                className="block text-sm font-medium text-gray-700"
              >
                specialty
              </label>
                <input
                  id="=specialty"
                  type="specialty"
                  required
                  name='specialty'
                  value={credentials.specialty}
                  placeholder='speciality'
                  onChange={handleSignUpFormChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>
          </div>

          

          <div>
            <label 
              htmlFor="website" 
              className="block text-sm font-medium text-gray-700"
            >
              Website
            </label>
              <input
                id="=website"
                type="website"
                required
                name='website'
                value={credentials.website}
                placeholder='website'
                onChange={handleSignUpFormChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
