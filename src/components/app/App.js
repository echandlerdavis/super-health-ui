import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PatientsPage from '../patients-page/PatientsPage';
import AddReservation from '../add-reservation-page/AddReservation';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import AddRoomType from '../add-room-type-page/AddRoomType';
import HomePage from '../homepage/Homepage';
import NotFound from '../not-found-page/NotFound';
import ViewPatientPage from '../view-patient-page/ViewPatientPage';
import ViewEncounterPage from '../view-encounter-page/ViewEncounterPage';

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
            <Route exact path="/patients" render={() => <PatientsPage />} />
            <Route exact path="/patients/create" render={() => <AddReservation />} />
            <Route exact path="/patients/:patientId/encounters/:id" render={() => <ViewEncounterPage />} />
            <Route exact path="/patients/:id" render={() => <ViewPatientPage />} />
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
