import React,{useState,useContext} from 'react'
import './Navbar.css'
import {BrowserRouter,Route,Routes,Link} from 'react-router-dom'
import {useNavigate} from "react-router-dom"
import './Login.css'
import { UserContext } from '../App'
function Login() {
    const {state,dispatch}=useContext(UserContext)
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const navigate = useNavigate();
    const PostData=async(e)=>{
      e.preventDefault();
      console.log("inside postdata");
        const res=await fetch("/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Accept': 'application/json'
            },
            body:JSON.stringify({
                
                email,
                password//if(data.error){M.toast({html:data.error})}
            })
        })
        const data=await res.json();
        console.log(data);
        if(res.status===422||!data){
          window.alert("invalid credentials")

        }
        else{
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user",JSON.stringify(data.user))
          dispatch({type:"USER",payload:data.user})
          window.alert("Login Succesfull")
          navigate("/Feed");
        }
    }
  return (
    
   <div id="wrapper">
  <div className="main-content">
    <div className="header">
      <img src="https://i.imgur.com/zqpwkLQ.png" />
    </div>
    <div className="l-part">
      <input type="text" placeholder="Username" className="input-1" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
      <div className="overlap-text">
        <input type="password" placeholder="Password" className="input-2" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        
      </div>
      <input type="button" value="Log in" class="btn" onClick={(e)=>{PostData(e)}}/>
      
    </div>
  </div>
  <div className="sub-content">
    <div className="s-part">
      Don't have an account?<Link to="/">Sign up</Link>
    </div>
  </div>
</div> 
  )
}

export default Login