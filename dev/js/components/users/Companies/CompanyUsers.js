import React, { Component } from "react";
import { connect } from "react-redux";
import { browserHistory } from "react-router";
import get from "lodash/get";

import { PAGE, domen, api } from "../../../config";
import { USERS_TAB } from "../../../utils/constants/pageContent";
import { TableComponent } from "../../../components/common/TypicalListPage";
import TableControls from "../../common/TypicalListPage/TableControls";
import Modal from "../../common/Modal/Modal";
import CSVUploadModal from "../../common/Modal/CSVUploadModal";
import CreateSimpleUser from "../CreateUser/CreateSimpleUser";
import DeactivateComponent from "../user-modals/deactivateModal";
import DeleteComponent from "../user-modals/deleteModal";
import {
  dispatchCreateSimpleUserPayloadWired,
  toggleCSVModal,
  userCreate
} from "../../../actions";

//UI
import Button from "material-ui/Button";
import ArrowRight from "material-ui-icons/KeyboardArrowRight";
import ActivateIcon from "material-ui-icons/Check";
import DeactivateIcon from "material-ui-icons/NotInterested";
import DeleteIcon from "material-ui-icons/Delete";
import { Api } from "../../../utils";

class CompanyOwnUsers extends Component {
  state = {
    selected: [],
    showCreateUserModal: false,
    showActivateModal: false,
    showDeactivateModal: false,
    showCSVUploadModal: false,
    showDeleteModal: false
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.showCreateUserModal && nextState.showCreateUserModal) {
      return false;
    }
    return true;
  }

  _tableCellPropsFunc = (row, col) => {
    if (col.key === "user_id") {
      return {
        onClick: e => {
          e.stopPropagation();
          browserHistory.push(
            `${this.props.location.pathname}/${row.user_id}/profile`
          );
        }
      };
    }
    return {};
  };

  onRowClick = (selected = []) => this.setState({ selected });

  onSelectAllClick = selected => this.setState({ selected });

  updateModal = (key, value) => {
    this.setState({ [key]: value });

    if (!value) this.setState({ selected: [] });
  };

  createEntity = () => {
    this.setState({ showCreateUserModal: !this.state.showCreateUserModal });
  };

  _toggleDeleteModal = () =>
    this.setState({ showCreateUserModal: !this.state.showCreateUserModal });

  _returnFunc = param => {
    if (param === "companies") {
      browserHistory.push("/companies");
    } else {
      browserHistory.push(`/company/${this.props.params.id}/profile`);
    }
  };

  _createSimpleUser = () => {
    let location = get(this.props, "location.search");
    const result = {
      customer_id: this.props.params.id,
      email: this.props.createSimpleUsersReducers.email
    };
    userCreate("users", "createSimpleUser", result).then(() => {
      browserHistory.push(`/company/${this.props.params.id}/users${location}`);
      dispatchCreateSimpleUserPayloadWired({ email: "" });
      this.setState({ showCreateUserModal: false });
    });
  };

  _toggleCSVModal = data => {
    const browserUrl =
      get(this.props, "location.pathname") + get(this.props, "location.search");
    toggleCSVModal(data, this, browserUrl, this.props.params.id);
  };

  render() {
    const { tableHeader } = USERS_TAB;
    const {
      selected,
      showActivateModal,
      showCreateUserModal,
      showDeactivateModal,
      showCSVUploadModal,
      showDeleteModal
    } = this.state;
    const { profileReducer } = this.props;
    const querySelector = {
      ...this.props.location.query,
      ...{ type: "organization", orderBy: "first_name" }
    };
    const url = `${domen["users"]}${api["clinicsOwnUsers"]}/${
      this.props.params.id
    }`;
    const path = `/company/${this.props.params.id}/users`;
    return (
      <div id="diagnosis-component">
        <div className="company-sub-header">
          <span onClick={() => this._returnFunc("companies")}> Companies </span>
          <ArrowRight className="arrow-right-icon" />
          <span onClick={() => this._returnFunc("profile")}>
            {" "}
            {get(profileReducer, "name")}
          </span>
        </div>

        <TableControls
          locationUrl={this.props.location.pathname}
          path="companyOwnUsers"
          currentPath={path}
          selected={selected}
          createItem={this.createEntity}
          createButtonText="Add"
          toggleCSVModal={this._toggleCSVModal}
          uploadCSV={true}
        >
          <Button
            raised
            dense
            onClick={() => {
              selected.map((select, id) => {
                Api.post(`${domen.users}/consultant/info/provide`, {
                  user_id: selected[id].user_id
                });
              });
            }}
            className="identity"
          >
            <ActivateIcon />Indentity
          </Button>

          <Button
            raised
            dense
            onClick={() => {
              selected.map((select, id) => {
                Api.post(`${domen.users}/consultant/info/hide`, {
                  user_id: selected[id].user_id
                });
              });
            }}
            className="anonymize"
          >
            <DeactivateIcon /> Anonymize
          </Button>
          <Button
            raised
            dense
            onClick={() => this.updateModal("showActivateModal", true)}
          >
            <ActivateIcon /> Activate
          </Button>

          <Button
            raised
            dense
            onClick={() => this.updateModal("showDeactivateModal", true)}
          >
            <DeactivateIcon /> Deactivate
          </Button>

          <Button
            raised
            dense
            onClick={() => this.updateModal("showDeleteModal", true)}
          >
            <DeleteIcon /> Delete
          </Button>
        </TableControls>

        <TableComponent
          url={url}
          location={this.props.location}
          path="companyOwnUsers"
          currentPath={path}
          domen="users"
          reqType="POST"
          tableHeader={tableHeader}
          selected={selected}
          onRowClick={this.onRowClick}
          onSelectAllClick={this.onSelectAllClick}
          query={querySelector}
          tableCellPropsFunc={this._tableCellPropsFunc}
        />

        <DeactivateComponent
          pathReq="userProfile"
          path="companyOwnUsers"
          domen="users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Activate this Users"
          deactivateOpen={showActivateModal}
          open={() => this.updateModal("showActivateModal", false)}
          itemKey="user_id"
          query={this.props.location.query}
          action="activate"
          onSubmitTitle="Activate"
        />

        <DeactivateComponent
          pathReq="userProfile"
          path="companyOwnUsers"
          domen="users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Deactivate this Users"
          deactivateOpen={showDeactivateModal}
          open={() => this.updateModal("showDeactivateModal", false)}
          itemKey="user_id"
          query={this.props.location.query}
          action="deactivate"
          onSubmitTitle="Deactivate"
        />

        <DeleteComponent
          pathReq="userProfile"
          path="companyOwnUsers"
          domen="users"
          url={url}
          typeKey="deactivateOpen"
          list={selected}
          title="Delete this Users?"
          deactivateOpen={showDeleteModal}
          open={() => this.updateModal("showDeleteModal", false)}
          itemKey="user_id"
          query={this.props.location.query}
        />

        <Modal
          itemName="name_real"
          open={showCreateUserModal}
          title="Add user"
          toggleModal={this._toggleDeleteModal}
          onConfirmClick={() => this._createSimpleUser()}
          CustomContent={() => <CreateSimpleUser />}
        />

        <Modal
          itemName="name_real"
          open={showCSVUploadModal}
          title={this.state.CSVUploadModalTitle}
          toggleModal={this._toggleCSVModal}
          onConfirmClick={() => this.state.CSVUploadModalConfirm()}
          CustomContent={() => <CSVUploadModal />}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  store: state.tables.companyOwnUsers,
  profileReducer: state.profileReducer,
  createSimpleUsersReducers: state.createSimpleUsersReducers,
  CSVFileReducer: state.CSVFileReducer,
  userReducer: state.userReducer
});

export default connect(mapStateToProps)(CompanyOwnUsers);
