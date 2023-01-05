import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
function Createpost() {
  const navigate = useNavigate();
  const [title,setTitle]=useState("");
  const [body,setbody]=useState("");
  const [image,setImage]=useState("");
  const [url,setUrl]=useState("");
  const PostDetails=async(e)=>{
    e.preventDefault();
    console.log("inside postdetails")
    const data=new FormData();
    data.append("file",image)
    data.append("upload_preset","InstaClone")
    data.append("cloud_name","dtafddvtl")
    //posting to cloudinary
    const res=await fetch("https://api.cloudinary.com/v1_1/dtafddvtl/image/upload",{
      method:"post",
     body:data
               })
        const data1=await res.json();
        console.log(data1.url)
        setUrl(data1.url)
        
        if(!data1){
          window.alert("response is not present");
        }
        else{
          window.alert("uploaded successfully")
          //navigate("/Feed");
        }

//connecting to backend
        const response=await fetch("/createpost",{
          method:"post",
      headers:{
        "Content-Type":"application/json",
        'Accept': 'application/json',
        'Authorization':"Bearer "+localStorage.getItem("jwt")
    },
    body:JSON.stringify({
        title,
        body,
        pic:url//if(data.error){M.toast({html:data.error})}
    })
      
  })
  const data2=await response.json()//.then((res)=>{setUrl(res.url)});
  
       
        
        if(res.status===422||!data2){
          window.alert("error")

        }
        else{
          //console.log(url)
          window.alert("posted to db successfully")
          //navigate("/Login");
        }
  }

  return (
    <div classNameName='card input-filed' style={{margin:"10px auto", maxWidth:"500px",padding:"20px",textAlign:"center"}}>
        <input type='text' placeholder='title' value={title} onChange={(e)=>setTitle(e.target.value)}/>
        <input type='text' placeholder='body' value={body} onChange={(e)=>setbody(e.target.value)}/>
        <div className="file-field input-field">
      <div className="btn">
        <span>Upload Image</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text"/>
      </div>
    </div>
    <button className="btn waves-effect waves-light" type="submit" name="action" onClick={(e)=>{PostDetails(e);navigate('/Feed')}}>Submit
    <i className="material-icons right">send</i>
  </button>
  
    </div>
  )
}

export default Createpost