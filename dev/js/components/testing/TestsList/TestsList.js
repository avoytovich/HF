import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import { TEST_TAB }              from '../../../utils/constants/pageContent';
import { TableComponent }       from '../../../components/common/TypicalListPage';
import { browserHistory }       from 'react-router'
import TableControls            from '../../common/TypicalListPage/TableControls';
import Button                   from 'material-ui/Button';
import Delete                   from 'material-ui-icons/Delete';
import qs             from 'query-string';

import {
  PAGE,
  domen,
  api
} from '../../../config';
import { C } from '../../index'
import {
  deleteTestWired,
  getListByPost,
} from '../../../actions';

class TestsList extends Component {
  state = {
    selected: [],
    showDeleteModal: false,
  };

  _deleteItems = (items = []) => {
    const {
      current_page,
      per_page
    } = this.props.location.query;
    const promises = items.map(item => deleteTestWired(item.id));
    const query = { per_page, page: current_page};
    return Promise.all(promises)
      .then(res => getListByPost('diagnostics', 'diagnostics', query))
      .then(res => this.setState({ selected: [] }))
      .then(res => this._toggleDeleteModal())
      .catch(err => {
        this.setState({ selected: [] });
        this._toggleDeleteModal();
        console.log(err);
      })
  };

  _toggleDeleteModal = () => this.setState({ showDeleteModal: !this.state.showDeleteModal });

  _onRowClick = (selected = []) => this.setState({ selected });

  _onSelectAllClick = (selected) => this.setState({ selected });

  render() {
    const { tableHeader } = TEST_TAB;
    const {
      showDeleteModal,
      deleteOpen,
      selected,
    } = this.state;
    const {
      userReducer: {
        user_id,
      },
      location: {
        query,
      },
    } = this.props;
    const url = `${domen['diagnostics']}${api['test']}/${user_id}?${qs.stringify(query)}`;
    return (
      <div id="diagnosis-component">

        <TableControls
          path="test"
          selected={selected}
          createItem={() => browserHistory.push(PAGE.testNew)}
          createButtonText='New'
          CreateButtonIcon={() => <div/>}
        >

          <Button
            raised
            dense
            onClick={() => this._toggleDeleteModal()}
          >
            <Delete />
            Delete
          </Button>

        </TableControls>

        <TableComponent
          location={this.props.location}
          path="test"
          reqType="POST"
          url={url}
          domen="diagnostics"
          tableHeader={ tableHeader }
          selected={selected}
          onRowClick={this._onRowClick}
          onSelectAllClick={this._onSelectAllClick}
        />

        <C.Modal
          itemName="title"
          open={showDeleteModal}
          title='Delete Packages'
          toggleModal={this._toggleDeleteModal}
          items={selected}
          onConfirmClick={() => this._deleteItems(selected)}
        />

      </div>
    )
  }
}

const mapStateToProps = state => ({
  store: state.tables.diagnosis,
  userReducer: state.userReducer,
});

export default  connect(mapStateToProps)(TestsList);
