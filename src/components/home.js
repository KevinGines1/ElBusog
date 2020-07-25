import React, { Component } from 'react';
import '../ElbusogCSS/ElbusogCSS.css';
import banner from '../ElbusogCSS/uplbBanner.jpg';
import foodPlacePic from '../ElbusogCSS/foodPlace.png';

// add food places (isipin na yung api or gamit muna ng temp na state)

class Home extends Component {
    render() {
        return (
            <div style={{backgroundImage: `url(${banner})`}}>
                <div className="row">
                    <div className="col-12">
                        <img className="banner" src={banner} alt="Welcome Banner" />
                        <h1 className="title">Find food places around Elbi</h1>
                    </div>
                </div>
                <div class="row margin-tb-40">
                    <div class="col-3">
                        <div class="tile margin-tb-10 margin-lr-10">
                            <img class="foodIcon" src={foodPlacePic} alt="Name of food place"/>
                            <h5>Food Place 1</h5>
                            <p>Cuisine</p>
                            <p>Price</p>
                            <a class="button margin-tb-20" href="#">View Details</a>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="tile margin-tb-10 margin-lr-10">
                            <img class="foodIcon" src={foodPlacePic} alt="Name of food place"/>
                            <h5>Food Place 2</h5>
                            <p>Cuisine</p>
                            <p>Price</p>
                            <a class="button margin-tb-20" href="#">View Details</a>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="tile margin-tb-10 margin-lr-10">
                            <img class="foodIcon" src={foodPlacePic} alt="Name of food place"/>
                            <h5>Food Place 3</h5>
                            <p>Cuisine</p>
                            <p>Price</p>
                            <a class="button margin-tb-20" href="#">View Details</a>
                        </div>
                    </div>
                    <div class="col-3">
                        <div class="tile margin-tb-10 margin-lr-10">
                            <img class="foodIcon" src={foodPlacePic} alt="Name of food place"/>
                            <h5>Food Place 3</h5>
                            <p>Cuisine</p>
                            <p>Price</p>
                            <a class="button margin-tb-20" href="#">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;