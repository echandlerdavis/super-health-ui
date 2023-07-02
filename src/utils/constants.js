const SEVERITY_LEVELS = {
  INFO: 'info',
  ERROR: 'error',
  SUCCESS: 'success',
  WARNING: 'warning'
};

module.exports = Object.freeze({
  API_ERROR: 'Oops, something went wrong',
  BASE_URL_API: 'http://localhost:8085',
  PLACEHOLDER_IMAGE: 'https://www.signfix.com.au/wp-content/uploads/2017/09/placeholder-600x400.png',
  ENCOUNTERS_ENDPOINT: (patientId) => `/patients/${patientId}/encounters`,
  SINGLE_ENCOUNTER_ENDPOINT: (patientId, id) => `/patients/${patientId}/encounters/${id}`,
  PATIENTS_ENDPOINT: '/patients',
  SINGLE_PATIENT_ENDPOINT: (id) => `/patients/${id}`,
  SEVERITY_LEVELS,

  // General Form Error Messages
  FORM_FIELDS_EMPTY: (emptyFields) => `The following fields can not be empty: ${emptyFields.join(', ')}`,
  NUMBER_INVALID: 'Must be number greater than zero',
  EMPTY_FIELD: 'This Field is required',
  // Patient Form Messages
  INVAID_EMAIL: 'Must be a valid email.',
  INVALID_SSN: 'Must have format DDD-DD-DDDD',
  INVALID_NAME: 'Must be alphabetic characters',
  INVALID_STATE: 'Must be two capital letters',
  INVALID_POSTAL: 'Must have format DDDDD or DDDDD-DDDD',
  INVALID_GENDER: 'Must select a gender',

  // Room type form messages
  NAME_INVALID: 'Must be at least 3 characters',
  INVALID_DATE: 'Date must be mm-dd-yyyy'

});
