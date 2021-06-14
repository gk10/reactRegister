import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from "react";
import * as B from 'react-bootstrap'
import * as I from 'react-bootstrap-icons'

const axios = require('axios').default;

const Register = () => {

    // const fName = req.body.fName;
    // const lName = req.body.lName;
    // const npi = parseInt(req.body.npi);
    // const bAddr = req.body.bAddr;
    // const pNumber = req.body.pNumber;
    // const email = req.body.mail;
    const [data, setData] = useState({
        first: "",
        last: "",
        email: "",
        npi: "",
        bAddr: "",
        pNumber: "",

    })

    const handle = (e) => {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
    }

    const submit = (e) => {
        e.preventDefault()
        postSomething(data.first, data.last, data.npi, data.bAddr, data.pNumber, data.email);
    }


    return (
        <div class="col text-center">
            <h1>Register</h1>
            <form onSubmit={(e) => submit(e)}>
                <div class="form-group">
                    <input onChange={(e) => handle(e)} id="first" value={data.first} placeholder="First name"
                           type="text"></input>

                </div>
                <div className="form-group">
                <input onChange={(e) => handle(e)} id="last" value={data.last} placeholder="Last name"
                       type="text"></input>
                </div>

                <div className="form-group">
                    <input onChange={(e) => handle(e)} id="npi" value={data.npi} placeholder="NPI" type="text"></input>
                </div>
                <div className="form-group">
                    <input onChange={(e) => handle(e)} id="bAddr" value={data.bAddr} placeholder="Address"
                           type="text"></input>
                </div>
                <div className="form-group">
                    <input onChange={(e) => handle(e)} id="pNumber" value={data.pNumber} placeholder="Phone #"
                           type="text"></input>
                </div>
                <div className="form-group">
                    <input onChange={(e) => handle(e)} id="email" value={data.email} placeholder="Email"
                           type="email"></input>
                </div>

                <button>Submit <I.CheckLg/></button>
            </form>
        </div>
    )
}

const getSomething = (id) => {

    return axios.get('http://localhost:3001/',
        {
            params: {
                name: id,
            }
        })
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error)
        })
}

export const postSomething = (fName, lName, npi, bAddr, pNumber, email) => {
    // const fName = req.body.fName;
    // const lName = req.body.lName;
    // const npi = parseInt(req.body.npi);
    // const bAddr = req.body.bAddr;
    // const pNumber = req.body.pNumber;
    // const email = req.body.mail;
    return axios.post('http://localhost:3001/registering',
        {
            fName: fName,
            lName: lName,
            npi: npi,
            bAddr: bAddr,
            pNumber: pNumber,
            mail: email,

        })
        .then((response) => {
            console.log(response)
        })
        .catch((error) => {
            console.log(error)
        })
}

export default Register;