import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import useWindowDimensions from '../../services/useWindowsDimension';
import axios from 'axios';
import { withCookies, useCookies, Cookies } from 'react-cookie';

// http://localhost:5000-
// https://team-dev1999.herokuapp.com-

import { io } from 'socket.io-client'
const socket = io('http://localhost:5000/', {
   
   withCredentials: true,
   extraHeaders: {
      "my-custom-header": "abcd"
   }
})

let useStyles = makeStyles({

   root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: props=> `${props.width}px`,
      height: props=> `${props.height}px`,//`${height}px`
      backgroundColor: '#4A4A50'
   },
})

let useStylesLogin = makeStyles({

   root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '40%',
      maxWidth: '60%',
      padding: '2vw',
      height: '40%',
      backgroundColor: '#5c5c62',
   },
   title: {
      display: 'flex',
      flex: '1',
      color: 'white'
   },
   legend: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'center',
      margin: '1vw',
      width: '100%',
      background: 'green'
   },
   legendBox: {
      width: '100%'
   },
   loginBox: {
      display: 'flex',
      flexDirection: 'column',
      flex: '2',
      background: 'green'
   },
   loginButton: {
      width: 'inherit'
   }
})
function Account() {

   const location = useLocation()
   const {width, height} = useWindowDimensions()
   const classes = useStyles({width, height})

   if(location.pathname === '/login') {
      return(
         <div className={classes.root}>
            <Login/>
         </div>
      )
   } else if(location.pathname == '/register') {
      return(
         <div className={classes.root}>
            <Register/>
         </div>
      )
   }
}

function Login() {

   const classes = useStylesLogin()
   const navigate = useNavigate()
   const [cookies, setCookies] = useCookies(['access_token'])

   socket.on('LogIn', data => {

      setCookies('account_id', JSON.stringify(data.userAccount_id), {path: '/'})
      setCookies('access_token', JSON.stringify(data.token), {path: '/'})
      console.log(data.token)
   })

   const [loginData, setLoginData] = useState({

      username: 'guntur',
      password: 'guntur'
   })

   const handleLogin = () => {

      axios.post('http://localhost:5000/client/users/login', loginData)
      .then(() => {
         navigate('/@me')
      })
      .catch(err => {
         alert(err.response.data)
      })
   }

   return(
      <div className={classes.root}>
         <div className={classes.title}>
            Login
         </div>
         <div className={classes.loginBox}>
            <div className={classes.legend}>
               <span>Username</span>
               <input name='username' className={classes.legendBox}/>
            </div>
            <div className={classes.legend}>
               <span>Password</span>
               <input name='password' className={classes.legendBox}/>
            </div>
            <div className={classes.legendBox}>
               <button className={classes.loginButton} onClick={() => handleLogin()}>
                  Log In
               </button>
            </div>
         </div>
      </div>
   )
}

function Register() {

   return(
      <div>
         Register
         <input name='username'/>
         <input name='password'/>
      </div>
   )
}

export default Account