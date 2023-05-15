import { Grid } from '@mui/material';
import BaseContainer from 'components/ui/BaseContainer';
import { Button } from 'components/ui/Button';
import Item from 'components/ui/Item';
import { api, handleError } from 'helpers/api';
import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import "styles/views/Stats.scss"

const Stats = () => {
    const [user, setUser] = React.useState([]);
    const [userstats, setUserstats] = React.useState([]);
    const history = useHistory();
    const id = sessionStorage.getItem("id");

    function Hub() {
        history.push("/hub");
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api(sessionStorage.getItem('token'), false).get('/users/getUser/' + id);
                setUser(response.data);
                const statsResponse = await api(sessionStorage.getItem('token'), id).get('/users/statistics/' + id);
                setUserstats(statsResponse.data);
                
            } 
            catch (error) {
                if (error.response.data.status === 404) {
                    const newUserStats = {
                        "gamesPlayed": 0, 
                        "gamesWon": 0, 
                        "winRatio":0, 
                        "highScore":0}
                    
                    setUserstats(newUserStats)
                }
                else {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        }

        fetchData();
    },[])

    let content;

    content = (
        <div className='stats' style={{
            width: "100%"
        }}>
            <Item sx={{
                fontWeight:"700",
                fontSize:21,
                color: "whitesmoke",
                boxShadow:"none"
            }}>Statistics</Item>
            <Grid container spacing={0} sx={{
                    width: "60%",
                    margin: "auto",
                    alignItems: "stretch",
                    alignContent: "normal",
                    justifyContent: "space-around"
                }}>
                <Grid item xs={4} sm={3} md={2.5} className='stats float'>
                    <Item className='stats number'>{userstats.gamesPlayed}</Item>
                    <Item className='stats title'>Games played</Item>
                </Grid>
                <Grid item xs={4} sm={3} md={2.5} className='stats float'>
                    <Item className='stats number'>{userstats.gamesWon}</Item>
                    <Item className='stats title'>Games won</Item>
                </Grid>
                <Grid item xs={4} sm={3} md={2.5} className='stats float'>
                    <Item className='stats number'>{userstats.winRatio}</Item>
                    <Item className='stats title'>Win ratio</Item>
                </Grid>
                <Grid item xs={4} sm={3} md={2.5} className='stats float'>
                    <Item className='stats number'>{userstats.highScore}</Item>
                    <Item className='stats title'>Highscore</Item>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ justifyContent: "right"}}>
                <Grid item xs={2}>

                        <Button
                        width="100%"
                        style={{background: "#d9e0d9", color:"black"}}
                        onClick={() => Hub()}
                        >
                            Hub
                        </Button>

                </Grid>
            </Grid>
        </div>
    )
    return (
        <BaseContainer className="stats container">
            <h1>{user.username}</h1>
            {content}
        </BaseContainer>
    )
}

export default Stats;