import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 * @name fetchRoomData
 * @description sets the options of active room-types for the form drop down menu.
 * @param {Function} setRoomData - sets the extensive roomData
 * @param {Function} setRoomOptions - sets the options to a list of names.
 * @param {Function} setApiError - sets error if error
 */
export const fetchPatientEmails = (setPatientEmails, setApiError) => {
  HttpHelper(`${constants.PATIENTS_ENDPOINT}/emails`, 'GET')
    .then((response) => response.json())
    .then(setPatientEmails)
    .catch(() => setApiError(true));
};

/**
 * @name saveReservation
 * @description Persists a new reservation to the database
 * @param {*} reservation - object to be persisted
 * @param {*} setApiError - set to error if error
 * @returns saved object if success, boolean if error
 */
export const savePatient = async (patient, setApiError) => {
  try {
    const response = await HttpHelper(constants.PATIENTS_ENDPOINT, 'POST', patient);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};

/**
 * @name getInitialData
 * @description To update an item, retrieves single reservation information to pre-fill the form.
 * @param {int} id - id of the reservation to be updated
 * @param {Function} setFormData - sets the formData on the front end to be
 * displayed and later persisted
 * @param {Function} setDataLoaded - sets boolean so that data is only loaded once
 * @param {Function} setRoomName - sets the drop down menu to have the name of the room-type
 * @param {Object} roomData - data to compare roomId to
 * @param {Function} setApiError - sets error
 */
export const getInitialData = (
  id, setFormData, setDataLoaded, setApiError
) => {
  HttpHelper(constants.SINGLE_PATIENT_ENDPOINT(id), 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then((data) => {
      setFormData(data);
      setDataLoaded(true);
    })
    .catch(() => {
      setApiError(true);
    });
};

/**
 * @name updateReservation
 * @description Persists updated object to the database.
 * @param {Object} reservation
 * @param {Function} setApiError
 * @returns updated object if success, boolean if error.
 */
export const updatePatient = async (patient, setApiError) => {
  try {
    const response = await HttpHelper(constants.SINGLE_PATIENT_ENDPOINT(patient.id), 'PUT', patient);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};
