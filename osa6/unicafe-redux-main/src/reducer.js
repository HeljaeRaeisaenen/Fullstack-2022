const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'GOOD':
        const newgood = {
            ...state,
            good: state.good + 1
        }
        return newgood
      case 'OK':
        const newok = {
            ...state,
            ok: state.ok + 1
        }
        return newok
      case 'BAD':
        const newbad = {
            ...state,
            bad: state.bad + 1
        }
        return newbad
      case 'ZERO':
        return initialState
      default:
        return state
    }
  }
  
  export default counterReducer