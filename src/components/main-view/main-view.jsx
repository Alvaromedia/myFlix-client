import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// #0
import { setMovies, setUser } from '../../actions/actions';

// We haven't written this one yet
import MoviesList from '../movies-list/movies-list';

/* 
  #1 The rest of components import statements but without the MovieCard's 
  because it will be imported and used in the MoviesList component rather
  than in here. 
*/

import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { NavbarView } from '../navbar-view/navbar-view';

import { Container, Row, Col } from 'react-bootstrap';

import './main-view.scss';

// #2 'export' keyword removed from here
class MainView extends React.Component {
  constructor() {
    super();
    // #3 movies state removed from here
    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get('https://mxflix.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => {
        // #4
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // When a user successfully logs in, this function updates the 'user' property in state to that particular user

  onLoggedIn(authData) {
    // console.log(authData);
    this.props.setUser(authData.user.Username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    // #5 movies is extracted from this.props rather than from this.state
    let { movies } = this.props;
    let { user } = this.props;

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
                // #6
                return <MoviesList movies={movies} />;
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
              render={({ history, match }) => {
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
              render={({ history, match }) => {
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

// #7
let mapStateToProps = state => {
  return { movies: state.movies, user: state.user };
};

// #8
export default connect(mapStateToProps, { setMovies, setUser })(MainView);

/* Below is the connect function’s API:
function connect(mapStateToProps?, mapDispatchToProps?, mergeProps?, options?) */
