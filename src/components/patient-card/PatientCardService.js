// import HttpHelper from '../../utils/HttpHelper';
// import constants from '../../utils/constants';

// // /**
// //  * @name toPrice
// //  * @description Converts total price to string with two decimal places.
// //  * @param {number} totalPrice
// //  * @returns string
//  */
// // const toPrice = (totalPrice) => `$${totalPrice.toFixed(2)}`;

// // /**
// //  * @name getTotal
// //  * @param {number} roomRate - rate of the room
// //  * @param {number} numberOfNights - number of nights the room will be used.
// //  * @returns total price of the reservation to the correct format.
// //  */
// // const getTotal = (roomRate, numberOfNights) => toPrice(roomRate * numberOfNights);

// /**
// //  * @name getRoomType
// //  * @description Because the information a reservation has in the database on room type
// //  * is only the id, this sets the card to display the name of the room instead.
// //  * @param {Function} setRoomName - sets name of room to display.
// //  * @param {Function} setTotalPrice - sets total price to display.
// //  * @param {Function} setApiError - sets error if error
// //  * @param {int} roomTypeId - id to fetch room data
// //  * @param {int} numberOfNights - number of nights to caluculate total price.
// //  */
// // const getRoomType = (
// //   setRoomName, setTotalPrice, setApiError, roomTypeId, numberOfNights
// // ) => {
// //   HttpHelper(constants.SINGLE_ROOM_TYPE_ENDPOINT(roomTypeId), 'GET')
// //     .then((response) => {
// //       if (response.ok) {
// //         return response.json();
// //       }
// //       throw new Error(constants.API_ERROR);
// //     })
// //     .then((data) => {
// //       setRoomName(data.name);
// //       setTotalPrice(getTotal(data.rate, numberOfNights));
// //     })
// //     .catch(() => {
// //       setApiError(true);
// //     });
// // };

// // export default getRoomType;
