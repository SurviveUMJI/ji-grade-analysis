import * as React from 'react';
import {Grid, Link} from '@material-ui/core';
import packageData from 'app/../../package.json';

export interface FooterProps {
}

export interface FooterState {
}

export class Footer extends React.Component<FooterProps, FooterState> {
  render() {
    return (
      <footer>
        <br/>
        <Grid container justifyContent="flex-end">
          Version {packageData.version}, Powered by&nbsp;
          <Link href="https://github.com/tc-imba" target="_blank">tc-imba</Link>,
          Copyright 2019-2021
        </Grid>
      </footer>
    );
  }
}

export default Footer;
