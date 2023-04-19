import { useContext, useEffect, useState } from "react";
import { Spinner } from "components/ui/Spinner";
import { Button } from "components/ui/Button";
import { useHistory } from "react-router-dom";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import "styles/views/Lobby.scss";
import { WebsocketWrapper } from "./WebsocketWrapper";
import * as React from "react";
import Box from "@mui/material/Box";
import { Grid, Slider } from "@mui/material";
import Item from "components/ui/Item";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { api } from "helpers/api";

const Player = ({ user }) => (
  <div className="player container">
    <div className="player username"> {user.username} </div>
  </div>
);

Player.propTypes = {
  user: PropTypes.object,
};

const Lobby = () => {
  // use react-router-dom's hook to access the history
  const history = useHistory();
  const { ref, msg } = useContext(WebsocketWrapper);
  const [roundCount, setRoundCount] = useState(5);
  const [foodCategory, setFoodCategory] = useState("");
  const handleChangeCategory = (event) => {
    setFoodCategory(event.target.value);
  };

  const categories = ["Vegetables", "Fruits", "Meat", "Snacks", "Drinks"];

  const handleChange = (event, newValue) => {
    setRoundCount(newValue);
  };

  // define a state variable (using the state hook).
  // if this variable changes, the component will re-render, but the variable will
  // keep its value throughout render cycles.
  // a component can have as many state variables as you like.
  // more information can be found under https://reactjs.org/docs/hooks-state.html
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("msg Lobby:", msg);
    if (msg && msg.topic === "players") {
      setUsers(msg.content);
    }
    if (msg && msg.topic === "Timer") {
      history.push("/guesses");
    }
  }, [msg, history]);

  const leaveLobby = () => {
    ref.sendMessage(
      "/app/leave/" +
        sessionStorage.getItem("gameCode") +
        "/" +
        sessionStorage.getItem("id")
    );
    sessionStorage.removeItem("gameCode");
    sessionStorage.removeItem("host");
    history.push("/hub");
  };

  const startGame = async () => {
    const gameCode = sessionStorage.getItem("gameCode");
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("id");
    try {
      await api(token, userId).post("/lobbys/startGame/" + gameCode);
      history.push("/guesses");
    } catch (error) {
      //not needed to display anything because if you are host and you press start it should work
      console.log(error);
    }
  };

  //const startGame = () => {
  //    const food = foodCategory.toUpperCase();
  //    const gameCode = sessionStorage.getItem('gameCode');
  //    ref.sendMessage('/app/startGame/' + gameCode, JSON.stringify({'roundLimit': roundCount, "foodCategory": food}));
  //    history.push("/guesses");
  //};
  // the effect hook can be used to react to change in your component.
  // in this case, the effect hook is only run once, the first time the component is mounted
  // this can be achieved by leaving the second argument an empty array.
  // for more information on the effect hook, please see https://reactjs.org/docs/hooks-effect.html

  let content = <Spinner />;
  let hostview;
  if (users) {
    content = (
      <div
        className="game"
        style={{
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            margin: "auto",
            justifyContent: "left",
          }}
        >
          <Box
            item
            xs={3}
            sx={{
              width: "100%",
              height: 400,
              maxWidth: 360,
              margin: "left",
              marginLeft: "30px",
            }}
          >
            {users.map((user) => (
              <Player key={user.id} user={user} />
            ))}
          </Box>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={3}>
            <Item>
              <Button width="100%" onClick={() => leaveLobby()}>
                Leave Lobby
              </Button>
            </Item>
          </Grid>
        </Grid>
      </div>
    );
    hostview = (
      <div
        className="game"
        style={{
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={3}
          sx={{
            width: "100%",
            margin: "auto",
            justifyContent: "space-around",
          }}
        >
          <Box
            item
            xs={3}
            sx={{
              width: "100%",
              height: 400,
              maxWidth: 360,
              margin: "left",
              marginLeft: "30px",
            }}
          >
            {users.map((user) => (
              <Player key={user.id} user={user} />
            ))}
          </Box>
          <Box item xs={3}>
            <h2>Number of Rounds</h2>
            <Slider
              value={roundCount}
              aria-label="Default"
              valueLabelDisplay="auto"
              min={1}
              max={10}
              onChange={handleChange}
            />
            <h2>Food categories</h2>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="food-category-label">Food Category</InputLabel>
                <Select
                  labelId="food-category-label"
                  id="food-category-label-select"
                  value={foodCategory}
                  label="Food Category"
                  onChange={handleChangeCategory}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "space-between",
          }}
        >
          <Grid item xs={3}>
            <Item>
              <Button width="100%" onClick={() => leaveLobby()}>
                Leave Lobby
              </Button>
            </Item>
          </Grid>
          <Grid
            item
            xs={5}
            sx={{
              justifyContent: "flex-end",
            }}
          >
            <Item>
              <Button
                width="100%"
                disabled={!foodCategory}
                onClick={() => startGame()}
              >
                Start Game
              </Button>
            </Item>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <BaseContainer className="lobby container">
      <h2> Game Lobby </h2>
      <p className="lobby paragraph">
        Lobby Key: {sessionStorage.getItem("gameCode")}
      </p>
      {sessionStorage.getItem("host") ? hostview : content}
    </BaseContainer>
  );
};

export default Lobby;
