import React,{useState,useEffect,useContext} from 'react'
import './feed.css'
import {useNavigate} from "react-router-dom"
import { UserContext } from '../App'
function Feed() {
  const {state,dispatch}=useContext(UserContext)
  const [data,setData]=useState([]);
  // useEffect(async()=>{
  //   fetchdata();
    
  // },[])
  const fetchdata=async(e)=>{
    const res=await fetch('/allpost',{
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    })
    // .then((res)=>{res.json()})
    // .then(result=>{setData(result.posts)})
    const out=await res.json()
     setData(out.posts)
    console.log(data)
  }
  const navigate = useNavigate();

  const makeComment=async(text,postId)=>{
    const res=await fetch('/comment',{
      method:"put",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        postId,
        text
      })
    })
    const result=await res.json();
    const newData=data.map(item=>{
      if(item._id==result._id){
        return result
      }else{
        return item
      }
      
    })
    setData(newData)
  }
  return (
    <>
    <div style={{padding:"20px 40px",backgroundColor:"lightseagreen",fontSize:"40px"}}>
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Instagram</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        
      <i class="large material-icons" onClick={()=>{navigate("/createpost")}} >add_a_photo</i>
      <button style={{backgroundColor:"transparent",border:"none",padding:"0px 10px -10px 10px",backgroundColor:"transparent",border:"none",padding:"0px 51px"}}onClick={()=>{
        localStorage.clear()
        dispatch({type:"CLEAR"})
        navigate("/")
      }}>Logout</button>
      </ul>
    </div>
    
    </div>
    
    
    <div className="home">
    <button onClick={(e)=>{fetchdata(e)}}>click</button>
    {
      
      data.map(item=>{
        return(
          <div className='card home-card'>
          <h5>{item.postedBy.name}</h5>
          <div className='card-image'>
              <img src={item.photo}/>
          </div>
          <div className='card-content'>
          <i class="material-icons" style={{color:"red"}}>favorite</i>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {
                item.comments.map(record=>{
                  return(
                    <h6><span style={{fontWeight:"500"}}>{record.postedBy.name}</span>{record.text}</h6>
                  )
                })
              }
              <form onSubmit={(e)=>{
                e.preventDefault();
                makeComment(e.target[0].value,item._id)
              }}>
              <input type="text" placeholder='add a comment'/>
              </form>
              
          </div>
        </div>
        )
      })
    }
      
    </div>
    </>

  )
}

export default Feed