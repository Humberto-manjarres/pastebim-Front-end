import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

export const SigninForm = ({ errors, onSubmitCallback }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    /*TODO: cuando damos click en iniciar sesion, pasamos el email y el password al componente padre.
    el padre recibe dichos datos mediante el onSubmitCallback */
    const submitForm = (e) => {
        e.preventDefault();//preveneir el comportamiento por defecto!
        onSubmitCallback({ email, password });
    }

    return (
        <Form onSubmit={submitForm} >
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
            <Button className='mt-3' variant = "primary" type="submit">Iniciar Sesion</Button> 
        </Form>
    )
}
