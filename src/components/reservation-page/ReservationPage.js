import React, { useEffect, useState } from 'react';
import ReservationCard from '../reservation-card/ReservationCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import AppAlert from '../alert/Alert';
import fetchReservations, { deleteReservation } from './ReservationPageService';

/**
 * @name ReservationPage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const ReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    fetchReservations(setReservations, setApiError);
  }, []);

  const handleDeleteReservation = (id) => {
    deleteReservation(id, setApiError);
    const newList = [...reservations];
    const foundIndex = newList.findIndex((reservation) => reservation.id === id);

    // If we find the blog post with matching ID, remove it
    if (foundIndex !== -1) newList.splice(foundIndex, 1);

    setReservations(newList);
  };

  return (
    <article>
      {apiError && <AppAlert severity="error" title="Error" message={Constants.API_ERROR} />}
      <section className={styles.app}>
        {reservations.map((reservation) => (
          <div key={reservation.id}>
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
