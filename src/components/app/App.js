import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import Header from '../header/Header';
import Footer from '../footer/Footer';
// import HomePage from '../home/HomePage';
/**
 * @name App
 * @returns component
 */
const App = () => (
  <div className="App">
    <div className="Container">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" render={() => <ProductPage />} />
          <Route exact path="/checkout" render={() => <CheckoutPage />} />
          {/* <Route exact path="/home" render={() => <div />} /> */}
          <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
        </Switch>

        <Footer />

      </BrowserRouter>
    </div>
  </div>
);

export default App;
