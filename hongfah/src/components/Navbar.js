import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    posts: state,
  };
};

function Navbar(props) {
  const navigate = useNavigate();

  const logout = () => {
    props.dispatch({
      type: "CLEAR_DATA",
    });
    // console.log(user.data);
    navigate("/login");
  };

  return (
    <div className="flex justify-end">
      <div className="">
        <Link to="/Personal">
          <button className="font-bold bg-gray-200 py-[10px] rounded-md px-[20px] text-xl mr-[30px]">
            {props.posts[0].user.user.RoleID === 2
              ? "อาจารย์"
              : props.posts[0].user.user.RoleID === 3
              ? "เจ้าหน้าที่"
              : props.posts[0].user.user.RoleID === 4
              ? "คณบดี"
              : undefined}{" "}
            {props.posts[0].user.user.FirstName}{" "}
            {props.posts[0].user.user.Lastname}
            <FontAwesomeIcon className="ml-[10px]" icon={faUser} />
          </button>
        </Link>

        <button
          type="submit"
          className="btn py-[10px] bg-[#EE1D52]  rounded-3xl w- text-[#fff] font-bold px-[15px]"
          onClick={() => logout()}
        >
          Log out
        </button>
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(Navbar);
