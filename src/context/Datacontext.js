import React, { createContext, useEffect, useState } from 'react'

export const DContext = createContext()
function Datacontext(props) {
    const apiurl = process.env.REACT_APP_API_URL;

    const [Auth,setAuth]=useState(null)
  
  
   


    useEffect(()=>{
        
         if(apiurl){
          fetch(`${apiurl}/checkauth`,{
            method:"GET",
            credentials:'include'
          })
          .then(res=>res.json())
          .then(data=>{
            if(data.success === true){
              setAuth(data.user)
          }
            else{
              console.log(data.message)
            }
          })
          .catch(err=>{
            console.log("error fetching to username",err)
          })
         }
    
    
      },[apiurl])

console.log("auth",Auth)






    const data = {Auth,setAuth}
return (
   

   
        <DContext.Provider value={data}>
            {props.children}
        </DContext.Provider>
  )
}

export default Datacontext
