import React, { useState } from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { isObjEmpty } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { NewPostForm } from "../components/forms/NewPostForm";
import { exposures } from "../helpers/exposures";
import { CREATE_POST_ENDPOINT } from "../helpers/endpoints";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { getUserPosts } from "../actions/postsActions";

export const NewPost = () => {

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  /** useNavigate es para redireccionar*/
  const navigate = useNavigate();



  const createPost = async ({ title, content, expirationTime, exposureId }) => {
    /**TODO: al procesar los datos enviados desde el componmente hijo, si existe errores los redibujamos mediante el useState de errores*/
    /**TODO: cualquiere cambio en un useState de un componente, redibujará a sus componentes hijos o padre */
    const errors = {};
    setErrors(errors);
    if (title === "") {
      errors.title = "Título es obligatorio";
    }

    if (content === "") {
      errors.content = "Contenido es obligatorio";
    }

    if (!isObjEmpty(errors)) {
      setErrors(errors);
      return;
    }
    /**TODO: si el post es privado, el tiempod e expiración es 0 */
    expirationTime = exposureId == exposures.PRIVATE ? 0 : expirationTime;

    let expitarionTime = parseInt(expirationTime);
    const data = { title, content, expitarionTime, exposureId };

    /* console.log('prueba lo que se envía -> ',{title, content, exposureId,expitarionTime});
    axios.post(CREATE_POST_ENDPOINT,data)
      .then(response => {
          //console.log('response create post --> ',response);
          toast.info("Post creado!", {
              position: toast.POSITION.BOTTOM_CENTER,
              autoClose: 2000
          })
          navigate(`/post/${response.data.postId}`);
      }).catch(error => {
          setErrors({newPost: error.response.data.message})      
      }); */

    try {
      const response = await axios.post(CREATE_POST_ENDPOINT, data);
      /**TODO: hacer dispatch es ejecutar una función de postsAction */
      dispatch(getUserPosts());
      toast.info("Post creado!", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000
      });
      navigate(`/post/${response.data.postId}`);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    } catch (error) {
      setErrors({newPost: error.response.data.message});
    }

  }

  return (
    <>
      <Container className="mt-5 mb-8">
        <Row>
          <Col sm="12" lg={{ span: 10, offset: 1 }}>
            <Card body>
              {errors.newPost && <Alert variant="danger">{errors.auth}</Alert>}
              <h1 className="display-5 fw-bold">Crear Post</h1>
              <NewPostForm errors={errors} onSubmitCallback={createPost}></NewPostForm>

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
