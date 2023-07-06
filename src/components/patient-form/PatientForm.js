import React, {
  useState, useRef, useEffect
} from 'react';
import {
  Button, Card, FormHelperText
} from '@material-ui/core';
import { Cancel, Save } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import AppAlert from '../alert/Alert';
import constants, { SEVERITY_LEVELS } from '../../utils/constants';
import FormItem from '../form/FormItem';
import {
  savePatient, getInitialData, updatePatient, fetchPatientEmails
} from './PatientFormService';
import styles from './PatientForm.module.css';
import FormItemDropdown from '../form/FormItemDropdown';

/**
   * @name getEmptyFields
   * @description Generates a list of empty fields
   * @param {Object} formData
   * @returns array of field names that are empty
   */
export const getEmptyFields = (formData) => {
  const emptyInputs = Object.keys(formData).filter((key) => {
    const formInput = formData[key];
    if (formInput) {
      if (typeof formInput === 'string') {
        formInput.trim();
      }
      return formInput.length === 0;
    }

    return !formInput;
  });
  return emptyInputs;
};

/**
 * @name validateNameStrings
 * @description validates that the name string
 * is made up of alphabetic name characters (includes apostrophe and hypen)
 * @param {String} nameString
 * @returns boolean
 */
export const validateNameStrings = (nameString) => {
  const regex = /^[a-zA-Z\s'-]+$/;
  return nameString && regex.test(nameString);
};

/**
 * @name validateSsn
 * @description validates that the ssn exists and
 *  is in the correct format DDD-DD-DDDD where D is a digit
 * @param {String} ssnString
 * @returns boolean
 */
export const validateSsn = (ssnString) => {
  const regex = /^(\d{3})-(\d{2})-(\d{4})$/;
  return ssnString
  && regex.test(ssnString);
};

/**
 * @name validateEmail
 * @description Validates that the email exists and is in the correct format 'x@x.x'
 * @param {String} emailString
 * @returns boolean
 */
export const validateEmailFormat = (emailString) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+$/;
  // TODO: might have issue if it's null?
  return emailString
  && regex.test(emailString);
};

/**
 * @name validateEmailDoesNotExist
 * @description Validates that the email does not already belong to another patient
 * based on a hashmap from an api call.
 * @param {String} patientEmail
 * @param {Int} patientId
 * @param {Hashmap} emailMap
 * @returns boolean
 */
export const validateEmailDoesNotExist = (patientEmail, patientId, emailMap) => {
  const emailMatch = Object.keys(emailMap).find(
    (key) => emailMap[key] === patientEmail && key !== patientId
  );
  return emailMatch === undefined;
};

/**
 * @name validateState
 * @description Validates string is two capital letters
 * @param {String} stateString
 * @returns boolean
 */
export const validateState = (stateString) => {
  const regex = /^[A-Z]{2}$/;
  return stateString && regex.test(stateString);
};

/**
 * @name validateZip
 * @description validates that the zip code string matches either
 * DDDDD or DDDDD-DDDD where D is a digit.
 * @param {String} postalCode
 * @returns boolean
 */
export const validateZip = (postalCode) => {
  const regex1 = /^\d{5}$/;
  const regex2 = /^(\d){5}-(\d){4}/;
  return postalCode && (regex1.test(postalCode) || regex2.test(postalCode));
};

/**
 * @name validateNumberGreaterThanZero
 * @description validates that the number exists and is greater than zero.
 * @param {int} number
 * @returns boolean
 */
export const validateNumberGreaterThanZero = (number) => number && number > 0;

export const validateGender = (genderString) => genderString === 'Male' || genderString === 'Female'
  || genderString === 'Other';

/**
 * @name PatientForm
 * @description Displays a form to update or create a new patient
 * @returns component
 */
const PatientForm = () => {
  const history = useHistory();
  const { patientId } = useParams();
  const initialFormData = {
    firstName: '',
    lastName: '',
    ssn: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postal: '',
    age: 0,
    height: 0,
    weight: 0,
    insurance: '',
    gender: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [patientEmails, setPatientEmails] = useState({});
  const [apiError, setApiError] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const [emptyFieldErrors, setEmptyFieldErrors] = useState([]);
  const [invalidFieldErrors, setInvalidFieldErrors] = useState([]);
  const formHasError = useRef(false);
  const emptyFields = useRef([]);
  const firstNameInvalid = useRef(false);
  const lastNameInvalid = useRef(false);
  const ssnInvalid = useRef(false);
  const emailInvalid = useRef(false);
  const emailExists = useRef(false);
  const stateInvalid = useRef(false);
  const zipInvalid = useRef(false);
  const ageInvalid = useRef(false);
  const heightInvalid = useRef(false);
  const weightInvalid = useRef(false);
  const genderInvalid = useRef(false);

  const formInputInfo = {
    firstName:
    {
      type: 'text',
      error: constants.INVALID_NAME
    },
    lastName: {
      type: 'text',
      error: constants.INVALID_NAME
    },
    ssn: {
      type: 'text',
      error: constants.INVALID_SSN
    },
    email: {
      type: 'email',
      error: constants.INVALID_EMAIL
    },
    street: {
      type: 'text'
    },
    city: {
      type: 'text'
    },
    state: {
      type: 'text',
      error: constants.INVALID_STATE
    },
    postal: {
      type: 'text',
      error: constants.INVALID_POSTAL
    },
    age: {
      type: 'number',
      error: constants.NUMBER_INVALID
    },
    height: {
      type: 'number',
      error: constants.NUMBER_INVALID
    },
    weight: {
      type: 'number',
      error: constants.NUMBER_INVALID
    },
    insurance: {
      type: 'text'
    },
    gender: {
      type: 'select',
      error: constants.INVALID_GENDER
    }
  };

  const genderOptions = [
    'Male',
    'Female',
    'Other'
  ];

  useEffect(() => {
    if (patientId && !dataLoaded) {
      getInitialData(patientId, setFormData, setDataLoaded, setApiError);
    }
  }, [patientId, dataLoaded]);

  useEffect(() => {
    fetchPatientEmails(setPatientEmails, setApiError);
  }, []);
  /**
   * validates all fields.
   */
  const validateFormData = () => {
    emptyFields.current = getEmptyFields(formData);
    firstNameInvalid.current = !validateNameStrings(formData.firstName);
    lastNameInvalid.current = !validateNameStrings(formData.lastName);
    ssnInvalid.current = !validateSsn(formData.ssn);
    emailInvalid.current = !validateEmailFormat(formData.email);
    emailExists.current = !validateEmailDoesNotExist(formData.email, patientId, patientEmails);
    stateInvalid.current = !validateState(formData.state);
    zipInvalid.current = !validateZip(formData.postal);
    ageInvalid.current = !validateNumberGreaterThanZero(formData.age);
    heightInvalid.current = !validateNumberGreaterThanZero(formData.height);
    weightInvalid.current = !validateNumberGreaterThanZero(formData.weight);
    genderInvalid.current = !validateGender(formData.gender);
    if (emptyFields.current.length
      || firstNameInvalid.current
      || lastNameInvalid.current
      || ssnInvalid.current
      || emailInvalid.current
      || emailExists.current
      || stateInvalid.current
      || zipInvalid.current
      || ageInvalid.current
      || heightInvalid.current
      || weightInvalid.current
      || genderInvalid.current) {
      formHasError.current = true;
    } else {
      formHasError.current = false;
    }
  };

  /**
   * sets the error message to list empty fields or email exists error.
   */
  const generateError = () => {
    formHasError.current = false;
    setFormErrorMessage(null);
    setInvalidFieldErrors([]);
    validateFormData();
    let errorMessage = null;
    if (formHasError.current) {
      if (emptyFields.current.length) {
        setEmptyFieldErrors([...emptyFields.current]);
        errorMessage = constants.FORM_FIELDS_EMPTY(emptyFields.current);
      }
      if (emailExists.current) {
        setInvalidFieldErrors((prev) => [...prev, 'emailExists']);
        if (errorMessage) {
          errorMessage = errorMessage.concat(' **AND** ', constants.EMAIL_ALREADY_EXISTS);
        } else {
          errorMessage = constants.EMAIL_ALREADY_EXISTS;
        }
      }
      if (firstNameInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'firstName']);
      }
      if (lastNameInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'lastName']);
      }
      if (ssnInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'ssn']);
      }
      if (emailInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'email']);
      }
      if (stateInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'state']);
      }
      if (zipInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'postal']);
      }
      if (ageInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'age']);
      }
      if (heightInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'height']);
      }
      if (weightInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'weight']);
      }
      if (genderInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'gender']);
      }
      setFormErrorMessage(errorMessage);
    }
  };

  /**
   * Updates formData as a user updates the input.
   * @param {event} e - event
   */
  const handleFormChange = (e) => {
    formHasError.current = false;
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  /**
   * Persists the form data to the database if there are no errors.
   * @param {event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    generateError();
    if (!formHasError.current) {
      let newPatient;
      if (patientId) {
        newPatient = await updatePatient(formData, setApiError);
      } else {
        newPatient = await savePatient(formData, setApiError);
      }
      if (newPatient && !newPatient.error) {
        if (patientId) {
          // this might just be setting a state so it renders a view only version
          history.push(`/patients/${patientId}`);
        } else {
          history.push('/patients');
        }
      } else {
        setApiError(true);
        setFormErrorMessage(constants.API_ERROR);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2>
        {patientId ? 'Update ' : 'New '}
        {' '}
        Patient
      </h2>
      {(emptyFieldErrors.length !== 0 || invalidFieldErrors.includes('emailExists') || apiError) && <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message={formErrorMessage} />}
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.reservationForm}>
          <div className={styles.inputs}>
            {Object.keys(formInputInfo).map((attribute) => {
              let styleClass = null;
              let helperText = null;
              // If the form attribute is listed as an empty field when errors are generated...
              // Change the style of the input box
              if (emptyFields.current.length && emptyFields.current.includes(attribute)) {
                styleClass = styles.invalidField;
                helperText = constants.EMPTY_FIELD;
              } else if (attribute === 'email' && (invalidFieldErrors.includes(attribute) || invalidFieldErrors.includes('emailExists'))) {
                styleClass = styles.invalidField;
                helperText = formInputInfo[attribute].error;
              } else if (invalidFieldErrors.includes(attribute)) {
                styleClass = styles.invalidField;
                helperText = formInputInfo[attribute].error;
              }
              if (attribute === 'gender') {
                return (
                  <div key={attribute}>
                    <FormItemDropdown
                      key={attribute}
                      onChange={handleFormChange}
                      value={formData[attribute]}
                      className={styleClass}
                      id={attribute}
                      label={attribute}
                      options={genderOptions}
                    />
                    {helperText
                  && (
                  <FormHelperText className={styles.helperText}>
                    {helperText}
                  </FormHelperText>
                  )}
                  </div>
                );
              }
              return (
                <div key={attribute}>
                  <FormItem
                    key={attribute}
                    onChange={handleFormChange}
                    value={formData[attribute]}
                    id={attribute}
                    type={formInputInfo[attribute].type}
                    label={attribute}
                    className={styleClass}
                    step={1}
                  />
                  {helperText
                && (
                <FormHelperText className={styles.helperText}>
                  {helperText}
                </FormHelperText>
                )}
                </div>
              );
            })}
          </div>
          <div className={styles.buttonContainer}>
            <Button
              type="button"
              startIcon={<Cancel />}
              onClick={() => history.goBack()}
              variant="outlined"
              style={{
                backgroundColor: '#e99393',
                borderColor: '#b00c00',
                color: '#b00c00',
                borderRadius: 20
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="outlined"
              data-au={patientId ? 'update-button' : 'create-button'}
              startIcon={<Save />}
              style={{
                backgroundColor: '#b0e5b0',
                borderColor: '#2f662f',
                color: '#2f662f',
                borderRadius: 20
              }}
              disabled={formHasError.current}
            >
              {patientId ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default PatientForm;
