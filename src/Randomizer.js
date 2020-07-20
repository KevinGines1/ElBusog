import React from 'react';
import { connect } from 'react-redux';
import { randomizeAction } from './App.js';
// import './Randomizer.css';

const mapDispatchToProps = dispatch => ({
    randomize: (payload) => dispatch(randomizeAction(payload)),
});

const mapStateToProps = state => {
    return{
        questionNumber: state.questionNumber,
        constraints_budget: state.constraints_budget,
        constraints_location: state.constraints_location,
        constraints_type: state.constraints_type,
    }
}

const questions = [
    ["How much is your budget?", "Less than P60", "P60-P100", "More than P100", "", "I don't care"],
    ["Where do you want to eat?", "Within UPLB Campus", "Raymundo", "Grove", "", "I don't care"],
    ["What food are you craving for?", "Meat", "Seafoods", "Veggies", "Noodles", "I don't care"],
]

class Randomizer extends React.Component {
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
            if(choice === 1) {
                this.setState({constraints_budget: "<60"});
            }
            else if(choice === 2) {
                this.setState({constraints_budget: "60-100"});
            }
            else if(choice === 3) {
                this.setState({constraints_budget: ">100"});
            }
            else if(choice === 5) {
                this.setState({constraints_budget: "any"});
            }
            this.setState({questionNumber: 1})
        }
        else if(this.state.questionNumber === 1){
            if(choice === 1) {
                this.setState({constraints_location: "within_campus"});
            }
            else if(choice === 2) {
                this.setState({constraints_location: "raymundo"});
            }
            else if(choice === 3) {
                this.setState({constraints_location: "grove"});
            }
            else if(choice === 5) {
                this.setState({constraints_location: "any"});
            }
            this.setState({questionNumber: 2})
        }
        else if(this.state.questionNumber === 2){
            if(choice === 1) {
                this.setState({constraints_type: "meat"}, this.handleFormSubmit);
            }
            else if(choice === 2) {
                this.setState({constraints_type: "seafood"}, this.handleFormSubmit);
            }
            else if(choice === 3) {
                this.setState({constraints_type: "veggies"}, this.handleFormSubmit);
            }
            else if(choice === 4) {
                this.setState({constraints_type: "noodles"}, this.handleFormSubmit);
            }
            else if(choice === 5) {
                this.setState({constraints_type: "any"}, this.handleFormSubmit);
            }
        }
    }

    handleFormSubmit = () => {
        this.props.randomize(this.state.constraints_budget+this.state.constraints_location+this.state.constraints_type);
        console.log(this.state);
    }

    render(){
        return(
            <div>
                <div>
                    <p>Want to eat but can't decide where?</p>
                </div>
                <div>
                    <p onClick={() => this.handleClick(0)}>Click here to get instant recommendations!</p>
                </div>
                <div>
                    <div>
                        <p>or choose your preferences to get what suits you the most!</p>
                    </div>
                    <div>
                        <p>{questions[this.state.questionNumber][0]}</p>
                    </div>
                    <div>
                        <button onClick={() => this.handleClick(1)}>{questions[this.state.questionNumber][1]}</button>
                        <button onClick={() => this.handleClick(2)}>{questions[this.state.questionNumber][2]}</button>
                        <button onClick={() => this.handleClick(3)}>{questions[this.state.questionNumber][3]}</button>
                        {questions[this.state.questionNumber][4] !== "" &&
                            <button onClick={() => this.handleClick(4)}>{questions[this.state.questionNumber][4]}</button>
                        }
                        <button onClick={() => this.handleClick(5)}>{questions[this.state.questionNumber][5]}</button>
                    </div>
                </div>
            </div>
                
        );
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(Randomizer);
// export default connect (mapDispatchToProps)(Randomizer);
