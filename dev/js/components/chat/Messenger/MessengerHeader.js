import React, { Component } from 'react';
import PropTypes            from 'prop-types';
import { connect }          from 'react-redux';
import { debounce, get }    from 'lodash';
import { browserHistory }   from 'react-router';
import LockIcon             from 'material-ui-icons/Lock';
//UI
import Grid                      from 'material-ui/Grid';
import { withStyles }            from 'material-ui/styles';
import { FormControl }           from 'material-ui/Form';
import Input, { InputAdornment } from 'material-ui/Input';
import Button                    from 'material-ui/Button';
import Add                       from 'material-ui-icons/Add';
import Typography                from 'material-ui/Typography';
import SearchIcon                from 'material-ui-icons/Search';

import {
  createMessage,
  getMessagesWired
}                             from '../../../actions';

class MessengerHeader extends Component {

  _requestInformation=()=>{
    const dialog_id = get(this.props, 'selected[0].dialog_id');
    const data={
      dialog_id,
      message: "Please, let administrator view your personal information.",
      info_request: true
    };
    console.log(data);
    createMessage(data).then((res) => getMessagesWired(dialog_id))
  };


  render() {
    return (
      <div className="message-header">
        <div className="message-header-user-id">
         User #{get(this.props, 'selected[0].user_id')}
        </div>
        <div>
          {get(this.props, 'selected[0].email')? get(this.props, 'selected[0].email'):
            (<div className="message-header-user-info"><LockIcon className="lock-icon"/> User Information is hidden</div>)}
        </div>
        <div className="message-header-request" onClick={this._requestInformation}>
          {get(this.props, 'selected[0].email')? '' : 'REQUEST INFORMATION'}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  store: get(state, `tables.${ownProps.path}`)
});

MessengerHeader.defaultProps = {
  selected    : [],
};

export default connect(mapStateToProps)( MessengerHeader);