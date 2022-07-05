import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Post } from '../components/posts/Post';
import { NoPost } from '../components/utils/NoPost';
import { Placeholder } from '../components/utils/Placeholder';
import { USER_POST_ENDPOINT } from "../helpers/endpoints";
//import { useSelector} from "react-redux";

export const UserPosts = () => {
  const [posts, setPosts] = useState([]);
  const [fetching, setfetching] = useState(true);
  
  /* const storeSelect = useSelector(state => state);
  console.log('storeSelect --> ',storeSelect.posts.posts.length);
   */
  
  useEffect(() => {
    axios.get(USER_POST_ENDPOINT).then(response => {
      //console.log('posts list --> ', response.data);
      setPosts(response.data);
      setfetching(false);
    }).catch(e => {
      console.log(e);
      setfetching(false);
    })
  },[])
  
  
  return (
    <>
      <div>
        <div className="container-fluid bg-light text-dark p-5">
          <div className="container bg-light p-5">
            <h1 className="display-4 fw-bold">Mis posts</h1>
            <hr />
            {fetching && <Placeholder></Placeholder>}
            { !fetching && posts.length === 0 && <NoPost text="No hay post privados disponibles"></NoPost>}
            <div>
              {posts.map(post => <Post ost key={post.postId} post={post} renderControls={true} ></Post>)}
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
