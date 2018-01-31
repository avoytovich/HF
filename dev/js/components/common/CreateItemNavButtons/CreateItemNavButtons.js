import React, { Component } from 'react';
import { Switch }           from '../index';
import PropTypes            from 'prop-types';
import Button               from 'material-ui/Button';

class CreateItemNavButtons extends Component {
  render() {
 console.log(this.props)
    const {
      title,
      showSwitch,
      switchChecked,
      switchLabel,
      onSwitchChange,
      onCancelClick,
      cancelLabel,
      onSaveClick,
      saveLabel,
      customNavigation
    } = this.props;

    return <div className="page-sub-header">

      <div className="title">{ title }</div>

      <div className="navigation-zone">
        { !customNavigation ?
          <div className="navigation-zone-default">
            {showSwitch && <Switch label={switchLabel}
                                   checked={switchChecked}
                                   labelClassName={'switch-label'}
                                   onChange={onSwitchChange}/>}

            <div className="nav-buttons">
              <Button onClick={onCancelClick}>
                { cancelLabel }
              </Button>

              <Button raised
                      dense
                      onClick={onSaveClick}
                      color="primary">
                { saveLabel }
              </Button>
            </div>
          </div>
        :
          <div className="navigation-zone-custom">
            {customNavigation}
          </div>}
      </div>
    </div>
  }
}

CreateItemNavButtons.defaultProps = {
  title         : 'Create',
  showSwitch    : false,
  switchChecked : false,
  switchLabel   : 'Checked',
  onSwitchChange: (e, checked) => console.log(e, checked),
  onCancelClick : (e, checked) => console.log(e, checked),
  cancelLabel   : 'Cancel',
  onSaveClick   : (e, checked) => console.log(e, checked),
  saveLabel     : 'Save',
};

CreateItemNavButtons.propTypes = {
  title           : PropTypes.string,
  showSwitch      : PropTypes.bool,
  switchChecked   : PropTypes.bool,
  switchLabel     : PropTypes.string,
  onSwitchChange  : PropTypes.func,
  onCancelClick   : PropTypes.func,
  cancelLabel     : PropTypes.string,
  onSaveClick     : PropTypes.func,
  saveLabel       : PropTypes.string,
  customNavigation: PropTypes.element
};

export default CreateItemNavButtons;