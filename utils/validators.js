const validateRegisterInput = (username, password, confirmPassword, email) => {
    const errors = {};
    if(username.trim() == "") {
        errors.username = "Username cannot be empty";
    }
    if(email.trim() == "") {
        errors.email = "Email cannot be empty";
    } else {
        const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(!email.match(regEx)) {
            errors.email = "Email must be a valid address";
        }
    }
    if(password == "") {
        errors.password = "Password cannot be empty";
    } else if(password != confirmPassword) {
        errors.confirmPassword = "Passwords must match";
    }

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    }
}

const validateLoginInput = (username, password) => {
    const errors = {};
    if(username.trim() == "") {
        errors.username = "Username cannot be empty";
    }
    if(password == "") {
        errors.password = "Password cannot be empty";
    } 

    return {
        errors, 
        valid: Object.keys(errors).length < 1
    }
}

module.exports = { validateRegisterInput, validateLoginInput }