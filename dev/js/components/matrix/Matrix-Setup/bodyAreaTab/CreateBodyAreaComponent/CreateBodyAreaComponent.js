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
  updateCrateQuestionFields,
  clearCreateQuestion,
  updateQuestionCreate,
  getBodyAreaById,
  onChange,
}                                   from '../../../../../actions';
import { PAGE, assets }                     from '../../../../../config';
import { C }                        from '../../../../../components';

class CreateBodyAreaComponent extends Component {
  state = {
    questionType    : 'packages',
    keyIsUniqueError: '',
    tab             : 0,
    url             : `${assets}/images/bodyModel/male1.jpg`,
  };

  constructor(props) {
    super(props);
    updateCrateQuestionFields(this.state.questionType, 'page');
  }

  componentWillMount() {
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

  getCurrnetImage = tab => {
    if (tab === 0) {
      return
    }
  }

  render() {
    let {
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        title,
        key,
        description
      }
    } = this.props;

    const { url } = this.state;

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
                value={this.state.tab}
                onChange={() => {}}
                indicatorColor="primary"
                textColor="primary"
                fullWidth
              >
                <Tab
                  label='Male'
                  onClick={() => this.setState({ tab: 0, url: `${assets}/images/bodyModel/male1.jpg` })}
                />
                <Tab
                  label='Female'
                  onClick={() => this.setState({ tab: 1, url: `${assets}/images/bodyModel/female1.jpg` })}
                />
              </Tabs>
            </AppBar>

            { this.state.tab === 0 ?
              <C.BodyModel
                url={url}
              />
              :
              <C.BodyModel
                url={url}
              />
            }

          </Grid>

          <Grid item sm={4}>
            <div className="main-question">
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
  commonReducer          : state.commonReducer,
  bodyArea               : state.tables.bodyArea
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(CreateBodyAreaComponent);