import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';
import { Root } from 'app/containers/Root';
import { Main } from 'app/containers/Main';
import { CoursePage } from 'app/containers/CoursePage';

// render react DOM
export const App = hot(({ history }) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path="/courses/:courseCode" component={CoursePage}/>
      </Switch>
    </Router>
  </Root>
));
