import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import styles from './ViewEncounterPage.module.css';
import ViewEncounterCard from '../view-encounter-card/ViewEncounterCard';
import fetchEncounter from './ViewEncounterPageService';
import AppAlert from '../alert/Alert';
import constants from '../../utils/constants';

/**
 * @name ViewEncounterPage
 * @description fetches single encounter from API and displays it as a single card.
 * @return component
 */
const ViewEncounterPage = () => {
  const history = useHistory();
  const { encounterId, patientId } = useParams();
  const [encounter, setEncounter] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      fetchEncounter(encounterId, patientId, setEncounter, setDataLoaded, setApiError);
    }
  }, [encounterId, patientId, dataLoaded]);

  return (
    <>
      <h2>Encounter Details</h2>
      {!apiError ? <ViewEncounterCard encounter={encounter} apiError={apiError} />
        : <AppAlert severity="error" title="Error" message={constants.API_ERROR} />}
      <div className={styles.backButton}>
        <Button
          style={{ backgroundColor: '#395aa1', color: 'white', borderRadius: 20 }}
          disabled={false}
          size="small"
          variant="contained"
          startIcon={<ArrowBack />}
          onClick={() => history.push(`/patients/${patientId}`)}
        >
          {' '}
          Back to Patient Details Page
        </Button>
      </div>
    </>
  );
};

export default ViewEncounterPage;
