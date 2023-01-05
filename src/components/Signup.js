import React,{useState} from 'react'
import './Signup.css'
import {useNavigate} from "react-router-dom"
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import M from 'materialize-css'
function Signup() {
    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const navigate = useNavigate();
    const PostData=async(e)=>{
      e.preventDefault();
      console.log("inside postdata");
        const res=await fetch("/Signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                password//if(data.error){M.toast({html:data.error})}
            })
        })
        const data=await res.json();
        console.log(data);
        if(res.status===422||!data){
          window.alert("invalid registration")

        }
        else{
          window.alert("registration Succesfull")
          navigate("/Login");
        }
    }
  return (

<div className="signup-form">
    <h1>Sign up for Instagram</h1>
    <form method='POST'>
      <input type="text" name="username" placeholder="Username" value={name} onChange={(e)=>{setName(e.target.value)}}/>
      <input type="email" name="email" placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <input type="password" name="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
      <button type="submit" className="btn" onClick={(e)=>{PostData(e)}}>Sign up</button>
    </form>
    <div className="option">
     <p>Have an account?
     <button ><Link to="/Login">Log in</Link></button></p>
  </div>
  </div>



  )
}

export default Signup