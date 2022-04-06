import React, { useEffect, useLayoutEffect } from 'react';
import { withCookies, useCookies, Cookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

import { io } from 'socket.io-client'
const socket = io('http://localhost:5000/', {
   
   withCredentials: true,
   extraHeaders: {
      "my-custom-header": "abcd"
   }
})

function Home() {

   const [cookies, setCookies, removeCookies] = useCookies()
   const navigate = useNavigate()
   
   useLayoutEffect(() => {

      if(cookies.access_token === undefined) {
         navigate('/login')
      }
   })

   const logOut = () => {
      removeCookies('account_id')
      removeCookies('access_token')
   }

   return(
      <div>
         @me
         <button onClick={() => logOut()}>
            Log Out
         </button>
      </div>
   )
}

function AtMe() {
   
   const [cookies, setCookies, removeCookies] = useCookies()

   const logOut = () => {
      removeCookies('access_token')
   }

   return(
      <div>
         @me
         <button onClick={() => logOut()}>
            Log Out
         </button>
      </div>
   )
}

function Denied() {

   return(
      <div>
         Denied!
      </div>
   )
}


export default Home