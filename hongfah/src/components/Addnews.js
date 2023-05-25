import React, { useState } from 'react'
import moment from "moment";
import 'moment/locale/th'
import axios from "axios";
import Swal from "sweetalert2";



function Addnews(props) {

  const timestamp = new Date().getTime()

  const addnews = async () => {
    try {
      Swal.fire({
        icon: "success",
        title: "ส่งเอกสารสำเร็จ!",
        // footer: '<a href="">Why do I have this issue?</a>'
      });

      const object = {
        title:topic,
        date:formattedDate3,
        DateEnd:formatDateEnd,
        MonthShow:formattedDate2,
        descrip:details,
        image: image?timestamp+"_T_"+image.name:null,
        DateShow:formattedDate,
        File: image 
      };
      const getFormData = (object) =>
        Object.keys(object).reduce((formData, key) => {
          formData.append(`${key}`, object[key]);
          return formData;
        }, new FormData());
      axios.post("announce/news", getFormData(object), {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      submit()
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  
  moment.locale('th')
  const [date,setDate] = useState("")
  const [dateEnd,setDateEnd] = useState("")
  const dates = moment().add(543, 'year').format('MMMM')
  const dateCalendar = moment().format('Do');
  const time = moment().format("HH:mm")
  const [state, setState] = useState(0);
  // const [datenews,setDateNews] = useState("23 มกราคม พ.ศ. 2566")
  const [topic,setTopic] = useState("")
  const [details,setDetails] = useState("")
  const [image,setImage] = useState(null) 
  const [image2,setImage2] = useState(null) 
  const formattedDate = extractDate(date);
  const formattedDate2 = extractMonthThai(date);
  const formattedDate3 = formatDate(date);
  const formatDateEnd = formatDate(dateEnd);
  const submit = () => {
    props.data((news) => [
      ...news,
      { date: date, topic: topic, details: details, image: image, dates:dates },
    ]);
    props.submit()
  };

  const handleFile = (e) => {
    
    setImage2(URL.createObjectURL(e.target.files[0]))
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
      console.log(image);
    }
  };

  const SetTopic = (event) => {
    setTopic(event.target.value);
  };
  const SetDetails = (event) => {
    setDetails(event.target.value);
  };
  const SetDate = (event) => {

    setDate(event.target.value);
  };
  const SetDateEnd = (event) => {

    setDateEnd(event.target.value);
  };

  function formatDate(dateString) {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    return `${year}, ${month < 10 ? '0' : ''}${month}, ${day < 10 ? '0' : ''}${day}`;
  }

  function extractMonthThai(dateString) {
    const monthNamesThai = [
      'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
      'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];
  
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth();
  
    return monthNamesThai[month];
  }

  function extractDate(dateString) {
    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    return day;
  }
  
  const CheckNews=()=>{
    return(
      <div className='ml-[10%] mt-[3%]' >
      <label className='font-bold text-2xl' >{topic}</label>
      <p className='font-semibold text-lg ml-[1%] text-gray-500' >{date}</p>
      <img src={image2} className='w-[80vh] h-[60vh] ml-[20vh] my-[3vh]' ></img>
      <div className='w-[80%] ml-[5%] mb-[3%] font-semibold break-all' >
      <label>&emsp;&emsp;&emsp;&emsp;&emsp;{details} </label>
      </div>
      <div className="flex mt-[2%] ml-[65%]  mb-[3%]">
          <button
            className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px]"
            onClick={() => setState(0)}
          >
            แก้ไข
          </button>
          <button className="cursor-pointer font-medium p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%]" onClick={()=>addnews()} >
            ยืนยัน
          </button>
        </div>
      </div>
    );
  }


  return (<div>
    {state === 0 ?
       <div className="ml-[20%] mt-[3%] text-gray-500 ">
       <div className="flex mb-6">
         <label className="font-bold text-xl p-[10px] w-[17%] ">
           วันที่่
         </label>
         <input
                className="border-2 rounded-2xl border-black-500 p-[10px]  w-[28vh]"
                type="date"
                placeholder=""
                onChange={SetDate}
                value={date}
              />
              <label className="font-bold text-xl p-[10px] ">
           ถึง
         </label>
         <input
                className="border-2 rounded-2xl border-black-500 p-[10px]  w-[28vh]"
                type="date"
                placeholder=""
                onChange={SetDateEnd}
                value={dateEnd}
              />
       </div>
       <div className="flex">
         <label className="font-bold text-xl p-[10px] w-[17%] ">
           หัวข้อเรื่อง
         </label>
         <input
           className="border-2 rounded-lg border-black-500 p-[10px] mb-[30px] w-[50%]"
           type="text"
           placeholder="กรอกหัวข้อเรื่อง"
           onChange={SetTopic}
           value={topic}
         />
       </div>
       <div className="flex">
         <label className="font-bold text-xl p-[10px] w-[17%] ">
           รายละเอียด
         </label>
         <textarea
           className="border-2 rounded-lg border-black-500 p-[10px] mb-[30px] w-[50%] h-[200px] "
           placeholder="กรอกรายละเอียด"
           onChange={SetDetails}
           value={details}
         />
       </div>
       <div className="flex">
         <label className="font-bold text-xl p-[10px] w-[17%] ">
           แนบไฟล์รูปภาพ
         </label>
         {/* <textarea className="border-2 rounded-lg border-black-500 p-[10px] mb-[30px] w-[50%] h-[200px] " placeholder="กรอกรายละเอียด" /> */}
         <input
           type="file"
           name="img" accept="image/*"
           className="block w-full text-sm text-slate-500
   file:mr-4 file:py-2 file:px-4
   file:rounded-full file:border-0
   file:text-xl file:font-semibold 
   file:bg-violet-50 file:text-violet-700
   hover:file:bg-violet-100
    w-[50%] cursor-pointer"
         onChange={handleFile}
         />
       </div>
   
       <div className="flex cursor-pointer  mt-[1%] ml-[60%] ">
         {/* <label className="cursor-pointer font-medium  p-[10px] bg-[#FFAF10] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px]">
           ย้อนกลับ
         </label> */}
         <label className="cursor-pointer font-medium p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%]" onClick={() => setState(1)} >
           ถัดไป
         </label>
       </div>
     </div>:<CheckNews/>}
  </div>
    
  
  )
}

export default Addnews