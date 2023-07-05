import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Pageview } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import AppAlert from '../alert/Alert';
import constants from '../../utils/constants';
import styles from './EncounterCard.module.css';

/**
 * @name useStyles
 * @description Material-ui styling for EncounterCard component
 * @return styling
 */
const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

/**
 * @name EncounterCard
 * @description displays single encounter card component
 * @param {*} props encounter
 * @return component
 */
const EncounterCard = ({
  patientId, encounter, apiError
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleViewClick = () => {
    history.push(`/patients/${patientId}/encounters/${encounter.id}`);
  };

  return (
    <>
      {apiError && <AppAlert severity="error" title="Error" message={constants.API_ERROR} />}
      <Card id={encounter.id} className={classes.root}>
        <div className={styles.CardContainer}>
          <CardContent>
            <div className={styles.content}>
              <div>
                <Typography variant="body2" color="textSecondary">Encounter Id:</Typography>
                <Typography data-au="id-label">
                  {encounter.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">Visit Code:</Typography>
                <Typography data-au="visit-code-label">
                  {encounter.visitCode}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="textSecondary">Provider:</Typography>
                <Typography data-au="provider-label">
                  {encounter.provider}
                </Typography>
                <Typography variant="body2" color="textSecondary">Date:</Typography>
                <Typography data-au="date-label">
                  {encounter.date}
                </Typography>
              </div>
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <div className={styles.buttons}>
              <IconButton data-au="view-button" aria-label="view" onClick={handleViewClick}>
                <Pageview />
              </IconButton>
            </div>
          </CardActions>
        </div>
      </Card>
    </>
  );
};

export default EncounterCard;
