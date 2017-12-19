import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import isEmpty                  from 'lodash/isEmpty';
import { COMPANIES_TAB }        from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import DeleteComponent          from '../../matrix/Matrix-Setup/matrix-crud/deleteModal';
import ModeEdit                 from 'material-ui-icons/ModeEdit';

import { PAGE } from '../../../config';

class Companies extends Component {
  state = {
    selected: [],
    deactivateOpen: false,
    deleteOpen: false
  };

  _tableCellPropsFunc = (row, col) => {
    if (col.key === 'name') {
      return {
        onClick: (e) => {
          e.stopPropagation();
          browserHistory.push(`/clinic/${row.id}/profile`);
        }
      }
    }
    return {};
  };

  create = (id) => id ?
    browserHistory.push(`/diagnosis-create`) :
    browserHistory.push(`/diagnosis-create/${id}`);

  onRowClick = (selected = []) => this.setState({ selected });

  onSelectAllClick = (selected) => this.setState({ selected });


  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = COMPANIES_TAB;
    const { selected, deactivateOpen, deleteOpen } = this.state;
    const querySelector = {...this.props.location.query,...{type: 'organization'}};
    return (
      <div id="diagnosis-component">

        <TableControls
          path="companies"
          selected={selected}
          createItem={this.create}>

          {/*<Button*/}
          {/*disabled={selected.length > 1}*/}
          {/*onClick={() => this.create(selected[0])}*/}
          {/*raised dense>*/}
          {/*<Edit />*/}
          {/*Edit*/}
          {/*</Button>*/}

          <Button raised dense
                  onClick={() => this.updateModal('deleteOpen', true)}>
            <Delete />
            Delete
          </Button>

        </TableControls>

        <TableComponent
          location={this.props.location}
          path="companies"
          domen="users"
          reqType="POST"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this.onRowClick}
          onSelectAllClick={this.onSelectAllClick}
          query= {querySelector}
          tableCellPropsFunc={this._tableCellPropsFunc}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(Companies);
