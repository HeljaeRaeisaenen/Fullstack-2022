
const RemoveButton = ({id, loggedUser, blogUser, handleRemove}) => {
  if (loggedUser !== blogUser) return <></>
  return <button id={id} onClick={(e) => handleRemove(e,id)}>remove</button>
}


export default RemoveButton