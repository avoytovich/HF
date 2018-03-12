import React, { Component }           from 'react';
import { connect }                    from 'react-redux';
import { bindActionCreators }         from 'redux';
import PropTypes                      from 'prop-types';
//Actions
import {
  updateCrateQuestionFields,
  getSequenceList
}                                     from '../../../../actions';
//Components
import { ChooseSequence }             from '../../../common';
// UI
import Grid                           from 'material-ui/Grid';
import Typography                     from 'material-ui/Typography';
import MUISelect                      from 'material-ui/Select';
import Menu, { MenuItem }             from 'material-ui/Menu';

const SEQUENCE_TYPE_LIST = [
    { label: 'Normal', value: 'normal' },
    { label: 'After',  value: 'after'  },
    { label: 'Before', value: 'before' },
];

class SequenceBlock extends Component {

  state = { chooseSequence  : false, list: [] };

  componentDidMount() {
    this.getList(this.props)
  }

  getList = ({path, domain, reqType}) => {
    getSequenceList(domain, path, reqType)
    .then(({data}) => this.setState({list: data.data}));
  };

  openChooseSequence = (chooseSequence) => this.setState({ chooseSequence });

  render() {

    const { type, value, valuePath, typePath, reqType } = this.props;
    const { chooseSequence, list } = this.state;
//    const sequenceBlock = this.props.store.sequenceBlock || []; // Todo: Need to refactor it;

    return  <Grid container  className="row-item">
      <Grid item lg={4} className="sequence-type">
        <MUISelect
          value={type}
          onChange={event => updateCrateQuestionFields(event.target.value, typePath)}
          MenuProps={{PaperProps: {style: {width: 400}}}}
        >
          {
            SEQUENCE_TYPE_LIST.map((item, index) => {
              return(
                <MenuItem
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </MenuItem>
              )
            })
          }
        </MUISelect>
      </Grid>

      <Grid item xs={4}
            className="sequence-wrap">
        <Typography
          type="caption"
          gutterBottom>
          Sequence
        </Typography>
        <div className="sequence" >
          <MUISelect
            value={value}
            onChange={({target}) => updateCrateQuestionFields(target.value, valuePath)}
            MenuProps={{PaperProps: {style: {width: 400}}}}
          >
            {
              list.map((item, index) => {
                return (
                  <MenuItem
                    key={item.step}
                    value={item.step}
                  >
                    {`${item.step}. ${item.title}`}
                  </MenuItem>
                )
              })
            }
          </MUISelect>
        </div>
      </Grid>
      <Grid item xs={4}
            className="sequence-wrap">
      <Typography color="primary"
                  className="open-sequence"
                  onClick={() => this.openChooseSequence(true)}>
        OPEN SEQUENCE
      </Typography>

      { chooseSequence &&
        <ChooseSequence
          reqType={reqType}
          open={chooseSequence}
          list={list}
          defaultStep={value}
          updateList={() =>  this.getList(this.props)}
          handleRequestClose={(value) => this.openChooseSequence(value)}
        />}
      </Grid>
    </Grid>
  }
}

SequenceBlock.defaultProps = {
  className : '',
  value     : '1',
  type      : 'normal',
  reqType   : 'diagnostic'
};

SequenceBlock.propTypes = {
  path        : PropTypes.string.isRequired,
  domain      : PropTypes.string.isRequired,
  valuePath   : PropTypes.string.isRequired,
  typePath    : PropTypes.string.isRequired,
  value       :  PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  type        : PropTypes.string.isRequired,
  className   : PropTypes.string,
  reqType     : PropTypes.string,
};

const mapStateToProps    = state => ({store: state.createDiagnosisQuestion});
const mapDispatchToProps = dispatch => bindActionCreators({dispatch}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SequenceBlock);