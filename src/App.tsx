import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { Genres } from 'routes';
export default function App() {
  return (
      <Router>
          <div>
              <nav>
                  <ul>
                      <li>
                          <Link to="/">Home</Link>
                      </li>
                      <li>
                          <Link to="/genres">Genres</Link>
                      </li>
                      <li>
                          <Link to="/users">Users</Link>
                      </li>
                  </ul>
              </nav>
              <Switch>
                  {/* <Redirect from="*" to="/genres" /> */}
                  <Route path="/genres">
                      <Genres />
                  </Route>
                  <Route path="/">
                      <Home />
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}
