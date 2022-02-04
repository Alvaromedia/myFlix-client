// Import React and export function to use in the MainView
import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export function NavbarView({ user }) {
  // Sign out method
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  // Token method
  const isAuth = () => {
    if (typeof window == 'undefined') {
      return false;
    }
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  // Unordered list begins
  return (
    <Navbar className="main-nav" sticky="top" bg="dark" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="reponsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {/* Hide the sign up if the token exists */}
            {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
            {isAuth() && (
              <Button
                variant="link"
                onClick={() => {
                  this.onLoggedOut();
                }}
              >
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href="/">Sign In</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign Out</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
