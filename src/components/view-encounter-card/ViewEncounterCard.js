import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import AppAlert from '../alert/Alert';
import constants from '../../utils/constants';
import styles from '../encounter-card/RoomTypeCard.module.css';

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
  const classes = useStyles();

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
              </div>
              <div>
                <Typography variant="body2" color="textSecondary">International Classification of Dieseases:</Typography>
                <Typography data-au="icd10-label">
                  {encounter.icd10}
                </Typography>
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
                  {encounter.pulse}
                </Typography>
                <Typography variant="body2" color="textSecondary">Blood Pressure:</Typography>
                <Typography data-au="systolic-label">
                  {encounter.systolic}
                  /
                  {encounter.diastolic}
                </Typography>

              </div>
            </div>
          </CardContent>
          <CardActions disableSpacing />
        </div>
      </Card>
    </>
  );
};

export default ViewEncounterCard;
