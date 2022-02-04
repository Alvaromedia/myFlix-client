import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// React COMPONENTS
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { NavbarView } from '../navbar-view/navbar-view';

// React BOOTSTRAP
import { Container, Row, Col, Button } from 'react-bootstrap';

// Import scss file
import './main-view.scss';

export class MainView extends React.Component {
  constructor() {
    super();
    // code executed right when the component is created in the memory
    this.state = {
      movies: [],
      user: null,
    };
  }

  getMovies(token) {
    axios
      .get('https://mxflix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem('user') });
      this.getMovies(accessToken);
    }
  }

  // When a user successfully logs in, this function updates the 'user' property in state to that particular user

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({ user: authData.user.Username });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // FIXME:
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({ user: null });
  }

  render() {
    const { movies, user } = this.state;

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed
     as a prop to the LoginView */

    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user) {
                  return <Redirect to="/login" />;
                }

                return (
                  <>
                    {movies.map(movie => (
                      <Col md={3} key={movie._id}>
                        <MovieCard movie={movie} onMovieClick={() => {}} />
                      </Col>
                    ))}
                  </>
                );
              }}
            />
            <Route
              path="/login"
              render={() => {
                if (user) {
                  return <Redirect to="/" />;
                }

                return <LoginView onLoggedIn={data => this.onLoggedIn(data)} />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) {
                  return <Redirect to="/" />;
                }

                return (
                  <Col>
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:title"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  );
                }

                if (movies.length === 0) {
                  return <div className="main-view" />;
                }

                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find(m => m._id === match.params.title)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/profile"
              render={({ history }) => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  );
                }

                return (
                  <Col md={8}>
                    <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                  </Col>
                );
              }}
            />
            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  );
                }

                if (movies.length === 0) {
                  return <div className="main-view" />;
                }

                return (
                  <Col md={8}>
                    <GenreView
                      genre={movies.find(m => m.Genre.Name === match.params.name).Genre}
                      onBackClick={() => history.goBack()}
                      movies={movies.filter(movie => movie.Genre.Name === match.params.name)}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user) {
                  return (
                    <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>
                  );
                }

                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col md={8}>
                    <DirectorView
                      director={movies.find(m => m.Director.Name === match.params.name).Director}
                      onBackClick={() => history.goBack()}
                      movies={movies.filter(movie => movie.Director.Name === match.params.name)}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}
