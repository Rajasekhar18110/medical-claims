import React, { Component, useEffect, useState, useContext } from "react"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useHistory,
    useNavigate,
} from "react-router-dom"

import { Button, Form, FormGroup } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { AuthContext } from "./Auth"
import "./Pharmacist.css"
//import { signInWithGoogle } from "./firebase"
import { Container, Row, Col, Alert, Breadcrumb, Card } from "react-bootstrap"
import ShowAllApplication from "./ShowAllApplication"

import { auth } from "./firebase"
import { signOut } from "firebase/auth"

function Pharmacist() {
    const { currentUser } = useContext(AuthContext)

    let user_data = {
        email: currentUser.email,
    }
    const [result_arr, setresult_arr] = useState([])

    const getApplicationId = async () => {
        const res = await fetch(
            "https://medical-claims2.herokuapp.com/getallApplicationId",
            {
                method: "POST",
                body: JSON.stringify({ user_data }),
                headers: { "Content-Type": "application/json" },
            }
        )

        const data = await res.json()
        console.log(data["result"])

        setresult_arr(data["result"])
    }
    useEffect(() => {
        getApplicationId()
    }, [])

    console.log(result_arr)

    let navigate = useNavigate()
    const handleLogout = () => {
        signOut(auth)
        navigate("/")
    }

    const gotoForgotPassword = () => {
        navigate("/forgotPassword")
    }
    return (
        <div>
            <div id="top_navbar">
                <div id="profilepic">
                    {" "}
                    <img src={currentUser.photoURL} alt=""></img>{" "}
                </div>
                <div id="name">{currentUser.displayName}</div>
                <div id="email">{currentUser.email}</div>
            </div>

            <div
                id="sidebar"
                class="d-flex flex-column  flex-shrink-0 p-3 text-white"
            >
                <a href="#" class="text-white text-decoration-none">
                    <h2 class="text_center">Menu</h2>
                </a>
                <br />
                <ul class="nav nav-pills flex-column mb-auto">
                    <li class="nav-item">
                        <a href="#" class="nav-link active" aria-current="page">
                            <i class="fa fa-home"></i>

                            <span class="ms-2 font_size_18">Home </span>
                        </a>
                    </li>

                    <Link
                        id="link_to_other_pages"
                        to="./Pharmacist_verified_applications"
                        style={{ textDecoration: "none" }}
                    >
                        <li>
                            <a href="#" class="nav-link text-white">
                                <i class="fa fa-first-order"></i>
                                <span class="ms-2 font_size_18">
                                    Verified Applications
                                </span>
                            </a>
                        </li>
                    </Link>

                    <li onClick={gotoForgotPassword}>
                        <a href="#" class="nav-link text-white">
                            <i class="fa fa-cog"></i>
                            <span class="ms-2 font_size_18">
                                Change Password
                            </span>
                        </a>
                    </li>
                    <li onClick={handleLogout}>
                        <a href="#" class="nav-link text-white">
                            <i class="fa fa-bookmark"></i>
                            <span class="ms-2 font_size_18">Logout</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div id="last_heading">
                <h4>Home > </h4>
                <h6>
                    (applications which need your approval will appear here)
                </h6>
            </div>
            <div className="application_list">
                {result_arr.map((id) => (
                    <div
                        className="application_id"
                        onClick={() => {
                            navigate("ShowApplicationTOPharmaMed/" + id)
                        }}
                    >
                        <Container>
                            <Row>
                                <h6>Application_id : {id}</h6>
                            </Row>
                        </Container>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pharmacist