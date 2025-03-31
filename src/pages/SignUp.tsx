import React, { useState } from 'react';
import { signup, confirmSignIn } from '../lib/Auth/index'
import { useNavigate, Navigate } from 'react-router-dom';
import { UserSignUpInterface } from '../types/userSignUpCredentials';

import * as ROUTES from '../constants/routes'

import SignUpForm from '../components/Auth/SignUpForm';
import SignUpVerification from '../components/Auth/SignUpVerification';

import AuthError from '../elements/error/authError';

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

  const handleSignIn =() =>{
    navigate(ROUTES.SIGN_IN)
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
      navigate(ROUTES.SIGN_IN);
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setLoading(false);
    }
  };

  if(isAuthenticated) return <Navigate replace to={ROUTES.BODY}/>

  if (showVerification) {
    return (
      <SignUpVerification 
        verificationCode={verificationCode}
        loading={loading}
        handleAddCode={handleAddCode}
        handleVerification={handleVerification}
      />
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
          <AuthError text={error}/>
        }


        <SignUpForm 
            credentials={credentials}
            loading={loading}
            handleSubmit={handleSubmit}
            handleSignUpFormChange={handleSignUpFormChange}
            handleSignIn={handleSignIn}
        />
      </div>
    </div>
  );
};

export default SignUp;
