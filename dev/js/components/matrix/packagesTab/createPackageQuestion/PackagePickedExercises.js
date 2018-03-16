import React, { Component }    from 'react';
import Delete                  from 'material-ui-icons/Delete';
import * as moment             from 'moment';
import { TIME_FORMAT_DOTS }    from '../../../../utils/constants/pageContent';
import Typography              from 'material-ui/Typography';
import IconButton              from 'material-ui/IconButton';
import {
  updateCrateQuestionFields,
  getPackageLevel,
  notifier
}                              from '../../../../actions';
import { connect }             from 'react-redux';
import { bindActionCreators }  from 'redux';
import Grid                    from 'material-ui/Grid';
import {
  debounce,
  get,
  groupBy,
  find,
  isEqual,
  isEmpty,
}                               from 'lodash';
import Input                   from '../../../common/Input/Input';
import { store }                   from '../../../../index';


class PackagePickedExercises extends Component  {
    state = {
      list: [],
      error: false
    };

  componentDidMount() {
    this.sendNotification = debounce(this.sendNotification, 500, { leading:false, trailing:true });

      this.props.exercises.length &&
      getPackageLevel(
        'exercises',
        'getExercises',
        this.props.exercises.map(({ id }) => id),
        this.props.level
      )
        .then(({data}) => {
          this.setState({list: data})
        });
    }


  componentWillReceiveProps(nextProps) {
    if (this.props.exercises.length !== nextProps.exercises.length) {
      nextProps.exercises.length ?
        getPackageLevel(
          'exercises',
          'getExercises',
          nextProps.exercises.map(({ id }) => id),
          nextProps.level
        )
          .then(({data}) => {
            this.setState({list: data})
          }) :
        this.setState({list: []});
    }
  }

  handleDelete = (ID) =>  {
    const { packageLevels } = this.props.createDiagnosisQuestion;
    const filtered = get(packageLevels, `[${this.props.level}].exercises`).filter(el =>  el.id != ID);
    updateCrateQuestionFields(filtered, `packageLevels[${this.props.level}].exercises`)
  };

  sendNotification = (level) =>
    notifier({
      title: 'Invalid probabilities sum count',
      message: `Please, check Level ${ level + 1 }!`,
      status: 'error',
    });

  handleProbabilityChange = (event, level, index, order) => {
      const value = event.target.value ? event.target.value / 100 : '';
      updateCrateQuestionFields(value, `packageLevels.${level}.exercises.${index}.probability`);

      const list = get(this.props.createDiagnosisQuestion, `packageLevels.${level}.exercises`);
      const sum = list.reduce((result, item) => {
        if (item) {
          return result + (item.probability || 0);
        }
        return result;
      }, 0);

      // if (sum > 1) {
      //   this.sendNotification(level);
      // }
    };

    render() {
      const {
        level,
        order,
        exercises,
        createDiagnosisQuestion,
        createDiagnosisQuestion: {
          packageLevels,
        }
      } = this.props;
      return (
        <Grid item xs={12} className="package-level-exercises-list">
          {
            this.state.list
              .map((item) => {
                 const {
                   id,
                   title,
                   name,
                   ordinal,
                   created_at
                 } = item;

                // find index of current exercise in common packages' exercises array
                const index = get(
                  store.getState(),
                  `createDiagnosisQuestion.packageLevels[${level}].exercises`,
                  []
                ).findIndex(ex => ex.id === item.id && ex.order === order);

                 const created = moment.unix(created_at).format(TIME_FORMAT_DOTS);

                 const probability = get( packageLevels, `[${level}].exercises[${index}].probability`);
                 return (
                   <div key={index} className="package-level-exercises-item">

                     <Typography type="subheading" className="title package-exercise-name">
                       { ordinal || '-'} { name }
                     </Typography>

                     <div style={{ width: '50px', paddingRight: '20px', flex: 3 }}>
                       <Input
                         style={{ width: '100%'}}
                         type="number"
                         value={probability ? (probability * 100).toFixed(0) : probability}
                         id={`packageLevels.${level}.exercises.${index}.probability`}
                         reducer={createDiagnosisQuestion}
                         label={ 'Probability' }
                         onChangeCustom={event => this.handleProbabilityChange(event, level, index)}
                       />
                     </div>

                     <IconButton aria-label="Delete">

                       <Delete onClick={() => this.handleDelete(id)} />

                     </IconButton>
                   </div>
                 )
               })
          }
        </Grid>
      );
  }
}

const mapStateToProps = state => ({
  createDiagnosisQuestion: state.createDiagnosisQuestion,
  commonReducer          : state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PackagePickedExercises);