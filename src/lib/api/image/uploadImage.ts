import axios from 'axios'
import Compressor from 'compressorjs'
import { getAuthSession } from '../../Auth/index'
import { baseUrl } from '../../../config'


/**
 * Compress and upload an image to S3 bucket.
 * Ref: https://github.com/fengyuanchen/compressorjs/blob/master/README.md
 *
 * @param {String} imageType One of 'profile-image', 'clinic-logo'
 * @param {File} file Image file
 * @return {Promise<any>}
 */
const uploadImage = (imageType: string, file: File) => {
    return new Promise((resolve, reject) => {
        getAuthSession()
            .then(({ id, accessToken }) => {
                new Compressor(file, {
                    quality: 0.6,
                    success(result) {
                        // Check if 'result' is of type Blob, if yes, convert Blob to File type
                        let compFile = result
                        if (!(result instanceof File))
                            compFile = new File([result], file.name, {
                                type: file.type,
                            })

                        const formData = new FormData()
                        formData.append(imageType, compFile)
                        const reqBody = {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                                Accept: 'application/json',
                                'Accept-Language': 'en-US,en;q=0.8',
                            },
                        }
                        axios
                            .post(
                                `${baseUrl}/images/${id}/${imageType}`,
                                formData,
                                reqBody
                            )
                            .then((res) => resolve(res))
                            .catch((err) => reject((err)))
                    },
                    error(err) {
                        reject(
                            `uploadImage::compressor::error - ${JSON.stringify(
                                err.message
                            )}`
                        )
                    },
                })
            })
            .catch((err) =>
                reject(`getAuthSession::error - ${JSON.stringify(err)}`)
            )
    })
}

export default uploadImage
