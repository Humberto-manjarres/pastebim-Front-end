import React, { useState, useEffect} from "react";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import { isObjEmpty } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { NewPostForm } from "../components/forms/NewPostForm";
import { exposures } from "../helpers/exposures";
import { CREATE_POST_ENDPOINT, POST_DETAILS_ENDPOINT,UPDATE_POST_ENDPOINT } from "../helpers/endpoints";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { getUserPosts } from "../actions/postsActions";
import { useParams } from "react-router-dom";

export const EditPost = () => {
  
  const {id} = useParams();  

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const [post, setPost] = useState(null);

  /** useNavigate es para redireccionar*/
  const navigate = useNavigate();

  /**cuando se renderiza x primera vez */
  useEffect(() => {
    axios.get(`${POST_DETAILS_ENDPOINT}/${id}`).then(response => {
        setPost(response.data);
        console.log('post --> ',post);
    }).catch(e => {
        console.log('error details --> ', e);
        navigate('/');
    })  
  }, [])
    

  const editPost = async ({ title, content, expirationTime, exposureId }) => {
    
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

    try {
      const response = await axios.put(`${UPDATE_POST_ENDPOINT}/${post.postId}`, data);
      /**TODO: hacer dispatch es ejecutar una función de postsAction */
      dispatch(getUserPosts());
      toast.info("Post actualizazdo!", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000
      });
      navigate(`/post/${response.data.postId}`);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    } catch (error) {
      setErrors({editPost: error.response.data.message});
    }

  }

  return (
    <>
      <Container className="mt-5 mb-8">
        <Row>
          <Col sm="12" lg={{ span: 10, offset: 1 }}>
            <Card body>
              {errors.editPost && <Alert variant="danger">{errors.auth}</Alert>}
              <h1 className="display-5 fw-bold">Editar Post</h1>
              {post && 
                <NewPostForm 
                errors={errors} 
                onSubmitCallback={editPost}
                pTitle={post.title}
                pContent={post.content}
                pExposureId={post.exposure.id}
                pExpirationTime={post.expirationTime}
                textButton="Editar Post"
                ></NewPostForm>
              }

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
