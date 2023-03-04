import { useContext } from 'react'
import NotifContext from '../context'


const Notification = () => {
  const [notif, notifDispatch] = useContext(NotifContext)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (notif) {
    setTimeout(() => notifDispatch({type: 'NULL_MSG'}), 5000)
    return (
    <div style={style}>
      {notif}
    </div>
  )}
}

export default Notification
