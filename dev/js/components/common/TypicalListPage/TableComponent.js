import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes              from 'prop-types';
import Table, {
        TableBody,
        TableCell,
        TableFooter,
        TablePagination,
        TableRow }            from 'material-ui/Table';
import Checkbox               from 'material-ui/Checkbox';
import EnhancedTableHead      from './TableHeader';
import {
  getMatrixInfo,
  getListByPost,
}                             from '../../../actions';
import get                    from 'lodash/get';
import isEmpty                from 'lodash/isEmpty'
import moment                 from 'moment';
import { browserHistory }     from 'react-router';
import { PAGE }               from '../../../config';
import { withRouter }         from 'react-router';
import Tooltip                from 'material-ui/Tooltip';


const DEFAULT_QUERY = {
  per_page    : 100,
  current_page: 0,
  sortedBy    : 'desc',
  orderBy     : 'title',
//  search      :'VAS'
};


/**
 * Important Requirement:
 * 1) Add path props to tableReducer in listOfTables = [ 'diagnosis', 'conditions', * YOUR_ITEM * ],
 * 2) Add url to constant PAGE, key should be the same with 'path' props { [ path ]: '/some-url' };
 */

//Todo: Add validation for manual typed query, finished with sorting and filter and default query params in props

class TableComponent extends Component {

  state = { showTestingToolTip: false };

  componentDidMount() {
    this.setDefaultQuery(this.props.path, this.props.store.pagination);
  }

  /**
   * New request on url query change
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location &&
        !isEmpty(nextProps.location.query)) {
      this.getList(this.props, {...nextProps.location.query, ...nextProps.query});
    }
  }

  /**
   * @param pathname  : {string} - current url
   * @param pagination: {{ per_page: string, page: string }}
   */
  setDefaultQuery = (pathname, pagination) => {
    const currentQuery = this.props.location.query;
    const currentPath = this.props.location.pathname;
    const query = isEmpty(currentQuery) ? DEFAULT_QUERY : currentQuery;

    browserHistory.push({
      pathname: currentPath,
      query
    });
  };

  /**
   * @param reqType
   * @param domen: {string}     - custom api to microservice
   * @param path: {string}      - variable with location for curent page
   * @param url: {string}      - variable with location for curent page
   * @param _query: {object}  - count of items per pa
   */
  getList = ({ reqType, domen, path, url }, _query) => {
    switch (reqType) {
      case 'POST':
        getListByPost(domen, path, _query, url);
        break;

      default:
        const {per_page, current_page, sortedBy, orderBy, search} = _query;
        const query = {
          sortedBy,
          orderBy,
          per_page,
          page: +current_page + 1 // TODO: need to talk we back end developers to change count start point from 0
        };
        const newQuery = search ? {...query, search} : query;
        getMatrixInfo(domen, path, newQuery, path, url)
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
  handleRequestSort = (event, property) => {
    const currentPath = PAGE[this.props.path];
    const { sortedBy, orderBy } = this.props.location.query;
    const  _sortedBy = property === orderBy ?
      sortedBy === 'asc' ? 'desc' : 'asc'
      : sortedBy;


    const query = Object.assign({}, this.props.location.query, { orderBy : property, sortedBy: _sortedBy });
    browserHistory.push({
      pathname: currentPath,
      query   : { ...query }
    });

  };

   /**
    * @param value: string
    * @param row: {Object}
    * @param selected
   */
  onRowSelection = (value, row, selected) =>
    this.props.onEdit && this.props.onEdit(row.id);


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
      return item && (item.id || item.user_id || item.customer_id) === id ? index : result;
    }, -1)
  };


  /**
   * @param event
   * @param checked
   * @param selected
   */
  handleClick = (event, checked, selected) => {
    let { id, deActive, user_id, customer_id } = checked;
    id = id || user_id || customer_id;
    event && event.preventDefault();
    event && event.stopPropagation();

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
        result = selected.filter(item => item && (item.id || item.user_id || item.customer_id) !== id );
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
    const { sortedBy, orderBy, search }  = this.props.store.sortOptional;

    browserHistory.push({
      pathname: currentPath,
      query: {
        per_page     : event.target.value,
        current_page : 0,
        sortedBy,
        orderBy
      }
    });
  };

  /**
   * Formatting of values
   * @param row
   * @param key
   * @param type
   * @param format
   * @return {*}
   */
  formatCellValue = (row, { key, type, format }) => {
    const value =  get(row, key, '-') || '-';
    switch (type) {
      case 'time':
       return moment.unix(value).format(format);

      case 'length':
        return value ? value.length : 0;

      case 'areas':
        if (value.length) {
          const list = value.map(({title}) => title).join(', ');
          const [ first ] = value;
          return (
            <Tooltip id="tooltip-top-start" title={<b>{list}</b>} label="_" placement="bottom-start">
              <span>{ value.length > 1 ? `${first.title}...` : first.title }</span>
            </Tooltip>
          );
        }
        return '-';

      case 'in_testing':
        return  value===true ? 'No':'Yes';

      case 'user_status':
        if (get(row, 'deleted_at', '-')) {
          return 'deleted'
        }
        if (get(row, 'confirmed_at', '-') && get(row, 'activated_at', '-') && get(row, 'deactivated_at', '-')) {
          return 'deactivated'
        }
        if (get(row, 'confirmed_at', '-') && get(row, 'activated_at', '-')) {
          return 'active'
        }
        if (get(row, 'confirmed_at', '-')) {
          return 'not activated'
        }
        return 'not confirmed';
      default:
        return value;
    }
  };

  render() {
    const {
      tableHeader,
      selected,
      tableCellPropsFunc,
      onSelectAllClick,
      CellContent,
      rowsPerPageOptions,
      showTestingMarker,
      titleTestingMarker,
      keyTestingMarker,
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
          showTestingMarker={showTestingMarker}
        />

        <TableBody>
          {
            data.map(row => {
              const id         = row.id || row.user_id || row.customer_id;
              const isSelected = this.matchItems(selected, id) !== -1; // !row.deActive &&
              let isEnabled;

              switch (true) {
                case row.hasOwnProperty('enabled'):
                  isEnabled  = row.enabled ? 'active' : 'de-active';
                  break;
                case row.hasOwnProperty('activated_at'):
                  isEnabled  = row.activated_at && !row.deactivated_at ? 'active' : 'de-active';
                  break;
                case row.hasOwnProperty('customer_active'):
                  isEnabled  = row.customer_active ? 'active' : 'de-active';
                  break;
                case row.hasOwnProperty('active'):
                  isEnabled  = row.active ? 'active' : 'de-active';
                  break;
                default:
                  isEnabled  = 'active';
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
                  onClick={(event) => this.onRowSelection(event, row, selected)}
                >
                  <TableCell padding="checkbox"
                             className="td-checkbox">

                      <div className={`in-testing-wrap ${ row[keyTestingMarker] && 'in-testing' }`}>

                        {showTestingMarker &&
                          <Tooltip title={titleTestingMarker}
                                   label="_"
                                   className={`in-testing-tooltip ${ row[keyTestingMarker] ? 'active' : '' } `}
                                   placement="bottom-start">
                              <div className={`in-testing ${ row[keyTestingMarker] && 'active'}`} />
                          </Tooltip>}

                        <Checkbox checked={isSelected}
                                  onClick={event => this.handleClick(event, row, selected)}/>
                      </div>
                  </TableCell>
                  {
                    tableHeader.map((col, i) => (
                      <TableCell
                        key={i}
                        className={col.className}
                        padding="dense"
                        {...tableCellPropsFunc(row, col)}
                      >
                        <div className="cell-wrapper">
                          { this.formatCellValue(row, col) } <CellContent />
                        </div>
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
              rowsPerPageOptions={rowsPerPageOptions}
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
  tableHeader       : [],
  selected          : [],
  data              : [],
  tableCellPropsFunc: () => ({}),
  CellContent       : () => null,
  rowsPerPageOptions: [ 50, 100, 200 ], // The per page may not be greater than 50.
  url: '',
  showTestingMarker : false,
  titleTestingMarker: 'On testing',
  keyTestingMarker  : 'testing'
};

TableComponent.propTypes = {
  data              : PropTypes.arrayOf( PropTypes.object ).isRequired,
  path              : PropTypes.string.isRequired,
  domen             : PropTypes.string.isRequired,
  reqType           : PropTypes.string,
  tableHeader       : PropTypes.arrayOf(
                        PropTypes.shape({
                          title   : PropTypes.string.isRequired,
                          key     : PropTypes.string.isRequired,
                          tooltip : PropTypes.string
                        }).isRequired
                      ),
  selected          : PropTypes.arrayOf( PropTypes.object ).isRequired,
  onRowClick        : PropTypes.func.isRequired,
  onSelectAllClick  : PropTypes.func.isRequired,
  onEdit            : PropTypes.func,
  tableCellPropsFunc: PropTypes.func,
  CellContent       : PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf( PropTypes.number ),
  url               : PropTypes.string,
  showTestingMarker : PropTypes.bool,
  titleTestingMarker: PropTypes.string,
  keyTestingMarker  : PropTypes.string,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableComponent));