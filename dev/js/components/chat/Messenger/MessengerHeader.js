import React, { Component } from 'react';
import { connect } from 'react-redux';
import get from 'lodash/get';
import LockIcon from 'material-ui-icons/Lock';
import { browserHistory } from 'react-router';

import { createMessage, getMessagesWired } from '../../../actions';

class MessengerHeader extends Component {
  _requestInformation = () => {
    const dialog_id = get(this.props, 'selected[0].dialog_id');
    const data = {
      dialog_id,
      message: `In order that we can better understand the situation, we will have to review your Activity Journal and a few other relevant informations in our database.

      Healo is a certified medical device and we comply with national and international regulation concerning your data. Therefore we must ask your permission to find you in our database and review your data and profile.
      
      Mind, we are of course still under obligations of confidentiality and will not share your information with anyone outside the professionals in our team that need to review your data to analyse the situation.
      
      Do you allow access to Healos staff and clinical professionals in our medical council to indetify and review your user profile and data?`,
      info_request: true
    };
    createMessage(data).then(res => getMessagesWired(dialog_id));
  };

  _showUserProfile = () => {
    const userId = get(this.props, 'selected[0].user_id');
    if (userId) {
      const customerType = get(this.props, 'selected[0].customer_type');
      switch (customerType) {
      case 'simple':
        browserHistory.push(`users-simple/${userId}/profile`);
        return;
      case 'organization':
        browserHistory.push(`users-clinics/${userId}/profile`);
        return;
      case 'clinic':
        browserHistory.push(`users-clinics/${userId}/profile`);
        return;
      default:
        return;
      }
    }
  };

  render() {
    const userInfo = get(this.props, 'selected[0].email');
    const userId = get(this.props, 'selected[0].user_id');
    return (
      <div className="message-header">
        <div className="message-header-user-id" onClick={this._showUserProfile}>
          User #{userId}
        </div>
        <div>
          {userInfo || (
            <div className="message-header-user-info">
              <LockIcon className="lock-icon" /> User Information is hidden
            </div>
          )}
        </div>
        <div
          className="message-header-request"
          onClick={this._requestInformation}
        >
          {userInfo ? '' : 'REQUEST PRIVATE INFORMATION'}
        </div>
      </div>
    );
  }
}

MessengerHeader.defaultProps = {
  selected: []
};

export default MessengerHeader;
