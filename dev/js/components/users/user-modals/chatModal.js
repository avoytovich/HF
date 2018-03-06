import React, { Component }   from 'react';
import Dialog, {
       DialogActions,
       DialogContent,
       DialogTitle }          from 'material-ui/Dialog';
import Slide                  from 'material-ui/transitions/Slide';
import Button                 from 'material-ui/Button';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { createMessage,
  createGroupMessage,
  getMessagesWired,
  dispatchCreateMessagePayloadWired }      from '../../../actions';
import { Input }                from '../../common';


class ChatModal extends Component {

  deactivate = ({list }) => {
    // activateUser(domen, pathReq, list, action)
    //   .then(() =>
    //     getListByPost(domen, path, query, url)
    //       .then(() => this.props.open(this.props.typeKey, false)))
    this._sendMessage(list);
    console.log(' go chat with', list, this.props.chatReducer.message);
  };

  _sendMessage = (list) => {
    const message = this.props.chatReducer.message;
    createGroupMessage(list, message).then(() => {
      console.log('done massages senT');
      this.props.open(this.props.typeKey, false);
      dispatchCreateMessagePayloadWired ({actionType: "CHAT", errors: {}, message: "", dialog_id});
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
        <Button onClick={() => this.deactivate(this.props)} color="primary">
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