import React, {  useEffect, useState } from 'react';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { LOGOUT } from '../../actions/actionTypes';

const useStyles = makeStyles(() => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    color: '#966f33',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '600px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '200px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('bookmark-profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  
  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('bookmark-profile')));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]); 

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Book Mark</Typography>
        </div>
        <Toolbar className={classes.toolbar}>
          {user?.result ? (
            <div className={classes.profile}>
              <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}
        </Toolbar>
    </AppBar>
  )
}

export default Navbar;