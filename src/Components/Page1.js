import React, { Component, useState, useContext } from "react"
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

const Page1 = () => {
    const { currentUser } = useContext(AuthContext)

    const navigate = useNavigate()
    const [user, setUser] = useState({
        page_no: "",
        name: "",
        email: "",
        martial_status: "",
        employee_code_no: "",
        pay: "",
        address: "",
        relation: "",
        place_fell_ill: "",
        ammount_details: "",
    })
    const saveit = async (e) => {
        e.preventDefault()
        user["email"] = currentUser.email
        user["page_no"] = 1
        const res = await fetch("/check_user", {
            method: "POST",
            body: JSON.stringify({ user }),
            headers: { "Content-Type": "application/json" },
        })

        if (res.ok) {
            console.log("RESPONSE WORKED1!")
            setUser({
                page_no: "",
                name: "",
                email: "",
                partner_place: "",
                martial_status: "",
                employee_code_no: "",
                pay: "",
                address: "",
                relation: "",
                place_fell_ill: "",
                ammount_details: "",
            })

            navigate("./Page2")
        }
    }

    return (
        <Container>
            <div class="container">
                <nav class="navbar fixed-top navbar-expand-Ig navbar-dark bg-dark">
                    <a class="navbar-brand" href="#"></a>
                </nav>
            </div>

            <div className="App-header">
                <br />
                <br />
                <h2>भारतीय प्रौद्योगिकी संस्थान रोपड़</h2>
                <h2>INDIAN INSTITUTE OF TECHNOLOGY ROPAR</h2>
                <h2>रूपनगर, पंजाब-140001, Rupnagar, Punjab-140001</h2>
                <h2>
                    Medical Claim Form - For Outdoor (Part A) /Indoor (Part B)
                    Treatment
                </h2>
                <h2>
                    ----------------------------------------------------------------------------------------------------
                </h2>
            </div>

            <div className="page1">
                <h2>
                    Form of application claiming reimbursement of medical
                    expenses incurred in connection with medical attendance
                    and/or treatment for self and family members/dependents.
                </h2>
                <Form>
                    <Form.Group as={Row} className="mb-3">
                        <Form.Label column sm="5">
                            1. Name & Designation of Govt. Servant (In Block
                            Letters) -
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                as="textarea"
                                name="user[name]"
                                value={user.name}
                                onChange={(e) =>
                                    setUser({ ...user, name: e.target.value })
                                }
                            />
                            {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                        </Col>
                        <Form.Label column sm="5">
                            (i) Whether married or unmarried -
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                as="textarea"
                                name="user[martial_status]"
                                value={user.martial_status}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        martial_status: e.target.value,
                                    })
                                }
                            />
                            {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                        </Col>
                        <Form.Label column sm="5">
                            (ii) If married, the place where wife / husband is
                            employed -
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                as="textarea"
                                name="user[partner_place]"
                                value={user.partner_place}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        partner_place: e.target.value,
                                    })
                                }
                            />
                            {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                        </Col>
                        <Form.Label column sm="5">
                            2. Employees Code No., Deptt/ Section -
                        </Form.Label>
                        <Form.Label column sm="7">
                            <Form.Control
                                as="textarea"
                                name="user[employee_code_no]"
                                value={user.employee_code_no}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        employee_code_no: e.target.value,
                                    })
                                }
                            />
                            {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                        </Form.Label>

                        <Form.Label column sm="5">
                            3. Pay of Govt. Servant (Band Pay & Grade Pay) -
                        </Form.Label>
                        <Form.Label column sm="7">
                            <Form.Control
                                as="textarea"
                                name="user[pay]"
                                value={user.pay}
                                onChange={(e) =>
                                    setUser({ ...user, pay: e.target.value })
                                }
                            />
                            {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                        </Form.Label>

                        <Form.Label column sm="5">
                            4. Residential address -
                        </Form.Label>
                        <Form.Label column sm="7">
                            <Form.Control
                                as="textarea"
                                name="user[address]"
                                value={user.address}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        address: e.target.value,
                                    })
                                }
                            />
                            {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                        </Form.Label>
                        <Form.Label column sm="5">
                            5. Name of the patient & his /her relationship with
                            the Government Servant (in case of Children state
                            age also) -
                        </Form.Label>
                        <Form.Label column sm="7">
                            <Form.Control
                                as="textarea"
                                name="user[relation]"
                                value={user.relation}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        relation: e.target.value,
                                    })
                                }
                            />
                            {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                        </Form.Label>

                        <Form.Label column sm="5">
                            6. Place at which the patient fell ill -
                        </Form.Label>
                        <Form.Label column sm="7">
                            <Form.Control
                                as="textarea"
                                name="user[place_fell_ill]"
                                value={user.place_fell_ill}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        place_fell_ill: e.target.value,
                                    })
                                }
                            />
                            {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                        </Form.Label>
                        <Form.Label column sm="5">
                            7. Details of the amount claimed -
                        </Form.Label>
                        <Form.Label column sm="7">
                            <Form.Control
                                as="textarea"
                                name="user[ammount_details]"
                                value={user.ammount_details}
                                onChange={(e) =>
                                    setUser({
                                        ...user,
                                        ammount_details: e.target.value,
                                    })
                                }
                            />
                            {/* {user.errors.name && <p>{user.errors.name}</p>} */}
                        </Form.Label>
                    </Form.Group>
                </Form>
            </div>

            <div>
                <Link to="./Page2">
                    <Button type="button" onClick={saveit}>
                        Next
                    </Button>
                </Link>
            </div>
        </Container>
    )
}
export default Page1
