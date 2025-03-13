import React from 'react';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import signin from '../lib/Auth/signin';
import { UserSignInCredentials } from '../types/userSignInCredentials';

import { DASHBOARD } from '../constants/routes';
import * as ROUTES from '../constants/routes'

import SignInForm from '../components/Auth/SignInForm';
import AuthError from '../elements/error/authError';


interface signinProps {
  isAuthenticated: boolean,
  handleAuthentication: ()=> void
}

const SignIn: React.FC <signinProps> = ({ isAuthenticated, handleAuthentication }) => {
  


  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError]= useState<string>('')
  const navigate = useNavigate()

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

  const handleSignUp = () =>{
    navigate(ROUTES.SIGN_UP)
  }

  if(isAuthenticated) return <Navigate replace to={DASHBOARD} />

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
            <AuthError text={error}/>
          }

        </div>
        <SignInForm 
          loading={loading}
          credentials={credentials}
          handleCredentialChange={handleCredentialChange}
          handleSubmit={handleSubmit}
          handleSignUp={handleSignUp}
        />
        
      </div>
    </div>
  );
};

export default SignIn;
