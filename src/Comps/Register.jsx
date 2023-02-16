import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ContextPage } from '../Context/ContextProvider';
import { auth, addDoc, collection, db } from '../FireBase/firebase';

export default function Register() {
    
    const navigate = useNavigate();

    const {email, password, confirm, users, setEmail, setPassword, setConfirm, setUsers, addUsers} = useContext(ContextPage);

    function validateEmail(email) {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    const registerWithEmailAndPassword = async (email, password) => {
        try {
          const res = await auth.createUserWithEmailAndPassword(email, password);
          const user = res.user;
          await addDoc(collection(db, "users"), {
            uid: user.uid,
            authProvider: "local",
            email,
          });
          navigate('/');
        } catch (err) {
          alert(err.message);
        }
      };
      
    const btnAddUser = () => {
        registerWithEmailAndPassword(email, password);
        
        // if (password === confirm && validateEmail(email)) {
        //     addUsers(email, password);
        //     navigate('/');
        // }
        // else {
        //     alert('Error');
        // }
    }

  return (
    <div className="reg-page">
        <div className="reg">
        <h2>Register</h2>
            <div className="div">
                <p><label>Email: </label><input className="input-user" type="email" onChange={(e) => setEmail(e.target.value)}/> </p>
                <p><label>Password: </label><input className="input-user" type="password" onChange={(e) => setPassword(e.target.value)}/></p>
                <p><label>Confirm Password: </label><input className="input-user" type="password" onChange={(e) => setConfirm(e.target.value)}/></p>
            </div>
        <button type="button" className="btn btn-outline-secondary" onClick={btnAddUser}>Register</button><br />
        <p className="text-decoration-none" onClick={() => navigate('/')}>already signed up?</p>
        </div>
        <div className="right-reg">
        <h1>Dine<br/>In<br/>Time</h1>
        </div>
    </div>
  )
}
