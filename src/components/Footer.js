import React, { Component } from 'react';
import apv from '../../appversion';

class Footer extends Component {
  render() {
    return(
      <div className="footer">
        <div className="footer-feedback">
          Feedback welcome: feedback@gnarlybits.com
        </div>
        <div className="footer-build">
          Built on {new Date(apv.build.date).toUTCString()}
        </div>
      </div>
    );
  }
}

export default Footer;