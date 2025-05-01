import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { SleepInterface } from '../../../types/sleep';

/**
 * get All sleeps for the current signed-in user.
 *
 * @return {Promise<any>}
 */


const getSleeps = (): Promise<SleepInterface[]> => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .get(
                        `${baseUrl}/fitness/${id}/sleeps`,
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

export default getSleeps

