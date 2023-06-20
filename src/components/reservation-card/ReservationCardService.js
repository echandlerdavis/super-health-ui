import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

export const toPrice = (totalPrice) => `$${totalPrice.toFixed(2)}`;

export const getTotal = (roomRate, numberOfNights) => toPrice(roomRate * numberOfNights);

const getRoomType = (setRoomName, setTotalPrice, setApiError, roomTypeId, numberOfNights) => {
  HttpHelper(constants.SINGLE_ROOM_TYPE_ENDPOINT(roomTypeId), 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then((data) => {
      setRoomName(data.name);
      setTotalPrice(getTotal(data.rate, numberOfNights));
    })
    .catch(() => {
      setApiError(true);
    });
};

export default getRoomType;
