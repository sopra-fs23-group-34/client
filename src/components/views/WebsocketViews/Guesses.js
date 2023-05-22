import React, {useContext, useEffect, useState} from 'react';
import 'styles/views/Slider.scss';
import {WebsocketWrapper} from './WebsocketWrapper';
import BaseContainer from "../../ui/BaseContainer";
import {Slider} from "@mui/material";
import {useHistory} from "react-router-dom";
import useSound from 'use-sound';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { clearStorage } from 'helpers/clearStorage';
import { Button } from 'components/ui/Button';

const Guesses = () => {
    const history = useHistory();
    const {ref, msg, gameCode, userid} = useContext(WebsocketWrapper);
    const [protein, setProtein] = useState(50);
    const [fat, setFat] = useState(50);
    const [carbs, setCarbs] = useState(50);
    const [timer, setTimer] = useState("");
    const [loading, setLoading] = useState(false);
    const [calories, setCalories] = useState(400);
    const [roundScoreStart, setRoundScoreStart] = useState(false);
    const [update, setUpdate] = useState(0);
    const [playSetSound] = useSound('http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3', {volume: 0.5});
    const [playTimeRunningOutSound] = useSound('http://www.euskaljakintza.com/ariketak/recursos/misc196.wav', {volume: 0.5});
    const [roundLimit, setRoundLimit] = useState("");
    const [roundCount, setRoundCount] = useState("");

    const handleRoundScoreStart = (msg) => {
        setRoundScoreStart(msg.content);
    }
    const handleFood = () => {
        sessionStorage.setItem("foodName", msg.content["name"]);
        sessionStorage.setItem("foodLink", msg.content["imageLink"]);
        setLoading(false);
    }

    const handleTimer = (msg) => {
        setTimer(msg.content);
        if (timer === 5) {
            playTimeRunningOutSound();
        }
    }

    const handleRoundCounter = (msg) => {
        setRoundCount(msg.content["currentRound"]);
        setRoundLimit(msg.content["maxRounds"]);
    }
    
    const topicHandlers = {
        "RoundScoreStart": handleRoundScoreStart,
        "Food": handleFood,
        "Timer": handleTimer,
        "RoundCounter": handleRoundCounter
    };

    function handleMessage(msg) {
        const handler = topicHandlers[msg.topic];
        if (handler) {
            handler(msg);
        }
    }

    useEffect(() => {
        handleMessage(msg);
    }, [msg, history]);


    useEffect(() => {
        ref.sendMessage('/app/guess/' + gameCode + '/' + userid, JSON.stringify({
            content: {
                'protein': protein,
                "fat": fat,
                "carbs": carbs,
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
                "calories": calories
            }
        }));
    }

    const leaveGame = () => {
        if (ref) {
            ref.sendMessage('/app/'+sessionStorage.getItem("gameCode") + "/" + sessionStorage.getItem("id"));
            clearStorage();
            history.push("/hub");
        }
    }

    const handleChange = () => {
        setUpdate(update + 1);
        playSetSound();
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

    const handleCaloriesChange = (event, newValue) => {
        setCalories(newValue);
    }

    if (roundScoreStart === true) {
        setGuess();
    }

    return (
        <BaseContainer>
            <div className="slider main">
                <div className='slider form'>
                <Button 
                    className="leave-button"
                    onClick={leaveGame}
                >Leave game</Button>
                    <div style={{clear:"both"}}>
                    <h2 style={{marginBottom: 0, float: "left"}}>{timer}</h2>
                    <h2 style={{float: "right"}}>Round {roundCount}/{roundLimit}</h2>
                    </div>
                    
                    <div className='slider imageForm'>
                        {loading ? (
                                <div className="loading-spinner"></div>
                        ) : (
                            <LazyLoadImage src={sessionStorage.getItem("foodLink")} alt="food" className="slider image" />
                        )}
                    </div>
                </div>

                <h1 className="slider subtitle">{sessionStorage.getItem("foodName")}</h1>
                <div className="slider form">
                    <div className="slider text">
                        <h2 className="slider title">Protein</h2>
                        <h4 className='slider count'>{protein}g/100g</h4>
                    </div>
                    <Slider
                        defaultValue={50}
                        aria-label="protein"
                        valueLabelDisplay="auto"
                        value={protein}
                        onChange={handleProteinChange}
                        onChangeCommitted={handleChange}
                    />
                </div>

                <div className="slider form">
                    <div className="slider text">
                        <h2 className="slider title">Fat</h2>
                        <h4 className='slider count'>{fat}g/100g</h4>
                    </div>
                    <Slider
                        defaultValue={50}
                        aria-label="fat"
                        valueLabelDisplay="auto"
                        value={fat}
                        onChange={handleFatChange}
                        onChangeCommitted={handleChange}
                    />
                </div>

                <div className="slider form">
                    <div className="slider text">
                        <h2 className="slider title">Carbs</h2>
                        <h4 className='slider count'>{carbs}g/100g</h4>
                    </div>
                    <Slider
                        defaultValue={50}
                        aria-label="carbs"
                        valueLabelDisplay="auto"
                        value={carbs}
                        onChange={handleCarbsChange}
                        onChangeCommitted={handleChange}
                    />
                </div>

                <div className="slider form">
                    <div className="slider text">
                        <h2 className="slider title">Calories</h2>
                        <h4 className='slider count'>{calories}kcal/100g</h4>
                    </div>
                    <Slider
                        defaultValue={400}
                        aria-label="calories"
                        valueLabelDisplay="auto"
                        value={calories}
                        onChange={handleCaloriesChange}
                        onChangeCommitted={handleChange}
                        min={0}
                        max={800}
                    />
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Guesses;
