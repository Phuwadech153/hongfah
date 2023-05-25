import React, { useState, useEffect } from "react";
import axios from "axios";

function News(props) {
  const [announce, setAnnounce] = useState([]);
  const [newsInfo, setNewsInfo] = useState({});

  const fetchAnnounce = async () => {
    try {
      const { data } = await axios.get(`/announce/news`);
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

  const New = () => {
    return (
      <>
        {Object.keys(newsInfo).length !== 0 ? (
          <div className="ml-[10%] mt-[3%]">
            <label className="font-bold text-2xl">{newsInfo.Title}</label>
            <p className="font-semibold text-lg ml-[1%] text-gray-500">
              {newsInfo.Date} 
            </p>
            <img
              src={`http://localhost:3001/file/${newsInfo.Image}`}
              className="w-[80vh] h-[60vh] ml-[20vh] my-[3vh]"
            ></img>
            <div className="w-[80%] ml-[5%] mb-[3%] font-semibold break-all">
              <label>&emsp;&emsp;&emsp;&emsp;&emsp;{newsInfo.Descrip} </label>
            </div>
            <div className="flex mt-[2%]  mb-[3%]">
              <button
                className="cursor-pointer font-medium  p-[10px] bg-[#EE1D52] rounded-3xl text-[#fff] text-center mb-[3%] w-[120px]"
                onClick={() => setNewsInfo({})}
              >
                ย้อนกลับ
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 mt-[2%] px-[6%] gap-x-[10px] gap-y-[10px]">
            {announce.map((element, index) => {
              return (
                <div
                  className="col-span-6"
                  key={index}
                  onClick={() => setNewsInfo(element)}
                >
                  <div className="grid grid-cols-12 gap-x-2 ">
                    <div className="col-span-3 p-[10px] bg-[#ff5592] rounded-lg text-[#fff] text-center text-xl font-medium py-[70px]">
                      <p>{element.DateShow} <br/> {element.MonthShow}</p>
                    </div>
                    <div className="col-span-9 border-2 rounded-lg p-[10px] break-all">
                      <p className="text-xl font-semibold hide-text">{element.Title}</p>
                      <p className="hide-text-5" >
                        {element.Descrip}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </>
    );
  };

  return props.data !== undefined && <New />;
}

export default News;
