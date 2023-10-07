import {useContext} from 'react'
import './topbar.css'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

const Topbar = () => {
    const {user,dispatch}=useContext(Context); 
    const PF="http://localhost:5000/images/";
    const handleLogout=()=>{
        dispatch({type:"LOGOUT"})
    }
    return (
        <div className='top'>
            <div className="topLeft">
                <i className="topIcon fa-brands fa-square-facebook"></i>
                <i className="topIcon fa-brands fa-twitter"></i>
                <i className="topIcon fa-brands fa-pinterest"></i>
                <i className="topIcon fa-brands fa-instagram"></i>
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/" className='Link'>HOME</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/setting" className='Link'>ABOUT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/Contact" className='Link'>CONTACT</Link>
                    </li>
                    <li className="topListItem">
                        <Link to="/write" className='Link'>WRITE</Link>
                    </li>
                    <li className="topListItem" onClick={handleLogout}>
                        {user && "LOGOUT"}
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {user ? (
                    <Link to={'/setting'}>
                    <img clasName='topImg'
                     src={PF+user.profilePic} alt="" />
                    </Link>         
                ) : (
                    <ul className='topList' >
                        <li className='topListItem'>
                            <Link className='Link' to="/login">LOGIN</Link>
                        </li>

                        <li className='topListItem'>
                            <Link className='Link' to="/register">REGISTER</Link>
                        </li>

                    </ul>
                )}
                <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
            </div>
        </div>
    )
}

export default Topbar
