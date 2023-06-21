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
    rate: null,
    active: true
  };
  const [formData, setFormData] = useState(initialFormData);
  const [apiError, setApiError] = useState(false);

  //   const [formErrorMessage, setFormErrorMessage] = useState(null);
  const formHasError = useRef(false);
  //   const inputsAreInvalid = useRef(false);
  //   const commentaryLengthIsInvalid = useRef(false);
  //   const ratingIsInvalid = useRef(false);

  // const validateInputsNotEmpty = () => {
  //   const summary = formData.title;
  //   const commentary = formData.review;
  //   return (summary.trim().length === 0 && commentary.trim().length === 0);
  // };
  // const validateCommentaryLength = () => {
  //   const commentary = formData.review;
  //   return (commentary.trim().length > 500);
  // };
  // const validateRating = () => {
  //   const { rating } = formData;
  //   return !(rating && rating >= 0.5 && rating <= 5);
  // };
  // const validateFormData = () => {
  //   inputsAreInvalid.current = validateInputsNotEmpty();
  //   commentaryLengthIsInvalid.current = validateCommentaryLength();
  //   ratingIsInvalid.current = validateRating();
  //   if (inputsAreInva
  //   lid.current || ratingIsInvalid.current || commentaryLengthIsInvalid.current) {
  //     formHasError.current = true;
  //   } else {
  //     formHasError.current = false;
  //   }
  // };
  // const generateError = () => {
  //   setFormErrorMessage(null);
  //   validateFormData();
  //   let errorMessage = null;
  //   if (inputsAreInvalid.current) {
  //     errorMessage = constants.REVIEW_FORM_INVALID_INPUTS;
  //   }
  //   if (ratingIsInvalid.current) {
  //     if (errorMessage) {
  //       errorMessage = errorMessage.concat(' ** AND ** ', constants.REVIEW_FORM_INVALID_RATING);
  //     } else {
  //       errorMessage = constants.REVIEW_FORM_INVALID_RATING;
  //     }
  //   }
  //   if (commentaryLengthIsInvalid.current) {
  //     if (errorMessage) {
  //       errorMessage =
  //    errorMessage.concat(' ** AND ** ', constants.REVIEW_FORM_COMMENTARY_LENGTH);
  //     } else {
  //       errorMessage = constants.REVIEW_FORM_COMMENTARY_LENGTH;
  //     }
  //   }
  //   setFormErrorMessage(errorMessage);
  // };
  // todo set roomtypedid by finding name in the data.
  const handleFormChange = (e) => {
    formHasError.current = false;
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //   generateError();
    if (!formHasError.current) {
      const newRoomType = await saveRoomType(formData, setApiError);
      if (newRoomType && !newRoomType.error) {
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
