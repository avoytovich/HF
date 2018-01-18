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

class MessengerHeader extends Component {
  render() {
    return (
      <div className="message-header">
        <div className="message-header-user-id">
         User #{get(this.props, 'selected[0].user_id')}
        </div>
        <div className="message-header-user-info">
         <LockIcon className="lock-icon"/> User Information is hidden
        </div>
        <div className="message-header-request">
          REQUEST INFORMATION
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