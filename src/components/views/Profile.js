import React, {useState} from 'react';
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
    const [email, setEmail] = useState(null);
    const [bio, setBio] = useState(null);



    const saveChanges = async () => {
        try {
            const requestBody = JSON.stringify({username, email, bio});
            await api.put('/users/update' +id, requestBody);
// Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/hub`);
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

    return (
        <BaseContainer>
            <div className="profile container">
                <div className="profile form">
                    <FormField
                        label="Username"
                        value={username}
                        placeholder={sessionStorage.getItem("username")}
                        onChange={un => setUsername(un)}
                    />
                    <FormField
                        label="email"
                        value={email}
                        placeholder={sessionStorage.getItem("email")}
                        onChange={n => setEmail(n)}
                    />
                    <FormField
                        label="bio"
                        value={bio}
                        placeholder={sessionStorage.getItem("bio")}
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
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Profile;
