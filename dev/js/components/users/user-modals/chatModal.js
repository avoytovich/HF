import React, { Component }   from 'react';
import Dialog, {
       DialogActions,
       DialogContent,
       DialogTitle }          from 'material-ui/Dialog';
import Slide                  from 'material-ui/transitions/Slide';
import Button                 from 'material-ui/Button';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  dispatchCreateMessagePayloadWired,
  createGroupMessage }        from '../../../actions';
import { Input }              from '../../common';


class ChatModal extends Component {

  _sendMessage = ({list }) => {
    const message = this.props.chatReducer.message;
    const users = list.map(el=>el.user_id);
    createGroupMessage(users, message).then(() => {
      this.props.open(this.props.typeKey, false);
      dispatchCreateMessagePayloadWired ({actionType: "CHAT", errors: {}, message: ""});
    })
  };

  transition = (props) => <Slide direction="up" {...props} />;

  render() {
    const { deactivateOpen,
      open,
      typeKey,
      chatReducer,
      chatReducer: {
        message
      }
    } = this.props;
    return  <Dialog
      open={deactivateOpen}
      transition={this.transition}
      keepMounted
      onRequestClose={() => open(typeKey, false)}
    >
      <DialogTitle> Send message to selected users? </DialogTitle>

      <DialogContent>
        <Input
          id='message'
          value={message}
          reducer={chatReducer}
          label={ 'Type message' }
          placeholder={ 'Type message'}
          multiline={true}
          className="MUIControl"
          rows="5"
          cols="60"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={() => open(typeKey, false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => this._sendMessage(this.props)} color="primary">
          Send
        </Button>
      </DialogActions>

    </Dialog>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  chatReducer: state.chatReducer,
  messageListReducer: state.messageListReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect( mapStateToProps, mapDispatchToProps )(ChatModal)