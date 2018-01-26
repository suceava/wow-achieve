import React, { Component } from 'react';
import apv from '../../appversion';

class Footer extends Component {
  render() {
    return(
      <div className="footer">
        Built on {new Date(apv.build.date).toUTCString()}
      </div>
    );
  }
}

export default Footer;