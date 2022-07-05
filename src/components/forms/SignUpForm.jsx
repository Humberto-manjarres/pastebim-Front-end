import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

export const SignUpForm = ({ errors, onSubmitCallback }) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    /*TODO: cuando damos click en iniciar sesion, pasamos el email y el password al componente padre.
    el padre recibe dichos datos mediante el onSubmitCallback */
    const submitForm = (e) => {
        e.preventDefault();//preveneir el comportamiento por defecto!
        onSubmitCallback({ email, password, firstName, lastName });
    }

    return (
        <Form onSubmit={submitForm} >
            <Row>
                <Col md="6" xs="12">
                    <Form.Group control="firstName">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type='text'
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            placeholder='Nombre'
                            isInvalid={errors.firstName}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
                <Col md="6" xs="12">
                <Form.Group control="lastName">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type='text'
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            placeholder='Apellido'
                            isInvalid={errors.lastName}
                        />
                        <Form.Control.Feedback type='invalid'>
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>
            </Row>
            <Form.Group control="email">
                <Form.Label>Correo Electronico</Form.Label>
                <Form.Control
                    type='email'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Correo electronico'
                    isInvalid={errors.email}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.email}
                </Form.Control.Feedback>
            </Form.Group>


            <Form.Group control="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type='password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder='Password'
                    isInvalid={errors.password}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.password}
                </Form.Control.Feedback>
            </Form.Group>
            <Button className='mt-3' variant="primary" type="submit">Create Count</Button>
        </Form>
    )
}
