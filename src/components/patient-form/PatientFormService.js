import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 * @name fetchPatientEmails
 * @description sets the map of existent emails to compare the new email to.
 * @param {Function} setPatientEmails - sets the list of patient emails and corresponding ids.
 * @param {Function} setApiError - sets error if error
 */
export const fetchPatientEmails = (setPatientEmails, setApiError) => {
  HttpHelper(`${constants.PATIENTS_ENDPOINT}/emails`, 'GET')
    .then((response) => response.json())
    .then(setPatientEmails)
    .catch(() => setApiError(true));
};

/**
 * @name savePatient
 * @description Persists a new patient to the database
 * @param {Object} patient - object to be persisted
 * @param {Function} setApiError - set to error if error
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
 * @description To update an item, retrieves single patient information to pre-fill the form.
 * @param {int} id - id of the patient to be updated
 * @param {Function} setFormData - sets the formData on the front end to be
 * displayed and later persisted
 * @param {Function} setDataLoaded - sets boolean so that data is only loaded once
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
 * @name updatePatient
 * @description Persists updated object to the database.
 * @param {Object} patient
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
