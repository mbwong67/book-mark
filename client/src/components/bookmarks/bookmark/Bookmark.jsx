import React from 'react';
import { Button, ButtonBase, Card, CardActions, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { deleteBookmark, likeBookmark } from '../../../actions/bookmarks';

const useStyles = makeStyles(() => ({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
}));

const Bookmark = ({ bookmark, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('bookmark-profile'));
  
  const Likes = () => {
    if (bookmark.likes?.length > 0) {
      return bookmark.likes.find((like) => like === user?.result?._id)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{bookmark.likes.length > 2 ? `You and ${bookmark.likes.length - 1} others` : `${bookmark.likes.length} like${bookmark.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{bookmark.likes.length} {bookmark.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
  };

  const openBookmark = (e) => history.push(`/bookmarks/${bookmark._id}`);

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase component="span" className={classes.cardAction} onClick={openBookmark} >
        <CardMedia className={classes.media} image={bookmark.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={bookmark.title} />
        <div className={classes.overlay}>
          <Typography variant="h6">{bookmark.creatorName}</Typography>
          <Typography variant="body2">{moment(bookmark.createdAt).fromNow()}</Typography>
        </div>
        {user?.result?._id === bookmark?.creatorId && (
          <div className={classes.overlay2}>
            <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(bookmark._id)}><MoreHorizIcon fontSize="medium" /></Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">{bookmark.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography className={classes.title} gutterBottom variant="h5" component="h2">{bookmark.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{bookmark.description}</Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button size="small" color="primary" onClick={() => dispatch(likeBookmark(bookmark._id))}> <Likes /> </Button>
          {user?.result?._id === bookmark?.creatorId && (
            <Button size="small" color="primary" onClick={() => dispatch(deleteBookmark(bookmark._id))}><DeleteIcon fontSize="small" /> Delete</Button>
          )}
        </CardActions>
      </ButtonBase>
    </Card>
  );
};

export default Bookmark;