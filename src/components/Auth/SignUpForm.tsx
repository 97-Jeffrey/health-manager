import React from 'react'
import { UserSignUpInterface } from '../../types/userSignUpCredentials'
import * as COLORS from '../../constants/color'

interface SigUpFormInterface{
    credentials: UserSignUpInterface,
    loading: boolean,
    handleSubmit: (e: React.FormEvent) => Promise<void>
    handleSignUpFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSignIn: ()=> void

}

const SignUpForm: React.FC<SigUpFormInterface>  = ({
    credentials, 
    loading,
    handleSubmit,
    handleSignUpFormChange,
    handleSignIn
    
}) =>{
    return (

        <>
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
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${COLORS.ACTIONS_BG_COLOR} hover:bg-blue-700`}
                >
                {loading ? 'Creating account...' : 'Create account'}
                </button>
    
                <div className=' flex flex-col justify-center items-center gap-1'>
                    <div>Already Have An Account Yet</div>
    
                    <button 
                    className={`bg-white ${COLORS.ACTIONS_TEXT_COLOR} border-none`} 
                    onClick={handleSignIn}
                    >
                        Login
                    </button>
    
                </div>
            </form>
        
        </>
    )
}

export default SignUpForm