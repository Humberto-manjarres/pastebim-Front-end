import React from 'react';
import { Button } from 'react-bootstrap';
import { confirmAlert } from "react-confirm-alert";
import axios from 'axios';
import { DELETE_POST_ENDPOINT } from "../../../helpers/endpoints";
import { useDispatch } from 'react-redux';
import { getUserPosts } from "../../../actions/postsActions";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";



export const DeletePostButton = ({ postId, title }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createAlert = () => {
        confirmAlert({
            title: "Eliminar post",
            message: `Estas seguro que deseas eliminar el post ${title}`,
            buttons: [
                {
                    label: 'Sí',
                    onClick: () => {
                        deletePost();
                    }
                },
                {
                    label: 'No',
                    onClick: () => { return false; }
                }
            ]
        })
    }

    const deletePost = async () => {
        try {
            await axios.delete(`${DELETE_POST_ENDPOINT}/${postId}`);



            dispatch(getUserPosts());


            toast.info("Post eliminado!", {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000
            });
            navigate('/');
        } catch (error) {
            toast.error(error.response.data.message, {
                position: toast.POSITION.BOTTOM_CENTER,
                autoClose: 2000
            });
        }

    }


    return (
        <>

            <Button variant="primary" size="sm" className='ms-2' onClick={createAlert}>Eliminar</Button>
        </>
    )

}
