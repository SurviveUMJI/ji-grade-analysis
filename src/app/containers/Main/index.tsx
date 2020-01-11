import * as React from 'react';

import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router';
import {Link as RouterLink} from 'react-router-dom';

import {STORE_ROUTER} from 'app/constants';
import {
  Button, Grid,
  Typography, Link,
} from '@material-ui/core';
import statsData from 'ji-grade-analysis-data/stats.json';

export interface MainProps extends RouteComponentProps<any> {
}

export interface MainState {
}

@inject(STORE_ROUTER)
@observer
export class Main extends React.Component<MainProps, MainState> {
  constructor(props: MainProps, context: any) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <Grid item md={10}>
        <Typography variant="h5" color="inherit" paragraph>
          Analysis anonymous grades retrieved by all JI students,
          among the courses with the same course code in different
          sections and terms, aiming at forming a better
          and fairer GPA environment in JI.
        </Typography>
        <Typography variant="h5" color="inherit" paragraph>
          <Link color="secondary">{statsData.scores}</Link> score data
          from <Link color="secondary">{statsData.lessons}</Link> classes
          of <Link color="secondary">{statsData.courses}</Link> courses
          have been analyzed.
        </Typography>
        <Grid container justify="center">
          <Button variant="outlined" color="secondary" size="large"
                  component={RouterLink} to="/courses">
            Start Explore
          </Button>
        </Grid>
      </Grid>
    );
  }
}
