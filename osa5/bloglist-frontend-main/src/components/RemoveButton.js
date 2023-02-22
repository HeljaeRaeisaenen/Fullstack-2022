
const RemoveButton = ({ id, blogTitle, loggedUser, blogUser, handleRemove }) => {
  if (loggedUser !== blogUser) return <></>
  return <button id={id} onClick={(e) => handleRemove(e,id, blogTitle)}>remove</button>
}


export default RemoveButton