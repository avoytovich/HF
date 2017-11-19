import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

class TableComponent extends Component {
  state = {
    fixedHeader: true,
    selectable: true,
    multiSelectable: true,
    showRowHover: true
  };


  onRowSelection = (value) => {
    console.log('onRowSelection', value)
  };

  onCellClick = (value) => {
    console.log('onCellClick', value)
  };

  render() {
    const {tableHeader, tableRows} = this.props;
    const {fixedHeader, selectable, multiSelectable, showRowHover} = this.state;

    return (
      <Table
        fixedHeader
        selectable
        multiSelectable
        onRowSelection={this.onRowSelection}
        onCellClick={this.onCellClick}
      >

        <TableHeader>
          <TableRow>
            {tableHeader.map((row, index) =>
              <TableHeaderColumn key={index} tooltip={row.tooltip}>
                {row.title}
              </TableHeaderColumn>
            )}
          </TableRow>
        </TableHeader>

        <TableBody showRowHover>
          {tableRows.map((row, index) =>
              <TableRow key={index}>
                {tableHeader.map((item, i) => {
                  const { key } = item;
                  return  <TableRowColumn key={ i }>{ row[key] }</TableRowColumn>
                })}
              </TableRow>
          )}
        </TableBody>

      </Table>
    )
  }
}

const mapStateToProps = state => ({
  commonReducer: state.commonReducer
});

TableComponent.defaultProps = {
  tableRows:    [],
  tableHeader:  []
};

TableComponent.PropTypes = {
  tableRows:   PropTypes.arrayOf(
                  PropTypes.shape({
                    title: PropTypes.string,
                    key:   PropTypes.string,
                  })
                ),
  tableHeader: PropTypes.PropTypes.arrayOf(PropTypes.object)
};

export default  connect(mapStateToProps)(TableComponent);
