import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { CHAT_USERS_TAB }       from '../../utils/constants/pageContent';
import { TableComponent }       from './UserList';
import { browserHistory }       from 'react-router'
import TableControls            from './UserList/TableControls';
import MessengerHeader          from './Messenger/MessengerHeader';
import  { get }                 from 'lodash';

class Chat extends Component {
  state = {
    selected: [],
    showActivateModal:false,
    showDeactivateModal:false,
  };

  onRowClick = (selected = []) => this.setState({selected});

  onSelectAllClick = (selected) => this.setState({selected});

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = CHAT_USERS_TAB;
    const { selected } = this.state;
    return (
      <div id="chat-component">

        <div className="user-list-container">
          <TableControls
            path="chat"
            selected={selected}
            createItem={this.create}
            createButtonText="Add"
          />

          <TableComponent
            location={this.props.location}
            path="chat"
            domen="users"
            reqType="POST"
            tableHeader={ tableHeader }
            selected={selected}
            onRowClick={this.onRowClick}
            onSelectAllClick={this.onSelectAllClick}
            query= {this.props.location.query}
          />
        </div>
        <div className="message-list-container">
          <MessengerHeader
            path="chat"
            selected={selected}
            createItem={this.create}
            createButtonText="Add"/>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(Chat);
