import React from "react";
import * as COLORS from '../../constants/color'

interface  SignUpVerificationInterface{
    verificationCode: string,
    loading: boolean,
    handleAddCode: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleVerification: (e: React.FormEvent) => Promise<void>
}

const SignUpVerification: React.FC<SignUpVerificationInterface> =({
    verificationCode,
    loading,
    handleAddCode,
    handleVerification

}) =>{
    return (
        <>
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
                        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${COLORS.ACTIONS_BG_COLOR} hover:bg-blue-700`}
                        onClick={handleVerification}
                    >
                        Verify
                    </button>
                </div>
            </div>
        </>
    )
}

export default SignUpVerification