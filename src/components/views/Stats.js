import { Box, Button, Grid } from '@mui/material';
import BaseContainer from 'components/ui/BaseContainer';
import Item from 'components/ui/Item';
import * as React from 'react';
import { useHistory } from "react-router-dom";
import "styles/views/Stats.scss"
const Stats = () => {
    const [user, setUser] = React.useState([]);
    const history = useHistory();
    function Hub() {
        history.push("/hub");
    }
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
            <h1>my name</h1>
            {content}
        </BaseContainer>
    )
}

export default Stats;