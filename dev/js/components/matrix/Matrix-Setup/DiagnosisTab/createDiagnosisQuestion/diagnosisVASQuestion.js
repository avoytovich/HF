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
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import * as moment                  from "moment";
import { TIME_FORMAT_DOTS }         from '../../../../../utils/constants/pageContent';
import IconButton                   from 'material-ui/IconButton';
import Delete                       from 'material-ui-icons/Delete';
import ExercisesAssetsModal         from '../../ExercisesTab/createExercise/exercisesAssetsModal';
import { get }                      from 'lodash';


class diagnosisVASQuestion extends Component {
  render() {
    return <div>SS</div>
  }
};

const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
  commonReducer          : state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  onChange,
  dispatch,
}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(diagnosisVASQuestion);