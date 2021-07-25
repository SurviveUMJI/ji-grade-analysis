import * as React from 'react';
import { Grid, Link } from '@material-ui/core';
import packageData from 'app/../../package.json';

export interface FooterProps {}

export interface FooterState {}

export class Footer extends React.Component<FooterProps, FooterState> {
  render() {
    return (
      <footer>
        <br />
        <Grid container justifyContent="space-between">
          <div className="busuanzi">
            <span id="busuanzi_container_page_pv">
              Visitor count:&nbsp;
              <span id="busuanzi_value_page_pv"></span>
            </span>
          </div>
          <span>
            Version {packageData.version}, Powered by&nbsp;
            <Link href="https://github.com/tc-imba" target="_blank">
              tc-imba
            </Link>
            , Copyright 2019-2021
          </span>
        </Grid>
      </footer>
    );
  }
}

export default Footer;
