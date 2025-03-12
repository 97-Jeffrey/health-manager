import React from 'react';
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

import signin from '../lib/Auth/signin';
import { UserSignInCredentials } from '../types/userSignInCredentials';


interface signinProps {
  isAuthenticated: boolean,
  handleAuthentication: ()=> void
}

const SignIn: React.FC <signinProps> = ({ isAuthenticated, handleAuthentication }) => {
  


  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError]= useState<string>('')

  const [credentials, setCredentials] = useState<UserSignInCredentials>({
    email: '',
    password:''
  })

  const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} = e.target;
    setCredentials(prev=> ({...prev, [name]: value}))
  }
 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)


    try{
      await signin(credentials.email, credentials.password)
      handleAuthentication()

    }catch(err){
       setError(err as string)
    }


  
  };

  if(isAuthenticated) return <Navigate replace to='/dashboard'/>

  return (
    <div className=" w-screen min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-xl space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>

          {
            error 
              &&
            <div className='bg-red-200 rounded-lg text-center p-3 font-bold'>{error}</div>
          }

        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={credentials.email}
                placeholder='Email'
                onChange={handleCredentialChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                placeholder='Password'
                onChange={handleCredentialChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
