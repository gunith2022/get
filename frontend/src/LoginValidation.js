function validation(values){
    let error={}
    const email_pattern = /^[a-zA-Z0-9._%+-]+@grietcollege\.com$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(values.email === ""){
        error.email = "Email should not be empty"
    }
    else if(!email_pattern.test(values.email)){
        error.email="Email Didn't Match"
    }
    else{
        error.email=""
    }
    if(values.password === ""){
        error.password = "password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password="password Didn't Match"
    }
    else{
        error.password=""
    }
    return error;

}
export default validation;