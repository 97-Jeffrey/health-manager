
import { CognitoUser } from 'amazon-cognito-identity-js';
import { getUserPool } from './config';


const confirmSignIn = (email: string, verificationCode: string) => {

    return new Promise((resolve, reject) => {
        const userData = {
            Username: email,
            Pool: getUserPool(),
        };
        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
            if (err) {
                reject(err)
                return;
            }else{
                resolve(result)
            }
        });

    })
   

    
};


export default confirmSignIn