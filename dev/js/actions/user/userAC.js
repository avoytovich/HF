import { USER } from '../index';
import { store } from '../../index';
import {dispatchCSVFilePayloadWired, userCreateByCSV}  from '../index';
import { browserHistory }       from 'react-router';

export const dispatchUserPayload = payload => dispatch =>
  dispatch({
    type   : USER,
    payload: payload
  });

export const dispatchUserPayloadWired = payload =>
  dispatchUserPayload(payload)(store.dispatch);

export const dispatchUserClearWired = () =>
  store.dispatch({ type: `${USER}_CLEAR` });

export const  toggleCSVModal = (data, that, browserUrl, userId) =>{
  console.log(data, that, browserUrl);
  switch(data) {
    case 'add':
      that.setState({ showCSVUploadModal: !that.state.showCSVUploadModal,
        CSVUploadModalTitle: 'Add users',
        CSVUploadModalConfirm: ()=> userActionByCSV(that,'addSimpleUserByCSV',  browserUrl, userId)});
      return;
    case 'activate':
      that.setState({ showCSVUploadModal: !that.state.showCSVUploadModal,
        CSVUploadModalTitle: 'Activate users',
        CSVUploadModalConfirm: ()=>userActionByCSV(that,'activateSimpleUserByCSV',  browserUrl, userId)});
      return;
    case 'deactivate':
      that.setState({ showCSVUploadModal: !that.state.showCSVUploadModal,
        CSVUploadModalTitle: 'Deactivate users',
        CSVUploadModalConfirm: ()=>userActionByCSV(that,'deactivateSimpleUserByCSV', browserUrl,userId)});
      return;
    case 'remove':
      that.setState({ showCSVUploadModal: !that.state.showCSVUploadModal,
        CSVUploadModalTitle: 'Delete users',
        CSVUploadModalConfirm: ()=>userActionByCSV(that,'deleteSimpleUserByCSV',  browserUrl,userId)});
      return;
    default:
      that.setState({ showCSVUploadModal: false });
      dispatchCSVFilePayloadWired({...that.props.createSimpleUsersReducers,files:[]})
  }
};

export const  toggleCSVModalSimple = (data, that, browserUrl) =>{
  console.log(data, that, browserUrl);
  switch(data) {
    case 'add':
      that.setState({ showCSVUploadModal: !that.state.showCSVUploadModal,
        CSVUploadModalTitle: 'Add users',
        CSVUploadModalConfirm: ()=> userActionByCSV(that,'createSimpleUserByCSV',  browserUrl)});
      return;
    case 'activate':
      return;
    case 'deactivate':
       return;
    case 'remove':
       return;
    default:
      that.setState({ showCSVUploadModal: false });
      dispatchCSVFilePayloadWired({...that.props.createSimpleUsersReducers,files:[]})
  }
};

export const userActionByCSV = (that,api, browserUrl, userId) => {
  const result = {
    customer_id: userId,
    files: that.props.CSVFileReducer.files,
  };
  userCreateByCSV('users', api, result)
    .then(()=>{
      browserHistory.push(browserUrl);
      that.setState({showCSVUploadModal:false});
      dispatchCSVFilePayloadWired({files:[]})
    });
};
