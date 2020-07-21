import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Home from './pages/Home';
import 'jquery';
import 'popper.js'
import 'bootstrap';
import 'slick-carousel';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/'>
                        <Home />
                    </Route>
                </Switch>
            </Router>
        );
    }
}


const container = document.getElementById("app");
render(<App />, container);