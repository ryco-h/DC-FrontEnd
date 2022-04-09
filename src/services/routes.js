import React from 'react'
import { Route, Routes, Redirect, Navigate } from 'react-router-dom'
import Main from '../components/Main/Main'
import Account from '../components/Account/Account'
import Home from '../components/Home/Home'
import NotFoundPage from './404'

export default function Routers() {

   return(
      <Routes>
         <Route path='/' element={<Navigate to='/@me'/>}/>
         <Route path='/login' element={<Account/>}/>
         <Route path='/register' element={<Account/>}/>
         <Route path='/@me' exact element={<Main/>}/>
         <Route path='/channel' element={<Main/>}>
            <Route path=':idServer' element={<Main/>}>
               <Route path=':idTextChannel' element={<Main/>}/>
            </Route>
         </Route>
         <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
   )
}