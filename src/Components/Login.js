import React, { Component, useContext, useState } from "react"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useNavigate,
} from "react-router-dom"

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth"

import { Button, Form, FormGroup } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import logo from "./logo.png"
import "./Login.css"
// import { signInWithGoogle } from "./firebase"
import { AuthContext } from "./Auth"
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
} from "firebase/auth"
import { auth } from "./firebase"

import { Container, Row, Col, Alert, Breadcrumb, Card } from "react-bootstrap"

function Login() {
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")
    const navigate = useNavigate()

    const HandleEmailLogin = async () => {
        try {
            const userCredentials = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            )
            console.log("line72", userCredentials.user.email)
            console.log(userCredentials)
            const check = userCredentials.user.email
            const see = check.split("@")[1]

            const errorOrNOt =
                see !== "iitrpr.ac.in" &&
                check !== "pharmacistxyz901@gmail.com" &&
                check !== "medical.officer.901@gmail.com" &&
                check !== "tempusageww3@gmail.com" &&
                check !== "junioracc.xyz901@gmail.com" &&
                check !== "assessing.officer.901@gmail.com" &&
                check !== "senior.audit.901@gmail.com" &&
                check !== "registrar.officer.901@gmail.com"
            const isPharmacist = check === "pharmacistxyz901@gmail.com"
            const isMediOffi = check === "medical.officer.901@gmail.com"
            const isAccountSec = check === "tempusageww3@gmail.com"
            const isDAorJAOO = check === "junioracc.xyz901@gmail.com"
            const isAO = check === "assessing.officer.901@gmail.com"
            const isSrAO = check === "senior.audit.901@gmail.com"
            const isRegistrar = check === "registrar.officer.901@gmail.com"

            errorOrNOt
                ? navigate("/")
                : isPharmacist
                ? navigate("authority_Home")
                : isMediOffi
                ? navigate("Medical_officer")
                : isAccountSec
                ? navigate("AccountSection")
                : isDAorJAOO
                ? navigate("DAorJAO")
                : isAO
                ? navigate("AO")
                : isSrAO
                ? navigate("SrAO")
                : isRegistrar
                ? navigate("Registrar")
                : navigate("Home")
        } catch (error) {
            console.log(error.message)
        }
    }

    const provider = new GoogleAuthProvider()
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                //console.log(result);
                const name = result.user.displayName
                const email = result.user.email
                const profilePic = result.user.photoURL
                console.log("Name " + name)
                console.log("email " + email)
                console.log("profilePicURL " + profilePic)

                const check = email
                const see = check.split("@")[1]

                const errorOrNOt =
                    see !== "iitrpr.ac.in" &&
                    check !== "pharmacistxyz901@gmail.com" &&
                    check !== "medical.officer.901@gmail.com" &&
                    check !== "tempusageww3@gmail.com" &&
                    check !== "junioracc.xyz901@gmail.com" &&
                    check !== "assessing.officer.901@gmail.com" &&
                    check !== "senior.audit.901@gmail.com" &&
                    check !== "registrar.officer.901@gmail.com"
                const isPharmacist = check === "pharmacistxyz901@gmail.com"
                const isMediOffi = check === "medical.officer.901@gmail.com"
                const isAccountSec = check === "tempusageww3@gmail.com"
                const isDAorJAOO = check === "junioracc.xyz901@gmail.com"
                const isAO = check === "assessing.officer.901@gmail.com"
                const isSrAO = check === "senior.audit.901@gmail.com"
                const isRegistrar = check === "registrar.officer.901@gmail.com"

                errorOrNOt
                    ? navigate("/")
                    : isPharmacist
                    ? navigate("authority_Home")
                    : isMediOffi
                    ? navigate("Medical_officer")
                    : isAccountSec
                    ? navigate("AccountSection")
                    : isDAorJAOO
                    ? navigate("DAorJAO")
                    : isAO
                    ? navigate("AO")
                    : isSrAO
                    ? navigate("SrAO")
                    : isRegistrar
                    ? navigate("Registrar")
                    : navigate("Home")
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div>
            <div id="header">
                <img
                    src="http://www.iitrpr.ac.in/sites/default/files/image.jpg"
                    alt=""
                    id="logo"
                />
                <h1 id="iit_ropar">
                    <b>INDIAN INSTITUTE OF TECHNOLOGY ROPAR</b>
                </h1>
            </div>
            <div id="medical_claims">
                <h1 id="medical_claim_heading">
                    <b>Medical Claims</b>
                </h1>
            </div>
            <div id="navbar">
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
                    integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
                    crossorigin="anonymous"
                />
                <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                    crossorigin="anonymous"
                />
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbar"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbar">
                        <div class="navbar-nav">
                            <a
                                class="nav-item nav-link"
                                id="logout"
                                href="/logout"
                            >
                                Logout
                            </a>
                            <a
                                class="nav-item nav-link"
                                id="request_new_password"
                                href="/request_new_password"
                            >
                                Request new password
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
            <div id="center">
                <form id="fm">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <span style={{ color: "red" }}>*</span>

                        <input
                            type="email"
                            name="loginEmail"
                            class="form-control"
                            placeholder="Enter your institute email"
                            onChange={(event) => {
                                setLoginEmail(event.target.value)
                            }}
                        />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <span style={{ color: "red" }}>*</span>
                        <input
                            type="password"
                            name="loginPassword"
                            class="form-control"
                            placeholder="Password"
                            onChange={(event) => {
                                setLoginPassword(event.target.value)
                            }}
                        />
                    </div>
                    <Button onClick={HandleEmailLogin} type="button">
                        Login
                    </Button>
                    <br />

                    <button
                        onClick={signInWithGoogle}
                        className="login-with-google-btn"
                        type="button"
                    >
                        Sign In With Google
                    </button>

                    <br />
                    <br />

                    <Link to="/Signup">
                        <Button type="button">Signup</Button>
                    </Link>
                </form>
            </div>

            <div id="footer">
                <h6 id="copyright">
                    <b>Copyright &#169; 2022, IIT ROPAR</b>
                </h6>
            </div>
        </div>
    )
}

export default Login
