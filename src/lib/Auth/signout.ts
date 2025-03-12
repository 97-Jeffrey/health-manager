import { getUser } from "./config";


/**
 * Signout current login practitioner
 * Amazon Cognito bug: - the access token remains in local session storage even user has signed out
 *                     - AWS only stops providing refresh token to refresh the access token
 */


const signout = () =>{
    
    const cognitoUser = getUser()

    if(cognitoUser){
        cognitoUser.signOut()
        Promise.resolve()
    }else{
        throw new Error('no cognitiveUser value')
    }

}

export default signout