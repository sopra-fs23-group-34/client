import React, {useContext, useEffect, useState} from 'react';
import 'styles/views/Slider.scss';
import {WebsocketWrapper} from './WebsocketWrapper';
import BaseContainer from "../../ui/BaseContainer";
import {Slider} from "@mui/material";
import {useHistory} from "react-router-dom";


const Guesses = () => {
    // use react-router-dom's hook to access the history
    const history = useHistory();
    const {ref, msg, gameCode, userid} = useContext(WebsocketWrapper);
    const [protein, setProtein] = useState(50);
    const [fat, setFat] = useState(50);
    const [carbs, setCarbs] = useState(50);
    {/*const [sugar, setSugar] = useState(50);*/}
    const [timer, setTimer] = useState(15);
    const [foodName, setFoodName] = useState("");
    const [foodLink, setFoodLink] = useState("");
    const [calories, setCalories] = useState(50);
    const [roundScoreStart, setRoundScoreStart] = useState(false);
    const [update, setUpdate] = useState(0);


    useEffect(() => {
        if (msg && msg.topic === "Timer") {
            setTimer(msg.content);
        }

        if (msg && msg.topic === "Food") {
            setFoodName(msg.content["name"]);
            setFoodLink(msg.content["imageLink"]);
        }

        if (msg && msg.topic === "RoundScoreStart") {
            setRoundScoreStart(msg.content);
        }
    }, [msg]);

    useEffect(() => {
        ref.sendMessage('/app/guess/' + gameCode + '/' + userid, JSON.stringify({
            content: {
                'protein': protein,
                "fat": fat,
                "carbs": carbs,
                /* "sugar": sugar,*/
                "calories": calories
            }
        }));
    }, [update, gameCode, userid, ref]);

    const setGuess = () => {
        ref.sendMessage('/app/guess/' + gameCode + '/' + userid, JSON.stringify({
            content: {
                'protein': protein,
                "fat": fat,
                "carbs": carbs,
                /*"sugar": sugar,*/
                "calories": calories
            }
        }));
        history.push("/roundscore");
    }

    const handleChange = () => {
        setUpdate(update + 1);
    }

    const handleProteinChange = (event, newValue) => {
        setProtein(newValue);
    };

    const handleFatChange = (event, newValue) => {
        setFat(newValue);
    };

    const handleCarbsChange = (event, newValue) => {
        setCarbs(newValue);
    }
    {/* 
    const handleSugarChange = (event, newValue) => {
        setSugar(newValue);
    }
    */}
    const handleCaloriesChange = (event, newValue) => {
        setCalories(newValue);
    }

    if (roundScoreStart === true) {
        setGuess();
    }

    return (
        <BaseContainer>
            <h2>{timer}</h2>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={foodLink} alt="food"
                     className="slider image"/>
            </div>

            <h1 className="slider subtitle">{foodName}</h1>
            <div className="slider form">
                <h2 className='slider title'>Protein</h2>
                <Slider
                    defaultValue={50}
                    aria-label="protein"
                    valueLabelDisplay="auto"
                    value={protein}
                    onChange={handleProteinChange}
                    onChangeCommitted={handleChange}
                />
                <p className='slider description'>Selected protein/100gr: {protein}</p>
            </div>

            <div className="slider form">
                <h2 className='slider title'>Fat</h2>
                <Slider
                    defaultValue={50}
                    aria-label="fat"
                    valueLabelDisplay="auto"
                    value={fat}
                    onChange={handleFatChange}
                    onChangeCommitted={handleChange}
                />
                <p className='slider description'>Selected fat/100gr: {fat}</p>
            </div>

            <div className="slider form">
                <h2 className='slider title'>Carbs</h2>
                <Slider
                    defaultValue={50}
                    aria-label="carbs"
                    valueLabelDisplay="auto"
                    value={carbs}
                    onChange={handleCarbsChange}
                    onChangeCommitted={handleChange}
                />
                <p className='slider description'>Selected carb/100gr: {carbs}</p>
            </div>

            {/*<div className="slider form">
                <h2 className='slider title'>Sugar</h2>
                <Slider
                    defaultValue={50}
                    aria-label="sugar"
                    valueLabelDisplay="auto"
                    value={sugar}
                    onChange={handleSugarChange}
                    onChangeCommitted={handleChange}
                />
                <p className='slider description'>Selected sugar value: {sugar}</p>
            </div> */}
                <div className="slider form">
                    <h2 className='slider title'>Calories</h2>
                    <Slider
                        defaultValue={200}
                        aria-label="calories"
                        valueLabelDisplay="auto"
                        value={calories}
                        onChange={handleCaloriesChange}
                        onChangeCommitted={handleChange}
                        min={0}
                        max={800}
                    />
                <p className='slider description'>Selected kcal/100gr: {calories}</p>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Guesses;
