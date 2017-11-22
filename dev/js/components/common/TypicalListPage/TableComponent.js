import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';
import EnhancedTableHead from './TableHeader';


class TableComponent extends Component {

  state = {
    order: 'asc',
    orderBy: 'calories',
    selected: [],
  };

  onRowSelection = (value) => console.log('onRowSelection', value);

  onCellClick = (value) => console.log('onCellClick', value);

//  handleRequestSort = (event, property) => {
//    const orderBy = property;
//    let order = 'desc';
//
//    if (this.state.orderBy === property && this.state.order === 'desc') {
//      order = 'asc';
//    }
//
//    const data =
//      order === 'desc'
//        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
//        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
//
//    this.setState({ data, order, orderBy });
//  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  handleClick = (event, id) => {};

  render() {
    const { order, orderBy, selected } = this.state;
    const { tableHeader } = this.props;
    const { data } = this.props.store;

    return (
      <Table>

        <EnhancedTableHead
          path={this.props.path}
          numSelected={selected.length}
          onSelectAllClick={this.handleSelectAllClick}
          rowCount={data.length}
          columnTitleList={tableHeader}
        />

        <TableBody>
          {data.map(row => {
            const isSelected = this.isSelected(row.id);
            return <TableRow
              hover
              role="checkbox"
              aria-checked={isSelected}
              tabIndex={-1}
              key={row.id}
              selected={isSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={isSelected}/>
              </TableCell>

              {tableHeader.map( (col, index) =>
                <TableCell key={index} padding="dense">{row[col.key]}</TableCell>)}

            </TableRow>
          })}
        </TableBody>
      </Table>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
    store: state[ownProps.path]
});

TableComponent.defaultProps = {
  tableHeader : [],
};

TableComponent.PropTypes = {
  path        : PropTypes.string,
  tableHeader : PropTypes.arrayOf(
    PropTypes.shape({
      title   : PropTypes.string.isRequired,
      key     : PropTypes.string.isRequired,
      tooltip : PropTypes.string
    }).isRequired
  ),
};

export default  connect(mapStateToProps)(TableComponent);
