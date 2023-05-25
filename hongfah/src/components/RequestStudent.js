import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faPlus } from "@fortawesome/free-solid-svg-icons";
import InputRequest1 from "./InputRequest1";
import { connect } from "react-redux";
import axios from "axios";
import RequestStaff from "./RequestStaff";
import "./Step.css";
import { TiTick } from "react-icons/ti";
import { TiTimes } from "react-icons/ti";
import ReactPrint from "react-to-print";
import logo_it from "../image/logo_it.jpg";
import Swal from "sweetalert2";
import Stepper from "./Stepper";
import moment from "moment";
import "moment/locale/th";
moment.locale("th");




const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};




function RequestStudent(props) {
  const fetchDocument = async () => {
    try {
      console.log("student");
      const { data } = await axios.get(
        `document/byStudent/${props.posts[0].user.user.StudentID}`
      );
      console.log(data);
      setDocument(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };


  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocumentStaff = async () => {
    try {
      console.log("Doc staff");
      const { data } = await axios.get(`document/byStaff`);
      console.log(data);
      setdocStaff(data);
      // fetchDocumentTeach()
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    fetchDocumentStaff();
  }, []);

  const fetchDocumentDean = async () => {
    try {
      console.log("Dean");
      const { data } = await axios.get(`document/byDean`);
      console.log(data);
      setdocDean(data);
      // fetchDocumentTeach()
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    fetchDocumentDean();
  }, []);

  const fetchDocumentTeach = async () => {
    try {
      console.log("fetch Doc");
      const { data } = await axios.get(
        `document/byTeacher/${props.posts[0].user.user.TeachID}`
      );
      //  fetchDocumentTeach()

      console.log(data);
      setdocTeach(data);
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    fetchDocumentTeach();
  }, []);

  const updateStatus = async () => {
    try {
      // console.log(id);
      // console.log(docStatus);
      // console.log(docStatus2);
      Swal.fire({
        icon: "success",
        title: "สำเร็จ!",
        // footer: '<a href="">Why do I have this issue?</a>'
      });
      axios.patch(`/document/${id}`, {
        Status: docStatus,
        Status2: docStatus2,

      });
      setDocStatus("")
      setDocStatus2("")
      setState(1);
      setDocInfo({});
      await fetchDocumentStaff()
      await fetchDocumentDean()
      await fetchDocumentTeach()
      await fetchDocument()
      setStatus("")
      setStatus("ทั้งหมด")
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const updateNote1 = async () => {
    try {
      axios.patch(`/document/bynote1/${id}`, {
        Note1: note1
      });
      setNote1("")
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const updateNote2 = async () => {
    try {
      axios.patch(`/document/bynote2/${id}`, {
        Note2: note2,
      });
      setNote2("")
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const updateNote3 = async () => {
    try {
      axios.patch(`/document/bynote3/${id}`, {
        Note3: note3,
      });
      setNote3("")
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const updateDocStatus2 = async () => {
    try {
      const time = moment().format("Do MMM YYYY, LT");
      axios.patch(`/document/statusDoc2/${id}`, {
        Status: time,
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const updateDocStatus3 = async () => {
    try {
      const time = moment().format("Do MMM YYYY, LT");
      axios.patch(`/document/statusDoc3/${id}`, {
        Status: time,
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const updateDocStatus4 = async () => {
    try {
      const time = moment().format("Do MMM YYYY, LT");
      axios.patch(`/document/statusDoc4/${id}`, {
        Status: time,
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  const updateDocStatus5 = async () => {
    try {
      const time = moment().format("Do MMM YYYY, LT");
      axios.patch(`/document/statusDoc5/${id}`, {
        Status: time,
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  const noteChange1 = (event) => {
    console.log(event.target.value);
    setNote1(event.target.value);
  };
  const noteChange2 = (event) => {
    console.log(event.target.value);
    setNote2(event.target.value);
  };
  const noteChange3 = (event) => {
    console.log(event.target.value);
    setNote3(event.target.value);
  };

  function download(filename) {
    // const link = document.createElement("a");
    // link.href = `http://localhost:3001/file/${filename}`;
    // link.download = filename;
    // link.click();
    console.log(filename)
    window.open(`http://localhost:3001/file/${filename}`, "_blank");
  }

  const ref = useRef();
  const [docInfo, setDocInfo] = useState({});
  const [state, setState] = useState(1);
  const [status, setStatus] = useState("ทั้งหมด");
  const [status2, setStatus2] = useState("ทั้งหมด");
  const [topic, setTopic] = useState("สถานะคำร้อง");
  const [documant, setDocument] = useState([]);
  const [docTeach, setdocTeach] = useState([]);
  const [docStaff, setdocStaff] = useState([]);
  const [docDean, setdocDean] = useState([]);
  const steps = ["", "", "", "", "", "", "", ""];
  const [currentStep, setCurrentStep] = useState();
  const [complete, setComplete] = useState(false);
  const [docStatus, setDocStatus] = useState();
  const [docStatus2, setDocStatus2] = useState();
  const [note1, setNote1] = useState("");
  const [note2, setNote2] = useState("");
  const [note3, setNote3] = useState("");
  const [id, setId] = useState();
  const RoleID = props.posts[0].user.user.RoleID;
  return (
    <div>
      <label className="text-2xl font-semibold m-[7%]">{topic}</label>
      {/* <img className="" src={`http://localhost:3001/file/XAUUSD_2023-02-02_10-04-15.png`} width="40%" height="40%" /> */}
      {Object.keys(docInfo).length === 0 && (
        <div className="flex">
          {RoleID  < 2 && (
          <button
            className={`font-medium p-[10px] border-2 rounded-3xl w-[120px] text-center ml-[6%] mt-[2%]  hover:bg-[#3EB7FF] hover:text-[#fff] ${
              topic === "สถานะคำร้อง"
                ? "bg-[#3EB7FF] text-[#fff]"
                : "text-gray-500"
            }`}
            onClick={() =>
              setTopic("สถานะคำร้อง") & (RoleID === 1)
                ? fetchDocument()
                : RoleID === 2
                ? fetchDocumentTeach()
                : RoleID === 3
                ? fetchDocumentStaff()
                : RoleID === 4
                ? fetchDocumentDean()
                : undefined & setDocInfo({}) & setState(1)
            }
          >
            สถานะ
          </button>
          )}

          {RoleID === 1 && (
            <button
              className={`font-medium p-[10px] border-2 rounded-3xl w-[150px] text-center ml-[1%] mt-[2%] hover:bg-[#3EB7FF] hover:text-[#fff] ${
                topic === "คำร้อง"
                  ? "bg-[#3EB7FF] text-[#fff]"
                  : "text-gray-500"
              } `}
              onClick={() => setTopic("คำร้อง")}
            >
              <FontAwesomeIcon className="mr-[5px]" icon={faPlus} />
              เขียนคำร้อง
            </button>
          )}
        </div>
      )}
      {topic === "สถานะคำร้อง" ? (
        <div>
          {Object.keys(docInfo).length === 0 && (
            <div className="mb-[2%]">
              <div className="flex justify-center mt-[2%]">
                <button
                  className={`p-[10px] border-2 rounded-3xl w-[140px] m-[10px]  hover:bg-[#3EB7FF] hover:text-[#fff] ${
                    status === "ทั้งหมด"
                      ? "bg-[#3EB7FF] text-[#fff]"
                      : "text-gray-500"
                  }`}
                  onClick={() =>
                    setStatus("ทั้งหมด") & (RoleID === 1)
                      ? fetchDocument()
                      : RoleID === 2
                      ? fetchDocumentTeach()
                      : RoleID === 3
                      ? fetchDocumentStaff()
                      : RoleID === 1
                      ? fetchDocument()
                      : RoleID === 4
                      ? fetchDocumentDean()
                      : undefined
                  }
                >
                  {" "}
                  ทั้งหมด{" "}
                </button>
                <button
                  className={`p-[10px] border-2 rounded-3xl w-[140px] m-[10px]  hover:bg-[#3EB7FF] hover:text-[#fff] ${
                    status === "กำลังดำเนินการ"
                      ? "bg-[#3EB7FF] text-[#fff]"
                      : "text-gray-500"
                  }`}
                  onClick={() =>
                    setStatus("กำลังดำเนินการ") & (RoleID === 1)
                      ? fetchDocument()
                      : RoleID === 2
                      ? fetchDocumentTeach()
                      : RoleID === 3
                      ? fetchDocumentStaff()
                      : RoleID === 1
                      ? fetchDocument()
                      : RoleID === 4
                      ? fetchDocumentDean()
                      : undefined
                  }
                >
                  {" "}
                  {RoleID === 1 ? "กำลังดำเนินการ" : "รอดำเนินการ"}{" "}
                </button>
                <button
                  className={`p-[10px] border-2 rounded-3xl w-[140px] m-[10px]  hover:bg-[#3EB7FF] hover:text-[#fff] ${
                    status === "อนุมัติ"
                      ? "bg-[#3EB7FF] text-[#fff]"
                      : "text-gray-500"
                  }`}
                  onClick={() =>
                    setStatus("อนุมัติ") & (RoleID === 1)
                      ? fetchDocument()
                      : RoleID === 2
                      ? fetchDocumentTeach()
                      : RoleID === 3
                      ? fetchDocumentStaff()
                      : RoleID === 1
                      ? fetchDocument()
                      : RoleID === 4
                      ? fetchDocumentDean()
                      : undefined
                  }
                >
                  {" "}
                  อนุมัติ{" "}
                </button>
                <button
                  className={`p-[10px] border-2 rounded-3xl w-[140px] m-[10px]  hover:bg-[#3EB7FF] hover:text-[#fff] ${
                    status === "ไม่อนุมัติ"
                      ? "bg-[#3EB7FF] text-[#fff]"
                      : "text-gray-500"
                  }`}
                  onClick={() =>
                    setStatus("ไม่อนุมัติ") & (RoleID === 1)
                      ? fetchDocument()
                      : RoleID === 2
                      ? fetchDocumentTeach()
                      : RoleID === 3
                      ? fetchDocumentStaff()
                      : RoleID === 1
                      ? fetchDocument()
                      : RoleID === 4
                      ? fetchDocumentDean()
                      : undefined
                  }
                >
                  {" "}
                  ไม่อนุมัติ{" "}
                </button>
                {RoleID === 3 ? (
                  <button
                    className={`p-[10px] border-2 rounded-3xl w-[140px] m-[10px]  hover:bg-[#3EB7FF] hover:text-[#fff] ${
                      status === "จัดการคำร้อง"
                        ? "bg-[#3EB7FF] text-[#fff]"
                        : "text-gray-500"
                    }`}
                    onClick={() =>
                      setStatus("จัดการคำร้อง") & (RoleID === 1)
                        ? fetchDocument()
                        : RoleID === 2
                        ? fetchDocumentTeach()
                        : RoleID === 3
                        ? fetchDocumentStaff()
                        : RoleID === 1
                        ? fetchDocument()
                        : undefined
                    }
                  >
                    {" "}
                    จัดการคำร้อง{" "}
                  </button>
                ) : undefined}
              </div>
              {status === "จัดการคำร้อง" ? (
                <div className="flex justify-center ">
                  <button
                    className={`p-[10px] border-2 rounded-3xl w-[180px] m-[10px] hover:bg-[#3EB7FF] hover:text-[#fff] 
                  ${
                    status === "จัดการคำร้อง" && status2 === "ทั้งหมด"
                      ? `bg-[#3EB7FF] text-[#fff]`
                      : "text-gray-500"
                  }`}
                    onClick={() => setStatus2("ทั้งหมด") & fetchDocumentStaff()}
                  >
                    {" "}
                    ทั้งหมด{" "}
                  </button>
                  <button
                    className={`p-[10px] border-2 rounded-3xl w-[180px] m-[10px] hover:bg-[#3EB7FF] hover:text-[#fff] 
                  ${
                    status === "จัดการคำร้อง" && status2 === "รอดำเนินการ"
                      ? `bg-[#3EB7FF] text-[#fff]`
                      : "text-gray-500"
                  }
                  `}
                    onClick={() =>
                      setStatus2("รอดำเนินการ") & fetchDocumentStaff()
                    }
                  >
                    {" "}
                    รอดำเนินการ{" "}
                  </button>
                  <button
                    className={`p-[10px] border-2 rounded-3xl w-[180px] m-[10px] hover:bg-[#3EB7FF] hover:text-[#fff]
                  ${
                    status === "จัดการคำร้อง" && status2 === "เสร็จสิ้น"
                      ? `bg-[#3EB7FF] text-[#fff]`
                      : "text-gray-500"
                  }
                  `}
                    onClick={() =>
                      setStatus2("เสร็จสิ้น") & fetchDocumentStaff()
                    }
                  >
                    {" "}
                    เสร็จสิ้น
                  </button>
                </div>
              ) : undefined}
            </div>
          )}
          {/* <RequestStaff/> */}

          {/* ------------------------------------------------------------------------------------------------เอกสารนักศึกษา ---------------------------------------------------------------------*/}
          {RoleID === 1 && (
            <>
              {Object.keys(docInfo).length !== 0
                ? // -----------------------------------------------------------------------------------------------หน้ากดเอกสารหน้าแรก------------------------------------------------------------------------------
                  (state === 1 && (
                    <div>
                      <div className="flex justify-center">
                        <div className="bg-gray-100 rounded-2xl w-[70%]  my-[3%] p-[30px] text-xl font-semibold ">
                          <div className="grid grid-cols-12 my-[20px]">
                            <div className="col-span-6 ">
                              <p className="">
                                ชื่อ-นามสกุล&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Sender}
                                </label>
                              </p>
                            </div>
                            <div className="col-span-6  ">
                              รหัสนักศึกษา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.StudentID}
                              </label>
                            </div>
                          </div>
                          <div>
                            <label>
                              ชั้นปี&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.ClassYear}
                              </label>
                            </label>
                          </div>
                          <div className="grid grid-cols-12 my-[20px]">
                            <div className="col-span-6 ">
                              สาขาวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Major}
                              </label>
                            </div>
                            <div className="col-span-6  ">
                              แขนงวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Field}
                              </label>
                            </div>
                          </div>
                          <div className="my-[20px]">
                            <label>
                              วันที่&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Date}
                              </label>{" "}
                            </label>
                          </div>
                          <div className="col-span-6 ">
                            หัวข้อเรื่อง&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                            <label className="font-medium">
                              {docInfo.Title}
                            </label>
                          </div>

                          {(docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม") |
                          (docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                          (docInfo.Title ===
                            "ขอความอนุเคราะห์เปิดวิชาเรียน") ? (
                            <div>
                              <div className="grid grid-cols-12 my-[20px]">
                                <div className="col-span-6 ">
                                  รหัสวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                  <label className="font-medium">
                                    0{docInfo.SubjectID}
                                  </label>
                                </div>

                                <div className="col-span-6  ">
                                  <label className="">
                                    วิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                    <label className="font-medium">
                                      {docInfo.SubjectName}
                                    </label>
                                  </label>
                                </div>
                              </div>
                            </div>
                          ) : undefined}

                          {docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม" && (
                            <div className="grid grid-cols-12 my-[20px]">
                              <div className="col-span-6 ">
                                กลุ่มการเรียน&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Sec1}
                                </label>
                              </div>
                            </div>
                          )}
                          {(docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                          (docInfo.Title === "ขอย้ายแขนงวิชา") ? (
                            <div className="my-[20px]">
                              <label>
                                ย้ายจาก&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Sec1}
                                  &nbsp;&nbsp;
                                  {docInfo.Title === "ขอย้ายแขนงวิชา"
                                    ? "ไปยังแขนงวิชา"
                                    : "ไปยัง"}
                                  &nbsp;&nbsp;{docInfo.Sec2}
                                </label>
                              </label>
                            </div>
                          ) : undefined}

                          <div className="my-[20px]">
                            <label>
                              อาจารย์&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.TeacherName}
                              </label>
                            </label>
                          </div>
                          {docInfo.Title === "ขอชำระเงินล่าช้า" ? (
                            <div className="my-[20px]">
                              <label>
                                ชำระภายในวันที่&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.PayIn}
                                </label>
                              </label>
                            </div>
                          ) : undefined}
                          <div className="my-[20px] break-all">
                            <label>
                              {docInfo.Title === "คำร้องทั่วไป"
                                ? "รายละเอียด"
                                : "เนื่องจาก"}
                              &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Descrip}
                              </label>
                            </label>
                          </div>
                          {docInfo.FileName !== "null" && (
                            <div className="flex my-[20px]">
                              <label>
                                แนบไฟล์&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              </label>
                              <button
                                onClick={() => download(docInfo.FileName)}
                              >
                                {docInfo.FileName.split("_T_")[1]}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <label class="text-2xl font-semibold m-[7%]">
                          สถานะคำร้อง
                        </label>
                        <div className="flex justify-center ">
                          <div className="bg-gray-100 rounded-2xl w-[70%]  my-[3%] p-[30px] text-xl font-semibold ">
                            <div>
                              คำร้อง:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Title}
                              </label>
                            </div>
                            <div
                              className={`mt-[10px] ${
                                docInfo.Status === 1 ||
                                docInfo.Status === 3 ||
                                docInfo.Status === 5 ||
                                docInfo.Status === 7
                                  ? "text-amber-500"
                                  : docInfo.Status === 2 ||
                                    docInfo.Status === 4 ||
                                    docInfo.Status === 6
                                  ? "text-[red]"
                                  : docInfo.Status === 9
                                  ? "text-[#48AF23]"
                                  : undefined
                              }`}
                            >
                              <label className="">
                                {docInfo.Status === 1
                                  ? "อาจารย์ได้รับเอกสารคำร้อง"
                                  : docInfo.Status === 2
                                  ? "อาจารย์ปฏิเสธคำร้อง"
                                  : docInfo.Status === 3
                                  ? "เจ้าหน้าที่ได้รับเอกสารคำร้อง"
                                  : docInfo.Status === 4
                                  ? "เจ้าหน้าที่ปฏิเสธคำร้อง"
                                  : docInfo.Status === 5
                                  ? "คณบดีได้รับเอกสารคำร้อง"
                                  : docInfo.Status === 6
                                  ? "คณบดีปฏิเสธคำร้อง"
                                  : docInfo.Status === 7
                                  ? "เจ้าหน้าที่กำลังจัดการคำร้อง"
                                  : docInfo.Status === 9
                                  ? "เจ้าหน้าที่จัดการคำร้องเสร็จสิ้น"
                                  : undefined}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex ">
                        <button
                          className=" cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[23vh] hover:bg-red-400"
                          onClick={() => setDocInfo({}) & fetchDocument()}
                        >
                          ย้อนกลับ
                        </button>

                        <div className="absolute right-[23vh]">
                          {docInfo.Status2 === 0 ? (
                            <button
                              className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] justify-self-end hover:bg-green-400"
                              onClick={() => setState(3) & fetchDocument()}
                            >
                              ดูใบคำร้อง
                            </button>
                          ) : undefined}
                          <button
                            className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-2vh justify-self-end hover:bg-sky-300 "
                            onClick={() =>
                              setState(2) & setCurrentStep(docInfo.Status) & fetchDocument()
                            }
                          >
                            สถานะเอกสาร
                          </button>
                        </div>
                      </div>
                    </div>
                    // <div>{docInfo.Title}</div>
                  )) ||
                  // ----------------------------------------------------------------------------------------------------หน้ากดเอกสารหน้า 2---------------------------------------------------------------------------------------
                  (state === 2 && (
                    <div>
                      <div className="w-[70%] ml-[20vh]">
                        {/* หัวข้อสถานะเอกสาร */}
                        <div
                          className={`w-[650px] rounded-3xl p-[10px] ml-[11%] text-center absolute left-[61vh] top-[25vh]  ${
                            docInfo.Status2 === 1
                              ? "bg-[#EE1D52]"
                              : docInfo.Status === 9
                              ? "bg-[#48AF23]"
                              : "bg-[#FFAF10]"
                          }`}
                        >
                          <label className="text-[#fff] font-semibold">
                            {docInfo.Status2 === 1
                              ? "คำร้องถูกปฏิเสธ"
                              : docInfo.Status === 9
                              ? "จัดการคำร้องเสร็จสิ้น"
                              : docInfo.Status < 9 && docInfo.Status2 === 0
                              ? "กำลังดำเนินการ"
                              : undefined}
                          </label>
                        </div>
                        {/* จบหัวข้อสถานะเอกสาร */}
                        <div className="flex">
                          {/* Process bar เอกสารแต่ละสถานะ */}
                          <div className="mt-[50px]">
                            {docInfo.Status2 === 0 && docInfo.Status < 9 ? (
                              <div>
                                {steps?.map((step, i) => (
                                  <div
                                    key={i}
                                    className={`step-items ${
                                      currentStep === i + 1 && "actives"
                                    } ${
                                      (i + 1 < currentStep || complete) &&
                                      "completes"
                                    } `}
                                  >
                                    <div className="steps">
                                      {i + 1 < currentStep || complete ? (
                                        <TiTick size={24} />
                                      ) : undefined}
                                    </div>
                                    <p className="text-gray-500">{step}</p>
                                  </div>
                                ))}
                              </div>
                            ) : undefined}
                            {/*  */}
                            {docInfo.Status2 === 1 ? (
                              <div>
                                {steps?.map((step, i) => (
                                  <div
                                    key={i}
                                    className={`step-items2 ${
                                      currentStep === i + 1 && "actives2"
                                    } ${
                                      (i + 1 < currentStep || complete) &&
                                      "completes2"
                                    } `}
                                  >
                                    <div className="steps2">
                                      {i + 1 < currentStep || complete ? (
                                        <TiTick size={24} />
                                      ) : undefined}
                                    </div>
                                    <p className="text-gray-500">{step}</p>
                                  </div>
                                ))}
                              </div>
                            ) : undefined}
                            {docInfo.Status === 9 ? (
                              <div>
                                {steps?.map((step, i) => (
                                  <div
                                    key={i}
                                    className={`step-items3 ${
                                      currentStep === i + 1 && "actives3"
                                    } ${
                                      (i + 1 < currentStep || complete) &&
                                      "completes3"
                                    } `}
                                  >
                                    <div className="steps3">
                                      {i + 1 < currentStep || complete ? (
                                        <TiTick size={24} />
                                      ) : undefined}
                                    </div>
                                    <p className="text-gray-500">{step}</p>
                                  </div>
                                ))}
                              </div>
                            ) : undefined}
                          </div>
                          {/* จบ Process bar เอกสารแต่ละสถานะ */}

                          {/* สถานะเอกสาร */}
                          <div className="">
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[255px]">
                              <label className="font-semibold">
                                อาจารย์ได้รับเอกสารคำร้อง
                              </label>
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc1}
                                </label>
                              </div>
                            </div>
                            <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[355px]">
                              <div className="flex justify-between">
                                <label className="font-semibold">
                                  {docInfo.Status === 2 && docInfo.Status2 === 1
                                    ? "อาจารย์ปฏิเสธคำร้อง"
                                    : "อาจารย์อนุมัติคำร้อง"}
                                </label>
                                <div className="text-right">
                                  <label>{docInfo.StatusDoc2}</label>
                                </div>
                              </div>
                              {docInfo.Status === 2 && docInfo.Status2 === 1 ? (
                                <label>หมายเหตุ : {docInfo.Note1}</label>
                              ) : undefined}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[455px]">
                              <label className="font-semibold">
                                เจ้าหน้าที่ได้รับเอกสารคำร้อง
                              </label>
                              {docInfo.Status > 2 && (
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc2}
                                </label>
                              </div>
                              )}
                            </div>
                            <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[555px]">
                              <div className="flex justify-between">
                                <label className="font-semibold">
                                  {docInfo.Status === 4 && docInfo.Status2 === 1
                                    ? "เจ้าหน้าที่ปฏิเสธคำร้อง"
                                    : "เอกสารคำร้องได้รับการตรวจสอบโดยเจ้าหน้าที่"}
                                </label>
                                <div className="text-right">
                                  <label>{docInfo.StatusDoc3}</label>
                                </div>
                              </div>
                              {docInfo.Status === 4 && docInfo.Status2 === 1 ? (
                                <label>หมายเหตุ : {docInfo.Note2}</label>
                              ) : undefined}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[655px]">
                              <label className="font-semibold">
                                คณบดีได้รับเอกสารคำร้อง
                              </label>
                              {docInfo.Status > 4 && (
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc3}
                                </label>
                              </div>
                              )}
                            </div>
                            <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[755px]">
                            <div className="flex justify-between">
                              <label className="font-semibold">
                                {docInfo.Status === 6 && docInfo.Status2 === 1
                                  ? "คณบดีปฏิเสธคำร้อง"
                                  : "คณบดีอนุมัติคำร้อง"}
                              </label>
                              <div className="text-right">
                                  <label>{docInfo.StatusDoc4}</label>
                                </div>
                                </div>
                              {docInfo.Status === 6 && docInfo.Status2 === 1 ? (
                                <label>หมายเหตุ : {docInfo.Note3}</label>
                              ) : undefined}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[855px]">
                              <label className="font-semibold">
                                เจ้าหน้าที่กำลังจัดการคำร้อง
                              </label>
                              {docInfo.Status > 6 && (
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc4}
                                </label>
                              </div>
                              )}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[955px]">
                              <label className="font-semibold">
                                เจ้าหน้าที่จัดการคำร้องเสร็จสิ้น
                              </label>
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc5}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* จบสถานะเอกสาร */}
                        </div>
                      </div>
                      <button
                        className="mt-[5vh] cursor-pointer font-medium w-[650px] rounded-3xl p-[10px] ml-[21%] text-center bg-[#EE1D52] text-[#fff] font-semibold  hover:bg-red-400"
                        onClick={() => setState(1) & fetchDocument()}
                      >
                        ย้อนกลับ
                      </button>
                    </div>
                  )) ||
                  (state === 3 && (
                    <div>
                      <div>
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
                                    {docInfo.Title}
                                  </div>
                                  <div className="col-span-6">
                                    <label className="border-2 p-[5px] border-[#000] px-[10px] text-sm">
                                      ระดับปริญญาตรี
                                    </label>
                                  </div>
                                </div>
                                <div className="my-[10px] text-sm ">
                                  <label className="">
                                    คณะเทคโนโลยีสารสนเทศ
                                  </label>
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
                              <label>วันที่ {docInfo.Date}</label>
                            </div>
                            <div className="my-[2vh] text-sm">
                              <label className="font-semibold">
                                เรื่อง&nbsp;&nbsp;&nbsp;
                              </label>
                              <label>
                                {docInfo.Title}{" "}
                                {(docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม") |
                                (docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                                (docInfo.Title ===
                                  "ขอความอนุเคราะห์เปิดวิชาเรียน")
                                  ? `วิชา ${docInfo.SubjectName}`
                                  : undefined}
                              </label>
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
                                {docInfo.Sender} รหัสนักศึกษา{" "}
                                {docInfo.StudentID} ชั้นปีที่{" "}
                                {docInfo.ClassYear} สาขาวิชา {docInfo.Major}{" "}
                                แขนงวิชา {docInfo.Field}
                              </label>
                            </div>
                            <div className="text-sm my-[2vh]">
                              <label className="">
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;มีความประสงค์
                                {docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                  : undefined}
                                {docInfo.Title === "ขอย้ายกลุ่มการเรียน"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากกลุ่ม ${docInfo.Sec1} ไปยัง ${docInfo.Sec2}`
                                  : undefined}
                                {docInfo.Title === "ขอย้ายแขนงวิชา"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากแขนง ${docInfo.Sec1} ขอย้ายไปยัง ${docInfo.Sec2}`
                                  : undefined}
                                {docInfo.Title ===
                                "ขอความอนุเคราะห์เปิดวิชาเรียน"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                  : undefined}
                                {docInfo.Title === "ขอชำระเงินล่าช้า"
                                  ? `ขออนุมัติชำระค่าธรรมเนียมการศึกษาล่าช้าเป็นกรณีพิเศษ`
                                  : undefined}
                                &emsp;
                                {docInfo.Title !== "คำร้องทั่วไป"
                                  ? `เนื่องจาก`
                                  : undefined}
                                {docInfo.Descrip}{" "}
                                {docInfo.Title === "ขอชำระเงินล่าช้า"
                                  ? `และพร้อมชำระค่าธรรมเนียมการศึกษาภายในวันที่ ${docInfo.PayIn}`
                                  : undefined}
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
                                  <label>{docInfo.Sender}</label>
                                </div>
                                <div className="m-[5px]">
                                  <label>ผู้ยื่นคำร้อง</label>
                                </div>
                              </div>
                            </div>

                            <div className="h-[150px] grid grid-cols-12 border-2 border-[#000] text-center my-[2vh] text-sm">
                              <div className="col-span-5 border-r-2 border-[#000]">
                                <div className="border-b-2 p-[5px] border-[#000]">
                                  <label className="font-semibold">
                                    ความเห็นอาจารย์ที่ปรึกษา/อาจารย์ผู้สอน
                                  </label>
                                </div>
                                <div className="h-[100px]">
                                  <div className=" p-[10px] break-all">
                                    <label>
                                      {docInfo.Status >= 3
                                        ? "อนุมัติ"
                                        : docInfo.Status === 2
                                        ? "ไม่อนุมัติ"
                                        : undefined}
                                    </label>
                                    <p className="pt-[10px]" >
                                      {docInfo.TeacherName}
                                    </p>
                                    <p className="pt-[10px]" >
                                    {note1 !== "" ? `หมายเหตุ: ${note1}` : undefined}
                                    {docInfo.Note1 !== "" ? `หมายเหตุ: ${docInfo.Note1}` : undefined}
                                    
                                    </p>
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
                                  <div className=" p-[10px] break-all">
                                    <label>
                                      {docInfo.Status >= 5 &&
                                      docInfo.Status2 === 0
                                        ? "อนุมัติ"
                                        : docInfo.Status === 4
                                        ? "ไม่อนุมัติ"
                                        : undefined}
                                    </label>
                                    {docInfo.Status > 3 | docStatus > 3 ?(
                                    <p className="pt-[10px]" >
                                      กมนนัทธ์ ชื้นสกุล
                                    </p>
                                    ):undefined
                                    }
                                    <p className="pt-[10px]" >
                                    {note2 !== "" ? `หมายเหตุ: ${note2}` : undefined}
                                    {docInfo.Note2 !== "" ? `หมายเหตุ: ${docInfo.Note2}` : undefined}
                                    
                                    </p>
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
                                  <label className="font-semibold">
                                    คำสั่ง
                                  </label>
                                </div>
                                <div className="h-[100px]">
                                  <div className=" p-[10px] break-all">
                                    <label>
                                      {docInfo.Status >= 7 &&
                                      docInfo.Status2 === 0
                                        ? "อนุมัติ"
                                        : docInfo.Status === 6
                                        ? "ไม่อนุมัติ"
                                        : undefined}
                                    </label>
                                    {docInfo.Status > 5 | docStatus > 5 ?(
                                    <p className="pt-[10px]" >
                                      ศิริเดช บุญแสง
                                    </p>
                                    ):undefined
                                    }
                                    <p className="pt-[10px]" >
                                    {note3 !== "" ? `หมายเหตุ: ${note3}` : undefined}
                                    {docInfo.Note3 !== "" ? `หมายเหตุ: ${docInfo.Note3}` : undefined}
                                    
                                    </p>
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
                                  <label>{docInfo.Sender}</label>
                                </div>
                                <div className="m-[5px]">
                                  <label>วันที่ {docInfo.Date}</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid my-[2vh] ">
                          <div className="flex">
                            <div className="ml-[6%] mr-[100vh]">
                              <button
                                className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] hover:bg-red-400"
                                onClick={() => setState(1) & fetchDocument()}
                              >
                                ย้อนกลับ
                              </button>
                            </div>
                            <ReactPrint
                              trigger={() => (
                                <button className="cursor-pointer font-medium p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%] hover:bg-sky-300">
                                  ดาวน์โหลด
                                </button>
                              )}
                              content={() => ref.current}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : // ---------------------------------------------------------------------------------------------------จบหน้ากดเอกสารหน้า2-----------------------------------------------------------
                  documant.map((element, index) => {
                    return (
                      <>
                        {/*------------------------------------------------------------------------------------------------เริ่มกรองเอกสาร ----------------------------------------------------------------------------------------*/}
                        {status === "ไม่อนุมัติ" && element.Status2 === 1 ? (
                          <div
                            className="grid grid-cols-12 flex justify-center ml-[7%] mb-[3%] font-medium "
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="col-span-7 flex text-lg bg-gray-200 rounded-3xl p-[5px] text-gray-500 ">
                              <div className="w-[150px] ml-[20px] mt-[2px]">
                                <label>{element.StatusDate}</label>
                              </div>
                              <div className="mt-[3px]">
                                <label>{element.Title}</label>
                              </div>
                            </div>
                            <div
                              className={`col-span-3 text-lg rounded-3xl p-[8px] text-[#fff] text-center ml-[10%] ${
                                element.Status2 === 1
                                  ? "bg-[#FE3745]"
                                  : element.Status === 9
                                  ? "bg-[#48AF23]"
                                  : "bg-[#FFAF10]"
                              }`}
                            >
                              <label>
                                {(element.Status === 1) &
                                (element.Status2 === 0)
                                  ? "อาจารย์กำลังดำเนินการ"
                                  : (element.Status === 3) &
                                    (element.Status2 === 0)
                                  ? "เจ้าหน้าที่กำลังดำเนินการ"
                                  : (element.Status === 5) &
                                    (element.Status2 === 0)
                                  ? "คณบดีกำลังดำเนินการ"
                                  : (element.Status === 7) &
                                    (element.Status2 === 0)
                                  ? "เจ้าหน้าที่กำลังจัดการคำร้อง"
                                  : (element.Status === 9) &
                                    (element.Status2 === 0)
                                  ? "อนุมัติ"
                                  : element.Status2 === 1
                                  ? "ไม่อนุมัติ"
                                  : undefined}
                              </label>
                            </div>
                          </div>
                        ) : status === "อนุมัติ" && element.Status === 9 ? (
                          <div
                            className="grid grid-cols-12 flex justify-center ml-[7%] mb-[3%] font-medium"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="col-span-7 flex text-lg bg-gray-200 rounded-3xl p-[5px] text-gray-500">
                              <div className="w-[150px] ml-[20px] mt-[2px]">
                                <label>{element.StatusDate}</label>
                              </div>
                              <div className="mt-[3px]">
                                <label>{element.Title}</label>
                              </div>
                            </div>
                            <div
                              className={`col-span-3 text-lg rounded-3xl p-[8px] text-[#fff] text-center ml-[10%] ${
                                element.Status2 === 1
                                  ? "bg-[#FE3745]"
                                  : element.Status === 9
                                  ? "bg-[#48AF23]"
                                  : "bg-[#FFAF10]"
                              }`}
                            >
                              <label>
                                {(element.Status === 1) &
                                (element.Status2 === 0)
                                  ? "อาจารย์กำลังดำเนินการ"
                                  : (element.Status === 3) &
                                    (element.Status2 === 0)
                                  ? "เจ้าหน้าที่กำลังดำเนินการ"
                                  : (element.Status === 5) &
                                    (element.Status2 === 0)
                                  ? "คณบดีกำลังดำเนินการ"
                                  : (element.Status === 7) &
                                    (element.Status2 === 0)
                                  ? "เจ้าหน้าที่กำลังจัดการคำร้อง"
                                  : (element.Status === 9) &
                                    (element.Status2 === 0)
                                  ? "อนุมัติ"
                                  : element.Status2 === 1
                                  ? "ไม่อนุมัติ"
                                  : undefined}
                              </label>
                            </div>
                          </div>
                        ) : status === "กำลังดำเนินการ" &&
                          element.Status < 9 &&
                          element.Status2 === 0 ? (
                          <div
                            className="grid grid-cols-12 flex justify-center ml-[7%] mb-[3%] font-medium"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="col-span-7 flex text-lg bg-gray-200 rounded-3xl p-[5px] text-gray-500">
                              <div className="w-[150px] ml-[20px] mt-[2px]">
                                <label>{element.StatusDate}</label>
                              </div>
                              <div className="mt-[3px]">
                                <label>{element.Title}</label>
                              </div>
                            </div>
                            <div
                              className={`col-span-3 text-lg rounded-3xl p-[8px] text-[#fff] text-center ml-[10%] ${
                                element.Status2 === 1
                                  ? "bg-[#FE3745]"
                                  : element.Status === 9
                                  ? "bg-[#48AF23]"
                                  : "bg-[#FFAF10]"
                              }`}
                            >
                              <label>
                                {(element.Status === 1) &
                                (element.Status2 === 0)
                                  ? "อาจารย์กำลังดำเนินการ"
                                  : (element.Status === 3) &
                                    (element.Status2 === 0)
                                  ? "เจ้าหน้าที่กำลังดำเนินการ"
                                  : (element.Status === 5) &
                                    (element.Status2 === 0)
                                  ? "คณบดีกำลังดำเนินการ"
                                  : (element.Status === 7) &
                                    (element.Status2 === 0)
                                  ? "เจ้าหน้าที่กำลังจัดการคำร้อง"
                                  : (element.Status === 9) &
                                    (element.Status2 === 0)
                                  ? "อนุมัติ"
                                  : element.Status2 === 1
                                  ? "ไม่อนุมัติ"
                                  : undefined}
                              </label>
                            </div>
                          </div>
                        ) : (
                          status === "ทั้งหมด" && (
                            <div
                              className="grid grid-cols-12 flex justify-center ml-[7%] mb-[3%] font-medium"
                              key={index}
                              onClick={() => setDocInfo(element)}
                            >
                              <div className="col-span-7 flex text-lg bg-gray-200 rounded-3xl p-[5px] text-gray-500">
                                <div className="w-[150px] ml-[20px] mt-[2px]">
                                  <label>{element.StatusDate}</label>
                                </div>
                                <div className="mt-[3px]">
                                  <label>{element.Title}</label>
                                </div>
                              </div>
                              <div
                                className={`col-span-3 text-lg rounded-3xl p-[8px] text-[#fff] text-center ml-[10%] ${
                                  element.Status2 === 1
                                    ? "bg-[#FE3745]"
                                    : element.Status === 9
                                    ? "bg-[#48AF23]"
                                    : "bg-[#FFAF10]"
                                }`}
                              >
                                <label>
                                  {(element.Status === 1) &
                                  (element.Status2 === 0)
                                    ? "อาจารย์กำลังดำเนินการ"
                                    : (element.Status === 3) &
                                      (element.Status2 === 0)
                                    ? "เจ้าหน้าที่กำลังดำเนินการ"
                                    : (element.Status === 5) &
                                      (element.Status2 === 0)
                                    ? "คณบดีกำลังดำเนินการ"
                                    : (element.Status === 7) &
                                      (element.Status2 === 0)
                                    ? "เจ้าหน้าที่กำลังจัดการคำร้อง"
                                    : (element.Status === 9) &
                                      (element.Status2 === 0)
                                    ? "อนุมัติ"
                                    : element.Status2 === 1
                                    ? "ไม่อนุมัติ"
                                    : undefined}
                                </label>
                              </div>
                            </div>
                          )
                        )}
                      </>
                    );
                  })}
            </>
          )}
          {/* จบเอกสารนักศึกษา */}

          {/* เริ่มหน้าเอกสารอาจารย์ */}
          {RoleID === 2 && (
            <>
              {Object.keys(docInfo).length !== 0
                ? (state === 1 && (
                    <div>
                      <div className="flex justify-center">
                        <div className="bg-gray-100 rounded-2xl w-[70%] my-[3%] p-[30px] text-xl font-semibold ">
                          <div className="grid grid-cols-12 my-[20px]">
                            <div className="col-span-6 ">
                              <p className="">
                                ชื่อ-นามสกุล&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Sender}
                                </label>
                              </p>
                            </div>
                            <div className="col-span-6  ">
                              รหัสนักศึกษา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.StudentID}
                              </label>
                            </div>
                          </div>
                          <div>
                            <label>
                              ชั้นปี&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.ClassYear}
                              </label>
                            </label>
                          </div>
                          <div className="grid grid-cols-12 my-[20px]">
                            <div className="col-span-6 ">
                              สาขาวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Major}
                              </label>
                            </div>
                            <div className="col-span-6  ">
                              แขนงวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Field}
                              </label>
                            </div>
                          </div>
                          <div className="my-[20px]">
                            <label>
                              วันที่&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Date}
                              </label>{" "}
                            </label>
                          </div>
                          <div className="col-span-6 ">
                            หัวข้อเรื่อง&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                            <label className="font-medium">
                              {docInfo.Title}
                            </label>
                          </div>

                          {(docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม") |
                          (docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                          (docInfo.Title ===
                            "ขอความอนุเคราะห์เปิดวิชาเรียน") ? (
                            <div>
                              <div className="grid grid-cols-12 my-[20px]">
                                <div className="col-span-6 ">
                                  รหัสวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                  <label className="font-medium">
                                    {docInfo.SubjectID}
                                  </label>
                                </div>

                                <div className="col-span-6  ">
                                  <label className="">
                                    วิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                    <label className="font-medium">
                                      {docInfo.SubjectName}
                                    </label>
                                  </label>
                                </div>
                              </div>
                            </div>
                          ) : undefined}
                          {docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม" && (
                            <div className="grid grid-cols-12 my-[20px]">
                              <div className="col-span-6 ">
                                กลุ่มการเรียน&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Sec1}
                                </label>
                              </div>
                            </div>
                          )}
                          {(docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                          (docInfo.Title === "ขอย้ายแขนงวิชา") ? (
                            <div className="my-[20px]">
                              <label>
                                ย้ายจาก&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Sec1}
                                  &nbsp;&nbsp;
                                  {docInfo.Title === "ขอย้ายแขนงวิชา"
                                    ? "ไปยังแขนงวิชา"
                                    : "ไปยัง"}
                                  &nbsp;&nbsp;{docInfo.Sec2}
                                </label>
                              </label>
                            </div>
                          ) : undefined}
                          <div className="my-[20px]">
                            <label>
                              อาจารย์&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.TeacherName}
                              </label>
                            </label>
                          </div>
                          {docInfo.Title === "ขอชำระเงินล่าช้า" ? (
                            <div className="my-[20px]">
                              <label>
                                ชำระภายในวันที่&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.PayIn}
                                </label>
                              </label>
                            </div>
                          ) : undefined}
                          <div className="my-[20px] break-all">
                            <label>
                              {docInfo.Title === "ขอชำระเงินล่าช้า"
                                ? "รายละเอียด"
                                : "เนื่องจาก"}
                              &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Descrip}
                              </label>
                            </label>
                          </div>
                          {docInfo.FileName !== "null" && (
                            <div className="flex my-[20px]">
                              <label>
                                แนบไฟล์&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              </label>
                              <button
                                onClick={() => download(docInfo.FileName)}
                              >
                                {docInfo.FileName.split("_T_")[1]}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {docInfo.Status > 1 ? (
                        <div>
                          <label class="text-2xl font-semibold m-[7%]">
                            สถานะคำร้อง
                          </label>
                          <div className="flex justify-center ">
                            <div className="bg-gray-100 rounded-2xl w-[70%]  my-[3%] p-[30px] text-xl font-semibold ">
                              <div>
                                คำร้อง:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Title}
                                </label>
                              </div>
                              <div
                                className={`mt-[10px] ${
                                  docInfo.Status === 1 ||
                                  docInfo.Status === 3 ||
                                  docInfo.Status === 5 ||
                                  docInfo.Status === 7
                                    ? "text-amber-500"
                                    : docInfo.Status === 2 ||
                                      docInfo.Status === 4 ||
                                      docInfo.Status === 6
                                    ? "text-[red]"
                                    : docInfo.Status === 9
                                    ? "text-[#48AF23]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {docInfo.Status === 1
                                    ? "อาจารย์ได้รับเอกสารคำร้อง"
                                    : docInfo.Status === 2
                                    ? "อาจารย์ปฏิเสธคำร้อง"
                                    : docInfo.Status === 3
                                    ? "เจ้าหน้าที่ได้รับเอกสารคำร้อง"
                                    : docInfo.Status === 4
                                    ? "เจ้าหน้าที่ปฏิเสธคำร้อง"
                                    : docInfo.Status === 5
                                    ? "คณบดีได้รับเอกสารคำร้อง"
                                    : docInfo.Status === 6
                                    ? "คณบดีปฏิเสธคำร้อง"
                                    : docInfo.Status === 7
                                    ? "เจ้าหน้าที่กำลังจัดการคำร้อง"
                                    : docInfo.Status === 9
                                    ? "เจ้าหน้าที่จัดการคำร้องเสร็จสิ้น"
                                    : undefined}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : undefined}

                      {docInfo.Status === 1 && (
                        <div className="">
                          <div className="ml-[6%]">
                            <label className="text-2xl font-bold ">
                              ความเห็นอาจารย์
                            </label>
                          </div>
                          <div className="">
                            <div className="grid grid-cols-12 mt-[5vh] font-semibold justify-items-center">
                              <div className="col-span-3 ml-[18vh] ">
                                <label>ความเห็น</label>
                              </div>
                              <div className="col-span-6 flex text-lg">
                                <div className="mr-[15vh]">
                                  <input
                                    className="mr-[10px]"
                                    type="checkbox"
                                    checked={docStatus === 3}
                                    onChange={() =>
                                      setDocStatus(3) & setDocStatus2(0)
                                    }
                                  />
                                  <label>อนุมัติ</label>
                                </div>
                                <div>
                                  <input
                                    className="mr-[10px]"
                                    type="checkbox"
                                    checked={docStatus === 2}
                                    onChange={() =>
                                      setDocStatus(2) & setDocStatus2(1)
                                    }
                                  />
                                  <label>ไม่อนุมัติ</label>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 mt-[5vh] font-semibold ">
                              <div className="col-span-3 justify-self-center ml-[18vh] ">
                                <label>หมายเหตุ</label>
                              </div>
                              <div className="col-span-9 flex text-lg ml-[20vh]">
                                <textarea
                                  className="border-2 rounded-lg border-black-500 p-[10px] mb-[30px] w-[75vh] h-[150px] "
                                  placeholder=""
                                  type="text"
                                  onChange={noteChange1}
                                  value={note1}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex">
                        <button
                          className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[23vh] hover:bg-red-400"
                          onClick={() =>
                            setDocInfo({}) & fetchDocumentTeach() & setNote1("")
                          }
                        >
                          ย้อนกลับ
                        </button>
                        <div className="absolute right-[23vh]">
                          {docInfo.Status2 === 0 && docInfo.Status > 1 ? (
                            <button
                              className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] justify-self-end hover:bg-green-400"
                              onClick={() => setState(3) & fetchDocumentTeach()}
                            >
                              ดูใบคำร้อง
                            </button>
                          ) : undefined}
                          {docInfo.Status === 1 && (
                            <button
                            className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-2vh justify-self-end hover:bg-green-400 "
                            onClick={() =>
                              setState(4) & fetchDocumentTeach() & setCurrentStep(docInfo.Status)
                            }
                          >
                            สถานะเอกสาร
                          </button>
                          )}
                          <button
                            className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] justify-self-end hover:bg-sky-300"
                            onClick={() =>
                              setState(2) &
                              setId(docInfo.DocID) & fetchDocumentTeach() &
                              setCurrentStep(docInfo.Status)
                            }
                          >
                            {docInfo.Status === 1 ? "ถัดไป" : "สถานะเอกสาร"}
                          </button>
                        </div>
                      </div>
                    </div>
                    // <div>{docInfo.Title}</div>
                  )) ||
                  (state === 2 && (
                    <div>
                      {docInfo.Status === 1 ? (
                        <div>
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
                                      {docInfo.Title}
                                    </div>
                                    <div className="col-span-6">
                                      <label className="border-2 p-[5px] border-[#000] px-[10px] text-sm">
                                        ระดับปริญญาตรี
                                      </label>
                                    </div>
                                  </div>
                                  <div className="my-[10px] text-sm ">
                                    <label className="">
                                      คณะเทคโนโลยีสารสนเทศ
                                    </label>
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
                                <label>วันที่ {docInfo.Date}</label>
                              </div>
                              <div className="my-[2vh] text-sm">
                                <label className="font-semibold">
                                  เรื่อง&nbsp;&nbsp;&nbsp;
                                </label>
                                <label>
                                  {docInfo.Title}{" "}
                                  {(docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม") |
                                  (docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                                  (docInfo.Title ===
                                    "ขอความอนุเคราะห์เปิดวิชาเรียน")
                                    ? `วิชา ${docInfo.SubjectName}`
                                    : undefined}
                                </label>
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
                                  {docInfo.Sender} รหัสนักศึกษา{" "}
                                  {docInfo.StudentID} ชั้นปีที่{" "}
                                  {docInfo.ClassYear} สาขาวิชา {docInfo.Major}{" "}
                                  แขนงวิชา {docInfo.Field}
                                </label>
                              </div>
                              <div className="text-sm my-[2vh]">
                                <label className="">
                                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;มีความประสงค์
                                  {docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม"
                                    ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                    : undefined}
                                  {docInfo.Title === "ขอย้ายกลุ่มการเรียน"
                                    ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากกลุ่ม ${docInfo.Sec1} ไปยัง ${docInfo.Sec2}`
                                    : undefined}
                                  {docInfo.Title === "ขอย้ายแขนงวิชา"
                                    ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากแขนง ${docInfo.Sec1} ขอย้ายไปยัง ${docInfo.Sec2}`
                                    : undefined}
                                  {docInfo.Title ===
                                  "ขอความอนุเคราะห์เปิดวิชาเรียน"
                                    ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                    : undefined}
                                  {docInfo.Title === "ขอชำระเงินล่าช้า"
                                    ? `ขออนุมัติชำระค่าธรรมเนียมการศึกษาล่าช้าเป็นกรณีพิเศษ`
                                    : undefined}
                                  &emsp;
                                  {docInfo.Title !== "คำร้องทั่วไป"
                                    ? `เนื่องจาก`
                                    : undefined}
                                  {docInfo.Descrip}{" "}
                                  {docInfo.Title === "ขอชำระเงินล่าช้า"
                                    ? `และพร้อมชำระค่าธรรมเนียมการศึกษาภายในวันที่ ${docInfo.PayIn}`
                                    : undefined}
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
                                    <label>{docInfo.Sender}</label>
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
                                    <div className="p-[10px] break-all">
                                      <label>
                                        {docStatus >= 3 && docStatus2 === 0
                                          ? "อนุมัติ"
                                          : docStatus === 2
                                          ? "ไม่อนุมัติ"
                                          : undefined}
                                      </label>
                                      <p className="pt-[10px]" >
                                      {docInfo.TeacherName}
                                    </p>
                                    <p className="pt-[10px]" >
                                    {note1 !== "" ? `หมายเหตุ: ${note1}` : undefined}
                                    {docInfo.Note1 !== "" ? `หมายเหตุ: ${docInfo.Note1}` : undefined}
                                    
                                    </p>
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
                                    <div className="h-[50px] p-[10px] break-all"></div>
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
                                    <label className="font-semibold">
                                      คำสั่ง
                                    </label>
                                  </div>
                                  <div className="h-[100px]">
                                    <div className="h-[50px] p-[10px] break-all"></div>
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
                                    <label>{docInfo.Sender}</label>
                                  </div>
                                  <div className="m-[5px]">
                                    <label>วันที่ {docInfo.Date}</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="grid my-[2vh] ">
                            <div className="flex ">
                              <div className="ml-[6%] mr-[88vh]">
                                <button
                                  className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px]"
                                  onClick={() => setState(1) &  fetchDocumentTeach()}
                                >
                                  แก้ไข
                                </button>
                              </div>
                              <ReactPrint
                                trigger={() => (
                                  <button className="cursor-pointer font-medium p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ">
                                    ดาวน์โหลด
                                  </button>
                                )}
                                content={() => ref.current}
                              />

                              <button
                                className="cursor-pointer font-medium p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[10px]"
                                onClick={() =>
                                  moment().format("Do MMM YYYY, LT")  & updateDocStatus2() & updateNote1() &
                                  updateStatus() & fetchDocumentTeach()
                                }
                              >
                                ยืนยัน
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                      <div className="w-[70%] ml-[20vh]">
                        {/* หัวข้อสถานะเอกสาร */}
                        <div
                          className={`w-[650px] rounded-3xl p-[10px] ml-[11%] text-center absolute left-[61vh] top-[25vh]  ${
                            docInfo.Status2 === 1
                              ? "bg-[#EE1D52]"
                              : docInfo.Status === 9
                              ? "bg-[#48AF23]"
                              : "bg-[#FFAF10]"
                          }`}
                        >
                          <label className="text-[#fff] font-semibold">
                            {docInfo.Status2 === 1
                              ? "คำร้องถูกปฏิเสธ"
                              : docInfo.Status === 9
                              ? "จัดการคำร้องเสร็จสิ้น"
                              : docInfo.Status < 9 && docInfo.Status2 === 0
                              ? "กำลังดำเนินการ"
                              : undefined}
                          </label>
                        </div>
                        {/* จบหัวข้อสถานะเอกสาร */}
                        <div className="flex">
                          {/* Process bar เอกสารแต่ละสถานะ */}
                          <div className="mt-[50px]">
                            {docInfo.Status2 === 0 && docInfo.Status < 9 ? (
                              <div>
                                {steps?.map((step, i) => (
                                  <div
                                    key={i}
                                    className={`step-items ${
                                      currentStep === i + 1 && "actives"
                                    } ${
                                      (i + 1 < currentStep || complete) &&
                                      "completes"
                                    } `}
                                  >
                                    <div className="steps">
                                      {i + 1 < currentStep || complete ? (
                                        <TiTick size={24} />
                                      ) : undefined}
                                    </div>
                                    <p className="text-gray-500">{step}</p>
                                  </div>
                                ))}
                              </div>
                            ) : undefined}
                            {/*  */}
                            {docInfo.Status2 === 1 ? (
                              <div>
                                {steps?.map((step, i) => (
                                  <div
                                    key={i}
                                    className={`step-items2 ${
                                      currentStep === i + 1 && "actives2"
                                    } ${
                                      (i + 1 < currentStep || complete) &&
                                      "completes2"
                                    } `}
                                  >
                                    <div className="steps2">
                                      {i + 1 < currentStep || complete ? (
                                        <TiTick size={24} />
                                      ) : undefined}
                                    </div>
                                    <p className="text-gray-500">{step}</p>
                                  </div>
                                ))}
                              </div>
                            ) : undefined}
                            {docInfo.Status === 9 ? (
                              <div>
                                {steps?.map((step, i) => (
                                  <div
                                    key={i}
                                    className={`step-items3 ${
                                      currentStep === i + 1 && "actives3"
                                    } ${
                                      (i + 1 < currentStep || complete) &&
                                      "completes3"
                                    } `}
                                  >
                                    <div className="steps3">
                                      {i + 1 < currentStep || complete ? (
                                        <TiTick size={24} />
                                      ) : undefined}
                                    </div>
                                    <p className="text-gray-500">{step}</p>
                                  </div>
                                ))}
                              </div>
                            ) : undefined}
                          </div>
                          {/* จบ Process bar เอกสารแต่ละสถานะ */}

                          {/* สถานะเอกสาร */}
                          <div className="">
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[255px]">
                              <label className="font-semibold">
                                อาจารย์ได้รับเอกสารคำร้อง
                              </label>
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc1}
                                </label>
                              </div>
                            </div>
                            <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[355px]">
                              <div className="flex justify-between">
                                <label className="font-semibold">
                                  {docInfo.Status === 2 && docInfo.Status2 === 1
                                    ? "อาจารย์ปฏิเสธคำร้อง"
                                    : "อาจารย์อนุมัติคำร้อง"}
                                </label>
                                <div className="text-right">
                                  <label>{docInfo.StatusDoc2}</label>
                                </div>
                              </div>
                              {docInfo.Status === 2 && docInfo.Status2 === 1 ? (
                                <label>หมายเหตุ : {docInfo.Note1}</label>
                              ) : undefined}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[455px]">
                              <label className="font-semibold">
                                เจ้าหน้าที่ได้รับเอกสารคำร้อง
                              </label>
                              {docInfo.Status > 2 && (
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc2}
                                </label>
                              </div>
                              )}
                            </div>
                            <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[555px]">
                              <div className="flex justify-between">
                                <label className="font-semibold">
                                  {docInfo.Status === 4 && docInfo.Status2 === 1
                                    ? "เจ้าหน้าที่ปฏิเสธคำร้อง"
                                    : "เอกสารคำร้องได้รับการตรวจสอบโดยเจ้าหน้าที่"}
                                </label>
                                <div className="text-right">
                                  <label>{docInfo.StatusDoc3}</label>
                                </div>
                              </div>
                              {docInfo.Status === 4 && docInfo.Status2 === 1 ? (
                                <label>หมายเหตุ : {docInfo.Note2}</label>
                              ) : undefined}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[655px]">
                              <label className="font-semibold">
                                คณบดีได้รับเอกสารคำร้อง
                              </label>
                              {docInfo.Status > 4 && (
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc3}
                                </label>
                              </div>
                              )}
                            </div>
                            <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[755px]">
                            <div className="flex justify-between">
                              <label className="font-semibold">
                                {docInfo.Status === 6 && docInfo.Status2 === 1
                                  ? "คณบดีปฏิเสธคำร้อง"
                                  : "คณบดีอนุมัติคำร้อง"}
                              </label>
                              <div className="text-right">
                                  <label>{docInfo.StatusDoc4}</label>
                                </div>
                                </div>
                              {docInfo.Status === 6 && docInfo.Status2 === 1 ? (
                                <label>หมายเหตุ : {docInfo.Note3}</label>
                              ) : undefined}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[855px]">
                              <label className="font-semibold">
                                เจ้าหน้าที่กำลังจัดการคำร้อง
                              </label>
                              {docInfo.Status > 6 && (
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc4}
                                </label>
                              </div>
                              )}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[955px]">
                              <label className="font-semibold">
                                เจ้าหน้าที่จัดการคำร้องเสร็จสิ้น
                              </label>
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc5}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* จบสถานะเอกสาร */}
                        </div>
                      </div>
                      <button
                        className="mt-[5vh] cursor-pointer font-medium w-[650px] rounded-3xl p-[10px] ml-[21%] text-center bg-[#EE1D52] text-[#fff] font-semibold  hover:bg-red-400"
                        onClick={() => setState(1) & fetchDocumentTeach()}
                      >
                        ย้อนกลับ
                      </button>
                    </div>
                      )}
                    </div>
                  )) ||
                  (state === 3 && (
                    <div>
                      <div>
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
                                    {docInfo.Title}
                                  </div>
                                  <div className="col-span-6">
                                    <label className="border-2 p-[5px] border-[#000] px-[10px] text-sm">
                                      ระดับปริญญาตรี
                                    </label>
                                  </div>
                                </div>
                                <div className="my-[10px] text-sm ">
                                  <label className="">
                                    คณะเทคโนโลยีสารสนเทศ
                                  </label>
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
                              <label>วันที่ {docInfo.Date}</label>
                            </div>
                            <div className="my-[2vh] text-sm">
                              <label className="font-semibold">
                                เรื่อง&nbsp;&nbsp;&nbsp;
                              </label>
                              <label>
                                {docInfo.Title}{" "}
                                {(docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม") |
                                (docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                                (docInfo.Title ===
                                  "ขอความอนุเคราะห์เปิดวิชาเรียน")
                                  ? `วิชา ${docInfo.SubjectName}`
                                  : undefined}
                              </label>
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
                                {docInfo.Sender} รหัสนักศึกษา{" "}
                                {docInfo.StudentID} ชั้นปีที่{" "}
                                {docInfo.ClassYear} สาขาวิชา {docInfo.Major}{" "}
                                แขนงวิชา {docInfo.Field}
                              </label>
                            </div>
                            <div className="text-sm my-[2vh]">
                              <label className="">
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;มีความประสงค์
                                {docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                  : undefined}
                                {docInfo.Title === "ขอย้ายกลุ่มการเรียน"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากกลุ่ม ${docInfo.Sec1} ไปยัง ${docInfo.Sec2}`
                                  : undefined}
                                {docInfo.Title === "ขอย้ายแขนงวิชา"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากแขนง ${docInfo.Sec1} ขอย้ายไปยัง ${docInfo.Sec2}`
                                  : undefined}
                                {docInfo.Title ===
                                "ขอความอนุเคราะห์เปิดวิชาเรียน"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                  : undefined}
                                {docInfo.Title === "ขอชำระเงินล่าช้า"
                                  ? `ขออนุมัติชำระค่าธรรมเนียมการศึกษาล่าช้าเป็นกรณีพิเศษ`
                                  : undefined}
                                &emsp;
                                {docInfo.Title !== "คำร้องทั่วไป"
                                  ? `เนื่องจาก`
                                  : undefined}
                                {docInfo.Descrip}{" "}
                                {docInfo.Title === "ขอชำระเงินล่าช้า"
                                  ? `และพร้อมชำระค่าธรรมเนียมการศึกษาภายในวันที่ ${docInfo.PayIn}`
                                  : undefined}
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
                                  <label>{docInfo.Sender}</label>
                                </div>
                                <div className="m-[5px]">
                                  <label>ผู้ยื่นคำร้อง</label>
                                </div>
                              </div>
                            </div>

                            <div className="h-[150px] grid grid-cols-12 border-2 border-[#000] text-center my-[2vh] text-sm">
                              <div className="col-span-5 border-r-2 border-[#000]">
                                <div className="border-b-2 p-[5px] border-[#000]">
                                  <label className="font-semibold">
                                    ความเห็นอาจารย์ที่ปรึกษา/อาจารย์ผู้สอน
                                  </label>
                                </div>
                                <div className="h-[100px]">
                                  <div className=" p-[10px] break-all">
                                    <label>
                                      {docInfo.Status >= 3
                                        ? "อนุมัติ"
                                        : undefined}
                                    </label>
                                    <p className="pt-[10px]" >
                                      {docInfo.TeacherName}
                                    </p>
                                    <p className="pt-[10px]" >
                                    {note1 !== "" ? `หมายเหตุ: ${note1}` : undefined}
                                    {docInfo.Note1 !== "" ? `หมายเหตุ: ${docInfo.Note1}` : undefined}
                                    
                                    </p>
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
                                    <label>
                                      {docInfo.Status >= 5
                                        ? "อนุมัติ"
                                        : undefined}
                                    </label>
                                    {docInfo.Status > 3 | docStatus > 3 ?(
                                    <p className="pt-[10px]" >
                                      กมนนัทธ์ ชื้นสกุล
                                    </p>
                                    ):undefined
                                    }
                                    <p className="pt-[10px]" >
                                    {note2 !== "" ? `หมายเหตุ: ${note2}` : undefined}
                                    {docInfo.Note2 !== "" ? `หมายเหตุ: ${docInfo.Note2}` : undefined}
                                    
                                    </p>
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
                                  <label className="font-semibold">
                                    คำสั่ง
                                  </label>
                                </div>
                                <div className="h-[100px]">
                                  <div className=" p-[10px] break-all">
                                    <label>
                                      {docInfo.Status >= 7
                                        ? "อนุมัติ"
                                        : undefined}
                                    </label>
                                    {docInfo.Status > 5 | docStatus > 5 ?(
                                    <p className="pt-[10px]" >
                                      ศิริเดช บุญแสง
                                    </p>
                                    ):undefined
                                    }
                                    <p className="pt-[10px]" >
                                    {note3 !== "" ? `หมายเหตุ: ${note3}` : undefined}
                                    {docInfo.Note3 !== "" ? `หมายเหตุ: ${docInfo.Note3}` : undefined}
                                    
                                    </p>
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
                                  <label>{docInfo.Sender}</label>
                                </div>
                                <div className="m-[5px]">
                                  <label>วันที่ {docInfo.Date}</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid my-[2vh] ">
                          <div className="flex">
                            <div className="ml-[6%] mr-[100vh]">
                              <button
                                className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] hover:bg-red-400"
                                onClick={() => setState(1)& fetchDocumentTeach()}
                              >
                                ย้อนกลับ
                              </button>
                            </div>
                            <ReactPrint
                              trigger={() => (
                                <button className="cursor-pointer font-medium p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%] hover:bg-sky-300">
                                  ดาวน์โหลด
                                </button>
                              )}
                              content={() => ref.current}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )) || (state === 4 && (
                    <div>
                    <div className="w-[70%] ml-[20vh]">
                      {/* หัวข้อสถานะเอกสาร */}
                      <div
                        className={`w-[650px] rounded-3xl p-[10px] ml-[11%] text-center absolute left-[61vh] top-[25vh]  ${
                          docInfo.Status2 === 1
                            ? "bg-[#EE1D52]"
                            : docInfo.Status === 9
                            ? "bg-[#48AF23]"
                            : "bg-[#FFAF10]"
                        }`}
                      >
                        <label className="text-[#fff] font-semibold">
                          {docInfo.Status2 === 1
                            ? "คำร้องถูกปฏิเสธ"
                            : docInfo.Status === 9
                            ? "จัดการคำร้องเสร็จสิ้น"
                            : docInfo.Status < 9 && docInfo.Status2 === 0
                            ? "กำลังดำเนินการ"
                            : undefined}
                        </label>
                      </div>
                      {/* จบหัวข้อสถานะเอกสาร */}
                      <div className="flex">
                        {/* Process bar เอกสารแต่ละสถานะ */}
                        <div className="mt-[50px]">
                          {docInfo.Status2 === 0 && docInfo.Status < 9 ? (
                            <div>
                              {steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className={`step-items ${
                                    currentStep === i + 1 && "actives"
                                  } ${
                                    (i + 1 < currentStep || complete) &&
                                    "completes"
                                  } `}
                                >
                                  <div className="steps">
                                    {i + 1 < currentStep || complete ? (
                                      <TiTick size={24} />
                                    ) : undefined}
                                  </div>
                                  <p className="text-gray-500">{step}</p>
                                </div>
                              ))}
                            </div>
                          ) : undefined}
                          {/*  */}
                          {docInfo.Status2 === 1 ? (
                            <div>
                              {steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className={`step-items2 ${
                                    currentStep === i + 1 && "actives2"
                                  } ${
                                    (i + 1 < currentStep || complete) &&
                                    "completes2"
                                  } `}
                                >
                                  <div className="steps2">
                                    {i + 1 < currentStep || complete ? (
                                      <TiTick size={24} />
                                    ) : undefined}
                                  </div>
                                  <p className="text-gray-500">{step}</p>
                                </div>
                              ))}
                            </div>
                          ) : undefined}
                          {docInfo.Status === 9 ? (
                            <div>
                              {steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className={`step-items3 ${
                                    currentStep === i + 1 && "actives3"
                                  } ${
                                    (i + 1 < currentStep || complete) &&
                                    "completes3"
                                  } `}
                                >
                                  <div className="steps3">
                                    {i + 1 < currentStep || complete ? (
                                      <TiTick size={24} />
                                    ) : undefined}
                                  </div>
                                  <p className="text-gray-500">{step}</p>
                                </div>
                              ))}
                            </div>
                          ) : undefined}
                        </div>
                        {/* จบ Process bar เอกสารแต่ละสถานะ */}

                        {/* สถานะเอกสาร */}
                        <div className="">
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[255px]">
                            <label className="font-semibold">
                              อาจารย์ได้รับเอกสารคำร้อง
                            </label>
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc1}
                              </label>
                            </div>
                          </div>
                          <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[355px]">
                            <div className="flex justify-between">
                              <label className="font-semibold">
                                {docInfo.Status === 2 && docInfo.Status2 === 1
                                  ? "อาจารย์ปฏิเสธคำร้อง"
                                  : "อาจารย์อนุมัติคำร้อง"}
                              </label>
                              <div className="text-right">
                                <label>{docInfo.StatusDoc2}</label>
                              </div>
                            </div>
                            {docInfo.Status === 2 && docInfo.Status2 === 1 ? (
                              <label>หมายเหตุ : {docInfo.Note}</label>
                            ) : undefined}
                          </div>
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[455px]">
                            <label className="font-semibold">
                              เจ้าหน้าที่ได้รับเอกสารคำร้อง
                            </label>
                            {docInfo.Status > 2 && (
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc2}
                              </label>
                            </div>
                            )}
                          </div>
                          <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[555px]">
                            <div className="flex justify-between">
                              <label className="font-semibold">
                                {docInfo.Status === 4 && docInfo.Status2 === 1
                                  ? "เจ้าหน้าที่ปฏิเสธคำร้อง"
                                  : "เอกสารคำร้องได้รับการตรวจสอบโดยเจ้าหน้าที่"}
                              </label>
                              <div className="text-right">
                                <label>{docInfo.StatusDoc3}</label>
                              </div>
                            </div>
                            {docInfo.Status === 4 && docInfo.Status2 === 1 ? (
                              <label>หมายเหตุ : {docInfo.Note}</label>
                            ) : undefined}
                          </div>
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[655px]">
                            <label className="font-semibold">
                              คณบดีได้รับเอกสารคำร้อง
                            </label>
                            {docInfo.Status > 4 && (
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc3}
                              </label>
                            </div>
                            )}
                          </div>
                          <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[755px]">
                          <div className="flex justify-between">
                            <label className="font-semibold">
                              {docInfo.Status === 6 && docInfo.Status2 === 1
                                ? "คณบดีปฏิเสธคำร้อง"
                                : "คณบดีอนุมัติคำร้อง"}
                            </label>
                            <div className="text-right">
                                <label>{docInfo.StatusDoc4}</label>
                              </div>
                              </div>
                            {docInfo.Status === 6 && docInfo.Status2 === 1 ? (
                              <label>หมายเหตุ : {docInfo.Note}</label>
                            ) : undefined}
                          </div>
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[855px]">
                            <label className="font-semibold">
                              เจ้าหน้าที่กำลังจัดการคำร้อง
                            </label>
                            {docInfo.Status > 6 && (
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc4}
                              </label>
                            </div>
                            )}
                          </div>
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[955px]">
                            <label className="font-semibold">
                              เจ้าหน้าที่จัดการคำร้องเสร็จสิ้น
                            </label>
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc5}
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* จบสถานะเอกสาร */}
                      </div>
                    </div>
                    <button
                      className="mt-[5vh] cursor-pointer font-medium w-[650px] rounded-3xl p-[10px] ml-[21%] text-center bg-[#EE1D52] text-[#fff] font-semibold  hover:bg-red-400"
                      onClick={() => setState(1) & fetchDocumentTeach()}
                    >
                      ย้อนกลับ
                    </button>
                  </div>
                  ))
                : docTeach.map((element, index) => {
                    console.log("data", element);
                    return (
                      <>
                        {status === "ไม่อนุมัติ" &&
                        element.Status === 2 &&
                        element.Status2 === 1 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl text-[#fff] mr-[200px] w-[150px] ${
                                  element.Status2 === 1 && element.Status === 2
                                    ? "bg-[#FE3745]"
                                    : element.Status >= 3
                                    ? "bg-[#48AF23]"
                                    : element.Status === 1
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {element.Status2 === 1 && element.Status === 2
                                    ? "ไม่อนุมัติ"
                                    : element.Status >= 3
                                    ? "อนุมัติ"
                                    : element.Status === 1
                                    ? "รอดำเนินการ"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : status === "อนุมัติ" && element.Status >= 3 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl text-[#fff] mr-[200px] w-[150px] ${
                                  element.Status2 === 1 && element.Status === 2
                                    ? "bg-[#FE3745]"
                                    : element.Status >= 3
                                    ? "bg-[#48AF23]"
                                    : element.Status === 1
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {element.Status2 === 1 && element.Status === 2
                                    ? "ไม่อนุมัติ"
                                    : element.Status >= 3
                                    ? "อนุมัติ"
                                    : element.Status === 1
                                    ? "รอดำเนินการ"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : status === "กำลังดำเนินการ" &&
                          element.Status === 1 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl text-[#fff] mr-[200px] w-[150px] ${
                                  element.Status2 === 1 && element.Status === 2
                                    ? "bg-[#FE3745]"
                                    : element.Status >= 3
                                    ? "bg-[#48AF23]"
                                    : element.Status === 1
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {element.Status2 === 1 && element.Status === 2
                                    ? "ไม่อนุมัติ"
                                    : element.Status >= 3
                                    ? "อนุมัติ"
                                    : element.Status === 1
                                    ? "รอดำเนินการ"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : (
                          status === "ทั้งหมด" && (
                            <div
                              className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                              key={index}
                              onClick={() => setDocInfo(element)}
                            >
                              <div className="flex">
                                <div className="self-center">
                                  <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                    {element.StudentID}
                                  </label>
                                </div>
                                <div className="mx-[30px]">
                                  <div className="flex">
                                    <label className="font-semibold text-xl">
                                      {element.Sender}
                                    </label>
                                  </div>

                                  <p>{element.Title}</p>
                                </div>
                              </div>
                              <div className="flex">
                                <div
                                  className={`self-center px-[10px] py-[5px] text-center rounded-3xl text-[#fff] mr-[200px] w-[150px] ${
                                    element.Status2 === 1 &&
                                    element.Status === 2
                                      ? "bg-[#FE3745]"
                                      : element.Status >= 3
                                      ? "bg-[#48AF23]"
                                      : element.Status < 3
                                      ? "bg-[#FFAF10]"
                                      : undefined
                                  }`}
                                >
                                  <label className="">
                                    {element.Status2 === 1 &&
                                    element.Status === 2
                                      ? "ไม่อนุมัติ"
                                      : element.Status >= 3
                                      ? "อนุมัติ"
                                      : element.Status < 3
                                      ? "รอดำเนินการ"
                                      : undefined}
                                  </label>
                                </div>
                                <div className="self-center">
                                  <label className="font-semibold text-xl">
                                    {element.StatusDate}
                                  </label>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </>
                    );
                  })}
            </>
          )}
          {/* จบหน้าเอกสารอาจารย์ */}

          {/* เริ่มหน้าเอกสารเจ้าหน้าที่ */}

          {RoleID === 3 && (
            <>
              {Object.keys(docInfo).length !== 0
                ? (state === 1 && (
                    <div>
                      <div className="flex justify-center">
                        <div className="bg-gray-100 rounded-2xl w-[70%] my-[3%] p-[30px] text-xl font-semibold ">
                          <div className="grid grid-cols-12 my-[20px]">
                            <div className="col-span-6 ">
                              <p className="">
                                ชื่อ-นามสกุล&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Sender}
                                </label>
                              </p>
                            </div>
                            <div className="col-span-6  ">
                              รหัสนักศึกษา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.StudentID}
                              </label>
                            </div>
                          </div>
                          <div>
                            <label>
                              ชั้นปี&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.ClassYear}
                              </label>
                            </label>
                          </div>
                          <div className="grid grid-cols-12 my-[20px]">
                            <div className="col-span-6 ">
                              สาขาวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Major}
                              </label>
                            </div>
                            <div className="col-span-6  ">
                              แขนงวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Field}
                              </label>
                            </div>
                          </div>
                          <div className="my-[20px]">
                            <label>
                              วันที่&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Date}
                              </label>{" "}
                            </label>
                          </div>
                          <div className="col-span-6 ">
                            หัวข้อเรื่อง&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                            <label className="font-medium">
                              {docInfo.Title}
                            </label>
                          </div>

                          {(docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม") |
                          (docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                          (docInfo.Title ===
                            "ขอความอนุเคราะห์เปิดวิชาเรียน") ? (
                            <div>
                              <div className="grid grid-cols-12 my-[20px]">
                                <div className="col-span-6 ">
                                  รหัสวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                  <label className="font-medium">
                                    {docInfo.SubjectID}
                                  </label>
                                </div>

                                <div className="col-span-6  ">
                                  <label className="">
                                    วิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                    <label className="font-medium">
                                      {docInfo.SubjectName}
                                    </label>
                                  </label>
                                </div>
                              </div>
                            </div>
                          ) : undefined}
                          {docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม" && (
                            <div className="grid grid-cols-12 my-[20px]">
                              <div className="col-span-6 ">
                                กลุ่มการเรียน&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Sec1}
                                </label>
                              </div>
                            </div>
                          )}
                          {(docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                          (docInfo.Title === "ขอย้ายแขนงวิชา") ? (
                            <div className="my-[20px]">
                              <label>
                                ย้ายจาก&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Sec1}
                                  &nbsp;&nbsp;
                                  {docInfo.Title === "ขอย้ายแขนงวิชา"
                                    ? "ไปยังแขนงวิชา"
                                    : "ไปยัง"}
                                  &nbsp;&nbsp;{docInfo.Sec2}
                                </label>
                              </label>
                            </div>
                          ) : undefined}
                          <div className="my-[20px]">
                            <label>
                              อาจารย์&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.TeacherName}
                              </label>
                            </label>
                          </div>
                          {docInfo.Title === "ขอชำระเงินล่าช้า" ? (
                            <div className="my-[20px]">
                              <label>
                                ชำระภายในวันที่&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.PayIn}
                                </label>
                              </label>
                            </div>
                          ) : undefined}
                          <div className="my-[20px] break-all">
                            <label>
                              {docInfo.Title === "ขอชำระเงินล่าช้า"
                                ? "รายละเอียด"
                                : "เนื่องจาก"}
                              &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Descrip}
                              </label>
                            </label>
                          </div>
                          {docInfo.FileName !== "null" && (
                            <div className="flex my-[20px]">
                              <label>
                                แนบไฟล์&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              </label>
                              <button
                                onClick={() => download(docInfo.FileName)}
                              >
                                {docInfo.FileName.split("_T_")[1]}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {docInfo.Status > 3 && status !== "จัดการคำร้อง" ? (
                        <div>
                          <label class="text-2xl font-semibold m-[7%]">
                            สถานะคำร้อง
                          </label>
                          <div className="flex justify-center ">
                            <div className="bg-gray-100 rounded-2xl w-[70%]  my-[3%] p-[30px] text-xl font-semibold ">
                              <div>
                                คำร้อง:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Title}
                                </label>
                              </div>
                              <div
                                className={`mt-[10px] ${
                                  docInfo.Status === 1 ||
                                  docInfo.Status === 3 ||
                                  docInfo.Status === 5 ||
                                  docInfo.Status === 7
                                    ? "text-amber-500"
                                    : docInfo.Status === 2 ||
                                      docInfo.Status === 4 ||
                                      docInfo.Status === 6
                                    ? "text-[red]"
                                    : docInfo.Status === 9
                                    ? "text-[#48AF23]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {docInfo.Status === 1
                                    ? "อาจารย์ได้รับเอกสารคำร้อง"
                                    : docInfo.Status === 2
                                    ? "อาจารย์ปฏิเสธคำร้อง"
                                    : docInfo.Status === 3
                                    ? "เจ้าหน้าที่ได้รับเอกสารคำร้อง"
                                    : docInfo.Status === 4
                                    ? "เจ้าหน้าที่ปฏิเสธคำร้อง"
                                    : docInfo.Status === 5
                                    ? "คณบดีได้รับเอกสารคำร้อง"
                                    : docInfo.Status === 6
                                    ? "คณบดีปฏิเสธคำร้อง"
                                    : docInfo.Status === 7
                                    ? "เจ้าหน้าที่กำลังจัดการคำร้อง"
                                    : docInfo.Status === 9
                                    ? "เจ้าหน้าที่จัดการคำร้องเสร็จสิ้น"
                                    : undefined}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : undefined}
                      {docInfo.Status === 9 && status === "จัดการคำร้อง" ? (
                        <div>
                          <label class="text-2xl font-semibold m-[7%]">
                            สถานะคำร้อง
                          </label>
                          <div className="flex justify-center ">
                            <div className="bg-gray-100 rounded-2xl w-[70%]  my-[3%] p-[30px] text-xl font-semibold ">
                              <div>
                                คำร้อง:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Title}
                                </label>
                              </div>
                              <div
                                className={`mt-[10px] ${
                                  docInfo.Status === 1 ||
                                  docInfo.Status === 3 ||
                                  docInfo.Status === 5 ||
                                  docInfo.Status === 7
                                    ? "text-amber-500"
                                    : docInfo.Status === 2 ||
                                      docInfo.Status === 4 ||
                                      docInfo.Status === 6
                                    ? "text-[red]"
                                    : docInfo.Status === 9
                                    ? "text-[#48AF23]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {docInfo.Status === 1
                                    ? "อาจารย์ได้รับเอกสารคำร้อง"
                                    : docInfo.Status === 2
                                    ? "อาจารย์ปฏิเสธคำร้อง"
                                    : docInfo.Status === 3
                                    ? "เจ้าหน้าที่ได้รับเอกสารคำร้อง"
                                    : docInfo.Status === 4
                                    ? "เจ้าหน้าที่ปฏิเสธคำร้อง"
                                    : docInfo.Status === 5
                                    ? "คณบดีได้รับเอกสารคำร้อง"
                                    : docInfo.Status === 6
                                    ? "คณบดีปฏิเสธคำร้อง"
                                    : docInfo.Status === 7
                                    ? "เจ้าหน้าที่กำลังจัดการคำร้อง"
                                    : docInfo.Status === 9
                                    ? "เจ้าหน้าที่จัดการคำร้องเสร็จสิ้น"
                                    : undefined}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : undefined}
                      {docInfo.Status === 3 && (
                        <div className="">
                          <div className="ml-[6%]">
                            <label className="text-2xl font-bold ">
                              ความเห็นเจ้าหน้าที่
                            </label>
                          </div>
                          <div className="">
                            <div className="grid grid-cols-12 mt-[5vh] font-semibold justify-items-center">
                              <div className="col-span-3 ml-[18vh] ">
                                <label>ความเห็น</label>
                              </div>
                              <div className="col-span-6 flex text-lg">
                                <div className="ml-[50px]">
                                  <input
                                    className="mr-[10px]"
                                    type="checkbox"
                                    checked={docStatus === 5}
                                    onChange={() =>
                                      setDocStatus(5) & setDocStatus2(0)
                                    }
                                  />
                                  <label>เอกสารถูกต้อง</label>
                                </div>
                                <div>
                                  <input
                                    className="mr-[10px] ml-[50px]"
                                    type="checkbox"
                                    checked={docStatus === 4}
                                    onChange={() =>
                                      setDocStatus(4) & setDocStatus2(1)
                                    }
                                  />
                                  <label>เอกสารไม่ถูกต้อง</label>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 mt-[5vh] font-semibold ">
                              <div className="col-span-3 justify-self-center ml-[18vh] ">
                                <label>หมายเหตุ</label>
                              </div>
                              <div className="col-span-9 flex text-lg ml-[20vh]">
                                <textarea
                                  className="border-2 rounded-lg border-black-500 p-[10px] mb-[30px] w-[75vh] h-[150px] "
                                  placeholder=""
                                  type="text"
                                  onChange={noteChange2}
                                  value={note2}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {docInfo.Status === 7 && status === "จัดการคำร้อง" ? (
                        <div className="mb-[1vh]">
                          <div className="ml-[6%]">
                            <label className="text-2xl font-bold ">
                              จัดการคำร้อง
                            </label>
                          </div>
                          <div className="mb-[10vh]">
                            <div className="grid grid-cols-12 mt-[5vh] font-semibold justify-items-center">
                              <div className="col-span-3 ml-[18vh] ">
                                <label>จัดการคำร้อง</label>
                              </div>
                              <div className="col-span-6 flex text-lg">
                                <div className="mr-[15vh]">
                                  <input
                                    className="mr-[10px]"
                                    type="checkbox"
                                    checked={docStatus === 9}
                                    onChange={() =>
                                      moment().format("Do MMM YYYY, LT")  & updateDocStatus5() &
                                      setDocStatus(9) & setDocStatus2(0)
                                    }
                                  />
                                  <label>เสร็จสิ้น</label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex">
                            <button
                              className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[23vh] hover:bg-red-400"
                              onClick={() =>
                                setDocInfo({}) & fetchDocumentStaff()
                              }
                            >
                              ย้อนกลับ
                            </button>
                            <div className="absolute right-[23vh]">
                              <button
                                className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] justify-self-end hover:bg-sky-300"
                                onClick={() =>
                                  setId(docInfo.DocID) &
                                  updateStatus() &
                                  fetchDocumentStaff()
                                }
                              >
                                ยืนยัน
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : undefined}

                      {docInfo.Status === 9 && status === "จัดการคำร้อง" ? (
                        <div className="flex ">
                          <button
                            className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[23vh] hover:bg-red-400"
                            onClick={() => setDocInfo({}) & fetchDocument()}
                          >
                            ย้อนกลับ
                          </button>
                          <div className="absolute right-[23vh]">
                            {docInfo.Status2 === 0 ? (
                              <button
                                className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] justify-self-end hover:bg-green-400"
                                onClick={() => setState(3)}
                              >
                                ดูใบคำร้อง
                              </button>
                            ) : undefined}
                            <button
                              className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-2vh justify-self-end hover:bg-sky-300 "
                              onClick={() =>
                                setState(2) & setCurrentStep(docInfo.Status)
                              }
                            >
                              สถานะเอกสาร
                            </button>
                          </div>
                        </div>
                      ) : undefined}

                      {status !== "จัดการคำร้อง" && (
                        <div className="flex">
                          <button
                            className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[23vh] hover:bg-red-400"
                            onClick={() =>
                              setDocInfo({}) &
                              fetchDocumentStaff() &
                              setNote2("")
                            }
                          >
                            ย้อนกลับ
                          </button>
                          <div className="absolute right-[23vh]">
                            {docInfo.Status2 === 0 && docInfo.Status > 3 ? (
                              <button
                                className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] justify-self-end hover:bg-green-400"
                                onClick={() => setState(3)& fetchDocumentStaff()}
                              >
                                ดูใบคำร้อง
                              </button>
                            ) : undefined}
                          {docInfo.Status === 3 && (
                            <button
                            className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-2vh justify-self-end hover:bg-green-400 "
                            onClick={() =>
                              setState(4) & setCurrentStep(docInfo.Status) & fetchDocumentStaff()
                            }
                          >
                            สถานะเอกสาร
                          </button>
                          )}
                            <button
                              className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] justify-self-end hover:bg-sky-300"
                              onClick={() =>
                                setState(2) &
                                setId(docInfo.DocID) & fetchDocumentStaff() &
                                setCurrentStep(docInfo.Status)
                              }
                            >
                              {docInfo.Status === 3 ? "ถัดไป" : "สถานะเอกสาร"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )) ||
                  (state === 2 && (
                    <div>
                      {docInfo.Status === 3 ? (
                        <div>
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
                                      {docInfo.Title}
                                    </div>
                                    <div className="col-span-6">
                                      <label className="border-2 p-[5px] border-[#000] px-[10px] text-sm">
                                        ระดับปริญญาตรี
                                      </label>
                                    </div>
                                  </div>
                                  <div className="my-[10px] text-sm ">
                                    <label className="">
                                      คณะเทคโนโลยีสารสนเทศ
                                    </label>
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
                                <label>วันที่ {docInfo.Date}</label>
                              </div>
                              <div className="my-[2vh] text-sm">
                                <label className="font-semibold">
                                  เรื่อง&nbsp;&nbsp;&nbsp;
                                </label>
                                <label>
                                  {docInfo.Title}{" "}
                                  {(docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม") |
                                  (docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                                  (docInfo.Title ===
                                    "ขอความอนุเคราะห์เปิดวิชาเรียน")
                                    ? `วิชา ${docInfo.SubjectName}`
                                    : undefined}
                                </label>
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
                                  {docInfo.Sender} รหัสนักศึกษา{" "}
                                  {docInfo.StudentID} ชั้นปีที่{" "}
                                  {docInfo.ClassYear} สาขาวิชา {docInfo.Major}{" "}
                                  แขนงวิชา {docInfo.Field}
                                </label>
                              </div>
                              <div className="text-sm my-[2vh]">
                                <label className="">
                                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;มีความประสงค์
                                  {docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม"
                                    ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                    : undefined}
                                  {docInfo.Title === "ขอย้ายกลุ่มการเรียน"
                                    ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากกลุ่ม ${docInfo.Sec1} ไปยัง ${docInfo.Sec2}`
                                    : undefined}
                                  {docInfo.Title === "ขอย้ายแขนงวิชา"
                                    ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากแขนง ${docInfo.Sec1} ขอย้ายไปยัง ${docInfo.Sec2}`
                                    : undefined}
                                  {docInfo.Title ===
                                  "ขอความอนุเคราะห์เปิดวิชาเรียน"
                                    ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                    : undefined}
                                  {docInfo.Title === "ขอชำระเงินล่าช้า"
                                    ? `ขออนุมัติชำระค่าธรรมเนียมการศึกษาล่าช้าเป็นกรณีพิเศษ`
                                    : undefined}
                                  &emsp;
                                  {docInfo.Title !== "คำร้องทั่วไป"
                                    ? `เนื่องจาก`
                                    : undefined}
                                  {docInfo.Descrip}{" "}
                                  {docInfo.Title === "ขอชำระเงินล่าช้า"
                                    ? `และพร้อมชำระค่าธรรมเนียมการศึกษาภายในวันที่ ${docInfo.PayIn}`
                                    : undefined}
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
                                    <label>{docInfo.Sender}</label>
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
                                    <div className=" p-[10px] break-all">
                                      <label>อนุมัติ</label>
                                      <p className="pt-[10px]" >
                                      {docInfo.TeacherName}
                                    </p>
                                    <p className="pt-[10px]" >
                                    {note1 !== "" ? `หมายเหตุ: ${note1}` : undefined}
                                    {docInfo.Note1 !== "" ? `หมายเหตุ: ${docInfo.Note1}` : undefined}
                                    
                                    </p>
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
                                    <div className="p-[10px] break-all">
                                      <label>
                                      {docStatus >= 5 && docStatus2 === 0
                                        ? "อนุมัติ"
                                        : docStatus === 4
                                        ? "ไม่อนุมัติ"
                                        : undefined}
                                      </label>
                                      {docInfo.Status > 3 | docStatus > 3 ?(
                                    <p className="pt-[10px]" >
                                      กมนนัทธ์ ชื้นสกุล
                                    </p>
                                    ):undefined
                                    }
                                    <p className="pt-[10px]" >
                                    {note2 !== "" ? `หมายเหตุ: ${note2}` : undefined}
                                    {docInfo.Note2 !== "" ? `หมายเหตุ: ${docInfo.Note2}` : undefined}
                                    
                                    </p>
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
                                    <label className="font-semibold">
                                      คำสั่ง
                                    </label>
                                  </div>
                                  <div className="h-[100px]">
                                    <div className="h-[50px] p-[10px] break-all"></div>
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
                                    <label>{docInfo.Sender}</label>
                                  </div>
                                  <div className="m-[5px]">
                                    <label>วันที่ {docInfo.Date}</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="grid my-[2vh] ">
                            <div className="flex ">
                              <div className="ml-[6%] mr-[88vh]">
                                <button
                                  className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px]"
                                  onClick={() => setState(1) & fetchDocumentStaff()}
                                >
                                  แก้ไข
                                </button>
                              </div>
                              <ReactPrint
                                trigger={() => (
                                  <button className="cursor-pointer font-medium p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ">
                                    ดาวน์โหลด                                  </button>
                                )}
                                content={() => ref.current}
                              />

                              <button
                                className="cursor-pointer font-medium p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[10px]"
                                onClick={() =>
                                  moment().format("Do MMM YYYY, LT")& updateNote2()  & updateDocStatus3() &
                                  updateStatus() & fetchDocumentStaff()
                                }
                              >
                                ยืนยัน
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                      <div className="w-[70%] ml-[20vh]">
                        {/* หัวข้อสถานะเอกสาร */}
                        <div
                          className={`w-[650px] rounded-3xl p-[10px] ml-[11%] text-center absolute left-[61vh] top-[25vh]  ${
                            docInfo.Status2 === 1
                              ? "bg-[#EE1D52]"
                              : docInfo.Status === 9
                              ? "bg-[#48AF23]"
                              : "bg-[#FFAF10]"
                          }`}
                        >
                          <label className="text-[#fff] font-semibold">
                            {docInfo.Status2 === 1
                              ? "คำร้องถูกปฏิเสธ"
                              : docInfo.Status === 9
                              ? "จัดการคำร้องเสร็จสิ้น"
                              : docInfo.Status < 9 && docInfo.Status2 === 0
                              ? "กำลังดำเนินการ"
                              : undefined}
                          </label>
                        </div>
                        {/* จบหัวข้อสถานะเอกสาร */}
                        <div className="flex">
                          {/* Process bar เอกสารแต่ละสถานะ */}
                          <div className="mt-[50px]">
                            {docInfo.Status2 === 0 && docInfo.Status < 9 ? (
                              <div>
                                {steps?.map((step, i) => (
                                  <div
                                    key={i}
                                    className={`step-items ${
                                      currentStep === i + 1 && "actives"
                                    } ${
                                      (i + 1 < currentStep || complete) &&
                                      "completes"
                                    } `}
                                  >
                                    <div className="steps">
                                      {i + 1 < currentStep || complete ? (
                                        <TiTick size={24} />
                                      ) : undefined}
                                    </div>
                                    <p className="text-gray-500">{step}</p>
                                  </div>
                                ))}
                              </div>
                            ) : undefined}
                            {/*  */}
                            {docInfo.Status2 === 1 ? (
                              <div>
                                {steps?.map((step, i) => (
                                  <div
                                    key={i}
                                    className={`step-items2 ${
                                      currentStep === i + 1 && "actives2"
                                    } ${
                                      (i + 1 < currentStep || complete) &&
                                      "completes2"
                                    } `}
                                  >
                                    <div className="steps2">
                                      {i + 1 < currentStep || complete ? (
                                        <TiTick size={24} />
                                      ) : undefined}
                                    </div>
                                    <p className="text-gray-500">{step}</p>
                                  </div>
                                ))}
                              </div>
                            ) : undefined}
                            {docInfo.Status === 9 ? (
                              <div>
                                {steps?.map((step, i) => (
                                  <div
                                    key={i}
                                    className={`step-items3 ${
                                      currentStep === i + 1 && "actives3"
                                    } ${
                                      (i + 1 < currentStep || complete) &&
                                      "completes3"
                                    } `}
                                  >
                                    <div className="steps3">
                                      {i + 1 < currentStep || complete ? (
                                        <TiTick size={24} />
                                      ) : undefined}
                                    </div>
                                    <p className="text-gray-500">{step}</p>
                                  </div>
                                ))}
                              </div>
                            ) : undefined}
                          </div>
                          {/* จบ Process bar เอกสารแต่ละสถานะ */}

                          {/* สถานะเอกสาร */}
                          <div className="">
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[255px]">
                              <label className="font-semibold">
                                อาจารย์ได้รับเอกสารคำร้อง
                              </label>
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc1}
                                </label>
                              </div>
                            </div>
                            <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[355px]">
                              <div className="flex justify-between">
                                <label className="font-semibold">
                                  {docInfo.Status === 2 && docInfo.Status2 === 1
                                    ? "อาจารย์ปฏิเสธคำร้อง"
                                    : "อาจารย์อนุมัติคำร้อง"}
                                </label>
                                <div className="text-right">
                                  <label>{docInfo.StatusDoc2}</label>
                                </div>
                              </div>
                              {docInfo.Status === 2 && docInfo.Status2 === 1 ? (
                                <label>หมายเหตุ : {docInfo.Note1}</label>
                              ) : undefined}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[455px]">
                              <label className="font-semibold">
                                เจ้าหน้าที่ได้รับเอกสารคำร้อง
                              </label>
                              {docInfo.Status > 2 && (
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc2}
                                </label>
                              </div>
                              )}
                            </div>
                            <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[555px]">
                              <div className="flex justify-between">
                                <label className="font-semibold">
                                  {docInfo.Status === 4 && docInfo.Status2 === 1
                                    ? "เจ้าหน้าที่ปฏิเสธคำร้อง"
                                    : "เอกสารคำร้องได้รับการตรวจสอบโดยเจ้าหน้าที่"}
                                </label>
                                <div className="text-right">
                                  <label>{docInfo.StatusDoc3}</label>
                                </div>
                              </div>
                              {docInfo.Status === 4 && docInfo.Status2 === 1 ? (
                                <label>หมายเหตุ : {docInfo.Note2}</label>
                              ) : undefined}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[655px]">
                              <label className="font-semibold">
                                คณบดีได้รับเอกสารคำร้อง
                              </label>
                              {docInfo.Status > 4 && (
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc3}
                                </label>
                              </div>
                              )}
                            </div>
                            <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[755px]">
                            <div className="flex justify-between">
                              <label className="font-semibold">
                                {docInfo.Status === 6 && docInfo.Status2 === 1
                                  ? "คณบดีปฏิเสธคำร้อง"
                                  : "คณบดีอนุมัติคำร้อง"}
                              </label>
                              <div className="text-right">
                                  <label>{docInfo.StatusDoc4}</label>
                                </div>
                                </div>
                              {docInfo.Status === 6 && docInfo.Status2 === 1 ? (
                                <label>หมายเหตุ : {docInfo.Note3}</label>
                              ) : undefined}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[855px]">
                              <label className="font-semibold">
                                เจ้าหน้าที่กำลังจัดการคำร้อง
                              </label>
                              {docInfo.Status > 6 && (
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc4}
                                </label>
                              </div>
                              )}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[955px]">
                              <label className="font-semibold">
                                เจ้าหน้าที่จัดการคำร้องเสร็จสิ้น
                              </label>
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc5}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* จบสถานะเอกสาร */}
                        </div>
                      </div>
                      <button
                        className="mt-[5vh] cursor-pointer font-medium w-[650px] rounded-3xl p-[10px] ml-[21%] text-center bg-[#EE1D52] text-[#fff] font-semibold  hover:bg-red-400"
                        onClick={() => setState(1)& fetchDocumentStaff()}
                      >
                        ย้อนกลับ
                      </button>
                    </div>
                      )}
                    </div>
                  )) ||
                  (state == 3 && (
                    <div>
                      <div>
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
                                    {docInfo.Title}
                                  </div>
                                  <div className="col-span-6">
                                    <label className="border-2 p-[5px] border-[#000] px-[10px] text-sm">
                                      ระดับปริญญาตรี
                                    </label>
                                  </div>
                                </div>
                                <div className="my-[10px] text-sm ">
                                  <label className="">
                                    คณะเทคโนโลยีสารสนเทศ
                                  </label>
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
                              <label>วันที่ {docInfo.Date}</label>
                            </div>
                            <div className="my-[2vh] text-sm">
                              <label className="font-semibold">
                                เรื่อง&nbsp;&nbsp;&nbsp;
                              </label>
                              <label>
                                {docInfo.Title}{" "}
                                {(docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม") |
                                (docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                                (docInfo.Title ===
                                  "ขอความอนุเคราะห์เปิดวิชาเรียน")
                                  ? `วิชา ${docInfo.SubjectName}`
                                  : undefined}
                              </label>
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
                                {docInfo.Sender} รหัสนักศึกษา{" "}
                                {docInfo.StudentID} ชั้นปีที่{" "}
                                {docInfo.ClassYear} สาขาวิชา {docInfo.Major}{" "}
                                แขนงวิชา {docInfo.Field}
                              </label>
                            </div>
                            <div className="text-sm my-[2vh]">
                              <label className="">
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;มีความประสงค์
                                {docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                  : undefined}
                                {docInfo.Title === "ขอย้ายกลุ่มการเรียน"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากกลุ่ม ${docInfo.Sec1} ไปยัง ${docInfo.Sec2}`
                                  : undefined}
                                {docInfo.Title === "ขอย้ายแขนงวิชา"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากแขนง ${docInfo.Sec1} ขอย้ายไปยัง ${docInfo.Sec2}`
                                  : undefined}
                                {docInfo.Title ===
                                "ขอความอนุเคราะห์เปิดวิชาเรียน"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                  : undefined}
                                {docInfo.Title === "ขอชำระเงินล่าช้า"
                                  ? `ขออนุมัติชำระค่าธรรมเนียมการศึกษาล่าช้าเป็นกรณีพิเศษ`
                                  : undefined}
                                &emsp;
                                {docInfo.Title !== "คำร้องทั่วไป"
                                  ? `เนื่องจาก`
                                  : undefined}
                                {docInfo.Descrip}{" "}
                                {docInfo.Title === "ขอชำระเงินล่าช้า"
                                  ? `และพร้อมชำระค่าธรรมเนียมการศึกษาภายในวันที่ ${docInfo.PayIn}`
                                  : undefined}
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
                                  <label>{docInfo.Sender}</label>
                                </div>
                                <div className="m-[5px]">
                                  <label>ผู้ยื่นคำร้อง</label>
                                </div>
                              </div>
                            </div>

                            <div className="h-[150px] grid grid-cols-12 border-2 border-[#000] text-center my-[2vh] text-sm">
                              <div className="col-span-5 border-r-2 border-[#000]">
                                <div className="border-b-2 p-[5px] border-[#000]">
                                  <label className="font-semibold">
                                    ความเห็นอาจารย์ที่ปรึกษา/อาจารย์ผู้สอน
                                  </label>
                                </div>
                                <div className="h-[100px]">
                                  <div className="p-[10px] break-all">
                                    <label>
                                      {docInfo.Status >= 3
                                        ? "อนุมัติ"
                                        : undefined}
                                    </label>
                                    <p className="pt-[10px]" >
                                      {docInfo.TeacherName}
                                    </p>
                                    <p className="pt-[10px]" >
                                    {note1 !== "" ? `หมายเหตุ: ${note1}` : undefined}
                                    {docInfo.Note1 !== "" ? `หมายเหตุ: ${docInfo.Note1}` : undefined}
                                    
                                    </p>
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
                                    <label>
                                      {docInfo.Status >= 5
                                        ? "อนุมัติ"
                                        : undefined}
                                    </label>
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
                                  <label className="font-semibold">
                                    คำสั่ง
                                  </label>
                                </div>
                                <div className="h-[100px]">
                                  <div className="p-[10px] break-all">
                                    <label>
                                      {docInfo.Status >= 7
                                        ? "อนุมัติ"
                                        : undefined}
                                    </label>
                                    {docInfo.Status > 5 | docStatus > 5 ?(
                                    <p className="pt-[10px]" >
                                      ศิริเดช บุญแสง
                                    </p>
                                    ):undefined
                                    }
                                    <p className="pt-[10px]" >
                                    {note3 !== "" ? `หมายเหตุ: ${note3}` : undefined}
                                    {docInfo.Note3 !== "" ? `หมายเหตุ: ${docInfo.Note3}` : undefined}
                                    
                                    </p>
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
                                  <label>{docInfo.Sender}</label>
                                </div>
                                <div className="m-[5px]">
                                  <label>วันที่ {docInfo.Date}</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid my-[2vh] ">
                          <div className="flex">
                            <div className="ml-[6%] mr-[100vh]">
                              <button
                                className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] hover:bg-red-400"
                                onClick={() => setState(1)& fetchDocumentStaff()}
                              >
                                ย้อนกลับ
                              </button>
                            </div>
                            <ReactPrint
                              trigger={() => (
                                <button className="cursor-pointer font-medium p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%] hover:bg-sky-300">
                                  ดาวน์โหลด
                                </button>
                              )}
                              content={() => ref.current}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )) || (state === 4 && (
                    <div>
                    <div className="w-[70%] ml-[20vh]">
                      {/* หัวข้อสถานะเอกสาร */}
                      <div
                        className={`w-[650px] rounded-3xl p-[10px] ml-[11%] text-center absolute left-[61vh] top-[25vh]  ${
                          docInfo.Status2 === 1
                            ? "bg-[#EE1D52]"
                            : docInfo.Status === 9
                            ? "bg-[#48AF23]"
                            : "bg-[#FFAF10]"
                        }`}
                      >
                        <label className="text-[#fff] font-semibold">
                          {docInfo.Status2 === 1
                            ? "คำร้องถูกปฏิเสธ"
                            : docInfo.Status === 9
                            ? "จัดการคำร้องเสร็จสิ้น"
                            : docInfo.Status < 9 && docInfo.Status2 === 0
                            ? "กำลังดำเนินการ"
                            : undefined}
                        </label>
                      </div>
                      {/* จบหัวข้อสถานะเอกสาร */}
                      <div className="flex">
                        {/* Process bar เอกสารแต่ละสถานะ */}
                        <div className="mt-[50px]">
                          {docInfo.Status2 === 0 && docInfo.Status < 9 ? (
                            <div>
                              {steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className={`step-items ${
                                    currentStep === i + 1 && "actives"
                                  } ${
                                    (i + 1 < currentStep || complete) &&
                                    "completes"
                                  } `}
                                >
                                  <div className="steps">
                                    {i + 1 < currentStep || complete ? (
                                      <TiTick size={24} />
                                    ) : undefined}
                                  </div>
                                  <p className="text-gray-500">{step}</p>
                                </div>
                              ))}
                            </div>
                          ) : undefined}
                          {/*  */}
                          {docInfo.Status2 === 1 ? (
                            <div>
                              {steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className={`step-items2 ${
                                    currentStep === i + 1 && "actives2"
                                  } ${
                                    (i + 1 < currentStep || complete) &&
                                    "completes2"
                                  } `}
                                >
                                  <div className="steps2">
                                    {i + 1 < currentStep || complete ? (
                                      <TiTick size={24} />
                                    ) : undefined}
                                  </div>
                                  <p className="text-gray-500">{step}</p>
                                </div>
                              ))}
                            </div>
                          ) : undefined}
                          {docInfo.Status === 9 ? (
                            <div>
                              {steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className={`step-items3 ${
                                    currentStep === i + 1 && "actives3"
                                  } ${
                                    (i + 1 < currentStep || complete) &&
                                    "completes3"
                                  } `}
                                >
                                  <div className="steps3">
                                    {i + 1 < currentStep || complete ? (
                                      <TiTick size={24} />
                                    ) : undefined}
                                  </div>
                                  <p className="text-gray-500">{step}</p>
                                </div>
                              ))}
                            </div>
                          ) : undefined}
                        </div>
                        {/* จบ Process bar เอกสารแต่ละสถานะ */}

                        {/* สถานะเอกสาร */}
                        <div className="">
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[255px]">
                            <label className="font-semibold">
                              อาจารย์ได้รับเอกสารคำร้อง
                            </label>
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc1}
                              </label>
                            </div>
                          </div>
                          <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[355px]">
                            <div className="flex justify-between">
                              <label className="font-semibold">
                                {docInfo.Status === 2 && docInfo.Status2 === 1
                                  ? "อาจารย์ปฏิเสธคำร้อง"
                                  : "อาจารย์อนุมัติคำร้อง"}
                              </label>
                              <div className="text-right">
                                <label>{docInfo.StatusDoc2}</label>
                              </div>
                            </div>
                            {docInfo.Status === 2 && docInfo.Status2 === 1 ? (
                              <label>หมายเหตุ : {docInfo.Note}</label>
                            ) : undefined}
                          </div>
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[455px]">
                            <label className="font-semibold">
                              เจ้าหน้าที่ได้รับเอกสารคำร้อง
                            </label>
                            {docInfo.Status > 2 && (
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc2}
                              </label>
                            </div>
                            )}
                          </div>
                          <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[555px]">
                            <div className="flex justify-between">
                              <label className="font-semibold">
                                {docInfo.Status === 4 && docInfo.Status2 === 1
                                  ? "เจ้าหน้าที่ปฏิเสธคำร้อง"
                                  : "เอกสารคำร้องได้รับการตรวจสอบโดยเจ้าหน้าที่"}
                              </label>
                              <div className="text-right">
                                <label>{docInfo.StatusDoc3}</label>
                              </div>
                            </div>
                            {docInfo.Status === 4 && docInfo.Status2 === 1 ? (
                              <label>หมายเหตุ : {docInfo.Note}</label>
                            ) : undefined}
                          </div>
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[655px]">
                            <label className="font-semibold">
                              คณบดีได้รับเอกสารคำร้อง
                            </label>
                            {docInfo.Status > 4 && (
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc3}
                              </label>
                            </div>
                            )}
                          </div>
                          <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[755px]">
                          <div className="flex justify-between">
                            <label className="font-semibold">
                              {docInfo.Status === 6 && docInfo.Status2 === 1
                                ? "คณบดีปฏิเสธคำร้อง"
                                : "คณบดีอนุมัติคำร้อง"}
                            </label>
                            <div className="text-right">
                                <label>{docInfo.StatusDoc4}</label>
                              </div>
                              </div>
                            {docInfo.Status === 6 && docInfo.Status2 === 1 ? (
                              <label>หมายเหตุ : {docInfo.Note}</label>
                            ) : undefined}
                          </div>
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[855px]">
                            <label className="font-semibold">
                              เจ้าหน้าที่กำลังจัดการคำร้อง
                            </label>
                            {docInfo.Status > 6 && (
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc4}
                              </label>
                            </div>
                            )}
                          </div>
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[955px]">
                            <label className="font-semibold">
                              เจ้าหน้าที่จัดการคำร้องเสร็จสิ้น
                            </label>
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc5}
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* จบสถานะเอกสาร */}
                      </div>
                    </div>
                    <button
                      className="mt-[5vh] cursor-pointer font-medium w-[650px] rounded-3xl p-[10px] ml-[21%] text-center bg-[#EE1D52] text-[#fff] font-semibold  hover:bg-red-400"
                      onClick={() => setState(1)& fetchDocumentStaff()}
                    >
                      ย้อนกลับ
                    </button>
                  </div>
                  ))
                : docStaff.map((element, index) => {
                    console.log("data", element);
                    return (
                      <>
                        {status === "ไม่อนุมัติ" &&
                        element.Status === 4 &&
                        element.Status2 === 1 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl text-[#fff] mr-[200px] w-[150px] ${
                                  element.Status2 === 1 && element.Status === 4
                                    ? "bg-[#FE3745]"
                                    : element.Status >= 5
                                    ? "bg-[#48AF23]"
                                    : element.Status === 3
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {element.Status2 === 1 && element.Status === 4
                                    ? "ไม่อนุมัติ"
                                    : element.Status >= 5
                                    ? "อนุมัติ"
                                    : element.Status === 3
                                    ? "รอดำเนินการ"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : status === "อนุมัติ" && element.Status >= 5 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl text-[#fff] mr-[200px] w-[150px] ${
                                  element.Status2 === 1 && element.Status === 4
                                    ? "bg-[#FE3745]"
                                    : element.Status >= 5
                                    ? "bg-[#48AF23]"
                                    : element.Status === 3
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {element.Status2 === 1 && element.Status === 4
                                    ? "ไม่อนุมัติ"
                                    : element.Status >= 5
                                    ? "อนุมัติ"
                                    : element.Status === 3
                                    ? "รอดำเนินการ"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : status === "กำลังดำเนินการ" &&
                          element.Status === 3 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl text-[#fff] mr-[200px] w-[150px] ${
                                  element.Status2 === 1 && element.Status === 4
                                    ? "bg-[#FE3745]"
                                    : element.Status >= 5
                                    ? "bg-[#48AF23]"
                                    : element.Status === 3
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {element.Status2 === 1 && element.Status === 4
                                    ? "ไม่อนุมัติ"
                                    : element.Status >= 5
                                    ? "อนุมัติ"
                                    : element.Status === 3
                                    ? "รอดำเนินการ"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : status === "ทั้งหมด" ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl text-[#fff] mr-[200px] w-[150px] ${
                                  element.Status2 === 1 && element.Status === 4
                                    ? "bg-[#FE3745]"
                                    : element.Status >= 5
                                    ? "bg-[#48AF23]"
                                    : element.Status === 3
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {element.Status2 === 1 && element.Status === 4
                                    ? "ไม่อนุมัติ"
                                    : element.Status >= 5
                                    ? "อนุมัติ"
                                    : element.Status === 3
                                    ? "รอดำเนินการ"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : status === "จัดการคำร้อง" &&
                          status2 === "ทั้งหมด" &&
                          element.Status >= 7 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>

                            <div className="flex">
                              <div className="self-center px-[10px] py-[5px] text-center rounded-3xl bg-[#48AF23] text-[#fff] mr-[10px] w-[150px]">
                                <label className="">อนุมัติ</label>
                              </div>
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl mr-[40px] text-[#fff] w-[150px] ${
                                  element.Status === 9
                                    ? "bg-[#48AF23]"
                                    : element.Status === 7
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                } `}
                              >
                                <label className="">
                                  {element.Status === 7
                                    ? "รอดำเนินการ"
                                    : element.Status === 9
                                    ? "เสร็จสิ้น"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : status === "จัดการคำร้อง" &&
                          status2 === "ทั้งหมด" &&
                          element.Status >= 7 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>

                            <div className="flex">
                              <div className="self-center px-[10px] py-[5px] text-center rounded-3xl bg-[#48AF23] text-[#fff] mr-[10px] w-[150px]">
                                <label className="">อนุมัติ</label>
                              </div>
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl mr-[40px] text-[#fff] w-[150px] ${
                                  element.Status === 9
                                    ? "bg-[#48AF23]"
                                    : element.Status === 7
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                } `}
                              >
                                <label className="">
                                  {element.Status === 7
                                    ? "รอดำเนินการ"
                                    : element.Status === 9
                                    ? "เสร็จสิ้น"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : status === "จัดการคำร้อง" &&
                          status2 === "รอดำเนินการ" &&
                          element.Status === 7 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>

                            <div className="flex">
                              <div className="self-center px-[10px] py-[5px] text-center rounded-3xl bg-[#48AF23] text-[#fff] mr-[10px] w-[150px]">
                                <label className="">อนุมัติ</label>
                              </div>
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl mr-[40px] text-[#fff] w-[150px] ${
                                  element.Status === 9
                                    ? "bg-[#48AF23]"
                                    : element.Status === 7
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                } `}
                              >
                                <label className="">
                                  {element.Status === 7
                                    ? "รอดำเนินการ"
                                    : element.Status === 9
                                    ? "เสร็จสิ้น"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : status === "จัดการคำร้อง" &&
                          status2 === "เสร็จสิ้น" &&
                          element.Status === 9 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>

                            <div className="flex">
                              <div className="self-center px-[10px] py-[5px] text-center rounded-3xl bg-[#48AF23] text-[#fff] mr-[10px] w-[150px]">
                                <label className="">อนุมัติ</label>
                              </div>
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl mr-[40px] text-[#fff] w-[150px] ${
                                  element.Status === 9
                                    ? "bg-[#48AF23]"
                                    : element.Status === 7
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                } `}
                              >
                                <label className="">
                                  {element.Status === 7
                                    ? "รอดำเนินการ"
                                    : element.Status === 9
                                    ? "เสร็จสิ้น"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : undefined}
                      </>
                    );
                  })}
            </>
          )}

          {/* ----------------------------------------------------จบเจ้าหน้าที่-----------------------------------------------------------------------------*/}

          {RoleID === 4 && (
            <>
              {Object.keys(docInfo).length !== 0
                ? (state === 1 && (
                    <div>
                      <div className="flex justify-center">
                        <div className="bg-gray-100 rounded-2xl w-[70%] my-[3%] p-[30px] text-xl font-semibold ">
                          <div className="grid grid-cols-12 my-[20px]">
                            <div className="col-span-6 ">
                              <p className="">
                                ชื่อ-นามสกุล&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Sender}
                                </label>
                              </p>
                            </div>
                            <div className="col-span-6  ">
                              รหัสนักศึกษา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.StudentID}
                              </label>
                            </div>
                          </div>
                          <div>
                            <label>
                              ชั้นปี&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.ClassYear}
                              </label>
                            </label>
                          </div>
                          <div className="grid grid-cols-12 my-[20px]">
                            <div className="col-span-6 ">
                              สาขาวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Major}
                              </label>
                            </div>
                            <div className="col-span-6  ">
                              แขนงวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Field}
                              </label>
                            </div>
                          </div>
                          <div className="my-[20px]">
                            <label>
                              วันที่&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Date}
                              </label>{" "}
                            </label>
                          </div>
                          <div className="col-span-6 ">
                            หัวข้อเรื่อง&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                            <label className="font-medium">
                              {docInfo.Title}
                            </label>
                          </div>

                          {(docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม") |
                          (docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                          (docInfo.Title ===
                            "ขอความอนุเคราะห์เปิดวิชาเรียน") ? (
                            <div>
                              <div className="grid grid-cols-12 my-[20px]">
                                <div className="col-span-6 ">
                                  รหัสวิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                  <label className="font-medium">
                                    {docInfo.SubjectID}
                                  </label>
                                </div>

                                <div className="col-span-6  ">
                                  <label className="">
                                    วิชา&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                    <label className="font-medium">
                                      {docInfo.SubjectName}
                                    </label>
                                  </label>
                                </div>
                              </div>
                            </div>
                          ) : undefined}
                          {docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม" && (
                            <div className="grid grid-cols-12 my-[20px]">
                              <div className="col-span-6 ">
                                กลุ่มการเรียน&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Sec1}
                                </label>
                              </div>
                            </div>
                          )}
                          {(docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                          (docInfo.Title === "ขอย้ายแขนงวิชา") ? (
                            <div className="my-[20px]">
                              <label>
                                ย้ายจาก&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Sec1}
                                  &nbsp;&nbsp;
                                  {docInfo.Title === "ขอย้ายแขนงวิชา"
                                    ? "ไปยังแขนงวิชา"
                                    : "ไปยัง"}
                                  &nbsp;&nbsp;{docInfo.Sec2}
                                </label>
                              </label>
                            </div>
                          ) : undefined}
                          <div className="my-[20px]">
                            <label>
                              อาจารย์&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.TeacherName}
                              </label>
                            </label>
                          </div>
                          {docInfo.Title === "ขอชำระเงินล่าช้า" ? (
                            <div className="my-[20px]">
                              <label>
                                ชำระภายในวันที่&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.PayIn}
                                </label>
                              </label>
                            </div>
                          ) : undefined}
                          <div className="my-[20px] break-all">
                            <label>
                              {docInfo.Title === "ขอชำระเงินล่าช้า"
                                ? "รายละเอียด"
                                : "เนื่องจาก"}
                              &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              <label className="font-medium">
                                {docInfo.Descrip}
                              </label>
                            </label>
                          </div>
                          {docInfo.FileName !== "null" && (
                            <div className="flex my-[20px]">
                              <label>
                                แนบไฟล์&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;
                              </label>
                              <button
                                onClick={() => download(docInfo.FileName)}
                              >
                                {docInfo.FileName.split("_T_")[1]}
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                      {docInfo.Status > 5 ? (
                        <div>
                          <label class="text-2xl font-semibold m-[7%]">
                            สถานะคำร้อง
                          </label>
                          <div className="flex justify-center ">
                            <div className="bg-gray-100 rounded-2xl w-[70%]  my-[3%] p-[30px] text-xl font-semibold ">
                              <div>
                                คำร้อง:&nbsp;&nbsp;
                                <label className="font-medium">
                                  {docInfo.Title}
                                </label>
                              </div>
                              <div
                                className={`mt-[10px] ${
                                  docInfo.Status === 1 ||
                                  docInfo.Status === 3 ||
                                  docInfo.Status === 5 ||
                                  docInfo.Status === 7
                                    ? "text-amber-500"
                                    : docInfo.Status === 2 ||
                                      docInfo.Status === 4 ||
                                      docInfo.Status === 6
                                    ? "text-[red]"
                                    : docInfo.Status === 9
                                    ? "text-[#48AF23]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {docInfo.Status === 1
                                    ? "อาจารย์ได้รับเอกสารคำร้อง"
                                    : docInfo.Status === 2
                                    ? "อาจารย์ปฏิเสธคำร้อง"
                                    : docInfo.Status === 3
                                    ? "เจ้าหน้าที่ได้รับเอกสารคำร้อง"
                                    : docInfo.Status === 4
                                    ? "เจ้าหน้าที่ปฏิเสธคำร้อง"
                                    : docInfo.Status === 5
                                    ? "คณบดีได้รับเอกสารคำร้อง"
                                    : docInfo.Status === 6
                                    ? "คณบดีปฏิเสธคำร้อง"
                                    : docInfo.Status === 7
                                    ? "เจ้าหน้าที่กำลังจัดการคำร้อง"
                                    : docInfo.Status === 9
                                    ? "เจ้าหน้าที่จัดการคำร้องเสร็จสิ้น"
                                    : undefined}
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : undefined}

                      {docInfo.Status === 5 && (
                        <div className="">
                          <div className="ml-[6%]">
                            <label className="text-2xl font-bold ">
                              ความเห็นอาจารย์
                            </label>
                          </div>
                          <div className="">
                            <div className="grid grid-cols-12 mt-[5vh] font-semibold justify-items-center">
                              <div className="col-span-3 ml-[18vh] ">
                                <label>ความเห็น</label>
                              </div>
                              <div className="col-span-6 flex text-lg">
                                <div className="mr-[15vh]">
                                  <input
                                    className="mr-[10px]"
                                    type="checkbox"
                                    checked={docStatus === 7}
                                    onChange={() =>
                                      setDocStatus(7) & setDocStatus2(0)
                                    }
                                  />
                                  <label>อนุมัติ</label>
                                </div>
                                <div>
                                  <input
                                    className="mr-[10px]"
                                    type="checkbox"
                                    checked={docStatus === 6}
                                    onChange={() =>
                                      setDocStatus(6) & setDocStatus2(1)
                                    }
                                  />
                                  <label>ไม่อนุมัติ</label>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-12 mt-[5vh] font-semibold ">
                              <div className="col-span-3 justify-self-center ml-[18vh] ">
                                <label>หมายเหตุ</label>
                              </div>
                              <div className="col-span-9 flex text-lg ml-[20vh]">
                                <textarea
                                  className="border-2 rounded-lg border-black-500 p-[10px] mb-[30px] w-[75vh] h-[150px] "
                                  placeholder=""
                                  type="text"
                                  onChange={noteChange3}
                                  value={note3}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex">
                        <button
                          className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[23vh] hover:bg-red-400"
                          onClick={() =>
                            setDocInfo({}) & fetchDocumentDean() & setNote3("")
                          }
                        >
                          ย้อนกลับ
                        </button>
                        <div className="absolute right-[23vh]">
                          {docInfo.Status2 === 0 && docInfo.Status > 5 ? (
                            <button
                              className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] justify-self-end hover:bg-green-400"
                              onClick={() => setState(3)& fetchDocumentDean() }
                            >
                              ดูใบคำร้อง
                            </button>
                          ) : undefined}
                          {docInfo.Status === 5 && (
                            <button
                            className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-2vh justify-self-end hover:bg-green-400 "
                            onClick={() =>
                              setState(4)& fetchDocumentDean() & setCurrentStep(docInfo.Status)
                            }
                          >
                            สถานะเอกสาร
                          </button>
                          )}
                          <button
                            className="ml-[2vh] cursor-pointer font-medium  p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] justify-self-end hover:bg-sky-300"
                            onClick={() =>
                              setState(2) &
                              setId(docInfo.DocID) & fetchDocumentDean() &
                              setCurrentStep(docInfo.Status)
                            }
                          >
                            {docInfo.Status === 5 ? "ถัดไป" : "สถานะเอกสาร"}
                          </button>
                        </div>
                      </div>
                    </div>
                  )) ||
                  (state === 2 && (
                    <div>
                      {docInfo.Status === 5 ? (
                        <div>
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
                                      {docInfo.Title}
                                    </div>
                                    <div className="col-span-6">
                                      <label className="border-2 p-[5px] border-[#000] px-[10px] text-sm">
                                        ระดับปริญญาตรี
                                      </label>
                                    </div>
                                  </div>
                                  <div className="my-[10px] text-sm ">
                                    <label className="">
                                      คณะเทคโนโลยีสารสนเทศ
                                    </label>
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
                                <label>วันที่ {docInfo.Date}</label>
                              </div>
                              <div className="my-[2vh] text-sm">
                                <label className="font-semibold">
                                  เรื่อง&nbsp;&nbsp;&nbsp;
                                </label>
                                <label>
                                  {docInfo.Title}{" "}
                                  {(docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม") |
                                  (docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                                  (docInfo.Title ===
                                    "ขอความอนุเคราะห์เปิดวิชาเรียน")
                                    ? `วิชา ${docInfo.SubjectName}`
                                    : undefined}
                                </label>
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
                                  {docInfo.Sender} รหัสนักศึกษา{" "}
                                  {docInfo.StudentID} ชั้นปีที่{" "}
                                  {docInfo.ClassYear} สาขาวิชา {docInfo.Major}{" "}
                                  แขนงวิชา {docInfo.Field}
                                </label>
                              </div>
                              <div className="text-sm my-[2vh]">
                                <label className="">
                                  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;มีความประสงค์
                                  {docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม"
                                    ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                    : undefined}
                                  {docInfo.Title === "ขอย้ายกลุ่มการเรียน"
                                    ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากกลุ่ม ${docInfo.Sec1} ไปยัง ${docInfo.Sec2}`
                                    : undefined}
                                  {docInfo.Title === "ขอย้ายแขนงวิชา"
                                    ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากแขนง ${docInfo.Sec1} ขอย้ายไปยัง ${docInfo.Sec2}`
                                    : undefined}
                                  {docInfo.Title ===
                                  "ขอความอนุเคราะห์เปิดวิชาเรียน"
                                    ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                    : undefined}
                                  {docInfo.Title === "ขอชำระเงินล่าช้า"
                                    ? `ขออนุมัติชำระค่าธรรมเนียมการศึกษาล่าช้าเป็นกรณีพิเศษ`
                                    : undefined}
                                  &emsp;
                                  {docInfo.Title !== "คำร้องทั่วไป"
                                    ? `เนื่องจาก`
                                    : undefined}
                                  {docInfo.Descrip}{" "}
                                  {docInfo.Title === "ขอชำระเงินล่าช้า"
                                    ? `และพร้อมชำระค่าธรรมเนียมการศึกษาภายในวันที่ ${docInfo.PayIn}`
                                    : undefined}
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
                                    <label>{docInfo.Sender}</label>
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
                                    <div className=" p-[10px] break-all">
                                      <label>อนุมัติ</label>
                                      <p className="pt-[10px]" >
                                      {docInfo.TeacherName}
                                    </p>
                                    <p className="pt-[10px]" >
                                    {note1 !== "" ? `หมายเหตุ: ${note1}` : undefined}
                                    {docInfo.Note1 !== "" ? `หมายเหตุ: ${docInfo.Note1}` : undefined}
                                    
                                    </p>
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
                                    <div className=" p-[10px] break-all">
                                      <label>
                                      อนุมัติ
                                      </label>
                                      {docInfo.Status > 3 | docStatus > 3 ?(
                                    <p className="pt-[10px]" >
                                      กมนนัทธ์ ชื้นสกุล
                                    </p>
                                    ):undefined
                                    }
                                    <p className="pt-[10px]" >
                                    {note2 !== "" ? `หมายเหตุ: ${note2}` : undefined}
                                    {docInfo.Note2 !== "" ? `หมายเหตุ: ${docInfo.Note2}` : undefined}
                                    
                                    </p>
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
                                    <label className="font-semibold">
                                      คำสั่ง
                                    </label>
                                  </div>
                                  <div className="h-[100px]">
                                    <div className=" p-[10px] break-all">
                                      {docStatus >= 7 && docStatus2 === 0
                                        ? "อนุมัติ"
                                        : docStatus === 6
                                        ? "ไม่อนุมัติ"
                                        : undefined}
                                        {docInfo.Status > 5 | docStatus > 5 ?(
                                    <p className="pt-[10px]" >
                                      ศิริเดช บุญแสง
                                    </p>
                                    ):undefined
                                    }
                                    <p className="pt-[10px]" >
                                    {note3 !== "" ? `หมายเหตุ: ${note3}` : undefined}
                                    {docInfo.Note3 !== "" ? `หมายเหตุ: ${docInfo.Note3}` : undefined}
                                    
                                    </p>
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
                                    <label>{docInfo.Sender}</label>
                                  </div>
                                  <div className="m-[5px]">
                                    <label>วันที่ {docInfo.Date}</label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="grid my-[2vh] ">
                            <div className="flex ">
                              <div className="ml-[6%] mr-[88vh]">
                                <button
                                  className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px]"
                                  onClick={() => setState(1)& fetchDocumentDean() }
                                >
                                  แก้ไข
                                </button>
                              </div>
                              <ReactPrint
                                trigger={() => (
                                  <button className="cursor-pointer font-medium p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ">
                                    ดาวน์โหลด
                                  </button>
                                )}
                                content={() => ref.current}
                              />

                              <button
                                className="cursor-pointer font-medium p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[10px]"
                                onClick={() =>
                                  moment().format("Do MMM YYYY, LT") & updateNote3() & updateDocStatus4() &
                                  updateStatus() & fetchDocumentDean()
                                }
                              >
                                ยืนยัน
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div>
                      <div className="w-[70%] ml-[20vh]">
                        {/* หัวข้อสถานะเอกสาร */}
                        <div
                          className={`w-[650px] rounded-3xl p-[10px] ml-[11%] text-center absolute left-[61vh] top-[25vh]  ${
                            docInfo.Status2 === 1
                              ? "bg-[#EE1D52]"
                              : docInfo.Status === 9
                              ? "bg-[#48AF23]"
                              : "bg-[#FFAF10]"
                          }`}
                        >
                          <label className="text-[#fff] font-semibold">
                            {docInfo.Status2 === 1
                              ? "คำร้องถูกปฏิเสธ"
                              : docInfo.Status === 9
                              ? "จัดการคำร้องเสร็จสิ้น"
                              : docInfo.Status < 9 && docInfo.Status2 === 0
                              ? "กำลังดำเนินการ"
                              : undefined}
                          </label>
                        </div>
                        {/* จบหัวข้อสถานะเอกสาร */}
                        <div className="flex">
                          {/* Process bar เอกสารแต่ละสถานะ */}
                          <div className="mt-[50px]">
                            {docInfo.Status2 === 0 && docInfo.Status < 9 ? (
                              <div>
                                {steps?.map((step, i) => (
                                  <div
                                    key={i}
                                    className={`step-items ${
                                      currentStep === i + 1 && "actives"
                                    } ${
                                      (i + 1 < currentStep || complete) &&
                                      "completes"
                                    } `}
                                  >
                                    <div className="steps">
                                      {i + 1 < currentStep || complete ? (
                                        <TiTick size={24} />
                                      ) : undefined}
                                    </div>
                                    <p className="text-gray-500">{step}</p>
                                  </div>
                                ))}
                              </div>
                            ) : undefined}
                            {/*  */}
                            {docInfo.Status2 === 1 ? (
                              <div>
                                {steps?.map((step, i) => (
                                  <div
                                    key={i}
                                    className={`step-items2 ${
                                      currentStep === i + 1 && "actives2"
                                    } ${
                                      (i + 1 < currentStep || complete) &&
                                      "completes2"
                                    } `}
                                  >
                                    <div className="steps2">
                                      {i + 1 < currentStep || complete ? (
                                        <TiTick size={24} />
                                      ) : undefined}
                                    </div>
                                    <p className="text-gray-500">{step}</p>
                                  </div>
                                ))}
                              </div>
                            ) : undefined}
                            {docInfo.Status === 9 ? (
                              <div>
                                {steps?.map((step, i) => (
                                  <div
                                    key={i}
                                    className={`step-items3 ${
                                      currentStep === i + 1 && "actives3"
                                    } ${
                                      (i + 1 < currentStep || complete) &&
                                      "completes3"
                                    } `}
                                  >
                                    <div className="steps3">
                                      {i + 1 < currentStep || complete ? (
                                        <TiTick size={24} />
                                      ) : undefined}
                                    </div>
                                    <p className="text-gray-500">{step}</p>
                                  </div>
                                ))}
                              </div>
                            ) : undefined}
                          </div>
                          {/* จบ Process bar เอกสารแต่ละสถานะ */}

                          {/* สถานะเอกสาร */}
                          <div className="">
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[255px]">
                              <label className="font-semibold">
                                อาจารย์ได้รับเอกสารคำร้อง
                              </label>
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc1}
                                </label>
                              </div>
                            </div>
                            <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[355px]">
                              <div className="flex justify-between">
                                <label className="font-semibold">
                                  {docInfo.Status === 2 && docInfo.Status2 === 1
                                    ? "อาจารย์ปฏิเสธคำร้อง"
                                    : "อาจารย์อนุมัติคำร้อง"}
                                </label>
                                <div className="text-right">
                                  <label>{docInfo.StatusDoc2}</label>
                                </div>
                              </div>
                              {docInfo.Status === 2 && docInfo.Status2 === 1 ? (
                                <label>หมายเหตุ : {docInfo.Note1}</label>
                              ) : undefined}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[455px]">
                              <label className="font-semibold">
                                เจ้าหน้าที่ได้รับเอกสารคำร้อง
                              </label>
                              {docInfo.Status > 2 && (
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc2}
                                </label>
                              </div>
                              )}
                            </div>
                            <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[555px]">
                              <div className="flex justify-between">
                                <label className="font-semibold">
                                  {docInfo.Status === 4 && docInfo.Status2 === 1
                                    ? "เจ้าหน้าที่ปฏิเสธคำร้อง"
                                    : "เอกสารคำร้องได้รับการตรวจสอบโดยเจ้าหน้าที่"}
                                </label>
                                <div className="text-right">
                                  <label>{docInfo.StatusDoc3}</label>
                                </div>
                              </div>
                              {docInfo.Status === 4 && docInfo.Status2 === 1 ? (
                                <label>หมายเหตุ : {docInfo.Note2}</label>
                              ) : undefined}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[655px]">
                              <label className="font-semibold">
                                คณบดีได้รับเอกสารคำร้อง
                              </label>
                              {docInfo.Status > 4 && (
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc3}
                                </label>
                              </div>
                              )}
                            </div>
                            <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[755px]">
                            <div className="flex justify-between">
                              <label className="font-semibold">
                                {docInfo.Status === 6 && docInfo.Status2 === 1
                                  ? "คณบดีปฏิเสธคำร้อง"
                                  : "คณบดีอนุมัติคำร้อง"}
                              </label>
                              <div className="text-right">
                                  <label>{docInfo.StatusDoc4}</label>
                                </div>
                                </div>
                              {docInfo.Status === 6 && docInfo.Status2 === 1 ? (
                                <label>หมายเหตุ : {docInfo.Note3}</label>
                              ) : undefined}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[855px]">
                              <label className="font-semibold">
                                เจ้าหน้าที่กำลังจัดการคำร้อง
                              </label>
                              {docInfo.Status > 6 && (
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc4}
                                </label>
                              </div>
                              )}
                            </div>
                            <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[955px]">
                              <label className="font-semibold">
                                เจ้าหน้าที่จัดการคำร้องเสร็จสิ้น
                              </label>
                              <div className="text-right">
                                <label className="text-right">
                                  {docInfo.StatusDoc5}
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* จบสถานะเอกสาร */}
                        </div>
                      </div>
                      <button
                        className="mt-[5vh] cursor-pointer font-medium w-[650px] rounded-3xl p-[10px] ml-[21%] text-center bg-[#EE1D52] text-[#fff] font-semibold  hover:bg-red-400"
                        onClick={() => setState(1)& fetchDocumentDean() }
                      >
                        ย้อนกลับ
                      </button>
                    </div>
                      )}
                    </div>
                  )) ||
                  (state === 3 && (
                    <div>
                      <div>
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
                                    {docInfo.Title}
                                  </div>
                                  <div className="col-span-6">
                                    <label className="border-2 p-[5px] border-[#000] px-[10px] text-sm">
                                      ระดับปริญญาตรี
                                    </label>
                                  </div>
                                </div>
                                <div className="my-[10px] text-sm ">
                                  <label className="">
                                    คณะเทคโนโลยีสารสนเทศ
                                  </label>
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
                              <label>วันที่ {docInfo.Date}</label>
                            </div>
                            <div className="my-[2vh] text-sm">
                              <label className="font-semibold">
                                เรื่อง&nbsp;&nbsp;&nbsp;
                              </label>
                              <label>
                                {docInfo.Title}{" "}
                                {(docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม") |
                                (docInfo.Title === "ขอย้ายกลุ่มการเรียน") |
                                (docInfo.Title ===
                                  "ขอความอนุเคราะห์เปิดวิชาเรียน")
                                  ? `วิชา ${docInfo.SubjectName}`
                                  : undefined}
                              </label>
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
                                {docInfo.Sender} รหัสนักศึกษา{" "}
                                {docInfo.StudentID} ชั้นปีที่{" "}
                                {docInfo.ClassYear} สาขาวิชา {docInfo.Major}{" "}
                                แขนงวิชา {docInfo.Field}
                              </label>
                            </div>
                            <div className="text-sm my-[2vh]">
                              <label className="">
                                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;มีความประสงค์
                                {docInfo.Title === "ขอลงทะเบียนเรียนเพิ่ม"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                  : undefined}
                                {docInfo.Title === "ขอย้ายกลุ่มการเรียน"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากกลุ่ม ${docInfo.Sec1} ไปยัง ${docInfo.Sec2}`
                                  : undefined}
                                {docInfo.Title === "ขอย้ายแขนงวิชา"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID} จากแขนง ${docInfo.Sec1} ขอย้ายไปยัง ${docInfo.Sec2}`
                                  : undefined}
                                {docInfo.Title ===
                                "ขอความอนุเคราะห์เปิดวิชาเรียน"
                                  ? `${docInfo.Title}ในรายวิชา ${docInfo.SubjectName} 0${docInfo.SubjectID}`
                                  : undefined}
                                {docInfo.Title === "ขอชำระเงินล่าช้า"
                                  ? `ขออนุมัติชำระค่าธรรมเนียมการศึกษาล่าช้าเป็นกรณีพิเศษ`
                                  : undefined}
                                &emsp;
                                {docInfo.Title !== "คำร้องทั่วไป"
                                  ? `เนื่องจาก`
                                  : undefined}
                                {docInfo.Descrip}{" "}
                                {docInfo.Title === "ขอชำระเงินล่าช้า"
                                  ? `และพร้อมชำระค่าธรรมเนียมการศึกษาภายในวันที่ ${docInfo.PayIn}`
                                  : undefined}
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
                                  <label>{docInfo.Sender}</label>
                                </div>
                                <div className="m-[5px]">
                                  <label>ผู้ยื่นคำร้อง</label>
                                </div>
                              </div>
                            </div>

                            <div className="h-[150px] grid grid-cols-12 border-2 border-[#000] text-center my-[2vh] text-sm">
                              <div className="col-span-5 border-r-2 border-[#000]">
                                <div className="border-b-2 p-[5px] border-[#000]">
                                  <label className="font-semibold">
                                    ความเห็นอาจารย์ที่ปรึกษา/อาจารย์ผู้สอน
                                  </label>
                                </div>
                                <div className="h-[100px]">
                                  <div className=" p-[10px] break-all">
                                    <label>
                                      {docInfo.Status >= 3
                                        ? "อนุมัติ"
                                        : undefined}
                                    </label>
                                    <p className="pt-[10px]" >
                                      {docInfo.TeacherName}
                                    </p>
                                    <p className="pt-[10px]" >
                                    {note1 !== "" ? `หมายเหตุ: ${note1}` : undefined}
                                    {docInfo.Note1 !== "" ? `หมายเหตุ: ${docInfo.Note1}` : undefined}
                                    </p>
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
                                    <label>
                                      {docInfo.Status >= 5
                                        ? "อนุมัติ"
                                        : undefined}
                                    </label>
                                    {docInfo.Status > 3 | docStatus > 3 ?(
                                    <p className="pt-[10px]" >
                                      กมนนัทธ์ ชื้นสกุล
                                    </p>
                                    ):undefined
                                    }
                                    <p className="pt-[10px]" >
                                    {note2 !== "" ? `หมายเหตุ: ${note2}` : undefined}
                                    {docInfo.Note2 !== "" ? `หมายเหตุ: ${docInfo.Note2}` : undefined}
                                    
                                    </p>
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
                                  <label className="font-semibold">
                                    คำสั่ง
                                  </label>
                                </div>
                                <div className="h-[100px]">
                                  <div className=" p-[10px] break-all">
                                    <label>
                                      {docInfo.Status >= 7
                                        ? "อนุมัติ"
                                        : undefined}
                                    </label>
                                    {docInfo.Status > 5 | docStatus > 5 ?(
                                    <p className="pt-[10px]" >
                                      ศิริเดช บุญแสง
                                    </p>
                                    ):undefined
                                    }
                                    <p className="pt-[10px]" >
                                    {note3 !== "" ? `หมายเหตุ: ${note3}` : undefined}
                                    {docInfo.Note3 !== "" ? `หมายเหตุ: ${docInfo.Note3}` : undefined}
                                    
                                    </p>
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
                                  <label>{docInfo.Sender}</label>
                                </div>
                                <div className="m-[5px]">
                                  <label>วันที่ {docInfo.Date}</label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="grid my-[2vh] ">
                          <div className="flex">
                            <div className="ml-[6%] mr-[100vh]">
                              <button
                                className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] hover:bg-red-400"
                                onClick={() => setState(1)& fetchDocumentDean() }
                              >
                                ย้อนกลับ
                              </button>
                            </div>
                            <ReactPrint
                              trigger={() => (
                                <button className="cursor-pointer font-medium p-[10px] bg-[#3EB7FF] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%] hover:bg-sky-300">
                                  ดาวน์โหลด
                                </button>
                              )}
                              content={() => ref.current}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )) || (state === 4 && (
                    <div>
                    <div className="w-[70%] ml-[20vh]">
                      {/* หัวข้อสถานะเอกสาร */}
                      <div
                        className={`w-[650px] rounded-3xl p-[10px] ml-[11%] text-center absolute left-[61vh] top-[25vh]  ${
                          docInfo.Status2 === 1
                            ? "bg-[#EE1D52]"
                            : docInfo.Status === 9
                            ? "bg-[#48AF23]"
                            : "bg-[#FFAF10]"
                        }`}
                      >
                        <label className="text-[#fff] font-semibold">
                          {docInfo.Status2 === 1
                            ? "คำร้องถูกปฏิเสธ"
                            : docInfo.Status === 9
                            ? "จัดการคำร้องเสร็จสิ้น"
                            : docInfo.Status < 9 && docInfo.Status2 === 0
                            ? "กำลังดำเนินการ"
                            : undefined}
                        </label>
                      </div>
                      {/* จบหัวข้อสถานะเอกสาร */}
                      <div className="flex">
                        {/* Process bar เอกสารแต่ละสถานะ */}
                        <div className="mt-[50px]">
                          {docInfo.Status2 === 0 && docInfo.Status < 9 ? (
                            <div>
                              {steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className={`step-items ${
                                    currentStep === i + 1 && "actives"
                                  } ${
                                    (i + 1 < currentStep || complete) &&
                                    "completes"
                                  } `}
                                >
                                  <div className="steps">
                                    {i + 1 < currentStep || complete ? (
                                      <TiTick size={24} />
                                    ) : undefined}
                                  </div>
                                  <p className="text-gray-500">{step}</p>
                                </div>
                              ))}
                            </div>
                          ) : undefined}
                          {/*  */}
                          {docInfo.Status2 === 1 ? (
                            <div>
                              {steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className={`step-items2 ${
                                    currentStep === i + 1 && "actives2"
                                  } ${
                                    (i + 1 < currentStep || complete) &&
                                    "completes2"
                                  } `}
                                >
                                  <div className="steps2">
                                    {i + 1 < currentStep || complete ? (
                                      <TiTick size={24} />
                                    ) : undefined}
                                  </div>
                                  <p className="text-gray-500">{step}</p>
                                </div>
                              ))}
                            </div>
                          ) : undefined}
                          {docInfo.Status === 9 ? (
                            <div>
                              {steps?.map((step, i) => (
                                <div
                                  key={i}
                                  className={`step-items3 ${
                                    currentStep === i + 1 && "actives3"
                                  } ${
                                    (i + 1 < currentStep || complete) &&
                                    "completes3"
                                  } `}
                                >
                                  <div className="steps3">
                                    {i + 1 < currentStep || complete ? (
                                      <TiTick size={24} />
                                    ) : undefined}
                                  </div>
                                  <p className="text-gray-500">{step}</p>
                                </div>
                              ))}
                            </div>
                          ) : undefined}
                        </div>
                        {/* จบ Process bar เอกสารแต่ละสถานะ */}

                        {/* สถานะเอกสาร */}
                        <div className="">
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[255px]">
                            <label className="font-semibold">
                              อาจารย์ได้รับเอกสารคำร้อง
                            </label>
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc1}
                              </label>
                            </div>
                          </div>
                          <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[355px]">
                            <div className="flex justify-between">
                              <label className="font-semibold">
                                {docInfo.Status === 2 && docInfo.Status2 === 1
                                  ? "อาจารย์ปฏิเสธคำร้อง"
                                  : "อาจารย์อนุมัติคำร้อง"}
                              </label>
                              <div className="text-right">
                                <label>{docInfo.StatusDoc2}</label>
                              </div>
                            </div>
                            {docInfo.Status === 2 && docInfo.Status2 === 1 ? (
                              <label>หมายเหตุ : {docInfo.Note}</label>
                            ) : undefined}
                          </div>
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[455px]">
                            <label className="font-semibold">
                              เจ้าหน้าที่ได้รับเอกสารคำร้อง
                            </label>
                            {docInfo.Status > 2 && (
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc2}
                              </label>
                            </div>
                            )}
                          </div>
                          <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[555px]">
                            <div className="flex justify-between">
                              <label className="font-semibold">
                                {docInfo.Status === 4 && docInfo.Status2 === 1
                                  ? "เจ้าหน้าที่ปฏิเสธคำร้อง"
                                  : "เอกสารคำร้องได้รับการตรวจสอบโดยเจ้าหน้าที่"}
                              </label>
                              <div className="text-right">
                                <label>{docInfo.StatusDoc3}</label>
                              </div>
                            </div>
                            {docInfo.Status === 4 && docInfo.Status2 === 1 ? (
                              <label>หมายเหตุ : {docInfo.Note}</label>
                            ) : undefined}
                          </div>
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[655px]">
                            <label className="font-semibold">
                              คณบดีได้รับเอกสารคำร้อง
                            </label>
                            {docInfo.Status > 4 && (
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc3}
                              </label>
                            </div>
                            )}
                          </div>
                          <div className="bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[755px]">
                          <div className="flex justify-between">
                            <label className="font-semibold">
                              {docInfo.Status === 6 && docInfo.Status2 === 1
                                ? "คณบดีปฏิเสธคำร้อง"
                                : "คณบดีอนุมัติคำร้อง"}
                            </label>
                            <div className="text-right">
                                <label>{docInfo.StatusDoc4}</label>
                              </div>
                              </div>
                            {docInfo.Status === 6 && docInfo.Status2 === 1 ? (
                              <label>หมายเหตุ : {docInfo.Note}</label>
                            ) : undefined}
                          </div>
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[855px]">
                            <label className="font-semibold">
                              เจ้าหน้าที่กำลังจัดการคำร้อง
                            </label>
                            {docInfo.Status > 6 && (
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc4}
                              </label>
                            </div>
                            )}
                          </div>
                          <div className="flex justify-between bg-gray-200 rounded-2xl p-[15px] border-gray-500 w-[500px] h-auto  absolute top-[955px]">
                            <label className="font-semibold">
                              เจ้าหน้าที่จัดการคำร้องเสร็จสิ้น
                            </label>
                            <div className="text-right">
                              <label className="text-right">
                                {docInfo.StatusDoc5}
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* จบสถานะเอกสาร */}
                      </div>
                    </div>
                    <button
                      className="mt-[5vh] cursor-pointer font-medium w-[650px] rounded-3xl p-[10px] ml-[21%] text-center bg-[#EE1D52] text-[#fff] font-semibold  hover:bg-red-400"
                      onClick={() => setState(1)& fetchDocumentDean() }
                    >
                      ย้อนกลับ
                    </button>
                  </div>
                  ))
                : docDean.map((element, index) => {
                    console.log("data", element);
                    return (
                      <>
                        {status === "ไม่อนุมัติ" &&
                        element.Status === 6 &&
                        element.Status2 === 1 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl text-[#fff] mr-[200px] w-[150px] ${
                                  element.Status2 === 1 && element.Status === 6
                                    ? "bg-[#FE3745]"
                                    : element.Status >= 7
                                    ? "bg-[#48AF23]"
                                    : element.Status === 5
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {element.Status2 === 1 && element.Status === 6
                                    ? "ไม่อนุมัติ"
                                    : element.Status >= 7
                                    ? "อนุมัติ"
                                    : element.Status === 5
                                    ? "รอดำเนินการ"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : status === "อนุมัติ" && element.Status >= 7 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl text-[#fff] mr-[200px] w-[150px] ${
                                  element.Status2 === 1 && element.Status === 6
                                    ? "bg-[#FE3745]"
                                    : element.Status >= 7
                                    ? "bg-[#48AF23]"
                                    : element.Status === 5
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {element.Status2 === 1 && element.Status === 6
                                    ? "ไม่อนุมัติ"
                                    : element.Status >= 7
                                    ? "อนุมัติ"
                                    : element.Status === 5
                                    ? "รอดำเนินการ"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : status === "กำลังดำเนินการ" &&
                          element.Status === 5 ? (
                          <div
                            className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                            key={index}
                            onClick={() => setDocInfo(element)}
                          >
                            <div className="flex">
                              <div className="self-center">
                                <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                  {element.StudentID}
                                </label>
                              </div>
                              <div className="mx-[30px]">
                                <div className="flex">
                                  <label className="font-semibold text-xl">
                                    {element.Sender}
                                  </label>
                                </div>

                                <p>{element.Title}</p>
                              </div>
                            </div>
                            <div className="flex">
                              <div
                                className={`self-center px-[10px] py-[5px] text-center rounded-3xl text-[#fff] mr-[200px] w-[150px] ${
                                  element.Status2 === 1 && element.Status === 6
                                    ? "bg-[#FE3745]"
                                    : element.Status >= 7
                                    ? "bg-[#48AF23]"
                                    : element.Status === 5
                                    ? "bg-[#FFAF10]"
                                    : undefined
                                }`}
                              >
                                <label className="">
                                  {element.Status2 === 1 && element.Status === 6
                                    ? "ไม่อนุมัติ"
                                    : element.Status >= 7
                                    ? "อนุมัติ"
                                    : element.Status === 5
                                    ? "รอดำเนินการ"
                                    : undefined}
                                </label>
                              </div>
                              <div className="self-center">
                                <label className="font-semibold text-xl">
                                  {element.StatusDate}
                                </label>
                              </div>
                            </div>
                          </div>
                        ) : (
                          status === "ทั้งหมด" && (
                            <div
                              className="flex bg-gray-100 mt-[1%] rounded-lg p-[30px] w-[90%] ml-[5%] font-medium justify-between cursor-pointer"
                              key={index}
                              onClick={() => setDocInfo(element)}
                            >
                              <div className="flex">
                                <div className="self-center">
                                  <label className="px-[30px] py-[5px] bg-[#fff] rounded-3xl text-center font-semibold text-xl">
                                    {element.StudentID}
                                  </label>
                                </div>
                                <div className="mx-[30px]">
                                  <div className="flex">
                                    <label className="font-semibold text-xl">
                                      {element.Sender}
                                    </label>
                                  </div>

                                  <p>{element.Title}</p>
                                </div>
                              </div>
                              <div className="flex">
                                <div
                                  className={`self-center px-[10px] py-[5px] text-center rounded-3xl text-[#fff] mr-[200px] w-[150px] ${
                                    element.Status2 === 1 &&
                                    element.Status === 6
                                      ? "bg-[#FE3745]"
                                      : element.Status >= 7
                                      ? "bg-[#48AF23]"
                                      : element.Status === 5
                                      ? "bg-[#FFAF10]"
                                      : undefined
                                  }`}
                                >
                                  <label className="">
                                    {element.Status2 === 1 &&
                                    element.Status === 6
                                      ? "ไม่อนุมัติ"
                                      : element.Status >= 7
                                      ? "อนุมัติ"
                                      : element.Status === 5
                                      ? "รอดำเนินการ"
                                      : undefined}
                                  </label>
                                </div>
                                <div className="self-center">
                                  <label className="font-semibold text-xl">
                                    {element.StatusDate}
                                  </label>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </>
                    );
                  })}
            </>
          )}

          {/* <div className="grid grid-cols-12 flex justify-center ml-[7%] mb-[3%] font-medium">
            <div className="col-span-7 flex text-lg border-2 rounded-3xl p-[5px] text-gray-500">
              <div className="w-[150px] ml-[20px]">
                <label>12 ต.ค. 2565</label>
              </div>
              <div>
                <label>ขอคืนค่าธรรมเนียม</label>
              </div>
            </div>
            <div className="col-span-3 text-lg rounded-3xl p-[8px] text-[#fff] text-center ml-[10%] bg-[#FFAF10]">
              <label>คณบดีกำลังดำเนินการ</label>
            </div>
          </div>
          <div className="grid grid-cols-12 flex justify-center ml-[7%] mb-[3%] font-medium">
            <div className="col-span-7 flex text-lg border-2 rounded-3xl p-[5px] text-gray-500">
              <div className="w-[150px] ml-[20px]">
                <label>12 ต.ค. 2565</label>
              </div>
              <div>
                <label>ขอคืนค่าธรรมเนียม</label>
              </div>
            </div>
            <div className="col-span-3 text-lg rounded-3xl p-[8px] text-[#fff] text-center ml-[10%] bg-[#FFAF10]">
              <label>เจ้าหน้าที่กำลังดำเนินการ</label>
            </div>
          </div>
          <div className="grid grid-cols-12 flex justify-center ml-[7%] mb-[3%] font-medium">
            <div className="col-span-7 flex text-lg border-2 rounded-3xl p-[5px] text-gray-500">
              <div className="w-[150px] ml-[20px]">
                <label>12 ต.ค. 2565</label>
              </div>
              <div>
                <label>ขอคืนค่าธรรมเนียม</label>
              </div>
            </div>
            <div className="col-span-3 text-lg rounded-3xl p-[8px] text-[#fff] text-center ml-[10%] bg-[#48AF23]">
              <label>คำร้องอนุมัติ</label>
            </div>
          </div>
          <div className="grid grid-cols-12 flex justify-center ml-[7%] mb-[3%] font-medium">
            <div className="col-span-7 flex text-lg border-2 rounded-3xl p-[5px] text-gray-500">
              <div className="w-[150px] ml-[20px]">
                <label>12 ต.ค. 2565</label>
              </div>
              <div>
                <label>ขอคืนค่าธรรมเนียม</label>
              </div>
            </div>
            <div className="col-span-3 text-lg rounded-3xl p-[8px] text-[#fff] text-center ml-[10%] bg-[#EE1D52]">
              <label>คำร้องถูกปฏิเสธ</label>
            </div>
          </div> */}
        </div>
      ) : (
        <InputRequest1 />
      )}
    </div>
  );
}

export default connect(mapStateToProps)(RequestStudent);

// {props.posts[0].user.user.FirstName} {props.posts[0].user.user.Lastname}
