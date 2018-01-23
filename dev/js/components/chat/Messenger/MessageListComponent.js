import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import get                  from 'lodash/get';
import values                 from 'lodash/values';
import { browserHistory }   from 'react-router';
import { withStyles }       from 'material-ui/styles';
class MessageListComponent extends Component {

  _renderMessage=(el)=>{
    if(get(this.props,'selected[0].dialog_id') === el.dialog_id){
      let messageContainer;
      el.user_id === this.props.userReducer.user_id ? messageContainer='admin-message':messageContainer='user-message';
      return(<div key={el.id} className={messageContainer}>{el.message}</div>)
    }
  }

  render() {
    const {
      messageListReducer
    } = this.props;
    const messageList = values(messageListReducer);
    return (
      <div className="message-list">
        { get(messageListReducer,'[0].id')? messageList.map(el=>this._renderMessage(el)):''}
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