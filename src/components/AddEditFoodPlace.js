import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    editFoodPlace,
    editingFoodPlace,
    addFoodPlace,
    addingFoodPlace,
} from '../redux';

function AddEditFoodPlace() {
    const profile = useSelector(state => state.zeit.profile)
    const foodPlaceEdited = profile.editingData
    const dispatch = useDispatch()
    const [state, setState] = useState({
        foodPlaceName: profile.addingFoodPlace ? "" : foodPlaceEdited.Food_place_name,
        location: "",
        loc1: false,
        loc2: false,
        loc3: false,
        loc4: false,
        invalidLocation: false,
        priceRange: profile.addingFoodPlace ? "<60" : foodPlaceEdited.Price_range,
        description: profile.addingFoodPlace ? "" : foodPlaceEdited.Description,
        picture: profile.addingFoodPlace ? "" : foodPlaceEdited.Picture,
        invalidPicture: false,
        imgSrcInvalid: false,
        openingTime: "800",
        openingHour: "8",
        openingMin: "00",
        openingPeriod: "AM",
        closingTime: "2000",
        closingHour: "8",
        closingMin: "00",
        closingPeriod: "PM",
        foodTypes: profile.addingFoodPlace ? "" : foodPlaceEdited.Food_types,
        daysOpen: "",
        Sun: false,
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        invalidDaysOpen: false,
        blankField: false,
        showInvalid: false
    })
    // reason why need ng sari-sariling useEffect: https://codesandbox.io/s/mutable-surf-nynlx?file=/src/index.js

    // checks if a link is provided
    useEffect(() => {
        if ((state.picture === "" && profile.addingFoodPlace) || state.imgSrcInvalid) {
            setState(state => ({ ...state, invalidPicture: true }))
        } else {
            setState(state => ({ ...state, invalidPicture: false }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.picture, state.imgSrcInvalid, state.showInvalid])

    // checks if at least one location is selected
    useEffect(() => {
        if (!state.loc1 && !state.loc2 && !state.loc3 && !state.loc4) {
            setState(state => ({ ...state, invalidLocation: true }))
        } else {
            setState(state => ({ ...state, invalidLocation: false }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.loc1, state.loc2, state.loc3, state.loc4, state.showInvalid])

    // checks if at least one day is selected
    useEffect(() => {
        if (!state.Sun && !state.Mon && !state.Tue && !state.Wed && !state.Thu && !state.Fri && !state.Sat) {
            setState(state => ({ ...state, invalidDaysOpen: true }))
        } else {
            setState(state => ({ ...state, invalidDaysOpen: false }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.Sun, state.Mon, state.Tue, state.Wed, state.Thu, state.Fri, state.Sat, state.showInvalid])

    // checks if there are no blank fields
    useEffect(() => {
        if (state.foodPlaceName === "" || state.foodTypes === "" || state.description === "") {
            setState(state => ({ ...state, blankField: true }))
        } else if (state.blankField === true) {
            setState(state => ({ ...state, blankField: false }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.foodPlaceName, state.foodTypes, state.description, state.showInvalid])

    // adds 1200 when the opening or closing period is PM

    useEffect(() => {
        const openingTime = state.openingHour.concat(state.openingMin)
        if (state.openingPeriod === "PM") {
            setState({ ...state, openingTime: (+openingTime + 1200).toString() })
        } else {
            setState({ ...state, openingTime: openingTime })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.openingHour, state.openingPeriod, state.openingMin])

    useEffect(() => {
        const closingTime = state.closingHour.concat(state.closingMin)
        if (state.closingPeriod === "PM") {
            setState({ ...state, closingTime: (+closingTime + 1200).toString() })
        } else {
            setState({ ...state, closingTime: closingTime })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.closingHour, state.closingPeriod, state.closingMin])

    const imgSrcInvalid= () => {
        setState(state => ({...state, imgSrcInvalid: true}))
    }

    const imgSrcValid = () => {
        setState(state => ({...state, imgSrcInvalid: false}))
    }

    const handleInputChange = (event) => {
        const { target } = event;
        if (target.name.length === 3) {
            if (target.checked) {
                setState({ ...state, [target.name]: true, daysOpen: state.daysOpen.concat(target.value) })
            } else {
                setState({ ...state, [target.name]: false, daysOpen: state.daysOpen.replace(target.value, '') })
            }
        } else if (target.name.length === 4) {
            if (target.checked) {
                setState({ ...state, [target.name]: true, location: state.location.concat(target.value + ', ') })
            } else {
                setState({ ...state, [target.name]: false, location: state.location.replace(target.value + ', ', '') })
            }
        } else {
            setState(state => ({ ...state, [target.name]: target.value }))
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (state.foodTypes !== "" && state.description !== "" && state.foodPlaceName !== "" && state.location !== "" && state.daysOpen !== "" && !state.blankField && !state.invalidPicture && ((profile.addingFoodPlace && state.picture !== "") || profile.editingFoodPlace)) {
            let Picture = state.picture
            if(state.picture === ""){
                Picture = foodPlaceEdited.Picture
            }
            const daysOpen = state.daysOpen.split('').sort().join('')
            const location = state.location.slice(0, -2)

            if (profile.editingFoodPlace) {
                dispatch(editFoodPlace(
                    state.foodPlaceName,
                    location,
                    state.priceRange,
                    state.description,
                    state.openingTime,
                    state.closingTime,
                    daysOpen,
                    state.foodTypes,
                    profile.Username,
                    foodPlaceEdited.Food_place_id,
                    Picture,
                    foodPlaceEdited.Picture
                ))
                dispatch(editingFoodPlace({}))
            }
            if (profile.addingFoodPlace) {
                dispatch(addFoodPlace(
                    state.foodPlaceName,
                    location,
                    state.priceRange,
                    state.description,
                    state.openingTime,
                    state.closingTime,
                    daysOpen,
                    state.foodTypes,
                    profile.Username,
                    Picture
                ))
                dispatch(addingFoodPlace())
            }
        } else if (!state.showInvalid) {
            setState({ ...state, showInvalid: true })
        }
    }

    const handleCancel = (event) => {
        event.preventDefault();
        if (profile.editingFoodPlace) {
            dispatch(editingFoodPlace({}))
        } else if (profile.addingFoodPlace) {
            dispatch(addingFoodPlace())
        }
    }
    const hourOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    return (
        <div className="addEditFoodPlace">
            <form onSubmit={handleFormSubmit}>
                {(profile.addingFoodPlace &&
                    <h5>Add a Food Place</h5>
                )}
                {(profile.editingFoodPlace &&
                    <h5>Edit Food Place</h5>
                )}
                {(state.picture === "" &&
                    <div className="addEditPic"></div>
                )}
                {(state.picture !== "" &&
                    <div className="addEditPic">
                        <img
                            onError={imgSrcInvalid}
                            onLoad={imgSrcValid}
                            src={state.picture !== ""
                                ? state.picture
                                : foodPlaceEdited.Picture
                            }
                            alt="Food Place"
                            className="foodPlacePic" />
                    </div>
                )}
                <div className="foodPlaceInputContainer">
                    <p>Food Place Photo</p>
                    <p style={{ fontStyle: "italic", marginTop: "5px" }}>Enter the image's link below</p>
                    <input
                        onChange={handleInputChange}
                        className="foodPlaceInput"
                        type="text"
                        name="picture"
                        defaultValue={profile.addingFoodPlace ? "" : foodPlaceEdited.Picture}
                    />
                    <div className={state.invalidPicture ? "show" : "hide"}>
                        Please enter an image's link.
                    </div>
                </div>
                <div className="inlineFlex">
                    <div className="editDetail">
                        <p>Food Place Name</p>
                        <input
                            onChange={handleInputChange}
                            className="foodPlaceInput"
                            type="text"
                            name="foodPlaceName"
                            maxLength="50"
                            defaultValue={profile.editingFoodPlace
                                ? foodPlaceEdited.Food_place_name
                                : ""
                            }
                        />
                    </div>
                    <div className="editDetail">
                        <p>Price Range</p>
                        <select
                            onChange={handleInputChange}
                            className="editPrice"
                            name="priceRange"
                            defaultValue={profile.editingFoodPlace
                                ? foodPlaceEdited.Price_range
                                : "<60"
                            }                        >
                            <option value="<60">Less than 60 pesos</option>
                            <option value="60-100">60 to 100 pesos</option>
                            <option value=">100">More than 100 pesos</option>
                        </select>
                    </div>
                </div>
                <div className="inlineFlex">
                    <div className="editDetail">
                        <p>Location</p>
                        <div className="checkboxes">
                            <label>
                                <input
                                    type="checkbox"
                                    name="loc1"
                                    value="within UPLB"
                                    checked={state.loc1}
                                    onChange={handleInputChange}
                                />
                                Within UPLB
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="loc2"
                                    value="Grove"
                                    checked={state.loc2}
                                    onChange={handleInputChange}
                                />
                                Grove
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="loc3"
                                    value="Raymundo"
                                    checked={state.loc3}
                                    onChange={handleInputChange}
                                />
                                Raymundo
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="loc4"
                                    value="Demarces"
                                    checked={state.loc4}
                                    onChange={handleInputChange}
                                />
                                Demarces
                            </label>
                        </div>
                    </div>
                    <div className="editDetail">
                        <p>Days Open</p>
                        <div className="checkboxes">
                            <label>
                                <input
                                    type="checkbox"
                                    name="Sun"
                                    value="0"
                                    checked={state.Sun}
                                    onChange={handleInputChange}
                                />
                                SUN
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Mon"
                                    value="1"
                                    checked={state.Mon}
                                    onChange={handleInputChange}
                                />
                                MON
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Tue"
                                    value="2"
                                    checked={state.Tue}
                                    onChange={handleInputChange}
                                />
                                TUE
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Wed"
                                    value="3"
                                    checked={state.Wed}
                                    onChange={handleInputChange}
                                />
                                WED
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Thu"
                                    value="4"
                                    checked={state.Thu}
                                    onChange={handleInputChange}
                                />
                                THU
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Fri"
                                    value="5"
                                    checked={state.Fri}
                                    onChange={handleInputChange}
                                />
                                FRI
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    name="Sat"
                                    value="6"
                                    checked={state.Sat}
                                    onChange={handleInputChange}
                                />
                                SAT
                            </label>
                        </div>
                    </div>
                </div>
                <div className="inlineFlex">
                    <div className={state.invalidLocation ? "show" : "hide"}>
                        Please choose at least one location.
                    </div>
                    <div className={state.invalidDaysOpen ? "show" : "hide"}>
                        Please choose at least one day.
                    </div>
                </div>
                <div className="inlineFlex">
                    <div className="editDetail">
                        <p>Opening Time</p>
                        <select
                            onChange={handleInputChange}
                            className="editTime"
                            name="openingHour"
                            defaultValue="8"
                        >
                            {(hourOptions.map(hour => {
                                return (
                                    <option
                                        key={hour}
                                        value={hour === 12 ? 0 : hour}
                                    >{hour}</option>
                                )
                            }))}
                        </select>
                        <select
                            onChange={handleInputChange}
                            className="editTime"
                            name="openingMin"
                            defaultValue="00"
                        >
                            <option value="00">00</option>
                            <option value="30">30</option>
                        </select>
                        <select
                            onChange={handleInputChange}
                            className="editTime"
                            name="openingPeriod"
                            defaultValue="AM"
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                    <div className="editDetail">
                        <p>Closing Time</p>
                        <select
                            onChange={handleInputChange}
                            className="editTime"
                            name="closingHour"
                            defaultValue="8"
                        >
                            {(hourOptions.map(hour => {
                                return (
                                    <option
                                        key={hour}
                                        value={hour === 12 ? 0 : hour}
                                    >{hour}</option>
                                )
                            }))}
                        </select>
                        <select
                            onChange={handleInputChange}
                            className="editTime"
                            name="closingMin"
                            defaultValue="00"
                        >
                            <option value="00">00</option>
                            <option value="30">30</option>
                        </select>
                        <select
                            onChange={handleInputChange}
                            className="editTime"
                            name="closingPeriod"
                            defaultValue="PM"
                        >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                        </select>
                    </div>
                </div>
                <div className="inlineFlex">
                    <div className="editDetail">
                        <p>Food Types</p>
                        <p style={{ fontStyle: "italic", marginTop: "5px" }}>Separate the food types with a comma (e.g. Meat, Vegetable, Snacks, Ice Cream)</p>
                        <input
                            onChange={handleInputChange}
                            className="foodPlaceInput"
                            type="text"
                            name="foodTypes"
                            defaultValue={profile.addingFoodPlace ? "" : foodPlaceEdited.Food_types}
                        />
                    </div>
                </div>
                <div className="descriptionTile">
                    <div className="editDetail">
                        <p>Description</p>
                        <textarea
                            onChange={handleInputChange}
                            className="foodPlaceInput"
                            name="description"
                            maxLength="280"
                            defaultValue={profile.editingFoodPlace
                                ? foodPlaceEdited.Description
                                : ""
                            }
                        />
                    </div>
                </div>
                <div className={state.blankField ? "show" : "hide"}>
                    Please do not leave any field blank.
                </div>
                <div>
                    {(profile.editingFoodPlace &&
                        <button
                            className="addEditFoodPlaceBtn margin-lr-10"
                            type="submit"
                        >Edit Food Place</button>
                    )}
                    {(profile.addingFoodPlace &&
                        <button
                            className="addEditFoodPlaceBtn margin-lr-10"
                            type="submit"
                        >Add Food Place</button>
                    )}
                    <button
                        type="button"
                        className="addEditFoodPlaceBtn margin-lr-10"
                        onClick={handleCancel}
                    >Cancel</button>
                </div>
            </form>
        </div >
    );
}

export default AddEditFoodPlace;