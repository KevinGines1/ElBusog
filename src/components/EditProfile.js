import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    editProfile,
    checkUsername,
    checkEmail,
    saveChanges,
    cancelChanges
} from '../redux';
// import ImageUploader from 'react-images-upload';
import defaultPic from '../ElbusogCSS/user.png';

// Add loading sa delay ng pag-save ng changes
// delete code for invalidName, invalidUsername, invalidEmail if maxLength is ok

function EditProfile() {
    const profile = useSelector(state => state.profile)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        UserID: profile.User_id,
        Name: profile.Name,
        Username: profile.Username,
        Email: profile.Email,
        Password: "",
        Picture: profile.Picture,
        User_type: profile.User_type,
        blankField: false,
        passwordsMatch: true,
        confirmPassword: "",
        invalidAccType: false,
        deletingAccount: false 
    })

    // npm install compression
    // var express = require('express')
    // var bodyParser = require('body-parser')

    // var app = express()
    // app.use(bodyParser.json({limit: "10mb"}))
    // app.use(bodyParser.urlencoded({extended: true, limit: "10mb"}))

    // VALIDATION: checks if input in each field is valid

    // CHECKS IF USERNAME IS AVAILABLE
    useEffect(() => {
        if (profile.Username !== state.Username) {
            dispatch(checkUsername(state.Username))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.Username])

    // CHECKS IF EMAIL IS AVAILABLE
    useEffect(() => {
        if (profile.Email !== state.Email) {
            dispatch(checkEmail(state.Email))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.Email])

    //  CHECKS IF A BUSINESS OWNER HAS BUSINESSES
    useEffect(() => {
        if(state.User_type === "Customer" && profile.ownedFoodPlaces.length !== 0){
            setState(state => ({...state, invalidAccType: true}))
        } else if (state.invalidAccType === true){
            setState(state => ({...state, invalidAccType: false}))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.User_type])

    // CHECKS FOR BLANK FIELDS
    useEffect(() => {
        if (
            state.Name !== "" &&
            state.Username !== "" &&
            state.Email !== "" &&
            state.Picture !== ""
        ) {
            setState({ ...state, blankField: false })
        } else {
            setState({ ...state, blankField: true })
        }
        if (state.Password !== state.confirmPassword) {
            setState({ ...state, passwordsMatch: false })
        } else if (state.passwordsMatch === false) {
            setState({ ...state, passwordsMatch: true })
        }

        // enables save button if there are no blank fields and input lengths are valid 
        // if (
        //     state.Name !== "" &&
        //     state.Username !== "" &&
        //     state.Email !== "" &&
        //     state.Picture !== "" &&
        //     state.passwordsMatch
        // ) {
        //     if (profile.disabledSaveBtn === true) {
        //         dispatch(enableSave())
        //     }
        // } else {
        //     dispatch(disableSave())
        // }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        state.Name,
        state.Username,
        state.Email,
        state.Password,
        state.confirmPassword,
        state.passwordsMatch,
        state.blankField
    ])

    const handleInputChange = (event) => {
        const { target } = event;
        setState({ ...state, [target.name]: target.value })
    };

    const handlePictureChange = (event) => {
        let files = event.target.files
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (event) => {
            const image={file: event.target.result}
            console.log(image, image.file)
            setState({ ...state, Picture: image.file })
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (
            state.Name !== "" &&
            state.Username !== "" &&
            state.Email !== "" &&
            state.Picture !== "" &&
            state.passwordsMatch &&
            profile.usernameAvailable &&
            profile.emailAvailable &&
            !state.invalidAccType
        ) {
            dispatch(saveChanges(
                state.UserID,
                profile.Username,
                state.Name,
                state.Username,
                state.Email,
                state.Password,
                state.Picture,
                state.User_type
            ))
            dispatch(editProfile())
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        dispatch(editProfile())
        dispatch(cancelChanges())
    }

    const deleteAccount = () => {
        setState(state => ({...state, deletingAccount: true}))
        console.log("Deleting account")
    }

    return (
        <div className="editProfileContainer col-4 tile margin-lr-10 margin-tb-10 profileTiles">
            <form onSubmit={handleFormSubmit}>
                <h3>Edit Profile</h3>
                <div className="myProfilePic">
                    <img
                        src={state.Picture ? state.Picture : defaultPic}
                        alt="Profile"
                    />
                </div>
                {/* <ImageUploader
                    buttonText="Upload image"
                    buttonStyles={{margin: "0"}}
                    onChange={handlePictureChange}
                    imgExtension={['.jpg', '.png']}
                    accept="image/*"
                    withPreview={true}
                    singleImage={true}
                    label=""
                    fileContainerStyle={{backgroundColor: "transparent", boxShadow: "none", padding: "0", margin:"0"}}
                    withIcon={false}
                /> */}
                <input
                    onChange={handlePictureChange}
                    type="file"
                    className="uploadImage"
                    accept="image/*"
                    name="Picture"
                    id="file"
                    style={{ display: "none" }} />
                <p><label htmlFor="file" className="uploadImageBtn">Upload Image</label></p>
                <div className="editDetail">
                    <p>Name</p>
                    <input
                        onChange={handleInputChange}
                        className="editName"
                        type="text"
                        name="Name"
                        maxLength="30"
                        defaultValue={profile.Name}
                    />
                </div>
                <div className="editDetail">
                    <p>Account Type</p>
                    <select
                        onChange={handleInputChange}
                        className="userTypeOptions"
                        name="User_type"
                        defaultValue={profile.User_type}
                    >
                        <option value="Customer">Customer</option>
                        <option value="Business_owner">Business Owner</option>
                    </select>
                    <div className={state.invalidAccType ? "show" : "hide"}>
                        Please delete your businesses first before switching to a Customer account.
                    </div>
                </div>
                <div className="editDetail">
                    <p>Username</p>
                    <input
                        onChange={handleInputChange}
                        className="editInput"
                        type="text"
                        name="Username"
                        maxLength="15"
                        defaultValue={profile.Username}
                    />
                    <div className={profile.usernameAvailable ? "hide" : "show"}>
                        Username is already taken
                    </div>
                </div>
                <div className="editDetail">
                    <p>Email</p>
                    <input
                        onChange={handleInputChange}
                        className="editInput"
                        type="text"
                        name="Email"
                        maxLength="25"
                        defaultValue={profile.Email}
                    />
                    <div className={profile.emailAvailable ? "hide" : "show"}>
                        Email is already taken
                    </div>
                </div>
                <div className="changePassword">
                    {/* <p>Password</p>
                    <input
                        onChange={handleInputChange}
                        className="editInput"
                        type="password"
                        name="oldPassword"
                    />
                    <div className={state.incorrectPassword ? "show" : "hide"}>
                        Incorrect Password
                    </div> */}
                    <p>New Password</p>
                    <input
                        onChange={handleInputChange}
                        className="editInput"
                        type="password"
                        name="Password"
                    />
                    <p>Confirm Password</p>
                    <input
                        onChange={handleInputChange}
                        className="editInput"
                        type="password"
                        name="confirmPassword"
                    />
                    <div className={state.passwordsMatch ? "hide" : "show"}>
                        Passwords do not match
                    </div>
                </div>
                <div className={state.blankField ? "show" : "hide"}>
                    Please do not leave any field blank.
                </div>
                <div>
                    <button
                        className="deleteAccBtn"
                        type="button"
                        onClick={deleteAccount}
                    >Delete Account</button>
                </div>
                <div>
                    <button
                        className="profileBtn margin-lr-10"
                        type="submit"
                    >Save Changes</button>
                    <button
                        type="button"
                        className="profileBtn margin-lr-10"
                        onClick={handleCancel}
                    >Cancel</button>
                </div>
            </form>

        </div>
    );
}

export default EditProfile;