import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from '../actions/authActions';

export const Navigation = () => {

    /** useSelector es para traer datos del store */
    const loggedIn = useSelector(state => state.auth.loggedIn);
    const user = useSelector(state => state.auth.user);

    /** dispatch para llamar las acciones */
    const dispatch = useDispatch();
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">

            <Link
                className="navbar-brand"
                to="/"
            >
                React Java
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    {loggedIn &&
                        <NavLink
                            className="nav-item nav-link"
                            to="/newpost"
                        >
                            CreatePost
                        </NavLink>
                    }

                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                {(!loggedIn) 
                    ?
                    <React.Fragment>
                        <Link
                            className="nav-item nav-link"
                            to="/signup"
                        >
                            Crear cuenta
                        </Link>
                        <Link
                            className="nav-item nav-link"
                            to="/signin"
                        >
                            Iniciar Sesion
                        </Link>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Link
                            className="nav-item nav-link"
                            to="/posts"
                        >
                            Mis Posts
                        </Link>
                        <ul className="navbar-nav ml-auto">
                            <span className="nav-item nav-link text-primary">{user.sub}</span>
                            <button className="nav-item nav-link btn" onClick={() => dispatch(logoutUser())}>Logout</button>
                        </ul>
                    </React.Fragment>
                }


            </div>
        </nav>
    )
}