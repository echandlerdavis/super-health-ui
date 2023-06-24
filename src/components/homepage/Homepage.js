import React from 'react';
import AppAlert from '../alert/Alert';
import constants from '../../utils/constants';

/**
 * @name HomePage
 * @description fetches products from API and displays products as product cards
 * @return component
 */
const HomePage = () => (
  <AppAlert
    severity={constants.SEVERITY_LEVELS.INFO}
    title="Info"
    message="Get started by clicking on the Reservations or Room-Types links above!"
  />
);

export default HomePage;
