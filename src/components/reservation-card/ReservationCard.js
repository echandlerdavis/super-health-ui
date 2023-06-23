import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Delete, Edit } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import getRoomType from './ReservationCardService';
import AppAlert from '../alert/Alert';
import constants from '../../utils/constants';
import styles from './ReservationCard.module.css';

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
 * @name ReservationCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ReservationCard = ({
  reservation, handleDelete
}) => {
  const classes = useStyles();
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState('');
  const [roomName, setRoomName] = useState('');
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    getRoomType(
      setRoomName,
      setTotalPrice,
      setApiError,
      reservation.roomTypeId,
      reservation.numberOfNights
    );
  }, [reservation]);

  const handleEditClick = () => {
    history.push(`/reservations/edit/${reservation.id}`);
  };

  // TODO: use apiError.
  return (
    <>
      {apiError && <AppAlert severity="error" title="Error" message={constants.API_ERROR} />}
      <Card id={reservation.id} className={classes.root}>
        <div className={styles.CardContainer}>
          <CardContent>
            <div className={styles.content}>
              <div>
                <Typography variant="body2" color="textSecondary">Guest Email:</Typography>
                <Typography data-au="guest-email-label">
                  {reservation.guestEmail}
                </Typography>
                <Typography variant="body2" color="textSecondary">Number of Nights:</Typography>
                <Typography data-au="nights-label">
                  {reservation.numberOfNights}
                </Typography>
                <Typography variant="body2" color="textSecondary">Room Type:</Typography>
                <Typography data-au="room-type-label">
                  {roomName}
                </Typography>
              </div>
              <div>
                <Typography variant="body2" color="textSecondary">Check-in Date:</Typography>
                <Typography data-au="check-in-date-label">
                  {reservation.checkInDate}
                </Typography>
                <Typography variant="body2" color="textSecondary">Total Price:</Typography>
                <Typography variant="body2" component="p">
                  {totalPrice}
                </Typography>
              </div>
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <div className={styles.buttons}>
              <IconButton data-au="edit-button" aria-label="edit" onClick={handleEditClick}>
                <Edit />
              </IconButton>
              <IconButton data-au="delete-button" aria-label="delete" id={reservation.id} onClick={handleDelete}>
                <Delete />
              </IconButton>
            </div>

          </CardActions>

        </div>
      </Card>
    </>
  );
};

export default ReservationCard;
