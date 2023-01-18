import React from 'react'
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Auth from './components/auth/Auth';
import Home from './components/home/Home';
import BookmarkDetails from './components/bookmarks/bookmark/BookmarkDetails';


const App = () => {
  const user = JSON.parse(localStorage.getItem('bookmark-profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/bookmarks" />} />
          <Route path="/bookmarks" exact component={Home} />
          <Route path="/bookmarks/search" exact component={Home} />
          <Route path="/bookmarks/:id" exact component={BookmarkDetails} />
          <Route path="/auth" exact component={() => (!user ? <Auth /> : <Redirect to="/bookmarks" />)} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
};

export default App;
