import React, {useEffect, useState} from 'react';
import {api} from 'helpers/api';
import User from 'models/User';
import {useHistory, Link} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {Alert, AlertTitle} from "@mui/material";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = props => {
    return (
        <div className="register field">
            <label className="register label">
                {props.label}
            </label>
            <input
                style={{marginBottom: 0}}
                className="register input"
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

const Register = () => {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alertStatus, setAlertStatus] = useState(false);
    const [timerStart, setTimerStart] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [validCredentials, setValidCredentials] = useState(false);

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && password && username && email) {
          registerAccount();
        }
      };

    const checkValid = () => {
        // check username for valid length and no empty spaces
        if (username.length < 3 || username.length > 20 || username.includes(' ')) {
            setValidCredentials(false);
        }
        // check valid email
        else if (!email.includes('@') || !email.includes('.') || email.length < 5) {
            setValidCredentials(false);
        }
        // check valid password
        else if (password.length < 4 || password.length > 20) {
            setValidCredentials(false);
        }
        else {
            setValidCredentials(true);
        }
    }

    const registerAccount = async () => {
        try {
            const requestBody = JSON.stringify({username, email, password});
            const response = await api(false, false).post('/users/create', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            sessionStorage.setItem('token', user.token);
            sessionStorage.setItem('id', user.id);
            sessionStorage.setItem('username', user.username);



            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/hub`);
        } catch (error) {
            raiseError(error.response.data.message);
        }
    };
    
    const handleClose = () => {
        setAlertStatus(false);
    }

    useEffect(() => {
        setTimeout(() => {
            setAlertStatus(false);
        }, 5000);
    }, [timerStart]);

    const raiseError = (error) => {
        setAlertStatus(true);
        setErrorMessage(error)
        setTimerStart(true);
        setTimerStart(false);
    }

    return (
        <BaseContainer>
            <div className="register container">
                <div className="register form">
                    <h1 style={{marginTop: 0}}>Register Form</h1>
                    <FormField
                        label="Username"
                        value={username}
                        onChange={un => {
                            setUsername(un);
                            checkValid();
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <p style={{marginTop: 0, fontSize: 12}}>
                        Username must be minimum 3 characters long and not contain any spaces.
                    </p>
                    <FormField
                        label="email"
                        value={email}
                        onChange={un => {
                            setEmail(un);
                            checkValid();
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <p style={{marginTop: 0, fontSize: 12}}>
                        Must be a valid email address.
                    </p>

                    <FormField
                        label="Password"
                        value={password}
                        type="password"
                        onChange={n => {
                            setPassword(n);
                            checkValid();
                        }}
                        onKeyDown={handleKeyDown}
                    />
                    <p style={{marginTop: 0, fontSize: 12}}>
                        Password must be minimum 5 characters long.
                    </p>
                    
                    <div className="register button-container">
                        <Button
                            disabled={!validCredentials}
                            width="100%"
                            onClick={() => registerAccount()}
                        >
                            Register
                        </Button>
                    </div>
                    
                    <p>Switch to Login.</p>
                    <Link to="/login">
                        <Button
                            width="100%"
                        >
                            Go to login window
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="register popup-message">
                {alertStatus && (
                    <Alert severity="error"
                           onClose={handleClose}>
                        <AlertTitle>Registration Failed</AlertTitle>
                        {errorMessage} - <strong>try again with a different one!</strong>
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
export default Register;
