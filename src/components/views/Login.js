import React, {useEffect, useState} from 'react';
import {api} from 'helpers/api';
import User from 'models/User';
import {Link, useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {Alert, AlertTitle, Box} from "@mui/material";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
    return (
        <div className="login field">
            <label className="login label">
                {props.label}
            </label>
            <input
                className="login input"
                placeholder="enter here.."
                value={props.value}
                type={props.type}
                onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const Login = () => {
    const history = useHistory();
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);
    const [alertStatus, setAlertStatus] = useState(false);
    const [timerStart, setTimerStart] = useState(false);

    const doLogin = async () => {
        try {
            const requestBody = JSON.stringify({username, password});
            const response = await api(false, false).post('/users/login', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            sessionStorage.setItem('token', user.token);
            sessionStorage.setItem('id', user.id);
            sessionStorage.setItem('guestUser', false);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/hub`);
        } catch (error) {
            setAlertStatus(true);
            setTimerStart(true);
            setTimerStart(false);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setAlertStatus(false);
        }, 5000);
    }, [timerStart]);

    const handleClose = () => {
        setAlertStatus(false);
    }
    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && password && username) {
          doLogin();
        }
      };
    
    const demoLogin = async () => {
        try {
            /* 
            const demoUsername = generateUsername()
            const demoEmail = Math.floor(1000000 + Math.random() * 9000000);
            const requestBody = JSON.stringify({username: demoUsername, email: demoEmail, password: demoPassword});
            const response = await api(false,false).post('/users/create', requestBody); 
            */

            const r = await api(false,false).post('/users/login/guestUser');
            console.log(r);
            
            const user = new User(r.data);
            sessionStorage.setItem('token', user.token);
            sessionStorage.setItem('id', user.id);
            sessionStorage.setItem('guestUser', true);

            history.push(`/hub`);
        } catch (error) {
            setAlertStatus(true);
            setTimerStart(true);
            setTimerStart(false);
        }
    }
    return (
        <BaseContainer>
            <div className="login container">
                <div className="login form">
                    <h1 style={{marginTop: 0}}>Login Form</h1>
                    <FormField
                        label="Username"
                        value={username}
                        onChange={un => setUsername(un)}
                        onKeyDown={handleKeyDown}
                    />
                    <FormField
                        label="Password"
                        value={password}
                        type="password"
                        onChange={n => setPassword(n)}
                        onKeyDown={handleKeyDown}
                    />
                    <div className="login button-container">
                        <Button
                            disabled={!username || !password}
                            width="100%"
                            onClick={() => doLogin()}
                        >
                            Login
                        </Button>
                    </div>
                    <p>Create an Account</p>
                    <Link to={"/register"}>
                        <Button
                            width="100%"
                        >
                            Go to register window
                        </Button>
                    </Link>
                    <Box sx={{paddingTop: "10px"}}>
                    <Button
                        width="100%"
                        style={{backgroundColor: "red"}}
                        onClick={() => demoLogin()}
                        >
                            Demo Login
                        </Button>
                        </Box>
                </div>
            </div>
            <div className="login popup-message" >
            {alertStatus && (
                <Alert severity="error" onClose={handleClose} >
                    <AlertTitle>Login failed</AlertTitle>
                    You have entered an invalid username or password - <strong>try again!</strong>
                </Alert>
            )}
            </div>
        </BaseContainer>

    );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Login;
