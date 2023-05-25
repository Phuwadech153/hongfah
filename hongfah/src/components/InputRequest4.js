import React, { useState, useRef,useEffect } from "react";
import InputRequest1 from "./InputRequest1";
import InputRequest2 from "./InputRequest2";
import InputRequest3 from "./InputRequest3";
import InputRequest5 from "./InputRequest5";
import InputRequest6 from "./InputRequest6";
import moment from "moment";
import "moment/locale/th";
import ReactPrint from "react-to-print";
import logo_it from "../image/logo_it.jpg";
import "./Stepper.css";
import { TiTick } from "react-icons/ti";
import axios from "axios";
import { connect } from "react-redux";
import Swal from "sweetalert2";



function InputRequest4(props) {
  const timestamp = new Date().getTime()

  const changeFile = async (e) => {
    if (e.target.files.length > 0) {
      setFileUpload(e.target.files[0]);
      console.log(fileUpload);
    }
  };

  const addDocument = async () => {
    try {
      Swal.fire({
        icon: "success",
        title: "ส่งเอกสารสำเร็จ!",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      setSubjectInput("");
      setTeacherName("")
      setTitle("");
      setCurrentStep(1);
      setState("0");

      const object = {
        Date: date,
        StatusDate: StatusDate,
        Title: documant,
        SubjectID: "",
        SubjectName: "",
        TeacherName: subjectInput,
        Descrip: title,
        Status: 1,
        Status2:0,
        FileName: fileUpload?timestamp+"_T_"+fileUpload.name:null,
        Note1: "",
        Note2: "",
        Note3: "",
        File: fileUpload,
        TeachID: teachId,
        Sender: `${props.posts[0].user.user.FirstName} ${props.posts[0].user.user.Lastname}`,
        StudentID: props.posts[0].user.user.StudentID,
        ClassYear: props.posts[0].user.user.ClassYear,
        Major: props.posts[0].user.user.Major,
        Field: props.posts[0].user.user.Field,
        Sec1:"",
        Sec2:"",
        PayIn:"",
        StatusDoc1:time 
      };
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  useEffect(() => {
    const fetchSubject = async () => {
      try {
        const { data } = await axios.get("document/subject");
        setSubject(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
      }
    };
    fetchSubject();
  }, []);

  const subjectIdChange = (event) => {
    setSubjectId(event);
  };
  const onChangeSub = (event) => {
    console.log(event.target.value)
    setSubjectInput(event.target.value);
  };

  const TeacherNameChange = (event) => {
    setTeacherName(event);
  };

  const onSearch = (searchTerm) => {
    setSubjectInput(searchTerm);
    // our api to fetch the search result
    console.log("search ", searchTerm);
  };

  const ref = useRef();
  const steps = ["รายละเอียดคำร้อง", "ตรวจสอบข้อมูล", "ส่งเอกสาร"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  moment.locale("th");
  const date = moment().add(543, "year").format("DD MMMM พ.ศ. YYYY");
  const [subject, setSubject] = useState([]);
  const [subjectId, setSubjectId] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const StatusDate = moment().add(543, "year").format("DD MMM YYYY");
  const [teacherName, setTeacherName] = useState("");
  const [teachId, setTeachId] = useState("");
  const [state, setState] = useState("0");
  const [documant, setDocument] = useState("คำร้องทั่วไป");
  const [fileUpload, setFileUpload] = useState(null);
  const time = moment().format("Do MMM YYYY, LT");

  const SetDocument = (event) => {
    // setDocument(event.target.value);
    setDocument(event.target.value);
    // console.log(event.target.value)
    // console.log(documant)
  };
  const [title, setTitle] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const teachNameChange = (event) => {
    setTeacherName(event.target.value);
  };

  const Docinfo = () => {
    return (
      <div>
        {state === "2" ? (
          <div>
            <div className="flex  my-[3vh] justify-center">
              {steps?.map((step, i) => (
                <div
                  key={i}
                  className={`step-item ${currentStep === i + 1 && "active"} ${
                    (i + 1 < currentStep || complete) && "complete"
                  } `}
                >
                  <div className="step">
                    {i + 1 < currentStep || complete ? (
                      <TiTick size={24} />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <p className="text-gray-500">{step}</p>
                </div>
              ))}
            </div>
            <div ref={ref}>
              <div className="w-[90%]  justify-self-center p-[30px] ml-[6%] m-[4%] ">
                <div className="grid grid-cols-12">
                  <div className="col-span-6">
                    <div className="">
                      <img
                        className=""
                        src={logo_it}
                        width="20%"
                        height="20%"
                      />
                    </div>
                  </div>
                  <div className="col-span-6">
                    <div className="grid grid-cols-12">
                      <div className="col-span-6 text-lg font-semibold">
                        {documant}
                      </div>
                      <div className="col-span-6">
                        <label className="border-2 p-[5px] border-[#000] px-[10px] text-sm">
                          ระดับปริญญาตรี
                        </label>
                      </div>
                    </div>
                    <div className="my-[10px] text-sm ">
                      <label className="">คณะเทคโนโลยีสารสนเทศ</label>
                      <br />
                    </div>
                    <div className="my-[10px] text-sm ">
                      <label className="text-sm">
                        สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
                      </label>
                    </div>
                  </div>
                </div>
                <div className="text-center my-[1vh] text-sm ">
                  <label>วันที่ {date}</label>
                </div>
                <div className="my-[2vh] text-sm">
                  <label className="font-semibold">
                    เรื่อง&nbsp;&nbsp;&nbsp;
                  </label>
                  <label>{documant}</label>
                </div>
                <div className="my-[2vh] text-sm">
                  <label className="font-semibold">
                    เรียน&nbsp;&nbsp;&nbsp;
                  </label>
                  <label>คณบดีคณะเทคโนโลยีสารสนเทศ</label>
                </div>
                <div className="text-sm my-[2vh]">
                <label className="">
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;ข้าพเจ้า{" "}
                    {props.posts[0].user.user.FirstName}{" "}
                    {props.posts[0].user.user.Lastname} รหัสนักศึกษา{" "}
                    {props.posts[0].user.user.StudentID} ชั้นปีที่{" "}
                    {props.posts[0].user.user.ClassYear} สาขาวิชา{" "}
                    {props.posts[0].user.user.Major} แขนงวิชา{" "}
                    {props.posts[0].user.user.Field}
                  </label>
                </div>
                <div className="text-sm my-[2vh]">
                  <label className="">
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;มีความประสงค์
                    {title}
                  </label>
                </div>
                <div className="text-sm my-[2vh]">
                  <label className="">
                    &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;จึงเรียนมาเพื่อโปรดพิจารณาและดำเนินการต่อไปด้วย
                  </label>
                </div>
                <div className="grid text-sm">
                  <div className="flex flex-col text-center my-[2vh] justify-self-end">
                    <div className="m-[5px]">
                      <label>ขอแสดงความนับถือ</label>
                    </div>
                    <div className="m-[5px]"></div>
                    <div className="m-[5px]">
                    <label>({props.posts[0].user.user.FirstName}{" "}
                      {props.posts[0].user.user.Lastname})</label>
                    </div>
                    <div className="m-[5px]">
                      <label>ผู้ยื่นคำร้อง</label>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 border-2 border-[#000] text-center my-[2vh] text-sm">
                  <div className="col-span-5 border-r-2 border-[#000]">
                    <div className="border-b-2 p-[5px] border-[#000]">
                      <label className="font-semibold">
                        ความเห็นอาจารย์ที่ปรึกษา/อาจารย์ผู้สอน
                      </label>
                    </div>
                    <div className="h-[100px]">
                      <div className="h-[50px] p-[10px] break-all">
                        {/* <label>เห็นสมควร</label> */}
                      </div>
                      <div className="grid h-[50px] ">
                        {/* <img
                          className="justify-self-center h-[50px]"
                          src={
                            "https://kalyanamitra.org/th/images/dailydhamma/2560/07/600719_07.jpg"
                          }
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 border-r-2 border-[#000]">
                    <div className="border-b-2 p-[5px] border-[#000]">
                      <label className="font-semibold">
                        ความเห็นเจ้าหน้าที่
                      </label>
                    </div>
                    <div className="h-[100px]">
                      <div className="h-[50px] p-[10px] break-all">
                        {/* <label>test</label> */}
                      </div>
                      <div className="grid h-[50px] ">
                        <img
                          className="justify-self-center w-auto h-auto"
                          src={""}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <div className="border-b-2 p-[5px] border-[#000]">
                      <label className="font-semibold">คำสั่ง</label>
                    </div>
                    <div className="h-[100px]">
                      <div className="h-[50px] p-[10px] break-all">
                        {/* <label>test</label> */}
                      </div>
                      <div className="grid h-[50px] ">
                        <img
                          className="justify-self-center w-auto h-auto"
                          src={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid text-sm">
                  <div className="flex flex-col text-center justify-self-end my-[2vh]">
                    <div className="m-[5px]">
                      <label>ผู้ยื่นคำร้องรับทราบคำร้อง</label>
                    </div>
                    <div className="m-[5px]"></div>
                    <div className="m-[5px]">
                    <label>({props.posts[0].user.user.FirstName}{" "}
                      {props.posts[0].user.user.Lastname})</label>
                    </div>
                    <div className="m-[5px]">
                      <label>วันที่ {date}</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid my-[2vh] ">
              <div className="flex justify-self-end mr-[5%]">
                <button
                  className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px]"
                  onClick={() => setState("1")  & setCurrentStep(2)}
                >
                  แก้ไข
                </button>
                <ReactPrint
                  trigger={() => (
                    <button className="cursor-pointer font-medium p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%]">
                      ดาวน์โหลด
                    </button>
                  )}
                  content={() => ref.current}
                />

                <button
                  className="cursor-pointer font-medium p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%]"
                  onClick={() => moment().format("Do MMM YYYY, LT") & setState("2") & setCurrentStep(4) & addDocument()}
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        ) : (
          state === "1" && <Checkinfo />
        )}
      </div>
    );
  };

  const Checkinfo = () => {
    return (
      <div>
        {state === "1" ? (
          <div>
            <div className="flex  my-[3vh] justify-center">
              {steps?.map((step, i) => (
                <div
                  key={i}
                  className={`step-item ${currentStep === i + 1 && "active"} ${
                    (i + 1 < currentStep || complete) && "complete"
                  } `}
                >
                  <div className="step">
                    {i + 1 < currentStep || complete ? (
                      <TiTick size={24} />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <p className="text-gray-500">{step}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center" >
            <div className="bg-gray-100 rounded-2xl w-[70%] ml-[6%] my-[3%] p-[30px] text-xl font-semibold ">
              <div className="grid grid-cols-12 my-[20px]">
                <div className="col-span-6 ">
                <p className="">
                    ชื่อ-นามสกุล&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                    <label className="font-medium">
                      {props.posts[0].user.user.FirstName}{" "}
                      {props.posts[0].user.user.Lastname}
                    </label>
                  </p>
                </div>
                <div className="col-span-6  ">
                  รหัสนักศึกษา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  <label className="font-medium">
                    {props.posts[0].user.user.StudentID}
                  </label>
                </div>
              </div>
              <div>
                <label>
                  ชั้นปี&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  <label className="font-medium">
                    {props.posts[0].user.user.ClassYear}
                  </label>
                </label>
              </div>
              <div className="grid grid-cols-12 my-[20px]">
                <div className="col-span-6 ">
                  สาขาวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  <label className="font-medium">
                    {props.posts[0].user.user.Major}
                  </label>
                </div>
                <div className="col-span-6  ">
                  แขนงวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  <label className="font-medium">
                    {props.posts[0].user.user.Field}
                  </label>
                </div>
              </div>
              <div className="my-[20px]">
                <label>
                  วันที่&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  <label className="font-medium">{date}</label>{" "}
                </label>
              </div>
              <div className="my-[20px]">
                <label>
                  หัวข้อเรื่อง&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;{" "}
                  <label className="font-medium">{documant}</label>
                </label>
              </div>
              <div className="my-[20px]">
                <label>
                  อาจารย์&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  <label className="font-medium">{teacherName}</label>
                </label>
              </div>
              <div className="my-[20px] break-all">
                <label>
                  รายละเอียด&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                  <label className="font-medium">{title}</label>
                </label>
              </div>
              {fileUpload !== null && (
                <div className="my-[20px] flex">
                <label>แนบไฟล์&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</label>
                <div>
                  <label>{fileUpload.name}</label>
                  {/* <embed
                    src={URL.createObjectURL(fileUpload)}
                    width="250"
                    height="350"
                  /> */}
                </div>
              </div>
              )}
            </div>
            </div>
            <div className="flex mt-[1%] ml-[65%] ">
              <button
                className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px]"
                onClick={() => setState("0") & setCurrentStep(1)}
              >
                แก้ไข
              </button>
              <button
                className="cursor-pointer font-medium p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%]"
                onClick={() => setState("2") & setCurrentStep(3)}
              >
                ถัดไป
              </button>
            </div>
          </div>
        ) : (
          state === "2" && <Docinfo />
        )}
      </div>
    );
  };

  return (
    <div>
      {(documant === "คำร้องทั่วไป") & (state == "0") ? (
        <div>
          <div className="flex  my-[5vh] justify-center">
            {steps?.map((step, i) => (
              <div
                key={i}
                className={`step-item ${currentStep === i + 1 && "active"} ${
                  (i + 1 < currentStep || complete) && "complete"
                } `}
              >
                <div className="step">
                  {i + 1 < currentStep || complete ? (
                    <TiTick size={24} />
                  ) : (
                    i + 1
                  )}
                </div>
                <p className="text-gray-500">{step}</p>
              </div>
            ))}
          </div>
          <div className="flex ml-[10%] my-[3vh]">
            <div className="w-[36vh] mt-[5px]">
              <label className="text-xl font-semibold text-gray-600 mb-[2vh]">
                หัวข้อเรื่อง
              </label>
            </div>
            <div className="text-lg font-font-medium text-gray-600">
              <div className="col-span-6  ml-[4px]">
                <div className="relative w-full lg:max-w-sm rounded-full ">
                  <select
                    className=" p-[10px] px-[30px] text-gray-500 bg-white border rounded-2xl shadow-sm outline-none appearance-none focus:border-indigo-600 text-lg font-font-medium text-gray-600"
                    onChange={(e) => SetDocument(e)}
                    value={documant}
                  >
                    <option value="ขอลงทะเบียนเรียนเพิ่ม">
                      ขอลงทะเบียนเรียนเพิ่ม
                    </option>
                    <option value="ขอย้ายกลุ่มการเรียน">
                      ขอย้ายกลุ่มการเรียน
                    </option>
                    <option value="ขอย้ายแขนงวิชา">ขอย้ายแขนงวิชา</option>
                    <option value="ขอความอนุเคราะห์เปิดวิชาเรียน">
                      ขอความอนุเคราะห์เปิดวิชาเรียน
                    </option>
                    <option value="ขอชำระเงินล่าช้า">ขอชำระเงินล่าช้า</option>
                    <option value="คำร้องทั่วไป">คำร้องทั่วไป</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex ml-[10%]">
            <div className="w-[36vh] mt-[20px]">
              <label className="text-xl font-semibold text-gray-600 mb-[2vh]">
                อาจารย์
              </label>
            </div>
            <div className="text-lg font-font-medium text-gray-600">
              <div className="search-container">
                <div className="search-inner">
                  <input className="border-2 rounded-2xl border-black-500 p-[10px] pb-[0px]mb-[2vh] w-[60vh] " type="text" value={subjectInput} onChange={onChangeSub} />
                  {/* <button onClick={() => onSearch(subject)}> Search </button> */}
                </div>
                <div className="bg-[#fff] flex flex-col border-2 border-gray	empty:border-none">
                {subject
                    .filter((item) => {
                      const searchTerm = subjectInput.toLowerCase();
                      const fullName = item.FirstName
                        ? item.FirstName.toLowerCase()
                        : "";

                      return (
                        searchTerm &&
                        fullName.startsWith(searchTerm) &&
                        fullName !== searchTerm
                      );
                    })
                    .slice(0, 10)
                    .map((item) => (
                      <div
                        onClick={() =>
                          onSearch(`${item.FirstName} ${item.Lastname}`) &
                          subjectIdChange(item.SubjectID) &
                          setTeachId(item.TeachID) &
                          TeacherNameChange(
                            `${item.FirstName} ${item.Lastname}`
                          )
                        }
                        className="text-start my-[2px] cursor-pointer"
                        key={item.SubjectID}
                      >
                        {item.FirstName} {item.Lastname}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex ml-[10%] mt-[3vh]">
            <div className="w-[36vh] mt-[5px]">
              <label className="text-xl font-semibold text-gray-600 mb-[2vh]">
                รายละเอียด
              </label>
            </div>
            <textarea
              className="border-2 rounded-2xl border-black-500 p-[10px] mb-[30px] w-[50%] h-[200px] text-lg font-font-medium text-gray-600"
              placeholder=""
              type="text"
              onChange={handleChange}
              value={title}
            />
          </div>
          <div className="flex ml-[10%]">
            <div className="w-[36vh] mt-[5px]">
              <label className="text-xl font-semibold text-gray-600 mb-[2vh]">
                แนบไฟล์
              </label>
            </div>
            <div className="">
              <input
                type="file"
                name="img"
                accept=""
                id="upload"
                className="block w-full text-sm text-slate-500
 file:mr-4 file:py-2 file:px-4
 file:rounded-full file:border-0
 file:text-xl file:font-semibold 
 file:bg-violet-50 file:text-violet-700
 hover:file:bg-violet-100
  w-[50%] cursor-pointer "
                onChange={changeFile}
                placeholder=""
              />{" "}
            </div>
          </div>
          <div className="flex cursor-pointer  mt-[1%] ml-[70%] mb-[3vh] ">
            {/* <label className="cursor-pointer font-medium  p-[10px] bg-[#FFAF10] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px]">
         ย้อนกลับ
       </label> */}
            <label
              className="cursor-pointer font-medium p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%]"
              onClick={() => setState("1") & setCurrentStep(2)}
            >
              ถัดไป
            </label>
          </div>
        </div>
      ) : (
        <Checkinfo />
      )}
      {documant === "ขอลงทะเบียนเรียนเพิ่ม" && <InputRequest1 />}
      {documant === "ขอย้ายกลุ่มการเรียน" && <InputRequest2 />}
      {documant === "ขอย้ายแขนงวิชา" && <InputRequest3 />}
      {documant === "ขอความอนุเคราะห์เปิดวิชาเรียน" && <InputRequest5 />}
      {documant === "ขอชำระเงินล่าช้า" && <InputRequest6 />}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};


export default connect(mapStateToProps)(InputRequest4);
