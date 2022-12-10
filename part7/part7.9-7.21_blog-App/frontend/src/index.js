import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import { configureStore } from "@reduxjs/toolkit"
import blogReducer from "./reducers/blogReducer"
import notificationReducer from "./reducers/notificationReducer"
import loggedBlogAppUserReducer from "./reducers/loggedBlogAppUserReducer"
import commentReducer from "./reducers/commentReducer"
import "./index.css"
import userReducer from "./reducers/userReducer"
const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    loggedInUser: loggedBlogAppUserReducer,
    users: userReducer,
    comments: commentReducer
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
)
