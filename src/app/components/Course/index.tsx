import * as React from 'react';
import {inject} from 'mobx-react';
import {
  // Tab,
  // Tabs,
  // Typography,
  Paper,
} from '@material-ui/core';
import MaterialTable, {Column} from 'material-table';
import icons from 'app/components/icons';
import _, {Dictionary} from 'lodash';

import {STORE_COURSES} from 'app/constants';
import CourseModel, {LessonModel} from 'app/models/CourseModel';
import {CoursesStore} from 'app/stores';
import {Lesson, ScoreData} from 'app/components/Lesson';

// import {CurvePieChart} from 'app/components/CurvePieChart';

export interface CourseProps {
  /* empty */
  courseCode: string
}

export interface CourseState {
  course: CourseModel;
  lessons: LessonModel[];
  // lessonClassCode: string | boolean;
  // lesson: LessonModel | null;
}

const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];

@inject(STORE_COURSES)
export class Course extends React.Component<CourseProps, CourseState> {
  columns: Array<Column<LessonModel>>;
  scoreDataMap: Dictionary<ScoreData[]> = {};

  // course: CourseModel;

  // lessonsMap: Dictionary<string>;

  constructor(props: CourseProps, context: any) {
    super(props, context);
    this.columns = [
      {
        title: 'Code', field: 'lessonClassCode',
        cellStyle: {width: '20%', maxWidth: '20%'},
      },
      {
        title: 'Term', field: 'termName',
        cellStyle: {width: '10%', maxWidth: '10%'},
      },
      {
        title: 'Name', field: 'lessonClassName',
        cellStyle: {width: '25%', maxWidth: '25%'},
      },
      {
        title: 'Found', field: 'scoreNum',
        cellStyle: {width: '10%', maxWidth: '10%'},
      },
      {
        title: 'Elected', field: 'studentNum',
        cellStyle: {width: '10%', maxWidth: '10%'},
      },
      {
        title: 'Lecturers', field: 'lecturersStr', sorting: false,
        cellStyle: {width: '25%', maxWidth: '25%'},
      },
    ];
    this.state = {
      course: null,
      lessons: [],
      // lessonClassCode: false,
      // lesson: null,
    };
  }

  updateCourse() {
    console.log(this.props.courseCode);
    const coursesStore = this.props[STORE_COURSES] as CoursesStore;
    const course = coursesStore.coursesMap[this.props.courseCode];
    let lessons: LessonModel[] = [];
    course.lessons.forEach(a => {
      if (coursesStore.lessonsMap.hasOwnProperty(a[0])) {
        let lesson = coursesStore.lessonsMap[a[0]];
        lesson.lecturersStr = lesson.lecturers.join(', ');
        lessons.push(lesson);
      }
    });
    // this.lessonsMap = _.fromPairs(this.course.lessons);
    // const lessonClassCode = course.lessons.length ?
    //   course.lessons[0][0] : false;
    this.setState({
      course: course,
      lessons: lessons,
      // lessonClassCode: lessonClassCode,
      // lesson: lessonClassCode ? this.getLesson(lessonClassCode) : null,
    });
  }

  ensureScoreDataMap(lessonClassCode: string) {
    if (this.scoreDataMap.hasOwnProperty(lessonClassCode)) {
      return this.scoreDataMap[lessonClassCode];
    }
    const coursesStore = this.props[STORE_COURSES] as CoursesStore;
    let studentNum = 0;
    let scoreNum = 0;
    let scoreData: ScoreData[];
    if (coursesStore.lessonsMap.hasOwnProperty(lessonClassCode)) {
      const lesson = coursesStore.lessonsMap[lessonClassCode];
      studentNum = lesson.studentNum;
    }
    if (coursesStore.scoresMap.hasOwnProperty(lessonClassCode)) {
      const scoreRawData = coursesStore.scoresMap[lessonClassCode];
      const scores = scoreRawData.scores;
      const temp = _.zip(grades, scores);
      scoreData = _.map(temp, value => {
        scoreNum += value[1];
        return {grade: value[0], count: value[1]};
      });
    } else {
      scoreData = _.map(grades, value => {
        return {grade: value, count: 0};
      });
    }
    if (studentNum > scoreNum) {
      scoreData.push( {grade: 'Unknown', count: studentNum - scoreNum});
    } else {
      scoreData.push( {grade: 'Unknown', count: 0});
    }
    this.scoreDataMap[lessonClassCode] = scoreData;
    return scoreData;
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

  /*  handleChange(event: React.ChangeEvent<{}>, newValue: string) {
      this.setState({
        lessonClassCode: newValue,
        lesson: this.getLesson(newValue),
      });
    };*/

  render() {
    let title = this.props.courseCode;
    if (this.state.course) {
      title += ' - ' + this.state.course.courseNameEn + ' - ' +
        this.state.course.courseName;
    }
    return (
      <MaterialTable
        title={title}
        columns={this.columns}
        data={this.state.lessons}
        icons={icons}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 25, 50, 100],
        }}
        style={{width: '100%'}}
        components={{
          Container: props => (<Paper elevation={0} {...props}></Paper>),
        }}
        detailPanel={rowData => {
          const lessonClassCode = rowData.lessonClassCode;
          const scoreData = this.ensureScoreDataMap(lessonClassCode);
          console.log(lessonClassCode);
          console.log(scoreData);
          return (
            <Lesson scores={scoreData}/>
          );
        }}
        onRowClick={(event, rowData, togglePanel) => togglePanel()}
      />
    );
  }
}

// export default Course;

{/*<Tabs
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
          </Typography>*/
}
