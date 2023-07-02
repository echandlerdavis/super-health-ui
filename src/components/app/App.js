import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PatientsPage from '../patients-page/PatientsPage';
import PatientForm from '../patient-form/PatientForm';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import HomePage from '../homepage/Homepage';
import NotFound from '../not-found-page/NotFound';
import ViewPatientPage from '../view-patient-page/ViewPatientPage';
import ViewEncounterPage from '../view-encounter-page/ViewEncounterPage';
import EncounterForm from '../encounter-form/EncounterForm';

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
            <Route exact path="/patients/create" render={() => <PatientForm />} />
            <Route exact path="/patients/:id" render={() => <ViewPatientPage />} />
            <Route exact path="/patients/:patientId/edit" render={() => <PatientForm />} />
            <Route exact path="/patients/:patientId/encounters/:id" render={() => <ViewEncounterPage />} />
            <Route exact path="/patients/:patientId/encounters" render={() => <EncounterForm />} />
            <Route exact path="/patients/:patientId/encounters/:encounterId/edit" render={() => <EncounterForm />} />
            <Route path="*" render={() => <NotFound />} />
          </Switch>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  </div>
);
export default App;
