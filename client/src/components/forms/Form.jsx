import React, { useState } from 'react';
import { Button, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

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

const Form = () => {
  const [bookmarkData, setBookmarkData] = useState({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  const classes = useStyles();

  const clear = () => {
    setBookmarkData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
  };

  const handleSubmit =  (e) => {
        
  };

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">'Add Bookmark'</Typography>
        <TextField name="creator" variant="outlined" label="Creator" fullWidth value={bookmarkData.creator} onChange={(e) => setBookmarkData({ ...bookmarkData, creator: e.target.value })} />
        <TextField name="title" variant="outlined" label="Title" fullWidth value={bookmarkData.title} onChange={(e) => setBookmarkData({ ...bookmarkData, title: e.target.value })} />
        <TextField name="message" variant="outlined" label="Message" fullWidth multiline minRows={4} value={bookmarkData.message} onChange={(e) => setBookmarkData({ ...bookmarkData, message: e.target.value })} />
        <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={bookmarkData.tags} onChange={(e) => setBookmarkData({ ...bookmarkData, tags: e.target.value.split(',') })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setBookmarkData({ ...bookmarkData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form;