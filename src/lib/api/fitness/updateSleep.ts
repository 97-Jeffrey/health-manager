import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { SleepInterface } from '../../../types/sleep';

/**
 * update a sleep with @param sleep for the current signed-in user.
 *
 * @param {SleepInterface} sleep
 * @return {Promise<any>}
 */


const updateSleep = (sleep: SleepInterface) => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const params = { sleep }
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .put(
                        `${baseUrl}/fitness/${id}/sleep/edit/${sleep.id}`,
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

export default updateSleep