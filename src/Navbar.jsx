import React from 'react';
import { Link } from 'react-router-dom';
import { IoBagOutline } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import { useContext } from 'react';
import { userContext } from './providers/UserProvider';
import { IoLogOut } from "react-icons/io5";
import withCart from "./withCart";
function Navbar({ totalCount }) {  
  const{user , setUser}= useContext(userContext);
  console.log("user is ", user);
  function handleLogout(){
    localStorage.setItem("token", undefined);
    setUser(null);
  }

  console.log("Navbar is running..");
  return (
    <div className="py-4 bg-white shadow-lg">
      <div className="max-w-5xl flex justify-between mx-auto px-9">
        <img
          className="h-16"
          src="https://static.vecteezy.com/system/resources/previews/019/766/240/non_2x/amazon-logo-amazon-icon-transparent-free-png.png"
          alt="Amazon Logo"
        />
        <div className='flex justify-center items-center gap-1'> 
        <div className="flex flex-col justify-center items-center relative">
          <Link to ="./cartPag"> 
          <span className="text-5xl text-primary-default">
             <IoBagOutline /> 
          </span>
          <span className="text-primary-default text-sm absolute bottom-2 left-5">{totalCount}</span>
          </Link>
        </div>
        {!user && (<Link to={"/LoginPage"}><IoMdPerson className="text-5xl text-primary-dark inline-block"/></Link>)}
        {user &&(<button onClick={handleLogout}><IoLogOut className="text-5xl text-primary-dark inline-block"/></button>)}

      </div>
      </div>
    </div>
  );
}

export default  (withCart(Navbar));