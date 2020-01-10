import * as React from 'react';
import {
  // Divider,
  Typography
} from '@material-ui/core';

export interface HeaderProps {
  /* empty */
}

export interface HeaderState {
  /* empty */
}

export class Header extends React.Component<HeaderProps, HeaderState> {


  render() {
    return (
      <div>
        <Typography align={'center'} variant={'h4'}>
          UM-SJTU-JI Grade Analysis
        </Typography>
      </div>
    );
  }
}

export default Header;
