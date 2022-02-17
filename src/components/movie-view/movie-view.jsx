import React from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  addFavourite = (event, movie) => {
    event.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    axios
      .post(
        `https://mxflix.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(response => {
        console.log(response);
        alert('Movie added to favourites');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view mt-4">
        <div className="movie-poster mb-4">
          <img src={movie.ImagePath} />
        </div>

        <div className="movie-title mb-4">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>

        <div className="movie-description mb-4">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>

        <div className="movie-director mb-4">
          <div className="label">Director: </div>
          <div className="value pl-4">Name: {movie.Director.Name}</div>
          <div className="value pl-4">Bio: {movie.Director.Bio}</div>
          <div className="value pl-4">Birth: {movie.Director.Birth}</div>
          <div className="value pl-4">Death: {movie.Director.Death}</div>
        </div>

        <div className="movie-genre mb-4">
          <div className="label">Genre: </div>
          <div className="value pl-4">{movie.Genre.Name}</div>
          <div className="value pl-4">{movie.Genre.Description}</div>
        </div>

        <Button
          variant="secondary"
          value={movie._id}
          onClick={e => this.addFavourite(e, movie)}
        >
          Add to favourites
        </Button>

        <Button
          variant="primary"
          onClick={() => {
            onBackClick();
          }}
        >
          Go back
        </Button>
      </div>
    );
  }
}
