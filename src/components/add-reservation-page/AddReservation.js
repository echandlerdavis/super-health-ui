import React, {
  useState, useRef, useEffect
} from 'react';
import {
  Button, Card
} from '@material-ui/core';
import { Cancel, Save } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import AppAlert from '../alert/Alert';
import constants, { SEVERITY_LEVELS } from '../../utils/constants';
import FormItem from '../form/FormItem';
import { fetchRoomData, saveReservation } from './AddReservationService';
import styles from './AddReservation.module.css';
import FormItemDropdown from '../form/FormItemDropdown';

const AddReservation = () => {
  const history = useHistory();
  const initialFormData = {
    user: 'user',
    guestEmail: '',
    roomTypeId: '',
    checkInDate: '',
    numberOfNights: null
  };
  const [formData, setFormData] = useState(initialFormData);
  const [apiError, setApiError] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [roomOptions, setRoomOptions] = useState([]);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const formHasError = useRef(false);
    const inputsAreInvalid = useRef(false);
    const numberOfNightsInvalid = useRef(false);
    const guestEmailInvalid = useRef(false);
    const checkInDateInvalid = useRef(false);

  useEffect(() => {
    fetchRoomData(setRoomData, setRoomOptions, setApiError);
  }, []);

const validateNumberOfNights = () => {
    const { numberOfNights } = formData;
    return numberOfNights && numberOfNights <= 0;
  };

    /**
   * Generates a list of empty fields
   * @returns array of field names that are empty
   */
const getFieldsNotEmpty = () => {
        Object.keys(formData).filter((key) => {
          let formInput = formData[key];
          if (typeof formInput === 'string') {
            formInput = formInput.trim();
          }
          return formInput.length === 0;
        })
    };

const validateCheckInDate = () => {
    const regex = /(^0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(\d{4}$)/
    return regex.test(formData.checkInDate);
}

const validateGuestEmail = () => {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]+$/
    return regex.test(formData.guestEmail);
}


  const validateFormData = () => {
    inputsAreInvalid.current = getFieldsNotEmpty();
    numberOfNightsInvalid.current = validateNumberOfNights();
    checkInDateInvalid.current = validateCheckInDate();
    guestEmailInvalid.current = validateGuestEmail();
    if (inputsAreInvalid.current || numberOfNightsInvalid.current || checkInDateInvalid.current || guestEmailInvalid.current) {
      formHasError.current = true;
    } else {
      formHasError.current = false;
    }
  };

  //TODO: Change error messages.
  const generateError = () => {
    setFormErrorMessage(null);
    validateFormData();
    let errorMessage = null;
    if (inputsAreInvalid.current) {
      errorMessage = constants.REVIEW_FORM_INVALID_INPUTS;
    }
    if (numberOfNightsInvalid.current) {
      if (errorMessage) {
        errorMessage = errorMessage.concat(' ** AND ** ', constants.REVIEW_FORM_INVALID_RATING);
      } else {
        errorMessage = constants.REVIEW_FORM_INVALID_RATING;
      }
    }
    if (checkInDateInvalid.current) {
      if (errorMessage) {
        errorMessage =
     errorMessage.concat(' ** AND ** ', constants.REVIEW_FORM_COMMENTARY_LENGTH);
      } else {
        errorMessage = constants.REVIEW_FORM_COMMENTARY_LENGTH;
      }

    if (guestEmailInvalid.current) {
        if (errorMessage) {
          errorMessage =
       errorMessage.concat(' ** AND ** ', constants.REVIEW_FORM_COMMENTARY_LENGTH);
        } else {
          errorMessage = constants.REVIEW_FORM_COMMENTARY_LENGTH;
        }
    }
    setFormErrorMessage(errorMessage);
  }}
  // todo set roomtypedid by finding name in the data.
  const handleFormChange = (e) => {
    formHasError.current = false;
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRoomId = () => {
    if (formData.roomTypeId && roomData) {
      const singleRoomData = roomData.find((room) => room.name === formData.roomTypeId);
      setFormData({ ...formData, roomTypeId: singleRoomData.id });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    handleRoomId();
    generateError();
    if (!formHasError.current) {
      const newReservation = await saveReservation(formData, setApiError);
      if (newReservation && !newReservation.error) {
        history.push('/');
      } else {
        setApiError(constants.SAVE_REVIEW_FAILURE);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2>
        New Reservation
      </h2>
      {(formHasError.current || apiError) && <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message="Error" />}
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <FormItem
            placeholder="example@example.com"
            type="email"
            id="guestEmail"
            label="Guest Email:"
            // className={!inputsAreInvalid.current ? styles.summaryInput : styles.invalidField}
            onChange={handleFormChange}
            value={formData.guestEmail}
          />
          {/* {inputsAreInvalid.current
              && (
              <FormHelperText className={styles.helperTextFirstInput}>
                Either summary or commentary must be filled in.
              </FormHelperText>
              )} */}
          <FormItem
            placeholder="mm-dd-yyyy"
            id="checkInDate"
            type="text"
            label="Check-in Date:"
            // className={
            //       (inputsAreInvalid.current || commentaryLengthIsInvalid.current)
            //       && styles.invalidField
            //     }
            onChange={handleFormChange}
            value={formData.checkInDate}
          />
          {/* {inputsAreInvalid.current
              && (
              <FormHelperText className={styles.helperTextSecondInput}>
                Either summary or commentary must be filled in.
              </FormHelperText>
              )} */}
          {/* {commentaryLengthIsInvalid.current
              && (
              <FormHelperText className={styles.helperTextSecondInput}>
                Commentary must be less than 500 characters.
              </FormHelperText>
              )} */}
          <FormItem
            // placeholder="e.g, 3"
            id="numberOfNights"
            type="number"
            label="Number of Nights:"
            value={formData.numberOfNights}
          />
          <FormItemDropdown
            placeholder="Select room type"
            id="roomTypeId"
            type="select"
            label="Room Type:"
            onChange={handleFormChange}
            options={roomOptions}
            value={formData.roomTypeId}
          />

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
              startIcon={<Save />}
              style={{
                backgroundColor: '#b0e5b0',
                borderColor: '#2f662f',
                color: '#2f662f',
                borderRadius: 20
              }}
              disabled={formHasError.current}
            >
              Create
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AddReservation;