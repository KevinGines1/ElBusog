import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    editProfile,
    checkUsername,
    checkEmail,
    checkPassword,
    saveChanges,
    cancelChanges,
    deleteAccount
} from '../redux';
import defaultPic from '../assets/user.png';
import ImageUploader from './ImageUploader';

function EditProfile() {
    const profile = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        Name: profile.Name,
        Username: profile.Username,
        Email: profile.Email,
        newPassword: "",
        Picture: profile.Picture,
        User_type: profile.User_type,
        blankField: false,
        passwordsMatch: true,
        confirmPassword: "",
        invalidAccType: false,
        deletingAccount: false,
        Password: "",
        saveTouched: false,
        passwordTouched: false
    })

    // VALIDATION: checks if input in each field is valid

    // CHECKS IF USERNAME IS AVAILABLE
    useEffect(() => {
        if (profile.Username.toUpperCase() !== state.Username.toUpperCase()) {
            dispatch(checkUsername(state.Username))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.Username])

    // CHECKS IF EMAIL IS AVAILABLE
    useEffect(() => {
        if (profile.Email.toUpperCase() !== state.Email.toUpperCase()) {
            dispatch(checkEmail(state.Email))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.Email])

    // CHECKS IF PASSWORD IS CORRECT
    useEffect(() => {
        dispatch(checkPassword(state.Password, profile.User_id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.Password])

    useEffect(() => {
        if (!state.passwordTouched) {
            setState(state => ({ ...state, passwordTouched: true }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.Password])

    //  CHECKS IF A BUSINESS OWNER HAS BUSINESSES
    useEffect(() => {
        if (state.User_type === "Customer" && profile.ownedFoodPlaces.length !== 0) {
            setState(state => ({ ...state, invalidAccType: true }))
        } else if (state.invalidAccType === true) {
            setState(state => ({ ...state, invalidAccType: false }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.User_type])

    // CHECKS FOR BLANK FIELDS
    useEffect(() => {
        if (
            state.Name !== "" &&
            state.Username !== "" &&
            state.Email !== ""
        ) {
            setState({ ...state, blankField: false })
        } else {
            setState({ ...state, blankField: true })
        }
        if (state.newPassword !== state.confirmPassword) {
            setState({ ...state, passwordsMatch: false })
        } else if (state.passwordsMatch === false) {
            setState({ ...state, passwordsMatch: true })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        state.Name,
        state.Username,
        state.Email,
        state.newPassword,
        state.confirmPassword,
        state.passwordsMatch,
        state.blankField
    ])

    const handleInputChange = (event) => {
        const { target } = event;
        setState({ ...state, [target.name]: target.value })
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        let Picture = profile.uploadedImage
        if (Picture === "") {
            Picture = profile.Picture
        }
        let newPassword = state.newPassword
        if (state.Password === "") {
            setState({ ...state, correctPassword: false })
        } else if (newPassword === "") {
            newPassword = state.Password
        }
        if (
            state.Name !== "" &&
            state.Username !== "" &&
            state.Email !== "" &&
            state.Password !== "" &&
            state.passwordsMatch &&
            profile.correctPassword &&
            profile.usernameAvailable &&
            profile.emailAvailable &&
            !state.invalidAccType
        ) {
            dispatch(saveChanges(
                profile.User_id,
                profile.Username,
                state.Name,
                state.Username,
                state.Email,
                newPassword,
                Picture,
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

    const confirmDelete = () => {
        setState(state => ({ ...state, deletingAccount: !state.deletingAccount }))
    }

    return (
        <div className="col-4">
            <div className="editProfileContainer tile margin-lr-10 margin-tb-10 profileTiles">
                <form onSubmit={handleFormSubmit}>
                    <h3>Edit Profile</h3>
                    <div className="myProfilePic">
                        <img
                            src={profile.uploadedImage
                                ? profile.uploadedImage
                                : profile.Picture !== null
                                    ? profile.Picture
                                    : defaultPic}
                            alt="Profile"
                        />
                    </div>
                    <div className="editDetail">
                        <p>Profile Picture</p>
                        <ImageUploader />
                    </div>
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
                        <p>New Password*</p>
                        <input
                            onChange={handleInputChange}
                            className="editInput"
                            type="password"
                            name="newPassword"
                        />
                        <p>Confirm Password*</p>
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
                    <div className="savePassword">
                        <p>Password</p>
                        <p className="passwordNote">Please enter your password to save changes</p>
                        <input
                            onChange={handleInputChange}
                            className="editInput"
                            type="password"
                            name="Password"
                        />
                        <div className={!profile.correctPassword && state.passwordTouched ? "show" : "hide"}>
                            Incorrect Password
                        </div>
                    </div>
                    <div className={state.blankField ? "show" : "hide"}>
                        Please do not leave any field blank.
                    </div>
                    <div>
                        <button
                            className="deleteAccBtn"
                            type="button"
                            onClick={confirmDelete}
                        >Delete Account</button>
                        {(state.deletingAccount &&
                            <div className="profileConfirmDelete">
                                <div className="confirmDeleteMsg">Are you sure you want to delete your account?</div>
                                <button
                                    className="confirmDeleteBtn"
                                    onClick={() => dispatch(deleteAccount(profile.Username, profile.User_type))}
                                >Yes</button>
                                <button
                                    className="confirmDeleteBtn"
                                    type="button"
                                    onClick={confirmDelete}
                                >No</button>
                            </div>
                        )}
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
                    <div className="notRequired">
                        *not required
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;