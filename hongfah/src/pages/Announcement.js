import React, { useState } from "react";
import { Link } from "react-router-dom";
import school from "../image/school.png";
import News from "../components/News";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Announce from "../components/Announce";
import Addnews from "../components/Addnews";
import AddAnnounce from "../components/AddAnnounce";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};

function Announcement(props) {
  const [onMenu, setOnMenu] = useState("News");
  const [add, setAdd] = useState("");
  const RoleID = props.posts[0].user.user.RoleID;
  const [announce, setAnnounce] = useState([
    // {announcer:"",
    //   date:"",
    //   time:"",
    //   title:"",
    // }
  ]);

  const [news, setNews] = useState([]);

  const createAnnouncement = async () => {
    try {
      // await axios.post("localhost:5000/annoucement/create", data)
      setOnMenu("Announce");
      setAdd("");
    } catch (err) {
      console.log(err);
    }
  };
  const createNews = async () => {
    try {
      // await axios.post("localhost:5000/annoucement/create", data)
      setOnMenu("News");
      setAdd("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="col-span-9 bg-[#fff] mt-[3%]">
        <label className="text-2xl font-semibold m-[7%]">
          กิจกรรมและประกาศ
        </label>

        <div className="flex">
          <button
            className={`font-medium p-[10px] border-2 rounded-3xl w-[150px] text-center ml-[6%] mt-[2%] ${
              onMenu === "News" ? "bg-[#FF5592] text-[#fff]" : "text-[#000]"
            }`}
            onClick={() => setOnMenu("News") & setAdd("")}
          >
            กิจกรรมการศึกษา
          </button>
          <button
            className={`font-medium p-[10px] border-2 rounded-3xl w-[120px] text-center ml-[1%] mt-[2%] hover:bg-[#FF5592] hover:text-[#fff] ${
              onMenu === "Announce" ? "bg-[#FF5592] text-[#fff]" : "text-[#000]"
            } `}
            onClick={() => setOnMenu("Announce") & setAdd("")}
          >
            ประกาศทั่วไป
          </button>
          {RoleID === 3 && (
          <button
            className={`font-medium p-[10px] border-2 rounded-3xl w-[200px] text-center ml-[1%] mt-[2%] hover:bg-[#FF5592] hover:text-[#fff] ${
              (onMenu === "AddNewsAnnounce") | "AddNews" | "AddAnnounce"
                ? "bg-[#FF5592] text-[#fff]"
                : "text-[#000]"
            } `}
            onClick={() => setOnMenu("AddNewsAnnounce") & setAdd("AddNews")}
          >
            เพิ่มกิจกรรม/ประกาศ
            <FontAwesomeIcon className="ml-[5px]" icon={faFileCirclePlus} />
          </button>
          )}
        </div>

        {onMenu === "AddNewsAnnounce" && (
          <div className="flex ml-[8%]">
            <button
              className={`font-medium p-[10px] border-2 rounded-3xl w-[120px] text-center ml-[6%] mt-[2%] ${
                add === "AddNews"
                  ? "bg-[#FF5592] text-[#fff]"
                  : "text-[#000] bg-[#fff]"
              }`}
              onClick={() => setAdd("AddNews")}
            >
              <FontAwesomeIcon className="mr-[10px]" icon={faPlus} />
              กิจกรรม
            </button>
            <button
              className={`font-medium p-[10px] border-2 rounded-3xl w-[120px] text-center ml-[1%] mt-[2%] hover:bg-[#FF5592] hover:text-[#fff] ${
                add === "AddAnnounce"
                  ? "bg-[#FF5592] text-[#fff]"
                  : "text-[#000]  "
              } `}
              onClick={() => setAdd("AddAnnounce")}
            >
              <FontAwesomeIcon className="mr-[10px]" icon={faPlus} />
              ประกาศ
            </button>
          </div>
        )}

        {onMenu === "News" && <News data={news} />}

        {onMenu === "Announce" && <Announce data={announce} />}

        {add === "AddNews" && <Addnews data={setNews} submit={createNews} />}
        {add === "AddAnnounce" && (
        <AddAnnounce data={setAnnounce} submit={createAnnouncement} />
        )}
        {/* เริ่มหน้าแสดงตัวอย่างประกาศ */}
        {/* <div className=" bg-gray-100 rounded-lg w-[80%] p-[30px] h-[250px] my-[2%] ml-[6%] font-medium">
          <label>
            แจ้งย้ายห้องเรียน วิชา Data Structure วันที่ 19 ตุลาคม 2565 เวลา
            14.30 - 17.30 น. ย้ายห้องเรียนไปห้อง Project Base 2{" "}
          </label>
          <div className="flex flex-col grid mt-[130px] ">
            <label className="justify-self-end ">teacher Khim</label>
            <label className="justify-self-end">11.53 10 ต.ค. 2566</label>
          </div>
        </div>
        <div className="flex mt-[1%] ml-[65%] ">
          <button className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px]">
            แก้ไข
          </button>
          <button className="cursor-pointer font-medium p-[10px] bg-[#48AF23] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px] ml-[3%]">
            ยืนยัน
          </button>
        </div> */}
        {/* จบหน้าแสดงตัวอย่างประกาศ */}
        {/* หน้าประกาศ */}

        {/* <div className=" bg-gray-100 rounded-lg w-[80%] p-[30px] h-[250px] my-[2%] ml-[6%] font-medium">
          <label>
            แจ้งย้ายห้องเรียน วิชา Data Structure วันที่ 19 ตุลาคม 2565 เวลา
            14.30 - 17.30 น. ย้ายห้องเรียนไปห้อง Project Base 2{" "}
          </label>
          <div className="flex mt-[140px] ">
            <div className="flex flex-col grid ">
              <label className=" ">teacher Khim</label>
              <label className="">11.53 10 ต.ค. 2566</label>
            </div>
            <div className="flex ml-[62%]">
              <label className="cursor-pointer text-sm font-medium  p-[10px] bg-[#ED6B22] rounded-3xl text-[#fff] text-center mb-[3%] w-[100px]">
                ลบ
              </label>
              <label className="cursor-pointer text-sm font-medium p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[100px] ml-[3%]">
                แก้ไข
              </label>
            </div>
          </div>
        </div> */}
        {/* จบหน้าประกาศ */}
      </div>
    </div>
  );
}

export default  connect(mapStateToProps)(Announcement);
