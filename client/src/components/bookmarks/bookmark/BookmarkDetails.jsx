import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CircularProgress, makeStyles, Paper, Typography } from '@material-ui/core';
import moment from 'moment';

import { getBookmark } from '../../../actions/bookmarks';

const useStyles = makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  loadingPaper: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: '20px', 
    borderRadius: '15px', 
    height: '39vh',
  },
}));

const BookmarkDetails = () => {
  const { bookmark, isLoading } = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBookmark(id));
  }, [id, dispatch]);

  if (!bookmark) return null;

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{bookmark.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{bookmark.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{bookmark.description}</Typography>
          <Typography variant="h6">Created by: {bookmark.creatorName}</Typography>
          <Typography variant="body1">{moment(bookmark.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={bookmark.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={bookmark.title} />
        </div>
      </div>
    </Paper>
  );
};

export default BookmarkDetails