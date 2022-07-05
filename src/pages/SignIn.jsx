import React ,{ useEffect, useState } from "react";
import { Container,Row,Col,Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../actions/authActions";
import { SigninForm } from "../components/forms/SigninForm";
import { isObjEmpty } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  /** useSelector es para traer datos del store */
  const loggedIn = useSelector(state => state.auth.loggedIn);

  /** useNavigate es para redireccionar*/
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
        navigate("/");
    }   
  }); 
  

  const login = ({email, password}) =>{
    /**TODO: al procesar los datos enviados desde el componmente hijo, si existe errores los redibujamos mediante el useState de errores*/
    /**TODO: cualquiere cambio en un useState de un componente, redibujará a sus componentes hijos o padre */
      const errors = {};
      setErrors(errors);
      if (email === "") {
        errors.email = "Email invalido";
      }

      if (password === "") {
        errors.password = "password cannot be empty";
      }

      if (!isObjEmpty(errors) ) {
          setErrors(errors);
          return;
      }

      dispatch(loginUser({email,password})).then( response => {

      }).catch(err => {
        setErrors({auth: "Credentials Errors"});
      });

  }

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col sm="12" md={{span:8, offset: 2}} lg={{span: 6, offset:3}}>
            <Card body>
              {errors.auth && <Alert variant="danger">{errors.auth}</Alert>}
              <h1 className="display-5 fw-bold">Iniciar sesión</h1>
              <SigninForm errors={errors} onSubmitCallback={login}></SigninForm>
              <div className="mt-4">
                <Link to={"/signup"}>No tienes una cuenta? Requestrate aquí</Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
