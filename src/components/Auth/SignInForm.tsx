import React from 'react'
import { UserSignInCredentials } from '../../types/userSignInCredentials'

import * as COLORS from '../../constants/color'

interface SignInFormInterface{
    loading: boolean,
    credentials:  UserSignInCredentials,
    handleCredentialChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (e: React.FormEvent) => Promise<void>
    handleSignUp: ()=> void
}

const SignInForm: React.FC<SignInFormInterface> = ({
    loading,
    credentials,
    handleCredentialChange,
    handleSubmit,
    handleSignUp
}) =>{
    return (
        <>
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
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-${COLORS.ACTIONS_COLOR} hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                >
                    {loading ? 'Signing in...' : 'Sign in'}
                </button>
                </div>
           
                <div className=' flex flex-col justify-center items-center gap-1'>
                    <div>Don't Have An Account Yet ?</div>
    
                    <button className={`bg-white text-${COLORS.ACTIONS_COLOR} border-none`} onClick={handleSignUp}>Sign Up Today</button>
    
                </div>
            </form>
        </>
    )
}

export default SignInForm