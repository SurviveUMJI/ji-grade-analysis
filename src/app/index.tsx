import * as React from 'react';
import {useEffect} from 'react';
import {hot} from 'react-hot-loader/root';
import {Router, Route, Switch} from 'react-router';
import statistics from 'busuanzi-statistics';

import Root from 'app/containers/Root';
import {Main} from 'app/containers/Main';
import {CourseListPage} from 'app/containers/CourseListPage';
import {CoursePage} from 'app/containers/CoursePage';

// render react DOM
export const App = hot(({history}) => {
  useEffect(() => {
    // do not delete this line
    console.log(statistics);
    // Anything in here is fired on component mount.
    // setTimeout(statistics, 0);
    /*const handleLocationChange = (location) => {
      // Do something with the location
      // console.log(location);
      // console.log("busuanzi")
      statistics();
    };
    const unsubscribeFromHistory = history.listen(handleLocationChange);
    handleLocationChange(history.location);*/
    return () => {
      // Anything in here is fired on component unmount.
      // if (unsubscribeFromHistory) unsubscribeFromHistory();
    };
  }, []);
  return (
      <Router history={history}>
        <Root>
          <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/courses" component={CourseListPage}/>
            <Route path="/courses/:courseCode" component={CoursePage}/>
          </Switch>
        </Root>
      </Router>
  );
});
