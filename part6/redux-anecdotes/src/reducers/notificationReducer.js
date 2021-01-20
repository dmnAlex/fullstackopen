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