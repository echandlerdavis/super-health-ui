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
import saveRoomType, { getInitialRoomData, updateRoomType } from './AddRoomTypeService';
import styles from './AddRoomType.module.css';

/**
   * @name getRoomTypeEmptyFields
   * @description Generates a list of empty fields
   * @returns array of field names that are empty
   */
export const getRoomTypeEmptyFields = (formData) => {
  const emptyInputs = Object.keys(formData).filter((key) => {
    const formInput = formData[key];
    if (formInput) {
      if (typeof formInput === 'string') {
        formInput.trim();
      }
      return formInput.length === 0;
    }
    if (key === 'active') {
      return formInput === null;
    }
    return !formInput;
  });

  return emptyInputs;
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
 * @name validateNameLength
 * @description Validates that the name is greater than three characters in length.
 * @param {Object} formData
 * @returns boolean
 */
export const validateNameLength = (formData) => {
  const { name } = formData;
  return name && name.trim().length > 3;
};

/**
 * @name validateRate
 * @description Validates the rate is larger than 0.
 * @param {Object} formData
 * @returns boolean
 */
export const validateRate = (formData) => formData.rate && formData.rate > 0;

/**
 * @name AddRoomType
 * @description Displays a form to add or update a room-type.
 * @returns component
 */
const AddRoomType = () => {
  const history = useHistory();
  const { roomTypeId } = useParams();
  const initialFormData = {
    name: '',
    description: '',
    rate: 0.00,
    active: true
  };
  const [formData, setFormData] = useState(initialFormData);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const [emptyFieldErrors, setEmptyFieldErrors] = useState([]);
  const [invalidFieldErrors, setInvalidFieldErrors] = useState([]);
  const formHasError = useRef(false);
  const emptyFields = useRef([]);
  const nameLengthInvalid = useRef(false);
  const roomRateInvalid = useRef(false);

  useEffect(() => {
    if (roomTypeId && !dataLoaded) {
      getInitialRoomData(roomTypeId, setFormData, setDataLoaded, setApiError);
    }
  }, [roomTypeId, dataLoaded]);

  /**
   * validates all fields
   */
  const validateFormData = () => {
    emptyFields.current = getRoomTypeEmptyFields(formData);
    nameLengthInvalid.current = !validateNameLength(formData);
    roomRateInvalid.current = !validateRate(formData);
    if (emptyFields.current.length || nameLengthInvalid.current || roomRateInvalid.current) {
      formHasError.current = true;
    } else {
      formHasError.current = false;
    }
  };
  /**
   * creates error message for empty fields
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
      setFormErrorMessage(errorMessage);
      if (nameLengthInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'name']);
      }
      if (roomRateInvalid.current) {
        setInvalidFieldErrors((prev) => [...prev, 'rate']);
      }
    }
  };

  /**
   * updates the formData based on user input.
   * @param {event} param target
   */
  const handleFormChange = ({ target }) => {
    let { value } = target;
    const { id, type } = target;
    formHasError.current = false;
    if (type === 'checkbox') {
      value = !formData[id];
    }
    setFormData({ ...formData, [id]: value });
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
   * persists the formData to the database if there are no errors
   * @param {event} e
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    generateError();
    if (!formHasError.current) {
      let newRoomType;
      if (roomTypeId) {
        newRoomType = await updateRoomType(formData, setApiError);
      } else {
        newRoomType = await saveRoomType(formData, setApiError);
      }
      if (newRoomType && !newRoomType.error) {
        history.push('/room-types');
      } else {
        setApiError(true);
        setFormErrorMessage(constants.API_ERROR);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2>
        {roomTypeId ? 'Update ' : 'New '}
        {' '}
        Room Type
      </h2>
      {(emptyFieldErrors.length !== 0 || apiError) && <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message={formErrorMessage} />}
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.roomTypeForm}>
          <FormItem
            dataAU="room-name-input"
            placeholder="Write room name here."
            type="text"
            id="name"
            label="Name:"
            className={(emptyFieldErrors.includes('name') || invalidFieldErrors.includes('name')) && styles.invalidField}
            onChange={handleFormChange}
            value={formData.name}
          />
          {(emptyFieldErrors.includes('name') || invalidFieldErrors.includes('name'))
                && (
                <FormHelperText className={styles.helperText}>
                  {constants.NAME_INVALID}
                </FormHelperText>
                )}
          <FormItem
            dataAU="room-description-input"
            placeholder="Write description here."
            id="description"
            type="textarea"
            label="Description:"
            className={
              (emptyFieldErrors.includes('description'))
                    && styles.invalidField
                  }
            onChange={handleFormChange}
            value={formData.description}
          />
          {emptyFieldErrors.includes('description')
                && (
                <FormHelperText className={styles.helperText}>
                  {constants.EMPTY_FIELD}
                </FormHelperText>
                )}
          <FormItem
            dataAU="room-rate-input"
            placeholder="0.00"
            id="rate"
            type="number"
            label="Rate:"
            className={(emptyFieldErrors.includes('rate') || invalidFieldErrors.includes('rate')) && styles.invalidField}
            value={parseFloat(formData.rate).toFixed(2)}
            onChange={handleFormChange}
            step={0.01}
          />
          {(emptyFieldErrors.includes('rate') || invalidFieldErrors.includes('rate'))
                && (
                <FormHelperText className={styles.helperText}>
                  {constants.NUMBER_INVALID}
                </FormHelperText>
                )}
          <FormItem
            dataAU="room-active-input"
            id="active"
            type="checkbox"
            label="Active Status: "
            value={formData.active}
            onChange={handleFormChange}
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
              data-au={roomTypeId ? 'update-button' : 'create-button'}
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
              {roomTypeId ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
export default AddRoomType;
