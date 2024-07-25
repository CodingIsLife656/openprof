import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/esm/Table';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



const Alluser = () => {


    const navigate = useNavigate();
    const [user, setUser] = useState([])
    useEffect(() => {

        const fetchuser = async () => {
            const res = await fetch("http://localhost:5000/v1/api/getall")
            const data = await res.json();
            setUser(data.User)
            console.log(data.User)
        }
        fetchuser();
    }, [])

    const handleDelete = async (id) => {
        console.log(id)

        const confirm = window.confirm("delete?")
        if (confirm) {
            const { data } = await axios.delete(`http://localhost:5000/v1/api/delete/` + id)
            toast.promise(new Promise((resolve)=>{
                setTimeout(() => {
                    resolve();
                }, 1000)
            }),{
                pending:"loading",
                success:data.message
            })
            navigate('/')
        }

    }
    // const handleEdit = () => {
    //     navigate('/update/:id')
    // }
    // const handleEdit=async()=>{
    //     await axios.put(`http://localhost:5000/v1/api/update/${id}`,{
    //         firstName,
    //             lastName,
    //             email,
    //             age,
    //             dob,
    //             phone
    //     })
    // }


    return (

        <div className='container'>
            <div className='row'>
                <div className='col-sm-12 mt-5'>
                    <Table className='col-md-6 table1'>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>email</th>
                                <th>age</th>
                                <th>dob</th>
                                <th>phone</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map((raw, i) => (
                                    <tr key={i}>
                                        <td>{raw.firstName}</td>
                                        <td>{raw.email}</td>
                                        <td>{raw.age}</td>
                                        <td>{raw.dob}</td>
                                        <td>{raw.phone}</td>
                                        <td>
                                            <Link to={`/update/${raw._id}`}>
                                                <FaEdit className='mx-2' />
                                            </Link>
                                            <AiFillDelete onClick={() => handleDelete(raw._id)} className='mx-2' />
                                        </td>
                                    </tr>

                                ))
                            }

                            {/* {
                            data.map((raw, index)=>(
                                    <tr key={index}>
                                        <td>{raw.firstName}</td>
                                        <td>{raw.email}</td>
                                    </tr>
                                ))} */}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>

    )
}

export default Alluser
