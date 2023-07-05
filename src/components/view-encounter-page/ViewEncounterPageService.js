import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 *
 * @name fetchEncounter
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {int} id - id of the encounter to fetch
 * @param {int} patientId - id of the patient to which the encounter belongs
 * @param {Function}setEncounter sets state for encounter
 * @param {Function} setDataLoaded sets state to true so data loads only once
 * @param {Function} setApiError sets error if response other than 200 is returned
 * @returns sets state for encounter if 200 response, else sets state for apiError
 */
const fetchEncounter = (id, patientId, setEncounter, setDataLoaded, setApiError) => {
  HttpHelper(constants.SINGLE_ENCOUNTER_ENDPOINT(patientId, id), 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then((data) => {
      setEncounter(data);
      setDataLoaded(true);
    })
    .catch(() => {
      setApiError(true);
    });
};

export default fetchEncounter;
