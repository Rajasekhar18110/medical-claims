import "./Accountpage.css"
import React, {
    useMemo,
    Component,
    useEffect,
    useState,
    useContext,
} from "react"
import {
    Row,
    Col,
    Container,
    Button,
    Form,
    FormGroup,
    Navbar,
    Table,
} from "react-bootstrap"

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useHistory,
    useNavigate,
} from "react-router-dom"
import { AuthContext } from "./Auth"

import { useDropzone } from "react-dropzone"

import "bootstrap/dist/css/bootstrap.min.css"
import "./Accountpage1.css"
//import Previews from "./Previews"

const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
}

const focusedStyle = {
    borderColor: "#2196f3",
}

const acceptStyle = {
    borderColor: "#00e676",
}

const rejectStyle = {
    borderColor: "#ff1744",
}

function Accountpage1() {
    const { currentUser } = useContext(AuthContext)
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        acceptedFiles,
        fileRejections,
    } = useDropzone({ accept: "image/*" })

    const style = useMemo(
        () => ({
            ...baseStyle,
            ...(isFocused ? focusedStyle : {}),
            ...(isDragAccept ? acceptStyle : {}),
            ...(isDragReject ? rejectStyle : {}),
        }),
        [isFocused, isDragAccept, isDragReject]
    )
    // const [files, setFiles] = useState([])

    const acceptedFileItems = acceptedFiles.map((file, index) => (
        <li key={file.path}>
            {typeof file} {file.path} -{" "}
            <a href={URL.createObjectURL(file)} target="_blank">
                {file.path}
            </a>
            {console.log(file)}
        </li>
        //setimge({ ...imge, name : file.name })
        //setimge({ ...imge, url : URL.createObjectURL(file) })

        //imge["url"]=URL.createObjectURL(file);
    ))

    // const fileaccepted = (e) => {
    //     var fls = acceptedFiles
    //     console.log(fls)
    //     for (var i = 0; i < fls.length; i++) {
    //         var obj = {}
    //         obj["name"] = fls[i].name
    //         obj["url"] = URL.createObjectURL(fls[i])
    //         console.log(obj)
    //         files.push(obj)
    //         console.log("every step files")
    //         console.log(files)
    //         setFiles(files)
    //         //setimge({ name: "", url: "" })
    //         //setFiles(files)
    //         //setimg({ name: "", url: "" })
    //     }
    //     // document.getElementById("formFileMultiple").value = "";
    //     console.log(files)
    //     setFiles(files)
    //     console.log("ab dekh")
    //     console.log(files)
    // }

    const fileRejectionItems = fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
            <ul>
                {errors.map((e) => (
                    <li key={e.code}>{e.message}</li>
                ))}
            </ul>
        </li>
    ))

    const navigate = useNavigate()

    const [responses1, setResponses1] = useState([])
    const [responses2, setResponses2] = useState([])
    const [date, setDate] = useState([])

    const [row1, setRow1] = useState({
        sno1: "",
        medicine: "",
        price1: "",
    })

    const [row2, setRow2] = useState({
        sno2: "",
        test: "",
        price2: "",
    })

    const handleChange1 = (e) => {
        const name = e.target.name
        const value = e.target.value
        setRow1({ ...row1, [name]: value })
        //console.log(row);
    }

    const handleChange2 = (e) => {
        const name = e.target.name
        const value = e.target.value
        setRow2({ ...row2, [name]: value })
        //console.log(row);
    }

    const handleSubmit1 = (e) => {
        e.preventDefault()
        responses1.push(row1)
        setResponses1(responses1)
        setRow1({ sno1: "", medicine: "", price1: "" })
    }

    const handleSubmit2 = (e) => {
        e.preventDefault()
        responses2.push(row2)
        setResponses2(responses2)
        setRow2({ sno2: "", test: "", price2: "" })
    }

    const saveit = async (e) => {
        e.preventDefault()

        const formData = new FormData()

        for (var i = 0; i < acceptedFiles.length; i++) {
            formData.append("myfiles", acceptedFiles[i])
        }
        formData.append("email", currentUser.email)

        for (const [key, value] of formData) {
            console.log(`key: ${key}`)
            console.log(`value: ${value}`)
        }

        const user = {
            email: "",
            page_no: "",
            medicines: "",
            test: "",
            date: "",
            imgs: "",
        }
        user["medicines"] = responses1
        user["test"] = responses2
        user["date"] = date
        user["email"] = currentUser.email
        user["page_no"] = 4
        // user["imgs"] = files

        setDate(null)
        setResponses1([])
        setResponses2([])

        const application_id = -1

        const res = await fetch("/check_user", {
            method: "POST",
            body: JSON.stringify({ user }),
            headers: { "Content-Type": "application/json" },
        }).then(
            fetch("/send_images", {
                method: "POST",
                body: formData,
                mode: "no-cors",
            })
                .then((response) => response.json())
                .then((result) => {
                    console.log("Success:", result)
                })
                .catch((error) => {
                    console.error("Error:", error)
                })
        )

        navigate("./Application")
    }
    return (
        <>
            <Container>
                <div class="container">
                    <nav class="navbar fixed-top navbar-expand-Ig navbar-dark bg-dark"></nav>
                </div>
                <Container>
                    <br></br>
                    <br></br>
                    <div className="acc-section">
                        <h2
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            (PART A- For Outdoor Patients, OPD)
                        </h2>
                        <h4
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <u>Declaration</u>
                        </h4>
                        <br />
                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                label="I am solely responsible for any discrepancy if found in the incurred bill or if the statement is found to be incorrect in respect of following medicines/ tests:-"
                            />
                        </Form.Group>
                        <br></br>
                        <form>
                            <input
                                type="text"
                                placeholder="S.no"
                                name="sno1"
                                value={row1.sno1}
                                onChange={handleChange1}
                            />
                            <input
                                type="text"
                                placeholder="Medicine Name"
                                name="medicine"
                                value={row1.medicine}
                                onChange={handleChange1}
                            />
                            <input
                                type="text"
                                placeholder="Price"
                                name="price1"
                                value={row1.price1}
                                onChange={handleChange1}
                            />
                            <button type="submit" onClick={handleSubmit1}>
                                Insert row
                            </button>
                        </form>
                        <br></br>
                        <table id="table1" responsive="sm">
                            <thead>
                                <tr>
                                    <th>S.NO</th>
                                    <th>
                                        Name of Medicine(s) (attach extra sheet
                                        of require)
                                    </th>
                                    <th>Price(Rs.)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {responses1.map((response) => (
                                    <tr>
                                        <td>{response.sno1}</td>
                                        <td>{response.medicine}</td>
                                        <td>{response.price1}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <br></br>
                        <br></br>
                        <form>
                            <input
                                type="text"
                                placeholder="S.no"
                                name="sno2"
                                value={row2.sno2}
                                onChange={handleChange2}
                            />
                            <input
                                type="text"
                                placeholder="Test Name"
                                name="test"
                                value={row2.test}
                                onChange={handleChange2}
                            />
                            <input
                                type="text"
                                placeholder="Price"
                                name="price2"
                                value={row2.price2}
                                onChange={handleChange2}
                            />
                            <button type="submit" onClick={handleSubmit2}>
                                Insert row
                            </button>
                        </form>
                        <br></br>
                        <table id="table2" responsive="sm">
                            <thead>
                                <tr>
                                    <th>S.NO</th>
                                    <th>
                                        Name of Medicine(s) (attach extra sheet
                                        of require)
                                    </th>
                                    <th>Price(Rs.)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {responses2.map((response) => (
                                    <tr>
                                        <td>{response.sno2}</td>
                                        <td>{response.test}</td>
                                        <td>{response.price2}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br></br>
                        <br></br>
                        <h5>
                            <b>
                                <i>PLEASE ATTACH YOUR MEDICAL BILLS HERE</i>
                            </b>
                        </h5>
                        <div className="container">
                            <div {...getRootProps({ style })}>
                                <input {...getInputProps()} />
                                <p>
                                    Drag 'n' drop some files here, or click to
                                    select files
                                </p>
                            </div>
                            <aside>
                                <h4>Accepted files</h4>
                                <ul>{acceptedFileItems}</ul>
                                <h4>Rejected files</h4>
                                <ul>{fileRejectionItems}</ul>
                            </aside>
                        </div>
                        <Form.Label column sm="2">
                            <Form.Control
                                size="sm"
                                type="Date"
                                placeholder="Date"
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Form.Label>

                        <Form.Group>
                            <Form.Check
                                type="checkbox"
                                label="It is certified that the patient has purchased the medicines as per the prescription of the treating doctor."
                            />
                        </Form.Group>
                        <br />
                        <br></br>
                    </div>

                    <br />

                    <Link to="./Application">
                        <Button type="button" onClick={saveit}>
                            Submit
                        </Button>
                    </Link>
                </Container>
            </Container>
            <div class="footer">
                <h6 id="copyright">
                    <b>Copyright &#169; 2022, IIT ROPAR</b>
                </h6>
            </div>
        </>
    )
}
export default Accountpage1
