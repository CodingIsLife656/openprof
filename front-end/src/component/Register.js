import React, { useState } from 'react'
import Card from 'react-bootstrap/esm/Card';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import { Form, useNavigate } from 'react-router-dom';
import './register.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios'
import { toast } from 'react-toastify'

// const resolveAfter3Sec = new Promise((resolve,rej) => setTimeout(resolve
//     , 3000));
// const rejectAfter3sec = new Promise((rej,resolve)=>setTimeout(resolve,3000))
const Register = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [dob, setDob] = useState("")
    const [phone, setPhone] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:5000/v1/api/register", {
                firstName,
                lastName,
                email,
                age,
                dob,
                phone
            }, {
                withCredentials: false,
                headers: { "Content-Type": "application/json" }
            })

            toast.promise(
                new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        resolve()
                    },1000)
                }), {
                pending: 'loading',
                success: data.message,
                error: 'Promise rejected 🤯'
            }
            );
            setFirstName("");
            setLastName("");
            setEmail("");
            setAge("");
            setDob("");
            setPhone("")
            navigate('/getall')
        } catch (error) {
            toast.promise(
                new Promise((resolve,reject)=>{
                    setTimeout(()=>{
                        reject()
                    },2000)
                }), {
                pending: 'loading',
                success: 'Promise resolved 👌',
                error: error.response.data.message
            }
            );
        }


    }
    return (
        <>
            {/* <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the
                        bulk of the card's content.
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
            </Card> */}

            <div className='container'>
                {/* <div className='row'> */}
                {/* <div className='card col-sm-6 shadow px-5'> */}
                <form onSubmit={handleSubmit} className=' d-flex flex-column form px-5'>
                    <div className='form-group py-3'>
                        <input type='text' className='form-control' value={firstName} placeholder='FirstName' onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className='form-group py-3'>
                        <input type='text' className='form-control' placeholder='Lastname' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className='form-group py-3'>

                        <input type='text' className='form-control' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='form-group py-3'>

                        <input type='text' className='form-control' placeholder='AGE' value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className='form-group py-3'>

                        <DatePicker placeholderText="DOB" className='form-control' selected={dob} onChange={(date) => setDob(date)} />
                        {/* <input type='text' className='form-control' placeholder='DOB' value={dob} onChange={(e) => setDob(e.target.value)} /> */}
                    </div>
                    <div className=' form-group py-3'>

                        <input placeholder='Phone' className='form-control' type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <button type='submit' className='btn btn-primary'>register</button>
                </form>

                {/* <div className='row'>
                    <div className='col-md-4'>
                        <div className='card'>
                            hdgckhas
                        </div>
                    </div>
                   </div>  */}
                {/* </div> */}
                {/* </div> */}
            </div>
        </>
    )
}

export default Register
