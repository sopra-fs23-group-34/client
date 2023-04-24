import React, {useContext, useState} from 'react';
import 'styles/views/Login.scss';
import {WebsocketWrapper} from './WebsocketWrapper';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import BaseContainer from "../../ui/BaseContainer";


const FinalScore = () => {
    const {ref, lastMessage} = useContext(WebsocketWrapper);
    const [ranking, setRanking] = useState([]);
    console.log(lastMessage)

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

    return (
        <BaseContainer>
            <div>
                <h1 style={{textAlign: 'center'}}>Final Score</h1>
                {rankingTable}
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default FinalScore;
