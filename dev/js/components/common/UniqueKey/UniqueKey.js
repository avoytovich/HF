import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import PropTypes                    from 'prop-types';
import * as dotProp                 from 'dot-prop-immutable';
// Actions
import {
  findUniqueKey,
  updateCrateQuestionFields
}            from '../../../actions';
import { onChange }                 from '../../../actions/common';

import { Input }                    from '../../common';

import Grid                         from 'material-ui/Grid';


class UniqueKey extends Component {

  state = { keyIsUniqueError: false };

  checkIfQuestionKeyValid = (event, value, props) => {
    const { path, domain, currentType, currentId, errorsStore, id:  ID } = this.props;

    this.props.onChange(event, value);

    if (event.target.value.trim().length > 2) {
      findUniqueKey(domain, path, event.target.value.trim()).then(({data}) => {
        const {data: {id, type}} = data;
        if (`${currentId}` === `${id}`) {
          const removed = errorsStore.hasOwnProperty(ID) ? dotProp.delete(errorsStore, [ID]) : errorsStore;
          updateCrateQuestionFields(removed, 'errors');
        }
        else {
          const newError = dotProp.set(errorsStore, ID, 'Key is not unique');
          updateCrateQuestionFields(newError, 'errors');
        }
      }).catch(() => {
        const removed = errorsStore.hasOwnProperty(ID) ? dotProp.delete(errorsStore, [ID]) : errorsStore;
        updateCrateQuestionFields(removed, 'errors');
      });
    }
  };

  render() {
    const { store, questionKey, id, reducer, label, disabled} = this.props;
    const { keyIsUniqueError } = this.state;

   return <Grid container className="row-item">
     <Grid item xs={12}>
       <Input
         id={id}
         value={questionKey}
         reducer={store[reducer]}
         label={label}
         disabled={disabled}
         onChangeCustom={this.checkIfQuestionKeyValid}
       />
     </Grid>
   </Grid>
  }
}


UniqueKey.defaultProps = {
  reducer: 'createDiagnosisQuestion',
  label  : 'Question Key',
};

UniqueKey.propTypes = {
  path        : PropTypes.string.isRequired,
  domain      : PropTypes.string.isRequired,
  questionKey : PropTypes.string.isRequired,
  id          : PropTypes.string.isRequired,
  reducer     : PropTypes.string.isRequired,
  disabled    : PropTypes.bool
};

const mapStateToProps = state => ({store: state, errorsStore: state.createDiagnosisQuestion.errors});
const mapDispatchToProps = dispatch => bindActionCreators({onChange, dispatch}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(UniqueKey);