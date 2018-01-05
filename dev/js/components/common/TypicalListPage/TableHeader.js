import React, { Component } from 'react';
import { connect }          from 'react-redux';
import PropTypes            from 'prop-types';
import Checkbox             from 'material-ui/Checkbox';
import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
}                           from 'material-ui/Table';

class EnhancedTableHead extends Component {
  /**
   * @param property
   */
  createSortHandler =  (event, property, {type}) => {
    if (type === 'stop') return;

    this.props.onRequestSort(event, property);
  };

  /**
   * @param event
   */
  handleClick = (event) => {
    const { rowCount, numSelected } = this.props;
    const allSelected = numSelected === rowCount;
    const someSelected = numSelected > 0 && numSelected < rowCount;

    this.props.onSelectAllClick(allSelected);
  };

  render() {
    const { rowCount, numSelected, columnTitleList } = this.props;
    const { sortedBy, orderBy } = this.props.store.sortOptional;

    return (
      <TableHead>
        <TableRow>

          <TableCell padding="checkbox"
                     className="td-checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              disabled={!rowCount}
              onClick={this.handleClick}
            />
          </TableCell>

          {columnTitleList.map((column, index) => {
            const sortKey = column.sortKey || column.key;
            return <TableCell className={column.className}
                       key={index}
                       padding="dense">
              <TableSortLabel
                active={orderBy === sortKey}
                direction={sortedBy}

                onClick={(event) => this.createSortHandler(event, sortKey, column)}
              >
                {column.title}
              </TableSortLabel>

            </TableCell>
          })}

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
      sortKey : PropTypes.string,
      tooltip : PropTypes.string
    }).isRequired
  ),
};

EnhancedTableHead.defaultProps = {
  columnTitle : [],
};

const mapStateToProps = (state, ownProps) => ({
  store: state.tables[ownProps.path]
});

export default connect(mapStateToProps)(EnhancedTableHead);
