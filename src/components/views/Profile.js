import React, {useEffect, useState} from 'react';
import {api} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Profile.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import {Alert, AlertTitle} from "@mui/material";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one and the same file. :)
 */
const FormField = props => {
    return (
        <div className="profile field">
            <label className="profile label">
                {props.label}
            </label>
            <input
                className="profile input"
                placeholder={props.placeholder}
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

const Profile = () => {
    const history = useHistory();
    const {id} = useParams();
    const [username, setUsername] = useState("");
    const [usernamePreview, setUsernamePreview] = useState("");
    const [email, setEmail] = useState("");
    const [emailPreview, setEmailPreview] = useState("");
    const [bio, setBio] = useState("");
    const [bioPreview, setBioPreview] = useState("");
    const [statusInfo, setStatusInfo] = useState(false);
    const [statusError, setErrorStatus] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [timerStart, setTimerStart] = useState(false);
    const [validCredentials, setValidCredentials] = useState(false);


    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api(sessionStorage.getItem('token'), false).get('/users/getUser/' + id);

                setUsernamePreview(response.data['username']);
                setEmailPreview(response.data['email']);
                setBioPreview(response.data['bio']);

            } catch (error) {
                raiseError(error.response.data.message);
            }
        }

        fetchData();
    }, [id]);

    useEffect(() => {
        setTimeout(() => {
            setErrorStatus(false);
        }, 5000);
    }, [timerStart]);

    const raiseError = (message) => {
        setErrorMessage(message);
        setErrorStatus(true);
        setTimerStart(true);
        setTimerStart(false);
    }

    const checkValid = () => {
        // check username for valid length and no empty spaces
        if (username.length > 3 && username.length < 20 && !username.includes(' ')) {
            setValidCredentials(true);
        }
        // check valid email
        else if (email.includes('@') && email.includes('.') && email.length > 5) {
            setValidCredentials(true);
        }
        else if (bio.length > 0) {
            setValidCredentials(true);
        }
        else {
            setValidCredentials(false);
        }
    }

    const requestChange = async () => {
        try {
            // check if user is guest
            const guestUser = sessionStorage.getItem('guestUser');
            console.log(guestUser);
            if (guestUser == "true") {
                // raise error because profile of Guest User cant be changed
                console.log("guest User profile change denied");
            }

            const requestBody = JSON.stringify({username, email, bio});
            await api(sessionStorage.getItem('token'), false).put('/users/update/' + id, requestBody);
            // Login successfully worked --> navigate to the route /hub in the GameRouter
            history.push(`/profile/` + id);
            // alert("Changes saved successfully!")
            sessionStorage.setItem('username', username);
            setStatusInfo(true);
            setValidCredentials(false);


        } catch (error) {
            raiseError(error.response.data.message);
        }
    };

    const gotoPassword = () => {
        history.push({
            pathname: '/password/' + id,
            state: {userId: sessionStorage.getItem("userId")}
        });
    }

    const gotoHub = () => {
        history.push(`/hub`);
    }

    const handleCloseInfo = () => {
        setStatusInfo(false);
    }

    const handleCloseError = () => {
        setErrorStatus(false);
    }

    let content;
    content = (
        <BaseContainer>
            <div className="profile container">
                <div className="profile form">
                    <h1 style={{marginTop: 0}}>Profile Information</h1>
                    <FormField
                        label="Username"
                        value={username}
                        placeholder={usernamePreview}
                        onChange={un => {
                            setUsername(un);
                            checkValid();
                        }}
                    />
                    <FormField
                        label="email"
                        value={email}
                        placeholder={emailPreview}
                        onChange={n => {
                            setEmail(n);
                            checkValid();
                        }}
                    />
                    <FormField
                        label="bio"
                        value={bio}
                        placeholder={bioPreview}
                        onChange={n => {
                            setBio(n);
                            checkValid();
                        }}
                    />
                    <div className="profile button-container">
                        <Button
                            disabled={!validCredentials}
                            width="100%"
                            onClick={() => requestChange()}
                        >
                            save changes
                        </Button>
                    </div>
                    <div className="profile button-container">
                        <Button className="profile button-container"
                                onClick={() => gotoPassword()}
                        >
                            Change password
                        </Button>
                    </div>
                    <div className="profile button-container">
                        <Button className="profile button-container"
                                onClick={() => gotoHub()}
                        >
                            Hub
                        </Button>
                    </div>
                </div>
            </div>
            <div className="profile popup-message">
                {statusInfo && (
                    <Alert severity="info" onClose={handleCloseInfo}>
                        <AlertTitle>Profile information successfully changed</AlertTitle>
                        Your new information is saved - <strong>Now go and play!</strong>
                    </Alert>
                )}
            </div>
            <div className="profile popup-message">
                {statusError && (
                    <Alert severity="error" onClose={handleCloseError}>
                        <AlertTitle>Failed to update</AlertTitle>
                        {errorMessage} - <strong>Try again with a different one!</strong>
                    </Alert>
                )}
            </div>
        </BaseContainer>
    );

    return (content);
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Profile;


