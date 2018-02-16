import React, { Component }         from 'react';
import { connect }                  from 'react-redux';
import { bindActionCreators }       from 'redux';
import PropTypes                    from 'prop-types';

// Components
import { Input }                    from '../../../../common';

//UI
import Grid                         from 'material-ui/Grid';
import Tabs, { Tab }                from 'material-ui/Tabs';


class DiagnosticQuestion extends Component{
  constructor(props) {
    super(props);
    this.state = { questionLang: this.props.questionLang };
  }

  render() {
    const {
      store,
      question,
      id,
      label
    } = this.props;
    const {
      questionLang
    } = this.state;
    return <Grid container className="row-item">
      <Grid item xs={12}>
        <Input
          id={`${id}.${questionLang}`}
          value={question[questionLang]}
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
  questionLang: 'en',
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