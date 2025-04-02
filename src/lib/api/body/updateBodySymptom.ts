import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { BodySymptomInterface } from '../../../types/bodySymptom';

/**
 * update a body Symptom with @param bodySymptom for the current signed-in user.
 *
 * @param {BodySymtpom} journey
 * @return {Promise<any>}
 */


const updateBodySymptom = (bodySymptom: BodySymptomInterface) => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const params = { bodySymptom }
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .put(
                        `${baseUrl}/body/${id}/symptom/edit/${bodySymptom.id}`,
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

export default updateBodySymptom