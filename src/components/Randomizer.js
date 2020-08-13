import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { randomizeAction, getAllFoodPlaces } from '../redux';
import banner from '../assets/cakeBanner.png';

const mapDispatchToProps = dispatch => ({
    randomize: (payload) => dispatch(randomizeAction(payload)),
    getallfoodplaces: (payload) => dispatch(getAllFoodPlaces(payload))
});

const mapStateToProps = state => {
    return{
        listOfFoodPlaces: state.zoren.listOfFoodPlaces
    }
}

const questions = [
    ["How much is your budget?", "Less than P60", "P60-P100", "More than P100", null, null, "I don't care"],
    ["Where do you want to eat?", "Within UPLB Campus", "Raymundo", "Grove", "Demarces", null, "I don't care"],
    ["What food are you craving for?", "Meat", "Vegetable", "Seafood", "Snacks", "Ice Cream", "I don't care"],
]

class Randomizer extends React.Component {
    componentDidMount() {
        axios.get('https://ancient-garden-70007.herokuapp.com/api/getAllFoodPlaces')
        .then(response => {
            console.log(response.data)
            this.props.getallfoodplaces(response.data);
        })
    }

    // async componentDidMount() { // so much cleaner, i suggest 
    //     const response = await axios.get('https://ancient-garden-70007.herokuapp.com/api/getAllFoodPlaces')
    //     console.log(response.data)
    //     this.props.getallfoodplaces(response.data) // add food places to state
    // }

    state = {
        questionNumber: 0,
        constraints_budget: "",
        constraints_location: "",
        constraints_type: "",
    }
    
    handleClick = (choice) => {
        if(choice === 0) {
            this.setState({
                constraints_budget: "any",
                constraints_location: "any",
                constraints_type: "any"
            }, this.handleFormSubmit);
        }
        else if(this.state.questionNumber === 0){
            switch (choice) {
                case 1: this.setState({constraints_budget: "<60"}); break;
                case 2: this.setState({constraints_budget: "60-100"}); break;
                case 3: this.setState({constraints_budget: ">100"}); break;
                default: this.setState({constraints_budget: "any"});
            }
            this.setState({questionNumber: 1})
        }
        else if(this.state.questionNumber === 1){
            switch (choice) {
                case 1: this.setState({constraints_location: "within UPLB"}); break;
                case 2: this.setState({constraints_location: "Raymundo"}); break;
                case 3: this.setState({constraints_location: "Grove"}); break;
                case 4: this.setState({constraints_location: "Demarces"}); break;
                default: this.setState({constraints_location: "any"});
            }
            this.setState({questionNumber: 2})
        }
        else if(this.state.questionNumber === 2){
            switch (choice) {
                case 1: this.setState({constraints_type: "Meat"}, this.handleFormSubmit); break;
                case 2: this.setState({constraints_type: "Vegetable"}, this.handleFormSubmit); break;
                case 3: this.setState({constraints_type: "Seafood"}, this.handleFormSubmit); break;
                case 4: this.setState({constraints_type: "Snacks"}, this.handleFormSubmit); break;
                case 5: this.setState({constraints_type: "Ice Cream"}, this.handleFormSubmit); break;
                default: this.setState({constraints_type: "any"}, this.handleFormSubmit);
            }
        }
    }

    foodPlaceRanker = () => {
        var date = new Date();
        var day = date.getDay();                                // day of the week (0-6 is Sunday-Saturday)
        var hour = date.getHours() * 100 + date.getMinutes()    // hour in 24-hour format (0-23)
        // make an array of user preferences (constraints)
        const userPref = [this.state.constraints_budget, this.state.constraints_location, this.state.constraints_type];
        // populate the foodPlaceScores with {name: score} objects for every food place
        var foodPlaceScores = [];
        this.props.listOfFoodPlaces.forEach((currentValue) => {
            // food place needs to be open on current time and day of the week
            if(((hour > currentValue.Opening_time && hour < currentValue.Closing_time) || currentValue.Opening_time === null) && currentValue.Days_open.includes(day)) {
                foodPlaceScores.push({...currentValue, score: 0});
            }
        })
        console.log(foodPlaceScores);

        this.props.listOfFoodPlaces.forEach((currentValue) => {
            // check if the price range of food place is similar to user preference
            // right budget rewards 3 points, right location rewards 1 point, right type rewards 2 points
            if(currentValue.Price_range === userPref[0]) {
                // find the food place in foodPlaceScores and increase its score
                foodPlaceScores = foodPlaceScores.map(place => (
                    place.Food_place_name === currentValue.Food_place_name
                    ?   {...place, score: place.score + 3}
                    :   place
                ))
            }
            // check if the location of food place is similar to user preference
            if(currentValue.Location === userPref[1]) {
                // find the food place in foodPlaceScores and increase its score
                foodPlaceScores = foodPlaceScores.map(place => (
                    place.Food_place_name === currentValue.Food_place_name
                    ?   {...place, score: place.score + 1}
                    :   place
                ))
            }
            // check if the type of food place contains the user preference
            if(currentValue.Food_types.includes(userPref[2])) {
                // find the food place in foodPlaceScores and increase its score
                foodPlaceScores = foodPlaceScores.map(place => (
                    place.Food_place_name === currentValue.Food_place_name
                    ?   {...place, score: place.score + 2}
                    :   place
                ))
            }
        })
        // add a random value between 0-1 to break ties
        foodPlaceScores = foodPlaceScores.map(place => (
            {...place, score: place.score + Math.random()}
        ))
        // sort foodPlaceScores from highest score to lowest score, best pick will be at index [0]
        foodPlaceScores.sort((a, b) => b.score - a.score);
        console.log(foodPlaceScores);
        return foodPlaceScores;
    }

    handleFormSubmit = () => {
        //dispatch the ranked food places to listOfFoodPlacesRanked in redux store
        this.props.randomize(this.foodPlaceRanker());
        console.log(this.state);
    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-12">
                        <img className="banner" src={banner} alt="Banner" onClick={() => this.handleClick(0)}/>
                        <h5 className="pretitle">Want to eat but can't decide where?</h5>
                        <h2 className="title" onClick={() => this.handleClick(0)}>Get an instant recommendation!</h2>
                    </div>
                </div>
                <div className="banner padding-tb-40" style={{"backgroundImage": `url(${banner})`}}>
                    <div className="row">
                        <h4 className="col-12 force-center white">...or choose your preferences</h4>
                    </div>
                    <div className="row margin-tb-20">
                        <h5 className="col-12 force-center white">{questions[this.state.questionNumber][0]}</h5>
                    </div>
                    <div className="rowcenter">
                        <button className="col-3 buttonTranslucent" onClick={() => this.handleClick(1)}>{questions[this.state.questionNumber][1]}</button>
                        <button className="col-3 buttonTranslucent" onClick={() => this.handleClick(2)}>{questions[this.state.questionNumber][2]}</button>
                        <button className="col-3 buttonTranslucent" onClick={() => this.handleClick(3)}>{questions[this.state.questionNumber][3]}</button>
                    </div>
                    <div className="rowcenter">
                        {questions[this.state.questionNumber][4] !== null &&
                            <button className="col-3 buttonTranslucent" onClick={() => this.handleClick(4)}>{questions[this.state.questionNumber][4]}</button>
                        }
                        {questions[this.state.questionNumber][5] !== null &&
                            <button className="col-3 buttonTranslucent" onClick={() => this.handleClick(5)}>{questions[this.state.questionNumber][5]}</button>
                        }
                        <button className="col-3 buttonTranslucent" onClick={() => this.handleClick(6)}>{questions[this.state.questionNumber][6]}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Randomizer);
// export default connect (mapDispatchToProps)(Randomizer);
