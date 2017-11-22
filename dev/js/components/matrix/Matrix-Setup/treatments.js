import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DIAGNOSIS_TAB } from '../../utils/constants/pageContent';
import { TableComponent } from '../TypicalListPage';
import { GridList } from 'material-ui/GridList';

class TreatmentsComponent extends Component {
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
      }
    ]
  };

  render() {
    const { tableHeader } = DIAGNOSIS_TAB;

    return (
      <div id="diagnosis-component">

        <GridList cols={2} cellHeight='auto' className="page-navigation">

          <div>
            {/*<RaisedButton label="+ Add New"   className="page-navigation-button"/>*/}
            {/*<RaisedButton label="Import"      className="page-navigation-button"/>*/}
            {/*<RaisedButton label="Delete"      className="page-navigation-button"/>*/}
          </div>

          <div>
            {/*Pagination*/}
          </div>

        </GridList>

        <div className="diagnosis-table">
          <TableComponent
            tableHeader={ tableHeader }
            tableRows={this.state.rows}
          />
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(TreatmentsComponent);
