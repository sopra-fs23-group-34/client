import React, {useState} from 'react';
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
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [alertStatus, setAlertStatus] = useState(false);

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && password && username && email) {
          registerAccount();
        }
      };
    const registerAccount = async () => {
        try {
            const requestBody = JSON.stringify({username, email, password});
            const response = await api(false, false).post('/users/create', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            sessionStorage.setItem('token', user.token);
            sessionStorage.setItem('id', user.id);


            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/hub`);
        } catch (error) {
            setAlertStatus(true);
        }
    };
    
    const handleClose = () => {
        setAlertStatus(false);
    }
    

    return (
        <BaseContainer>
            <div className="register container">
                <div className="register form">
                    <h1 style={{marginTop: 0}}>Register Form</h1>
                    <FormField
                        label="Username"
                        value={username}
                        onChange={un => setUsername(un)}
                        onKeyDown={handleKeyDown}
                    />
                    <FormField
                        label="email"
                        value={email}
                        onChange={un => setEmail(un)}
                        onKeyDown={handleKeyDown}
                    />
                    <FormField
                        label="Password"
                        value={password}
                        type="password"
                        onChange={n => setPassword(n)}
                        onKeyDown={handleKeyDown}
                    />
                    
                    <div className="register button-container">
                        <Button
                            disabled={!username || !password}
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
                        Username is already taken - <strong>try again with a different one!</strong>
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
