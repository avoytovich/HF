import React, { Component }  from 'react';
import Delete                from 'material-ui-icons/Delete';
import * as moment           from 'moment';
import { TIME_FORMAT_DOTS }  from '../../../../utils/constants/pageContent';
import Typography            from 'material-ui/Typography';
import IconButton            from 'material-ui/IconButton';

export default ({exercises}) => {
  const { id, title, created_at } = exercises;
  const created = moment.unix(created_at).format(TIME_FORMAT_DOTS);

  const handleDelete = (ID) =>  {
    console.log('Delete exercises with ID', ID);
  };

  return <div className="package-level-exercises-item">

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

        <Delete onClick={() => handleDelete(id)} />

      </IconButton>
    </div>

  </div>
}