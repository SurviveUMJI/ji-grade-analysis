import * as React from "react";
import { Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { GitHubButton, GitHubButtonProvider } from "react-github-button";
import "react-github-button/assets/style.less";

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
        <Grid container justifyContent="center">
          <Typography
            component="h1"
            variant="h3"
            color="inherit"
            gutterBottom
            align={"center"}
          >
            <Link
              to="/courses"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              UM-SJTU JI Grade Analysis
            </Link>
          </Typography>
        </Grid>
        <GitHubButtonProvider
          namespace={this.props.namespace}
          repo={this.props.repo}
        >
          <Grid container justifyContent="flex-end" spacing={1}>
            <Grid item>
              <GitHubButton type="stargazers" size="large" />
            </Grid>
            <Grid item>
              <GitHubButton type="watchers" size="large" />
            </Grid>
            <Grid item>
              <GitHubButton type="forks" size="large" />
            </Grid>
          </Grid>
        </GitHubButtonProvider>
      </div>
    );
  }
}

export default Header;
