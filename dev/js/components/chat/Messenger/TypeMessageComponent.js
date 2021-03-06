import React, { Component } from 'react';
import { connect }          from 'react-redux';
import  get                  from 'lodash/get';
import Input                from '../../common/Input/Input';
import SendIcon             from 'material-ui-icons/Send';
import {
  createMessage,
  getMessagesWired,
  dispatchCreateMessagePayloadWired
}                             from '../../../actions';

class TypeMessageComponent extends Component {

  _sendMessage = () => {
    const dialog_id = this.props.chatReducer.dialog_id;
    const message = this.props.chatReducer.message;
    let data = {dialog_id, message};
    createMessage(data).then(() => {
      dispatchCreateMessagePayloadWired ({actionType: "CHAT", errors: {}, message: "", dialog_id});
      getMessagesWired(dialog_id);
    })
  };

  _handleKeyPress =(e) =>{
   if (e.key === 'Enter') {
     this._sendMessage()
   }
  }

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
          onKeyPress={this._handleKeyPress}
        />
        <SendIcon className="send-icon"  onClick={this._sendMessage} />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  chatReducer: state.chatReducer,
  messageListReducer: state.messageListReducer,
});

TypeMessageComponent.defaultProps = {
  selected    : [],
};

export default connect(mapStateToProps)( TypeMessageComponent);