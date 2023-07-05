import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 *
 * @name fetchPatient
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {int} id - id of patient to be fetched
 * @param {Function} setPatient sets state for patient
 * @param {Function} setEncounters - sets state for encounters to be displayed
 * @param {Funtion} setDataLoaded - if data loads, set it to true so only called once
 * @param {Fution} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
const fetchPatient = (id, setPatient, setEncounters, setDataLoaded, setApiError) => {
  HttpHelper(constants.SINGLE_PATIENT_ENDPOINT(id), 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then((data) => {
      setPatient(data);
      setEncounters(data.encounters);
      setDataLoaded(true);
    })
    .catch(() => {
      setApiError(true);
    });
};

export default fetchPatient;
