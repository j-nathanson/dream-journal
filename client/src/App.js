import React from "react"
import './style/index.scss'
import Router from "./Router"
import axios from "axios"
import { AuthContextProvider } from "./context/AuthContext"


// set axios requests to send the cookie
axios.defaults.withCredentials = true

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  )
}

export default App