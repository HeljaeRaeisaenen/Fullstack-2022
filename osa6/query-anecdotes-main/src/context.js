import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAY_MSG':
      return action.payload
    case 'NULL_MSG':
      return ''
    default: return state
  }
}

const NotifContext = createContext()

export const useNotifValue = () => {
  const notifAndDispatch = useContext(NotifContext)
  return notifAndDispatch[0]
}

export const useNotifDispatch = () => {
  const notifAndDispatch = useContext(NotifContext)
  return notifAndDispatch[1]
}

export const NotifContextProvider = (props) => {
  const [notif, notifDispatch] = useReducer(notificationReducer, '')

  return (
    <NotifContext.Provider value={[notif, notifDispatch] }>
      {props.children}
    </NotifContext.Provider>
  )
}

export default NotifContext
