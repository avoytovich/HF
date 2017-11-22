import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DIAGNOSIS_TAB } from '../../../utils/constants/pageContent';
import { TableComponent } from '../../../components/common/TypicalListPage';
import { browserHistory } from 'react-router'

class DiagnosisComponent extends Component {
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

  create = () => {
    browserHistory.push(`/diagnosis-create`);
  };

  render() {
//    const { tableHeader } = DIAGNOSIS_TAB;

    return (
      <div id="diagnosis-component">
        eee
        {/*<GridList cols={2} cellHeight='auto' className="page-navigation">

          <div>
            <RaisedButton label="+ Add New"   className="page-navigation-button" onClick={() => this.create()}/>
            <RaisedButton label="Import"      className="page-navigation-button" />
            <RaisedButton label="Delete"      className="page-navigation-button"/>
            <RaisedButton label="Deactivate"  className="page-navigation-button"/>
          </div>

          <div>
            /!*Pagination*!/
          </div>

        </GridList>

        <div className="diagnosis-table">
          <TableComponent
            tableHeader={ tableHeader }
            tableRows={this.state.rows}
          />
        </div>*/}

      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(DiagnosisComponent);
