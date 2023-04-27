import { Box, Button, Grid } from '@mui/material';
import BaseContainer from 'components/ui/BaseContainer';
import Item from 'components/ui/Item';
import { api, handleError } from 'helpers/api';
import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import "styles/views/Stats.scss"

const Stats = () => {
    const [user, setUser] = React.useState([]);
    const history = useHistory();
    const id = sessionStorage.getItem("id");
    function Hub() {
        history.push("/hub");
    }
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api(sessionStorage.getItem('token'), false).get('/users/getUser/' + id);

                setUser(response.data)
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }

        fetchData();
    })

    let content;

    content = (
        <div className='stats' style={{
            width: "100%"
        }}>
            <Item sx={{
                fontWeight:"700",
                fontSize:21,
                color: "whitesmoke"
            }}>Statistics</Item>
            <Grid container spacing={2} sx={{
                    width: "60%",
                    margin: "auto",
                    alignItems: "normal",
                    alignContent: "normal"
                }}>
                <Box item xs={3} sx={{
                    width: "24%",
                    border: 1,
                    borderRadius: 2,
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "flex-start",
                    margin: "3px",
                    bgcolor: "grey"
                }}>
                    <Item sx={{
                        color:"white",
                        bgcolor: "grey",
                        paddingBottom: "1px",
                        marginBottom: "0px",
                        fontSize: 17,
                        fontWeight: "800"
                    }}>35</Item>
                    <Item sx={{
                        color:"#97ABFF",
                        bgcolor: "grey",
                        paddingTop: "1px",
                        marginTop: "0px",
                        fontSize: 13
                    }}>Games played</Item>
                </Box>
                <Box item xs={3} sx={{
                    width: "24%",
                    border: 1,
                    borderRadius: 2,
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "flex-start",
                    margin: "3px",
                    bgcolor: "grey"
                }}>
                    <Item sx={{
                        color:"white",
                        bgcolor: "grey",
                        paddingBottom: "1px",
                        marginBottom: "0px",
                        fontSize: 17,
                        fontWeight: "800"
                    }}>31</Item>
                    <Item sx={{
                        color:"#97ABFF",
                        bgcolor: "grey",
                        paddingTop: "1px",
                        marginTop: "0px",
                        fontSize: 13
                    }}>Games won</Item>
                </Box>
                <Box item xs={3} sx={{
                    width: "24%",
                    border: 1,
                    borderRadius: 2,
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "flex-start",
                    margin: "3px",
                    bgcolor: "grey"
                }}>
                    <Item sx={{
                        color:"white",
                        bgcolor: "grey",
                        paddingBottom: "1px",
                        marginBottom: "0px",
                        fontSize: 17,
                        fontWeight: "800"
                    }}>88.5%</Item>
                    <Item sx={{
                        color:"#97ABFF",
                        bgcolor: "grey",
                        paddingTop: "1px",
                        marginTop: "0px",
                        fontSize: 13
                    }}>Win ratio</Item>
                </Box>
                <Box item xs={3} sx={{
                    width: "24%",
                    border: 1,
                    borderRadius: 2,
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "flex-start",
                    margin: "3px",
                    bgcolor: "grey"
                }}>
                    <Item sx={{
                        color:"white",
                        bgcolor: "grey",
                        paddingBottom: "1px",
                        marginBottom: "0px",
                        fontSize: 17,
                        fontWeight: "800"
                    }}>8000</Item>
                    <Item sx={{
                        color:"#97ABFF",
                        bgcolor: "grey",
                        paddingTop: "1px",
                        marginTop: "0px",
                        fontSize: 13
                    }}>Highscore</Item>
                </Box>
            </Grid>
            <Grid container spacing={3} sx={{ justifyContent: "right"}}>
                <Grid item xs={2}>
                    <Item>
                        <Button
                        style={{background: "#d9e0d9", color:"black"}}
                        onClick={() => Hub()}
                        >
                            Hub
                        </Button>
                    </Item>
                </Grid>
            </Grid>
        </div>
    )
    return (
        <BaseContainer className="stats container">
            <h1>{user.username}</h1>
            <h2>This feature is mocked</h2>
            {content}
        </BaseContainer>
    )
}

export default Stats;