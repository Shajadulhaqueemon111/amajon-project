import React, { useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider';

const Login = () => {

  const {userSingIn}=useContext(AuthContext)

  const navigate=useNavigate()
    const handelLogin=(e)=>{
        e.preventDefault()
        const email=e.target.email.value;
        const password=e.target.password.value;

        const newUser={
            email,
            password
        }

        console.log(newUser)

        userSingIn(email,password)
        .then(res=>{
          console.log(res.user)
          navigate(location?.state ? location?.state : '/')
        })
        .catch(error=>{
          console.log(error)
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
 
     
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handelLogin} className="card-body">
      <h1 className="text-3xl font-bold">Login now!</h1>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" name='email' placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span> 
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
          <p>
            Don't have your Account Please? 
            <Link className='text-red-500' to='/register'>Register</Link>
          </p>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default Login;