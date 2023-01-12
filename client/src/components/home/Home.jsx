import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, makeStyles } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getBookmarks } from '../../actions/bookmarks';
import Form from '../forms/Form';
import Bookmarks from '../bookmarks/Bookmarks';

const useStyles = makeStyles((theme) => ({
  [theme.breakpoints.down('xs')]: {
    mainGrid: {
      flexDirection: "column-reverse"
    } 
  },
}));

const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBookmarks());
  }, [currentId, dispatch]);

  return (
    <Grow in>
      <Container>
        <Grid className={classes.mainGrid} container justify="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={7}>
            <Bookmarks setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;