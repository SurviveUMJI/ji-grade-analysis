import * as React from 'react';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import GitHubButton from 'react-github-button';
import 'react-github-button/assets/style.css';

export interface HeaderProps {
  namespace: string;
  repo: string;
  /* empty */
}

export interface HeaderState {
  /* empty */
}

export class Header extends React.Component<HeaderProps, HeaderState> {
  render() {
    return (
      <div>
        <Grid container justify="center">
          <Typography component="h1" variant="h3" color="inherit"
                      gutterBottom align={'center'}>
            UM-SJTU JI Grade Analysis
          </Typography>
        </Grid>
        <Grid container justify="flex-end" spacing={1}>
          <Grid item>
          <GitHubButton type="stargazers" size="large"
                        namespace={this.props.namespace}
                        repo={this.props.repo}/>
          </Grid>
          <Grid item>
          <GitHubButton type="watchers" size="large"
                        namespace={this.props.namespace}
                        repo={this.props.repo}/>
          </Grid>
          <Grid item>
          <GitHubButton type="forks" size="large"
                        namespace={this.props.namespace}
                        repo={this.props.repo}/>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Header;
