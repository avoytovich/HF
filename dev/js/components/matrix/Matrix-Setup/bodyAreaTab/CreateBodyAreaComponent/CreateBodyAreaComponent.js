import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import each                         from 'lodash/each';
import { connect }                  from 'react-redux';
import { browserHistory }           from 'react-router'
import Button                       from 'material-ui/Button';
import Grid                         from 'material-ui/Grid';
import get                          from 'lodash/get';
import keys                         from 'lodash/keys';
import filter                       from 'lodash/filter';
import isEmpty                      from 'lodash/isEmpty';
import capitalize                   from 'lodash/capitalize';
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
  notifier,
  dispatchMatrixPayloadWired,
}                                   from '../../../../../actions';
import { PAGE, assets }             from '../../../../../config';
import { C }                        from '../../../../../components';
import { validateBodyArea }         from '../../../../../utils';

const tabs = {
  0: { value: 0, lb: 'Male: front',   side: 'front', sex: 'male',   url: `${assets}/images/bodyModel/male1.jpg`,   },
  1: { value: 1, lb: 'Male: left' ,   side: 'left',  sex: 'male',   url: `${assets}/images/bodyModel/male2.jpg`,   },
  2: { value: 2, lb: 'Male: back' ,   side: 'back',  sex: 'male',   url: `${assets}/images/bodyModel/male3.jpg`,   },
  3: { value: 3, lb: 'Male: right',   side: 'right', sex: 'male',   url: `${assets}/images/bodyModel/male4.jpg`,   },
  4: { value: 4, lb: 'Female: front', side: 'front', sex: 'female', url: `${assets}/images/bodyModel/female1.jpg`, },
  5: { value: 5, lb: 'Female: left' , side: 'left',  sex: 'female', url: `${assets}/images/bodyModel/female2.jpg`, },
  6: { value: 6, lb: 'Female: back' , side: 'back',  sex: 'female', url: `${assets}/images/bodyModel/female3.jpg`, },
  7: { value: 7, lb: 'Female: right', side: 'right', sex: 'female', url: `${assets}/images/bodyModel/female4.jpg`, },
}

class CreateBodyAreaComponent extends Component {
  state = {
    questionType    : 'packages',
    keyIsUniqueError: '',
  };

  constructor(props) {
    super(props);
    updateCrateQuestionFields(this.state.questionType, 'page');
  }

  componentWillMount() {
    if (!this.props.bodyModelReducer.url) {
      dispatchBodyModelWired({ url: `${assets}/images/bodyModel/male1.jpg` });
    }
  }

  componentWillUnmount() {
    clearCreateQuestion();
  }

  _prepareData = (createDiagnosisQuestion, bodyModelReducer) => ({
    key        : createDiagnosisQuestion.key,
    title      : createDiagnosisQuestion.title,
    description: createDiagnosisQuestion.description,
    coordinates: bodyModelReducer.currentlyDrawingPolygon,
  });

  _createOrUpdateBodyArea = (data) => {
    const {
      currentlyDrawingPolygon: CDP,
    } = this.props.bodyModelReducer;

    let sidesNotForBothSexes = keys(CDP).filter(side => keys(CDP[side]).length < 2);
    let hintTextSomeDrawn    = `Please make sure zones were provided for both sexes 
                                (check side(s): ${sidesNotForBothSexes.toString().replace(/,/g, ', ')}).`;
    let hintTextNothingDrawn = 'Please make sure zones were provided for both sexes.';

    if (isEmpty(CDP) || sidesNotForBothSexes.length) {
      notifier({
        title  : 'Hint',
        message: sidesNotForBothSexes.length ? hintTextSomeDrawn : hintTextNothingDrawn,
        status : 'info',
      });
      return;
    }
    const { errors, isValid } = validateBodyArea(data);
    if (isValid) {
      if (!this.props.routeParams.id) {
        diagnosisQuestionCreate('diagnostics', 'bodyArea', data)
          .then(() => browserHistory.push(`/matrix-setup/body-area`))
      } else {
        updateQuestionCreate('diagnostics', 'bodyArea', data, this.props.routeParams.id)
          .then(() => browserHistory.push(`/matrix-setup/body-area`))
      }
    }
    dispatchMatrixPayloadWired({ errors });
  };

  _changeTab = i => dispatchBodyModelWired({
    tab : tabs[i].value,
    url : tabs[i].url,
    side: tabs[i].side,
    sex : tabs[i].sex,
  });

  _renderTabs = () => {
    const returnArr = [];
    each(tabs, ({ lb }, key) => {
      returnArr.push(
        <Tab
          label={lb}
          onClick={() => this._changeTab(key)}
          key={key}
        />
      )
    });
    return returnArr;
  };

  render() {
    let {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        title,
        key,
        description
      },
      bodyModelReducer,
      bodyModelReducer: {
        tab,
      },
      routeParams: {
        id
      }
    } = this.props;
    const finalData = this._prepareData(createDiagnosisQuestion, bodyModelReducer);
    const screenTitle =  `${id? 'Edit': 'Create' } Pain Zone ${id && '"' + capitalize(title) + '"'}`;
    return (
      <div id="create-question">
        <div className="page-sub-header">
          <span>{screenTitle}</span>
          <div className="nav-buttons">

            <Button onClick={() => browserHistory.push(PAGE.bodyArea)}>
              Cancel
            </Button>

            <Button
              raised
              dense
              onClick={() => this._createOrUpdateBodyArea(finalData)}
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
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                { this._renderTabs() }

              </Tabs>
            </AppBar>

            <C.BodyModel
              id={id}
            />

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