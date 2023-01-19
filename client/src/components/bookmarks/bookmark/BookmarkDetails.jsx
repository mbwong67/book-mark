import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import { CircularProgress, Divider, makeStyles, Paper, Typography } from '@material-ui/core';
import moment from 'moment';

import { getBookmark, getBookmarksBySearch } from '../../../actions/bookmarks';

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
  recommendedBookmarks: {
    display: 'flex',
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
}));

const BookmarkDetails = () => {
  const { bookmark, bookmarks, isLoading } = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getBookmark(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (bookmark) {
      dispatch(getBookmarksBySearch({ search: 'none', tags: bookmark?.tags.join(',') }));
    }
  }, [bookmark, dispatch]);

  const recommendedBookmarks = bookmarks.filter(({ _id }) => _id !== bookmark._id);

  const openBookmark = (_id) => history.push(`/bookmarks/${_id}`);

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
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{bookmark.tags.map((tag) => (
            <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>{` #${tag} `}</Link>
          ))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{bookmark.description}</Typography>
          <Typography variant="h6">Created by: {bookmark.creatorName}</Typography>
          <Typography variant="body1">{moment(bookmark.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />          
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={bookmark.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={bookmark.title} />
        </div>
      </div>
      {!!recommendedBookmarks.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedBookmarks}>
            {recommendedBookmarks.map(({ likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openBookmark(_id)} key={_id}>
                <img src={selectedFile} width="200px" />
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>                
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default BookmarkDetails