import React, { useContext } from 'react' 
import { useNavigate } from 'react-router-dom'
import { ContextPage } from '../Context/ContextProvider';
import { auth } from '../FireBase/firebase';

export default function Login() {

    const navigate = useNavigate();

    const {email, password, confirm, users, setEmail, setPassword, setConfirm, setUsers, addUsers} = useContext(ContextPage);

    const signInWithEmailAndPassword = async (email, password) => {
        try {
          await auth.signInWithEmailAndPassword(email, password);
          if(email === "admin@admin.com" && password === "admin123") {
            navigate('/addLists');
        } else {
            navigate('/home');
        }
        } catch (err) {
          alert(err.message);
        }
      };

    const btnLogin = () => {
        signInWithEmailAndPassword(email, password);           
                       
        // let user = users.find((user) => user.userEmail === email && user.userPassword === password);
        // if(user) {
        //     localStorage.setItem('user', JSON.stringify(user));
            //     if(email === "admin@admin.com" && password === "admin123") {
            //         navigate('/addLists');
            //     } else {
            //         navigate('/home');
            //     }
            // } else {
            //     return;
            // }
        // }
        // else {
        //     alert('Error');
        // }
    }

  return (
    <div className="log-page">
        <div className="left-log">
            <h1>Dine<br/>In<br/>Time</h1>
        </div>
        <div className="log">
        <h2>Login </h2>
            <div className="div">
                <p><label>Email: </label><input className="input-user" type="email" onChange={(e) => setEmail(e.target.value)}/> </p>
                <p><label>Password: </label><input className="input-user" type="password" onChange={(e) => setPassword(e.target.value)}/></p>
            </div>
        <button type="button" className="btn btn-outline-secondary" onClick={btnLogin}>Login</button><br />
        <p className="text-decoration-none" onClick={() => navigate('/register')}>press here to register</p>
        </div>  
    </div>   
  )
}