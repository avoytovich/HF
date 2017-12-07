import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableComponent from './TableComponent';
import TableControls from './TableControls';


class TypicalListPage extends Component {
  state = {
      selected: []
  };


  onRowClick = (selected = []) => this.setState({selected});

  render() {
    const { title, tableHeader } =  this.props;

    return (
      <div>

        <div className="page-sub-header">{ title }</div>

        <TableControls path="diagnosis"/>

        <TableComponent
          path="diagnosis"
          tableHeader={ tableHeader }
          selected={this.state.selected}
          onRowClick={this.onRowClick}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

export default  connect(mapStateToProps)(TypicalListPage);
