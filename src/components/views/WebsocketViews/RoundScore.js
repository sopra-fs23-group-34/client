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


const RoundScore = () => {
    const history = useHistory();
    const {ref, msg} = useContext(WebsocketWrapper);
    const [ranking, setRanking] = useState([]);
    const [guess, setGuess] = useState("noGuess");
    const [name, setName] = useState("noName");
    const [players, setPlayers] = useState([]);
    const data = [
        createData('Nataell', 159, 6.0, 24, 4.0),
        createData('Nico', 237, 9.0, 37, 4.3),
        createData('Elias', 262, 16.0, 24, 6.0),
        createData('Maurice', 305, 3.7, 67, 4.3),
        createData('Andre', 356, 16.0, 49, 3.9),
    ];


    const handleRanking = (msg) => {
        setRanking(msg.content);
        console.log('ranking message')
    }

    const handleGuess = (msg) => {
        setGuess(msg.content);
        console.log('guess message')
    }

    const handleRoundStart = (msg) => {
        history.push('/Guesses');
        console.log('round start message')
    }

    const handleFinalScoreStart = (msg) => {
        history.push('/FinalScore');
        console.log('final score start message')
    }

    const handleRoundScore = (msg) => {
        const listOfPlayers = msg.content
        setPlayers(listOfPlayers)
        // {player1{calories {actualValues, guessedValues, deviations}, carbs {actualValues, guessedValues, deviations}, fat, protein}
    }

    const handleGameScore = (msg) => {
        setRanking(msg.content)
    }

    const handleFinalScore = (msg) => {
        console.log(msg.content)
        console.log('final score message')
    }

    const topicHandlers = {
        "Ranking": handleRanking,
        "Guess": handleGuess,
        "RoundStart": handleRoundStart,
        "FinalScoreStart": handleFinalScoreStart,
        "RoundScore": handleRoundScore,
        "GameScore": handleGameScore,
        "FinalScore": handleFinalScore
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


    if (guess === "noGuess" && name === "noName") {
        setGuess([22, 33, 44, 55, 66, 77])
        setName(["Andre", "Nataell", "Nico", "Elias", "Maurice", "Bob"])
    }

    function createData(name, calories, fat, carbs, protein) {
        return {name, calories, fat, carbs, protein};
    }

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
                <TableContainer component={Paper} sx={{maxHeight: 200}}>
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
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );


    return (
        <BaseContainer>
            {rankingTable}
            {nutritionTable}
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default RoundScore;







