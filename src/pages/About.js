import React from 'react';
import banner from '../assets/uplbBanner.jpg';
import logo from '../assets/logo.svg';
import aaron from '../assets/devs/aaron.jpg';
import jai from '../assets/devs/jai.jpg';
import kevin from '../assets/devs/kevin.jpg';
import osie from '../assets/devs/osie.jpg';
import zeit from '../assets/devs/zeit.jpg';
import zoren from '../assets/devs/zoren.jpg';

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
                    <p className="left-desktop-center-phone">The developers are committed in promoting a diverse and friendly community. Elbusog, a food place finding website, allows users to search for local food establishments around UPLB. This website allows users to find the most suitable food place with respect to their needs such as budget, location, and food type. The objective of this website is to assist users in narrowing their options and at the same time, find the most ideal food place. It also acts as a tool in promoting local business establishments, boosting the local economy.</p>
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
                    <div className="tile margin-tb-10 margin-lr-10 row">
                        <div className="col-5">
                            <img className="devPics" src={osie} alt="John Osias Gandia"/>
                        </div>
                        <div className="col-7 left-desktop-center-phone">
                            <h6>John Osias Gandia</h6>
                            <p>Junior Developer</p><br/>
                            <p>I like sisig.</p>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10 row">
                        <div className="col-5">
                            <img className="devPics" src={kevin} alt="Kevin Gines"/>
                        </div>
                        <div className="col-7 left-desktop-center-phone">
                            <h6>Kevin Gines</h6>
                            <p>Junior Developer</p><br/>
                            <p>I love Vigan empanada.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rowcenter">
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10 row">
                        <div className="col-5">
                            <img className="devPics" src={jai} alt="Kevin Gines"/>
                        </div>
                        <div className="col-7 left-desktop-center-phone">
                            <h6>Jairus Matthew Leonor</h6>
                            <p>Sophomore Developer</p><br/>
                            <p>I like Maling.</p>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10 row">
                        <div className="col-5">
                            <img className="devPics" src={aaron} alt="Kevin Gines"/>
                        </div>
                        <div className="col-7 left-desktop-center-phone">
                            <h6>Aaron Maano</h6>
                            <p>Junior Developer</p><br/>
                            <p>I like porkchop.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rowcenter">
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10 row">
                        <div className="col-5">
                            <img className="devPics" src={zoren} alt="Kevin Gines"/>
                        </div>
                        <div className="col-7 left-desktop-center-phone">
                            <h6>King James Zoren Tan</h6>
                            <p>Sophomore Developer</p><br/>
                            <p>I like noodles.</p>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10 row">
                        <div className="col-5">
                            <img className="devPics" src={zeit} alt="Kevin Gines"/>
                        </div>
                        <div className="col-7 left-desktop-center-phone">
                            <h6>Ma. Zeit Elizha Tomboc</h6>
                            <p>Sophomore Developer</p><br/>
                            <p>I love sinigang.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default About;