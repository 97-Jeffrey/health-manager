import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';
import { HydrationInterface } from '../../../types/recipe';

/**
 * get All created hydrations for the current signed-in user.
 *
 * @return {Promise<any>}
 */


const getHydrations = (): Promise<HydrationInterface[]> => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .get(
                        `${baseUrl}/hydration/${id}/hydrations`,
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

export default getHydrations

