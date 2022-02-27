import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: '',
      Password: '',
      Email: '',
      Birthday: '',
      FavouriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

  // onLoggedOut() {
  //   localStorage.clear();
  //   this.setState({
  //     user: null,
  //   }),
  //     window.open('/', '_self');
  // }

  removeFavourite = (event, movie) => {
    event.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(
        `https://mxflix.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(response => {
        console.log(response);
        alert('Movie removed');
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  getUser(token) {
    const user = localStorage.getItem('user');
    axios
      .get(`https://mxflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Bithday: response.data.Birthday,
          FavouriteMovies: response.data.FavouriteMovies,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  updateUser(event) {
    event.preventDefault();
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .put(
        `https://mxflix.herokuapp.com/users/${user}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(response => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem('user', this.state.Username);
        alert('Profile updated');
        window.open(`/users/${user}`, '_self');
      })
      .catch(err => console.log(err));
  }

  onDeleteUser() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .delete(`https://mxflix.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        console.log(response);
        alert('Profile deleted');
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }

  render() {
    const { movies, onBackClick } = this.props;
    const { Username, Password, Email, Birthday, FavouriteMovies } = this.state;

    if (!Username) {
      return null;
    }

    return (
      <Container className="profile-view">
        <Row>
          <Col>
            <Card className="update-profile">
              <Card.Body>
                <Card.Title>Profile</Card.Title>
                <Form
                  className="update-form"
                  onSubmit={e =>
                    this.updateUser(
                      e,
                      this.Username,
                      this.Password,
                      this.Email,
                      this.Birthday
                    )
                  }
                >
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      placeholder="New Username"
                      value={this.state.Username}
                      onChange={e => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      value={this.state.Password}
                      onChange={e => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder="New Email"
                      value={this.state.Email}
                      onChange={e => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birthday"
                      value={this.state.Birthday}
                      onChange={e => this.setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <div className="mt-3">
                    <Button
                      variant="success"
                      type="submit"
                      onClick={this.updateUser}
                    >
                      Update
                    </Button>
                    <Button
                      className="ml-3"
                      variant="secondary"
                      onClick={() => this.onDeleteUser()}
                    >
                      Delete User
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className="backButton">
          <Button
            style={{ width: '100%' }}
            variant="primary"
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </div>

        <Row>
          <Col style={{ margin: '10px' }}>
            <h4>{Username}'s favourite movies</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card.Body>
              {FavouriteMovies.length === 0 && (
                <div className="text-center">This list is empty</div>
              )}
              <Row>
                {FavouriteMovies.length > 0 &&
                  movies.map(movie => {
                    if (
                      movie._id ===
                      FavouriteMovies.find(
                        favouriteM => favouriteM === movie._id
                      )
                    ) {
                      return (
                        <Card key={movie._id}>
                          <Card.Img src={movie.ImagePath} />
                          <Card.Body>
                            <Card.Title>{movie.Title}</Card.Title>
                            <Button
                              variant="primary"
                              value={movie._id}
                              onClick={e => this.removeFavourite(e, movie)}
                            >
                              Remove
                            </Button>
                          </Card.Body>
                        </Card>
                      );
                    }
                  })}
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Container>
    );
  }
}
