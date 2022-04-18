import React, { Component, useState, useContext } from "react"

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useHistory,
    useNavigate,
} from "react-router-dom"
import { AuthContext } from "./Auth"
import "bootstrap/dist/css/bootstrap.min.css"

import {
    Button,
    Container,
    Form,
    Row,
    Col,
    FormGroup,
    Navbar,
} from "react-bootstrap"

function Page3() {
    const { currentUser } = useContext(AuthContext)

    const navigate = useNavigate()
    const [user, setUser] = useState({
        page_no: "",
        name: "",
        email: "",
        numDateCon: "",
        amountClaimed: "",
        lessAdvTaken: "",
        netAmntClaimed: "",
        lstOfEncl: "",
        date: "",
    })
    const saveit = async (e) => {
        e.preventDefault()
        user["email"] = currentUser.email
        user["page_no"] = 3
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
                numDateCon: "",
                amountClaimed: "",
                lessAdvTaken: "",
                netAmntClaimed: "",
                lstOfEncl: "",
                date: "",
            })

            navigate("./Accountpage1")
        }
    }

    return (
        <div>
            <Container>
                <h2>(ii) Consultation with Specialist</h2>
                <br />
                <Container>
                    <strong>
                        Fee paid to specialist or a medical office other than
                        the authorised medical attendant indicating
                    </strong>
                    <Form>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                (a) the name & designation of the Specialist or
                                Medical Officer consulted and the hospital to
                                which attached
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control
                                    as="textarea"
                                    name="user[name]"
                                    value={user.name}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            name: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                (b) Number & dates of consultation and the fees
                                paid for each consultation
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control
                                    as="textarea"
                                    name="user[numDateCon]"
                                    value={user.numDateCon}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            numDateCon: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                Total amount claimed
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control
                                    type="text"
                                    name="user[amountClaimed]"
                                    value={user.amountClaimed}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            amountClaimed: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                Less advance taken
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control
                                    type="text"
                                    name="user[lessAdvTaken]"
                                    value={user.lessAdvTaken}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            lessAdvTaken: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                Net amount claimed
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control
                                    type="text"
                                    name="user[netAmntClaimed]"
                                    value={user.netAmntClaimed}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            netAmntClaimed: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                List of enclosures
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control
                                    type="text"
                                    name="user[lstOfEncl]"
                                    value={user.lstOfEncl}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            lstOfEncl: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Form.Label column sm="5">
                                Date
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control
                                    type="Date"
                                    name="user[date]"
                                    value={user.date}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            date: e.target.value,
                                        })
                                    }
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                label="It is certified that, I am employed at IIT Ropar and I am not availing the medical facilities or financial / medical allowances
                          in lieu thereof either of myself / of the members of my family from any (other) source. I hereby declare that the statements in 
                          the application are true to the best of my knowledge and belief and that the person for whom medical expenses were incurred is 
                          wholly dependent upon me. I will be solely responsible for this. "
                            />
                        </Form.Group>

                        <br />
                        <Link to="./Accountpage1">
                            <Button type="button" onClick={saveit}>
                                Next
                            </Button>
                        </Link>
                    </Form>
                </Container>
            </Container>
        </div>
    )
}

export default Page3
