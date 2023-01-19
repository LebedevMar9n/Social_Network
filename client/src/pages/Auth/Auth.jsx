import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './Auth.css';
import Logo from "../../img/logo.png";
import { logIn, signUp } from '../../actions/AuthAction';


function Auth() {

  const [isSignUp, setIsSignUp] = useState(true);
  const [data, setData] = useState({ firstname: '', lastname: '', email: '', password: '', confirmpassword: '' });
  const [confirmPassword, setConfirmPassword] = useState(true);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpassword
        ? dispatch(signUp(data))
        : setConfirmPassword(false);
    } else {
      dispatch(logIn(data));
    }
  };
  const resetForm = () => {
    setConfirmPassword(true);
    setData({ firstname: '', lastname: '', email: '', password: '', confirmpassword: '' });
  };
  return (
    <div className='Auth'>
      {/* Left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Social Media</h1>
          <h6>Welcome to my App</h6>
        </div>
      </div>
      {/* Rigth side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>

          <h3>{isSignUp ? "Sign Up" : "Log In"}</h3>

          {isSignUp && <div>
            <input type="text"
              placeholder='First Name'
              className='infoInput'
              name='firstname'
              value={data.firstname}
              onChange={handleChange}
            />
            <input type="text"
              placeholder='Last Name'
              className='infoInput'
              name='lastname'
              value={data.lastname}
              onChange={handleChange}
            />
          </div>}

          <div>
            <input type="email"
              placeholder='Email'
              className='infoInput'
              name='email'
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input type="password"
              placeholder='Password'
              className='infoInput'
              name='password'
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && <input type="password"
              placeholder='Confirm Password'
              className='infoInput'
              name='confirmpassword'
              value={data.confirmpassword}
              onChange={handleChange}
            />}

          </div>
          <span style={{ display: confirmPassword ? "none" : 'block', color: 'red', fontSize: '12px', alignSelf: "flex-end", marginRight: '5px' }}>
            * Confirm password is not the same
          </span>
          <div>
            <span style={{ fontSize: '12px', cursor: 'pointer' }}
              onClick={() => {
                setIsSignUp((prev) => !prev); resetForm();
              }}>
              {isSignUp ? "Already have an account? Login!" : "Dont have an acoount? Sign Up!"}
            </span>
          </div>

          <button className='button infoButton' type='submit'>{isSignUp ? "Sign Up" : "Log In"}</button>
        </form>
      </div>
    </div >
  );
}

// function SignUp() {
//   return (
//     <div className="a-right">
//       <form className="infoForm authForm">
//         <h3>Sign up</h3>

//         <div>
//           <input type="text"
//             placeholder='First Name'
//             className='infoInput'
//             name='firstname'
//           />
//           <input type="text"
//             placeholder='Last Name'
//             className='infoInput'
//             name='lastname'
//           />
//         </div>
//         <div>
//           <input type="email"
//             placeholder='Email'
//             className='infoInput'
//             name='email'
//           />
//         </div>
//         <div>
//           <input type="text"
//             placeholder='Password'
//             className='infoInput'
//             name='password'
//           />
//           <input type="text"
//             placeholder='Confirm Password'
//             className='infoInput'
//             name='confirmpassword'
//           />
//         </div>

//         <div>
//           <span style={{ fontSize: '12px' }}>Already have an account. Login</span>
//         </div>

//         <button className='button infoButton' type='submit'>Sign up</button>
//       </form>
//     </div>
//   );
// }

export { Auth };