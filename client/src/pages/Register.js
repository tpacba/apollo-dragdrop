import React, { useState, useContext } from 'react';
import { gql, useMutation } from '@apollo/client';

import { Form, Button } from 'semantic-ui-react';

import { AuthContext } from '../utils/Auth';

const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            token
            username
            createdAt
        }
    }
`

const Register = (props) => {
    const context = useContext(AuthContext);

    const [values, setValues] = useState({ username: "", email: "", password: "", confirmPassword: "" });

    const [errors, setErrors] = useState({});

    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, result) {
            console.log(result);
            context.login(result.data.register);
            props.history.push("/");
        },
        onError(error) {
            console.log(error);
            setErrors(error.graphQLErrors[0].extensions.exception.errors);
        },
        variables: values
    })

    const onChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    };

    const onSubmit = (event) => {
        event.preventDefault();
        addUser();
    };

    return (
        <div>
            <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder="Username..."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                ></Form.Input>
                <Form.Input
                    label="Email"
                    placeholder="Email..."
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email ? true : false}
                    onChange={onChange}
                ></Form.Input>
                <Form.Input
                    label="Password"
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                ></Form.Input>
                <Form.Input
                    label="Confirm Password"
                    placeholder="Confirm password..."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                ></Form.Input>
                <Button type="submit" color="red">
                    Register
                </Button>
            </Form>
            {Object.keys(errors).length > 0 && (
                <div className="ui error message">
                    <ul className="list">
                        {Object.values(errors).map(item => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Register;