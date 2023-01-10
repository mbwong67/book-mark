import React, { useEffect } from 'react'
import { Container, AppBar, Typography, Grow, Grid, makeStyles } from '@material-ui/core';
import Bookmarks from './components/bookmarks/Bookmarks';
import Form from './components/forms/Form';
import { useDispatch } from 'react-redux';
import { getBookmarks } from './actions/bookmarks'

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
    color: 'rgba(0,183,255, 1)',
  }
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Book Mark</Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify-content='space-between' align-item='stretch'>
            <Grid item xs={12} sm={7}>
              <Bookmarks />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
};

export default App;
