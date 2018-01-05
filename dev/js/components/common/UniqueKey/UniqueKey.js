import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import PropTypes                    from 'prop-types';

// Actions
import { findUniqueKey }            from '../../../actions';
import { onChange }                 from '../../../actions/common';

import { Input }                    from '../../common';

import Grid                         from 'material-ui/Grid';


class UniqueKey extends Component {

  state = { keyIsUniqueError: false };

  checkIfQuestionKeyValid = (event, value, props) => {
    const { path, domain } = this.props;

    this.props.onChange(event, value);

    if (event.target.value.length > 3) {
      findUniqueKey(domain, path, event.target.value).then(res => {
        if (res) {
          this.setState({keyIsUniqueError: 'Key is not Unique'});
        }
        else if (!res && this.state.keyIsUniqueError){
          this.setState({keyIsUniqueError: ''});
        }
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
         error={!!keyIsUniqueError}
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

const mapStateToProps = state => ({store: state});
const mapDispatchToProps = dispatch => bindActionCreators({onChange, dispatch}, dispatch);

export default  connect(mapStateToProps, mapDispatchToProps)(UniqueKey);