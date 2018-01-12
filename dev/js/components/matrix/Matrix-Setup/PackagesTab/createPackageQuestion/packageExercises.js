import React, { Component }  from 'react';
import Delete                from 'material-ui-icons/Delete';
import * as moment           from 'moment';
import { TIME_FORMAT_DOTS }  from '../../../../../utils/constants/pageContent';
import Typography            from 'material-ui/Typography';
import IconButton            from 'material-ui/IconButton';
import {
  updateCrateQuestionFields,
  getPackageLevel
}                             from '../../../../../actions';
import { connect }                from 'react-redux';
import { bindActionCreators }     from 'redux';
import Grid                       from 'material-ui/Grid';
import { get }                      from 'lodash';

class PackageExercises extends Component  {
    state = { list: [] };
    componentDidMount() {
      this.props.exercises.length &&
      getPackageLevel('exercises', 'getExercises', this.props.exercises, this.props.level)
        .then(({data}) => {
          this.setState({list: data})
        });
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.exercises.length !== nextProps.exercises.length) {
        nextProps.exercises.length ?
          getPackageLevel('exercises', 'getExercises', nextProps.exercises, nextProps.level)
            .then(({data}) => {
              this.setState({list: data})
            }) :
          this.setState({list: []});
      }
    }

    handleDelete = (ID) =>  {
      const packageLevels = this.props.createDiagnosisQuestion.packageLevels;
      const filtered = get(packageLevels, `[${this.props.level}].exercise_ids`).filter(el =>  el != ID);
      updateCrateQuestionFields(filtered, `packageLevels[${this.props.level}].exercise_ids`)
    };

    render() {
      return (
        <Grid item xs={12} className="package-level-exercises-list">
          {this.state.list.map((item, index) => {
           const { id, title, created_at } = item;
           const created = moment.unix(created_at).format(TIME_FORMAT_DOTS);

           return <div key={index} className="package-level-exercises-item">

             <div className="exercises-information">

               <Typography type="subheading" className="title">
                 { title.en }
               </Typography>

               <Typography type="body2">
                 Created { created }
               </Typography>

             </div>

             <div className="delete-icon">

               <IconButton aria-label="Delete">

                 <Delete onClick={() => this.handleDelete(id)} />

               </IconButton>
             </div>
           </div>
         })}
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

export default connect(mapStateToProps, mapDispatchToProps)(PackageExercises);