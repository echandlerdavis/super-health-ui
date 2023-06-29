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
  ENCOUNTERS_ENDPOINT: '/encounters',
  SINGLE_ENCOUNTER_ENDPOINT: (patientId, id) => `/patients/${patientId}/encounters/${id}`,
  PATIENTS_ENDPOINT: '/patients',
  SINGLE_PATIENT_ENDPOINT: (id) => `/patients/${id}`,
  SEVERITY_LEVELS,

  // General Form Error Messages
  FORM_FIELDS_EMPTY: (emptyFields) => `The following fields can not be empty: ${emptyFields.join(', ')}`,
  NUMBER_INVALID: 'Must be number greater than zero',
  EMPTY_FIELD: 'This Field is reqiured',
  // Reservations Form Messages
  INVAID_EMAIL: 'Must be a valid email.',
  INVALID_DATE: 'Date must be mm-dd-yyyy',
  ROOM_TYPE_INVALID: 'Must select a room type',

  // Room type form messages
  NAME_INVALID: 'Must be at least 3 characters'
});
