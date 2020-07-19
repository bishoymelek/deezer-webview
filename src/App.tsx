import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Genres, GenreArtistList } from 'routes';
import { LayoutContainer } from 'components/layout-container/LayoutContainer';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css';

export default function App(): JSX.Element {
  return (
    <Router>
      <LayoutContainer>
        <ModalContainer />
        <Switch>
          <Route exact path="/genres">
            <Genres />
          </Route>
          <ModalRoute path="/genres/:genreId" parentPath="/genres">
            <GenreArtistList />
          </ModalRoute>
          <Route exact path="/">
            <Redirect to="genres" />
          </Route>
        </Switch>
      </LayoutContainer>
    </Router>
  );
}
