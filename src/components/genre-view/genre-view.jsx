import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Card, Button, Col } from 'react-bootstrap';

export default class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Genre</Card.Title>
            <div className="movie-genre">
              <span className="label">Name: </span>
              <span className="value">{genre.Name}</span>
            </div>
            <div className="genre-description">
              <span className="label">Description: </span>
              <span className="value">{genre.Description}</span>
            </div>
            <Link to="/">
              <Button
                variant="primary"
                onClick={() => {
                  onBackClick();
                }}
              >
                Go back
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
