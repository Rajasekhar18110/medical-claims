import React, { useContext } from "react"

import { AuthContext } from "./Auth"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }) => {
    const { currentUser } = useContext(AuthContext)

    return currentUser ? children : <Navigate to="/" />
}

export default PrivateRoute
