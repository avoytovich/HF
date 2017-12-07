import React                            from 'react';
import Dialog                           from 'material-ui/Dialog';
import Slide                            from 'material-ui/transitions/Slide';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider                          from 'material-ui/Divider';
import { getSequence }                  from '../../../../actions';

export default (props) => {
  const {open, handleRequestClose } = props;

  const getInfo = () => {

  };

  const Transition = (props) => {
    return <Slide direction="up" {...props} />;
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onRequestClose={handleRequestClose}
      transition={Transition}
    >
      <List>
        <ListItem button>
          <ListItemText primary="Phone ringtone" secondary="Titania" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemText primary="Default notification ringtone" secondary="Tethys" />
        </ListItem>
      </List>
    </Dialog>
  )
};