import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username is required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least two characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password is required');
      isReq = false;
    } else if (password.length < 6) {
      setPassword('Password must be at least 6 characters long');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = event => {
    event.preventDefault();
    const isReq = validate();
    if (isReq) {
      //  Send a request to the server for authentication
      axios
        .post('https://mxflix.herokuapp.com/login', {
          Username: username,
          Password: password,
        })
        .then(response => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch(e => {
          console.log('No such user');
        });
    }
  };

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username: </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        {/* Code added here to display validation error */}
        {usernameErr && <p>{usernameErr}</p>}
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password: </Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {/* Code added here to display validation error */}
        {passwordErr && <p>{passwordErr}</p>}
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      {/* <Link to="/register">
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Link> */}
    </Form>
  );
}

// LoginView.proptypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//   }).isRequired,
//   onLoggedIn: PropTypes.func.isRequired,
// };
