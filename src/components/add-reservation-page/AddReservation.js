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
    if (reservationId && !dataLoaded && roomData.length) {
      getInitialData(reservationId, setFormData, setDataLoaded, setRoomName, roomData, setApiError);
    }
  }, [reservationId, dataLoaded, roomData]);

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
    } else {
      formHasError.current = false;
    }
  };

  // TODO: Change Error messages
  const generateError = () => {
    setFormErrorMessage(null);
    validateFormData();
    let errorMessage = null;
    if (formHasError.current) {
      if (emptyFields.current.length) {
        errorMessage = constants.FORM_FIELDS_EMPTY(emptyFields.current);
      }
      setFormErrorMessage(errorMessage);
    }
  };

  const handleRoomId = () => {
    if (roomName && roomData) {
      const singleRoomData = roomData.find((room) => room.name === roomName);
      if (singleRoomData !== undefined) {
        setFormData({ ...formData, roomTypeId: singleRoomData.id });
      } else {
        setFormData({ ...formData, roomTypeId: null });
      }
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
    // validateFormData();
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
        setFormErrorMessage(constants.API_ERROR);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2>
        {reservationId ? 'Update ' : 'New '}
        {' '}
        Reservation
      </h2>
      {(emptyFields.current.length !== 0 || apiError) && <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message={formErrorMessage} />}
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.reservationForm}>
          <FormItem
            placeholder="example@example.com"
            type="email"
            id="guestEmail"
            label="Guest Email:"
            className={(emptyFields.current.includes('guestEmail') || guestEmailInvalid.current) && styles.invalidField}
            onChange={handleFormChange}
            value={formData.guestEmail}
            dataAU="guest-email-input"
          />
          {guestEmailInvalid.current
              && (
              <FormHelperText className={styles.helperText}>
                {constants.INVAID_EMAIL}
              </FormHelperText>
              )}
          <FormItem
            placeholder="mm-dd-yyyy"
            id="checkInDate"
            type="text"
            label="Check-in Date:"
            className={(emptyFields.current.includes('checkInDate') || checkInDateInvalid.current)
                  && styles.invalidField}
            onChange={handleFormChange}
            value={formData.checkInDate}
            dataAU="checkin-date-input"
          />
          {checkInDateInvalid.current
              && (
              <FormHelperText className={styles.helperText}>
                {constants.INVALID_DATE}
              </FormHelperText>
              )}
          <FormItem
            id="numberOfNights"
            type="number"
            label="Number of Nights:"
            className={(emptyFields.current.includes('numberOfNights') || numberOfNightsInvalid.current)
              && styles.invalidField}
            value={formData.numberOfNights}
            onChange={handleFormChange}
            dataAU="nights-input"
          />
          {numberOfNightsInvalid.current
              && (
              <FormHelperText className={styles.helperText}>
                {constants.NUMBER_INVALID}
              </FormHelperText>
              )}
          <FormItemDropdown
            placeholder="Select room type"
            id="roomTypeId"
            type="select"
            label="Room Type:"
            className={emptyFields.current.includes('roomTypeId')
              && styles.invalidField}
            onChange={handleFormChange}
            options={roomOptions}
            value={roomName}
            formValue={formData.roomTypeId}
            dataAU="room-type-select"
          />
          {(emptyFields.current && emptyFields.current.includes('roomTypeId'))
              && (
              <FormHelperText className={styles.helperText}>
                {constants.ROOM_TYPE_INVALID}
              </FormHelperText>
              )}
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
              {reservationId ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AddReservation;
