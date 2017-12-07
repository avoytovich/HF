import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes              from 'prop-types';
import
  Table, {
  TableBody,
  TableCell,
  TableFooter,
  TablePagination,
  TableRow
}                             from 'material-ui/Table';
import Checkbox               from 'material-ui/Checkbox';
import EnhancedTableHead      from './TableHeader';
import {
  getMatrixInfo,
  getListByPost,
}                             from '../../../actions';
import get                    from 'lodash/get';
import isEmpty                from 'lodash/isEmpty'
import moment                 from 'moment';
import { browserHistory }     from 'react-router'
import { PAGE }               from '../../../config'
import { withRouter }         from 'react-router'


/*
 * Important Requirement:
 * 1) Add path props to tableReducer in listOfTables = [ 'diagnosis', 'conditions', * YOUR_ITEM * ],
 * 2) Add url to constant PAGE, key should be the same with 'path' props { [ path ]: '/some-url' };
 */

//Todo: Add validation for manual typed query, finished with sorting and filter and default query params in props

class TableComponent extends Component {

  componentDidMount() {
    this.setDefaultQuery(this.props.path, this.props.store.pagination);
  }

  /**
   * New request on url query change
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location &&
        nextProps.location.query) {
      this.getList(this.props, nextProps.location.query);
    }
  }

  /**
   * @param pathname  : {string} - current url
   * @param pagination: {{ per_page: string, page: string }}
   */
  setDefaultQuery = (pathname, pagination) => {
    const currentQuery = this.props.location.query;
    const currentPath = PAGE[this.props.path];
    const { per_page, current_page } =
      isEmpty(currentQuery) ? { per_page: 5, current_page: 0 } : currentQuery;
    browserHistory.push({
      pathname: currentPath,
      query: {
        current_page,
        per_page
      }
    });
  };

  /**
   * @param reqType
   * @param domen: {string}     - custom api to microservice
   * @param path: {string}      - variable with location for curent page
   * @param _query: {object}  - count of items per pa
   */
  getList = ({reqType, domen, path}, _query) => {
    switch (reqType) {
      case 'POST':
        const body = {
        };
        getListByPost(domen, path, body, _query);
        break;

      default:
        const {per_page, current_page} = _query;
        const query = {
          per_page: per_page,
          page: +current_page + 1 // TODO: need to talk we back end developers to change count start point from 0
        };
        getMatrixInfo(domen, path, query, path)
    }
  };

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

  /**
   * @param event
   * @param property
   */
  handleRequestSort = (event, property) => {};

   /**
   * @param value: string
   */
  onRowSelection = (value) => console.log('onRowSelection', value);

  /***
   * @param value: string
   */
  onCellClick = (value) => console.log('onCellClick', value);

  /**
   * @param selected
   * @param id
   * @return {*}
   */
  matchItems(selected, id) {
    return selected.reduce((result, item, index) => {
      return item && (item.id || item.customer_id) === id ? index : result;
    }, -1)
  };

  handleClick = (event, checked, selected) => {
    let { id, deActive, customer_id } = checked;
    id = id || customer_id;
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
        result = selected.filter(item => item && (item.id || item.customer_id) !== id );
        break;

      default:
        result = [];
    }
    this.props.onRowClick(result);
  };

  /**
   * Change number of page
   * @param e: event
   * @param nextPage: string
   */
  handleChangePage = (e, nextPage) => {
    const currentPath = PAGE[this.props.path];
    const { per_page } = this.props.store.pagination;

    browserHistory.push({
      pathname: currentPath,
      query: {
        per_page: per_page,
        current_page: nextPage
      }
    });
  };

  /**
   * Change count of items per page
   * @param event
   */
  handleChangeRowsPerPage = (event) => {
    const currentPath = PAGE[this.props.path];
    const { current_page } = this.props.store.pagination;

    browserHistory.push({
      pathname: currentPath,
      query: {
        per_page: event.target.value,
        current_page: 0
      }
    });
  };

  handleChange = (event) => {};

  /**
   * Formatting of values
   * @param row
   * @param key
   * @param type
   * @param format
   * @return {*}
   */
  formatCellValue = (row, key, type, format) => {
    const value =  get(row, key);
    switch (type) {
      case 'time':
       return moment.unix(value).format(format);
      case 'number':
        return value;
      default:
        return value ? value : '-';
    }
  };

  render() {
    const {
      tableHeader,
      selected,
      onSelectAllClick,
      store: {
        data,
        pagination: {
          per_page,
          current_page,
          total,
        },
      }
    } = this.props;
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
          {
            data.map(row => {
              const id         = row.id || row.customer_id;
              const isSelected = this.matchItems(selected, id) !== -1; // !row.deActive &&
              let isEnabled;
              if (row.hasOwnProperty('enabled')) {
                isEnabled  = row.enabled ? 'active' : 'de-active';
              } else {
                isEnabled  = row.customer_active ? 'active' : 'de-active';
              }
              return (
                <TableRow
                  hover
                  key={id}
                  tabIndex={-1}
                  role="checkbox"
                  selected={isSelected}
                  className={isEnabled}
                  aria-checked={isSelected}
                  onClick={e => this.handleClick(e, row, selected)}
                >
                  <TableCell padding="checkbox"><Checkbox checked={isSelected}/></TableCell>
                  {
                    tableHeader.map((col, i) => (
                      <TableCell key={i} className={col.className} padding="dense">
                        { this.formatCellValue(row, col.key, col.type, col.format) }
                      </TableCell>
                    ))
                  }
                </TableRow>
              )
            })
          }
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={total}
              rowsPerPage={per_page}
              page={current_page - 1}
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
    store    : state.tables[ownProps.path]
});

TableComponent.defaultProps = {
  tableHeader : [],
  selected    : [],
  data        : [],
};

TableComponent.propTypes = {
  data             : PropTypes.arrayOf(
                      PropTypes.object
                    ).isRequired,
  path             : PropTypes.string.isRequired,
  domen            : PropTypes.string.isRequired,
  reqType          : PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableComponent));
