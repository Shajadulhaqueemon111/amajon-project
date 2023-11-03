import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider';

const Header = () => {
    const {user,userSingOut}=useContext(AuthContext)

    const handelLogOut=()=>{
        userSingOut()
        .then(res=>{
            console.log(res.user)
        })
        .catch(error=>{
            console.log(error)
        })
    }
    return (
        <nav className='header'>
            <img src={logo} alt="" />
            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
              
                {
              user?<button onClick={handelLogOut} className='btn btn-secondary'>Sing-Out</button>:
            
          <Link to='/login'>
          <button  className='btn btn-secondary'>Login</button>
          </Link>
}
            </div>
        </nav>
    );
};

export default Header;