import React, { useContext,useEffect, useState } from 'react'
import './singlepost.css'
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom"
import axios from 'axios'
import { Context } from '../../context/Context';

const Singlepost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const PF="http://localhost:5000/images/";
    const [posts, setPost] = useState({});
    const { user } = useContext(Context);
    const [title,setTitle]=useState('')
    const [desc, setDesc] = useState('');
    const [update,setUpdateMode]=useState(false)
    useEffect(() => {
        const getPost = async () => {
            try{
            const response = await axios.get(`${path}`);
           
            setPost(response.data);
            setTitle(response.data.title)
            setDesc(response.data.desc)
            }
            catch(error){
                console.error(error);
            }
        };
        getPost();
    }, [path]);
    const handleDelete=async()=>{
        try {
            await axios.delete(`${path}`,{data:{username:user.username}});
            
            window.location.replace(`/`);
        } catch (error) {
            
        }
       

    }
    const handleUpdate=async ()=>{
        try {
            await axios.put(`${path}`,{
                username: user.username,
                title,
                desc,
            });
            
           // window.location.reload(`/`);
           setUpdateMode(false);
        } catch (error) {
            
        }
    }
    return (
        <div className='singlepost'>
            <div className="singlePostWraper">
                {posts.photo && (
                    <img
                        src={PF+posts.photo}
                        alt=''
                        className='singlePostImg'
                    />
                )}
                {
                    update ? <input type="text" value={ title} 
                    className='singlePostTitleInput ' autoFocus 
                    onChange={(e)=>setTitle(e.target.value)}
                    />:(
                
                <h1 className="singlePostTitle">{title}
                {posts.username===user ?.username  &&(
                    <div className="singlePostEdit">
                        <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={()=>setUpdateMode(true)}></i>
                        <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                    </div>
                )}
                </h1>
                )}
                <div className="singlePostInfo">
                    <div className="singlePostAuthor">
                    Author:
                        <Link to={`/?user=${posts.username}`} className='Link'>
                        <b>{posts.username}</b>
                        </Link>
                        
                    </div>
                    <div className="singlePostDate"> 
                        {new Date(posts.createdAt).toDateString()}
                    </div>
                </div>
                {update ? <textarea className='singlePostDescInput'value={desc} autoFocus onChange={(e)=>setDesc(e.target.value)}/>:(
                <p className='singlePostDesc'>{desc}</p>
               
              
                )}
                {update &&(
                     <button className="singlepostbuttomn" onClick={handleUpdate}>
                     Update
                   </button> 
                )}
               
            </div>
        </div>
    )
}

export default Singlepost
