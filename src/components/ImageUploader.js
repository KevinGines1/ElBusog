import React, { useState } from 'react';
import axios from 'axios';
import { uploadImage } from '../redux';
import { useDispatch } from 'react-redux';

function ImageUploader() {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const fileUploadHandler = (event) => {
        const data = new FormData();
        data.append('file', event.target.files[0])
        data.append('upload_preset', 'elbusog')
        setLoading(true)
        axios.post("https://api.cloudinary.com/v1_1/cloudymeatballs/image/upload", data)
        .then((result) => {
            // console.log(result.data.secure_url)
            dispatch(uploadImage(result.data.secure_url))
            // the image url will be on result.data.secure_url
            setLoading(false)
        })
    }


    return (
        <div className="row">
            <div className="col-12">
                {loading
                ?   <p>Uploading file...</p>
                :   <div>
                        <label htmlFor="file-upload">
                            <div className="uploadAndLocBtn">Choose photo</div>
                        </label>
                        <input
                            style={{display: 'none'}}
                            id="file-upload"
                            type="file"
                            onChange={fileUploadHandler}
                            />
                    </div>}
            </div>
        </div>
    )
}

export default ImageUploader;