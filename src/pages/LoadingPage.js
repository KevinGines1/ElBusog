import React from 'react';
import loadingAnimation from '../assets/loadingAnimationWhite.gif';

function LoadingPage(props) {
    const style = {
        margin: "50vh auto 0",
        transform: "translateY(-50%)"
    }

    return (
        <div className="row force-center" style={style}>
            <img src={loadingAnimation} alt="Loading..."/>
        </div>
    );
}

export default LoadingPage;