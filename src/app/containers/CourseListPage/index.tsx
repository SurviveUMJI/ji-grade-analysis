import * as React from 'react';

import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { CourseList } from 'app/components/CourseList';

import { STORE_ROUTER } from 'app/constants';
// import {
//   Container,
//   CssBaseline, Paper
// } from '@material-ui/core';

export interface CourseListPageProps extends RouteComponentProps<any> {
}

export interface CourseListPageState {
}

@inject(STORE_ROUTER)
@observer
export class CourseListPage extends React.Component<CourseListPageProps, CourseListPageState> {
  constructor(props: CourseListPageProps, context: any) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <CourseList/>
    );
  }
}
