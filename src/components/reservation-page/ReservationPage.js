import React, { useEffect, useState } from 'react';
import ReservationCard from '../reservation-card/ReservationCard';
import styles from './ProductPage.module.css';
import Constants from '../../utils/constants';
import AppAlert from '../alert/Alert';
import fetchReservations from './ReservationPageService';


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

  return (
    <article>
      {apiError && <AppAlert severity="error" title="Error" message={Constants.API_ERROR} />}
      <section className={styles.app}>
        {reservations.map((reservation) => (
          <div key={reservation.id}>
            <ReservationCard
              reservation={reservation}
            />
          </div>
        ))}
      </section>
    </article>
  );
};

export default ProductPage;
