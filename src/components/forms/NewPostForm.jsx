import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { exposures } from '../../helpers/exposures';

export const NewPostForm = ({ errors, onSubmitCallback,pTitle = "",pContent= "",pExposureId= exposures.PUBLIC,pExpirationTime = 60 ,textButton = "Crear Post"}) => {
    const [title, setTitle] = useState(pTitle);
    const [content, setContent] = useState(pContent);
    const [expirationTime, setExpirationTime] = useState(pExpirationTime);
    const [exposureId, setExposureId] = useState(pExposureId);


    /*TODO: cuando damos click en iniciar sesion, pasamos el email y el password al componente padre.
    el padre recibe dichos datos mediante el onSubmitCallback */
    const submitForm = (e) => {
        e.preventDefault();//preveneir el comportamiento por defecto!
        onSubmitCallback({ title, content, expirationTime, exposureId });
    }

    return (
        <Form onSubmit={submitForm} >
            <Form.Group control="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type='title'
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder='Ejemplo: Snippet para recorre un array'
                    isInvalid={errors.title}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.title}
                </Form.Control.Feedback>
            </Form.Group>
            <Row>
                <Col md="6" xs="12">
                    <Form.Group controlId='expirationTime'>
                        <Form.Label>Tiempo de expiración</Form.Label>
                        <Form.Control disabled={exposureId == exposures.PRIVATE} as="select" value={expirationTime} onChange={e => setExpirationTime(e.target.value)}>
                            <option value="30">30 minutos</option>
                            <option value="60">1 hora</option>
                            <option value="120">2 horas</option>
                            <option value="360">6 horas</option>
                            <option value="720">12 hoaras</option>
                            <option value="1440">1 día</option>
                        </Form.Control>
                        <Form.Control.Feedback type='invalid'>
                            {errors.expirationTime}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

                <Col md="6" xs="12">
                    <Form.Group controlId='exposureId'>
                        <Form.Label>Tipo Post</Form.Label>
                            <div>
                                <Form.Check 
                                onChange={e => setExposureId(e.target.value)}
                                checked={exposureId == exposures.PRIVATE}
                                value={exposures.PRIVATE} 
                                inline 
                                label="Privado" 
                                name='exposureId' 
                                type='radio'>
                                </Form.Check>
                                <Form.Check 
                                onChange={e => setExposureId(e.target.value)}
                                checked={exposureId == exposures.PUBLIC}
                                value={exposures.PUBLIC} 
                                inline 
                                label="Publico" 
                                name='exposureId' 
                                type='radio'>
                                </Form.Check>
                            </div>
                        <Form.Control.Feedback type='invalid'>
                            {errors.expirationTime}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Col>

            </Row>

            <Form.Group control="content">
                <Form.Label>Contenido</Form.Label>
                <Form.Control
                    as='textarea'
                    rows={10}
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    
                    isInvalid={errors.content}
                />
                <Form.Control.Feedback type='invalid'>
                    {errors.content}
                </Form.Control.Feedback>
            </Form.Group>
          
            <Button className='mt-3' variant="primary" type="submit">{textButton}</Button>
        </Form>
    )
}
