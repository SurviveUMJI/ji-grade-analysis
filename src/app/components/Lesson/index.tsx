import * as React from "react";
import { Grid } from "@material-ui/core";
import { CurveChart } from "app/components/CurveChart";

export interface ScoreData {
  grade: string;
  count: number;
}

export interface LessonProps {
  /* empty */
  scores: ScoreData[];
  lessonClassCode: string;
  chartType: string;
  hideUnknown: boolean;
  hideZero: boolean;
}

export interface LessonState {}

export class Lesson extends React.Component<LessonProps, LessonState> {
  constructor(props: LessonProps, context: any) {
    super(props, context);
    // console.log(this.props.lessonClassCode)
  }

  /*  getColor() {
      const colors = ['#fdca00', '#19335d'];
      // console.log(this.props.lessonClassCode);
      const digit = this.props.lessonClassCode.charCodeAt(
        this.props.lessonClassCode.length - 1);
      return colors[digit % 2];
    }*/

  render() {
    return (
      <Grid>
        <CurveChart
          data={this.props.scores}
          chartType={this.props.chartType}
          lessonClassCode={this.props.lessonClassCode}
          hideUnknown={this.props.hideUnknown}
          hideZero={this.props.hideZero}
        />
      </Grid>
    );
  }
}
