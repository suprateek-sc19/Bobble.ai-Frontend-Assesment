import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap';
import { FacebookLoginButton } from 'react-social-login-buttons'
import { isEmail } from 'validator';
import Facebook from './Facebook';
import "../../index.css";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        data: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        errors: {}
    });

    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });
    }

    validate = () => {
        const { data } = this.state;
        let errors = {};

        if (data.firstName === '') errors.firstName = 'First Name can not be blank.';
        if (data.lastName === '') errors.lastName = 'Last Name can not be blank.';
        if (!isEmail(data.email)) errors.email = 'Email must be valid.';
        if (data.email === '') errors.email = 'Email can not be blank.';
        if (data.password === '') errors.password = 'Password must be valid.';
        if (data.confirmPassword !== data.password) errors.confirmPassword = 'Passwords must match.';

        return errors;
    }

    postData(data){
        try {
            let result = fetch('https://reqres.in/api/users', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-type':'application/json',

                },
                body: JSON.stringify({
                    fname: data.firstName,
                    lname: data.lastName
                })
            });
            console.log(result)
        } catch(e) {
            console.log(e)
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;
        

        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            console.log(data);
            //Call an api here
            this.postData(data)
            //Resetting the form
            this.setState(this.getInitialState());
        } else {
            this.setState({ errors });
        }
    }

 


    render() {
        let fbContent;
        const { data, errors } = this.state;
        return (
            <Form className="login mx-auto text-center" onSubmit={this.handleSubmit}>
                <h5 id="small" className="text-center">SIGN UP</h5>
                <br></br>
                <p id="lead">Create your account</p>
                <p><small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small></p>
                <div className="mb-3"><Facebook/></div>
                <p>or</p>
                <FormGroup>
                    <Input id="firstName" placeholder="First Name" value={data.firstName} invalid={errors.firstName ? true : false} name="firstName" onChange={this.handleChange} />
                    <FormFeedback>{errors.firstName}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Input id="lastName" placeholder="Last Name" value={data.lastName} invalid={errors.lastName ? true : false} name="lastName" onChange={this.handleChange} />
                    <FormFeedback>{errors.lastName}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Input id="email" placeholder="Email" value={data.email} invalid={errors.email ? true : false} name="email" onChange={this.handleChange} />
                    <FormFeedback>{errors.email}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Input id="password" placeholder="Password" value={data.password} type="password" name="password" invalid={errors.password ? true : false} onChange={this.handleChange} />
                    <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>

                <FormGroup>
                    <Input id="confirmPassword" placeholder="Confirm Password" value={data.confirmPassword} type="password" name="confirmPassword" invalid={errors.confirmPassword ? true : false} onChange={this.handleChange} />
                    <FormFeedback>{errors.confirmPassword}</FormFeedback>
                </FormGroup>
                <p><small>By clicking Sign Up, you agree to our <a href="#">Terms Of Use</a> and our <a href="#">Privacy Policy</a></small></p>
                <Button className="w-100" color="primary">SIGN UP</Button>
            </Form>
        );
    }
}

export default Register;