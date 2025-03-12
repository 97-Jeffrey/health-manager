import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
import { getUserPool } from './config'
import { UserSignUpInterface } from '../../types/userSignUpCredentials'

/**
 * Sign up practitioner in Cognito User Pool with @param credentials
 * @param {Object} credentials - Practitioner signup credentials
 *                             - Keys:
 *                                  email,
 *                                  firstName,
 *                                  lastName,
 *                                  clinicName,
 *                                  specialty,
 *                                  promoCode
 * @return {Promise}
 */


const signup = (credentials: UserSignUpInterface)  => {
    const userPool = getUserPool()

    const attributeList = [
        new CognitoUserAttribute({
            Name: 'name',
            Value: credentials.name,
        }),
        new CognitoUserAttribute({
            Name: 'email',
            Value: credentials.email,
        }),
        new CognitoUserAttribute({
            Name: 'address',
            Value: credentials.address, // This must be kept as 'address' is set as required field in Cognito User Pool
        }),
        new CognitoUserAttribute({
            Name:'birthdate',
            Value: credentials.birthdate,
        }),
        new CognitoUserAttribute({
            Name: 'phone_number',
            Value: credentials.phone_number,
        }),
        new CognitoUserAttribute({
            Name: 'custom:specialty',
            Value: credentials.specialty,
        }),
        new CognitoUserAttribute({
            Name:'custom:website',
            Value: credentials.website,
        }),


    ]

    
    console.log('------credentials--------')
    console.log(credentials)

    return new Promise((resolve, reject) => {
        userPool.signUp(
            credentials.email,
            credentials.password,
            attributeList,
            null,
            (err:any, result:any) => {
                if (err) {
                    console.log(err)
                    reject(err.message || JSON.stringify(err))
                } else {
                    console.log('ACCOUNT CREATED')
                    console.log(result)
                    resolve(result)
                }
            }
        )
    })
}

export default signup
