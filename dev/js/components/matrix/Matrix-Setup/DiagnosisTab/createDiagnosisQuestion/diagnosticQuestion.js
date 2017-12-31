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
  state = { questionLang: 'en' };

  handleQuestionLangChange = (event, questionLang) =>
    this.setState({ questionLang });

  render() {
    const { store, question, id, label } = this.props;
    const { questionLang } = this.state;

    return <Grid container className="row-item">
      <Grid item xs={12}>
        {questionLang === 'en' ?
          <Input
            id={`${id}.en`}
            value={question.en}
            reducer={store}
            label={ label }
            multiline={true}
            rows="5"
            cols="60"
          /> :
          <Input
            id={`${id}.swe`}
            value={question.swe}
            reducer={store}
            label={ label }
            multiline={true}
            rows="5"
            cols="60"
          />
        }
      </Grid>
      <Tabs
        value={questionLang}
        onChange={this.handleQuestionLangChange}
        indicatorColor="primary"
        className="tab-lang"
        textColor="primary"
        centered
      >
        <Tab label="English" value="en" />
        <Tab label="Sweden"  value="swe" />
      </Tabs>
    </Grid>
  }
}

DiagnosticQuestion.defaultProps = {
  className   : 'async_area_select',
  label       : 'Question',
  id          : 'question',
};

DiagnosticQuestion.propTypes = {
  id          : PropTypes.string.isRequired,
  question    : PropTypes.PropTypes.shape({
    en : PropTypes.string.isRequired,
    swe: PropTypes.string.isRequired
  }),
  label       : PropTypes.string
};

const mapStateToProps    = state => ({store: state.createDiagnosisQuestion});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DiagnosticQuestion);