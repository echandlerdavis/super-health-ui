import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

export const fetchRoomData = (setRoomData, setRoomOptions, setApiError) => {
  HttpHelper(constants.ACTIVE_ROOM_TYPE_ENDPOINT, 'GET')
    .then((response) => response.json())
    .then((data) => {
      setRoomData(data);
      const roomArray = [];
      Object.keys(data).forEach((key) => {
        if (data[key].active === true) {
          roomArray.push(data[key].name);
        }
      });
      setRoomOptions(roomArray);
    })
    .catch(() => setApiError(true));
};

export const saveReservation = async (reservation, setApiError) => {
  try {
    const response = await HttpHelper(constants.RESERVATIONS_ENDPOINT, 'POST', reservation);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};

export const getInitialData = (
  id, setFormData, setDataLoaded, setRoomName, roomData, setApiError
) => {
  HttpHelper(`${constants.RESERVATIONS_ENDPOINT}/${id}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(constants.API_ERROR);
    })
    .then((data) => {
      setFormData(data);
      setDataLoaded(true);
      return data.roomTypeId;
    })
    .then((roomTypeId) => {
      setRoomName(roomData.find((room) => room.id === roomTypeId).name);
    })
    .catch(() => {
      setApiError(true);
    });
};

export const updateReservation = async (reservation, setApiError) => {
  try {
    const response = await HttpHelper(`${constants.RESERVATIONS_ENDPOINT}/${reservation.id}`, 'PUT', reservation);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};
