import React, {
  useState, useRef, useEffect
} from 'react';
import {
  Button, Card
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

export const validateNumberOfNights = (formData) => {
  const { numberOfNights } = formData;
  return numberOfNights !== undefined && numberOfNights !== null && numberOfNights > 0;
};

/**
   * Generates a list of empty fields
   * @returns array of field names that are empty
   */
export const getEmptyFields = (formData) => {
  const emptyInputs = Object.keys(formData).filter((key) => {
    let formInput = formData[key];
    if (typeof formInput === 'string') {
      formInput = formInput.trim();
    }
    return formInput.length === 0;
  });
  return emptyInputs;
};

export const validateCheckInDate = (formData) => {
  const regex = /^(0[1-9]|1[0-2])-([0-2][0-9]|3[0-1])-(\d{4})$/;
  return formData.checkInDate !== undefined
  && formData.checkInDate !== null
  && regex.test(formData.checkInDate);
};

export const validateGuestEmail = (formData) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return formData.guestEmail !== undefined
  && formData.guestEmail !== null
  && regex.test(formData.guestEmail);
};

const AddReservation = () => {
  const history = useHistory();
  const { reservationId } = useParams();
  const initialFormData = {
    user: 'user',
    guestEmail: '',
    roomTypeId: null,
    checkInDate: '',
    numberOfNights: 0
  };
  const [formData, setFormData] = useState(initialFormData);
  const [apiError, setApiError] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [roomOptions, setRoomOptions] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const formHasError = useRef(false);
  const emptyFields = useRef([]);
  const numberOfNightsInvalid = useRef(false);
  const guestEmailInvalid = useRef(false);
  const checkInDateInvalid = useRef(false);

  useEffect(() => {
    fetchRoomData(setRoomData, setRoomOptions, setApiError);
  }, []);

  useEffect(() => {
    if (reservationId && !dataLoaded) {
      getInitialData(reservationId, setFormData, setDataLoaded, setApiError);
    }
  }, [reservationId, dataLoaded]);

  const validateFormData = () => {
    emptyFields.current = getEmptyFields(formData);
    numberOfNightsInvalid.current = !validateNumberOfNights(formData);
    checkInDateInvalid.current = !validateCheckInDate(formData);
    guestEmailInvalid.current = !validateGuestEmail(formData);
    if (emptyFields.current.length
      || numberOfNightsInvalid.current
      || checkInDateInvalid.current
      || guestEmailInvalid.current) {
      formHasError.current = true;
      return false;
    }
    formHasError.current = false;
    return true;
  };

  // TODO: Change Error messages
  const generateError = () => {
    setFormErrorMessage(null);
    if (!validateFormData()) {
      let errorMessage = null;
      if (emptyFields.current.length) {
        errorMessage = constants.FORM_FIELDS_EMPTY(emptyFields.current);
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
          errorMessage = errorMessage.concat(' ** AND ** ', constants.REVIEW_FORM_COMMENTARY_LENGTH);
        } else {
          errorMessage = constants.REVIEW_FORM_COMMENTARY_LENGTH;
        }

        if (guestEmailInvalid.current) {
          if (errorMessage) {
            errorMessage = errorMessage.concat(' ** AND ** ', constants.REVIEW_FORM_COMMENTARY_LENGTH);
          } else {
            errorMessage = constants.REVIEW_FORM_COMMENTARY_LENGTH;
          }
        }
        setFormErrorMessage(errorMessage);
      }
    }
  };

  const handleRoomId = () => {
    if (roomName && roomData) {
      console.log('hit handle room id');
      const singleRoomData = roomData.find((room) => room.name === roomName);
      setFormData({ ...formData, roomTypeId: singleRoomData.id });
    }
  };
  // todo set roomtypedid by finding name in the data.
  const handleFormChange = (e) => {
    formHasError.current = false;
    if (e.target.id !== 'roomTypeId') {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    } else {
      setRoomName(e.target.value);
      handleRoomId();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    generateError();
    if (!formHasError.current) {
      let newReservation;
      if (reservationId) {
        newReservation = await updateReservation(formData, setApiError);
      } else {
        newReservation = await saveReservation(formData, setApiError);
      }
      if (newReservation && !newReservation.error) {
        history.push('/reservations');
      } else {
        setApiError(true);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2>
        New Reservation
      </h2>
      {(formHasError.current || apiError) && <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message={formErrorMessage} />}
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
            onChange={handleFormChange}
          />
          <FormItemDropdown
            placeholder="Select room type"
            id="roomTypeId"
            type="select"
            label="Room Type:"
            onChange={handleFormChange}
            options={roomOptions}
            value={roomName}
            formValue={formData.roomTypeId}
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
