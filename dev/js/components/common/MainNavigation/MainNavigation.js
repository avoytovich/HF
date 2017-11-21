import React, { Component } from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
// UI
import { List, ListItem } from 'material-ui/List';


class MainNavigation extends Component {
  navigationList = [
    { title: 'Organizations',         url: '/organizations' },
    { title: 'Clinics',               url: '/clinics' },
    { title: 'Users',                 url: '/users' },
    { title: 'Resource',              url: '/resource' },
    { title: 'Matrix Setup',          url: '/matrix-setup' },
    { title: 'Test Diagnostic Flow',  url: '/test-diagnostic-flow' }
  ];


  render() {
    return (
//      <List>
//        {this.navigationList.map((nav, index) =>
//          <ListItem key={index}>
//            <Link
//              to={nav.url}
//              activeClassName='active-route'>
//              {nav.title}
//            </Link>
//          </ListItem>
//         )}
//      </List>
      <div className="content-navigation">
        <ul className="navigation-list">
          {this.navigationList.map((nav, index) =>
            <li key={index}>
              <Link
                to={nav.url}
                activeClassName='active-route'>
                <span>
                  {nav.title}
                </span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(MainNavigation);
