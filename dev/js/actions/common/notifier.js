import { store } from '../../index'
import { addNotification as notify } from 'reapop'

export const notifier = ({
  title,
  message,
  status,
  dismissible = true,
  dismissAfter = 6000,
  position = 'tr',
  ...opt,
}) =>
  store.dispatch(notify({
    title,
    message,
    status,
    dismissible,
    dismissAfter,
    position,
    ...opt
  }));