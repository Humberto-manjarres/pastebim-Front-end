import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Post } from '../components/posts/Post';
import { Placeholder } from '../components/utils/Placeholder';
import { PUBLIC_POSTS_ENDPOINT } from "../helpers/endpoints";
import { getUserPosts } from "../actions/postsActions";
import { toast } from 'react-toastify';
import { NoPost } from '../components/utils/NoPost';


export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [fetching, setfetching] = useState(false);
  const fetched = useSelector( state => state.posts.fetched);
  //const posts = useSelector( state => state.posts.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(PUBLIC_POSTS_ENDPOINT).then(response => {
      //console.log('posts list --> ', response.data);
      setPosts(response.data);
      setfetching(false);
    }).catch(e => {
      console.log(e);
      setfetching(false);
    }) 

/*     async function fetchedPosts() {
      if (!fetched) {
          try {
            setfetching(true);
            await dispatch(getUserPosts());
            setfetching(false);
          } catch (err) {
            //mensaje que viene desde el backend
            toast.error(err.response.data.message, { position: toast.POSITION.BOTTOM_CENTER, autoClose: 2000});  
          }
      }
    }

    fetchedPosts(); */

  }, [])

  return (
    <>
      <div>
        <div className="container-fluid bg-light text-dark p-5">
          <div className="container bg-light p-5">
            <h1 className="display-4 fw-bold">Ultimos posts publicos</h1>
            <hr />
            {fetching && <Placeholder></Placeholder>}
            { !fetching && posts.length === 0 && <NoPost text="No hay post publicos disponibles"></NoPost>}
            <div>
              {posts.map(post => <Post key={post.postId} post={post} renderControls={false}></Post>)}
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
