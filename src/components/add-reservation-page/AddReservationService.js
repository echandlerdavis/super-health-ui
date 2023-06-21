import HttpHelper from "../../utils/HttpHelper"
import constants from "../../utils/constants"


export const fetchRoomData = (setRoomData, setRoomOptions, setApiError) => {
    HttpHelper(constants.ACTIVE_ROOM_TYPE_ENDPOINT, 'GET')
        .then((response) => response.json())
        .then((data) => {
            setRoomData(data);
            const roomArray = [];
            Object.keys(data).forEach(key => {
                roomArray.push(data[key].name)
            });
            setRoomOptions(roomArray);
        })
        .catch(() => setApiError(true));
}