import React, {useContext, useEffect, useState} from 'react';
import 'styles/views/RoundScore.scss';
import {WebsocketWrapper} from './WebsocketWrapper';
import BaseContainer from "../../ui/BaseContainer";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useHistory} from 'react-router-dom';
import { Button } from 'components/ui/Button';
import { clearStorage } from 'helpers/clearStorage';
import {Grid} from '@mui/material';
import { api } from 'helpers/api';

const RoundScore = () => {
    const history = useHistory();
    const { msg, ref } = useContext(WebsocketWrapper);


    const [ranking, setRanking] = useState([]);
    const [solutionValues, setSolutionValues] = useState([])
    const [playerGuesses, setPlayerGuesses] = useState([]);


    const [roundLimit, setRoundLimit] = useState("");
    const [roundCount, setRoundCount] = useState("");

    const handleRoundCounter = (msg) => {
        setRoundCount(msg.content["currentRound"]);
        setRoundLimit(msg.content["maxRounds"]);
    }

    const handleRanking = (msg) => {
        setRanking(msg.content);
        sessionStorage.setItem('ranking', JSON.stringify(msg.content)); 
    }

    const handleRoundStart = () => {
        sessionStorage.removeItem("foodName");
        sessionStorage.removeItem("foodLink");
        sessionStorage.setItem("roundCount", parseInt(sessionStorage.getItem("roundCount"))+1);
    }

    const handleRoundScore = (msg) => {
        setPlayerGuesses(msg.content)
        sessionStorage.setItem('playerGuesses', JSON.stringify(msg.content));
        const actualValues = {
            carbs: msg.content[Object.keys(msg.content)[0]].carbs[0].actualValues,
            protein: msg.content[Object.keys(msg.content)[0]].protein[0].actualValues,
            fat: msg.content[Object.keys(msg.content)[0]].fat[0].actualValues,
            calories: msg.content[Object.keys(msg.content)[0]].calories[0].actualValues
        };
        setSolutionValues(actualValues);
        sessionStorage.setItem('solutionValues', JSON.stringify(actualValues));
    }

    useEffect(() => {
        const playerGuesses = sessionStorage.getItem('playerGuesses');
        const storedRanking = sessionStorage.getItem('ranking');
        const solutionValues = sessionStorage.getItem('solutionValues');
        if (playerGuesses) {
            setPlayerGuesses(JSON.parse(playerGuesses));
        }
        if (solutionValues) {
            setSolutionValues(JSON.parse(solutionValues));
        }
        if (storedRanking) {
            setRanking(JSON.parse(storedRanking));
        }
    
    }, []);

    const topicHandlers = {
        "RoundScore": handleRoundScore,
        "GameScore": handleRanking,
        "RoundStart": handleRoundStart,
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

    const leaveGame = () => {
        if (ref) {
            ref.sendMessage('/app/'+sessionStorage.getItem("gameCode") + "/" + sessionStorage.getItem("id"));
            clearStorage();
            history.push("/hub");
        }
    }

    const continueGame = async () => {
        const id = sessionStorage.getItem("id");
        const token = sessionStorage.getItem("token");
        const gameCode = sessionStorage.getItem("gameCode");
        try {
            await api(token, id).put("/lobbys/continueGame/"+gameCode);
          } catch (error) {
            console.log(error);
          }
    }
    useEffect(() => {
        if (sessionStorage.getItem("host")!=="true"){
            document.getElementById("gamecontinuer").style.display = "none";
            document.getElementById('commentHost').style.display = "none";
        }
        else if (sessionStorage.getItem("host")==="true"){
            document.getElementById('commentPlayer').style.display = "none";        }
    })

    let rankingTable;

    rankingTable = (
            <div className="score-wrapper">
                <TableContainer component={Paper} sx={{maxHeight: 200}}>
                    <Table sx={{
                        height: "max-content"
                    }} size="small" stickyHeader aria-label="ranking table">
                        <TableHead>
                            <TableRow>
                                <TableCell className='ranking-header'>Rank</TableCell>
                                <TableCell className='ranking-header' align='left'>Name</TableCell>
                                <TableCell className='ranking-header' align='right'>Points</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(ranking).map(([key, value], index) => (
                                <TableRow hover role="checkbox" className={key === sessionStorage.getItem("username") ? "score highlighted-row" : ""}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell align='left'>{key}</TableCell>
                                    <TableCell align='right'>{value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
    );

    let nutritionTable;

    nutritionTable = (
        <div className='score-wrapper2'>
            <TableContainer component={Paper} sx={{maxHeight: 400}}>
                <Table sx={{
                    height: "max-content",
                }} size="small" stickyHeader aria-label="dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell className='guesses-header1'>Player Name</TableCell>
                            <TableCell className='guesses-header1' align="right">Protein&nbsp;(g)</TableCell>
                            <TableCell className='guesses-header1' align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell className='guesses-header1' align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell className='guesses-header1' align="right">Calories (kcal)</TableCell>
                            <TableCell className='guesses-header1' align="right">Points</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className='guesses-header2'>Solution Values</TableCell>
                            <TableCell className='guesses-header2' align="right">{Math.round(solutionValues.protein)}</TableCell>
                            <TableCell className='guesses-header2' align="right">{Math.round(solutionValues.fat)}</TableCell>
                            <TableCell className='guesses-header2' align="right">{Math.round(solutionValues.carbs)}</TableCell>
                            <TableCell className='guesses-header2' align="right">{Math.round(solutionValues.calories)}</TableCell>
                            <TableCell className='guesses-header2' align="right">---</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(playerGuesses).map(([name, {carbs, protein, fat, calories, points}]) => (
                            <TableRow key={name} className={name === sessionStorage.getItem("username") ? "score highlighted-row" : ""}>
                                <TableCell component="th" scope="name">{name}</TableCell>
                                <TableCell align="right">{protein[1].guessedValues}</TableCell>
                                <TableCell align="right">{fat[1].guessedValues}</TableCell>
                                <TableCell align="right">{carbs[1].guessedValues}</TableCell>
                                <TableCell align="right">{calories[1].guessedValues}</TableCell>
                                <TableCell align="right">{points[0].points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <p style={{textAlign: 'right', marginTop: '0', fontSize: '.8em'}}>You are highlighted in blue!</p>

        </div>
    );


    return (
        <BaseContainer>
            <div className='score container'>
            <div style={{width: "95%"}}>
            <Button className="leave-button"
                    style={{marginLeft:"0px"}}
                    onClick={leaveGame}
                    >Leave game</Button>
                    <h2 style={{float: "right"}}>Round {roundCount}/{roundLimit}</h2>
                    </div>
                <div className='score form'>
                    <h1 style={{textAlign: 'center', marginBottom: '0'}}>Round Overview</h1>
                    <h5 style={{textAlign: 'center', marginTop: '0'}} id='commentHost'>Continue when you are ready...</h5>
                    <h5 style={{textAlign: 'center', marginTop: '0'}} id='commentPlayer'>Host will continue game...</h5>

                    {rankingTable}
                    {nutritionTable}
                    <Grid container spacing={3} sx={{justifyContent:"right", clear:"both", flexGrow:1}}>
                    <Grid item xs={2}>
                    <Button id="gamecontinuer" 
                    style={{marginTop:"5px", float:"right"}}
                    onClick={continueGame}
                    >
                        Continue Game
                    </Button>
                    </Grid>
                    </Grid>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default RoundScore;







