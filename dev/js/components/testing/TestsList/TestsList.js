import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { SEL_TAB }              from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';

import { PAGE } from '../../../config';

class TestsList extends Component {
  state = {
    selected: [],
  };

  onRowClick = (selected = []) => this.setState({ selected });

  onSelectAllClick = (selected) => this.setState({ selected });

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  render() {
    const { tableHeader } = SEL_TAB;
    const { selected, deactivateOpen, deleteOpen } = this.state;
    const {
      userReducer: {
        user_id,
      },
    } = this.props;
    return (
      <div id="diagnosis-component">

        <TableControls
          path="test"
          selected={selected}
          createItem={this.create}>

          <Button
            raised
            dense
            onClick={() => this.updateModal('deleteOpen', true)}
          >
            <Delete />
            Delete
          </Button>

        </TableControls>

        <TableComponent
          location={this.props.location}
          path="test"
          queryParams={{ userId: user_id }}
          domen="diagnostics"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this.onRowClick}
          onSelectAllClick={this.onSelectAllClick}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis
});

export default  connect(mapStateToProps)(TestsList);
