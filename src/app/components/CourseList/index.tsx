import * as React from 'react';
import {
  // Divider,
  // TableHead,
} from '@material-ui/core';
import MaterialTable, {Column} from 'material-table';

import icons from 'app/components/CourseList/icons';
import {inject} from 'mobx-react';
import {STORE_COURSES, STORE_ROUTER} from 'app/constants';
import {CoursesStore, RouterStore} from 'app/stores';
import CourseModel from 'app/models/CourseModel';

export interface CourseListProps {
  /* empty */
}

export interface CourseListState {
  columns: Array<Column<CourseModel>>;
  data: CourseModel[];
}

@inject(STORE_COURSES, STORE_ROUTER)
export class CourseList extends React.Component<CourseListProps, CourseListState> {
  constructor(props: CourseListProps, context: any) {
    super(props, context);
    const coursesStore = this.props[STORE_COURSES] as CoursesStore;
    this.state = {
      columns: [
        {
          title: 'Code', field: 'courseCode', defaultSort: 'asc',
          cellStyle: {width: '10%', maxWidth: '10%'},
        },
        {
          title: 'Name', field: 'courseNameEn',
          cellStyle: {width: '35%', maxWidth: '35%'},
        },
        {
          title: 'Name (Chinese)', field: 'courseName',
          cellStyle: {width: '35%', maxWidth: '35%'},
        },
        {title: 'Terms', field: 'terms', sorting: false},
      ],
      data: coursesStore.courses,
    };
  }

  render() {
    const router = this.props[STORE_ROUTER] as RouterStore;
    return (
      <div>
        <MaterialTable
          title="Courses"
          columns={this.state.columns}
          data={this.state.data}
          icons={icons}
          options={{
            pageSize: 10,
            pageSizeOptions: [10, 25, 50, 100],
          }}
          onRowClick={(event, rowData) => {
            console.log(rowData.courseCode);
            const currentHash = router.location.hash;
            console.log(currentHash);
            const nextHash = `/courses/${rowData.courseCode}`;
            if (currentHash !== nextHash) {
              router.push(nextHash);
            }
          }}
        />
      </div>
    );
  }
}

export default CourseList;
