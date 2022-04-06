import React from 'react'
import { Route, Routes, Redirect } from 'react-router-dom'
import Main from '../components/Main/Main'
import Account from '../components/Account/Account'
import Home from '../components/Home/Home'
import NotFoundPage from './404'

export default function Routers() {

   return(
      <Routes>
         <Route path='/login' exact element={<Account/>}/>
         <Route path='/register' exact element={<Account/>}/>
         <Route path='/@me' exact element={<Main/>}/>
         <Route path='/channel' exact element={<Main/>}>
            <Route path=':idServer' element={<Main/>}>
               <Route path=':idTextChannel' element={<Main/>}/>
            </Route>
         </Route>
         <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
   )
}