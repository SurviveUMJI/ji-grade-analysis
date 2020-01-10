import * as React from 'react';
import {inject} from 'mobx-react';
import {
  Chart,
  Legend,
  Tooltip,
  BarSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import {
  Animation,
  EventTracker,
  HoverState,
  ArgumentAxis,
  ValueAxis,
  // Palette,
} from '@devexpress/dx-react-chart';
// import {schemePastel2} from 'd3-scale-chromatic';

import {withStyles} from '@material-ui/styles';
import _ from 'lodash';

import {STORE_COURSES} from 'app/constants';
// import {ScoreModel} from 'app/models/CourseModel';
// import {CoursesStore} from 'app/stores';
import {ScoreData} from 'app/components/Lesson';

export interface CurveBarChartProps {
  // lessonClassCode: string
  data: ScoreData[];
}

export interface CurveBarChartState {
  hover: any;
  tooltipTarget: any;
  totalCount: number;
}

const chartRootStyles = {
  chart: {
    paddingRight: '20px',
  },
};
const legendStyles = {
  root: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'row',
  },
};
const legendLabelStyles = theme => ({
  label: {
    paddingTop: theme.spacing(1),
  },
});
const legendItemStyles = {
  item: {
    flexDirection: 'column',
  },
};

const colors = ['#fdca00', '#19335d'];

const BarSeriesPointBase = ({index, color, ...restProps}) => {
  color = colors[index % 2];
  // @ts-ignore
  return <BarSeries.Point index={index}
                          color={color} {...restProps}/>;
};

const ChartRootBase = ({classes, ...restProps}) => (
  // @ts-ignore
  <Chart.Root {...restProps} className={classes.chart}/>
);
const LegendRootBase = ({classes, ...restProps}) => (
  // @ts-ignore
  <Legend.Root {...restProps} className={classes.root}/>
);
const LegendLabelBase = ({classes, ...restProps}) => (
  // @ts-ignore
  <Legend.Label {...restProps} className={classes.label}/>
);
const LegendItemBase = ({classes, ...restProps}) => (
  // @ts-ignore
  <Legend.Item {...restProps} className={classes.item}/>
);

// @ts-ignore
const ChartRoot = withStyles(chartRootStyles, {name: 'ChartRoot'})(
  ChartRootBase);
// @ts-ignore
const LegendRoot = withStyles(legendStyles, {name: 'LegendRoot'})(
  LegendRootBase);
// @ts-ignore
const LegendLabel = withStyles(legendLabelStyles, {name: 'LegendLabel'})(
  LegendLabelBase);
// @ts-ignore
const LegendItem = withStyles(legendItemStyles, {name: 'LegendItem'})(
  LegendItemBase);

@inject(STORE_COURSES)
export class CurveBarChart extends React.Component<CurveBarChartProps, CurveBarChartState> {
  constructor(props: CurveBarChartProps, context: any) {
    super(props, context);
    this.state = {
      hover: null,
      tooltipTarget: null,
      totalCount: CurveBarChart.getTotalCount(props.data),
    };
  }

  static getTotalCount(data: ScoreData[]) {
    return _.sumBy(data, (scoreData: ScoreData) => scoreData.count);
  }

  updateChartData() {
    this.setState({totalCount: CurveBarChart.getTotalCount(this.props.data)});
  }

  componentDidMount() {
    // this.updateChartData();
  }

  componentDidUpdate(
    prevProps: Readonly<CurveBarChartProps>,
    prevState: Readonly<CurveBarChartState>, snapshot?: any) {
    // if (this.props.lessonClassCode !== prevProps.lessonClassCode) {
    // this.updateChartData();
    // }
  }

  onChangeHover(hover) {
    this.setState({hover});
  }

  onChangeTooltip(targetItem) {
    this.setState({tooltipTarget: targetItem});
  }

  render() {
    const TooltipContent = (props) => {
      // const { targetItem, text, ...restProps } = props;
      const {targetItem} = props;
      const pointData = this.props.data[targetItem.point];
      const percentage = Math.round(
        pointData.count / this.state.totalCount * 10000) / 100;
      // console.log(targetItem);
      return (
        <h3>
          {pointData.grade}: {percentage}%
          ({pointData.count}/{this.state.totalCount})
        </h3>
      );
    };

    return (
      <Chart
        data={this.props.data}
        // @ts-ignore
        rootComponent={ChartRoot}
      >
        <BarSeries
          valueField="count"
          argumentField="grade"
          pointComponent={BarSeriesPointBase}
        />
        {/*<Palette scheme={schemePastel2}/>*/}
        {
          // @ts-ignore
          <ArgumentAxis/>
        }
        {
          // @ts-ignore
          <ValueAxis/>
        }
        <Title
          text=""
        />
        <Animation/>
        {/*<Legend*/}
        {/*  // position="right"*/}
        {/*  // rootComponent={LegendRoot}*/}
        {/*  // itemComponent={LegendItem}*/}
        {/*  // // @ts-ignore*/}
        {/*  // labelComponent={LegendLabel}*/}
        {/*/>*/}
        <EventTracker/>
        <HoverState hover={this.state.hover}
                    onHoverChange={this.onChangeHover.bind(this)}/>
        <Tooltip
          targetItem={this.state.tooltipTarget}
          onTargetItemChange={this.onChangeTooltip.bind(this)}
          contentComponent={TooltipContent}
        />
      </Chart>
    );
  }
}
