import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { POST_DETAILS_ENDPOINT } from '../helpers/endpoints';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Button, Card } from 'react-bootstrap';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { downloadtextAsFile } from "../helpers/helpers";

export const PostDetails = () => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        axios.get(`${POST_DETAILS_ENDPOINT}/${id}`).then(response => {
            //console.log('posts details --> ', response.data);
            setPost(response.data);
        }).catch(e => {
            console.log('error details --> ', e);
            navigate('/');
        })
    }, []);

    const downloadDoc = () => {
        downloadtextAsFile(post.postId, post.content);
    }

    return (
        <>
            
            <div className="container-fluid bg-light text-dark p-5">
                <div className="container bg-light p-5">
                    <h1 className="display-5 fw-bold">{post?.title}</h1>
                    <hr />
                    <p>Creado por: {post?.user.firstName}, {moment(post?.createdAt).fromNow()}</p>
                    <Card>
                        <Card.Header>
                            <div className='row'>
                                <div className='col-sm-1 col-xs-6'>
                                    <Button
                                        variant='primary'
                                        size='sm'
                                        onClick={downloadDoc}>Descargar</Button>
                                </div>
                                <div className='col-sm-2 col-xs-6'>
                                    <CopyToClipboard onCopy={() => {
                                        toast.info("Copiado al portapapeles", {
                                            position: toast.POSITION.BOTTOM_CENTER,
                                            autoClose: 3000
                                        })
                                    }} text={post?.content} >
                                        <Button
                                            variant='primary'
                                            size='sm'
                                            onClick={() => { }}>
                                            Copiar a portapapeles
                                        </Button>
                                    </CopyToClipboard>
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <SyntaxHighlighter showInlineLineNumbers={true}>
                                {post?.content}
                            </SyntaxHighlighter>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </>

    )
}
