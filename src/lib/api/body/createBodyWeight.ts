import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { BodyWeightInterface } from '../../../types/bodyWeight';

/**
 * add a new body weight with @param bodyWeight for the current signed-in user.
 *
 * @param {bodySymptom} bodyWeight
 * @return {Promise<any>}
 */


const createBodyWeight = (bodyWeight: BodyWeightInterface) => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const params = { bodyWeight }
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .post(
                        `${baseUrl}/body/${id}/weight/create`,
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

export default createBodyWeight

