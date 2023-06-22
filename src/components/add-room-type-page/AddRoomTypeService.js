import HttpHelper from '../../utils/HttpHelper';
import constants from '../../utils/constants';

const saveRoomType = async (roomType, setApiError) => {
  try {
    const response = await HttpHelper(constants.ROOM_TYPE_ENDPOINT, 'POST', roomType);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};

export const updateRoomType = async (roomType, setApiError) => {
  try {
    const response = await HttpHelper(`${constants.ROOM_TYPE_ENDPOINT}/${roomType.id}`, 'PUT', roomType);
    return response.json();
  } catch {
    setApiError(true);
    return false;
  }
};

export const getInitialData = (id, setFormData, setDataLoaded, setApiError) => {
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
