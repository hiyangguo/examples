import React, { Component } from 'react';
import { Footer as RsFooter } from 'rsuite';

class Footer extends Component {
  render() {
    return (
      <RsFooter>
        <span className="copyright">All rights reserved. Copyright HYPERS Ltd 2018.</span>
        <span className="email">
          <span>Email：</span><a href="mailto:adserving@hypers.com">adserving@hypers.com</a></span>
      </RsFooter>
    );
  }
}

export default Footer;
