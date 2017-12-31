import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import PropTypes                    from 'prop-types';
import { get }                      from 'lodash';
// Actions
import {
  updateCrateQuestionFields
}                                   from '../../../../../actions';
// Components
import { Input }                    from '../../../../common';
import {
  DiagnosisAssets,
  DiagnosisRulesComponent,
  AsyncAreaSelect,
  UniqueKey
}                                   from '../../../../common';
import SequenceBlock                from './sequenceBlock';
import DiagnosticQuestion           from './diagnosticQuestion';
import DiagnosticAnswers            from './diagnosticAnswers';
// UI
import Grid                         from 'material-ui/Grid';
import Typography                   from 'material-ui/Typography';
import MUISelect                    from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import { Async }                    from 'react-select';

const  CONTENT_TYPE_LIST = [
    {label: 'Question',        value: 'question'},
    {label: 'Functional test', value: 'functionalTest'},
];

class DiagnosisTypeQuestion extends Component {
  state = {
    questionType    : 'diagnosis',
    selectedValue   : 'single',
    keyIsUniqueError: '',
  };

  render() {
    const {
      sequenceList,
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle, area, question, questionKey, sequence, sequenceType, answerType, content_type
      }
    } = this.props;

    return <Grid container className="margin-remove">
      <Grid item
            md={6}
            sm={12}
            className="create-question-body">
        <div className="main-question">

          <Grid className="title">
            <Typography type="title" gutterBottom>
              Question
            </Typography>
          </Grid>

          <Grid container className="row-item">
            <Grid item sm={6} style={{display: 'flex', flexDirection: 'column'}}>
              <Typography
                type="caption"
                gutterBottom
                className="custom-select-title">
                Question type
              </Typography>

              <MUISelect
                value={content_type}
                onChange={e => updateCrateQuestionFields(e.target.value, 'content_type')}
                MenuProps={{ PaperProps: { style: { width: 400 }}}}
              >
                {CONTENT_TYPE_LIST.map((item, index) => (
                  <MenuItem
                    key={ item.value }
                    value={ item.value }>
                    {item.label}
                  </MenuItem>
                ))}
              </MUISelect>
            </Grid>
          </Grid>

          {/*Title and Body Area*/}
          <Grid container className="row-item">
            <Grid item md={6} sm={12}>
              <Input
                id='questionTitle'
                value={questionTitle}
                reducer={ createDiagnosisQuestion }
                label={ 'Title' }
              />
            </Grid>
            <Grid item md={6} sm={12} >
              <AsyncAreaSelect
                domain="diagnostics"
                path="findArea"
                valuePath="area"
                idKey="create_diagnostic_question"
              />
            </Grid>
          </Grid>

          {/* Question !!! */}
          <DiagnosticQuestion
            id="question"
            question={question}
          />

          {/* Question Key */}
          <UniqueKey
            domain="diagnostics"
            path="findByKey"
            questionKey={questionKey}
            id="questionKey"
            reducer="createDiagnosisQuestion"
          />

          {/* Sequence */}
          <SequenceBlock
            domain="diagnostics"
            path="sequenceList"
            value={sequence}
            valuePath="sequence"
            typePath="sequenceType"
            type={sequenceType}
            list={sequenceList}
          />

          {/* Answers */}
          <Grid className="title answer">
            <Typography type="title"
                        gutterBottom>
              Answers
            </Typography>
          </Grid>
          <DiagnosticAnswers
            answerType={answerType}
            typePath="answerType"
          />
        </div>
      </Grid>

      <Grid item
            md={6}
            sm={12}
            className="rules">

        {content_type === "functionalTest" && <DiagnosisAssets/>}

        <DiagnosisRulesComponent
          type="diagnostic"
          page="diagnostic"
          area={area}
          step={sequence}
        />
      </Grid>
    </Grid>
  }
}

DiagnosisTypeQuestion.defaultProps = {
  sequenceList       : []
};

DiagnosisTypeQuestion.propTypes = {
  sequenceList       : PropTypes.array,
};

const mapStateToProps = state => ({createDiagnosisQuestion: state.createDiagnosisQuestion});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(DiagnosisTypeQuestion);