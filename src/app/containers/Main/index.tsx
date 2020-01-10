import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { Header } from 'app/components/Header';
import { CourseList } from 'app/components/CourseList';

import { STORE_ROUTER } from 'app/constants';
import {
  Container,
  CssBaseline, Paper
} from '@material-ui/core';

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
      <Container maxWidth={'lg'}>
        <CssBaseline/>
        <br/>
        <Paper>
          <Header/>
          <CourseList/>
        </Paper>
      </Container>
    );
  }
}
