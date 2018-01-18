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
import {
  getMatrixInfo,
  getListByPost,
}                             from '../../../actions';
import get                    from 'lodash/get';
import isEmpty                from 'lodash/isEmpty';
import { browserHistory }     from 'react-router';
import { PAGE }               from '../../../config';
import { withRouter }         from 'react-router';
import InfiniteScroll         from 'react-infinite-scroller';



const DEFAULT_QUERY = {
  per_page    : 20,
  current_page: 0,
  sortedBy    : 'desc',
  orderBy     : 'title',
//  search      :'VAS'
};


/*
 * Important Requirement:
 * 1) Add path props to tableReducer in listOfTables = [ 'diagnosis', 'conditions', * YOUR_ITEM * ],
 * 2) Add url to constant PAGE, key should be the same with 'path' props { [ path ]: '/some-url' };
 */

//Todo: Add validation for manual typed query, finished with sorting and filter and default query params in props

class TableComponent extends Component {

  componentDidMount() {
    console.log(this.props)
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
    console.log(pathname, pagination)
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
    let result =[checked];
    this.props.onRowClick(result);
    console.log(checked);
  };

  loadMoreFunction = () => {
    const currentPath = PAGE[this.props.path];
    const { current_page } = this.props.store.pagination;
    let per_page  = get(this.props,'store.pagination.per_page')+ 10;
    const total = get(this.props,'store.pagination.total');
    const { domen, path } = this.props;
    const newQuery = {
      per_page: per_page,
      current_page: 0,
      limit: per_page,
      page: 1,

    };
    if(total>per_page){
      getListByPost(domen, path, newQuery );
    }
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

      case 'length':
        return value ? value.length : 0;

      default:
        return value;
    }
  };

  render() {
    const {
      tableHeader,
      selected,
      tableCellPropsFunc,
      store: {
        data
      }
    } = this.props;

    return (

      <div className="scroll-container">
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadMoreFunction}
          hasMore={true || false}
          loader={<div className="loader" key={0}>Loading ...</div>}
          useWindow={false}
        >
      <Table className="table-template-users">

        <TableBody>
          {
            data.map(row => {
              const id         = row.id || row.user_id || row.customer_id;
              const isSelected = this.matchItems(selected, id) !== -1; // !row.deActive &&
              return (
                <TableRow
                  hover
                  key={id}
                  tabIndex={-1}
                  role="checkbox"
                  aria-checked={isSelected}
                  onClick={(event) => this.onRowSelection(event, row, selected)}
                  className={isSelected?'selected-user':''}
                >
                  {
                    tableHeader.map((col, i) => (
                      <TableCell
                        key={i}
                        className={col.className}
                        padding="dense"
                        onClick={event => this.handleClick(event, row, selected)}
                        {...tableCellPropsFunc(row, col)}
                      >
                        <div className="user-cell-container">
                          <div className="user-id-container">User #{ this.formatCellValue(row, col) } </div>
                          <div className="message-time-container">time</div>
                        </div>
                        <div className="user-cell-container">
                          <div className="last-message-container">Lorem ipsum dolor sit amet, consectetur adipiscing ?</div>
                          <div className="unread-message-container">1</div>
                        </div>
                      </TableCell>
                    ))
                  }
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
        </InfiniteScroll>
      </div>
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
  rowsPerPageOptions: [ 5, 25, 50, 100 ], // The per page may not be greater than 50.
  url: ''
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
  onEdit           : PropTypes.func,
  tableCellPropsFunc: PropTypes.func,
  CellContent: PropTypes.func,
  rowsPerPageOptions: PropTypes.arrayOf( PropTypes.number ),
  url: PropTypes.string,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TableComponent));
