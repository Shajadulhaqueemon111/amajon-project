import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../Firebase/Firebase.config';
export const AuthContext=createContext();
const auth = getAuth(app);
const AuthProvider = ({children}) => {

    const [user,setUser]=useState([])
    const [loading,setLoading]=useState(true)

    const userSingUp=(email,password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const userSingIn=(email,password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }
    const userSingOut=()=>{
        return signOut(auth)
    }
    useEffect(()=>{
       onAuthStateChanged(auth, (user) =>{
        setUser(user)
        setLoading(false)
        })

    },[])
    console.log(user)

    const userInfo={
        user,loading,userSingUp,userSingIn,userSingOut
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;