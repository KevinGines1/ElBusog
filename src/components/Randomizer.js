import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import { randomizeAction } from '../redux';
import banner from '../assets/samgyupBannerDark.jpg';
import banner2 from '../assets/cakeBanner.jpg';
import './Randomizer.css'

const questions = [
    ["How much is your budget?", "Less than P60", "P60-P100", "More than P100", null, null, "I don't care"],
    ["Where do you want to eat?", "Within UPLB Campus", "Raymundo", "Grove", "Demarces", null, "I don't care"],
    ["What food are you craving for?", "Meat", "Vegetable", "Seafood", "Snacks", "Ice Cream", "I don't care"],
]

function Randomizer() {
    let history = useHistory();

    const listOfFoodPlaces = useSelector(state => state.foodplaces.listOfFoodPlaces);
    const dispatch = useDispatch()

    const [budget, setBudget] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [questionNumber, setQuestionNumber] = useState(0);

    const handleClick = (choice) => {
        if (choice === 0) {
            setBudget('any');
            setLocation('any');
            setType('any');
            handleFormSubmit();
        }
        else if (choice === 7) {
            setQuestionNumber(0);
        }
        else if (questionNumber === 0) {
            switch (choice) {
                case 1: setBudget('<60'); break;
                case 2: setBudget('60-100'); break;
                case 3: setBudget('>100'); break;
                default: setBudget('any');
            }
            setQuestionNumber(1)
        }
        else if (questionNumber === 1) {
            switch (choice) {
                case 1: setLocation('within UPLB'); break;
                case 2: setLocation('Raymundo'); break;
                case 3: setLocation('Grove'); break;
                case 4: setLocation('Demarces'); break;
                default: setLocation('any');
            }
            setQuestionNumber(2)
        }
        else if (questionNumber === 2) {
            switch (choice) {
                case 1: setType('Meat'); break;
                case 2: setType('Vegetable'); break;
                case 3: setType('Seafood'); break;
                case 4: setType('Snacks'); break;
                case 5: setType('Ice Cream'); break;
                default: setType('any');
            }
            handleFormSubmit();
        }
    }

    const foodPlaceRanker = () => {
        var date = new Date();
        var day = date.getDay();                                // day of the week (0-6 is Sunday-Saturday)
        var hour = date.getHours() * 100 + date.getMinutes()    // hour in 24-hour format (0-23)
        // make an array of user preferences (constraints)
        const userPref = [budget, location, type];
        // populate the foodPlaceScores with {name: score} objects for every food place
        var foodPlaceScores = [];
        listOfFoodPlaces.forEach((currentValue) => {
            // food place needs to be open on current time and day of the week
            if (((hour > currentValue.Opening_time && hour < currentValue.Closing_time) || currentValue.Opening_time === null) && currentValue.Days_open.includes(day)) {
                foodPlaceScores.push({ ...currentValue, score: 0 });
            }
        })
        // console.log(foodPlaceScores);

        listOfFoodPlaces.forEach((currentValue) => {
            // check if the price range of food place is similar to user preference
            // right budget rewards 3 points, right location rewards 1 point, right type rewards 2 points
            if (currentValue.Price_range === userPref[0]) {
                // find the food place in foodPlaceScores and increase its score
                foodPlaceScores = foodPlaceScores.map(place => (
                    place.Food_place_name === currentValue.Food_place_name
                        ? { ...place, score: place.score + 3 }
                        : place
                ))
            }
            // check if the location of food place is similar to user preference
            if (currentValue.Location === userPref[1]) {
                // find the food place in foodPlaceScores and increase its score
                foodPlaceScores = foodPlaceScores.map(place => (
                    place.Food_place_name === currentValue.Food_place_name
                        ? { ...place, score: place.score + 1 }
                        : place
                ))
            }
            // check if the type of food place contains the user preference
            if (currentValue.Food_types.includes(userPref[2])) {
                // find the food place in foodPlaceScores and increase its score
                foodPlaceScores = foodPlaceScores.map(place => (
                    place.Food_place_name === currentValue.Food_place_name
                        ? { ...place, score: place.score + 2 }
                        : place
                ))
            }
        })
        // add a random value between 0-1 to break ties
        foodPlaceScores = foodPlaceScores.map(place => (
            { ...place, score: place.score + Math.random() }
        ))
        // sort foodPlaceScores from highest score to lowest score, best pick will be at index [0]
        foodPlaceScores.sort((a, b) => b.score - a.score);
        return foodPlaceScores;
    }

    const handleFormSubmit = () => {
        //dispatch the ranked food places to listOfFoodPlacesRanked in redux store
        const foodPlaceScores = foodPlaceRanker()
        dispatch(randomizeAction(foodPlaceScores))
        history.push(`/foodplace/${foodPlaceScores[0].Food_place_name}`);
    }

    return (
        <div>
            <div className="row tintInstantRec">
                <div className="col-12 instantRec">
                    <img
                        className="banner-no-height"
                        style={{ height: "300px" }}
                        src={banner}
                        alt="Banner"
                        onClick={() => handleClick(0)} />
                    <h5 className="pretitle">Want to eat but can't decide where?</h5>
                    <h2
                        className="title"
                        style={{ textDecoration: 'underline', textDecorationThickness: '1px'}}
                        onClick={() => handleClick(0)}>Get instant recommendation!</h2>
                </div>
            </div>
            <div className="banner-auto-height padding-tb-40" style={{ "backgroundImage": `url(${banner2})` }}>
                <div className="row">
                    <h4 className="col-12 force-center white">...or choose your preferences</h4>
                </div>
                <div className="row margin-tb-20">
                    <h5 className="col-12 force-center white">{questions[questionNumber][0]}</h5>
                </div>
                <div className="rowcenter">
                    <button className="col-3 buttonTranslucent" onClick={() => handleClick(1)}>{questions[questionNumber][1]}</button>
                    <button className="col-3 buttonTranslucent" onClick={() => handleClick(2)}>{questions[questionNumber][2]}</button>
                    <button className="col-3 buttonTranslucent" onClick={() => handleClick(3)}>{questions[questionNumber][3]}</button>
                </div>
                <div className="rowcenter">
                    {questions[questionNumber][4] !== null &&
                        <button className="col-3 buttonTranslucent" onClick={() => handleClick(4)}>{questions[questionNumber][4]}</button>
                    }
                    {questions[questionNumber][5] !== null &&
                        <button className="col-3 buttonTranslucent" onClick={() => handleClick(5)}>{questions[questionNumber][5]}</button>
                    }
                    <button className="col-3 buttonTranslucent" onClick={() => handleClick(6)}>{questions[questionNumber][6]}</button>
                </div>
                <div className="row force-center">
                    {(questionNumber > 0) &&
                        <button className="button margin-tb-10 seeMore" onClick={() => handleClick(7)}>Retry</button>
                    }
                </div>
            </div>
        </div>
    );
}

export default Randomizer;