import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import { browserHistory }           from 'react-router'
import { diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  findUniqueKey,
  updateQuestionCreate,
  getExerciseById,
  findArea }                        from '../../../../../actions';
import { onChange }                 from '../../../../../actions/common';
import Grid                         from 'material-ui/Grid';
import Typography                   from 'material-ui/Typography';
import IconButton                   from 'material-ui/IconButton';
import Delete                       from 'material-ui-icons/Delete';
import ExercisesAssetsModal         from '../../ExercisesTab/createExercise/exercisesAssetsModal';
import { get }                      from 'lodash';
import { CONTENT_TYPE_LIST }        from '../../../../../utils'
import MUISelect                    from 'material-ui/Select';
import Menu, { MenuItem }           from 'material-ui/Menu';
import { Input }                    from '../../../../common';
import TextField                    from 'material-ui/TextField';
import MUIInput, { InputLabel }     from 'material-ui/Input';
import { FormControl }              from 'material-ui/Form';
import DiagnosticQuestion           from './diagnosticQuestion';
import { UniqueKey }                from '../../../../common';
import SequenceBlock                from './sequenceBlock';

class diagnosisVASQuestion extends Component {
  state = {
    questionType    : 'diagnosis',
    selectedValue   : 'single',
    keyIsUniqueError: '',
  };

  list = CONTENT_TYPE_LIST.concat([{label: 'VAS', value: 'vas'}]);

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
            <Grid item sm={6}>
              <FormControl>
                <InputLabel htmlFor="age-simple"> Question type</InputLabel>
                <MUISelect
                  value={content_type}
                  onChange={e => updateCrateQuestionFields(e.target.value, 'content_type')}
                  input={<MUIInput name="age" id="age-simple" />}
                  disabled
                >
                  {this.list.map((item, index) => (
                    <MenuItem
                      key={ item.value }
                      value={ item.value }>
                      {item.label}
                    </MenuItem>
                  ))}
                </MUISelect>
              </FormControl>
            </Grid>

            <Grid item sm={6} style={{display: 'flex', flexDirection: 'column'}}>
              <Input
                id='questionTitle'
                value={questionTitle}
                reducer={ createDiagnosisQuestion }
                label={ 'Title' }
                style={{marginTop: 0}}
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


        </div>

      </Grid>
      <Grid item
            md={6}
            sm={12}
            className="rules">
      </Grid>
    </Grid>
  }
}

const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(diagnosisVASQuestion);