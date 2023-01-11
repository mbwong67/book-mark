import React, { useEffect, useState } from 'react'
import { Container, AppBar, Typography, Grow, Grid, makeStyles } from '@material-ui/core';
import Bookmarks from './components/bookmarks/Bookmarks';
import Form from './components/forms/Form';
import { useDispatch } from 'react-redux';
import { getBookmarks } from './actions/bookmarks'

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
  [theme.breakpoints.down('xs')]: {
    mainGrid: {
      flexDirection: "column-reverse"
    } 
  },
}));

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    dispatch(getBookmarks());
  }, [currentId, dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position='static' color='inherit'>
        <Typography className={classes.heading} variant='h2' align='center'>Book Mark</Typography>
      </AppBar>
      <Grow in>
        <Container>
          <Grid className={classes.mainGrid} container justify-content='space-between' alignItems='stretch' spacing={3}>
            <Grid item xs={12} sm={7}>
              <Bookmarks setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
};

export default App;
