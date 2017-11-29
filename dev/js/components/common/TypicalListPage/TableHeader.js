import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';

class EnhancedTableHead extends Component {

  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  handleClick = (event) => {
    const { rowCount, numSelected } = this.props;
    const allSelected = numSelected === rowCount;
    const someSelected = numSelected > 0 && numSelected < rowCount;

    this.props.onSelectAllClick(allSelected);
  };

  render() {
    const { rowCount, numSelected, columnTitleList } = this.props;
    const { order, orderBy } = this.props.store.pagination;
    return (
      <TableHead>
        <TableRow>

          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              disabled={!rowCount}
              onClick={this.handleClick}
            />
          </TableCell>

          {columnTitleList.map((column, index) =>
            <TableCell className={column.className}
                       key={index}
                       padding="dense">

              <TableSortLabel
                active={orderBy === column.key}
                direction={order}

                onClick={this.createSortHandler(column.key)}
              >
                {column.title}
              </TableSortLabel>

            </TableCell>)}

        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected     : PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onRequestSort   : PropTypes.func.isRequired,
  path            : PropTypes.string.isRequired,
  rowCount        : PropTypes.number.isRequired,
  columnTitleList : PropTypes.arrayOf(
    PropTypes.shape({
      title   : PropTypes.string.isRequired,
      key     : PropTypes.string.isRequired,
      tooltip : PropTypes.string
    }).isRequired
  ),
};

EnhancedTableHead.defaultProps = {
  columnTitle : [],
};

const mapStateToProps = (state, ownProps) => ({
  store: state[ownProps.path]
});

export default connect(mapStateToProps)(EnhancedTableHead);
