import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Add, ArrowBack } from '@material-ui/icons';
import styles from './ViewPatientPage.module.css';
import Constants from '../../utils/constants';
import AppAlert from '../alert/Alert';
import fetchPatient from './ViewPatientPageService';
import ViewPatientCard from '../view-patient-card/ViewPatientCard';
import EncounterCard from '../encounter-card/EncounterCard';

/**
 * @name ViewPatientPage
 * @description fetches patients from API and displays patients as patient cards
 * @return component
 */
const ViewPatientPage = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({});
  const [encounters, setEncounters] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [apiError, setApiError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!dataLoaded) {
      fetchPatient(id, setPatient, setEncounters, setDataLoaded, setApiError);
    }
  }, [id, dataLoaded]);

  return (
    <article>
      {!apiError
      && <ViewPatientCard patient={patient} />}
      <div className={styles.backButton}>
        <Button
          style={{ backgroundColor: '#395aa1', color: 'white', borderRadius: 20 }}
          disabled={false}
          size="small"
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => history.push('/patients')}
        >
          {' '}
          Back to Patients Page
        </Button>
      </div>
      <div className={styles.encounterHeader}>

        <section>
          <h2>New Encounter</h2>
          <div className={styles.buttonSection}>
            <Button
              style={{ backgroundColor: '#395aa1', color: 'white', borderRadius: 20 }}
              disabled={false}
              data-au="create-button"
              size="small"
              variant="contained"
              startIcon={<Add />}
              onClick={() => history.push(`${patient.id}/encounters`)}
            >
              Create
            </Button>
          </div>
        </section>
      </div>
      <h1 className={styles.title}>Encounters</h1>
      {apiError && <AppAlert severity="error" title="Error" message={Constants.API_ERROR} />}
      <section className={styles.app}>
        {encounters.map((encounter) => (
          <div key={encounter.id} data-au="encounter-display">
            <EncounterCard
              patientId={patient.id}
              encounter={encounter}
              apiError={apiError}
            />
          </div>
        ))}
      </section>
    </article>
  );
};

export default ViewPatientPage;
