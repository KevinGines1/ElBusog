import React from 'react';
import { Link } from 'react-router-dom'

function PageNotFound(props) {
    const style = {
        margin: "50vh auto -40px",
        transform: "translateY(-50%)"
    }

    return (
        <div>
            <div className="row force-center" style={style}>
                <h2>404 - Not Found</h2>
            </div>
            <div className="row force-center">
                <p>We can't seem to find the page you are looking for.</p>
            </div>
            <div className="row force-center margin-tb-20">
               <Link to="/"><button className="button">Go back to home</button></Link>
            </div>
        </div>
    );
}

export default PageNotFound;