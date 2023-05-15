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
import { Grid } from '@mui/material';
import { api } from 'helpers/api';

const RoundScore = () => {
    const history = useHistory();
    const {msg, ref} = useContext(WebsocketWrapper);
    const [ranking, setRanking] = useState([]);
    const [data, setData] = useState([]);
    const [solutionValues, setSolutionValues] = useState([])
    const roundLimit = sessionStorage.getItem("roundLimit");
    const roundCount = sessionStorage.getItem("roundCount");

    const handleRanking = (msg) => {
        setRanking(msg.content);
    }

    const handleRoundStart = () => {
        sessionStorage.setItem("roundCount", parseInt(sessionStorage.getItem("roundCount"))+1);
    }



    const handleRoundScore = (msg) => {
        setData(msg.content)
        const actualValues = {
            carbs: msg.content[Object.keys(msg.content)[0]].carbs[0].actualValues,
            protein: msg.content[Object.keys(msg.content)[0]].protein[0].actualValues,
            fat: msg.content[Object.keys(msg.content)[0]].fat[0].actualValues,
            calories: msg.content[Object.keys(msg.content)[0]].calories[0].actualValues
        };
        setSolutionValues(actualValues);
        // {player1{calories {actualValues, guessedValues, deviations}, carbs {actualValues, guessedValues, deviations}, fat, protein}
    }

    const topicHandlers = {
        "Ranking": handleRanking,
        "RoundScore": handleRoundScore,
        "GameScore": handleRanking,
        "RoundStart": handleRoundStart,
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

    const continueGame = async() => {
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
        console.log(sessionStorage.getItem("host"), sessionStorage.getItem("host")!=="true")
        if (sessionStorage.getItem("host")!=="true"){
            document.getElementById("gamecontinuer").style.display = "none";
        }
    })
    let rankingTable;

    rankingTable = (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <div style={{
                display: 'inline-block',
                position: 'center',
                justifyContent: 'center',
                alignItems: 'center',
                margin: 10
            }}>
                <TableContainer component={Paper} sx={{maxHeight: 200, minWidth: 300}}>
                    <Table sx={{
                        height: "max-content"
                    }} size="small" stickyHeader aria-label="ranking table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Rank</TableCell>
                                <TableCell align='right'>Name</TableCell>
                                <TableCell align='right'>Points</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(ranking).map(([key, value], index) => (
                                <TableRow hover role="checkbox">
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell align='right'>{key}</TableCell>
                                    <TableCell align='right'>{value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );

    let nutritionTable;

    nutritionTable = (
        <div>
            <TableContainer component={Paper} sx={{maxHeight: 400}}>
                <Table sx={{
                    height: "max-content"
                }} size="small" stickyHeader aria-label="dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Player Name</TableCell>
                            <TableCell align="right">Calories (kcal)</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            <TableCell align="right">Points</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Solution Values</TableCell>
                            <TableCell align="right">{Math.round(solutionValues.calories)}</TableCell>
                            <TableCell align="right">{Math.round(solutionValues.fat)}</TableCell>
                            <TableCell align="right">{Math.round(solutionValues.carbs)}</TableCell>
                            <TableCell align="right">{Math.round(solutionValues.protein)}</TableCell>
                            <TableCell align="right">---</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(data).map(([name, {carbs, protein, fat, calories, points}]) => (
                            <TableRow key={name} className={name === sessionStorage.getItem("username") ? "score highlighted-row" : ""}>
                                <TableCell component="th" scope="name">{name}</TableCell>
                                <TableCell align="right">{calories[1].guessedValues}</TableCell>
                                <TableCell align="right">{fat[1].guessedValues}</TableCell>
                                <TableCell align="right">{carbs[1].guessedValues}</TableCell>
                                <TableCell align="right">{protein[1].guessedValues}</TableCell>
                                <TableCell align="right">{points[0].points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );


    return (
        <BaseContainer>
            <div className='score container'>
            <div style={{width: "95%"}}>
                    <h2 style={{float: "right"}}>Round {roundCount}/{roundLimit}</h2>
                    </div>
                <div className='score form'>
                    <h1 style={{textAlign: 'center', marginBottom: '0'}}>Round Overview</h1>
                    <h5 style={{textAlign: 'center', marginTop: '0'}}>Continuing in a few seconds...</h5>
                    {rankingTable}
                    {nutritionTable}
                    <Grid container spacing={3} sx={{justifyContent:"space-between", clear:"both", flexGrow:1}}>
                    <Grid item xs={2}>
                    <Button 
                    style={{marginTop:"5px"}}
                    onClick={leaveGame}
                    >Leave game</Button>
                    </Grid>
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







