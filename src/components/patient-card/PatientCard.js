import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Delete } from '@material-ui/icons';
import PageviewIcon from '@material-ui/icons/Pageview';
import { useHistory } from 'react-router-dom';
import styles from './PatientCard.module.css';
import AppAlert from '../alert/Alert';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles(() => ({
  root: {
    minWidth: 500,
    height: '100%'
  }
}));

/**
 * @name PatientCard
 * @description displays single patient card component
 * @param {*} props patient, handleDelete
 * @return component
 */
const PatientCard = ({
  patient, handleDelete, deleteErrorList, deleteErrorMessage
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleDetailsClick = () => {
    history.push(`/patients/${patient.id}`);
  };

  return (
    <>
      <Card id={patient.id} className={classes.root}>
        <div className={styles.CardContainer}>
          <CardContent>
            <div className={styles.content}>
              <div>
                <Typography variant="body2" color="textSecondary">Name: </Typography>
                <Typography data-au="name-label">
                  {patient.firstName}
                  {' '}
                  {patient.lastName}
                </Typography>
                <Typography variant="body2" color="textSecondary">Age: </Typography>
                <Typography data-au="age-label">
                  {patient.age}
                </Typography>
                <Typography variant="body2" color="textSecondary">Gender: </Typography>
                <Typography data-au="gender-label">
                  {patient.gender}
                </Typography>
              </div>
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <div className={styles.buttons}>
              <IconButton data-au="view-button" aria-label="edit" onClick={handleDetailsClick}>
                <PageviewIcon />
              </IconButton>
              <IconButton data-au="delete-button" aria-label="delete" id={patient.id} onClick={handleDelete}>
                <Delete />
              </IconButton>
            </div>

          </CardActions>
          {deleteErrorList.includes(patient.id) && <div><AppAlert severity="error" title="Error" message={deleteErrorMessage} /></div>}
        </div>
      </Card>
    </>
  );
};

export default PatientCard;
