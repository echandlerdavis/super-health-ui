import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

/**
 * @name saveRoomType
 * @description Persists a room type object to the database
 * @param {Object} roomType - object to be persisted
 * @param {Function} setApiError - sets error if error
 * @returns response object if success, boolean if error.
 */
const saveRoomType = async (roomType, setApiError) => {
  try {
    const response = await HttpHelper(constants.ROOM_TYPE_ENDPOINT, 'POST', roomType);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};

/**
 * @name updateRoomType
 * @description Persists updated room type object to the database.
 * @param {Object} roomType
 * @param {Function} setApiError
 * @returns response object if success, boolean if error
 */
export const updateRoomType = async (roomType, setApiError) => {
  try {
    const response = await HttpHelper(`${constants.ROOM_TYPE_ENDPOINT}/${roomType.id}`, 'PUT', roomType);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};

/**
 * @name getInitialRoomData
 * @description when updating a room, sets the form to the initial data of the room.
 * @param {int} id - id of the room type to be updated
 * @param {Function} setFormData - sets the form Data to the data retrieved
 * @param {Function} setDataLoaded - sets the data loaded to true so it's only run once
 * @param {Function} setApiError - sets error if error.
 */
export const getInitialRoomData = (id, setFormData, setDataLoaded, setApiError) => {
  HttpHelper(`${constants.ROOM_TYPE_ENDPOINT}/${id}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then((data) => {
      setFormData(data);
      setDataLoaded(true);
    })
    .catch(() => {
      setApiError(true);
    });
};

export default saveRoomType;
