import * as React from 'react';
import {inject} from 'mobx-react';
import {
  Chart,
  // Legend,
  Tooltip,
  BarSeries,
  LineSeries,
  PieSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import {
  Animation,
  EventTracker,
  HoverState,
  // Palette,
} from '@devexpress/dx-react-chart';
// import {schemePastel2} from 'd3-scale-chromatic';

import {withStyles} from '@material-ui/styles';
import _ from 'lodash';

import {STORE_COURSES} from 'app/constants';
// import {ScoreModel} from 'app/models/CourseModel';
// import {CoursesStore} from 'app/stores';
import {ScoreData} from 'app/components/Lesson';

export interface CurveChartProps {
  lessonClassCode: string
  data: ScoreData[];
  chartType: string;
  hideUnknown: boolean;
  hideZero: boolean;
}

export interface CurveChartState {
  hover: any;
  tooltipTarget: any;
  totalCount: number;
  chartData: ScoreData[];
}

const chartRootStyles = {
  chart: {
    paddingRight: '20px',
  },
};

/*const legendStyles = {
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
};*/

const colors = ['#fdca00', '#19335d', '#ffffff'];

const BarSeriesPointBase = ({index, color, ...restProps}) => {
  color = colors[index % 2];
  // @ts-ignore
  return <BarSeries.Point index={index}
                          color={color} {...restProps}/>;
};

/*const LineSeriesPathBase = ({coordinates, color, ...restProps}) => {
  console.log(coordinates);
  // color = colors[coordinates.arg % 2];
  // @ts-ignore
  return <LineSeries.Path coordinates={coordinates}
                            color={color} {...restProps}/>;
};*/

const PieSeriesPointBase = ({index, color, endAngle, ...restProps}) => {
  if (index >= 2 && index % 2 == 0 && Math.abs(endAngle - Math.PI * 2) < 1e-5) {
    color = colors[2];
  } else {
    color = colors[index % 2];
  }
  // @ts-ignore
  return <PieSeries.Point index={index} endAngle={endAngle}
                          color={color} {...restProps}/>;
};

const ChartRootBase = ({classes, ...restProps}) => (
  // @ts-ignore
  <Chart.Root {...restProps} className={classes.chart}/>
);

/*const LegendRootBase = ({classes, ...restProps}) => (
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
);*/

// @ts-ignore
const ChartRoot = withStyles(chartRootStyles, {name: 'ChartRoot'})(
  ChartRootBase);

/*// @ts-ignore
const LegendRoot = withStyles(legendStyles, {name: 'LegendRoot'})(
  LegendRootBase);
// @ts-ignore
const LegendLabel = withStyles(legendLabelStyles, {name: 'LegendLabel'})(
  LegendLabelBase);
// @ts-ignore
const LegendItem = withStyles(legendItemStyles, {name: 'LegendItem'})(
  LegendItemBase);*/

@inject(STORE_COURSES)
export class CurveChart extends React.Component<CurveChartProps, CurveChartState> {
  constructor(props: CurveChartProps, context: any) {
    super(props, context);
    const chartData = CurveChart.getChartData(props.data, props.chartType,
      props.hideUnknown, props.hideZero);
    this.state = {
      hover: null,
      tooltipTarget: null,
      totalCount: CurveChart.getTotalCount(chartData),
      chartData: chartData,
    };
  }

  static getTotalCount(data: ScoreData[]) {
    return _.sumBy(data, (scoreData: ScoreData) => scoreData.count);
  }

  static getChartData(
    data: ScoreData[], chartType: string, hideUnknown: boolean,
    hideZero: boolean) {
    let newData = data;
    if (hideZero || chartType === 'pie') {
      newData = _.filter(data, scoreData => scoreData.count != 0);
    }
    if (hideUnknown && newData.length > 0 && _.last(newData).grade ===
      'Unknown') {
      newData = _.slice(newData, 0, newData.length - 1);
    }
    return newData;
  }

  /*  updateChartData() {
      this.setState({totalCount: CurveChart.getTotalCount(this.props.data)});
    }*/

  /*  componentDidMount() {
      this.updateChartData();
    }*/

  componentDidUpdate(
    prevProps: Readonly<CurveChartProps>,
    prevState: Readonly<CurveChartState>, snapshot?: any) {
    if (this.props.lessonClassCode === prevProps.lessonClassCode) {
      return;
    } else if (this.props.chartType === prevProps.chartType &&
      this.props.hideUnknown === prevProps.hideUnknown &&
      this.props.hideZero === prevProps.hideZero
    ) {
      return;
    }
    const chartData = CurveChart.getChartData(this.props.data,
      this.props.chartType, this.props.hideUnknown, this.props.hideZero);
    this.setState({
      totalCount: CurveChart.getTotalCount(chartData),
      chartData: chartData,
    });
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
      const pointData = this.state.chartData[targetItem.point];
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

    let series = [];
    if (this.props.chartType === 'bar') {
      series = [
        <BarSeries
          key="series"
          valueField="count"
          argumentField="grade"
          pointComponent={BarSeriesPointBase}
        />,
        // @ts-ignore
        <ArgumentAxis key="argument"/>,
        // @ts-ignore
        <ValueAxis key="value"/>,
      ];
    } else if (this.props.chartType === 'line') {
      series = [
        <LineSeries
          key="series"
          valueField="count"
          argumentField="grade"
          color={colors[0]}
        />,
        // @ts-ignore
        <ArgumentAxis key="argument"/>,
        // @ts-ignore
        <ValueAxis key="value"/>,
      ];
    } else if (this.props.chartType === 'pie') {
      series = [
        <PieSeries
          key="series"
          valueField="count"
          argumentField="grade"
          innerRadius={0.4}
          outerRadius={0.8}
          pointComponent={PieSeriesPointBase}
        />,
        // <Legend key="legend"/>,
        // <Palette scheme={schemePastel2}/>,
      ];
    }

    return (
      <Chart
        data={this.state.chartData}
        // @ts-ignore
        rootComponent={ChartRoot}
      >
        {series}
        <Title text=""/>
        <Animation/>
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

{/*<Legend*/
}
{/*  // position="right"*/
}
{/*  // rootComponent={LegendRoot}*/
}
{/*  // itemComponent={LegendItem}*/
}
{/*  // // @ts-ignore*/
}
{/*  // labelComponent={LegendLabel}*/
}
{/*/>*/
}
