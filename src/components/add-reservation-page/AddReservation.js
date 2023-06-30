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
  fetchRoomData, saveReservation, getInitialData, updateReservation
} from './AddReservationService';
import styles from './AddReservation.module.css';
import FormItemDropdown from '../form/FormItemDropdown';

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

    return !formInput;
  });

  return emptyInputs;
};

/**
 * @name validateNameStrings
 * @description validates that the number of nights field in the
 * form data is not null, undefined, or less than 1
 * @param {Object} formData
 * @returns boolean
 */
export const validateNameStrings = (nameString) => {
  const regex = /^[a-zA-Z\s'-]+$/;
  return nameString && regex.test(nameString);
};

/**
 * @name validateSsn
 * @description validates that the check in
 * data string exists and is in the correct format 'mm-dd-yyyy'
 * @param {Object} formData
 * @returns boolean
 */
export const validateSsn = (ssnString) => {
  const regex = /^(\d{3})-(\d{2})-(\d{4})$/;
  return ssnString
  && regex.test(ssnString);
};

/**
 * @name validateEmail
 * @description Validates that the guest email exists and is in the correct format 'x@x.x'
 * @param {Object} formData
 * @returns boolean
 */
export const validateEmail = (emailString) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z]+\.[A-Za-z]+$/;
  //TODO: might have issue if it's null?
  return emailString
  && regex.test(emailString);
};
/**
 * @name validateCheckInDate
 * @description validates that the check in
 * data string exists and is in the correct format 'mm-dd-yyyy'
 * @param {Object} formData
 * @returns boolean
 */
export const validateCheckInDate = (formData) => {
  const regex = /^(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])-(\d{4})$/;
  return formData.checkInDate !== undefined
  && formData.checkInDate !== null
  && regex.test(formData.checkInDate);
};


/**
 * @name AddReservation
 * @description Displays a form to update or create a new reservation
 * @returns component
 */
const AddReservation = () => {
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
    age: null,
    height: null,
    weight: null,
    insurance: '',
    gender: ''
  };
  const [formData, setFormData] = useState(initialFormData);
  const [apiError, setApiError] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const [emptyFieldErrors, setEmptyFieldErrors] = useState([]);
  const [invalidFieldErrors, setInvalidFieldErrors] = useState([]);
  const formHasError = useRef(false);
  const emptyFields = useRef([]);
  const firstNameInvalid = useRef(false);
  const lastNameInvalid = useRef(false);
  const guestEmailInvalid = useRef(false);
  const checkInDateInvalid = useRef(false);

  const formInputTypes = {
    firstName: 'text',
    lastName: 'text',
    ssn: 'text',
    email: 'email',
    street: 'text',
    city: 'text',
    state: 'text',
    postal: 'text',
    age: 'number',
    height: 'number',
    weight: 'number',
    insurance: 'text',
    gender: 'select'
  };

  const genderOptions = [
    "Male",
    "Female",
    "Other"
  ];
    

  useEffect(() => {
    if (patientId && !dataLoaded) {
      getInitialData(patientId, setFormData, setDataLoaded, setApiError);
    }
  }, [patientId, dataLoaded]);

  /**
   * validates all fields.
   */
  const validateFormData = () => {
    formHasError.current = false;
    emptyFields.current = getEmptyFields(formData);
    firstNameInvalid.current = !validateNameStrings(formData.firstName);
    lastNameInvalid.current = !validateNameStrings(formData.lastName);
    checkInDateInvalid.current = !validateCheckInDate(formData);
    guestEmailInvalid.current = !validateGuestEmail(formData);
    if (emptyFields.current.length
      || numberOfNightsInvalid.current
      || checkInDateInvalid.current
      || guestEmailInvalid.current) {
      formHasError.current = true;
    } else {
      formHasError.current = false;
    }
  };

  /**
   * sets the error message to list empty fields.
   */
  const generateError = () => {
    setFormErrorMessage(null);
    validateFormData();
    let errorMessage = null;
    if (formHasError.current) {
      if (emptyFields.current.length) {
        setEmptyFieldErrors([...emptyFields.current]);
        errorMessage = constants.FORM_FIELDS_EMPTY(emptyFields.current);
      }
      if (numberOfNightsInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'numberOfNights']);
      }
      if (checkInDateInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'checkInDate']);
      }
      if (guestEmailInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'guestEmail']);
      }
      setFormErrorMessage(errorMessage);
    }
  };

  // /**
  //  * takes the room-type name information and sets it to a valid roomTypeId.
  //  */
  // const handleRoomId = () => {
  //   if (roomName && roomData) {
  //     const singleRoomData = roomData.find((room) => room.name === roomName);
  //     if (singleRoomData !== undefined) {
  //       setFormData({ ...formData, roomTypeId: singleRoomData.id });
  //     } else {
  //       setFormData({ ...formData, roomTypeId: null });
  //     }
  //   }
  // };

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
      let newReservation;
      if (patientId) {
        newReservation = await updateReservation(formData, setApiError);
      } else {
        newReservation = await saveReservation(formData, setApiError);
      }
      if (newReservation && !newReservation.error) {
        history.push('/reservations');
      } else {
        setApiError(true);
        setFormErrorMessage(constants.API_ERROR);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* <h2>
        {patientId ? 'Update ' : 'New '}
        {' '}
        Reservation
      </h2> */}
      {(emptyFieldErrors.length !== 0 || apiError) && <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message={formErrorMessage} />}
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.reservationForm}>
          {Object.keys(formInputTypes).map((attribute) => {
            let styleClass = null;
            // let helperText = '';
            // If the form attribute is listed as an empty field when errors are generated...
            // Change the style of the input box
            if (emptyFields.current.length && emptyFields.current.includes(attribute)) {
              styleClass = styles.invalidField;
            }else if (invalidFieldErrors.length && invalidFieldErrors.includes(attribute)) {
              styleClass = styles.invalidField;
            }
            if(attribute === "gender"){
              return (
                <FormItemDropdown
                  key={attribute}
                  onChange={handleFormChange}
                  value={formData[attribute]}
                  className={styleClass}
                  id={attribute}
                  label={attribute}
                  options={genderOptions}
                />
                //Put form helper text
              )
            }
            return (
              <FormItem 
                key={attribute}
                onChange={handleFormChange}
                value={formData[attribute]}
                id={attribute}
                type={formInputTypes[attribute]}
                label={attribute}
                className={styleClass}
                step={1}
              />
            )

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
              data-au={reservationId ? 'update-button' : 'create-button'}
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
export default AddReservation;
