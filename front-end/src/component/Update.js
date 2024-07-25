import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const Update = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [values, setvalues] = useState({
        id: id,
        firstName: '',
        lastName: '',
        email: '',
        dob: '',
        age: '',
        phone: '',
    })

    useEffect(() => {

        fetchuser()
    }, [])
    const fetchuser = async () => {
        const { data } = await axios.get('http://localhost:5000/v1/api/getid/' + id)
        setvalues({
            ...values, firstName: data.userId.firstName, lastName: data.userId.lastName,
            email: data.userId.email,
            age: data.userId.age,
            phone: data.userId.phone,
            dob: data.userId.dob,
        })
        //  console.log(data.userId.firstName);
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const { data } = await axios.put(`http://localhost:5000/v1/api/update/${id}`, {
                ...values
            })
            toast.promise(new Promise((resolve) => {
                setTimeout(() => {
                    resolve()
                }, 1000)
            }),
                {
                    pending: "loading",
                    success: data.message
                })
            navigate('/getall')
        } catch (error) {
            toast.promise(new Promise((resolve,reject)=>{
                setTimeout(() => {
                    reject()
                }, 1000);
            }),{
                pending:"loading",
                error:error.response.data.message
            })

        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit} className=' d-flex flex-column form px-5'>
                <div className='form-group py-3'>
                    <input type='text' className='form-control' value={values.firstName} onChange={(e) => setvalues({ ...values, firstName: e.target.value })} placeholder='FirstName' />
                </div>
                <div className='form-group py-3'>
                    <input type='text' className='form-control' placeholder='Lastname' value={values.lastName} onChange={(e) => setvalues({ ...values, lastName: e.target.value })} />
                </div>
                <div className='form-group py-3'>
                    <input type='text' className='form-control' placeholder='Lastname' value={values.email} onChange={(e) => setvalues({ ...values, email: e.target.value })} />
                </div>
                <div className='form-group py-3'>
                    <input type='text' className='form-control' placeholder='Lastname' value={values.age} onChange={(e) => setvalues({ ...values, age: e.target.value })} />
                </div>
                <div className='form-group py-3'>
                    <input type='text' className='form-control' placeholder='Lastname' value={values.dob} onChange={(e) => setvalues({ ...values, dob: e.target.value })} />
                </div>
                <div className='form-group py-3'>
                    <input type='text' className='form-control' placeholder='Lastname' value={values.phone} onChange={(e) => setvalues({ ...values, firstName: e.target.value })} />
                </div>

                <button type='submit' className='btn btn-primary'>register</button>
            </form>
        </div>
    )
}

export default Update
