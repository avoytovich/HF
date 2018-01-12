import React, { Component }     from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';
import { get }                  from 'lodash';
import { CONTENT_TYPE_LIST }    from '../../../../../utils';
// Actions
import {
  updateCrateQuestionFields
}                               from '../../../../../actions';
import { onChange }             from '../../../../../actions/common';
// Components
import {
  UniqueKey,
  Input,
  BlockDivider
}                               from '../../../../common';
import SequenceBlock            from './sequenceBlock';
import DiagnosticQuestion       from './diagnosticQuestion';
// UI
import Grid                     from 'material-ui/Grid';
import Typography               from 'material-ui/Typography';
import MUISelect                from 'material-ui/Select';
import Menu, { MenuItem }       from 'material-ui/Menu';
import MUIInput, { InputLabel } from 'material-ui/Input';
import { FormControl }          from 'material-ui/Form';

class diagnosisVASQuestion extends Component {
  list = CONTENT_TYPE_LIST.concat([{label: 'VAS', value: 'vas'}]);

  render() {
    const {
      sequenceList,
      createDiagnosisQuestion,
      createDiagnosisQuestion: {
        questionTitle, area, question, questionKey, sequence, sequenceType, answerType, content_type
      }
    } = this.props;


    return <BlockDivider title="Question" hideNavigation={true}>
      <div className="main-question margin-bottom" style={{width: '100%'}}>
        <Grid className="title">
          <Typography type="title" gutterBottom>
            Question
          </Typography>
        </Grid>
        <Grid container className="row-item">
          <Grid item sm={6}>
            <FormControl className="MUIControl">
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
              className="MUIControl"
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
          disabled={true}
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

      <div></div>
    </BlockDivider>;
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