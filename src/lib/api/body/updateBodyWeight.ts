import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { BodyWeightInterface } from '../../../types/bodyWeight';

/**
 * update a body Weight with @param bodyWeight for the current signed-in user.
 *
 * @param {BodyWeightInterface} bodyWeight
 * @return {Promise<any>}
 */


const updateBodyWeight = (bodyWeight: BodyWeightInterface) => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const params = { bodyWeight }
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .put(
                        `${baseUrl}/body/${id}/weight/edit/${bodyWeight.id}`,
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

export default updateBodyWeight