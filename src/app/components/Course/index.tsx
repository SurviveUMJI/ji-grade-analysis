import * as React from 'react';
import {inject} from 'mobx-react';
import {
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
// import _, {Dictionary} from 'lodash';
import {STORE_COURSES} from 'app/constants';
import CourseModel, {LessonModel} from 'app/models/CourseModel';
import {CoursesStore} from 'app/stores';
import {CurvePieChart} from 'app/components/CurvePieChart';

export interface CourseProps {
  /* empty */
  courseCode: string
}

export interface CourseState {
  course: CourseModel;
  lessonClassCode: string | boolean;
  lesson: LessonModel | null;
}

@inject(STORE_COURSES)
export class Course extends React.Component<CourseProps, CourseState> {
  // course: CourseModel;

  // lessonsMap: Dictionary<string>;

  constructor(props: CourseProps, context: any) {
    super(props, context);
    this.state = {
      course: null,
      lessonClassCode: false,
      lesson: null,
    };
  }

  updateCourse() {
    console.log(this.props.courseCode);
    const coursesStore = this.props[STORE_COURSES] as CoursesStore;
    const course = coursesStore.coursesMap[this.props.courseCode];
    // this.lessonsMap = _.fromPairs(this.course.lessons);
    const lessonClassCode = course.lessons.length ?
      course.lessons[0][0] : false;
    this.setState({
      course: course,
      lessonClassCode: lessonClassCode,
      lesson: lessonClassCode ? this.getLesson(lessonClassCode) : null,
    });
  }

  componentDidMount() {
    this.updateCourse();
  }

  componentDidUpdate(
    prevProps: Readonly<CourseProps>, prevState: Readonly<CourseState>,
    snapshot?: any) {
    if (this.props.courseCode !== prevProps.courseCode) {
      this.updateCourse();
    }
  }

  getLesson(lessonClassCode: string) {
    const coursesStore = this.props[STORE_COURSES] as CoursesStore;
    if (coursesStore.lessonsMap.hasOwnProperty(lessonClassCode)) {
      return coursesStore.lessonsMap[lessonClassCode];
    }
    return null;
  }

  handleChange(event: React.ChangeEvent<{}>, newValue: string) {
    this.setState({
      lessonClassCode: newValue,
      lesson: this.getLesson(newValue),
    });
  };

  render() {
    return (
      this.state.course ?
        <div>
          <Tabs
            value={this.state.lessonClassCode}
            onChange={this.handleChange.bind(this)}
            variant="scrollable"
            scrollButtons="auto"
          >
            {
              this.state.course.lessons.map(lesson =>
                <Tab key={lesson[0]} label={lesson[1]} value={lesson[0]}/>)
            }
          </Tabs>
          <Typography
            component="div"
            role="tabpanel"
          >
            {this.state.lesson.lecturers}
            {typeof this.state.lessonClassCode === 'string' ?
              <CurvePieChart lessonClassCode={this.state.lessonClassCode}/> :
              null
            }
          </Typography>
        </div>
        : null
    );
  }
}

export default Course;
