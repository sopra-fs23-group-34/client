import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import {useHistory, useParams} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Register.scss';
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
  const [newPassword, setNewPassword] = useState(null);
  const [newRepeatPassword, setNewRepeatPassword] = useState(null);



  const saveChanges = async () => {
    if (newPassword !== newRepeatPassword) {
      alert("The new passwords do not match!");
    }
    else {
      try {
        const requestBody = JSON.stringify({oldPassword, newPassword});
        await api(sessionStorage.getItem('token'), false).put('/users/update/' + id, requestBody);
        // Login successfully worked --> navigate to the route /game in the GameRouter
        history.push(`/hub`);
      } catch (error) {
        alert(`Something went wrong during the editing: \n${handleError(error)}`);
      }
    }
  };

  const goToProfile = () => {
    history.push(`/profile/`+id);
  }

  return (
    <BaseContainer>
      <div className="register container">
        <div className="register form">
          <FormField
            label="old password"
            value={oldPassword}
            onChange={n => setOldPassword(n)}
          />
          <FormField
              label="new password"
              value={newPassword}
              onChange={n => setNewPassword(n)}
          />
          <FormField
              label="repeat new password"
              value={newRepeatPassword}
              onChange={n => setNewRepeatPassword(n)}
          />
          <div className="register button-container">
            <Button
              disabled={!oldPassword && !newPassword}
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
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the withRouter.
 * withRouter will pass updated match, location, and history props to the wrapped component whenever it renders.
 */
export default Password;
