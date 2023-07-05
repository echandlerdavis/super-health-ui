import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton, Card, CardContent, CardActions, Typography
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import AppAlert from '../alert/Alert';
import constants from '../../utils/constants';
import styles from './ViewEncounterCard.module.css';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

/**
 * @name ViewEncounterCard
 * @description displays single room-type card component
 * @param {*} props product
 * @return component
 */
const ViewEncounterCard = ({ encounter, apiError }) => {
  const { patientId } = useParams();
  const classes = useStyles();
  const history = useHistory();

  const handleDetailsClick = () => {
    history.push(`/patients/${patientId}/encounters/${encounter.id}/edit`);
  };

  return (
    <>
      {apiError && <AppAlert severity="error" title="Error" message={constants.API_ERROR} />}
      <Card id={encounter.id} className={classes.root}>
        <div className={styles.CardContainer}>
          <CardContent>
            <div className={styles.content}>
              <div>
                <Typography variant="body2" color="textSecondary">Date:</Typography>
                <Typography data-au="date-label">
                  {encounter.date}
                </Typography>
                <Typography variant="body2" color="textSecondary">Encounter Id:</Typography>
                <Typography data-au="id-label">
                  {encounter.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">Chief Complaint:</Typography>
                <Typography data-au="complaint-label">
                  {encounter.chiefComplaint}
                </Typography>
                <Typography variant="body2" color="textSecondary">Notes:</Typography>
                <Typography data-au="id-label">
                  {encounter.notes}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="textSecondary">Visit Code:</Typography>
                <Typography data-au="visit-code-label">
                  {encounter.visitCode}
                </Typography>
                <Typography variant="body2" color="textSecondary">Provider:</Typography>
                <Typography data-au="provider-label">
                  {encounter.provider}
                </Typography>
                <Typography variant="body2" color="textSecondary">Billing Code:</Typography>
                <Typography data-au="billing-code-label">
                  {encounter.billingCode}
                </Typography>
                <Typography variant="body2" color="textSecondary">ICD 10:</Typography>
                <Typography data-au="icd10-label">
                  {encounter.icd10}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="textSecondary">Total Cost:</Typography>
                <Typography data-au="total-cost-label">
                  $
                  {Number.parseFloat(encounter.totalCost).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">Copay:</Typography>
                <Typography data-au="copay-label">
                  $
                  {Number.parseFloat(encounter.copay).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="textSecondary">Pulse:</Typography>
                <Typography data-au="pulse-label">
                  {encounter.pulse ? encounter.pulse : 'N/A'}
                </Typography>
                <Typography variant="body2" color="textSecondary">Blood Pressure:</Typography>
                <Typography data-au="systolic-label">
                  {(encounter.systolic && encounter.diastolic)
                    ? `${encounter.systolic
                    }/${encounter.diastolic}`
                    : 'N/A'}

                </Typography>

              </div>
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <div className={styles.buttons}>
              <IconButton data-au="view-button" aria-label="edit" onClick={handleDetailsClick}>
                <Edit />
              </IconButton>
            </div>
          </CardActions>
        </div>
      </Card>
    </>
  );
};

export default ViewEncounterCard;
