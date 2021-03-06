import React, { Component } from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Slide from "material-ui/transitions/Slide";
import Button from "material-ui/Button";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deactivateItem, getMatrixInfo, notifier } from "../../../actions";

class DeactivateModal extends Component {
  deactivate = (list, path, pathReq, domen, activate) => {
    deactivateItem(domen, pathReq, list, activate).then(() =>
      getMatrixInfo(domen, path, this.props.query, path).then(() =>
        this.props.open(this.props.typeKey, false)
      )
    );
  };

  //if question have live status, we can not deactivate his
  validStatus = ({ list, path, pathReq, domen, activate }) => {
    list.map(element => {
      //check if open deactivate window and check live status
      if (!activate && !element.testing) {
        notifier({
          title: "Error occured",
          message: "You can not deactivate live question",
          status: "error"
        });
        return;
      }
      this.deactivate(list, path, pathReq, domen, activate);
    });
  };

  transition = props => <Slide direction="up" {...props} />;

  _onClick = () => {
    this.props.onSubmit
      ? this.props.onSubmit(this.props.list)
      : this.validStatus(this.props);
  };

  render() {
    const { list, deactivateOpen, open, typeKey, itemKey } = this.props;
    return (
      <Dialog
        open={deactivateOpen}
        transition={this.transition}
        keepMounted
        onClose={() => open(typeKey, false)}
      >
        <DialogTitle> {this.props.title} </DialogTitle>

        <DialogContent>
          {list.map((item, index) => (
            <DialogContentText key={index}>
              {index + 1}. {item[itemKey]}
            </DialogContentText>
          ))}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => open(typeKey, false)} color="primary">
            Cancel
          </Button>
          <Button onClick={this._onClick} color="primary">
            {this.props.onSubmitTitle}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeactivateModal.defaultProps = {
  title: "Deactivate this question ?",
  onSubmitTitle: "Deactivate"
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      dispatch
    },
    dispatch
  );

export default connect(mapDispatchToProps)(DeactivateModal);
