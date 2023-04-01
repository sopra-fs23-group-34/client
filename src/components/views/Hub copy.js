import BaseContainer from "components/ui/BaseContainer";
import "styles/views/Hub.scss";
import * as React from 'react';
import { styled } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from '@mui/material/Paper';
import StatsButton from './StatsButton';
import CreateLobbyButton from "./CreateLobbyButton";
import LeaderboardButton from "./LeaderboardButton";
import ProfileButton from "./ProfileButton";
import PopUp from "resources/PopUp";
import LogoutButton from "./LogoutButton";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : "#262632",
  ...theme.typography.body2,
  boxShadow: "none",
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  border: 0
}));

export  function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
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

const Hub2 = () => {

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

export default Hub2;
