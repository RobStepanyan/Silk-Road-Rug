import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { isAuthed } from './other/functions';
import Home from './pages/Home';
import Cart from './pages/Cart';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/learn/AboutUs';
import ReturnPolicy from './pages/learn/ReturnPolicy';
import ShippingInfo from './pages/learn/ShippingInfo';
import RugCleaning from './pages/services/RugCleaning';
import RugRestoration from './pages/services/RugRestoration';
import Shop from './pages/shop/Shop';
import Rug from './pages/shop/Rug';
import Error from './pages/Error';
import SignUp from './pages/account/SignUp';
import LogIn from './pages/account/LogIn';
import SignUpVerify from './pages/account/SignUpVerify';
import 'jquery';
import 'popper.js'
import 'bootstrap';
import 'slick-carousel';
import Cookies from 'universal-cookie';

class App extends Component {
  render() {
    const cookies = new Cookies()
    return (
      <Router>
        <Switch>
          <Route path='/learn/about-us' component={AboutUs} />
          <Route path='/learn/return-policy' component={ReturnPolicy} />
          <Route path='/learn/shipping-info' component={ShippingInfo} />
          <Route path='/services/rug-cleaning' component={RugCleaning} />
          <Route path='/services/rug-restoration' component={RugRestoration} />
          <Route path='/contact-us' component={ContactUs} />
          <Route path='/cart' component={Cart} />
          <Route path='/shop' component={Shop} />
          <Route path='/rug/:id' component={Rug} />
          <Route path='/account'>
            {isAuthed()
              ? <h1>Logged in</h1>
              : <Redirect to='/login' />
            }
          </Route>

          <Route path='/signup'>
            {isAuthed()
              ? <Redirect to='/account' />
              : <SignUp />
            }
          </Route>

          <Route path='/signup-verify/:uidb64/:token' component={SignUpVerify} />

          <Route path='/login'>
            {isAuthed()
              ? <Redirect to='/account' />
              : <LogIn />
            }
          </Route>

          <Route path='/logout'>
            {isAuthed()
              ? <Redirect to={{
                pathname: '/', props: { logOut: true, alert: { isError: false, msg: 'Successfully Logged Out.' } }
              }} />
              : <Redirect to='/login' />
            }
          </Route>

          <Route path='/' exact component={Home} />
          <Route path=''><Error error={404} /></Route>
        </Switch>
      </Router>
    );
  }
}


const container = document.getElementById("app");
render(<App />, container);