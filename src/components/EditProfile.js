import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    editProfile,
    disableSave,
    enableSave,
    checkUsername,
    checkEmail,
    saveChanges,
    cancelChanges
} from '../redux';
import defaultPic from '../ElbusogCSS/user.png';
import './EditProfile.css';

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
        // invalidName: false,
        // invalidUsername: false,
        // invalidEmail: false,
        passwordsMatch: true,
        confirmPassword: ""
    })

    // VALIDATION: checks if input in each field is valid
    // MAY SLIGHT ERROR; KAPAG NAG-SET NG BLANK FIELD TO FALSE, PAMINSAN DI SIYA NAG-SESETSTATE
    useEffect(() => {
        
        // checks if username is available
        if (profile.Username !== state.Username) {
            dispatch(checkUsername(state.Username))
        }

        if (profile.Email !== state.Email) {
            dispatch(checkEmail(state.Email))
        }

        // checks for blank fields
        if (
            state.Name !== "" &&
            state.Username !== "" &&
            state.Email !== "" &&
            state.Picture !== ""
        ) {
            setState({ ...state, blankField: false })
        } else {
            setState({ ...state, blankField: true })
            dispatch(disableSave())
        }

        // // check if name is too long
        // if (state.Name.length > 30) {
        //     setState({ ...state, invalidName: true})
        // } else if (state.invalidName === true) {
        //     setState({ ...state, invalidName: false})
        // }

        // // check if username is too long
        // if (state.Username.length > 15) {
        //     setState({ ...state, invalidUsername: true})
        // } else if (state.invalidUsername === true) {
        //     setState({ ...state, invalidUsername: false})
        // }

        // // check if email is too long
        // if (state.Email.length > 25) {
        //     setState({ ...state, invalidEmail: true})
        // } else if (state.invalidEmail === true) {
        //     setState({ ...state, invalidEmail: false})
        // }

        if (state.Password !== state.confirmPassword) {
            setState({ ...state, passwordsMatch: false })
        } else if (state.passwordsMatch === false) {
            setState({ ...state, passwordsMatch: true })
        }

        // enables save button if there are no blank fields and input lengths are valid 
        if (
            state.Name !== "" &&
            state.Username !== "" &&
            state.Email !== "" &&
            state.Picture !== "" &&
            // !state.invalidName &&
            // !state.invalidUsername &&
            // !state.invalidEmail &&
            state.passwordsMatch
        ) {
            if (profile.disabledSaveBtn === true) {
                dispatch(enableSave())
            }
        } else {
            dispatch(disableSave())
        }

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
        setState({ ...state, Picture: URL.createObjectURL(event.target.files[0]) })
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
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

    const handleCancel = (event) => {
        event.preventDefault();
        dispatch(editProfile())
        dispatch(cancelChanges())
    }

    return (
        <div className="editProfileContainer col-4 tile margin-lr-10 margin-tb-10 profileTiles">
            <form onSubmit={handleFormSubmit}>
                <h3>Edit Profile</h3>
                <div className="profilePicContainer">
                    <img
                        src={state.Picture ? state.Picture : defaultPic}
                        alt="Profile"
                        className="profilePic" />
                </div>
                <input
                    onChange={handlePictureChange}
                    type="file"
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
                    {/* <div className={state.invalidName ? "show" : "hide"}>
                        Name must be less than 31 characters.
                    </div> */}
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
                    {/* <div className={state.invalidUsername ? "show" : "hide"}>
                        Username must be less than 16 characters.
                    </div> */}
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
                    {/* <div className={state.invalidEmail ? "show" : "hide"}>
                        Email must be less than 26 characters.
                    </div> */}
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
                        className="editProfileBtn margin-lr-10"
                        type="submit"
                        disabled={
                            profile.disabledSaveBtn ||
                            !profile.usernameAvailable ||
                            !profile.emailAvailable
                        }
                    >Save Changes</button>
                    <button
                        type="button"
                        className="editProfileBtn margin-lr-10"
                        onClick={handleCancel}
                    >Cancel</button>
                </div>
            </form>

        </div>
    );
}

export default EditProfile;