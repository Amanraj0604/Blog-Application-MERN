import React, { useContext,useState } from 'react'
import Sidebar from '../../sidebar/Sidebar'
import '../setting/setting.css'
import {Context} from "../../../context/Context"
import axios from 'axios'
const Setting = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const [succuss,setSuccess]=useState(false);
  const {user,dispatch}=useContext(Context); 
  const PF="http://localhost:5000/images/";
  const handleSubmit = async (e) => {
   e.preventDefault();
   dispatch({type:"UPDATE_START"})
    
    const updatedUser = {
      userId: user._id ,
      username,
      email,
      password,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('name', filename);
      data.append('file', file);
      updatedUser.profilePic = filename;
      try {
        await axios.post('upload', data); // Correct the upload URL
      } catch (error) {
        console.error(error);
      }
      
      try {
        const res=await axios.put(`users/${user._id}`,updatedUser);
        dispatch({type:"UPDATE_SUCCESS",payload:res.data})
        setSuccess(true)
      } catch (error) {
        alert(error)
        dispatch({type:"UPDATE_FAILURE"})
        console.error(error);
      }
    }

    
  };



  return (
    <div className='settings'>
      <div className="settingswrapper">
        <div className="settingTitle">
            <span className="settingUpdateTitle">Update Your Account</span>
            <span className="settingDeleteTitle">Delete Account</span>
        </div>
        <form className="settingFrom" onSubmit={handleSubmit}>
            <label>Profile Picture</label> 
            <div className="settingPP">
                <img 
                src={file ? URL.createObjectURL(file):PF+user.profilePic} alt="" 
                
                />
                <label htmlFor="fileInput">
                <i className="settingPPIcon fa-regular fa-circle-user"></i>
                </label>
                <input type="file" id='fileInput' style={{display:"none"}}
                 onChange={(e) => setFile(e.target.files[0])}
                  />
            </div>
            <label>Username</label>
            <input type="text" placeholder={user.username} onChange={e=>setUsername(e.target.value)} />
            <label>Email</label>
            <input type="email" placeholder={user.email} onChange={e=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input type="password" onChange={e=>setPassword(e.target.value)}/>
            <button className="settingSubmit" type='submit'>Update</button>
            {succuss && <span>Updation succusfully</span>}
        </form>
      </div>
      <Sidebar/>
    </div>
  )
}

export default Setting
