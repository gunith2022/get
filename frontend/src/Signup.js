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
// 
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import validation from './SignupValidation';
// import axios from 'axios';
// import { Button } from 'react-bootstrap';

// function Signup() {
//     const [values, setValues] = useState({
//         fullname: '',
//         rollno: '',
//         email: '',
//         password: ''
//     });
//     const navigate = useNavigate({});
//     const [errors, setErrors] = useState({});

//     const handleInput = (event) => {
//         setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setErrors(validation(values));
//         if (errors.fullname === "" && errors.rollno === "" && errors.email === "" && errors.password === "") {
//             axios.post('http://localhost:3307/signup', values)
//                 .then(res => {
//                     navigate('/');
//                 })
//                 .catch(err => console.log(err));
//         }
//     };

//     return (
//         <div className='d-flex justify-content-center align-items-center bg-light vh-100'>
//             <div className='bg-white p-3 rounded w-25'>
//                 <h2 className='text-center mb-4'>Sign Up</h2>
//                 <form action="" onSubmit={handleSubmit}>
//                     <div className='mb-3'>
//                         <label htmlFor='fullname'>Full Name</label>
//                         <input type='text' name='fullname' onChange={handleInput} placeholder='Enter FullName' className='form-control rounded-0' />
//                         {errors.fullname && <span className='text-danger'>{errors.fullname}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='rollno'>Roll No</label>
//                         <input type='text' name='rollno' onChange={handleInput} placeholder='Enter Roll No' className='form-control rounded-0' />
//                         {errors.rollno && <span className='text-danger'>{errors.rollno}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='email'>Email</label>
//                         <input type='email' name='email' onChange={handleInput} placeholder='Enter Email' className='form-control rounded-0' />
//                         {errors.email && <span className='text-danger'>{errors.email}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='password'>Password</label>
//                         <input onChange={handleInput} name='password' type='password' placeholder='Enter password' className='form-control rounded-0' />
//                         {errors.password && <span className='text-danger'>{errors.password}</span>}
//                     </div>
//                     <Button type='submit' className='btn btn-primary w-100 mt-3'>Sign up</Button>
//                     <p className='text-center mt-3'>Already have an Account?</p>
//                     <Link to="/" className='btn btn-outline-primary w-100'>
//                         Login In
//                     </Link>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Signup;
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import validation from './SignupValidation';
// import axios from 'axios';
// import { Button } from 'react-bootstrap';

// function Signup() {
//     const [values, setValues] = useState({
//         fullname: '',
//         rollno: '',
//         email: '',
//         password: ''
//     });
//     const navigate = useNavigate({});
//     const [errors, setErrors] = useState({});

//     const handleInput = (event) => {
//         setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         setErrors(validation(values));
//         if (errors.fullname === "" && errors.rollno === "" && errors.email === "" && errors.password === "") {
//             axios.post('http://localhost:3307/signup', values)
//                 .then(res => {
//                     navigate('/');
//                 })
//                 .catch(err => console.log(err));
//         }
//     };

//     return (
//         <div className='d-flex justify-content-center align-items-center bg-light vh-100'>
//             <div className='bg-white p-3 rounded w-25'>
//                 <h2 className='text-center mb-4'>Sign Up</h2>
//                 <form action="" onSubmit={handleSubmit}>
//                     <div className='mb-3'>
//                         <label htmlFor='fullname'>Full Name</label>
//                         <input type='text' name='fullname' onChange={handleInput} placeholder='Enter FullName' className='form-control rounded-0' />
//                         {errors.fullname && <span className='text-danger'>{errors.fullname}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='rollno'>Roll No</label>
//                         <input type='text' name='rollno' onChange={handleInput} placeholder='Enter Roll No' className='form-control rounded-0' />
//                         {errors.rollno && <span className='text-danger'>{errors.rollno}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='email'>Email</label>
//                         <input type='email' name='email' onChange={handleInput} placeholder='Enter Email' className='form-control rounded-0' />
//                         {errors.email && <span className='text-danger'>{errors.email}</span>}
//                     </div>
//                     <div className='mb-3'>
//                         <label htmlFor='password'>Password</label>
//                         <input onChange={handleInput} name='password' type='password' placeholder='Enter password' className='form-control rounded-0' />
//                         {errors.password && <span className='text-danger'>{errors.password}</span>}
//                     </div>
//                     <Button type='submit' className='btn btn-primary w-100 mt-3'>Sign up</Button>
//                     <p className='text-center mt-3'>Already have an Account?</p>
//                     <Link to="/" className='btn btn-outline-primary w-100'>
//                         Login In
//                     </Link>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Signup;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './SignupValidation';
import axios from 'axios';
import { Button, Alert } from 'react-bootstrap'; // Import Alert from react-bootstrap for displaying errors

function Signup() {
    const [values, setValues] = useState({
        fullname: '',
        rollno: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(''); // State for displaying specific error message

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (errors.fullname === "" && errors.rollno === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:3307/signup', values)
                .then(res => {
                    navigate('/');
                })
                .catch(err => {
                    if (err.response && err.response.data && err.response.data.error) {
                        setErrorMessage(err.response.data.error); // Set specific error message received from backend
                    } else {
                        console.log(err);
                        setErrorMessage('Error during signup. Please try again.'); // Generic error message for other errors
                    }
                });
        }
    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-light vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2 className='text-center mb-4'>Sign Up</h2>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} {/* Display error message if there's any */}
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='fullname'>Full Name</label>
                        <input type='text' name='fullname' onChange={handleInput} placeholder='Enter FullName' className='form-control rounded-0' />
                        {errors.fullname && <span className='text-danger'>{errors.fullname}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='rollno'>Roll No</label>
                        <input type='text' name='rollno' onChange={handleInput} placeholder='Enter Roll No' className='form-control rounded-0' />
                        {errors.rollno && <span className='text-danger'>{errors.rollno}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' onChange={handleInput} placeholder='Enter Email' className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input onChange={handleInput} name='password' type='password' placeholder='Enter password' className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <Button type='submit' className='btn btn-primary w-100 mt-3'>Sign up</Button>
                    <p className='text-center mt-3'>Already have an Account?</p>
                    <Link to="/" className='btn btn-outline-primary w-100'>
                        Login In
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;



