import * as React from 'react';
import {Grid} from '@material-ui/core';
import {CurveBarChart} from 'app/components/CurveBarChart';

export interface ScoreData {
  grade: string;
  count: number;
}

export interface LessonProps {
  /* empty */
  scores: ScoreData[];
  lessonClassCode: string;
}

export interface LessonState {

}

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
        <CurveBarChart data={this.props.scores}/>
      </Grid>
    );
  }

}

