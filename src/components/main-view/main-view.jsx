import React from 'react';
import axios from 'axios';

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view';

export class MainView extends React.Component {
  constructor() {
    super();
    // code executed right when the component is created in the memory
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    // code executed right after the component is added to the DOM
    axios
      .get('https://mxflix.herokuapp.com/movies')
      .then(response => {
        this.setState({ movies: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  /* When a movie is clicked this function is invoked and updates the state of the 'selectedMovie' 
  property to that movie */

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onRegistration(register) {
    this.setState({ register });
  }

  // When a user successfully logs in, this function updates the 'user' property in state to that particular user

  onLoggedIn(user) {
    this.setState({ user });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    if (!register) {
      return <RegistrationView onRegistration={register => this.onRegistration(register)} />;
    }

    /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are passed
     as a prop to the LoginView */
    if (!user) {
      return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    }

    // Before the movies have been loaded
    if (movies.length === 0) {
      return <div className="main-view" />;
    }

    return (
      <div className="main-view">
        {/* If the state of 'selectedMovie' is not null, that selected movie will be returned otherwise, 
        all movies will be returned */}
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={newSelectedMovie => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map(movie => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={newSelectedMovie => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
