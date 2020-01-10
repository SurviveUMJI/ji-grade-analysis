import * as React from 'react';
import {
  Container,
  CssBaseline,
  Grid,
  Paper,
} from '@material-ui/core';
import Header from 'app/components/Header';

import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from '@material-ui/core/styles';
import {RouteComponentProps} from 'react-router';

const styles = (theme: Theme) => createStyles({
  mainFeaturedPost: {
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
  },
  mainFeaturedPostContent: {
    padding: `${theme.spacing(6)}px`,
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingLeft: 0,
    },
  },
});

export interface RootProps extends RouteComponentProps<any>,
  WithStyles<typeof styles> {
}

export interface RootState {
}

class Root extends React.Component<RootProps, RootState> {
  renderDevTool() {
    if (process.env.NODE_ENV !== 'production') {
      const DevTools = require('mobx-react-devtools').default;
      return <DevTools/>;
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div className="container">
        <Container maxWidth={'lg'}>
          <CssBaseline/>
          <br/>
          <Paper>
            <div className={classes.mainFeaturedPostContent}>
              <Header namespace="tc-imba" repo="ji-grade-analysis"/>
              <br/>
              <Grid container justify="center">
                {this.props.children}
              </Grid>
            </div>
          </Paper>
        </Container>
        {this.renderDevTool()}
      </div>
    );
  }
}

const RootWithStyle = withStyles(styles)(Root);
export default props => <RootWithStyle {...props} />;
