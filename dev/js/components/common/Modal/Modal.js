import React, { Component }   from 'react';
import PropTypes  from 'prop-types';
import isEmpty  from 'lodash/isEmpty';
import
  Dialog,
{
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
}                             from 'material-ui/Dialog';
import Slide                  from 'material-ui/transitions/Slide';
import Button                 from 'material-ui/Button';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

class Modal extends Component {
  _renderItems = (items) => {
    return items.map((item, i) => {
      return (
        <DialogContentText key={i}>
          {i + 1}. { item[this.props.itemName] }
        </DialogContentText>
      )
    });
  };

  render() {
    const {
      title,
      open,
      toggleModal,
      items,
      onConfirmClick,
      cancelButtonText,
      confirmButtonText,
      fullScreen,
      showControls,
      CustomContent,
    } = this.props;
    return  open ?
      <Dialog
        fullScreen={fullScreen}
        transition={(props) => <Slide direction="up" {...props} />}
        open={true}
        onRequestClose={toggleModal}
      >
        { title && <DialogTitle>{ title }</DialogTitle> }

        <DialogContent>

          { !isEmpty(items) && this._renderItems(items) }

          { CustomContent && <CustomContent />}

        </DialogContent>

        { showControls &&
          <DialogActions>
            <Button onClick={() => toggleModal()} color="default">
              {cancelButtonText}
            </Button>
            <Button onClick={() => onConfirmClick()} color="primary">
              {confirmButtonText}
            </Button>
          </DialogActions>
        }

      </Dialog> :
      null;
  }
}

Modal.propTypes = {
  title            : PropTypes.string.isRequired,
  open             : PropTypes.bool.isRequired,
  toggleModal      : PropTypes.func.isRequired,
  items            : PropTypes.array.isRequired,
  onConfirmClick   : PropTypes.func,
  cancelButtonText : PropTypes.string,
  confirmButtonText: PropTypes.string,
  CustomContent    : PropTypes.func,
  itemName         : PropTypes.string,
  fullScreen       : PropTypes.bool,
  showControls     : PropTypes.bool,
};

Modal.defaultProps = {
  title            : 'Title',
  open             : false,
  items            : [],
  cancelButtonText : 'Cancel',
  confirmButtonText: 'Confirm',
  fullScreen       : false,
  showControls     : true,
};

export default Modal;