import React from 'react';
import banner from '../assets/uplbBanner.jpg';
import logo from '../assets/logo.svg';

const About = () => (
    <div>
        <div style={{backgroundImage: `url(${banner})`}}>
            <div className="row">
                <div className="col-12">
                    <img className="banner" src={banner} alt="Welcome Banner" />
                    <h1 className="title">About</h1>
                </div>
            </div>
        </div>
        <div className="row margin-tb-30 force-center">
            <img src={logo} width="200px" alt="Elbusog Logo"/>
        </div>
        <div className="row margin-tb-40">
            <div className="row">
                <h2 className="force-center">Objectives</h2>
            </div>
            <div className="rowcenter">
                <div className="col-8 padding-lr-10">
                    <p className="justify">The developers are committed in promoting a diverse and friendly community. Elbusog, a food place finding website, allows users to search for local food establishments around UPLB. This website allows users to find the most suitable food place with respect to their needs such as budget, location, and food type. The objective of this website is to assist users in narrowing their options and at the same time, find the most ideal food place. It also acts as a tool in promoting local business establishments, boosting the local economy.</p>
                </div>
            </div>
        </div>
        <div className="row margin-tb-40">
            <div className="row">
                <h2 className="force-center">Members</h2>
            </div>
            <div className="row">
                <p className="force-center">Meet the creators of this website.</p>
            </div>
            <div className="rowcenter">
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10">
                        <h6>a</h6>
                        <p>aa</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10">
                        <h6>b</h6>
                        <p>bb</p>
                    </div>
                </div>
            </div>
            <div className="rowcenter">
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10">
                        <h6>c</h6>
                        <p>cc</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10">
                        <h6>d</h6>
                        <p>dd</p>
                    </div>
                </div>
            </div>
            <div className="rowcenter">
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10">
                        <h6>e</h6>
                        <p>ee</p>
                    </div>
                </div>
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10">
                        <h6>f</h6>
                        <p>ff</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default About;