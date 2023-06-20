import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

const fetchReviews = (setReviews, setApiError, productId) => {
  HttpHelper(Constants.REVIEWS_ENDPOINT(productId), 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setReviews)
    .catch(() => {
      setApiError(true);
    });
};

export default fetchReviews;
