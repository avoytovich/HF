import React, { Component }         from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';
import { browserHistory }           from 'react-router'
import { diagnosisQuestionCreate,
  updateCrateQuestionFields,
  clearCreateQuestion,
  findUniqueKey,
  updateQuestionCreate,
  getExerciseById,
  findArea }                        from '../../../actions';
import { onChange }                 from '../../../actions/common';
import { AsyncCreatable }           from 'react-select';
import Grid                         from 'material-ui/Grid';
import Button                       from 'material-ui/Button';
import Typography                   from 'material-ui/Typography';
import * as moment                  from "moment";
import { TIME_FORMAT_DOTS }         from '../../../utils/constants/pageContent';
import IconButton                   from 'material-ui/IconButton';
import Delete                       from 'material-ui-icons/Delete';
import ExercisesAssetsModal         from '../../matrix/Matrix-Setup/ExercisesTab/createExercise/exercisesAssetsModal';
import { get }                      from 'lodash';


class DiagnosisAssets extends Component {
  state = {
    chooseFiles: false
  };

  openChooseFiles = (chooseFiles) => this.setState({chooseFiles});


  handleDelete = (ID) => {
    const filtered = get(this.props.store, `diagnostic_assets`).filter(el =>  el && el.id != ID);
    updateCrateQuestionFields(filtered, `diagnostic_assets`);
  };

  render() {
    const { diagnostic_assets } = this.props.store;

    return<div className="assets-list">

        <Grid container>
          <Grid item xs={12}>
            <Typography type="title">
              Assets
            </Typography>
          </Grid>
        </Grid>


        <Grid item xs={12} className="package-level-exercises">
          {diagnostic_assets.map((item, index) => {
            const { id, title, created_at } = item;
            const created = moment.unix(created_at).format('DD.MM.YYYY');

            return <div key={index} className="package-level-exercises-item">

              <div className="exercises-information">

                <Typography type="subheading" className="title">
                  {item.name_origin || item.name_real || 'Title'}
                </Typography>

                <Typography type="body2">
                  Uploaded { created }
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


        <Grid container>
          <Grid item xs={12}>
            <Button color="primary" onClick={() => this.openChooseFiles(true)}>
              OPEN RESOURCES
            </Button>



            {this.state.chooseFiles &&
            <ExercisesAssetsModal
              open={this.state.chooseFiles}
              isSelected={diagnostic_assets || []}
              path="diagnostic_assets"
              domen="diagnostics"
              handleRequestClose={(value) => this.openChooseFiles(value)}/>}
          </Grid>
        </Grid>
      </div>
  }
}

const mapStateToProps = state => ({
  store: state.createDiagnosisQuestion,
  commonReducer          : state.commonReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  dispatch,
}, dispatch);


export default  connect(mapStateToProps, mapDispatchToProps)(DiagnosisAssets);