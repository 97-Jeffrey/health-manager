import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js"
import { getUserPool , setCurrUserSession} from "./config"


const signin = (username: string, password: string) => {

    const authenticationData = {
        Username: username,
        Password: password,
    }

    const authenticationDetails = new AuthenticationDetails(authenticationData)

    const userData = {
        Username: username,
        Pool: getUserPool(),
    }
    const cognitoUser = new CognitoUser(userData)


    return new Promise((resolve, reject) => {
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
                setCurrUserSession(cognitoUser)
                resolve(result)
                // Record signed in practitioner information using Mixpanel
            },
            onFailure: function (err) {
                reject(err.message || JSON.stringify(err))
            },
            newPasswordRequired: function () {
                setCurrUserSession(cognitoUser)
                reject({
                    code: 'PasswordResetRequiredException',
                    message: 'New Password Required',
                    newPasswordRequired: true,
                })
            },
        })
    })

}

export default signin