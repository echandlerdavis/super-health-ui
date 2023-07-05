import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Button } from '@material-ui/core';
// import { Add } from '@material-ui/icons';
// import styles from './RoomTypePage.module.css';
// import AppAlert from '../alert/Alert';
import ViewEncounterCard from '../view-encounter-card/ViewEncounterCard';
import fetchEncounter from './ViewEncounterPageService';

/**
 * @name ViewPatientPage
 * @description fetches room types from API and displays room types as room type cards
 * @return component
 */
const ViewEncounterPage = () => {
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
      {!apiError && <ViewEncounterCard encounter={encounter} apiError={apiError} />}
    </>
  );
};

export default ViewEncounterPage;
