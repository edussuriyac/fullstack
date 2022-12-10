import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)

  // const [show, setShow] = useState(false)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  console.log(notification)
  if(notification[0]===null  || notification.length===0){
    return null
    }
    return (
      <div style={style}>
        {notification}
      </div>
    )
   
}

export default Notification