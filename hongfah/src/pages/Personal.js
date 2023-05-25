import React, { useState } from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};

function Personal(props) {
  const RoleID = props.posts[0].user.user.RoleID;

  return (
    <div className="col-span-9 bg-[#fff] mt-[3%]">
      <label className="text-2xl font-semibold m-[7%]">ข้อมูลส่วนตัว</label>
      <img src={""} className="w-[30vh] h-[30vh] ml-[60vh] my-[3vh]"></img>
      <div className="grid grid-cols-12">
        <div className="col-span-6 ml-[50%] text-xl font-semibold text-gray-600">
          <p className="m-[20px]">ชื่อ-นามสกุล</p>
          {RoleID === 1 && (
            <div>
              <p className="m-[20px]">รหัสนักศึกษา</p>
              <p className="m-[20px]">ชั้นปี</p>
              <p className="m-[20px]">สาขาวิชา</p>
              <p className="m-[20px]">แขนงวิชา</p>
            </div>
          )}
        </div>
        <div className="col-span-6  text-xl font-medium text-gray-600">
          <p className="m-[20px]">
            {props.posts[0].user.user.FirstName}{" "}
            {props.posts[0].user.user.Lastname}
          </p>
          {RoleID === 1 && (
            <div>
              <p className="m-[20px]">{props.posts[0].user.user.StudentID}</p>
              <p className="m-[20px]">{props.posts[0].user.user.ClassYear}</p>
              <p className="m-[20px]">{props.posts[0].user.user.Major}</p>
              <p className="m-[20px]">{props.posts[0].user.user.Field}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Personal);
