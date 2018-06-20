import React, {Component} from 'react';
import {DELETED_USERS_TAB} from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import {domen, api}             from '../../../config';
import TableControls            from '../../common/TypicalListPage/TableControls';


class DeletedUsers extends Component{
  state = {
    selected: []
  };

  onRowClick = (selected= []) => this.setState({ selected });

  onSelectAllClick = (selected) => this.setState({selected});

  render(){
    const { tableHeader } = DELETED_USERS_TAB;
    const querySelector = {...this.props.location.query, ...{also_deleted: true}, ...{per_page: 50}};
    const url = `${domen['users']}${api['deletedUsers']}`;
    const { selected } = this.state;
    return (
      <div id="diagnosis-component">
        <TableControls
          locationUrl={this.props.location.pathname}
          path="deletedUsers"
          selected={selected}
        />

        <TableComponent
          location={this.props.location}
          path="deletedUsers"
          domen="users"
          reqType="POST"
          tableHeader={ tableHeader }
          selected={ selected }
          onRowClick={this.onRowClick}
          onSelectAllClick={this.onSelectAllClick}
          query= {querySelector}
          // tableCellPropsFunc={this._tableCellPropsFunc}
        />
      </div>
    )
  }
};


export default DeletedUsers;
