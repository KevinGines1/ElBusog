import React from 'react';
import Randomizer from '../components/Randomizer';
import banner from '../assets/uplbBanner.jpg';

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
        <div className="row margin-tb-40">
            <div className="row">
                <h2 className="force-center">Objectives</h2>
            </div>
            <div className="rowcenter">
                <div className="col-8 padding-lr-10">
                    <p>The developers are committed in promoting a diverse and friendly community. Elbusog, a food place finding website, allows users to search for local food establishments around UPLB. This website allows users to find the most suitable food place with respect to their needs such as budget, location, and food type. The objective of this website is to assist users in narrowing their options and at the same time, find the most ideal food place. It also acts as a tool in promoting local business establishments, boosting the local economy.</p>
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
                        a
                    </div>
                </div>
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10">
                        b
                    </div>
                </div>
            </div>
            <div className="rowcenter">
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10">
                        c
                    </div>
                </div>
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10">
                        d
                    </div>
                </div>
            </div>
            <div className="rowcenter">
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10">
                        e
                    </div>
                </div>
                <div className="col-4">
                    <div className="tile margin-tb-10 margin-lr-10">
                        f
                    </div>
                </div>
            </div>
        </div>
        {/* For demo only, remove randomizer after merge */}
        <Randomizer/>
    </div>
);

export default About;