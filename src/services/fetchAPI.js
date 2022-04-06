export async function fetchUser(idUser, accessToken) {

  if(idUser && accessToken) {

      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");
      headers.append("Origin", "http://localhost:3000");
      headers.append("x-access-token", accessToken)
    
      const res = await fetch(`http://localhost:5000/client/users/${idUser}`, {
        method: "GET",
        mode: "cors",
        headers: headers,
      }).catch((rejected) => {
        return [rejected];
      });
    
      const dataAPI = await res.json();
      if (!res.ok) {
        return [dataAPI];
      } else {
        return dataAPI;
      }
    } else {
      return {
        status: 400,
        message: "Invalid data!"
    }
  }
}

export async function fetchServer(idServer, accessToken) {

  if(idServer && accessToken) {

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("Origin", "http://localhost:3000");
    headers.append("x-access-token", accessToken)
  
    const res = await fetch(`http://localhost:5000/client/servers/${idServer}`, {
      method: "GET",
      mode: "cors",
      headers: headers,
    }).catch((rejected) => {
      return [rejected];
    });
  
    const dataAPI = await res.json();
    if (!res.ok) {
      return [dataAPI];
    } else {
      return dataAPI;
    }
  } else {
    return {
      status: 400,
      message: "Invalid data!"
  }
}
}

export async function fetchAPI(param) {

   let headers = new Headers();
   headers.append("Content-Type", "application/json");
   headers.append("Accept", "application/json");
   headers.append("Origin", "http://localhost:3000");
   // http://localhost:5000
   // https://team-dev1999.herokuapp.com/
   const res = await fetch(`http://localhost:5000/client/${param}`, {
     method: "GET",
     mode: "cors",
     headers: headers,
   }).catch((rejected) => {
     return [rejected];
   });
 
   const dataAPI = await res.json();
   if (!res.ok) {
     return [dataAPI];
   } else {
     return dataAPI;
   }
}