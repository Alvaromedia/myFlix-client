import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

import MainView from './components/main-view/main-view';

// Import statements to indicate that I need to bundle './index.scss'
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

// Main componenet (will eventually use all others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />
        </Container>
      </Provider>
    );
  }
}

// Finds the route of my app
const container = document.getElementsByClassName('app-container')[0];

// Tell React to render my app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
