import { Spinner } from "components/ui/Spinner";
import { handleError, api } from "helpers/api";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Alert, AlertTitle, Box, Grid, ListItemButton, Typography } from "@mui/material";
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
      <div className={`player container ${user.userId === parseInt(sessionStorage.getItem("id")) ? "highlighted-row" : "row"}`} data-status={index}>
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
    {field: "Player", width:250},
    {field: "Singleplayer Games", width:150, type:"number", align:"center", cellClassName: "sp-games-played"},
    {field: "Multiplayer Games", width:150, type:"number", align:"center", cellClassName: "mp-games-played"},
    {field: "Wins", width: 80, type:"number", align:"center", cellClassName: "wins"},
    {field: "Win ratio", width: 100, type:"number", valueFormatter: ({ value }) => `${value} %`, align:"center", cellClassName: "win-percentage"},
    {field: "highscore", width: 100, type:"number", align:"center", cellClassName: "highscore"}
]
const Leaderboard = () => {
    let idCounter = 0;
    const [users, setUsers] = useState(null);
    const [user, setUser] = useState([]);
    const [me, setMe] = useState([]);
    const [alertStatus, setAlertStatus] = useState(false);
    const [userOwnStats, setUserOwnStats] = useState([]);
    const history = useHistory();
    const listRef = React.createRef();
    const [show, setShow] = useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");
    const apiRef = useGridApiRef();
    const [rows, setRows] = useState([]);
    
    function createData(username, sp_games_played, mp_games_played, wins, ratio, highscore) {
        return { id: idCounter, "Player": username, "Singleplayer Games": sp_games_played, "Multiplayer Games": mp_games_played, "Wins": wins, "Win ratio": Math.round((ratio*100 + Number.EPSILON) * 100) / 100, "highscore": highscore };
      }
      useEffect(() => {
            async function fetchData() {
                setRows([])
                if (user.userId !== undefined) {
                    const response = await api(sessionStorage.getItem('token'), sessionStorage.getItem('id')).get('/users/statistics/' + user.userId);
                setRows([
                    createData(user.username, response.data.singleplayerGamesPlayed, response.data.multiplayerGamesPlayed, response.data.gamesWon, response.data.winRatio, response.data.highScore)
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
                        "SingleplayerGames": 0,
                        "MultiplayerGames": 0,
                        "Wins": 0, 
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
            apiRef.current.updateRows([createData(me.username, userOwnStats.SingleplayerGames,userOwnStats.MultiplayerGames, userOwnStats.Wins, userOwnStats.winRatio, userOwnStats.highScore)]);
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
        if (sessionStorage.getItem("guestUser") === "true") {
            setAlertStatus(true);
            return ;
        }
        listRef.current.scrollToItem(users.indexOf(users.find(findUser)), "center")
    }
    function moveToTop() {
        listRef.current.scrollToItem(0);
    }
    function Hub() {
        history.push("/hub");
    }

    useEffect(() => {
        if (listRef.current)  {
            moveToMe();
        }
        },[]);

    useEffect(() => {
        async function getGuestStatus() {
            if (sessionStorage.getItem("guestUser") === "true") {
                setAlertStatus(true);
            }
        }
        getGuestStatus();
    }, []);

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
            <div  className = "leaderboard-wrapper">
                <Grid container spacing={3} className='leaderboard-base'>
                    <Box item xs={3}
                    sx={{
                        width: "100%"
                    }}
                    >
                        <Box item xs={3}
                        className='leaderboard-header'>
                            <div className="leaderboard-header placing">
                                Rank
                            </div>
                            <div className="leaderboard-header username">
                                Username
                            </div>
                            <div className="leaderboard-header totalscore">
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
                </Grid>
            <Grid container spacing={3} sx={{justifyContent:"space-between", marginTop:"0"}}>
                    <Grid item xs={4}>
                        <Button style={{width:"100%"}}
                                onClick={() => Hub()}
                            >
                            Hub
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button style={{width:"100%"}}
                                onClick={() => moveToTop()}
                                >Go to Top
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button style={{width:"100%"}}
                                onClick={() => moveToMe()}
                                >find me
                        </Button>
                    </Grid>
                </Grid>
        </div>
        )
    }

    return (
        <BaseContainer className="leaderboard container">
            <h2>Global Leaderboard</h2>
            {content}
            <div className="leaderboard popup-message">
            {alertStatus && (
                <Alert severity="info" onClose={() => setAlertStatus(false)} >
                    {me.username}: <strong>You are using a Guest Account, your stats are not being tracked.</strong>
                </Alert>
            )}
            </div>
        </BaseContainer>
    )
}

export default Leaderboard;