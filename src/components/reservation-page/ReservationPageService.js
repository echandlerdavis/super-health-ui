import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 *
 * @name fetchProducts
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setProducts sets state for products
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
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
