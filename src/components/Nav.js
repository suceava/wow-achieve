import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navs: ['reputation', 'achievements'],
      selectedNav: 'reputation'
    };
  }

  render() {
    return(
      <div className='nav-container'>
        <div className='nav-container-inner'>
          <div className='nav-item-container'>
            <NavLink to='/reputation' activeClassName='nav-link-active' className='nav-link'>
              <div className='nav'>REPUTATION</div>
            </NavLink>
          </div>

          <div className='nav-item-container'>
            <NavLink to='/achievements' className='nav-link'>
              <div className='nav'>ACHIEVEMENTS</div>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;