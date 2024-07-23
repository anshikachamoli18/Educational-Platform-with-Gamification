import React from 'react'
import './App.css'
import {BrowserRouter, Routes, Route}from 'react-router-dom';
import Home from './pages/home/Home.jsx';
import Header from './Components/Header/Header.jsx';
import About from './pages/about/About.jsx';
import Courses from './pages/courses/Courses.jsx';
import Account from './pages/account/Account.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Verify from './pages/auth/Verify.jsx';
import Footer from './Components/Footer/Footer.jsx';
import {UserData} from './context/UserContext.jsx';
import Loading from './Components/Loading/Loading.jsx';
import CourseDescription from './pages/coursedescription/CourseDescription.jsx';
import CourseStudy from './pages/CourseStudy/CourseStudy.jsx';
import PaymentSuccess from './pages/PaymentSuccess/PaymentSuccess.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Lecture from './pages/Lecture/Lecture.jsx';
import AdminDashboard from './admin/Dashboard/AdminDashboard.jsx';
import AdminCourses from './admin/Courses/AdminCourses.jsx';
import AdminUsers from './admin/Users/AdminUsers.jsx';

const App = () => {
  const {isAuth,user,loading}=UserData();
  return (
    <>
      {loading?<Loading/>:(<BrowserRouter>
       <Header isAuth={isAuth}/>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={isAuth?<Home/>:<Login />} />
          <Route exact path="/register" element={isAuth?<Home/>:<Register />} />
          <Route exact path="/verify" element={isAuth?<Home/>:<Verify/>} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/courses" element={<Courses />} />
          <Route exact path="/account" element={isAuth?<Account user={user}/>:<Login/>} />
          <Route exact path="/course/:id" element={isAuth?<CourseDescription user={user}/>:<Login/>}/>
          <Route exact path="/course/study/:id" element={isAuth?<CourseStudy user={user}/>:<Login/>}/>
          <Route exact path="/payment-success/:id" element={isAuth?<PaymentSuccess user={user}/>:<Login/>}/>
          <Route exact path=":id/dashboard" element={isAuth?<Dashboard/>:<Login/>}/>
          <Route exact path="/lectures/:id" element={isAuth?<Lecture user={user}/>:<Login/>}/>
          < Route exact path="/admin/dashboard" element={isAuth?<AdminDashboard user={user}/>:<Login/>}/>

          < Route exact path="/admin/courses" element={isAuth?<AdminCourses user={user}/>:<Login/>}/>

          < Route exact path="/admin/users" element={isAuth?<AdminUsers user={user}/>:<Login/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>)}
    </>
  )
}

export default App;
