import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Declare hook for each input field
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [birthdayErr, setBirthdayErr] = useState('');

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username is required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameErr('Username must be at least 3 characters long');
    }
    if (!password) {
      setPasswordErr('Password is required');
      isReq = false;
    } else if (password.length < 6) {
      setPasswordErr('Password must be longer than 6 characters');
    }
    if (!email) {
      setEmailErr('Email is required');
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setEmailErr('Must be a valid email');
    }
    if (!birthday) {
      setBirthdayErr('Birthday is required');
      isReq = false;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      console.log(username, password, email, birthday);
      axios
        .post('https://mxflix.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(error => {
          console.log('Error registering the user');
        });
    }
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Password: </Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Email: </Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Birthday: </Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={e => {
            setBirthday(e.target.value);
          }}
        />
      </Form.Group>

      <Button type="submit" onClick={handleSubmit}>
        Register
      </Button>
    </Form>
  );
}

// RegistrationView.propTypes = {
//   user: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//     birthday: PropTypes.string.isRequired,
//   }).isRequired,
//   onRegistration: PropTypes.func.isRequired,
// };
