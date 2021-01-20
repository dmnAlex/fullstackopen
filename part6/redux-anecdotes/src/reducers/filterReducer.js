const filterReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    case 'REMOVE_FILTER':
      return ''
    default:
      return state
  }
}

export const filterSet = filter => {
  return {
    type: 'SET_FILTER',
    filter
  }
}

// export const filterRemove = () => {
//   return {
//     type: 'REMOVE_FILTER'
//   }
// }

export default filterReducer