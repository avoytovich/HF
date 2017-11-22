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
//    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, numSelected, columnTitleList } = this.props;
    const { order, orderBy } = this.props.store;
    return (
      <TableHead>
        <TableRow>

          <TableCell padding="checkbox">
            <Checkbox/>
          </TableCell>

          {columnTitleList.map((column, index) =>
            <TableCell key={index} padding="dense">

              <TableSortLabel>
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
  path            : PropTypes.string.isRequired,
  columnTitleList : PropTypes.arrayOf(
    PropTypes.shape({
      title   : PropTypes.string.isRequired,
      key     : PropTypes.string.isRequired,
      tooltip : PropTypes.string
    }).isRequired
  )
};

EnhancedTableHead.defaultProps = {
  columnTitle : [],
};

const mapStateToProps = (state, ownProps) => ({
  store: state[ownProps.path]
});

export default connect(mapStateToProps)(EnhancedTableHead);
