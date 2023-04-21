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
import {Spinner} from "../../ui/Spinner";


const RoundScore = () => {
    const {ref, msg} = useContext(WebsocketWrapper);
    const [ranking, setRanking] = useState("noRanking");
    const [guess, setGuess] = useState("noGuess");
    const [name, setName] = useState("noName");
    const list1 = ["Andre", "Nataell", "Nico"]
    const rows = [
        createData('Nataell', 159, 6.0, 24, 4.0),
        createData('Nico', 237, 9.0, 37, 4.3),
        createData('Elias', 262, 16.0, 24, 6.0),
        createData('Maurice', 305, 3.7, 67, 4.3),
        createData('Andre', 356, 16.0, 49, 3.9),
    ];


    console.log(msg)

    useEffect(() => {
        if (msg && msg.topic === "Ranking") {
            setRanking(msg.content);
        }

        if (msg && msg.topic === "Guess") {
            setGuess(msg.content);
        }
    }, [msg]);


    if (ranking === "noRanking" && guess === "noGuess" && name === "noName") {
        setRanking([1, 2, 3, 4, 5, 6])
        setGuess([22, 33, 44, 55, 66, 77])
        setName(["Andre", "Nataell", "Nico", "Elias", "Maurice", "Bob"])
    }

    function createData(name, calories, fat, carbs, protein) {
        return {name, calories, fat, carbs, protein};
    }



    let nutritionTable = <Spinner/>;

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
                    {rows.map((row) => (
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
            <div className="score container">
                <h1>round statistics</h1>
                <h2>your performance and the ranking</h2>
                <table className="score table">
                    <thead className="score th:first-child">
                    <tr className="score tr">
                        <th>players</th>
                        <th>rank</th>
                        <th>points this round</th>
                    </tr>
                    </thead>
                    <tbody className="score th">
                    {list1.map((ranking, index) => (
                        <tr key={index}>
                            <td>{ranking[index]}</td>
                            <td>{guess[index]}</td>
                            <td>{name[index]}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                {nutritionTable}
            </div>
        </BaseContainer>
    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default RoundScore;







