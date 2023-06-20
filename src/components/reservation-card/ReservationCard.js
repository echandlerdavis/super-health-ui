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

/**
 * @name useStyles
 * @description Material-ui styling for ProductCard component
 * @return styling
 */
const useStyles = makeStyles(() => ({
  root: {
    // maxWidth: 345,
    height: '100%'
  },
  header: {
    minHeight: 100
  }
}));
// /**
//  * Validates the product id
//  * @param {product Object} product
//  * @returns boolean
//  */
// export const productHasId = (product) => product.id !== undefined && product.id !== null;

// /**
//  * Verify that there is enough inventory to handle the order
//  * @param {int} inventoryQty quanity from product from the server; NOT state.prodcuts
//  * @param {int} orderQty quantity that the customer would like to order
//  * @returns boolean
//  */
// export const haveEnoughInventory = (inventoryQty, orderQty) => inventoryQty >= orderQty;

// /**
//  * Returns true if the given product is in the given orders
//  * @param {product} product
//  * @param {array} orders
//  * @returns boolean
//  */
// export const inOrder = (product, orders) => orders.filter((p) => p.id === product.id).length > 0;

// /**
//  * Validate that the given product is valid
//  * @param {Product object} product
//  * @returns result Object {valid: boolean, errors: [string]}
//  */
// export const validateOrder = (product, orders, desiredQty) => {
//   const result = {
//     valid: true,
//     errors: []
//   };
//   // Validate the product id
//   if (!productHasId(product)) {
//     result.valid = false;
//     result.errors.push(Constants.PRODUCT_MISSING_ID);
//   }
//   // Validate inventory
//   // if product has no id, can't verify inventory
//   if (result.valid) {
//     // user has already clicked add icon, so orderQty is currenty orderQty + 1
//     let orderQty = desiredQty;
//     if (orderQty === undefined && inOrder(product, orders)) {
//       orderQty = orders.filter((p) => p.id === product.id)[0].quantity + 1;
//     } else if (orderQty === undefined) {
//       orderQty = 1;
//     }
//     if (!haveEnoughInventory(product.quantity, orderQty)) {
//       result.valid = false;
//       result.errors.push(Constants.INSUFFICIENT_INVENTORY);
//     }
//   }

//   return result;
// };

// /**
//  * Consolidate the given list of duplicates into a single order item with a larger quantity.
//  * @param {object} product the product that has duplicates
//  * @param {array} duplicates an array of the duplicate products iin the order
//  * @param {array} order state.products
//  */
// export const consolidateOrder = (product, duplicates, order) => {
//   const firstDuplicate = order.find((p) => p.id === product.id);
//   while (duplicates.length > 1) {
//     const duplicate = duplicates.pop();
//     const duplicateIndex = order.lastIndexOf((p) => p.id === product.id);
//     firstDuplicate.quantity += duplicate.quantity;
//     order.splice(duplicateIndex, 1);
//   }
// };

/**
 * @name ReservationCard
 * @description displays single product card component
 * @param {*} props product
 * @return component
 */
const ReservationCard = ({
  reservation
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
    history.push('/reservations/:id');
  };
  // TODO: use apiError.
  return (
    <>
      {apiError && <AppAlert severity="error" title="Error" message={constants.API_ERROR} />}
      <Card id={reservation.id} className={classes.root}>
        {/* <div className={styles.CardContainer}> */}
        <CardContent>
          <Typography data-au="guest-email-label" variant="body2" color="textSecondary" component="p">
            {reservation.guestEmail}
          </Typography>
          <Typography data-au="nights-label">
            {reservation.numberOfNights}
          </Typography>
          <Typography data-au="room-type-label">
            {roomName}
          </Typography>
          <Typography data-au="check-in-date-label">
            {reservation.checkInDate}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Price: $
            {totalPrice}
          </Typography>
        </CardContent>
        {/* </div> */}
        <CardActions disableSpacing>
          <IconButton data-au="edit-button" aria-label="edit" onClick={handleEditClick}>
            <Edit />
          </IconButton>
          <IconButton data-au="delete-button" aria-label="delete">
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
};

export default ReservationCard;
