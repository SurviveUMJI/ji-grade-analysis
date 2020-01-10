import * as React from 'react';
import {hot} from 'react-hot-loader/root';
import {Router, Route, Switch} from 'react-router';
import Root from 'app/containers/Root';
import {Main} from 'app/containers/Main';
import {CourseListPage} from 'app/containers/CourseListPage';
import {CoursePage} from 'app/containers/CoursePage';

// render react DOM
export const App = hot(({history}) => (
  <Root>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Main}/>
        <Route exact path='/courses' component={CourseListPage}/>
        <Route path="/courses/:courseCode" component={CoursePage}/>
      </Switch>
    </Router>
  </Root>
));
