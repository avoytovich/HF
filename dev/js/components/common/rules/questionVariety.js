import React, { Component }   from 'react';
import { connect }            from 'react-redux';
import Select                 from 'material-ui/Select';
import Input, { InputLabel }  from 'material-ui/Input';
import { MenuItem }           from 'material-ui/Menu';

const OTHER_TYPES = [
  { label: 'Question',  value: 'question'  },
  { label: 'Session',   value: 'session'   },
  { label: 'VAS',       value: 'VAS'       }
];

class QuestionVariety extends Component {
  state = {
    value: 'question'
  };

  label = (page, value) => {
    switch (page) {
      case 'diagnosis':
      case 'condition':
        return <div className="simple-question-variety">Question</div>;

      case 'evaluation':
        return <Select
          value={value}
          onChange={this.handleChange}
          input={<Input name="question-variety" id="question-variety" />}
          className="question-variety-select">

          {OTHER_TYPES.map( (item, index) =>
            <MenuItem key={index}
                      value={item.value}>
              {item.label}
            </MenuItem>)}

        </Select>;

      default:
        return <div className="simple-question-variety">Question</div>;
    }
  };

  handleChange = (event) => {
    this.setState({value: event.target.value});
  };

  render () {
    const { page } = this.props.store;
    const { value } = this.state;

    return (
      <div className="title">
        {this.label(page, value)}
      </div>
    )
  }
};


const mapStateToProps = (state, props) => ({
  store : state.createDiagnosisQuestion,
});

export default connect(mapStateToProps)(QuestionVariety);