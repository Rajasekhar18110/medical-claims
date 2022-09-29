import React from "react"
import { useNavigate } from "react-router-dom"
import {
    Row,
    Col,
    Container,
    Button,
    Form,
    FormGroup,
    Navbar,
} from "react-bootstrap"

const Instructions = () => {
    const navigate = useNavigate()

    const handleRoute = () => {
        navigate(-1)
    }
    return (
        <div
            style={{
                marginLeft: "100px",
                marginRight: "40px",
                marginTop: "100PX",
            }}
        >
            <div>
                <h2>Import instructions for users :-</h2>
                <p style={{ fontSize: "18px" }}>
                    1. A user has to{" "}
                    <b style={{ color: "red" }}>
                        submit an original hard copy of all bills and receipts
                        in the account section{" "}
                    </b>{" "}
                    that you uploaded/submitted in the online medical
                    reimbursement form ,only after that your application can be
                    verified by the account section.
                </p>
            </div>

            <div>
                <h1>Hierarchy of application -</h1>
                <p style={{ fontSize: "15px" }}>
                    After filling the application by user, for its complete
                    verification it needs to be verified by all the following
                    persons in the given below manner.
                </p>
                <h2>
                    1. Pharmacist
                    <br />
                    2. Medical officer
                    <br />
                    3. Account Section /DA/JAO
                    <br />
                    4. AO/AR
                    <br />
                    5. Sr AO (only if claimed amount {">"}=50,000)
                    <br />
                    6. Registrar
                    <br />
                    7. Director (only if allowed amount {">"}=2,00,000)
                </h2>
            </div>

            <div>
                <h1>
                    Note: your application will be called completely verified
                    only if-
                </h1>
                <h2>
                    1. The Registrar verifies that application, and the allowed
                    amount {"<"}2,00,000.
                </h2>
                <h2>
                    2. The allowed amount {">"}=2,00,000 then the Director also
                    has to verified.
                </h2>
            </div>
            <br></br>
            <br></br>

            <Button onClick={handleRoute} type="button">
                Return to Home
            </Button>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
}

export default Instructions
