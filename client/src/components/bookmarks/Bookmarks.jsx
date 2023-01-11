import React from 'react'
import { CircularProgress, Grid, makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Bookmark from './bookmark/Bookmark';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
}));

const Bookmarks = ({ setCurrentId }) => {
  const bookmarks = useSelector((state) => state.bookmarks);
  const classes = useStyles();

  return (
    !bookmarks.length ? <CircularProgress /> : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {bookmarks.map((bookmark) => (
          <Grid key={bookmark._id} item xs={12} sm={6} md={6}>
            <Bookmark bookmark={bookmark} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Bookmarks;