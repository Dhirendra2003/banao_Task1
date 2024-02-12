//import React from 'react'
import { Link } from "react-router-dom";

export default function ResetPass() {
  
  const login = async (e) => {
    e.preventDefault();

    const firstPass=document.getElementById('password').value;
    const secondPass=document.getElementById('pwd').value;
    console.log(firstPass===secondPass)
    if(firstPass===secondPass){
    
    const email = document.getElementById("email").value;
    const password = secondPass;

    let userObj = {
      email: email,
      password: password,
    };
    console.log(userObj);
    const response = await fetch("http://localhost:5000/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    const respdata = await response.json();
    window.alert(JSON.stringify(respdata));
    if (respdata.success) {
      console.log("redirected");
    }
  }//if end
  else{
    window.alert("please enter same password in repeat password")
  }
  };
  return (
    <div className=" w-full  p-20  bg-zinc-800 h-screen">
      <div className="w-[50vw] m-[auto] p-10 bg-white shadow-2xl rounded-lg">
        <h1 className="text-[1.5em] font-bold">Reset Password </h1>

        <div className="input">
        <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter your E-mail"
            className="border-2 rounded-lg my-3 p-2 w-full m-auto]"
          />
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Enter new password"
            className="border-2 rounded-lg my-3 p-2 w-full m-auto]"
          />
          <input
            id="pwd"
            type="password"
            name="pass"
            placeholder="Repeat password"
            className="border-2 rounded-lg my-3 p-2 w-full m-auto]"
          />
        </div>
        <div>
          <button
            className="flex bg-red-500 text-white rounded-full p-3 text-[1em] px-5 my-3 mx-[auto]"
            onClick={(e) => login(e)}
          >
            Reset password
          </button>

          <Link to="/register" className="text-orange-600 py-3 font-bold">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
