import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    editProfile,
    checkUsername,
    checkEmail,
    saveChanges,
    cancelChanges,
    deleteAccount
} from '../redux';
import defaultPic from '../assets/user.png';

function EditProfile() {
    const profile = useSelector(state => state.zeit.profile)
    const dispatch = useDispatch()
    const [state, setState] = useState({
        UserID: profile.User_id,
        Name: profile.Name,
        Username: profile.Username,
        Email: profile.Email,
        Password: "",
        Picture: profile.Picture,
        imgSrcInvalid: false,
        User_type: profile.User_type,
        blankField: false,
        passwordsMatch: true,
        confirmPassword: "",
        invalidAccType: false,
        deletingAccount: false 
    })

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
            state.Email !== ""
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

    const imgSrcInvalid= () => {
        setState(state => ({...state, imgSrcInvalid: true}))
    }

    const imgSrcValid = () => {
        setState(state => ({...state, imgSrcInvalid: false}))
    }

    const handleInputChange = (event) => {
        const { target } = event;
        setState({ ...state, [target.name]: target.value })
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        let Picture = state.Picture
        if(Picture === ""){
            Picture = profile.Picture
        }
        let Password = state.Password
        if(Password === ""){
            Password = profile.Password
        }
        if (
            state.Name !== "" &&
            state.Username !== "" &&
            state.Email !== "" &&
            state.passwordsMatch &&
            profile.usernameAvailable &&
            profile.emailAvailable &&
            !state.imgSrcInvalid &&
            !state.invalidAccType
        ) {
            dispatch(saveChanges(
                state.UserID,
                profile.Username,
                state.Name,
                state.Username,
                state.Email,
                Password,
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
        setState(state => ({...state, deletingAccount: !state.deletingAccount}))
    }
    
    return (
        <div className="editProfileContainer col-4 tile margin-lr-10 margin-tb-10 profileTiles">
            <form onSubmit={handleFormSubmit}>
                <h3>Edit Profile</h3>
                <div className="myProfilePic">
                    <img
                        onError={imgSrcInvalid}
                        onLoad={imgSrcValid}
                        src={state.Picture
                            ? state.Picture
                            : profile.Picture !== null
                            ? profile.Picture
                            : defaultPic}
                        alt="Profile"
                    />
                </div>
                <div className="editDetail">
                    <p>Upload Photo</p>
                    <p style={{ fontStyle: "italic", marginTop: "5px" }}>Enter the image's link below</p>
                    <input
                        onChange={handleInputChange}
                        className="editInput"
                        type="text"
                        name="Picture"
                        defaultValue={profile.Picture}
                    />
                    <div className={state.imgSrcInvalid ? "show" : "hide"}>
                        Please enter an image's link.
                    </div>
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
            </form>

        </div>
    );
}

export default EditProfile;