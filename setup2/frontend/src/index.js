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
import Account from './pages/account/Account';
import SignUp from './pages/account/SignUp';
import LogIn from './pages/account/LogIn';
import ForgotPwd from './pages/account/ForgotPwd';
import SignUpVerify from './pages/account/SignUpVerify';
import 'jquery';
import 'popper.js'
import 'bootstrap';
import 'slick-carousel';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/learn/about-us' component={AboutUs} />
          <Route exact path='/learn/return-policy' component={ReturnPolicy} />
          <Route exact path='/learn/shipping-info' component={ShippingInfo} />
          <Route exact path='/services/rug-cleaning' component={RugCleaning} />
          <Route exact path='/services/rug-restoration' component={RugRestoration} />
          <Route exact path='/contact-us' component={ContactUs} />
          <Route exact path='/cart' component={Cart} />
          <Route exact path='/shop' component={Shop} />
          <Route exact path='/rug/:id' component={Rug} />
          <Route exact path='/account'>
            {isAuthed()
              ? <Account />
              : <Redirect to='/login' />
            }
          </Route>

          <Route exact path='/account/personal-info'>
            {isAuthed()
              ? <Account path='/account/personal-info' />
              : <Redirect to='/login' />
            }
          </Route>

          <Route exact path='/signup'>
            {isAuthed()
              ? <Redirect to='/account' />
              : <SignUp />
            }
          </Route>

          <Route exact path='/signup-verify/:uidb64/:token' component={SignUpVerify} />

          <Route exact path='/login'>
            {isAuthed()
              ? <Redirect to='/account' />
              : <LogIn />
            }
          </Route>


          <Route exact path='/forgot-password'>
            {!isAuthed()
              ? <ForgotPwd title="Password Reset" stage="inputEmail" />
              : <Error error={404} />
            }
          </Route>

          <Route exact path='/reset-password/:uidb64/:token'
            render={(props) => !isAuthed() ? <ForgotPwd {...props} title="Password Reset" stage="inputNewPwd" /> : <Error error={404} />} />

          <Route exact path='/logout'>
            {isAuthed()
              ? <Redirect to={{
                pathname: '/', props: { logOut: true, alert: { isError: false, msg: 'Successfully Logged Out.' } }
              }} />
              : <Redirect to='/login' />
            }
          </Route>

          <Route exact path='/' component={Home} />
          <Route path=''><Error error={404} /></Route>
        </Switch>
      </Router>
    );
  }
}


const container = document.getElementById("app");
render(<App />, container);