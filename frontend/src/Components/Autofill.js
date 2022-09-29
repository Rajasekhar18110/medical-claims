import React, { Component, useEffect, useState, useContext } from "react"
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useNavigate,
} from "react-router-dom"
import { AuthContext } from "./Auth"
import {
    Row,
    Col,
    Container,
    Button,
    Form,
    FormGroup,
    Navbar,
} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Home.css"
import "./Autofill.css"

function Autofill() {
    const { currentUser } = useContext(AuthContext)

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        email: "",
        Mobile_number: "",
        partner_place: "",
        martial_status: "",
        employee_code_no: "",
        pay: "",
        address: "",
        relation: "",
        place_fell_ill: "",
        ammount_details: "",
    })

    const getBasicDetails = async () => {
        user["email"] = currentUser.email

        const res2 = await fetch(
            "https://medical-claims2.herokuapp.com/getbasicDetails",
            {
                method: "POST",
                body: JSON.stringify({ user }),
                headers: { "Content-Type": "application/json" },
            }
        )

        const result_json = await res2.json()
        setUser(result_json["result"]["user"])
        console.log("line 59", result_json["result"])
        console.log("line 60", result_json["result"]["user"])
    }

    useEffect(() => {
        getBasicDetails()
    }, [])

    const saveBasicDetails = async (e) => {
        e.preventDefault()
        user["email"] = currentUser.email

        const res = await fetch(
            "https://medical-claims2.herokuapp.com/basicDetails",
            {
                method: "POST",
                body: JSON.stringify({ user }),
                headers: { "Content-Type": "application/json" },
            }
        )

        if (res.ok) {
            console.log("RESPONSE WORKED1!")
            setUser({
                name: "",
                email: "",
                Mobile_number: "",
                partner_place: "",
                martial_status: "",
                employee_code_no: "",
                pay: "",
                address: "",
                relation: "",
                place_fell_ill: "",
                ammount_details: "",
            })

            navigate("/Home")
        }
    }
    return (
        <div>
            <br />
            <br />

            <div class="heading">
                <h3>Autofill these common details for all applications</h3>
                <p>
                    Note: If you want to leave any field blank, Type '-' without
                    quotes
                </p>
            </div>
            <br />
            <br />

            <div class="basic">
                <Container class="center basic">
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                1. Name & Designation of Govt. Servant (In Block
                                Letters) -
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control
                                    as="textarea"
                                    name="name"
                                    defaultValue={user.name}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                (i) Whether married or unmarried -
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control
                                    as="textarea"
                                    name="martial_status"
                                    defaultValue={user.martial_status}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            martial_status: e.target.value,
                                        })
                                    }
                                />
                                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                (ii) If married, the place where wife / husband
                                is employed -
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control
                                    as="textarea"
                                    name="partner_place"
                                    defaultValue={user.partner_place}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            partner_place: e.target.value,
                                        })
                                    }
                                />
                                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                2. Mobile number
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control
                                    as="textarea"
                                    name="Mobile_number"
                                    defaultValue={user.Mobile_number}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            Mobile_number: e.target.value,
                                        })
                                    }
                                />
                                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                3. Employees Code No., Deptt/ Section -
                            </Form.Label>
                            <Form.Label column sm="7">
                                <Form.Control
                                    as="textarea"
                                    name="employee_code_no"
                                    defaultValue={user.employee_code_no}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            employee_code_no: e.target.value,
                                        })
                                    }
                                />
                                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                            </Form.Label>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                4. Pay of Govt. Servant (Band Pay & Grade Pay) -
                            </Form.Label>
                            <Form.Label column sm="7">
                                <Form.Control
                                    as="textarea"
                                    name="pay"
                                    defaultValue={user.pay}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            pay: e.target.value,
                                        })
                                    }
                                />
                                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                            </Form.Label>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                5. Residential address -
                            </Form.Label>
                            <Form.Label column sm="7">
                                <Form.Control
                                    as="textarea"
                                    name="address"
                                    defaultValue={user.address}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            address: e.target.value,
                                        })
                                    }
                                />
                                {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                            </Form.Label>
                        </Form.Group>
                        <br />
                        <div class="heading">
                            <Button type="button" onClick={saveBasicDetails}>
                                Save
                            </Button>
                        </div>
                    </Form>
                </Container>
            </div>
        </div>
    )
}

export default Autofill
