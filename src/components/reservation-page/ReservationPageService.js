import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 *
 * @name fetchProducts
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {Function} setReservations sets state for reservations
 * @param {Function} setApiError sets error if response other than 200 is returned
 * @returns sets state for reservation if 200 response, else sets state for apiError
 */
const fetchReservations = (setReservations, setApiError) => {
  HttpHelper(constants.RESERVATIONS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then(setReservations)
    .catch(() => {
      setApiError(true);
    });
};

/**
 * @name deleteReservation
 * @description removes reservation from the database.
 * @param {int} id - id of reservation to be deleted
 * @param {Function} setApiError - sets error if error
 */
export const deleteReservation = (id, setApiError) => {
  HttpHelper(`${constants.RESERVATIONS_ENDPOINT}/${id}`, 'DELETE')
    .then((response) => {
      if (response.ok) {
        return;
      }
      throw new Error(constants.API_ERROR);
    })
    .catch(() => {
      setApiError(true);
    });
};

export default fetchReservations;
