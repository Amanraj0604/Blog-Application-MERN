import React, { useContext,useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import './sidebar.css'
import {Context} from "../../context/Context"
import axios from 'axios';
const Sidebar = () => {
    const [Cats, setCat] = useState([]);
    const {user}=useContext(Context); 
    const PF="http://localhost:5000/images/";
    useEffect(() => {
        const getCat = async () => {
            try {
                const res = await axios.get("/cate");
                const response = res.data;
                setCat(response);
            } catch (error) {
                console.error(error);
            }
        }
        getCat();
    }, []);


    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitel">ABOUT ME</span>
                <img src={PF+user.profilePic}alt=""  className='imgClass'/>
                <p><h4>Auther:-{user.username}</h4><br/>
                Email id:-{user.email}
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitel">CATEGORIES</span>
                <ul className="sidebarList">
                    {Cats.map((c) => (
                        <Link to={`/?cat=${c.name}`} className='Link'>
                            <li className="sidebarListItem">{c.name}</li>
                        </Link>
                    ))}

                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitel">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-square-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-pinterest"></i>
                    <i className="sidebarIcon fa-brands fa-instagram"></i>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
