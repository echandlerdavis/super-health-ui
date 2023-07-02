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
  INVALID_EMAIL: 'Must be a valid email.',
  INVALID_SSN: 'Must have format DDD-DD-DDDD',
  INVALID_NAME: 'Must be alphabetic characters',
  INVALID_STATE: 'Must be two capital letters',
  INVALID_POSTAL: 'Must have format DDDDD or DDDDD-DDDD',
  INVALID_GENDER: 'Must select a gender',
  EMAIL_ALREADY_EXISTS: 'This email already exists in our database under a different name.',

  // Encounter form messages
  INVALID_VISIT_CODE: 'Must have format LDL DLD where L is a capital letter and D is a digit',
  INVALID_BILLING_CODE: 'Must have format DDD.DDD.DDD-DD',
  INVALID_ICD10: 'Must have format LDD where L is a capital letter and D is a digit',
  INVALID_COST: 'Must be a value greater than zero with two decimal places',
  INVALID_DATE: 'Date must be yyyy-mm-dd'

});
