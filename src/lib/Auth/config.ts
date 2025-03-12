import { CognitoUserPool } from "amazon-cognito-identity-js";


let userPool: any, currentUser: any

const UserPoolId = import.meta.env.VITE_COGNITO_USER_POOL_ID;
const ClientId =import.meta.env.VITE_COGNITO_CLIENT_ID;

console.log(UserPoolId, ClientId)

const initAuth = () =>{
    userPool = new CognitoUserPool({
        UserPoolId: UserPoolId,
        ClientId: ClientId,
    })
}

export const getUserPool =()=>{
    return userPool
}

export const getUser = () => {
    return userPool.getCurrentUser()
}


export const setCurrUserSession = (user: any) => {
    currentUser = user
}

export const getCurrUserSession = () => {
    return currentUser
}


initAuth()