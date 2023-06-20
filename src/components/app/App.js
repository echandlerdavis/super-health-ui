import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReservationPage from '../reservation-page/ReservationPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import Header from '../header/Header';
import Footer from '../footer/Footer';
/**
 * @name App
 * @returns component
 */
const App = () => {
  return (
    <div className="App">
      <div className="Container">
        <BrowserRouter>
          <Header />
          <main>
            <Switch>
              <Route exact path="/" render={() => <ProductPage />} />
              <Route exact path="/reservations" render={() => <ReservationPage />} />
              <Route exact path="/room-type" render={() => <ConfirmationPage />} />
              {/* <Route path="/maintenance" render={() => <MaintenancePage />} />
              <Route exact path="/profilepage" render={() => <ProfilePage user={user} setUser={setUser} />} />
              <Route exact path="/filter" render={() => <FilterComponentExample />} /> */}
            </Switch>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </div>
  );
};
export default App;
