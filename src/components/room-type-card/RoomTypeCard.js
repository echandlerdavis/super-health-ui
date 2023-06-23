import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Edit } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import AppAlert from '../alert/Alert';
import constants from '../../utils/constants';
import styles from './RoomTypeCard.module.css';

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles(() => ({
  root: {
    // maxWidth: 345,
    height: '100%'
  }
}));

/**
 * @name RoomTypeCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const RoomTypeCard = ({
  roomType, apiError
}) => {
  const classes = useStyles();
  const history = useHistory();

  const handleEditClick = () => {
    history.push(`/room-types/edit/${roomType.id}`);
  };

  return (
    <>
      {apiError && <AppAlert severity="error" title="Error" message={constants.API_ERROR} />}
      <Card id={roomType.id} className={classes.root}>
        <div className={styles.CardContainer}>
          <CardContent>
            <div className={styles.content}>
              <Typography variant="body2" color="textSecondary">Name:</Typography>
              <Typography data-au="room-type-label">
                {roomType.name}
              </Typography>
              <Typography variant="body2" color="textSecondary">Description:</Typography>
              <Typography data-au="room-description-label">
                {roomType.description}
              </Typography>
              <Typography variant="body2" color="textSecondary">Nightly Rate:</Typography>
              <Typography data-au="room-rate-label">
                $
                {roomType.rate.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="textSecondary">Active Status:</Typography>
              <Typography data-au="room-active-label">
                {roomType.active ? 'Active' : 'Inactive'}
              </Typography>
            </div>
          </CardContent>
          <CardActions disableSpacing>
            <div className={styles.buttons}>
              <IconButton data-au="edit-button" aria-label="edit" onClick={handleEditClick}>
                <Edit />
              </IconButton>
            </div>
          </CardActions>
        </div>
      </Card>
    </>
  );
};

export default RoomTypeCard;
