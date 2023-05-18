import React, {useContext, useEffect, useState} from 'react';
import 'styles/views/FinalScore.scss';
import {WebsocketWrapper} from './WebsocketWrapper';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import BaseContainer from "../../ui/BaseContainer";
import {Link, useHistory} from "react-router-dom";
import {Button} from "../../ui/Button";
import 'animate.css';
import useSound from "use-sound";
import { clearStorage } from 'helpers/clearStorage';
import FinalScoreGif from "../../../resources/FinalScoreGif.gif";


const FinalScore = () => {
    const history = useHistory();
    const {msg} = useContext(WebsocketWrapper);
    const [finalRanking, setFinalRanking] = useState([]);
    const [winner, setWinner] = useState([]);
    const [playWinSound] = useSound('http://audio.marsupialgurgle.com/audio/partyhorngood.mp3', {volume: 0.5});

    const handleFinalScore = (msg) => {
        setFinalRanking(msg.content);
        sessionStorage.setItem('finalRanking', JSON.stringify(msg.content)); 
        const keys = Object.keys(msg.content);
        setWinner(keys[0]);
      }

    const topicHandlers = {
        "FinalScore": handleFinalScore
    };

    function handleMessage(msg) {
        console.log(msg);
        const handler = topicHandlers[msg.topic];
        if (handler) {
            handler(msg);
        }
    }

    
    const leaveGame = () => {
        clearStorage();
        history.push('/hub');
    }

    useEffect(() => {
        const storedFinalRanking = localStorage.getItem('finalRanking');
        if (storedFinalRanking) {
          setFinalRanking(JSON.parse(storedFinalRanking));
        }
    }, []);
    
    useEffect(() => {
        handleMessage(msg);

    }, [msg, history]);


    let rankingTable;

    rankingTable = (
        <div className='rankingTable-parent'>
            <div className='rankingTable-parent container'>
                <TableContainer component={Paper} sx={{maxHeight: 500}}>
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
                            {Object.entries(finalRanking).map(([key, value], index) => (
                                <TableRow hover role="checkbox" style={
                                    index === 0 ? { backgroundColor: 'gold' } :
                                        index === 1 ? { backgroundColor: 'silver' } :
                                            index === 2 ? { backgroundColor: '#cd8c32' } :
                                                {}
                                }>
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

    return (
        <BaseContainer>
            <div className='finalScore container'>
                <div className='finalScore form'>
                    {playWinSound()}
                    <img src={FinalScoreGif} alt={'FinalScoreGif'} style={{width: '100%', height: 'auto'}}/>
                    <h2 style={{marginBottom: 0}} className="animate__animated animate__bounce animate__delay-0.5s">The Winner is:</h2>
                    <h1 style={{marginTop: 0, color: 'gold'}} className="animate__animated animate__fadeIn animate__delay-2s">{winner}</h1>
                    {rankingTable}
                    <Link to={"/hub"}>
                        <Button width="100%"
                                onClick={
                                    () => leaveGame()}>
                            Back to Hub
                        </Button>
                    </Link>
                </div>
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default FinalScore;
