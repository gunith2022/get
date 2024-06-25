// // 
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import validation from './SignupValidation';
// import axios from 'axios';

// function Signup() {
//     const [values, setValues] = useState({
//         fullname: '',
//         rollno: '',
//         email: '',
//         password: ''
//     });

//     const [errors, setErrors] = useState({});

//     const handleInput = (event) => {
//         setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         const validationErrors = validation(values);
//         setErrors(validationErrors);

//         // Check if there are no validation errors
//         if (Object.keys(validationErrors).length === 0) {
//             try {
//                 const res = await axios.post('http://localhost:3307/signup', values);
//                 console.log('Response:', res);
//                 // Optionally, redirect user to another page after successful signup
//             } catch (err) {
//                 console.error('Signup error:', err);
//                 // Handle specific errors if needed
//             }
//         }
//     };

//     return (
//         <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
//             <div className='bg-white p-3 rounded w-25'>
//                 <h2>Sign Up</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className='mb-3'>
//                         <label htmlFor='fullname'>Full Name</label>
//                         <input type='text' name='fullname' value={values.fullname} onChange={handleInput} placeholder='Enter Full Name' className='form-control rounded-0' />
//                         {errors.fullname && <span className='text-danger'>{errors.fullname}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='rollno'>Roll No</label>
//                         <input type='text' name='rollno' value={values.rollno} onChange={handleInput} placeholder='Enter Roll No' className='form-control rounded-0' />
//                         {errors.rollno && <span className='text-danger'>{errors.rollno}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='email'>Email</label>
//                         <input type='email' name='email' value={values.email} onChange={handleInput} placeholder='Enter Email' className='form-control rounded-0' />
//                         {errors.email && <span className='text-danger'>{errors.email}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='password'>Password</label>
//                         <input type='password' name='password' value={values.password} onChange={handleInput} placeholder='Enter Password' className='form-control rounded-0' />
//                         {errors.password && <span className='text-danger'>{errors.password}</span>}
//                     </div>
//                     <button type='submit' className='btn btn-success w-100'>Sign up</button>
//                     <p> Already have an Account </p>
//                     <Link to="/" className='btn btn-default border w-100 bg-light'>
//                         Login In
//                     </Link>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Signup;
import React, { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import  validation from './SignupValidation'
import axios from 'axios'



 function Signup(){ 
    const [values,setValues] = useState({
        fullname:'',
        rollno:'',
        email:'',
        password:''
    })
    const navigate = useNavigate({})
    const [errors,setErrors] = useState({})
    const handleInput=(event)=>{
        setValues(prev=>({...prev,[event.target.name]: event.target.value}))
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(validation(values));
        if(errors.fullname === "" && errors.rollno === "" && errors.email==="" && errors.password === "" ){
            axios.post('http://localhost:3307/signup',values)

            // .then(res=> console.log(res.data))
            .then(res=>{
                navigate('/');
            })
            .catch(err =>console.log(err))
        }
    
    
    }
    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Sign Up</h2>
            <form action ="" onSubmit={handleSubmit}>
                <div className='mb-3 '>
                    <label htmlFor='Full Name'>Full Name</label>
                    <input type='text' name='fullname' onChange={handleInput} placeholder='Enter FullName' className='form-control rounded-0'/>
                    {errors.fullname && <span className='text-danger'>{errors.fullname}</span>}
                </div>
                 <div className='mb-3'>
                    <label htmlFor='Roll No'>Roll No</label>
                    <input type='text' name='rollno' onChange={handleInput} placeholder='Enter Roll No' className='form-control rounded-0'/>
                    {errors.rollno && <span className='text-danger'>{errors.rollno}</span>}
                </div>
                <div className='mb-3 '>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' onChange={handleInput} placeholder='Enter Email' className='form-control rounded-0'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div className='mb-3'> 
                    <label htmlFor='password'>Password</label>
                    <input onChange={handleInput} name='password'type='password' placeholder='Enter password'className='form-control rounded-0'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type = 'submit'className='btn btn-success w-100'>Sign up</button>
                <p> Already have an Account </p>
                <Link to="/" className='btn btn-default border w-100 bg-ligth' >
                    Login In
                </Link>
            </form>
        </div>
    </div>
    )
 }
 export default Signup
