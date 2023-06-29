import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 *
 * @name fetchEncounter
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setRoomTypes sets state for room types
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
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
