import { useSelector } from "react-redux"

const Notification = () => {
  const message = useSelector((state) => state.notification)
  if (message === undefined || message === null || message.length === 0) {
    return null
  } else if (message.type === "alert") {
    return <div className="error">{message.message}</div>
  }

  return (
    <div class="alert alert-primary" role="alert">
      {message.message}
    </div>
  )
}

export default Notification
