import { Link } from "react-router-dom";

export default function Register() {
  const register = async (e) => {
    e.preventDefault();
    const username = document.getElementById("name").value;
    const email = document.getElementById("mail").value;
    const password = document.getElementById("pwd").value;

    let userObj = {
      username: username,
      password: password,
      email: email,
    };
    console.log(userObj);
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });

    const respdata = await response.json();
    window.alert(JSON.stringify(respdata));
  };
  return (
    <div className=" w-full  p-20  bg-zinc-800 h-screen">
      <div className="w-[50vw] m-[auto] p-10 bg-white shadow-2xl rounded-lg">
        <h1 className="text-[1.5em] font-bold">Sign Up </h1>

        <div className="input">
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            className="border-2 rounded-lg my-3 p-2 w-full m-auto]"
          />
          <input
            id="mail"
            type="email"
            name="email"
            placeholder="E-mail"
            className="border-2 rounded-lg my-3 p-2 w-full m-auto]"
          />
          <input
            id="pwd"
            type="password"
            name="pass"
            placeholder="password"
            className="border-2 rounded-lg my-3 p-2 w-full m-auto]"
          />
        </div>
        <div>
          <button
            className="flex bg-red-500 text-white rounded-full p-3 text-[1em] px-5 my-3 mx-[auto]"
            onClick={(e) => register(e)}
          >
            sign up
          </button>

          <Link to="/login" className="text-orange-600 py-3 font-bold">
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
}
