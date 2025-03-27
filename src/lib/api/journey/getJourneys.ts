import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { JourneyInterface } from '../../../types/journey';

/**
 * get All journeys for the current signed-in user.
 *
 * @return {Promise<any>}
 */


const getJourneys = (): Promise<JourneyInterface[]> => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .get(
                        `${baseUrl}/journey/${id}`,
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

export default getJourneys

