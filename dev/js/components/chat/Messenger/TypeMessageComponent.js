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
    const dialog_id = get(this.props,'selected[0].dialog_id');
    let data = {
      dialog_id,
      message: this.props.chatReducer.message
    };
    createMessage(data).then(() => {
      dispatchCreateMessagePayloadWired ({actionType: "CHAT", errors: {}, message: ""});
      getMessagesWired(dialog_id);
    }
      )
  };

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
  chatReducer: state.chatReducer,
  messageListReducer: state.messageListReducer,
});

TypeMessageComponent.defaultProps = {
  selected    : [],
};

export default connect(mapStateToProps)( TypeMessageComponent);