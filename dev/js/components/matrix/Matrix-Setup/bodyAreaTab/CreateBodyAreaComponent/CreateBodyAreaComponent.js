import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import { browserHistory }           from 'react-router'
import Button                       from 'material-ui/Button';
import Grid                         from 'material-ui/Grid';
import { AsyncCreatable }           from 'react-select';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';

import Input                        from '../../../../common/Input/Input';
import {
  diagnosisQuestionCreate,
  dispatchBodyModelWired,
  updateCrateQuestionFields,
  clearCreateQuestion,
  updateQuestionCreate,
  getBodyAreaById,
  onChange,
}                                   from '../../../../../actions';
import { PAGE, assets }             from '../../../../../config';
import { C }                        from '../../../../../components';

const tabs = {
  0: { value: 0, side: 'front', sex: 'male',   url: `${assets}/images/bodyModel/male1.jpg`,   },
  1: { value: 1, side: 'left',  sex: 'male',   url: `${assets}/images/bodyModel/male2.jpg`,   },
  2: { value: 2, side: 'back',  sex: 'male',   url: `${assets}/images/bodyModel/male3.jpg`,   },
  3: { value: 3, side: 'right', sex: 'male',   url: `${assets}/images/bodyModel/male4.jpg`,   },
  4: { value: 4, side: 'front', sex: 'female', url: `${assets}/images/bodyModel/female1.jpg`, },
  5: { value: 5, side: 'left',  sex: 'female', url: `${assets}/images/bodyModel/female2.jpg`, },
  6: { value: 6, side: 'back',  sex: 'female', url: `${assets}/images/bodyModel/female3.jpg`, },
  7: { value: 7, side: 'right', sex: 'female', url: `${assets}/images/bodyModel/female4.jpg`, },
}

class CreateBodyAreaComponent extends Component {
  state = {
    questionType    : 'packages',
    keyIsUniqueError: '',
    tab             : 0,
  };

  constructor(props) {
    super(props);
    updateCrateQuestionFields(this.state.questionType, 'page');
  }

  componentWillMount() {
    dispatchBodyModelWired({ url: `${assets}/images/bodyModel/male1.jpg` });
    if (this.props.routeParams.id) {
      getBodyAreaById('diagnostics', 'areas', this.props.routeParams.id);
    }
  }

  componentWillUnmount() {
    clearCreateQuestion();
  }

  _done = (value) => {
    const { key, title, description } = value;
    const result = {
      key,
      title,
      description,
    };

    if (this.props.routeParams.id) {
      diagnosisQuestionCreate('diagnostics', 'bodyArea', result)
        .then(() => browserHistory.push(`/matrix-setup/body-area`))
    } else {
      updateQuestionCreate('diagnostics', 'bodyArea', result, this.props.routeParams.id)
        .then(() => browserHistory.push(`/matrix-setup/body-area`))
    }

  };

  _changeTab = i => dispatchBodyModelWired({
    tab : tabs[i].value,
    url : tabs[i].url,
    side: tabs[i].side,
    sex : tabs[i].sex,
  });

  render() {
    let {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        title,
        key,
        description
      },
      bodyModelReducer: {
        url,
        sex,
        side,
        tab,
      }
    } = this.props;
    return (
      <div id="create-question">
        <div className="page-sub-header">
          <span>Create Pain Zone</span>
          <div className="nav-buttons">

            <Button onClick={() => browserHistory.push(PAGE.bodyArea)}>
              Cancel
            </Button>

            <Button
              raised
              dense
              onClick={() => this._done(createDiagnosisQuestion)}
              color="primary"
            >
              Save
            </Button>

          </div>
        </div>
        <Grid container spacing={0}>

          <Grid item sm={8}>
            <AppBar position="static" color="default">
              <Tabs
                scrollable
                value={tab}
                onChange={() => {}}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab label='M:front' onClick={() => this._changeTab(0)}/>
                <Tab label='M:left'  onClick={() => this._changeTab(1)}/>
                <Tab label='M:back'  onClick={() => this._changeTab(2)}/>
                <Tab label='M:right' onClick={() => this._changeTab(3)}/>
                <Tab label='F:front' onClick={() => this._changeTab(4)}/>
                <Tab label='F:left'  onClick={() => this._changeTab(5)}/>
                <Tab label='F:back'  onClick={() => this._changeTab(6)}/>
                <Tab label='F:right' onClick={() => this._changeTab(7)}/>
              </Tabs>
            </AppBar>

            <C.BodyModel/>

          </Grid>

          <Grid item sm={4}>
            <div style={{ padding: '30px' }}>
              <Input
                id='title'
                value={title}
                reducer={ createDiagnosisQuestion }
                label={'Title' }
                placeholder={'Title' }
              />

              <Input
                id='key'
                value={key}
                reducer={createDiagnosisQuestion}
                label={ 'Key' }
                placeholder={ 'Key'}
                error={!!this.state.keyIsUniqueError}
              />

              <Input
                id='description'
                value={description}
                reducer={createDiagnosisQuestion}
                label={ 'Description' }
                placeholder={ 'Description'}
              />
            </div>
          </Grid>

        </Grid>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
  bodyModelReducer: state.bodyModelReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateBodyAreaComponent);