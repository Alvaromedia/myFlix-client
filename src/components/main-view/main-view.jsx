import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { NavbarView } from '../navbar-view/navbar-view';

import { Container, Row, Col } from 'react-bootstrap';

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

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({ user: localStorage.getItem('user') });
      this.getMovies(accessToken);
    }
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

  // When a user successfully logs in, this function updates the 'user' property in state to that particular user

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({ user: authData.user.Username });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <NavbarView user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed as a prop to the LoginView */
                if (!user) {
                  return (
                    <Col>
                      <LoginView
                        movies={movies}
                        onLoggedIn={user => this.onLoggedIn(user)}
                      />
                    </Col>
                  );
                }
                // Before the movies have been loaded
                if (movies.length === 0) {
                  return <div className="main-view" />;
                }

                return movies.map(movie => (
                  <Col md={3} key={movie._id}>
                    <MovieCard movie={movie} />
                  </Col>
                ));
              }}
            />

            <Route
              path="/register"
              render={() => {
                if (user) {
                  return <Redirect to="/" />;
                }

                return (
                  <Col lg={8} md={8}>
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
                    <LoginView
                      movies={movies}
                      onLoggedIn={user => this.onLoggedIn(user)}
                    />
                  );
                }

                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find(
                        movie => movie._id === match.params.title
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match }) => {
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          movie => movie.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:genre"
              render={({ match }) => {
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      genre={movies.find(
                        movie => movie.Genre.Name === match.params.genre
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/users/:Username"
              render={({ history, match }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <ProfileView
                    history={history}
                    movies={movies}
                    user={user === match.params.Username}
                    onBackClick={() => history.goBack()}
                  />
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}
