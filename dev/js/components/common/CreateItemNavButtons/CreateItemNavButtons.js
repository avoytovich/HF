import React, { Component } from 'react';
import { Switch }           from '../index';
import PropTypes            from 'prop-types';
import Button               from 'material-ui/Button';
import { connect }               from 'react-redux';
import Tabs, { Tab }        from 'material-ui/Tabs';

import { dispatchMatrixPayloadWired } from '../../../actions';

class CreateItemNavButtons extends Component {
  componentWillMount() {
    dispatchMatrixPayloadWired({ questionAnswerLang: 'en' })
  }

  render() {
    const {
      title,
      showSwitch,
      showLangSwitcher,
      switchChecked,
      switchLabel,
      onSwitchChange,
      onCancelClick,
      cancelLabel,
      onSaveClick,
      saveLabel,
      customNavigation,
      langValue,
      createDiagnosisQuestion: {
        questionAnswerLang,
      },
    } = this.props;

    const _langValue = langValue || questionAnswerLang;

    return <div className="page-sub-header">

      <div className="title">{ title }</div>

      <div className="navigation-zone">
        {
          showLangSwitcher &&
            <Tabs
              value={_langValue}
              indicatorColor="primary"
              className="tab-lang answer"
              textColor="primary"
            >
              <Tab
                onClick={() => dispatchMatrixPayloadWired({ questionAnswerLang: 'en' })}
                label="English"
                value="en"
                className="MUITab"
              />
              <Tab
                onClick={() => dispatchMatrixPayloadWired({ questionAnswerLang: 'swe' })}
                label="Swedish"
                value="swe"
                className="MUITab"
              />
            </Tabs>
        }
        { !customNavigation ?
          <div className="navigation-zone-default">
            {
              showSwitch &&
                <div>
                  <Switch
                    label={switchLabel}
                    checked={!switchChecked}
                    labelClassName={'switch-label'}
                    onChange={onSwitchChange}
                  />
                </div>
            }

            <div className="nav-buttons">
              <Button onClick={onCancelClick}>
                { cancelLabel }
              </Button>

              <Button
                raised
                dense
                onClick={onSaveClick}
                color="primary"
              >
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
  title: 'Create',
  showSwitch: false,
  switchChecked: false,
  switchLabel: 'Checked',
  onSwitchChange: (e, checked) => console.log(e, checked),
  onCancelClick: (e, checked) => console.log(e, checked),
  cancelLabel: 'Cancel',
  onSaveClick: (e, checked) => console.log(e, checked),
  saveLabel: 'Save',
  showLangSwitcher: true,
};

CreateItemNavButtons.propTypes = {
  title: PropTypes.string,
  showSwitch: PropTypes.bool,
  switchChecked: PropTypes.bool,
  switchLabel: PropTypes.string,
  onSwitchChange: PropTypes.func,
  onCancelClick: PropTypes.func,
  cancelLabel: PropTypes.string,
  onSaveClick: PropTypes.func,
  saveLabel: PropTypes.string,
  customNavigation: PropTypes.element,
  showLangSwitcher: PropTypes.bool,
  langValue:PropTypes.string
};

const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
});

export default connect(mapStateToProps)(CreateItemNavButtons);
