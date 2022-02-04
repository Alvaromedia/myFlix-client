import React from 'react';

// React bootstrap
import { Col, Row, Card, Button } from 'react-bootstrap';

import './movie-view.scss';

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }

  render() {
    const { movie, onBackClick } = this.props;
    const { Name, Bio, Birth, Death } = movie.Director;

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
          <div className="value pl-4">Name: {Name}</div>
          <div className="value pl-4">Bio: {Bio}</div>
          <div className="value pl-4">Birth: {Birth}</div>
          <div className="value pl-4">Death: {Death}</div>
        </div>

        <div className="movie-genre mb-4">
          <div className="label">Genre: </div>
          <div className="value pl-4">{movie.Genre.Name}</div>
          <div className="value pl-4">{movie.Genre.Description}</div>
        </div>

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
