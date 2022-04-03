import React from 'react'
import { Route, Routes, Redirect } from 'react-router-dom'
import App from '../App'
import NotFoundPage from './404'

export default function Routers() {

   return(
      <Routes>
         <Route path='/channel' exact element={<App/>}>
            <Route path=':idUser' element={<App/>}>
               <Route path=':idServer' element={<App/>}>
                  <Route path=':idTextChannel' element={<App/>}/>
               </Route>
            </Route>
         </Route>
         <Route path='*' element={<NotFoundPage/>}/>
      </Routes>
   )
}