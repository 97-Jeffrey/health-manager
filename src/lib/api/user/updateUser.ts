import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';

/**
 * Replace the element at @param attribute with @param value for the current signed in practitioner info.
 *
 * @param {String} attribute
 * @param {Object} value
 * @return {Promise<any>}
 */




const updatePractitioner = (attribute: string, value: string) => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const params = { attribute, value }
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .put(
                        `${baseUrl}/practitioner/${id}/update`,
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

export default updatePractitioner

