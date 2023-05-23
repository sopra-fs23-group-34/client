import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconPersonPlus from "../../resources/PersonPlusIcon";
import { Button } from "components/ui/Button";
import "styles/views/Hub.scss";
import { api } from "helpers/api";
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import User from "models/User";

export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [lobbyKey, setLobbyKey] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const history = useHistory();
  const [alertStatus, setAlertStatus] = React.useState(false);
  const [timerStart, setTimerStart] = React.useState(false);

  const raiseError = (error) => {
    setAlertStatus(true);
    setErrorMessage(error)
    setTimerStart(true);
    setTimerStart(false);
}
  useEffect(() => {
    const handleKeyDown = async(event) => {
        if (event.keyCode === 13 && (lobbyKey)) {
              await guestLogin();
        }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
        document.removeEventListener("keydown", handleKeyDown);
    };
}, [lobbyKey]);


  const guestLogin = async () => {
    try {
      const r = await api(false, false).post('/users/login/guestUser');

      const user = new User(r.data);
      sessionStorage.setItem('token', user.token);
      sessionStorage.setItem('id', user.id);
      sessionStorage.setItem('guestUser', true);
      sessionStorage.setItem('username', user.username);


      history.push(`/hub`);
  } catch (error) {
      raiseError(error.response.data.message)
  }
  };

  const handleChange = (event) => {
    setLobbyKey(event.target.value);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMessage("");
    setOpen(false);
  };

  return (
    <div>
      <Button className="login-button guest" onClick={handleClickOpen}>
        Guest login
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Guest Account?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Guest Accounts are one time use and don't track any statistics.
          </DialogContentText>
          <Typography variant="body1" color="error">
            {errorMessage}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={guestLogin}>Create Guest Account</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
