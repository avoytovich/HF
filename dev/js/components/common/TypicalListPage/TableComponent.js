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

  /*** TableHead methods ***/

  /*** Under constructions ***/


  /*** Table methods ***/
  onRowSelection = (value) => console.log('onRowSelection', value);

  onCellClick = (value) => console.log('onCellClick', value);

  handleSelectAllClick = (event, checked, selected) => {};

  matchItems(selected, id) {
    return selected.reduce((result, item, index) =>
                  item && item.id === id ? index : result, -1);
  };
  handleClick = (event, checked, selected) => {
    const { id, deActive} = checked;

    if (deActive) return;

    const isIn = this.matchItems(selected, id);

    let result = [];
    switch(true) {
      case !selected.length:
        result = [checked];
        break;

      case isIn === -1 :
        result = selected.concat([checked]);
        break;

      case isIn >= 0:
        result = selected.filter(item => item && item.id !== id );
        break;

      default:
        result = [];
    }
    this.props.onRowClick(result);
  };


  /*** Pagination methods ***/
  handleChangePage = (event, page) => {};

  handleChangeRowsPerPage = (event) => {};

  handleChange = () => {};

  render() {
    const { tableHeader, selected } = this.props;
    const { data, pagination: {  per_page, current_page } } = this.props.store;

    return (
      <Table className="table-template">

        <EnhancedTableHead
          path={this.props.path}
          numSelected={selected.length}
          onSelectAllClick={this.handleSelectAllClick}
          rowCount={data.length}
          columnTitleList={tableHeader}
        />

        <TableBody>
          {data.map(row => {
            const isSelected = !row.deActive && this.matchItems(selected, row.id) !== -1;
            return <TableRow
                      hover
                      key={row.id}
                      tabIndex={-1}
                      role="checkbox"
                      selected={isSelected}
                      className={row.deActive ?'de-active' : 'active'}
                      aria-checked={isSelected}
                      onClick={event => this.handleClick(event, row, selected)}>

                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected}
                                  disabled={row.deActive}/>
                      </TableCell>

                    {tableHeader.map( (col, index) =>
                      <TableCell key={index}
                                 padding="dense">
                        {row[col.key]}
                      </TableCell>)}
            </TableRow>
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={data.length}
              rowsPerPage={per_page}
              page={current_page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
    store: state[ownProps.path]
});

TableComponent.defaultProps = {
  tableHeader : [],
  selected    : [],
  data        : [],
};

TableComponent.PropTypes = {
  data:       PropTypes.arrayOf(
                PropTypes.object
              ).isRequired,
  path        : PropTypes.string.isRequired,
  tableHeader : PropTypes.arrayOf(
                  PropTypes.shape({
                    title   : PropTypes.string.isRequired,
                    key     : PropTypes.string.isRequired,
                    tooltip : PropTypes.string
                  }).isRequired
                ),
  selected    : PropTypes.arrayOf(
                  PropTypes.object
                ).isRequired,
  onRowClick  : PropTypes.func.isRequired,
};

export default  connect(mapStateToProps)(TableComponent);
