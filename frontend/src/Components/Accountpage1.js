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
import { storage } from "./firebase"
import { ref, uploadBytes, uploadBytesResumable } from "firebase/storage"
import { getDownloadURL } from "firebase/storage"

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

    const acceptedFileItems = acceptedFiles.map((file, index) => (
        <li key={file.path}>
            {file.path} -{" "}
            <a href={URL.createObjectURL(file)} target="_blank">
                {file.path}
            </a>
        </li>
    ))

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
    const [urls, setUrls] = useState([])
    const [alrt, setAlert] = useState(false)
    const [progress, setProgress] = useState(0)

    const [row1, setRow1] = useState({
        medicine: "",
        price1: "",
    })

    const [row2, setRow2] = useState({
        test: "",
        price2: "",
    })

    const [edit_tab1, setTab1] = useState({
        s_no1: "",
        medicine1: "",
        price_1: "",
    })

    const [edit_tab2, setTab2] = useState({
        s_no2: "",
        test1: "",
        price_2: "",
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

    const handleChange3 = (e) => {
        const name = e.target.name
        const value = e.target.value
        setTab1({ ...edit_tab1, [name]: value })
    }

    const handleChange4 = (e) => {
        const name = e.target.name
        const value = e.target.value
        setTab2({ ...edit_tab2, [name]: value })
    }

    const handleSubmit1 = (e) => {
        e.preventDefault()
        responses1.push(row1)
        setResponses1(responses1)
        setRow1({ medicine: "", price1: "" })
    }

    const handleSubmit2 = (e) => {
        e.preventDefault()
        responses2.push(row2)
        setResponses2(responses2)
        setRow2({ test: "", price2: "" })
    }

    const handleSubmit3 = (e) => {
        e.preventDefault()

        if (edit_tab1["s_no1"] <= responses1.length) {
            responses1[edit_tab1["s_no1"] - 1]["medicine"] =
                edit_tab1["medicine1"]
            responses1[edit_tab1["s_no1"] - 1]["price1"] = edit_tab1["price_1"]
            setResponses1(responses1)
            setTab1({ s_no1: "", medicine1: "", price_1: "" })
        } else {
            alert("Please enter a valid row number to edit (Medicine table)!!")
        }
    }

    const handleSubmit4 = (e) => {
        e.preventDefault()

        if (edit_tab2["s_no2"] <= responses2.length) {
            responses2[edit_tab2["s_no2"] - 1]["test"] = edit_tab2["test1"]
            responses2[edit_tab2["s_no2"] - 1]["price2"] = edit_tab2["price_2"]
            setResponses2(responses2)
            setTab2({ s_no2: "", test1: "", price_2: "" })
        } else {
            alert(
                "Please enter a valid row number to edit (Medical-Test table)!!"
            )
        }
    }

    const saveit = async (e) => {
        e.preventDefault()

        const user = {
            email: "",
            page_no: "",
            medicines: "",
            test: "",
            date: "",
            imgs: [],
        }
        user["medicines"] = responses1
        user["test"] = responses2
        user["date"] = date
        user["email"] = currentUser.email
        user["page_no"] = 4
        user["imgs"] = urls

        if (urls.length == 0 && !alrt) {
            alert(
                "You have not uploaded any images for medical bills, are you sure you want to go to the next page?"
            )
            setAlert(true)
            return
        }

        setDate(null)
        setResponses1([])
        setResponses2([])

        const res = await fetch(
            "https://medical-claims2.herokuapp.com/check_user",
            {
                method: "POST",
                body: JSON.stringify({ user }),
                headers: { "Content-Type": "application/json" },
            }
        )

        navigate("./Application")
    }

    const handleupload = async () => {
        const email = currentUser.email
        const id = await fetch(
            "https://medical-claims2.herokuapp.com/get_application_id",
            {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: { "Content-Type": "application/json" },
            }
        )

        const result_json = await id.json()

        const promises = []
        acceptedFiles.map((image, index) => {
            const img = { name: "", url: "" }
            const storageRef = ref(
                storage,
                `${result_json["id"]}/${image.name}`
            )
            img["name"] = image.name

            const uploadTask = uploadBytesResumable(storageRef, image)
            promises.push(uploadTask)

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    )
                    setProgress(progress)
                },

                (error) => {
                    console.log(error)
                },

                async () => {
                    await getDownloadURL(storageRef).then((url) => {
                        console.log(url)
                        img["url"] = url
                        setUrls((prevState) => [...prevState, img])
                    })
                }
            )
        })

        Promise.all(promises).then(() => alert("All images uploaded!!"))
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
                                    <th>Name of Medicine(s)</th>
                                    <th>Price(Rs.)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {responses1.map((response, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{response.medicine}</td>
                                        <td>{response.price1}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <br></br>
                        <h4>edit a row</h4>
                        <br />
                        <form>
                            <input
                                type="text"
                                placeholder="S.no"
                                name="s_no1"
                                value={edit_tab1.s_no1}
                                onChange={handleChange3}
                            />
                            <input
                                type="text"
                                placeholder="Medicine Name"
                                name="medicine1"
                                value={edit_tab1.medicine1}
                                onChange={handleChange3}
                            />
                            <input
                                type="text"
                                placeholder="Price"
                                name="price_1"
                                value={edit_tab1.price_1}
                                onChange={handleChange3}
                            />
                            <button type="submit" onClick={handleSubmit3}>
                                Edit
                            </button>
                        </form>

                        <br></br>
                        <br></br>
                        <form>
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
                                    <th>Name of Test(s)</th>
                                    <th>Price(Rs.)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {responses2.map((response, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{response.test}</td>
                                        <td>{response.price2}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <br></br>

                        <h4>edit a row</h4>
                        <form>
                            <input
                                type="text"
                                placeholder="S.no"
                                name="s_no2"
                                value={edit_tab2.s_no2}
                                onChange={handleChange4}
                            />
                            <input
                                type="text"
                                placeholder="Test Name"
                                name="test1"
                                value={edit_tab2.test1}
                                onChange={handleChange4}
                            />
                            <input
                                type="text"
                                placeholder="Price"
                                name="price_2"
                                value={edit_tab2.price_2}
                                onChange={handleChange4}
                            />
                            <button type="submit" onClick={handleSubmit4}>
                                Edit
                            </button>
                        </form>

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
                                <button onClick={handleupload}>upload</button>
                            </aside>
                        </div>
                        <br></br>
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
