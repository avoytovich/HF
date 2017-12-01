import { dispatchCommonPayload } from '../../actions'
import { ifArrOfStringsIncludes, clearComponentState } from '../../utils'

export const onRootChange = (prevState, nextState, replace) => {
  clearComponentState(prevState);
  dispatchCommonPayload({
    currentPath: nextState.location.pathname,
    urlRole    : ifArrOfStringsIncludes(['app'], nextState.location.pathname) ? 'admin' : 'customer'
  })
};