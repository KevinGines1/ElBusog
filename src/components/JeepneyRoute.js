import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getJeepRoute } from '../redux';

function JeepneyRoute() {
    const dispatch = useDispatch();
    const jeepRoute = useSelector(state => state.zoren.jeepRoute);
    const jeepRideStart = useSelector(state => state.zoren.jeepRideStart);
    const jeepRideStop = useSelector(state => state.zoren.jeepRideStop);

    const [buttonVisible, toggleButtonVisible] = useState(true);
    const [coordsAvailable, changeCoordsAvailable] = useState(true);

    const getLocation = () => {
        if("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(getCoordinates, getCoordinatesError);
            toggleButtonVisible(false);
        }
        else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    const getCoordinates = (pos) => {
        console.log(pos);
        dispatch(getJeepRoute(pos.coords.latitude, pos.coords.longitude, 5));   //put food place id
    }

    const getCoordinatesError = (error) => {
        console.log(error.message);
        dispatch(getJeepRoute(null, null, 5));
        changeCoordsAvailable(false);
    }

    return(
        <div className="rowcenter">
            <div className="col-6">
                <div className="tile margin-lr-10">
                    <h4>Directions</h4>
                    {buttonVisible
                    ?   <button className="button" onClick={() => getLocation()}>Get commute directions</button>
                    :   jeepRoute
                        ?   coordsAvailable
                            ?   (jeepRideStart === jeepRideStop)
                                ?   <p>Just walking distance from where you are!</p>
                                :   <p>Ride a <strong>{jeepRoute}</strong> jeep in <strong>{jeepRideStart}</strong> and stop at <strong>{jeepRideStop}</strong></p>
                            :   <p>Ride a <strong>{jeepRoute}</strong> jeep and stop at <strong>{jeepRideStop}</strong>.<br/> Enable location to get more detailed commute directions.</p>
                        :   <p>Loading...</p>}
                </div>
            </div>
        </div>
    );
}

export default JeepneyRoute;