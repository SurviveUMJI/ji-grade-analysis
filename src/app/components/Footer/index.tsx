import * as React from 'react';
import {Grid, Link} from '@material-ui/core';

export interface FooterProps {
}

export interface FooterState {
}

export class Footer extends React.Component<FooterProps, FooterState> {
  render() {
    return (
      <footer>
        <br/>
        <Grid container justify="flex-end">
          Powered by&nbsp;
          <Link href="https://github.com/tc-imba"> tc-imba </Link>,
          Copyright 2019-2020
        </Grid>
      </footer>
    );
  }
}

export default Footer;
