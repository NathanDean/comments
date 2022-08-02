import React, { useEffect } from "react";
import {connect} from "react-redux";

import {fetchPostsAndUsers} from "../actions";

import UserHeader from "./UserHeader";

const PostList = ({posts, fetchPostsAndUsers}) => {
    
    // Arrow function needs curly brackets due to cleanup function - see https://medium.com/geekculture/react-uncaught-typeerror-destroy-is-not-a-function-192738a6e79b
    useEffect(() => {fetchPostsAndUsers()}, []);

    const renderedPosts = posts.map(post => {
        return(
            <div className = "item" key = {post.id}>
                <i className = "large middle aligned icon user" />
                <div className = "content">
                    <div className = "description">
                    <h2>{post.title}</h2>
                    <p>{post.body}</p>
                    </div>
                    <UserHeader userId = {post.userId} />
                </div>

            </div>
        )
    })

    return (
        <div>
            <div className = "ui relaxed divided list">{renderedPosts}</div>
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, {fetchPostsAndUsers})(PostList);