import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import ReservationCard from '../patient-card/PatientCard';
import styles from './ReservationPage.module.css';
import Constants from '../../utils/constants';
import AppAlert from '../alert/Alert';
import fetchPatients, { deleteReservation } from './PatientsPageService';

/**
 * @name ReservationPage
 * @description fetches reservations from API and displays reservations as reservations cards
 * @return component
 */
const ReservationPage = () => {
  const [patients, setPatients] = useState([]);
  const [apiError, setApiError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchPatients(setPatients, setApiError);
  }, []);

  // Removes deleted reservation from the display.
  const handleDeleteReservation = (id) => {
    deleteReservation(id, setApiError);
    const newList = [...patients];
    const foundIndex = newList.findIndex((patient) => patient.id === id);

    // If we find the reservation with matching ID, remove it
    if (foundIndex !== -1) newList.splice(foundIndex, 1);

    setPatients(newList);
  };

  return (
    <article>
      <div className={styles.reservationHeader}>
        <section>
          <h2>New Reservation</h2>
          <div className={styles.buttonSection}>
            <Button
              style={{ backgroundColor: '#395aa1', color: 'white', borderRadius: 20 }}
              disabled={false}
              data-au="create-button"
              size="small"
              variant="contained"
              startIcon={<Add />}
              onClick={() => history.push('reservations/create')}
            >
              Create
            </Button>
          </div>
        </section>
      </div>
      <h1 className={styles.title}>Reservations</h1>
      {apiError && <AppAlert severity="error" title="Error" message={Constants.API_ERROR} />}
      <section className={styles.app}>
        {reservations.map((reservation) => (
          <div key={reservation.id} data-au="reservation-display">
            <ReservationCard
              reservation={reservation}
              handleDelete={() => handleDeleteReservation(reservation.id)}
            />
          </div>
        ))}
      </section>
    </article>
  );
};

export default ReservationPage;