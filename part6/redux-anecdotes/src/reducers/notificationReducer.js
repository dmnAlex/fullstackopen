const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

let timeoutID

export const notificationCreate = (notification, seconds) => {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch(notificationSet(notification))
    timeoutID = setTimeout(() => dispatch(notificationRemove()), seconds * 1000)
  }
}

export const notificationSet = notification => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const notificationRemove = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer