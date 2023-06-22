import React, {
  useState, useRef
} from 'react';
import {
  Button, Card
} from '@material-ui/core';
import { Cancel, Save } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import AppAlert from '../alert/Alert';
import constants, { SEVERITY_LEVELS } from '../../utils/constants';
import FormItem from '../form/FormItem';
import saveRoomType from './AddRoomTypeService';
import styles from './AddRoomType.module.css';

const AddRoomType = () => {
  const history = useHistory();
  const initialFormData = {
    name: '',
    description: '',
    rate: 0,
    active: true
  };
  const [formData, setFormData] = useState(initialFormData);
  const [apiError, setApiError] = useState(false);

  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const formHasError = useRef(false);
  const emptyFields = useRef([]);
  const nameLengthInvalid = useRef(false);
  const roomRateInvalid = useRef(false);

  const getEmptyFields = () => {
    const emptyInputs = Object.keys(formData).filter((key) => {
      let formInput = formData[key];
      if (typeof formInput === 'string') {
        formInput = formInput.trim();
      }
      return formInput.length === 0;
    });
    return emptyInputs;
  };

  const validateNameLength = () => {
    const { name } = formData;
    return name && name.trim().length < 3;
  };

  const validateRate = () => formData.rate && formData.rate <= 0;
  const validateFormData = () => {
    emptyFields.current = getEmptyFields();
    nameLengthInvalid.current = validateNameLength();
    roomRateInvalid.current = validateRate();
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
    if (nameLengthInvalid.current) {
      if (errorMessage) {
        errorMessage = errorMessage.concat(' ** AND ** ', constants.REVIEW_FORM_INVALID_RATING);
      } else {
        errorMessage = constants.REVIEW_FORM_INVALID_RATING;
      }
    }
    if (roomRateInvalid.current) {
      if (errorMessage) {
        errorMessage = errorMessage.concat(' ** AND ** ', constants.REVIEW_FORM_COMMENTARY_LENGTH);
      } else {
        errorMessage = constants.REVIEW_FORM_COMMENTARY_LENGTH;
      }
    }
    setFormErrorMessage(errorMessage);
  };

  // todo set roomtypedid by finding name in the data.
  const handleFormChange = (e) => {
    formHasError.current = false;
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    generateError();
    if (!formHasError.current) {
      const newRoomType = await saveRoomType(formData, setApiError);
      if (newRoomType && !newRoomType.error) {
        history.push('/room-types');
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
      {(formHasError.current || apiError) && <AppAlert severity={SEVERITY_LEVELS.ERROR} title="Error" message={formErrorMessage} />}
      <Card className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.reviewForm}>
          <FormItem
            placeholder="Write room name here."
            type="text"
            id="name"
            label="Name:"
              // className={!inputsAreInvalid.current ? styles.summaryInput : styles.invalidField}
            onChange={handleFormChange}
            value={formData.name}
          />
          {/* {inputsAreInvalid.current
                && (
                <FormHelperText className={styles.helperTextFirstInput}>
                  Either summary or commentary must be filled in.
                </FormHelperText>
                )} */}
          <FormItem
            placeholder="Write description here."
            id="description"
            type="textarea"
            label="Description:"
              // className={
              //       (inputsAreInvalid.current || commentaryLengthIsInvalid.current)
              //       && styles.invalidField
              //     }
            onChange={handleFormChange}
            value={formData.description}
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
            id="rate"
            type="number"
            label="Rate:"
            value={formData.rate}
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
export default AddRoomType;
