import React, { useEffect, useState } from 'react'
import './home.css'
import Header from '../../header/header'
import Posts from '../../posts/Posts'
import Sidebar from '../../sidebar/Sidebar'
import axios from "axios"
import { useLocation } from 'react-router-dom'

const Home = () => {
  const [posts, setPosts] = useState([]);
  const {search}=useLocation()
  

  useEffect(() => {
    fetchPosts();
  }, [search]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('posts'+search);
      const fetchedPosts = response.data;
     
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='home'>
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};
export default Home
