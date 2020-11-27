import React, { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';

import { AuthContext } from '../utils/Auth';

const LOGIN_USER = gql`
    mutation login(
        $username: String! 
        $password: String!
    ) {
        login(
            username: $username 
            password: $password
        ) {
            id
            email
            token
            username
            createdAt
        }
    }
`

const Login = (props) => {
    const context = useContext(AuthContext);

    const [values, setValues] = useState({username: "", password: ""});

    const [errors, setErrors] = useState({});

    const [loginUser, { loading }] = useMutation(LOGIN_USER, {
        update(_, result) {
            context.login(result.data.login);
            props.history.push("/");
        },
        onError(error) {
            setErrors(error.graphQLErrors[0].extensions.exception.errors)
        },
        variables: values
    });

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value})
    };

    const onSubmit = (event) => {
        event.preventDefault();
        loginUser();
    };

    return (
        <div>
        </div>
    );
};

export default Login;