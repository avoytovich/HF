import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import get                  from 'lodash/get';
import values               from 'lodash/values';
import { browserHistory }   from 'react-router';
import { withStyles }       from 'material-ui/styles';
import moment               from 'moment';
import InfiniteScroll       from 'react-infinite-scroller';
import {
  getMessagesWired
}                           from '../../../actions';

class MessageListComponent extends Component {

  _renderMessage=(el)=>{
    return el.user_id === this.props.userReducer.user_id ?
      (<div key={el.id} className='admin-message-container'>
        <div className='admin-message'>{el.message}</div>
        <div className="message-time">{moment.unix(el.created_at).format('HH:mm')}</div>
      </div>):
      (<div key={el.id} className='user-message-container'>
        <div className="message-time">{moment.unix(el.created_at).format('HH:mm')}</div>
        <div className='user-message'>{el.message}</div>
      </div>)
  };
  // loadMoreFunction = () => {
  //   console.log(this.props);
  //   if(this.props.messageListReducer.data && this.props.messageListReducer.data.length>0){
  //     console.log('loadMoreFunction', get(this.props.messageListReducer.data, '[0].id'));
  //     let from = this.props.messageListReducer.data[this.props.messageListReducer.data.length-1].id;
  //     console.log('from',from)
  //     const data = {from,
  //       limit: 10,
  //       "also_deleted": false}
  //     console.log(data);
  //     getMessagesWired(1, data)
  //   }
  //
  // };

  render() {
    const {
      messageListReducer
    } = this.props;
    const messageList = values(messageListReducer.data);

    return (
          <div className="message-list">
            {messageList.length > 0 ? messageList.map(el=>this._renderMessage(el)) :
              (<div className="no-message-container">You haven’t got any messages with this user</div>)}
          </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: get(state, `tables.${ownProps.path}`),
  userReducer: state.userReducer,
  messageListReducer: state.messageListReducer,
});

export default connect(mapStateToProps)(MessageListComponent);