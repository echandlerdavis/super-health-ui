import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import { Delete } from '@material-ui/icons';
// import PageviewIcon from '@material-ui/icons/Pageview';
// import { useHistory } from 'react-router-dom';
import styles from '../patient-card/PatientCard.module.css';

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
 * @name ViewPatientCard
 * @description displays single patient card component
 * @param {*} props patient, handleDelete
 * @return component
 */
const ViewPatientCard = ({
  patient
}) => {
  const classes = useStyles();
  // const history = useHistory();

  // const handleDetailsClick = () => {
  //   history.push(`/patients/${patient.id}`);
  // };

  return (
    <>
      <Card className={classes.root}>
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
                <Typography variant="body2" color="textSecondary">Patient Id: </Typography>
                <Typography data-au="id-label">
                  {patient.id}
                </Typography>
                <Typography variant="body2" color="textSecondary">Email: </Typography>
                <Typography data-au="email-label">
                  {patient.email}
                </Typography>
                <Typography variant="body2" color="textSecondary">Street: </Typography>
                <Typography data-au="street-label">
                  {patient.street}
                </Typography>
                <Typography variant="body2" color="textSecondary">City: </Typography>
                <Typography data-au="city-label">
                  {patient.city}
                </Typography>
                <Typography variant="body2" color="textSecondary">State: </Typography>
                <Typography data-au="city-label">
                  {patient.state}
                </Typography>
                <Typography variant="body2" color="textSecondary">Zip Code: </Typography>
                <Typography data-au="zip-label">
                  {patient.postal}
                </Typography>

              </div>
              <div>
                <Typography variant="body2" color="textSecondary">Age: </Typography>
                <Typography data-au="age-label">
                  {patient.age}
                </Typography>
                <Typography variant="body2" color="textSecondary">Height: </Typography>
                <Typography data-au="height-label">
                  {patient.height}
                </Typography>
                <Typography variant="body2" color="textSecondary">Weight: </Typography>
                <Typography data-au="weight-label">
                  {patient.weight}
                </Typography>
                <Typography variant="body2" color="textSecondary">Insurance: </Typography>
                <Typography data-au="insurance-label">
                  {patient.insurance}
                </Typography>
                <Typography variant="body2" color="textSecondary">Gender: </Typography>
                <Typography data-au="gender-label">
                  {patient.gender}
                </Typography>
              </div>
            </div>
          </CardContent>
          {/* <CardActions disableSpacing>
            <div className={styles.buttons}>
              <IconButton data-au="view-button" aria-label="edit" onClick={handleDetailsClick}>
                <PageviewIcon />
              </IconButton>
              {/* <IconButton data-au="delete-button" aria-label="delete"
               id={patient.id} onClick={handleDelete}>
                <Delete />
              </IconButton> */}
        </div>

        {/* </CardActions> */}

        {/* </div> */}
      </Card>
    </>
  );
};

export default ViewPatientCard;
