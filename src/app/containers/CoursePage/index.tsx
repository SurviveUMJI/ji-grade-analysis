import * as React from 'react';

import {inject, observer} from 'mobx-react';
import {RouteComponentProps} from 'react-router';
import {Course} from 'app/components/Course';

import {STORE_COURSES} from 'app/constants';
import {CoursesStore} from 'app/stores/CoursesStore';

// import {RouterStore} from 'app/stores';

export interface CoursePageProps extends RouteComponentProps<any> {
}

export interface CoursePageState {
  courseCode: string;
  available: boolean;
}

@inject(STORE_COURSES)
@observer
export class CoursePage extends React.Component<CoursePageProps, CoursePageState> {
  constructor(props: CoursePageProps, context: any) {
    super(props, context);
    const {match} = this.props;
    const courseStore = this.props[STORE_COURSES] as CoursesStore;
    const courseCode = match.params.courseCode.toUpperCase();
    this.state = {
      courseCode: courseCode,
      available: courseStore.coursesMap.hasOwnProperty(courseCode),
    };
  }

  render() {
    return (
      this.state.available ?
        <Course courseCode={this.state.courseCode}/> :
        <div>Sorry, course {this.state.courseCode} is not available.</div>
    );
  }
}
