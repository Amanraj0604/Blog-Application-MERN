import React from 'react'
import { Link } from "react-router-dom"
import './post.css'
const Post = ({ post }) => {
   const PF="http://localhost:5000/images/";
    return (
        <div className='post'>
            {post.photo && (
                <img
                    src={PF+post.photo}
                    alt=''
                    className='postImg'
                />
            )}
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((c) => (
                        <span key={c._id}
                            className="postCat">
                            {c.name}
                        </span>
                    ))}


                </div>
                <Link to={`/posts/${post._id}`} className='Link'>
                    <span className="postTitel">{post.title}</span>
                </Link>

                <hr />
                <span className="postDate">
                    {new Date(post.createdAt).toDateString()}
                </span>

            </div>
            <p className="postDesc">{post.desc}</p>
        </div>


    )
}

export default Post
