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
import { saveEncounter, updateEncounter, getInitialEncounterData } from './EncounterFormService';
import styles from './EncounterForm.module.css';

/**
 * @name getEmptyFields
 * @description Generates a list of empty fields
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

    return !formInput && !(key === 'notes' || key === 'pulse' || key === 'systolic' || key === 'diastolic');
  });
  return emptyInputs;
};

/**
   * @name validateVisitCode
   * @description validates that the number of nights field in the
   * form data is not null, undefined, or less than 1
   * @param {Object} formData
   * @returns boolean
   */
export const validateVisitCode = (visitCodeString) => {
  const regex = /^[A-Z]\d[A-Z] \d[A-Z]\d$/;
  return visitCodeString && regex.test(visitCodeString);
};

/**
   * @name validateBillingCode
   * @description validates that the check in
   * data string exists and is in the correct format 'mm-dd-yyyy'
   * @param {Object} formData
   * @returns boolean
   */
export const validateBillingCode = (billingCodeString) => {
  const regex = /^\d{3}.\d{3}.\d{3}-\d{2}$/;
  return billingCodeString
    && regex.test(billingCodeString);
};

/**
   * @name validateIcd10
   * @description Validates that the guest email exists and is in the correct format 'x@x.x'
   * @param {String} formData
   * @returns boolean
   */
export const validateIcd10 = (icd10String) => {
  const regex = /^[A-Z]\d{2}$/;
  return icd10String
    && regex.test(icd10String);
};

/**
   * @name validateCost
   * @description
   * @param {number} number
   * @returns
   */
export const validateCost = (cost) => cost && cost > 0;

export const validateNumberGreaterThanZero = (number) => !number || number > 0;

// TODO: figure out if you need the validate Date
export const validateDateFormat = (date) => {
  const regex = /^\d{4}-(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])$/;
  return date
  && regex.test(date);
};
/**
   * @name EncounterForm
   * @description Displays a form to update or create an encounter
   * @returns component
   */
const EncounterForm = () => {
  const history = useHistory();
  const { patientId, encounterId } = useParams();
  const initialFormData = {
    patientId,
    notes: '',
    visitCode: '',
    provider: '',
    billingCode: '',
    icd10: '',
    totalCost: 0.00,
    copay: 0.00,
    chiefComplaint: '',
    pulse: '',
    systolic: '',
    diastolic: '',
    date: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [apiError, setApiError] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const [emptyFieldErrors, setEmptyFieldErrors] = useState([]);
  const [invalidFieldErrors, setInvalidFieldErrors] = useState([]);
  const formHasError = useRef(false);
  const emptyFields = useRef([]);
  const visitCodeInvalid = useRef(false);
  const billingCodeInvalid = useRef(false);
  const icd10Invalid = useRef(false);
  const totalCostInvalid = useRef(false);
  const copayInvalid = useRef(false);
  const pulseInvalid = useRef(false);
  const systolicInvalid = useRef(false);
  const diastolicInvalid = useRef(false);
  const dateInvalid = useRef(false);

  const formInputInfo = {
    notes: {
      type: 'text'
    },
    visitCode: {
      type: 'text',
      error: constants.INVALID_VISIT_CODE
    },
    provider: {
      type: 'text'
    },
    billingCode: {
      type: 'text',
      error: constants.INVALID_BILLING_CODE
    },
    icd10: {
      type: 'text',
      error: constants.INVALID_ICD10
    },
    totalCost: {
      type: 'number',
      error: constants.INVALID_COST
    },
    copay: {
      type: 'number',
      error: constants.INVALID_COST
    },
    chiefComplaint: {
      type: 'text'
    },
    pulse: {
      type: 'number',
      error: constants.NUMBER_INVALID
    },
    systolic: {
      type: 'number',
      error: constants.NUMBER_INVALID
    },
    diastolic: {
      type: 'number',
      error: constants.NUMBER_INVALID
    },
    date: {
      type: 'text',
      error: constants.INVALID_DATE
    }
  };

  useEffect(() => {
    if (encounterId && !dataLoaded) {
      getInitialEncounterData(patientId, encounterId, setFormData, setDataLoaded, setApiError);
    }
  }, [encounterId, patientId, dataLoaded]);

  /**
     * validates all fields.
     */
  const validateFormData = () => {
    emptyFields.current = getEmptyFields(formData);
    visitCodeInvalid.current = !validateVisitCode(formData.visitCode);
    billingCodeInvalid.current = !validateBillingCode(formData.billingCode);
    icd10Invalid.current = !validateIcd10(formData.icd10);
    totalCostInvalid.current = !validateCost(formData.totalCost);
    copayInvalid.current = !validateCost(formData.copay);
    pulseInvalid.current = !validateNumberGreaterThanZero(formData.pulse);
    systolicInvalid.current = !validateNumberGreaterThanZero(formData.systolic);
    diastolicInvalid.current = !validateNumberGreaterThanZero(formData.diastolic);
    dateInvalid.current = !validateDateFormat(formData.date);
    if (emptyFields.current.length
        || visitCodeInvalid.current
        || billingCodeInvalid.current
        || icd10Invalid.current
        || totalCostInvalid.current
        || copayInvalid.current
        || pulseInvalid.current
        || systolicInvalid.current
        || diastolicInvalid.current
        || dateInvalid.current) {
      console.log('Something has error');
      formHasError.current = true;
    } else {
      formHasError.current = false;
    }
  };

  // TODO: consider just having the minimum value of the numbers be 0.01
  /**
     * sets the error message to list empty fields.
     */
  const generateError = () => {
    formHasError.current = false;
    setInvalidFieldErrors([]);
    setFormErrorMessage(null);
    validateFormData();
    let errorMessage = null;
    if (formHasError.current) {
      if (emptyFields.current.length) {
        setEmptyFieldErrors([...emptyFields.current]);
        errorMessage = constants.FORM_FIELDS_EMPTY(emptyFields.current);
      }
      if (visitCodeInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'visitCode']);
      }
      if (billingCodeInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'billingCode']);
      }
      if (icd10Invalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'icd10']);
      }
      if (totalCostInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'totalCost']);
      }
      if (copayInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'copay']);
      }
      if (pulseInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'pulse']);
      }
      if (systolicInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'systolic']);
      }
      if (diastolicInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'diastolic']);
      }
      if (dateInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'date']);
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
      let newEncounter;
      if (encounterId) {
        newEncounter = await updateEncounter(patientId, formData, setApiError);
      } else {
        newEncounter = await saveEncounter(patientId, formData, setApiError);
      }
      if (newEncounter && !newEncounter.error) {
        if (encounterId) {
          history.push(`/patients/${patientId}/encounters/${encounterId}`);
        } else {
          history.push(`/patients/${patientId}`);
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
        {encounterId ? 'Update ' : 'New '}
        {' '}
        Encounter
      </h2>
      {(emptyFieldErrors.length !== 0 || apiError) && <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message={formErrorMessage} />}
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.reservationForm}>
          {Object.keys(formInputInfo).map((attribute) => {
            let styleClass = null;
            let helperText = null;
            // If the form attribute is listed as an empty field when errors are generated...
            // Change the style of the input box
            if (emptyFields.current.length && emptyFields.current.includes(attribute)) {
              styleClass = styles.invalidField;
              helperText = constants.EMPTY_FIELD;
            } else if (invalidFieldErrors.length && invalidFieldErrors.includes(attribute)) {
              styleClass = styles.invalidField;
              helperText = formInputInfo[attribute].error;
            }
            return (
              <div key={attribute}>
                <FormItem
                  key={attribute}
                  onChange={handleFormChange}
                  value={formData[attribute]}
                  id={attribute}
                  type={formInputInfo[attribute].type}
                  placeholder={(attribute === 'totalCost' || attribute === 'copay') ? 0.00 : ''}
                  label={attribute}
                  className={styleClass}
                  step={(attribute === 'totalCost' || attribute === 'copay') ? 0.01 : 1}
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
              data-au={encounterId ? 'update-button' : 'create-button'}
              startIcon={<Save />}
              style={{
                backgroundColor: '#b0e5b0',
                borderColor: '#2f662f',
                color: '#2f662f',
                borderRadius: 20
              }}
              disabled={formHasError.current}
            >
              {encounterId ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default EncounterForm;
