import React, {useEffect, useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Profile.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

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
    const [username, setUsername] = useState(null);
    const [usernamePreview, setUsernamePreview] = useState(null);
    const [email, setEmail] = useState(null);
    const [emailPreview, setEmailPreview] = useState(null);
    const [bio, setBio] = useState(null);
    const [bioPreview, setBioPreview] = useState(null);

    useEffect(() => {
        // effect callbacks are synchronous to prevent race conditions. So we put the async function inside:
        async function fetchData() {
            try {
                const response = await api(sessionStorage.getItem('token'), false).get('/users/getUser/' + id);

                // Get the returned users and update the state.
                setUsernamePreview(response.data['username']);
                setEmailPreview(response.data['email']);
                setBioPreview(response.data['bio']);

                // This is just some data for you to see what is available.
                // Feel free to remove it.
                console.log('request to:', response.request.responseURL);
                console.log('status code:', response.status);
                console.log('status text:', response.statusText);
                console.log('requested data:', response.data);

                // See here to get more data.
                console.log(response);
            } catch (error) {
                console.error(`Something went wrong while fetching the users: \n${handleError(error)}`);
                console.error("Details:", error);
                alert("Something went wrong while fetching the users! See the console for details.");
            }
        }
        fetchData();
    }, [id]);


    const saveChanges = async () => {
        try {
            const requestBody = JSON.stringify({username, email, bio});
            await api(sessionStorage.getItem('token'), false).put('/users/update/' +id, requestBody);
            // Login successfully worked --> navigate to the route /hub in the GameRouter
            history.push(`/profile/`+id);
            alert("Changes saved successfully!")
        } catch (error) {
            alert(`Something went wrong during the editing: \n${handleError(error)}`);
        }
    };

    const gotoPassword = () => {
        history.push({
            pathname: '/password/'+id,
            state: {userId: sessionStorage.getItem("userId")}
        });
    }

    const gotoHub = () => {
        history.push(`/hub`);
    }

    let content;
    content= (
        <BaseContainer>
            <div className="profile container">
                <div className="profile form">
                    <FormField
                        label="Username"
                        value={username}
                        placeholder={usernamePreview}
                        onChange={un => setUsername(un)}
                    />
                    <FormField
                        label="email"
                        value={email}
                        placeholder={emailPreview}
                        onChange={n => setEmail(n)}
                    />
                    <FormField
                        label="bio"
                        value={bio}
                        placeholder={bioPreview}
                        onChange={n => setBio(n)}
                    />
                    <div className="profile button-container">
                        <Button
                            disabled={!email && !username && !bio}
                            width="100%"
                            onClick={() => saveChanges()}
                        >
                            save changes
                        </Button>
                    </div>
                    <div className="profile button-container">
                        <Button className="profile button-container"
                                onClick={() =>gotoPassword()}
                        >
                            Change password
                        </Button>
                    </div>
                    <div className="profile button-container">
                        <Button className="profile button-container"
                                onClick={() => gotoHub()}
                        >
                            Back to hub
                        </Button>
                    </div>
                </div>
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
