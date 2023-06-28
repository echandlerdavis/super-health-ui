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
  const history = useHistory();
  const classes = useStyles();
  const [active, setActive] = useState('');

  /**
   * @name handleReservationsClick
   * @description Redirect the page to /reservations when clicked
   */
  const handlePatientClick = (event) => {
    history.push('/patients');
    setActive(event.target.id);
  };

  return (
    <AppBar data-au="nav-bar" position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Super Health, Inc.
        </Typography>
        <Button
          id="1"
          data-au="reservation-link"
          color="inherit"
          className={active === '1' ? 'active' : undefined}
          onClick={handlePatientClick}
        >
          Patients
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
