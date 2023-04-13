import React, {useContext} from 'react';
import 'styles/views/RoundScore.scss';
import { WebsocketWrapper } from './WebsocketWrapper';
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
  const { ref, msg } = useContext(WebsocketWrapper);
  console.log(msg)

    function createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
    }

    const list1 = ["andre", "Nataell", "Nico"]
    const list2 = [1, 2, 3]
    const list3 = [65, 44, 82]

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];


    let nutritionTable = <Spinner/> ;

    nutritionTable = (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
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
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
              {list1.map((item, index) => (
                  <tr key={index}>
                      <td>{item}</td>
                      <td>{list2[index]}</td>
                      <td>{list3[index]}</td>
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







