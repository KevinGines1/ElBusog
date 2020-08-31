import React from 'react';
// import { useDispatch } from 'react-redux';

function GetCoordinates() {
    // const dispatch = useDispatch();

        const getLocation = () => {
            if("geolocation" in navigator) {
                navigator.geolocation.getCurrentPosition(getCoordinates, getCoordinatesError);
            }
            else {
                console.log("Geolocation is not supported by this browser.");
            }
        }

        const getCoordinates = (pos) => {
            console.log(pos.coords.latitude, pos.coords.longitude);
            // dispatch the coordinates later to be used in add/edit food place
        }

        const getCoordinatesError = (error) => {
            console.log(error.message);
        }

    return(
        <button className="getLocationBtn" type="button" onClick={() => getLocation()}>Get Current Location</button>
    );
}

export default GetCoordinates;