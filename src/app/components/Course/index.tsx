import * as React from 'react';
import { inject } from 'mobx-react';
import {
  FormControlLabel,
  // Tab,
  // Tabs,
  // Typography,
  RadioGroup,
  Radio,
  Switch,
  Grid,
  Paper,
} from '@material-ui/core';
import MaterialTable, { Column } from 'material-table';
import icons from 'app/components/icons';
import _, { Dictionary } from 'lodash';

import { STORE_COURSES, STORE_GLOBAL_STATE } from 'app/constants';
import CourseModel, { LessonModel } from 'app/models/CourseModel';
import { CoursesStore, GlobalStateStore } from 'app/stores';
import { Lesson, ScoreData } from 'app/components/Lesson';
import { PatchedPagination } from 'app/components/PatchedPagination';
import { StickyContainer, Sticky } from 'react-sticky';
import zIndex from '@material-ui/core/styles/zIndex';

// import {CurvePieChart} from 'app/components/CurvePieChart';

export interface CourseProps {
  /* empty */
  courseCode: string;
}

export interface CourseState {
  course: CourseModel;
  lessons: LessonModel[];
  chartType: string;
  hideUnknown: boolean;
  hideZero: boolean;
  // lessonClassCode: string | boolean;
  // lesson: LessonModel | null;
}

const grades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'];

@inject(STORE_COURSES, STORE_GLOBAL_STATE)
export class Course extends React.Component<CourseProps, CourseState> {
  columns: Array<Column<LessonModel>>;
  scoreDataMap: Dictionary<ScoreData[]> = {};
  searchText: string;

  constructor(props: CourseProps, context: any) {
    super(props, context);
    const globalStateStore = this.props[STORE_GLOBAL_STATE] as GlobalStateStore;
    this.searchText = globalStateStore.courseSearchText[props.courseCode] || '';
    this.columns = [
      {
        title: 'Code',
        field: 'lessonClassCode',
        cellStyle: { width: '20%', maxWidth: '20%' },
      },
      {
        title: 'Term',
        field: 'termName',
        cellStyle: { width: '10%', maxWidth: '10%' },
      },
      {
        title: 'Name',
        field: 'lessonClassName',
        cellStyle: { width: '25%', maxWidth: '25%' },
      },
      {
        title: 'Found',
        field: 'scoreNum',
        cellStyle: { width: '10%', maxWidth: '10%' },
      },
      {
        title: 'Elected',
        field: 'studentNumStr',
        cellStyle: { width: '10%', maxWidth: '10%' },
      },
      {
        title: 'Lecturers',
        field: 'lecturersStr',
        sorting: false,
        cellStyle: { width: '25%', maxWidth: '25%' },
      },
    ];
    this.state = {
      course: null,
      lessons: [],
      chartType: 'bar',
      hideUnknown: false,
      hideZero: false,
    };
  }

  updateCourse() {
    console.log(this.props.courseCode);
    const coursesStore = this.props[STORE_COURSES] as CoursesStore;
    const course = coursesStore.coursesMap[this.props.courseCode];
    let lessons: LessonModel[] = [];
    course.lessons.forEach((a) => {
      if (coursesStore.lessonsMap.hasOwnProperty(a[0])) {
        let lesson = coursesStore.lessonsMap[a[0]];
        lesson.lecturersStr = lesson.lecturers.join(', ');
        lesson.studentNumStr =
          lesson.studentNum >= 0 ? lesson.studentNum.toString() : '-';
        lessons.push(lesson);
      }
    });
    this.setState({
      course: course,
      lessons: lessons,
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
      scoreData = _.map(temp, (value) => {
        scoreNum += value[1];
        return { grade: value[0], count: value[1] };
      });
    } else {
      scoreData = _.map(grades, (value) => {
        return { grade: value, count: 0 };
      });
    }
    if (studentNum > scoreNum) {
      scoreData.push({ grade: 'Unknown', count: studentNum - scoreNum });
    } else {
      scoreData.push({ grade: 'Unknown', count: 0 });
    }
    this.scoreDataMap[lessonClassCode] = scoreData;
    return scoreData;
  }

  componentDidMount() {
    this.updateCourse();
  }

  componentDidUpdate(
    prevProps: Readonly<CourseProps>,
    prevState: Readonly<CourseState>,
    snapshot?: any
  ) {
    if (this.props.courseCode !== prevProps.courseCode) {
      this.updateCourse();
    }
  }

  onChangeChartType(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      chartType: (event.target as HTMLInputElement).value,
    });
  }

  onChangeHideUnknown(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      hideUnknown: event.target.checked,
    });
  }

  onChangeHideZero(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      hideZero: event.target.checked,
    });
  }

  render() {
    let title = this.props.courseCode;
    if (this.state.course) {
      title +=
        ' - ' +
        this.state.course.courseNameEn +
        ' - ' +
        this.state.course.courseName;
    }
    const globalStateStore = this.props[STORE_GLOBAL_STATE] as GlobalStateStore;
    return (
      <React.Fragment>
        <StickyContainer>
          <Sticky>
            {({ style }) => (
              // TODO: better way to make it opaque
              <div className="MuiPaper-root" style={{ zIndex: 64, ...style }}>
                <Grid container>
                  <RadioGroup
                    value={this.state.chartType}
                    onChange={this.onChangeChartType.bind(this)}
                    row
                  >
                    <FormControlLabel
                      value="bar"
                      control={<Radio color="secondary" />}
                      label="Bar"
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="line"
                      control={<Radio color="secondary" />}
                      label="Line"
                      labelPlacement="bottom"
                    />
                    <FormControlLabel
                      value="pie"
                      control={<Radio color="secondary" />}
                      label="Pie"
                      labelPlacement="bottom"
                    />
                  </RadioGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.hideUnknown}
                        onChange={this.onChangeHideUnknown.bind(this)}
                        color="secondary"
                      />
                    }
                    label="Hide Unknown"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.hideZero}
                        onChange={this.onChangeHideZero.bind(this)}
                        color="secondary"
                      />
                    }
                    label="Hide Zero"
                  />
                </Grid>
              </div>
            )}
          </Sticky>
          <MaterialTable
            title={title}
            columns={this.columns}
            data={this.state.lessons}
            icons={icons}
            options={{
              pageSize: 10,
              pageSizeOptions: [10, 25, 50, 100],
              searchText: this.searchText,
            }}
            style={{ width: '100%' }}
            components={{
              Container: (props) => <Paper elevation={0} {...props}></Paper>,
              Pagination: PatchedPagination,
            }}
            detailPanel={(rowData) => {
              const lessonClassCode = rowData.lessonClassCode;
              const scoreData = this.ensureScoreDataMap(lessonClassCode);
              // console.log(lessonClassCode);
              // console.log(scoreData);
              return (
                <Lesson
                  scores={scoreData}
                  lessonClassCode={lessonClassCode}
                  chartType={this.state.chartType}
                  hideUnknown={this.state.hideUnknown}
                  hideZero={this.state.hideZero}
                />
              );
            }}
            onRowClick={(event, rowData, togglePanel) => togglePanel()}
            onSearchChange={(searchText) => {
              this.searchText = searchText;
              globalStateStore.setCourseSearchText(
                this.props.courseCode,
                searchText
              );
            }}
          />
        </StickyContainer>
      </React.Fragment>
    );
  }
}

// export default Course;

{
  /*<Tabs
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
