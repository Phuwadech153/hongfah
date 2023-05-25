import React, { useState,useEffect } from 'react'
import axios from "axios";

function Announce(props) {

  const [announce,setAnnounce] = useState([]) 

  const fetchAnnounce = async () => {
    try {
      const { data } = await axios.get(
        `announce`
      );
      console.log(data);
      setAnnounce(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    fetchAnnounce();
  }, []);

const Announcement = ()=>{
  
  return (<>
    {announce.map((element,index)=>{
      return (
        // transition duration-100 hover:translate-y-[-3px]
        <div className="relative bg-gray-100 rounded-lg w-[80%] p-[30px] h-[250px] my-[2%] ml-[6%] font-medium " key={index} >
        <label>{element.title} </label>
        <div className="absolute bottom-5 right-5" >
          <label  >{element.announcer}</label>
          <p  >{element.time} {element.date}</p>
        </div>
      </div>
      )
  })}
   
  </>)
}
  return (
  props.data !== undefined && <Announcement/>
  )
}

export default Announce


