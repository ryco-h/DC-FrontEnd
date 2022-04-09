import React, { createRef, useEffect, useLayoutEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import './Main.css';
import { fetchAPI, fetchServer, fetchUser } from '../../services/fetchAPI';
import DeleteIcon from '@mui/icons-material/Delete';
import ScrollToBottom from 'react-scroll-to-bottom';
import useWindowDimensions from '../../services/useWindowsDimension';
import { makeStyles } from '@mui/styles';
import { Skeleton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
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
    alignItems: 'center',
    width: props=> `${props.width}px`,
    height: props=> `${props.height}px`,//`${height}px`
    backgroundColor: '#3D3E45'
  },
  upperPanel: {
    width: '100%',
    height: '15%',
    color: 'white',
    fontSize: 'calc(10px + 2vmin)', 
  },
  upperPanelDetail: {
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  bodyPanel: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: props=> `calc(${props.width}px)`,
    height: props=> `calc(${props.height}px)`,//`${height}px`,
  },
  bodyLeftServer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    color: 'white',
    flex: .3,
    height: '100%',
  },
  bodyLeft: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    color: 'white',
    height: '100%',
  },
  bodyLeftTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px'
  },
  channelButton: {
    display: 'flex',
    flexDirection: 'column',
    margin: '1vmax',
    marginLeft: '4vmax',
    fontSize: '20px',
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none'
  },
  boxChatPanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: '2',
    height: '100%',
    backgroundColor: '#4A4A50'
  },
  boxScrollPanel: {
    display: 'flex',
    overflowX: "hidden",
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
      backgroundColor: '#F5F5F5',
    },
    '&::-webkit-scrollbar': {
      borderRadius: '10px',
      'width': '5px',
      backgroundColor: '#F5F5F5',
    },
    '&::-webkit-scrollbar-thumb': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
      borderRadius: '10px',
      backgroundColor: '#555',
    },
  },
  boxChat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1vmax',
    width: 'inherit',
    height: props=> `calc(${props.height}px - 200px)`,//`${height}px`
  },
  bodyRight: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1',
    color: 'white',
    height: '100%',
  },
  bodyRightTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '30px'
  },
  userButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    margin: '1vmax',
    marginLeft: '4vmax',
    fontSize: '20px'
  },
})

function Main() {
  
   const { height, width } = useWindowDimensions()
   const classes = useStyles({width, height})
   const [loading, setLoading] = useState(true)
   const [messages, setMessages] = useState([])
   const [cookies, setCookies, removeCookies] = useCookies()
   const navigate = useNavigate()
      
   const [selectedTextChannel, setSelectedTextChannel] = useState('')

   useEffect(() => {
      if(cookies.access_token === undefined) {
         navigate('/login')
      }
      if(!userProfile) {
         setLoading(true)
         fetchUser(cookies.account_id, cookies.access_token).then(res => {
            setUserProfile(res[0])
            setLoading(false)
            res[0].listServer.map(dataServer => {
               setListServerId(listServerId => [...listServerId, {idServer: dataServer._id, serverName: dataServer.serverName}])
            })
         })
      }
   }, [cookies.access_token])

   const [dataServer, setdataServer] = useState('')
   const [userProfile, setUserProfile] = useState('')
   const [listServerId, setListServerId] = useState([])
   const [selectedServer, setSelectedServer] = useState('')

   useLayoutEffect(() => {
      
      setLoading(true)

      if(selectedServer && cookies.access_token) {

         fetchServer(selectedServer, cookies.access_token).then(res => {
            setdataServer(res[0])
            setSelectedTextChannel(res[0].textChannel[0]._id)
         })
      }
      setLoading(false)
      //  fetchAPI(`users/login/${params.idUser}`).then(res => (
      //    res.map(dataServer => {
      //      setdataServer(dataServer)
      //      dataServer.listServer.map(server => {
      //        setSelectedServer(server._id)
      //        setSelectedTextChannel(server.textChannel[0]._id)
      //        setMessages(server.textChannel[0].messages)
      //        finalMessage['textChannelId'] = server.textChannel[0]._id
      //        setFinalMessage(finalMessage)
      //      })
      //      setLoading(false)
      //    })
      //  ))
      //  .catch(error => alert("ID unavailable!\n" + error.response))
 
   }, [selectedServer, selectedTextChannel])
  
   socket.on('MessageSent', data => {
      
      setMessages([...messages, data])
   })

   socket.on('DeletedMessage', data => {

      setMessages(messages.filter(message => message._id !== data.idMessage))
   })

   const [listServerUser, setListServerUser] = useState([])

   const getDataServer = () => { 

      if (dataServer.listServer.length > 0) { 
         dataServer.listServer.map(server => {
         console.log(`servers/${server}`)
         setListServerUser(...listServerUser, fetchAPI(`servers/${server._id}`).then(res => console.log(res)))
         })
      }
   }

   const textChannelHandler = channelId => {

      setSelectedTextChannel(channelId)
      finalMessage['textChannelId'] = channelId
      setFinalMessage(finalMessage)
      dataServer.textChannel.filter(dataChannel => 
            dataChannel._id === channelId
         ).map(data => 
            setMessages(data.messages)   
      )
   }

   const serverHandler = serverId => {

      console.log(dataServer)
      setSelectedServer(serverId)
      if(dataServer) {
         textChannelHandler(dataServer.textChannel[0]._id)
      }
   }

   const convertDateFormat = timeStamp => {

      var date, month, year, hours, minutes
      timeStamp = new Date(timeStamp)
      date = timeStamp.getDate()
      month = timeStamp.getMonth()
      year = timeStamp.getFullYear()
      hours = timeStamp.getHours()
      minutes = timeStamp.getMinutes()

      var dateNow = new Date()

      var finalTimeStamp = () => {
         if (dateNow.getDate() === date) {
         return `Today at ${hours +' : '+ minutes}`
         } else if (dateNow.getDate() - date === 1) {
         return `Yesterday at ${hours +' : '+ minutes}`
         }
         else {
         return date + '/' + month + '/' + year
         }
      }

      return finalTimeStamp()
   }

   const formData = new FormData()
   const [message, setMessage] = useState('')
   const [finalMessage, setFinalMessage] = useState({
      userId: '6232e28a6d9f7c203985ad4a',
      textChannelId: '',
      serverId: '6232fab85a32aa9c4c855bc1',
      message: '',
   })

   const handleMessageChange = (e) => {

      finalMessage['message'] = e.target.value
      setMessage(finalMessage)
   }

   const sendMessage = async (event) => {

      event.preventDefault()

      formData.Mainend('userId', finalMessage.userId)
      formData.Mainend('textChannelId', finalMessage.textChannelId)
      formData.Mainend('serverId', finalMessage.serverId)
      formData.Mainend('message', finalMessage.message)

      let headers = new Headers();

      headers.Mainend('Content-Type', 'Mainlication/json');
      headers.Mainend('Origin', '*');
      headers.Mainend('Accept', '*/*')

      const data = JSON.stringify({
         userId: window.location.pathname.replace('/', ''),
         textChannelId: finalMessage.textChannelId,
         serverId: finalMessage.serverId,
         message: finalMessage.message
      })

      
      axios.post('http://localhost:5000/client/servers/text-channel/message', data, {
         headers: {
         'content-type': 'Mainlication/json'
         }
      })
      .catch(error => console.error(error.response.data))
   }

   const deleteMessage = (idTextChannel, idMessage) => {

      if (window.confirm('Delete message?')) {
         axios.delete(`http://localhost:5000/client/servers/text-channel/${idTextChannel}/${idMessage}`)
         .then(res => 
         {
         //
         })
      } else {
         // 
      }
   }

   const placeHolder = () => {

      var rows = [], i = 0, len = 10;
      while (++i <= len) rows.push(i);

      return rows
   }

   const logOut = () => {
      removeCookies('account_id')
      removeCookies('access_token')
   }
   
   return (
      <div className={classes.root}>

         <div className={classes.upperPanel}>
         {(loading) && <SkeletonChat panel={'top'} className={classes.upperPanelDetail}/>}
            <div className={classes.upperPanelDetail}>
               <div>
               Logged in as {userProfile.nickname}
               </div>
               <button onClick={() => logOut()}>
                  Log out
               </button>
            </div>
         </div>

         <div className={classes.bodyPanel}>

            <div className={classes.bodyLeftServer}>
               {(listServerId) && listServerId.map(server => (
                  <button key={server.idServer} onClick={() => serverHandler(server.idServer)} style={{padding: '1vw'}}>
                     {server.serverName}
                  </button>
               ))}
            </div>

            <div className={classes.bodyLeft}>
               {(loading) 
                  ? 
                  <SkeletonChat panel={'span'} className={classes.bodyLeftTitle}/>
                  :
                  <div className={classes.bodyLeftTitle}>
                     Text Channel
                     <div>
                        <AddIcon className='button'/>
                     </div>
                  </div>
               }
               {(loading) && <SkeletonChat panel={'side'} className={classes.channelButton}/>}
               
               {(dataServer.textChannel) && dataServer.textChannel.map(textChannel =>
                  (
                  <div key={textChannel._id} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                     <Link to={`/channel/${selectedServer}/${textChannel._id}`} className={classes.channelButton} onClick={() => textChannelHandler(textChannel._id)}>
                        {textChannel.channelName}
                     </Link>
                     <div onClick={() => deleteMessage(selectedTextChannel, textChannel._id)} className={`button ${classes.channelButton}`}>
                        <DeleteIcon style={{cursor: 'pointer'}}/>
                     </div>
                  </div>
                  )
               )}
            </div>

            <div className={classes.boxChatPanel} >
               <ScrollToBottom key={selectedTextChannel} scrollViewClassName={classes.boxScrollPanel} initialScrollBehavior={'auto'}>
                  <div className={classes.boxChat}>
                  {(loading) &&
                  <div className='message'>
                     {placeHolder().map(i => (
                        <SkeletonChat panel='body' key={i}/>
                     ))}
                  </div>
                  }
                  {(messages !== undefined) 
                     ? 
                     messages.map(message => (
                        <div className='message' key={message._id}>
                           <div className='upper-message'>
                              <div style={{fontSize: '20px', marginRight: '1vw'}}>
                              {message.userId.nickname}
                              <span style={{fontSize: "14px"}}> (User ID: {message.userId._id})</span>
                              </div>

                              <div style={{fontSize: '13px'}}>
                              {convertDateFormat(message.dateCreated)}
                              </div>
                           </div>

                           <div className='lower-message'>
                              <div>
                              {message.message}
                              </div>

                              <div onClick={() => deleteMessage(selectedTextChannel, message._id)} className="button">
                              <DeleteIcon style={{cursor: 'pointer'}}/>
                              </div>
                           </div>
                        </div>
                        ))
                     :
                        null
                  }
                  </div>
               </ScrollToBottom>

               <div className='send-message' style={{display: 'flex', justifyContent: 'center'}}>
                  <form onSubmit={(e) => sendMessage(e)}>
                  <input onChange={(e) => handleMessageChange(e)} style={{width: 'inherit'}}/>
                  <button type="submit">
                     Send
                  </button>
                  </form>
               </div>
            </div>

            <div className={classes.bodyRight}>
               {(loading) 
                  ? 
                  <SkeletonChat panel={'span'} className={classes.bodyRightTitle}/>
                  :
                  <div className={classes.bodyRightTitle}>
                     List User
                  </div>
               }
               {(loading) && <SkeletonChat panel={'side'} className={classes.channelButton}/>}
               {(dataServer.listUser) && dataServer.listUser.map(user =>
                  (
                  <Tooltip key={user._id} title={user._id}>
                     <div className={classes.userButton}>
                        {user.nickname}
                     </div>
                  </Tooltip>
                  )
               )}
            </div>
         </div>
      </div>
   );
}


function SkeletonChat({panel, className}) {
  
   switch (panel) {
      case('span'):
         return(
            <div className={className}>
                  <Skeleton animation="wave" width={'30%'}/>
            </div>
         )
      case('top'):
         return(
            <div className={className}>
                  <Skeleton animation="wave" width={'10%'}/>
                  <Skeleton animation="wave" width={'15%'}/>
            </div>
         )
      case('side'):
         return(
            <div className={className}>
               <Skeleton animation="wave" width={'70%'}/>
               <Skeleton animation="wave" width={'70%'}/>
               <Skeleton animation="wave" width={'70%'}/>
            </div>
         )
      case('body'):
         return(
            <div className='message'>
               <div className='upper-message'>
                  <div style={{width: '15%'}}>
                  <Skeleton animation="wave" width={'100%'}/>
                  </div>
               </div>

               <div className='lower-message'>
                  <Skeleton animation="wave" width={'70%'}/>
               </div>
            </div>
         )
   }
}

export default Main;
