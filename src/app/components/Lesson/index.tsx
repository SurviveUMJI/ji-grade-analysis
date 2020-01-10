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
}

export interface LessonState {

}

export class Lesson extends React.Component<LessonProps, LessonState> {

  constructor(props: LessonProps, context: any) {
    super(props, context);
  }

  render() {
    return (
      <Grid>
        <CurveBarChart data={this.props.scores}/>
      </Grid>
    );
  }

}

