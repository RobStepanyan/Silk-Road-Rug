import React, { Component } from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/learn/AboutUs';
import ReturnPolicy from './pages/learn/ReturnPolicy';
import ShippingInfo from './pages/learn/ShippingInfo';
import 'jquery';
import 'popper.js'
import 'bootstrap';
import 'slick-carousel';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/learn/about-us' component={AboutUs} />
                    <Route path='/learn/return-policy' component={ReturnPolicy} />
                    <Route path='/learn/shipping-info' component={ShippingInfo} />
                    <Route path='/contact-us' component={ContactUs} />
                    <Route path='/' component={Home} />
                </Switch>
            </Router>
        );
    }
}


const container = document.getElementById("app");
render(<App />, container);