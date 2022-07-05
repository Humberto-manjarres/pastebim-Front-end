import React ,{ useEffect, useState } from "react";
import { Container,Row,Col,Card, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser, registerUser } from "../actions/authActions";
import { isObjEmpty } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { SignUpForm } from "../components/forms/SignUpForm";

export const SignUp = () => {

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();

  /** useSelector es para traer datos del store */
  const loggedIn = useSelector(state => state.auth.loggedIn);

  /** useHistory es para redireccionar*/
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
        navigate("/");
    }   
  }); 
  

  const register = ({email, password,firstName, lastName}) =>{
    /**TODO: al procesar los datos enviados desde el componmente hijo, si existe errores los redibujamos mediante el useState de errores*/
    /**TODO: cualquiere cambio en un useState de un componente, redibujará a sus componentes hijos o padre */
      const errors = {};
      setErrors(errors);
      if (email === "") {
        errors.email = "Email invalid";
      }

      if (password.length < 4 || password.length > 20) {
        errors.password = "password must have a range greater than 4 and less than 20";
      }

      if (firstName === "") {
        errors.firstName = "firstName invalid";
      }

      if (lastName === "") {
        errors.lastName = "lastName invalid";
      }

      if (!isObjEmpty(errors) ) {
          setErrors(errors);
          return;
      }

      dispatch(registerUser({email,password,firstName, lastName})).then( response => {
        //loguear usuario
        dispatch(loginUser({email,password}));
      }).catch(err => {
        //backen devuelve error ejemplo: email repetido
        console.log('err --> ',err.response.data.message);
        setErrors({registerError: err.response.data.message});
      });

  }

  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col sm="12" md={{span:8, offset: 2}} lg={{span: 6, offset:3}}>
            <Card body>
              {errors.registerError && <Alert variant="danger">{errors.registerError}</Alert>}
              <h1 className="display-5 fw-bold">Crear Cuenta</h1>
              <SignUpForm errors={errors} onSubmitCallback={register}></SignUpForm>
              <div className="mt-4">
                <Link to={"/signin"}>Ya tienes una cuenta? Inicia sesion aquí</Link>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
