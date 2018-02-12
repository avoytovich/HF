import React, { Component }     from 'react';
import { connect }              from 'react-redux';
import Paper                    from 'material-ui/Paper';
import Grid                     from 'material-ui/Grid';
import { withStyles }           from 'material-ui/styles';
import get                      from 'lodash/get';
import map                      from 'lodash/map';
import {getProfileWired }       from '../../actions'

const styles = theme => ({
  root:{
    height:'100%',
  },
  button: {
    margin: theme.spacing.unit,
    float : 'right',
  },
  paper:{
    margin: '10px',
    display:'flex',
    width:'100%',
  }

});

class PersonalCabinetBilling extends Component {

  componentWillMount (){
    getProfileWired(this.props.userReducer.user_id,'customers');
  }

  render() {
    const {
      classes
    } = this.props;

    return (
      <div className="profile-main-container">
        <div className="profile-sub-header">
          <span className="profile-name">Tariff Plans</span>
        </div>
        <div><Grid className={classes.root}
                   container
                   alignItems='flex-start'
                   direction='row'
                   justify='space-around'
        >
          <Grid item xs={12} sm={12} className = 'information-block'>
            <Paper className={classes.paper}>
              <div className = 'profile-paper-container'>
                <div className = 'profile-paper-data-container'>
                  <div className = 'tariff-plan-paper-data'>
                    <div className = 'tariff-plan-data-info tariff-plan-additional-info'>
                      Simple
                    </div>
                    <div className = 'tariff-plan-data-info'>
                      Price
                    </div>
                    <div className = 'tariff-plan-data-info'>
                      Period
                    </div>
                  </div>

                  <div className = 'profile-paper-data'>
                    <div className = 'tariff-plan-paper-data-title tariff-plan-data-info'>
                      Heal Users
                    </div>
                    <div className = 'tariff-plan-data-info'>
                      $ 99
                    </div>
                    <div className = 'tariff-plan-data-info'>
                      Monthly
                    </div>
                  </div>

                </div>

                <div className="profile-paper-hr"/>
                <div className = 'profile-paper-data-container'>
                  <div className="tariff-plan-additional-info">
                    * Simple tariff plan for Heal users ( App Store & Google Play uploaded )
                  </div>
                </div>
              </div>
            </Paper>
          </Grid>
        </Grid></div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  profileReducer: state.profileReducer,
  userReducer: state.userReducer
});

export default  connect(mapStateToProps)(withStyles(styles)(PersonalCabinetBilling));
