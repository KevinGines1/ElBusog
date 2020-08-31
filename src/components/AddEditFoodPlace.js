import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    editFoodPlace,
    editingFoodPlace,
    addFoodPlace,
    addingFoodPlace,
} from '../redux';
import ImageUploader from './ImageUploader';

function AddEditFoodPlace() {
    const profile = useSelector(state => state.zeit.profile)
    const foodPlaceEdited = profile.editingData
    const dispatch = useDispatch()
    const [state, setState] = useState({
        picture: profile.addingFoodPlace ? "" : foodPlaceEdited.Picture,
        foodPlaceName: profile.addingFoodPlace ? "" : foodPlaceEdited.Food_place_name,
        priceRange: profile.addingFoodPlace ? "<60" : foodPlaceEdited.Price_range,
        location: "",
        loc1: false,
        loc2: false,
        loc3: false,
        loc4: false,
        invalidLocation: false,
        latitude: profile.addingFoodPlace ? "" : foodPlaceEdited.Latitude,
        invalidLatitude: false,
        longitude: profile.addingFoodPlace ? "" : foodPlaceEdited.Longitude,
        invalidLongitude: false,
        open24h: (profile.editingFoodPlace && foodPlaceEdited.Opening_time === null) ? true : false,
        openingTime: "800",
        openingHour: "8",
        openingMin: "00",
        openingPeriod: "AM",
        closingTime: "2000",
        closingHour: "8",
        closingMin: "00",
        closingPeriod: "PM",
        foodTypes: "",
        food1: false,
        food2: false,
        food3: false,
        food4: false,
        food5: false,
        invalidFoodTypes: false,
        daysOpen: "",
        Sun: false,
        Mon: false,
        Tue: false,
        Wed: false,
        Thu: false,
        Fri: false,
        Sat: false,
        invalidDaysOpen: false,
        description: profile.addingFoodPlace ? "" : foodPlaceEdited.Description,
        blankField: false,
        showInvalid: false
    })
    // reason why need ng sari-sariling useEffect: https://codesandbox.io/s/mutable-surf-nynlx?file=/src/index.js

    const getLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(getCoordinates, getCoordinatesError);
        }
        else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    const getCoordinates = (pos) => {
        const latitudeInput = document.getElementById("latitudeInput")
        const longitudeInput = document.getElementById("longitudeInput")
        const fixedLat = +pos.coords.latitude.toFixed(6)
        const fixedLong = +pos.coords.longitude.toFixed(6)

        latitudeInput.value = fixedLat
        longitudeInput.value = fixedLong

        setState({ ...state, latitude: fixedLat, longitude: fixedLong })
    }

    const getCoordinatesError = (error) => {
        console.log(error.message);
    }

    // checks if at least one location is selected
    useEffect(() => {
        if (!state.loc1 && !state.loc2 && !state.loc3 && !state.loc4) {
            setState(state => ({ ...state, invalidLocation: true }))
        } else {
            setState(state => ({ ...state, invalidLocation: false }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.loc1, state.loc2, state.loc3, state.loc4, state.showInvalid])

    // checks if latitude is valid
    useEffect(() => {
        const latString = state.latitude.toString()
        let validNum = true
        if (latString.includes(".")) {
            const splitString = latString.split(".")
            if (splitString[0].length > 4 || splitString[1].length > 6) {
                validNum = false
            }
        } else if (latString.length > 4) {
            validNum = false
        }

        if (state.latitude === "" || !validNum) {
            setState(state => ({ ...state, invalidLatitude: true }))
        } else {
            setState(state => ({ ...state, invalidLatitude: false }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.latitude, state.showInvalid])

    // checks if longitude is valid
    useEffect(() => {
        const longString = state.longitude.toString()
        let validNum = true
        if (longString.includes(".")) {
            const splitString = longString.split(".")
            if (splitString[0].length > 4 || splitString[1].length > 6) {
                validNum = false
            }
        }

        if (state.longitude === "" || !validNum) {
            setState(state => ({ ...state, invalidLongitude: true }))
        } else {
            setState(state => ({ ...state, invalidLongitude: false }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.longitude, state.showInvalid])

    // checks if at least one day is selected
    useEffect(() => {
        if (!state.Sun && !state.Mon && !state.Tue && !state.Wed && !state.Thu && !state.Fri && !state.Sat) {
            setState(state => ({ ...state, invalidDaysOpen: true }))
        } else {
            setState(state => ({ ...state, invalidDaysOpen: false }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.Sun, state.Mon, state.Tue, state.Wed, state.Thu, state.Fri, state.Sat, state.showInvalid])

    // checks if at least one food type is selected
    useEffect(() => {
        if (!state.food1 && !state.food2 && !state.food3 && !state.food4 && !state.food5) {
            setState(state => ({ ...state, invalidFoodTypes: true }))
        } else {
            setState(state => ({ ...state, invalidFoodTypes: false }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.food1, state.food2, state.food3, state.food4, state.food5, state.showInvalid])

    // checks if there are no blank fields
    useEffect(() => {
        if (state.foodPlaceName === "" || state.description === "") {
            setState(state => ({ ...state, blankField: true }))
        } else if (state.blankField === true) {
            setState(state => ({ ...state, blankField: false }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.foodPlaceName, state.description, state.showInvalid])

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
        } else if (target.name.length === 5) {
            if (target.checked) {
                setState({ ...state, [target.name]: true, foodTypes: state.foodTypes.concat(target.value + ', ') })
            } else {
                setState({ ...state, [target.name]: false, foodTypes: state.foodTypes.replace(target.value + ', ', '') })
            }
        } else if (target.name === "open24h") {
            if (target.checked) {
                setState({ ...state, open24h: true })
            } else {
                setState({ ...state, open24h: false })
            }
        } else {
            setState(state => ({ ...state, [target.name]: target.value }))
        }
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (state.foodTypes !== "" && state.description !== "" && state.foodPlaceName !== "" && state.location !== "" && state.daysOpen !== "" && !state.blankField && state.latitude !== "" && state.longitude !== "" && !state.invalidLatitude && !state.invalidLongitude && ((profile.addingFoodPlace && profile.uploadedImage !== "") || profile.editingFoodPlace)) {

            let Picture = profile.uploadedImage
            if (Picture === "") {
                Picture = foodPlaceEdited.Picture
            }

            let openingTime = state.openingTime
            let closingTime = state.closingTime
            if (state.open24h) {
                openingTime = null
                closingTime = null
            }

            const daysOpen = state.daysOpen.split('').sort().join('')
            const location = state.location.slice(0, -2)
            const foodTypes = state.foodTypes.slice(0, -2)

            if (profile.editingFoodPlace) {
                dispatch(editFoodPlace(
                    foodPlaceEdited.Food_place_id,
                    state.foodPlaceName,
                    location,
                    state.priceRange,
                    state.description,
                    openingTime,
                    closingTime,
                    daysOpen,
                    foodTypes,
                    state.longitude,
                    state.latitude,
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
                    openingTime,
                    closingTime,
                    daysOpen,
                    foodTypes,
                    profile.Username,
                    state.latitude,
                    state.longitude,
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
                    <div className="foodPlaceTitle">Add a Food Place</div>
                )}
                {(profile.editingFoodPlace &&
                    <div className="foodPlaceTitle">Edit Food Place</div>
                )}
                {(state.picture === "" && profile.uploadedImage === "" &&
                    <div className="addEditPic"></div>
                )}
                {((state.picture !== "" || profile.uploadedImage !== "") &&
                    <div className="addEditPic">
                        <img
                            src={profile.uploadedImage
                                ? profile.uploadedImage
                                : state.picture
                            }
                            alt="Food Place"
                            className="foodPlacePic" />
                    </div>
                )}
                <br />
                <div>
                    <p>Food Place Photo</p>
                    <ImageUploader />
                </div>
                <div className="addEditFoodPlaceDetail">
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

                <div className="addEditFoodPlaceDetail">
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

                <div className="addEditFoodPlaceDetail">
                    <p>Days Open</p>
                    <div className="foodPlaceInputContainer">
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

                <div className={state.invalidDaysOpen ? "show" : "hide"}>
                    Please choose at least one day.
                </div>

                <div className="addEditFoodPlaceDetail open24hContainer">
                    <div className="foodPlaceInputContainer">
                        <p className="open24hMsg">Is the food place open the whole day? (24 hours)</p>
                        <label>
                            <input
                                type="checkbox"
                                name="open24h"
                                checked={state.open24h}
                                onChange={handleInputChange}
                            />
                                Yes
                            </label>
                    </div>
                </div>

                <div className="addEditFoodPlaceDetail">
                    <p>Opening Time</p>
                    <select
                        onChange={handleInputChange}
                        className="editTime"
                        name="openingHour"
                        defaultValue="8"
                        disabled={state.open24h}
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
                        disabled={state.open24h}
                    >
                        <option value="00">00</option>
                        <option value="30">30</option>
                    </select>
                    <select
                        onChange={handleInputChange}
                        className="editTime"
                        name="openingPeriod"
                        defaultValue="AM"
                        disabled={state.open24h}
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>

                <div className="addEditFoodPlaceDetail">
                    <p>Closing Time</p>
                    <select
                        onChange={handleInputChange}
                        className="editTime"
                        name="closingHour"
                        defaultValue="8"
                        disabled={state.open24h}
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
                        disabled={state.open24h}
                    >
                        <option value="00">00</option>
                        <option value="30">30</option>
                    </select>
                    <select
                        onChange={handleInputChange}
                        className="editTime"
                        name="closingPeriod"
                        defaultValue="PM"
                        disabled={state.open24h}
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>

                <div className="addEditFoodPlaceDetail">
                    <p>Location (Area)</p>
                    <div className="foodPlaceInputContainer">
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

                <div className={state.invalidLocation ? "show" : "hide"}>
                    Please choose at least one location.
                </div>

                <div className="addEditFoodPlaceDetail">
                    <p>Location (Map Coordinates)</p>
                    <div className="foodPlaceInputContainer displayBlock">
                        <div className="coordinatesInput">
                            <p>Latitude</p>
                            <input
                                onChange={handleInputChange}
                                className="foodPlaceInput"
                                type="number"
                                id="latitudeInput"
                                name="latitude"
                                defaultValue={state.latitude}
                            />
                        </div>
                        <div className="coordinatesInput">
                            <p>Longitude</p>
                            <input
                                onChange={handleInputChange}
                                className="foodPlaceInput"
                                type="number"
                                id="longitudeInput"
                                name="longitude"
                                defaultValue={state.longitude}
                            />
                        </div>
                        <div className={state.invalidLatitude ? "show" : "hide"}>
                            Invalid latitude
                        </div>
                        <div className={state.invalidLongitude ? "show" : "hide"}>
                            Invalid longitude
                        </div>
                        <br />
                        <button
                            className="uploadAndLocBtn"
                            type="button"
                            onClick={() => getLocation()}
                        >Get Current Location</button>
                    </div>
                </div>

                <div className="addEditFoodPlaceDetail">
                    <p>Food Types</p>
                    <div className="foodPlaceInputContainer">
                        <label>
                            <input
                                type="checkbox"
                                name="food1"
                                value="Meat"
                                checked={state.food1}
                                onChange={handleInputChange}
                            />
                                Meat
                            </label>
                        <label>
                            <input
                                type="checkbox"
                                name="food2"
                                value="Vegetable"
                                checked={state.food2}
                                onChange={handleInputChange}
                            />
                                Vegetable
                            </label>
                        <label>
                            <input
                                type="checkbox"
                                name="food3"
                                value="Seafood"
                                checked={state.food3}
                                onChange={handleInputChange}
                            />
                                Seafood
                            </label>
                        <label>
                            <input
                                type="checkbox"
                                name="food4"
                                value="Ice Cream"
                                checked={state.food4}
                                onChange={handleInputChange}
                            />
                                Ice Cream
                            </label>
                        <label>
                            <input
                                type="checkbox"
                                name="food5"
                                value="Snacks"
                                checked={state.food5}
                                onChange={handleInputChange}
                            />
                                Snacks
                            </label>
                    </div>
                </div>
                <div className={state.invalidFoodTypes ? "show" : "hide"}>
                    Please choose at least one food type.
                    </div>
                <div className="descriptionTile">
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