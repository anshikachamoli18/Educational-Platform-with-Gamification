import React, { useState } from 'react';
import './AdminUsers.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from '../Utils/Layout';

const AdminUsers = ({user}) => {
  const navigate=useNavigate();
  if(user && user.role !== 'admin'){
    return navigate('/');
  }
  const [users,setUsers]=useState([]);

  async function fetchUsers(){
    try{
        const {data}=await axios.get('http://localhost:5000/api/users',
          {
            headers:{
              token:localStorage.getItem('token')
          }
        }
        );
        setUsers(data.users);
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchUsers();
  },[]);

  const updateRole=async(id)=>{
    if(confirm("Are you sure you want to update this user role"))
    {
    try{
      const {data}=await axios.put(`http://localhost:5000/api/users/${id}`,
        {},
        {
          headers:{
            token:localStorage.getItem('token')
          }
        }
      );
      toast.success(data.message);
      fetchUsers();
    }
    catch(error){
     Toast.error(error.response.data.error);
    }
  }
  }
  return (
    <Layout>
      <div className="users">
        <h1>Users</h1>
        <table border={"black"}>
              <thead>
                <tr>
                  <td>#</td>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Role</td>
                  <td>Update Role</td>
                </tr>
              </thead>
                {
                  users&&users.map((e,i)=>
                  {
                    <tbody>
                      <tr>
                        <td>{i+1}</td>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.role}</td>
                        <td>
                          <button className='common-btn' onClick={()=>updateRole(e._id)}>Update Role</button>
                        </td>
                      </tr>

                    </tbody>
                  })
                }
        </table>
      </div>
    </Layout>
  )
}

export default AdminUsers;
