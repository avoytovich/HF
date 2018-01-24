import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { UserListComponent }    from './UserList';
import UserListControls         from './UserList/UserListControls';
import MessengerHeader          from './Messenger/MessengerHeader';
import MessageListComponent     from './Messenger/MessageListComponent';
import TypeMessageComponent     from './Messenger/TypeMessageComponent';

class Chat extends Component {
  state = {
    selected: [],
    showActivateModal:false,
    showDeactivateModal:false,
  };

  _onUserClick = (selected = []) => this.setState({selected});

  render() {
    const { selected } = this.state;
    return (
      <div id="chat-component">

        <div className="user-list-container">
          <UserListControls
            path="chat"
            domen="users"
            selected={selected}
            createItem={this.create}
            createButtonText="Add"
          />

          <UserListComponent
            location={this.props.location}
            path="chat"
            domen="users"
            reqType="POST"
            selected={selected}
            onRowClick={this._onUserClick}
            query= {this.props.location.query}
          />
        </div>
        <div className="message-list-container">
          <MessengerHeader
            path="chat"
            selected={selected}
            />
          <MessageListComponent selected={selected}/>
          <TypeMessageComponent
            path="chat"
            selected={selected}
            />
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(Chat);
