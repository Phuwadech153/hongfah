import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import school from "../image/school.png";

function Drawer() {
  const navigate = useNavigate();
  const [onMenu, setOnMenu] = useState("home");
  const redirect = (path) => {
    setOnMenu(path);
    navigate(path);
  };
  return (
    <div className="bg-[#D3EDFD] flex flex-col h-[100vh]">
      <div className="flex grid justify-items-center mt-[10%]">
        <img className="" src={school} width="40%" height="40%" />
      </div>
      <div className="text-center">
        <div>
          <button
            onClick={() => redirect("home")}
            type="submit"
            className="btn p-[10px] font-bold text-4xl text-[#243096]"
          >
            Hongfah
          </button>
        </div>
      </div>
      <div
      
        className={
          onMenu === "home"
            ? "bg-[#fff] rounded-lg p-[10px] font-bold ml-[20%] mt-[20px] text-2xl w-full pl-[30px]"
            : "btn p-[10px] font-bold ml-[25%] mt-[20px] text-2xl"
        }
      >
        <button onClick={() => redirect("home")} type="submit" className="btn">
          หน้าหลัก
        </button>
      </div>
      <div

        className={
          onMenu === "Announcement"
            ? "bg-[#fff] rounded-lg p-[10px] font-bold ml-[20%] mt-[20px] text-2xl w-full pl-[30px]"
            : "btn p-[10px] font-bold ml-[25%] mt-[20px] text-2xl"
        }
      >
        <button onClick={() => redirect("Announcement")} type="submit">
          กิจกรรมและประกาศ
        </button>
      </div>
      <div

        className={
          onMenu === "Calendar"
            ? "bg-[#fff] rounded-lg p-[10px] font-bold ml-[20%] mt-[20px] text-2xl w-full pl-[30px]"
            : "btn p-[10px] font-bold ml-[25%] mt-[20px] text-2xl"
        }
      >
        <button onClick={() => redirect("Calendar")} type="submit">
          ปฏิทินการศึกษา
        </button>
      </div>
      <div

        className={
          onMenu === "Request"
            ? "bg-[#fff] rounded-lg p-[10px] font-bold ml-[20%] mt-[20px] text-2xl w-full pl-[30px]"
            : "btn p-[10px] font-bold ml-[25%] mt-[20px] text-2xl"
        }
      >
        <button onClick={() => redirect("Request")} type="submit">
          คำร้อง
        </button>
      </div>
      {/* <div

        className={
          onMenu === "/"
            ? "bg-[#fff] rounded-lg p-[10px] font-bold ml-[20%] mt-[20px] text-2xl w-full pl-[30px]"
            : "btn p-[10px] font-bold ml-[25%] mt-[20px] text-2xl"
        }
      >
        <button onClick={() => redirect("/home")} type="submit">
          บุคลากร
        </button>
      </div> */}
    </div>
  );
}

export default Drawer;
