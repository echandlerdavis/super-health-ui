import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import styles from './PatientsPage.module.css';
import constants from '../../utils/constants';
import AppAlert from '../alert/Alert';
import fetchPatients, { deletePatient } from './PatientsPageService';
import PatientCard from '../patient-card/PatientCard';

/**
 * @name PatientsPage
 * @description fetches patients from API and displays patients as patient cards
 * @return component
 */
const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [deleteApiError, setDeleteApiError] = useState(false);
  const [deleteErrorList, setDeleteErrorList] = useState([]);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    fetchPatients(setPatients, setApiError);
  }, []);

  // Removes deleted patient from the display.
  const handleDeletePatient = (patient) => {
    setDeleteErrorList([]);
    if (patient.encounters.length > 0) {
      setDeleteErrorList((prev) => [...prev, patient.id]);
      setDeleteErrorMessage(constants.HAS_ENCOUNTERS);
    } else {
      deletePatient(patient.id, setDeleteApiError);

      if (deleteApiError) {
        setDeleteErrorList((prev) => [...prev, patient.id]);
        setDeleteErrorMessage(constants.DELETE_API_ERROR);
      } else {
        const newList = [...patients];
        const foundIndex = newList.findIndex((pat) => pat.id === patient.id);

        // If we find the patient with matching ID, remove it
        if (foundIndex !== -1) newList.splice(foundIndex, 1);

        setPatients(newList);
      }
    }
  };

  return (
    <article>
      <div className={styles.reservationHeader}>
        <section>
          <h2>New Patient</h2>
          <div className={styles.buttonSection}>
            <Button
              style={{ backgroundColor: '#395aa1', color: 'white', borderRadius: 20 }}
              disabled={false}
              data-au="create-button"
              size="small"
              variant="contained"
              startIcon={<Add />}
              onClick={() => history.push('patients/create')}
            >
              Create
            </Button>
          </div>
        </section>
      </div>
      <h1 className={styles.title}>Patients</h1>
      {apiError && <AppAlert severity="error" title="Error" message={constants.API_ERROR} />}
      <section className={styles.app}>
        {patients.map((patient) => (
          <div key={patient.id} data-au="patient-display">
            <PatientCard
              patient={patient}
              handleDelete={() => handleDeletePatient(patient)}
              deleteErrorList={deleteErrorList}
              deleteErrorMessage={deleteErrorMessage}
            />
          </div>
        ))}
      </section>
    </article>
  );
};

export default PatientsPage;
