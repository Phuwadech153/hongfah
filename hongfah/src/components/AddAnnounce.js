import React, { useState } from "react";
import moment from "moment";
import 'moment/locale/th'
import { connect } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";



function AddAnnounce(props) {

  const Announcer = `เจ้าหน้าที่ ${props.posts[0].user.user.FirstName}${" "}${props.posts[0].user.user.Lastname}`


  // const addAnnounce = async () => {
  //   try {
  //     Swal.fire({
  //       icon: "success",
  //       title: "ส่งเอกสารสำเร็จ!",
  //       // footer: '<a href="">Why do I have this issue?</a>'
  //     });
  //     submit()
  //     const object = {
  //       announcer: Announcer,
  //       date: date,
  //       time: time,
  //       title: Title 
    
  //     };
  //     const getFormData = (object) =>
  //       Object.keys(object).reduce((formData, key) => {
  //         formData.append(`${key}`, object[key]);
  //         return formData;
  //       }, new FormData());
  //     axios.post("announce", getFormData(object), {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     console.log(object)
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //   }
  // };
  
  const addAnnounce = async () => {
    try {

      Swal.fire({
        icon: "success",
        title: "โพสสำเร็จ!",
      });
      axios.post(`announce`, {
        announcer: Announcer,
        date: date,
        time: time,
        title: Title 
      });
      submit()
    } catch (error) {
      console.log(error);
    } finally {
    }
  };


  moment.locale('th')
  const date = moment().add(543, 'year').format('DD MMMM YYYY')
  const time = moment().format("HH:mm")

  const submit = () => {
    props.data((announce) => [
      ...announce,
      { announcer: Announcer, date: date, time: time, title: Title },
    ]);
    props.submit()
  };
  //   const inputTitle = (event)=>{
  //     setTitle(event.target.value)

  // }

  const [state, setState] = useState(0);
  // const [Time, setTime] = useState("11:58 น.");
  const [Title, setTitle] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const Checkinfo = () => {
    return (
      <div>
        <div className="relative bg-gray-100 rounded-lg w-[80%] p-[30px] h-[250px] my-[2%] ml-[6%] font-medium">
          <label>{Title} </label>
          <div className="absolute bottom-5 right-5">
            <label className="justify-self-end ">{props.posts[0].user.user.FirstName}{" "}{props.posts[0].user.user.Lastname}
            </label>
            <p className="justify-self-end">
              {time} {date}
            </p>
          </div>
        </div>
        <div className="flex mt-[1%] ml-[65%] ">
          <button
            className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px]"
            onClick={() => setState(0)}
          >
            แก้ไข
          </button>
          <button className="cursor-pointer font-medium p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%]" onClick={()=>addAnnounce()} >
            ยืนยัน
          </button>
        </div>
      </div>
    );
  };

  return(
    <div>
      {state === 0 ?       <div className="ml-[20%] mt-[3%] text-gray-500 ">
        <div className="flex">
          <label className="font-bold text-xl p-[10px] w-[17%] ">
            ผู้ประกาศ
          </label>
          <label className="text-xl font-bold p-[10px] mb-[30px] w-[30%]">
          {props.posts[0].user.user.FirstName}{" "}{props.posts[0].user.user.Lastname}
          </label>
        </div>
        <div className="flex">
          <label className="font-bold text-xl p-[10px] w-[17%] ">วันที่</label>
          <label className="text-xl font-bold p-[10px] mb-[30px] w-[30%]">
            {date}
          </label>
        </div>
        <div className="flex">
          <label className="font-bold text-xl p-[10px] w-[17%] ">เวลา</label>
          <label className="text-xl font-bold p-[10px] mb-[30px] w-[30%]">
            {time}
          </label>
        </div>
        <div className="flex">
          <label className="font-bold text-xl p-[10px] w-[17%] ">
            รายละเอียด
          </label>
          <textarea
            className="border-2 rounded-lg border-black-500 p-[10px] mb-[30px] w-[50%] h-[200px] "
            placeholder=""
            type="text"
            onChange={handleChange}
            value={Title}
          />
        </div>

        <div className="flex cursor-pointer  mt-[1%] ml-[60%] ">
          {/* <label className="cursor-pointer font-medium  p-[10px] bg-[#FFAF10] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px]">
        ย้อนกลับ
      </label> */}
          <label
            className="cursor-pointer font-medium p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%]"
            onClick={() => setState(1)}
          >
            ถัดไป
          </label>
        </div>
      </div>: <Checkinfo />}
    </div>
      )
}
const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};

export default connect(mapStateToProps)(AddAnnounce);
