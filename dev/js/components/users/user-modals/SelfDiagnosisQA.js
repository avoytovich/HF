import React, { Component }   from 'react';
import Dialog, {
       DialogActions,
       DialogContent,
       DialogTitle }          from 'material-ui/Dialog';
import Slide                  from 'material-ui/transitions/Slide';
import Button                 from 'material-ui/Button';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import mapKeys                from 'lodash/mapKeys';
import get                    from 'lodash/get';
import map                    from 'lodash/map';
import sortBy                 from 'lodash/sortBy'


class SelfDiagnosisQA extends Component {

  transition = (props) => <Slide direction="up" {...props} />;

  render() {
    const { deactivateOpen, open} = this.props;
    const questions = this.props.simpleUserProfileReducer.questions || {};
    const answers = this.props.simpleUserProfileReducer.answers || {};
    let questionsList = [];
    mapKeys(questions, function(value, key) {
      questionsList.push(value)
    });
    questionsList = sortBy(questionsList,function (obj) {
      return obj.step
    });
    return  <Dialog
      open={deactivateOpen}
      transition={this.transition}
      keepMounted
      onRequestClose={open}
    >
      <DialogTitle>Self Diagnosis Q/A </DialogTitle>

      <DialogContent>
          {
          map(questionsList, function(el) {
          return (
            <div key={el.key} className="self-diagnosis-item">
              <div className="self-diagnosis-item-question">{el.question.en}</div>
               <div>{get(el.answer.values, `${ get(answers, `${el.key}.value`) }.en`) || get(answers, `${el.key}.value`)}</div>
            </div>
            )
          })
          }
      </DialogContent>

      <DialogActions>
        <Button onClick={open} color="primary">
          Cancel
        </Button>
      </DialogActions>

    </Dialog>;
  }
}

const mapStateToProps = (state, ownProps) => ({
  simpleUserProfileReducer: state.simpleUserProfileReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect( mapStateToProps, mapDispatchToProps )(SelfDiagnosisQA)