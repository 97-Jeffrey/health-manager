import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { UserSignUpInterface } from '../../../types/userSignUpCredentials';

/**
 * Replace the element at @param attribute with @param value for the current signed in practitioner info.
 *
 * @param {String} attribute
 * @param {Object} value
 * @return {Promise<any>}
 */


const createUser = async (credentials: UserSignUpInterface) => {


    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;

                const params = { credentials }
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .post(
                        `${baseUrl}/user/${id}/create`,
                        params,
                        reqBody
                    )
                    .then((res) => resolve(res))
                    .catch((err) => reject(JSON.stringify(err)))
            })
            .catch((err) =>
                reject(`getAuthSession::error - ${JSON.stringify(err)}`)
            )
    })
}

export default createUser

