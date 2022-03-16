import React from "react"
import Router from "./Router"
import axios from "axios"

// set axios requests to send the cookie
axios.defaults.withCredentials = true

console.log(axios.defaults)
function App() {
  return <Router />
}

export default App