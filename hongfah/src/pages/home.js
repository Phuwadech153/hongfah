import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import school from "../image/school.png";
import announcement from "../image/announcement.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Personal from "./Personal";
import { connect } from "react-redux";
import axios from "axios";

function Home(props) {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [newsInfo, setNewsInfo] = useState({});
  const [announce,setAnnounce] = useState([]) 

  const fetchAnnounce = async () => {
    try {
      const { data } = await axios.get(
        `announce/home`
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
  const logout = () => {
    props.dispatch({
      type: "CLEAR_DATA",
    });
    // console.log(user.data);
    navigate("/login");
  };

  const fetchNews = async () => {
    try {
      const { data } = await axios.get(`/announce/news/home`);
      console.log(data);
      setNews(data);
      // fetchDocumentTeach()
    } catch (error) {
      console.log(error);
    } finally {
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);


  return (
    <div>
      <div className="col-span-9 bg-[#fff] mt-[3%]">
        <label className="text-2xl font-semibold m-[7%]">กิจกรรมล่าสุด</label>
        <div className="grid grid-cols-12">
          <div className="col-span-3  ">
            <div className="grid justify-items-center items-center m-[20px] mt-[25px]">
              <img className="" src={announcement} width="70%" height="70%" />
            </div>
          </div>

          <div className="col-span-9">
          {news.map((element, index) => {
              return (
                <div className="flex">
                  <div className="text-center">
              <label className="flex items-center justify-center rounded-lg p-[15px] bg-[#FF5592] text-[#fff] text-xl px-[30px] m-[10px] font-medium w-[150px]">
                 
                {" "}
                {element.DateShow} <br/> {element.MonthShow}
              </label>
                  </div>
              <label className="p-[5px] w-[70%] border-2 rounded-lg m-[10px] break-all ">
                {" "}
                <p className="text-xl font-bold m-[5px] truncate">
                  {element.Title}
                </p>
                <p className={`text-sm ml-[50px] hide-text`}>
                {element.Descrip}
                </p>{" "}

              </label>
            </div>
              );
            })}
          </div>
        </div>

        <div className="mx-[7%] my-[2%]">
          <label className="text-2xl font-semibold  ">
            ประกาศจากห้องทะเบียน
          </label>
        </div>
        <div className="grid grid-cols-12 content-around ">
          {announce.map((element,index)=>{
            return (
          <div className="relative col-span-4  h-[250px] rounded-lg bg-gray-200 mt-[20px] p-[20px] mx-[30px] break-all ">
            <label>{element.title}</label>
            <div className="absolute bottom-5 right-5 flex-col grid self-end items-end" >
          <label >{element.announcer}</label>
          <label >{element.time} {element.date}</label>
        </div>
          </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}

export default connect()(Home);
