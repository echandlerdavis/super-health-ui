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

export default saveRoomType;
