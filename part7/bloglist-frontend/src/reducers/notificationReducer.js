const notificationReducer = (state = { message: null, color: 'black' }, action) => {
  switch (action.type) {
    case 'SET_NOTIFICAION':
      return action.data
    case 'REMOVE_NOTIFICAION':
      return { ...state, message: null }
    default:
      return state
  }
}

export const setNotification = ({ message, color }) => {
  return {
    type: 'SET_NOTIFICAION',
    data: {
      message,
      color
    }
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICAION'
  }
}

let timeoutId

export const showNotification = (message, color) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICAION',
      data: {
        message,
        color
      }
    })

    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICAION'
      })
    }, 5000)
  }
}

export default notificationReducer