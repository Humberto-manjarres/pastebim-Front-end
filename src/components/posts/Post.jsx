import React from 'react'
import { Card, Badge,Button } from 'react-bootstrap'
import { Link,NavLink } from 'react-router-dom'
import moment from "moment";
import { exposures } from "../../helpers/exposures";
import { DeletePostButton } from './buttons/DeletePostButton';

export const Post = ({ post, renderControls }) => {
    /* console.log('expirado --> ', post.exposure.id); */
    /* console.log('p -->',post);
    console.log('r -->',renderControls); */
    
    return (
        <div>
            <Card className='mb-4'>
                {
                    renderControls &&
                    <Card.Header className='d-flex justify-content-between'>
                        <div>
                            <Badge pill variant="secondary" className='ms-2'>{post.exposure.type}</Badge>
                            {
                                post.expired && post.exposure.id === exposures.PUBLIC &&
                                <Badge pill bg="danger ms-2">Expiró</Badge>

                            }
                        </div>
                        <div>
                        <Button variant="primary" size="sm" 
                        className='ms-2'
                        as={NavLink}  to={`/editpost/${post.postId}`}
                        >Editar</Button>
                        <DeletePostButton postId={post.postId} title={post.title}></DeletePostButton>
                        </div>
                    </Card.Header>
                }
                <Card.Body>
                    <Card.Title>
                        <Link to={`/post/${post.postId}`}>{post.title}</Link>
                    </Card.Title>
                    <Card.Text>
                        Creado por: {post.user.firstName}, {moment(post.createdAt).fromNow()}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
