import React from 'react';
import { Routes, Route} from "react-router-dom";
import { Navigation } from '../layouts/Navigation';
import { Posts } from '../pages/Posts';
import { UserPosts } from '../pages/UserPosts';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { PrivateRoute } from "../utils/PrivateRoute";
import { PostDetails } from '../pages/PostDetails';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { NewPost } from '../pages/NewPost';
import { EditPost } from '../pages/EditPost';

export const AppRouter = () => {
    return (
        <>
            <Navigation />
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Posts />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/post/:id" element={<PostDetails />} />
                <Route path="/posts" element={
                    <PrivateRoute>
                        <UserPosts/>
                    </PrivateRoute>
                }/>
                <Route path="/newpost" element={
                    <PrivateRoute>
                        <NewPost/>
                    </PrivateRoute>
                }/>
                <Route path="/editpost/:id" element={
                    <PrivateRoute>
                        <EditPost/>
                    </PrivateRoute>
                }/>
            </Routes>
        </>
    )
}
