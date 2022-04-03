import React from 'react';
import { useLocation } from "react-router-dom";
import { makeStyles } from '@mui/styles';
import useWindowDimensions from '../../services/useWindowsDimension';

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
export default function Account() {

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
               <button className={classes.loginButton}>
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