import React, { useState } from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { AllInclusive } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import loginUser from './HeaderService';
import constants from '../../utils/constants';
import iconWithBadge from './IconWithBadge';
import { useCart } from '../checkout-page/CartContext';
import styles from './Header.module.css';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => {
  const [user, setUser] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [apiError, setApiError] = useState(false);
  const history = useHistory();
  const {
    state: { products }
  } = useCart();

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was successful
   * @param {Object} response Response object from google
   */
  const handleGoogleLoginSuccess = (response) => {
    sessionStorage.setItem('token', response.getAuthResponse().id_token);
    const googleUser = {
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName
    };
    loginUser(googleUser, setUser, setApiError);
    setGoogleError('');
  };

  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was unsuccessful
   */
  const handleGoogleLoginFailure = () => {
    setGoogleError(
      'There was a problem logging in with Google. Please wait and try again later.'
    );
  };

  /**
   * @name handleGoogleLogoutSuccess
   * @description Function to run if google logout was successful
   */
  const handleGoogleLogoutSuccess = () => {
    setUser('');
    setGoogleError('');
  };

  /**
   * @name handleGoogleLogoutFailure
   * @description Function to run if google logout was unsuccessful
   */
  const handleGoogleLogoutFailure = () => {
    setGoogleError(
      'There was a problem logging out with Google. Please wait and try again later.'
    );
  };

  /**
   * @name handleLogoClick
   * @description Redirect the page to / when clicked
   */
  const handleLogoClick = () => {
    history.push('/');
  };
  /**
   * @name handleCartClick
   * @description Redirect the page to /checkout when clicked
   */
  const handleCartClick = () => {
    history.push('/checkout');
  };

  return (
    <div id={styles.header} className="Set-to-front">
      <AllInclusive className={styles.appLogo} onClick={handleLogoClick} />
      {googleError && <span>{googleError}</span>}
      {apiError && <span>Api Error</span>}
      {iconWithBadge(
        {
          baseIcon: <ShoppingCartIcon onClick={handleCartClick} />,
          displayValue: products.length
        }
      )}
      {!user ? (
        <GoogleLogin
          clientId={constants.GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy="single_host_origin"
        />
      ) : (
        <GoogleLogout
          clientId={constants.GOOGLE_CLIENT_ID}
          buttonText="Logout"
          onLogoutSuccess={handleGoogleLogoutSuccess}
          onFailure={handleGoogleLogoutFailure}
        />
      )}
      {
        <span className={styles.optionalText} style={{ flexBasis: '10vh' }}>
          {user && `${user.firstName} ${user.lastName}`}
        </span>
      }
    </div>
  );
};

export default Header;
