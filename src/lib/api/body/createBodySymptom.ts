import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { BodySymptomInterface } from '../../../types/bodySymptom';

/**
 * create a new body symptom with @param bodySymptom for the current signed-in user.
 *
 * @param {bodySymptom} bodySymptom
 * @return {Promise<any>}
 */


const createBodySymptom = (bodySymptom: BodySymptomInterface) => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const params = { bodySymptom }
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .post(
                        `${baseUrl}/body/${id}/symptom/create`,
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

export default createBodySymptom

