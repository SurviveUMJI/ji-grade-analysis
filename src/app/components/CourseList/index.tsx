import * as React from "react";
import { inject } from "mobx-react";
import {
  // Divider,
  // TableHead,
  Paper,
} from "@material-ui/core";
import MaterialTable, { Column } from "@material-table/core";

import icons from "app/components/icons";

import { STORE_COURSES, STORE_ROUTER, STORE_GLOBAL_STATE } from "app/constants";
import { CoursesStore, RouterStore, GlobalStateStore } from "app/stores";
import CourseModel from "app/models/CourseModel";

export interface CourseListProps {
  /* empty */
}

export interface CourseListState {
  // columns: Array<Column<CourseModel>>;
  data: CourseModel[];
}

@inject(STORE_COURSES, STORE_ROUTER, STORE_GLOBAL_STATE)
export class CourseList extends React.Component<
  CourseListProps,
  CourseListState
> {
  columns: Array<Column<CourseModel>>;
  searchText: string;

  constructor(props: CourseListProps, context: any) {
    super(props, context);
    const coursesStore = this.props[STORE_COURSES] as CoursesStore;
    const globalStateStore = this.props[STORE_GLOBAL_STATE] as GlobalStateStore;
    this.searchText = globalStateStore.courseListSearchText || "";
    this.columns = [
      {
        title: "Code",
        field: "courseCode",
        width: "10%",
      },
      {
        title: "Name",
        field: "courseNameEn",
        width: "35%",
      },
      {
        title: "Name (Chinese)",
        field: "courseName",
        width: "35%",
      },
      { title: "Terms", field: "terms", sorting: false },
    ];
    this.state = {
      data: coursesStore.courses,
    };
  }

  render() {
    const router = this.props[STORE_ROUTER] as RouterStore;
    const globalStateStore = this.props[STORE_GLOBAL_STATE] as GlobalStateStore;
    return (
      // <div>
      <MaterialTable
        title="Courses"
        columns={this.columns}
        data={this.state.data}
        icons={icons}
        options={{
          pageSize: 10,
          pageSizeOptions: [10, 25, 50, 100],
          searchText: this.searchText,
          columnsButton: true,
        }}
        style={{ width: "100%" }}
        components={{
          Container: (props) => <Paper elevation={0} {...props}></Paper>,
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
        onSearchChange={(searchText) => {
          this.searchText = searchText;
          globalStateStore.setCourseListSearchText(searchText);
        }}
      />
      // </div>
    );
  }
}

export default CourseList;
