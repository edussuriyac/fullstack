// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'
const Notification = (props) => {
  const notification = props.notification

  // const [show, setShow] = useState(false)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notifications,
  }
}
// const mapDispatchToProps = {
//   notify,
//   modifyAnecdote
// }

export default connect( mapStateToProps, null)(Notification)