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
import saveRoomType, { getInitialData, updateRoomType } from './AddRoomTypeService';
import styles from './AddRoomType.module.css';

export const getEmptyFields = (formData) => {
  const emptyInputs = Object.keys(formData).filter((key) => {
    const formInput = formData[key];
    if (formInput) {
      if (typeof formInput === 'string') {
        formInput.trim();
      }
      return formInput.length === 0;
    }

    return formInput === null;
  });

  return emptyInputs;
};

export const validateNameLength = (formData) => {
  const { name } = formData;
  return name && name.trim().length > 3;
};

export const validateRate = (formData) => formData.rate && formData.rate > 0;

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
  const formHasError = useRef(false);
  const emptyFields = useRef([]);
  const nameLengthInvalid = useRef(false);
  const roomRateInvalid = useRef(false);

  useEffect(() => {
    if (roomTypeId && !dataLoaded) {
      getInitialData(roomTypeId, setFormData, setDataLoaded, setApiError);
    }
  }, [roomTypeId, dataLoaded]);

  const validateFormData = () => {
    emptyFields.current = getEmptyFields(formData);
    nameLengthInvalid.current = !validateNameLength(formData);
    roomRateInvalid.current = !validateRate(formData);
    if (emptyFields.current.length || nameLengthInvalid.current || roomRateInvalid.current) {
      formHasError.current = true;
    } else {
      formHasError.current = false;
    }
  };
  const generateError = () => {
    setFormErrorMessage(null);
    validateFormData();
    let errorMessage = null;
    if (emptyFields.current.length) {
      errorMessage = constants.FORM_FIELDS_EMPTY(emptyFields.current);
    }
    setFormErrorMessage(errorMessage);
  };

  // todo set roomtypedid by finding name in the data.
  const handleFormChange = ({ target }) => {
    let { value } = target;
    const { id, type } = target;
    formHasError.current = false;
    if (type === 'checkbox') {
      value = !formData[id];
    }
    setFormData({ ...formData, [id]: value });
  };

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
      {(emptyFields.current.length !== 0 || apiError) && <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message={formErrorMessage} />}
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.roomTypeForm}>
          <FormItem
            dataAU="room-name-input"
            placeholder="Write room name here."
            type="text"
            id="name"
            label="Name:"
            className={(emptyFields.current.includes('name') || nameLengthInvalid.current) && styles.invalidField}
            onChange={handleFormChange}
            value={formData.name}
          />
          {(emptyFields.current.includes('name') || nameLengthInvalid.current)
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
                    (emptyFields.current.includes('description'))
                    && styles.invalidField
                  }
            onChange={handleFormChange}
            value={formData.description}
          />
          {emptyFields.current.includes('description')
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
            className={roomRateInvalid.current && styles.invalidField}
            value={parseFloat(formData.rate).toFixed(2)}
            onChange={handleFormChange}
            step={0.01}
          />
          {(emptyFields.current.includes('rate') || roomRateInvalid.current)
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
