import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageNavigation from './PageNavigation';
import Subheader from 'material-ui/Subheader';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

class TypicalListPage extends Component {
  state = {
    rows: [1,2,3,4,5,3,6,7,8,55,66,32,2123,3123,312312],
  };

  render() {
    return (
      <div>
        <Subheader className="page-sub-header">{this.props.title}</Subheader>

        <PageNavigation/>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>Row Number</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.state.rows.map((row, index) => {
              return (
                <TableRow key={index}>
                  <TableRowColumn>{row}</TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(TypicalListPage);
