import React from 'react';
import AppAlert from '../alert/Alert';
import constants from '../../utils/constants';

/**
 * @name HomePage
 * @description informs user where to navigate
 * @return component
 */
const HomePage = () => (
  <AppAlert
    severity={constants.SEVERITY_LEVELS.INFO}
    title="Info"
    message="Get started by clicking on the Patients link above!"
  />
);

export default HomePage;
