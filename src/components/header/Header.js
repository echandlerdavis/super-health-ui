import React, { useState } from 'react';
import {
  AppBar, Button, Toolbar, Typography, makeStyles
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => {
  // const [apiError, setApiError] = useState(false);
  const history = useHistory();
  const classes = useStyles();
  const [active, setActive] = useState('');

  /**
   * @name handleReservationsClick
   * @description Redirect the page to /checkout when clicked
   */
  const handleReservationsClick = (event) => {
    history.push('/reservations');
    setActive(event.target.id);
  };

  /**
   * @name handleRoomTypeClick
   * @description Redirect the page to /profilepage when clicked
   */
  const handleRoomTypeClick = (event) => {
    history.push('/room-types');
    setActive(event.target.id);
  };

  return (
    <AppBar data-au="nav-bar" position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Hotel Bookings
        </Typography>
        <Button
          id="1"
          data-au="reservation-link"
          color="inherit"
          className={active === '1' ? 'active' : undefined}
          onClick={handleReservationsClick}
        >
          Reservations
        </Button>
        <Button
          id="2"
          data-au="room-typ-link"
          color="inherit"
          className={active === '2' ? 'active' : undefined}
          onClick={handleRoomTypeClick}
        >
          Room Types
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
