import React from 'react'
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Bookmark from './bookmark/Bookmark';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  loading: {
    height: '100%',
    width: '100%',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',     
  },
}));

const Bookmarks = ({ setCurrentId }) => {
  const { bookmarks, isLoading } = useSelector((state) => state.bookmarks);
  const classes = useStyles();

  if (!bookmarks.length && !isLoading) return 'No posts';

  return (
    isLoading ? <div className={classes.loading}><CircularProgress /></div> : (
      <Grid className={classes.mainCcontainer} container alignItems="stretch" spacing={3}>
        {bookmarks.map((bookmark) => (
          <Grid key={bookmark._id} item xs={12} sm={12} md={6} lg={3}>
            <Bookmark bookmark={bookmark} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Bookmarks;