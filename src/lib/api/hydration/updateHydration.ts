import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { HydrationInterface } from '../../../types/recipe';

/**
 * update a hydration with @param hydration for the current signed-in user.
 *
 * @param {HydrationInterface} hydration
 * @return {Promise<any>}
 */


const updateHydration = (hydration: HydrationInterface) => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const params = { hydration }
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .put(
                        `${baseUrl}/hydration/${id}/edit/${hydration.id}`,
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

export default updateHydration