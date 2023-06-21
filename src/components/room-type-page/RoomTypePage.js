import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import styles from './RoomTypePage.module.css';
import Constants from '../../utils/constants';
import AppAlert from '../alert/Alert';
import fetchRoomTypes from './RoomTypePageService';
import RoomTypeCard from '../room-type-card/RoomTypeCard';

/**
 * @name RoomTypePage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const RoomTypePage = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [apiError, setApiError] = useState(false);
  const history = useHistory();

  useEffect(() => {
    fetchRoomTypes(setRoomTypes, setApiError);
  }, []);

  return (
    <article>
      <h1>Room Types</h1>
      <section>
        <h2>Create New</h2>
        <div className={styles.buttonSection} />
        <Button
          style={{ backgroundColor: '#395aa1', color: 'white', borderRadius: 20 }}
          disabled={false}
          size="small"
          variant="contained"
          startIcon={<Add />}
          onClick={() => history.push('room-types/create')}
        >
          Room Type
        </Button>
      </section>
      {apiError && <AppAlert severity="error" title="Error" message={Constants.API_ERROR} />}
      <section className={styles.app}>
        {roomTypes.map((roomType) => (
          <div key={roomType.id}>
            <RoomTypeCard
              roomType={roomType}
              apiError={apiError}
            />
          </div>
        ))}
      </section>
    </article>
  );
};

export default RoomTypePage;
