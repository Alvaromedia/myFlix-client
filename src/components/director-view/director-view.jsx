import React from 'react';

import { Container, Row, Card, Button, Col } from 'react-bootstrap';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    const { Name, Bio, Birth, Death } = director;

    return (
      <Container>
        <Card>
          <Card.Body>
            <Card.Title>Director</Card.Title>
            <div className="movie-director mb-4">
              <div className="label">Director: </div>
              <div className="value pl-4">Name: {Name}</div>
              <div className="value pl-4">Bio: {Bio}</div>
              <div className="value pl-4">Birth: {Birth}</div>
              <div className="value pl-4">Death: {Death}</div>
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
