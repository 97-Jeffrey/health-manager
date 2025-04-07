import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { BodyGlucoseInterface } from '../../../types/bodyGlucose';

/**
 * add a new body glucose with @param bodyGlucose for the current signed-in user.
 *
 * @param {BodyGlucoseInterface} bodyGlucose
 * @return {Promise<any>}
 */


const createBodyGlucose = (bodyGlucose: BodyGlucoseInterface) => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const params = { bodyGlucose }
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .post(
                        `${baseUrl}/body/${id}/glucose/create`,
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

export default createBodyGlucose

