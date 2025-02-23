import React from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { isAuthed } from './other/functions';
import { apiURLs } from './other/variables';
import Home from './pages/Home';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/learn/AboutUs';
import ReturnPolicy from './pages/learn/ReturnPolicy';
import ShippingInfo from './pages/learn/ShippingInfo';
import RugCleaning from './pages/services/RugCleaning';
import RugRestoration from './pages/services/RugRestoration';
import Cart from './pages/shop/Cart';
import Shop from './pages/shop/Shop';
import ShopRoot from './pages/shop/ShopRoot';
import Rug from './pages/shop/Rug';
import Checkout from './pages/shop/Checkout';
import CheckoutSuccess from './pages/shop/CheckoutSuccess';
import CheckoutCancel from './pages/shop/CheckoutCancel';
import Error from './pages/Error';
import Account from './pages/account/Account';
import SignUp from './pages/account/SignUp';
import LogIn from './pages/account/LogIn';
import ForgotPwd from './pages/account/ForgotPwd';
import SignUpVerify from './pages/account/SignUpVerify';
import AccountUpdateVerify from './pages/account/AccountUpdateVerify';
import axios from 'axios';
import 'bootstrap';
// CSS & Fonts
import './css/main.min.css';

axios.defaults.withCredentials = true

function App() {
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
        <Route exact path='/shop' component={ShopRoot} />
        <Route exact path='/shop/:rugGroup' component={Shop} />
        <Route exact path='/checkout' component={Checkout} />
        <Route exact path='/checkout/success/:checkout' component={CheckoutSuccess} />
        <Route exact path='/checkout/cancel/:checkout' component={CheckoutCancel} />
        <Route exact path='/rug/:id' component={Rug} />
        <Route exact path='/account'>
          {isAuthed()
            ? <Account />
            : <Redirect to='/login' />
          }
        </Route>

        <Route exact path='/account/personal-info'>
          {isAuthed()
            ? <Account path='/personal-info' />
            : <Redirect to='/login' />
          }
        </Route>

        <Route exact path='/account/update/verify/:midb64'
          render={props => {
            return <AccountUpdateVerify {...props} apiURL={apiURLs.user.updateVerify}
              text="Your personal info is changed. Now you can use your account." />
          }} />

        <Route exact path='/account/change-pwd/:midb64'
          render={props => {
            return <AccountUpdateVerify {...props} apiURL={apiURLs.user.changePwdVerify}
              text="Your password is changed. Now you can use your account." />
          }} />

        <Route exact path='/account/security'>
          {isAuthed()
            ? <Account path='/security' />
            : <Redirect to='/login' />
          }
        </Route>

        <Route exact path='/account/addresses'>
          {isAuthed()
            ? <Account path='/addresses' />
            : <Redirect to='/login' />
          }
        </Route>

        <Route exact path='/account/addresses/add'>
          {isAuthed()
            ? <Account path='/addresses/add' parentHref="/account/addresses" />
            : <Redirect to='/login' />
          }
        </Route>

        <Route exact path='/account/addresses/edit/:id' render={props => {
          return isAuthed()
            ? <Account {...props} path='/addresses/edit' parentHref="/account/addresses" />
            : <Redirect to='/login' />
        }}
        />

        <Route exact path='/account/preferences'>
          {isAuthed()
            ? <Account path='/preferences' />
            : <Redirect to='/login' />
          }
        </Route>

        <Route exact path='/account/orders'>
          {isAuthed()
            ? <Account path='/orders' />
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
    </Router >
  );
}


const container = document.getElementById("root");
render(<App />, container);