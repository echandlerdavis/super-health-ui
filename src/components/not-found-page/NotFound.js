import React from 'react';
import AppAlert from '../alert/Alert';
import constants from '../../utils/constants';

/**
 * @name NotFound
 * @description Page does not exist, defaults to this alert.
 * @return component
 */
const NotFound = () => (
  <AppAlert
    severity={constants.SEVERITY_LEVELS.ERROR}
    title="404 Not Found"
    message="The page you are looking for does not exist."
  />
);

export default NotFound;
