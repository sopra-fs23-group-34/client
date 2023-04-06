import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Hub.scss";
import * as React from 'react';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import StatsButton from '../ui/StatsButton';
import CreateLobbyButton from "../ui/CreateLobbyButton";
import LeaderboardButton from "../ui/LeaderboardButton";
import ProfileButton from "../ui/ProfileButton";
import PopUp from "../ui/JoinLobbyButton";
import LogoutButton from "../ui/LogoutButton";
import Item from "components/ui/Item";




export  function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3} sx={{
        width: "100%",
        margin: "auto"




        }}>
        <Grid item xs={4}>
          <Item>
            <StatsButton/>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <CreateLobbyButton/>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <LeaderboardButton/>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <ProfileButton/>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <PopUp/>
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <LogoutButton/>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}

const Hub = () => {

  return (
    <BaseContainer margin="auto" className="hub container">
      <h1>The big diabetes game</h1>
      <p className="game paragraph">
        Hub
      </p>
      <BasicGrid/>
    </BaseContainer>
  );
}

export default Hub;
