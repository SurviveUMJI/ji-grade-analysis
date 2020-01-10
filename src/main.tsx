import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { createHashHistory } from 'history';
import { TodoModel } from 'app/models';
import { createStores } from 'app/stores';
import { App } from 'app';

import 'typeface-roboto';

// default fixtures for TodoStore
const defaultTodos = [
  new TodoModel('Use Mobx'),
  new TodoModel('Use React', true)
];

// prepare MobX stores
const history = createHashHistory();
const rootStore = createStores(history, defaultTodos);

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);


/*
<Container>
        <Paper className={classes.mainFeaturedPost}>
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturedPostContent}>
                <Typography component="h1" variant="h3" color="inherit"
                            gutterBottom>
                  JI Grade Analysis
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  Analysis anonymous grades retrieved by all JI students,
                  among the courses with the same course id in different
                  sections and academic years, aiming at forming a better
                  and fairer GPA environment in JI.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </Container>
 */
