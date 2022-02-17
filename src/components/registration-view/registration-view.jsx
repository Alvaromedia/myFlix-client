import React, { useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [values, setValues] = useState({
    usernameErr: '',
    passwordErr: '',
    emailErr: '',
  });

  // Validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: 'Username is required' });
      isReq = false;
    } else if (username.length < 2) {
      setValues({
        ...values,
        usernameErr: 'Username must be at least 6 characters',
      });
      isReq = false;
    }

    if (!password) {
      setValues({ ...values, passwordErr: 'Password is required' });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: 'Pasword must be 6 characters long',
      });
      isReq = false;
    }

    if (!email) {
      setValues({ ...values, emailErr: 'Email required' });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({ ...values, emailErr: 'Email is invalid' });
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = event => {
    event.preventDefault();
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
          alert('Registration successful, please login');
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(error => {
          console.error(error);
          alert('Unable to register');
        });
    }
  };

  return (
    <Row className="mt-5">
      <Col md={12}>
        <Form>
          <h3>Sign up</h3>
          <p></p>
          <Form.Group controlId="formUsername" className="reg-form-inputs">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />{' '}
            {values.usernameErr && <p>{values.usernameErr}</p>}
          </Form.Group>

          <Form.Group constrolId="formPassword" className="reg-form-inputs">
            <Form.Label>Password: </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />{' '}
            {values.passwordErr && <p>{values.passwordErr}</p>}
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Email: </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />{' '}
            {values.emailErr && <p>{values.emailErr}</p>}
          </Form.Group>

          <Form.Group controlId="updateBirthday" className="reg-form-inputs">
            <Form.Label>Birthday: </Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={e => {
                setBirthday(e.target.value);
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Register
          </Button>
          <p></p>
          <p>
            Already registered <Link to={'/'}>Sign In</Link> here{' '}
          </p>
        </Form>
      </Col>
    </Row>
  );
}

// RegistrationView.propTypes = {
//   register: PropTypes.shape({
//     username: PropTypes.string.isRequired,
//     password: PropTypes.string.isRequired,
//     email: PropTypes.string.isRequired,
//   }),
// };
