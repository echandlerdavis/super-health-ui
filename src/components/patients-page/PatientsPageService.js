import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 *
 * @name fetchPatients
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {Function} setOatuebts sets state for patients
 * @param {Function} setApiError sets error if response other than 200 is returned
 * @returns sets state for patients if 200 response, else sets state for apiError
 */
const fetchPatients = (setPatients, setApiError) => {
  HttpHelper(constants.PATIENTS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then(setPatients)
    .catch(() => {
      setApiError(true);
    });
};

/**
 * @name deletePatient
 * @description removes patient from the database.
 * @param {int} id - id of patient to be deleted
 * @param {Function} setApiError - sets error if error
 */
export const deletePatient = (id, setApiError) => {
  HttpHelper(`${constants.PATIENTS_ENDPOINT}/${id}`, 'DELETE')
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

export default fetchPatients;
