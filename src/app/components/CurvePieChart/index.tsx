import * as React from "react";
import { inject } from "mobx-react";
import {
  Chart,
  Legend,
  Tooltip,
  PieSeries,
  Title,
} from "@devexpress/dx-react-chart-material-ui";
import {
  Animation,
  EventTracker,
  HoverState,
} from "@devexpress/dx-react-chart";
import { withStyles } from "@material-ui/styles";
import _ from "lodash";

import { STORE_COURSES } from "app/constants";
import { ScoreModel } from "app/models/CourseModel";
import { CoursesStore } from "app/stores";

export interface CurvePieChartProps {
  lessonClassCode: string;
}

export interface CurvePieChartState {
  hover: any;
  tooltipTarget: any;
  data: Array<{
    grade: string;
    count: number;
  }>;
  totalCount: number;
}

const chartRootStyles = {
  chart: {
    paddingRight: "20px",
  },
};
const legendStyles = {
  root: {
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
};
const legendLabelStyles = (theme) => ({
  label: {
    paddingTop: theme.spacing(1),
  },
});
const legendItemStyles = {
  item: {
    flexDirection: "column",
  },
};

const ChartRootBase = ({ classes, ...restProps }) => (
  // @ts-ignore
  <Chart.Root {...restProps} className={classes.chart} />
);
const LegendRootBase = ({ classes, ...restProps }) => (
  // @ts-ignore
  <Legend.Root {...restProps} className={classes.root} />
);
const LegendLabelBase = ({ classes, ...restProps }) => (
  // @ts-ignore
  <Legend.Label {...restProps} className={classes.label} />
);
const LegendItemBase = ({ classes, ...restProps }) => (
  // @ts-ignore
  <Legend.Item {...restProps} className={classes.item} />
);

// @ts-ignore
const ChartRoot = withStyles(chartRootStyles, { name: "ChartRoot" })(
  ChartRootBase
);
// @ts-ignore
const LegendRoot = withStyles(legendStyles, { name: "LegendRoot" })(
  LegendRootBase
);
// @ts-ignore
const LegendLabel = withStyles(legendLabelStyles, { name: "LegendLabel" })(
  LegendLabelBase
);
// @ts-ignore
const LegendItem = withStyles(legendItemStyles, { name: "LegendItem" })(
  LegendItemBase
);

const grades = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D", "F"];

@inject(STORE_COURSES)
export class CurvePieChart extends React.Component<
  CurvePieChartProps,
  CurvePieChartState
> {
  score: ScoreModel = null;

  constructor(props: CurvePieChartProps, context: any) {
    super(props, context);
    this.state = {
      hover: null,
      tooltipTarget: null,
      data: [],
      totalCount: 0,
    };
  }

  updateChartData() {
    const coursesStore = this.props[STORE_COURSES] as CoursesStore;
    console.log(this.props.lessonClassCode);
    if (coursesStore.scoresMap.hasOwnProperty(this.props.lessonClassCode)) {
      const scoreData = coursesStore.scoresMap[this.props.lessonClassCode];
      const scores = scoreData.scores;
      const data = _.zip(grades, scores);
      const totalCount = _.sum(scores);
      const chartData = _.map(data, (value) => {
        return { grade: value[0], count: value[1] };
      });
      console.log(chartData);
      this.setState({ data: chartData, totalCount: totalCount });
    } else {
      this.setState({ data: [], totalCount: 0 });
    }
  }

  componentDidMount() {
    this.updateChartData();
  }

  componentDidUpdate(
    prevProps: Readonly<CurvePieChartProps>,
    prevState: Readonly<CurvePieChartState>,
    snapshot?: any
  ) {
    if (this.props.lessonClassCode !== prevProps.lessonClassCode) {
      this.updateChartData();
    }
  }

  onChangeHover(hover) {
    this.setState({ hover });
  }

  onChangeTooltip(targetItem) {
    this.setState({ tooltipTarget: targetItem });
  }

  render() {
    const TooltipContent = (props) => {
      // const { targetItem, text, ...restProps } = props;
      const { targetItem } = props;
      const pointData = this.state.data[targetItem.point];
      const percentage =
        Math.round((pointData.count / this.state.totalCount) * 10000) / 100;
      console.log(targetItem);
      return (
        <h3>
          {pointData.grade}: {percentage}% ({pointData.count}/
          {this.state.totalCount})
        </h3>
      );
    };

    return (
      <Chart
        data={this.state.data}
        // @ts-ignore
        rootComponent={ChartRoot}
      >
        <PieSeries valueField="count" argumentField="grade" />
        <Title text="Grade Distribution" />
        <Animation />
        <Legend
        // position="right"
        // rootComponent={LegendRoot}
        // itemComponent={LegendItem}
        // // @ts-ignore
        // labelComponent={LegendLabel}
        />
        <EventTracker />
        <HoverState
          hover={this.state.hover}
          onHoverChange={this.onChangeHover.bind(this)}
        />
        <Tooltip
          targetItem={this.state.tooltipTarget}
          onTargetItemChange={this.onChangeTooltip.bind(this)}
          contentComponent={TooltipContent}
        />
      </Chart>
    );
  }
}
