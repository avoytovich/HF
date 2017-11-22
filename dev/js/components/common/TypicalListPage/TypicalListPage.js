import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableComponent from './TableComponent';
import PageNavigation from './pageNavigation';

//import Subheader from 'material-ui/Subheader';

class TypicalListPage extends Component {
  state = {
    rows: [
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      },
      {
        organization: 'Organization Name',
        contact: 'John Doe',
        users: 100,
        subscription: 'Subscription',
        start: '01 Mar  2017',
        ending: '01 Mar  2018'
      }
    ]
  };

  render() {
    const { title, tableHeader } =  this.props;

    return (
      <div>

        <div className="page-sub-header">{ title }</div>

        <PageNavigation />

        <TableComponent
          tableHeader={ tableHeader }
          tableRows={this.state.rows}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(TypicalListPage);
