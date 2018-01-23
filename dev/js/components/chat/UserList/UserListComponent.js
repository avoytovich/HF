import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes              from 'prop-types';
import {
  getMatrixInfo,
  getListByPost,
  createDialog,
  getMessagesWired
}                             from '../../../actions';
import get                    from 'lodash/get';
import isEmpty                from 'lodash/isEmpty';
import { browserHistory }     from 'react-router';
import { withRouter }         from 'react-router';
import InfiniteScroll         from 'react-infinite-scroller';
import moment                 from 'moment';

const DEFAULT_QUERY = {
  current_page:0,
  page:1,
  per_page:15,
  sortedBy: 'desc',
  limit:15
};

class UserListComponent extends Component {

  componentDidMount() {
    console.log(this.props);
    this.setDefaultQuery(this.props.path, this.props.store.pagination);
    get(this.props,'store.data[0]')?this.handleClick('event', this.props.store.data[0]):'';
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
          page: +current_page + 1
        };
        const newQuery = search ? {...query, search} : query;
        getMatrixInfo(domen, path, newQuery, path, url)
    }
  };

  /***
   * @param value: string
   */
  onCellClick = (value) => console.log('onCellClick', value);

  matchItems(selected, id) {
    return selected.reduce((result, item, index) => {
      return item && (item.id || item.user_id || item.customer_id) === id ? index : result;
    }, -1)
  };

  handleClick = (event, checked, selected) => {
    let result =[checked];
    this.props.onRowClick(result);
    console.log(checked);
    const dialog_id = get(checked, 'dialog_id');
    const data = {"from": 0,
      "limit": 40,
      "also_deleted": true}
    if(dialog_id){
      // get message history
      console.log('get messages');
      getMessagesWired(dialog_id, data)
    }
    else{
      console.log('create dialog')
      // create Dialog(to write first message)
      createDialog({
        "user_id": checked.user_id,
        "consultant_user_id":  1
      }).then((res)=>getMessagesWired(get(res,'data.data.id' , data)));

    }
  };

  loadMoreFunction = () => {
    console.log('loadMoreFunction',this.props.store );
    let per_page  = get(this.props,'store.pagination.per_page')+ 5;
    const total = get(this.props,'store.pagination.total');
    const count = get(this.props,'store.pagination.count');
    const { domen, path } = this.props;
    const newQuery = {
      per_page: per_page,
      current_page: 0,
      limit: per_page,
      page: 1,

    };
    if(total>count){
      getListByPost(domen, path, newQuery );
    }
  };

  _formatTime = (data) => {
    if(data){
      const started = moment.unix(data).format('HH:mm MM/DD/YYYY');
      const finished = moment().format('HH:mm MM/DD/YYYY');
      let minutes = moment(finished).diff(moment(started), 'minutes');
      let days = moment(finished).diff(moment(started), 'days');
      const hours = Math.floor(minutes / 60);
      minutes %= 60;
      if(days>0){
        return moment.unix(data).format('MM/DD/YYYY')
      }
      if (hours > 0) {
        return `${hours}h`;
      }
      return `${minutes}m`;
    }
  };

  render() {
    const {
      selected,
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
          loader={<div className="loader" key={0}/>}
          useWindow={false}
        >
          {data.map((row)=> {
              const id         = row.id || row.user_id || row.customer_id;
              const isSelected = this.matchItems(selected, id) !== -1; // !row.deActive &&
              return (
                <div
                  key={id}
                  className={isSelected ? 'selected-user-data-container user-data-container':'user-data-container'}
                        onClick={event => this.handleClick(event, row, selected)}>
                  <div className="user-cell-container">
                    <div className="user-id-container">User #{ get(row, 'user_id', '-') } </div>
                    <div className="message-time-container">{this._formatTime(get(row, 'message_created_at'))}</div>
                  </div>
                  <div className="user-cell-container">
                    <div className="last-message-container">{ get(row, 'message', '-')||'No messages' }</div>
                    {get(row, 'unread_amount')>0? (<div className="unread-message-container">{row.unread_amount}</div>):''}
                  </div>
                </div>)})
          }
        </InfiniteScroll>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
    store    : state.tables[ownProps.path],
    userReducer: state.userReducer
});

UserListComponent.defaultProps = {
  selected          : [],
  data              : [],
  url: ''
};

UserListComponent.propTypes = {
  data             : PropTypes.arrayOf(
                      PropTypes.object
                    ).isRequired,
  path             : PropTypes.string.isRequired,
  domen            : PropTypes.string.isRequired,
  reqType          : PropTypes.string,
  selected         : PropTypes.arrayOf(
                      PropTypes.object
                    ).isRequired,
  onRowClick       : PropTypes.func.isRequired,
  url: PropTypes.string,
};

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserListComponent));
