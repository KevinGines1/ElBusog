import React from 'react';

function LoadingPage(props) {
    const style = {
        margin: "50vh auto 0",
        transform: "translateY(-50%)"
    }

    return (
        <div className="row force-center" style={style}>
            <h2>Please wait...</h2>
        </div>
    );
}

export default LoadingPage;