import axios from 'axios'
import { getAuthSession } from '../../Auth/index'
import { baseUrl } from '../../../config'
import { AuthSessionInterface } from '../../../types/authInterface'
import { ImageInfo } from '../../../types/imageType'


/**
 * Compress and upload an image to S3 bucket.
 * Ref: https://github.com/fengyuanchen/compressorjs/blob/master/README.md
 *
 * @param {String} imageType One of 'profile-image', 'clinic-logo'
 * @param {File} file Image file
 * @return {Promise<any>}
 */
const uploadImage = (imageType: string, file: File) :Promise<ImageInfo> => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then(async (session: AuthSessionInterface ) => {

                const formData = new FormData();
                formData.append('file', file);
                formData.append('imageType', imageType);

                const { id, accessToken } = session;

                const response = await axios.post(`${baseUrl}/images/${id}/${imageType}`, formData, {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${accessToken}`
                    },
                  });

                console.log(response)
                resolve(response.data);
         
            })
            .catch((err) =>
                reject(`getAuthSession::error - ${JSON.stringify(err)}`)
            )
    })
}

export default uploadImage
