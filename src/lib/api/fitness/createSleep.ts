import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { SleepInterface } from '../../../types/sleep';

/**
 * create a new sleep with @param sleep for the current signed-in user.
 *
 * @param {SleepInterface} sleep
 * @return {Promise<any>}
 */


const createSleep= (sleep: SleepInterface) => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const params = { sleep }
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .post(
                        `${baseUrl}/fitness/${id}/sleep/create`,
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

export default createSleep

