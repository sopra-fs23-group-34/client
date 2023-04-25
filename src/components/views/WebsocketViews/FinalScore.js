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


const FinalScore = () => {
    const history = useHistory();
    const {ref, msg} = useContext(WebsocketWrapper);
    const [finalRanking, setFinalRanking] = useState([]);

    const handleFinalScore = (msg) => {
        setFinalRanking(msg.content)
    }

    const topicHandlers = {
        "FinalScore": handleFinalScore
    };

    function handleMessage(msg) {
        const handler = topicHandlers[msg.topic];
        if (handler) {
            handler(msg);
        }
    }

    const leaveGame = () => {
        ref.sendMessage('/app/leave/' + sessionStorage.getItem('gameCode') + '/' + sessionStorage.getItem("id"))
        sessionStorage.removeItem('gameCode');
        sessionStorage.removeItem('host');
        history.push('/hub');
    }

    useEffect(() => {

        handleMessage(msg);

    }, [msg, history]);


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
                <TableContainer component={Paper} sx={{maxHeight: 200, minWidth: 400}}>
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

    return (
        <BaseContainer>
            <div className='finalScore container'>
                <div className='finalScore form'>
                    <h1 style={{textAlign: 'center'}}>Final Score</h1>
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
