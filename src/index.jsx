import React from "react";
import ReactDOM from "react-dom";
import { MainView } from "./components/main-view/main-view";

// Import statements to indicate that I need to bundle './index.scss'
import "./index.scss";

// Main componenet (will eventually use all others)
class MyFlixApplication extends React.Component {
  render() {
    return <MainView />;
  }
}

// Finds the route of my app
const container = document.getElementsByClassName("app-container")[0];

// Tells React to render my app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);
