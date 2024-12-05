import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import auth from "../../config/firebase"// ../common folder outside ../component folder outside the config folder location was placed
import { signOut } from 'firebase/auth'

function Navbar() {
  const navigate = useNavigate()
  const [log, setLog] = useState(false)//user logged in false 

  //after login page reload and shown logout btn
  useEffect(() => {
    auth.onAuthStateChanged((user) => {//when Authentication state was changed
      if (user) {
        setLog(true)//user was logged in means setLog was true
        console.log("User Logged In")
      } else {
        setLog(false)//user was logged out means setLog false
        console.log("User Logged Out")
      }
    })
  }, [])//[]-dependency one time only load

  //when logout btn was clicked this signOut function will logout the user who logged in
  function logout() {
    signOut(auth)//signed in user was stored in auth variable
  }
  return (
    <div className='py-5 flex justify-between items-center'>
      <h2 className='text-2xl font-bold'>Personal</h2>
      <div className='flex items-center'>
        <Link className='list-none px-5' to={"/home"}>Home</Link>
        <Link className='list-none px-5' to={"/blogs"}>Blogs</Link>
        <Link className='list-none px-5'>About</Link>
        {
          //user was logged in means show logout btn
          log ? <button onClick={logout} className='button-style hidden md:block'>Logout</button> 
        : <button className='button-style hidden md:block' onClick={() => navigate("/login")}>Login</button> //user not login means show login btn
            }
      </div>
    </div>
  )
}

export default Navbar