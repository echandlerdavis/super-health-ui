import HttpHelper from "../../utils/HttpHelper"
import constants from "../../utils/constants"


export const getRoomType = (setRoomType, setApiError, roomTypeId) => {
 HttpHelper(constants.SINGLE_ROOM_TYPE_ENDPOINT(roomTypeId), 'GET')
        .then((response) => {
            if(response.ok){
                return response.json();
            }
            throw new Error(constants.API_ERROR)
        })
        .then(setRoomType)
        .catch(() => {
            setApiError(true);
        })

};

export const getTotal = (roomRate, numberOfDays) => {
    return toPrice(roomRate * numberOfDays);
}

export const toPrice = (totalPrice) => `$${totalPrice.toFixed(2)}`

