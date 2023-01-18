import React, { useState } from 'react';
import { Container, Grow, Grid, makeStyles, AppBar, TextField, Button, Paper } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input';
import { useDispatch } from 'react-redux';
import Form from '../forms/Form';
import Bookmarks from '../bookmarks/Bookmarks';
import { useHistory, useLocation } from 'react-router-dom';
import Pagination from '../layout/Pagination';
import { getBookmarksBySearch } from '../../actions/bookmarks';

const useStyles = makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  [theme.breakpoints.down('xs')]: {
    mainGrid: {
      flexDirection: "column-reverse"
    } 
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();

  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);
  const history = useHistory();

  const searchBookmark = () => {
    if (search.trim() || tags) {
      dispatch(getBookmarksBySearch({ search, tags: tags.join(',') }));
      history.push(`/bookmarks/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'enter') {
      searchBookmark();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid className={classes.mainGrid} container justifyContent="space-between" alignItems="stretch" spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Bookmarks setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Bookmarks" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput style={{ margin: '10px 0' }} value={tags} onAdd={(chip) => handleAddChip(chip)} onDelete={(chip) => handleDeleteChip(chip)} label="Search Tags" variant="outlined"/>
              <Button onClick={searchBookmark} className={classes.searchButton} variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;