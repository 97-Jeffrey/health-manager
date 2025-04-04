import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { BodyWeightInterface } from '../../../types/bodyWeight';

/**
 * get All body weights for the current signed-in user.
 *
 * @return {Promise<any>}
 */


const getBodyWeights = (): Promise<BodyWeightInterface[]> => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .get(
                        `${baseUrl}/body/${id}/weights`,
                        reqBody
                    )
                    .then((res) => resolve(res.data))
                    .catch((err) => reject(JSON.stringify(err)))
            })
            .catch((err) =>
                reject(`getAuthSession::error - ${JSON.stringify(err)}`)
            )
    })
}

export default getBodyWeights

