import React, { Component }         from 'react';
import { connect }                  from 'react-redux';
import { bindActionCreators }       from 'redux';
import PropTypes                    from 'prop-types';

// Components
import { Input }                    from '../../../common';

//UI
import Grid                         from 'material-ui/Grid';
import Tabs, { Tab }                from 'material-ui/Tabs';


class DiagnosticQuestion extends Component{
  render() {
    const {
      store:{
        questionAnswerLang,
      },
      store,
      question,
      id,
      label
    } = this.props;
    return <Grid container className="row-item">
      <Grid item xs={12}>
        <Input
          id={`${id}.${questionAnswerLang}`}
          value={question[questionAnswerLang]}
          reducer={store}
          label={ label +'*' }
          multiline={true}
          className="MUIControl"
          rows="5"
          cols="60"
        />
      </Grid>
    </Grid>
  }
}

DiagnosticQuestion.defaultProps = {
  className   : 'async_area_select',
  label       : 'Question',
  id          : 'question',
  questionAnswerLang: 'en',
};

DiagnosticQuestion.propTypes = {
  id          : PropTypes.string.isRequired,
  question    : PropTypes.PropTypes.shape({
    en : PropTypes.string.isRequired,
    swe: PropTypes.string.isRequired
  }),
  label       : PropTypes.string
};

const mapStateToProps    = state => ({
  store: state.createDiagnosisQuestion}
);
const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticQuestion);