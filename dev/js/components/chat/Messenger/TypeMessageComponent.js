import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { debounce, get }    from 'lodash';
import { browserHistory }   from 'react-router';
import { withStyles }       from 'material-ui/styles';
import Input                from '../../common/Input/Input';
import SendIcon             from 'material-ui-icons/Send';
import {
  createMessage,
  getMessagesWired,
  dispatchCreateMessagePayloadWired
}                             from '../../../actions';
class TypeMessageComponent extends Component {

  _sendMessage=()=>{
    console.log('send Message',this.props.chatReducer)
    const dialog_id = get(this.props,'selected[0].dialog_id');
    let data = {
      dialog_id,
      message: this.props.chatReducer.message
    };
    createMessage(data).then((res) => getMessagesWired(dialog_id)).then((res)=>
      dispatchCreateMessagePayloadWired ({actionType: "CHAT", errors: {}, message: ""}))
  }

  // actionType(pin): "CHAT"
  // errors(pin): { }
  // message(pin): ""

  render() {
    let {
      chatReducer,
      chatReducer: {
        message
      }
    } = this.props;
    return (
      <div className="message-header">
        <Input
          className="type-message-input"
          id='message'
          value={message}
          reducer={chatReducer}
          label={ 'Type message' }
          placeholder={ 'Type message'}
        />
        <SendIcon className="send-icon"  onClick={this._sendMessage}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: get(state, `tables.${ownProps.path}`),
  chatReducer: state.chatReducer,
  messageListReducer: state.messageListReducer,
});

TypeMessageComponent.defaultProps = {
  selected    : [],
};

export default connect(mapStateToProps)( TypeMessageComponent);