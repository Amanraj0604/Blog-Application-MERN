import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Topbar from './component/topbar/topbar';
import Home from './component/pages/Home/Home';
import Register from './component/pages/register/Register';
import Login from './component/pages/login/login';
import Write from './component/pages/write/Write';
import Setting from './component/pages/setting/Setting';
import Single from './component/pages/single/Single';
import { Context } from './context/Context';
import Contact from './component/pages/contact/contact';

function App() {
  const {user}=useContext(Context);

  return (
    <BrowserRouter>
      <Topbar />
      <Routes>
        <Route path="/"element={user ? <Home /> : <Login />}/>
        <Route path="/register" element= {user ? <Home /> : <Register/>}/>
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element= {user ? <Write /> : <Register/>} />
        <Route path="/setting" element= {user ? <Setting /> : <Register/>} />
        <Route path="/Contact" element= {user ?<Contact/>:<Register/>} />
        <Route path="/posts/:postId" element={<Single />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
