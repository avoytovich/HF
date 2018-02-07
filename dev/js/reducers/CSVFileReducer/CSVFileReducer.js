import { createReducer } from '../../utils';
import { CSV_FILE } from '../../actions';

const initialState = {
  files: [],
  progress:100,
};

const CSVFileReducer = createReducer(initialState, CSV_FILE);

export default CSVFileReducer
