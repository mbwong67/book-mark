import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { Link } from 'react-router-dom';
import { getBookmarks } from '../../actions/bookmarks';


const useStyles = makeStyles(() => ({
  ul: {
    justifyContent: 'space-around',
  },
}));

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (page) {
      dispatch(getBookmarks(page));
    }
  }, [dispatch, page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/bookmarks?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate