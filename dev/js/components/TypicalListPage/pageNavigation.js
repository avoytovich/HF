import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GridList } from 'material-ui/GridList';
import RaisedButton from 'material-ui/RaisedButton';

import Pagination from 'materialui-pagination';


class PageNavigation extends Component {
  state = {
    rowsPerPage: [5,10,15],
    rows: [],
    numberOfRows: 5,
    page: 1,
    total: undefined
  };

  render() {
    return (
      <GridList cols={2} cellHeight='auto'className="page-navigation">

        <div>
          <RaisedButton label="+ Add New" className="page-navigation-button"/>
          <RaisedButton label="Import"    className="page-navigation-button"/>
          <RaisedButton label="Delete"    className="page-navigation-button"/>
        </div>

        <div>
        </div>
      </GridList>

    )
  }
}


export default PageNavigation;
