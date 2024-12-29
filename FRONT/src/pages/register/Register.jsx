import { useState } from "react";
import "./register.css";
import { Link, useNavigate } from 'react-router-dom'
export default function Register() {
  const[user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    confirmPass:'',
    profilePicture: null,
    coverPage:null,
  })

  const navigate = useNavigate()

  const handelInput = (e) =>{
    const {name, value} = e.target;
    setUser((prevState)=>({
      ...prevState,
      [name]:value,
    }))
  }

  const handleFileChange = (e) =>{
    const {name, file} = e.target;
    setUser((prevState)=>({
      ...prevState,
      [name]: file[0],
    }))
  }
  const handleSubmit = async (e) =>{
    e.preventDefault();

    const formData = new FormData()
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('confirmPass', user.confirmPass);

    if(user.profilePicture) formData.append('profilePicture', user.profilePicture);
    if(user.coverPicture) formData.append('coverPicture', user.coverPicture);

    try{
      let response =  await fetch('http://localhost:3000/api/auth/register',{
        method:'POST',
      body: formData
      })
      if(response.ok){
        const resposeData = await response.json()
        alert('Registration successful')
        setUser({username:'', email:'', password:'',confirmPass:'', profilePicture:null, coverPicture:null})
        console.log(resposeData);
      }else{
        console.log('error inside respose');
      }
      }catch(err){
        console.log('error',err);
      }
      navigate('/login')
    }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Facebook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Facebook.
          </span>
        </div>
        <div className="loginRight">
          <div className="loginBox">
            <form onSubmit={handleSubmit}>
              <input type="text" name="username" value={user.username} onChange={handelInput} placeholder="Username" className="loginInput"/>

              <input type="email" name="email" value={user.email} onChange={handelInput} placeholder="Email" className="loginInput"/>

              <input type="password" name="password" value={user.password} onChange={handelInput} placeholder="PassWord" className="loginInput"/>

              <input type="password" name="confirmPass" value={user.confirmPass} onChange={handelInput} placeholder="ConfirmPass" className="loginInput"/>

              <input type="file" name="profilePicture" value={user.profilePicture} onChange={handelInput} placeholder="ProfilePicture" className="loginInput"/>

              <input type="file" name="coverPicture" value={user.coverPicture} onChange={handelInput} placeholder="CoverPicture" className="loginInput"/>

              <button className="loginButton" type="submit">Sign Up</button>
              <Link to='/login'>
              <button className="loginRegisterButton">Log into Account</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}