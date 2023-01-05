import logo from './logo.svg';
import React,{useeffect,createContext,useReducer, useEffect,useContext} from 'react';
//  import './App.css';
import Login from './components/Login';
import {useNavigate} from "react-router-dom"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Signup from './components/Signup'
import Profile from './components/Profile';
import Feed from './components/Feed';
import CreatePost from './components/createpost'
import {reducer,initialState} from './reducers/userReducer'
export const UserContext=createContext()
const Routing =()=>{
  const navigate = useNavigate();
  const {stae,dispatch}=useContext(UserContext)
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
      navigate("/")
    }else{
      navigate("/login")
    }
  },[])
  return(
          <Routes>
          <Route path='/createpost' element={<CreatePost/>}></Route>
          <Route path='/Feed' element={<Feed/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/' element={<Signup/>}></Route>
          <Route path='/Login' element={<Login/>}></Route>
          </Routes>
        )
}
function App() {
  const [state,dispatch]=useReducer(reducer,initialState)
  return (
    <div className="App">
      <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
      <Routing/>
      
      
      </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;
