import { Spinner } from "components/ui/Spinner";
import { handleError, api } from "helpers/api";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Box, Grid, ListItemButton, Typography } from "@mui/material";
import "styles/views/Leaderboard.scss";
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { FixedSizeList} from 'react-window';
import { useHistory } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {DataGrid, useGridApiRef} from '@mui/x-data-grid';
import { Button } from "components/ui/Button";

const { default: BaseContainer } = require("components/ui/BaseContainer")
const Player = ({user, index}) => {
    return (
      <div className={`player container ${user.user_id === parseInt(sessionStorage.getItem("id")) ? "highlighted-row" : "row"}`} data-status={index}>
            <div className="player placing">
                {index + 1}
            </div>
            <div className='player username'>
              {user.username}
            </div>
            <div className='player totalscore'>
              {user.totalScore}
            </div>

      </div>
    )
    };
  
  Player.propTypes = {
    user: PropTypes.object
  };

const columns = [
    {field: "Player", width:350},
    {field: "Games played", width:150, type:"number", align:"center", cellClassName: "games-played"},
    {field: "Wins", width: 80, type:"number", align:"center", cellClassName: "wins"},
    {field: "Win percentage", width: 150, type:"number", valueFormatter: ({ value }) => `${value} %`, align:"center", cellClassName: "win-percentage"},
    {field: "highscore", width: 100, type:"number", align:"center", cellClassName: "highscore"}
]
const Leaderboard = () => {
    let idCounter = 0;
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState([]);
    const [me, setMe] = useState([]);

    const [userOwnStats, setUserOwnStats] = useState([]);
    const history = useHistory();
    const listRef = React.createRef();
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const apiRef = useGridApiRef();
    const [rows, setRows] = useState([]);
    
    function createData(username, games_played, wins, ratio, highscore) {
        return { id: idCounter, "Player": username, "Games played": games_played, "Wins": wins, "Win percentage": Math.round((ratio*100 + Number.EPSILON) * 100) / 100, "highscore": highscore };
      }
      useEffect(() => {
            async function fetchData() {
                setRows([])
                if (user.userId !== undefined) {
                    const response = await api(sessionStorage.getItem('token'), sessionStorage.getItem('id')).get('/users/statistics/' + user.userId);
                setRows([
                    createData(user.username, response.data.gamesPlayed, response.data.gamesWon, response.data.winRatio, response.data.highScore)
                  ])
                }
            }
            fetchData();
            
        
      }, [user])
    
      useEffect(() => {
        async function fetchData() {
            try {
                const response = await api(sessionStorage.getItem('token'), false).get('/users/getUser/' + sessionStorage.getItem('id'));
                setMe(response.data);
                const statsResponse = await api(sessionStorage.getItem('token'), sessionStorage.getItem('id')).get('/users/statistics/' + sessionStorage.getItem('id'));
                setUserOwnStats(statsResponse.data);
                
            } 
            catch (error) {
                if (error.response.data.status === 404) {
                    const newUserStats = {
                        "gamesPlayed": 0, 
                        "gamesWon": 0, 
                        "winRatio":0, 
                        "highScore":0}
                    
                    setUserOwnStats(newUserStats)
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
      const handleAddRow = () => {
        idCounter += 1;
        if (idCounter === 1){
            apiRef.current.updateRows([createData(me.username, userOwnStats.gamesPlayed, userOwnStats.gamesWon, userOwnStats.winRatio, userOwnStats.highScore)]);
        }
      };

    const handleClickOpen = () => {
        setShow(true);
    };
    
    const handleClose = () => {
        setErrorMessage("");
        setShow(false);
    };
    function renderRow(props) {
        const { index, style } = props;
        const handleClick = () => {
            setUser(users[index+3]);
            handleClickOpen();
        }
        return (
          <ListItem style={{...style}
          } key={index} component="div" disablePadding>
            <ListItemButton onClick={handleClick} sx={{
                height:"46px",
                width:"100%",
                padding:"0px"
            }}>
              <ListItemText primary={<Player
                                key={users[index + 3].id}
                                user={users[index + 3]}
                                index={index + 3}
                                />} />
                                </ListItemButton>
          </ListItem>
        );
      }
      function renderTop(props) {
        const { index, style } = props;
        const handleClick = () => {
            setUser(users[index]);
            handleClickOpen();
        }
        return (
          <ListItem style={style} key={index} component="div" disablePadding>
            <ListItemButton onClick={handleClick} sx={{
                height:"46px",
                width:"100%",
                padding:"0px"
            }}>
              <ListItemText primary={<Player
                                key={users[index].id}
                                user={users[index]}
                                index={index}
                                />} />
            </ListItemButton>
          </ListItem>
        );
      }

    function findUser(user) {
        return user.userId === parseInt(sessionStorage.getItem('id'));
    }
    function moveToMe() {
        listRef.current.scrollToItem(users.indexOf(users.find(findUser)), "center")
    }
    function moveToTop() {
        listRef.current.scrollToItem(0);
    }
    function Hub() {
        history.push("/hub");
    }
    useEffect(() => {
        let ignore = false;
        if (!ignore && listRef.current)  {
            moveToMe()
        }
        return () => { ignore = true; }
        },);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await api(sessionStorage.getItem("token"),sessionStorage.getItem("id")).get("/users/ranking");
                setUsers(response.data);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    }, []);

    let content = <Spinner/>;

    if (users) {
        content = (
            <div className = "leaderboard" style={{
                width: "100%"
            }}>
                <Grid container spacing={3} sx={{
                    width: "60%",
                    margin: "auto"
                }}>
                    <Box item xs={3}
                    sx={{
                        width: "100%"
                    }}
                    >
                        <Box item xs={3}
                        sx={{
                            width: "100%",
                            flexDirection: "row",
                            display:"flex",
                            justifyContent:"flex-start"
                        }}>
                            <div className="player placing">
                                Rank
                            </div>
                            <div style={{fontWeight:800, marginLeft:"2px"}} className="player username">
                                Username
                            </div>
                            <div style={{marginLeft:"auto", marginRight:0, fontWeight:800}} className="player totalscore">
                                Total Score
                            </div>
                        </Box>
                        <FixedSizeList
                        height={144}
                        width={"100%"}
                        itemSize={46}
                        itemCount={3}
                        overscanCount={0}
                        style={{
                            overflow: "hidden"
                        }}
                        >
                            {renderTop}
                        </FixedSizeList>
                        <FixedSizeList
                        height={400}
                        width={"100%"}
                        itemSize={46}
                        itemCount={users.length - 3}
                        overscanCount={1}
                        ref={listRef}
                        >
                            {renderRow}
                        </FixedSizeList>
                    </Box>
                    
        <Dialog fullWidth={true} maxWidth={"md"} sx={{
            
        }} open={show} onClose={handleClose}>
        <DialogTitle >{user.username}'s Stats</DialogTitle>
        <DialogContent>
            <Box sx={{ height: 162, mt:1}}>
                <DataGrid apiRef={apiRef} rows={rows} columns={columns}
                    hideFooter
                    initialState={{
                        sorting: {
                            sortModel: [{field: "Wins", sort:"desc"}]
                        }
                    }}
                />
            </Box>
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleAddRow}>Compare against your own Stats</Button>
          <Button onClick={handleClose}>Back</Button>
        </DialogActions>
      </Dialog>
                    <Grid container spacing={3} sx={{justifyContent:"space-between", marginTop:"0"}}>
                        <Grid sx={{marginLeft:"3.5%", paddingTop:"4%", marginTop:"2%"}}>

                                <Button
                                    onClick={() => moveToMe()}
                                    >find me
                                </Button>

                        </Grid>
                        <Grid sx={{ paddingTop:"4%", marginTop:"2%"}}>

                                <Button
                                    onClick={() => moveToTop()}
                                    >Go to Top
                                </Button>

                        </Grid>
                        <Grid sx={{
                            paddingTop:"4%", marginTop:"2%"
                        }}>

                                <Button style={{marginLeft:"auto", marginRight:"0"}}
                                    onClick={() => Hub()}
                                >
                                Hub
                                </Button>

                    </Grid>
                </Grid>
            </Grid>
        </div>
        )
    }

    return (
        <BaseContainer className="leaderboard container">
            <h2>Global Leaderboard</h2>
            {content}
        </BaseContainer>
    )
}

export default Leaderboard;