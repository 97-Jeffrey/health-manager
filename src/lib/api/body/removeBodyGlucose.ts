import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';

/**
 * Remove a body glucose with @param bodyGlucoseId for the current signed-in user.
 *
 * @param {string} bodyGlucoseId
 * @return {Promise<any>}
 */


const removeBodyGlucose = (bodyGlucoseId: string) => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const params = { bodyGlucoseId }
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .post(
                        `${baseUrl}/body/${id}/glucose/delete`,
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

export default removeBodyGlucose
