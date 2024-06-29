// import React, { useState } from 'react';
// import { Link,useNavigate} from 'react-router-dom';
// import  validation from './LoginValidation'
// import axios from 'axios';
// axios.defaults.withCredentials=true;

// function Login(){
//     const[values,setValues] = useState({
//         email: '',
//         password: ''

//     })
//     const navigate = useNavigate()
//     const [errors,setErrors] = useState({})
//     const handleInput=(event)=>{
//         setValues(prev=>({...prev,[event.target.name]: event.target.value}))
//     }
// const handleSubmit=(event)=>{
//     event.preventDefault();
//     setErrors(validation(values));
//     if(errors.email==="" && errors.password === "" ){
//         axios.post('http://localhost:3307/login',values)

//         // .then(res=> console.log(res.data))
//         .then(res=>{
//             if(res.data.status === "Success")
//             navigate('/home')
//         else{
//             alert(res.data.Error);
//         }
//         })
//         .catch(err =>console.log(err))
//     }


// }

//     return(
//     <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
//         <div className='bg-white p-3 rounded w-25'>
//             <h2>Login In</h2>
//             <form action ="" onSubmit={handleSubmit}>
//                 <div className='mb-3 '>
//                     <label htmlFor='email'>Email</label>
//                     <input type='email' placeholder='Enter Email' onChange={handleInput} name='email' className='form-control rounded-0'/>
//                     {errors.email && <span className='text-danger'>{errors.email}</span>}
//                 </div>
//                 <div className='mb-3'> 
//                     <label htmlFor='password'>Email</label>
//                     <input type='password' placeholder='Enter password' onChange={handleInput} name='password' className='form-control rounded-0'/>
//                     {errors.password && <span className='text-danger'>{errors.password}</span>}
//                 </div>
//                 <button  type="submit"className='btn btn-success w-100'>Login</button>
//                 <p>New User? </p>
//                 <Link to="/signup" className='btn btn-default border w-100 bg-ligth' >
//                     Create Account
//                 </Link>
//             </form>
//         </div>
//     </div>
//     )
// }
// export default Login
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validation from './LoginValidation';
import axios from 'axios';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';

axios.defaults.withCredentials = true;

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(validation(values));
        if (errors.email === "" && errors.password === "") {
            axios.post('http://localhost:3307/login', values)
                .then(res => {
                    if (res.data.status === "Success") {
                        navigate('/home');
                    } else {
                        alert(res.data.Error);
                    }
                })
                .catch(err => console.log(err));
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Row className="w-100">
                <Col md={{ span: 6, offset: 3 }}>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" name="email" onChange={handleInput} placeholder="Enter Email" />
                                    {errors.email && <Form.Text className="text-danger">{errors.email}</Form.Text>}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" name="password" onChange={handleInput} placeholder="Enter Password" />
                                    {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100">Login</Button>
                            </Form>
                            <p className="text-center mt-3">New User? <Link to="/signup">Create Account</Link></p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;


