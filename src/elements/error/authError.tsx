import React from "react"

interface AuthErrorInterface{
   text: string
}

const AuthError: React.FC<AuthErrorInterface> = ({ text }) =>{
    return (
        <>
           <div className='bg-red-200 rounded-lg text-center p-3 font-bold'>{text}</div>
        </>
    )
}

export default AuthError