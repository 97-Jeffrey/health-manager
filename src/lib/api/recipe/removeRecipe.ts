import axios from 'axios';
import { getAuthSession } from '../../Auth';
import { baseUrl } from '../../../config';
import { AuthSessionInterface } from '../../../types/authInterface';

/**
 * remove a new recipe with @param id for the current signed-in user.
 *
 * @param {recipeId}
 * @return {Promise<any>}
 */


const removeRecipe = (recipeId: string| undefined) => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then((session: AuthSessionInterface ) => {
                const { id, accessToken } = session;
                const params = { recipeId }
                const reqBody = {
                    headers: { Authorization: `Bearer ${accessToken}` },
                }

                axios
                    .post(
                        `${baseUrl}/recipe/${id}/delete`,
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

export default removeRecipe

