import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import axios from "axios";
import {getDomain} from "../../helpers/getDomain";
import {Alert, AlertTitle} from "@mui/material";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one and the same file. :)
 */
const FormField = props => {
    return (
        <div className="register field">
            <label className="register label">
                {props.label}
            </label>
            <input
                type="password"
                className="register input"
                placeholder="***********"
                value={props.value}
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

const Password = () => {
    const history = useHistory();
    const {id} = useParams();
    const [oldPassword, setOldPassword] = useState(null);
    const [password, setPassword] = useState(null);
    const [newRepeatPassword, setNewRepeatPassword] = useState(null);
    const [errorStatus, setErrorStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [timerStart, setTimerStart] = useState(false);



    const saveChanges = async () => {
        if (password !== newRepeatPassword) {
            setErrorMessage("Passwords do not match!");
            setErrorStatus(true);
        } else {
            try {
                const requestBody = JSON.stringify({password});
                const headers = {};
                headers['token'] = sessionStorage.getItem('token');
                headers['password'] = oldPassword;
                headers['Content-Type'] = 'application/json';
                headers['Access-Control-Allow-Origin'] = '*';
                const apiPassword = axios.create({baseURL: getDomain(), headers})
                await apiPassword.put('/users/update/' + id, requestBody);
                // Login successfully worked --> navigate to the route /game in the GameRouter
                history.push(`/hub`);
            } catch (error) {
                setErrorMessage(error.response.data.message);
                setErrorStatus(true);
                setTimerStart(true);
                setTimerStart(false);
            }
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setErrorStatus(false);
        }, 5000);
    }, [timerStart]);

    const goToProfile = () => {
        history.push(`/profile/` + id);
    }

    const handleClose = () => {
        setErrorStatus(false);
    }

    return (
        <BaseContainer>
            <div className="register container">
                <div className="register form">
                    <h1 style={{marginTop: 0}}>Change Password</h1>
                    <FormField
                        label="old password"
                        value={oldPassword}
                        onChange={n => setOldPassword(n)}
                    />
                    <FormField
                        label="new password"
                        value={password}
                        onChange={n => setPassword(n)}
                    />
                    <FormField
                        label="repeat new password"
                        value={newRepeatPassword}
                        onChange={n => setNewRepeatPassword(n)}
                    />
                    <div className="register button-container">
                        <Button
                            disabled={!oldPassword && !password}
                            width="100%"
                            onClick={() => saveChanges()}
                        >
                            save changes
                        </Button>
                    </div>
                    <div className="register button-container">
                        <Button
                            width="100%"
                            onClick={() => goToProfile()}
                        >
                            Back to profile view
                        </Button>
                    </div>
                </div>
            </div>
            <div className="profile popup-message">
                {errorStatus && (
                    <Alert severity="error" onClose={handleClose}>
                        <AlertTitle>Failed to change</AlertTitle>
                        {errorMessage} - <strong>try again!</strong>
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
export default Password;
