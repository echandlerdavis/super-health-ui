import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PatientPage from '../patients-page/PatientsPage';
import AddReservation from '../add-reservation-page/AddReservation';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import RoomTypePage from '../room-type-page/RoomTypePage';
import AddRoomType from '../add-room-type-page/AddRoomType';
import HomePage from '../homepage/Homepage';
import NotFound from '../not-found-page/NotFound';

/**
 * @name App
 * @returns component
 */
const App = () => (
  <div className="App">
    <div className="Container">
      <BrowserRouter>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" render={() => <HomePage />} />
            <Route exact path="/patients" render={() => <PatientPage />} />
            <Route exact path="/patients/create" render={() => <AddReservation />} />
            <Route exact path="/patients/edit/:patientId" render={() => <AddReservation />} />
            <Route exact path="/patient/:id" render={() => <RoomTypePage />} />
            <Route exact path="/encounters/create" render={() => <AddRoomType />} />
            <Route exact path="/encounters/edit/:encounterId" render={() => <AddRoomType />} />
            <Route path="*" render={() => <NotFound />} />
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  </div>
);
export default App;
