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
import { getMmatrixInfo }     from '../../../actions';
import get                    from 'lodash/get';
import isEmpty                from 'lodash/isEmpty'
import moment                 from 'moment';
import { browserHistory }     from 'react-router'
import { PAGE }               from '../../../config'
import { withRouter }         from 'react-router'


class TableComponent extends Component {

  componentDidMount() {
    this.setDefaultQuery(this.props.path, this.props.store.pagination);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location !== nextProps.location &&
        nextProps.location.query) {
      this.getInfo(this.props, nextProps.location.query);
    }
  }

  /**
   * @param pathname  : {string} - current url
   * @param pagination: {{ per_page: string, page: string }}
   */
  setDefaultQuery = (pathname, pagination) => {
    console.log('browserHistory', this.props.location.query);
    const currentQuery = this.props.location.query;
    const currentPath = PAGE[this.props.path];

    const { per_page, current_page } = isEmpty(currentQuery) ? pagination : currentQuery;


    browserHistory.push({
      pathname: currentPath,
      query: {
        current_page,
        per_page
      }
    });
  };

  /**
   * @param domen: {string}     - custom api to microservice
   * @param path: {string}      - variable with location for curent page
   * @param per_page: {string}  - count of items per page
   * @param current_page: {string}      - current page
   */
  getInfo = ({domen, path}, {per_page, current_page}) => {
    const query = {
      per_page: per_page,
      page: +current_page + 1 // TODO: need to talk we back end developers to change count start point from 0
    };
    getMmatrixInfo(domen, path, query)
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

  handleRequestSort = (event, property) => {};

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

  /**
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

  getInfoByKey = (row, key, type, format) => {
    const value =  get(row, key);
    switch (type) {
      case 'time':
       return moment.unix(value).format('hh:mm DD.MM.YYYY');
      case 'number':
        return value;
      default:
        return value ? value : '-';
    }
  };

  render() {
    const { tableHeader, selected, onSelectAllClick} = this.props;
    const { data, pagination: {  per_page, current_page, total } } = this.props.store;

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
                      className={row.enabled ? 'active' : 'de-active'}
                      aria-checked={isSelected}
                      onClick={event => this.handleClick(event, row, selected)}>

                      <TableCell padding="checkbox">
                        <Checkbox checked={isSelected}/>
                      </TableCell>

                    {tableHeader.map( (col, index) =>
                      <TableCell key={index}
                                 className={col.className}
                                 padding="dense">
                        { this.getInfoByKey(row, col.key, col.type, col.format) }
                      </TableCell>)}
            </TableRow>
          })}
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
    store    : state[ownProps.path]
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

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(TableComponent));
