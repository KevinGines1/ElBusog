import React from 'react';

const FoodPlaceMap = () => {
    //this will be replaced later with values from api call in food place page
    const latitude = 14.167418;
    const longitude = 121.243359;

    return(
        <div className="rowcenter margin-tb-20">
            <div className="col-6">
                <div className="tile margin-lr-10">
                    <h4>Map</h4>
                    <iframe
                        className="map"
                        src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                        frameBorder="0"
                        title="Map">
                    </iframe>
                </div>
            </div>
        </div>
    )
}

export default FoodPlaceMap;