import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconPersonPlus from '../../resources/PersonPlusIcon';
import { Button } from 'components/ui/Button';
import "styles/views/Hub.scss";
import {handleError} from "helpers/api";
import {useHistory} from 'react-router-dom';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [lobbyKey, setLobbyKey] = React.useState("");
  const history = useHistory();
  

  const joinLobby = async () => {
    try{
      console.log(lobbyKey)
      
        sessionStorage.setItem("gameCode", lobbyKey);
        history.push({
          pathname: '/lobby',
          state: {
            gameCode:lobbyKey
          }
        })
    }catch (error) {
      console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
      console.error("Details:", error);
      alert("Something went wrong while fetching the users! See the console for details.");
    }
    }


    const handleChange = event => {
      setLobbyKey(event.target.value);
  
      console.log('value is:', event.target.value);
    };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
<div>
      <Button className="hub hubbutton" onClick={handleClickOpen}>
      <IconPersonPlus></IconPersonPlus>
          <h2>Join a game</h2>
          <p>Join a game of one of your friends.</p>
          </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Enter a code to join an existing lobby.
        </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Lobby Key"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={joinLobby}>Join Lobby</Button>
        </DialogActions>
      </Dialog>
      </div>

  );
}