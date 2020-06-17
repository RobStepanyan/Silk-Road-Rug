import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
  render() {
    return (
        <div>
            <h1>React Django Docker Setup 2</h1>
            <a href="http://github.com/RobStepanyan/Docker-React-Django-Setup-2">Github</a>
        </div>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);