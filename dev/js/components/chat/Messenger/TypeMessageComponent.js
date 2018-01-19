import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { debounce, get }    from 'lodash';
import { browserHistory }   from 'react-router';
import { withStyles }       from 'material-ui/styles';
import Input                from '../../common/Input/Input';
import SendIcon             from 'material-ui-icons/Send';
import {
  createMessage
}                             from '../../../actions';
class TypeMessageComponent extends Component {

  _sendMessage=()=>{
    console.log('send Message',this.props.chatReducer)
    let data = {
      dialog_id: 1,
      message: this.props.chatReducer.message
    }
    createMessage(data)

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
        />
        <SendIcon className="send-icon"  onClick={this._sendMessage}/>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: get(state, `tables.${ownProps.path}`),
  chatReducer: state.chatReducer,
});

TypeMessageComponent.defaultProps = {
  selected    : [],
};

export default connect(mapStateToProps)( TypeMessageComponent);