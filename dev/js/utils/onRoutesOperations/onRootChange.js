import {
  clearComponentStateOnLeave
} from '../../utils'

export const onRootChange = (prevState) => {
  clearComponentStateOnLeave(prevState);
};