import React, { useEffect, useState } from 'react';
import { Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';
import { createBookmark, updateBookmark } from '../../actions/bookmarks';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
}));

const Form = ({ currentId, setCurrentId }) => {
  const [bookmarkData, setBookmarkData] = useState({ creator: '', title: '', description: '', tags: '', selectedFile: '' });
  const bookmark = useSelector((state) => (currentId ? state.bookmarks.find((bookmark) => bookmark._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (bookmark) setBookmarkData(bookmark);
  }, [bookmark]);

  const clear = () => {
    setCurrentId(0);
    setBookmarkData({ creator: '', title: '', description: '', tags: '', selectedFile: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (currentId === 0) {
      dispatch(createBookmark(bookmarkData));
      clear();
    } else {
      dispatch(updateBookmark(currentId, bookmarkData));
      clear();
    }    
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${bookmark.title}"` : 'Add Bookmark'}</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={bookmarkData.creator} onChange={(e) => setBookmarkData({ ...bookmarkData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={bookmarkData.title} onChange={(e) => setBookmarkData({ ...bookmarkData, title: e.target.value })} />
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline minRows={4} value={bookmarkData.description} onChange={(e) => setBookmarkData({ ...bookmarkData, description: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={bookmarkData.tags} onChange={(e) => setBookmarkData({ ...bookmarkData, tags: e.target.value.split(',').map((tag) => tag.trim()) })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setBookmarkData({ ...bookmarkData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>{currentId ? 'Update' : 'Submit'}</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form;