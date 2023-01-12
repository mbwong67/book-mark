import React from 'react';
import { AppBar, Button, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
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
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
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
  const location = useLocation();
  const history = useHistory();

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
        <div className={classes.brandContainer}>
            <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">Book Mark</Typography>
        </div>
        <Toolbar className={classes.toolbar}>
            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar;