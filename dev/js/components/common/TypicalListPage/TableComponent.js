import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
import { getMmatrixInfo } from '../../../actions';


class TableComponent extends Component {


  componentDidMount() {
    this.getInfo(this.props, this.props.store.pagination);
  }

  getInfo = ({domen, path}, {per_page, current_page}) => {
    const query = {
      per_page: per_page,
      page: current_page
    };
    getMmatrixInfo(domen, path, query)
  };

  // TableHead methods
  /**
   * @param allSelected: boolean
   */
  handleSelectAllClick = (allSelected) => {
    if (!allSelected) {
      this.props.onSelectAllClick(this.props.store.data);
    }
    else {
      this.props.onSelectAllClick([]);
    }
  };

  handleRequestSort = (event, property) => {

  };

  // TABLE METHODS
   /**
   * @param value: string
   */
  onRowSelection = (value) => console.log('onRowSelection', value);

  /***
   * @param value: string
   */
  onCellClick = (value) => console.log('onCellClick', value);

  matchItems(selected, id) {
    return selected.reduce((result, item, index) =>
                  item && item.id === id ? index : result, -1);
  };

  handleClick = (event, checked, selected) => {
    const { id, deActive} = checked;

//    if (deActive) return;

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

  // PAGINATION METHODS
  /**
   * @param e: event
   * @param page: string
   */
  handleChangePage = (e, page) => {};

  handleChangeRowsPerPage = (event) => {};

  handleChange = (event) => {};

  render() {
    const { tableHeader, selected, onSelectAllClick} = this.props;
    const { data, pagination: {  per_page, current_page } } = this.props.store;

    return (
      <Table className="table-template">

        <EnhancedTableHead
          path={this.props.path}
          numSelected={selected.length}
          onSelectAllClick={this.handleSelectAllClick}
          onRequestSort={this.handleRequestSort}
          rowCount={data.length}
          columnTitleList={tableHeader}
        />

        <TableBody>
          {data.map(row => {
            const isSelected = this.matchItems(selected, row.id) !== -1; // !row.deActive &&
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
                        <Checkbox checked={isSelected}/>
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
  data             : PropTypes.arrayOf(
                      PropTypes.object
                    ).isRequired,
  path             : PropTypes.string.isRequired,
  tableHeader      : PropTypes.arrayOf(
                      PropTypes.shape({
                        title   : PropTypes.string.isRequired,
                        key     : PropTypes.string.isRequired,
                        tooltip : PropTypes.string
                      }).isRequired
                    ),
  selected         : PropTypes.arrayOf(
                      PropTypes.object
                    ).isRequired,
  onRowClick       : PropTypes.func.isRequired,
  onSelectAllClick : PropTypes.func.isRequired,
};
const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(TableComponent);
